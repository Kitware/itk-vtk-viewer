function viewModeYPlane(context) {
  context.main.xPlaneButton.checked = false
  context.main.yPlaneButton.checked = true
  context.main.zPlaneButton.checked = false
  context.main.volumeButton.checked = false

  if (!context.main.planeUIGroup) {
    return
  }
  if (!context.use2D) {
    context.main.xPlaneVisibleButton.style.display = 'none'
    context.main.xPlaneInvisibleButton.style.display = 'none'

    context.main.yPlaneVisibleButton.style.display = 'none'
    context.main.yPlaneInvisibleButton.style.display = 'none'

    context.main.zPlaneVisibleButton.style.display = 'none'
    context.main.zPlaneInvisibleButton.style.display = 'none'
  }
  context.main.planeUIGroup.style.display = 'block'
  context.main.xPlaneRow.style.display = 'none'
  context.main.yPlaneRow.style.display = 'flex'
  context.main.zPlaneRow.style.display = 'none'
}

export default viewModeYPlane
