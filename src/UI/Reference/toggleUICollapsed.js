function toggleUICollapsed(context, event, actionMeta) {
  const collapsed = actionMeta.state.value.active.uiCollapsed === 'enabled'
  context.uiCollapsed = collapsed
  const uiContainer = context.uiContainer
  const viewerDOMId = context.id
  let elements = uiContainer.querySelectorAll(`.${viewerDOMId}-collapsible`)
  let count = elements.length
  if (collapsed) {
    while (count--) {
      elements[count].style.display = 'none'
    }
  } else {
    while (count--) {
      elements[count].style.display = 'flex'
    }
    // move sliders to the bottom of the window
    //const viewMode = store.mainUI.viewMode
    //const xPlaneRow = uiContainer.querySelector(`.${viewerDOMId}-x-plane-row`)
    //const yPlaneRow = uiContainer.querySelector(`.${viewerDOMId}-y-plane-row`)
    //const zPlaneRow = uiContainer.querySelector(`.${viewerDOMId}-z-plane-row`)
    //switch (viewMode) {
    //case 'XPlane':
    //xPlaneRow.style.display = 'flex'
    //break
    //case 'YPlane':
    //yPlaneRow.style.display = 'flex'
    //break
    //case 'ZPlane':
    //zPlaneRow.style.display = 'flex'
    //break
    //case 'VolumeRendering':
    //const viewPlanes = store.imageUI.slicingPlanesEnabled
    //if (viewPlanes) {
    //xPlaneRow.style.display = 'flex'
    //yPlaneRow.style.display = 'flex'
    //zPlaneRow.style.display = 'flex'
    //}
    //break
    //default:
    //console.error('Invalid view mode: ' + viewMode)
    //}
  }
}

export default toggleUICollapsed
