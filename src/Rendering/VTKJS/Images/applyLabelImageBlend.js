function applyLabelImageBlend(context, event) {
  const name = event.data.name

  const actorContext = context.images.actorContext.get(name)
  const labelImageBlend = event.data.labelImageBlend

  if (!!context.images.representationProxy) {
    const volume = context.images.representationProxy.getVolumes()[0]
    const volumeProperty = volume.getProperty()
    const sliceActor = context.images.representationProxy.getActors()[0]
    const sliceProperty = sliceActor.getProperty()

    const visualizedComponents = actorContext.visualizedComponents
    const componentVisibilities = actorContext.componentVisibilities
    const weight = 1.0 - labelImageBlend

    visualizedComponents.forEach((componentIdx, fusedImgIdx) => {
      if (componentVisibilities[componentIdx]) {
        volumeProperty.setComponentWeight(fusedImgIdx, weight)
        sliceProperty.setComponentWeight(fusedImgIdx, weight)
      }
    })
    context.service.send('RENDER')
  }
}

export default applyLabelImageBlend
