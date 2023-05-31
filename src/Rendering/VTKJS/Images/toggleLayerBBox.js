function toggleLayerBBox(context, event) {
  const name = event.data.layerName
  const actorContext = context.layers.actorContext.get(name)
  actorContext.bbox = !actorContext.bbox
  context.itkVtkView.setEnableBBox(name, actorContext.bbox)
  context.service.send('RENDER')
}

export default toggleLayerBBox
