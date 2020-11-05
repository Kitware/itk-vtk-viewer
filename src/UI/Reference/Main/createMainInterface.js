import style from '../ItkVtkViewer.module.css'

import createScreenshotButton from './createScreenshotButton'
import createFullscreenButton from './createFullscreenButton'
import createRotateButton from './createRotateButton'
import createAnnotationsButton from './createAnnotationsButton'
import createAxesButton from './createAxesButton'

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

  context.uiContainer.appendChild(mainUIGroup)
}

export default createMainInterface
