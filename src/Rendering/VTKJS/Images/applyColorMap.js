import vtkLookupTableProxy from 'vtk.js/Sources/Proxy/Core/LookupTableProxy'
import applyPiecewiseFunction from './applyPiecewiseFunction'

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
  }

  /*
    FIXME: This is a temporary work-around
    Currently the colormap is not being applied to the volume for some reason,
    however adjusting the transfer function fixes the issue. This may be
    related to ranges being set by ranges being set by both the mapper and the
    lookup table/transfer function. In lieu of a clearer solution at the moment
    we instead synthesize a tfun update when the color map changes.
  */
  const dataRange = actorContext.colorRanges.get(component)
  const transferFunctionWidget = context.images.transferFunctionWidget
  const range = transferFunctionWidget.getOpacityRange(dataRange)
  const nodes = transferFunctionWidget.getOpacityNodes(dataRange)
  const fauxEvent = {
    data: {
      name,
      component,
      range,
      nodes,
    },
  }
  applyPiecewiseFunction(context, fauxEvent)

  context.service.send('RENDER')
}

export default applyColorMap
