async function takeScreenshot(context) {
  // Todo: re-enable after context.image is redefined
  //const proxy = context.image.representationProxy
  let mapper = null
  //if (proxy) {
  //mapper = proxy.getMapper()
  //mapper.setAutoAdjustSampleDistances(false)
  //mapper.setImageSampleDistance(0.1)
  //}
  await context.itkVtkView.openCaptureImage()
  //if (proxy) {
  //mapper.setAutoAdjustSampleDistances(true)
  //}
}

export default takeScreenshot
