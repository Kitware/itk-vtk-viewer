function backgroundIsLight(context, event) {
  console.log('backgroundIsLight')
  if (event.data) {
    const backgroundColor = event.data
    const isLight =
      backgroundColor[0] + backgroundColor[1] + backgroundColor[2] >= 1.5
    return isLight
  }
  return false
}

export default backgroundIsLight
