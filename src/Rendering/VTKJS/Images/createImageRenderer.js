import vtkITKHelper from 'vtk.js/Sources/Common/DataModel/ITKHelper'
import applyIndependentComponents from './applyIndependentComponents'

async function createImageRenderer(context) {
  if (!!!context.images.source) {
    context.images.source = context.proxyManager.createProxy(
      'Sources',
      'TrivialProducer',
      { name: 'Image' }
    )
  }

  applyIndependentComponents(context)
}

export default createImageRenderer
