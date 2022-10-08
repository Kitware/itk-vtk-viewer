import { ColorMaps } from 'itk-viewer-color-maps'

function applyColorMap(context, { data: { component, name, colorMap } }) {
  const actorContext = context.images.actorContext.get(name)
  const colorTransferFunction = context.images.colorTransferFunctions?.get(
    component
  )

  if (component === actorContext.selectedComponent) {
    context.images.iconSelector.setSelectedValue(colorMap)
    if (colorTransferFunction) {
      const cmap = ColorMaps.get(colorMap)
      colorTransferFunction.applyColorMap(cmap)
      if (actorContext.colorRanges.has(component)) {
        const range = actorContext.colorRanges.get(component)
        colorTransferFunction.setMappingRange(range[0], range[1])
        colorTransferFunction.updateRange()
      }
      context.images.transferFunctionWidget.setColorTransferFunction(
        colorTransferFunction
      )
    }
  }
}

export default applyColorMap
