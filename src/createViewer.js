import { inspect } from '@xstate/inspect'
import { interpret } from 'xstate'

import vtkProxyManager from 'vtk.js/Sources/Proxy/Core/ProxyManager'

import ResizeSensor from 'css-element-queries/src/ResizeSensor'

import proxyConfiguration from './Rendering/VTKJS/proxyManagerConfiguration'
import UserInterface from './UserInterface'
import addKeyboardShortcuts from './UI/addKeyboardShortcuts'
import rgb2hex from './UserInterface/rgb2hex'
import hex2rgb from './UserInterface/hex2rgb'
import ViewerStore from './ViewerStore'

import toMultiscaleSpatialImage from './IO/toMultiscaleSpatialImage'
import viewerMachineOptions from './viewerMachineOptions'
import createViewerMachine from './createViewerMachine'
import ViewerMachineContext from './Context/ViewerMachineContext'
import {
  addCroppingPlanes,
  updateCroppingParameters,
} from './Rendering/VTKJS/Main/croppingPlanes'

import { reaction, toJS } from 'mobx'
import PQueue from 'p-queue'

const createViewer = async (
  rootContainer,
  {
    image,
    imageName = undefined,
    labelImage,
    fixedImage,
    compare,
    geometries,
    pointSets,
    use2D = undefined, // if undefined, use image dimension if exists
    rotate = true,
    config,
    gradientOpacity,
  }
) => {
  UserInterface.emptyContainer(rootContainer)
  if (!UserInterface.checkForWebGL(rootContainer)) {
    throw new Error('WebGL could not be loaded.')
  }

  const proxyManager = vtkProxyManager.newInstance({ proxyConfiguration })
  window.addEventListener('resize', proxyManager.resizeAllViews)

  const store = new ViewerStore(proxyManager)

  const publicAPI = {}

  const debug = false
  if (debug) {
    //const stateIFrame = document.createElement('iframe')
    //store.container.style.height = '50%'
    //stateIFrame.style.height = '50%'
    //rootContainer.appendChild(stateIFrame)
    inspect({
      //iframe: stateIFrame,
      iframe: false,
    })
  }

  const eventEmitter = store.eventEmitter

  function eventEmitterCallback(context /*, event*/) {
    return (callback, onReceive) => {
      onReceive(event => {
        switch (event.type) {
          case 'SET_BACKGROUND_COLOR':
            eventEmitter.emit('backgroundColorChanged', event.data)
            break
          case 'TOGGLE_BACKGROUND_COLOR':
            eventEmitter.emit(
              'backgroundColorChanged',
              context.main.backgroundColor
            )
            break
          case 'TOGGLE_FULLSCREEN':
            eventEmitter.emit(
              'toggleFullscreen',
              publicAPI.getFullscreenEnabled()
            )
            break
          case 'TOGGLE_UI_COLLAPSED':
            eventEmitter.emit('toggleUICollapsed', event.data)
            break
          case 'TOGGLE_ROTATE':
            eventEmitter.emit('toggleRotate', event.data)
            break
          case 'TOGGLE_ANNOTATIONS':
            eventEmitter.emit(
              'toggleAnnotations',
              publicAPI.getAnnotationsEnabled()
            )
            break
          case 'TOGGLE_AXES':
            eventEmitter.emit('toggleAxes', event.data)
            break
          case 'TOGGLE_IMAGE_INTERPOLATION':
            eventEmitter.emit('toggleImageInterpolation', event.data)
            break
          case 'TOGGLE_CROPPING_PLANES':
            eventEmitter.emit('toggleCroppingPlanes', event.data)
            break
          case 'RESET_CROPPING_PLANES':
            eventEmitter.emit('resetCroppingPlanes', event.data)
            break
          case 'CROPPING_PLANES_CHANGED':
            eventEmitter.emit('croppingPlanesChanged', event.data)
            break
          case 'VIEW_MODE_CHANGED':
            eventEmitter.emit('viewModeChanged', event.data)
            break
          case 'TOGGLE_LAYER_VISIBILITY':
            eventEmitter.emit('toggleLayerVisibility', event.data)
            break
          case 'RENDERED_IMAGE_ASSIGNED':
            eventEmitter.emit('renderedImageAssigned', event.data)
            break
          case 'IMAGE_COMPONENT_VISIBILITY_CHANGED':
            eventEmitter.emit('imageVisualizedComponentChanged', event.data)
            break
          case 'IMAGE_PIECEWISE_FUNCTION_GAUSSIANS_CHANGED':
            eventEmitter.emit(
              'imagePiecewiseFunctionGaussiansChanged',
              event.data
            )
            break
          case 'IMAGE_PIECEWISE_FUNCTION_POINTS_CHANGED':
            eventEmitter.emit('imagePiecewiseFunctionPointsChanged', event.data)
            break
          case 'IMAGE_COLOR_RANGE_CHANGED':
            eventEmitter.emit('imageColorRangeChanged', event.data)
            break
          case 'IMAGE_COLOR_RANGE_BOUNDS_CHANGED':
            eventEmitter.emit('imageColorRangeBoundsChanged', event.data)
            break
          case 'IMAGE_COLOR_MAP_CHANGED':
            eventEmitter.emit('imageColorMapChanged', event.data)
            break
          case 'TOGGLE_IMAGE_SHADOW':
            eventEmitter.emit('toggleImageShadow', event.data)
            break
          case 'IMAGE_GRADIENT_OPACITY_CHANGED':
            eventEmitter.emit('imageGradientOpacityChanged', event.data)
            break
          case 'IMAGE_GRADIENT_OPACITY_SCALE_CHANGED':
            eventEmitter.emit('imageGradientOpacityScaleChanged', event.data)
            break
          case 'IMAGE_VOLUME_SAMPLE_DISTANCE_CHANGED':
            eventEmitter.emit('imageVolumeSampleDistanceChanged', event.data)
            break
          case 'IMAGE_BLEND_MODE_CHANGED':
            eventEmitter.emit('imageBlendModeChanged', event.data)
            break
          case 'LABEL_IMAGE_LOOKUP_TABLE_CHANGED':
            eventEmitter.emit('labelImageLookupTableChanged', event.data)
            break
          case 'LABEL_IMAGE_BLEND_CHANGED':
            eventEmitter.emit('labelImageBlendChanged', event.data)
            break
          case 'LABEL_IMAGE_WEIGHTS_CHANGED':
            eventEmitter.emit('labelImageWeightsChanged', event.data)
            break
          case 'LABEL_IMAGE_LABEL_NAMES_CHANGED':
            eventEmitter.emit('labelImageLabelNamesChanged', event.data)
            break
          case 'X_SLICE_CHANGED':
            eventEmitter.emit('xSliceChanged', event.data)
            break
          case 'Y_SLICE_CHANGED':
            eventEmitter.emit('ySliceChanged', event.data)
            break
          case 'Z_SLICE_CHANGED':
            eventEmitter.emit('zSliceChanged', event.data)
            break
          case 'SCREENSHOT_TAKEN':
            eventEmitter.emit('screenshotTaken', event.data)
            break
          case 'TAKE_SCREENSHOT':
            break
          case 'SAVE_ROI':
            eventEmitter.emit('saveRoi', event.data)
            break
          default:
            throw new Error(`Unexpected event type: ${event.type}`)
        }
      })
    }
  }

  const context = new ViewerMachineContext(config)
  const options = { ...viewerMachineOptions }
  if (context.uiMachineOptions !== 'reference') {
    const uiMachineOptions = context.uiMachineOptions
    if (uiMachineOptions.href) {
      const loadedUIMachineOptions = await import(
        /* webpackIgnore: true */
        uiMachineOptions.href
      )
      if (uiMachineOptions.export) {
        options.ui = loadedUIMachineOptions[uiMachineOptions.export]
      } else {
        options.ui = loadedUIMachineOptions.default
      }
    } else if (context.uiMachineOptions === 'pydata-sphinx') {
      options.ui = {
        href:
          'https://cdn.jsdelivr.net/npm/itk-viewer-bootstrap-ui@0/dist/bootstrapUIMachineOptions.js.es.js',
        export: 'default',
      }
    } else if (context.uiMachineOptions === 'mui') {
      options.ui = {
        href:
          'https://cdn.jsdelivr.net/npm/itk-viewer-material-ui@0/dist/materialUIMachineOptions.js.es.js',
        export: 'default',
      }
    } else {
      options.ui = uiMachineOptions
    }
  }

  const imageMultiscale =
    image &&
    (await toMultiscaleSpatialImage(image, false, context.maxConcurrency))

  const labelImageMultiscale =
    labelImage &&
    (await toMultiscaleSpatialImage(labelImage, true, context.maxConcurrency))

  const imageOrLabelImage = imageMultiscale || labelImageMultiscale

  context.use2D =
    use2D ??
    Boolean(imageOrLabelImage && imageOrLabelImage.imageType.dimension === 2)

  context.rootContainer = rootContainer
  // Todo: move to viewer machine
  context.container = store.container
  // Todo: move to VTKJS/createRenderer
  context.itkVtkView = store.itkVtkView
  context.proxyManager = store.proxyManager
  context.renderWindow = store.renderWindow
  context.id = store.id
  const machine = createViewerMachine(options, context, eventEmitterCallback)
  const service = interpret(machine, { devTools: debug })
  context.service = service
  service.start()

  reaction(
    () =>
      !!store.geometriesUI.geometries && store.geometriesUI.geometries.slice(),
    geometries => {
      if (!geometries || geometries.length === 0) {
        return
      }

      geometries.forEach((geometry, index) => {
        if (store.geometriesUI.sources.length <= index) {
          const uid = `GeometrySource${index}`
          const geometrySource = proxyManager.createProxy(
            'Sources',
            'TrivialProducer',
            {
              name: uid,
            }
          )
          store.geometriesUI.sources.push(geometrySource)
          store.geometriesUI.sources[index].setInputData(geometry)
          proxyManager.createRepresentationInAllViews(geometrySource)
          const geometryRepresentation = proxyManager.getRepresentation(
            geometrySource,
            store.itkVtkView
          )
          store.geometriesUI.representationProxies.push(geometryRepresentation)

          addCroppingPlanes(context, geometryRepresentation)
        } else {
          store.geometriesUI.sources[index].setInputData(geometry)
          store.geometriesUI.representationProxies[index].setVisibility(true)
        }
      })
      updateCroppingParameters(context)

      if (geometries.length < store.geometriesUI.representationProxies.length) {
        const proxiesToDisable = store.geometriesUI.representationProxies.slice(
          geometries.length
        )
        proxiesToDisable.forEach(proxy => {
          proxy.setVisibility(false)
        })
      }

      if (!store.geometriesUI.initialized) {
        UserInterface.createGeometriesUI(store, context.uiContainer)
      }
      store.geometriesUI.names = geometries.map(
        (geometry, index) => `Geometry ${index}`
      )
      let representations = store.geometriesUI.representations.slice(
        0,
        geometries.length
      )
      const defaultGeometryRepresentations = new Array(geometries.length)
      defaultGeometryRepresentations.fill('Surface')
      representations.concat(
        defaultGeometryRepresentations.slice(
          0,
          geometries.length - representations.length
        )
      )
      store.geometriesUI.representations = representations
    }
  )
  store.geometriesUI.geometries = geometries

  reaction(
    () => !!store.pointSetsUI.pointSets && store.pointSetsUI.pointSets.slice(),
    pointSets => {
      if (!pointSets || pointSets.length === 0) {
        return
      }

      pointSets.forEach((pointSet, index) => {
        if (store.pointSetsUI.sources.length <= index) {
          const uid = `PointSetSource${index}`
          const pointSetSource = proxyManager.createProxy(
            'Sources',
            'TrivialProducer',
            {
              name: uid,
            }
          )
          store.pointSetsUI.sources.push(pointSetSource)
          store.pointSetsUI.sources[index].setInputData(pointSet)
          const pointSetRepresentationUid = `pointSetRepresentation${index}`
          const pointSetRepresentation = proxyManager.createProxy(
            'Representations',
            'PointSet',
            {
              name: pointSetRepresentationUid,
            }
          )
          pointSetRepresentation.setInput(pointSetSource)
          pointSetRepresentation.setRadiusFactor(
            store.pointSetsUI.lengthPixelRatio
          )
          store.itkVtkView.addRepresentation(pointSetRepresentation)
          store.pointSetsUI.representationProxies.push(pointSetRepresentation)

          addCroppingPlanes(context, pointSetRepresentation)
        } else {
          store.pointSetsUI.sources[index].setInputData(pointSet)
          store.pointSetsUI.representationProxies[index].setVisibility(true)
        }
      })
      updateCroppingParameters(context)

      if (pointSets.length < store.pointSetsUI.representationProxies.length) {
        const proxiesToDisable = store.pointSetsUI.representationProxies.slice(
          pointSets.length
        )
        proxiesToDisable.forEach(proxy => {
          proxy.setVisibility(false)
        })
      }

      if (!store.pointSetsUI.initialized) {
        UserInterface.createPointSetsUI(store, context.uiContainer)
      }
    }
  )
  store.pointSetsUI.pointSets = pointSets

  store.itkVtkView.resize()
  // eslint-disable-next-line no-unused-vars
  const resizeSensor = new ResizeSensor(store.container, function() {
    store.itkVtkView.resize()
  })
  proxyManager.renderAllViews()

  setTimeout(() => {
    store.itkVtkView.resetCamera()

    // Estimate a reasonable point sphere radius in pixels
    const lengthPixelRatio = store.itkVtkView.getLengthPixelRatio()
    store.pointSetsUI.lengthPixelRatio = lengthPixelRatio
    store.pointSetsUI.representationProxies.forEach(proxy => {
      proxy.setRadiusFactor(lengthPixelRatio)
    })
  }, 1)

  UserInterface.addLogo(store)

  publicAPI.render = () => {
    service.send('RENDER')
  }

  // The `store` is considered an internal implementation detail
  // and its interface and behavior may change without changes to the major version.
  publicAPI.getStore = () => {
    return store
  }

  publicAPI.setPointSets = pointSets => {
    store.pointSetsUI.pointSets = pointSets
  }

  publicAPI.setGeometries = geometries => {
    store.geometriesUI.geometries = geometries
  }

  const eventNames = [
    'toggleUICollapsed',
    'backgroundColorChanged',
    'toggleFullscreen',
    'toggleAnnotations',
    'toggleAxes',
    'toggleRotate',
    'toggleCroppingPlanes',
    'croppingPlanesChanged',
    'resetCroppingPlanes',
    'viewModeChanged',
    'xSliceChanged',
    'ySliceChanged',
    'zSliceChanged',
    'toggleLayerVisibility',
    'imagePicked',
    'imagePiecewiseFunctionGaussiansChanged',
    'imagePiecewiseFunctionPointsChanged',
    'imageVisualizedComponentChanged',
    'toggleImageInterpolation',
    'imageColorRangeChanged',
    'imageColorRangeBoundsChanged',
    'imageColorMapChanged',
    'toggleImageShadow',
    'imageGradientOpacityChanged',
    'imageGradientOpacityScaleChanged',
    'imageVolumeSampleDistanceChanged',
    'imageBlendModeChanged',
    'labelImageLookupTableChanged',
    'labelImageBlendChanged',
    'labelImageLabelNamesChanged',
    'labelImageWeightsChanged',
    'pointSetColorChanged',
    'pointSetOpacityChanged',
    'pointSetSizeChanged',
    'pointSetRepresentationChanged',
    'screenshotTaken',
  ]

  publicAPI.getEventNames = () => eventNames

  publicAPI.on = (...onArgs) => eventEmitter.on(...onArgs)
  publicAPI.off = (...offArgs) => eventEmitter.off(...offArgs)
  publicAPI.once = (...onceArgs) => eventEmitter.once(...onceArgs)

  publicAPI.getEventEmitter = () => eventEmitter

  publicAPI.getConfig = () => {
    return context.getConfig()
  }

  publicAPI.setUICollapsed = collapse => {
    if (collapse !== context.uiCollapsed) {
      service.send('TOGGLE_UI_COLLAPSED')
    }
  }

  publicAPI.getUICollapsed = () => {
    return context.uiCollapsed
  }

  publicAPI.setRenderingViewContainerStyle = containerStyle => {
    service.send({
      type: 'STYLE_RENDERING_VIEW_CONTAINER',
      data: containerStyle,
    })
  }

  publicAPI.getRenderingViewContainerStyle = () => {
    return { ...context.renderingViewContainerStyle }
  }

  reaction(
    () => {
      return store.imageUI.lastPickedValues
    },
    () => {
      const lastPickedValues = store.imageUI.lastPickedValues
      eventEmitter.emit('imagePicked', toJS(lastPickedValues))
    }
  )

  publicAPI.setBackgroundColor = bgColor => {
    service.send({ type: 'SET_BACKGROUND_COLOR', data: bgColor })
  }

  publicAPI.getBackgroundColor = () => {
    return context.main.backgroundColor.slice()
  }

  publicAPI.setUnits = units => {
    service.send({ type: 'SET_UNITS', data: units })
  }

  publicAPI.getUnits = () => {
    return context.main.units
  }

  // Gaussians not supported
  publicAPI.setImagePiecewiseFunctionGaussians = (
    gaussians,
    component,
    name
  ) => {
    if (typeof name === 'undefined') {
      name = context.images.selectedName
    }
    if (typeof component === 'undefined') {
      component = 0
    }
    service.send({
      type: 'IMAGE_PIECEWISE_FUNCTION_GAUSSIANS_CHANGED',
      data: { name, component, gaussians },
    })
  }

  // Gaussians not supported
  publicAPI.getImagePiecewiseFunctionGaussians = (component, name) => {
    if (typeof name === 'undefined') {
      name = context.images.selectedName
    }
    if (typeof component === 'undefined') {
      component = 0
    }
    const actorContext = context.images.actorContext.get(name)
    return actorContext.piecewiseFunctionGaussians.get(component)
  }

  publicAPI.setImagePiecewiseFunctionPoints = (points, component, name) => {
    if (typeof name === 'undefined') {
      name = context.images.selectedName
    }
    if (typeof component === 'undefined') {
      component = 0
    }
    service.send({
      type: 'IMAGE_PIECEWISE_FUNCTION_POINTS_CHANGED',
      data: { name, component, points },
    })
  }

  publicAPI.getImagePiecewiseFunctionPoints = (component, name) => {
    if (typeof name === 'undefined') {
      name = context.images.selectedName
    }
    if (typeof component === 'undefined') {
      component = 0
    }
    const actorContext = context.images.actorContext.get(name)
    return actorContext.piecewiseFunctionPoints.get(component)
  }

  // Start collapsed on mobile devices or small pages
  if (
    (config &&
      typeof config.uiCollapsed !== 'undefined' &&
      window.screen.availWidth < 768) ||
    window.screen.availHeight < 800
  ) {
    publicAPI.setUICollapsed(true)
  }

  publicAPI.captureImage = () => {
    return store.itkVtkView.captureImage()
  }

  publicAPI.setAnnotationsEnabled = enabled => {
    if (enabled !== context.main.annotationsEnabled) {
      service.send('TOGGLE_ANNOTATIONS')
    }
  }

  publicAPI.getAnnotationsEnabled = () => {
    return context.main.annotationsEnabled
  }

  publicAPI.setAxesEnabled = enabled => {
    if (enabled !== context.main.axesEnabled) {
      service.send('TOGGLE_AXES')
    }
  }

  publicAPI.getAxesEnabled = () => {
    return context.main.axesEnabled
  }

  publicAPI.setRotateEnabled = enabled => {
    if (enabled !== context.main.rotateEnabled) {
      service.send('TOGGLE_ROTATE')
    }
  }

  publicAPI.getRotateEnabled = () => {
    return context.main.rotateEnabled
  }

  publicAPI.setFullscreenEnabled = enabled => {
    if (enabled !== context.main.fullscreenEnabled) {
      service.send('TOGGLE_FULLSCREEN')
    }
  }

  publicAPI.getFullscreenEnabled = () => {
    return context.main.fullscreenEnabled
  }

  publicAPI.setViewMode = mode => {
    if (mode !== context.main.viewMode) {
      service.send({ type: 'VIEW_MODE_CHANGED', data: mode })
    }
  }

  publicAPI.getViewMode = () => {
    return context.main.viewMode
  }

  publicAPI.setXSlice = position => {
    service.send({
      type: 'X_SLICE_CHANGED',
      data: position,
    })
  }

  publicAPI.getXSlice = () => {
    return context.main.xSlice
  }

  publicAPI.setYSlice = position => {
    service.send({
      type: 'Y_SLICE_CHANGED',
      data: position,
    })
  }

  publicAPI.getYSlice = () => {
    return context.main.ySlice
  }

  publicAPI.setZSlice = position => {
    service.send({
      type: 'Z_SLICE_CHANGED',
      data: position,
    })
  }

  publicAPI.getZSlice = () => {
    return context.main.zSlice
  }

  publicAPI.getLayerNames = () => {
    return Array.from(context.layers.actorContext.keys())
  }

  publicAPI.setLayerVisibility = (visible, name) => {
    const actorContext = context.layers.actorContext.get(name)
    if (visible !== actorContext.visible) {
      context.service.send({ type: 'TOGGLE_LAYER_VISIBILITY', data: name })
    }
  }

  publicAPI.getLayerVisibility = name => {
    return context.layers.actorContext.get(name).visible
  }

  publicAPI.selectLayer = name => {
    context.service.send({ type: 'SELECT_LAYER', data: name })
  }

  // A shared API queue lets setCompareImage wait for setImage.
  // Otherwise imageActorContext setting events won't yet have a actor machine to receive them.
  const apiFunctionQueue = new PQueue({ concurrency: 1 })
  const queueApi = funcToQueue => (...args) =>
    apiFunctionQueue.add(() => funcToQueue(...args))

  // Queueing setImage syncs the order setImage(s) are called with the order image actorContexts are created, no matter the data passed.
  // Some images take longer with toMultiscaleSpatialImage, then get sent to state machine later, even if they were called with viewer.setImage first.
  // The last added image is the context.image.selectedImage
  publicAPI.setImage = queueApi(async (image, imageName) => {
    const name =
      imageName ?? image.name ?? context.images?.selectedName ?? 'Image'
    const multiscaleImage = await toMultiscaleSpatialImage(
      image,
      false,
      context.maxConcurrency
    )
    multiscaleImage.name = name
    if (context.images.actorContext.has(name)) {
      const actorContext = context.images.actorContext.get(name)
      actorContext.image = multiscaleImage
      service.send({ type: 'IMAGE_ASSIGNED', data: name })
    } else {
      service.send({ type: 'ADD_IMAGE', data: multiscaleImage })
    }
  })

  publicAPI.getImage = name => {
    if (typeof name === 'undefined' && context.images.selectedName) {
      name = context.images.selectedName
    }
    return context.images.actorContext.get(name).image
  }

  publicAPI.getImageInterpolationEnabled = name => {
    if (typeof name === 'undefined') {
      name = context.images.selectedName
    }
    const actorContext = context.images.actorContext.get(name)
    return actorContext.interpolationEnabled
  }

  publicAPI.setImageInterpolationEnabled = (enabled, name) => {
    if (typeof name === 'undefined') {
      name = context.images.selectedName
    }
    const currentEnabled = publicAPI.getImageInterpolationEnabled(name)
    if (enabled !== currentEnabled) {
      service.send({ type: 'TOGGLE_IMAGE_INTERPOLATION', data: name })
    }
  }

  publicAPI.setImageComponentVisibility = (visibility, component, name) => {
    if (typeof name === 'undefined') {
      name = context.images.selectedName
    }
    service.send({
      type: 'IMAGE_COMPONENT_VISIBILITY_CHANGED',
      data: { name, component, visibility },
    })
  }

  publicAPI.getImageComponentVisibility = (component, name) => {
    if (typeof name === 'undefined') {
      name = context.images.selectedName
    }
    const actorContext = context.images.actorContext.get(name)
    return actorContext.componentVisibilities[component]
  }

  publicAPI.setCroppingPlanesEnabled = enabled => {
    if (enabled !== context.main.croppingPlanesEnabled) {
      service.send('TOGGLE_CROPPING_PLANES')
    }
  }

  publicAPI.getCroppingPlanesEnabled = () => {
    return context.main.croppingPlanesEnabled
  }

  publicAPI.resetCroppingPlanes = () => {
    service.send('RESET_CROPPING_PLANES')
  }

  publicAPI.getCroppingPlanes = () => {
    return context.main.croppingPlanes
  }

  publicAPI.setCroppingPlanes = croppingPlanes => {
    service.send({
      type: 'CROPPING_PLANES_CHANGED',
      data: croppingPlanes,
    })
  }

  publicAPI.setImageColorRange = (range, component, name) => {
    if (typeof name === 'undefined') {
      name = context.images.selectedName
    }
    if (typeof component === 'undefined') {
      component = 0
    }
    const actorContext = context.images.actorContext.get(name)
    const currentRange = actorContext.colorRanges.get(component)
    if (
      typeof currentRange !== 'undefined' ||
      currentRange[0] !== range[0] ||
      currentRange[1] !== range[1]
    ) {
      service.send({
        type: 'IMAGE_COLOR_RANGE_CHANGED',
        data: { name, component, range },
      })
    }
  }

  publicAPI.getImageColorRange = (component, name) => {
    if (typeof name === 'undefined') {
      name = context.images.selectedName
    }
    if (typeof component === 'undefined') {
      component = 0
    }
    const actorContext = context.images.actorContext.get(name)
    return actorContext.colorRanges.get(component)
  }

  publicAPI.setImageColorRangeBounds = (range, component, name) => {
    if (typeof name === 'undefined') {
      name = context.images.selectedName
    }
    if (typeof component === 'undefined') {
      component = 0
    }
    const actorContext = context.images.actorContext.get(name)
    const currentRange = actorContext.colorRanges.get(component)
    if (
      typeof currentRange !== 'undefined' ||
      currentRange[0] !== range[0] ||
      currentRange[1] !== range[1]
    ) {
      service.send({
        type: 'IMAGE_COLOR_RANGE_BOUNDS_CHANGED',
        data: { name, component, range },
      })
    }
  }

  publicAPI.getImageColorRangeBounds = (component, name) => {
    if (typeof name === 'undefined') {
      name = context.images.selectedName
    }
    if (typeof component === 'undefined') {
      component = 0
    }
    const actorContext = context.images.actorContext.get(name)
    return actorContext.colorRangeBounds.get(component)
  }

  publicAPI.setImageColorMap = (colorMap, componentIndex, name) => {
    if (typeof name === 'undefined') {
      name = context.images.selectedName
    }
    if (typeof componentIndex === 'undefined') {
      componentIndex = 0
    }
    const actorContext = context.images.actorContext.get(name)
    const currentColorMap = actorContext.colorMaps.get(componentIndex)
    if (
      typeof currentColorMap !== 'undefined' ||
      currentColorMap[0] !== colorMap[0] ||
      currentColorMap[1] !== colorMap[1]
    ) {
      service.send({
        type: 'IMAGE_COLOR_MAP_CHANGED',
        data: { name, component: componentIndex, colorMap },
      })
    }
  }

  publicAPI.getImageColorMap = (componentIndex, name) => {
    if (typeof name === 'undefined') {
      name = context.images.selectedName
    }
    if (typeof componentIndex === 'undefined') {
      componentIndex = 0
    }
    const actorContext = context.images.actorContext.get(name)
    return actorContext.colorMaps.get(componentIndex)
  }

  publicAPI.setLabelImage = queueApi(async (labelImage, layerImageName) => {
    const multiscaleLabelImage = await toMultiscaleSpatialImage(
      labelImage,
      true,
      context.maxConcurrency
    )
    if (multiscaleLabelImage.name === 'Image') {
      multiscaleLabelImage.name = 'LabelImage'
    }

    const imageName =
      layerImageName ?? context.images.selectedName ?? multiscaleLabelImage.name
    const actorContext = context.images.actorContext.get(imageName)
    if (actorContext?.labelImageName === multiscaleLabelImage.name) {
      actorContext.labelImage = multiscaleLabelImage
      service.send({ type: 'LABEL_IMAGE_ASSIGNED', data: imageName })
    } else {
      service.send({
        type: 'ADD_LABEL_IMAGE',
        data: { imageName, labelImage: multiscaleLabelImage },
      })
    }
    publicAPI.setImageInterpolationEnabled(false, imageName)
  })

  publicAPI.getLabelImage = () => {
    const name = context.images.selectedName
    return context.images.actorContext.get(name).labelImage
  }

  publicAPI.setLabelImageLookupTable = (lookupTable, name) => {
    if (typeof name === 'undefined') {
      name = context.images.selectedName
    }
    const actorContext = context.images.actorContext.get(name)
    const currentLookupTable = actorContext.lookupTable
    if (currentLookupTable !== lookupTable) {
      service.send({
        type: 'LABEL_IMAGE_LOOKUP_TABLE_CHANGED',
        data: { name, lookupTable },
      })
    }
  }

  publicAPI.getLabelImageLookupTable = name => {
    if (typeof name === 'undefined') {
      name = context.images.selectedName
    }
    const actorContext = context.images.actorContext.get(name)
    return actorContext.lookupTable
  }

  publicAPI.setLabelImageBlend = (blend, name) => {
    if (typeof name === 'undefined') {
      name = context.images.selectedName
    }
    const actorContext = context.images.actorContext.get(name)
    const currentBlend = actorContext.labelImageBlend
    if (currentBlend !== blend) {
      service.send({
        type: 'LABEL_IMAGE_BLEND_CHANGED',
        data: { name, labelImageBlend: blend },
      })
    }
  }

  publicAPI.getLabelImageBlend = name => {
    if (typeof name === 'undefined') {
      name = context.images.selectedName
    }
    const actorContext = context.images.actorContext.get(name)
    return actorContext.labelImageBlend
  }

  publicAPI.setLabelImageLabelNames = (names, name) => {
    if (typeof name === 'undefined') {
      name = context.images.selectedName
    }
    const actorContext = context.images.actorContext.get(name)
    const currentLabelNames = actorContext.labelNames
    if (currentLabelNames !== names) {
      service.send({
        type: 'LABEL_IMAGE_LABEL_NAMES_CHANGED',
        data: { name, labelNames: names },
      })
    }
  }

  publicAPI.getLabelImageLabelNames = name => {
    if (typeof name === 'undefined') {
      name = context.images.selectedName
    }
    const actorContext = context.images.actorContext.get(name)
    return actorContext.labelNames
  }

  publicAPI.setLabelImageWeights = (weights, name) => {
    if (typeof name === 'undefined') {
      name = context.images.selectedName
    }
    const actorContext = context.images.actorContext.get(name)
    const currentWeights = actorContext.labelImageWeights
    if (currentWeights !== weights) {
      service.send({
        type: 'LABEL_IMAGE_WEIGHTS_CHANGED',
        data: { name, labelImageWeights: weights },
      })
    }
  }

  publicAPI.getLabelImageWeights = name => {
    if (typeof name === 'undefined') {
      name = context.images.selectedName
    }
    const actorContext = context.images.actorContext.get(name)
    return actorContext.labelImageWeights
  }

  // Moving image must have been added last.
  // See index.md for parameter docs.
  publicAPI.setCompareImages = queueApi(
    async (fixedImageName, movingImageName, options) => {
      service.send({
        type: 'COMPARE_IMAGES',
        data: {
          name: movingImageName,
          fixedImageName,
          options,
        },
      })
    }
  )

  publicAPI.getCompareImages = name => {
    if (typeof name === 'undefined') {
      name = context.images.selectedName
    }
    return context.images.actorContext.get(name).compare
  }

  publicAPI.setImageShadowEnabled = (enabled, name) => {
    if (typeof name === 'undefined') {
      name = context.images.selectedName
    }
    const actorContext = context.images.actorContext.get(name)
    if (enabled !== actorContext.shadowEnabled) {
      service.send({
        type: 'TOGGLE_IMAGE_SHADOW',
        data: name,
      })
    }
  }

  publicAPI.getImageShadowEnabled = name => {
    if (typeof name === 'undefined') {
      name = context.images.selectedName
    }
    const actorContext = context.images.actorContext.get(name)
    return actorContext.shadowEnabled
  }

  publicAPI.setImageGradientOpacity = (opacity, name) => {
    if (typeof name === 'undefined') {
      name = context.images.selectedName
    }
    service.send({
      type: 'IMAGE_GRADIENT_OPACITY_CHANGED',
      data: { name, gradientOpacity: opacity },
    })
  }

  publicAPI.getImageGradientOpacity = name => {
    if (typeof name === 'undefined') {
      name = context.images.selectedName
    }
    const actorContext = context.images.actorContext.get(name)
    return actorContext.gradientOpacity
  }

  publicAPI.setImageGradientOpacityScale = (min, name) => {
    if (typeof name === 'undefined') {
      name = context.images.selectedName
    }
    service.send({
      type: 'IMAGE_GRADIENT_OPACITY_SCALE_CHANGED',
      data: { name, gradientOpacityScale: min },
    })
  }

  publicAPI.getImageGradientOpacityScale = name => {
    if (typeof name === 'undefined') {
      name = context.images.selectedName
    }
    const actorContext = context.images.actorContext.get(name)
    return actorContext.gradientOpacityScale
  }

  publicAPI.setImageVolumeSampleDistance = (distance, name) => {
    if (typeof name === 'undefined') {
      name = context.images.selectedName
    }
    service.send({
      type: 'IMAGE_VOLUME_SAMPLE_DISTANCE_CHANGED',
      data: { name, volumeSampleDistance: distance },
    })
  }

  publicAPI.getImageVolumeSampleDistance = name => {
    if (typeof name === 'undefined') {
      name = context.images.selectedName
    }
    const actorContext = context.images.actorContext.get(name)
    return actorContext.volumeSampleDistance
  }

  publicAPI.setImageBlendMode = (mode, name) => {
    if (typeof name === 'undefined') {
      name = context.images.selectedName
    }
    service.send({
      type: 'IMAGE_BLEND_MODE_CHANGED',
      data: { name, blendMode: mode },
    })
  }

  publicAPI.getImageBlendMode = name => {
    if (typeof name === 'undefined') {
      name = context.images.selectedName
    }
    const actorContext = context.images.actorContext.get(name)
    return actorContext.blendMode
  }

  publicAPI.addPointSet = pointSet => {
    if (!store.pointSetsUI.pointSets) {
      store.pointSetsUI.pointSets = []
    }
    store.pointSetsUI.pointSets.push(pointSet)
  }

  reaction(
    () => {
      return store.pointSetsUI.colors.slice()
    },
    colors => {
      const selectedPointSetIndex = store.pointSetsUI.selectedPointSetIndex
      const color = colors[selectedPointSetIndex]
      eventEmitter.emit('pointSetColorChanged', selectedPointSetIndex, color)
    }
  )

  publicAPI.setPointSetColor = (index, rgbColor) => {
    const hexColor = rgb2hex(rgbColor)
    if (index < store.pointSetsUI.colors.length) {
      store.pointSetsUI.colors[index] = hexColor
    }
  }

  publicAPI.getPointSetColor = index => {
    const hexColor = store.pointSetsUI.colors[index]
    const rgbColor = hex2rgb(hexColor)
    return rgbColor
  }

  reaction(
    () => {
      return store.pointSetsUI.opacities.slice()
    },
    opacities => {
      const selectedPointSetIndex = store.pointSetsUI.selectedPointSetIndex
      const opacity = opacities[selectedPointSetIndex]
      eventEmitter.emit(
        'pointSetOpacityChanged',
        selectedPointSetIndex,
        opacity
      )
    }
  )

  publicAPI.setPointSetOpacity = (index, opacity) => {
    if (index < store.pointSetsUI.opacities.length) {
      store.pointSetsUI.opacities[index] = opacity
    }
  }

  publicAPI.getPointSetOpacity = index => {
    return store.pointSetsUI.opacities[index]
  }

  reaction(
    () => {
      return store.pointSetsUI.sizes.slice()
    },
    sizes => {
      const selectedPointSetIndex = store.pointSetsUI.selectedPointSetIndex
      const size = sizes[selectedPointSetIndex]
      eventEmitter.emit('pointSetSizeChanged', selectedPointSetIndex, size)
    }
  )

  publicAPI.setPointSetSize = (index, size) => {
    if (index < store.pointSetsUI.sizes.length) {
      store.pointSetsUI.sizes[index] = size
    }
  }

  publicAPI.getPointSetSize = index => {
    return store.pointSetsUI.sizes[index]
  }

  reaction(
    () => {
      return store.pointSetsUI.representations.slice()
    },
    representations => {
      const selectedPointSetIndex = store.pointSetsUI.selectedPointSetIndex
      const representation = representations[selectedPointSetIndex]
      eventEmitter.emit(
        'pointSetRepresentationChanged',
        selectedPointSetIndex,
        representation
      )
    }
  )

  publicAPI.setPointSetRepresentation = (index, representation) => {
    if (index < store.pointSetsUI.representations.length) {
      store.pointSetsUI.representations[index] = representation
    }
  }

  publicAPI.setGeometryColor = (index, rgbColor) => {
    const hexColor = rgb2hex(rgbColor)
    store.geometriesUI.colors[index] = hexColor
  }

  publicAPI.setGeometryOpacity = (index, opacity) => {
    store.geometriesUI.opacities[index] = opacity
  }

  publicAPI.setImageScale = targetScale => {
    service.send({
      type: 'SET_IMAGE_SCALE',
      targetScale,
    })
  }

  // The `itkVtkView` is considered an internal implementation detail
  // and its interface and behavior may change without changes to the major version.
  publicAPI.getViewProxy = () => {
    return store.itkVtkView
  }

  publicAPI.setImageVolumeScatteringBlend = (scatteringBlend, name) => {
    if (typeof name === 'undefined') {
      name = context.images.selectedName
    }

    service.send({
      type: 'SET_CINEMATIC_PARAMETERS',
      data: {
        name: context.images.selectedName,
        params: { scatteringBlend },
      },
    })
  }

  publicAPI.getImageVolumeScatteringBlend = name => {
    if (typeof name === 'undefined') {
      name = context.images.selectedName
    }
    const actorContext = context.images.actorContext.get(name)
    return actorContext.cinematicParameters.scatteringBlend
  }

  publicAPI.setMaxConcurrency = value => {
    context.maxConcurrency = value
  }

  publicAPI.getMaxConcurrency = () => {
    return context.maxConcurrency
  }

  addKeyboardShortcuts(context.uiContainer, service)

  // must come before moving/main image
  if (fixedImage) {
    await publicAPI.setImage(fixedImage, 'Fixed') // must await so fixedImage is the first one
  }

  if (imageMultiscale) {
    await publicAPI.setImage(imageMultiscale, imageName) // await for image.name to get assigned for fixedImage and setCompareImages
  }

  if (labelImageMultiscale) {
    publicAPI.setLabelImage(labelImageMultiscale, imageMultiscale?.name)
  }

  if (fixedImage && imageMultiscale) {
    publicAPI.setCompareImages('Fixed', imageMultiscale.name, compare)
  }

  if (!context.use2D) {
    publicAPI.setRotateEnabled(rotate)
  }

  // check with isNaN as may be 0
  if (!isNaN(gradientOpacity)) {
    publicAPI.setImageGradientOpacity(gradientOpacity)
  }

  return publicAPI
}

export default createViewer
