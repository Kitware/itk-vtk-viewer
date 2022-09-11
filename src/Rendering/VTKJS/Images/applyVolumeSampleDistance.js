function applyVolumeSampleDistance(context, event) {
  if (context.images.representationProxy) {
    const { volumeSampleDistance } = event.data
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
