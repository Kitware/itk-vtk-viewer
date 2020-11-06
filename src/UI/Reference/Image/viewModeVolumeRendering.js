function viewModeVolumeRendering(context) {
  const viewPlanes = context.image.slicingPlanesEnabled
  const display = viewPlanes ? 'flex' : 'none'
  const xPlaneRow = context.image.xPlaneRow
  if (xPlaneRow) {
    xPlaneRow.style.display = display
  }
  const yPlaneRow = context.image.yPlaneRow
  if (yPlaneRow) {
    yPlaneRow.style.display = display
  }
  const zPlaneRow = context.image.zPlaneRow
  if (zPlaneRow) {
    zPlaneRow.style.display = display
  }
}

export default viewModeVolumeRendering
