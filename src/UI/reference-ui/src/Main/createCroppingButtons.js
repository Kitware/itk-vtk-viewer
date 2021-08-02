import macro from '@kitware/vtk.js/macro'
import vtkImageCroppingRegionsWidget from '@kitware/vtk.js/Interaction/Widgets/ImageCroppingRegionsWidget'

import style from '../ItkVtkViewer.module.css'
import applyContrastSensitiveStyleToElement from '../applyContrastSensitiveStyleToElement'

import { cropIconDataUri, resetCropIconDataUri } from 'itk-viewer-icons'

function createCroppingButtons(context, mainUIRow) {
  const viewerDOMId = context.id
  const eventEmitter = context.eventEmitter
  function setupCroppingWidget() {
    context.images.croppingWidget = vtkImageCroppingRegionsWidget.newInstance()
    context.images.croppingWidget.setHandleSize(16)
    context.images.croppingWidget.setFaceHandlesEnabled(false)
    context.images.croppingWidget.setEdgeHandlesEnabled(false)
    context.images.croppingWidget.setCornerHandlesEnabled(true)
    context.images.croppingWidget.setInteractor(
      context.itkVtkView.getInteractor()
    )
    context.images.croppingWidget.setEnabled(false)
    context.images.croppingWidget.setVolumeMapper(
      context.images.representationProxy.getMapper()
    )
    context.images.addCroppingPlanesChangedHandler = handler => {
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
      const planes = context.images.croppingWidget.getWidgetState().planes
      context.images.representationProxy.setCroppingPlanes(planes)
      const bboxCorners = context.images.croppingWidget.planesToBBoxCorners(
        planes
      )
      eventEmitter.emit('croppingPlanesChanged', planes, bboxCorners)
      croppingUpdateInProgress = false
    }
    const debouncedSetCroppingPlanes = macro.debounce(setCroppingPlanes, 100)
    context.images.croppingWidget.onCroppingPlanesChanged(
      debouncedSetCroppingPlanes
    )

    const cropButton = document.createElement('div')
    cropButton.innerHTML = `<input id="${viewerDOMId}-toggleCroppingPlanesButton" type="checkbox" class="${style.toggleInput}"><label itk-vtk-tooltip itk-vtk-tooltip-top itk-vtk-tooltip-content="Select ROI [w]" class="${style.cropButton} ${style.toggleButton}" for="${viewerDOMId}-toggleCroppingPlanesButton"><img src="${cropIconDataUri}" alt="crop" /></label>`
    const cropButtonInput = cropButton.children[0]
    const cropButtonLabel = cropButton.children[1]
    applyContrastSensitiveStyleToElement(
      context,
      'invertibleButton',
      cropButtonLabel
    )
    function toggleCrop(cropEnabled) {
      cropButtonInput.checked = cropEnabled
      context.images.croppingWidget.setEnabled(cropEnabled)
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
    resetCropButton.innerHTML = `<input id="${viewerDOMId}-resetCroppingPlanesButton" type="checkbox" class="${style.toggleInput}" checked><label itk-vtk-tooltip itk-vtk-tooltip-top itk-vtk-tooltip-content="Reset ROI [e]" class="${style.resetCropButton} ${style.toggleButton}" for="${viewerDOMId}-resetCroppingPlanesButton"><img src="${resetCropIconDataUri}" alt="reset crop" /></label>`
    const resetCropButtonLabel = resetCropButton.children[1]
    applyContrastSensitiveStyleToElement(
      context,
      'invertibleButton',
      resetCropButtonLabel
    )
    context.images.addResetCropHandler = handler => {
      eventEmitter.on('resetCrop', handler)
      function unsubscribe() {
        eventEmitter.off('resetCrop', handler)
      }
      return Object.freeze({ unsubscribe })
    }
    function resetCrop() {
      context.images.representationProxy.getCropFilter().reset()
      context.images.croppingWidget.resetWidgetState()
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
  // Todo: setup when an image or labelMap is added
  //if (context.images.representationProxy) {
  //setupCroppingWidget()
  //} else {
  //when(() => !!context.images.representationProxy, setupCroppingWidget)
  //}
}

export default createCroppingButtons
