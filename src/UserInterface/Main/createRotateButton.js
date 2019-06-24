import style from '../ItkVtkViewer.module.css';

import rotateIcon from '../icons/rotate.svg';

function createRotateButton(
  viewerDOMId,
  contrastSensitiveStyle,
  view,
  mainUIRow
) {
  const rotateButton = document.createElement('div');
  rotateButton.innerHTML = `<input id="${viewerDOMId}-toggleRotateButton" type="checkbox" class="${
    style.toggleInput
  }"><label itk-vtk-tooltip itk-vtk-tooltip-top-rotate itk-vtk-tooltip-content="Rotate in 3D" class="${
    contrastSensitiveStyle.invertibleButton
  } ${style.rotateButton} ${
    style.toggleButton
  }" for="${viewerDOMId}-toggleRotateButton">${rotateIcon}</label>`;
  const rotateButtonInput = rotateButton.children[0];
  function toggleRotate() {
    const rotateEnabled = rotateButtonInput.checked;
    view.setRotate(rotateEnabled);
  }
  rotateButton.addEventListener('change', (event) => {
    toggleRotate();
  });
  mainUIRow.appendChild(rotateButton);
}

export default createRotateButton;
