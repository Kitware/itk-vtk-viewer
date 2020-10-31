import style from './ItkVtkViewer.module.css'

import createCollapseUIButton from './createCollapseUIButton'

function createInterface(context) {
  const uiContainer = document.createElement('div')
  uiContainer.setAttribute('class', style.uiContainer)
  context.uiContainer = uiContainer
  context.rootContainer.appendChild(uiContainer)
}

export default createInterface
