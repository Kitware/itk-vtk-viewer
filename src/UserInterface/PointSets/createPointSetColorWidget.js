import style from '../ItkVtkViewer.module.css';

import createPointSetColorChooser from './createPointSetColorChooser';
import createPointSetOpacitySlider from './createPointSetOpacitySlider';
import createPointSetColorPresetSelector from './createPointSetColorPresetSelector';
import createPointSetColorBySelector from './createPointSetColorBySelector';
import createPointSetSizeSlider from './createPointSetSizeSlider';
import createPointSetColorRangeInput from './createPointSetColorRangeInput';

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
    pointSetColorRow
  )

  createPointSetOpacitySlider(
    viewerStore,
    pointSetColorRow
  )
  pointSetsUIGroup.appendChild(pointSetColorRow)

  const pointSetColorPresetRow = document.createElement('div')
  pointSetColorPresetRow.setAttribute('class', style.uiRow)
  pointSetColorPresetRow.className += ` ${viewerStore.id}-toggle`;
  createPointSetColorPresetSelector(
    viewerStore,
    pointSetColorPresetRow
  )
  pointSetsUIGroup.appendChild(pointSetColorPresetRow)

  const colorRangeInputRow = document.createElement('div');
  colorRangeInputRow.setAttribute('class', style.uiRow);
  createPointSetColorRangeInput(
    viewerStore,
    colorRangeInputRow
  );
  colorRangeInputRow.className += ` ${viewerStore.id}-toggle`;
  pointSetsUIGroup.appendChild(colorRangeInputRow);

  const pointSetSizeRow = document.createElement('div')
  pointSetSizeRow.setAttribute('class', style.uiRow)
  pointSetSizeRow.className += ` ${viewerStore.id}-toggle`;
  createPointSetSizeSlider(
    viewerStore,
    pointSetSizeRow
  )
  pointSetsUIGroup.appendChild(pointSetSizeRow)
}

export default createPointSetColorWidget;
