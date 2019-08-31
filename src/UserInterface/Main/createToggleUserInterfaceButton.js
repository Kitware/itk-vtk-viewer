import { autorun } from 'mobx';

import style from '../ItkVtkViewer.module.css';

import toggleIcon from '../icons/toggle.svg';

function createToggleUserInterfaceButton(
  viewerStore,
  contrastSensitiveStyle,
) {
  const toggleUserInterfaceButton = document.createElement('div');
  function toggleUIVisibility() {
    const elements = viewerStore.mainUI.uiContainer.querySelectorAll(`.${viewerStore.id}-toggle`);
    let count = elements.length;
    const collapsed = viewerStore.mainUI.collapsed;
    if (collapsed) {
      while (count--) {
        elements[count].style.display = 'none';
      }
    } else {
      while (count--) {
        elements[count].style.display = 'flex';
      }
    }
  }
  toggleUserInterfaceButton.className = `${
    contrastSensitiveStyle.invertibleButton
  } ${style.toggleUserInterfaceButton}`;
  toggleUserInterfaceButton.id = `${viewerStore.id}-toggleUserInterfaceButton`;
  toggleUserInterfaceButton.innerHTML = `${toggleIcon}`;
  toggleUserInterfaceButton.addEventListener('click',
    (event) => {
      event.preventDefault();
      event.stopPropagation();
      viewerStore.mainUI.collapsed = !viewerStore.mainUI.collapsed;
    }
  );
  autorun(() => {
    toggleUIVisibility();
  })
  viewerStore.mainUI.uiContainer.appendChild(toggleUserInterfaceButton);
}

export default createToggleUserInterfaceButton
