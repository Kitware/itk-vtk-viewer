function toggleShadow(context, event) {
  const name = event.data
  const actorContext = context.images.actorContext.get(name)
  const shadow = actorContext.shadowEnabled

  context.images.shadowButtonInput.checked = shadow
}

export default toggleShadow
