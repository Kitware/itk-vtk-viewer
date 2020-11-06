function viewModeZPlane(context) {
  const xPlaneRow = context.images.xPlaneRow
  if (xPlaneRow) {
    xPlaneRow.style.display = 'none'
  }
  const yPlaneRow = context.images.yPlaneRow
  if (yPlaneRow) {
    yPlaneRow.style.display = 'none'
  }
  const zPlaneRow = context.images.zPlaneRow
  if (zPlaneRow) {
    zPlaneRow.style.display = 'flex'
  }
}

export default viewModeZPlane
