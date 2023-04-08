import { getColorMap } from 'itk-viewer-color-maps'

// We want an offset so there is contrast with label image colors
const COLOR_OFFSET = 146

function applyColorMap(context, { data: { name, colorMap, component } }) {
  const actorContext = context.images.actorContext.get(name)

  // Optional chain on colorTransferFunctions in case compare set in createViewer
  const colorTransferFunction = context.images.colorTransferFunctions?.get(
    component
  )

  // if number of components increased after compare set and applyRenderedImage has not happened yet
  if (!colorTransferFunction) return

  colorTransferFunction.applyColorMap(
    getColorMap(colorMap, component + COLOR_OFFSET)
  )
  colorTransferFunction.modified() // applyColorMap does not always trigger modified()
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
