import MainMachineContext from './MainMachineContext'
import LayersMachineContext from './LayersMachineContext'
import ImagesMachineContext from './ImagesMachineContext'
import WidgetsMachineContext from './WidgetsMachineContext'

const defaultContainerStyle = {
  position: 'relative',
  width: '100%',
  height: 'auto',
  //height: '100%',
  minHeight: '200px',
  minWidth: '450px',
  margin: '0',
  padding: '0',
  top: '0',
  left: '0',
  flex: '1 1 0px',
  overflow: 'hidden',
}

class ViewerMachineContext {
  constructor(config) {
    this.id = `itk-vtk-viewer-${performance
      .now()
      .toString()
      .replace('.', '')}`
    if (
      !!config &&
      parseInt(config.viewerConfigVersion.split('.')[0]) ===
        parseInt(this.viewerConfigVersion.split('.')[0])
    ) {
      if (typeof config.xyLowerLeft !== 'undefined') {
        this.xyLowerLeft = config.xyLowerLeft
      }
      this.containerStyle = config.containerStyle
      if (typeof config.uiCollapsed !== 'undefined') {
        this.uiCollapsed = config.uiCollapsed
      }

      this.main = new MainMachineContext(config.main)
    } else {
      this.main = new MainMachineContext()
    }

    // Todo: add config serialization / deserializeation
    this.layers = new LayersMachineContext()
    this.images = new ImagesMachineContext()
    this.widgets = new WidgetsMachineContext()
  }

  getConfig() {
    const config = {
      viewerConfigVersion: this.viewerConfigVersion,

      xyLowerLeft: this.xyLowerLeft,
      containerStyle: { ...this.containerStyle },
      uiCollapsed: this.uiCollapsed,

      main: this.main.getConfig(),
    }

    return config
  }

  // Contains the viewer container div and optionally the debugger
  rootContainer = null

  // Contains the viewer
  container = null

  // Version for compatibility check
  viewerConfigVersion = '0.2'

  // Unique identifier used to identify a viewer in the DOM when multiple are
  // on a page
  id = 'itk-vtk-viewer'

  // A 2D viewer versus a 3D viewer
  use2D = false

  // When viewing the Z slice, the X-Y plane, is the origin in the lower left
  // or upper left?
  xyLowerLeft = false

  // Style of the container for the viewer
  containerStyle = defaultContainerStyle

  // Is a "dark mode" enabled in the user interface?
  uiDarkMode = false

  // Has the user interface been collapsed, leaving on the interactive
  // rendering?
  uiCollapsed = false

  // Main machine context
  main = null

  // Widgets machine context
  widgets = null

  // Layers machine context
  layers = null

  // Image machine context
  images = null
}

export default ViewerMachineContext
