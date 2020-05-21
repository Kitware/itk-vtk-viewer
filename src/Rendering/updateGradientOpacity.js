function updateGradientOpacity(store) {
  const gradientOpacity = store.imageUI.gradientOpacity
  const dataArray = store.imageUI.representationProxy.getDataArray()
  const numberOfComponents = store.imageUI.numberOfComponents
  const volume = store.imageUI.representationProxy.getVolumes()[0]
  if (gradientOpacity === 0) {
    for (let component = 0; component < numberOfComponents; component++) {
      volume.getProperty().setUseGradientOpacity(component, false)
    }
  } else {
    for (let component = 0; component < numberOfComponents; component++) {
      const dataRange = dataArray.getRange(component)
      volume.getProperty().setUseGradientOpacity(component, true)
      const minV = Math.max(0.0, gradientOpacity - 0.3) / 0.7
      if (minV > 0.0) {
        volume
          .getProperty()
          .setGradientOpacityMinimumValue(
            component,
            Math.exp(
              Math.log((dataRange[1] - dataRange[0]) * 0.2) * minV * minV
            )
          )
      } else {
        volume.getProperty().setGradientOpacityMinimumValue(component, 0.0)
      }
      volume
        .getProperty()
        .setGradientOpacityMaximumValue(
          component,
          Math.exp(
            Math.log((dataRange[1] - dataRange[0]) * 1.0) *
              gradientOpacity *
              gradientOpacity
          )
        )
    }
  }
  store.renderWindow.render()
}

export default updateGradientOpacity
