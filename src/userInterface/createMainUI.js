import getContrastSensitiveStyle from './getContrastSensitiveStyle';

import style from './ItkVtkImageViewer.mcss';

import preventDefaults from './preventDefaults';
import toggleIcon from './icons/toggle.svg';
import uploadIcon from './icons/upload.svg';
import screenshotIcon from './icons/screenshot.svg';
import volumeRenderingIcon from './icons/volume-rendering.svg';
import xPlaneIcon from './icons/x-plane.svg';
import yPlaneIcon from './icons/y-plane.svg';
import zPlaneIcon from './icons/z-plane.svg';
import annotationIcon from './icons/annotations.svg';
import interpolationIcon from './icons/interpolation.svg';

function createMainUI(
  rootContainer,
  viewerDOMId,
  isBackgroundDark,
  use2D,
  imageSource,
  view,
  uploadFileHandler
) {
  const uiContainer = document.createElement('div');
  rootContainer.appendChild(uiContainer);
  uiContainer.setAttribute('class', style.uiContainer);

  const contrastSensitiveStyle = getContrastSensitiveStyle(
    ['toggleUserInterfaceButton', 'uploadButton', 'screenshotButton', 'annotationButton', 'interpolationButton'],
    isBackgroundDark
  );

  const mainUIGroup = document.createElement('div');
  mainUIGroup.setAttribute('class', style.uiGroup);

  const mainUIRow = document.createElement('div');
  mainUIRow.setAttribute('class', style.mainUIRow);
  mainUIRow.className += ` ${viewerDOMId}-toggle`;
  mainUIGroup.appendChild(mainUIRow);

  const toggleUserInterfaceButton = document.createElement('div');
  function toggleUIVisibility() {
    const elements = uiContainer.querySelectorAll(`.${viewerDOMId}-toggle`);
    let count = elements.length;
    const collapsed = toggleUserInterfaceButton.getAttribute('collapsed') === '';
    if (collapsed) {
      while (count--) {
        elements[count].style.display = 'flex';
      }
      toggleUserInterfaceButton.removeAttribute('collapsed');
    } else {
      while (count--) {
        elements[count].style.display = 'none';
      }
      toggleUserInterfaceButton.setAttribute('collapsed', '');
    }
  }
  toggleUserInterfaceButton.className = `${contrastSensitiveStyle.toggleUserInterfaceButton}`;
  toggleUserInterfaceButton.id = `${viewerDOMId}-toggleUserInterfaceButton`
  toggleUserInterfaceButton.innerHTML = `${toggleIcon}`;
  toggleUserInterfaceButton.addEventListener('click', toggleUIVisibility);
  uiContainer.appendChild(toggleUserInterfaceButton);

  if (uploadFileHandler) {
    const uploadButton = document.createElement('div');
    uploadButton.innerHTML = `<div class="${
      contrastSensitiveStyle.uploadButton
    }">${uploadIcon}</div><input type="file" class="file" style="display: none;" multiple/>`;
    const fileInput = uploadButton.querySelector('input');

    fileInput.addEventListener('change', uploadFileHandler);
    uploadButton.addEventListener('drop', uploadFileHandler);
    uploadButton.addEventListener('click', (e) => fileInput.click());
    uploadButton.addEventListener('dragover', preventDefaults);
    mainUIRow.appendChild(uploadButton);
  }

  const screenshotButton = document.createElement('div');
  screenshotButton.innerHTML = `<div class="${
    contrastSensitiveStyle.screenshotButton
  }">${screenshotIcon}</div>`;
  function takeScreenshot() {
    view.openCaptureImage();
  }
  screenshotButton.addEventListener('click', takeScreenshot);
  mainUIRow.appendChild(screenshotButton);

  let annotationEnabled = true;
  function toggleAnnotation() {
    annotationEnabled = !annotationEnabled;
    if (!use2D) {
      view.setOrientationAnnotationVisibility(annotationEnabled);
    }
  }
  const annotationButton = document.createElement('div');
  annotationButton.innerHTML = `<input id="${viewerDOMId}-toggleAnnotationButton" type="checkbox" class="${
    style.toggleInput
  }" checked><label class="${contrastSensitiveStyle.annotationButton} ${
    style.toggleButton
  }" for="${viewerDOMId}-toggleAnnotationButton">${annotationIcon}</label>`;
  annotationButton.addEventListener('change', (event) => {
    toggleAnnotation();
  });
  mainUIRow.appendChild(annotationButton);

  let interpolationEnabled = true;
  function toggleInterpolation() {
    interpolationEnabled = !interpolationEnabled;
    view.setPlanesUseLinearInterpolation(interpolationEnabled);
  }
  const interpolationButton = document.createElement('div');
  interpolationButton.innerHTML = `<input id="${viewerDOMId}-toggleInterpolationButton" type="checkbox" class="${
    style.toggleInput
  }" checked><label class="${contrastSensitiveStyle.interpolationButton} ${
    style.toggleButton
  }" for="${viewerDOMId}-toggleInterpolationButton">${interpolationIcon}</label>`;
  interpolationButton.addEventListener('change', (event) => {
    toggleInterpolation();
  });
  mainUIRow.appendChild(interpolationButton);

  function setViewModeXPlane() {
    view.setViewMode('XPlane');
    document.getElementById(`${viewerDOMId}-xPlaneButton`).checked = true;
    document.getElementById(`${viewerDOMId}-yPlaneButton`).checked = false;
    document.getElementById(`${viewerDOMId}-zPlaneButton`).checked = false;
    document.getElementById(`${viewerDOMId}-volumeRenderingButton`).checked = false;
    const volumeRenderingRow = uiContainer.querySelector(`.${viewerDOMId}-volumeRendering`);
    volumeRenderingRow.style.display = 'none';
    const xPlaneRow = uiContainer.querySelector(`.${viewerDOMId}-x-plane-row`);
    xPlaneRow.style.display = 'flex';
    const yPlaneRow = uiContainer.querySelector(`.${viewerDOMId}-y-plane-row`);
    yPlaneRow.style.display = 'none';
    const zPlaneRow = uiContainer.querySelector(`.${viewerDOMId}-z-plane-row`);
    zPlaneRow.style.display = 'none';
  }
  function setViewModeYPlane() {
    view.setViewMode('YPlane');
    document.getElementById(`${viewerDOMId}-xPlaneButton`).checked = false;
    document.getElementById(`${viewerDOMId}-yPlaneButton`).checked = true;
    document.getElementById(`${viewerDOMId}-zPlaneButton`).checked = false;
    document.getElementById(`${viewerDOMId}-volumeRenderingButton`).checked = false;
    const volumeRenderingRow = uiContainer.querySelector(`.${viewerDOMId}-volumeRendering`);
    volumeRenderingRow.style.display = 'none';
    const xPlaneRow = uiContainer.querySelector(`.${viewerDOMId}-x-plane-row`);
    xPlaneRow.style.display = 'none';
    const yPlaneRow = uiContainer.querySelector(`.${viewerDOMId}-y-plane-row`);
    yPlaneRow.style.display = 'flex';
    const zPlaneRow = uiContainer.querySelector(`.${viewerDOMId}-z-plane-row`);
    zPlaneRow.style.display = 'none';
  }
  function setViewModeZPlane() {
    view.setViewMode('ZPlane');
    document.getElementById(`${viewerDOMId}-xPlaneButton`).checked = false;
    document.getElementById(`${viewerDOMId}-yPlaneButton`).checked = false;
    document.getElementById(`${viewerDOMId}-zPlaneButton`).checked = true;
    document.getElementById(`${viewerDOMId}-volumeRenderingButton`).checked = false;
    const volumeRenderingRow = uiContainer.querySelector(`.${viewerDOMId}-volumeRendering`);
    volumeRenderingRow.style.display = 'none';
    const xPlaneRow = uiContainer.querySelector(`.${viewerDOMId}-x-plane-row`);
    xPlaneRow.style.display = 'none';
    const yPlaneRow = uiContainer.querySelector(`.${viewerDOMId}-y-plane-row`);
    yPlaneRow.style.display = 'none';
    const zPlaneRow = uiContainer.querySelector(`.${viewerDOMId}-z-plane-row`);
    zPlaneRow.style.display = 'flex';
  }
  function setViewModeVolumeRendering() {
    view.setViewMode('VolumeRendering');
    document.getElementById(`${viewerDOMId}-xPlaneButton`).checked = false;
    document.getElementById(`${viewerDOMId}-yPlaneButton`).checked = false;
    document.getElementById(`${viewerDOMId}-zPlaneButton`).checked = false;
    document.getElementById(`${viewerDOMId}-volumeRenderingButton`).checked = true;
    const volumeRenderingRow = uiContainer.querySelector(`.${viewerDOMId}-volumeRendering`);
    volumeRenderingRow.style.display = 'flex';
    const viewPlanes = document.getElementById(`${viewerDOMId}-viewPlanes`).checked;
    const xPlaneRow = uiContainer.querySelector(`.${viewerDOMId}-x-plane-row`);
    const yPlaneRow = uiContainer.querySelector(`.${viewerDOMId}-y-plane-row`);
    const zPlaneRow = uiContainer.querySelector(`.${viewerDOMId}-z-plane-row`);
    if (viewPlanes) {
      xPlaneRow.style.display = 'flex';
      yPlaneRow.style.display = 'flex';
      zPlaneRow.style.display = 'flex';
    } else {
      xPlaneRow.style.display = 'none';
      yPlaneRow.style.display = 'none';
      zPlaneRow.style.display = 'none';
    }
  }
  if (!use2D) {
    const xPlaneButton = document.createElement('div');
    xPlaneButton.innerHTML = `<input id="${viewerDOMId}-xPlaneButton" type="checkbox" class="${
      style.toggleInput
    }"><label class="${style.viewModeButton} ${
      style.toggleButton
    }" for="${viewerDOMId}-xPlaneButton">${xPlaneIcon}</label>`;
    xPlaneButton.addEventListener('click', setViewModeXPlane);
    mainUIRow.appendChild(xPlaneButton);

    const yPlaneButton = document.createElement('div');
    yPlaneButton.innerHTML = `<input id="${viewerDOMId}-yPlaneButton" type="checkbox" class="${
      style.toggleInput
    }"><label class="${style.viewModeButton} ${
      style.toggleButton
    }" for="${viewerDOMId}-yPlaneButton">${yPlaneIcon}</label>`;
    yPlaneButton.addEventListener('click', setViewModeYPlane);
    mainUIRow.appendChild(yPlaneButton);

    const zPlaneButton = document.createElement('div');
    zPlaneButton.innerHTML = `<input id="${viewerDOMId}-zPlaneButton" type="checkbox" class="${
      style.toggleInput
    }"><label class="${style.viewModeButton} ${
      style.toggleButton
    }" for="${viewerDOMId}-zPlaneButton">${zPlaneIcon}</label>`;
    zPlaneButton.addEventListener('click', setViewModeZPlane);
    mainUIRow.appendChild(zPlaneButton);

    const volumeRenderingButton = document.createElement('div');
    volumeRenderingButton.innerHTML = `<input id="${viewerDOMId}-volumeRenderingButton" type="checkbox" class="${
      style.toggleInput
    }" checked><label class="${style.viewModeButton} ${
      style.toggleButton
    }" for="${viewerDOMId}-volumeRenderingButton">${volumeRenderingIcon}</label>`;
    volumeRenderingButton.addEventListener('click', setViewModeVolumeRendering);
    mainUIRow.appendChild(volumeRenderingButton);
  }

  uiContainer.appendChild(mainUIGroup);

  return uiContainer;
}

export default createMainUI;
