import style from '../ItkVtkViewer.module.css'

import rotateIcon from '.././Icons/rotate.svg'
import applyContrastSensitiveStyleToElement from '../applyContrastSensitiveStyleToElement'
import toggleRotate from './toggleRotate'

function createRotateButton(context, mainUIRow) {
  const rotateButton = document.createElement('div')
  rotateButton.innerHTML = `<input id="${context.id}-toggleRotateButton" type="checkbox" class="${style.toggleInput}"><label itk-vtk-tooltip itk-vtk-tooltip-top-fullscreen itk-vtk-tooltip-content="Spin in 3D [p]" class="${style.rotateButton} ${style.toggleButton}" for="${context.id}-toggleRotateButton">${rotateIcon}</label>`
  const rotateButtonInput = rotateButton.children[0]
  const rotateButtonLabel = rotateButton.children[1]
  context.main.rotateButtonLabel = rotateButtonLabel
  context.main.rotateButtonInput = rotateButtonInput
  applyContrastSensitiveStyleToElement(
    context,
    'invertibleButton',
    rotateButtonLabel
  )

  toggleRotate(context)
  rotateButton.addEventListener('change', event => {
    event.preventDefault()
    event.stopPropagation()
    context.service.send('TOGGLE_ROTATE')
  })

  mainUIRow.appendChild(rotateButton)
}

export default createRotateButton
