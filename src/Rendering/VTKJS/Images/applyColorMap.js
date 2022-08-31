import vtkLookupTableProxy from 'vtk.js/Sources/Proxy/Core/LookupTableProxy'

function applyColorMap(context, event) {
  const name = event.data.name
  const component = event.data.component
  const actorContext = context.images.actorContext.get(name)

  const colorMap = event.data.colorMap

  const lookupTableProxy = context.images.lookupTableProxies.get(component)
  const colorTransferFunction = lookupTableProxy.getLookupTable()

  const currentColorMap = lookupTableProxy.getPresetName()
  if (currentColorMap !== colorMap) {
    lookupTableProxy.setPresetName(colorMap)
    lookupTableProxy.setMode(vtkLookupTableProxy.Mode.Preset)
    if (actorContext.colorRanges.has(component)) {
      const range = actorContext.colorRanges.get(component)
      colorTransferFunction.setMappingRange(range[0], range[1])
      colorTransferFunction.updateRange()
    }
    context.service.send({
      type: 'IMAGE_COLOR_MAP_CHANGED',
      data: { name, component, colorMap },
    })
  }

  context.service.send('RENDER')
}

export default applyColorMap
