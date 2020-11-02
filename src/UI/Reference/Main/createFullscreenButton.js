import style from '../ItkVtkViewer.module.css'

import fullscreenIcon from '../../Icons/fullscreen.svg'
import applyContrastSensitiveStyleToElement from '../applyContrastSensitiveStyleToElement'
import fullscreenMethods from '../fullscreenMethods'

function createFullscreenButton(context, mainUIRow) {
  if (fullscreenMethods) {
    const fullscreenButton = document.createElement('div')
    fullscreenButton.innerHTML = `<input id="${context.id}-toggleFullscreenButton" type="checkbox" class="${style.toggleInput}"><label itk-vtk-tooltip itk-vtk-tooltip-top-annotation itk-vtk-tooltip-content="Fullscreen[f]" class="${style.fullscreenButton} ${style.toggleButton}" for="${context.id}-toggleFullscreenButton">${fullscreenIcon}</label>`
    const fullscreenButtonInput = fullscreenButton.children[0]
    const fullscreenButtonLabel = fullscreenButton.children[1]
    applyContrastSensitiveStyleToElement(
      context,
      'invertibleButton',
      fullscreenButton
    )

    const container = context.rootContainer
    const oldWidth = container.style.width
    const oldHeight = container.style.height
    context.main.rootContainerOldWidth = container.style.width
    context.main.rootContainerOldHeight = container.style.height

    fullscreenButton.addEventListener('change', event => {
      event.preventDefault()
      event.stopPropagation()
      context.service.send('TOGGLE_FULLSCREEN')
    })

    document.addEventListener(fullscreenMethods[2], event => {
      if (!document[fullscreenMethods[3]]) {
        context.service.send('DISABLE_FULLSCREEN')
      }
    })

    context.main.fullscreenButton = fullscreenButton
    mainUIRow.appendChild(fullscreenButton)
  }
}

export default createFullscreenButton
