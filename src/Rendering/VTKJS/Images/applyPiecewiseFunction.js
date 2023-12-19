function applyPiecewiseFunction(context, event) {
  const name = event.data.name
  const component = event.data.component
  // const range = event.data.range
  const nodes = event.data.nodes

  const actorContext = context.images.actorContext.get(name)
  const image = actorContext.image

  const pwf = context.images.piecewiseFunctions?.get(component)
  if (pwf && image) {
    const slicePiecewiseFunction = pwf.slice
    const volumePiecewiseFunction = pwf.volume

    volumePiecewiseFunction.setNodes(nodes)

    const sliceNodes = nodes.length > 2 ? nodes.slice(1, -1) : nodes // if more than 2, remove "window" nodes with y = 0
    slicePiecewiseFunction.setNodes(sliceNodes)

    context.service.send('RENDER')
  }
}

export default applyPiecewiseFunction
