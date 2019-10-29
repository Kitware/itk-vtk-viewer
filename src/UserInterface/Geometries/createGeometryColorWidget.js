import style from '../ItkVtkViewer.module.css';

import createGeometryColorChooser from './createGeometryColorChooser';
import createGeometryOpacitySlider from './createGeometryOpacitySlider';
import createGeometryColorBySelector from './createGeometryColorBySelector';
import createGeometryColorRangeInput from './createGeometryColorRangeInput';

function createGeometryColorWidget(
  store,
  geometriesUIGroup
) {
  const colorByRow = document.createElement('div')
  colorByRow.setAttribute('class', style.uiRow)
  colorByRow.className += ` ${store.id}-toggle`;
  createGeometryColorBySelector(
    store,
    colorByRow
  )
  geometriesUIGroup.appendChild(colorByRow)

  const geometryColorRow = document.createElement('div')
  geometryColorRow.setAttribute('class', style.uiRow)
  geometryColorRow.className += ` ${store.id}-toggle`;

  createGeometryColorChooser(
    store,
    geometryColorRow
  )

  createGeometryOpacitySlider(
    store,
    geometryColorRow
  )
  geometriesUIGroup.appendChild(geometryColorRow)

  const colorRangeInputRow = document.createElement('div');
  colorRangeInputRow.setAttribute('class', style.uiRow);
  createGeometryColorRangeInput(
    store,
    colorRangeInputRow
  );
  colorRangeInputRow.className += ` ${store.id}-toggle`;
  geometriesUIGroup.appendChild(colorRangeInputRow);
}

export default createGeometryColorWidget;
