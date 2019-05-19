import style from '../ItkVtkViewer.module.css';

import createGeometryColorChooser from './createGeometryColorChooser';
import createGeometryOpacitySlider from './createGeometryOpacitySlider';
import createGeometryColorBySelector from './createGeometryColorBySelector';

function createGeometryColorWidget(
  viewerDOMId,
  renderWindow,
  geometries,
  geometryRepresentationProxies,
  isBackgroundDark,
  geometrySelector,
  geometriesUIGroup
) {
  const geometryHasScalars = geometries.map((geometry) => {
    const pointData = geometry.getPointData();
    const hasPointDataScalars = !!pointData.getScalars();
    const cellData = geometry.getCellData();
    const hasCellDataScalars = !!cellData.getScalars();
    return hasPointDataScalars || hasCellDataScalars;
  })

  const geometryColorRow = document.createElement('div')
  geometryColorRow.setAttribute('class', style.uiRow)
  geometryColorRow.className += ` ${viewerDOMId}-toggle`;

  createGeometryColorChooser(
    geometryHasScalars,
    viewerDOMId,
    renderWindow,
    geometryRepresentationProxies,
    geometrySelector,
    geometryColorRow
  )

  createGeometryOpacitySlider(
    geometryHasScalars,
    viewerDOMId,
    renderWindow,
    geometryRepresentationProxies,
    isBackgroundDark,
    geometrySelector,
    geometryColorRow
  )
  geometriesUIGroup.appendChild(geometryColorRow)

  const geometryColorByRow = document.createElement('div')
  geometryColorByRow.setAttribute('class', style.uiRow)
  geometryColorByRow.className += ` ${viewerDOMId}-toggle`;
  createGeometryColorBySelector(
    geometryHasScalars,
    viewerDOMId,
    renderWindow,
    geometries,
    geometryRepresentationProxies,
    geometrySelector,
    geometryColorByRow
  )
  geometriesUIGroup.appendChild(geometryColorByRow)
}

export default createGeometryColorWidget;
