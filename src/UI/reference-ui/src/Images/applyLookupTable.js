import vtkLookupTableProxy from '@thewtex/vtk.js-esm/Proxy/Core/LookupTableProxy'

import applyCategoricalColorToLookupTableProxy from '../applyCategoricalColorToLookupTableProxy'

let customIcon = null

function applyLookupTable(context, event) {
  const name = event.data.name
  const component = event.data.component
  const actorContext = context.images.actorContext.get(name)
  const lut = event.data.lookupTable

  if (name !== context.images.selectedName) {
    return
  }

  //let lookupTableProxy = null
  //if (context.images.lookupTableProxies.has('labelImage')) {
  //lookupTableProxy = context.images.lookupTableProxies.get('labelImage')
  //} else {
  //lookupTableProxy = vtkLookupTableProxy.newInstance()
  //context.images.lookupTableProxies.set('labelImage', lookupTableProxy)
  //}
  //const currentLut = lookupTableProxy.getPresetName()
  //if (currentLut !== lut) {
  //// If we are not using the vtk.js / Reference
  //applyCategoricalColorToLookupTableProxy(
  //lookupTableProxy,
  //Array.from(actorContext.labelNames.keys()),
  //lut
  //)
  //}

  if (lut !== context.images.labelImageIconSelector.getSelectedValue()) {
    context.images.labelImageIconSelector.setSelectedValue(lut)
  }

  // Todo:
  //
  //if (categoricalColor.startsWith('Custom')) {
  //// TODO
  ////lookupTableProxy.setMode(vtkLookupTableProxy.Mode.RGBPoints)
  ////transferFunctionWidget.applyOpacity(piecewiseFunction, dataRange);
  ////const colorDataRange = transferFunctionWidget.getOpacityRange(dataRange);
  ////if (!!colorDataRange) {
  ////colorTransferFunction.setMappingRange(...colorDataRange);
  ////}
  ////colorTransferFunction.updateRange();
  ////const isIcons = iconSelector.getIcons();
  ////if (!!!customIcon) {
  ////const categoricalColorIcon = customColorMapIcon(colorTransferFunction, colorDataRange);
  ////customIcon = { 'iconFilePath': categoricalColorIcon, 'iconValue': categoricalColor };
  ////icons.push(customIcon);
  ////iconSelector.refresh(icons);
  ////} else if(isIcons[isIcons.length-1].iconValue !== categoricalColor) {
  ////const categoricalColorIcon = customColorMapIcon(colorTransferFunction, colorDataRange);
  ////isIcons[isIcons.length-1].element.src = categoricalColorIcon;
  ////isIcons[isIcons.length-1].iconFilePath = categoricalColorIcon;
  ////isIcons[isIcons.length-1].iconValue = categoricalColor;
  ////isIcons[isIcons.length-1].element.setAttribute('icon-value', categoricalColor);
  ////isIcons[isIcons.length-1].element.setAttribute('alt', categoricalColor);
  ////isIcons[isIcons.length-1].element.setAttribute('title', categoricalColor);
  ////}
  //context.images.iconSelector.setSelectedValue(colorMap)
}

export default applyLookupTable
