function viewModeYPlane(context) {
  const xPlaneRow = context.images.xPlaneRow
  if (xPlaneRow) {
    xPlaneRow.style.display = 'none'
  }
  const yPlaneRow = context.images.yPlaneRow
  if (yPlaneRow) {
    yPlaneRow.style.display = 'flex'
  }
  const zPlaneRow = context.images.zPlaneRow
  if (zPlaneRow) {
    zPlaneRow.style.display = 'none'
  }
}

export default viewModeYPlane
