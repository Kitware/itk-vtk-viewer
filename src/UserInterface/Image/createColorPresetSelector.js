import style from '../ItkVtkViewer.module.css';

import ColorPresetNames from '../ColorPresetNames';

function createColorPresetSelector(
  viewerStore,
  uiContainer,
  viewerDOMId,
  renderWindow
) {
  const presetSelector = document.createElement('select');
  presetSelector.setAttribute('class', style.selector);
  presetSelector.id = `${viewerDOMId}-colorMapSelector`;
  presetSelector.innerHTML = ColorPresetNames
    .map((name) => `<option value="${name}">${name}</option>`)
    .join('');

  function updateColorMap(event) {
    viewerStore.imageUI.lookupTableProxy.setPresetName(presetSelector.value);
    renderWindow.render();
  }
  viewerStore.imageUI.updateColorMap = updateColorMap;
  presetSelector.addEventListener('change', updateColorMap);
  uiContainer.appendChild(presetSelector);
  presetSelector.value = viewerStore.imageUI.lookupTableProxy.getPresetName();
}

export default createColorPresetSelector;
