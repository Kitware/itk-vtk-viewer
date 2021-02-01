function applyGroupVisibility(context, groupNames, visible) {
  for (let idx = 0; idx < groupNames.length; idx++) {
    if (!context.uiGroups.has(groupNames[idx])) {
      continue
    }
    const uiGroup = context.uiGroups.get(groupNames[idx])
    if (visible) {
      uiGroup.style.display = 'block'
    } else {
      uiGroup.style.display = 'none'
    }
  }
}

export default applyGroupVisibility
