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
  viewerStore,
  use2D
) {
  const renderWindow = viewerStore.itkVtkView.getRenderWindow();

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
    viewerStore,
    imageUIGroup,
    viewerDOMId,
    lookupTableProxy,
    piecewiseFunctionProxy,
    dataArray,
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
      viewerStore
    );
    createUseShadowToggle(
      volumeRenderingRow,
      viewerDOMId,
      volumeRepresentation,
      renderWindow,
      viewerStore
    );
    createSampleDistanceSlider(
      volumeRenderingRow,
      viewerDOMId,
      viewerStore,
      volumeRepresentation,
      renderWindow
    );
    updateGradientOpacity = createGradientOpacitySlider(
      volumeRenderingRow,
      viewerDOMId,
      viewerStore,
      volumeRepresentation,
      renderWindow
    );
    imageUIGroup.appendChild(volumeRenderingRow);

    createPlaneIndexSliders(
      imageUIGroup,
      viewerDOMId,
      volumeRepresentation,
      renderWindow,
      viewerStore
    );
  }

  uiContainer.appendChild(imageUIGroup);

  return { transferFunctionWidget, updateGradientOpacity, updateColorMap };
}

export default createImageUI;
