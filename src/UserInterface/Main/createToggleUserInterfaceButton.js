import { autorun } from 'mobx';

import style from '../ItkVtkViewer.module.css';

import toggleIcon from '../icons/toggle.svg';

function createToggleUserInterfaceButton(
  store,
  contrastSensitiveStyle,
) {
  const toggleUserInterfaceButton = document.createElement('div');
  function toggleUIVisibility() {
    const elements = store.mainUI.uiContainer.querySelectorAll(`.${store.id}-toggle`);
    let count = elements.length;
    const collapsed = store.mainUI.collapsed;
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
  toggleUserInterfaceButton.id = `${store.id}-toggleUserInterfaceButton`;
  toggleUserInterfaceButton.innerHTML = `${toggleIcon}`;
  toggleUserInterfaceButton.addEventListener('click',
    (event) => {
      event.preventDefault();
      event.stopPropagation();
      store.mainUI.collapsed = !store.mainUI.collapsed;
    }
  );
  autorun(() => {
    toggleUIVisibility();
  })
  store.mainUI.uiContainer.appendChild(toggleUserInterfaceButton);
}

export default createToggleUserInterfaceButton
