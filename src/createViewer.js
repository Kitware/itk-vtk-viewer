import vtkProxyManager from 'vtk.js/Sources/Proxy/Core/ProxyManager';

import ResizeSensor from 'css-element-queries/src/ResizeSensor';

import proxyConfiguration from './proxyManagerConfiguration';
import userInterface from './userInterface';

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
  { image, use2D = false, viewerStyle, viewerState }
) => {
  userInterface.emptyContainer(rootContainer);

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
  userInterface.emptyContainer(container);
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

  userInterface.addLogo(container);

  const imageSource = proxyManager.createProxy('Sources', 'TrivialProducer', {
    name: 'Image',
  });
  let lookupTable = null;
  let piecewiseFunction = null;
  let dataArray = null;
  let representation = null;
  let transferFunctionWidget = null;
  if (image) {
    imageSource.setInputData(image);

    proxyManager.createRepresentationInAllViews(imageSource);
    representation = proxyManager.getRepresentation(imageSource, view);

    dataArray = image.getPointData().getScalars();
    lookupTable = proxyManager.getLookupTable(dataArray.getName());
    if (dataArray.getNumberOfComponents() > 1) {
      lookupTable.setPresetName('Grayscale');
    } else {
      lookupTable.setPresetName('Viridis (matplotlib)');
    }
    piecewiseFunction = proxyManager.getPiecewiseFunction(dataArray.getName());

    // Slices share the same lookup table as the volume rendering.
    const lut = lookupTable.getLookupTable();
    const sliceActors = representation.getActors();
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

  const viewerDOMId =
    'itk-vtk-viewer-' +
    performance
      .now()
      .toString()
      .replace('.', '');

  const uiContainer = userInterface.createMainUI(
    rootContainer,
    viewerDOMId,
    isBackgroundDark,
    use2D,
    imageSource,
    view,
  );

  if (image) {
    const imageUI = userInterface.createImageUI(
      uiContainer,
      viewerDOMId,
      lookupTable,
      piecewiseFunction,
      representation,
      dataArray,
      view,
      isBackgroundDark,
      use2D
    );
    transferFunctionWidget = imageUI.transferFunctionWidget;
    const annotationContainer = container.querySelector('.js-se');
    annotationContainer.style.fontFamily = 'monospace';
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

  publicAPI.setImage = (image) => {
    imageSource.setInputData(image);
    transferFunctionWidget.setDataArray(image.getPointData().getScalars());
  }

  const toggleUserInterfaceButton = document.getElementById(`${viewerDOMId}-toggleUserInterfaceButton`);

  publicAPI.setUserInterfaceCollapsed = (collapse) => {
    const collapsed = toggleUserInterfaceButton.getAttribute('collapsed') === '';
    if (collapse && !collapsed || !collapse && collapsed) {
      toggleUserInterfaceButton.click();
    }
  }

  const toggleUserInterfaceCollapsedHandlers = [];
  const toggleUserInterfaceButtonListener = (event) => {
    const collapsed = toggleUserInterfaceButton.getAttribute('collapsed') === '';
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


  const toggleInterpolationButton = document.getElementById(`${viewerDOMId}-toggleInterpolationButton`);

  const toggleInterpolationHandlers = [];
  const toggleInterpolationButtonListener = (event) => {
    const enabled = toggleInterpolationButton.checked;
    toggleInterpolationHandlers.forEach((handler) => {
      handler.call(null, enabled);
    })
  }
  toggleInterpolationButton.addEventListener('click', toggleInterpolationButtonListener)

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


  if (!use2D) {
    const xPlaneButton = document.getElementById(`${viewerDOMId}-xPlaneButton`);
    const yPlaneButton = document.getElementById(`${viewerDOMId}-yPlaneButton`);
    const zPlaneButton = document.getElementById(`${viewerDOMId}-zPlaneButton`);
    const volumeRenderingButton = document.getElementById(`${viewerDOMId}-volumeRenderingButton`);

    const viewModeChangedHandlers = [];
    const xPlaneButtonListener = (event) => {
      const enabled = xPlaneButton.checked;
      if (enabled) {
        viewModeChangedHandlers.forEach((handler) => {
          handler.call(null, 'XPlane');
        })
      }
    }
    xPlaneButton.addEventListener('click', xPlaneButtonListener)
    const yPlaneButtonListener = (event) => {
      const enabled = yPlaneButton.checked;
      if (enabled) {
        viewModeChangedHandlers.forEach((handler) => {
          handler.call(null, 'YPlane');
        })
      }
    }
    yPlaneButton.addEventListener('click', yPlaneButtonListener)
    const zPlaneButtonListener = (event) => {
      const enabled = zPlaneButton.checked;
      if (enabled) {
        viewModeChangedHandlers.forEach((handler) => {
          handler.call(null, 'ZPlane');
        })
      }
    }
    zPlaneButton.addEventListener('click', zPlaneButtonListener)
    const volumeRenderingButtonListener = (event) => {
      const enabled = volumeRenderingButton.checked;
      if (enabled) {
        viewModeChangedHandlers.forEach((handler) => {
          handler.call(null, 'VolumeRendering');
        })
      }
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


    const toggleShadowButton = document.getElementById(`${viewerDOMId}-toggleShadowButton`);

    const toggleShadowHandlers = [];
    const toggleShadowButtonListener = (event) => {
      const enabled = toggleShadowButton.checked;
      toggleShadowHandlers.forEach((handler) => {
        handler.call(null, enabled);
      })
    }
    toggleShadowButton.addEventListener('click', toggleShadowButtonListener)

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
    toggleSlicingPlanesButton.addEventListener('click', toggleSlicingPlanesButtonListener)

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

  return publicAPI;
};

export default createViewer;
