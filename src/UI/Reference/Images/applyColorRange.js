function applyColorRange(context, event) {
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

  minimumInput.value = range[0]
  maximumInput.value = range[1]

  context.service.send('RENDER')
}

export default applyColorRange
