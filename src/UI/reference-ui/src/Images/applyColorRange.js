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

  const minimumInput = context.images.colorRangeInputRow.children[1].children[0]
  const maximumInput = context.images.colorRangeInputRow.children[3].children[0]

  if (actorContext.windowLevelEnabled) {
    minimumInput.value = colorRange[1] - colorRange[0]
    maximumInput.value = (colorRange[1] + colorRange[0]) / 2
  } else {
    minimumInput.value = colorRange[0]
    maximumInput.value = colorRange[1]
  }

  let fullRange = colorRange
  if (actorContext.colorRangeBounds.has(component)) {
    fullRange = actorContext.colorRangeBounds.get(component)
  }
  if (event.data.fullRange) {
    // use more up to date colorRangeBounds
    fullRange = event.data.fullRange
  }
  const diff = fullRange[1] - fullRange[0]

  const colorRangeNormalized = [
    (colorRange[0] - fullRange[0]) / diff,
    (colorRange[1] - fullRange[0]) / diff,
  ]
  context.images.transferFunctionWidget.setRangeZoom(colorRangeNormalized)
}

export default applyColorRange
