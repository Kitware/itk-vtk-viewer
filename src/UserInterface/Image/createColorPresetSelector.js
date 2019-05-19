import style from '../ItkVtkViewer.module.css';

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

export default createColorPresetSelector;
