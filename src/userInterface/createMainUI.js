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
  }
  function setViewModeYPlane() {
    view.setViewMode('YPlane');
  }
  function setViewModeZPlane() {
    view.setViewMode('ZPlane');
  }
  function setViewModeVolumeRendering() {
    view.setViewMode('VolumeRendering');
  }
  let viewPlanes = false;
  function setViewPlanes() {
    viewPlanes = !viewPlanes;
    view.setViewPlanes(viewPlanes);
  }
  if (!use2D) {
    const xPlaneButton = document.createElement('div');
    xPlaneButton.innerHTML = `<div class="${
      style.viewModeButton
    }">${xPlaneIcon}</div>`;
    xPlaneButton.addEventListener('click', setViewModeXPlane);
    mainUIRow.appendChild(xPlaneButton);

    const yPlaneButton = document.createElement('div');
    yPlaneButton.innerHTML = `<div class="${
      style.viewModeButton
    }">${yPlaneIcon}</div>`;
    yPlaneButton.addEventListener('click', setViewModeYPlane);
    mainUIRow.appendChild(yPlaneButton);

    const zPlaneButton = document.createElement('div');
    zPlaneButton.innerHTML = `<div class="${
      style.viewModeButton
    }">${zPlaneIcon}</div>`;
    zPlaneButton.addEventListener('click', setViewModeZPlane);
    mainUIRow.appendChild(zPlaneButton);

    const volumeRenderingButton = document.createElement('div');
    volumeRenderingButton.innerHTML = `<div class="${
      style.viewModeButton
    }">${volumeRenderingIcon}</div>`;
    volumeRenderingButton.addEventListener('click', setViewModeVolumeRendering);
    mainUIRow.appendChild(volumeRenderingButton);

    const viewPlanesButton = document.createElement('div');
    viewPlanesButton.innerHTML = `<div class="${
      style.viewModeButton
    }">${viewPlansIcon}</div>`;
    viewPlanesButton.addEventListener('click', setViewPlanes);
    const viewPlanesWidget = document.createElement('label');
    viewPlanesWidget.setAttribute('class', style.toggleSwitch);
    viewPlanesWidget.innerHTML = `<input type="checkbox" class="${
      style.toggleSwitchInput
    }"><span class="${style.toggleWidget}"></span>`;
    viewPlanesWidget.addEventListener('change', (event) => {
      setViewPlanes();
    });
    mainUIRow.appendChild(viewPlanesButton);
    mainUIRow.appendChild(viewPlanesWidget);
  }

  uiContainer.appendChild(mainUIGroup);

  return uiContainer;
}

export default createMainUI;
