function applyStyle(el, style) {
  Object.keys(style).forEach(key => {
    el.style[key] = style[key]
  })
}

function styleContainer(context, event) {
  if (event.data) {
    context.style.containerStyle = event.data
    console.log(context.style.containerStyle)
  }
  applyStyle(context.container, context.style.containerStyle)
  //autorun(() => {
  //store.itkVtkView.setBackground(store.style.backgroundColor)
  //})

  //if (viewerStyle) {
  //store.style = viewerStyle
  //}
}

export default styleContainer
