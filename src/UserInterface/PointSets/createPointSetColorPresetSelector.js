import style from '../ItkVtkViewer.module.css';

import ColorPresetNames from '../ColorPresetNames';

function createPointSetColorPresetSelector(
  store,
  pointSetColorPresetRow
) {
  const presetSelector = document.createElement('select');
  presetSelector.setAttribute('class', style.selector);
  presetSelector.id = `${store.id}-pointSetColorMapSelector`;
  presetSelector.innerHTML = ColorPresetNames
    .map((name) => `<option value="${name}">${name}</option>`)
    .join('');

  const defaultPointSetColorPreset = 'Viridis (matplotlib)';

  reaction(() => {
    return store.pointSetsUI.pointSets.slice();
  },
    (pointSets) => {
      if(!!!pointSets || pointSets.length === 0) {
        return;
      }

      const pointSetHasScalars = store.pointSetsUI.pointSetHasScalars;
      const selectedPointSetIndex = store.pointSetsUI.selectedPointSetIndex;

      if (store.pointSetsUI.pointSetHasScalars[selectedPointSetIndex]) {
        pointSetColorPresetRow.style.display = 'flex';
      } else {
        pointSetColorPresetRow.style.display = 'none';
      }

      pointSets.forEach((pointSet, index) => {
        if (store.pointSetsUI.pointSetColorPresets.length <= index) {
          store.pointSetsUI.pointSetColorPresets.push(defaultPointSetColorPreset);
        }
      })

      if (pointSetHasScalars[selectedPointSetIndex]) {
        presetSelector.value = store.pointSetsUI.pointSetColorPresets[selectedPointSetIndex];
      }
    }
  )

  reaction(() => {
    return store.pointSetsUI.selectedPointSetIndex;
    },
    (selectedPointSetIndex) => {
      presetSelector.value = store.pointSetsUI.pointSetColorPresets[selectedPointSetIndex]
      const pointSetHasScalars = store.pointSetsUI.pointSetHasScalars;
      if (pointSetHasScalars[selectedPointSetIndex]) {
        pointSetColorPresetRow.style.display = 'flex';
      } else {
        pointSetColorPresetRow.style.display = 'none';
      }
    });

  reaction(() => {
    return store.pointSetsUI.pointSetColorPresets.slice();
  },
    (pointSetColorPresets) => {
      const selectedPointSetIndex = store.pointSetsUI.selectedPointSetIndex;
      const value = pointSetColorPresets[selectedPointSetIndex];
      presetSelector.value = value;
      const proxy = store.pointSetsUI.representationProxies[selectedPointSetIndex];
      const [colorByArrayName, location] = proxy.getColorBy();
      const lutProxy = proxy.getLookupTableProxy(colorByArrayName, location);
      if (lutProxy) {
        lutProxy.setPresetName(value);
      }
      store.renderWindow.render();
    });

  presetSelector.addEventListener('change', (event) => {
      event.preventDefault();
      event.stopPropagation();
      const selectedPointSetIndex = store.pointSetsUI.selectedPointSetIndex;
      store.pointSetsUI.pointSetColorPresets[selectedPointSetIndex] = event.target.value;
    });

  const pointSetHasScalars = store.pointSetsUI.pointSetHasScalars;
  const selectedPointSetIndex = store.pointSetsUI.selectedPointSetIndex;
  if (pointSetHasScalars[selectedPointSetIndex]) {
    pointSetColorPresetRow.style.display = 'flex';
  } else {
    pointSetColorPresetRow.style.display = 'none';
  }
  const defaultPointSetColorPresets = new Array(store.pointSetsUI.pointSets.length);
  defaultPointSetColorPresets.fill(defaultPointSetColorPreset);
  presetSelector.value = defaultPointSetColorPreset;
  store.pointSetsUI.pointSetColorPresets = defaultPointSetColorPresets;
  const representationProxies = store.pointSetsUI.representationProxies;
  representationProxies.forEach((proxy) => {
    const [colorByArrayName, location] = proxy.getColorBy();
    const lutProxy = proxy.getLookupTableProxy(colorByArrayName, location);
    if (lutProxy) {
      lutProxy.setPresetName(defaultPointSetColorPreset);
    }
  })

  pointSetColorPresetRow.appendChild(presetSelector);
}

export default createPointSetColorPresetSelector;
