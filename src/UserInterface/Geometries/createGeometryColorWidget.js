import style from '../ItkVtkViewer.module.css';

import createGeometryColorChooser from './createGeometryColorChooser';
import createGeometryOpacitySlider from './createGeometryOpacitySlider';
import createGeometryColorPresetSelector from './createGeometryColorPresetSelector';
import createGeometryColorBySelector from './createGeometryColorBySelector';

function createGeometryColorWidget(
  viewerDOMId,
  renderWindow,
  geometries,
  geometryRepresentationProxies,
  viewerStore,
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
    viewerStore,
    geometrySelector,
    geometryColorRow
  )
  geometriesUIGroup.appendChild(geometryColorRow)

  const geometryColorPresetRow = document.createElement('div')
  geometryColorPresetRow.setAttribute('class', style.uiRow)
  geometryColorPresetRow.className += ` ${viewerDOMId}-toggle`;
  createGeometryColorPresetSelector(
    geometryHasScalars,
    viewerDOMId,
    renderWindow,
    geometryRepresentationProxies,
    geometrySelector,
    geometryColorPresetRow
  )
  geometriesUIGroup.appendChild(geometryColorPresetRow)
}

export default createGeometryColorWidget;
