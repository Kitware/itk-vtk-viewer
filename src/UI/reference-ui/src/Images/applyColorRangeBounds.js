import applyColorRange from './applyColorRange'

function applyColorRangeBounds(context, event) {
  const { name, component } = event.data
  const actorContext = context.images.actorContext.get(name)

  if (
    name !== context.images.selectedName ||
    component !== actorContext.selectedComponent
  ) {
    return
  }

  const range = event.data.range

  const minimumInput = context.images.colorRangeInputRow.children[1].children[0]
  const maximumInput = context.images.colorRangeInputRow.children[3].children[0]

  minimumInput.min = range[0]
  minimumInput.max = range[1]
  maximumInput.min = range[0]
  maximumInput.max = range[1]

  const image = actorContext.image
  if (
    (image && image.imageType.componentType === 'float') ||
    image.imageType.componentType === 'double'
  ) {
    const step = (range[1] - range[0]) / 1000.0
    minimumInput.step = step
    maximumInput.step = step
  }

  if (actorContext.colorRanges.has(component)) {
    applyColorRange(context, {
      data: {
        name,
        component,
        range: actorContext.colorRanges.get(component),
        fullRange: range,
      },
    })
  }
}

export default applyColorRangeBounds
