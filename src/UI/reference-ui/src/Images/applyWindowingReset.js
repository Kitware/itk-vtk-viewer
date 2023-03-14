function applyWindowLevelReset(context, { data }) {
  const actorContext = context.images.actorContext.get(data.name)
  const component = actorContext.selectedComponent
  const bounds = actorContext.colorRangeBounds.get(component)

  const wMax = bounds[1] - bounds[0]
  const lMin = bounds[0]
  const level = wMax / 2 + lMin
  const width = wMax

  const newRange = () => {
    return [level - width / 2, level + width / 2]
  }

  context.service.send({
    type: 'IMAGE_COLOR_RANGE_CHANGED',
    data: {
      name: data.name,
      component,
      range: newRange(),
    },
  })
}

export default applyWindowLevelReset
