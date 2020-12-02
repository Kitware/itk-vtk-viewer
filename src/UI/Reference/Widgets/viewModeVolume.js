function viewModeVolume(context) {
  // Disable if in volume mode
  if (context.widgets.distanceEnabled) {
    context.service.send('TOGGLE_DISTANCE_WIDGET')
  }
  context.widgets.distanceRulerRow.style.display = 'none'
  const collapsibleClass = `${context.id}-collapsible`
  context.widgets.distanceRulerRow.classList.remove(collapsibleClass)
}

export default viewModeVolume
