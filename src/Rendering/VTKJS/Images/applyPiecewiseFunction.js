import filterAndProcessOpacityNodes from './filterAndProcessOpacityNodes'

function applyPiecewiseFunction(context, event) {
  const name = event.data.name
  const component = event.data.component
  const range = event.data.range
  const nodes = event.data.nodes

  const actorContext = context.images.actorContext.get(name)
  const image = actorContext.image

  const pwfProxies = context.images.piecewiseFunctionProxies.get(component)
  if (pwfProxies && image) {
    const slicePiecewiseFunction = pwfProxies.slice.getPiecewiseFunction()
    const volumePiecewiseFunction = pwfProxies.volume.getPiecewiseFunction()

    volumePiecewiseFunction.setNodes(nodes)

    const numberOfComponents = actorContext.image.imageType.components
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
