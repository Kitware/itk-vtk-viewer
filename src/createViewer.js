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
  { viewerConfig, image, use2D = false, viewerState }
) => {
  userInterface.emptyContainer(rootContainer);

  const container = document.createElement('div');
  const defaultConfig = {
    backgroundColor: [0, 0, 0],
    containerStyle: STYLE_CONTAINER,
  };
  const config = viewerConfig || defaultConfig;
  const isBackgroundDark =
    config.backgroundColor[0] +
      config.backgroundColor[1] +
      config.backgroundColor[2] <
    1.5;
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

    // Slices share the same lookup table as the volume rendering.
    const lut = lookupTable.getLookupTable();
    const sliceActors = representation.getActors();
    sliceActors.forEach((actor) => {
      actor.getProperty().setRGBTransferFunction(lut);
    });
  }

  const uiContainer = userInterface.createMainUI(
    rootContainer,
    isBackgroundDark,
    use2D,
    imageSource,
    view
  );

  if (image) {
    userInterface.createImageUI(
      uiContainer,
      lookupTable,
      piecewiseFunction,
      representation,
      dataArray,
      view.getRenderWindow(),
      isBackgroundDark,
      use2D
    );
  }

  proxyManager.renderAllViews();

  return { view, imageSource, lookupTable, piecewiseFunction };
};

export default createViewer;
