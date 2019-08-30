import { reaction, autorun } from 'mobx';

import style from './ItkVtkViewer.module.css';

import createGeometryRepresentationSelector from './Geometries/createGeometryRepresentationSelector';
import createGeometryColorWidget from './Geometries/createGeometryColorWidget';

function createGeometriesUI(
  viewerStore,
) {
  const geometriesUIGroup = document.createElement('div');
  geometriesUIGroup.setAttribute('class', style.uiGroup);

  const geometryRepresentationRow = document.createElement('div');
  geometryRepresentationRow.setAttribute('class', style.uiRow);
  geometryRepresentationRow.className += ` ${viewerStore.id}-toggle`;

  const geometrySelector = document.createElement('select');
  geometrySelector.setAttribute('class', style.selector);
  geometrySelector.id = `${viewerStore.id}-geometrySelector`;
  geometryRepresentationRow.appendChild(geometrySelector);

  geometrySelector.addEventListener('change', (event) => {
    event.preventDefault();
    event.stopPropagation();
    viewerStore.geometriesUI.selectedGeometryIndex = geometrySelector.selectedIndex;
  })
  function updateGeometryNames(geometryNames) {
    geometrySelector.innerHTML = geometryNames
      .map((name) => `<option value="${name}">${name}</option>`)
      .join('');
    if(geometryNames.length > 1) {
      geometrySelector.disabled = false;
    } else {
      geometrySelector.disabled = true;
    }
  }
  reaction(() => { return viewerStore.geometriesUI.geometryNames.slice(); },
    (geometryNames) => { updateGeometryNames(geometryNames); }
  )
  if(viewerStore.geometriesUI.geometries.length > 0) {
    viewerStore.geometriesUI.selectedGeometryIndex = 0;
  }
  autorun(() => {
      const geometries = viewerStore.geometriesUI.geometries;
      if (geometries.length === 1) {
        viewerStore.geometriesUI.geometryNames = ['Geometry'];
      } else {
        viewerStore.geometriesUI.geometryNames = geometries.map((geometry, index) => `Geometry ${index}`);
      }
    })

  createGeometryRepresentationSelector(
    viewerStore,
    geometryRepresentationRow
  )
  geometriesUIGroup.appendChild(geometryRepresentationRow);

  createGeometryColorWidget(
    viewerStore,
    geometriesUIGroup
  )

  viewerStore.mainUI.uiContainer.appendChild(geometriesUIGroup);
  viewerStore.geometriesUI.initialized = true;
}

export default createGeometriesUI;
