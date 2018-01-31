import vtkColorMaps from 'vtk.js/Sources/Rendering/Core/ColorTransferFunction/ColorMaps';
import vtkURLExtract from 'vtk.js/Sources/Common/Core/URLExtract';
import vtkPiecewiseGaussianWidget from 'vtk.js/Sources/Interaction/Widgets/PiecewiseGaussianWidget';

import style from './ItkVtkImageViewer.mcss';
import logoIcon from './icons/logo.png';
import toggleIcon from './icons/toggle.svg';

const domElements = {};

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

function createLoadingProgress(container) {
  const myContainer = getRootContainer(container);

  domElements.loading = document.createElement('div');
  domElements.loading.setAttribute('class', style.loading);
  myContainer.appendChild(domElements.loading);

  domElements.progressContainer = document.createElement('div');
  domElements.progressContainer.setAttribute('class', style.progress);
  myContainer.appendChild(domElements.progressContainer);
}

function createPiecewiseWidget(
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

  domElements.piecewiseWidgetContainer = document.createElement('div');
  domElements.piecewiseWidgetContainer.setAttribute(
    'class',
    style.piecewiseWidget
  );
  domElements.piecewiseWidgetContainer.className += ' js-toggle';

  transferFunctionWidget.setContainer(domElements.piecewiseWidgetContainer);
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
  transferFunctionWidgetRow.appendChild(domElements.piecewiseWidgetContainer);
  uiContainer.appendChild(transferFunctionWidgetRow);
}

function createColorPresetSelector(
  uiContainer,
  lookupTableProxy,
  renderWindow
) {
  const presetNames = vtkColorMaps.rgbPresetNames;

  domElements.presetSelector = document.createElement('select');
  domElements.presetSelector.setAttribute('class', style.selector);
  domElements.presetSelector.innerHTML = presetNames
    .map((name) => `<option value="${name}">${name}</option>`)
    .join('');

  function applyPreset(event) {
    lookupTableProxy.setPresetName(event.target.value);
    renderWindow.render();
  }

  domElements.presetSelector.addEventListener('change', applyPreset);
  uiContainer.appendChild(domElements.presetSelector);
  domElements.presetSelector.value = lookupTableProxy.getPresetName();
}

function createUseShadowToggle(
  uiContainer,
  volumeRepresentation,
  renderWindow
) {
  domElements.shadowContainer = document.createElement('select');
  domElements.shadowContainer.setAttribute('class', style.shadow);
  domElements.shadowContainer.innerHTML =
    '<option value="1">Use shadow</option><option value="0">No shadow</option>';

  // Shadow management
  domElements.shadowContainer.addEventListener('change', (event) => {
    const useShadow = !!Number(event.target.value);
    volumeRepresentation.setUseShadow(useShadow);
    renderWindow.render();
  });
  uiContainer.appendChild(domElements.shadowContainer);
}

function addLogo(uiContainer) {
  const logo = new Image();
  logo.src = logoIcon;
  logo.setAttribute('class', style.logo);
  uiContainer.appendChild(logo);
}

function createMainUI(uiContainer, isBackgroundDark) {
  uiContainer.setAttribute('class', style.uiContainer);

  const mainUIGroup = document.createElement('div');
  mainUIGroup.setAttribute('class', style.uiGroup);

  const mainUIRow = document.createElement('div');
  mainUIRow.setAttribute('class', style.uiRow);
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
  const contrastSensitiveStyle = getContrastSensitiveStyle(
    ['toggleButton'],
    isBackgroundDark
  );
  toggleButton.innerHTML = `<div class="${
    contrastSensitiveStyle.toggleButton
  }">${toggleIcon}</div>`;
  toggleButton.addEventListener('click', toggleUIVisibility);
  mainUIRow.appendChild(toggleButton);

  uiContainer.appendChild(mainUIGroup);
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

  createPiecewiseWidget(
    imageUIGroup,
    lookupTableProxy,
    piecewiseFunctionProxy,
    dataArray,
    renderWindow
  );

  uiContainer.appendChild(imageUIGroup);
}

function progressCallback(progressEvent) {
  const percent = Math.floor(100 * progressEvent.loaded / progressEvent.total);
  domElements.progressContainer.innerHTML = `${percent}%`;
}

function emptyContainer(container) {
  if (container) {
    while (container.firstChild) {
      container.removeChild(container.firstChild);
    }
  }
}

function preventDefaults(e) {
  e.preventDefault();
  e.stopPropagation();
}

function createFileDragAndDrop(container, onDataChange) {
  const myContainer = getRootContainer(container);

  domElements.fileContainer = document.createElement('div');
  domElements.fileContainer.innerHTML = `<div class="${
    style.bigFileDrop
  }"/><input type="file" class="file" style="display: none;" multiple/>`;
  myContainer.appendChild(domElements.fileContainer);

  const fileInput = domElements.fileContainer.querySelector('input');

  function handleFile(e) {
    preventDefaults(e);
    const dataTransfer = e.dataTransfer;
    const files = e.target.files || dataTransfer.files;
    myContainer.removeChild(domElements.fileContainer);
    const use2D = !!vtkURLExtract.extractURLParameters().use2D;
    onDataChange(myContainer, { files, use2D });
  }

  fileInput.addEventListener('change', handleFile);
  domElements.fileContainer.addEventListener('drop', handleFile);
  domElements.fileContainer.addEventListener('click', (e) => fileInput.click());
  domElements.fileContainer.addEventListener('dragover', preventDefaults);
}

// ----------------------------------------------------------------------------

export default {
  addLogo,
  createFileDragAndDrop,
  createLoadingProgress,
  createMainUI,
  createImageUI,
  domElements,
  emptyContainer,
  getRootContainer,
  progressCallback,
};
