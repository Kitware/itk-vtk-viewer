function applyColorRange(context, event) {
  const name = event.data.name
  const componentIndex = event.data.component
  const actorContext = context.images.actorContext.get(name)

  const range = event.data.range

  const colorTransferFunction = context.images.lookupTableProxies
    .get(componentIndex)
    .getLookupTable()
  colorTransferFunction.setMappingRange(range[0], range[1])
  colorTransferFunction.updateRange()
}

export default applyColorRange
