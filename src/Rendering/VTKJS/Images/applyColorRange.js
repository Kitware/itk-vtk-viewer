function applyColorRange(context, { data: { name, component, range } }) {
  const actorContext = context.images.actorContext.get(name)

  const colorTransferFunction = context.images.lookupTableProxies
    .get(component)
    .getLookupTable()
  colorTransferFunction.setMappingRange(range[0], range[1])
  colorTransferFunction.updateRange()

  // Rescale opacity points to fit range
  let fullRange = range
  if (actorContext.colorRangeBounds.has(component)) {
    fullRange = actorContext.colorRangeBounds.get(component)
  }
  const diff = fullRange[1] - fullRange[0]

  const colorRangeNormalized = [
    (range[0] - fullRange[0]) / diff,
    (range[1] - fullRange[0]) / diff,
  ]
  const normDelta = colorRangeNormalized[1] - colorRangeNormalized[0]

  const oldPoints = actorContext.piecewiseFunctionPoints?.get(component)
  const xValues = oldPoints.map(([x]) => x)
  // if 1 point, assume whole range
  const maxOldPoints = xValues.length > 1 ? Math.max(...xValues) : 1
  const minOldPoints = xValues.length > 1 ? Math.min(...xValues) : 0
  const rangeOldPoints = maxOldPoints - minOldPoints
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

export default applyColorRange
