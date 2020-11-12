function updateVisualizedComponents(actorContext, name) {
  const image = actorContext.image
  const labelImage = actorContext.labelImage
  const editorLabelImage = actorContext.editorLabelImage
  if (image) {
    const imageComponents = image.imageType.components

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
    const vizComps = []
    for (let i = 0; i < numVizComps; i++) {
      vizComps.push(i)
    }
    actorContext.visualizedComponents = vizComps
  }
}

export default updateVisualizedComponents
