class ImageActorContext {
  // MultiscaleChunkedImage to be visualized
  image = null

  // MultiscaleChunked label image to be visualized
  labelImage = null

  // MultiscaleChunked label image to be visualized for use with
  // interactive, manual editing as opposed to stored or algorithmic results
  editorLabelImage = null

  // Whether the image components are dependent, e.g. RGB, are independent, in
  // which they are passed through separate color maps
  independentComponents = true

  // For multi-component images, the selected component index
  selectedComponentIndex = 0

  // Maximum number of intensity components that can be visualized
  maxIntensityComponents = 3

  // The index of the last component whose visibility changed
  lastComponentVisibilityChanged = 0

  // Whether a given image component is visible
  visualizedComponents = [true]

  colorMaps = new Map()
  colorRanges = new Map()
  opacityGaussians = new Map()

  blendMode = 0
  useShadow = true

  // Gradient opacity in the volume rendering
  gradientOpacity = 0.2
  volumeSampleDistance = 0.25

  labelMapBlend = 0.5
  labelMapLookupTable = 'glasbey'
  labelMapWeights = []
  labelMapToggleWeight
  selectedLabel = 'all'
}

export default ImageActorContext
