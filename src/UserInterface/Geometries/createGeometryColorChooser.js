import { reaction } from 'mobx';

import style from '../ItkVtkViewer.module.css';
import hex2rgb from '../hex2rgb';

function createGeometryColorChooser(
  viewerStore,
  geometryColorRow
) {
  const geometryColorInput = document.createElement('input');
  geometryColorInput.setAttribute('type', 'color');
  geometryColorInput.id = `${viewerStore.id}-geometryColorInput`;

  const defaultGeometryColor = '#ffffff';

  reaction(() => {
    return viewerStore.geometriesUI.geometries.slice();
  },
    (geometries) => {
      if(!!!geometries || geometries.length === 0) {
        return;
      }

      const selectedGeometryIndex = viewerStore.geometriesUI.selectedGeometryIndex;

      geometries.forEach((geometry, index) => {
        if (viewerStore.geometriesUI.geometryColors.length <= index) {
          viewerStore.geometriesUI.geometryColors.push(defaultGeometryColor);
        }
      })
      geometryColorInput.value = viewerStore.geometriesUI.geometryColors[selectedGeometryIndex];
    }
  )

  reaction(() => {
    return viewerStore.geometriesUI.selectedGeometryIndex;
    },
    (selectedGeometryIndex) => {
      geometryColorInput.value = viewerStore.geometriesUI.geometryColors[selectedGeometryIndex];
      if (viewerStore.geometriesUI.geometryHasScalars[selectedGeometryIndex]) {
        geometryColorInput.style.display = 'none';
      } else {
        geometryColorInput.style.display = 'inline-block';
      }
    });

  reaction(() => {
    return viewerStore.geometriesUI.geometryColors.slice();
  },
    (geometryColors) => {
      const selectedGeometryIndex = viewerStore.geometriesUI.selectedGeometryIndex;
      const value = geometryColors[selectedGeometryIndex];
      const rgb = hex2rgb(value)
      viewerStore.geometriesUI.representationProxies[selectedGeometryIndex].setColor(rgb)
      viewerStore.renderWindow.render()
      geometryColorInput.value = value;
    });

  geometryColorInput.addEventListener('input',
    (event) => {
      event.preventDefault();
      event.stopPropagation();
      const selectedGeometryIndex = viewerStore.geometriesUI.selectedGeometryIndex;
      viewerStore.geometriesUI.geometryColors[selectedGeometryIndex] = event.target.value;
    });

  const defaultGeometryColors = Array(viewerStore.geometriesUI.geometries.length);
  defaultGeometryColors.fill(defaultGeometryColor);
  geometryColorInput.value = defaultGeometryColor;
  viewerStore.geometriesUI.geometryColors = defaultGeometryColors;
  const selectedGeometryIndex = viewerStore.geometriesUI.selectedGeometryIndex;
  if (viewerStore.geometriesUI.geometryHasScalars[selectedGeometryIndex]) {
    geometryColorInput.style.display = 'none';
  } else {
    geometryColorInput.style.display = 'inline-block';
  }

  geometryColorRow.appendChild(geometryColorInput);
}

export default createGeometryColorChooser;
