import vtkColorMaps from 'vtk.js/Sources/Rendering/Core/ColorTransferFunction/ColorMaps';
import vtkPiecewiseGaussianWidget from 'vtk.js/Sources/Interaction/Widgets/PiecewiseGaussianWidget';

import sampleDistanceIcon from 'vtk.js/Sources/Interaction/UI/Icons/Spacing.svg';

import getContrastSensitiveStyle from './getContrastSensitiveStyle';

import style from './ItkVtkImageViewer.mcss';

import shadowIcon from './icons/shadow.svg';
import gradientOpacityIcon from './icons/gradient.svg';

function createUseShadowToggle(
  uiContainer,
  volumeRepresentation,
  renderWindow,
  isBackgroundDark
) {
  const contrastSensitiveStyle = getContrastSensitiveStyle(
    ['shadowButton'],
    isBackgroundDark
  );

  const useShadowButton = document.createElement('div');
  useShadowButton.innerHTML = `<input id="useShadow" type="checkbox" class="${
    style.toggleInput
  }" checked><label class="${contrastSensitiveStyle.shadowButton} ${
    style.toggleButton
  }" for="useShadow">${shadowIcon}</label>`;
  let useShadow = true;
  useShadowButton.addEventListener('change', (event) => {
    useShadow = !useShadow;
    volumeRepresentation.setUseShadow(useShadow);
    renderWindow.render();
  });
  uiContainer.appendChild(useShadowButton);
}

function createTransferFunctionWidget(
  uiContainer,
  lookupTableProxy,
  piecewiseFunctionProxy,
  dataArray,
  renderWindow,
  use2D
) {
  const piecewiseFunction = piecewiseFunctionProxy.getPiecewiseFunction();

  const transferFunctionWidget = vtkPiecewiseGaussianWidget.newInstance({
    numberOfBins: 256,
    size: [400, 150],
  });
  let iconSize = 20;
  if (use2D) {
    iconSize = 0;
  }
  transferFunctionWidget.updateStyle({
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    histogramColor: 'rgba(30, 30, 30, 0.6)',
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
    handleWidth: 4,
    iconSize, // Can be 0 if you want to remove buttons (dblClick for (+) / rightClick for (-))
    padding: 10,
  });
  transferFunctionWidget.setDataArray(dataArray.getData());

  const lookupTable = lookupTableProxy.getLookupTable();

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
    if (!use2D) {
      transferFunctionWidget.applyOpacity(piecewiseFunction);
    }
    const colorDataRange = transferFunctionWidget.getOpacityRange();
    const preset = vtkColorMaps.getPresetByName(
      lookupTableProxy.getPresetName()
    );
    lookupTable.applyColorMap(preset);
    lookupTable.setMappingRange(...colorDataRange);
    lookupTable.updateRange();

    if (!renderWindow.getInteractor().isAnimating()) {
      renderWindow.render();
    }
  });

  // Manage update when lookupTable changes
  lookupTable.onModified(() => {
    transferFunctionWidget.render();
    if (!renderWindow.getInteractor().isAnimating()) {
      renderWindow.render();
    }
  });

  transferFunctionWidget.setColorTransferFunction(lookupTable);
  if (use2D) {
    // Necessary side effect: addGaussian calls invokeOpacityChange, which
    // calls onOpacityChange, which updates the lut (does not have a low
    // opacity in 2D)
    transferFunctionWidget.addGaussian(0.5, 1.0, 0.5, 0.0, 3.0);
  } else {
    transferFunctionWidget.addGaussian(0.5, 1.0, 0.5, 0.5, 0.4);
  }
  transferFunctionWidget.applyOpacity(piecewiseFunction);
  transferFunctionWidget.render();

  const transferFunctionWidgetRow = document.createElement('div');
  transferFunctionWidgetRow.setAttribute('class', style.uiRow);
  transferFunctionWidgetRow.className += ' js-toggle';
  transferFunctionWidgetRow.appendChild(piecewiseWidgetContainer);
  uiContainer.appendChild(transferFunctionWidgetRow);
}

function createPlaneIndexSliders(
  uiContainer,
  volumeRepresentation,
  renderWindow,
  isBackgroundDark
) {
  const contrastSensitiveStyle = getContrastSensitiveStyle(
    ['sliderLabel'],
    isBackgroundDark
  );
  const size = volumeRepresentation.getInputDataSet().getDimensions();
  let currentIndex = null;

  const iPlaneRow = document.createElement('div');
  iPlaneRow.setAttribute('class', style.uiRow);
  iPlaneRow.className += ' js-toggle js-i-plane-row';

  const iSliderEntry = document.createElement('div');
  iSliderEntry.setAttribute('class', style.sliderEntry);
  currentIndex = volumeRepresentation.getXSliceIndex();
  iSliderEntry.innerHTML = `
    <label class="${
      contrastSensitiveStyle.sliderLabel
    } js-i-index-label">I:</label><input type="range" min="0" max="${
    size[0]
  }" value="${currentIndex}" step="1"
      class="${style.slider} js-i-index" />`;
  const iIndexElement = iSliderEntry.querySelector('.js-i-index');
  const iPlaneLabel = iSliderEntry.querySelector('.js-i-index-label');
  function updateIIndex() {
    const value = Number(iIndexElement.value);
    volumeRepresentation.setXSliceIndex(value);
    const valueString = String(iIndexElement.value);
    const padLength = valueString.length < 4 ? 4 - valueString.length : 0;
    const pad = '&nbsp;'.repeat(padLength);
    iPlaneLabel.innerHTML = `I: ${pad}${valueString}`;
    renderWindow.render();
  }
  iIndexElement.addEventListener('input', updateIIndex);
  iPlaneRow.appendChild(iSliderEntry);
  updateIIndex();
  iPlaneRow.style.display = 'none';

  uiContainer.appendChild(iPlaneRow);

  const jPlaneRow = document.createElement('div');
  jPlaneRow.setAttribute('class', style.uiRow);
  jPlaneRow.className += ' js-toggle js-j-plane-row';

  const jSliderEntry = document.createElement('div');
  jSliderEntry.setAttribute('class', style.sliderEntry);
  currentIndex = volumeRepresentation.getYSliceIndex();
  jSliderEntry.innerHTML = `
    <label class="${
      contrastSensitiveStyle.sliderLabel
    } js-j-index-label">J:</label><input type="range" min="0" max="${
    size[1]
  }" value="${currentIndex}" step="1"
      class="${style.slider} js-j-index" />`;
  const jIndexElement = jSliderEntry.querySelector('.js-j-index');
  const jPlaneLabel = jSliderEntry.querySelector('.js-j-index-label');
  function updateJIndex() {
    const value = Number(jIndexElement.value);
    volumeRepresentation.setYSliceIndex(value);
    const valueString = String(jIndexElement.value);
    const padLength = valueString.length < 4 ? 4 - valueString.length : 0;
    const pad = '&nbsp;'.repeat(padLength);
    jPlaneLabel.innerHTML = `J: ${pad}${valueString}`;
    renderWindow.render();
  }
  jIndexElement.addEventListener('input', updateJIndex);
  jPlaneRow.appendChild(jSliderEntry);
  updateJIndex();
  jPlaneRow.style.display = 'none';

  uiContainer.appendChild(jPlaneRow);

  const kPlaneRow = document.createElement('div');
  kPlaneRow.setAttribute('class', style.uiRow);
  kPlaneRow.className += ' js-toggle js-k-plane-row';

  const kSliderEntry = document.createElement('div');
  kSliderEntry.setAttribute('class', style.sliderEntry);
  currentIndex = volumeRepresentation.getZSliceIndex();
  kSliderEntry.innerHTML = `
    <label class="${
      contrastSensitiveStyle.sliderLabel
    } js-k-index-label">K:</label><input type="range" min="0" max="${
    size[2]
  }" value="${currentIndex}" step="1"
      class="${style.slider} js-k-index" />`;
  const kIndexElement = kSliderEntry.querySelector('.js-k-index');
  const kPlaneLabel = kSliderEntry.querySelector('.js-k-index-label');
  function updateKIndex() {
    const value = Number(kIndexElement.value);
    volumeRepresentation.setZSliceIndex(value);
    const valueString = String(kIndexElement.value);
    const padLength = valueString.length < 4 ? 4 - valueString.length : 0;
    const pad = '&nbsp;'.repeat(padLength);
    kPlaneLabel.innerHTML = `K: ${pad}${valueString}`;
    renderWindow.render();
  }
  kIndexElement.addEventListener('input', updateKIndex);
  kPlaneRow.appendChild(kSliderEntry);
  updateKIndex();
  kPlaneRow.style.display = 'none';

  uiContainer.appendChild(kPlaneRow);
}

function createColorPresetSelector(
  uiContainer,
  lookupTableProxy,
  renderWindow
) {
  const presetNames = vtkColorMaps.rgbPresetNames;

  const presetSelector = document.createElement('select');
  presetSelector.setAttribute('class', style.selector);
  presetSelector.className += ' js-color-preset';
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

function createSampleDistanceSlider(
  uiContainer,
  isBackgroundDark,
  volumeRepresentation,
  renderWindow
) {
  const contrastSensitiveStyle = getContrastSensitiveStyle(
    ['sampleDistanceButton'],
    isBackgroundDark
  );

  const sliderEntry = document.createElement('div');
  sliderEntry.setAttribute('class', style.sliderEntry);
  sliderEntry.innerHTML = `
    <div class="${contrastSensitiveStyle.sampleDistanceButton}">
      ${sampleDistanceIcon}
    </div>
    <input type="range" min="0" max="1" value="0.3" step="0.01"
      class="${style.slider} js-spacing" />`;
  const spacingElement = sliderEntry.querySelector('.js-spacing');
  function updateSpacing() {
    const value = Number(spacingElement.value);
    volumeRepresentation.setSampleDistance(value);
    renderWindow.render();
  }
  spacingElement.addEventListener('input', updateSpacing);
  updateSpacing();
  uiContainer.appendChild(sliderEntry);
}

function createGradientOpacitySlider(
  uiContainer,
  isBackgroundDark,
  volumeRepresentation,
  renderWindow
) {
  const contrastSensitiveStyle = getContrastSensitiveStyle(
    ['gradientOpacityButton'],
    isBackgroundDark
  );

  const sliderEntry = document.createElement('div');
  sliderEntry.setAttribute('class', style.sliderEntry);
  sliderEntry.innerHTML = `
    <div class="${contrastSensitiveStyle.gradientOpacityButton}">
      ${gradientOpacityIcon}
    </div>
    <input type="range" min="0" max="1" value="0.2" step="0.01"
      class="${style.slider} js-edge" />`;
  const edgeElement = sliderEntry.querySelector('.js-edge');
  function updateGradientOpacity() {
    const value = Number(edgeElement.value);
    volumeRepresentation.setEdgeGradient(value);
    renderWindow.render();
  }
  edgeElement.addEventListener('input', updateGradientOpacity);
  updateGradientOpacity();
  uiContainer.appendChild(sliderEntry);
}

function createImageUI(
  uiContainer,
  lookupTableProxy,
  piecewiseFunctionProxy,
  volumeRepresentation,
  dataArray,
  renderWindow,
  isBackgroundDark,
  use2D
) {
  const imageUIGroup = document.createElement('div');
  imageUIGroup.setAttribute('class', style.uiGroup);

  const presetRow = document.createElement('div');
  presetRow.setAttribute('class', style.uiRow);
  createColorPresetSelector(presetRow, lookupTableProxy, renderWindow);
  presetRow.className += ' js-toggle';
  imageUIGroup.appendChild(presetRow);

  createTransferFunctionWidget(
    imageUIGroup,
    lookupTableProxy,
    piecewiseFunctionProxy,
    dataArray,
    renderWindow,
    use2D
  );

  if (!use2D) {
    const volumeRenderingRow = document.createElement('div');
    volumeRenderingRow.setAttribute('class', style.uiRow);
    volumeRenderingRow.className += ' js-volumeRendering js-toggle';
    createUseShadowToggle(
      volumeRenderingRow,
      volumeRepresentation,
      renderWindow,
      isBackgroundDark
    );
    createSampleDistanceSlider(
      volumeRenderingRow,
      isBackgroundDark,
      volumeRepresentation,
      renderWindow
    );
    createGradientOpacitySlider(
      volumeRenderingRow,
      isBackgroundDark,
      volumeRepresentation,
      renderWindow
    );
    imageUIGroup.appendChild(volumeRenderingRow);

    createPlaneIndexSliders(
      imageUIGroup,
      volumeRepresentation,
      renderWindow,
      isBackgroundDark
    );
  }

  uiContainer.appendChild(imageUIGroup);
}

export default createImageUI;
