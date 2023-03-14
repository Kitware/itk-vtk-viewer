const MIN_WINDOW = 1e-8

function toggleWindowLevel(context, event) {
  const name = event.data.name
  const actorContext = context.images.actorContext.get(name)
  const wl = actorContext.windowLevelEnabled
  const colorRange = actorContext.colorRanges.get(
    actorContext.selectedComponent
  )
  const fullRange = actorContext.colorRangeBounds.get(
    actorContext.selectedComponent
  )

  context.images.windowLevelToggleInput.checked = wl

  const minimumTooltip = context.images.colorRangeInputRow.children[1]
  const maximumTooltip = context.images.colorRangeInputRow.children[3]

  const minimumInput = minimumTooltip.children[0]
  const maximumInput = maximumTooltip.children[0]

  if (wl) {
    minimumTooltip.setAttribute('itk-vtk-tooltip-content', 'Window width')
    maximumTooltip.setAttribute('itk-vtk-tooltip-content', 'Window level')

    minimumInput.value = colorRange[1] - colorRange[0]
    maximumInput.value = (colorRange[1] + colorRange[0]) / 2

    minimumInput.min = MIN_WINDOW
    minimumInput.max = (fullRange[1] - fullRange[0]) * 2
    maximumInput.min = fullRange[0] - fullRange[0]
    maximumInput.max = fullRange[1] + fullRange[1]

    const step = 10 ** Math.ceil(Math.log((fullRange[1] - fullRange[0]) / 1000))
    minimumInput.step = step
    maximumInput.step = step
  } else {
    minimumTooltip.setAttribute('itk-vtk-tooltip-content', 'Color range min')
    maximumTooltip.setAttribute('itk-vtk-tooltip-content', 'Color range max')

    minimumInput.value = colorRange[0]
    maximumInput.value = colorRange[1]

    minimumInput.min = fullRange[0]
    minimumInput.max = fullRange[1]
    maximumInput.min = fullRange[0]
    maximumInput.max = fullRange[1]

    const step = (fullRange[1] - fullRange[0]) / 1000.0
    minimumInput.step = step
    maximumInput.step = step
  }
}

export default toggleWindowLevel
