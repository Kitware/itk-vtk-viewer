import vtkLookupTableProxy from 'vtk.js/Sources/Proxy/Core/LookupTableProxy'

let customIcon = null

function applyColorMap(context, event) {
  const name = event.data.name
  const component = event.data.component
  const actorContext = context.images.actorContext.get(name)
  const colorMap = event.data.colorMap

  if (
    name !== context.images.selectedName ||
    component !== actorContext.selectedComponentIndex
  ) {
    return
  }

  let lookupTableProxy = null
  if (context.images.lookupTableProxies.has(component)) {
    lookupTableProxy = context.images.lookupTableProxies.get(component)
  } else {
    lookupTableProxy = vtkLookupTableProxy.newInstance()
    context.images.lookupTableProxies.set(component, lookupTableProxy)
  }
  const currentColorMap = lookupTableProxy.getPresetName()
  if (currentColorMap !== colorMap) {
    lookupTableProxy.setPresetName(colorMap)
    lookupTableProxy.setMode(vtkLookupTableProxy.Mode.Preset)
    const colorTransferFunction = lookupTableProxy.getLookupTable()
    if (actorContext.colorRanges.has(component)) {
      const range = actorContext.colorRanges.get(component)
      colorTransferFunction.setMappingRange(range[0], range[1])
      colorTransferFunction.updateRange()
    }
  }
  const transferFunctionWidget = context.images.transferFunctionWidget
  transferFunctionWidget.setColorTransferFunction(
    lookupTableProxy.getLookupTable()
  )
  transferFunctionWidget.render()

  // Todo:
  //const transferFunctionWidget = store.imageUI.transferFunctionWidget

  //if (colorMap.startsWith('Custom')) {
  //lookupTableProxy.setMode(vtkLookupTableProxy.Mode.RGBPoints)
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
  //}
  //context.images.iconSelector.setSelectedValue(colorMap)
}

export default applyColorMap
