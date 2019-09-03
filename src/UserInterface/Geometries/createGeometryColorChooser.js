import { reaction } from 'mobx';

import style from '../ItkVtkViewer.module.css';
import hex2rgb from '../hex2rgb';

function createGeometryColorChooser(
  store,
  geometryColorRow
) {
  const geometryColorInput = document.createElement('input');
  geometryColorInput.setAttribute('type', 'color');
  geometryColorInput.id = `${store.id}-geometryColorInput`;

  const defaultGeometryColor = '#ffffff';

  reaction(() => {
    return store.geometriesUI.geometries.slice();
  },
    (geometries) => {
      if(!!!geometries || geometries.length === 0) {
        return;
      }

      const selectedGeometryIndex = store.geometriesUI.selectedGeometryIndex;

      geometries.forEach((geometry, index) => {
        if (store.geometriesUI.geometryColors.length <= index) {
          store.geometriesUI.geometryColors.push(defaultGeometryColor);
        }
      })
      geometryColorInput.value = store.geometriesUI.geometryColors[selectedGeometryIndex];
    }
  )

  reaction(() => {
    return store.geometriesUI.selectedGeometryIndex;
    },
    (selectedGeometryIndex) => {
      geometryColorInput.value = store.geometriesUI.geometryColors[selectedGeometryIndex];
      if (store.geometriesUI.geometryHasScalars[selectedGeometryIndex]) {
        geometryColorInput.style.display = 'none';
      } else {
        geometryColorInput.style.display = 'inline-block';
      }
    });

  reaction(() => {
    return store.geometriesUI.geometryColors.slice();
  },
    (geometryColors) => {
      geometryColors.forEach((value, index) => {
        const rgb = hex2rgb(value)
        store.geometriesUI.representationProxies[index].setColor(rgb)
      })
      store.renderWindow.render()
      const selectedGeometryIndex = store.geometriesUI.selectedGeometryIndex;
      geometryColorInput.value = geometryColors[selectedGeometryIndex];
    });

  geometryColorInput.addEventListener('input',
    (event) => {
      event.preventDefault();
      event.stopPropagation();
      const selectedGeometryIndex = store.geometriesUI.selectedGeometryIndex;
      store.geometriesUI.geometryColors[selectedGeometryIndex] = event.target.value;
    });

  const defaultGeometryColors = Array(store.geometriesUI.geometries.length);
  defaultGeometryColors.fill(defaultGeometryColor);
  geometryColorInput.value = defaultGeometryColor;
  store.geometriesUI.geometryColors = defaultGeometryColors;
  const selectedGeometryIndex = store.geometriesUI.selectedGeometryIndex;
  if (store.geometriesUI.geometryHasScalars[selectedGeometryIndex]) {
    geometryColorInput.style.display = 'none';
  } else {
    geometryColorInput.style.display = 'inline-block';
  }

  geometryColorRow.appendChild(geometryColorInput);
}

export default createGeometryColorChooser;
