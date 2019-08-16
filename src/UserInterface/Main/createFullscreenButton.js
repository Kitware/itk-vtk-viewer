import style from '../ItkVtkViewer.module.css';

import fullscreenIcon from '../icons/fullscreen.svg';

function createFullscreenButton(
  viewerStore,
  contrastSensitiveStyle,
  rootContainer,
  mainUIRow
) {
  const body = document.querySelector('body');
  let fullScreenMethods = null;
  // https://developer.mozilla.org/en-US/docs/Web/API/Fullscreen_API
  [
    ['requestFullscreen', 'exitFullscreen', 'fullscreenchange', 'fullscreen'],
    ['mozRequestFullScreen', 'mozCancelFullScreen', 'mozfullscreenchange', 'mozFullScreen'],
    ['msRequestFullscreen', 'msExitFullscreen', 'MSFullscreenChange', 'msFullscreenEnabled'],
    ['webkitRequestFullscreen', 'webkitExitFullscreen', 'webkitfullscreenchange', 'webkitIsFullScreen'],
  ].forEach((methods) => {
    if (body[methods[0]] && !fullScreenMethods) {
      fullScreenMethods = methods;
    }
  });

  if (fullScreenMethods) {
    const fullscreenButton = document.createElement('div');
    fullscreenButton.innerHTML = `<input id="${viewerStore.id}-toggleFullscreenButton" type="checkbox" class="${
      style.toggleInput
    }"><label itk-vtk-tooltip itk-vtk-tooltip-top-annotation itk-vtk-tooltip-content="Fullscreen[f]" class="${
      contrastSensitiveStyle.invertibleButton
    } ${style.fullscreenButton} ${
      style.toggleButton
    }" for="${viewerStore.id}-toggleFullscreenButton">${fullscreenIcon}</label>`;
    const fullscreenButtonInput = fullscreenButton.children[0];
    const container = rootContainer.children[0];
    const oldWidth = container.style.width;
    const oldHeight = container.style.height;
    function toggleFullscreen() {
      const fullscreenEnabled = fullscreenButtonInput.checked;
      if (fullscreenEnabled) {
        container.style.width = '100vw';
        container.style.height = '100vh';
        rootContainer[fullScreenMethods[0]]();
      } else {
        container.style.width = oldWidth;
        container.style.height = oldHeight;
        document[fullScreenMethods[1]]();
      }
    }
    fullscreenButton.addEventListener('change', (event) => {
      toggleFullscreen();
    });
    document.addEventListener(fullScreenMethods[2], (event) => {
      if (!document[fullScreenMethods[3]]) {
        container.style.width = oldWidth;
        container.style.height = oldHeight;
        fullscreenButtonInput.checked = false;
      }
    })
    mainUIRow.appendChild(fullscreenButton);
  }
}

export default createFullscreenButton;
