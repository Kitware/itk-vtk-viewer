import getContrastSensitiveStyle from '../getContrastSensitiveStyle';

import style from '../ItkVtkViewer.module.css';

import shadowIcon from '../icons/shadow.svg';

function createUseShadowToggle(
  viewerStore,
  uiContainer,
) {
  const contrastSensitiveStyle = getContrastSensitiveStyle(
    ['invertibleButton'],
    viewerStore.isBackgroundDark
  );

  const useShadowButton = document.createElement('div');
  useShadowButton.innerHTML = `<input id="${viewerStore.id}-toggleShadowButton" type="checkbox" class="${
    style.toggleInput
  }" checked><label itk-vtk-tooltip itk-vtk-tooltip-top-annotation itk-vtk-tooltip-content="Use shadow" class="${
    contrastSensitiveStyle.invertibleButton
  } ${style.shadowButton} ${
    style.toggleButton
  }" for="${viewerStore.id}-toggleShadowButton">${shadowIcon}</label>`;
  let useShadow = true;
  useShadowButton.addEventListener('change', (event) => {
    useShadow = !useShadow;
    viewerStore.imageUI.representationProxy.setUseShadow(useShadow);
    viewerStore.renderWindow.render();
  });
  uiContainer.appendChild(useShadowButton);
}

export default createUseShadowToggle;
