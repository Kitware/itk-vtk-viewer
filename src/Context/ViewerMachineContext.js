import MainMachineContext from './MainMachineContext'
import LayersMachineContext from './LayersMachineContext'
import ImagesMachineContext from './ImagesMachineContext'
import WidgetsMachineContext from './WidgetsMachineContext'

const defaultRenderingViewContainerStyle = {
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
      typeof config !== 'undefined' &&
      (typeof config.viewerConfigVersion === 'undefined' ||
        parseInt(config.viewerConfigVersion.split('.')[0]) ===
          parseInt(this.viewerConfigVersion.split('.')[0]))
    ) {
      if (typeof config.uiMachineOptions !== 'undefined') {
        this.uiMachineOptions = config.uiMachineOptions
      }
      if (typeof config.xyLowerLeft !== 'undefined') {
        this.xyLowerLeft = config.xyLowerLeft
      }
      if (typeof config.renderingViewContainerStyle !== 'undefined') {
        this.renderingViewContainerStyle = config.renderingViewContainerStyle
      }
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
    let uiMachineOptions = 'reference'
    if (this.uiMachineOptions.href) {
      uiMachineOptions = this.uiMachineOptions
    }
    const config = {
      uiMachineOptions,

      viewerConfigVersion: this.viewerConfigVersion,

      xyLowerLeft: this.xyLowerLeft,
      renderingViewContainerStyle: { ...this.renderingViewContainerStyle },
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
  viewerConfigVersion = '0.3'

  // How to render the user interface, Either 'reference' or { href: 'https://url.to/uiMachineOptionsESM.js, export: 'default' }, or a JavaScript object with the ui machine options
  uiMachineOptions = 'reference'

  // Unique identifier used to identify a viewer in the DOM when multiple are
  // on a page
  id = 'itk-vtk-viewer'

  // A 2D viewer versus a 3D viewer
  use2D = false

  // When viewing the Z slice, the X-Y plane, is the origin in the lower left
  // or upper left?
  xyLowerLeft = false

  // Container's (html div's) containing rendering views
  renderingViewContainers = new Map()

  // Style of the container for the rendering views
  renderingViewContainerStyle = defaultRenderingViewContainerStyle

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
