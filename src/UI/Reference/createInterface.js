import style from './ItkVtkViewer.module.css'

import createCollapseUIButton from './createCollapseUIButton'

function createInterface(context) {
  if (!!!context.uiContainer) {
    const uiContainer = document.createElement('div')
    uiContainer.setAttribute('class', style.uiContainer)
    context.uiContainer = uiContainer
  }
  context.rootContainer.appendChild(context.uiContainer)

  createCollapseUIButton(context)
}

export default createInterface
