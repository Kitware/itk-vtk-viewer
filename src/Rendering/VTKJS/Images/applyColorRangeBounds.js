const assignColorRangeBounds = (
  { images },
  { data: { name, component, range, keepAutoAdjusting = false } }
) => {
  const {
    colorRangeBounds,
    colorRangeBoundsAutoAdjust,
  } = images.actorContext.get(name)

  colorRangeBounds.set(component, range)

  colorRangeBoundsAutoAdjust.set(
    component,
    colorRangeBoundsAutoAdjust.get(component) && keepAutoAdjusting
  )

  return images
}

export const applyColorRangeBounds = (context, event) => {
  assignColorRangeBounds(context, event)
}
