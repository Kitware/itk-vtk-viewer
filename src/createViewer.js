import vtkProxyManager from 'vtk.js/Sources/Proxy/Core/ProxyManager'
import macro from 'vtk.js/Sources/macro'
import vtkITKHelper from 'vtk.js/Sources/Common/DataModel/ITKHelper'

import ResizeSensor from 'css-element-queries/src/ResizeSensor'

import proxyConfiguration from './proxyManagerConfiguration'
import UserInterface from './UserInterface'
import createLabelMapColorWidget from './UserInterface/Image/createLabelMapColorWidget'
import createPlaneIndexSliders from './UserInterface/Image/createPlaneIndexSliders'
import addKeyboardShortcuts from './addKeyboardShortcuts'
import rgb2hex from './UserInterface/rgb2hex'
import ViewerStore from './ViewerStore'
import createLabelMapRendering from './Rendering/createLabelMapRendering'
import createImageRendering from './Rendering/createImageRendering'
import updateVolumeProperties from './Rendering/updateVolumeProperties'

import { autorun, observable, reaction } from 'mobx'

const createViewer = (
  rootContainer,
  {
    image,
    multiscaleImage,
    labelMap,
    multiscaleLabelMap,
    labelMapAnnotations,
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
    return null
  }

  const proxyManager = vtkProxyManager.newInstance({ proxyConfiguration })
  window.addEventListener('resize', proxyManager.resizeAllViews)

  // Todo: deserialize from viewerState, if present
  const store = new ViewerStore(proxyManager)

  UserInterface.applyContainerStyle(rootContainer, store, viewerStyle)

  let updatingImage = false

  UserInterface.createMainUI(rootContainer, store, use2D, uiContainer)

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

      if (!!labelMapAnnotations) {
        store.imageUI.annotationMap = labelMapAnnotations
        store.itkVtkView.setAnnotationMap(labelMapAnnotations)
        store.itkVtkView.setLabelIndex(store.imageUI.numberOfComponents)
        console.log(
          `Setting annotation labelIndex to ${store.imageUI.numberOfComponents}`
        )
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
          store.renderWindow.render()
          updatingImage = false
        }, 0)
      }
    }
  )
  store.imageUI.image = image
  if (!!labelMap) {
    store.imageUI.labelMap = labelMap
  }

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

      // Estimate a reasonable point sphere radius in pixels
      const maxLength = pointSets.reduce((max, pointSet) => {
        pointSet.computeBounds()
        const bounds = pointSet.getBounds()
        max = Math.max(max, bounds[1] - bounds[0])
        max = Math.max(max, bounds[3] - bounds[2])
        max = Math.max(max, bounds[5] - bounds[4])
        return max
      }, -Infinity)
      const maxNumberOfPoints = pointSets.reduce((max, pointSet) => {
        max = Math.max(max, pointSet.getPoints().getNumberOfPoints())
        return max
      }, -Infinity)
      const radiusFactor =
        maxLength / ((1.0 + Math.log(maxNumberOfPoints)) * 30)
      store.pointSetsUI.representationProxies.forEach(proxy => {
        proxy.setRadiusFactor(radiusFactor)
      })

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

  setTimeout(store.itkVtkView.resetCamera, 1)

  UserInterface.addLogo(store)
  reaction(
    () => {
      return store.mainUI.fpsTooLow
    },

    tooLow => {
      if (!tooLow) {
        return
      }
      console.log('FPS is too low!')
    }
  )
  function updateFPS() {
    const nextFPS = 1 / store.renderWindow.getInteractor().getLastFrameTime()
    const fps = store.mainUI.fps
    fps.push(nextFPS)
    fps.shift()
    const mean = Math.round((fps[0] + fps[1] + fps[2]) / 3)
    // console.log(nextFPS)
    // console.log(mean)
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

  publicAPI.setUserInterfaceCollapsed = collapse => {
    const collapsed = store.mainUI.collapsed
    if ((collapse && !collapsed) || (!collapse && collapsed)) {
      store.mainUI.collapsed = !collapsed
    }
  }

  publicAPI.getUserInterfaceCollapsed = () => {
    return store.mainUI.collapsed
  }

  const toggleUserInterfaceCollapsedHandlers = []
  autorun(() => {
    const collapsed = store.mainUI.collapsed
    toggleUserInterfaceCollapsedHandlers.forEach(handler => {
      handler.call(null, collapsed)
    })
  })

  publicAPI.subscribeToggleUserInterfaceCollapsed = handler => {
    const index = toggleUserInterfaceCollapsedHandlers.length
    toggleUserInterfaceCollapsedHandlers.push(handler)
    function unsubscribe() {
      toggleUserInterfaceCollapsedHandlers[index] = null
    }
    return Object.freeze({ unsubscribe })
  }

  // Start collapsed on mobile devices or small pages
  if (window.screen.availWidth < 768 || window.screen.availHeight < 800) {
    publicAPI.setUserInterfaceCollapsed(true)
  }

  publicAPI.captureImage = () => {
    return store.itkVtkView.captureImage()
  }

  const toggleAnnotationsHandlers = []
  autorun(() => {
    const enabled = store.mainUI.annotationsEnabled
    toggleAnnotationsHandlers.forEach(handler => {
      handler.call(null, enabled)
    })
  })

  publicAPI.subscribeToggleAnnotations = handler => {
    const index = toggleAnnotationsHandlers.length
    toggleAnnotationsHandlers.push(handler)
    function unsubscribe() {
      toggleAnnotationsHandlers[index] = null
    }
    return Object.freeze({ unsubscribe })
  }

  publicAPI.setAnnotationsEnabled = enabled => {
    const annotations = store.mainUI.annotationsEnabled
    if ((enabled && !annotations) || (!enabled && annotations)) {
      store.mainUI.annotationsEnabled = enabled
    }
  }

  const toggleRotateHandlers = []
  autorun(() => {
    const enabled = store.mainUI.rotateEnabled
    toggleRotateHandlers.forEach(handler => {
      handler.call(null, enabled)
    })
  })

  publicAPI.subscribeToggleRotate = handler => {
    const index = toggleRotateHandlers.length
    toggleRotateHandlers.push(handler)
    function unsubscribe() {
      toggleRotateHandlers[index] = null
    }
    return Object.freeze({ unsubscribe })
  }

  publicAPI.setRotateEnabled = enabled => {
    const rotate = store.mainUI.rotateEnabled
    if ((enabled && !rotate) || (!enabled && rotate)) {
      store.mainUI.rotateEnabled = enabled
    }
  }

  const toggleFullscreenHandlers = []
  autorun(() => {
    const enabled = store.mainUI.fullscreenEnabled
    toggleFullscreenHandlers.forEach(handler => {
      handler.call(null, enabled)
    })
  })

  publicAPI.subscribeToggleFullscreen = handler => {
    const index = toggleFullscreenHandlers.length
    toggleFullscreenHandlers.push(handler)
    function unsubscribe() {
      toggleFullscreenHandlers[index] = null
    }
    return Object.freeze({ unsubscribe })
  }

  publicAPI.setFullscreenEnabled = enabled => {
    const fullscreen = store.mainUI.fullscreenEnabled
    if ((enabled && !fullscreen) || (!enabled && fullscreen)) {
      store.mainUI.fullscreenEnabled = enabled
    }
  }

  const toggleInterpolationHandlers = []
  autorun(() => {
    const enabled = store.mainUI.interpolationEnabled
    toggleInterpolationHandlers.forEach(handler => {
      handler.call(null, enabled)
    })
  })

  publicAPI.subscribeToggleInterpolation = handler => {
    const index = toggleInterpolationHandlers.length
    toggleInterpolationHandlers.push(handler)
    function unsubscribe() {
      toggleInterpolationHandlers[index] = null
    }
    return Object.freeze({ unsubscribe })
  }

  publicAPI.setInterpolationEnabled = enabled => {
    const interpolation = store.mainUI.interpolationEnabled
    if ((enabled && !interpolation) || (!enabled && interpolation)) {
      store.mainUI.interpolationEnabled = enabled
    }
  }

  const toggleCroppingPlanesHandlers = []
  autorun(() => {
    const enabled = store.mainUI.croppingPlanesEnabled
    toggleCroppingPlanesHandlers.forEach(handler => {
      handler.call(null, enabled)
    })
  })

  publicAPI.subscribeToggleCroppingPlanes = handler => {
    const index = toggleCroppingPlanesHandlers.length
    toggleCroppingPlanesHandlers.push(handler)
    function unsubscribe() {
      toggleCroppingPlanesHandlers[index] = null
    }
    return Object.freeze({ unsubscribe })
  }

  publicAPI.setCroppingPlanesEnabled = enabled => {
    const cropping = store.mainUI.croppingPlanesEnabled
    if ((enabled && !cropping) || (!enabled && cropping)) {
      store.mainUI.croppingPlanesEnabled = enabled
    }
  }

  publicAPI.subscribeCroppingPlanesChanged = handler => {
    return store.imageUI.addCroppingPlanesChangedHandler(handler)
  }

  publicAPI.subscribeResetCrop = handler => {
    return store.imageUI.addResetCropHandler(handler)
  }

  const changeColorRangeHandlers = []
  autorun(() => {
    const colorRanges = store.imageUI.colorRanges
    const selectedComponentIndex = store.imageUI.selectedComponentIndex
    changeColorRangeHandlers.forEach(handler => {
      handler.call(null, componentIndex, colorRanges[componentIndex])
    })
  })

  publicAPI.subscribeChangeColorRange = handler => {
    const index = changeColorRangeHandlers.length
    changeColorRangeHandlers.push(handler)
    function unsubscribe() {
      changeColorRangeHandlers[index] = null
    }
    return Object.freeze({ unsubscribe })
  }

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

  const selectColorMapHandlers = []
  autorun(() => {
    const selectedComponentIndex = store.imageUI.selectedComponentIndex
    if (store.imageUI.colorMaps) {
      const colorMap = store.imageUI.colorMaps[selectedComponentIndex]
      selectColorMapHandlers.forEach(handler => {
        handler.call(null, selectedComponentIndex, colorMap)
      })
    }
  })

  publicAPI.subscribeSelectColorMap = handler => {
    const index = selectColorMapHandlers.length
    selectColorMapHandlers.push(handler)
    function unsubscribe() {
      selectColorMapHandlers[index] = null
    }
    return Object.freeze({ unsubscribe })
  }

  publicAPI.setColorMap = (componentIndex, colorMap) => {
    const currentColorMap = store.imageUI.colorMaps[componentIndex]
    if (currentColorMap !== colorMap) {
      store.imageUI.colorMaps[componentIndex] = colorMap
    }
  }

  publicAPI.getColorMap = componentIndex => {
    return store.imageUI.colorMaps[componentIndex]
  }

  if (!use2D) {
    const viewModeChangedHandlers = []
    reaction(
      () => {
        return store.mainUI.viewMode
      },
      viewMode => {
        switch (viewMode) {
          case 'XPlane':
            viewModeChangedHandlers.forEach(handler => {
              handler.call(null, 'XPlane')
            })
            break
          case 'YPlane':
            viewModeChangedHandlers.forEach(handler => {
              handler.call(null, 'YPlane')
            })
            break
          case 'ZPlane':
            viewModeChangedHandlers.forEach(handler => {
              handler.call(null, 'ZPlane')
            })
            break
          case 'VolumeRendering':
            viewModeChangedHandlers.forEach(handler => {
              handler.call(null, 'VolumeRendering')
            })
            break
          default:
            console.error('Invalid view mode: ' + viewMode)
        }
      }
    )

    publicAPI.subscribeViewModeChanged = handler => {
      const index = viewModeChangedHandlers.length
      viewModeChangedHandlers.push(handler)
      function unsubscribe() {
        viewModeChangedHandlers[index] = null
      }
      return Object.freeze({ unsubscribe })
    }

    publicAPI.setViewMode = mode => {
      if (!image) {
        return
      }
      store.mainUI.viewMode = mode
    }

    const xSliceChangedHandlers = []
    reaction(
      () => {
        return store.imageUI.xSlice
      },
      xSlice => {
        xSliceChangedHandlers.forEach(handler => {
          handler.call(null, xSlice)
        })
      }
    )
    publicAPI.subscribeXSliceChanged = handler => {
      const index = xSliceChangedHandlers.length
      xSliceChangedHandlers.push(handler)
      function unsubscribe() {
        xSliceChangedHandlers[index] = null
      }
      return Object.freeze({ unsubscribe })
    }

    publicAPI.setXSlice = position => {
      const currentPosition = store.imageUI.xSlice
      if (currentPosition !== parseFloat(position)) {
        store.imageUI.xSlice = position
      }
    }
    publicAPI.getXSlice = () => {
      return store.imageUI.xSlice
    }

    const ySliceChangedHandlers = []
    reaction(
      () => {
        return store.imageUI.ySlice
      },
      ySlice => {
        ySliceChangedHandlers.forEach(handler => {
          handler.call(null, ySlice)
        })
      }
    )
    publicAPI.subscribeYSliceChanged = handler => {
      const index = ySliceChangedHandlers.length
      ySliceChangedHandlers.push(handler)
      function unsubscribe() {
        ySliceChangedHandlers[index] = null
      }
      return Object.freeze({ unsubscribe })
    }

    publicAPI.setYSlice = position => {
      const currentPosition = store.imageUI.ySlice
      if (currentPosition !== parseFloat(position)) {
        store.imageUI.ySlice = position
      }
    }
    publicAPI.getYSlice = () => {
      return store.imageUI.ySlice
    }

    const zSliceChangedHandlers = []
    reaction(
      () => {
        return store.imageUI.zSlice
      },
      zSlice => {
        zSliceChangedHandlers.forEach(handler => {
          handler.call(null, zSlice)
        })
      }
    )
    publicAPI.subscribeZSliceChanged = handler => {
      const index = zSliceChangedHandlers.length
      zSliceChangedHandlers.push(handler)
      function unsubscribe() {
        zSliceChangedHandlers[index] = null
      }
      return Object.freeze({ unsubscribe })
    }

    publicAPI.setZSlice = position => {
      const currentPosition = store.imageUI.zSlice
      if (currentPosition !== parseFloat(position)) {
        store.imageUI.zSlice = position
      }
    }
    publicAPI.getZSlice = () => {
      return store.imageUI.zSlice
    }

    const toggleShadowHandlers = []
    autorun(() => {
      const enabled = store.imageUI.useShadow
      toggleShadowHandlers.forEach(handler => {
        handler.call(null, enabled)
      })
    })

    publicAPI.subscribeToggleShadow = handler => {
      const index = toggleShadowHandlers.length
      toggleShadowHandlers.push(handler)
      function unsubscribe() {
        toggleShadowHandlers[index] = null
      }
      return Object.freeze({ unsubscribe })
    }

    publicAPI.setShadowEnabled = enabled => {
      const shadow = store.imageUI.useShadow
      if ((enabled && !shadow) || (!enabled && shadow)) {
        store.imageUI.useShadow = enabled
      }
    }

    const toggleSlicingPlanesHandlers = []
    autorun(() => {
      const enabled = store.imageUI.slicingPlanesEnabled
      toggleSlicingPlanesHandlers.forEach(handler => {
        handler.call(null, enabled)
      })
    })

    publicAPI.subscribeToggleSlicingPlanes = handler => {
      const index = toggleSlicingPlanesHandlers.length
      toggleSlicingPlanesHandlers.push(handler)
      function unsubscribe() {
        toggleSlicingPlanesHandlers[index] = null
      }
      return Object.freeze({ unsubscribe })
    }

    publicAPI.setSlicingPlanesEnabled = enabled => {
      const slicingPlanes = store.imageUI.slicingPlanesEnabled
      if ((enabled && !slicingPlanes) || (!enabled && slicingPlanes)) {
        store.imageUI.slicingPlanesEnabled = enabled
      }
    }

    const gradientOpacitySliderHandlers = []
    autorun(() => {
      const gradientOpacity = store.imageUI.gradientOpacity
      gradientOpacitySliderHandlers.forEach(handler => {
        handler.call(null, gradientOpacity)
      })
    })

    publicAPI.subscribeGradientOpacityChanged = handler => {
      const index = gradientOpacitySliderHandlers.length
      gradientOpacitySliderHandlers.push(handler)
      function unsubscribe() {
        gradientOpacitySliderHandlers[index] = null
      }
      return Object.freeze({ unsubscribe })
    }

    publicAPI.setGradientOpacity = opacity => {
      const currentOpacity = store.imageUI.gradientOpacity
      if (currentOpacity !== parseFloat(opacity)) {
        store.imageUI.gradientOpacity = opacity
      }
    }

    const blendModeHandlers = []
    autorun(() => {
      const blendMode = store.imageUI.blendMode
      blendModeHandlers.forEach(handler => {
        handler.call(null, blendMode)
      })
    })

    publicAPI.subscribeBlendModeChanged = handler => {
      const index = blendModeHandlers.length
      blendModeHandlers.push(handler)
      function unsubscribe() {
        blendModeHandlers[index] = null
      }
      return Object.freeze({ unsubscribe })
    }

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

  //publicAPI.subscribeSelectColorMap = (handler) => {
  //const index = inputPointSetColorHandlers.length;
  //inputPointSetColorHandlers.push(handler);
  //function unsubscribe() {
  //inputPointSetColorHandlers[index] = null;
  //}
  //return Object.freeze({ unsubscribe });
  //}

  publicAPI.setPointSetColor = (index, rgbColor) => {
    const hexColor = rgb2hex(rgbColor)
    if (index < store.pointSetsUI.colors.length) {
      store.pointSetsUI.colors[index] = hexColor
    }
  }

  publicAPI.setPointSetOpacity = (index, opacity) => {
    if (index < store.pointSetsUI.opacities.length) {
      store.pointSetsUI.opacities[index] = opacity
    }
  }

  publicAPI.setPointSetRepresentation = (index, representation) => {
    if (index < store.pointSetsUI.representations.length) {
      store.pointSetsUI.representations[index] = representation
    }
  }

  const pointSetRepresentationChangedHandlers = []
  reaction(
    () => {
      return store.pointSetsUI.representations.slice()
    },
    representations => {
      const selectedPointSetIndex = store.pointSetsUI.selectedPointSetIndex
      const representation = representations[selectedPointSetIndex]
      pointSetRepresentationChangedHandlers.forEach(handler => {
        handler.call(null, selectedPointSetIndex, representation)
      })
    }
  )
  publicAPI.subscribePointSetRepresentationChanged = handler => {
    const index = pointSetRepresentationChangedHandlers.length
    pointSetRepresentationChangedHandlers.push(handler)
    function unsubscribe() {
      pointSetRepresentationChangedHandlers[index] = null
    }
    return Object.freeze({ unsubscribe })
  }

  //publicAPI.subscribeSelectColorMap = (handler) => {
  //const index = inputGeometryColorHandlers.length;
  //inputGeometryColorHandlers.push(handler);
  //function unsubscribe() {
  //inputGeometryColorHandlers[index] = null;
  //}
  //return Object.freeze({ unsubscribe });
  //}

  publicAPI.setGeometryColor = (index, rgbColor) => {
    const hexColor = rgb2hex(rgbColor)
    store.geometriesUI.colors[index] = hexColor
  }

  publicAPI.setGeometryOpacity = (index, opacity) => {
    store.geometriesUI.opacities[index] = opacity
  }

  publicAPI.setBackgroundColor = bgColor => {
    store.style.backgroundColor = bgColor
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
  addKeyboardShortcuts(rootContainer, publicAPI, viewerDOMId)

  if (!use2D) {
    publicAPI.setRotateEnabled(rotate)
  }

  return publicAPI
}

export default createViewer
