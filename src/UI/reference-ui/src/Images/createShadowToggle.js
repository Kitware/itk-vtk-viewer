import style from '../ItkVtkViewer.module.css'
import applyContrastSensitiveStyleToElement from '../applyContrastSensitiveStyleToElement'

import { shadowIconDataUri } from 'itk-viewer-icons'

function createShadowToggle(context, uiContainer) {
  const shadowButton = document.createElement('div')
  shadowButton.innerHTML = `<input id="${context.id}-toggleShadowButton" type="checkbox" class="${style.toggleInput}" checked><label itk-vtk-tooltip itk-vtk-tooltip-top-screenshot itk-vtk-tooltip-content="Use shadow" class="${style.shadowButton} ${style.toggleButton}" for="${context.id}-toggleShadowButton"><img src="${shadowIconDataUri}" alt="shadow" /></label>`
  const shadowButtonInput = shadowButton.children[0]
  const shadowButtonLabel = shadowButton.children[1]
  applyContrastSensitiveStyleToElement(
    context,
    'invertibleButton',
    shadowButtonLabel
  )
  context.images.shadowButtonLabel = shadowButtonLabel
  context.images.shadowButtonInput = shadowButtonInput

  shadowButton.addEventListener('change', event => {
    event.preventDefault()
    event.stopPropagation()
    context.service.send({
      type: 'TOGGLE_IMAGE_SHADOW',
      data: context.images.selectedName,
    })
  })
  uiContainer.appendChild(shadowButton)
}

export default createShadowToggle
