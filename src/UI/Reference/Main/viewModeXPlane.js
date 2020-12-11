function viewModeXPlane(context) {
  context.main.xPlaneButton.checked = true
  context.main.yPlaneButton.checked = false
  context.main.zPlaneButton.checked = false
  context.main.volumeButton.checked = false

  context.main.planeUIGroup.style.display = 'block'
  context.main.xPlaneRow.style.display = 'flex'
  context.main.yPlaneRow.style.display = 'none'
  context.main.zPlaneRow.style.display = 'none'
}

export default viewModeXPlane
