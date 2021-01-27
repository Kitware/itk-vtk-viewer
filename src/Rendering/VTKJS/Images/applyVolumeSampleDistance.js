function applyVolumeSampleDistance(context, event) {
  const name = event.data.name
  const volumeSampleDistance = event.data.volumeSampleDistance

  if (!!context.images.representationProxy) {
    context.images.representationProxy.setSampleDistance(volumeSampleDistance)
    context.service.send('RENDER')
  }
}

export default applyVolumeSampleDistance
