import style from '../ItkVtkViewer.module.css';

import ColorPresetNames from '../ColorPresetNames';

function createGeometryColorPresetSelector(
  viewerStore,
  geometryColorPresetRow
) {
  const presetSelector = document.createElement('select');
  presetSelector.setAttribute('class', style.selector);
  presetSelector.id = `${viewerStore.id}-geometryColorMapSelector`;
  presetSelector.innerHTML = ColorPresetNames
    .map((name) => `<option value="${name}">${name}</option>`)
    .join('');

  const defaultGeometryColorPreset = 'Viridis (matplotlib)';

  reaction(() => {
    return viewerStore.geometries;
  },
    (geometries) => {
      if(!!!geometries || geometries.length === 0) {
        return;
      }

      const geometryHasScalars = viewerStore.geometriesUI.geometryHasScalars;
      const selectedGeometryIndex = viewerStore.geometriesUI.selectedGeometryIndex;

      if (viewerStore.geometriesUI.geometryHasScalars[selectedGeometryIndex]) {
        geometryColorPresetRow.style.display = 'flex';
      } else {
        geometryColorPresetRow.style.display = 'none';
      }

      geometries.forEach((geometry, index) => {
        if (viewerStore.geometriesUI.geometryColorPresets.length <= index) {
          viewerStore.geometriesUI.geometryColorPresets.push(defaultGeometryColorPreset);
        }
      })

      if (geometryHasScalars[selectedGeometryIndex]) {
        presetSelector.value = viewerStore.geometriesUI.geometryColorPresets[selectedGeometryIndex];
      }
    }
  )

  reaction(() => {
    return viewerStore.geometriesUI.selectedGeometryIndex;
    },
    (selectedGeometryIndex) => {
      presetSelector.value = viewerStore.geometriesUI.geometryColorPresets[selectedGeometryIndex]
      const geometryHasScalars = viewerStore.geometriesUI.geometryHasScalars;
      if (geometryHasScalars[selectedGeometryIndex]) {
        geometryColorByRow.style.display = 'flex';
      } else {
        geometryColorByRow.style.display = 'none';
      }
    });

  reaction(() => {
    return viewerStore.geometriesUI.geometryColorPresets;
  },
    (geometryColorPresets) => {
      const selectedGeometryIndex = viewerStore.geometriesUI.selectedGeometryIndex;
      const value = geometryColorPresets[selectedGeometryIndex];
      presetSelector.value = value;
      const proxy = viewerStore.geometriesUI.representationProxies[selectedGeometryIndex];
      const lutProxy = proxy.getLookupTableProxy();
      if (lutProxy) {
        lutProxy.setPresetName(value);
      }
      viewerStore.renderWindow.render();
    });

  presetSelector.addEventListener('change', (event) => {
      event.preventDefault();
      event.stopPropagation();
      const selectedGeometryIndex = viewerStore.geometriesUI.selectedGeometryIndex;
      viewerStore.geometriesUI.geometryColorPresets[selectedGeometryIndex] = event.target.value;
    });

  const geometryHasScalars = viewerStore.geometriesUI.geometryHasScalars;
  const selectedGeometryIndex = viewerStore.geometriesUI.selectedGeometryIndex;
  if (geometryHasScalars[selectedGeometryIndex]) {
    geometryColorPresetRow.style.display = 'flex';
  } else {
    geometryColorPresetRow.style.display = 'none';
  }
  const defaultGeometryColorPresets = new Array(viewerStore.geometries.length);
  defaultGeometryColorPresets.fill(defaultGeometryColorPreset);
  presetSelector.value = defaultGeometryColorPreset;
  viewerStore.geometriesUI.geometryColorPresets.concat(defaultGeometryColorPresets);

  geometryColorPresetRow.appendChild(presetSelector);
}

export default createGeometryColorPresetSelector;
