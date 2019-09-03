import { reaction } from 'mobx';

import style from '../ItkVtkViewer.module.css';

import ColorPresetNames from '../ColorPresetNames';

function createGeometryColorPresetSelector(
  store,
  geometryColorPresetRow
) {
  const presetSelector = document.createElement('select');
  presetSelector.setAttribute('class', style.selector);
  presetSelector.id = `${store.id}-geometryColorMapSelector`;
  presetSelector.innerHTML = ColorPresetNames
    .map((name) => `<option value="${name}">${name}</option>`)
    .join('');

  const defaultGeometryColorPreset = 'Viridis (matplotlib)';

  reaction(() => {
    return store.geometriesUI.geometries.slice();
  },
    (geometries) => {
      if(!!!geometries || geometries.length === 0) {
        return;
      }

      const geometryHasScalars = store.geometriesUI.geometryHasScalars;
      const selectedGeometryIndex = store.geometriesUI.selectedGeometryIndex;

      if (store.geometriesUI.geometryHasScalars[selectedGeometryIndex]) {
        geometryColorPresetRow.style.display = 'flex';
      } else {
        geometryColorPresetRow.style.display = 'none';
      }

      geometries.forEach((geometry, index) => {
        if (store.geometriesUI.geometryColorPresets.length <= index) {
          store.geometriesUI.geometryColorPresets.push(defaultGeometryColorPreset);
        }
      })

      if (geometryHasScalars[selectedGeometryIndex]) {
        presetSelector.value = store.geometriesUI.geometryColorPresets[selectedGeometryIndex];
      }
    }
  )

  reaction(() => {
    return store.geometriesUI.selectedGeometryIndex;
    },
    (selectedGeometryIndex) => {
      presetSelector.value = store.geometriesUI.geometryColorPresets[selectedGeometryIndex]
      const geometryHasScalars = store.geometriesUI.geometryHasScalars;
      if (geometryHasScalars[selectedGeometryIndex]) {
        geometryColorPresetRow.style.display = 'flex';
      } else {
        geometryColorPresetRow.style.display = 'none';
      }
    });

  reaction(() => {
    return store.geometriesUI.geometryColorPresets.slice();
  },
    (geometryColorPresets) => {
      const selectedGeometryIndex = store.geometriesUI.selectedGeometryIndex;
      const value = geometryColorPresets[selectedGeometryIndex];
      presetSelector.value = value;
      const proxy = store.geometriesUI.representationProxies[selectedGeometryIndex];
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
      const selectedGeometryIndex = store.geometriesUI.selectedGeometryIndex;
      store.geometriesUI.geometryColorPresets[selectedGeometryIndex] = event.target.value;
    });

  const geometryHasScalars = store.geometriesUI.geometryHasScalars;
  const selectedGeometryIndex = store.geometriesUI.selectedGeometryIndex;
  if (geometryHasScalars[selectedGeometryIndex]) {
    geometryColorPresetRow.style.display = 'flex';
  } else {
    geometryColorPresetRow.style.display = 'none';
  }
  const defaultGeometryColorPresets = new Array(store.geometriesUI.geometries.length);
  defaultGeometryColorPresets.fill(defaultGeometryColorPreset);
  presetSelector.value = defaultGeometryColorPreset;
  store.geometriesUI.geometryColorPresets = defaultGeometryColorPresets;
  const representationProxies = store.geometriesUI.representationProxies;
  representationProxies.forEach((proxy) => {
    const colorByArrayName = proxy.getColorBy();
    const lutProxy = proxy.getLookupTableProxy(colorByArrayName);
    if (lutProxy) {
      lutProxy.setPresetName(defaultGeometryColorPreset);
    }
  })

  geometryColorPresetRow.appendChild(presetSelector);
}

export default createGeometryColorPresetSelector;
