import vtkITKHelper from 'vtk.js/Sources/Common/DataModel/ITKHelper'
import updateVisualizedComponents from './updateVisualizedComponents'
import applyIndependentComponents from './applyIndependentComponents'

async function createImageRenderer(context) {
  if (!!!context.images.source) {
    context.images.source = context.proxyManager.createProxy(
      'Sources',
      'TrivialProducer',
      { name: 'Image' }
    )
  }
  const name = context.images.selectedName
  const actorContext = context.images.actorContext.get(name)
  // Whether the image components are independent and have separate color
  // mapping functions or they are dependent, e.g. RGB images.
  actorContext.independentComponents = true

  const image = actorContext.image
  if (image) {
    const topLevelImage = await image.levelLargestImage(image.topLevel)
    const imageData = vtkITKHelper.convertItkToVtkImage(topLevelImage)

    context.images.source.setInputData(imageData)
    actorContext.visualizedComponents = Array(image.imageType.components)
      .fill(0)
      .map((_, idx) => idx)
  }

  // VTK.js currently only supports a single image
  if (!!!context.images.representationProxy) {
    context.proxyManager.createRepresentationInAllViews(context.images.source)
    context.images.representationProxy = context.proxyManager.getRepresentation(
      context.images.source,
      context.itkVtkView
    )

    if (context.use2D) {
      context.itkVtkView.setViewMode('ZPlane')
      context.itkVtkView.setOrientationAxesVisibility(false)
    } else {
      context.itkVtkView.setViewMode('VolumeRendering')
    }

    const annotationContainer = context.container.querySelector('.js-se')
    annotationContainer.style.fontFamily = 'monospace'
  }

  updateVisualizedComponents(actorContext, name)
  applyIndependentComponents(context)
}

export default createImageRenderer
