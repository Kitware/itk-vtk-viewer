class MainMachineContext {
  constructor(config) {
    if (config) {
      if (typeof config.backgroundColor !== 'undefined') {
        this.backgroundColor = config.backgroundColor
      }
      if (typeof config.units !== 'undefined') {
        this.units = config.units
      }

      // Todo: more
    }
  }

  getConfig() {
    const config = {
      backgroundColor: [...this.backgroundColor],
      units: this.units,
    }

    return config
  }

  // Background color of the renderer
  backgroundColor = [0.5, 0.5, 0.5]

  // Background colors to step through when clicking the background color
  // button
  backgroundColors = [
    [0.5, 0.5, 0.5],
    [0, 0, 0],
    [1, 1, 1],
  ]

  // Index of the selected background color from the backgroundColors
  selectedBackgroundColor = 0

  // Is fullscreen mode enabled?
  fullscreenEnabled = false

  // Are annotations, e.g. pixel values, an orientation widget, displayed?
  annotationsEnabled = true

  // Continuously rotate the 3D rendering?
  rotateEnabled = false

  // Visualize the spatial axes on the viewable scene content
  axesEnabled = false

  // Spatial length units displayed in the scale bar
  units = ''

  // Cropping planes widget enabled
  croppingPlanesEnabled = false
  areCroppingPlanesTouched = false

  // Cropping planes. These typically define a box containing a region of
  // interest in space. The visualization is cropped outside of these planes.
  // Each is characterized with: { origin, normal }.
  //
  // origin: x,y,z point at a point in the plane
  // normal: 3-component vector defining the normal to the plane
  //
  // An example: An array of six planes. When the planes are axis aligned:
  // -x, +x, -y, +y, -z, +z
  croppingPlanes = null

  // In the single view layout, the an X plane, Y plane, Z plane, or volume
  // rendering.
  viewMode = 'Volume'

  // Current viewer frames per second
  fps = null

  // Slicing planes specification
  slicingPlanes = {
    x: {
      min: 0.0,
      max: 1.0,
      step: 0.1,
      scroll: false,
      scrollDirection: 1,
      visible: true,
    },
    y: {
      min: 0.0,
      max: 1.0,
      step: 0.1,
      scroll: false,
      scrollDirection: 1,
      visible: true,
    },
    z: {
      min: 0.0,
      max: 1.0,
      step: 0.1,
      scroll: false,
      scrollDirection: 1,
      visible: true,
    },
  }

  // x slice value
  xSlice = null
  // y slice value
  ySlice = null
  // z slice value
  zSlice = null
}

export default MainMachineContext
