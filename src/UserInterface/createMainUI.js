import macro from 'vtk.js/Sources/macro';
import vtkImageCroppingRegionsWidget from 'vtk.js/Sources/Interaction/Widgets/ImageCroppingRegionsWidget';

import getContrastSensitiveStyle from './getContrastSensitiveStyle';

import style from './ItkVtkViewer.module.css';

import volumeRenderingIcon from './icons/volume-rendering.svg';
import xPlaneIcon from './icons/x-plane.svg';
import yPlaneIcon from './icons/y-plane.svg';
import zPlaneIcon from './icons/z-plane.svg';
import cropIcon from './icons/crop.svg';
import resetCropIcon from './icons/reset-crop.svg';
import resetCameraIcon from './icons/reset-camera.svg';

import createToggleUserInterface from './Main/createToggleUserInterfaceButton';
import createScreenshotButton from './Main/createScreenshotButton';
import createFullscreenButton from './Main/createFullscreenButton';
import createAnnotationButton from './Main/createAnnotationButton';
import createInterpolationButton from './Main/createInterpolationButton';
import createViewModeButtons from './Main/createViewModeButtons';

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

  let croppingWidget = null
  let addCroppingPlanesChangedHandler = () => {}
  let addResetCropHandler = () => {}
  if (imageRepresentationProxy) {
    croppingWidget = vtkImageCroppingRegionsWidget.newInstance();
    croppingWidget.setHandleSize(22);
    croppingWidget.setFaceHandlesEnabled(false);
    croppingWidget.setEdgeHandlesEnabled(false);
    croppingWidget.setCornerHandlesEnabled(true);
    croppingWidget.setInteractor(view.getInteractor());
    croppingWidget.setEnabled(false);
    croppingWidget.setVolumeMapper(imageRepresentationProxy.getMapper());
    const croppingPlanesChangedHandlers = [];
    addCroppingPlanesChangedHandler = (handler) => {
      const index = croppingPlanesChangedHandlers.length;
      croppingPlanesChangedHandlers.push(handler);
      function unsubscribe() {
        croppingPlanesChangedHandlers[index] = null;
      }
      return Object.freeze({ unsubscribe });
    };
    let croppingUpdateInProgress = false;
    const setCroppingPlanes = () => {
      if (croppingUpdateInProgress) {
        return;
      }
      croppingUpdateInProgress = true;
      const planes = croppingWidget.getWidgetState().planes;
      imageRepresentationProxy.setCroppingPlanes(planes);
      const bboxCorners = croppingWidget.planesToBBoxCorners(planes);
      croppingPlanesChangedHandlers.forEach((handler) => {
        handler.call(null, planes, bboxCorners);
      });
      croppingUpdateInProgress = false;
    };
    const debouncedSetCroppingPlanes = macro.debounce(setCroppingPlanes, 100);
    croppingWidget.onCroppingPlanesChanged(debouncedSetCroppingPlanes);
    let cropEnabled = false;
    function toggleCrop() {
      cropEnabled = !cropEnabled;
      croppingWidget.setEnabled(cropEnabled);
    }
    const cropButton = document.createElement('div');
    cropButton.innerHTML = `<input id="${viewerDOMId}-toggleCroppingPlanesButton" type="checkbox" class="${
      style.toggleInput
    }"><label itk-vtk-tooltip itk-vtk-tooltip-bottom itk-vtk-tooltip-content="Select ROI [w]" class="${
      contrastSensitiveStyle.invertibleButton
    } ${style.cropButton} ${
      style.toggleButton
    }" for="${viewerDOMId}-toggleCroppingPlanesButton">${cropIcon}</label>`;
    cropButton.addEventListener('change', (event) => {
      toggleCrop();
    });
    mainUIRow.appendChild(cropButton);

    const resetCropButton = document.createElement('div');
    resetCropButton.innerHTML = `<input id="${viewerDOMId}-resetCroppingPlanesButton" type="checkbox" class="${
      style.toggleInput
    }" checked><label itk-vtk-tooltip itk-vtk-tooltip-bottom itk-vtk-tooltip-content="Reset ROI [e]" class="${
      contrastSensitiveStyle.invertibleButton
    } ${style.resetCropButton} ${
      style.toggleButton
    }" for="${viewerDOMId}-resetCroppingPlanesButton">${resetCropIcon}</label>`;
    const resetCropHandlers = [];
    addResetCropHandler = (handler) => {
      const index = resetCropHandlers.length;
      resetCropHandlers.push(handler);
      function unsubscribe() {
        resetCropHandlers[index] = null;
      }
      return Object.freeze({ unsubscribe });
    };
    function resetCrop() {
      imageRepresentationProxy.getCropFilter().reset();
      croppingWidget.resetWidgetState();
      resetCropHandlers.forEach((handler) => {
        handler.call(null);
      });
    }
    resetCropButton.addEventListener('change', (event) => {
      event.preventDefault();
      event.stopPropagation();
      resetCrop();
    });
    resetCropButton.addEventListener('click', (event) => {
      event.preventDefault();
      event.stopPropagation();
      resetCrop();
    });
    mainUIRow.appendChild(resetCropButton);
  } // if(imageRepresentationProxy)

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
