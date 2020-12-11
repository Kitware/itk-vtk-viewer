function applySlicingPlanes(context, event) {
  const slicingPlanes = event.data

  context.main.xSliceElement.min = slicingPlanes.x.min
  context.main.xSliceElement.max = slicingPlanes.x.max
  context.main.xSliceElement.step = slicingPlanes.x.step

  context.main.ySliceElement.min = slicingPlanes.y.min
  context.main.ySliceElement.max = slicingPlanes.y.max
  context.main.ySliceElement.step = slicingPlanes.y.step

  context.main.zSliceElement.min = slicingPlanes.z.min
  context.main.zSliceElement.max = slicingPlanes.z.max
  context.main.zSliceElement.step = slicingPlanes.z.step

  if (
    !slicingPlanes.x.visibile &&
    !slicingPlanes.y.visible &&
    !slicingPlanes.z.visible
  ) {
    context.main.viewPlanesButtonInput.checked = false
  } else {
    context.main.viewPlanesButtonInput.checked = true
  }
}

export default applySlicingPlanes
