class ImageActorContext {
  // MultiscaleSpatialImage to be visualized
  image = null

  // The target image scale
  targetScale = null

  // The successfully loaded scale
  loadedScale = null

  // Automatically adjust the rendered scale
  isFramerateScalePickingOn = true

  // MultiscaleSpatialImage label image to be visualized
  labelImage = null

  // MultiscaleSpatialImage label image to be visualized for use with
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

  // Map of x,y point in 0 to 1 range.  Scaled by colorRanges.
  piecewiseFunctionPoints = new Map()

  // Use gradient-based shadows in the volume rendering
  shadowEnabled = true

  // Gradient opacity weight in the volume rendering
  gradientOpacity = 0.5

  // Gradient opacity scale in the volume rendering
  gradientOpacityScale = 0.5

  // Distance in depth samples for the volume rendering
  volumeSampleDistance = 0.2

  // Volume rendering blend mode
  blendMode = 'Composite'

  // Name of the labelImage layer
  labelImageName = null

  // Blend, 0.0 to 1.0 of the label image into the image
  labelImageBlend = 0.5

  // Color lookup table for the label image
  lookupTable = 'glasbey'

  // Rendering weights assigned to to labels, Map of label value to weight
  labelImageWeights = new Map()

  labelImageToggleWeight = 0.1

  // String names for the label values
  labelNames = new Map()

  // Label index selected for changes in the UI, or special 'all' value that
  // identifies all non-backgound (index 0) labels
  selectedLabel = 'all'

  // Cached histogram by component for use by UI when switching selected component
  histograms = new Map()
}

export default ImageActorContext
