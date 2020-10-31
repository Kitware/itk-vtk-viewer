function backgroundIsLight(context, event) {
  if (event.data) {
    const backgroundColor = event.data
    return backgroundColor[0] + backgroundColor[1] + backgroundColor[2] >= 1.5
  }
  return false
}

export default backgroundIsLight
