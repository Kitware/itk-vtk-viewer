import { observable, computed } from 'mobx'

import vtkImageData from 'vtk.js/Sources/Common/DataModel/ImageData'
import vtkDataArray from 'vtk.js/Sources/Common/Core/DataArray'

const STYLE_CONTAINER = {
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
  @observable fullscreenEnabled = false
  @observable rotateEnabled = false
  @observable interpolationEnabled = true
  @observable croppingPlanesEnabled = false

  @observable viewMode = 'VolumeRendering'
  xPlaneButton = null
  yPlaneButton = null
  zPlaneButton = null
  volumeRenderingButton = null

  fps = [60, 60, 60]
  @observable fpsTooLow = false
  fpsMonitor = null
}

class ImageUIStore {
  @observable.ref image = null
  @observable.ref multiscaleImage = null

  source = null
  @observable.ref representationProxy = null

  @observable selectedComponentIndex = 0
  // Does not include the label map
  @computed get numberOfComponents() {
    if (!!!this.image) {
      return 0
    }
    const dataArray = this.image.getPointData().getScalars()
    return dataArray.getNumberOfComponents()
  }

  lookupTableProxies = []
  piecewiseFunctionProxies = []
  @observable componentVisibilities = []
  transferFunctionWidget = null
  independentComponents = true

  croppingWidget = null
  addCroppingPlanesChangedHandler = () => {}
  addResetCropHandler = () => {}

  @observable colorMaps = null
  @observable colorRanges = []
  opacityGaussians = []

  @observable blendMode = 0
  @observable useShadow = true
  @observable slicingPlanesEnabled = false
  @observable gradientOpacity = 0.2
  @observable xSlice = null
  @observable ySlice = null
  @observable zSlice = null

  @observable.ref labelMap = null
  @observable.ref multiscaleLabelMap = null
  @computed get fusedImageLabelMap() {
    const image = this.image
    const labelMap = this.labelMap

    if (!!!image && !!!labelMap) {
      return null
    }
    if (!!!image) {
      return labelMap
    }
    if (!!!labelMap) {
      return image
    }
    const fusedImage = vtkImageData.newInstance()
    fusedImage.setOrigin(image.getOrigin())
    fusedImage.setSpacing(image.getSpacing())
    fusedImage.setDirection(image.getDirection())
    const imageDimensions = image.getDimensions()
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
    fusedImage.setDimensions(image.getDimensions())

    const imageScalars = image.getPointData().getScalars()
    const imageData = imageScalars.getData()
    const imageComponents = imageScalars.getNumberOfComponents()
    const imageTuples = imageScalars.getNumberOfTuples()
    const labelMapScalars = labelMap.getPointData().getScalars()
    const labelMapData = labelMapScalars.getData()

    const fusedImageComponents = imageComponents + 1

    const length = imageTuples * fusedImageComponents
    const fusedImageData = new imageData.constructor(length)

    let fusedIndex = 0
    let imageIndex = 0
    let labelMapIndex = 0
    for (let tuple = 0; tuple < imageTuples; tuple++) {
      for (let component = 0; component < imageComponents; component++) {
        fusedImageData[fusedIndex++] = imageData[imageIndex++]
      }
      fusedImageData[fusedIndex++] = labelMapData[labelMapIndex++]
    }

    const fusedImageScalars = vtkDataArray.newInstance({
      name: imageScalars.getName() || 'Scalars',
      values: fusedImageData,
      numberOfComponents: fusedImageComponents,
    })

    fusedImage.getPointData().setScalars(fusedImageScalars)
    return fusedImage
  }

  labelMapLookupTableProxy = null
  // Sorted array of label values
  labelMapLabels = null
  piecewiseFunction = null

  @observable labelMapOpacity = 0.75
  @observable labelMapCategoricalColor = 'glasbey'

  distanceWidget = null
  distanceUpdateInProgress = false
  distanceEnabled = false

  @observable distancePoint1 = 0.0
  @observable distancePoint2 = 0.0
}

class GeometriesUIStore {
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
      const pointData = geometry.getPointData()
      const hasPointDataScalars = !!pointData.getScalars()
      const cellData = geometry.getCellData()
      const hasCellDataScalars = !!cellData.getScalars()
      return hasPointDataScalars || hasCellDataScalars
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
    this.mainUI = new MainUIStore()
    this.imageUI = new ImageUIStore()
    this.geometriesUI = new GeometriesUIStore()
    this.pointSetsUI = new PointSetsUIStore()

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

    this.itkVtkView.setBackground(this.style.backgroundColor)

    this.imageUI.source = proxyManager.createProxy(
      'Sources',
      'TrivialProducer',
      { name: 'Image' }
    )
  }

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
    backgroundColor: [0, 0, 0],
    containerStyle: STYLE_CONTAINER,
  }

  mainUI = null
  imageUI = null
  geometriesUI = null
  pointSetsUI = null
}

export default ViewerStore
