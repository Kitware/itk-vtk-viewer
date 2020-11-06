import style from '../ItkVtkViewer.module.css'

function createLayersInterface(context) {
  const layersUIGroup = document.createElement('div')
  layersUIGroup.setAttribute('class', style.uiGroup)

  const layersUIRow1 = document.createElement('div')
  layersUIRow1.setAttribute('class', style.layersUIRow)
  layersUIRow1.className += ` ${context.id}-collapsible`
  layersUIGroup.appendChild(layersUIRow1)

  context.uiContainer.appendChild(layersUIGroup)
}

export default createLayersInterface
