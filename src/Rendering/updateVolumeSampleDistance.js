function updateVolumeSampleDistance(store) {
  const distance = store.imageUI.volumeSampleDistance
  store.imageUI.representationProxy.setSampleDistance(distance)
  store.renderWindow.render()
}

export default updateVolumeSampleDistance
