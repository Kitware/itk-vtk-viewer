import vtkITKHelper from 'vtk.js/Sources/Common/DataModel/ITKHelper'

function updateRenderedImageInterface(context, event) {
  const name = event.data
  const actorContext = context.images.actorContext.get(name)
  const renderedImage = actorContext.renderedImage
  const component = actorContext.selectedComponent

  if (!renderedImage) {
    return
  }

  const vtkImage = vtkITKHelper.convertItkToVtkImage(renderedImage)
  const dataArray = vtkImage.getPointData().getScalars()
  const transferFunctionWidget = context.images.transferFunctionWidget
  transferFunctionWidget.setDataArray(dataArray.getData(), {
    numberOfComponents: renderedImage.imageType.components,
    component,
  })

  const gaussians = actorContext.piecewiseFunctionGaussians.get(component)
  transferFunctionWidget.setGaussians(gaussians)
}

export default updateRenderedImageInterface
