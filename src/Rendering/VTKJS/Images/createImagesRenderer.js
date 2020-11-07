function createImagesRendering(context, event) {
  context.images.source = context.proxyManager.createProxy(
    'Sources',
    'TrivialProducer',
    { name: 'Image' }
  )

  if (event.data) {
    // spawn
  }
}

export default createImagesRendering
