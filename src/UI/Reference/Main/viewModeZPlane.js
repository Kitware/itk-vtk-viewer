function viewModeZPlane(context) {
  context.main.xPlaneButton.checked = false
  context.main.yPlaneButton.checked = false
  context.main.zPlaneButton.checked = true
  context.main.volumeButton.checked = false

  context.main.planeUIGroup.style.display = 'block'
  context.main.xPlaneRow.style.display = 'none'
  context.main.yPlaneRow.style.display = 'none'
  context.main.zPlaneRow.style.display = 'flex'
}

export default viewModeZPlane
