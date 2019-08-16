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
  viewerDOMId,
  viewerStore,
  use2D,
) {
  const uiContainer = document.createElement('div');
  rootContainer.appendChild(uiContainer);
  uiContainer.setAttribute('class', style.uiContainer);

  const contrastSensitiveStyle = getContrastSensitiveStyle(
    ['invertibleButton', 'tooltipButton'],
    viewerStore.isBackgroundDark
  );

  const mainUIGroup = document.createElement('div');
  mainUIGroup.setAttribute('class', style.uiGroup);

  const mainUIRow = document.createElement('div');
  mainUIRow.setAttribute('class', style.mainUIRow);
  mainUIRow.className += ` ${viewerDOMId}-toggle`;
  mainUIGroup.appendChild(mainUIRow);

  createToggleUserInterface(
    viewerDOMId,
    contrastSensitiveStyle,
    uiContainer
  )

  createScreenshotButton(
    viewerStore,
    viewerDOMId,
    contrastSensitiveStyle,
    mainUIRow
  )

  createFullscreenButton(
    viewerDOMId,
    contrastSensitiveStyle,
    rootContainer,
    mainUIRow
  )

  createRotateButton(
    viewerStore,
    viewerDOMId,
    contrastSensitiveStyle,
    mainUIRow
  )

  createAnnotationButton(
    viewerStore,
    viewerDOMId,
    contrastSensitiveStyle,
    mainUIRow
  )

  createInterpolationButton(
    viewerStore,
    viewerDOMId,
    contrastSensitiveStyle,
    mainUIRow
  )

  createViewModeButtons(
    viewerStore,
    viewerDOMId,
    contrastSensitiveStyle,
    uiContainer,
    use2D,
    mainUIRow
  )

  createCroppingButtons(
    viewerStore,
    viewerDOMId,
    contrastSensitiveStyle,
    mainUIRow
  )

  createResetCameraButton(
    viewerStore,
    viewerDOMId,
    contrastSensitiveStyle,
    mainUIRow
  )
  uiContainer.appendChild(mainUIGroup);

  return { uiContainer };
}

export default createMainUI;
