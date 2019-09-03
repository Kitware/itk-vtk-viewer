import { reaction } from 'mobx';

import style from '../ItkVtkViewer.module.css';
import hex2rgb from '../hex2rgb';

function createPointSetColorChooser(
  store,
  pointSetColorRow
) {
  const pointSetColorInput = document.createElement('input');
  pointSetColorInput.setAttribute('type', 'color');
  pointSetColorInput.id = `${store.id}-pointSetColorInput`;

  const defaultPointSetColor = '#ffffff';

  reaction(() => {
    return store.pointSetsUI.pointSets.slice();
  },
    (pointSets) => {
      if(!!!pointSets || pointSets.length === 0) {
        return;
      }

      const selectedPointSetIndex = store.pointSetsUI.selectedPointSetIndex;

      pointSets.forEach((geometry, index) => {
        if (store.pointSetsUI.geometryColors.length <= index) {
          store.pointSetsUI.geometryColors.push(defaultPointSetColor);
        }
      })
      geometryColorInput.value = store.pointSetsUI.geometryColors[selectedPointSetIndex];
    }
  )

  reaction(() => {
    return store.pointSetsUI.selectedPointSetIndex;
    },
    (selectedPointSetIndex) => {
      geometryColorInput.value = store.pointSetsUI.geometryColors[selectedPointSetIndex];
      if (store.pointSetsUI.geometryHasScalars[selectedPointSetIndex]) {
        geometryColorInput.style.display = 'none';
      } else {
        geometryColorInput.style.display = 'inline-block';
      }
    });

  reaction(() => {
    return store.pointSetsUI.geometryColors.slice();
  },
    (geometryColors) => {
      geometryColors.forEach((value, index) => {
        const rgb = hex2rgb(value)
        store.pointSetsUI.representationProxies[index].setColor(rgb)
      })
      store.renderWindow.render()
      const selectedPointSetIndex = store.pointSetsUI.selectedPointSetIndex;
      geometryColorInput.value = geometryColors[selectedPointSetIndex];
    });

  geometryColorInput.addEventListener('input',
    (event) => {
      event.preventDefault();
      event.stopPropagation();
      const selectedPointSetIndex = store.pointSetsUI.selectedPointSetIndex;
      store.pointSetsUI.geometryColors[selectedPointSetIndex] = event.target.value;
    });

  const defaultPointSetColors = Array(store.pointSetsUI.pointSets.length);
  defaultPointSetColors.fill(defaultPointSetColor);
  geometryColorInput.value = defaultPointSetColor;
  store.pointSetsUI.geometryColors = defaultPointSetColors;
  const selectedPointSetIndex = store.pointSetsUI.selectedPointSetIndex;
  if (store.pointSetsUI.geometryHasScalars[selectedPointSetIndex]) {
    geometryColorInput.style.display = 'none';
  } else {
    geometryColorInput.style.display = 'inline-block';
  }

  geometryColorRow.appendChild(geometryColorInput);
}

export default createPointSetColorChooser;
