import style from './ItkVtkViewer.module.css'

import createResetCameraButton from './Main/createResetCameraButton'

function createMainUI(rootContainer, store, use2D, uiContainer) {
  if (!uiContainer) {
    uiContainer = document.createElement('div')
    rootContainer.appendChild(uiContainer)
  }
  store.mainUI.uiContainer = uiContainer
  uiContainer.setAttribute('class', style.uiContainer)

  const mainUIGroup = document.createElement('div')
  mainUIGroup.setAttribute('class', style.uiGroup)

  const mainUIRow1 = document.createElement('div')
  mainUIRow1.setAttribute('class', style.mainUIRow)
  mainUIRow1.className += ` ${store.id}-collapsible`
  mainUIGroup.appendChild(mainUIRow1)

  const mainUIRow2 = document.createElement('div')
  mainUIRow2.setAttribute('class', style.mainUIRow)
  mainUIRow2.className += ` ${store.id}-collapsible`
  if (!use2D) {
    createResetCameraButton(store, mainUIRow2)
    mainUIGroup.appendChild(mainUIRow2)
  } else {
    createResetCameraButton(store, mainUIRow1)
  }

  uiContainer.appendChild(mainUIGroup)
}

export default createMainUI
