import getContrastSensitiveStyle from '../getContrastSensitiveStyle';

import style from '../ItkVtkViewer.module.css';

import sampleDistanceIcon from 'vtk.js/Sources/Interaction/UI/Icons/Spacing.svg';

function createSampleDistanceSlider(
  store,
  uiContainer,
) {
  const contrastSensitiveStyle = getContrastSensitiveStyle(
    ['invertibleButton'],
    store.isBackgroundDark
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
      class="${style.slider} ${store.id}-spacing" />`;
  const spacingElement = sliderEntry.querySelector(`.${store.id}-spacing`);
  function updateSpacing() {
    const value = Number(spacingElement.value);
    store.imageUI.representationProxy.setSampleDistance(value);
    store.renderWindow.render();
  }
  spacingElement.addEventListener('input', updateSpacing);
  updateSpacing();
  uiContainer.appendChild(sliderEntry);
}

export default createSampleDistanceSlider;
