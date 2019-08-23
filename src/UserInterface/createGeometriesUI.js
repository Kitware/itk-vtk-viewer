import { reaction } from 'mobx';

import style from './ItkVtkViewer.module.css';

import createGeometryRepresentationSelector from './Geometries/createGeometryRepresentationSelector';
import createGeometryColorWidget from './Geometries/createGeometryColorWidget';

function createGeometriesUI(
  viewerStore,
  geometries,
) {
  const geometriesUIGroup = document.createElement('div');
  geometriesUIGroup.setAttribute('class', style.uiGroup);

  const geometryRepresentationRow = document.createElement('div');
  geometryRepresentationRow.setAttribute('class', style.uiRow);
  geometryRepresentationRow.className += ` ${viewerStore.id}-toggle`;

  const geometrySelector = document.createElement('select');
  geometrySelector.setAttribute('class', style.selector);
  geometrySelector.id = `${viewerStore.id}-geometrySelector`;
  geometrySelector.addEventListener('change', (event) => {
    event.preventDefault();
    event.stopPropagation();
    viewerStore.geometriesUI.selectedGeometryIndex = geometrySelector.selectedIndex;
  })
  function updateGeometryNames(geometryNames) {
    geometrySelector.innerHTML = geometryNames
      .map((name) => `<option value="${name}">${name}</option>`)
      .join('');
    if(geometryRepresentationRow.contains(geometrySelector)) {
      // Do nothing
    }
    else if(geometryNames.length > 1) {
      geometryRepresentationRow.appendChild(geometrySelector);
    } else {
      // Results in a more consistent layout with the representation buttons
      const geometryLabel = document.createElement('label');
      geometryLabel.innerHTML = "Geometry ";
      geometryLabel.setAttribute('class', style.selector);
      geometryRepresentationRow.appendChild(geometryLabel);
    }
  }
  reaction(() => { return viewerStore.imageUI.geometryNames; },
    (geometryNames) => { updateGeometryNames(geometryNames); }
  )

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
