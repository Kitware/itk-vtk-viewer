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
  renderWindow
) {
  const piecewiseFunction = piecewiseFunctionProxy.getPiecewiseFunction();

  const transferFunctionWidget = vtkPiecewiseGaussianWidget.newInstance({
    numberOfBins: 256,
    size: [400, 150],
  });
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
  isBackgroundDark
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
    renderWindow
  );

  const volumeRenderingRow = document.createElement('div');
  volumeRenderingRow.setAttribute('class', style.uiRow);
  volumeRenderingRow.className += ' js-toggle';
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

  uiContainer.appendChild(imageUIGroup);
}

export default createImageUI;
