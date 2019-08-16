import style from '../ItkVtkViewer.module.css';

import ColorPresetNames from '../ColorPresetNames';

function createGeometryColorPresetSelector(
  viewerStore,
  geometryHasScalars,
  renderWindow,
  geometrySelector,
  geometryColorPresetRow
) {
  const geometryColorPresets = new Array(geometryHasScalars.length);
  const defaultGeometryColorPreset = 'Viridis (matplotlib)';
  geometryColorPresets.fill(defaultGeometryColorPreset);

  const presetSelector = document.createElement('select');
  presetSelector.setAttribute('class', style.selector);
  presetSelector.id = `${viewerStore.id}-geometryColorMapSelector`;
  presetSelector.innerHTML = ColorPresetNames
    .map((name) => `<option value="${name}">${name}</option>`)
    .join('');

  geometrySelector.addEventListener('change',
    (event) => {
      presetSelector.value = geometryColorPresets[geometrySelector.selectedIndex]
      if (geometryHasScalars[geometrySelector.selectedIndex]) {
        geometryColorPresetRow.style.display = 'flex';
      } else {
        geometryColorPresetRow.style.display = 'none';
      }
    });

  function updateColorMap(event) {
    const value = event.target.value;
    viewerStore.geometriesUI.representationProxies.forEach((proxy) => {
      const lutProxy = proxy.getLookupTableProxy();
      if (lutProxy) {
        lutProxy.setPresetName(value);
      }
    })
    renderWindow.render();
    geometryColorPresets[geometrySelector.selectedIndex] = value;
  }
  presetSelector.addEventListener('change', updateColorMap);

  viewerStore.geometriesUI.representationProxies.forEach((proxy) => {
    const lutProxy = proxy.getLookupTableProxy();
    if(lutProxy) {
      lutProxy.setPresetName(defaultGeometryColorPreset);
    }
  })
  if (geometryHasScalars[geometrySelector.selectedIndex]) {
    geometryColorPresetRow.style.display = 'flex';
  } else {
    geometryColorPresetRow.style.display = 'none';
  }
  presetSelector.value = defaultGeometryColorPreset;

  geometryColorPresetRow.appendChild(presetSelector);
}

export default createGeometryColorPresetSelector;
