function backgroundIsDark(context) {
  const backgroundColor = context.main.backgroundColor
  const isDark =
    backgroundColor[0] + backgroundColor[1] + backgroundColor[2] < 1.5
  return isDark
}

export default backgroundIsDark
