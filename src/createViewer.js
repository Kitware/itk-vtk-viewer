import vtkProxyManager from 'vtk.js/Sources/Proxy/Core/ProxyManager';
import macro from 'vtk.js/Sources/macro';

import ResizeSensor from 'css-element-queries/src/ResizeSensor';

import proxyConfiguration from './proxyManagerConfiguration';
import UserInterface from './UserInterface';
import addKeyboardShortcuts from './addKeyboardShortcuts';
import rgb2hex from './UserInterface/rgb2hex';
import ViewerStore from './ViewerStore';
import { autorun, reaction } from 'mobx';

let geometryNameCount = 0
let pointSetNameCount = 0

function applyStyle(el, style) {
  Object.keys(style).forEach((key) => {
    el.style[key] = style[key];
  });
}

const createViewer = (
  rootContainer,
  { image, geometries, pointSets, use2D = false, rotate = true, viewerStyle, viewerState }
) => {
  UserInterface.emptyContainer(rootContainer);

  const proxyManager = vtkProxyManager.newInstance({ proxyConfiguration });
  window.addEventListener('resize', proxyManager.resizeAllViews);


  // Todo: deserialize from viewerState, if present
  const viewerStore = new ViewerStore(proxyManager);

  applyStyle(viewerStore.container, viewerStore.style.containerStyle);
  rootContainer.appendChild(viewerStore.container);
  autorun(() => {
    applyStyle(viewerStore.container, viewerStore.style.containerStyle);
  })
  autorun(() => {
    viewerStore.itkVtkView.setBackground(viewerStore.style.backgroundColor);
  })

  if (viewerStyle) {
    viewerStore.style = viewerStyle;
  }
  console.log(viewerStore)

  const testCanvas = document.createElement("canvas");
  const gl = testCanvas.getContext("webgl")
      || testCanvas.getContext("experimental-webgl");
  if (!(gl && gl instanceof WebGLRenderingContext)) {
    const suggestion = document.createElement("p");
    const preSuggestionText = document.createTextNode("WebGL could not be loaded. ");
    suggestion.appendChild(preSuggestionText);
    const getWebGLA = document.createElement("a");
    getWebGLA.setAttribute("href", "http://get.webgl.org/troubleshooting");
    const getWebGLAText = document.createTextNode("Try a different browser or video drivers for WebGL support.");
    getWebGLA.appendChild(getWebGLAText);
    suggestion.appendChild(getWebGLA);
    const suggestionText = document.createTextNode(" This is required to view interactive 3D visualizations.");
    suggestion.appendChild(suggestionText);
    container.appendChild(suggestion);
    return null;
  }

  UserInterface.addLogo(container);

  const { uiContainer } = UserInterface.createMainUI(
    rootContainer,
    viewerStore,
    use2D,
  );

  reaction(() => viewerStore.image,
    (image) => {
      if (!!!image) {
        return;
      }
      viewerStore.imageUI.source.setInputData(image);

      proxyManager.createRepresentationInAllViews(viewerStore.imageUI.source);
      viewerStore.imageUI.representationProxy = proxyManager.getRepresentation(viewerStore.imageUI.source, viewerStore.itkVtkView);

      const dataArray = image.getPointData().getScalars();
      viewerStore.imageUI.lookupTableProxy = proxyManager.getLookupTable(dataArray.getName());
      if (dataArray.getNumberOfComponents() > 1) {
        viewerStore.imageUI.lookupTableProxy.setPresetName('Grayscale');
      } else {
        viewerStore.imageUI.lookupTableProxy.setPresetName('Viridis (matplotlib)');
      }
      viewerStore.imageUI.piecewiseFunctionProxy = proxyManager.getPiecewiseFunction(dataArray.getName());

      // Slices share the same lookup table as the volume rendering.
      const lut = viewerStore.imageUI.lookupTableProxy.getLookupTable();
      const sliceActors = viewerStore.imageUI.representationProxy.getActors();
      sliceActors.forEach((actor) => {
        actor.getProperty().setRGBTransferFunction(lut);
      });

      if (use2D) {
        viewerStore.itkVtkView.setViewMode('ZPlane');
        viewerStore.itkVtkView.setOrientationAxesVisibility(false);
      } else {
        viewerStore.itkVtkView.setViewMode('VolumeRendering');
      }

      UserInterface.createImageUI(
        uiContainer,
        viewerStore,
        use2D
      );
      const annotationContainer = container.querySelector('.js-se');
      annotationContainer.style.fontFamily = 'monospace';
    }
  );
  viewerStore.image = image;

  let geometryRepresentationProxies = []
  let geometrySources = []
  if(!!geometries && geometries.length > 0) {
    geometries.forEach((geometry) => {
      const uid = `Geometry${geometryNameCount++}`
      const geometrySource = proxyManager.createProxy('Sources', 'TrivialProducer', {
        name: uid,
      });
      geometrySource.setInputData(geometry)
      proxyManager.createRepresentationInAllViews(geometrySource);
      const geometryRepresentation = proxyManager.getRepresentation(geometrySource, viewerStore.itkVtkView);
      geometrySources.push(geometrySource)
      geometryRepresentationProxies.push(geometryRepresentation)
    })
  }

  let pointSetRepresentationProxies = []
  let pointSetSources = []
  if(!!pointSets && pointSets.length > 0) {
    pointSets.forEach((pointSet) => {
      const sourceUid = `pointSetSource${pointSetNameCount++}`
      const pointSetSource = proxyManager.createProxy('Sources', 'TrivialProducer', {
        name: sourceUid,
      });
      pointSetSource.setInputData(pointSet)
      const pointSetRepresentationUid = `pointSetRepresentation${pointSetNameCount}`
      const pointSetRepresentation = proxyManager.createProxy('Representations', 'PointSet', {
        name: pointSetRepresentationUid,
      });
      pointSetRepresentation.setInput(pointSetSource);
      viewerStore.itkVtkView.addRepresentation(pointSetRepresentation);
      pointSetSources.push(pointSetSource)
      pointSetRepresentationProxies.push(pointSetRepresentation)
    })
  }

  let geometriesUI = null
  if(!!geometries && geometries.length > 0) {
    geometriesUI = UserInterface.createGeometriesUI(
      uiContainer,
      geometries,
      geometryRepresentationProxies,
      viewerStore
    );
  }

  let pointSetsUI = null
  if(!!pointSets && pointSets.length > 0) {
    pointSetsUI = UserInterface.createPointSetsUI(
      uiContainer,
      pointSets,
      pointSetRepresentationProxies,
      viewerStore
    );
  }

  viewerStore.itkVtkView.resize();
  const resizeSensor = new ResizeSensor(container, function() {
    viewerStore.itkVtkView.resize();
  });
  proxyManager.renderAllViews();

  // Estimate a reasonable point sphere radius in pixels
  if(!!pointSets && pointSets.length > 0) {
    const renderView = viewerStore.itkVtkView.getRenderWindow().getViews()[0];
    const windowWidth = renderView.getViewportSize(viewerStore.itkVtkView.getRenderer())[0];
    const maxLength = pointSets.reduce((max, pointSet) => {
      pointSet.computeBounds();
      const bounds = pointSet.getBounds();
      max = Math.max(max, bounds[1] - bounds[0]);
      max = Math.max(max, bounds[3] - bounds[2]);
      max = Math.max(max, bounds[5] - bounds[4]);
      return max;
    }, -Infinity);
    const radiusFactor = windowWidth / maxLength * 2e-4;
    pointSetRepresentationProxies.forEach((proxy) => {
      proxy.setRadiusFactor(radiusFactor);
    })
  }

  setTimeout(viewerStore.itkVtkView.resetCamera, 1);

  const publicAPI = {};

  publicAPI.renderLater = () => {
    viewerStore.itkVtkView.renderLater();
  }

  const viewerDOMId = viewerStore.id;

  let updatingImage = false;
  const setImage = (image) => {
    if (updatingImage) {
      return;
    }
    updatingImage = true;
    viewerStore.imageUI.source.setInputData(image);
    const transferFunctionWidget = viewerStore.imageUI.transferFunctionWidget;
    transferFunctionWidget.setDataArray(image.getPointData().getScalars().getData());
    transferFunctionWidget.invokeOpacityChange(transferFunctionWidget);
    transferFunctionWidget.modified();
    viewerStore.imageUI.croppingWidget.setVolumeMapper(viewerStore.imageUI.representationProxy.getMapper());
    const cropFilter = viewerStore.imageUI.representationProxy.getCropFilter();
    cropFilter.reset();
    viewerStore.imageUI.croppingWidget.resetWidgetState();
    setTimeout(() => {
      transferFunctionWidget.render();
      viewerStore.itkVtkView.getRenderWindow().render();
      updatingImage = false;
    }, 0);
  }
  publicAPI.setImage = macro.throttle(setImage, 100);

  publicAPI.setPointSets = (pointsets) => {
    if (pointsets.length > pointSetRepresentationProxies.length) {
      pointsets.slice(pointSetRepresentationProxies.length).forEach((pointSet) => {
        const uid = `pointSet${pointSetNameCount++}`
        const pointSetSource = proxyManager.createProxy('Sources', 'TrivialProducer', {
          name: uid,
        });
        pointSetSource.setInputData(pointSet)
        proxyManager.createRepresentationInAllViews(pointSetSource);
        const pointSetRepresentation = proxyManager.getRepresentation(pointSetSource, viewerStore.itkVtkView);
        pointSetSources.push(pointSetSource)
        pointSetRepresentationProxies.push(pointSetRepresentation);
      })
    } else if(pointsets.length < pointSetRepresentationProxies.length) {
      pointSetRepresentationProxies.splice(pointsets.length);
    }
    pointsets.forEach((pointSet, index) => {
      pointSetSources[index].setInputData(pointSet);
    })
  }

  publicAPI.setGeometries = (geometries) => {
    if (geometries.length > geometryRepresentationProxies.length) {
      geometries.slice(geometryRepresentationProxies.length).forEach((geometry) => {
        const uid = `Geometry${geometryNameCount++}`
        const geometrySource = proxyManager.createProxy('Sources', 'TrivialProducer', {
          name: uid,
        });
        geometrySource.setInputData(geometry)
        proxyManager.createRepresentationInAllViews(geometrySource);
        const geometryRepresentation = proxyManager.getRepresentation(geometrySource, viewerStore.itkVtkView);
        geometrySources.push(geometrySource)
        geometryRepresentationProxies.push(geometryRepresentation);
      })
    } else if(geometries.length < geometryRepresentationProxies.length) {
      geometryRepresentationProxies.splice(geometries.length);
    }
    geometries.forEach((geometry, index) => {
      geometrySources[index].setInputData(geometry);
    })
  }

  const toggleUserInterfaceButton = document.getElementById(`${viewerDOMId}-toggleUserInterfaceButton`);

  publicAPI.setUserInterfaceCollapsed = (collapse) => {
    const collapsed = toggleUserInterfaceButton.getAttribute('collapsed') === 'true';
    if (collapse && !collapsed || !collapse && collapsed) {
      toggleUserInterfaceButton.click();
    }
  }

  const toggleUserInterfaceCollapsedHandlers = [];
  const toggleUserInterfaceButtonListener = (event) => {
    const collapsed = toggleUserInterfaceButton.getAttribute('collapsed') === 'true';
    toggleUserInterfaceCollapsedHandlers.forEach((handler) => {
      handler.call(null, collapsed);
    })
  }
  toggleUserInterfaceButton.addEventListener('click', toggleUserInterfaceButtonListener)

  publicAPI.subscribeToggleUserInterfaceCollapsed = (handler) => {
    const index = toggleUserInterfaceCollapsedHandlers.length;
    toggleUserInterfaceCollapsedHandlers.push(handler);
    function unsubscribe() {
      toggleUserInterfaceCollapsedHandlers[index] = null;
    }
    return Object.freeze({ unsubscribe });
  }

  // Start collapsed on mobile devices or small pages
  if (window.screen.availWidth < 768 || window.screen.availHeight < 800) {
    publicAPI.setUserInterfaceCollapsed(true);
  }


  publicAPI.captureImage = () => {
    return viewerStore.itkVtkView.captureImage();
  }


  const toggleAnnotationsButton = document.getElementById(`${viewerDOMId}-toggleAnnotationsButton`);

  const toggleAnnotationsHandlers = [];
  const toggleAnnotationsButtonListener = (event) => {
    const enabled = toggleAnnotationsButton.checked;
    toggleAnnotationsHandlers.forEach((handler) => {
      handler.call(null, enabled);
    })
  }
  toggleAnnotationsButton.addEventListener('click', toggleAnnotationsButtonListener)

  publicAPI.subscribeToggleAnnotations = (handler) => {
    const index = toggleAnnotationsHandlers.length;
    toggleAnnotationsHandlers.push(handler);
    function unsubscribe() {
      toggleAnnotationsHandlers[index] = null;
    }
    return Object.freeze({ unsubscribe });
  }

  publicAPI.setAnnotationsEnabled = (enabled) => {
    const annotations = toggleAnnotationsButton.checked;
    if (enabled && !annotations || !enabled && annotations) {
      toggleAnnotationsButton.click();
    }
  }


  const toggleFullscreenButton = document.getElementById(`${viewerDOMId}-toggleFullscreenButton`);

  const toggleFullscreenHandlers = [];
  const toggleFullscreenButtonListener = (event) => {
    const enabled = toggleFullscreenButton.checked;
    toggleFullscreenHandlers.forEach((handler) => {
      handler.call(null, enabled);
    })
  }
  toggleFullscreenButton.addEventListener('click', toggleFullscreenButtonListener)

  publicAPI.subscribeToggleFullscreen = (handler) => {
    const index = toggleFullscreenHandlers.length;
    toggleFullscreenHandlers.push(handler);
    function unsubscribe() {
      toggleFullscreenHandlers[index] = null;
    }
    return Object.freeze({ unsubscribe });
  }

  publicAPI.setFullscreenEnabled = (enabled) => {
    const fullscreen = toggleFullscreenButton.checked;
    if (enabled && !fullscreen || !enabled && fullscreen) {
      toggleFullscreenButton.click();
    }
  }

  const toggleRotateButton = document.getElementById(`${viewerDOMId}-toggleRotateButton`);

  const toggleRotateHandlers = [];
  const toggleRotateButtonListener = (event) => {
    const enabled = toggleRotateButton.checked;
    toggleRotateHandlers.forEach((handler) => {
      handler.call(null, enabled);
    })
  }
  toggleRotateButton.addEventListener('click', toggleRotateButtonListener)

  publicAPI.subscribeToggleRotate = (handler) => {
    const index = toggleRotateHandlers.length;
    toggleRotateHandlers.push(handler);
    function unsubscribe() {
      toggleRotateHandlers[index] = null;
    }
    return Object.freeze({ unsubscribe });
  }

  publicAPI.setRotateEnabled = (enabled) => {
    const rotate = toggleRotateButton.checked;
    if (enabled && !rotate || !enabled && rotate) {
      toggleRotateButton.click();
    }
  }

  const toggleInterpolationButton = document.getElementById(`${viewerDOMId}-toggleInterpolationButton`);

  const toggleInterpolationHandlers = [];
  const toggleInterpolationButtonListener = (event) => {
    const enabled = toggleInterpolationButton.checked;
    toggleInterpolationHandlers.forEach((handler) => {
      handler.call(null, enabled);
    })
  }
  toggleInterpolationButton && toggleInterpolationButton.addEventListener('click', toggleInterpolationButtonListener)

  publicAPI.subscribeToggleInterpolation = (handler) => {
    const index = toggleInterpolationHandlers.length;
    toggleInterpolationHandlers.push(handler);
    function unsubscribe() {
      toggleInterpolationHandlers[index] = null;
    }
    return Object.freeze({ unsubscribe });
  }

  publicAPI.setInterpolationEnabled = (enabled) => {
    const interpolation = toggleInterpolationButton.checked;
    if (enabled && !interpolation || !enabled && interpolation) {
      toggleInterpolationButton.click();
    }
  }


  const toggleCroppingPlanesButton = document.getElementById(`${viewerDOMId}-toggleCroppingPlanesButton`);

  const toggleCroppingPlanesHandlers = [];
  const toggleCroppingPlanesButtonListener = (event) => {
    const enabled = toggleCroppingPlanesButton.checked;
    toggleCroppingPlanesHandlers.forEach((handler) => {
      handler.call(null, enabled);
    })
  }
  toggleCroppingPlanesButton && toggleCroppingPlanesButton.addEventListener('click', toggleCroppingPlanesButtonListener)

  publicAPI.subscribeToggleCroppingPlanes = (handler) => {
    const index = toggleCroppingPlanesHandlers.length;
    toggleCroppingPlanesHandlers.push(handler);
    function unsubscribe() {
      toggleCroppingPlanesHandlers[index] = null;
    }
    return Object.freeze({ unsubscribe });
  }

  publicAPI.setCroppingPlanesEnabled = (enabled) => {
    const shadow = toggleCroppingPlanesButton.checked;
    if (enabled && !shadow || !enabled && shadow) {
      toggleCroppingPlanesButton.click();
    }
  }

  publicAPI.subscribeCroppingPlanesChanged = (handler) => {
    return viewerStore.addCroppingPlanesChangedHandler(handler);
  }

  publicAPI.subscribeResetCrop = (handler) => {
    return viewerStore.imageUI.addResetCropHandler(handler);
  }

  const colorMapSelector = document.getElementById(`${viewerDOMId}-colorMapSelector`);

  const selectColorMapHandlers = [];
  const selectColorMapListener = (event) => {
    const value = colorMapSelector.value;
    selectColorMapHandlers.forEach((handler) => {
      handler.call(null, value);
    })
  }
  if (colorMapSelector !== null) {
    colorMapSelector.addEventListener('change', selectColorMapListener);
  }

  publicAPI.subscribeSelectColorMap = (handler) => {
    const index = selectColorMapHandlers.length;
    selectColorMapHandlers.push(handler);
    function unsubscribe() {
      selectColorMapHandlers[index] = null;
    }
    return Object.freeze({ unsubscribe });
  }

  publicAPI.setColorMap = (colorMap) => {
    if (colorMapSelector !== null) {
      const currentColorMap = colorMapSelector.value;
      if (currentColorMap !== colorMap) {
        colorMapSelector.value = colorMap;
        viewerStore.imageUI.updateColorMap();
      }
    }
  }


  if (!use2D) {
    const xPlaneButton = document.getElementById(`${viewerDOMId}-xPlaneButton`);
    const yPlaneButton = document.getElementById(`${viewerDOMId}-yPlaneButton`);
    const zPlaneButton = document.getElementById(`${viewerDOMId}-zPlaneButton`);
    const volumeRenderingButton = document.getElementById(`${viewerDOMId}-volumeRenderingButton`);

    const viewModeChangedHandlers = [];
    const xPlaneButtonListener = (event) => {
      viewModeChangedHandlers.forEach((handler) => {
        handler.call(null, 'XPlane');
      })
    }
    xPlaneButton.addEventListener('click', xPlaneButtonListener)
    const yPlaneButtonListener = (event) => {
      viewModeChangedHandlers.forEach((handler) => {
        handler.call(null, 'YPlane');
      })
    }
    yPlaneButton.addEventListener('click', yPlaneButtonListener)
    const zPlaneButtonListener = (event) => {
      viewModeChangedHandlers.forEach((handler) => {
        handler.call(null, 'ZPlane');
      })
    }
    zPlaneButton.addEventListener('click', zPlaneButtonListener)
    const volumeRenderingButtonListener = (event) => {
      viewModeChangedHandlers.forEach((handler) => {
        handler.call(null, 'VolumeRendering');
      })
    }
    volumeRenderingButton.addEventListener('click', volumeRenderingButtonListener)

    publicAPI.subscribeViewModeChanged = (handler) => {
      const index = viewModeChangedHandlers.length;
      viewModeChangedHandlers.push(handler);
      function unsubscribe() {
        viewModeChangedHandlers[index] = null;
      }
      return Object.freeze({ unsubscribe });
    }

    publicAPI.setViewMode = (mode) => {
      if (!image) {
        return
      }
      switch(mode) {
      case 'XPlane':
        const xPlaneButton = document.getElementById(`${viewerDOMId}-xPlaneButton`);
        xPlaneButton.click();
        break;
      case 'YPlane':
        const yPlaneButton = document.getElementById(`${viewerDOMId}-yPlaneButton`);
        yPlaneButton.click();
        break;
      case 'ZPlane':
        const zPlaneButton = document.getElementById(`${viewerDOMId}-zPlaneButton`);
        zPlaneButton.click();
        break;
      case 'VolumeRendering':
        const volumeRenderingButton = document.getElementById(`${viewerDOMId}-volumeRenderingButton`);
        volumeRenderingButton.click();
        break;
      default:
        console.error('Invalid view mode: ' + mode);
      }
    }


    const xSliceChangedHandlers = [];
    const xSliceChangedListener = (event) => {
      xSliceChangedHandlers.forEach((handler) => {
        handler.call(null, event.target.valueAsNumber);
      })
    }
    const xSliceElement = document.getElementById(`${viewerDOMId}-xSlice`);
    xSliceElement && xSliceElement.addEventListener('input', xSliceChangedListener);
    publicAPI.subscribeXSliceChanged = (handler) => {
      const index = xSliceChangedHandlers.length;
      xSliceChangedHandlers.push(handler);
      function unsubscribe() {
        xSliceChangedHandlers[index] = null;
      }
      return Object.freeze({ unsubscribe });
    }

    const ySliceChangedHandlers = [];
    const ySliceChangedListener = (event) => {
      ySliceChangedHandlers.forEach((handler) => {
        handler.call(null, event.target.valueAsNumber);
      })
    }
    const ySliceElement = document.getElementById(`${viewerDOMId}-ySlice`);
    ySliceElement && ySliceElement.addEventListener('input', ySliceChangedListener);
    publicAPI.subscribeYSliceChanged = (handler) => {
      const index = ySliceChangedHandlers.length;
      ySliceChangedHandlers.push(handler);
      function unsubscribe() {
        ySliceChangedHandlers[index] = null;
      }
      return Object.freeze({ unsubscribe });
    }

    const zSliceChangedHandlers = [];
    const zSliceChangedListener = (event) => {
      zSliceChangedHandlers.forEach((handler) => {
        handler.call(null, event.target.valueAsNumber);
      })
    }
    const zSliceElement = document.getElementById(`${viewerDOMId}-zSlice`);
    zSliceElement && zSliceElement.addEventListener('input', zSliceChangedListener);
    publicAPI.subscribeZSliceChanged = (handler) => {
      const index = zSliceChangedHandlers.length;
      zSliceChangedHandlers.push(handler);
      function unsubscribe() {
        zSliceChangedHandlers[index] = null;
      }
      return Object.freeze({ unsubscribe });
    }


    const toggleShadowButton = document.getElementById(`${viewerDOMId}-toggleShadowButton`);

    const toggleShadowHandlers = [];
    const toggleShadowButtonListener = (event) => {
      const enabled = toggleShadowButton.checked;
      toggleShadowHandlers.forEach((handler) => {
        handler.call(null, enabled);
      })
    }
    toggleShadowButton && toggleShadowButton.addEventListener('click', toggleShadowButtonListener)

    publicAPI.subscribeToggleShadow = (handler) => {
      const index = toggleShadowHandlers.length;
      toggleShadowHandlers.push(handler);
      function unsubscribe() {
        toggleShadowHandlers[index] = null;
      }
      return Object.freeze({ unsubscribe });
    }

    publicAPI.setShadowEnabled = (enabled) => {
      const shadow = toggleShadowButton.checked;
      if (enabled && !shadow || !enabled && shadow) {
        toggleShadowButton.click();
      }
    }


    const toggleSlicingPlanesButton = document.getElementById(`${viewerDOMId}-toggleSlicingPlanesButton`);

    const toggleSlicingPlanesHandlers = [];
    const toggleSlicingPlanesButtonListener = (event) => {
      const enabled = toggleSlicingPlanesButton.checked;
      toggleSlicingPlanesHandlers.forEach((handler) => {
        handler.call(null, enabled);
      })
    }
    toggleSlicingPlanesButton && toggleSlicingPlanesButton.addEventListener('click', toggleSlicingPlanesButtonListener)

    publicAPI.subscribeToggleSlicingPlanes = (handler) => {
      const index = toggleSlicingPlanesHandlers.length;
      toggleSlicingPlanesHandlers.push(handler);
      function unsubscribe() {
        toggleSlicingPlanesHandlers[index] = null;
      }
      return Object.freeze({ unsubscribe });
    }

    publicAPI.setSlicingPlanesEnabled = (enabled) => {
      const slicingPlanes = toggleSlicingPlanesButton.checked;
      if (enabled && !slicingPlanes || !enabled && slicingPlanes) {
        toggleSlicingPlanesButton.click();
      }
    }


    const gradientOpacitySlider = document.getElementById(`${viewerDOMId}-gradientOpacitySlider`);

    const gradientOpacitySliderHandlers = [];
    const gradientOpacitySliderListener = (event) => {
      const value = gradientOpacitySlider.value;
      gradientOpacitySliderHandlers.forEach((handler) => {
        handler.call(null, value);
      })
    }
    gradientOpacitySlider && gradientOpacitySlider.addEventListener('change', gradientOpacitySliderListener)

    publicAPI.subscribeGradientOpacityChanged = (handler) => {
      const index = gradientOpacitySliderHandlers.length;
      gradientOpacitySliderHandlers.push(handler);
      function unsubscribe() {
        gradientOpacitySliderHandlers[index] = null;
      }
      return Object.freeze({ unsubscribe });
    }

    publicAPI.setGradientOpacity = (opacity) => {
      const current_opacity = parseFloat(gradientOpacitySlider.value);
      if (current_opacity !== parseFloat(opacity)) {
        gradientOpacitySlider.value = opacity;
        viewerStore.imageUI.updateGradientOpacity()
      }
    }
  }

  const pointSetSelector = document.getElementById(`${viewerDOMId}-pointSetSelector`);
  const pointSetColorInput = document.getElementById(`${viewerDOMId}-pointSetColorInput`);
  const pointSetOpacitySlider = document.getElementById(`${viewerDOMId}-pointSetOpacitySlider`);

  const inputPointSetColorHandlers = [];
  const inputPointSetColorListener = (event) => {
    const value = pointSetColorInput.value;
    inputPointSetColorHandlers.forEach((handler) => {
      handler.call(null, value);
    })
  }
  if (pointSetColorInput !== null) {
    pointSetColorInput.addEventListener('change', inputPointSetColorListener);
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
    if (pointSetColorInput !== null && pointSetSelector !== null) {
      if (index === pointSetSelector.selectedIndex) {
        const hexColor = rgb2hex(rgbColor);
        pointSetColorInput.value = hexColor;
      }
    }
    pointSetRepresentationProxies[index].setColor(Array.from(rgbColor));
  }

  publicAPI.setPointSetOpacity = (index, opacity) => {
    if (pointSetOpacitySlider !== null && pointSetSelector !== null) {
      if (index === pointSetSelector.selectedIndex) {
        pointSetOpacitySlider.value = opacity;
      }
    }
    pointSetRepresentationProxies[index].setOpacity(opacity);
  }

  const geometrySelector = document.getElementById(`${viewerDOMId}-geometrySelector`);
  const geometryColorInput = document.getElementById(`${viewerDOMId}-geometryColorInput`);
  const geometryOpacitySlider = document.getElementById(`${viewerDOMId}-geometryOpacitySlider`);

  const inputGeometryColorHandlers = [];
  const inputGeometryColorListener = (event) => {
    const value = geometryColorInput.value;
    inputGeometryColorHandlers.forEach((handler) => {
      handler.call(null, value);
    })
  }
  if (geometryColorInput !== null) {
    geometryColorInput.addEventListener('change', inputGeometryColorListener);
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
    if (geometryColorInput !== null && geometrySelector !== null) {
      if (index === geometrySelector.selectedIndex) {
        const hexColor = rgb2hex(rgbColor);
        geometryColorInput.value = hexColor;
      }
    }
    geometryRepresentationProxies[index].setColor(Array.from(rgbColor));
  }

  publicAPI.setGeometryOpacity = (index, opacity) => {
    if (geometryOpacitySlider !== null && geometrySelector !== null) {
      if (index === geometrySelector.selectedIndex) {
        geometryOpacitySlider.value = opacity;
      }
    }
    geometryRepresentationProxies[index].setOpacity(opacity);
  }

  publicAPI.getViewProxy = () => {
    return viewerStore.itkVtkView;
  }

  //publicAPI.saveState = () => {
    //// todo
  //}

  //publicAPI.loadState = (state) => {
    //// todo
  //}
  addKeyboardShortcuts(rootContainer, publicAPI, viewerDOMId);

  publicAPI.setRotateEnabled(rotate)

  return publicAPI;
};

export default createViewer;
