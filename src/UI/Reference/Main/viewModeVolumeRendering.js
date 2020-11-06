function viewModeVolumeRendering(context) {
  context.main.viewMode = 'VolumeRendering'
  context.main.xPlaneButton.checked = false
  context.main.yPlaneButton.checked = false
  context.main.zPlaneButton.checked = false
  context.main.volumeRenderingButton.checked = true
}

export default viewModeVolumeRendering
