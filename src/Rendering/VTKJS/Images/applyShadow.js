function applyShadow(context, event) {
  const name = event.data
  const actorContext = context.images.actorContext.get(name)
  const useShadow = actorContext.shadowEnabled

  if (!!context.images.representationProxy) {
    context.images.representationProxy.setUseShadow(useShadow)
    context.send('RENDER')
  }
}

export default applyShadow
