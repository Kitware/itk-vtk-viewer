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
  const componentVisibilities = store.imageUI.componentVisibilities
  for (let c = 0; c < numberOfComponents; c++) {
    const componentVisibility = componentVisibilities[c]
    componentVisibility.weight = 1.0 - labelMapBlend
    if (componentVisibility.visible) {
      volumeProperty.setComponentWeight(c, componentVisibility.weight)
      sliceProperty.setComponentWeight(c, componentVisibility.weight)
    }
  }
  volumeProperty.setComponentWeight(numberOfComponents, labelMapBlend)
  sliceProperty.setComponentWeight(numberOfComponents, labelMapBlend)
}

export default updateLabelMapComponentWeight
