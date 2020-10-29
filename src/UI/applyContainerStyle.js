function applyStyle(el, style) {
  Object.keys(style).forEach(key => {
    el.style[key] = style[key]
  })
}

function applyContainerStyle(context, event) {
  if (event.data) {
    context.style.containerStyle = event.data
  }
  console.log('applying container style')
  applyStyle(context.container, context.style.containerStyle)
  //autorun(() => {
  //applyStyle(store.container, store.style.containerStyle)
  //})
  //autorun(() => {
  //store.itkVtkView.setBackground(store.style.backgroundColor)
  //})

  //if (viewerStyle) {
  //store.style = viewerStyle
  //}
}

export default applyContainerStyle
