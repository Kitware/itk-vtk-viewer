import style from '../ItkVtkViewer.module.css'
import applyContrastSensitiveStyleToElement from '../applyContrastSensitiveStyleToElement'

import { windowingIconDataUri } from 'itk-viewer-icons'

function createWindowLevelToggle(context, uiContainer) {
  const windowLevelToggle = document.createElement('div')
  windowLevelToggle.innerHTML = `<input id="${context.id}-windowLevelToggle" type="checkbox" class="${style.toggleInput}"><label itk-vtk-tooltip itk-vtk-tooltip-left itk-vtk-tooltip-content="Toggle window/level interactor" class="${style.windowLevelButton} ${style.toggleButton}" for="${context.id}-windowLevelToggle"><img src="${windowingIconDataUri}" alt="Window/Level" /></label>`
  const windowLevelToggleInput = windowLevelToggle.children[0]
  const windowLevelToggleLabel = windowLevelToggle.children[1]
  applyContrastSensitiveStyleToElement(
    context,
    'invertibleButton',
    windowLevelToggleLabel
  )
  context.images.windowLevelToggleLabel = windowLevelToggleLabel
  context.images.windowLevelToggleInput = windowLevelToggleInput

  windowLevelToggle.addEventListener('click', event => {
    event.preventDefault()
    event.stopPropagation()
    const name = context.images.selectedName
    const actorContext = context.images.actorContext.get(name)
    context.service.send({
      type: 'WINDOW_LEVEL_TOGGLED',
      data: {
        name,
        component: actorContext.selectedComponent,
      },
    })
  })
  uiContainer.appendChild(windowLevelToggle)
}

export default createWindowLevelToggle
