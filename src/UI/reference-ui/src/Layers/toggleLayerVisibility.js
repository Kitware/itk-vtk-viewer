import applyGroupVisibility from '../applyGroupVisibility'

function toggleLayerVisibility(context, event) {
  const layers = context.layers
  const name = event.data
  const actorContext = layers.actorContext.get(name)
  const visible = actorContext.visible

  const layerEntry = context.layers.uiLayers.get(name)
  const visibleButton = layerEntry.children[0]
  const invisibleButton = layerEntry.children[1]
  if (visible) {
    visibleButton.style.display = 'flex'
    invisibleButton.style.display = 'none'
  } else {
    visibleButton.style.display = 'none'
    invisibleButton.style.display = 'flex'
    switch (actorContext.type) {
      case 'image':
        applyGroupVisibility(context, ['images'], false)
        break
      case 'labelImage':
        applyGroupVisibility(
          context,
          ['labelImages', 'labelImageWeights'],
          false
        )
        break
      default:
        console.error(`Unsupported layer type: ${type}`)
    }
  }
}

export default toggleLayerVisibility
