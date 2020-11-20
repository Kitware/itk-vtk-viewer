import updateFusedImage from './updateFusedImage'

function applyComponentVisibility(context, event) {
  const name = event.data.name
  const index = event.data.index
  const visibility = event.data.visibility

  const actorContext = context.images.actorContext.get(name)
  const componentVisibilities = actorContext.componentVisibilities
  const visualizedComponents = actorContext.visualizedComponents

  if (visibility && visualizedComponents.indexOf(index) < 0) {
    visualizedComponents.push(index)
    for (let i = 0; i < visualizedComponents.length; i++) {
      if (!componentVisibilities[visualizedComponents[i]]) {
        visualizedComponents.splice(i, 1)
        break
      }
    }
    updateFusedImage(context, name)
  }

  const fusedImageIndex = componentVisibilities.indexOf(index)
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
    componentVisibilities.forEach((componentIdx, fusedImgIdx) => {
      componentsVisible = weight > 0.0 ? true : componentsVisible
    })
    if (!!context.images.labelImage || !!context.images.editorLabelImage) {
      let mode = OpacityMode.PROPORTIONAL
      if (!componentsVisible) {
        mode = OpacityMode.FRACTIONAL
      }
      for (
        let comp = componentVisibilities.length;
        comp < actorContext.fusedImage;
        comp++
      ) {
        volumeProperty.setOpacityMode(comp, mode)
      }
    }
  })
}

export default applyComponentVisibility
