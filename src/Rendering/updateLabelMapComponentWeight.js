function updateLabelMapComponentWeight(store) {
  if (!store.imageUI.haveLabelMap) {
    return
  }
  const labelMapBlend = store.imageUI.labelMapBlend
  const volume = store.imageUI.representationProxy.getVolumes()[0]
  const volumeProperty = volume.getProperty()
  const sliceActor = store.imageUI.representationProxy.getActors()[0]
  const sliceProperty = sliceActor.getProperty()
  const numberOfComponents = store.imageUI.numberOfComponents
  const visualizedComponents = store.imageUI.visualizedComponents
  const componentVisibilities = store.imageUI.componentVisibilities

  visualizedComponents.forEach((componentIdx, fusedImgIdx) => {
    const componentVisibility = componentVisibilities[componentIdx]
    componentVisibility.weight = 1.0 - labelMapBlend
    if (componentVisibility.visible) {
      volumeProperty.setComponentWeight(fusedImgIdx, componentVisibility.weight)
      sliceProperty.setComponentWeight(fusedImgIdx, componentVisibility.weight)
    }
  })

  volumeProperty.setComponentWeight(numberOfComponents, labelMapBlend)
  sliceProperty.setComponentWeight(numberOfComponents, labelMapBlend)
}

export default updateLabelMapComponentWeight
