import style from '../ItkVtkViewer.module.css'

function createMainInterface(context) {
  const mainUIGroup = document.createElement('div')
  mainUIGroup.setAttribute('class', style.uiGroup)

  const mainUIRow1 = document.createElement('div')
  mainUIRow1.setAttribute('class', style.mainUIRow)
  mainUIRow1.className += ` ${context.id}-toggle`
  mainUIGroup.appendChild(mainUIRow1)
}

export default createMainInterface
