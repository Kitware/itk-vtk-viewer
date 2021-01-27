import vtkITKHelper from 'vtk.js/Sources/Common/DataModel/ITKHelper'

function updateRenderedImageInterface(context, event) {
  const name = event.data
  const actorContext = context.images.actorContext.get(name)
  const visualizedComponents = actorContext.visualizedComponents
  const transferFunctionWidget = context.images.transferFunctionWidget

  // Apply piecewise functions
  for (let i = 0; i < visualizedComponents.length; i++) {
    const component = visualizedComponents[i]
    if (component < 0) {
      continue
    }
    context.images.selectedComponent = component
    const gaussians = actorContext.piecewiseFunctionGaussians.get(component)
    if (transferFunctionWidget && gaussians) {
      transferFunctionWidget.setGaussians(gaussians)
      const dataRange = actorContext.colorRanges.get(component)
      const range = transferFunctionWidget.getOpacityRange(dataRange)
      const nodes = transferFunctionWidget.getOpacityNodes(dataRange)
      context.service.send({
        type: 'IMAGE_PIECEWISE_FUNCTION_CHANGED',
        data: {
          name,
          component,
          range,
          nodes,
        },
      })
    }
  }

  const selectedComponent = context.images.selectedComponent
  const gaussians = actorContext.piecewiseFunctionGaussians.get(
    selectedComponent
  )
  if (transferFunctionWidget && gaussians) {
    transferFunctionWidget.setGaussians(gaussians)
  }

  // Todo: remove
  const renderedImage = actorContext.renderedImage
  if (!renderedImage) {
    return
  }

  const vtkImage = vtkITKHelper.convertItkToVtkImage(renderedImage)
  const dataArray = vtkImage.getPointData().getScalars()
  transferFunctionWidget.setDataArray(dataArray.getData(), {
    numberOfComponents: renderedImage.imageType.components,
    selectedComponent,
  })
}

export default updateRenderedImageInterface
