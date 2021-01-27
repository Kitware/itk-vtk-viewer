import style from '../ItkVtkViewer.module.css'

function addLayerUIRow(context) {
  const layersUIRow = document.createElement('div')
  layersUIRow.setAttribute('class', style.layersUIRow)
  context.layers.layersUIGroup.appendChild(layersUIRow)
}

export default addLayerUIRow
