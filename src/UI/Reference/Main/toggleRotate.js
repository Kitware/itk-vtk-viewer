function toggleRotate(context) {
  if (context.main.rotateButtonInput) {
    context.main.rotateButtonInput.checked = context.main.rotateEnabled
  }
}

export default toggleRotate
