function applyColorMap(context, { data: { component, name, colorMap } }) {
  const actorContext = context.images.actorContext.get(name)
  const lookupTableProxy = context.images.lookupTableProxies.get(component)

  if (component === actorContext.selectedComponent) {
    context.images.iconSelector.setSelectedValue(colorMap)
    if (lookupTableProxy) {
      context.images.transferFunctionWidget.setColorTransferFunction(
        lookupTableProxy.getLookupTable()
      )
    }
  }
}

export default applyColorMap
