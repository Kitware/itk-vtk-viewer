async function takeScreenshot(context) {
  const proxy = context.images.representationProxy
  let mapper = null
  let imageSampleDistance = 1.0
  if (proxy) {
    mapper = proxy.getMapper()
    mapper.setAutoAdjustSampleDistances(false)
    imageSampleDistance = mapper.getImageSampleDistance()
    mapper.setImageSampleDistance(0.1)
  }
  await context.itkVtkView.openCaptureImage()
  if (proxy) {
    mapper.setImageSampleDistance(imageSampleDistance)
    mapper.setAutoAdjustSampleDistances(true)
  }
}

export default takeScreenshot
