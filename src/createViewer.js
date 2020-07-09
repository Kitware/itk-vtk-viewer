import vtkProxyManager from 'vtk.js/Sources/Proxy/Core/ProxyManager'
import macro from 'vtk.js/Sources/macro'
import vtkITKHelper from 'vtk.js/Sources/Common/DataModel/ITKHelper'

import ResizeSensor from 'css-element-queries/src/ResizeSensor'

import proxyConfiguration from './proxyManagerConfiguration'
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

import { autorun, observable, reaction, toJS } from 'mobx'

const createViewer = (
  rootContainer,
  {
    image,
    multiscaleImage,
    labelMap,
    multiscaleLabelMap,
    labelMapNames,
    geometries,
    pointSets,
    use2D = false,
    rotate = true,
    viewerStyle,
    viewerState,
    uiContainer,
  }
) => {
  UserInterface.emptyContainer(rootContainer)
  if (!UserInterface.checkForWebGL(rootContainer)) {
    throw new Error('WebGL could not be loaded.')
  }

  const proxyManager = vtkProxyManager.newInstance({ proxyConfiguration })
  window.addEventListener('resize', proxyManager.resizeAllViews)

  // Todo: deserialize from viewerState, if present
  const store = new ViewerStore(proxyManager)

  UserInterface.applyContainerStyle(rootContainer, store, viewerStyle)

  let updatingImage = false

  UserInterface.createMainUI(rootContainer, store, use2D, uiContainer)

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
      const labelMap = store.imageUI.labelMap
      return store.imageUI.fusedImageLabelMap
    },

    fusedImage => {
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

      if (!!store.imageUI.image && !!!store.imageUI.lookupTableProxies.length) {
        createImageRendering(store, use2D)
        updateVolumeProperties(store)
      }

      if (
        !!store.imageUI.labelMap &&
        !!!store.imageUI.labelMapLookupTableProxy
      ) {
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
              .getData()
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
  store.imageUI.image = image
  if (!!labelMap) {
    store.imageUI.labelMap = labelMap
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
      }
      if (!!multiscaleImage) {
        const topLevelImage = await multiscaleImage.topLevelLargestImage()
        const imageData = vtkITKHelper.convertItkToVtkImage(topLevelImage)
        store.imageUI.image = imageData
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
    if (mean < 20) {
      store.mainUI.fpsTooLow = true
    }
  }
  store.renderWindow.getInteractor().onAnimation(updateFPS)

  const publicAPI = {}

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
    store.imageUI.image = image
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
  }

  publicAPI.setLabelMapNames = names => {
    store.itkVtkView.setLabelNames(names)
  }

  publicAPI.getLabelMapNames = () => {
    return store.itkVtkView.getLabelNames()
  }

  publicAPI.setUserInterfaceCollapsed = collapse => {
    const collapsed = store.mainUI.collapsed
    if ((collapse && !collapsed) || (!collapse && collapsed)) {
      store.mainUI.collapsed = !collapsed
    }
  }

  publicAPI.getUserInterfaceCollapsed = () => {
    return store.mainUI.collapsed
  }

  const eventEmitter = store.eventEmitter

  const eventNames = [
    'imagePicked',
    'labelMapBlendChanged',
    'labelMapWeightsChanged',
    'toggleUserInterfaceCollapsed',
    'opacityGaussiansChanged',
    'componentVisibilitiesChanged',
    'toggleAnnotations',
    'toggleRotate',
    'toggleFullscreen',
    'toggleInterpolation',
    'toggleCroppingPlanes',
    'croppingPlanesChanged',
    'resetCrop',
    'changeColorRange',
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

  autorun(() => {
    const collapsed = store.mainUI.collapsed
    eventEmitter.emit('toggleUserInterfaceCollapsed', collapsed)
  })

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
    publicAPI.setUserInterfaceCollapsed(true)
  }

  publicAPI.captureImage = () => {
    return store.itkVtkView.captureImage()
  }

  autorun(() => {
    const enabled = store.mainUI.annotationsEnabled
    eventEmitter.emit('toggleAnnotations', enabled)
  })

  publicAPI.setAnnotationsEnabled = enabled => {
    const annotations = store.mainUI.annotationsEnabled
    if ((enabled && !annotations) || (!enabled && annotations)) {
      store.mainUI.annotationsEnabled = enabled
    }
  }

  autorun(() => {
    const enabled = store.mainUI.rotateEnabled
    eventEmitter.emit('toggleRotate', enabled)
  })

  publicAPI.setRotateEnabled = enabled => {
    const rotate = store.mainUI.rotateEnabled
    if ((enabled && !rotate) || (!enabled && rotate)) {
      store.mainUI.rotateEnabled = enabled
    }
  }

  autorun(() => {
    const enabled = store.mainUI.fullscreenEnabled
    eventEmitter.emit('toggleFullscreen', enabled)
  })

  publicAPI.setFullscreenEnabled = enabled => {
    const fullscreen = store.mainUI.fullscreenEnabled
    if ((enabled && !fullscreen) || (!enabled && fullscreen)) {
      store.mainUI.fullscreenEnabled = enabled
    }
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
    const selectedComponentIndex = store.imageUI.selectedComponentIndex
    eventEmitter.emit(
      'changeColorRange',
      selectedComponentIndex,
      colorRanges[selectedComponentIndex]
    )
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
    store.style.backgroundColor = bgColor
    store.itkVtkView.getRenderer().setBackground(store.style.backgroundColor)
    store.renderWindow.render()
  }

  publicAPI.getBackgroundColor = () => {
    return store.style.backgroundColor.slice()
  }

  reaction(
    () => store.style.backgroundColor.slice(),
    bgColor => {
      eventEmitter.emit('backgroundColorChanged', bgColor)
    }
  )

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
  addKeyboardShortcuts(rootContainer, publicAPI, viewerDOMId)

  if (!use2D) {
    publicAPI.setRotateEnabled(rotate)
  }

  return publicAPI
}

export default createViewer
