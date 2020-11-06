function viewModeYPlane(context) {
  context.main.viewMode = 'YPlane'
  context.main.xPlaneButton.checked = false
  context.main.yPlaneButton.checked = true
  context.main.zPlaneButton.checked = false
  context.main.volumeRenderingButton.checked = false
}

export default viewModeYPlane
