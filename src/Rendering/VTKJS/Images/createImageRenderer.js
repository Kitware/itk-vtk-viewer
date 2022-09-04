import vtkImageData from 'vtk.js/Sources/Common/DataModel/ImageData'
import applyIndependentComponents from './applyIndependentComponents'
import applyXSlice from '../Main/applyXSlice'
import applyYSlice from '../Main/applyYSlice'
import applyZSlice from '../Main/applyZSlice'

import '../vtk/OpenGLImageMapperFractional' // calls registerOverride('vtkImageMapper', newInstance)

async function createImageRenderer(context) {
  if (!context.images.source) {
    context.images.source = context.proxyManager.createProxy(
      'Sources',
      'TrivialProducer',
      { name: 'Image' }
    )
  }

  const actorContext = context.images.actorContext.get(
    context.images.selectedName
  )
  actorContext.fusedImage = vtkImageData.newInstance()

  applyIndependentComponents(context)
  applyXSlice(context, { data: context.main.xSlice })
  applyYSlice(context, { data: context.main.ySlice })
  applyZSlice(context, { data: context.main.zSlice })
}

export default createImageRenderer
