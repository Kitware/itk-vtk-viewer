import { assign } from 'xstate'

const assignVisualizedComponents = assign({
  images: context => {
    const name = context.actorName
    const actorContext = context.images.actorContext.get(name)
    const image = actorContext.image
    const labelImage = actorContext.labelImage
    const editorLabelImage = actorContext.editorLabelImage
    if (image) {
      const imageComponents = image.imageType.components
      actorContext.visualizedComponents = Array(image.imageType.components)
        .fill(0)
        .map((_, idx) => idx)
        .filter(i => actorContext.componentVisibilities[i])

      actorContext.maxIntensityComponents = 4
      if (labelImage) {
        actorContext.maxIntensityComponents -= 1
      }
      if (editorLabelImage) {
        actorContext.maxIntensityComponents -= 1
      }

      const numVizComps = Math.min(
        imageComponents,
        actorContext.maxIntensityComponents
      )
      if (actorContext.visualizedComponents.length > numVizComps) {
        // turn off unrenderable components
        actorContext.visualizedComponents = actorContext.visualizedComponents.slice(
          0,
          numVizComps
        )
        const offComps = [...Array(imageComponents).keys()].filter(
          comp => !actorContext.visualizedComponents.includes(comp)
        )
        offComps.forEach(comp =>
          context.service.send({
            type: 'IMAGE_COMPONENT_VISIBILITY_CHANGED',
            data: { name, component: comp, visibility: false },
          })
        )
      }
    }
    if (labelImage) {
      actorContext.visualizedComponents =
        actorContext.visualizedComponents ?? []
      actorContext.visualizedComponents.push(-1)
    }

    return context.images
  },
})

export default assignVisualizedComponents
