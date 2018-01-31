import vtkColorMaps from 'vtk.js/Sources/Rendering/Core/ColorTransferFunction/ColorMaps';
import vtkURLExtract from 'vtk.js/Sources/Common/Core/URLExtract';
import vtkPiecewiseGaussianWidget from 'vtk.js/Sources/Interaction/Widgets/PiecewiseGaussianWidget';

import processFiles from './processFiles';

import style from './ItkVtkImageViewer.mcss';

import logoIcon from './icons/logo.png';
import toggleIcon from './icons/toggle.svg';
import uploadIcon from './icons/upload.svg';
import screenshotIcon from './icons/screenshot.svg';

function getContrastSensitiveStyle(cssClasses, isBackgroundDark) {
  const stylePostFix = isBackgroundDark ? 'DarkBG' : 'BrightBG';
  const contrastSensitiveStyle = {};
  cssClasses.forEach((name) => {
    contrastSensitiveStyle[name] = style[`${name}${stylePostFix}`];
  });
  return contrastSensitiveStyle;
}

function getRootContainer(container) {
  const workContainer = document.querySelector('.content');
  const rootBody = document.querySelector('body');

  return container || workContainer || rootBody;
}

function preventDefaults(e) {
  e.preventDefault();
  e.stopPropagation();
}

function emptyContainer(container) {
  if (container) {
    while (container.firstChild) {
      container.removeChild(container.firstChild);
    }
  }
}

function createFileDragAndDrop(container, onDataChange) {
  const myContainer = getRootContainer(container);

  const fileContainer = document.createElement('div');
  fileContainer.innerHTML = `<div class="${
    style.bigFileDrop
  }"/><input type="file" class="file" style="display: none;" multiple/>`;
  myContainer.appendChild(fileContainer);

  const fileInput = fileContainer.querySelector('input');

  function handleFile(e) {
    preventDefaults(e);
    const dataTransfer = e.dataTransfer;
    const files = e.target.files || dataTransfer.files;
    myContainer.removeChild(fileContainer);
    const use2D = !!vtkURLExtract.extractURLParameters().use2D;
    onDataChange(myContainer, { files, use2D });
  }

  fileInput.addEventListener('change', handleFile);
  fileContainer.addEventListener('drop', handleFile);
  fileContainer.addEventListener('click', (e) => fileInput.click());
  fileContainer.addEventListener('dragover', preventDefaults);
}

function createLoadingProgress(container) {
  const myContainer = getRootContainer(container);

  const loading = document.createElement('div');
  loading.setAttribute('class', style.loading);
  myContainer.appendChild(loading);

  const progressContainer = document.createElement('div');
  progressContainer.setAttribute('class', style.progress);
  myContainer.appendChild(progressContainer);

  function progressCallback(progressEvent) {
    const percent = Math.floor(
      100 * progressEvent.loaded / progressEvent.total
    );
    progressContainer.innerHTML = `${percent}%`;
  }

  return progressCallback;
}

function addLogo(uiContainer) {
  const logo = new Image();
  logo.src = logoIcon;
  logo.setAttribute('class', style.logo);
  uiContainer.appendChild(logo);
}

function createMainUI(rootContainer, isBackgroundDark, imageSource, view) {
  const uiContainer = document.createElement('div');
  rootContainer.appendChild(uiContainer);
  uiContainer.setAttribute('class', style.uiContainer);

  const contrastSensitiveStyle = getContrastSensitiveStyle(
    ['toggleButton', 'uploadButton', 'screenshotButton'],
    isBackgroundDark
  );

  const mainUIGroup = document.createElement('div');
  mainUIGroup.setAttribute('class', style.uiGroup);

  const mainUIRow = document.createElement('div');
  mainUIRow.setAttribute('class', style.uiRow);
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
  const toggleButton = document.createElement('div');
  toggleButton.innerHTML = `<div class="${
    contrastSensitiveStyle.toggleButton
  }">${toggleIcon}</div>`;
  toggleButton.addEventListener('click', toggleUIVisibility);
  uiContainer.appendChild(toggleButton);

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

  uiContainer.appendChild(mainUIGroup);

  return uiContainer;
}

function createUseShadowToggle(
  uiContainer,
  volumeRepresentation,
  renderWindow
) {
  const shadowContainer = document.createElement('select');
  shadowContainer.setAttribute('class', style.shadow);
  shadowContainer.innerHTML =
    '<option value="1">Use shadow</option><option value="0">No shadow</option>';

  // Shadow management
  shadowContainer.addEventListener('change', (event) => {
    const useShadow = !!Number(event.target.value);
    volumeRepresentation.setUseShadow(useShadow);
    renderWindow.render();
  });
  uiContainer.appendChild(shadowContainer);
}

function createTransferFunctionWidget(
  uiContainer,
  lookupTableProxy,
  piecewiseFunctionProxy,
  dataArray,
  renderWindow
) {
  const piecewiseFunction = piecewiseFunctionProxy.getPiecewiseFunction();

  const transferFunctionWidget = vtkPiecewiseGaussianWidget.newInstance({
    numberOfBins: 256,
    size: [400, 150],
  });
  transferFunctionWidget.updateStyle({
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    histogramColor: 'rgba(50, 50, 50, 0.6)',
    strokeColor: 'rgb(0, 0, 0)',
    activeColor: 'rgb(255, 255, 255)',
    handleColor: 'rgb(50, 50, 150)',
    buttonDisableFillColor: 'rgba(255, 255, 255, 0.5)',
    buttonDisableStrokeColor: 'rgba(0, 0, 0, 0.5)',
    buttonStrokeColor: 'rgba(0, 0, 0, 1)',
    buttonFillColor: 'rgba(255, 255, 255, 1)',
    strokeWidth: 2,
    activeStrokeWidth: 3,
    buttonStrokeWidth: 1.5,
    handleWidth: 3,
    iconSize: 20, // Can be 0 if you want to remove buttons (dblClick for (+) / rightClick for (-))
    padding: 10,
  });
  transferFunctionWidget.setDataArray(dataArray.getData());

  transferFunctionWidget.setColorTransferFunction(
    lookupTableProxy.getLookupTable()
  );
  transferFunctionWidget.addGaussian(0.5, 1.0, 0.5, 0.5, 0.4);
  transferFunctionWidget.applyOpacity(piecewiseFunction);

  const piecewiseWidgetContainer = document.createElement('div');
  piecewiseWidgetContainer.setAttribute('class', style.piecewiseWidget);

  transferFunctionWidget.setContainer(piecewiseWidgetContainer);
  transferFunctionWidget.bindMouseListeners();

  // Manage update when opacity changes
  transferFunctionWidget.onAnimation((start) => {
    if (start) {
      renderWindow.getInteractor().requestAnimation(transferFunctionWidget);
    } else {
      renderWindow.getInteractor().cancelAnimation(transferFunctionWidget);
      renderWindow.render();
    }
  });
  transferFunctionWidget.onOpacityChange(() => {
    transferFunctionWidget.applyOpacity(piecewiseFunction);
    if (!renderWindow.getInteractor().isAnimating()) {
      renderWindow.render();
    }
  });

  // Manage update when lookupTable changes
  lookupTableProxy.getLookupTable().onModified(() => {
    transferFunctionWidget.render();
    if (!renderWindow.getInteractor().isAnimating()) {
      renderWindow.render();
    }
  });

  transferFunctionWidget.render();
  const transferFunctionWidgetRow = document.createElement('div');
  transferFunctionWidgetRow.setAttribute('class', style.uiRow);
  transferFunctionWidgetRow.className += ' js-toggle';
  transferFunctionWidgetRow.appendChild(piecewiseWidgetContainer);
  uiContainer.appendChild(transferFunctionWidgetRow);
}

function createColorPresetSelector(
  uiContainer,
  lookupTableProxy,
  renderWindow
) {
  const presetNames = vtkColorMaps.rgbPresetNames;

  const presetSelector = document.createElement('select');
  presetSelector.setAttribute('class', style.selector);
  presetSelector.innerHTML = presetNames
    .map((name) => `<option value="${name}">${name}</option>`)
    .join('');

  function applyPreset(event) {
    lookupTableProxy.setPresetName(event.target.value);
    renderWindow.render();
  }

  presetSelector.addEventListener('change', applyPreset);
  uiContainer.appendChild(presetSelector);
  presetSelector.value = lookupTableProxy.getPresetName();
}

function createImageUI(
  uiContainer,
  lookupTableProxy,
  piecewiseFunctionProxy,
  volumeRepresentation,
  dataArray,
  renderWindow,
  isBackgroundDark
) {
  const imageUIGroup = document.createElement('div');
  imageUIGroup.setAttribute('class', style.uiGroup);

  const shadowPresetRow = document.createElement('div');
  shadowPresetRow.setAttribute('class', style.uiRow);
  createUseShadowToggle(shadowPresetRow, volumeRepresentation, renderWindow);
  createColorPresetSelector(shadowPresetRow, lookupTableProxy, renderWindow);
  shadowPresetRow.className += ' js-toggle';
  imageUIGroup.appendChild(shadowPresetRow);

  createTransferFunctionWidget(
    imageUIGroup,
    lookupTableProxy,
    piecewiseFunctionProxy,
    dataArray,
    renderWindow
  );

  uiContainer.appendChild(imageUIGroup);
}

export default {
  addLogo,
  createFileDragAndDrop,
  createLoadingProgress,
  createMainUI,
  createImageUI,
  emptyContainer,
  getRootContainer,
};
