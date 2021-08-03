function applySlicingPlanes(context, event) {
  const slicingPlanes = event.data
  const main = context.main

  if (context.use2D) {
    if (main.viewPlanesButton) {
      main.viewPlanesButton.style.display = 'none'
    }
    return
  }

  if (
    !slicingPlanes.x.visibile &&
    !slicingPlanes.y.visible &&
    !slicingPlanes.z.visible
  ) {
    if (main.viewPlanesButtonInput) {
      main.viewPlanesButtonInput.checked = false
    }
  } else {
    if (main.viewPlanesButtonInput) {
      main.viewPlanesButtonInput.checked = true
    }
  }

  if (!main.planeUIGroup) {
    return
  }

  main.xSliceElement.min = slicingPlanes.x.min
  main.xSliceElement.max = slicingPlanes.x.max
  main.xSliceElement.step = slicingPlanes.x.step

  main.ySliceElement.min = slicingPlanes.y.min
  main.ySliceElement.max = slicingPlanes.y.max
  main.ySliceElement.step = slicingPlanes.y.step

  main.zSliceElement.min = slicingPlanes.z.min
  main.zSliceElement.max = slicingPlanes.z.max
  main.zSliceElement.step = slicingPlanes.z.step

  if (main.viewMode === 'Volume') {
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
  }

  main.xPlanePauseButton.style.display = slicingPlanes.x.scroll
    ? 'flex'
    : 'none'
  main.xPlanePlayButton.style.display = slicingPlanes.x.scroll ? 'none' : 'flex'
  main.yPlanePauseButton.style.display = slicingPlanes.y.scroll
    ? 'flex'
    : 'none'
  main.yPlanePlayButton.style.display = slicingPlanes.y.scroll ? 'none' : 'flex'
  main.zPlanePauseButton.style.display = slicingPlanes.z.scroll
    ? 'flex'
    : 'none'
  main.zPlanePlayButton.style.display = slicingPlanes.z.scroll ? 'none' : 'flex'
}

export default applySlicingPlanes
