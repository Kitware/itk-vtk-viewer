function toggleInterpolation(context, event) {
  const name = event.data
  const actorContext = context.images.actorContext.get(name)
  const interpolation = actorContext.interpolationEnabled

  context.images.interpolationButtonInput.checked = interpolation
}

export default toggleInterpolation
