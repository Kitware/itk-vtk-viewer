import getContrastSensitiveStyle from '../getContrastSensitiveStyle';

import style from '../ItkVtkViewer.module.css';

import pointSetSizeIcon from '../icons/point-set-size.svg';

function createPointSetSizeSlider(
  viewerStore,
  pointSetHasScalars,
  pointSetSelector,
  pointSetSizeRow
) {
  const contrastSensitiveStyle = getContrastSensitiveStyle(
    ['invertibleButton'],
    viewerStore.isBackgroundDark
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
      id="${viewerStore.id}-pointSetSizeSlider"
      class="${style.slider}" />`;
  const sizeElement = sliderEntry.querySelector(
    `#${viewerStore.id}-pointSetSizeSlider`
  );
  function updateSize() {
    const value = Number(sizeElement.value);
    pointSetSizes[pointSetSelector.selectedIndex] = value
    viewerStore.pointSetsUI.representationProxies[pointSetSelector.selectedIndex].setPointSize(value)
    viewerStore.renderWindow.render();
  }
  sizeElement.addEventListener('input', updateSize);
  updateSize();
  viewerStore.pointSetsUI.representationProxies.forEach((proxy) => {
    proxy.setPointSize(defaultPointSetSize)
  })
  pointSetSelector.addEventListener('change',
    (event) => {
      sizeElement.value = pointSetSizes[pointSetSelector.selectedIndex]
    });
  pointSetSizeRow.appendChild(sliderEntry);
}

export default createPointSetSizeSlider;
