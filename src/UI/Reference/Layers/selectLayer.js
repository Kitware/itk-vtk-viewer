function selectLayer(context, event) {
  const name = event.data

  const layerEntry = context.layers.uiLayers.get(name)
  layerEntry.style.borderWidth = '3px'

  const type = context.layers.actorContext.get(name).type
  context.layers.actorContext.forEach((layerName, ac) => {
    if (layerName !== name && ac.type === type) {
      const entry = context.layers.uiLayers.get(layerName)
      entry.style.borderWidth = '2px'
    }
  })
}

export default selectLayer
