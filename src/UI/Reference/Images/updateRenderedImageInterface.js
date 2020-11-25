import vtkITKHelper from 'vtk.js/Sources/Common/DataModel/ITKHelper'

function updateRenderedImageInterface(context, event) {
  const name = event.data
  const actorContext = context.images.actorContext.get(name)
  const renderedImage = actorContext.renderedImage

  if (!renderedImage) {
    return
  }

  const vtkImage = vtkITKHelper.convertItkToVtkImage(renderedImage)
  const dataArray = vtkImage.getPointData().getScalars()
  context.images.transferFunctionWidget.setDataArray(dataArray.getData(), {
    numberOfComponents: renderedImage.imageType.components,
    component: actorContext.selectedComponentIndex,
  })
}

export default updateRenderedImageInterface
