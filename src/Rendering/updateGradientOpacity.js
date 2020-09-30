function updateGradientOpacity(store) {
  const gradientOpacity = store.imageUI.gradientOpacity
  const dataArray = store.imageUI.representationProxy.getDataArray()
  const visualizedComponents = store.imageUI.visualizedComponents
  const volume = store.imageUI.representationProxy.getVolumes()[0]
  if (gradientOpacity === 0) {
    visualizedComponents.forEach((componentIdx, fusedImgIdx) => {
      volume.getProperty().setUseGradientOpacity(fusedImgIdx, false)
    })
  } else {
    visualizedComponents.forEach((componentIdx, fusedImgIdx) => {
      const dataRange = dataArray.getRange(componentIdx)
      volume.getProperty().setUseGradientOpacity(fusedImgIdx, true)
      const minV = Math.max(0.0, gradientOpacity - 0.3) / 0.7
      if (minV > 0.0) {
        volume
          .getProperty()
          .setGradientOpacityMinimumValue(
            fusedImgIdx,
            Math.exp(
              Math.log((dataRange[1] - dataRange[0]) * 0.2) * minV * minV
            )
          )
      } else {
        volume.getProperty().setGradientOpacityMinimumValue(fusedImgIdx, 0.0)
      }
      volume
        .getProperty()
        .setGradientOpacityMaximumValue(
          fusedImgIdx,
          Math.exp(
            Math.log((dataRange[1] - dataRange[0]) * 1.0) *
              gradientOpacity *
              gradientOpacity
          )
        )
    })
  }
  store.renderWindow.render()
}

export default updateGradientOpacity
