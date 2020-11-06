import style from '../ItkVtkViewer.module.css'

import createScreenshotButton from './createScreenshotButton'
import createFullscreenButton from './createFullscreenButton'
import createRotateButton from './createRotateButton'
import createAnnotationsButton from './createAnnotationsButton'
import createAxesButton from './createAxesButton'
import createInterpolationButton from './createInterpolationButton'
import createBackgroundColorButton from './createBackgroundColorButton'
import createCroppingButtons from './createCroppingButtons'
import createViewModeButtons from './createViewModeButtons'
import createResetCameraButton from './createResetCameraButton'

function createMainInterface(context) {
  const mainUIGroup = document.createElement('div')
  mainUIGroup.setAttribute('class', style.uiGroup)

  const mainUIRow1 = document.createElement('div')
  mainUIRow1.setAttribute('class', style.mainUIRow)
  mainUIRow1.className += ` ${context.id}-collapsible`
  mainUIGroup.appendChild(mainUIRow1)

  createScreenshotButton(context, mainUIRow1)
  createFullscreenButton(context, mainUIRow1)
  if (!context.use2D) {
    createRotateButton(context, mainUIRow1)
  }
  createAnnotationsButton(context, mainUIRow1)
  createAxesButton(context, mainUIRow1)
  createInterpolationButton(context, mainUIRow1)

  createBackgroundColorButton(context, mainUIRow1)
  const mainUIRow2 = document.createElement('div')
  mainUIRow2.setAttribute('class', style.mainUIRow)
  mainUIRow2.className += ` ${context.id}-collapsible`

  if (context.use2D) {
    createCroppingButtons(context, mainUIRow1)
    createViewModeButtons(context, mainUIRow2)
    createResetCameraButton(context, mainUIRow1)
  } else {
    createCroppingButtons(context, mainUIRow2)
    createViewModeButtons(context, mainUIRow2)
    createResetCameraButton(context, mainUIRow2)
    mainUIGroup.appendChild(mainUIRow2)
  }

  context.uiContainer.appendChild(mainUIGroup)
}

export default createMainInterface
