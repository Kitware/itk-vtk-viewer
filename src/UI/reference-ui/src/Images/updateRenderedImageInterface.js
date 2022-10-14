function updateRenderedImageInterface(context, event) {
  const name = event.data
  const actorContext = context.images.actorContext.get(name)
  const { transferFunctionWidget } = context.images

  if (!transferFunctionWidget) {
    console.warn('No transfer function widget')
    return
  }

  const points = actorContext.piecewiseFunctionPoints.get(
    actorContext.selectedComponent
  )
  // no points if just label image
  if (points) {
    transferFunctionWidget.setPoints(points)
  }
}

export default updateRenderedImageInterface
