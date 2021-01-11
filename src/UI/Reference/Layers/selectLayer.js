const selectedBorderWidth = '3px'
const unselectedBorderWidth = '2px'

function selectLayer(context, event) {
  const name = event.data

  const layerEntry = context.layers.uiLayers.get(name)
  layerEntry.style.borderWidth = selectedBorderWidth

  const type = context.layers.actorContext.get(name).type
  context.layers.actorContext.forEach((ac, layerName) => {
    if (layerName !== name && ac.type === type) {
      const entry = context.layers.uiLayers.get(layerName)
      entry.style.borderWidth = unselectedBorderWidth
    }
  })
}

export default selectLayer
