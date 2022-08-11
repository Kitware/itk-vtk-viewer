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
  const image = new Image()
  const base64PNG = await context.itkVtkView.captureImage().then(imageURL => {
    image.src = imageURL
    const w = window.open('', '_blank')
    w.document.write(image.outerHTML)
    w.document.title = 'vtk.js Image Capture'
    window.focus()
    return imageURL
  })
  context.service.send({ type: 'SCREENSHOT_TAKEN', data: base64PNG })
  if (proxy) {
    mapper.setImageSampleDistance(imageSampleDistance)
    mapper.setAutoAdjustSampleDistances(true)
  }
}

export default takeScreenshot
