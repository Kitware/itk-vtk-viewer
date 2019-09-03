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

      const hasScalars = store.geometriesUI.hasScalars;
      const selectedGeometryIndex = store.geometriesUI.selectedGeometryIndex;

      if (store.geometriesUI.hasScalars[selectedGeometryIndex]) {
        geometryColorPresetRow.style.display = 'flex';
      } else {
        geometryColorPresetRow.style.display = 'none';
      }

      geometries.forEach((geometry, index) => {
        if (store.geometriesUI.colorPresets.length <= index) {
          store.geometriesUI.colorPresets.push(defaultGeometryColorPreset);
        }
      })

      if (hasScalars[selectedGeometryIndex]) {
        presetSelector.value = store.geometriesUI.colorPresets[selectedGeometryIndex];
      }
    }
  )

  reaction(() => {
    return store.geometriesUI.selectedGeometryIndex;
    },
    (selectedGeometryIndex) => {
      presetSelector.value = store.geometriesUI.colorPresets[selectedGeometryIndex]
      const hasScalars = store.geometriesUI.hasScalars;
      if (hasScalars[selectedGeometryIndex]) {
        geometryColorPresetRow.style.display = 'flex';
      } else {
        geometryColorPresetRow.style.display = 'none';
      }
    });

  reaction(() => {
    return store.geometriesUI.colorPresets.slice();
  },
    (colorPresets) => {
      const selectedGeometryIndex = store.geometriesUI.selectedGeometryIndex;
      const value = colorPresets[selectedGeometryIndex];
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
      store.geometriesUI.colorPresets[selectedGeometryIndex] = event.target.value;
    });

  const hasScalars = store.geometriesUI.hasScalars;
  const selectedGeometryIndex = store.geometriesUI.selectedGeometryIndex;
  if (hasScalars[selectedGeometryIndex]) {
    geometryColorPresetRow.style.display = 'flex';
  } else {
    geometryColorPresetRow.style.display = 'none';
  }
  const defaultGeometryColorPresets = new Array(store.geometriesUI.geometries.length);
  defaultGeometryColorPresets.fill(defaultGeometryColorPreset);
  presetSelector.value = defaultGeometryColorPreset;
  store.geometriesUI.colorPresets = defaultGeometryColorPresets;
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
