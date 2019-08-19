import { when, autorun } from 'mobx';

import style from '../ItkVtkViewer.module.css';

import interpolationIcon from '../icons/interpolation.svg';

function createInterpolationButton(
  viewerStore,
  contrastSensitiveStyle,
  mainUIRow
) {
  const interpolationButton = document.createElement('div');
  interpolationButton.innerHTML = `<input id="${viewerStore.id}-toggleInterpolationButton" type="checkbox" class="${
    style.toggleInput
  }" checked><label itk-vtk-tooltip itk-vtk-tooltip-top itk-vtk-tooltip-content="Interpolation" class="${
    contrastSensitiveStyle.invertibleButton
  } ${style.interpolationButton} ${
    style.toggleButton
  }" for="${viewerStore.id}-toggleInterpolationButton">${interpolationIcon}</label>`;
  function toggleInterpolation() {
    const interpolationEnabled = viewerStore.mainUI.interpolationEnabled;
    interpolationButton.checked = interpolationEnabled;
    viewerStore.itkVtkView.setPlanesUseLinearInterpolation(interpolationEnabled);
  }
  autorun(() => {
    toggleInterpolation();
  })
  interpolationButton.addEventListener('change',
    (event) => {
      event.preventDefault();
      event.stopPropagation();
      viewerStore.mainUI.interpolationEnabled = !viewerStore.mainUI.interpolationEnabled;
    }
  );
  mainUIRow.appendChild(interpolationButton);

  if (!!!viewerStore.imageUI.representationProxy) {
    interpolationButton.style.display = 'none';
    when(() => !!viewerStore.image,
      () => interpolationButton.style.display = 'flex'
    )
  }
}

export default createInterpolationButton;
