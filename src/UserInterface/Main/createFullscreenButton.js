import { reaction } from 'mobx';

import style from '../ItkVtkViewer.module.css';

import fullscreenIcon from '../icons/fullscreen.svg';

function createFullscreenButton(
  store,
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
    fullscreenButton.innerHTML = `<input id="${store.id}-toggleFullscreenButton" type="checkbox" class="${
      style.toggleInput
    }"><label itk-vtk-tooltip itk-vtk-tooltip-top-annotation itk-vtk-tooltip-content="Fullscreen[f]" class="${
      contrastSensitiveStyle.invertibleButton
    } ${style.fullscreenButton} ${
      style.toggleButton
    }" for="${store.id}-toggleFullscreenButton">${fullscreenIcon}</label>`;
    const fullscreenButtonInput = fullscreenButton.children[0];
    const container = rootContainer.children[0];
    const oldWidth = container.style.width;
    const oldHeight = container.style.height;
    function toggleFullscreen(fullscreenEnabled) {
      fullscreenButtonInput.checked = fullscreenEnabled;
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
    fullscreenButton.addEventListener('change',
      (event) => {
        event.preventDefault();
        event.stopPropagation();
        store.mainUI.fullscreenEnabled = !store.mainUI.fullscreenEnabled;
      }
    );
    reaction(() => store.mainUI.fullscreenEnabled,
      (fullscreenEnabled) => {
        toggleFullscreen(fullscreenEnabled);
      })
    document.addEventListener(fullScreenMethods[2], (event) => {
      if (!document[fullScreenMethods[3]]) {
        container.style.width = oldWidth;
        container.style.height = oldHeight;
        store.mainUI.fullscreenEnabled = false;
      }
    })
    mainUIRow.appendChild(fullscreenButton);
  }
}

export default createFullscreenButton;
