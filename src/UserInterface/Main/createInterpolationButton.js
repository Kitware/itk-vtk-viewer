import { when } from 'mobx';

import style from '../ItkVtkViewer.module.css';

import interpolationIcon from '../icons/interpolation.svg';

function createInterpolationButton(
  viewerStore,
  viewerDOMId,
  contrastSensitiveStyle,
  mainUIRow
) {
  let interpolationEnabled = true;
  function toggleInterpolation() {
    interpolationEnabled = !interpolationEnabled;
    viewerStore.itkVtkView.setPlanesUseLinearInterpolation(interpolationEnabled);
  }
  const interpolationButton = document.createElement('div');
  interpolationButton.innerHTML = `<input id="${viewerDOMId}-toggleInterpolationButton" type="checkbox" class="${
    style.toggleInput
  }" checked><label itk-vtk-tooltip itk-vtk-tooltip-top itk-vtk-tooltip-content="Interpolation" class="${
    contrastSensitiveStyle.invertibleButton
  } ${style.interpolationButton} ${
    style.toggleButton
  }" for="${viewerDOMId}-toggleInterpolationButton">${interpolationIcon}</label>`;
  interpolationButton.addEventListener('change', (event) => {
    toggleInterpolation();
  });
  mainUIRow.appendChild(interpolationButton);

  if (!!viewerStore.imageRepresentationProxy) {
    interpolationButton.style.display = 'none';
    when(() => !!viewerStore.image,
      () => interpolationButton.style.display = 'flex'
    )
  }
}

export default createInterpolationButton;
