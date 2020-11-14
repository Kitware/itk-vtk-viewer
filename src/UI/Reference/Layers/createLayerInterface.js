function createLayerUI() {}

function createLayerInterface(context, event) {
  const name = context.layers.lastAddedData.name
  const layer = context.layers.actorContext.get(name)

  let layerUI = null
  const numRows = context.layers.layersUIRows.length
  const rowLayers = context.layers.uiRowLayers
  for (let row = 0; row < numRows; row++) {
    if (rowLayers.has(row) && rowLayers.get(row).size < 3) {
      const layers = rowLayers.get(row)
      layerUI = createLayerUI()
    }
  }
  if (!!!layerUI) {
    // addLayerUIRow
    // createLayerUI
  }
}

export default createLayerInterface
