export function applyComponentWeights(context, name) {
  const actorContext = context.images.actorContext.get(name)

  const { labelImageBlend } = actorContext

  if (context.images.representationProxy) {
    const volume = context.images.representationProxy.getVolumes()[0]
    const volumeProperty = volume.getProperty()
    const sliceActor = context.images.representationProxy.getActors()[0]
    const sliceProperty = sliceActor.getProperty()

    const visualizedComponents = actorContext.visualizedComponents
    const componentVisibilities = actorContext.componentVisibilities
    const weight = 1.0 - labelImageBlend

    visualizedComponents.forEach((componentIdx, fusedImgIdx) => {
      let compWeight = componentVisibilities[componentIdx] ? weight : 0
      if (componentIdx < 0) {
        compWeight = labelImageBlend
      }
      volumeProperty.setComponentWeight(fusedImgIdx, compWeight)
      sliceProperty.setComponentWeight(fusedImgIdx, compWeight)
    })

    context.service.send('RENDER')
  }
}
