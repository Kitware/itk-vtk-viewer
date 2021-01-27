class MainMachineContext {
  constructor(config) {
    if (!!config) {
      this.backgroundColor = config.backgroundColor
      this.units = config.units

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
      visible: false,
    },
    y: {
      min: 0.0,
      max: 1.0,
      step: 0.1,
      scroll: false,
      scrollDirection: 1,
      visible: false,
    },
    z: {
      min: 0.0,
      max: 1.0,
      step: 0.1,
      scroll: false,
      scrollDirection: 1,
      visible: false,
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
