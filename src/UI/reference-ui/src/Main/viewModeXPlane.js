function viewModeXPlane(context) {
  const main = context.main

  if (main.xPlaneButton) {
    main.xPlaneButton.checked = true
  }
  if (main.yPlaneButton) {
    main.yPlaneButton.checked = false
  }
  if (main.zPlaneButton) {
    main.zPlaneButton.checked = false
  }
  if (main.volumeButton) {
    main.volumeButton.checked = false
  }

  if (!main.planeUIGroup) {
    return
  }
  if (!context.use2D) {
    main.xPlaneVisibleButton.style.display = 'none'
    main.xPlaneInvisibleButton.style.display = 'none'

    main.yPlaneVisibleButton.style.display = 'none'
    main.yPlaneInvisibleButton.style.display = 'none'

    main.zPlaneVisibleButton.style.display = 'none'
    main.zPlaneInvisibleButton.style.display = 'none'
  }
  main.planeUIGroup.style.display = 'block'
  main.xPlaneRow.style.display = 'flex'
  main.yPlaneRow.style.display = 'none'
  main.zPlaneRow.style.display = 'none'
}

export default viewModeXPlane
