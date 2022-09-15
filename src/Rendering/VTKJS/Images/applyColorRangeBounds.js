const assignColorRangeBounds = (
  { images },
  { data: { name, component, range, keepAutoAdjusting = false } }
) => {
  const {
    colorRangeBounds,
    colorRangeBoundsAutoAdjust,
  } = images.actorContext.get(name)

  colorRangeBounds.set(component, range)

  colorRangeBoundsAutoAdjust.set(
    component,
    colorRangeBoundsAutoAdjust.get(component) && keepAutoAdjusting
  )

  return images
}

export const applyColorRangeBounds = (context, event) => {
  const {
    data: { name, component, range: newRange },
  } = event
  const { colorRangeBounds } = context.images.actorContext.get(name)
  const oldBounds = colorRangeBounds.get(component)

  assignColorRangeBounds(context, event)

  if (!oldBounds) return

  // Rescale opacity points to fit range

  const oldRangeDiff = oldBounds[1] - oldBounds[0]
  const newRangeDiff = newRange[1] - newRange[0]

  const actorContext = context.images.actorContext.get(name)
  const oldPoints = actorContext.piecewiseFunctionPoints?.get(component)
  const points = oldPoints
    // find real intensity value of normalized points
    .map(([x, y]) => [x * oldRangeDiff + oldBounds[0], y])
    // rescale to new range
    .map(([x, y]) => {
      return [(x - newRange[0]) / newRangeDiff, y]
    })

  context.service.send({
    type: 'IMAGE_PIECEWISE_FUNCTION_POINTS_CHANGED',
    data: {
      name,
      component,
      points,
    },
  })
}
