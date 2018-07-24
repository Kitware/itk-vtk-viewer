import 'babel-polyfill';

import vtkURLExtract from 'vtk.js/Sources/Common/Core/URLExtract';

import fetchBinaryContent from './fetchBinaryContent';
import processFiles from './processFiles';
import userInterface from './userInterface';
import createFileDragAndDrop from './userInterface/createFileDragAndDrop';
import style from './userInterface/ItkVtkImageViewer.mcss';

let doNotInitViewers = false;

export function createViewerFromLocalFiles(container) {
  doNotInitViewers = true;
  createFileDragAndDrop(container, processFiles);
}

export function createViewerFromUrl(el, url, use2D = false) {
  userInterface.emptyContainer(el);
  const progressCallback = userInterface.createLoadingProgress(el);

  return fetchBinaryContent(url, progressCallback).then((arrayBuffer) => {
    const file = new File(
      [new Blob([arrayBuffer])],
      url.split('/').slice(-1)[0]
    );
    return processFiles(el, { files: [file], use2D });
  });
}

export function initializeEmbeddedViewers() {
  if (doNotInitViewers) {
    return;
  }
  const viewers = document.querySelectorAll('.itk-vtk-image-viewer');
  let count = viewers.length;
  while (count--) {
    const el = viewers[count];
    if (!el.dataset.loaded) {
      el.dataset.loaded = true;
      // Apply size to conatiner
      const [width, height] = (el.dataset.viewport || '500x500').split('x');
      el.style.position = 'relative';
      el.style.width = Number.isFinite(Number(width)) ? `${width}px` : width;
      el.style.height = Number.isFinite(Number(height))
        ? `${height}px`
        : height;
      createViewerFromUrl(el, el.dataset.url, !!el.dataset.slice).then(
        (viewer) => {
          // Background color handling
          if (el.dataset.backgroundColor && viewer.renderWindow) {
            const color = el.dataset.backgroundColor;
            const bgColor = [
              color.slice(0, 2),
              color.slice(2, 4),
              color.slice(4, 6),
            ].map((v) => parseInt(v, 16) / 255);
            viewer.renderer.setBackground(bgColor);
          }

          // Render
          if (viewer.renderWindow && viewer.renderWindow.render) {
            viewer.renderWindow.render();
          }
        }
      );
    }
  }
}

export function processParameters(
  container,
  addOnParameters = {},
  keyName = 'fileToLoad'
) {
  const userParams = Object.assign(
    {},
    vtkURLExtract.extractURLParameters(),
    addOnParameters
  );
  const myContainer = userInterface.getRootContainer(container);

  if (userParams.fullscreen) {
    myContainer.classList.add(style.fullscreenContainer);
  }

  if (userParams[keyName]) {
    return createViewerFromUrl(
      myContainer,
      userParams[keyName],
      !!userParams.use2D
    );
  }
  return null;
}

// Ensure processing of embedded viewers
setTimeout(initializeEmbeddedViewers, 100);
