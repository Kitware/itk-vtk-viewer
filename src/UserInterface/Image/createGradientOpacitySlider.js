import getContrastSensitiveStyle from '../getContrastSensitiveStyle';

import style from '../ItkVtkViewer.module.css';

import gradientOpacityIcon from '../icons/gradient.svg';

function createGradientOpacitySlider(
  viewerStore,
  uiContainer,
) {
  const contrastSensitiveStyle = getContrastSensitiveStyle(
    ['invertibleButton'],
    viewerStore.isBackgroundDark
  );

  const sliderEntry = document.createElement('div');
  sliderEntry.setAttribute('class', style.sliderEntry);
  sliderEntry.innerHTML = `
    <div itk-vtk-tooltip itk-vtk-tooltip-top itk-vtk-tooltip-content="Gradient opacity" class="${
      contrastSensitiveStyle.invertibleButton
    } ${style.gradientOpacitySlider}">
      ${gradientOpacityIcon}
    </div>
    <input type="range" min="0" max="1" value="0.2" step="0.01"
      id="${viewerStore.id}-gradientOpacitySlider"
      class="${style.slider}" />`;
  const edgeElement = sliderEntry.querySelector(
    `#${viewerStore.id}-gradientOpacitySlider`
  );
  function updateGradientOpacity() {
    const value = Number(edgeElement.value);
    viewerStore.imageUI.representationProxy.setEdgeGradient(value);
    viewerStore.renderWindow.render();
  }
  viewerStore.imageUI.updateGradientOpacity = updateGradientOpacity;
  edgeElement.addEventListener('input', updateGradientOpacity);
  updateGradientOpacity();
  uiContainer.appendChild(sliderEntry);
}

export default createGradientOpacitySlider;
