function viewModeZPlane(context) {
  const collapsibleClass = `${context.id}-collapsible`
  context.widgets.distanceRulerRow.classList.add(collapsibleClass)
  context.widgets.distanceRulerRow.style.display = 'flex'
}

export default viewModeZPlane
