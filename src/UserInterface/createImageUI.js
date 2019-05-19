import style from './ItkVtkViewer.module.css';

import createColorPresetSelector from './Image/createColorPresetSelector';
import createTransferFunctionWidget from './Image/createTransferFunctionWidget';
import createViewPlanesToggle from './Image/createViewPlanesToggle';
import createUseShadowToggle from './Image/createUseShadowToggle';
import createPlaneIndexSliders from './Image/createPlaneIndexSliders';
import createSampleDistanceSlider from './Image/createSampleDistanceSlider';
import createGradientOpacitySlider from './Image/createGradientOpacitySlider';

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
