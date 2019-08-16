import getContrastSensitiveStyle from '../getContrastSensitiveStyle';

import style from '../ItkVtkViewer.module.css';

import opacityIcon from '../icons/opacity.svg';

function createPointSetOpacitySlider(
  pointSetHasScalars,
  renderWindow,
  pointSetRepresentationProxies,
  viewerStore,
  pointSetSelector,
  pointSetColorRow
) {
  const contrastSensitiveStyle = getContrastSensitiveStyle(
    ['invertibleButton'],
    viewerStore.isBackgroundDark
  );
  const pointSetOpacities = new Array(pointSetHasScalars.length);
  const defaultPointSetOpacity = 1.0;
  pointSetOpacities.fill(defaultPointSetOpacity);
  const sliderEntry = document.createElement('div');
  sliderEntry.setAttribute('class', style.sliderEntry);
  sliderEntry.innerHTML = `
    <div itk-vtk-tooltip itk-vtk-tooltip-bottom itk-vtk-tooltip-content="Opacity" class="${
      contrastSensitiveStyle.invertibleButton
    } ${style.gradientOpacitySlider}">
      ${opacityIcon}
    </div>
    <input type="range" min="0" max="1" value="${defaultPointSetOpacity}" step="0.01"
      id="${viewerStore.id}-pointSetOpacitySlider"
      class="${style.slider}" />`;
  const opacityElement = sliderEntry.querySelector(
    `#${viewerStore.id}-pointSetOpacitySlider`
  );
  function updateOpacity() {
    const value = Number(opacityElement.value);
    pointSetOpacities[pointSetSelector.selectedIndex] = value
    pointSetRepresentationProxies[pointSetSelector.selectedIndex].setOpacity(value)
    renderWindow.render();
  }
  opacityElement.addEventListener('input', updateOpacity);
  updateOpacity();
  pointSetSelector.addEventListener('change',
    (event) => {
      opacityElement.value = pointSetOpacities[pointSetSelector.selectedIndex]
    });
  pointSetColorRow.appendChild(sliderEntry);
}

export default createPointSetOpacitySlider;
