import { autorun } from 'mobx';

import getContrastSensitiveStyle from '../getContrastSensitiveStyle';

import style from '../ItkVtkViewer.module.css';

import shadowIcon from '../icons/shadow.svg';

function createUseShadowToggle(
  store,
  uiContainer,
) {
  const contrastSensitiveStyle = getContrastSensitiveStyle(
    ['invertibleButton'],
    store.isBackgroundDark
  );

  const useShadowButton = document.createElement('div');
  useShadowButton.innerHTML = `<input id="${store.id}-toggleShadowButton" type="checkbox" class="${
    style.toggleInput
  }" checked><label itk-vtk-tooltip itk-vtk-tooltip-top-annotation itk-vtk-tooltip-content="Use shadow" class="${
    contrastSensitiveStyle.invertibleButton
  } ${style.shadowButton} ${
    style.toggleButton
  }" for="${store.id}-toggleShadowButton">${shadowIcon}</label>`;
  const useShadowButtonInput = useShadowButton.children[0];
  function toggleUseShadow() {
    const useShadow = store.imageUI.useShadow;
    useShadowButtonInput.checked = useShadow;
    store.imageUI.representationProxy.setUseShadow(useShadow);
    store.renderWindow.render();
  }
  autorun(() => {
    toggleUseShadow();
  })
  useShadowButton.addEventListener('change', (event) => {
      event.preventDefault();
      event.stopPropagation();
      store.imageUI.useShadow = !store.imageUI.useShadow;
  });
  uiContainer.appendChild(useShadowButton);
}

export default createUseShadowToggle;
