import { when, autorun } from 'mobx';

import style from '../ItkVtkViewer.module.css';

import interpolationIcon from '../icons/interpolation.svg';

function createInterpolationButton(
  store,
  contrastSensitiveStyle,
  mainUIRow
) {
  const interpolationButton = document.createElement('div');
  interpolationButton.innerHTML = `<input id="${store.id}-toggleInterpolationButton" type="checkbox" class="${
    style.toggleInput
  }" checked><label itk-vtk-tooltip itk-vtk-tooltip-top itk-vtk-tooltip-content="Interpolation" class="${
    contrastSensitiveStyle.invertibleButton
  } ${style.interpolationButton} ${
    style.toggleButton
  }" for="${store.id}-toggleInterpolationButton">${interpolationIcon}</label>`;
  function toggleInterpolation() {
    const interpolationEnabled = store.mainUI.interpolationEnabled;
    interpolationButton.checked = interpolationEnabled;
    store.itkVtkView.setPlanesUseLinearInterpolation(interpolationEnabled);
  }
  autorun(() => {
    toggleInterpolation();
  })
  interpolationButton.addEventListener('change',
    (event) => {
      event.preventDefault();
      event.stopPropagation();
      store.mainUI.interpolationEnabled = !store.mainUI.interpolationEnabled;
    }
  );
  mainUIRow.appendChild(interpolationButton);

  if (!!!store.imageUI.representationProxy) {
    interpolationButton.style.display = 'none';
    when(() => !!store.imageUI.image,
      () => interpolationButton.style.display = 'inline'
    )
  }
}

export default createInterpolationButton;
