function mapToColorFunctionRange(
  context,
  { data: { name, component, points } }
) {
  const actorContext = context.images.actorContext.get(name)
  const dataRange = actorContext.colorRangeBounds.get(component)

  if (!dataRange) return // viewer.setImagePiecewiseFunctionPoints called at start

  const rangeDelta = dataRange[1] - dataRange[0]
  const range = points.map(v => v * rangeDelta + dataRange[0])

  context.service.send({
    type: 'IMAGE_COLOR_RANGE_CHANGED',
    data: {
      name,
      component,
      range,
    },
  })
}

export default mapToColorFunctionRange
