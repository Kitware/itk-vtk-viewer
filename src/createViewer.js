import { inspect } from '@xstate/inspect'
import { interpret } from 'xstate'

import vtkProxyManager from 'vtk.js/Sources/Proxy/Core/ProxyManager'
import vtkITKHelper from 'vtk.js/Sources/Common/DataModel/ITKHelper'

import ResizeSensor from 'css-element-queries/src/ResizeSensor'

import proxyConfiguration from './Rendering/VTKJS/proxyManagerConfiguration'
import UserInterface from './UserInterface'
import createLabelMapColorWidget from './UserInterface/Image/createLabelMapColorWidget'
import createLabelMapWeightWidget from './UserInterface/Image/createLabelMapWeightWidget'
import createPlaneIndexSliders from './UserInterface/Image/createPlaneIndexSliders'
import addKeyboardShortcuts from './UI/addKeyboardShortcuts'
import rgb2hex from './UserInterface/rgb2hex'
import hex2rgb from './UserInterface/hex2rgb'
import ViewerStore from './ViewerStore'
import createLabelMapRendering from './Rendering/createLabelMapRendering'
import updateLabelMapComponentWeight from './Rendering/updateLabelMapComponentWeight'
import updateLabelMapPiecewiseFunction from './Rendering/updateLabelMapPiecewiseFunction'

import toMultiscaleSpatialImage from './IO/toMultiscaleSpatialImage'
import viewerMachineOptions from './viewerMachineOptions'
import createViewerMachine from './createViewerMachine'
import ViewerMachineContext from './Context/ViewerMachineContext'
import {
  addCroppingPlanes,
  updateCroppingParameters,
} from './Rendering/VTKJS/Main/croppingPlanes'

import { autorun, reaction, toJS } from 'mobx'

const createViewer = async (
  rootContainer,
  {
    image,
    labelImage,
    geometries,
    pointSets,
    use2D = false,
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

  // Todo: const eventEmitter = new EventEmitter()
  // Migrate to a module
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

  context.use2D = use2D
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

  let updatingImage = false

  function imagePickedListener(lastPickedValues) {
    if (lastPickedValues.value !== null) {
      store.imageUI.selectedLabel = lastPickedValues.label
      if (store.imageUI.selectedLabel !== 'all') {
        const currentWeight =
          store.imageUI.labelMapWeights[store.imageUI.selectedLabel]
        if (currentWeight === 1.0) {
          store.imageUI.labelMapWeights[store.imageUI.selectedLabel] =
            store.imageUI.labelMapToggleWeight
        } else {
          store.imageUI.labelMapWeights[store.imageUI.selectedLabel] = 1.0
        }
      }
    }
  }

  function viewModeChangedListener(viewMode) {
    updateLabelMapPiecewiseFunction(store)
    store.renderWindow.render()
  }

  function registerEventListener(eventName, listener) {
    if (store.eventEmitter.listeners(eventName).indexOf(listener) < 0) {
      store.eventEmitter.on(eventName, listener)
    }
  }

  reaction(
    () => {
      const image = store.imageUI.image
      const components = store.imageUI.visualizedComponents.slice()
      const labelMap = store.imageUI.labelMap
      return store.imageUI.fusedImageLabelMap
    },

    fusedImage => {
      if (!fusedImage) {
        return
      }

      let initialRender = false
      if (!store.imageUI.representationProxy) {
        initialRender = true
        store.imageUI.source.setInputData(fusedImage)

        proxyManager.createRepresentationInAllViews(store.imageUI.source)
        store.imageUI.representationProxy = proxyManager.getRepresentation(
          store.imageUI.source,
          store.itkVtkView
        )

        if (use2D) {
          store.itkVtkView.setViewMode('ZPlane')
          store.itkVtkView.setOrientationAxesVisibility(false)
        } else {
          store.itkVtkView.setViewMode('Volume')
        }

        const annotationContainer = store.container.querySelector('.js-se')
        annotationContainer.style.fontFamily = 'monospace'
      }

      if (labelMapNames) {
        store.itkVtkView.setLabelNames(labelMapNames)
      }

      // if (!!store.imageUI.image && !!!store.imageUI.lookupTableProxies.length) {
      if (store.imageUI.image) {
        createImageRendering(store, use2D)
        updateVolumeProperties(store)
      }

      // if (
      //   !!store.imageUI.labelMap &&
      //   !!!store.imageUI.labelMapLookupTableProxy
      // ) {
      if (store.imageUI.labelMap) {
        createLabelMapRendering(store)
      }

      if (!!store.imageUI.image && !store.imageUI.imageUIGroup) {
        UserInterface.createImageUI(store, use2D, context.uiContainer)
      }

      if (!!store.imageUI.labelMap && !store.imageUI.labelMapColorUIGroup) {
        createLabelMapColorWidget(store, context.uiContainer)
        createLabelMapWeightWidget(store, context.uiContainer)
      }

      if (!use2D && !store.imageUI.placeIndexUIGroup) {
        createPlaneIndexSliders(store, context.uiContainer)
      }

      if (!initialRender) {
        if (updatingImage) {
          return
        }
        updatingImage = true

        store.imageUI.source.setInputData(fusedImage)

        updateVolumeProperties(store)

        const transferFunctionWidget = store.imageUI.transferFunctionWidget

        if (transferFunctionWidget) {
          transferFunctionWidget.setDataArray(
            store.imageUI.image
              .getPointData()
              .getScalars()
              .getData(),
            {
              numberOfComponents: store.imageUI.totalIntensityComponents,
              component: store.imageUI.selectedComponent,
            }
          )
          transferFunctionWidget.invokeOpacityChange(transferFunctionWidget)
          transferFunctionWidget.modified()
        }

        store.imageUI.croppingWidget.setVolumeMapper(
          store.imageUI.representationProxy.getMapper()
        )
        const cropFilter = store.imageUI.representationProxy.getCropFilter()
        cropFilter.reset()
        store.imageUI.croppingWidget.resetWidgetState()

        setTimeout(() => {
          !!transferFunctionWidget && transferFunctionWidget.render()
          const numberOfComponents = store.imageUI.numberOfComponents
          // May need to update intensity preset in case labelMap was
          // not yet loaded at time createImageRendering was called
          if (numberOfComponents === 1 && !!store.imageUI.labelMap) {
            const preset = 'Grayscale'
            store.imageUI.colorMaps[0] = preset
            store.imageUI.lookupTableProxies[0].setPresetName(preset)
          }
          updateLabelMapComponentWeight(store)
          store.renderWindow.render()
          updatingImage = false
        }, 0)
      }

      if (!!store.imageUI.image || !!store.imageUI.labelMap) {
        store.itkVtkView.setClickCallback(lastPickedValues => {
          store.imageUI.lastPickedValues = lastPickedValues
        })

        registerEventListener('imagePicked', imagePickedListener)
        registerEventListener('viewModeChanged', viewModeChangedListener)
      }
    }
  )

  let imageName = null
  if (image) {
    const multiscaleImage = await toMultiscaleSpatialImage(image)
    imageName = multiscaleImage?.name ?? null
    service.send({ type: 'ADD_IMAGE', data: multiscaleImage })
    if (multiscaleImage.scaleInfo[0].ranges) {
      const components = multiscaleImage.imageType.components
      for (let comp = 0; comp < components; comp++) {
        const range = multiscaleImage.scaleInfo[0].ranges[comp]
        service.send({
          type: 'IMAGE_COLOR_RANGE_CHANGED',
          data: { name: imageName, component: comp, range },
        })
        service.send({
          type: 'IMAGE_COLOR_RANGE_BOUNDS_CHANGED',
          data: { name: imageName, component: comp, range },
        })
      }
    }
  }

  if (labelImage) {
    const multiscaleLabelImage = await toMultiscaleSpatialImage(
      labelImage,
      true
    )
    if (multiscaleLabelImage.name === 'Image') {
      multiscaleLabelImage.name = 'LabelImage'
    }
    service.send({
      type: 'ADD_LABEL_IMAGE',
      data: { imageName, labelImage: multiscaleLabelImage },
    })
  }

  autorun(() => {
    if (store.imageUI.haveOnlyLabelMap) {
      // If we only have a labelmap component, give it full weight
      store.imageUI.labelImageBlend = 1.0
    }
  })

  reaction(
    () => {
      const multiscaleLabelMap = store.imageUI.multiscaleLabelMap
      const multiscaleImage = store.imageUI.multiscaleImage
      return { multiscaleImage, multiscaleLabelMap }
    },

    async ({ multiscaleImage, multiscaleLabelMap }) => {
      if (!multiscaleImage && !multiscaleLabelMap) {
        return
      }
      if (multiscaleLabelMap) {
        const topLevelImage = await multiscaleLabelMap.topLevelLargestImage()
        const imageData = vtkITKHelper.convertItkToVtkImage(topLevelImage)
        store.imageUI.labelMap = imageData
        updateVisualizedComponents(store)
      }
      if (multiscaleImage) {
        const topLevelImage = await multiscaleImage.topLevelLargestImage()
        const imageData = vtkITKHelper.convertItkToVtkImage(topLevelImage)
        store.imageUI.image = imageData
        updateVisualizedComponents(store)
      }
    }
  )
  //store.imageUI.multiscaleImage = multiscaleImage
  //store.imageUI.multiscaleLabelMap = multiscaleLabelMap

  // After all the other "store.imageUI.image" reactions have run, we
  // need to trigger all of the transfer function widget
  // "store.imageUI.selectedComponent" reactions.
  for (let i = store.imageUI.numberOfComponents - 1; i >= 0; i--) {
    store.imageUI.selectedComponent = i
  }

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

  publicAPI.renderLater = () => {
    store.itkVtkView.renderLater()
  }

  const viewerDOMId = store.id

  // The `store` is considered an internal implementation detail
  // and its interface and behavior may change without changes to the major version.
  publicAPI.getStore = () => {
    return store
  }

  publicAPI.getLookupTableProxies = () => {
    return store.imageUI.lookupTableProxies
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
      type: 'IMAGE_PIECEWISE_FUNCTION_POINTS_SET',
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

  // https://github.com/eligrey/canvas-toBlob.js ?
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

  publicAPI.setImage = async (image, name) => {
    if (typeof name === 'undefined' && context.images.selectedName) {
      name = context.images.selectedName
    }
    const multiscaleImage = await toMultiscaleSpatialImage(image)
    multiscaleImage.name = name
    if (context.images.actorContext.has(name)) {
      const actorContext = context.images.actorContext.get(name)
      actorContext.image = multiscaleImage
      service.send({ type: 'IMAGE_ASSIGNED', data: name })
    } else {
      service.send({ type: 'ADD_IMAGE', data: multiscaleImage })
      if (multiscaleImage.scaleInfo[0].ranges) {
        const components = multiscaleImage.imageType.components
        for (let comp = 0; comp < components; comp++) {
          const range = multiscaleImage.scaleInfo[0].ranges[comp]
          service.send({
            type: 'IMAGE_COLOR_RANGE_CHANGED',
            data: { name, component: comp, range },
          })
          service.send({
            type: 'IMAGE_COLOR_RANGE_BOUNDS_CHANGED',
            data: { name, component: comp, range },
          })
        }
      }
    }
  }

  publicAPI.getImage = name => {
    if (typeof name === 'undefined' && context.images.selectedName) {
      name = context.images.selectedName
    }
    return context.images.actorContext.get(name).image
  }

  publicAPI.setImageInterpolationEnabled = (enabled, name) => {
    if (typeof name === 'undefined') {
      name = context.images.selectedName
    }
    if (enabled !== context.main.interpolationEnabled) {
      service.send({ type: 'TOGGLE_IMAGE_INTERPOLATION', data: name })
    }
  }

  publicAPI.getImageInterpolationEnabled = name => {
    if (typeof name === 'undefined') {
      name = context.images.selectedName
    }
    const actorContext = context.images.actorContext.get(name)
    return actorContext.interpolationEnabled
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
    const currentColorMap = actorContext.colorRanges.get(componentIndex)
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

  publicAPI.setLabelImage = async labelImage => {
    const imageName = context.images.selectedName
    const multiscaleLabelImage = await toMultiscaleSpatialImage(
      labelImage,
      true
    )
    if (multiscaleLabelImage.name === 'Image') {
      multiscaleLabelImage.name = 'LabelImage'
    }
    service.send({
      type: 'ADD_LABEL_IMAGE',
      data: { imageName, labelImage: multiscaleLabelImage },
    })
  }

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
    const rgbColor = hex2rgb(rgbColor)
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

  addKeyboardShortcuts(context.uiContainer, service)

  if (!use2D) {
    publicAPI.setRotateEnabled(rotate)
  }

  // check with isNaN as may be 0
  if (!isNaN(gradientOpacity)) {
    publicAPI.setImageGradientOpacity(gradientOpacity)
  }

  return publicAPI
}

export default createViewer
