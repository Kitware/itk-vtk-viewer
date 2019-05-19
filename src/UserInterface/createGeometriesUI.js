import style from './ItkVtkViewer.module.css';

import createGeometryRepresentationSelector from './Geometries/createGeometryRepresentationSelector';
import createGeometryColorChooser from './Geometries/createGeometryColorChooser';
import createGeometryOpacitySlider from './Geometries/createGeometryOpacitySlider';

function createGeometriesUI(
  uiContainer,
  viewerDOMId,
  geometries,
  geometryRepresentationProxies,
  view,
  isBackgroundDark
) {
  const renderWindow = view.getRenderWindow();

  const geometriesUIGroup = document.createElement('div');
  geometriesUIGroup.setAttribute('class', style.uiGroup);

  const geometryRepresentationRow = document.createElement('div');
  geometryRepresentationRow.setAttribute('class', style.uiRow);
  geometryRepresentationRow.className += ` ${viewerDOMId}-toggle`;

  const geometryNames = geometries.map((geometry, index) => `Geometry ${index}`);
  const geometrySelector = document.createElement('select');
  geometrySelector.setAttribute('class', style.selector);
  geometrySelector.id = `${viewerDOMId}-geometrySelector`;
  geometrySelector.innerHTML = geometryNames
    .map((name) => `<option value="${name}">${name}</option>`)
    .join('');
  if(geometryNames.length > 1) {
    geometryRepresentationRow.appendChild(geometrySelector);
  }

  createGeometryRepresentationSelector(
    viewerDOMId,
    geometryNames,
    renderWindow,
    geometryRepresentationProxies,
    geometrySelector,
    geometryRepresentationRow
  )
  geometriesUIGroup.appendChild(geometryRepresentationRow);

  const geometryColorRow = document.createElement('div')
  geometryColorRow.setAttribute('class', style.uiRow)
  geometryColorRow.className += ` ${viewerDOMId}-toggle`;

  createGeometryColorChooser(
    viewerDOMId,
    geometryNames,
    renderWindow,
    geometryRepresentationProxies,
    geometrySelector,
    geometryColorRow
  )

  createGeometryOpacitySlider(
    viewerDOMId,
    geometryNames,
    renderWindow,
    geometryRepresentationProxies,
    isBackgroundDark,
    geometrySelector,
    geometryColorRow
  )

  geometriesUIGroup.appendChild(geometryColorRow)

  uiContainer.appendChild(geometriesUIGroup);

  return {};
}

export default createGeometriesUI;
