import applyColorRangeBounds from './applyColorRangeBounds'
import applyColorRange from './applyColorRange'
import applyColorMap from './applyColorMap'

function selectImageComponent(context, event) {
  context.images.componentSelector.value = event.data

  const name = event.data.name
  const actorContext = context.images.actorContext.get(name)
  const component = event.data.component

  const transferFunctionWidget = context.images.transferFunctionWidget

  if (actorContext.colorRanges.has(component)) {
    const range = actorContext.colorRanges.get(component)
    applyColorRange(context, {
      data: {
        name,
        component,
        range,
      },
    })
    transferFunctionWidget.setDataRange(range)
  }

  const piecewiseFuncitonPoints = actorContext.piecewiseFunctionPoints.get(
    component
  )
  if (transferFunctionWidget && piecewiseFuncitonPoints) {
    transferFunctionWidget.setPoints(piecewiseFuncitonPoints)
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

  context.service.send({
    type: 'UPDATE_IMAGE_HISTOGRAM',
    data: { name, component },
  })
}

export default selectImageComponent
