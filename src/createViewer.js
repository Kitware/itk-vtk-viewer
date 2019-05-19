import vtkProxyManager from 'vtk.js/Sources/Proxy/Core/ProxyManager';
import macro from 'vtk.js/Sources/macro';

import ResizeSensor from 'css-element-queries/src/ResizeSensor';

import proxyConfiguration from './proxyManagerConfiguration';
import UserInterface from './UserInterface';
import addKeyboardShortcuts from './addKeyboardShortcuts';

let geometryNameCount = 0

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
};

function applyStyle(el, style) {
  Object.keys(style).forEach((key) => {
    el.style[key] = style[key];
  });
}

const createViewer = (
  rootContainer,
  { image, geometries, use2D = false, viewerStyle, viewerState }
) => {
  UserInterface.emptyContainer(rootContainer);

  const proxyManager = vtkProxyManager.newInstance({ proxyConfiguration });
  window.addEventListener('resize', proxyManager.resizeAllViews);

  const container = document.createElement('div');
  const defaultStyle = {
    backgroundColor: [0, 0, 0],
    containerStyle: STYLE_CONTAINER,
  };
  const config = viewerStyle || defaultStyle;
  const isBackgroundDark =
    config.backgroundColor[0] +
      config.backgroundColor[1] +
      config.backgroundColor[2] <
    1.5;
  UserInterface.emptyContainer(container);
  applyStyle(container, config.containerStyle || STYLE_CONTAINER);
  rootContainer.appendChild(container);

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

  const view = proxyManager.createProxy('Views', 'ItkVtkView');
  view.setContainer(container);
  view.setBackground(config.backgroundColor);

  UserInterface.addLogo(container);

  const imageSource = proxyManager.createProxy('Sources', 'TrivialProducer', {
    name: 'Image',
  });
  let lookupTableProxy = null;
  let piecewiseFunction = null;
  let dataArray = null;
  let imageRepresentationProxy = null;
  let imageUI = null;
  let update
  if (image) {
    imageSource.setInputData(image);

    proxyManager.createRepresentationInAllViews(imageSource);
    imageRepresentationProxy = proxyManager.getRepresentation(imageSource, view);

    dataArray = image.getPointData().getScalars();
    lookupTableProxy = proxyManager.getLookupTable(dataArray.getName());
    if (dataArray.getNumberOfComponents() > 1) {
      lookupTableProxy.setPresetName('Grayscale');
    } else {
      lookupTableProxy.setPresetName('Viridis (matplotlib)');
    }
    piecewiseFunction = proxyManager.getPiecewiseFunction(dataArray.getName());

    // Slices share the same lookup table as the volume rendering.
    const lut = lookupTableProxy.getLookupTable();
    const sliceActors = imageRepresentationProxy.getActors();
    sliceActors.forEach((actor) => {
      actor.getProperty().setRGBTransferFunction(lut);
    });

    if (use2D) {
      view.setViewMode('ZPlane');
      view.setOrientationAxesVisibility(false);
    } else {
      view.setViewMode('VolumeRendering');
    }
  }

  let geometryRepresentationProxies = []
  if(geometries) {
    const uid = `Geometry${geometryNameCount++}`
    geometries.forEach((geometry) => {
      const geometrySource = proxyManager.createProxy('Sources', 'TrivialProducer', {
        name: uid,
      });
      geometrySource.setInputData(geometry)
      proxyManager.createRepresentationInAllViews(geometrySource);
      const geometryRepresentation = proxyManager.getRepresentation(geometrySource, view);
      geometryRepresentationProxies.push(geometryRepresentation)
    })
  }

  const viewerDOMId =
    'itk-vtk-viewer-' +
    performance
      .now()
      .toString()
      .replace('.', '');

  const { uiContainer, croppingWidget, addCroppingPlanesChangedHandler, addResetCropHandler } = UserInterface.createMainUI(
    rootContainer,
    viewerDOMId,
    isBackgroundDark,
    use2D,
    imageSource,
    imageRepresentationProxy,
    view,
  );

  if (image) {
    imageUI = UserInterface.createImageUI(
      uiContainer,
      viewerDOMId,
      lookupTableProxy,
      piecewiseFunction,
      imageRepresentationProxy,
      dataArray,
      view,
      isBackgroundDark,
      use2D
    );
    const annotationContainer = container.querySelector('.js-se');
    annotationContainer.style.fontFamily = 'monospace';
  }

  let geometriesUI = null
  if (geometries) {
    geometriesUI = UserInterface.createGeometriesUI(
      uiContainer,
      viewerDOMId,
      geometries,
      geometryRepresentationProxies,
      view,
      isBackgroundDark
    );
  }

  view.resize();
  const resizeSensor = new ResizeSensor(container, function() {
    view.resize();
  });
  proxyManager.renderAllViews();

  setTimeout(view.resetCamera, 1);

  const publicAPI = {};

  publicAPI.renderLater = () => {
    view.renderLater();
  }

  let updatingImage = false;
  const setImage = (image) => {
    if (updatingImage) {
      return;
    }
    updatingImage = true;
    imageSource.setInputData(image);
    imageUI.transferFunctionWidget.setDataArray(image.getPointData().getScalars().getData());
    imageUI.transferFunctionWidget.invokeOpacityChange(imageUI.transferFunctionWidget);
    imageUI.transferFunctionWidget.modified();
    croppingWidget.setVolumeMapper(imageRepresentationProxy.getMapper());
    const cropFilter = imageRepresentationProxy.getCropFilter();
    cropFilter.reset();
    croppingWidget.resetWidgetState();
    setTimeout(() => {
      imageUI.transferFunctionWidget.render();
      view.getRenderWindow().render();
      updatingImage = false;
    }, 0);
  }
  publicAPI.setImage = macro.throttle(setImage, 100);

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
    return view.captureImage();
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
    return addCroppingPlanesChangedHandler(handler);
  }

  publicAPI.subscribeResetCrop = (handler) => {
    return addResetCropHandler(handler);
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
        imageUI.updateColorMap();
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
        imageUI.updateGradientOpacity()
      }
    }
  }


  publicAPI.getViewProxy = () => {
    return view;
  }

  //publicAPI.saveState = () => {
    //// todo
  //}

  //publicAPI.loadState = (state) => {
    //// todo
  //}
  addKeyboardShortcuts(rootContainer, publicAPI, viewerDOMId);

  return publicAPI;
};

export default createViewer;
