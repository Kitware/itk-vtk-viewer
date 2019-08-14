import style from '../ItkVtkViewer.module.css';

import createPointSetColorChooser from './createPointSetColorChooser';
import createPointSetOpacitySlider from './createPointSetOpacitySlider';
import createPointSetColorPresetSelector from './createPointSetColorPresetSelector';
import createPointSetColorBySelector from './createPointSetColorBySelector';
import createPointSetSizeSlider from './createPointSetSizeSlider';

function createPointSetColorWidget(
  viewerDOMId,
  renderWindow,
  pointSets,
  pointSetRepresentationProxies,
  viewerStore,
  pointSetSelector,
  pointSetsUIGroup
) {
  const pointSetHasScalars = pointSets.map((pointSet) => {
    const pointData = pointSet.getPointData();
    const hasPointDataScalars = !!pointData.getScalars();
    return hasPointDataScalars;
  })

  const pointSetColorByRow = document.createElement('div')
  pointSetColorByRow.setAttribute('class', style.uiRow)
  pointSetColorByRow.className += ` ${viewerDOMId}-toggle`;
  createPointSetColorBySelector(
    pointSetHasScalars,
    viewerDOMId,
    renderWindow,
    pointSets,
    pointSetRepresentationProxies,
    pointSetSelector,
    pointSetColorByRow
  )
  pointSetsUIGroup.appendChild(pointSetColorByRow)

  const pointSetColorRow = document.createElement('div')
  pointSetColorRow.setAttribute('class', style.uiRow)
  pointSetColorRow.className += ` ${viewerDOMId}-toggle`;

  createPointSetColorChooser(
    pointSetHasScalars,
    viewerDOMId,
    renderWindow,
    pointSetRepresentationProxies,
    pointSetSelector,
    pointSetColorRow
  )

  createPointSetOpacitySlider(
    pointSetHasScalars,
    viewerDOMId,
    renderWindow,
    pointSetRepresentationProxies,
    viewerStore,
    pointSetSelector,
    pointSetColorRow
  )
  pointSetsUIGroup.appendChild(pointSetColorRow)

  const pointSetColorPresetRow = document.createElement('div')
  pointSetColorPresetRow.setAttribute('class', style.uiRow)
  pointSetColorPresetRow.className += ` ${viewerDOMId}-toggle`;
  createPointSetColorPresetSelector(
    pointSetHasScalars,
    viewerDOMId,
    renderWindow,
    pointSetRepresentationProxies,
    pointSetSelector,
    pointSetColorPresetRow
  )
  pointSetsUIGroup.appendChild(pointSetColorPresetRow)

  const pointSetSizeRow = document.createElement('div')
  pointSetSizeRow.setAttribute('class', style.uiRow)
  pointSetSizeRow.className += ` ${viewerDOMId}-toggle`;
  createPointSetSizeSlider(
    pointSetHasScalars,
    viewerDOMId,
    renderWindow,
    pointSetRepresentationProxies,
    viewerStore,
    pointSetSelector,
    pointSetSizeRow
  )
  pointSetsUIGroup.appendChild(pointSetSizeRow)
}

export default createPointSetColorWidget;
