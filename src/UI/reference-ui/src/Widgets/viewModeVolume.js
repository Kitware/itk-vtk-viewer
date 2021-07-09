function viewModeVolume(context) {
  // Disable if in volume mode
  if (context.widgets.distanceEnabled) {
    context.service.send('TOGGLE_DISTANCE_WIDGET')
  }
  context.widgets.distanceRulerRow.style.display = 'none'
}

export default viewModeVolume
