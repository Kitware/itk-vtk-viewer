import style from '../ItkVtkViewer.module.css'

import selectColorIcon from '../../Icons/select-color.svg'
import applyContrastSensitiveStyleToElement from '../applyContrastSensitiveStyleToElement'

function createBackgroundColorButton(context, mainUIRow) {
  const viewerDOMId = context.id
  const bgColorButton = document.createElement('div')
  bgColorButton.innerHTML = `<input id="${viewerDOMId}-bgColorButton" type="checkbox" class="${style.toggleInput}" checked><label itk-vtk-tooltip itk-vtk-tooltip-top itk-vtk-tooltip-content="Toggle Background Color" class="${style.bgColorButton} ${style.toggleButton}" for="${viewerDOMId}-bgColorButton">${selectColorIcon}</label>`
  const bgColorButtonInput = bgColorButton.children[0]
  const bgColorButtonLabel = bgColorButton.children[1]
  context.main.bgColorButtonLabel = bgColorButtonLabel
  context.main.bgColorButtonInput = bgColorButtonInput
  applyContrastSensitiveStyleToElement(
    context,
    'invertibleButton',
    bgColorButtonLabel
  )

  bgColorButton.addEventListener('change', event => {
    event.preventDefault()
    event.stopPropagation()
    context.service.send('TOGGLE_BACKGROUND_COLOR')
  })
  bgColorButton.addEventListener('click', event => {
    event.preventDefault()
    event.stopPropagation()
    context.service.send('TOGGLE_BACKGROUND_COLOR')
  })
  mainUIRow.appendChild(bgColorButton)
}

export default createBackgroundColorButton
