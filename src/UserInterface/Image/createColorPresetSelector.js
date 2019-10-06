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

  function updateColorMap(colorMaps) {
    const componentIndex = store.imageUI.selectedComponentIndex;
    const colorMap = colorMaps[componentIndex];
    store.imageUI.lookupTableProxies[componentIndex].setPresetName(colorMap);
    const lut = store.imageUI.lookupTableProxies[component].getLookupTable();
    const range = store.imageUI.colorRange;
    lut.setMappingRange(range[0], range[1]);
    store.renderWindow.render();
    presetSelector.value = colorMap;
  }
  reaction(() => { return store.imageUI.colorMaps.slice() },
    (colorMaps) => {
      updateColorMap(colorMaps);
    }
  )
  presetSelector.addEventListener('change',
    (event) => {
      event.preventDefault();
      event.stopPropagation();
      const componentIndex = store.imageUI.selectedComponentIndex;
      store.imageUI.colorMaps[componentIndex] = presetSelector.value;
    }
  );
  uiContainer.appendChild(presetSelector);
  const component = store.imageUI.selectedComponentIndex;
  presetSelector.value = store.imageUI.colorMaps[component];
}

export default createColorPresetSelector;
