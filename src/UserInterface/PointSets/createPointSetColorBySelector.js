import style from '../ItkVtkViewer.module.css';

import {
  ColorMode,
  ScalarMode,
} from 'vtk.js/Sources/Rendering/Core/Mapper/Constants';

function createPointSetColorBySelector(
  viewerStore,
  pointSetHasScalars,
  renderWindow,
  pointSets,
  pointSetSelector,
  pointSetColorByRow
) {
  const pointSetColorByOptions = pointSets.map((pointSet, index) => {
    if(!pointSetHasScalars[index]) {
      return null
    }
    const options = [].concat(
      pointSet
        .getPointData()
        .getArrays()
        .map((a) => ({
          label: `${a.getName()}`,
          value: `${a.getName()}`,
        })),
      )
    return options;
    })

  // The default attribute is the "active" attribute
  const pointSetColorBy = pointSets.map((pointSet, index) => {
    if(!pointSetHasScalars[index]) {
      return null
    }
    const pointData = pointSet.getPointData();
    if (!!pointData.getScalars()) {
      const activeIndex = pointData.getActiveScalars();
      const activeArray = pointData.getArrays()[activeIndex];
      return { label: `${activeArray.getName()}`, value: `${activeArray.getName()}` };
    }
    throw new Error('Should not reach here.')
    })

  const pointSetColorBySelector = document.createElement('select');
  pointSetColorBySelector.setAttribute('class', style.selector);
  pointSetColorBySelector.id = `${viewerStore.id}-pointSetColorBySelector`;
  if (pointSetHasScalars[pointSetSelector.selectedIndex] && pointSetColorByOptions[pointSetSelector.selectedIndex].length > 1) {
    pointSetColorByRow.style.display = 'flex';
  } else {
    pointSetColorByRow.style.display = 'none';
  }
  if (pointSetHasScalars[pointSetSelector.selectedIndex]) {
    pointSetColorBySelector.value = pointSetColorBy[pointSetSelector.selectedIndex].value;
  }
  pointSetSelector.addEventListener('change',
    (event) => {
      if (pointSetColorBy[pointSetSelector.selectedIndex]) {
        pointSetColorBySelector.innerHTML = pointSetColorByOptions[pointSetSelector.selectedIndex]
          .map(
            ({ label, value }) =>
              `<option value="${value}" >${label}</option>`
          )
          .join('');
        pointSetColorBySelector.value = pointSetColorBy[pointSetSelector.selectedIndex].value;
      }
      if (pointSetHasScalars[pointSetSelector.selectedIndex] && pointSetColorByOptions[pointSetSelector.selectedIndex].length > 1) {
        pointSetColorByRow.style.display = 'flex';
      } else {
        pointSetColorByRow.style.display = 'none';
      }
    });
  const location = 'pointData';
  function updateColorBy() {
    const colorByArrayName = pointSetColorBySelector.value;
    const proxy = viewerStore.pointSetsUI.representationProxies[pointSetSelector.selectedIndex];
    const lutProxy = proxy.getLookupTableProxy();
    const colorPreset = proxy.getLookupTableProxy().getPresetName();
    proxy.setInterpolateScalarsBeforeMapping(true);
    proxy.setColorBy(colorByArrayName, location);
    // Restore
    proxy.getLookupTableProxy().setPresetName(colorPreset);
    renderWindow.render()
    pointSetColorBy[pointSetSelector.selectedIndex] = pointSetColorByOptions[pointSetSelector.selectedIndex][pointSetColorBySelector.selectedIndex];
  }
  pointSetColorBySelector.addEventListener('change', updateColorBy);
  // Initialize coloring
  pointSetColorBy.forEach((colorBy, index) => {
    if (colorBy) {
      const colorByArrayName = colorBy.value;
      const proxy = viewerStore.pointSetsUI.representationProxies[index];
      proxy.setInterpolateScalarsBeforeMapping(true);
      proxy.setColorBy(colorByArrayName, location);
    }
  })
  if (pointSetColorBy[pointSetSelector.selectedIndex]) {
    pointSetColorBySelector.innerHTML = pointSetColorByOptions[pointSetSelector.selectedIndex]
      .map(
        ({ label, value }) =>
          `<option value="${value}" >${label}</option>`
      )
      .join('');
    pointSetColorBySelector.value = pointSetColorBy[pointSetSelector.selectedIndex].value;
  }
  pointSetColorByRow.appendChild(pointSetColorBySelector);
}

export default createPointSetColorBySelector;
