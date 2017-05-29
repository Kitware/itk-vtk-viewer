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
    background: 'lightgray',
    borderRadius: '10px',
    width: '300px',
    padding: 'calc(50vh - 2em) calc(50vw - 150px - 1em)',
  },
};

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
  loading.setAttribute('class', 'loading');
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
      const ext = files[0].name.split('.').slice(-1)[0];
      onDataChange(myContainer, { file: files[0], ext });
    }
  }

  fileSelector.onchange = handleFile;
}

export default {
  createLoadingProgress,
  emptyContainer,
  applyStyle,
  createFileDragAndDrop,
};
