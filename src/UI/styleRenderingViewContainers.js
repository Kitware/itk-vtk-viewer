function applyStyle(el, style) {
  Object.keys(style).forEach(key => {
    el.style[key] = style[key]
  })
}

function styleContainer(context, event) {
  if (event.data) {
    context.renderingViewContainerStyle = event.data
  }
  for (let container of context.renderingViewContainers.values()) {
    applyStyle(container, context.renderingViewContainerStyle)
  }
}

export default styleContainer
