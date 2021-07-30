import style from '../ItkVtkViewer.module.css'

import { resetCameraIconDataUri } from '../../../icons/dist/index.js'
import applyContrastSensitiveStyleToElement from '../applyContrastSensitiveStyleToElement'

function createResetCameraButton(context, mainUIRow) {
  const viewerDOMId = context.id
  const resetCameraButton = document.createElement('div')
  resetCameraButton.innerHTML = `<input id="${viewerDOMId}-resetCameraButton" type="checkbox" class="${style.toggleInput}" checked><label itk-vtk-tooltip itk-vtk-tooltip-top itk-vtk-tooltip-content="Reset camera [r]" class="${style.resetCameraButton} ${style.toggleButton}" for="${viewerDOMId}-resetCameraButton"><img src="${resetCameraIconDataUri}" alt="reset camera" /></label>`
  const resetCameraButtonLabel = resetCameraButton.children[1]
  context.main.resetCameraButtonLabel = resetCameraButtonLabel
  applyContrastSensitiveStyleToElement(
    context,
    'invertibleButton',
    resetCameraButtonLabel
  )

  resetCameraButton.addEventListener('change', event => {
    event.preventDefault()
    event.stopPropagation()
    context.service.send('RESET_CAMERA')
  })
  resetCameraButton.addEventListener('click', event => {
    event.preventDefault()
    event.stopPropagation()
    context.service.send('RESET_CAMERA')
  })
  mainUIRow.appendChild(resetCameraButton)
}

export default createResetCameraButton
