import { observable, computed, trace } from 'mobx'
import EventEmitter from 'eventemitter3'

import vtkImageData from 'vtk.js/Sources/Common/DataModel/ImageData'
import vtkDataArray from 'vtk.js/Sources/Common/Core/DataArray'
import { VtkDataTypes } from 'vtk.js/Sources/Common/Core/DataArray/Constants'

const STYLE_RENDERING_VIEW_CONTAINER = {
  position: 'relative',
  width: '100%',
  height: '100%',
  minHeight: '200px',
  minWidth: '450px',
  margin: '0',
  padding: '0',
  top: '0',
  left: '0',
  overflow: 'hidden',
}

class MainUIStore {
  uiContainer = null
  @observable collapsed = false
  @observable annotationsEnabled = true
  @observable axesEnabled = false
  @observable fullscreenEnabled = false
  @observable rotateEnabled = false
  @observable interpolationEnabled = true
  @observable croppingPlanesEnabled = false

  @observable viewMode = 'Volume'

  fps = [60, 60, 60]
  @observable fpsTooLow = false
  fpsMonitor = null
}

class ImageUIStore {
  constructor(eventEmitter) {
    this.eventEmitter = eventEmitter
  }

  eventEmitter = null

  @observable.ref image = null
  @observable.ref multiscaleImage = null

  source = null
  @observable.ref representationProxy = null

  @observable selectedComponent = 0
  // Does not include the label map
  @computed get numberOfComponents() {
    if (!!!this.image) {
      return 0
    }
    const dataArray = this.fusedImageLabelMap.getPointData().getScalars()
    if (!!this.labelMap) {
      return dataArray.getNumberOfComponents() - 1
    }
    return dataArray.getNumberOfComponents()
  }
  totalIntensityComponents = 0
  maxIntensityComponents = 3

  lookupTableProxies = []
  piecewiseFunctionProxies = []
  @observable componentVisibilities = []
  lastVisualizedComponents = []
  fusedImageData = null
  @observable visualizedComponents = []
  lastComponentVisibilityChanged = 0
  transferFunctionWidget = null
  transferFunctionManipulator = {
    rangeManipulator: null,
    windowMotionScale: 150.0,
    levelMotionScale: 150.0,
    windowGet: null,
    windowSet: null,
    levelGet: null,
    levelSet: null,
  }
  independentComponents = true

  imageUIGroup = null
  croppingWidget = null
  addCroppingPlanesChangedHandler = () => {}
  addResetCropHandler = () => {}

  @observable colorMaps = null
  @observable colorRanges = []
  @observable opacityGaussians = []

  @observable blendMode = 0
  @observable useShadow = true
  @observable slicingPlanesEnabled = false
  @observable gradientOpacity = 0.2
  @observable volumeSampleDistance = 0.25
  @observable xSlice = null
  @observable ySlice = null
  @observable zSlice = null

  @observable.ref labelMap = null
  @observable.ref multiscaleLabelMap = null

  // @observable fusingImages = false

  @computed get fusedImageLabelMap() {
    const image = this.image
    const labelMap = this.labelMap

    if (!!!image && !!!labelMap) {
      return null
    }
    if (!!!image) {
      return labelMap
    }

    if (this.visualizedComponents.length === 0) {
      return null
    } else if (!!labelMap && this.visualizedComponents.length === 4) {
      return null
    }

    const imageScalars = image.getPointData().getScalars()
    const imageData = imageScalars.getData()
    const imageComponents = imageScalars.getNumberOfComponents()

    this.totalIntensityComponents = imageComponents

    if (!!!labelMap && imageComponents <= 4) {
      return image
    }

    const visualizedComponents = this.visualizedComponents.map(idx => idx)

    const fusedImage = vtkImageData.newInstance()
    fusedImage.setOrigin(image.getOrigin())
    fusedImage.setSpacing(image.getSpacing())
    fusedImage.setDirection(image.getDirection())
    const imageDimensions = image.getDimensions()

    if (!!labelMap) {
      const labelMapDimensions = labelMap.getDimensions()
      const dimensionsEqual = imageDimensions.every((dim, index) => {
        return labelMapDimensions[index] === dim
      })
      if (!dimensionsEqual) {
        console.error(
          `Dimensions not equal! Not fusing. Image: ${imageDimensions} Label map: ${labelMapDimensions}`
        )
        return image
      }
    }

    const numVisualizedComponents = this.visualizedComponents.length

    fusedImage.setDimensions(image.getDimensions())

    const imageTuples = imageScalars.getNumberOfTuples()

    let labelMapScalars = null
    let labelMapData = null

    if (!!labelMap) {
      labelMapScalars = labelMap.getPointData().getScalars()
      labelMapData = labelMapScalars.getData()
      visualizedComponents.push(-1)
    }

    const fusedImageComponents = labelMapData
      ? numVisualizedComponents + 1
      : numVisualizedComponents

    const length = imageTuples * fusedImageComponents

    // We only need to construct a new typed array if we don't already
    // have one of the right length.
    if (!!!this.fusedImageData || this.fusedImageData.length !== length) {
      this.fusedImageData = new imageData.constructor(length)
    }

    const copyStructure = []

    // Loop through comparing to last time and check which components need
    // to be copied into fusedImageData.  This loop doesn't include the
    // labelmap componentm, it will be checked next.
    for (let i = 0; i < numVisualizedComponents; i++) {
      if (visualizedComponents[i] !== this.lastVisualizedComponents[i]) {
        copyStructure.push({
          srcImageData: imageData,
          imageComponents: imageComponents,
          copyFromComponent: this.visualizedComponents[i],
          copyToComponent: i,
        })
      }
    }

    // Check if we need to re-copy the labelmap component
    if (
      visualizedComponents[numVisualizedComponents] === -1 &&
      this.lastVisualizedComponents[numVisualizedComponents] !== -1
    ) {
      copyStructure.push({
        srcImageData: labelMapData,
        imageComponents: 1,
        copyFromComponent: 0,
        copyToComponent: numVisualizedComponents,
      })
    }

    // console.log(`Copying ${copyStructure.length} components into fused image`)

    let fusedIndex = 0
    let imageIndex = 0
    for (let tuple = 0; tuple < imageTuples; tuple++) {
      for (let cIdx = 0; cIdx < copyStructure.length; cIdx++) {
        imageIndex =
          tuple * copyStructure[cIdx].imageComponents +
          copyStructure[cIdx].copyFromComponent
        fusedIndex =
          tuple * fusedImageComponents + copyStructure[cIdx].copyToComponent
        this.fusedImageData[fusedIndex] =
          copyStructure[cIdx].srcImageData[imageIndex]
      }
    }

    const fusedImageScalars = vtkDataArray.newInstance({
      name: imageScalars.getName() || 'Scalars',
      values: this.fusedImageData,
      numberOfComponents: fusedImageComponents,
    })

    fusedImage.getPointData().setScalars(fusedImageScalars)
    this.lastVisualizedComponents = visualizedComponents.map(idx => idx)
    return fusedImage
  }

  @computed get haveOnlyLabelMap() {
    return (
      (!!this.labelMap || !!this.multiscaleLabelMap) &&
      !!!this.image &&
      !!!this.multiscaleImage
    )
  }
  @computed get haveLabelMap() {
    return !!this.labelMap || !!this.multiscaleLabelMap
  }

  labelMapColorUIGroup = null
  labelMapLookupTableProxy = null
  // Sorted array of label values
  labelMapLabels = null
  piecewiseFunction = null

  @observable lastPickedValues = {}

  @observable labelMapBlend = 0.5
  @observable labelMapLookupTable = 'glasbey'

  @observable labelMapWeights = []
  @observable labelMapToggleWeight = 0.1
  @observable selectedLabel = 'all'

  planeIndexUIGroup = null

  distanceWidget = null
  distanceUpdateInProgress = false
  distanceEnabled = false

  @observable distancePoint1 = 0.0
  @observable distancePoint2 = 0.0
}

class GeometriesUIStore {
  constructor(eventEmitter) {
    this.eventEmitter = eventEmitter
  }

  eventEmitter = null

  @observable.shallow geometries = []

  initialized = false
  sources = []
  representationProxies = []

  @observable selectedGeometryIndex = 0
  @observable names = []
  @observable representations = []
  @observable colorMaps = []
  @observable colorBy = []
  @observable colors = []
  @observable opacities = []
  @observable colorRanges = new Map()
  colorRangesReactions = new Map()
  @computed get hasScalars() {
    return this.geometries.map(geometry => {
      const pointDataScalars = !!geometry.getPointData().getScalars()
      const cellDataScalars = !!geometry.getCellData().getScalars()

      return pointDataScalars || cellDataScalars
    })
  }
  @computed get hasOnlyDirectColors() {
    return this.geometries.map(geometry => {
      const pointDataScalars = geometry.getPointData().getScalars()
      const pointDataDirectColors =
        !!pointDataScalars &&
        pointDataScalars.getDataType() === VtkDataTypes.UNSIGNED_CHAR &&
        pointDataScalars.getNumberOfComponents() === 3
      const cellDataScalars = geometry.getCellData().getScalars()
      const cellDataDirectColors =
        !!cellDataScalars &&
        cellDataScalars.getDataType() === VtkDataTypes.UNSIGNED_CHAR &&
        cellDataScalars.getNumberOfComponents() === 3

      return pointDataDirectColors && cellDataDirectColors
    })
  }
  @computed get colorByOptions() {
    return this.geometries.map((geometry, index) => {
      if (!this.hasScalars[index]) {
        return null
      }
      const options = [].concat(
        geometry
          .getPointData()
          .getArrays()
          .map(a => ({
            label: `Points: ${a.getName()}`,
            value: `pointData:${a.getName()}`,
          })),
        geometry
          .getCellData()
          .getArrays()
          .map(a => ({
            label: `Cells: ${a.getName()}`,
            value: `cellData:${a.getName()}`,
          }))
      )
      return options
    })
  }
  @computed get colorByDefault() {
    return this.geometries.map((geometry, index) => {
      if (!this.hasScalars[index]) {
        return null
      }
      const pointData = geometry.getPointData()
      if (!!pointData.getScalars()) {
        const activeIndex = pointData.getActiveScalars()
        const activeArray = pointData.getArrays()[activeIndex]
        return observable({
          label: `Points: ${activeArray.getName()}`,
          value: `pointData:${activeArray.getName()}`,
        })
      }
      const cellData = geometry.getCellData()
      if (!!cellData.getScalars()) {
        const activeIndex = cellData.getActiveScalars()
        const activeArray = cellData.getArrays()[activeIndex]
        return observable({
          label: `Cells: ${activeArray.getName()}`,
          value: `cellData:${activeArray.getName()}`,
        })
      }
      throw new Error('Should not reach here.')
    })
  }
  @computed get selectedColorRange() {
    const geometryIndex = this.selectedGeometryIndex
    if (!this.hasScalars[geometryIndex]) {
      return null
    }
    const colorByKey = this.colorBy[geometryIndex].value
    return this.colorRanges.get(geometryIndex).get(colorByKey)
  }
  @computed get selectedLookupTableProxy() {
    const geometryIndex = this.selectedGeometryIndex
    if (!this.hasScalars[geometryIndex]) {
      return null
    }
    const proxy = this.representationProxies[geometryIndex]
    const [colorByArrayName, location] = proxy.getColorBy()
    return proxy.getLookupTableProxy(colorByArrayName, location)
  }
}

class PointSetsUIStore {
  constructor(eventEmitter) {
    this.eventEmitter = eventEmitter
  }

  eventEmitter = null

  @observable.shallow pointSets = []

  initialized = false
  sources = []
  representationProxies = []

  @observable selectedPointSetIndex = 0
  @observable names = []
  @observable representations = []
  @observable colorMaps = []
  @observable colorBy = []
  @observable colors = []
  @observable opacities = []
  @observable sizes = []
  @observable colorRanges = new Map()
  colorRangesReactions = new Map()

  lengthPixelRatio = 0.1

  @computed get hasScalars() {
    return this.pointSets.map(pointSet => {
      const pointData = pointSet.getPointData()
      const hasPointDataScalars = !!pointData.getScalars()
      return hasPointDataScalars
    })
  }
  @computed get colorByOptions() {
    return this.pointSets.map((pointSet, index) => {
      if (!this.hasScalars[index]) {
        return null
      }
      const options = [].concat(
        pointSet
          .getPointData()
          .getArrays()
          .map(a => ({
            label: `${a.getName()}`,
            value: `pointData:${a.getName()}`,
          }))
      )
      return options
    })
  }
  @computed get colorByDefault() {
    return this.pointSets.map((pointSet, index) => {
      if (!this.hasScalars[index]) {
        return null
      }
      const pointData = pointSet.getPointData()
      if (!!pointData.getScalars()) {
        const activeIndex = pointData.getActiveScalars()
        const activeArray = pointData.getArrays()[activeIndex]
        return {
          label: `${activeArray.getName()}`,
          value: `pointData:${activeArray.getName()}`,
        }
      }
      throw new Error('Should not reach here.')
    })
  }
  @computed get selectedColorRange() {
    const selectedIndex = this.selectedPointSetIndex
    if (!this.hasScalars[selectedIndex]) {
      return null
    }
    const colorByKey = this.colorBy[selectedIndex].value
    return this.colorRanges.get(selectedIndex).get(colorByKey)
  }
  @computed get selectedLookupTableProxy() {
    const selectedIndex = this.selectedPointSetIndex
    if (!this.hasScalars[selectedIndex]) {
      return null
    }
    const proxy = this.representationProxies[selectedIndex]
    const [colorByArrayName, location] = proxy.getColorBy()
    return proxy.getLookupTableProxy(colorByArrayName, location)
  }
}

class ViewerStore {
  constructor(proxyManager) {
    this.eventEmitter = new EventEmitter()

    this.mainUI = new MainUIStore(this.eventEmitter)
    this.imageUI = new ImageUIStore(this.eventEmitter)
    this.geometriesUI = new GeometriesUIStore(this.eventEmitter)
    this.pointSetsUI = new PointSetsUIStore(this.eventEmitter)

    this.id =
      'itk-vtk-viewer-' +
      performance
        .now()
        .toString()
        .replace('.', '')
    this.proxyManager = proxyManager
    this.itkVtkView = proxyManager.createProxy('Views', 'ItkVtkView')
    this.container = document.createElement('div')
    this.itkVtkView.setContainer(this.container)

    //this.imageUI.source = proxyManager.createProxy(
    //'Sources',
    //'TrivialProducer',
    //{ name: 'Image' }
    //)
  }

  eventEmitter = null
  container = null
  id = 'itk-vtk-viewer'
  proxyManager = null
  itkVtkView = null
  get renderWindow() {
    return this.itkVtkView.getRenderWindow()
  }

  @computed get isBackgroundDark() {
    const backgroundColor = this.style.backgroundColor
    return backgroundColor[0] + backgroundColor[1] + backgroundColor[2] < 1.5
  }

  @observable style = {
    backgroundColor: [0.5, 0.5, 0.5],
    containerStyle: STYLE_RENDERING_VIEW_CONTAINER,
  }

  mainUI = null
  imageUI = null
  geometriesUI = null
  pointSetsUI = null
}

export default ViewerStore
