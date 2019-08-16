import getContrastSensitiveStyle from '../getContrastSensitiveStyle';

import style from '../ItkVtkViewer.module.css';

import sampleDistanceIcon from 'vtk.js/Sources/Interaction/UI/Icons/Spacing.svg';

function createSampleDistanceSlider(
  uiContainer,
  viewerDOMId,
  viewerStore,
  renderWindow
) {
  const contrastSensitiveStyle = getContrastSensitiveStyle(
    ['invertibleButton'],
    viewerStore.isBackgroundDark
  );

  const sliderEntry = document.createElement('div');
  sliderEntry.setAttribute('class', style.sliderEntry);
  sliderEntry.innerHTML = `
    <div itk-vtk-tooltip itk-vtk-tooltip-top itk-vtk-tooltip-content="Volume sampling distance" class="${
      contrastSensitiveStyle.invertibleButton
    } ${style.sampleDistanceButton}">
      ${sampleDistanceIcon}
    </div>
    <input type="range" min="0" max="1" value="0.3" step="0.01"
      class="${style.slider} ${viewerDOMId}-spacing" />`;
  const spacingElement = sliderEntry.querySelector(`.${viewerDOMId}-spacing`);
  function updateSpacing() {
    const value = Number(spacingElement.value);
    viewerStore.imageRepresentationProxy.setSampleDistance(value);
    renderWindow.render();
  }
  spacingElement.addEventListener('input', updateSpacing);
  updateSpacing();
  uiContainer.appendChild(sliderEntry);
}

export default createSampleDistanceSlider;
