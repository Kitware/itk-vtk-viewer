import { reaction } from 'mobx';

import style from '../ItkVtkViewer.module.css';

import ColorPresetNames from '../ColorPresetNames';

function createColorPresetSelector(
  store,
  uiContainer,
) {
  const presetSelector = document.createElement('select');
  presetSelector.setAttribute('class', style.selector);
  presetSelector.id = `${store.id}-colorMapSelector`;
  presetSelector.innerHTML = ColorPresetNames
    .map((name) => `<option value="${name}">${name}</option>`)
    .join('');

  function updateColorMap(colorMap) {
    store.imageUI.lookupTableProxy.setPresetName(colorMap);
    store.renderWindow.render();
    presetSelector.value = colorMap;
  }
  reaction(() => { return store.imageUI.colorMap },
    (colorMap) => { updateColorMap(colorMap); }
  )
  presetSelector.addEventListener('change',
    (event) => {
      event.preventDefault();
      event.stopPropagation();
      store.imageUI.colorMap = presetSelector.value;
    }
  );
  uiContainer.appendChild(presetSelector);
  presetSelector.value = store.imageUI.lookupTableProxy.getPresetName();
  store.imageUI.colorMap = store.imageUI.lookupTableProxy.getPresetName();
}

export default createColorPresetSelector;
