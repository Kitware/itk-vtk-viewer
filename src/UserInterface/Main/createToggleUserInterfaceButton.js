import style from '../ItkVtkViewer.module.css';

import toggleIcon from '../icons/toggle.svg';

function createToggleUserInterfaceButton(
  viewerStore,
  contrastSensitiveStyle,
) {
  const toggleUserInterfaceButton = document.createElement('div');
  function toggleUIVisibility() {
    const elements = viewerStore.uiContainer.querySelectorAll(`.${viewerStore.id}-toggle`);
    let count = elements.length;
    const collapsed =
      toggleUserInterfaceButton.getAttribute('collapsed') === 'true';
    if (collapsed) {
      while (count--) {
        elements[count].style.display = 'flex';
      }
      toggleUserInterfaceButton.removeAttribute('collapsed');
    } else {
      while (count--) {
        elements[count].style.display = 'none';
      }
      toggleUserInterfaceButton.setAttribute('collapsed', 'true');
    }
  }
  toggleUserInterfaceButton.className = `${
    contrastSensitiveStyle.invertibleButton
  } ${style.toggleUserInterfaceButton}`;
  toggleUserInterfaceButton.id = `${viewerStore.id}-toggleUserInterfaceButton`;
  toggleUserInterfaceButton.innerHTML = `${toggleIcon}`;
  toggleUserInterfaceButton.addEventListener('click', toggleUIVisibility);
  viewerStore.uiContainer.appendChild(toggleUserInterfaceButton);
}

export default createToggleUserInterfaceButton
