import style from './ItkVtkViewer.module.css';

import createGeometryRepresentationSelector from './Geometries/createGeometryRepresentationSelector';
import createGeometryColorWidget from './Geometries/createGeometryColorWidget';

function createGeometriesUI(
  geometries,
  geometryRepresentationProxies,
  viewerStore
) {
  const renderWindow = viewerStore.itkVtkView.getRenderWindow();

  const geometriesUIGroup = document.createElement('div');
  geometriesUIGroup.setAttribute('class', style.uiGroup);

  const geometryRepresentationRow = document.createElement('div');
  geometryRepresentationRow.setAttribute('class', style.uiRow);
  geometryRepresentationRow.className += ` ${viewerStore.id}-toggle`;

  const geometryNames = geometries.map((geometry, index) => `Geometry ${index}`);
  const geometrySelector = document.createElement('select');
  geometrySelector.setAttribute('class', style.selector);
  geometrySelector.id = `${viewerStore.id}-geometrySelector`;
  geometrySelector.innerHTML = geometryNames
    .map((name) => `<option value="${name}">${name}</option>`)
    .join('');
  if(geometryNames.length > 1) {
    geometryRepresentationRow.appendChild(geometrySelector);
  } else {
    // Results in a more consistent layout with the representation buttons
    const geometryLabel = document.createElement('label');
    geometryLabel.innerHTML = "Geometry ";
    geometryLabel.setAttribute('class', style.selector);
    geometryRepresentationRow.appendChild(geometryLabel);
  }

  createGeometryRepresentationSelector(
    geometryNames,
    renderWindow,
    viewerStore,
    geometryRepresentationProxies,
    geometrySelector,
    geometryRepresentationRow
  )
  geometriesUIGroup.appendChild(geometryRepresentationRow);

  createGeometryColorWidget(
    renderWindow,
    geometries,
    geometryRepresentationProxies,
    viewerStore,
    geometrySelector,
    geometriesUIGroup
  )

  viewerStore.uiContainer.appendChild(geometriesUIGroup);
}

export default createGeometriesUI;
