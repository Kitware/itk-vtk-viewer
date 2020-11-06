function viewModeZPlane(context) {
  context.main.viewMode = 'ZPlane'
  context.main.xPlaneButton.checked = false
  context.main.yPlaneButton.checked = false
  context.main.zPlaneButton.checked = true
  context.main.volumeRenderingButton.checked = false
}

export default viewModeZPlane
