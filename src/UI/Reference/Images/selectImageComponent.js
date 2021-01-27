import applyColorRangeBounds from './applyColorRangeBounds'
import applyColorRange from './applyColorRange'
import updateRenderedImageInterface from './updateRenderedImageInterface'
import applyColorMap from './applyColorMap'

function selectImageComponent(context, event) {
  context.images.componentSelector.value = event.data

  const name = event.data.name
  const actorContext = context.images.actorContext.get(name)
  const component = event.data.component

  updateRenderedImageInterface(context, { data: name })

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
}

export default selectImageComponent
