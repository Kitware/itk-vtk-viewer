import style from '../ItkVtkViewer.module.css'

import addLayerUIRow from './addLayerUIRow'

function createLayersInterface(context) {
  const layersUIGroup = document.createElement('div')
  layersUIGroup.setAttribute('class', style.uiGroup)
  context.layers.layersUIGroup = layersUIGroup
  context.uiGroups.set('layers', layersUIGroup)

  // layer name -> layerEntry map
  context.layers.uiLayers = new Map()

  addLayerUIRow(context)

  context.uiContainer.appendChild(layersUIGroup)

  const compareContainer = document.createElement('div')
  compareContainer.setAttribute('class', style.uiGroup)
  context.uiContainer.appendChild(compareContainer)
  context.layers.compareContainer = compareContainer
}

export default createLayersInterface
