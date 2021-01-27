import style from './ItkVtkViewer.module.css'

import createCollapseUIButton from './createCollapseUIButton'

function createInterface(context) {
  if (!!!context.uiContainer) {
    const uiContainer = document.createElement('div')
    uiContainer.setAttribute('class', style.uiContainer)
    context.uiContainer = uiContainer
  }
  context.rootContainer.appendChild(context.uiContainer)
  if (!!!context.uiGroups) {
    // String to UI group element map
    context.uiGroups = new Map()
  }

  createCollapseUIButton(context)
}

export default createInterface
