import macro from 'vtk.js/Sources/macro'
import vtkImageCroppingRegionsWidget from 'vtk.js/Sources/Interaction/Widgets/ImageCroppingRegionsWidget'

import style from '../ItkVtkViewer.module.css'
import applyContrastSensitiveStyleToElement from '../applyContrastSensitiveStyleToElement'

import cropIcon from '../../Icons/crop.svg'
import resetCropIcon from '../../Icons/reset-crop.svg'

function createCroppingButtons(context, mainUIRow) {
  const viewerDOMId = context.id
  const eventEmitter = context.eventEmitter
  function setupCroppingWidget() {
    context.imageUI.croppingWidget = vtkImageCroppingRegionsWidget.newInstance()
    context.imageUI.croppingWidget.setHandleSize(16)
    context.imageUI.croppingWidget.setFaceHandlesEnabled(false)
    context.imageUI.croppingWidget.setEdgeHandlesEnabled(false)
    context.imageUI.croppingWidget.setCornerHandlesEnabled(true)
    context.imageUI.croppingWidget.setInteractor(
      context.itkVtkView.getInteractor()
    )
    context.imageUI.croppingWidget.setEnabled(false)
    context.imageUI.croppingWidget.setVolumeMapper(
      context.imageUI.representationProxy.getMapper()
    )
    context.imageUI.addCroppingPlanesChangedHandler = handler => {
      eventEmitter.on('croppingPlanesChanged', handler)
      function unsubscribe() {
        eventEmitter.off('croppingPlanesChanged', handler)
      }
      return Object.freeze({ unsubscribe })
    }
    let croppingUpdateInProgress = false
    const setCroppingPlanes = () => {
      if (croppingUpdateInProgress) {
        return
      }
      croppingUpdateInProgress = true
      const planes = context.imageUI.croppingWidget.getWidgetState().planes
      context.imageUI.representationProxy.setCroppingPlanes(planes)
      const bboxCorners = context.imageUI.croppingWidget.planesToBBoxCorners(
        planes
      )
      eventEmitter.emit('croppingPlanesChanged', planes, bboxCorners)
      croppingUpdateInProgress = false
    }
    const debouncedSetCroppingPlanes = macro.debounce(setCroppingPlanes, 100)
    context.imageUI.croppingWidget.onCroppingPlanesChanged(
      debouncedSetCroppingPlanes
    )

    const cropButton = document.createElement('div')
    cropButton.innerHTML = `<input id="${viewerDOMId}-toggleCroppingPlanesButton" type="checkbox" class="${style.toggleInput}"><label itk-vtk-tooltip itk-vtk-tooltip-top itk-vtk-tooltip-content="Select ROI [w]" class="${style.cropButton} ${style.toggleButton}" for="${viewerDOMId}-toggleCroppingPlanesButton">${cropIcon}</label>`
    const cropButtonInput = cropButton.children[0]
    const cropButtonLabel = cropButton.children[1]
    applyContrastSensitiveStyleToElement(
      context,
      'invertibleButton',
      cropButtonLabel
    )
    function toggleCrop(cropEnabled) {
      cropButtonInput.checked = cropEnabled
      context.imageUI.croppingWidget.setEnabled(cropEnabled)
      context.renderWindow.render()
    }
    reaction(
      () => context.mainUI.croppingPlanesEnabled,
      cropEnabled => {
        toggleCrop(cropEnabled)
      }
    )
    toggleCrop(context.mainUI.croppingPlanesEnabled)

    cropButton.addEventListener('change', event => {
      event.preventDefault()
      event.stopPropagation()
      context.mainUI.croppingPlanesEnabled = !context.mainUI
        .croppingPlanesEnabled
    })
    mainUIRow.appendChild(cropButton)

    const resetCropButton = document.createElement('div')
    resetCropButton.innerHTML = `<input id="${viewerDOMId}-resetCroppingPlanesButton" type="checkbox" class="${style.toggleInput}" checked><label itk-vtk-tooltip itk-vtk-tooltip-top itk-vtk-tooltip-content="Reset ROI [e]" class="${style.resetCropButton} ${style.toggleButton}" for="${viewerDOMId}-resetCroppingPlanesButton">${resetCropIcon}</label>`
    const resetCropButtonLabel = resetCropButton.children[1]
    applyContrastSensitiveStyleToElement(
      context,
      'invertibleButton',
      resetCropButtonLabel
    )
    context.imageUI.addResetCropHandler = handler => {
      eventEmitter.on('resetCrop', handler)
      function unsubscribe() {
        eventEmitter.off('resetCrop', handler)
      }
      return Object.freeze({ unsubscribe })
    }
    function resetCrop() {
      context.imageUI.representationProxy.getCropFilter().reset()
      context.imageUI.croppingWidget.resetWidgetState()
      eventEmitter.emit('resetCrop')
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
  //if (context.imageUI.representationProxy) {
  //setupCroppingWidget()
  //} else {
  //when(() => !!context.imageUI.representationProxy, setupCroppingWidget)
  //}
}

export default createCroppingButtons
