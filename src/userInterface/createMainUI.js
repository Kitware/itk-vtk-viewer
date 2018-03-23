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

function createMainUI(
  rootContainer,
  viewerCSSIdentifier,
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
    ['uiToggleButton', 'uploadButton', 'screenshotButton', 'annotationButton'],
    isBackgroundDark
  );

  const mainUIGroup = document.createElement('div');
  mainUIGroup.setAttribute('class', style.uiGroup);

  const mainUIRow = document.createElement('div');
  mainUIRow.setAttribute('class', style.mainUIRow);
  mainUIRow.className += ` ${viewerCSSIdentifier}-toggle`;
  mainUIGroup.appendChild(mainUIRow);

  function toggleUIVisibility() {
    const elements = uiContainer.querySelectorAll(`.${viewerCSSIdentifier}-toggle`);
    let count = elements.length;
    const toggleElementStyle = window.getComputedStyle(elements[0]);
    const expanded = toggleElementStyle.getPropertyValue('display') === 'flex';
    if (!expanded) {
      while (count--) {
        elements[count].style.display = 'flex';
      }
    } else {
      while (count--) {
        elements[count].style.display = 'none';
      }
    }
  }
  const uiToggleButton = document.createElement('div');
  uiToggleButton.innerHTML = `<div class="${
    contrastSensitiveStyle.uiToggleButton
  }">${toggleIcon}</div>`;
  uiToggleButton.addEventListener('click', toggleUIVisibility);
  uiContainer.appendChild(uiToggleButton);

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
    view.setOrientationAnnotationVisibility(annotationEnabled);
  }
  const annotationButton = document.createElement('div');
  annotationButton.innerHTML = `<input id="toggleAnnotation" type="checkbox" class="${
    style.toggleInput
  }" checked><label class="${contrastSensitiveStyle.annotationButton} ${
    style.toggleButton
  }" for="toggleAnnotation">${annotationIcon}</label>`;
  annotationButton.addEventListener('change', (event) => {
    toggleAnnotation();
  });
  mainUIRow.appendChild(annotationButton);

  function setViewModeXPlane() {
    view.setViewMode('XPlane');
    document.getElementById('xPlaneButton').checked = true;
    document.getElementById('yPlaneButton').checked = false;
    document.getElementById('zPlaneButton').checked = false;
    document.getElementById('volumeRenderingButton').checked = false;
    const volumeRenderingRow = uiContainer.querySelector(`.${viewerCSSIdentifier}-volumeRendering`);
    volumeRenderingRow.style.display = 'none';
    const xPlaneRow = uiContainer.querySelector(`.${viewerCSSIdentifier}-x-plane-row`);
    xPlaneRow.style.display = 'flex';
    const yPlaneRow = uiContainer.querySelector(`.${viewerCSSIdentifier}-y-plane-row`);
    yPlaneRow.style.display = 'none';
    const zPlaneRow = uiContainer.querySelector(`.${viewerCSSIdentifier}-z-plane-row`);
    zPlaneRow.style.display = 'none';
  }
  function setViewModeYPlane() {
    view.setViewMode('YPlane');
    document.getElementById('xPlaneButton').checked = false;
    document.getElementById('yPlaneButton').checked = true;
    document.getElementById('zPlaneButton').checked = false;
    document.getElementById('volumeRenderingButton').checked = false;
    const volumeRenderingRow = uiContainer.querySelector(`.${viewerCSSIdentifier}-volumeRendering`);
    volumeRenderingRow.style.display = 'none';
    const xPlaneRow = uiContainer.querySelector(`.${viewerCSSIdentifier}-x-plane-row`);
    xPlaneRow.style.display = 'none';
    const yPlaneRow = uiContainer.querySelector(`.${viewerCSSIdentifier}-y-plane-row`);
    yPlaneRow.style.display = 'flex';
    const zPlaneRow = uiContainer.querySelector(`.${viewerCSSIdentifier}-z-plane-row`);
    zPlaneRow.style.display = 'none';
  }
  function setViewModeZPlane() {
    view.setViewMode('ZPlane');
    document.getElementById('xPlaneButton').checked = false;
    document.getElementById('yPlaneButton').checked = false;
    document.getElementById('zPlaneButton').checked = true;
    document.getElementById('volumeRenderingButton').checked = false;
    const volumeRenderingRow = uiContainer.querySelector(`.${viewerCSSIdentifier}-volumeRendering`);
    volumeRenderingRow.style.display = 'none';
    const xPlaneRow = uiContainer.querySelector(`.${viewerCSSIdentifier}-x-plane-row`);
    xPlaneRow.style.display = 'none';
    const yPlaneRow = uiContainer.querySelector(`.${viewerCSSIdentifier}-y-plane-row`);
    yPlaneRow.style.display = 'none';
    const zPlaneRow = uiContainer.querySelector(`.${viewerCSSIdentifier}-z-plane-row`);
    zPlaneRow.style.display = 'flex';
  }
  function setViewModeVolumeRendering() {
    view.setViewMode('VolumeRendering');
    document.getElementById('xPlaneButton').checked = false;
    document.getElementById('yPlaneButton').checked = false;
    document.getElementById('zPlaneButton').checked = false;
    document.getElementById('volumeRenderingButton').checked = true;
    const volumeRenderingRow = uiContainer.querySelector(`.${viewerCSSIdentifier}-volumeRendering`);
    volumeRenderingRow.style.display = 'flex';
    const viewPlanes = document.getElementById('viewPlanes').checked;
    const xPlaneRow = uiContainer.querySelector(`.${viewerCSSIdentifier}-x-plane-row`);
    const yPlaneRow = uiContainer.querySelector(`.${viewerCSSIdentifier}-y-plane-row`);
    const zPlaneRow = uiContainer.querySelector(`.${viewerCSSIdentifier}-z-plane-row`);
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
    xPlaneButton.innerHTML = `<input id="xPlaneButton" type="checkbox" class="${
      style.toggleInput
    }"><label class="${style.viewModeButton} ${
      style.toggleButton
    }" for="xPlaneButton">${xPlaneIcon}</label>`;
    xPlaneButton.addEventListener('click', setViewModeXPlane);
    mainUIRow.appendChild(xPlaneButton);

    const yPlaneButton = document.createElement('div');
    yPlaneButton.innerHTML = `<input id="yPlaneButton" type="checkbox" class="${
      style.toggleInput
    }"><label class="${style.viewModeButton} ${
      style.toggleButton
    }" for="yPlaneButton">${yPlaneIcon}</label>`;
    yPlaneButton.addEventListener('click', setViewModeYPlane);
    mainUIRow.appendChild(yPlaneButton);

    const zPlaneButton = document.createElement('div');
    zPlaneButton.innerHTML = `<input id="zPlaneButton" type="checkbox" class="${
      style.toggleInput
    }"><label class="${style.viewModeButton} ${
      style.toggleButton
    }" for="zPlaneButton">${zPlaneIcon}</label>`;
    zPlaneButton.addEventListener('click', setViewModeZPlane);
    mainUIRow.appendChild(zPlaneButton);

    const volumeRenderingButton = document.createElement('div');
    volumeRenderingButton.innerHTML = `<input id="volumeRenderingButton" type="checkbox" class="${
      style.toggleInput
    }" checked><label class="${style.viewModeButton} ${
      style.toggleButton
    }" for="volumeRenderingButton">${volumeRenderingIcon}</label>`;
    volumeRenderingButton.addEventListener('click', setViewModeVolumeRendering);
    mainUIRow.appendChild(volumeRenderingButton);
  }

  uiContainer.appendChild(mainUIGroup);

  return uiContainer;
}

export default createMainUI;
