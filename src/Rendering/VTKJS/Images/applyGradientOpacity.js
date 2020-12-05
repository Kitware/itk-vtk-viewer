function applyGradientOpacity(context, event) {
  const name = event.data.name
  const gradientOpacity = event.data.gradientOpacity

  const actorContext = context.images.actorContext.get(name)
  const visualizedComponents = actorContext.visualizedComponents

  if (!!context.images.representationProxy) {
    const dataArray = context.images.representationProxy.getDataArray()
    const volume = context.images.representationProxy.getVolumes()[0]
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
    context.service.send('RENDER')
  }
}

export default applyGradientOpacity
