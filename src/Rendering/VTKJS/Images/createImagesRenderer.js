function createImagesRendering(context, event) {
  context.images.source = context.proxyManager.createProxy(
    'Sources',
    'TrivialProducer',
    { name: 'Image' }
  )
}

export default createImagesRendering
