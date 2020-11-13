function updateLayerInterface(context, event) {
  const name = event.data
  const layer = context.layers.layers.get(name)

  let layerUI = null
  const numRows = context.layers.layersUIRows.length
  const rowLayers = context.layers.uiRowLayers
  for (let row = 0; row < numRows; row++) {
    if (rowLayers.has(row)) {
      const layers = rowLayers.get(row)
      const matchingUILayers = layers.filter(l => l.name === name)
      if (matchingUILayers.length > 0) {
        layerUI = matchingUILayers[0]
        break
      }
    }
  }
  if (layerUI) {
    // Todo: update visibility, icon(?)
  }

  console.log(layer)
}

export default updateLayerInterface
