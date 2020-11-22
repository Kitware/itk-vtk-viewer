import vtkLookupTableProxy from 'vtk.js/Sources/Proxy/Core/LookupTableProxy'

function applyColorMap(context, event) {
  const name = event.data.name
  const componentIndex = event.data.component
  const actorContext = context.images.actorContext.get(name)

  const colorMap = event.data.colorMap

  const lookupTableProxy = context.images.lookupTableProxies.get(componentIndex)
  const colorTransferFunction = lookupTableProxy.getLookupTable()

  // Todo:
  //const transferFunctionWidget = store.imageUI.transferFunctionWidget

  //if (colorMap.startsWith('Custom')) {
  //lookupTableProxy.setMode(vtkLookupTableProxy.Mode.RGBPoints)
  //applyPiecewiseFunctionOpacities(store, componentIndex)
  //const colorDataRange = transferFunctionWidget.getOpacityRange()
  //if (!!colorDataRange) {
  //colorTransferFunction.setMappingRange(...colorDataRange)
  //}
  //colorTransferFunction.updateRange()

  //const isIcons = iconSelector.getIcons()
  //if (!!!customIcon) {
  //const colorMapIcon = customColorMapIcon(
  //colorTransferFunction,
  //colorDataRange
  //)
  //customIcon = { iconFilePath: colorMapIcon, iconValue: colorMap }
  //icons.push(customIcon)
  //iconSelector.refresh(icons)
  //} else if (isIcons[isIcons.length - 1].iconValue !== colorMap) {
  //const colorMapIcon = customColorMapIcon(
  //colorTransferFunction,
  //colorDataRange
  //)
  //isIcons[isIcons.length - 1].element.src = colorMapIcon
  //isIcons[isIcons.length - 1].iconFilePath = colorMapIcon
  //isIcons[isIcons.length - 1].iconValue = colorMap
  //isIcons[isIcons.length - 1].element.setAttribute('icon-value', colorMap)
  //isIcons[isIcons.length - 1].element.setAttribute('alt', colorMap)
  //isIcons[isIcons.length - 1].element.setAttribute('title', colorMap)
  //}
  //} else {
  lookupTableProxy.setPresetName(colorMap)
  lookupTableProxy.setMode(vtkLookupTableProxy.Mode.Preset)
  //applyPiecewiseFunctionOpacities(store, componentIndex)
  //const colorDataRange = transferFunctionWidget.getOpacityRange()
  //if (!!colorDataRange) {
  //colorTransferFunction.setMappingRange(...colorDataRange)
  //}
  //colorTransferFunction.updateRange()
  //}
  //transferFunctionWidget.render()

  context.service.send('RENDER')
}

export default applyColorMap
