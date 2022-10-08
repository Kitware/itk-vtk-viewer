import style from './ItkVtkViewer.module.css'

import createCollapseUIButton from './createCollapseUIButton'

function createInterface(context) {
  context.viewContainers = new Map()
  const viewContainer = document.createElement('div')
  viewContainer.className = `${style.viewContainer}`
  context.viewContainers.set('volume', viewContainer)
  context.rootContainer.appendChild(viewContainer)

  const viewport = document.createElement('div')
  viewContainer.appendChild(viewport)
  viewport.setAttribute('class', style.viewport)

  const container3d = context.renderingViewContainers.get('volume')
  viewport.appendChild(container3d)
  container3d.style.height = '100%'

  if (!context.uiContainer) {
    const uiContainerWrapper = document.createElement('div')
    uiContainerWrapper.setAttribute('class', style.uiContainerWrapper)
    viewport.appendChild(uiContainerWrapper)

    const uiContainer = document.createElement('div')
    uiContainer.setAttribute('class', style.uiContainer)
    context.uiContainer = uiContainer
    uiContainerWrapper.appendChild(uiContainer)
  } else {
    // if somehow already set (by non reference configured UI?)
    viewport.appendChild(context.uiContainer)
  }

  if (!context.uiGroups) {
    // String to UI group element map
    context.uiGroups = new Map()
  }

  createCollapseUIButton(context)
}

export default createInterface
