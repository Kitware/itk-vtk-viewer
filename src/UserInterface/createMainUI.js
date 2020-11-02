import style from './ItkVtkViewer.module.css'

import createScreenshotButton from './Main/createScreenshotButton'
import createFullscreenButton from './Main/createFullscreenButton'
import createRotateButton from './Main/createRotateButton'
import createAnnotationButton from './Main/createAnnotationButton'
import createAxesButton from './Main/createAxesButton'
import createInterpolationButton from './Main/createInterpolationButton'
import createViewModeButtons from './Main/createViewModeButtons'
import createCroppingButtons from './Main/createCroppingButtons'
import createResetCameraButton from './Main/createResetCameraButton'
import createBackgroundColorButton from './Main/createBackgroundColorButton'

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

  createScreenshotButton(store, mainUIRow1)
  createFullscreenButton(store, rootContainer, mainUIRow1)
  if (!use2D) {
    createRotateButton(store, mainUIRow1)
  }
  createAnnotationButton(store, mainUIRow1)
  createAxesButton(store, mainUIRow1)
  createInterpolationButton(store, mainUIRow1)
  createBackgroundColorButton(store, mainUIRow1)

  const mainUIRow2 = document.createElement('div')
  mainUIRow2.setAttribute('class', style.mainUIRow)
  mainUIRow2.className += ` ${store.id}-collapsible`
  if (!use2D) {
    createCroppingButtons(store, mainUIRow2)
    createViewModeButtons(store, mainUIRow2)
    createResetCameraButton(store, mainUIRow2)
    mainUIGroup.appendChild(mainUIRow2)
  } else {
    createCroppingButtons(store, mainUIRow1)
    createResetCameraButton(store, mainUIRow1)
  }

  uiContainer.appendChild(mainUIGroup)
}

export default createMainUI
