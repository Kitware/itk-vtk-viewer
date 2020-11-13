import style from '../ItkVtkViewer.module.css'

import addLayerUIRow from './addLayerUIRow'

function createLayersInterface(context) {
  const layersUIGroup = document.createElement('div')
  layersUIGroup.setAttribute('class', style.uiGroup)
  context.layers.layersUIGroup = layersUIGroup

  context.layers.layersUIRows = []
  addLayerUIRow(context)

  context.layers.uiRowLayers = new Map()

  context.uiContainer.appendChild(layersUIGroup)
}

export default createLayersInterface
