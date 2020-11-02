function backgroundIsDark(context, event) {
  console.log('backgroundIsDark')
  if (event.data) {
    const backgroundColor = event.data
    const isDark =
      backgroundColor[0] + backgroundColor[1] + backgroundColor[2] < 1.5
    return isDark
  }
  return false
}

export default backgroundIsDark
