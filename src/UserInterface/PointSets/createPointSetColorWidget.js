import style from '../ItkVtkViewer.module.css';

import createPointSetColorChooser from './createPointSetColorChooser';
import createPointSetOpacitySlider from './createPointSetOpacitySlider';
import createPointSetColorPresetSelector from './createPointSetColorPresetSelector';
import createPointSetColorBySelector from './createPointSetColorBySelector';
import createPointSetSizeSlider from './createPointSetSizeSlider';
import createPointSetColorRangeInput from './createPointSetColorRangeInput';

function createPointSetColorWidget(
  store,
  pointSetsUIGroup
) {
  const colorByRow = document.createElement('div')
  colorByRow.setAttribute('class', style.uiRow)
  colorByRow.className += ` ${store.id}-toggle`;
  createPointSetColorBySelector(
    store,
    colorByRow
  )
  pointSetsUIGroup.appendChild(colorByRow)

  const pointSetColorRow = document.createElement('div')
  pointSetColorRow.setAttribute('class', style.uiRow)
  pointSetColorRow.className += ` ${store.id}-toggle`;

  createPointSetColorChooser(
    store,
    pointSetColorRow
  )

  createPointSetOpacitySlider(
    store,
    pointSetColorRow
  )
  pointSetsUIGroup.appendChild(pointSetColorRow)

  const pointSetColorPresetRow = document.createElement('div')
  pointSetColorPresetRow.setAttribute('class', style.uiRow)
  pointSetColorPresetRow.className += ` ${store.id}-toggle`;
  createPointSetColorPresetSelector(
    store,
    pointSetColorPresetRow
  )
  pointSetsUIGroup.appendChild(pointSetColorPresetRow)

  const colorRangeInputRow = document.createElement('div');
  colorRangeInputRow.setAttribute('class', style.uiRow);
  createPointSetColorRangeInput(
    store,
    colorRangeInputRow
  );
  colorRangeInputRow.className += ` ${store.id}-toggle`;
  pointSetsUIGroup.appendChild(colorRangeInputRow);

  const pointSetSizeRow = document.createElement('div')
  pointSetSizeRow.setAttribute('class', style.uiRow)
  pointSetSizeRow.className += ` ${store.id}-toggle`;
  createPointSetSizeSlider(
    store,
    pointSetSizeRow
  )
  pointSetsUIGroup.appendChild(pointSetSizeRow)
}

export default createPointSetColorWidget;
