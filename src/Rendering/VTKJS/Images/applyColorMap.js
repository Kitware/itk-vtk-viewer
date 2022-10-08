import { ColorMaps } from 'itk-viewer-color-maps'

function applyColorMap(context, { data: { name, colorMap, component } }) {
  const actorContext = context.images.actorContext.get(name)

  const colorTransferFunction = context.images.colorTransferFunctions?.get(
    component
  )

  const cmap = ColorMaps.get(colorMap)
  colorTransferFunction.applyColorMap(cmap)
  if (actorContext.colorRanges.has(component)) {
    const range = actorContext.colorRanges.get(component)
    colorTransferFunction.setMappingRange(range[0], range[1])
    colorTransferFunction.updateRange()
  }

  context.service.send('RENDER')
}

export default applyColorMap
