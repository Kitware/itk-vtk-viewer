import { inspect } from '@xstate/inspect'
import { interpret } from 'xstate'

import vtkProxyManager from 'vtk.js/Sources/Proxy/Core/ProxyManager'
import macro from 'vtk.js/Sources/macro'
import vtkITKHelper from 'vtk.js/Sources/Common/DataModel/ITKHelper'

import ResizeSensor from 'css-element-queries/src/ResizeSensor'

import proxyConfiguration from './Rendering/VTKJS/proxyManagerConfiguration'
import UserInterface from './UserInterface'
import createLabelMapColorWidget from './UserInterface/Image/createLabelMapColorWidget'
import createLabelMapWeightWidget from './UserInterface/Image/createLabelMapWeightWidget'
import createPlaneIndexSliders from './UserInterface/Image/createPlaneIndexSliders'
import updateTransferFunctionWidget from './UserInterface/Image/updateTransferFunctionWidget'
import addKeyboardShortcuts from './UserInterface/addKeyboardShortcuts'
import rgb2hex from './UserInterface/rgb2hex'
import hex2rgb from './UserInterface/hex2rgb'
import ViewerStore from './ViewerStore'
import createLabelMapRendering from './Rendering/createLabelMapRendering'
import createImageRendering from './Rendering/createImageRendering'
import updateLabelMapComponentWeight from './Rendering/updateLabelMapComponentWeight'
import updateLabelMapPiecewiseFunction from './Rendering/updateLabelMapPiecewiseFunction'
import updateVolumeProperties from './Rendering/updateVolumeProperties'
import updateGradientOpacity from './Rendering/updateGradientOpacity'

import MultiscaleChunkedImage from './IO/MultiscaleChunkedImage'
import InMemoryMultiscaleChunkedImage from './IO/InMemoryMultiscaleChunkedImage'
import viewerMachineOptions from './viewerMachineOptions'
import createViewerMachine from './createViewerMachine'
import ViewerMachineContext from './Context/ViewerMachineContext'

import { autorun, observable, reaction, toJS } from 'mobx'

function updateVisualizedComponents(store) {
  const image = store.imageUI.image
  const labelMap = store.imageUI.labelMap
  if (image) {
    const imageComponents = image
      .getPointData()
      .getScalars()
      .getNumberOfComponents()
    store.imageUI.maximumIntensityComponents = !!labelMap ? 3 : 4
    const numVizComps = Math.min(
      imageComponents,
      store.imageUI.maximumIntensityComponents
    )
    const vizComps = []
    for (let i = 0; i < numVizComps; i++) {
      vizComps.push(i)
    }
    store.imageUI.visualizedComponents.replace(vizComps)
  }
}

const createViewer = async (
  rootContainer,
  {
    image,
    labelMap,
    labelMapNames,
    geometries,
    pointSets,
    use2D = false,
    rotate = true,
    viewerStyle,
    viewerState,
    uiContainer,
    debug = true,
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

  //if (debug) {
  ////const stateIFrame = document.createElement('iframe')
  ////store.container.style.height = '50%'
  ////stateIFrame.style.height = '50%'
  ////rootContainer.appendChild(stateIFrame)
  //inspect({
  ////iframe: stateIFrame,
  //iframe: false,
  //})
  //}

  // Todo: const eventEmitter = new EventEmitter()
  const eventEmitter = store.eventEmitter

  function eventEmitterCallback(context, event) {
    return (callback, onReceive) => {
      onReceive(event => {
        switch (event.type) {
          case 'SET_BACKGROUND_COLOR':
            eventEmitter.emit('backgroundColorChanged', event.data)
            break
          case 'TOGGLE_FULLSCREEN':
            eventEmitter.emit(
              'toggleFullscreen',
              publicAPI.getFullscreenEnabled()
            )
            break
          case 'TOGGLE_UI_COLLAPSED':
            eventEmitter.emit('toggleUICollapsed', publicAPI.getUICollapsed())
            break
          case 'TOGGLE_ANNOTATIONS':
            eventEmitter.emit(
              'toggleAnnotations',
              publicAPI.getAnnotationsEnabled()
            )
            break
          case 'TOGGLE_ROTATE':
            eventEmitter.emit('toggleRotate', publicAPI.getRotateEnabled())
            break
          default:
            throw new Error(`Unexpected event type: ${event.type}`)
        }
      })
    }
  }

  const options = viewerMachineOptions
  const context = new ViewerMachineContext()
  context.use2D = use2D
  context.rootContainer = rootContainer
  // Todo: move to viewer machine
  context.container = store.container
  // Todo: move to VTKJS/createRenderer
  context.itkVtkView = store.itkVtkView
  context.renderWindow = store.renderWindow
  context.id = store.id
  const machine = createViewerMachine(options, context, eventEmitterCallback)
  const service = interpret(machine, { devTools: debug })
  context.service = service
  if (!!uiContainer) {
    context.uiContainer = uiContainer
  }
  console.log(options)
  console.log(context)
  console.log(machine)
  console.log(service)
  service.start()

  if (!!viewerStyle) {
    if (!!viewerStyle.backgroundColor) {
      service.send({
        type: 'SET_BACKGROUND_COLOR',
        data: viewerStyle.backgroundColor,
      })
    }
    if (!!viewerStyle.containerStyle) {
      service.send({
        type: 'STYLE_CONTAINER',
        data: viewerStyle.containerStyle,
      })
    }
  }

  let imageData = image
  let multiscaleImage = null
  if (image instanceof MultiscaleChunkedImage) {
    multiscaleImage = image
    imageData = null
  } else if (!!image && image.imageType !== undefined) {
    if (image.data.length > 2e6) {
      const {
        metadata,
        imageType,
        pyramid,
      } = await InMemoryMultiscaleChunkedImage.buildPyramid(image)
      multiscaleImage = new InMemoryMultiscaleChunkedImage(
        pyramid,
        metadata,
        imageType
      )
      imageData = null
    } else {
      imageData = vtkITKHelper.convertItkToVtkImage(image)
    }
  }

  let labelMapData = labelMap
  let multiscaleLabelMap = null
  if (labelMap instanceof MultiscaleChunkedImage) {
    multiscaleLabelMap = labelMap
    labelMapData = null
  } else if (!!labelMap && labelMap.imageType !== undefined) {
    labelMapData = vtkITKHelper.convertItkToVtkImage(labelMap)
  }

  let updatingImage = false

  UserInterface.createMainUI(rootContainer, store, use2D, context.uiContainer)

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
      store.eventEmitter.emit('fusingStatusChanged', false)

      if (!!!fusedImage) {
        return
      }

      let initialRender = false
      if (!!!store.imageUI.representationProxy) {
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
          store.itkVtkView.setViewMode('VolumeRendering')
        }

        const annotationContainer = store.container.querySelector('.js-se')
        annotationContainer.style.fontFamily = 'monospace'
      }

      if (!!labelMapNames) {
        store.itkVtkView.setLabelNames(labelMapNames)
      }

      // if (!!store.imageUI.image && !!!store.imageUI.lookupTableProxies.length) {
      if (!!store.imageUI.image) {
        createImageRendering(store, use2D)
        updateVolumeProperties(store)
      }

      // if (
      //   !!store.imageUI.labelMap &&
      //   !!!store.imageUI.labelMapLookupTableProxy
      // ) {
      if (!!store.imageUI.labelMap) {
        createLabelMapRendering(store)
      }

      if (!!store.imageUI.image && !!!store.imageUI.imageUIGroup) {
        UserInterface.createImageUI(store, use2D)
      }

      if (!!store.imageUI.labelMap && !!!store.imageUI.labelMapColorUIGroup) {
        createLabelMapColorWidget(store, store.mainUI.uiContainer)
        createLabelMapWeightWidget(store, store.mainUI.uiContainer)
      }

      if (!use2D && !!!store.imageUI.placeIndexUIGroup) {
        createPlaneIndexSliders(store, store.mainUI.uiContainer)
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
              component: store.imageUI.selectedComponentIndex,
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
          updateGradientOpacity(store)
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
  store.imageUI.image = imageData
  updateVisualizedComponents(store)
  if (!!labelMapData) {
    store.imageUI.labelMap = labelMapData
    updateVisualizedComponents(store)
  }

  autorun(() => {
    if (store.imageUI.haveOnlyLabelMap) {
      // If we only have a labelmap component, give it full weight
      store.imageUI.labelMapBlend = 1.0
    }
  })

  reaction(
    () => {
      const multiscaleLabelMap = store.imageUI.multiscaleLabelMap
      const multiscaleImage = store.imageUI.multiscaleImage
      return { multiscaleImage, multiscaleLabelMap }
    },

    async ({ multiscaleImage, multiscaleLabelMap }) => {
      if (!!!multiscaleImage && !!!multiscaleLabelMap) {
        return
      }
      if (!!multiscaleLabelMap) {
        const topLevelImage = await multiscaleLabelMap.topLevelLargestImage()
        const imageData = vtkITKHelper.convertItkToVtkImage(topLevelImage)
        store.imageUI.labelMap = imageData
        updateVisualizedComponents(store)
      }
      if (!!multiscaleImage) {
        const topLevelImage = await multiscaleImage.topLevelLargestImage()
        const imageData = vtkITKHelper.convertItkToVtkImage(topLevelImage)
        store.imageUI.image = imageData
        updateVisualizedComponents(store)
      }
    }
  )
  store.imageUI.multiscaleImage = multiscaleImage
  store.imageUI.multiscaleLabelMap = multiscaleLabelMap

  // After all the other "store.imageUI.image" reactions have run, we
  // need to trigger all of the transfer function widget
  // "store.imageUI.selectedComponent" reactions.
  for (let i = store.imageUI.numberOfComponents - 1; i >= 0; i--) {
    store.imageUI.selectedComponentIndex = i
  }

  reaction(
    () =>
      !!store.geometriesUI.geometries && store.geometriesUI.geometries.slice(),
    geometries => {
      if (!!!geometries || geometries.length === 0) {
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
        } else {
          store.geometriesUI.sources[index].setInputData(geometry)
          store.geometriesUI.representationProxies[index].setVisibility(true)
        }
      })

      if (geometries.length < store.geometriesUI.representationProxies.length) {
        const proxiesToDisable = store.geometriesUI.representationProxies.slice(
          geometries.length
        )
        proxiesToDisable.forEach(proxy => {
          proxy.setVisibility(false)
        })
      }

      if (!store.geometriesUI.initialized) {
        UserInterface.createGeometriesUI(store)
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
      if (!!!pointSets || pointSets.length === 0) {
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
        } else {
          store.pointSetsUI.sources[index].setInputData(pointSet)
          store.pointSetsUI.representationProxies[index].setVisibility(true)
        }
      })

      if (pointSets.length < store.pointSetsUI.representationProxies.length) {
        const proxiesToDisable = store.pointSetsUI.representationProxies.slice(
          pointSets.length
        )
        proxiesToDisable.forEach(proxy => {
          proxy.setVisibility(false)
        })
      }

      if (!store.pointSetsUI.initialized) {
        UserInterface.createPointSetsUI(store)
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
  reaction(
    () => {
      return store.mainUI.fpsTooLow
    },

    tooLow => {
      if (!tooLow) {
        return
      }
    }
  )
  function updateFPS() {
    const nextFPS = 1 / store.renderWindow.getInteractor().getLastFrameTime()
    const fps = store.mainUI.fps
    fps.push(nextFPS)
    fps.shift()
    const mean = Math.round((fps[0] + fps[1] + fps[2]) / 3)
    //console.log(mean)
    if (mean < 20) {
      store.mainUI.fpsTooLow = true
    }
  }
  store.renderWindow.getInteractor().onAnimation(updateFPS)

  publicAPI.renderLater = () => {
    store.itkVtkView.renderLater()
  }

  const viewerDOMId = store.id

  // The `store` is considered an internal implementation detail
  // and its interface and behavior may change without changes to the major version.
  publicAPI.getStore = () => {
    return store
  }

  publicAPI.getImage = () => {
    return store.imageUI.image
  }

  const setImage = image => {
    let imageData = image
    if (image.imageType !== undefined) {
      imageData = vtkITKHelper.convertItkToVtkImage(image)
    }
    store.imageUI.image = imageData
    updateVisualizedComponents(store)
  }
  publicAPI.setImage = macro.throttle(setImage, 100)

  publicAPI.getLookupTableProxies = () => {
    return store.imageUI.lookupTableProxies
  }

  publicAPI.setPointSets = pointSets => {
    store.pointSetsUI.pointSets = pointSets
  }

  publicAPI.setGeometries = geometries => {
    store.geometriesUI.geometries = geometries
  }

  publicAPI.setLabelMap = labelMap => {
    store.imageUI.labelMap = labelMap
    updateVisualizedComponents(store)
  }

  publicAPI.setLabelMapNames = names => {
    store.itkVtkView.setLabelNames(names)
  }

  publicAPI.getLabelMapNames = () => {
    return store.itkVtkView.getLabelNames()
  }

  publicAPI.setUICollapsed = collapse => {
    if (collapse !== context.uiCollapsed) {
      service.send('TOGGLE_UI_COLLAPSED')
    }
  }

  publicAPI.getUICollapsed = () => {
    return context.uiCollapsed
  }

  const eventNames = [
    'imagePicked',
    'labelMapBlendChanged',
    'labelMapWeightsChanged',
    'toggleUICollapsed',
    'opacityGaussiansChanged',
    'componentVisibilitiesChanged',
    'toggleAnnotations',
    'toggleAxes',
    'toggleRotate',
    'toggleFullscreen',
    'toggleInterpolation',
    'toggleCroppingPlanes',
    'croppingPlanesChanged',
    'resetCrop',
    'colorRangesChanged',
    'selectColorMap',
    'selectLookupTable',
    'viewModeChanged',
    'xSliceChanged',
    'ySliceChanged',
    'zSliceChanged',
    'toggleShadow',
    'toggleSlicingPlanes',
    'gradientOpacityChanged',
    'blendModeChanged',
    'pointSetColorChanged',
    'pointSetOpacityChanged',
    'pointSetSizeChanged',
    'pointSetRepresentationChanged',
    'backgroundColorChanged',
    'volumeSampleDistanceChanged',
    'fusingStatusChanged',
  ]

  publicAPI.getEventNames = () => eventNames

  publicAPI.on = (...onArgs) => eventEmitter.on(...onArgs)
  publicAPI.off = (...offArgs) => eventEmitter.off(...offArgs)
  publicAPI.once = (...onceArgs) => eventEmitter.once(...onceArgs)

  publicAPI.getEventEmitter = () => eventEmitter

  reaction(
    () => {
      return store.imageUI.lastPickedValues
    },
    () => {
      const lastPickedValues = store.imageUI.lastPickedValues
      eventEmitter.emit('imagePicked', toJS(lastPickedValues))
    }
  )

  reaction(
    () => store.imageUI.labelMapBlend,
    blend => {
      eventEmitter.emit('labelMapBlendChanged', blend)
    }
  )

  publicAPI.getLabelMapBlend = () => store.imageUI.labelMapBlend

  publicAPI.setLabelMapBlend = blend => {
    store.imageUI.labelMapBlend = blend
    // already have a reaction that updates actors and re-renders
  }

  reaction(
    () => store.imageUI.labelMapWeights.slice(),
    () => {
      const labels = store.imageUI.labelMapLabels.slice()
      const weights = store.imageUI.labelMapWeights.slice()
      eventEmitter.emit('labelMapWeightsChanged', { labels, weights })
    }
  )

  // Replace all weights
  publicAPI.setLabelMapWeights = weights => {
    if (weights.length !== store.imageUI.labelMapWeights.length) {
      console.error(
        `Provided ${weights.length} weights, expecting ${store.imageUI.labelMapWeights.length}`
      )
      return false
    }

    store.imageUI.labelMapWeights.replace(weights)
    updateLabelMapPiecewiseFunction(store)
    store.renderWindow.render()

    return true
  }

  // Replace a subset of weights by providing parallel array of corresponding
  // label values
  publicAPI.updateLabelMapWeights = ({ labels, weights }) => {
    const indicesToUpdate = []

    labels.forEach((label, labelIdx) => {
      const idx = store.imageUI.labelMapLabels.indexOf(label)
      if (idx >= 0) {
        indicesToUpdate.push(labelIdx)
        store.imageUI.labelMapWeights[idx] = weights[labelIdx]
      }
    })

    if (indicesToUpdate.length > 0) {
      updateLabelMapPiecewiseFunction(store, indicesToUpdate)
      store.renderWindow.render()
      return true
    }

    return false
  }

  publicAPI.getLabelMapWeights = () => {
    return {
      labels: store.imageUI.labelMapLabels.slice(),
      weights: store.imageUI.labelMapWeights.slice(),
    }
  }

  publicAPI.getOpacityGaussians = () => store.imageUI.opacityGaussians.slice()

  publicAPI.setOpacityGaussians = gaussians => {
    store.imageUI.opacityGaussians.replace(gaussians)
    updateTransferFunctionWidget(store)
    store.renderWindow.render()
  }

  function emitOpacityGaussians() {
    eventEmitter.emit(
      'opacityGaussiansChanged',
      toJS(store.imageUI.opacityGaussians)
    )
  }

  reaction(() => {
    return store.imageUI.opacityGaussians.map((glist, compIdx) =>
      glist.map(
        (g, gIdx) =>
          `${compIdx}:${gIdx}:${g.position}:${g.height}:${g.width}:${g.xBias}:${g.yBias}`
      )
    )
  }, macro.debounce(emitOpacityGaussians, 100))

  publicAPI.getComponentVisibilities = () => {
    return store.imageUI.componentVisibilities.map(compVis => compVis.visible)
  }

  publicAPI.setComponentVisibilities = visibilities => {
    visibilities.forEach((visibility, index) => {
      store.imageUI.componentVisibilities[index].visible = visibility
    })
  }

  reaction(
    () => {
      return store.imageUI.componentVisibilities.map(compVis => compVis.visible)
    },
    visibilities => {
      eventEmitter.emit('componentVisibilitiesChanged', visibilities)
    }
  )

  // Start collapsed on mobile devices or small pages
  if (window.screen.availWidth < 768 || window.screen.availHeight < 800) {
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

  autorun(() => {
    const enabled = store.mainUI.axesEnabled
    eventEmitter.emit('toggleAxes', enabled)
  })

  publicAPI.setAxesEnabled = enabled => {
    const axes = store.mainUI.axesEnabled
    if ((enabled && !axes) || (!enabled && axes)) {
      store.mainUI.axesEnabled = enabled
    }
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

  const toggleInterpolationHandlers = []
  autorun(() => {
    const enabled = store.mainUI.interpolationEnabled
    eventEmitter.emit('toggleInterpolation', enabled)
  })

  publicAPI.setInterpolationEnabled = enabled => {
    const interpolation = store.mainUI.interpolationEnabled
    if ((enabled && !interpolation) || (!enabled && interpolation)) {
      store.mainUI.interpolationEnabled = enabled
    }
  }

  const toggleCroppingPlanesHandlers = []
  autorun(() => {
    const enabled = store.mainUI.croppingPlanesEnabled
    eventEmitter.emit('toggleCroppingPlanes', enabled)
  })

  publicAPI.setCroppingPlanesEnabled = enabled => {
    const cropping = store.mainUI.croppingPlanesEnabled
    if ((enabled && !cropping) || (!enabled && cropping)) {
      store.mainUI.croppingPlanesEnabled = enabled
    }
  }

  autorun(() => {
    const colorRanges = store.imageUI.colorRanges
    eventEmitter.emit('colorRangesChanged', colorRanges)
  })

  publicAPI.setColorRange = (componentIndex, colorRange) => {
    const currentColorRange = store.imageUI.colorRanges[componentIndex]
    if (
      currentColorRange[0] !== colorRange[0] ||
      currentColorRange[1] !== colorRange[1]
    ) {
      store.imageUI.colorRanges[componentIndex] = colorRange
    }
  }

  publicAPI.getColorRange = componentIndex => {
    return store.imageUI.colorRanges[componentIndex]
  }

  autorun(() => {
    const selectedComponentIndex = store.imageUI.selectedComponentIndex
    if (store.imageUI.colorMaps) {
      const colorMap = store.imageUI.colorMaps[selectedComponentIndex]
      eventEmitter.emit('selectColorMap', selectedComponentIndex, colorMap)
    }
  })

  publicAPI.setColorMap = (componentIndex, colorMap) => {
    const currentColorMap = store.imageUI.colorMaps[componentIndex]
    if (currentColorMap !== colorMap) {
      store.imageUI.colorMaps[componentIndex] = colorMap
    }
  }

  publicAPI.getColorMap = componentIndex => {
    return store.imageUI.colorMaps[componentIndex]
  }

  autorun(() => {
    const lut = store.imageUI.labelMapLookupTable
    eventEmitter.emit('selectLookupTable', lut)
  })

  publicAPI.setLookupTable = lut => {
    const currentLut = store.imageUI.labelMapLookupTable
    if (currentLut !== lut) {
      store.imageUI.labelMapLookupTable = lut
    }
  }

  publicAPI.getLookupTable = () => {
    return store.imageUI.labelMapLookupTable
  }

  if (!use2D) {
    reaction(
      () => {
        return store.mainUI.viewMode
      },
      viewMode => {
        switch (viewMode) {
          case 'XPlane':
            eventEmitter.emit('viewModeChanged', 'XPlane')
            break
          case 'YPlane':
            eventEmitter.emit('viewModeChanged', 'YPlane')
            break
          case 'ZPlane':
            eventEmitter.emit('viewModeChanged', 'ZPlane')
            break
          case 'VolumeRendering':
            eventEmitter.emit('viewModeChanged', 'VolumeRendering')
            break
          default:
            console.error('Invalid view mode: ' + viewMode)
        }
      }
    )

    publicAPI.setViewMode = mode => {
      if (!image) {
        return
      }
      store.mainUI.viewMode = mode
    }

    reaction(
      () => {
        return store.imageUI.xSlice
      },
      xSlice => {
        eventEmitter.emit('xSliceChanged', xSlice)
      }
    )

    publicAPI.setXSlice = position => {
      const currentPosition = store.imageUI.xSlice
      if (currentPosition !== parseFloat(position)) {
        store.imageUI.xSlice = position
      }
    }
    publicAPI.getXSlice = () => {
      return store.imageUI.xSlice
    }

    reaction(
      () => {
        return store.imageUI.ySlice
      },
      ySlice => {
        eventEmitter.emit('ySliceChanged', ySlice)
      }
    )

    publicAPI.setYSlice = position => {
      const currentPosition = store.imageUI.ySlice
      if (currentPosition !== parseFloat(position)) {
        store.imageUI.ySlice = position
      }
    }
    publicAPI.getYSlice = () => {
      return store.imageUI.ySlice
    }

    reaction(
      () => {
        return store.imageUI.zSlice
      },
      zSlice => {
        eventEmitter.emit('zSliceChanged', zSlice)
      }
    )

    publicAPI.setZSlice = position => {
      const currentPosition = store.imageUI.zSlice
      if (currentPosition !== parseFloat(position)) {
        store.imageUI.zSlice = position
      }
    }
    publicAPI.getZSlice = () => {
      return store.imageUI.zSlice
    }

    autorun(() => {
      const enabled = store.imageUI.useShadow
      eventEmitter.emit('toggleShadow', enabled)
    })

    publicAPI.setShadowEnabled = enabled => {
      const shadow = store.imageUI.useShadow
      if ((enabled && !shadow) || (!enabled && shadow)) {
        store.imageUI.useShadow = enabled
      }
    }

    autorun(() => {
      const enabled = store.imageUI.slicingPlanesEnabled
      eventEmitter.emit('toggleSlicingPlanes', enabled)
    })

    publicAPI.setSlicingPlanesEnabled = enabled => {
      const slicingPlanes = store.imageUI.slicingPlanesEnabled
      if ((enabled && !slicingPlanes) || (!enabled && slicingPlanes)) {
        store.imageUI.slicingPlanesEnabled = enabled
      }
    }

    autorun(() => {
      const gradientOpacity = store.imageUI.gradientOpacity
      eventEmitter.emit('gradientOpacityChanged', gradientOpacity)
    })

    publicAPI.setGradientOpacity = opacity => {
      const currentOpacity = store.imageUI.gradientOpacity
      if (currentOpacity !== parseFloat(opacity)) {
        store.imageUI.gradientOpacity = opacity
      }
    }

    publicAPI.getGradientOpacity = () => {
      return store.imageUI.gradientOpacity
    }

    autorun(() => {
      const volumeSampleDistance = store.imageUI.volumeSampleDistance
      eventEmitter.emit('volumeSampleDistanceChanged', volumeSampleDistance)
    })

    publicAPI.setVolumeSampleDistance = distance => {
      const currentDistance = store.imageUI.volumeSampleDistance
      if (currentDistance !== parseFloat(distance)) {
        store.imageUI.volumeSampleDistance = distance
      }
    }

    publicAPI.getVolumeSampleDistance = () => {
      return store.imageUI.volumeSampleDistance
    }

    autorun(() => {
      const blendMode = store.imageUI.blendMode
      eventEmitter.emit('blendModeChanged', blendMode)
    })

    publicAPI.setBlendMode = blendMode => {
      const currentBlendMode = store.imageUI.blendMode
      if (currentBlendMode !== parseInt(blendMode)) {
        store.imageUI.blendMode = blendMode
      }
    }

    publicAPI.getBlendMode = () => {
      return store.imageUI.blendMode
    }
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

  publicAPI.setBackgroundColor = bgColor => {
    service.send({ type: 'SET_BACKGROUND_COLOR', data: bgColor })
  }

  publicAPI.getBackgroundColor = () => {
    return context.main.backgroundColor.slice()
  }

  // The `itkVtkView` is considered an internal implementation detail
  // and its interface and behavior may change without changes to the major version.
  publicAPI.getViewProxy = () => {
    return store.itkVtkView
  }

  //publicAPI.saveState = () => {
  //// todo
  //}

  //publicAPI.loadState = (state) => {
  //// todo
  //}
  addKeyboardShortcuts(service)

  if (!use2D) {
    publicAPI.setRotateEnabled(rotate)
  }

  return publicAPI
}

export default createViewer
