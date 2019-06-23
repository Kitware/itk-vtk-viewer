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
  isBackgroundDark,
  use2D,
  imageSource,
  imageRepresentationProxy,
  view
) {
  const uiContainer = document.createElement('div');
  rootContainer.appendChild(uiContainer);
  uiContainer.setAttribute('class', style.uiContainer);

  const contrastSensitiveStyle = getContrastSensitiveStyle(
    ['invertibleButton', 'tooltipButton'],
    isBackgroundDark
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
    viewerDOMId,
    contrastSensitiveStyle,
    view,
    mainUIRow
  )

  createFullscreenButton(
    viewerDOMId,
    contrastSensitiveStyle,
    rootContainer,
    mainUIRow
  )

  createRotateButton(
    viewerDOMId,
    contrastSensitiveStyle,
    view,
    mainUIRow
  )

  createAnnotationButton(
    viewerDOMId,
    contrastSensitiveStyle,
    view,
    mainUIRow
  )

  if (imageRepresentationProxy) {
    createInterpolationButton(
      viewerDOMId,
      contrastSensitiveStyle,
      view,
      mainUIRow
    )
  }

  createViewModeButtons(
    viewerDOMId,
    contrastSensitiveStyle,
    view,
    imageRepresentationProxy,
    uiContainer,
    use2D,
    mainUIRow
  )

  const { croppingWidget,
    addCroppingPlanesChangedHandler,
    addResetCropHandler } = createCroppingButtons(
    viewerDOMId,
    contrastSensitiveStyle,
    view,
    imageRepresentationProxy,
    mainUIRow
  )

  createResetCameraButton(
    viewerDOMId,
    contrastSensitiveStyle,
    view,
    mainUIRow
  )
  uiContainer.appendChild(mainUIGroup);

  return { uiContainer, croppingWidget, addCroppingPlanesChangedHandler, addResetCropHandler };
}

export default createMainUI;
