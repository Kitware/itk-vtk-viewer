const MIN_WINDOW = 1e-8

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

  let fullRange = colorRange
  if (actorContext.colorRangeBounds.has(component)) {
    fullRange = actorContext.colorRangeBounds.get(component)
  }
  const diff = fullRange[1] - fullRange[0]

  const colorRangeNormalized = [
    (colorRange[0] - fullRange[0]) / diff,
    (colorRange[1] - fullRange[0]) / diff,
  ]
  const normDelta = colorRangeNormalized[1] - colorRangeNormalized[0]

  const {
    rangeManipulator,
    windowGet,
    windowSet,
    levelGet,
    levelSet,
  } = context.images.transferFunctionManipulator

  // level
  rangeManipulator.setHorizontalListener(
    colorRangeNormalized[0],
    colorRangeNormalized[1],
    normDelta / 100.0,
    levelGet,
    levelSet
  )

  // window
  rangeManipulator.setVerticalListener(
    MIN_WINDOW,
    normDelta,
    normDelta / 100.0,
    windowGet,
    windowSet
  )

  const { transferFunctionWidget } = context.images
  transferFunctionWidget.setRangeZoom(colorRangeNormalized)

  if (!event.data.dontUpdatePoints) {
    const oldPoints = actorContext.piecewiseFunctionPoints.get(component)
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

    transferFunctionWidget.setPoints(points)
  }
}

export default applyColorRange
