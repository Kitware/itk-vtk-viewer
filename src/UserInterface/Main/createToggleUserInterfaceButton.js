import { reaction, action } from 'mobx'

import style from '../ItkVtkViewer.module.css'

import toggleIcon from '../icons/toggle.svg'
import applyContrastSensitiveStyle from '../applyContrastSensitiveStyle'

function createToggleUserInterfaceButton(store) {
  const toggleUserInterfaceButton = document.createElement('div')
  function toggleUIVisibility(collapsed) {
    const uiContainer = store.mainUI.uiContainer
    const viewerDOMId = store.id
    let elements = uiContainer.querySelectorAll(`.${viewerDOMId}-toggle`)
    let count = elements.length
    if (collapsed) {
      while (count--) {
        elements[count].style.display = 'none'
      }
      elements = uiContainer.querySelectorAll(`.${viewerDOMId}-toggleCollapse`)
      count = elements.length
      while (count--) {
        elements[count].style.display = 'none'
      }
    } else {
      while (count--) {
        elements[count].style.display = 'flex'
      }
      const viewMode = store.mainUI.viewMode
      const xPlaneRow = uiContainer.querySelector(`.${viewerDOMId}-x-plane-row`)
      const yPlaneRow = uiContainer.querySelector(`.${viewerDOMId}-y-plane-row`)
      const zPlaneRow = uiContainer.querySelector(`.${viewerDOMId}-z-plane-row`)
      switch (viewMode) {
        case 'XPlane':
          xPlaneRow.style.display = 'flex'
          break
        case 'YPlane':
          yPlaneRow.style.display = 'flex'
          break
        case 'ZPlane':
          zPlaneRow.style.display = 'flex'
          break
        case 'VolumeRendering':
          const viewPlanes = store.imageUI.slicingPlanesEnabled
          if (viewPlanes) {
            xPlaneRow.style.display = 'flex'
            yPlaneRow.style.display = 'flex'
            zPlaneRow.style.display = 'flex'
          }
          break
        default:
          console.error('Invalid view mode: ' + viewMode)
      }
    }
  }
  toggleUserInterfaceButton.className = `${style.toggleUserInterfaceButton}`
  applyContrastSensitiveStyle(
    store,
    'invertibleButton',
    toggleUserInterfaceButton
  )

  toggleUserInterfaceButton.id = `${store.id}-toggleUserInterfaceButton`
  toggleUserInterfaceButton.innerHTML = `${toggleIcon}`
  toggleUserInterfaceButton.addEventListener(
    'click',
    action(event => {
      event.preventDefault()
      event.stopPropagation()
      store.mainUI.collapsed = !store.mainUI.collapsed
    })
  )
  reaction(
    () => {
      return store.mainUI.collapsed
    },
    collapsed => {
      toggleUIVisibility(collapsed)
    }
  )
  store.mainUI.uiContainer.appendChild(toggleUserInterfaceButton)
}

export default createToggleUserInterfaceButton
