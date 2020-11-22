function applyVisibility(context, event) {
  const name = event.data
  const actorContext = context.layers.actorContext.get(name)
  const visible = actorContext.visible

  context.itkVtkView.setImageVisibility(visible)

  context.service.send('RENDER')
}

export default applyVisibility
