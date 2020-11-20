import vtkITKHelper from 'vtk.js/Sources/Common/DataModel/ITKHelper'
import updateVisualizedComponents from './updateVisualizedComponents'

async function updateData(context) {
  const name = context.images.selectedName
  const actorContext = context.images.actorContext.get(name)

  updateVisualizedComponents(context, name)

  const image = actorContext.image
  if (image) {
    const topLevelImage = await image.levelLargestImage(image.topLevel)
    const imageData = vtkITKHelper.convertItkToVtkImage(topLevelImage)

    context.images.source.setInputData(imageData)
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
}

export default updateData
