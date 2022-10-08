import vtkColorTransferFunction from 'vtk.js/Sources/Rendering/Core/ColorTransferFunction'
import { OpacityMode } from 'vtk.js/Sources/Rendering/Core/VolumeProperty/Constants'

import applyCategoricalColorToColorTransferFunction from '../../../UI/reference-ui/src/applyCategoricalColorToColorTransferFunction'

function applyLookupTable(context, event) {
  const name = event.data.name
  const actorContext = context.images.actorContext.get(name)

  const lookupTable = event.data.lookupTable

  let colorTransferFunction = null
  if (context.images.colorTransferFunctions.has('labelImage')) {
    colorTransferFunction = context.images.colorTransferFunctions.get(
      'labelImage'
    )
  } else {
    colorTransferFunction = vtkColorTransferFunction.newInstance()
    context.images.colorTransferFunctions.set(
      'labelImage',
      colorTransferFunction
    )
  }

  // wait for assignRenderedImage which computes uniqueLabels, then applyRenderedImage calls applyLookupTable
  if (!actorContext.uniqueLabels) return

  const uniqueLabels = Array.from(actorContext.uniqueLabels)

  colorTransferFunction.setMappingRange(
    uniqueLabels[0],
    uniqueLabels[uniqueLabels.length - 1]
  )

  applyCategoricalColorToColorTransferFunction(
    colorTransferFunction,
    uniqueLabels,
    lookupTable
  )

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
