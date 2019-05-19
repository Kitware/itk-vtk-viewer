import sampleDistanceIcon from 'vtk.js/Sources/Interaction/UI/Icons/Spacing.svg';

import getContrastSensitiveStyle from './getContrastSensitiveStyle';

import style from './ItkVtkViewer.module.css';

import gradientOpacityIcon from './icons/gradient.svg';

import createTransferFunctionWidget from './Image/createTransferFunctionWidget';
import createViewPlanesToggle from './Image/createViewPlanesToggle';
import createUseShadowToggle from './Image/createUseShadowToggle';


function createPlaneIndexSliders(
  uiContainer,
  viewerDOMId,
  volumeRepresentation,
  renderWindow,
  isBackgroundDark
) {
  const contrastSensitiveStyle = getContrastSensitiveStyle(
    ['sliderLabel'],
    isBackgroundDark
  );
  const numberOfValueChars = 6;
  let currentSlicePosition = null;

  const xPlaneRow = document.createElement('div');
  xPlaneRow.setAttribute('class', style.uiRow);
  xPlaneRow.className += ` ${viewerDOMId}-toggle ${viewerDOMId}-x-plane-row`;

  const xSlice = volumeRepresentation.getPropertyDomainByName('xSlice');
  const ySlice = volumeRepresentation.getPropertyDomainByName('ySlice');
  const zSlice = volumeRepresentation.getPropertyDomainByName('zSlice');

  const xSliderEntry = document.createElement('div');
  xSliderEntry.setAttribute('class', style.sliderEntry);
  currentSlicePosition = volumeRepresentation.getXSlice();
  xSliderEntry.innerHTML = `
    <label id="${viewerDOMId}-xSliceLabel" class="${
      contrastSensitiveStyle.sliderLabel
    }">X:</label><input type="range" min="${
    xSlice.min
  }" max="${xSlice.max}" value="${currentSlicePosition}" step="${xSlice.step}"
      id="${viewerDOMId}-xSlice" class="${style.slider}" />`;
  const xSliceElement = xSliderEntry.querySelector(`#${viewerDOMId}-xSlice`);
  const xPlaneLabel = xSliderEntry.querySelector(
    `#${viewerDOMId}-xSliceLabel`
  );
  function updateXSlice() {
    const value = Number(xSliceElement.value);
    volumeRepresentation.setXSlice(value);
    const valueString = String(xSliceElement.value).substring(
      0,
      numberOfValueChars
    );
    const padLength =
      valueString.length < numberOfValueChars
        ? numberOfValueChars - valueString.length
        : 0;
    const pad = '&nbsp;'.repeat(padLength);
    xPlaneLabel.innerHTML = `X: ${pad}${valueString}`;
    renderWindow.render();
  }
  xSliceElement.addEventListener('input', updateXSlice);
  xPlaneRow.appendChild(xSliderEntry);
  updateXSlice();
  xPlaneRow.style.display = 'none';

  uiContainer.appendChild(xPlaneRow);

  const yPlaneRow = document.createElement('div');
  yPlaneRow.setAttribute('class', style.uiRow);
  yPlaneRow.className += ` ${viewerDOMId}-toggle ${viewerDOMId}-y-plane-row`;

  const ySliderEntry = document.createElement('div');
  ySliderEntry.setAttribute('class', style.sliderEntry);
  currentSlicePosition = volumeRepresentation.getYSlice();
  ySliderEntry.innerHTML = `
    <label id="${viewerDOMId}-ySliceLabel" class="${
      contrastSensitiveStyle.sliderLabel
    }">Y:</label><input type="range" min="${
    ySlice.min
  }" max="${ySlice.max}" value="${currentSlicePosition}" step="${ySlice.step}"
      id="${viewerDOMId}-ySlice" class="${style.slider}" />`;
  const ySliceElement = ySliderEntry.querySelector(`#${viewerDOMId}-ySlice`);
  const yPlaneLabel = ySliderEntry.querySelector(
    `#${viewerDOMId}-ySliceLabel`
  );
  function updateYSlice() {
    const value = Number(ySliceElement.value);
    volumeRepresentation.setYSlice(value);
    const valueString = String(ySliceElement.value).substring(
      0,
      numberOfValueChars
    );
    const padLength =
      valueString.length < numberOfValueChars
        ? numberOfValueChars - valueString.length
        : 0;
    const pad = '&nbsp;'.repeat(padLength);
    yPlaneLabel.innerHTML = `Y: ${pad}${valueString}`;
    renderWindow.render();
  }
  ySliceElement.addEventListener('input', updateYSlice);
  yPlaneRow.appendChild(ySliderEntry);
  updateYSlice();
  yPlaneRow.style.display = 'none';

  uiContainer.appendChild(yPlaneRow);

  const zPlaneRow = document.createElement('div');
  zPlaneRow.setAttribute('class', style.uiRow);
  zPlaneRow.className += ` ${viewerDOMId}-toggle ${viewerDOMId}-z-plane-row`;

  const zSliderEntry = document.createElement('div');
  zSliderEntry.setAttribute('class', style.sliderEntry);
  currentSlicePosition = volumeRepresentation.getZSlice();
  zSliderEntry.innerHTML = `
    <label id="${viewerDOMId}-zSliceLabel" class="${
      contrastSensitiveStyle.sliderLabel
    }">Z:</label><input type="range" min="${
    zSlice.min
  }" max="${zSlice.max}" value="${currentSlicePosition}" step="${zSlice.step}"
      id="${viewerDOMId}-zSlice" class="${style.slider}" />`;
  const zSliceElement = zSliderEntry.querySelector(`#${viewerDOMId}-zSlice`);
  const zPlaneLabel = zSliderEntry.querySelector(
    `#${viewerDOMId}-zSliceLabel`
  );
  function updateZSlice() {
    const value = Number(zSliceElement.value);
    volumeRepresentation.setZSlice(value);
    const valueString = String(zSliceElement.value).substring(
      0,
      numberOfValueChars
    );
    const padLength =
      valueString.length < numberOfValueChars
        ? numberOfValueChars - valueString.length
        : 0;
    const pad = '&nbsp;'.repeat(padLength);
    zPlaneLabel.innerHTML = `Z: ${pad}${valueString}`;
    renderWindow.render();
  }
  zSliceElement.addEventListener('input', updateZSlice);
  zPlaneRow.appendChild(zSliderEntry);
  updateZSlice();
  zPlaneRow.style.display = 'none';

  uiContainer.appendChild(zPlaneRow);
}

function createColorPresetSelector(
  uiContainer,
  viewerDOMId,
  lookupTableProxy,
  renderWindow
) {
  //const presetNames = vtkColorMaps.rgbPresetNames;
  // More selective
  const presetNames = [
    '2hot',
    'Asymmtrical Earth Tones (6_21b)',
    'Black, Blue and White',
    'Black, Orange and White',
    'Black-Body Radiation',
    'Blue to Red Rainbow',
    'Blue to Yellow',
    'Blues',
    'BrBG',
    'BrOrYl',
    'BuGn',
    'BuGnYl',
    'BuPu',
    'BuRd',
    'CIELab Blue to Red',
    'Cold and Hot',
    'Cool to Warm',
    'Cool to Warm (Extended)',
    'GBBr',
    'GYPi',
    'GnBu',
    'GnBuPu',
    'GnRP',
    'GnYlRd',
    'Grayscale',
    'Green-Blue Asymmetric Divergent (62Blbc)',
    'Greens',
    'GyRd',
    'Haze',
    'Haze_cyan',
    'Haze_green',
    'Haze_lime',
    'Inferno (matplotlib)',
    'Linear Blue (8_31f)',
    'Linear YGB 1211g',
    'Magma (matplotlib)',
    'Muted Blue-Green',
    'OrPu',
    'Oranges',
    'PRGn',
    'PiYG',
    'Plasma (matplotlib)',
    'PuBu',
    'PuOr',
    'PuRd',
    'Purples',
    'Rainbow Blended Black',
    'Rainbow Blended Grey',
    'Rainbow Blended White',
    'Rainbow Desaturated',
    'RdOr',
    'RdOrYl',
    'RdPu',
    'Red to Blue Rainbow',
    'Reds',
    'Spectral_lowBlue',
    'Viridis (matplotlib)',
    'Warm to Cool',
    'Warm to Cool (Extended)',
    'X Ray',
    'Yellow 15',
    'blot',
    'blue2cyan',
    'blue2yellow',
    'bone_Matlab',
    'coolwarm',
    'copper_Matlab',
    'gist_earth',
    'gray_Matlab',
    'heated_object',
    'hsv',
    'hue_L60',
    'jet',
    'magenta',
    'nic_CubicL',
    'nic_CubicYF',
    'nic_Edge',
    'pink_Matlab',
    'rainbow',
  ];

  const presetSelector = document.createElement('select');
  presetSelector.setAttribute('class', style.selector);
  presetSelector.id = `${viewerDOMId}-colorMapSelector`;
  presetSelector.innerHTML = presetNames
    .map((name) => `<option value="${name}">${name}</option>`)
    .join('');

  function updateColorMap(event) {
    lookupTableProxy.setPresetName(presetSelector.value);
    renderWindow.render();
  }
  presetSelector.addEventListener('change', updateColorMap);
  uiContainer.appendChild(presetSelector);
  presetSelector.value = lookupTableProxy.getPresetName();

  return updateColorMap;
}

function createSampleDistanceSlider(
  uiContainer,
  viewerDOMId,
  isBackgroundDark,
  volumeRepresentation,
  renderWindow
) {
  const contrastSensitiveStyle = getContrastSensitiveStyle(
    ['invertibleButton'],
    isBackgroundDark
  );

  const sliderEntry = document.createElement('div');
  sliderEntry.setAttribute('class', style.sliderEntry);
  sliderEntry.innerHTML = `
    <div itk-vtk-tooltip itk-vtk-tooltip-top itk-vtk-tooltip-content="Volume sampling distance" class="${
      contrastSensitiveStyle.invertibleButton
    } ${style.sampleDistanceButton}">
      ${sampleDistanceIcon}
    </div>
    <input type="range" min="0" max="1" value="0.3" step="0.01"
      class="${style.slider} ${viewerDOMId}-spacing" />`;
  const spacingElement = sliderEntry.querySelector(`.${viewerDOMId}-spacing`);
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
  viewerDOMId,
  isBackgroundDark,
  volumeRepresentation,
  renderWindow
) {
  const contrastSensitiveStyle = getContrastSensitiveStyle(
    ['invertibleButton'],
    isBackgroundDark
  );

  const sliderEntry = document.createElement('div');
  sliderEntry.setAttribute('class', style.sliderEntry);
  sliderEntry.innerHTML = `
    <div itk-vtk-tooltip itk-vtk-tooltip-top itk-vtk-tooltip-content="Gradient opacity" class="${
      contrastSensitiveStyle.invertibleButton
    } ${style.gradientOpacitySlider}">
      ${gradientOpacityIcon}
    </div>
    <input type="range" min="0" max="1" value="0.2" step="0.01"
      id="${viewerDOMId}-gradientOpacitySlider"
      class="${style.slider}" />`;
  const edgeElement = sliderEntry.querySelector(
    `#${viewerDOMId}-gradientOpacitySlider`
  );
  function updateGradientOpacity() {
    const value = Number(edgeElement.value);
    volumeRepresentation.setEdgeGradient(value);
    renderWindow.render();
  }
  edgeElement.addEventListener('input', updateGradientOpacity);
  updateGradientOpacity();
  uiContainer.appendChild(sliderEntry);

  return updateGradientOpacity;
}

function createImageUI(
  uiContainer,
  viewerDOMId,
  lookupTableProxy,
  piecewiseFunctionProxy,
  volumeRepresentation,
  dataArray,
  view,
  isBackgroundDark,
  use2D
) {
  const renderWindow = view.getRenderWindow();

  const imageUIGroup = document.createElement('div');
  imageUIGroup.setAttribute('class', style.uiGroup);

  let updateColorMap = null;
  if (dataArray.getNumberOfComponents() === 1) {
    const presetRow = document.createElement('div');
    presetRow.setAttribute('class', style.uiRow);
    updateColorMap = createColorPresetSelector(
      presetRow,
      viewerDOMId,
      lookupTableProxy,
      renderWindow
    );
    presetRow.className += ` ${viewerDOMId}-toggle`;
    imageUIGroup.appendChild(presetRow);
  }

  const transferFunctionWidget = createTransferFunctionWidget(
    imageUIGroup,
    viewerDOMId,
    lookupTableProxy,
    piecewiseFunctionProxy,
    dataArray,
    view,
    renderWindow,
    use2D
  );

  let updateGradientOpacity = null;
  if (!use2D) {
    const volumeRenderingRow = document.createElement('div');
    volumeRenderingRow.setAttribute('class', style.uiRow);
    volumeRenderingRow.className += ` ${viewerDOMId}-volumeRendering ${viewerDOMId}-toggle`;
    createViewPlanesToggle(
      imageUIGroup,
      viewerDOMId,
      volumeRenderingRow,
      view,
      isBackgroundDark
    );
    createUseShadowToggle(
      volumeRenderingRow,
      viewerDOMId,
      volumeRepresentation,
      renderWindow,
      isBackgroundDark
    );
    createSampleDistanceSlider(
      volumeRenderingRow,
      viewerDOMId,
      isBackgroundDark,
      volumeRepresentation,
      renderWindow
    );
    updateGradientOpacity = createGradientOpacitySlider(
      volumeRenderingRow,
      viewerDOMId,
      isBackgroundDark,
      volumeRepresentation,
      renderWindow
    );
    imageUIGroup.appendChild(volumeRenderingRow);

    createPlaneIndexSliders(
      imageUIGroup,
      viewerDOMId,
      volumeRepresentation,
      renderWindow,
      isBackgroundDark
    );
  }

  uiContainer.appendChild(imageUIGroup);

  return { transferFunctionWidget, updateGradientOpacity, updateColorMap };
}

export default createImageUI;
