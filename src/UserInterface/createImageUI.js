import style from './ItkVtkViewer.module.css';

import createColorPresetSelector from './Image/createColorPresetSelector';
import createTransferFunctionWidget from './Image/createTransferFunctionWidget';
import createViewPlanesToggle from './Image/createViewPlanesToggle';
import createUseShadowToggle from './Image/createUseShadowToggle';
import createPlaneIndexSliders from './Image/createPlaneIndexSliders';
import createSampleDistanceSlider from './Image/createSampleDistanceSlider';
import createGradientOpacitySlider from './Image/createGradientOpacitySlider';

function createImageUI(
  viewerStore,
  use2D
) {
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
    );
    presetRow.className += ` ${viewerDOMId}-toggle`;
    imageUIGroup.appendChild(presetRow);
  }

  createTransferFunctionWidget(
    viewerStore,
    imageUIGroup,
    use2D
  );

  if (!use2D) {
    const volumeRenderingRow = document.createElement('div');
    volumeRenderingRow.setAttribute('class', style.uiRow);
    volumeRenderingRow.className += ` ${viewerDOMId}-volumeRendering ${viewerDOMId}-toggle`;
    createViewPlanesToggle(
      viewerStore,
      imageUIGroup,
      volumeRenderingRow,
    );
    createUseShadowToggle(
      viewerStore,
      volumeRenderingRow,
    );
    createSampleDistanceSlider(
      viewerStore,
      volumeRenderingRow,
    );
    createGradientOpacitySlider(
      viewerStore,
      volumeRenderingRow,
    );
    imageUIGroup.appendChild(volumeRenderingRow);

    createPlaneIndexSliders(
      viewerStore,
      imageUIGroup,
    );
  }

  viewerStore.uiContainer.appendChild(imageUIGroup);
}

export default createImageUI;
