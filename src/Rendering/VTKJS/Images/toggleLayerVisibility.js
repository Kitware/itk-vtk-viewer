import applySlicingPlanes from '../Main/applySlicingPlanes'

function toggleLayerVisibility(context, event) {
  const name = event.data
  const actorContext = context.layers.actorContext.get(name)
  const visible = actorContext.visible

  context.itkVtkView.setImageVisibility(visible)

  if (visible) {
    applySlicingPlanes(context, { data: context.main.slicingPlanes })
  }

  // Toggle the visibility on the corresponding label image or image layer
  if (
    actorContext.type === 'labelImage' &&
    actorContext.imageName &&
    context.layers.actorContext.has(actorContext.imageName)
  ) {
    const imageLayerContext = context.layers.actorContext.get(
      actorContext.imageName
    )
    if (imageLayerContext.visible !== visible) {
      context.service.send({
        type: 'TOGGLE_LAYER_VISIBILITY',
        data: actorContext.imageName,
      })
    }
  } else if (
    actorContext.type === 'image' &&
    context.layers.actorContext.has(actorContext.labelImageName)
  ) {
    const labelImageLayerContext = context.layers.actorContext.get(
      actorContext.labelImageName
    )
    if (labelImageLayerContext.visible !== visible) {
      context.service.send({
        type: 'TOGGLE_LAYER_VISIBILITY',
        data: actorContext.labelImageName,
      })
    }
  }

  context.service.send('RENDER')
}

export default toggleLayerVisibility
