function toggleBackgroundColor(context) {
  context.main.selectedBackgroundColor =
    (context.main.selectedBackgroundColor + 1) %
    context.main.backgroundColors.length
  context.main.backgroundColor =
    context.main.backgroundColors[context.main.selectedBackgroundColor]
}

export default toggleBackgroundColor
