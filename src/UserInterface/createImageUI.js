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
  viewerStore,
  use2D
) {
  const renderWindow = viewerStore.itkVtkView.getRenderWindow();
  const viewerDOMId = viewerStore.id;

  const imageUIGroup = document.createElement('div');
  imageUIGroup.setAttribute('class', style.uiGroup);

  const dataArray = viewerStore.image.getPointData().getScalars();
  if (dataArray.getNumberOfComponents() === 1) {
    const presetRow = document.createElement('div');
    presetRow.setAttribute('class', style.uiRow);
    createColorPresetSelector(
      viewerStore,
      presetRow,
      renderWindow
    );
    presetRow.className += ` ${viewerDOMId}-toggle`;
    imageUIGroup.appendChild(presetRow);
  }

  createTransferFunctionWidget(
    viewerStore,
    imageUIGroup,
    renderWindow,
    use2D
  );

  if (!use2D) {
    const volumeRenderingRow = document.createElement('div');
    volumeRenderingRow.setAttribute('class', style.uiRow);
    volumeRenderingRow.className += ` ${viewerDOMId}-volumeRendering ${viewerDOMId}-toggle`;
    createViewPlanesToggle(
      imageUIGroup,
      volumeRenderingRow,
      viewerStore
    );
    createUseShadowToggle(
      volumeRenderingRow,
      renderWindow,
      viewerStore
    );
    createSampleDistanceSlider(
      volumeRenderingRow,
      viewerStore,
      renderWindow
    );
    createGradientOpacitySlider(
      volumeRenderingRow,
      viewerStore,
      renderWindow
    );
    imageUIGroup.appendChild(volumeRenderingRow);

    createPlaneIndexSliders(
      imageUIGroup,
      renderWindow,
      viewerStore
    );
  }

  uiContainer.appendChild(imageUIGroup);
}

export default createImageUI;
