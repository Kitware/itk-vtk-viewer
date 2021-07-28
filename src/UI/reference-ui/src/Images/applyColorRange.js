function applyColorRange(context, event) {
  const name = event.data.name
  const component = event.data.component
  const actorContext = context.images.actorContext.get(name)

  if (
    name !== context.images.selectedName ||
    component !== actorContext.selectedComponent
  ) {
    return
  }

  const colorRange = event.data.range

  const minimumInput = context.images.colorRangeInputRow.children[1]
  const maximumInput = context.images.colorRangeInputRow.children[3]

  minimumInput.value = colorRange[0]
  maximumInput.value = colorRange[1]

  const gaussians = actorContext.piecewiseFunctionGaussians.get(component)
  const newGaussians = gaussians.slice()

  let fullRange = colorRange
  if (actorContext.colorRangeBounds.has(component)) {
    fullRange = actorContext.colorRangeBounds.get(component)
  }
  const diff = fullRange[1] - fullRange[0]

  context.images.transferFunctionManipulator.windowMotionScale = diff
  context.images.transferFunctionManipulator.levelMotionScale = diff
  const {
    rangeManipulator,
    windowMotionScale,
    levelMotionScale,
    windowGet,
    windowSet,
    levelGet,
    levelSet,
  } = context.images.transferFunctionManipulator
  rangeManipulator.setVerticalListener(
    0,
    windowMotionScale,
    diff / 100.0,
    windowGet,
    windowSet
  )
  rangeManipulator.setHorizontalListener(
    fullRange[0],
    fullRange[1],
    diff / 100.0,
    levelGet,
    levelSet
  )

  const colorRangeNormalized = new Array(2)
  colorRangeNormalized[0] = (colorRange[0] - fullRange[0]) / diff
  colorRangeNormalized[1] = (colorRange[1] - fullRange[0]) / diff

  const transferFunctionWidget = context.images.transferFunctionWidget
  transferFunctionWidget.setRangeZoom(colorRangeNormalized)

  let minValue = Infinity
  let maxValue = -Infinity

  let count = gaussians.length
  while (count--) {
    let { position, width, xBias, yBias } = newGaussians[count]
    if (position - width < colorRangeNormalized[0]) {
      position = colorRangeNormalized[0] + width
      newGaussians[count].position = position
      if (position + width > colorRangeNormalized[1]) {
        const newWidth = (colorRangeNormalized[1] - colorRangeNormalized[0]) / 2
        position = colorRangeNormalized[0] + newWidth
        newGaussians[count].position = position
        newGaussians[count].width = newWidth
        if (!context.use2D) {
          newGaussians[count].xBias = (newWidth / width) * xBias
          newGaussians[count].yBias = (newWidth / width) * yBias
        }
      }
    }
    if (position + width > colorRangeNormalized[1]) {
      position = colorRangeNormalized[1] - width
      newGaussians[count].position = position
      if (position - width < colorRangeNormalized[0]) {
        const newWidth = (colorRangeNormalized[1] - colorRangeNormalized[0]) / 2
        position = colorRangeNormalized[0] + newWidth
        newGaussians[count].position = position
        newGaussians[count].width = newWidth
        if (!context.use2D) {
          newGaussians[count].xBias = (newWidth / width) * xBias
          newGaussians[count].yBias = (newWidth / width) * yBias
        }
      }
    }
    minValue = Math.min(minValue, position - width)
    maxValue = Math.max(maxValue, position + width)
  }
  if (
    colorRangeNormalized[0] < minValue ||
    colorRangeNormalized[1] > maxValue
  ) {
    const newWidth = (colorRangeNormalized[1] - colorRangeNormalized[0]) / 2
    const position = colorRangeNormalized[0] + newWidth
    newGaussians[0].position = position
    if (!context.use2D) {
      newGaussians[0].xBias =
        (newWidth / newGaussians[0].width) * newGaussians[0].xBias
      newGaussians[0].yBias =
        (newWidth / newGaussians[0].width) * newGaussians[0].yBias
    }
    newGaussians[0].width = newWidth
  }

  context.images.transferFunctionWidget.setDataRange(colorRange)
  context.images.transferFunctionWidget.render()

  context.service.send({
    type: 'IMAGE_PIECEWISE_FUNCTION_GAUSSIANS_CHANGED',
    data: { name, component, gaussians: newGaussians },
  })
}

export default applyColorRange
