function backgroundIsLight(context, event) {
  const backgroundColor = context.main.backgroundColor
  const isLight =
    backgroundColor[0] + backgroundColor[1] + backgroundColor[2] >= 1.5
  return isLight
}

export default backgroundIsLight
