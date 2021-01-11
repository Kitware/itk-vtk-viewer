function viewModeYPlane(context) {
  context.widgets.distanceRulerRow.style.display = 'flex'

  context.main.planeUIGroup.style.display = 'block'
  context.main.xPlaneRow.style.display = 'none'
  context.main.yPlaneRow.style.display = 'flex'
  context.main.zPlaneRow.style.display = 'none'
}

export default viewModeYPlane
