import style from './ItkVtkViewer.module.css';

import createToggleUserInterface from './Main/createToggleUserInterfaceButton';
import createScreenshotButton from './Main/createScreenshotButton';
import createFullscreenButton from './Main/createFullscreenButton';
import createRotateButton from './Main/createRotateButton';
import createAnnotationButton from './Main/createAnnotationButton';
import createInterpolationButton from './Main/createInterpolationButton';
import createViewModeButtons from './Main/createViewModeButtons';
import createCroppingButtons from './Main/createCroppingButtons';
import createResetCameraButton from './Main/createResetCameraButton';

function createMainUI(rootContainer, store, use2D) {
  const uiContainer = document.createElement('div');
  store.mainUI.uiContainer = uiContainer;
  rootContainer.appendChild(uiContainer);
  uiContainer.setAttribute('class', style.uiContainer);

  const mainUIGroup = document.createElement('div');
  mainUIGroup.setAttribute('class', style.uiGroup);

  const mainUIRow = document.createElement('div');
  mainUIRow.setAttribute('class', style.mainUIRow);
  mainUIRow.className += ` ${store.id}-toggle`;
  mainUIGroup.appendChild(mainUIRow);

  createToggleUserInterface(store);
  createScreenshotButton(store, mainUIRow);
  createFullscreenButton(store, rootContainer, mainUIRow);
  if (!use2D) {
    createRotateButton(store, mainUIRow);
  }
  createAnnotationButton(store, mainUIRow);
  createInterpolationButton(store, mainUIRow);
  createViewModeButtons(store, use2D, mainUIRow);
  createCroppingButtons(store, mainUIRow);
  createResetCameraButton(store, mainUIRow);

  uiContainer.appendChild(mainUIGroup);
}

export default createMainUI;
