function applyPiecewiseFunctionGaussians(context, event) {
  const images = context.images
  const name = event.data.name
  const actorContext = context.images.actorContext.get(name)
  const component = event.data.component
  const gaussians = event.data.gaussians

  const transferFunctionWidget = context.images.transferFunctionWidget
  transferFunctionWidget.setGaussians(gaussians)
}

export default applyPiecewiseFunctionGaussians
