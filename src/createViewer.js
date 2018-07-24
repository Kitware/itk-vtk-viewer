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

  publicAPI.setUserInterfaceCollapsed = (collapse) => {
    const toggleUserInterfaceButton = document.getElementById(`${viewerDOMId}-toggleUserInterfaceButton`);
    const collapsed = toggleUserInterfaceButton.getAttribute('collapsed') === '';
    if (collapse && !collapsed || !collapse && collapsed) {
      toggleUserInterfaceButton.click();
    }
  }

  let annotationsEnabled = true;
  publicAPI.setAnnotationsEnabled = (annotations) => {
    const toggleAnnotationButton = document.getElementById(`${viewerDOMId}-toggleAnnotationButton`);
    if (annotations && !annotationsEnabled || !annotations && annotationsEnabled
    ) {
      annotationsEnabled = !annotationsEnabled;
      toggleAnnotationButton.click();
    }
  }

  publicAPI.captureImage = () => {
    return view.captureImage();
  }

  console.log(publicAPI);

  //publicAPI.saveState = () => {
    //// todo
  //}

  //publicAPI.loadState = (state) => {
    //// todo
  //}

  return publicAPI;
};

export default createViewer;
