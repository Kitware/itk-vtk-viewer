import getContrastSensitiveStyle from './getContrastSensitiveStyle';

import style from './ItkVtkViewer.module.css';

import gradientOpacityIcon from './icons/gradient.svg';

import createColorPresetSelector from './Image/createColorPresetSelector';
import createTransferFunctionWidget from './Image/createTransferFunctionWidget';
import createViewPlanesToggle from './Image/createViewPlanesToggle';
import createUseShadowToggle from './Image/createUseShadowToggle';
import createPlaneIndexSliders from './Image/createPlaneIndexSliders';
import createSampleDistanceSlider from './Image/createSampleDistanceSlider';


function createGradientOpacitySlider(
  uiContainer,
  viewerDOMId,
  isBackgroundDark,
  volumeRepresentation,
  renderWindow
) {
  const contrastSensitiveStyle = getContrastSensitiveStyle(
    ['invertibleButton'],
    isBackgroundDark
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
      id="${viewerDOMId}-gradientOpacitySlider"
      class="${style.slider}" />`;
  const edgeElement = sliderEntry.querySelector(
    `#${viewerDOMId}-gradientOpacitySlider`
  );
  function updateGradientOpacity() {
    const value = Number(edgeElement.value);
    volumeRepresentation.setEdgeGradient(value);
    renderWindow.render();
  }
  edgeElement.addEventListener('input', updateGradientOpacity);
  updateGradientOpacity();
  uiContainer.appendChild(sliderEntry);

  return updateGradientOpacity;
}

function createImageUI(
  uiContainer,
  viewerDOMId,
  lookupTableProxy,
  piecewiseFunctionProxy,
  volumeRepresentation,
  dataArray,
  view,
  isBackgroundDark,
  use2D
) {
  const renderWindow = view.getRenderWindow();

  const imageUIGroup = document.createElement('div');
  imageUIGroup.setAttribute('class', style.uiGroup);

  let updateColorMap = null;
  if (dataArray.getNumberOfComponents() === 1) {
    const presetRow = document.createElement('div');
    presetRow.setAttribute('class', style.uiRow);
    updateColorMap = createColorPresetSelector(
      presetRow,
      viewerDOMId,
      lookupTableProxy,
      renderWindow
    );
    presetRow.className += ` ${viewerDOMId}-toggle`;
    imageUIGroup.appendChild(presetRow);
  }

  const transferFunctionWidget = createTransferFunctionWidget(
    imageUIGroup,
    viewerDOMId,
    lookupTableProxy,
    piecewiseFunctionProxy,
    dataArray,
    view,
    renderWindow,
    use2D
  );

  let updateGradientOpacity = null;
  if (!use2D) {
    const volumeRenderingRow = document.createElement('div');
    volumeRenderingRow.setAttribute('class', style.uiRow);
    volumeRenderingRow.className += ` ${viewerDOMId}-volumeRendering ${viewerDOMId}-toggle`;
    createViewPlanesToggle(
      imageUIGroup,
      viewerDOMId,
      volumeRenderingRow,
      view,
      isBackgroundDark
    );
    createUseShadowToggle(
      volumeRenderingRow,
      viewerDOMId,
      volumeRepresentation,
      renderWindow,
      isBackgroundDark
    );
    createSampleDistanceSlider(
      volumeRenderingRow,
      viewerDOMId,
      isBackgroundDark,
      volumeRepresentation,
      renderWindow
    );
    updateGradientOpacity = createGradientOpacitySlider(
      volumeRenderingRow,
      viewerDOMId,
      isBackgroundDark,
      volumeRepresentation,
      renderWindow
    );
    imageUIGroup.appendChild(volumeRenderingRow);

    createPlaneIndexSliders(
      imageUIGroup,
      viewerDOMId,
      volumeRepresentation,
      renderWindow,
      isBackgroundDark
    );
  }

  uiContainer.appendChild(imageUIGroup);

  return { transferFunctionWidget, updateGradientOpacity, updateColorMap };
}

export default createImageUI;
