function toggleUseShadow(context, event) {
  const name = event.data

  const actorContext = context.images.actorContext.get(name)

  const useShadow = actorContext.useShadow

  context.images.useShadowButtonInput.checked = useShadow

  context.imageUI.representationProxy.setUseShadow(useShadow)
  context.service.send('RENDER')
}

export default toggleUseShadow
