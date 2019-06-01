import getContrastSensitiveStyle from '../getContrastSensitiveStyle';

import style from '../ItkVtkViewer.module.css';

import pointSetSizeIcon from '../icons/point-set-size.svg';

function createPointSetSizeSlider(
  pointSetHasScalars,
  viewerDOMId,
  renderWindow,
  pointSetRepresentationProxies,
  isBackgroundDark,
  pointSetSelector,
  pointSetSizeRow
) {
  const contrastSensitiveStyle = getContrastSensitiveStyle(
    ['invertibleButton'],
    isBackgroundDark
  );
  const pointSetSizes = new Array(pointSetHasScalars.length);
  const defaultPointSetSize = 3;
  pointSetSizes.fill(defaultPointSetSize);
  const sliderEntry = document.createElement('div');
  sliderEntry.setAttribute('class', style.sliderEntry);
  sliderEntry.innerHTML = `
    <div itk-vtk-tooltip itk-vtk-tooltip-bottom itk-vtk-tooltip-content="Size" class="${
      contrastSensitiveStyle.invertibleButton
    } ${style.gradientOpacitySlider}">
      ${pointSetSizeIcon}
    </div>
    <input type="range" min="1" max="10" value="${defaultPointSetSize}" step="1"
      id="${viewerDOMId}-pointSetSizeSlider"
      class="${style.slider}" />`;
  const sizeElement = sliderEntry.querySelector(
    `#${viewerDOMId}-pointSetSizeSlider`
  );
  function updateSize() {
    const value = Number(sizeElement.value);
    pointSetSizes[pointSetSelector.selectedIndex] = value
    pointSetRepresentationProxies[pointSetSelector.selectedIndex][0].setPointSize(value)
    renderWindow.render();
  }
  sizeElement.addEventListener('input', updateSize);
  updateSize();
  pointSetSelector.addEventListener('change',
    (event) => {
      sizeElement.value = pointSetSizes[pointSetSelector.selectedIndex]
    });
  pointSetSizeRow.appendChild(sliderEntry);
}

export default createPointSetSizeSlider;
