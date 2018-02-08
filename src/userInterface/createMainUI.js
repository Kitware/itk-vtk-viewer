import processFiles from '../processFiles';
import getContrastSensitiveStyle from './getContrastSensitiveStyle';
import preventDefaults from './preventDefaults';

import style from './ItkVtkImageViewer.mcss';

import toggleIcon from './icons/toggle.svg';
import uploadIcon from './icons/upload.svg';
import screenshotIcon from './icons/screenshot.svg';
import volumeRenderingIcon from './icons/volume-rendering.svg';
import iPlaneIcon from './icons/x-plane.svg';
import jPlaneIcon from './icons/y-plane.svg';
import kPlaneIcon from './icons/z-plane.svg';
import viewPlansIcon from './icons/view-planes.svg';
import annotationIcon from './icons/annotations.svg';

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
    ['uiToggleButton', 'uploadButton', 'screenshotButton', 'annotationButton'],
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

  async function handleFile(e) {
    preventDefaults(e);
    const dataTransfer = e.dataTransfer;
    const files = e.target.files || dataTransfer.files;
    await processFiles(rootContainer, { files });
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

  function setViewModeIPlane() {
    view.setViewMode('IPlane');
    document.getElementById('iPlaneButton').checked = true;
    document.getElementById('jPlaneButton').checked = false;
    document.getElementById('kPlaneButton').checked = false;
    document.getElementById('volumeRenderingButton').checked = false;
    const volumeRenderingRow = uiContainer.querySelector('.js-volumeRendering');
    volumeRenderingRow.style.display = 'none';
    const iPlaneRow = uiContainer.querySelector('.js-i-plane-row');
    iPlaneRow.style.display = 'flex';
    const jPlaneRow = uiContainer.querySelector('.js-j-plane-row');
    jPlaneRow.style.display = 'none';
    const kPlaneRow = uiContainer.querySelector('.js-k-plane-row');
    kPlaneRow.style.display = 'none';
  }
  function setViewModeJPlane() {
    view.setViewMode('JPlane');
    document.getElementById('iPlaneButton').checked = false;
    document.getElementById('jPlaneButton').checked = true;
    document.getElementById('kPlaneButton').checked = false;
    document.getElementById('volumeRenderingButton').checked = false;
    const volumeRenderingRow = uiContainer.querySelector('.js-volumeRendering');
    volumeRenderingRow.style.display = 'none';
    const iPlaneRow = uiContainer.querySelector('.js-i-plane-row');
    iPlaneRow.style.display = 'none';
    const jPlaneRow = uiContainer.querySelector('.js-j-plane-row');
    jPlaneRow.style.display = 'flex';
    const kPlaneRow = uiContainer.querySelector('.js-k-plane-row');
    kPlaneRow.style.display = 'none';
  }
  function setViewModeKPlane() {
    view.setViewMode('KPlane');
    document.getElementById('iPlaneButton').checked = false;
    document.getElementById('jPlaneButton').checked = false;
    document.getElementById('kPlaneButton').checked = true;
    document.getElementById('volumeRenderingButton').checked = false;
    const volumeRenderingRow = uiContainer.querySelector('.js-volumeRendering');
    volumeRenderingRow.style.display = 'none';
    const iPlaneRow = uiContainer.querySelector('.js-i-plane-row');
    iPlaneRow.style.display = 'none';
    const jPlaneRow = uiContainer.querySelector('.js-j-plane-row');
    jPlaneRow.style.display = 'none';
    const kPlaneRow = uiContainer.querySelector('.js-k-plane-row');
    kPlaneRow.style.display = 'flex';
  }
  function setViewModeVolumeRendering() {
    view.setViewMode('VolumeRendering');
    document.getElementById('iPlaneButton').checked = false;
    document.getElementById('jPlaneButton').checked = false;
    document.getElementById('kPlaneButton').checked = false;
    document.getElementById('volumeRenderingButton').checked = true;
    const volumeRenderingRow = uiContainer.querySelector('.js-volumeRendering');
    volumeRenderingRow.style.display = 'flex';
    const viewPlanes = document.getElementById('viewPlanes').checked;
    const iPlaneRow = uiContainer.querySelector('.js-i-plane-row');
    const jPlaneRow = uiContainer.querySelector('.js-j-plane-row');
    const kPlaneRow = uiContainer.querySelector('.js-k-plane-row');
    if (viewPlanes) {
      iPlaneRow.style.display = 'flex';
      jPlaneRow.style.display = 'flex';
      kPlaneRow.style.display = 'flex';
    } else {
      iPlaneRow.style.display = 'none';
      jPlaneRow.style.display = 'none';
      kPlaneRow.style.display = 'none';
    }
  }
  let viewPlanes = false;
  function setViewPlanes() {
    viewPlanes = !viewPlanes;
    view.setViewPlanes(viewPlanes);
    const iPlaneRow = uiContainer.querySelector('.js-i-plane-row');
    const jPlaneRow = uiContainer.querySelector('.js-j-plane-row');
    const kPlaneRow = uiContainer.querySelector('.js-k-plane-row');
    if (view.getViewMode() === 'VolumeRendering') {
      if (viewPlanes) {
        iPlaneRow.style.display = 'flex';
        jPlaneRow.style.display = 'flex';
        kPlaneRow.style.display = 'flex';
      } else {
        iPlaneRow.style.display = 'none';
        jPlaneRow.style.display = 'none';
        kPlaneRow.style.display = 'none';
      }
    }
  }
  if (!use2D) {
    const iPlaneButton = document.createElement('div');
    iPlaneButton.innerHTML = `<input id="iPlaneButton" type="checkbox" class="${
      style.toggleInput
    }"><label class="${style.viewModeButton} ${
      style.toggleButton
    }" for="iPlaneButton">${iPlaneIcon}</label>`;
    iPlaneButton.addEventListener('click', setViewModeIPlane);
    mainUIRow.appendChild(iPlaneButton);

    const jPlaneButton = document.createElement('div');
    jPlaneButton.innerHTML = `<input id="jPlaneButton" type="checkbox" class="${
      style.toggleInput
    }"><label class="${style.viewModeButton} ${
      style.toggleButton
    }" for="jPlaneButton">${jPlaneIcon}</label>`;
    jPlaneButton.addEventListener('click', setViewModeJPlane);
    mainUIRow.appendChild(jPlaneButton);

    const kPlaneButton = document.createElement('div');
    kPlaneButton.innerHTML = `<input id="kPlaneButton" type="checkbox" class="${
      style.toggleInput
    }"><label class="${style.viewModeButton} ${
      style.toggleButton
    }" for="kPlaneButton">${kPlaneIcon}</label>`;
    kPlaneButton.addEventListener('click', setViewModeKPlane);
    mainUIRow.appendChild(kPlaneButton);

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
