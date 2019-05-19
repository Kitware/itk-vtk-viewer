import style from '../ItkVtkViewer.module.css';

import screenshotIcon from '../icons/screenshot.svg';

function createScreenshotButton(
  viewerDOMId,
  contrastSensitiveStyle,
  view,
  mainUIRow
) {
  const screenshotButton = document.createElement('div');
  screenshotButton.innerHTML = `<div itk-vtk-tooltip itk-vtk-tooltip-top-screenshot itk-vtk-tooltip-content="Screenshot" class="${
    contrastSensitiveStyle.invertibleButton
  } ${style.screenshotButton}">${screenshotIcon}</div>`;
  function takeScreenshot() {
    view.openCaptureImage();
  }
  screenshotButton.addEventListener('click', takeScreenshot);
  mainUIRow.appendChild(screenshotButton);
}

export default createScreenshotButton;
