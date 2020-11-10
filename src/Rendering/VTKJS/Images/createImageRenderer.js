import vtkITKHelper from 'vtk.js/Sources/Common/DataModel/ITKHelper'

async function createImageRenderer(context) {
  console.log('createImageRenderer', context)
  const name = Array.from(context.images.images.keys()).pop()
  const image = context.images.images.get(name)
  const topLevelImage = await image.levelLargestImage(image.topLevel)
  const imageData = vtkITKHelper.convertItkToVtkImage(topLevelImage)

  context.images.source.setInputData(imageData)

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

export default createImageRenderer
