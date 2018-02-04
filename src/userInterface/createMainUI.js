import processFiles from '../processFiles';
import getContrastSensitiveStyle from './getContrastSensitiveStyle';
import preventDefaults from './preventDefaults';

import style from './ItkVtkImageViewer.mcss';

import toggleIcon from './icons/toggle.svg';
import uploadIcon from './icons/upload.svg';
import screenshotIcon from './icons/screenshot.svg';
import volumeRenderingIcon from './icons/volume-rendering.svg';
import xPlaneIcon from './icons/x-plane.svg';
import yPlaneIcon from './icons/y-plane.svg';
import zPlaneIcon from './icons/z-plane.svg';
import viewPlansIcon from './icons/view-planes.svg';

function createMainUI(
  rootContainer,
  isBackgroundDark,
  use2D,
  imageSource,
  view
) {
  const uiContainer = document.createElement('div');
  rootContainer.appendChild(uiContainer);
  uiContainer.setAttribute('class', style.uiContainer);

  const contrastSensitiveStyle = getContrastSensitiveStyle(
    ['uiToggleButton', 'uploadButton', 'screenshotButton'],
    isBackgroundDark
  );

  const mainUIGroup = document.createElement('div');
  mainUIGroup.setAttribute('class', style.uiGroup);

  const mainUIRow = document.createElement('div');
  mainUIRow.setAttribute('class', style.mainUIRow);
  mainUIRow.className += ' js-toggle';
  mainUIGroup.appendChild(mainUIRow);

  function toggleUIVisibility() {
    const elements = uiContainer.querySelectorAll('.js-toggle');
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

  const uploadButton = document.createElement('div');
  uploadButton.innerHTML = `<div class="${
    contrastSensitiveStyle.uploadButton
  }">${uploadIcon}</div><input type="file" class="file" style="display: none;" multiple/>`;
  const fileInput = uploadButton.querySelector('input');

  function handleFile(e) {
    preventDefaults(e);
    const dataTransfer = e.dataTransfer;
    const files = e.target.files || dataTransfer.files;
    processFiles(rootContainer, { files });
  }

  fileInput.addEventListener('change', handleFile);
  uploadButton.addEventListener('drop', handleFile);
  uploadButton.addEventListener('click', (e) => fileInput.click());
  uploadButton.addEventListener('dragover', preventDefaults);
  mainUIRow.appendChild(uploadButton);

  const screenshotButton = document.createElement('div');
  screenshotButton.innerHTML = `<div class="${
    contrastSensitiveStyle.screenshotButton
  }">${screenshotIcon}</div>`;
  function takeScreenshot() {
    view.openCaptureImage();
  }
  screenshotButton.addEventListener('click', takeScreenshot);
  mainUIRow.appendChild(screenshotButton);

  function setViewModeXPlane() {
    view.setViewMode('XPlane');
    document.getElementById('xPlaneButton').checked = true;
    document.getElementById('yPlaneButton').checked = false;
    document.getElementById('zPlaneButton').checked = false;
    document.getElementById('volumeRenderingButton').checked = false;
    const volumeRenderingRow = uiContainer.querySelector('.js-volumeRendering');
    volumeRenderingRow.style.display = 'none';
    const xPlaneRow = uiContainer.querySelector('.js-x-plane-row');
    xPlaneRow.style.display = 'flex';
    const yPlaneRow = uiContainer.querySelector('.js-y-plane-row');
    yPlaneRow.style.display = 'none';
    const zPlaneRow = uiContainer.querySelector('.js-z-plane-row');
    zPlaneRow.style.display = 'none';
  }
  function setViewModeYPlane() {
    view.setViewMode('YPlane');
    document.getElementById('xPlaneButton').checked = false;
    document.getElementById('yPlaneButton').checked = true;
    document.getElementById('zPlaneButton').checked = false;
    document.getElementById('volumeRenderingButton').checked = false;
    const volumeRenderingRow = uiContainer.querySelector('.js-volumeRendering');
    volumeRenderingRow.style.display = 'none';
    const xPlaneRow = uiContainer.querySelector('.js-x-plane-row');
    xPlaneRow.style.display = 'none';
    const yPlaneRow = uiContainer.querySelector('.js-y-plane-row');
    yPlaneRow.style.display = 'flex';
    const zPlaneRow = uiContainer.querySelector('.js-z-plane-row');
    zPlaneRow.style.display = 'none';
  }
  function setViewModeZPlane() {
    view.setViewMode('ZPlane');
    document.getElementById('xPlaneButton').checked = false;
    document.getElementById('yPlaneButton').checked = false;
    document.getElementById('zPlaneButton').checked = true;
    document.getElementById('volumeRenderingButton').checked = false;
    const volumeRenderingRow = uiContainer.querySelector('.js-volumeRendering');
    volumeRenderingRow.style.display = 'none';
    const xPlaneRow = uiContainer.querySelector('.js-x-plane-row');
    xPlaneRow.style.display = 'flex';
    const yPlaneRow = uiContainer.querySelector('.js-y-plane-row');
    yPlaneRow.style.display = 'none';
    const zPlaneRow = uiContainer.querySelector('.js-z-plane-row');
    zPlaneRow.style.display = 'none';
  }
  function setViewModeVolumeRendering() {
    view.setViewMode('VolumeRendering');
    document.getElementById('xPlaneButton').checked = false;
    document.getElementById('yPlaneButton').checked = false;
    document.getElementById('zPlaneButton').checked = false;
    document.getElementById('volumeRenderingButton').checked = true;
    const volumeRenderingRow = uiContainer.querySelector('.js-volumeRendering');
    volumeRenderingRow.style.display = 'flex';
    const viewPlanes = document.getElementById('viewPlanes').checked;
    const xPlaneRow = uiContainer.querySelector('.js-x-plane-row');
    const yPlaneRow = uiContainer.querySelector('.js-y-plane-row');
    const zPlaneRow = uiContainer.querySelector('.js-z-plane-row');
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
  let viewPlanes = false;
  function setViewPlanes() {
    viewPlanes = !viewPlanes;
    view.setViewPlanes(viewPlanes);
    const xPlaneRow = uiContainer.querySelector('.js-x-plane-row');
    const yPlaneRow = uiContainer.querySelector('.js-y-plane-row');
    const zPlaneRow = uiContainer.querySelector('.js-z-plane-row');
    if (view.getViewMode() === 'VolumeRendering') {
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

    const viewPlanesButton = document.createElement('div');
    viewPlanesButton.innerHTML = `<input id="viewPlanes" type="checkbox" class="${
      style.toggleInput
    }"><label class="${style.viewPlanesButton} ${
      style.toggleButton
    }" for="viewPlanes">${viewPlansIcon}</label>`;
    viewPlanesButton.addEventListener('change', (event) => {
      setViewPlanes();
    });
    mainUIRow.appendChild(viewPlanesButton);
  }

  uiContainer.appendChild(mainUIGroup);

  return uiContainer;
}

export default createMainUI;
