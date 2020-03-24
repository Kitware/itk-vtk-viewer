import style from '../ItkVtkViewer.module.css'

import screenshotIcon from '../icons/screenshot.svg'
import applyContrastSensitiveStyle from '../applyContrastSensitiveStyle'

function createScreenshotButton(store, mainUIRow) {
  const screenshotButton = document.createElement('div')
  screenshotButton.innerHTML = `<input id="${store.d}-screenshotButton" type="checkbox" checked class="${style.toggleInput}"><label itk-vtk-tooltip itk-vtk-tooltip-top-annotation itk-vtk-tooltip-content="Screenshot" class="${style.screenshotButton} ${style.toggleButton}" for="${store.id}-screenshotButton">${screenshotIcon}</label>`
  const screenshotButtonInput = screenshotButton.children[0]
  const screenshotLabel = screenshotButton.children[1]
  applyContrastSensitiveStyle(store, 'invertibleButton', screenshotLabel)

  function takeScreenshot() {
    store.itkVtkView.openCaptureImage()
    screenshotButton.checked = true
  }
  screenshotButton.addEventListener('click', takeScreenshot)
  mainUIRow.appendChild(screenshotButton)
}

export default createScreenshotButton
