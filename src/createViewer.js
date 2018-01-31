import vtkProxyManager from 'vtk.js/Sources/Proxy/Core/ProxyManager';

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

const proxyManager = vtkProxyManager.newInstance({ proxyConfiguration });
window.addEventListener('resize', proxyManager.resizeAllViews);

const createViewer = (
  rootContainer,
  { viewerConfig, image, use2D, viewerState }
) => {
  userInterface.emptyContainer(rootContainer);

  const container = document.createElement('div');
  const defaultConfig = {
    backgroundColor: [0, 0, 0],
    isBackgroundDark: true,
    containerStyle: STYLE_CONTAINER,
  };
  const config = viewerConfig || defaultConfig;
  userInterface.emptyContainer(container);
  applyStyle(container, config.containerStyle || STYLE_CONTAINER);
  rootContainer.appendChild(container);

  const view = proxyManager.createProxy('Views', 'ItkVtkView');
  view.setContainer(container);
  view.setBackground(config.backgroundColor);
  view.resize();

  userInterface.addLogo(container);

  const imageSource = proxyManager.createProxy('Sources', 'TrivialProducer', {
    name: 'Image',
  });
  let lookupTable = null;
  let piecewiseFunction = null;
  let dataArray = null;
  let representation = null;
  if (image) {
    imageSource.setInputData(image);

    proxyManager.createRepresentationInAllViews(imageSource);
    representation = proxyManager.getRepresentation(imageSource, view);

    dataArray = image.getPointData().getScalars();
    lookupTable = proxyManager.getLookupTable(dataArray.getName());
    lookupTable.setPresetName('Viridis (matplotlib)');
    piecewiseFunction = proxyManager.getPiecewiseFunction(dataArray.getName());
  }

  const uiContainer = userInterface.createMainUI(
    rootContainer,
    config.isBackgroundDark,
    imageSource
  );

  if (image) {
    userInterface.createImageUI(
      uiContainer,
      lookupTable,
      piecewiseFunction,
      representation,
      dataArray,
      view.getRenderWindow(),
      config.isBackgroundDark
    );
  }

  proxyManager.renderAllViews();

  return { view, imageSource, lookupTable, piecewiseFunction };
};

export default createViewer;
