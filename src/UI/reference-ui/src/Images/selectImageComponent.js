import applyColorRangeBounds from './applyColorRangeBounds'
import applyColorRange from './applyColorRange'
import applyColorMap from './applyColorMap'
import applyHistogram from './applyHistogram'

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
        dontUpdatePoints: true,
      },
    })
  }

  const piecewiseFunctionPoints = actorContext.piecewiseFunctionPoints.get(
    component
  )
  if (transferFunctionWidget && piecewiseFunctionPoints) {
    transferFunctionWidget.setPoints(piecewiseFunctionPoints)
  }

  if (actorContext.colorRangeBounds.has(component)) {
    // calls transferFunctionWidget.setDataRange(range)
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

  const histogram = actorContext.histograms.get(component)
  if (histogram) {
    applyHistogram(context, {
      data: {
        name,
        component,
        histogram,
      },
    })
  } else {
    context.service.send({
      type: 'UPDATE_IMAGE_HISTOGRAM',
      data: { name, component },
    })
  }
}

export default selectImageComponent
