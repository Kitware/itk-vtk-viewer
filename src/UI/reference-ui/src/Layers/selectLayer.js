import applyGroupVisibility from '../applyGroupVisibility'

const selectedBorderWidth = '3px'
const unselectedBorderWidth = '2px'

function selectLayer(context, event) {
  const name = event.data
  const actorContext = context.layers.actorContext.get(name)

  const layerEntry = context.layers.uiLayers.get(name)
  layerEntry.style.borderWidth = selectedBorderWidth

  const type = actorContext.type
  context.layers.actorContext.forEach((ac, layerName) => {
    if (layerName !== name && ac.type === type) {
      const entry = context.layers.uiLayers.get(layerName)
      entry.style.borderWidth = unselectedBorderWidth
    }
  })

  if (!actorContext.visible) {
    context.service.send({
      type: 'TOGGLE_LAYER_VISIBILITY',
      data: name,
    })
  }

  if (!context.uiCollapsed) {
    const { imageActorContext } = actorContext
    switch (type) {
      case 'image':
        applyGroupVisibility(context, ['images'], true)
        if (imageActorContext.labelImageName) {
          applyGroupVisibility(
            context,
            ['labelImages', 'labelImageWeights'],
            true
          )
        }
        break
      case 'labelImage':
        if (actorContext.imageName) {
          applyGroupVisibility(context, ['images'], true)
        }
        applyGroupVisibility(
          context,
          ['labelImages', 'labelImageWeights'],
          true
        )
        break
      default:
        console.error(`Unsupported layer type: ${type}`)
    }
  }
}

export default selectLayer
