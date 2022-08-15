function applyHistogram(context, event) {
  const name = event.data.name
  const component = event.data.component
  const actorContext = context.images.actorContext.get(name)

  if (
    name !== context.images.selectedName ||
    component !== actorContext.selectedComponent
  ) {
    return
  }

  const histogram = event.data.histogram
  context.images.transferFunctionWidget.setHistogram(histogram)
}

export default applyHistogram
