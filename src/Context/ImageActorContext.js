class ImageActorContext {
  // MultiscaleChunkedImage to be visualized
  image = null

  // The rendered image, derived from the overall `image`
  renderedImage = null

  // MultiscaleChunked label image to be visualized
  labelImage = null

  // MultiscaleChunked label image to be visualized for use with
  // interactive, manual editing as opposed to stored or algorithmic results
  editorLabelImage = null

  // Whether the image components are dependent, e.g. RGB, are independent, in
  // which they are passed through separate color maps
  // An initial null value will be replaced by heuristics based on the image
  // component type and number of components.
  independentComponents = null

  // Enable interpolation on slicing planes
  interpolationEnabled = true

  // For multi-component images, the selected component index
  selectedComponent = 0

  // Maximum number of intensity components that can be visualized
  maxIntensityComponents = 3

  // The index of the last component whose visibility changed
  lastComponentVisibilityChanged = 0

  // Whether a given image intensity component is visible
  componentVisibilities = [true]

  // Map of image intensity component to color maps
  colorMaps = new Map()

  // Map of image intensity component to array of [minValue, maxValue] for
  // mapping colors
  colorRanges = new Map()

  // Map of image intensity component to array of [minBound, maxBound] for
  // limiting the color range in the UI
  colorRangeBounds = new Map()

  // Map of the image intensity component to an object representing the
  // piecewise function. This object has two properties: range and nodes.
  // The range property is a [min, max] array of intensity values. The nodes
  // property is a an array of { x, y, midpoint, sharpness } objects
  // characterizing a VTK piecewise function
  piecewiseFunctions = new Map()

  // Map of the image intensity component to the array of
  // { position, width, xBias, yBias } gaussian parameters that define the
  // piecewise functions
  piecewiseFunctionGaussians = new Map()

  // Use gradient-based shadows in the volume rendering
  shadowEnabled = true

  // Gradient opacity weight in the volume rendering
  gradientOpacity = 0.5

  // Gradient opacity scale in the volume rendering
  gradientOpacityScale = 0.5

  // Distance in depth samples for the volume rendering
  volumeSampleDistance = 0.25

  // Volume rendering blend mode
  blendMode = 'Composite'

  labelImageBlend = 0.5

  labelImageLookupTable = 'glasbey'

  labelImageWeights = []

  labelImageToggleWeight = 0.1

  // String names for the label values
  labelImageLabelNames = null

  selectedLabel = 'all'
}

export default ImageActorContext
