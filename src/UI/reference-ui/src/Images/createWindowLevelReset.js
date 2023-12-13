import style from '../ItkVtkViewer.module.css'
import applyContrastSensitiveStyleToElement from '../applyContrastSensitiveStyleToElement'

import { resetImageIconDataUri } from '@itk-viewer/icons'

function createWindowLevelReset(context, uiContainer) {
  const windowLevelResetButton = document.createElement('div')
  windowLevelResetButton.innerHTML = `
    <div itk-vtk-tooltip itk-vtk-tooltip-left itk-vtk-tooltip-content="Reset range to ROI" class="${style.windowLevelButton}">
      <img src="${resetImageIconDataUri}" alt="gradient opacity"/>
    </div>
  `
  const windowLevelResetButtonInput = windowLevelResetButton.children[0]
  const windowLevelResetButtonLabel = windowLevelResetButton.children[1]
  applyContrastSensitiveStyleToElement(
    context,
    'invertibleButton',
    windowLevelResetButtonLabel
  )
  context.images.windowLevelResetButtonLabel = windowLevelResetButtonLabel
  context.images.windowLevelResetButtonInput = windowLevelResetButtonInput

  windowLevelResetButton.addEventListener('click', event => {
    event.preventDefault()
    event.stopPropagation()
    context.service.send({
      type: 'IMAGE_COLOR_RANGE_RESET',
      data: {
        name: context.images.selectedName,
      },
    })
  })
  uiContainer.appendChild(windowLevelResetButton)
}

export default createWindowLevelReset
