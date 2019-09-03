import style from '../ItkVtkViewer.module.css';

import screenshotIcon from '../icons/screenshot.svg';

function createScreenshotButton(
  store,
  contrastSensitiveStyle,
  mainUIRow
) {
  const screenshotButton = document.createElement('div');
  screenshotButton.innerHTML = `<input id="${store.d}-screenshotButton" type="checkbox" checked class="${
      style.toggleInput
    }"><label itk-vtk-tooltip itk-vtk-tooltip-top-annotation itk-vtk-tooltip-content="Screenshot" class="${
    contrastSensitiveStyle.invertibleButton
  } ${style.screenshotButton} ${style.toggleButton}" for="${store.id}-screenshotButton">${screenshotIcon}</label>`;
  const screenshotButtonInput = screenshotButton.children[0];
  function takeScreenshot() {
    store.itkVtkView.openCaptureImage();
    screenshotButton.checked = true;
  }
  screenshotButton.addEventListener('click', takeScreenshot);
  mainUIRow.appendChild(screenshotButton);
}

export default createScreenshotButton;
