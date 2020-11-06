function viewModeVolumeRendering(context) {
  const viewPlanes = context.images.slicingPlanesEnabled
  const display = viewPlanes ? 'flex' : 'none'
  const xPlaneRow = context.images.xPlaneRow
  if (xPlaneRow) {
    xPlaneRow.style.display = display
  }
  const yPlaneRow = context.images.yPlaneRow
  if (yPlaneRow) {
    yPlaneRow.style.display = display
  }
  const zPlaneRow = context.images.zPlaneRow
  if (zPlaneRow) {
    zPlaneRow.style.display = display
  }
}

export default viewModeVolumeRendering
