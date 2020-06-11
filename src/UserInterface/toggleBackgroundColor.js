function toggleBackgroundColor(store) {
  store.selectedBackgroundColor =
    (store.selectedBackgroundColor + 1) % store.backgroundColors.length
  store.style.backgroundColor =
    store.backgroundColors[store.selectedBackgroundColor]
  store.itkVtkView.getRenderer().setBackground(store.style.backgroundColor)
  store.renderWindow.render()
}

export default toggleBackgroundColor
