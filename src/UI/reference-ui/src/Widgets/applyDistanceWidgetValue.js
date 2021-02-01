function applyDistanceWidgetValue(context, event) {
  context.widgets.distanceValueElement.setAttribute('value', `${event.data}`)
}

export default applyDistanceWidgetValue
