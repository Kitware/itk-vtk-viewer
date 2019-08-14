import getContrastSensitiveStyle from '../getContrastSensitiveStyle';

import style from '../ItkVtkViewer.module.css';

import opacityIcon from '../icons/opacity.svg';

function createGeometryOpacitySlider(
  geometryHasScalars,
  viewerDOMId,
  renderWindow,
  geometryRepresentationProxies,
  viewerStore,
  geometrySelector,
  geometryColorRow
) {
  const contrastSensitiveStyle = getContrastSensitiveStyle(
    ['invertibleButton'],
    viewerStore.isBackgroundDark
  );
  const geometryOpacities = new Array(geometryHasScalars.length);
  const defaultGeometryOpacity = 1.0;
  geometryOpacities.fill(defaultGeometryOpacity);
  const sliderEntry = document.createElement('div');
  sliderEntry.setAttribute('class', style.sliderEntry);
  sliderEntry.innerHTML = `
    <div itk-vtk-tooltip itk-vtk-tooltip-bottom itk-vtk-tooltip-content="Opacity" class="${
      contrastSensitiveStyle.invertibleButton
    } ${style.gradientOpacitySlider}">
      ${opacityIcon}
    </div>
    <input type="range" min="0" max="1" value="${defaultGeometryOpacity}" step="0.01"
      id="${viewerDOMId}-geometryOpacitySlider"
      class="${style.slider}" />`;
  const opacityElement = sliderEntry.querySelector(
    `#${viewerDOMId}-geometryOpacitySlider`
  );
  function updateOpacity() {
    const value = Number(opacityElement.value);
    geometryOpacities[geometrySelector.selectedIndex] = value
    geometryRepresentationProxies[geometrySelector.selectedIndex].setOpacity(value)
    renderWindow.render();
  }
  opacityElement.addEventListener('input', updateOpacity);
  updateOpacity();
  geometrySelector.addEventListener('change',
    (event) => {
      opacityElement.value = geometryOpacities[geometrySelector.selectedIndex]
    });
  geometryColorRow.appendChild(sliderEntry);
}

export default createGeometryOpacitySlider;
