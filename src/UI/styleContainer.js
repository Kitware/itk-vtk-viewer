function applyStyle(el, style) {
  Object.keys(style).forEach(key => {
    el.style[key] = style[key]
  })
}

function styleContainer(context, event) {
  if (event.data) {
    context.containerStyle = event.data
  }
  applyStyle(context.container, context.containerStyle)
}

export default styleContainer
