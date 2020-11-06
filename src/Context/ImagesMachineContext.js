class ImageMachineContext {
  // Images to be visualized, a map of the unique name string identifier to the
  // image.
  images = new Map()

  // Label maps to be visualized, a map of the unique name string identifier
  // to the label map.
  labelMaps = new Map()

  // Whether slicing planes are enabled in the 3D volume rendering.
  slicingPlanesEnabled = false
}

export default ImageMachineContext
