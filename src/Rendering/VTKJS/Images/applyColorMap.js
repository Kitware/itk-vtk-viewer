import vtkLookupTableProxy from 'vtk.js/Sources/Proxy/Core/LookupTableProxy'

function applyColorMap(context, { data: { name, colorMap, component } }) {
  const actorContext = context.images.actorContext.get(name)

  const lookupTableProxy = context.images.lookupTableProxies?.get(component)

  const currentColorMap = lookupTableProxy?.getPresetName()
  if (currentColorMap && currentColorMap !== colorMap) {
    lookupTableProxy.setPresetName(colorMap)
    lookupTableProxy.setMode(vtkLookupTableProxy.Mode.Preset)
    if (actorContext.colorRanges.has(component)) {
      const range = actorContext.colorRanges.get(component)
      const colorTransferFunction = lookupTableProxy.getLookupTable()
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
