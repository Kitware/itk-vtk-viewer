import style from '../ItkVtkViewer.module.css';

import {
  ColorMode,
  ScalarMode,
} from 'vtk.js/Sources/Rendering/Core/Mapper/Constants';

function createGeometryColorBySelector(
  viewerStore,
  geometryHasScalars,
  geometries,
  geometrySelector,
  geometryColorByRow
) {
  const geometryColorByOptions = geometries.map((geometry, index) => {
    if(!geometryHasScalars[index]) {
      return null
    }
    const options = [].concat(
      geometry
        .getPointData()
        .getArrays()
        .map((a) => ({
          label: `(p) ${a.getName()}`,
          value: `pointData:${a.getName()}`,
        })),
      geometry
        .getCellData()
        .getArrays()
        .map((a) => ({
          label: `(c) ${a.getName()}`,
          value: `cellData:${a.getName()}`,
        }))
      )
    return options;
    })

  // The default attribute is the "active" attribute
  const geometryColorBy = geometries.map((geometry, index) => {
    if(!geometryHasScalars[index]) {
      return null
    }
    const pointData = geometry.getPointData();
    if (!!pointData.getScalars()) {
      const activeIndex = pointData.getActiveScalars();
      const activeArray = pointData.getArrays()[activeIndex];
      return { label: `(p) ${activeArray.getName()}`, value: `pointData:${activeArray.getName()}` };
    }
    const cellData = geometry.getCellData();
    if (!!cellData.getScalars()) {
      const activeIndex = cellData.getActiveScalars();
      const activeArray = cellData.getArrays()[activeIndex];
      return { label: `(c) ${activeArray.getName()}`, value: `cellData:${activeArray.getName()}` };
    }
    throw new Error('Should not reach here.')
    })

  const geometryColorBySelector = document.createElement('select');
  geometryColorBySelector.setAttribute('class', style.selector);
  geometryColorBySelector.id = `${viewerStore.id}-geometryColorBySelector`;
  if (geometryHasScalars[geometrySelector.selectedIndex] && geometryColorByOptions[geometrySelector.selectedIndex].length > 1) {
    geometryColorByRow.style.display = 'flex';
  } else {
    geometryColorByRow.style.display = 'none';
  }
  if (geometryHasScalars[geometrySelector.selectedIndex]) {
    geometryColorBySelector.value = geometryColorBy[geometrySelector.selectedIndex].value;
  }
  geometrySelector.addEventListener('change',
    (event) => {
      if (geometryColorBy[geometrySelector.selectedIndex]) {
        geometryColorBySelector.innerHTML = geometryColorByOptions[geometrySelector.selectedIndex]
          .map(
            ({ label, value }) =>
              `<option value="${value}" >${label}</option>`
          )
          .join('');
        geometryColorBySelector.value = geometryColorBy[geometrySelector.selectedIndex].value;
      }
      if (geometryHasScalars[geometrySelector.selectedIndex] && geometryColorByOptions[geometrySelector.selectedIndex].length > 1) {
        geometryColorByRow.style.display = 'flex';
      } else {
        geometryColorByRow.style.display = 'none';
      }
    });
  function updateColorBy() {
    const [location, colorByArrayName] = geometryColorBySelector.value.split(':');
    const proxy = viewerStore.geometriesUI.representationProxies[geometrySelector.selectedIndex];
    const lutProxy = proxy.getLookupTableProxy();
    const colorPreset = proxy.getLookupTableProxy().getPresetName();
    const interpolateScalarsBeforeMapping = location === 'pointData';
    proxy.setInterpolateScalarsBeforeMapping(interpolateScalarsBeforeMapping);
    proxy.setColorBy(colorByArrayName, location);
    // Restore
    proxy.getLookupTableProxy().setPresetName(colorPreset);
    viewerStore.renderWindow.render()
    geometryColorBy[geometrySelector.selectedIndex] = geometryColorByOptions[geometrySelector.selectedIndex][geometryColorBySelector.selectedIndex];
  }
  geometryColorBySelector.addEventListener('change', updateColorBy);
  // Initialize coloring
  geometryColorBy.forEach((colorBy, index) => {
    if (colorBy) {
      const [location, colorByArrayName] = colorBy.value.split(':');
      const proxy = viewerStore.geometriesUI.representationProxies[index];
      const interpolateScalarsBeforeMapping = location === 'pointData';
      proxy.setInterpolateScalarsBeforeMapping(interpolateScalarsBeforeMapping);
      proxy.setColorBy(colorByArrayName, location);
    }
  })
  if (geometryColorBy[geometrySelector.selectedIndex]) {
    geometryColorBySelector.innerHTML = geometryColorByOptions[geometrySelector.selectedIndex]
      .map(
        ({ label, value }) =>
          `<option value="${value}" >${label}</option>`
      )
      .join('');
    geometryColorBySelector.value = geometryColorBy[geometrySelector.selectedIndex].value;
  }
  geometryColorByRow.appendChild(geometryColorBySelector);
}

export default createGeometryColorBySelector;
