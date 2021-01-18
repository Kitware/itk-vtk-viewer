import vtkLookupTableProxy from 'vtk.js/Sources/Proxy/Core/LookupTableProxy'
import { OpacityMode } from 'vtk.js/Sources/Rendering/Core/VolumeProperty/Constants'

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

  const uniqueLabels = Array.from(actorContext.uniqueLabels)

  const colorTransferFunction = lookupTableProxy.getLookupTable()
  colorTransferFunction.setMappingRange(
    uniqueLabels[0],
    uniqueLabels[uniqueLabels.length - 1]
  )

  const currentLut = lookupTableProxy.getPresetName()
  if (currentLut !== lookupTable) {
    // If we are not using the vtk.js / Reference
    applyCategoricalColorToLookupTableProxy(
      lookupTableProxy,
      uniqueLabels,
      lookupTable
    )
  }

  const volume = context.images.representationProxy.getVolumes()[0]
  const volumeProperty = volume.getProperty()

  const component = actorContext.visualizedComponents.length - 1
  volumeProperty.setRGBTransferFunction(component, colorTransferFunction)
  volumeProperty.setIndependentComponents(true)
  volumeProperty.setOpacityMode(component, OpacityMode.PROPORTIONAL)

  // The slice shows the same lut as the volume for label map
  const sliceActors = context.images.representationProxy.getActors()
  sliceActors.forEach(actor => {
    const actorProp = actor.getProperty()
    actorProp.setIndependentComponents(true)
    actorProp.setRGBTransferFunction(component, colorTransferFunction)
  })

  context.service.send('RENDER')
}

export default applyLookupTable
