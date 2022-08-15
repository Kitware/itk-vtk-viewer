function updateRenderedImageInterface(context, event) {
  const name = event.data
  const actorContext = context.images.actorContext.get(name)
  const { visualizedComponents } = actorContext
  const { transferFunctionWidget } = context.images

  if (!transferFunctionWidget) {
    console.warn('No transfer function widget')
    return
  }

  //Apply piecewise functions
  const selectedComponent = context.images.selectedComponent
  visualizedComponents
    .filter(c => c >= 0 && c !== selectedComponent)
    .concat([selectedComponent])
    .forEach(component => {
      const points = actorContext.piecewiseFunctionPoints.get(component)
      if (points) {
        transferFunctionWidget.setPoints(points)
        const dataRange = actorContext.colorRanges.get(component)
        const range = transferFunctionWidget.getOpacityRange(dataRange)
        const nodes = transferFunctionWidget.getOpacityNodes(dataRange)
        context.service.send({
          type: 'IMAGE_PIECEWISE_FUNCTION_CHANGED',
          data: {
            name,
            component,
            range,
            nodes,
          },
        })
      } else {
        console.warn('No transfer function points for component')
      }
    })
}

export default updateRenderedImageInterface
