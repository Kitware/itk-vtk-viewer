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

    const colorTransferFunction = lookupTableProxy.getLookupTable()
    colorTransferFunction.setMappingRange(
      uniqueLabels[0],
      uniqueLabels[uniqueLabels.length - 1]
    )

    const volume = context.images.representationProxy.getVolumes()[0]
    const volumeProperty = volume.getProperty()

    const numberOfComponents = actorContext.image
      ? actorContext.image.imageType.components
      : 0
    volumeProperty.setRGBTransferFunction(
      numberOfComponents,
      colorTransferFunction
    )
    volumeProperty.setIndependentComponents(true)
    volumeProperty.setOpacityMode(numberOfComponents, OpacityMode.PROPORTIONAL)

    // The slice shows the same lut as the volume for label map
    const sliceActors = context.images.representationProxy.getActors()
    sliceActors.forEach(actor => {
      const actorProp = actor.getProperty()
      actorProp.setIndependentComponents(true)
      actorProp.setRGBTransferFunction(
        numberOfComponents,
        colorTransferFunction
      )
    })
  }

  const currentLut = lookupTableProxy.getPresetName()
  if (currentLut !== lut) {
    // If we are not using the vtk.js / Reference
    applyCategoricalColorToLookupTableProxy(
      lookupTableProxy,
      Array.from(actorContext.labelNames.keys()),
      lut
    )
  }

  context.service.send('RENDER')
}

export default applyLookupTable
