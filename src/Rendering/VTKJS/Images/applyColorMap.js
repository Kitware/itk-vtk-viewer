import { getColorMap } from 'itk-viewer-color-maps'

// We want an offset so there is contrast with label image colors
const COLOR_OFFSET = 146

function applyColorMap(context, { data: { name, colorMap, component } }) {
  const actorContext = context.images.actorContext.get(name)

  const colorTransferFunction = context.images.colorTransferFunctions.get(
    component
  )

  colorTransferFunction.applyColorMap(
    getColorMap(colorMap, component + COLOR_OFFSET)
  )
  if (actorContext.colorRanges.has(component)) {
    const range = actorContext.colorRanges.get(component)
    colorTransferFunction.setMappingRange(range[0], range[1])
    colorTransferFunction.updateRange()
  }

  // update UI
  context.service.send('IMAGE_COLOR_MAP_DEPENDENCIES_UPDATE', {
    data: {
      name,
      component,
    },
  })
  context.service.send('RENDER')
}

export default applyColorMap
