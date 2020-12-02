import { reaction } from 'mobx'

import style from './ItkVtkViewer.module.css'

import createBlendModeSelector from './Image/createBlendModeSelector'
//import createComponentSelector from './Image/createComponentSelector'
import createTransferFunctionWidget from './Image/createTransferFunctionWidget'
import createViewPlanesToggle from './Image/createViewPlanesToggle'
import createUseShadowToggle from './Image/createUseShadowToggle'
import createSampleDistanceSlider from './Image/createSampleDistanceSlider'
import createGradientOpacitySlider from './Image/createGradientOpacitySlider'
import createDistanceButton from './Image/createDistanceButton'

function createImageUI(store, use2D, uiContainer) {
  const viewerDOMId = store.id

  const imageUIGroup = document.createElement('div')
  store.imageUI.imageUIGroup = imageUIGroup
  imageUIGroup.setAttribute('class', style.uiGroup)

  //const componentSelector = createComponentSelector(store, imageUIGroup)

  const haveImage = !!store.imageUI.image

  if (haveImage) {
    const dataArray = store.imageUI.fusedImageLabelMap
      .getPointData()
      .getScalars()
    const components = store.imageUI.numberOfComponents

    // If not a 2D RGB image
    if (
      !(
        use2D &&
        dataArray.getDataType() === 'Uint8Array' &&
        (components === 3 || components === 4)
      )
    ) {
      const colorRangeInputRow = document.createElement('div')
      colorRangeInputRow.setAttribute('class', style.uiRow)
      // This row needs background different from normal uiRows, to aid
      // in the illusion that it's the content portion of a tabbed pane
      colorRangeInputRow.setAttribute(
        'style',
        'background: rgba(127, 127, 127, 0.5);'
      )
      colorRangeInputRow.className += ` ${viewerDOMId}-collapsible`
      imageUIGroup.appendChild(colorRangeInputRow)
    }

    createTransferFunctionWidget(store, imageUIGroup, use2D)
  }

  if (!use2D && haveImage) {
    const volumeRow1 = document.createElement('div')
    volumeRow1.setAttribute('class', style.uiRow)
    volumeRow1.className += ` ${viewerDOMId}-volume1 ${viewerDOMId}-collapsible`
    createUseShadowToggle(store, volumeRow1)
    createGradientOpacitySlider(store, volumeRow1)
    imageUIGroup.appendChild(volumeRow1)

    const volumeRow2 = document.createElement('div')
    volumeRow2.setAttribute('class', style.uiRow)
    volumeRow2.className += ` ${viewerDOMId}-volume2 ${viewerDOMId}-collapsible`
    createViewPlanesToggle(store, imageUIGroup, volumeRow2, uiContainer)
    createSampleDistanceSlider(store, volumeRow2)
    createBlendModeSelector(store, volumeRow2)
    imageUIGroup.appendChild(volumeRow2)

    reaction(
      () => {
        return store.mainUI.viewMode
      },
      viewMode => {
        switch (viewMode) {
          case 'XPlane':
          case 'YPlane':
          case 'ZPlane':
            volumeRow1.style.display = 'none'
            volumeRow2.style.display = 'none'
            break
          case 'Volume':
            volumeRow1.style.display = 'flex'
            volumeRow2.style.display = 'flex'
            break
          default:
            console.error('Invalid view mode: ' + viewMode)
        }
      }
    )

    reaction(
      () => {
        return store.imageUI.blendMode
      },
      blendMode => {
        switch (blendMode) {
          case 0:
            volumeRow1.style.display = 'flex'
            break
          case 1:
          case 2:
          case 3:
            volumeRow1.style.display = 'none'
            break
          default:
            console.error('Invalid blend mode: ' + blendMode)
        }
      }
    )
  }

  uiContainer.appendChild(imageUIGroup)
}

export default createImageUI
