import vtkImageData from 'vtk.js/Sources/Common/DataModel/ImageData'
import applyIndependentComponents from './applyIndependentComponents'

async function createImageRenderer(context) {
  if (!!!context.images.source) {
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
  actorContext.lastVisualizedComponents = []

  applyIndependentComponents(context)

  context.images.lookupTableProxies = new Map()
  context.images.piecewiseFunctionProxies = new Map()
}

export default createImageRenderer
