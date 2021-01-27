import applyColorRangeBounds from './applyColorRangeBounds'
import applyColorRange from './applyColorRange'
import updateRenderedImageInterface from './updateRenderedImageInterface'
import applyColorMap from './applyColorMap'
import vtkITKHelper from 'vtk.js/Sources/Common/DataModel/ITKHelper'

function selectImageComponent(context, event) {
  context.images.componentSelector.value = event.data

  const name = event.data.name
  const actorContext = context.images.actorContext.get(name)
  const component = event.data.component

  const gaussians = actorContext.piecewiseFunctionGaussians.get(component)
  const transferFunctionWidget = context.images.transferFunctionWidget
  if (transferFunctionWidget && gaussians) {
    transferFunctionWidget.setGaussians(gaussians)
  }

  if (actorContext.colorRanges.has(component)) {
    applyColorRange(context, {
      data: {
        name,
        component,
        range: actorContext.colorRanges.get(component),
      },
    })
  }

  if (actorContext.colorRangeBounds.has(component)) {
    applyColorRangeBounds(context, {
      data: {
        name,
        component,
        range: actorContext.colorRangeBounds.get(component),
      },
    })
  }

  if (actorContext.colorMaps.has(component)) {
    applyColorMap(context, {
      data: {
        name,
        component,
        colorMap: actorContext.colorMaps.get(component),
      },
    })
    context.images.iconSelector.setSelectedValue(
      actorContext.colorMaps.get(component)
    )
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
    component,
  })
}

export default selectImageComponent
