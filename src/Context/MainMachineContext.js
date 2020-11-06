class MainMachineContext {
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

  // Enable interpolation on slicing planes
  interpolationEnabled = true

  // Spatial length units displayed in the scale bar
  units = ''

  // In the single view layout, the an X plane, Y plane, Z plane, or volume
  // rendering.
  viewMode = 'VolumeRendering'
}

export default MainMachineContext
