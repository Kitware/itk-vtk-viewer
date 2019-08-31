import style from '../ItkVtkViewer.module.css';

import {
  ColorMode,
  ScalarMode,
} from 'vtk.js/Sources/Rendering/Core/Mapper/Constants';

function createPointSetColorBySelector(
  viewerStore,
  pointSetColorByRow
) {
  const pointSetColorBySelector = document.createElement('select');
  pointSetColorBySelector.setAttribute('class', style.selector);
  pointSetColorBySelector.id = `${viewerStore.id}-pointSetColorBySelector`;

  reaction(() => {
    return viewerStore.pointSetsUI.pointSets.slice();
  },
    (pointSets) => {
      if(!!!pointSets || pointSets.length === 0) {
        return;
      }

      const pointSetHasScalars = viewerStore.pointSetsUI.pointSetHasScalars;
      const selectedpointSetIndex = viewerStore.pointSetsUI.selectedpointSetIndex;
      const pointSetColorByOptions = viewerStore.pointSetsUI.pointSetColorByOptions;

      if (viewerStore.pointSetsUI.pointSetHasScalars[selectedpointSetIndex] && pointSetColorByOptions[selectedpointSetIndex].length > 1) {
        pointSetColorByRow.style.display = 'flex';
      } else {
        pointSetColorByRow.style.display = 'none';
      }

      const pointSetColorByDefault = viewerStore.pointSetsUI.pointSetColorByDefault;
      pointSets.forEach((pointSet, index) => {
        if (viewerStore.pointSetsUI.pointSetColorBy.length <= index) {
          viewerStore.pointSetsUI.pointSetColorBy.push(pointSetColorByDefault[index]);
        } else {
          const current = viewerStore.pointSetsUI.pointSetColorBy[index];
          if(!!!viewerStore.pointSetsUI.pointSetColorByOptions[index].filter((option) => { return option.label === current.label && option.value === current.value; }).length) {
            viewerStore.pointSetsUI.pointSetColorBy[index] = pointSetColorByDefault[index];
          }
        }
      })

      if (pointSetHasScalars[selectedpointSetIndex]) {
        pointSetColorBySelector.value = viewerStore.pointSetsUI.pointSetColorBy[selectedpointSetIndex].value;
      }
    }
  )

  reaction(() => {
    return viewerStore.pointSetsUI.selectedpointSetIndex;
    },
    (selectedpointSetIndex) => {
      const pointSetColorByOptions = viewerStore.pointSetsUI.pointSetColorByOptions;

      if (!!pointSetColorByOptions[selectedpointSetIndex] && !!pointSetColorByOptions[selectedpointSetIndex].length) {
        pointSetColorBySelector.innerHTML = pointSetColorByOptions[selectedpointSetIndex]
          .map(
            ({ label, value }) =>
              `<option value="${value}" >${label}</option>`
          )
          .join('');
        pointSetColorBySelector.value = viewerStore.pointSetsUI.pointSetColorBy[selectedpointSetIndex].value;
      }
      const pointSetHasScalars = viewerStore.pointSetsUI.pointSetHasScalars;
      if (pointSetHasScalars[selectedpointSetIndex] && pointSetColorByOptions[selectedpointSetIndex].length > 1) {
        pointSetColorByRow.style.display = 'flex';
      } else {
        pointSetColorByRow.style.display = 'none';
      }
    });

  reaction(() => {
    return viewerStore.pointSetsUI.pointSetColorBy.slice();
  },
    (pointSetColorBy) => {
      const selectedPointSetIndex = viewerStore.pointSetsUI.selectedPointSetIndex;
      const [location, colorByArrayName] = pointSetColorBy[selectedPointSetIndex].value.split(':');
      const proxy = viewerStore.pointSetsUI.representationProxies[selectedPointSetIndex];
      const lutProxy = proxy.getLookupTableProxy();
      const colorPreset = proxy.getLookupTableProxy().getPresetName();
      const interpolateScalarsBeforeMapping = location === 'pointData';
      proxy.setInterpolateScalarsBeforeMapping(interpolateScalarsBeforeMapping);
      proxy.setColorBy(colorByArrayName, location);
      // Restore
      proxy.getLookupTableProxy().setPresetName(colorPreset);
      viewerStore.renderWindow.render()

      const pointSetHasScalars = viewerStore.pointSetsUI.pointSetHasScalars;
      if (pointSetHasScalars[selectedPointSetIndex]) {
        pointSetColorBySelector.value = viewerStore.pointSetsUI.pointSetColorBy[selectedPointSetIndex].value;
      }
    });

  pointSetColorBySelector.addEventListener('change', (event) => {
    event.preventDefault();
    event.stopPropagation();
    const selectedPointSetIndex = viewerStore.pointSetsUI.selectedPointSetIndex;
    const pointSetColorByOptions = viewerStore.pointSetsUI.pointSetColorByOptions;
    const selectedOption = viewerStore.pointSetsUI.pointSetColorByOptions[selectedPointSetIndex].filter((option) => { return option.value === event.target.value; })[0]
    viewerStore.pointSetsUI.pointSetColorBy[selectedPointSetIndex] = selectedOption;
  });

  // Initialize coloring
  const pointSetColorByDefault = viewerStore.geometriesUI.pointSetColorByDefault;
  pointSetColorByDefault.forEach((colorBy, index) => {
    if (colorBy) {
      const [location, colorByArrayName] = colorBy.value.split(':');
      const proxy = viewerStore.geometriesUI.representationProxies[index];
      const interpolateScalarsBeforeMapping = location === 'pointData';
      proxy.setInterpolateScalarsBeforeMapping(interpolateScalarsBeforeMapping);
      proxy.setColorBy(colorByArrayName, location);
    }
  })
  const selectedPointSetIndex = viewerStore.geometriesUI.selectedPointSetIndex;
  const pointSetColorByOptions = viewerStore.geometriesUI.pointSetColorByOptions;
  if (pointSetColorByDefault[selectedPointSetIndex]) {
    pointSetColorBySelector.innerHTML = pointSetColorByOptions[selectedPointSetIndex]
      .map(
        ({ label, value }) =>
          `<option value="${value}" >${label}</option>`
      )
      .join('');
    pointSetColorBySelector.value = pointSetColorByDefault[selectedPointSetIndex].value;
  }
  viewerStore.geometriesUI.pointSetColorBy = pointSetColorByDefault;

  pointSetColorByRow.appendChild(pointSetColorBySelector);
}

export default createPointSetColorBySelector;
