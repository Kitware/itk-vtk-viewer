import vtkITKHelper from 'vtk.js/Sources/Common/DataModel/ITKHelper'

function updateRenderedImageInterface(context, event) {
  const name = event.data
  const actorContext = context.images.actorContext.get(name)
  const component = actorContext.selectedComponent

  const gaussians = actorContext.piecewiseFunctionGaussians.get(component)
  const transferFunctionWidget = context.images.transferFunctionWidget
  transferFunctionWidget.setGaussians(gaussians)
  transferFunctionWidget.modified()

  // Todo: remove
  const renderedImage = actorContext.renderedImage
  if (!renderedImage) {
    return
  }

  const vtkImage = vtkITKHelper.convertItkToVtkImage(renderedImage)
  const dataArray = vtkImage.getPointData().getScalars()
  transferFunctionWidget.setDataArray(dataArray.getData(), {
    numberOfComponents: renderedImage.imageType.components,
    component,
  })
}

export default updateRenderedImageInterface
