function applyColorMap(context, { data: { component, name } }) {
  if (context.images.selectedName !== name) return

  const actorContext = context.images.actorContext.get(name)
  if (component === actorContext.selectedComponent) {
    const colorMap = actorContext.colorMaps.get(component)
    context.images.iconSelector.setSelectedValue(colorMap)
    const colorTransferFunction = context.images.colorTransferFunctions?.get(
      component
    )
    if (colorTransferFunction) {
      context.images.transferFunctionWidget.setColorTransferFunction(
        colorTransferFunction
      )
    }
    if (
      actorContext.fusedImage &&
      // When comparing images, getScalars is null first time
      actorContext.fusedImage.getPointData().getScalars()
    ) {
      const range = actorContext.fusedImage
        .getPointData()
        .getScalars()
        .getRange(component)

      context.images.transferFunctionWidget.setRange(range)
    }
  }
}

export default applyColorMap
