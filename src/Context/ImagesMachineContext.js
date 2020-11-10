class ImageMachineContext {
  // Images to be visualized, a map of the unique name string identifier to the
  // image.
  images = new Map()

  // Label images to be visualized, a map of the unique name string identifier
  // to the label image.
  labelImages = new Map()

  // Whether slicing planes are enabled in the 3D volume rendering.
  slicingPlanesEnabled = false

  // Actors for rendering images and label images
  imageRenderingActors = new Map()
}

export default ImageMachineContext
