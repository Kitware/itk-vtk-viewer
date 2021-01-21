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
      if (componentIdx >= 0 && componentVisibilities[componentIdx]) {
        volumeProperty.setComponentWeight(fusedImgIdx, weight)
        sliceProperty.setComponentWeight(fusedImgIdx, weight)
      }
    })

    const labelComponent = actorContext.visualizedComponents.length - 1
    volumeProperty.setComponentWeight(labelComponent, labelImageBlend)
    sliceProperty.setComponentWeight(labelComponent, labelImageBlend)
    context.service.send('RENDER')
  }
}

export default applyLabelImageBlend
