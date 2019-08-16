import style from '../ItkVtkViewer.module.css';

import screenshotIcon from '../icons/screenshot.svg';

function createScreenshotButton(
  viewerStore,
  contrastSensitiveStyle,
  mainUIRow
) {
  const screenshotButton = document.createElement('div');
  screenshotButton.innerHTML = `<div itk-vtk-tooltip itk-vtk-tooltip-top-screenshot itk-vtk-tooltip-content="Screenshot" class="${
    contrastSensitiveStyle.invertibleButton
  } ${style.screenshotButton}">${screenshotIcon}</div>`;
  function takeScreenshot() {
    viewerStore.itkVtkView.openCaptureImage();
  }
  screenshotButton.addEventListener('click', takeScreenshot);
  mainUIRow.appendChild(screenshotButton);
}

export default createScreenshotButton;
