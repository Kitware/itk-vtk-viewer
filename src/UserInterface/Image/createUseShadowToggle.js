import { autorun } from 'mobx';

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
  const useShadowButtonInput = useShadowButton.children[0];
  function toggleUseShadow() {
    const useShadow = viewerStore.imageUI.useShadow;
    useShadowButtonInput.checked = useShadow;
    viewerStore.imageUI.representationProxy.setUseShadow(useShadow);
    viewerStore.renderWindow.render();
  }
  autorun(() => {
    toggleUseShadow();
  })
  useShadowButton.addEventListener('change', (event) => {
      event.preventDefault();
      event.stopPropagation();
      viewerStore.imageUI.useShadow = !viewerStore.imageUI.useShadow;
  });
  uiContainer.appendChild(useShadowButton);
}

export default createUseShadowToggle;
