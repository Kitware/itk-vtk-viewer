import { reaction } from 'mobx';

import style from '../ItkVtkViewer.module.css';

import {
  ColorMode,
  ScalarMode,
} from 'vtk.js/Sources/Rendering/Core/Mapper/Constants';

function createGeometryColorBySelector(
  store,
  geometryColorByRow
) {
  const geometryColorBySelector = document.createElement('select');
  geometryColorBySelector.setAttribute('class', style.selector);
  geometryColorBySelector.id = `${store.id}-geometryColorBySelector`;

  reaction(() => {
    return store.geometriesUI.geometries.slice();
  },
    (geometries) => {
      if(!!!geometries || geometries.length === 0) {
        return;
      }

      const geometryHasScalars = store.geometriesUI.geometryHasScalars;
      const selectedGeometryIndex = store.geometriesUI.selectedGeometryIndex;
      const geometryColorByOptions = store.geometriesUI.geometryColorByOptions;

      if (store.geometriesUI.geometryHasScalars[selectedGeometryIndex] && geometryColorByOptions[selectedGeometryIndex].length > 1) {
        geometryColorByRow.style.display = 'flex';
      } else {
        geometryColorByRow.style.display = 'none';
      }

      const geometryColorByDefault = store.geometriesUI.geometryColorByDefault;
      geometries.forEach((geometry, index) => {
        if (store.geometriesUI.geometryColorBy.length <= index) {
          store.geometriesUI.geometryColorBy.push(geometryColorByDefault[index]);
        } else {
          const current = store.geometriesUI.geometryColorBy[index];
          if(!!!store.geometriesUI.geometryColorByOptions[index].filter((option) => { return option.label === current.label && option.value === current.value; }).length) {
            store.geometriesUI.geometryColorBy[index] = geometryColorByDefault[index];
          }
        }
      })

      if (geometryHasScalars[selectedGeometryIndex]) {
        geometryColorBySelector.value = store.geometriesUI.geometryColorBy[selectedGeometryIndex].value;
      }
    }
  )

  reaction(() => {
    return store.geometriesUI.selectedGeometryIndex;
    },
    (selectedGeometryIndex) => {
      const geometryColorByOptions = store.geometriesUI.geometryColorByOptions;

      if (!!geometryColorByOptions[selectedGeometryIndex] && !!geometryColorByOptions[selectedGeometryIndex].length) {
        geometryColorBySelector.innerHTML = geometryColorByOptions[selectedGeometryIndex]
          .map(
            ({ label, value }) =>
              `<option value="${value}" >${label}</option>`
          )
          .join('');
        geometryColorBySelector.value = store.geometriesUI.geometryColorBy[selectedGeometryIndex].value;
      }
      const geometryHasScalars = store.geometriesUI.geometryHasScalars;
      if (geometryHasScalars[selectedGeometryIndex] && geometryColorByOptions[selectedGeometryIndex].length > 1) {
        geometryColorByRow.style.display = 'flex';
      } else {
        geometryColorByRow.style.display = 'none';
      }
    });

  reaction(() => {
    return store.geometriesUI.geometryColorBy.slice();
  },
    (geometryColorBy) => {
      const selectedGeometryIndex = store.geometriesUI.selectedGeometryIndex;
      const [location, colorByArrayName] = geometryColorBy[selectedGeometryIndex].value.split(':');
      const proxy = store.geometriesUI.representationProxies[selectedGeometryIndex];
      const interpolateScalarsBeforeMapping = location === 'pointData';
      proxy.setInterpolateScalarsBeforeMapping(interpolateScalarsBeforeMapping);
      proxy.setColorBy(colorByArrayName, location);
      store.renderWindow.render()

      const geometryHasScalars = store.geometriesUI.geometryHasScalars;
      if (geometryHasScalars[selectedGeometryIndex]) {
        geometryColorBySelector.value = store.geometriesUI.geometryColorBy[selectedGeometryIndex].value;
      }
    });

  geometryColorBySelector.addEventListener('change', (event) => {
    event.preventDefault();
    event.stopPropagation();
    const selectedGeometryIndex = store.geometriesUI.selectedGeometryIndex;
    const geometryColorByOptions = store.geometriesUI.geometryColorByOptions;
    const selectedOption = store.geometriesUI.geometryColorByOptions[selectedGeometryIndex].filter((option) => { return option.value === event.target.value; })[0]
    store.geometriesUI.geometryColorBy[selectedGeometryIndex] = selectedOption;
  });

  // Initialize coloring
  const geometryColorByDefault = store.geometriesUI.geometryColorByDefault;
  geometryColorByDefault.forEach((colorBy, index) => {
    if (colorBy) {
      const [location, colorByArrayName] = colorBy.value.split(':');
      const proxy = store.geometriesUI.representationProxies[index];
      const interpolateScalarsBeforeMapping = location === 'pointData';
      proxy.setInterpolateScalarsBeforeMapping(interpolateScalarsBeforeMapping);
      proxy.setColorBy(colorByArrayName, location);
    }
  })
  const selectedGeometryIndex = store.geometriesUI.selectedGeometryIndex;
  const geometryColorByOptions = store.geometriesUI.geometryColorByOptions;
  if (geometryColorByDefault[selectedGeometryIndex]) {
    geometryColorBySelector.innerHTML = geometryColorByOptions[selectedGeometryIndex]
      .map(
        ({ label, value }) =>
          `<option value="${value}" >${label}</option>`
      )
      .join('');
    geometryColorBySelector.value = geometryColorByDefault[selectedGeometryIndex].value;
  }
  if (store.geometriesUI.geometryHasScalars[selectedGeometryIndex] && geometryColorByOptions[selectedGeometryIndex].length > 1) {
    geometryColorByRow.style.display = 'flex';
  } else {
    geometryColorByRow.style.display = 'none';
  }
  store.geometriesUI.geometryColorBy = geometryColorByDefault;

  geometryColorByRow.appendChild(geometryColorBySelector);
}

export default createGeometryColorBySelector;
