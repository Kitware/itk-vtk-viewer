function applyVolumeSampleDistance(context, event) {
  const name = event.data.name
  const volumeSampleDistance = event.data.volumeSampleDistance

  if (!!context.images.representationProxy) {
    context.images.representationProxy.setSampleDistance(volumeSampleDistance)
    const sourceDS = context.images.representationProxy.getInputDataSet()
    const sampleDistance =
      0.7 *
      Math.sqrt(
        sourceDS
          .getSpacing()
          .map(v => v * v)
          .reduce((a, b) => a + b, 0)
      )
    context.images.representationProxy
      .getMapper()
      .setSampleDistance(
        sampleDistance * 2 ** (volumeSampleDistance * 3.0 - 1.5)
      )
    context.service.send('RENDER')
  }
}

export default applyVolumeSampleDistance
