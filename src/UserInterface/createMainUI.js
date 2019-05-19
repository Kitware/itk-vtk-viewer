import getContrastSensitiveStyle from './getContrastSensitiveStyle';

import style from './ItkVtkViewer.module.css';

import resetCameraIcon from './icons/reset-camera.svg';

import createToggleUserInterface from './Main/createToggleUserInterfaceButton';
import createScreenshotButton from './Main/createScreenshotButton';
import createFullscreenButton from './Main/createFullscreenButton';
import createAnnotationButton from './Main/createAnnotationButton';
import createInterpolationButton from './Main/createInterpolationButton';
import createViewModeButtons from './Main/createViewModeButtons';
import createCroppingButtons from './Main/createCroppingButtons';

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

  const resetCameraButton = document.createElement('div');
  resetCameraButton.innerHTML = `<input id="${viewerDOMId}-resetCameraButton" type="checkbox" class="${
    style.toggleInput
  }" checked><label itk-vtk-tooltip itk-vtk-tooltip-bottom itk-vtk-tooltip-content="Reset camera [r]" class="${
    contrastSensitiveStyle.invertibleButton
  } ${style.resetCameraButton} ${
    style.toggleButton
  }" for="${viewerDOMId}-resetCameraButton">${resetCameraIcon}</label>`;
  function resetCamera() {
    view.resetCamera();
  }
  resetCameraButton.addEventListener('change', (event) => {
    event.preventDefault();
    event.stopPropagation();
    resetCamera();
  });
  resetCameraButton.addEventListener('click', (event) => {
    event.preventDefault();
    event.stopPropagation();
    resetCamera();
  });
  mainUIRow.appendChild(resetCameraButton);

  uiContainer.appendChild(mainUIGroup);

  return { uiContainer, croppingWidget, addCroppingPlanesChangedHandler, addResetCropHandler };
}

export default createMainUI;
