import style from '../ItkVtkViewer.module.css'

import screenshotIcon from '../icons/screenshot.svg'
import applyContrastSensitiveStyle from '../applyContrastSensitiveStyle'

function createScreenshotButton(store, mainUIRow) {
  const screenshotButton = document.createElement('div')
  screenshotButton.innerHTML = `<input id="${store.d}-screenshotButton" type="checkbox" checked class="${style.toggleInput}"><label itk-vtk-tooltip itk-vtk-tooltip-top-annotation itk-vtk-tooltip-content="Screenshot" class="${style.screenshotButton} ${style.toggleButton}" for="${store.id}-screenshotButton">${screenshotIcon}</label>`
  const screenshotButtonInput = screenshotButton.children[0]
  const screenshotLabel = screenshotButton.children[1]
  applyContrastSensitiveStyle(store, 'invertibleButton', screenshotLabel)

  async function takeScreenshot() {
    const proxy = store.imageUI.representationProxy
    let mapper = null
    if (proxy) {
      mapper = proxy.getMapper()
      mapper.setAutoAdjustSampleDistances(false)
      mapper.setImageSampleDistance(0.1)
    }
    await store.itkVtkView.openCaptureImage()
    if (proxy) {
      mapper.setAutoAdjustSampleDistances(true)
    }
    screenshotButton.checked = true
  }
  screenshotButton.addEventListener('click', takeScreenshot)
  mainUIRow.appendChild(screenshotButton)
}

export default createScreenshotButton
