import { reaction, action } from 'mobx'

import updateSliceProperties from '../../Rendering/updateSliceProperties'
import updateVolumeProperties from '../../Rendering/updateVolumeProperties'
import style from '../ItkVtkViewer.module.css'

function createComponentSelector(store, imageUIGroup) {
  const viewerDOMId = store.id

  const componentSelector = document.createElement('div')
  componentSelector.setAttribute('class', style.selector)
  componentSelector.id = `${viewerDOMId}-componentSelector`

  const componentRow = document.createElement('div')
  componentRow.setAttribute('class', style.uiRow)
  // This row needs custom bottom padding, to aid in the illusion
  // that it's the tabbed portion of a tabbed pane
  componentRow.setAttribute('style', 'padding-bottom: 0px;')
  componentRow.className += ` ${viewerDOMId}-volumeComponents ${viewerDOMId}-toggle`

  function updateAvailableComponents() {
    const components = store.imageUI.numberOfComponents
    if (components > 1) {
      componentRow.style.display = 'flex'
    } else {
      componentRow.style.display = 'none'
    }

    componentSelector.innerHTML = new Array(components)
      .fill(undefined)
      .map((_, ii) => ii)
      .map(
        (idx, component) =>
          `<input name="tabs" type="radio" id="tab-${component}" ${
            idx === 0 ? 'checked="checked"' : ''
          } class="${
            style.componentTab
          }" data-component-index="${component}"/><label for="tab-${component}" class="${
            style.compTabLabel
          }">${component}<input type="checkbox" ${
            store.imageUI.componentVisibilities[idx] > 0.0
              ? 'checked="checked"'
              : ''
          } class="${
            style.componentVisibility
          }" data-component-index="${component}"\></label>`
      )
      .join('')
    componentSelector.value = 0
    store.imageUI.selectedComponentIndex = 0
  }
  reaction(
    () => {
      return store.imageUI.image
    },
    image => {
      updateAvailableComponents()
    }
  )
  updateAvailableComponents()

  componentSelector.addEventListener(
    'change',
    action(event => {
      event.preventDefault()
      event.stopPropagation()
      const selIdx = Number(event.target.dataset.componentIndex)
      if (event.target.type === 'radio') {
        store.imageUI.selectedComponentIndex = selIdx
      } else if (event.target.type === 'checkbox') {
        const visibility = event.target.checked ? 1.0 : 0.0
        store.imageUI.componentVisibilities[selIdx] = visibility
      }
    })
  )

  reaction(
    () => {
      return store.imageUI.componentVisibilities.slice()
    },
    visibilities => {
      updateSliceProperties(store)
      updateVolumeProperties(store)
      const renderWindow = store.renderWindow
      if (!renderWindow.getInteractor().isAnimating()) {
        renderWindow.render()
      }
    }
  )

  componentRow.appendChild(componentSelector)
  imageUIGroup.appendChild(componentRow)

  return componentSelector
}

export default createComponentSelector
