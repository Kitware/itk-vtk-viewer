import vtkColorMaps               from 'vtk.js/Sources/Rendering/Core/ColorTransferFunction/ColorMaps.json';
import vtkURLExtract              from 'vtk.js/Sources/Common/Core/URLExtract';
import vtkPiecewiseGaussianWidget from 'vtk.js/Sources/Interaction/Widgets/PiecewiseGaussianWidget';

import style from './ItkVtkImageViewer.mcss';
import toggleIcon from './toggleIcon.png';

const domElements = {};

// ----------------------------------------------------------------------------

function getPreset(name) {
  return vtkColorMaps.find(p => p.Name === name);
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

function createPiecewiseWidget(container, lookupTable, piecewiseFunction, dataArray, renderWindow) {
  const myContainer = getRootContainer(container);

  const transferFunctionWidget = vtkPiecewiseGaussianWidget.newInstance({ numberOfBins: 256, size: [400, 150] });
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

  transferFunctionWidget.setColorTransferFunction(lookupTable);
  transferFunctionWidget.addGaussian(0.5, 1.0, 0.5, 0.5, 0.4);
  transferFunctionWidget.applyOpacity(piecewiseFunction);

  domElements.widgetContainer = document.createElement('div');
  domElements.widgetContainer.setAttribute('class', style.piecewiseWidget);

  transferFunctionWidget.setContainer(domElements.widgetContainer);
  transferFunctionWidget.bindMouseListeners();

  // Manage update when opacity change
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

  // Manage update when lookupTable change
  lookupTable.onModified(() => {
    transferFunctionWidget.render();
    if (!renderWindow.getInteractor().isAnimating()) {
      renderWindow.render();
    }
  });

  transferFunctionWidget.render();

  myContainer.appendChild(domElements.widgetContainer);
}

// ----------------------------------------------------------------------------

function createColorPresetSelector(container, lookupTable, dataRangeToUse) {
  const myContainer = getRootContainer(container);
  const presetNames = vtkColorMaps.filter(p => p.RGBPoints).filter(p => p.ColorSpace !== 'CIELAB').map(p => p.Name);

  domElements.presetSelector = document.createElement('select');
  domElements.presetSelector.setAttribute('class', style.selector);
  domElements.presetSelector.innerHTML = presetNames.map(name => `<option value="${name}">${name}</option>`).join('');

  function applyPreset() {
    lookupTable.applyColorMap(getPreset(domElements.presetSelector.value));
    lookupTable.setMappingRange(...dataRangeToUse);
    lookupTable.updateRange();
  }
  applyPreset();

  domElements.presetSelector.addEventListener('change', applyPreset);
  myContainer.appendChild(domElements.presetSelector);
}

// ----------------------------------------------------------------------------

function createVolumeToggleUI(container, lookupTable, piecewiseFunction, actor, dataArray, renderWindow) {
  const myContainer = getRootContainer(container);
  createColorPresetSelector(myContainer, lookupTable, dataArray.getRange());
  createPiecewiseWidget(myContainer, lookupTable, piecewiseFunction, dataArray, renderWindow);

  domElements.shadowContainer = document.createElement('select');
  domElements.shadowContainer.setAttribute('class', style.shadow);
  domElements.shadowContainer.innerHTML = '<option value="1">Use shadow</option><option value="0">No shadow</option>';

  // Shadow management
  domElements.shadowContainer.addEventListener('change', (event) => {
    const useShadow = !!Number(event.target.value);
    actor.getProperty().setShade(useShadow);
    actor.getProperty().setUseGradientOpacity(0, useShadow);
    renderWindow.render();
  });

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

  const toggleButton = new Image();
  toggleButton.src = toggleIcon;
  toggleButton.setAttribute('class', style.toggleButton);
  toggleButton.addEventListener('click', toggleWidgetVisibility);

  myContainer.appendChild(toggleButton);
  myContainer.appendChild(domElements.shadowContainer);
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
  domElements.fileContainer.innerHTML = `<div class="${style.bigFileDrop}"/><input type="file" class="file" style="display: none;" multiple/>`;
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
  domElements.fileContainer.addEventListener('click', e => fileInput.click());
  domElements.fileContainer.addEventListener('dragover', preventDefaults);
}

// ----------------------------------------------------------------------------

export default {
  createColorPresetSelector,
  createFileDragAndDrop,
  createLoadingProgress,
  createPiecewiseWidget,
  createVolumeToggleUI,
  domElements,
  emptyContainer,
  getPreset,
  getRootContainer,
  progressCallback,
};
