import vtkColorMaps from 'vtk.js/Sources/Rendering/Core/ColorTransferFunction/ColorMaps';
import vtkURLExtract from 'vtk.js/Sources/Common/Core/URLExtract';
import vtkPiecewiseGaussianWidget from 'vtk.js/Sources/Interaction/Widgets/PiecewiseGaussianWidget';

import style from './ItkVtkImageViewer.mcss';
import logoIcon from './icons/logo.png';
import toggleIcon from './icons/toggle.svg';

const domElements = {};

function getPreset(name) {
  return vtkColorMaps.find((p) => p.Name === name);
}

function getLocalStyle(cssClasses, isBackgroundDark) {
  const stylePostFix = isBackgroundDark ? 'DarkBG' : 'BrightBG';
  const localStyle = {};
  cssClasses.forEach((name) => {
    localStyle[name] = style[`${name}${stylePostFix}`];
  });
  return localStyle;
}

// ----------------------------------------------------------------------------

function getRootContainer(container) {
  const workContainer = document.querySelector('.content');
  const rootBody = document.querySelector('body');
  return container || workContainer || rootBody;
}

// ----------------------------------------------------------------------------

function createLoadingProgress(container) {
  const myContainer = getRootContainer(container);

  domElements.loading = document.createElement('div');
  domElements.loading.setAttribute('class', style.loading);
  myContainer.appendChild(domElements.loading);

  domElements.progressContainer = document.createElement('div');
  domElements.progressContainer.setAttribute('class', style.progress);
  myContainer.appendChild(domElements.progressContainer);
}

// ----------------------------------------------------------------------------

function createPiecewiseWidget(
  rootContainer,
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
    backgroundColor: 'rgba(255, 255, 255, 0.6)',
    histogramColor: 'rgba(100, 100, 100, 0.5)',
    strokeColor: 'rgb(0, 0, 0)',
    activeColor: 'rgb(255, 255, 255)',
    handleColor: 'rgb(50, 150, 50)',
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

  domElements.widgetContainer = document.createElement('div');
  domElements.widgetContainer.setAttribute('class', style.piecewiseWidget);

  transferFunctionWidget.setContainer(domElements.widgetContainer);
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
  rootContainer.appendChild(domElements.widgetContainer);
}

function createColorPresetSelector(
  rootContainer,
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
  rootContainer.appendChild(domElements.presetSelector);
  domElements.presetSelector.value = lookupTableProxy.getPresetName();
}

function createUseShadowToggle(
  rootContainer,
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
  rootContainer.appendChild(domElements.shadowContainer);
}

function createToggleUI(rootContainer, isBackgroundDark) {
  const logo = new Image();
  logo.src = logoIcon;
  logo.setAttribute('class', style.logo);
  rootContainer.appendChild(logo);

  function toggleWidgetVisibility() {
    if (domElements.widgetContainer.style.display === 'none') {
      domElements.widgetContainer.style.display = 'block';
      domElements.presetSelector.style.display = 'block';
      domElements.shadowContainer.style.display = 'block';
    } else {
      domElements.widgetContainer.style.display = 'none';
      domElements.presetSelector.style.display = 'none';
      domElements.shadowContainer.style.display = 'none';
    }
  }

  const toggleButton = document.createElement('div');
  const localStyle = getLocalStyle(['toggleButton'], isBackgroundDark);
  toggleButton.innerHTML = `<div class="${
    localStyle.toggleButton
  }">${toggleIcon}</div>`;
  toggleButton.addEventListener('click', toggleWidgetVisibility);
  rootContainer.appendChild(toggleButton);
}

function createVolumeUI(
  container,
  lookupTableProxy,
  piecewiseFunctionProxy,
  volumeRepresentation,
  dataArray,
  renderWindow,
  isBackgroundDark
) {
  const rootContainer = getRootContainer(container);

  createUseShadowToggle(rootContainer, volumeRepresentation, renderWindow);

  createColorPresetSelector(rootContainer, lookupTableProxy, renderWindow);

  createPiecewiseWidget(
    rootContainer,
    lookupTableProxy,
    piecewiseFunctionProxy,
    dataArray,
    renderWindow
  );
}

// ----------------------------------------------------------------------------

function progressCallback(progressEvent) {
  const percent = Math.floor(100 * progressEvent.loaded / progressEvent.total);
  domElements.progressContainer.innerHTML = `${percent}%`;
}

// ----------------------------------------------------------------------------

function emptyContainer(container) {
  if (container) {
    while (container.firstChild) {
      container.removeChild(container.firstChild);
    }
  }
}

// ----------------------------------------------------------------------------

function preventDefaults(e) {
  e.preventDefault();
  e.stopPropagation();
}

// ----------------------------------------------------------------------------

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
  createColorPresetSelector,
  createFileDragAndDrop,
  createLoadingProgress,
  createPiecewiseWidget,
  createToggleUI,
  createUseShadowToggle,
  createVolumeUI,
  domElements,
  emptyContainer,
  getPreset,
  getRootContainer,
  progressCallback,
};
