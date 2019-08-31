import { reaction } from 'mobx';

import style from '../ItkVtkViewer.module.css';
import hex2rgb from '../hex2rgb';

function createPointSetColorChooser(
  viewerStore,
  pointSetColorRow
) {
  const pointSetColorInput = document.createElement('input');
  pointSetColorInput.setAttribute('type', 'color');
  pointSetColorInput.id = `${viewerStore.id}-pointSetColorInput`;

  const defaultPointSetColor = '#ffffff';

  reaction(() => {
    return viewerStore.pointSetsUI.pointSets.slice();
  },
    (pointSets) => {
      if(!!!pointSets || pointSets.length === 0) {
        return;
      }

      const selectedPointSetIndex = viewerStore.pointSetsUI.selectedPointSetIndex;

      pointSets.forEach((geometry, index) => {
        if (viewerStore.pointSetsUI.geometryColors.length <= index) {
          viewerStore.pointSetsUI.geometryColors.push(defaultPointSetColor);
        }
      })
      geometryColorInput.value = viewerStore.pointSetsUI.geometryColors[selectedPointSetIndex];
    }
  )

  reaction(() => {
    return viewerStore.pointSetsUI.selectedPointSetIndex;
    },
    (selectedPointSetIndex) => {
      geometryColorInput.value = viewerStore.pointSetsUI.geometryColors[selectedPointSetIndex];
      if (viewerStore.pointSetsUI.geometryHasScalars[selectedPointSetIndex]) {
        geometryColorInput.style.display = 'none';
      } else {
        geometryColorInput.style.display = 'inline-block';
      }
    });

  reaction(() => {
    return viewerStore.pointSetsUI.geometryColors.slice();
  },
    (geometryColors) => {
      geometryColors.forEach((value, index) => {
        const rgb = hex2rgb(value)
        viewerStore.pointSetsUI.representationProxies[index].setColor(rgb)
      })
      viewerStore.renderWindow.render()
      const selectedPointSetIndex = viewerStore.pointSetsUI.selectedPointSetIndex;
      geometryColorInput.value = geometryColors[selectedPointSetIndex];
    });

  geometryColorInput.addEventListener('input',
    (event) => {
      event.preventDefault();
      event.stopPropagation();
      const selectedPointSetIndex = viewerStore.pointSetsUI.selectedPointSetIndex;
      viewerStore.pointSetsUI.geometryColors[selectedPointSetIndex] = event.target.value;
    });

  const defaultPointSetColors = Array(viewerStore.pointSetsUI.pointSets.length);
  defaultPointSetColors.fill(defaultPointSetColor);
  geometryColorInput.value = defaultPointSetColor;
  viewerStore.pointSetsUI.geometryColors = defaultPointSetColors;
  const selectedPointSetIndex = viewerStore.pointSetsUI.selectedPointSetIndex;
  if (viewerStore.pointSetsUI.geometryHasScalars[selectedPointSetIndex]) {
    geometryColorInput.style.display = 'none';
  } else {
    geometryColorInput.style.display = 'inline-block';
  }

  geometryColorRow.appendChild(geometryColorInput);
}

export default createPointSetColorChooser;
