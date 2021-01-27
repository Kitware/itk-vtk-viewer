class ImagesMachineContext {
  // Actors for rendering images and label images
  imageRenderingActors = new Map()

  // Context for the image actors
  actorContext = new Map()

  // Name of the selected image
  selectedName = 'Image'

  // Name of the image whose data needs to be updated
  updateRenderedName = 'Image'
}

export default ImagesMachineContext
