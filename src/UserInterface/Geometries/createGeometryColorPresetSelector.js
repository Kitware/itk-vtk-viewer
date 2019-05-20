import style from '../ItkVtkViewer.module.css';

import ColorPresetNames from '../ColorPresetNames';

function createGeometryColorPresetSelector(
  geometryHasScalars,
  viewerDOMId,
  renderWindow,
  geometryRepresentationProxies,
  geometrySelector,
  geometryColorPresetRow
) {
  const geometryColorPresets = new Array(geometryHasScalars.length);
  const defaultGeometryColorPreset = 'Plasma (matplotlib)';
  geometryColorPresets.fill(defaultGeometryColorPreset);

  const presetSelector = document.createElement('select');
  presetSelector.setAttribute('class', style.selector);
  presetSelector.id = `${viewerDOMId}-geometryColorMapSelector`;
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
    geometryRepresentationProxies.forEach((proxy) => {
      const lutProxy = proxy.getLookupTableProxy();
      if (lutProxy) {
        lutProxy.setPresetName(value);
      }
    })
    renderWindow.render();
    geometryColorPresets[geometrySelector.selectedIndex] = value;
  }
  presetSelector.addEventListener('change', updateColorMap);

  geometryRepresentationProxies.forEach((proxy) => {
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
