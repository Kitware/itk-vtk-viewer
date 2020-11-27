import updateAvailableComponents from './updateAvailableComponents'
import applyColorRangeBounds from './applyColorRangeBounds'
import applyColorRange from './applyColorRange'
import applyColorMap from './applyColorMap'

import vtkITKHelper from 'vtk.js/Sources/Common/DataModel/ITKHelper'

function updateImageInterface(context) {
  updateAvailableComponents(context)

  const name = context.images.selectedName
  const actorContext = context.images.actorContext.get(name)
  const image = actorContext.image
  const component = actorContext.selectedComponentIndex

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
      const colorMap = actorContext.colorMaps.get(component)
      applyColorMap(context, {
        data: {
          name,
          component,
          colorMap,
        },
      })
      context.images.iconSelector.setSelectedValue(colorMap)
    }
  }
}

export default updateImageInterface
