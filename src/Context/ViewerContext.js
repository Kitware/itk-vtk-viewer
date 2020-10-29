const STYLE_CONTAINER = {
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

class ViewerContext {
  use2D = false
  style = {
    backgroundColor: [0.5, 0.5, 0.5],
    containerStyle: STYLE_CONTAINER,
  }
  // Contains the viewer container div and optionally the debugger
  rootContainer = null
  container = null
}

export default ViewerContext
