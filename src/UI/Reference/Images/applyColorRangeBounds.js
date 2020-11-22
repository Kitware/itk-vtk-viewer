import FloatTypes from 'itk/FloatTypes'

function applyColorRangeBounds(context, event) {
  const name = event.data.name
  const componentIndex = event.data.component
  const actorContext = context.images.actorContext.get(name)

  if (
    name !== context.images.selectedName ||
    componentIndex !== actorContext.selectedComponentIndex
  ) {
    return
  }

  const range = event.data.range

  const minimumInput = context.images.colorRangeInputRow.children[0]
  const maximumInput = context.images.colorRangeInputRow.children[2]

  minimumInput.min = range[0]
  minimumInput.max = range[1]
  maximumInput.min = range[0]
  maximumInput.max = range[1]

  const image = actorContext.image
  if (
    (image && image.imageType.componentType === FloatTypes.Float32) ||
    image.imageType.componentType === FloatTypes.Float64
  ) {
    const step = (range[1] - range[0]) / 1000.0
    minimumInput.step = step
    maximumInput.step = step
  }
}

export default applyColorRangeBounds
