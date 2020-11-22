function updateVisualizedComponents(context, name) {
  const actorContext = context.images.actorContext.get(name)
  const image = actorContext.image
  const labelImage = actorContext.labelImage
  const editorLabelImage = actorContext.editorLabelImage
  if (image) {
    const imageComponents = image.imageType.components
    if (typeof actorContext.visualizedComponents === 'undefined') {
      actorContext.visualizedComponents = Array(image.imageType.components)
        .fill(0)
        .map((_, idx) => idx)
        .filter(i => actorContext.componentVisibilities[i])
    }

    actorContext.maxIntensityComponents = 4
    if (!!labelImage) {
      actorContext.maxIntensityComponents -= 1
    }
    if (!!editorLabelImage) {
      actorContext.maxIntensityComponents -= 1
    }

    const numVizComps = Math.min(
      imageComponents,
      actorContext.maxIntensityComponents
    )
    if (actorContext.visualizedComponents.length <= numVizComps) {
      return
    } else {
      actorContext.visualizedComponents = actorContext.visualizedComponents.slice(
        0,
        numVizComps
      )
      for (let i = numVizComps; i < imageComponents; i++) {
        context.service.send({
          type: 'IMAGE_COMPONENT_VISIBILITY_CHANGED',
          data: { name, component: i, visibility: false },
        })
      }
    }
  }
}

export default updateVisualizedComponents
