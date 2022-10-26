import style from './ItkVtkViewer.module.css'

import './collapse-ui'
import { setContext } from './context'

const makeElement = htmlString => {
  const template = document.createElement('template')
  template.innerHTML = htmlString
  return template.content.firstElementChild
}

function createInterface(context) {
  context.viewContainers = new Map()
  const viewContainer = document.createElement('div')
  viewContainer.className = `${style.viewContainer}`
  context.viewContainers.set('volume', viewContainer)
  context.rootContainer.appendChild(viewContainer)
  setContext(viewContainer, context)

  const viewport = document.createElement('div')
  viewContainer.appendChild(viewport)
  viewport.setAttribute('class', style.viewport)

  const container3d = context.renderingViewContainers.get('volume')
  viewport.appendChild(container3d)
  container3d.style.height = '100%'

  if (!context.uiContainer) {
    const uiContainer = document.createElement('div')
    uiContainer.setAttribute('class', style.uiContainer)
    context.uiContainer = uiContainer
    viewport.appendChild(uiContainer)
  } else {
    // if somehow already set (by non reference-ui from config obj?)
    viewport.appendChild(context.uiContainer)
  }

  if (!context.uiGroups) {
    // String to UI group element
    context.uiGroups = new Map()
  }

  const collapseUIButton = makeElement(`
    <collapse-ui />
  `)
  context.uiContainer.appendChild(collapseUIButton)
}

export default createInterface
