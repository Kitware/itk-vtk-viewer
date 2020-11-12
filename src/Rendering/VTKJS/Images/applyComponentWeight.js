function applyComponentWeight(context, event) {
  const index = event.data.index
  const weight = event.data.weight
  const name = context.images.selectedName

  const actorContext = context.images.actorContext.get(name)
  const visualizedComponents = actorContext.visualizedComponents
  const fusedImageIndex = visualizedComponents.indexOf(index)
  const sliceActors = store.images.representationProxy.getActors()
  sliceActors.forEach((actor, actorIdx) => {
    const actorProp = actor.getProperty()
    actorProp.setComponentWeight(fusedImageIndex, weight)
  })

  const volumeProps = context.images.representationProxy.getVolumes()
  volumeProps.forEach((volume, volIdx) => {
    const volumeProperty = volume.getProperty()
    volumeProperty.setComponentWeight(fusedImageIndex, weight)
    volumeProperty.setOpacityMode(numberOfComponents, mode)

    let componentsVisible = false
    visualizedComponents.forEach((componentIdx, fusedImgIdx) => {
      componentsVisible = weight > 0.0 ? true : componentsVisible
    })
    if (!!context.images.labelImage || !!context.images.editorLabelImage) {
      let mode = OpacityMode.PROPORTIONAL
      if (!componentsVisible) {
        mode = OpacityMode.FRACTIONAL
      }
      for (
        let comp = visualizedComponents.length;
        comp < actorContext.fusedImage;
        comp++
      ) {
        volumeProperty.setOpacityMode(comp, mode)
      }
    }
  })
}

export default applyComponentWeight
