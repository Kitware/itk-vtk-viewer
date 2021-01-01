import vtkLookupTableProxy from 'vtk.js/Sources/Proxy/Core/LookupTableProxy'

import applyCategoricalColorToLookupTableProxy from '../../../UI/Reference/applyCategoricalColorToLookupTableProxy'

function applyLookupTable(context, event) {
  const name = event.data.name
  const actorContext = context.images.actorContext.get(name)

  const lookupTable = event.data.lookupTable

  let lookupTableProxy = null
  if (context.images.lookupTableProxies.has('labelImage')) {
    lookupTableProxy = context.images.lookupTableProxies.get('labelImage')
  } else {
    lookupTableProxy = vtkLookupTableProxy.newInstance()
    context.images.lookupTableProxies.set('labelImage', lookupTableProxy)
  }

  const currentLut = lookupTableProxy.getPresetName()
  if (currentLut !== lut) {
    // If we are not using the vtk.js / Reference
    applyCategoricalColorToLookupTableProxy(
      lookupTableProxy,
      Array.from(actorContext.labelImageLabelNames.keys()),
      lut
    )
  }

  context.service.send('RENDER')
}

export default applyLookupTable
