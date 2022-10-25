function applyColorMap(context, { data: { component, name } }) {
  const actorContext = context.images.actorContext.get(name)
  const colorMap = actorContext.colorMaps.get(component)
  if (component === actorContext.selectedComponent) {
    context.images.iconSelector.setSelectedValue(colorMap)
    const colorTransferFunction = context.images.colorTransferFunctions?.get(
      component
    )
    if (colorTransferFunction) {
      context.images.transferFunctionWidget.setColorTransferFunction(
        colorTransferFunction
      )
    }
  }
}

export default applyColorMap
