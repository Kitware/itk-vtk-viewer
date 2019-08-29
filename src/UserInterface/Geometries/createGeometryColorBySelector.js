import { reaction } from 'mobx';

import style from '../ItkVtkViewer.module.css';

import {
  ColorMode,
  ScalarMode,
} from 'vtk.js/Sources/Rendering/Core/Mapper/Constants';

function createGeometryColorBySelector(
  viewerStore,
  geometryColorByRow
) {
  const geometryColorBySelector = document.createElement('select');
  geometryColorBySelector.setAttribute('class', style.selector);
  geometryColorBySelector.id = `${viewerStore.id}-geometryColorBySelector`;

  reaction(() => {
    return viewerStore.geometriesUI.geometries;
  },
    (geometries) => {
      if(!!!geometries || geometries.length === 0) {
        return;
      }

      const geometryHasScalars = viewerStore.geometriesUI.geometryHasScalars;
      const selectedGeometryIndex = viewerStore.geometriesUI.selectedGeometryIndex;
      const geometryColorByOptions = viewerStore.geometriesUI.geometryColorByOptions;

      if (viewerStore.geometriesUI.geometryHasScalars[selectedGeometryIndex] && geometryColorByOptions[selectedGeometryIndex].length > 1) {
        geometryColorByRow.style.display = 'flex';
      } else {
        geometryColorByRow.style.display = 'none';
      }

      const geometryColorByDefault = viewerStore.geometriesUI.geometryColorByDefault;
      geometries.forEach((geometry, index) => {
        if (viewerStore.geometriesUI.geometryColorBy.length <= index) {
          viewerStore.geometriesUI.geometryColorBy.push(geometryColorByDefault[index]);
        } else {
          const current = viewerStore.geometriesUI.geometryColorBy[index];
          if(!!!viewerStore.geometriesUI.geometryColorByOptions[index].filter((option) => { return option.label === current.label && option.value === current.value; }).length) {
            viewerStore.geometriesUI.geometryColorBy[index] = geometryColorByDefault[index];
          }
        }
      })

      if (geometryHasScalars[selectedGeometryIndex]) {
        geometryColorBySelector.value = viewerStore.geometriesUI.geometryColorBy[selectedGeometryIndex].value;
      }
    }
  )

  reaction(() => {
    return viewerStore.geometriesUI.selectedGeometryIndex;
    },
    (selectedGeometryIndex) => {
      const geometryColorByOptions = viewerStore.geometriesUI.geometryColorByOptions;

      if (!!geometryColorByOptions[selectedGeometryIndex].length) {
        geometryColorBySelector.innerHTML = geometryColorByOptions[selectedGeometryIndex]
          .map(
            ({ label, value }) =>
              `<option value="${value}" >${label}</option>`
          )
          .join('');
        geometryColorBySelector.value = geometryColorBy[selectedGeometryIndex].value;
      }
      const geometryHasScalars = viewerStore.geometriesUI.geometryHasScalars;
      if (geometryHasScalars[selectedGeometryIndex] && geometryColorByOptions[selectedGeometryIndex].length > 1) {
        geometryColorByRow.style.display = 'flex';
      } else {
        geometryColorByRow.style.display = 'none';
      }
    });

  reaction(() => {
    return viewerStore.geometriesUI.geometryColorBy;
  },
    (geometryColorBy) => {
      const selectedGeometryIndex = viewerStore.geometriesUI.selectedGeometryIndex;
      const [location, colorByArrayName] = geometryColorBy[selectedGeometryIndex].value.split(':');
      const proxy = viewerStore.geometriesUI.representationProxies[selectedGeometryIndex];
      const lutProxy = proxy.getLookupTableProxy();
      const colorPreset = proxy.getLookupTableProxy().getPresetName();
      const interpolateScalarsBeforeMapping = location === 'pointData';
      proxy.setInterpolateScalarsBeforeMapping(interpolateScalarsBeforeMapping);
      proxy.setColorBy(colorByArrayName, location);
      // Restore
      proxy.getLookupTableProxy().setPresetName(colorPreset);
      viewerStore.renderWindow.render()

      const geometryHasScalars = viewerStore.geometriesUI.geometryHasScalars;
      if (geometryHasScalars[selectedGeometryIndex]) {
        geometryColorBySelector.value = viewerStore.geometriesUI.geometryColorBy[selectedGeometryIndex].value;
      }
    });
  geometryColorBySelector.addEventListener('change', (event) => {
    event.preventDefault();
    event.stopPropagation();
    const selectedGeometryIndex = viewerStore.geometriesUI.selectedGeometryIndex;
    const geometryColorByOptions = viewerStore.geometriesUI.geometryColorByOptions;
    viewerStore.geometriesUI.geometryColorBy[selectedGeometryIndex] = geometryColorByOptions[selectedGeometryIndex][selectedGeometryIndex];
  });

  // Initialize coloring
  const geometryColorByDefault = viewerStore.geometriesUI.geometryColorByDefault;
  geometryColorByDefault.forEach((colorBy, index) => {
    if (colorBy) {
      const [location, colorByArrayName] = colorBy.value.split(':');
      const proxy = viewerStore.geometriesUI.representationProxies[index];
      const interpolateScalarsBeforeMapping = location === 'pointData';
      proxy.setInterpolateScalarsBeforeMapping(interpolateScalarsBeforeMapping);
      proxy.setColorBy(colorByArrayName, location);
    }
  })
  const selectedGeometryIndex = viewerStore.geometriesUI.selectedGeometryIndex;
  const geometryColorByOptions = viewerStore.geometriesUI.geometryColorByOptions;
  if (geometryColorByDefault[selectedGeometryIndex]) {
    geometryColorBySelector.innerHTML = geometryColorByOptions[selectedGeometryIndex]
      .map(
        ({ label, value }) =>
          `<option value="${value}" >${label}</option>`
      )
      .join('');
    geometryColorBySelector.value = geometryColorByDefault[selectedGeometryIndex].value;
  }

  geometryColorByRow.appendChild(geometryColorBySelector);
}

export default createGeometryColorBySelector;
