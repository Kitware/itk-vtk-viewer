import style from '../ItkVtkViewer.module.css'

import { axesIconDataUri } from 'itk-viewer-icons'
import applyContrastSensitiveStyleToElement from '../applyContrastSensitiveStyleToElement'
import toggleAxes from './toggleAxes'

function createAxesButton(context, mainUIRow) {
  const axesButton = document.createElement('div')
  axesButton.innerHTML = `<input id="${context.id}-toggleAxesButton" type="checkbox" class="${style.toggleInput}"><label itk-vtk-tooltip itk-vtk-tooltip-top-axes itk-vtk-tooltip-content="Axes" class="${style.axesButton} ${style.toggleButton}" for="${context.id}-toggleAxesButton"><img src="${axesIconDataUri}" alt="axes"/></label>`
  const axesButtonInput = axesButton.children[0]
  const axesButtonLabel = axesButton.children[1]
  context.main.axesButtonLabel = axesButtonLabel
  context.main.axesButtonInput = axesButtonInput
  applyContrastSensitiveStyleToElement(
    context,
    'invertibleButton',
    axesButtonLabel
  )

  toggleAxes(context)

  axesButton.addEventListener('change', event => {
    event.preventDefault()
    event.stopPropagation()
    context.service.send('TOGGLE_AXES')
  })

  mainUIRow.appendChild(axesButton)
}

export default createAxesButton
