import { when, reaction } from 'mobx'

import macro from 'vtk.js/Sources/macro'
import vtkImageCroppingRegionsWidget from 'vtk.js/Sources/Interaction/Widgets/ImageCroppingRegionsWidget'

import style from '../ItkVtkViewer.module.css'
import applyContrastSensitiveStyle from '../applyContrastSensitiveStyle'

import cropIcon from '../icons/crop.svg'
import resetCropIcon from '../icons/reset-crop.svg'

function createCroppingButtons(store, mainUIRow) {
  const viewerDOMId = store.id
  function setupCroppingWidget() {
    store.imageUI.croppingWidget = vtkImageCroppingRegionsWidget.newInstance()
    store.imageUI.croppingWidget.setHandleSize(16)
    store.imageUI.croppingWidget.setFaceHandlesEnabled(false)
    store.imageUI.croppingWidget.setEdgeHandlesEnabled(false)
    store.imageUI.croppingWidget.setCornerHandlesEnabled(true)
    store.imageUI.croppingWidget.setInteractor(store.itkVtkView.getInteractor())
    store.imageUI.croppingWidget.setEnabled(false)
    store.imageUI.croppingWidget.setVolumeMapper(
      store.imageUI.representationProxy.getMapper()
    )
    const croppingPlanesChangedHandlers = []
    store.imageUI.addCroppingPlanesChangedHandler = handler => {
      const index = croppingPlanesChangedHandlers.length
      croppingPlanesChangedHandlers.push(handler)
      function unsubscribe() {
        croppingPlanesChangedHandlers[index] = null
      }
      return Object.freeze({ unsubscribe })
    }
    let croppingUpdateInProgress = false
    const setCroppingPlanes = () => {
      if (croppingUpdateInProgress) {
        return
      }
      croppingUpdateInProgress = true
      const planes = store.imageUI.croppingWidget.getWidgetState().planes
      store.imageUI.representationProxy.setCroppingPlanes(planes)
      const bboxCorners = store.imageUI.croppingWidget.planesToBBoxCorners(
        planes
      )
      croppingPlanesChangedHandlers.forEach(handler => {
        handler.call(null, planes, bboxCorners)
      })
      croppingUpdateInProgress = false
    }
    const debouncedSetCroppingPlanes = macro.debounce(setCroppingPlanes, 100)
    store.imageUI.croppingWidget.onCroppingPlanesChanged(
      debouncedSetCroppingPlanes
    )

    const cropButton = document.createElement('div')
    cropButton.innerHTML = `<input id="${viewerDOMId}-toggleCroppingPlanesButton" type="checkbox" class="${style.toggleInput}"><label itk-vtk-tooltip itk-vtk-tooltip-bottom itk-vtk-tooltip-content="Select ROI [w]" class="${style.cropButton} ${style.toggleButton}" for="${viewerDOMId}-toggleCroppingPlanesButton">${cropIcon}</label>`
    const cropButtonInput = cropButton.children[0]
    const cropButtonLabel = cropButton.children[1]
    applyContrastSensitiveStyle(store, 'invertibleButton', cropButtonLabel)
    function toggleCrop(cropEnabled) {
      cropButtonInput.checked = cropEnabled
      store.imageUI.croppingWidget.setEnabled(cropEnabled)
      store.renderWindow.render()
    }
    reaction(
      () => store.mainUI.croppingPlanesEnabled,
      cropEnabled => {
        toggleCrop(cropEnabled)
      }
    )
    toggleCrop(store.mainUI.croppingPlanesEnabled)

    cropButton.addEventListener('change', event => {
      event.preventDefault()
      event.stopPropagation()
      store.mainUI.croppingPlanesEnabled = !store.mainUI.croppingPlanesEnabled
    })
    mainUIRow.appendChild(cropButton)

    const resetCropButton = document.createElement('div')
    resetCropButton.innerHTML = `<input id="${viewerDOMId}-resetCroppingPlanesButton" type="checkbox" class="${style.toggleInput}" checked><label itk-vtk-tooltip itk-vtk-tooltip-bottom itk-vtk-tooltip-content="Reset ROI [e]" class="${style.resetCropButton} ${style.toggleButton}" for="${viewerDOMId}-resetCroppingPlanesButton">${resetCropIcon}</label>`
    const resetCropButtonLabel = resetCropButton.children[1]
    applyContrastSensitiveStyle(store, 'invertibleButton', resetCropButtonLabel)
    const resetCropHandlers = []
    store.imageUI.addResetCropHandler = handler => {
      const index = resetCropHandlers.length
      resetCropHandlers.push(handler)
      function unsubscribe() {
        resetCropHandlers[index] = null
      }
      return Object.freeze({ unsubscribe })
    }
    function resetCrop() {
      store.imageUI.representationProxy.getCropFilter().reset()
      store.imageUI.croppingWidget.resetWidgetState()
      resetCropHandlers.forEach(handler => {
        handler.call(null)
      })
    }
    resetCropButton.addEventListener('change', event => {
      event.preventDefault()
      event.stopPropagation()
      resetCrop()
    })
    resetCropButton.addEventListener('click', event => {
      event.preventDefault()
      event.stopPropagation()
      resetCrop()
    })
    mainUIRow.appendChild(resetCropButton)
  } // if(imageRepresentationProxy)
  if (store.imageUI.representationProxy) {
    setupCroppingWidget()
  } else {
    when(() => !!store.imageUI.representationProxy, setupCroppingWidget)
  }
}

export default createCroppingButtons
