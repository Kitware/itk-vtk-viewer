import macro from 'vtk.js/Sources/macro';
import vtkImageCroppingRegionsWidget from 'vtk.js/Sources/Interaction/Widgets/ImageCroppingRegionsWidget';

import style from '../ItkVtkViewer.module.css';

import cropIcon from '../icons/crop.svg';
import resetCropIcon from '../icons/reset-crop.svg';

function createCroppingButtons(
  viewerStore,
  viewerDOMId,
  contrastSensitiveStyle,
  imageRepresentationProxy,
  mainUIRow
) {
  let croppingWidget = null
  let addCroppingPlanesChangedHandler = () => {}
  let addResetCropHandler = () => {}
  if (imageRepresentationProxy) {
    croppingWidget = vtkImageCroppingRegionsWidget.newInstance();
    croppingWidget.setHandleSize(22);
    croppingWidget.setFaceHandlesEnabled(false);
    croppingWidget.setEdgeHandlesEnabled(false);
    croppingWidget.setCornerHandlesEnabled(true);
    croppingWidget.setInteractor(viewerStore.itkVtkView.getInteractor());
    croppingWidget.setEnabled(false);
    croppingWidget.setVolumeMapper(imageRepresentationProxy.getMapper());
    const croppingPlanesChangedHandlers = [];
    addCroppingPlanesChangedHandler = (handler) => {
      const index = croppingPlanesChangedHandlers.length;
      croppingPlanesChangedHandlers.push(handler);
      function unsubscribe() {
        croppingPlanesChangedHandlers[index] = null;
      }
      return Object.freeze({ unsubscribe });
    };
    let croppingUpdateInProgress = false;
    const setCroppingPlanes = () => {
      if (croppingUpdateInProgress) {
        return;
      }
      croppingUpdateInProgress = true;
      const planes = croppingWidget.getWidgetState().planes;
      imageRepresentationProxy.setCroppingPlanes(planes);
      const bboxCorners = croppingWidget.planesToBBoxCorners(planes);
      croppingPlanesChangedHandlers.forEach((handler) => {
        handler.call(null, planes, bboxCorners);
      });
      croppingUpdateInProgress = false;
    };
    const debouncedSetCroppingPlanes = macro.debounce(setCroppingPlanes, 100);
    croppingWidget.onCroppingPlanesChanged(debouncedSetCroppingPlanes);
    let cropEnabled = false;
    function toggleCrop() {
      cropEnabled = !cropEnabled;
      croppingWidget.setEnabled(cropEnabled);
    }
    const cropButton = document.createElement('div');
    cropButton.innerHTML = `<input id="${viewerDOMId}-toggleCroppingPlanesButton" type="checkbox" class="${
      style.toggleInput
    }"><label itk-vtk-tooltip itk-vtk-tooltip-bottom itk-vtk-tooltip-content="Select ROI [w]" class="${
      contrastSensitiveStyle.invertibleButton
    } ${style.cropButton} ${
      style.toggleButton
    }" for="${viewerDOMId}-toggleCroppingPlanesButton">${cropIcon}</label>`;
    cropButton.addEventListener('change', (event) => {
      toggleCrop();
    });
    mainUIRow.appendChild(cropButton);

    const resetCropButton = document.createElement('div');
    resetCropButton.innerHTML = `<input id="${viewerDOMId}-resetCroppingPlanesButton" type="checkbox" class="${
      style.toggleInput
    }" checked><label itk-vtk-tooltip itk-vtk-tooltip-bottom itk-vtk-tooltip-content="Reset ROI [e]" class="${
      contrastSensitiveStyle.invertibleButton
    } ${style.resetCropButton} ${
      style.toggleButton
    }" for="${viewerDOMId}-resetCroppingPlanesButton">${resetCropIcon}</label>`;
    const resetCropHandlers = [];
    addResetCropHandler = (handler) => {
      const index = resetCropHandlers.length;
      resetCropHandlers.push(handler);
      function unsubscribe() {
        resetCropHandlers[index] = null;
      }
      return Object.freeze({ unsubscribe });
    };
    function resetCrop() {
      imageRepresentationProxy.getCropFilter().reset();
      croppingWidget.resetWidgetState();
      resetCropHandlers.forEach((handler) => {
        handler.call(null);
      });
    }
    resetCropButton.addEventListener('change', (event) => {
      event.preventDefault();
      event.stopPropagation();
      resetCrop();
    });
    resetCropButton.addEventListener('click', (event) => {
      event.preventDefault();
      event.stopPropagation();
      resetCrop();
    });
    mainUIRow.appendChild(resetCropButton);
  } // if(imageRepresentationProxy)

  return { croppingWidget, addCroppingPlanesChangedHandler, addResetCropHandler };
}

export default createCroppingButtons;
