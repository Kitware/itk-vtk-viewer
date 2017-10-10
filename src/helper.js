import vtkHttpDataAccessHelper from 'vtk.js/Sources/IO/Core/DataAccessHelper/HttpDataAccessHelper';
import vtkURLExtract           from 'vtk.js/Sources/Common/Core/URLExtract';

import dropBG from './dropBG.jpg';
import appStyle from './ItkVtkImageViewer.mcss';

const STYLES = {
  fullScreen: {
    position: 'absolute',
    width: '100vw',
    height: '100vh',
    top: '0',
    left: '0',
    overflow: 'hidden',
    background: 'black',
    margin: '0',
    padding: '0',
  },
  fullParentSize: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    top: '0',
    left: '0',
    overflow: 'hidden',
  },
  bigFileDrop: {
    position: 'absolute',
    left: '50%',
    top: '50%',
    transform: 'translate(-50%, -50%)',
    backgroundColor: 'white',
    backgroundImage: `url(${dropBG})`,
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'center',
    backgroundSize: 'contain',
    borderRadius: '10px',
    width: '50px',
    padding: 'calc(50vh - 2em) calc(50vw - 25px - 2em)',
  },
};

const fetchBinaryContent = url => vtkHttpDataAccessHelper.fetchBinary(url);

function emptyContainer(container) {
  if (container) {
    while (container.firstChild) {
      container.removeChild(container.firstChild);
    }
  }
}

function applyStyle(el, style) {
  Object.keys(style).forEach((key) => {
    el.style[key] = style[key];
  });
}

function createLoadingProgress(container) {
  const workContainer = document.querySelector('.content');
  const rootBody = document.querySelector('body');
  const myContainer = container || workContainer || rootBody;

  const loading = document.createElement('div');
  loading.setAttribute('class', appStyle.loading);
  myContainer.appendChild(loading);
}

function createFileDragAndDrop(container, onDataChange) {
  const workContainer = document.querySelector('.content');
  const rootBody = document.querySelector('body');
  const myContainer = container || workContainer || rootBody;

  const fileSelector = document.createElement('input');
  fileSelector.setAttribute('type', 'file');
  applyStyle(fileSelector, STYLES.bigFileDrop);
  fileSelector.setAttribute('class', 'js-file-selector');
  myContainer.appendChild(fileSelector);
  applyStyle(myContainer, STYLES.fullScreen);
  myContainer.setAttribute('class', 'js-file-selector-container');

  function handleFile(e) {
    var files = this.files;
    if (files.length === 1) {
      myContainer.removeChild(fileSelector);
      const use2D = !!vtkURLExtract.extractURLParameters().use2D;
      onDataChange(myContainer, { file: files[0], use2D });
    }
  }

  fileSelector.onchange = handleFile;
}

export default {
  createLoadingProgress,
  emptyContainer,
  applyStyle,
  createFileDragAndDrop,
  fetchBinaryContent,
  STYLES,
};
