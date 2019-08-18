import style from '../ItkVtkViewer.module.css';

import ColorPresetNames from '../ColorPresetNames';

function createPointSetColorPresetSelector(
  viewerStore,
  pointSetHasScalars,
  pointSetSelector,
  pointSetColorPresetRow
) {
  const pointSetColorPresets = new Array(pointSetHasScalars.length);
  const defaultPointSetColorPreset = 'Viridis (matplotlib)';
  pointSetColorPresets.fill(defaultPointSetColorPreset);

  const presetSelector = document.createElement('select');
  presetSelector.setAttribute('class', style.selector);
  presetSelector.id = `${viewerStore.id}-pointSetColorMapSelector`;
  presetSelector.innerHTML = ColorPresetNames
    .map((name) => `<option value="${name}">${name}</option>`)
    .join('');

  pointSetSelector.addEventListener('change',
    (event) => {
      presetSelector.value = pointSetColorPresets[pointSetSelector.selectedIndex]
      if (pointSetHasScalars[pointSetSelector.selectedIndex]) {
        pointSetColorPresetRow.style.display = 'flex';
      } else {
        pointSetColorPresetRow.style.display = 'none';
      }
    });

  function updateColorMap(event) {
    const value = event.target.value;
    viewerStore.pointSetsUI.representationProxies.forEach((proxy) => {
      const lutProxy = proxy.getLookupTableProxy();
      if (lutProxy) {
        lutProxy.setPresetName(value);
      }
    })
    viewerStore.renderWindow.render();
    pointSetColorPresets[pointSetSelector.selectedIndex] = value;
  }
  presetSelector.addEventListener('change', updateColorMap);

  viewerStore.pointSetsUI.representationProxies.forEach((proxy) => {
    const lutProxy = proxy.getLookupTableProxy();
    if(lutProxy) {
      lutProxy.setPresetName(defaultPointSetColorPreset);
    }
  })
  if (pointSetHasScalars[pointSetSelector.selectedIndex]) {
    pointSetColorPresetRow.style.display = 'flex';
  } else {
    pointSetColorPresetRow.style.display = 'none';
  }
  presetSelector.value = defaultPointSetColorPreset;

  pointSetColorPresetRow.appendChild(presetSelector);
}

export default createPointSetColorPresetSelector;
