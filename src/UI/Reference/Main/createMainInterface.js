import style from '../ItkVtkViewer.module.css'

import createScreenshotButton from './createScreenshotButton'

function createMainInterface(context) {
  const mainUIGroup = document.createElement('div')
  mainUIGroup.setAttribute('class', style.uiGroup)

  const mainUIRow1 = document.createElement('div')
  mainUIRow1.setAttribute('class', style.mainUIRow)
  mainUIRow1.className += ` ${context.id}-collapsible`
  mainUIGroup.appendChild(mainUIRow1)

  createScreenshotButton(context, mainUIRow1)

  context.uiContainer.appendChild(mainUIGroup)
}

export default createMainInterface
