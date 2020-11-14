import style from '../ItkVtkViewer.module.css'

import addLayerUIRow from './addLayerUIRow'

function createLayersInterface(context) {
  const layersUIGroup = document.createElement('div')
  layersUIGroup.setAttribute('class', style.uiGroup)
  context.layers.layersUIGroup = layersUIGroup

  context.layers.layersUIRows = []
  addLayerUIRow(context)

  // row index -> layerUI array map
  context.layers.uiRowLayers = new Map()
  // layer name -> layerUI map
  context.layers.uiLayers = new Map()

  context.uiContainer.appendChild(layersUIGroup)
}

export default createLayersInterface
