import MainMachineContext from './MainMachineContext'
import LayersMachineContext from './LayersMachineContext'
import ImagesMachineContext from './ImagesMachineContext'

const defaultContainerStyle = {
  position: 'relative',
  width: '100%',
  height: '100%',
  minHeight: '200px',
  minWidth: '450px',
  margin: '0',
  padding: '0',
  top: '0',
  left: '0',
  overflow: 'hidden',
}

class ViewerMachineContext {
  constructor() {
    this.id =
      'itk-vtk-viewer-' +
      performance
        .now()
        .toString()
        .replace('.', '')

    this.main = new MainMachineContext()
    this.layers = new LayersMachineContext()
    this.images = new ImagesMachineContext()
  }

  // Contains the viewer container div and optionally the debugger
  rootContainer = null

  // Contains the viewer
  container = null

  // Unique identifier used to identify a viewer in the DOM when multiple are
  // on a page
  id = 'itk-vtk-viewer'

  // A 2D viewer versus a 3D viewer
  use2D = false

  // Style of the container for the viewer
  containerStyle = defaultContainerStyle

  // Is a "dark mode" enabled in the user interface?
  uiDarkMode = false

  // Has the user interface been collapsed, leaving on the interactive
  // rendering?
  uiCollapsed = false

  // Main machine context
  main = null

  // Whether slicing planes are enabled in the 3D view mode.
  slicingPlanesEnabled = false

  // Layers machine context
  layers = null

  // Image machine context
  images = null
}

export default ViewerMachineContext
