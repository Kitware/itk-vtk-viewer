import applyColorRangeBounds from './applyColorRangeBounds'
import applyColorRange from './applyColorRange'
import updateRenderedImageInterface from './updateRenderedImageInterface'

function selectImageComponent(context, event) {
  context.images.componentSelector.value = event.data
  console.log('IMAGE COMPonent', event.data)

  const name = context.images.selectedName
  const actorContext = context.images.actorContext.get(name)

  updateRenderedImageInterface(context, { data: name })

  if (actorContext.colorRanges.has(name)) {
    applyColorRange(context, {
      data: {
        name,
        component: actorContext.selectedComponent,
        range: actorContext.colorRanges.get(name),
      },
    })
  }

  if (actorContext.colorRangeBounds.has(name)) {
    applyColorRangeBounds(context, {
      data: {
        name,
        component: actorContext.selectedComponent,
        range: actorContext.colorRangeBounds.get(name),
      },
    })
  }

  if (actorContext.colorMaps.has(name)) {
    applyColorMap(context, {
      data: {
        name,
        component: actorContext.selectedComponent,
        colorMap: actorContext.colorMaps.get(name),
      },
    })
    context.images.iconSelector.setSelectedValue(colorMaps)
  }
}

export default selectImageComponent
