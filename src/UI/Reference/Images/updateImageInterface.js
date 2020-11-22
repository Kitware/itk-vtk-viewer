import updateAvailableComponents from './updateAvailableComponents'
import applyColorRangeBounds from './applyColorRangeBounds'
import applyColorRange from './applyColorRange'
import applyColorMap from './applyColorMap'

function updateImageInterface(context) {
  updateAvailableComponents(context)

  const name = context.images.selectedName
  const actorContext = context.images.actorContext.get(name)
  const image = actorContext.image

  const collapsibleClass = `${context.id}-collapsible`
  // If not a 2D RGB image
  if (actorContext.independentComponents) {
    context.images.colorRangeInputRow.style.display = 'flex'
    context.images.colorRangeInputRow.classList.add(collapsibleClass)
    context.images.colorMapSelector.style.display = 'block'
  } else {
    context.images.colorRangeInputRow.style.display = 'none'
    context.images.colorRangeInputRow.classList.remove(collapsibleClass)
    context.images.colorMapSelector.style.display = 'none'
  }

  if (image) {
    if (actorContext.colorRanges.has(name)) {
      applyColorRange(context, {
        data: {
          name,
          component: actorContext.selectedComponentIndex,
          range: actorContext.colorRanges.get(name),
        },
      })
    }
    if (actorContext.colorRangeBounds.has(name)) {
      applyColorRangeBounds(context, {
        data: {
          name,
          component: actorContext.selectedComponentIndex,
          range: actorContext.colorRangeBounds.get(name),
        },
      })
    }
    if (actorContext.colorMaps.has(name)) {
      applyColorMap(context, {
        data: {
          name,
          component: actorContext.selectedComponentIndex,
          colorMap: actorContext.colorMaps.get(name),
        },
      })
      context.images.iconSelector.setSelectedValue(colorMaps)
    }
  }
}

export default updateImageInterface
