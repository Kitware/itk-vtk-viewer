import { reaction } from 'mobx';

import style from '../ItkVtkViewer.module.css';

import ColorPresetNames from '../ColorPresetNames';

function createColorPresetSelector(
  viewerStore,
  uiContainer,
) {
  const presetSelector = document.createElement('select');
  presetSelector.setAttribute('class', style.selector);
  presetSelector.id = `${viewerStore.id}-colorMapSelector`;
  presetSelector.innerHTML = ColorPresetNames
    .map((name) => `<option value="${name}">${name}</option>`)
    .join('');

  function updateColorMap(colorMap) {
    viewerStore.imageUI.lookupTableProxy.setPresetName(colorMap);
    viewerStore.renderWindow.render();
  }
  reaction(() => { return viewerStore.imageUI.colorMap },
    (colorMap) => { updateColorMap(colorMap); }
  )
  presetSelector.addEventListener('change',
    (event) => {
      event.preventDefault();
      event.stopPropagation();
      viewerStore.imageUI.colorMap = presetSelector.value;
    }
  );
  uiContainer.appendChild(presetSelector);
  presetSelector.value = viewerStore.imageUI.lookupTableProxy.getPresetName();
  viewerStore.imageUI.colorMap = viewerStore.imageUI.lookupTableProxy.getPresetName();
}

export default createColorPresetSelector;
