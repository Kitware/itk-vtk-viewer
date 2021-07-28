function viewModeVolume(context) {
  context.main.xPlaneButton.checked = false
  context.main.yPlaneButton.checked = false
  context.main.zPlaneButton.checked = false
  context.main.volumeButton.checked = true

  if (!context.main.planeUIGroup) {
    return
  }
  const slicingPlanes = context.main.slicingPlanes
  context.main.xPlaneVisibleButton.style.display = slicingPlanes.x.visible
    ? 'flex'
    : 'none'
  context.main.xPlaneInvisibleButton.style.display = slicingPlanes.x.visible
    ? 'none'
    : 'flex'
  context.main.yPlaneVisibleButton.style.display = slicingPlanes.y.visible
    ? 'flex'
    : 'none'
  context.main.yPlaneInvisibleButton.style.display = slicingPlanes.y.visible
    ? 'none'
    : 'flex'
  context.main.zPlaneVisibleButton.style.display = slicingPlanes.z.visible
    ? 'flex'
    : 'none'
  context.main.zPlaneInvisibleButton.style.display = slicingPlanes.z.visible
    ? 'none'
    : 'flex'

  if (context.uiCollapsed) {
    context.main.planeUIGroup.style.display = 'none'
  } else {
    context.main.planeUIGroup.style.display = 'block'
    context.main.xPlaneRow.style.display = 'flex'
    context.main.yPlaneRow.style.display = 'flex'
    context.main.zPlaneRow.style.display = 'flex'
  }
}

export default viewModeVolume
