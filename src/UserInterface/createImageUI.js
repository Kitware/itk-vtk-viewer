import { reaction } from 'mobx';

import style from './ItkVtkViewer.module.css';

import createColorPresetSelector from './Image/createColorPresetSelector';
import createBlendModeSelector from './Image/createBlendModeSelector';
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

  const dataArray = viewerStore.imageUI.image.getPointData().getScalars();
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
    const volumeRenderingRow1 = document.createElement('div');
    volumeRenderingRow1.setAttribute('class', style.uiRow);
    volumeRenderingRow1.className += ` ${viewerDOMId}-volumeRendering1 ${viewerDOMId}-toggle`;
    createUseShadowToggle(
      viewerStore,
      volumeRenderingRow1,
    );
    createGradientOpacitySlider(
      viewerStore,
      volumeRenderingRow1,
    );
    imageUIGroup.appendChild(volumeRenderingRow1);

    const volumeRenderingRow2 = document.createElement('div');
    volumeRenderingRow2.setAttribute('class', style.uiRow);
    volumeRenderingRow2.className += ` ${viewerDOMId}-volumeRendering2 ${viewerDOMId}-toggle`;
    createViewPlanesToggle(
      viewerStore,
      imageUIGroup,
      volumeRenderingRow2,
    );
    createSampleDistanceSlider(
      viewerStore,
      volumeRenderingRow2,
    );
    createBlendModeSelector(
      viewerStore,
      volumeRenderingRow2,
    );
    imageUIGroup.appendChild(volumeRenderingRow2);

    reaction(() => { return viewerStore.mainUI.viewMode; },
      (viewMode) => {
        switch(viewMode) {
        case 'XPlane':
        case 'YPlane':
        case 'ZPlane':
          volumeRenderingRow1.style.display = 'none';
          volumeRenderingRow2.style.display = 'none';
          break;
        case 'VolumeRendering':
          volumeRenderingRow1.style.display = 'flex';
          volumeRenderingRow2.style.display = 'flex';
          break;
        default:
          console.error('Invalid view mode: ' + viewMode);
        }
      }
    )

    reaction(() => { return viewerStore.imageUI.blendMode; },
      (blendMode) => {
        switch(blendMode) {
        case 0:
          volumeRenderingRow1.style.display = 'flex';
          break;
        case 1:
        case 2:
        case 3:
          volumeRenderingRow1.style.display = 'none';
          break;
        default:
          console.error('Invalid blend mode: ' + blendMode);
        }
      }
    )

    createPlaneIndexSliders(
      viewerStore,
      imageUIGroup,
    );
  }

  viewerStore.mainUI.uiContainer.appendChild(imageUIGroup);
}

export default createImageUI;
