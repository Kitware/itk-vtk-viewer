function updateLabelMapComponentWeight(store) {
  const labelMapOpacity = store.imageUI.labelMapOpacity
  const volume = store.imageUI.representationProxy.getVolumes()[0]
  const volumeProperty = volume.getProperty()
  const sliceActor = store.imageUI.representationProxy.getActors()[0]
  const sliceProperty = sliceActor.getProperty()
  const numberOfComponents = store.imageUI.numberOfComponents
  for (let c = 0; c < numberOfComponents; c++) {
    volumeProperty.setComponentWeight(c, 1.0 - labelMapOpacity)
    sliceProperty.setComponentWeight(c, 1.0 - labelMapOpacity)
  }
  volumeProperty.setComponentWeight(numberOfComponents, labelMapOpacity)
  sliceProperty.setComponentWeight(numberOfComponents, labelMapOpacity)
}

export default updateLabelMapComponentWeight
