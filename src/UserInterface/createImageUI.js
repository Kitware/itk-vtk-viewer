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
  viewerStore,
  use2D
) {
  const renderWindow = viewerStore.itkVtkView.getRenderWindow();

  const imageUIGroup = document.createElement('div');
  imageUIGroup.setAttribute('class', style.uiGroup);

  const dataArray = viewerStore.image.getPointData().getScalars();
  if (dataArray.getNumberOfComponents() === 1) {
    const presetRow = document.createElement('div');
    presetRow.setAttribute('class', style.uiRow);
    createColorPresetSelector(
      viewerStore,
      presetRow,
      viewerDOMId,
      renderWindow
    );
    presetRow.className += ` ${viewerDOMId}-toggle`;
    imageUIGroup.appendChild(presetRow);
  }

  createTransferFunctionWidget(
    viewerStore,
    imageUIGroup,
    viewerDOMId,
    renderWindow,
    use2D
  );

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
      renderWindow,
      viewerStore
    );
    createSampleDistanceSlider(
      volumeRenderingRow,
      viewerDOMId,
      viewerStore,
      renderWindow
    );
    createGradientOpacitySlider(
      volumeRenderingRow,
      viewerDOMId,
      viewerStore,
      renderWindow
    );
    imageUIGroup.appendChild(volumeRenderingRow);

    createPlaneIndexSliders(
      imageUIGroup,
      viewerDOMId,
      renderWindow,
      viewerStore
    );
  }

  uiContainer.appendChild(imageUIGroup);
}

export default createImageUI;
