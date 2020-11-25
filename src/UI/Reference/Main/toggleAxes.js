function toggleAxes(context) {
  if (context.main.axesButtonInput) {
    context.main.axesButtonInput.checked = context.main.axesEnabled
  }
}

export default toggleAxes
