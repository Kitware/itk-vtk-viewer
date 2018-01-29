import vtkProxyManager from 'vtk.js/Sources/Proxy/Core/ProxyManager';

import proxyConfiguration from './proxyManagerConfiguration';
import userInterface from './userInterface';

const STYLE_CONTAINER = {
  position: 'relative',
  width: '100%',
  height: '100%',
  minHeight: '200px',
  minWidth: '200px',
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

const createViewer = (rootContainer, { image, use2D, viewerState, config }) => {
  userInterface.emptyContainer(rootContainer);

  const container = document.createElement('div');
  const defaultConfig = {
    background: [0, 0, 0],
    containerStyle: STYLE_CONTAINER,
  };
  const renderWindowConfiguration = config || defaultConfig;
  userInterface.emptyContainer(container);
  applyStyle(
    container,
    renderWindowConfiguration.containerStyle || STYLE_CONTAINER
  );
  rootContainer.appendChild(container);

  const view = proxyManager.createProxy('Views', 'ItkVtkView');
  view.setContainer(container);
  view.resize();

  const imageSource = proxyManager.createProxy('Sources', 'TrivialProducer');
  imageSource.setInputData(image);
  imageSource.setName('Image');

  proxyManager.createRepresentationInAllViews(imageSource);

  proxyManager.renderAllViews();

  return { view, imageSource };
};

export default createViewer;
