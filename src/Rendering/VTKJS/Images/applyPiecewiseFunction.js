import filterAndProcessOpacityNodes from './filterAndProcessOpacityNodes'

function applyPiecewiseFunction(context, event) {
  const name = event.data.name
  const component = event.data.component
  const range = event.data.range
  const nodes = event.data.nodes

  const actorContext = context.images.actorContext.get(name)
  const image = actorContext.image

  const pwf = context.images.piecewiseFunctions?.get(component)
  if (pwf && image) {
    const slicePiecewiseFunction = pwf.slice
    const volumePiecewiseFunction = pwf.volume

    volumePiecewiseFunction.setNodes(nodes)

    const numberOfComponents = actorContext.componentVisibilities.reduce(
      (a, c) => +a + c,
      0
    )
    const filteredNodes = filterAndProcessOpacityNodes(
      numberOfComponents,
      nodes
    )
    slicePiecewiseFunction.setNodes(filteredNodes)

    const lookupTableProxy = context.images.lookupTableProxies.get(component)
    const lookupTable = lookupTableProxy.getLookupTable()
    lookupTable.setMappingRange(...range)
    lookupTable.updateRange()

    context.service.send('RENDER')
  }
}

export default applyPiecewiseFunction
