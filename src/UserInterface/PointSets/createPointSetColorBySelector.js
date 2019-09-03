import style from '../ItkVtkViewer.module.css';

import {
  ColorMode,
  ScalarMode,
} from 'vtk.js/Sources/Rendering/Core/Mapper/Constants';

function createPointSetColorBySelector(
  store,
  pointSetColorByRow
) {
  const pointSetColorBySelector = document.createElement('select');
  pointSetColorBySelector.setAttribute('class', style.selector);
  pointSetColorBySelector.id = `${store.id}-pointSetColorBySelector`;

  reaction(() => {
    return store.pointSetsUI.pointSets.slice();
  },
    (pointSets) => {
      if(!!!pointSets || pointSets.length === 0) {
        return;
      }

      const pointSetHasScalars = store.pointSetsUI.pointSetHasScalars;
      const selectedpointSetIndex = store.pointSetsUI.selectedpointSetIndex;
      const pointSetColorByOptions = store.pointSetsUI.pointSetColorByOptions;

      if (store.pointSetsUI.pointSetHasScalars[selectedpointSetIndex] && pointSetColorByOptions[selectedpointSetIndex].length > 1) {
        pointSetColorByRow.style.display = 'flex';
      } else {
        pointSetColorByRow.style.display = 'none';
      }

      const pointSetColorByDefault = store.pointSetsUI.pointSetColorByDefault;
      pointSets.forEach((pointSet, index) => {
        if (store.pointSetsUI.pointSetColorBy.length <= index) {
          store.pointSetsUI.pointSetColorBy.push(pointSetColorByDefault[index]);
        } else {
          const current = store.pointSetsUI.pointSetColorBy[index];
          if(!!!store.pointSetsUI.pointSetColorByOptions[index].filter((option) => { return option.label === current.label && option.value === current.value; }).length) {
            store.pointSetsUI.pointSetColorBy[index] = pointSetColorByDefault[index];
          }
        }
      })

      if (pointSetHasScalars[selectedpointSetIndex]) {
        pointSetColorBySelector.value = store.pointSetsUI.pointSetColorBy[selectedpointSetIndex].value;
      }
    }
  )

  reaction(() => {
    return store.pointSetsUI.selectedpointSetIndex;
    },
    (selectedpointSetIndex) => {
      const pointSetColorByOptions = store.pointSetsUI.pointSetColorByOptions;

      if (!!pointSetColorByOptions[selectedpointSetIndex] && !!pointSetColorByOptions[selectedpointSetIndex].length) {
        pointSetColorBySelector.innerHTML = pointSetColorByOptions[selectedpointSetIndex]
          .map(
            ({ label, value }) =>
              `<option value="${value}" >${label}</option>`
          )
          .join('');
        pointSetColorBySelector.value = store.pointSetsUI.pointSetColorBy[selectedpointSetIndex].value;
      }
      const pointSetHasScalars = store.pointSetsUI.pointSetHasScalars;
      if (pointSetHasScalars[selectedpointSetIndex] && pointSetColorByOptions[selectedpointSetIndex].length > 1) {
        pointSetColorByRow.style.display = 'flex';
      } else {
        pointSetColorByRow.style.display = 'none';
      }
    });

  reaction(() => {
    return store.pointSetsUI.pointSetColorBy.slice();
  },
    (pointSetColorBy) => {
      const selectedPointSetIndex = store.pointSetsUI.selectedPointSetIndex;
      const [location, colorByArrayName] = pointSetColorBy[selectedPointSetIndex].value.split(':');
      const proxy = store.pointSetsUI.representationProxies[selectedPointSetIndex];
      const interpolateScalarsBeforeMapping = location === 'pointData';
      proxy.setInterpolateScalarsBeforeMapping(interpolateScalarsBeforeMapping);
      proxy.setColorBy(colorByArrayName, location);
      store.renderWindow.render()

      const pointSetHasScalars = store.pointSetsUI.pointSetHasScalars;
      if (pointSetHasScalars[selectedPointSetIndex]) {
        pointSetColorBySelector.value = store.pointSetsUI.pointSetColorBy[selectedPointSetIndex].value;
      }
    });

  pointSetColorBySelector.addEventListener('change', (event) => {
    event.preventDefault();
    event.stopPropagation();
    const selectedPointSetIndex = store.pointSetsUI.selectedPointSetIndex;
    const pointSetColorByOptions = store.pointSetsUI.pointSetColorByOptions;
    const selectedOption = store.pointSetsUI.pointSetColorByOptions[selectedPointSetIndex].filter((option) => { return option.value === event.target.value; })[0]
    store.pointSetsUI.pointSetColorBy[selectedPointSetIndex] = selectedOption;
  });

  // Initialize coloring
  const pointSetColorByDefault = store.geometriesUI.pointSetColorByDefault;
  pointSetColorByDefault.forEach((colorBy, index) => {
    if (colorBy) {
      const [location, colorByArrayName] = colorBy.value.split(':');
      const proxy = store.geometriesUI.representationProxies[index];
      const interpolateScalarsBeforeMapping = location === 'pointData';
      proxy.setInterpolateScalarsBeforeMapping(interpolateScalarsBeforeMapping);
      proxy.setColorBy(colorByArrayName, location);
    }
  })
  const selectedPointSetIndex = store.geometriesUI.selectedPointSetIndex;
  const pointSetColorByOptions = store.geometriesUI.pointSetColorByOptions;
  if (pointSetColorByDefault[selectedPointSetIndex]) {
    pointSetColorBySelector.innerHTML = pointSetColorByOptions[selectedPointSetIndex]
      .map(
        ({ label, value }) =>
          `<option value="${value}" >${label}</option>`
      )
      .join('');
    pointSetColorBySelector.value = pointSetColorByDefault[selectedPointSetIndex].value;
  }
  const pointSetHasScalars = store.pointSetsUI.pointSetHasScalars;
  if (pointSetHasScalars[selectedpointSetIndex] && pointSetColorByOptions[selectedpointSetIndex].length > 1) {
    pointSetColorByRow.style.display = 'flex';
  } else {
    pointSetColorByRow.style.display = 'none';
  }
  store.geometriesUI.pointSetColorBy = pointSetColorByDefault;

  pointSetColorByRow.appendChild(pointSetColorBySelector);
}

export default createPointSetColorBySelector;
