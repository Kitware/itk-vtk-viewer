import { autorun } from 'mobx';

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
    const rotateEnabled = viewerStore.mainUI.rotateEnabled;
    rotateButtonInput.checked = rotateEnabled;
    viewerStore.itkVtkView.setRotate(rotateEnabled);
  }
  autorun(() => {
    toggleRotate();
  })
  rotateButton.addEventListener('change',
    (event) => {
      event.preventDefault();
      event.stopPropagation();
      viewerStore.mainUI.rotateEnabled = !viewerStore.mainUI.rotateEnabled;
    }
  );
  mainUIRow.appendChild(rotateButton);
}

export default createRotateButton;
