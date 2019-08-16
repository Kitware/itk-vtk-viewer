import style from '../ItkVtkViewer.module.css';

import rotateIcon from '../icons/rotate.svg';

function createRotateButton(
  viewerStore,
  contrastSensitiveStyle,
  mainUIRow
) {
  const rotateButton = document.createElement('div');
  rotateButton.innerHTML = `<input id="${viewerStore.id}-toggleRotateButton" type="checkbox" class="${
    style.toggleInput
  }"><label itk-vtk-tooltip itk-vtk-tooltip-top-fullscreen itk-vtk-tooltip-content="Spin in 3D [p]" class="${
    contrastSensitiveStyle.invertibleButton
  } ${style.rotateButton} ${
    style.toggleButton
  }" for="${viewerStore.id}-toggleRotateButton">${rotateIcon}</label>`;
  const rotateButtonInput = rotateButton.children[0];
  function toggleRotate() {
    const rotateEnabled = rotateButtonInput.checked;
    viewerStore.itkVtkView.setRotate(rotateEnabled);
  }
  rotateButton.addEventListener('change', (event) => {
    toggleRotate();
  });
  mainUIRow.appendChild(rotateButton);
}

export default createRotateButton;
