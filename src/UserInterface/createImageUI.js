import { reaction } from 'mobx';

import style from './ItkVtkViewer.module.css';

import createColorRangeInput from './Image/createColorRangeInput';
import createBlendModeSelector from './Image/createBlendModeSelector';
import createComponentSelector from './Image/createComponentSelector';
import createTransferFunctionWidget from './Image/createTransferFunctionWidget';
import createViewPlanesToggle from './Image/createViewPlanesToggle';
import createUseShadowToggle from './Image/createUseShadowToggle';
import createPlaneIndexSliders from './Image/createPlaneIndexSliders';
import createSampleDistanceSlider from './Image/createSampleDistanceSlider';
import createGradientOpacitySlider from './Image/createGradientOpacitySlider';
import createLabelMapColorWidget from './Image/createLabelMapColorWidget';
import createDistanceButton from './Image/createDistanceButton';

function createImageUI(
  store,
  use2D
) {
  const viewerDOMId = store.id;

  const imageUIGroup = document.createElement('div');
  imageUIGroup.setAttribute('class', style.uiGroup);

  const componentSelector = createComponentSelector(
    store,
    imageUIGroup,
  );

  const haveImage = !!store.imageUI.image;

  if (haveImage) {
    const dataArray = store.imageUI.image.getPointData().getScalars();
    const components = store.imageUI.numberOfComponents;

    // If not a 2D RGB image
    if (!(dataArray.getDataType() !== 'Uint8Array' && (components === 3 || components === 4))) {
      const colorRangeInputRow = document.createElement('div');
      colorRangeInputRow.setAttribute('class', style.uiRow);
      createColorRangeInput(
        store,
        colorRangeInputRow
      );
      colorRangeInputRow.className += ` ${viewerDOMId}-toggle`;
      imageUIGroup.appendChild(colorRangeInputRow);
    }

    createTransferFunctionWidget(
      store,
      imageUIGroup,
      use2D
    );
  }


  if (!use2D && haveImage) {
    const volumeRenderingRow1 = document.createElement('div');
    volumeRenderingRow1.setAttribute('class', style.uiRow);
    volumeRenderingRow1.className += ` ${viewerDOMId}-volumeRendering1 ${viewerDOMId}-toggle`;
    createUseShadowToggle(
      store,
      volumeRenderingRow1,
    );
    createGradientOpacitySlider(
      store,
      volumeRenderingRow1,
    );
    imageUIGroup.appendChild(volumeRenderingRow1);

    const volumeRenderingRow2 = document.createElement('div');
    volumeRenderingRow2.setAttribute('class', style.uiRow);
    volumeRenderingRow2.className += ` ${viewerDOMId}-volumeRendering2 ${viewerDOMId}-toggle`;
    createViewPlanesToggle(
      store,
      imageUIGroup,
      volumeRenderingRow2,
    );
    createSampleDistanceSlider(
      store,
      volumeRenderingRow2,
    );
    createBlendModeSelector(
      store,
      volumeRenderingRow2,
    );
    imageUIGroup.appendChild(volumeRenderingRow2);

    // Put distance tools in their own row
    const volumeRenderingRow3 = document.createElement('div');
    volumeRenderingRow3.setAttribute('class', style.uiRow);
    volumeRenderingRow3.className += ` ${viewerDOMId}-volumeRendering3 ${viewerDOMId}-toggle`;
    volumeRenderingRow3.style.display = 'none';

    createDistanceButton(
      store,
      volumeRenderingRow3,
    )

    imageUIGroup.appendChild(volumeRenderingRow3);

    reaction(() => { return store.mainUI.viewMode; },
      (viewMode) => {
        switch(viewMode) {
        case 'XPlane':
        case 'YPlane':
        case 'ZPlane':
          volumeRenderingRow1.style.display = 'none';
          volumeRenderingRow2.style.display = 'none';
          volumeRenderingRow3.style.display = 'flex';
          break;
        case 'VolumeRendering':
          volumeRenderingRow1.style.display = 'flex';
          volumeRenderingRow2.style.display = 'flex';
          volumeRenderingRow3.style.display = 'none';
          break;
        default:
          console.error('Invalid view mode: ' + viewMode);
        }
      }
    )

    reaction(() => { return store.imageUI.blendMode; },
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

  }

  store.mainUI.uiContainer.appendChild(imageUIGroup);

  const haveLabelMap = !!store.imageUI.labelMap;
  if (haveLabelMap) {
    createLabelMapColorWidget(
      store,
      store.mainUI.uiContainer,
    );
  }

  if (!use2D) {
    createPlaneIndexSliders(
      store,
      store.mainUI.uiContainer,
    );
  }

}

export default createImageUI;
