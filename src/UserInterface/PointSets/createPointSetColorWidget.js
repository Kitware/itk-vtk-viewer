import style from '../ItkVtkViewer.module.css';

import createPointSetColorChooser from './createPointSetColorChooser';
import createPointSetOpacitySlider from './createPointSetOpacitySlider';
import createPointSetColorPresetSelector from './createPointSetColorPresetSelector';
import createPointSetColorBySelector from './createPointSetColorBySelector';
import createPointSetSizeSlider from './createPointSetSizeSlider';

function createPointSetColorWidget(
  viewerStore,
  pointSetsUIGroup
) {
  const pointSetColorByRow = document.createElement('div')
  pointSetColorByRow.setAttribute('class', style.uiRow)
  pointSetColorByRow.className += ` ${viewerStore.id}-toggle`;
  createPointSetColorBySelector(
    viewerStore,
    pointSetColorByRow
  )
  pointSetsUIGroup.appendChild(pointSetColorByRow)

  const pointSetColorRow = document.createElement('div')
  pointSetColorRow.setAttribute('class', style.uiRow)
  pointSetColorRow.className += ` ${viewerStore.id}-toggle`;

  createPointSetColorChooser(
    viewerStore,
    pointSetHasScalars,
    pointSetSelector,
    pointSetColorRow
  )

  createPointSetOpacitySlider(
    viewerStore,
    pointSetHasScalars,
    pointSetSelector,
    pointSetColorRow
  )
  pointSetsUIGroup.appendChild(pointSetColorRow)

  const pointSetColorPresetRow = document.createElement('div')
  pointSetColorPresetRow.setAttribute('class', style.uiRow)
  pointSetColorPresetRow.className += ` ${viewerStore.id}-toggle`;
  createPointSetColorPresetSelector(
    viewerStore,
    pointSetHasScalars,
    pointSetSelector,
    pointSetColorPresetRow
  )
  pointSetsUIGroup.appendChild(pointSetColorPresetRow)

  const pointSetSizeRow = document.createElement('div')
  pointSetSizeRow.setAttribute('class', style.uiRow)
  pointSetSizeRow.className += ` ${viewerStore.id}-toggle`;
  createPointSetSizeSlider(
    viewerStore,
    pointSetHasScalars,
    pointSetSelector,
    pointSetSizeRow
  )
  pointSetsUIGroup.appendChild(pointSetSizeRow)
}

export default createPointSetColorWidget;
