import getContrastSensitiveStyle from './getContrastSensitiveStyle';

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

function createMainUI(
  rootContainer,
  store,
  use2D,
) {
  const uiContainer = document.createElement('div');
  store.mainUI.uiContainer = uiContainer;
  rootContainer.appendChild(uiContainer);
  uiContainer.setAttribute('class', style.uiContainer);

  const contrastSensitiveStyle = getContrastSensitiveStyle(
    ['invertibleButton', 'tooltipButton'],
    store.isBackgroundDark
  );

  const mainUIGroup = document.createElement('div');
  mainUIGroup.setAttribute('class', style.uiGroup);

  const mainUIRow = document.createElement('div');
  mainUIRow.setAttribute('class', style.mainUIRow);
  mainUIRow.className += ` ${store.id}-toggle`;
  mainUIGroup.appendChild(mainUIRow);

  createToggleUserInterface(
    store,
    contrastSensitiveStyle,
  )

  createScreenshotButton(
    store,
    contrastSensitiveStyle,
    mainUIRow
  )

  createFullscreenButton(
    store,
    contrastSensitiveStyle,
    rootContainer,
    mainUIRow
  )

  createRotateButton(
    store,
    contrastSensitiveStyle,
    mainUIRow
  )

  createAnnotationButton(
    store,
    contrastSensitiveStyle,
    mainUIRow
  )

  createInterpolationButton(
    store,
    contrastSensitiveStyle,
    mainUIRow
  )

  createViewModeButtons(
    store,
    contrastSensitiveStyle,
    use2D,
    mainUIRow
  )

  createCroppingButtons(
    store,
    contrastSensitiveStyle,
    mainUIRow
  )

  createResetCameraButton(
    store,
    contrastSensitiveStyle,
    mainUIRow
  )
  uiContainer.appendChild(mainUIGroup);
}

export default createMainUI;
