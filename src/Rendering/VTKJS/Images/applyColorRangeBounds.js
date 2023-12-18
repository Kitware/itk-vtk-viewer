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

  assignColorRangeBounds(context, event)

  // Rescale opacity points to fit range
  const actorContext = context.images.actorContext.get(name)
  if (actorContext.piecewiseFunctionPointsAutoAdjust.get(component)) {
    // Rescale opacity points to fit range
    let fullRange = newRange
    if (actorContext.colorRangeBounds.has(component)) {
      fullRange = actorContext.colorRangeBounds.get(component)
    }
    const diff = fullRange[1] - fullRange[0]
    const colorRangeNormalized = [
      (newRange[0] - fullRange[0]) / diff,
      (newRange[1] - fullRange[0]) / diff,
    ]
    const normDelta = colorRangeNormalized[1] - colorRangeNormalized[0]

    const oldPoints = actorContext.piecewiseFunctionPoints.get(component)
    const xValues = oldPoints.map(([x]) => x)
    // if 1 point, assume whole range
    const maxOldPoints = xValues.length > 1 ? Math.max(...xValues) : 1
    let minOldPoints = xValues.length > 1 ? Math.min(...xValues) : 0
    let rangeOldPoints = maxOldPoints - minOldPoints
    if (rangeOldPoints === 0) {
      minOldPoints = 0
      rangeOldPoints = 1
    }
    const points = oldPoints
      // find normalized position of old points
      .map(([x, y]) => [(x - minOldPoints) / rangeOldPoints, y])
      // rescale to new range
      .map(([x, y]) => {
        return [x * normDelta + colorRangeNormalized[0], y]
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
}
