function applyVolumeSampleDistance(context, event) {
  const name = event.data.name
  const volumeSampleDistance = event.data.volumeSampleDistance

  context.images.volumeSampleDistanceSlider.value = volumeSampleDistance
}

export default applyVolumeSampleDistance
