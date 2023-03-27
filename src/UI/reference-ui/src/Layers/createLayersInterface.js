import style from '../ItkVtkViewer.module.css'
import { makeHtml } from '../utils'

function createLayersInterface(context) {
  const layersUIGroup = makeHtml(`
    <div class="${style.uiGroup} ${style.uiRow} ${style.layers}"></div>
  `)
  context.layers.layersUIGroup = layersUIGroup
  context.uiGroups.set('layers', layersUIGroup)
  context.uiContainer.appendChild(layersUIGroup)

  // layer name -> layerEntry map
  context.layers.uiLayers = new Map()

  const compareContainer = document.createElement('div')
  compareContainer.setAttribute('class', style.uiGroup)
  context.uiContainer.appendChild(compareContainer)
  context.layers.compareContainer = compareContainer
}

export default createLayersInterface
