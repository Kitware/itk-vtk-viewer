function viewModeVolume(context) {
  const main = context.main

  if (main.xPlaneButton) {
    main.xPlaneButton.checked = false
  }
  if (main.yPlaneButton) {
    main.yPlaneButton.checked = false
  }
  if (main.zPlaneButton) {
    main.zPlaneButton.checked = false
  }
  if (main.volumeButton) {
    main.volumeButton.checked = true
  }

  if (!main.planeUIGroup) {
    return
  }
  const slicingPlanes = main.slicingPlanes
  main.xPlaneVisibleButton.style.display = slicingPlanes.x.visible
    ? 'flex'
    : 'none'
  main.xPlaneInvisibleButton.style.display = slicingPlanes.x.visible
    ? 'none'
    : 'flex'
  main.yPlaneVisibleButton.style.display = slicingPlanes.y.visible
    ? 'flex'
    : 'none'
  main.yPlaneInvisibleButton.style.display = slicingPlanes.y.visible
    ? 'none'
    : 'flex'
  main.zPlaneVisibleButton.style.display = slicingPlanes.z.visible
    ? 'flex'
    : 'none'
  main.zPlaneInvisibleButton.style.display = slicingPlanes.z.visible
    ? 'none'
    : 'flex'

  if (context.uiCollapsed) {
    main.planeUIGroup.style.display = 'none'
  } else {
    main.planeUIGroup.style.display = 'block'
    main.xPlaneRow.style.display = 'flex'
    main.yPlaneRow.style.display = 'flex'
    main.zPlaneRow.style.display = 'flex'
  }
}

export default viewModeVolume
