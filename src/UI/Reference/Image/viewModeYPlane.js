function viewModeYPlane(context) {
  const xPlaneRow = context.image.xPlaneRow
  if (xPlaneRow) {
    xPlaneRow.style.display = 'none'
  }
  const yPlaneRow = context.image.yPlaneRow
  if (yPlaneRow) {
    yPlaneRow.style.display = 'flex'
  }
  const zPlaneRow = context.image.zPlaneRow
  if (zPlaneRow) {
    zPlaneRow.style.display = 'none'
  }
}

export default viewModeYPlane
