import { when, autorun } from 'mobx';

import macro from 'vtk.js/Sources/macro';
import vtkImageCroppingRegionsWidget from 'vtk.js/Sources/Interaction/Widgets/ImageCroppingRegionsWidget';

import style from '../ItkVtkViewer.module.css';

import cropIcon from '../icons/crop.svg';
import resetCropIcon from '../icons/reset-crop.svg';

function createCroppingButtons(
  viewerStore,
  contrastSensitiveStyle,
  mainUIRow
) {
  const viewerDOMId = viewerStore.id;
  function setupCroppingWidget() {
    viewerStore.imageUI.croppingWidget = vtkImageCroppingRegionsWidget.newInstance();
    viewerStore.imageUI.croppingWidget.setHandleSize(22);
    viewerStore.imageUI.croppingWidget.setFaceHandlesEnabled(false);
    viewerStore.imageUI.croppingWidget.setEdgeHandlesEnabled(false);
    viewerStore.imageUI.croppingWidget.setCornerHandlesEnabled(true);
    viewerStore.imageUI.croppingWidget.setInteractor(viewerStore.itkVtkView.getInteractor());
    viewerStore.imageUI.croppingWidget.setEnabled(false);
    viewerStore.imageUI.croppingWidget.setVolumeMapper(viewerStore.imageUI.representationProxy.getMapper());
    const croppingPlanesChangedHandlers = [];
    viewerStore.imageUI.addCroppingPlanesChangedHandler = (handler) => {
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
      const planes = viewerStore.imageUI.croppingWidget.getWidgetState().planes;
      viewerStore.imageUI.representationProxy.setCroppingPlanes(planes);
      const bboxCorners = viewerStore.imageUI.croppingWidget.planesToBBoxCorners(planes);
      croppingPlanesChangedHandlers.forEach((handler) => {
        handler.call(null, planes, bboxCorners);
      });
      croppingUpdateInProgress = false;
    };
    const debouncedSetCroppingPlanes = macro.debounce(setCroppingPlanes, 100);
    viewerStore.imageUI.croppingWidget.onCroppingPlanesChanged(debouncedSetCroppingPlanes);

    const cropButton = document.createElement('div');
    cropButton.innerHTML = `<input id="${viewerDOMId}-toggleCroppingPlanesButton" type="checkbox" class="${
      style.toggleInput
    }"><label itk-vtk-tooltip itk-vtk-tooltip-bottom itk-vtk-tooltip-content="Select ROI [w]" class="${
      contrastSensitiveStyle.invertibleButton
    } ${style.cropButton} ${
      style.toggleButton
    }" for="${viewerDOMId}-toggleCroppingPlanesButton">${cropIcon}</label>`;
    const cropButtonInput = cropButton.children[0];
    function toggleCrop() {
      const cropEnabled = viewerStore.mainUI.croppingPlanesEnabled;
      cropButtonInput.checked = cropEnabled;
      viewerStore.imageUI.croppingWidget.setEnabled(cropEnabled);
    }
    autorun(() => {
      toggleCrop();
    })
    cropButton.addEventListener('change',
      (event) => {
        event.preventDefault();
        event.stopPropagation();
        viewerStore.mainUI.croppingPlanesEnabled = !viewerStore.mainUI.croppingPlanesEnabled;
      }
    );
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
    viewerStore.imageUI.addResetCropHandler = (handler) => {
      const index = resetCropHandlers.length;
      resetCropHandlers.push(handler);
      function unsubscribe() {
        resetCropHandlers[index] = null;
      }
      return Object.freeze({ unsubscribe });
    };
    function resetCrop() {
      viewerStore.imageUI.representationProxy.getCropFilter().reset();
      viewerStore.imageUI.croppingWidget.resetWidgetState();
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
  if (viewerStore.imageUI.representationProxy) {
    setupCroppingWidget()
  } else {
    when(() => !!viewerStore.imageUI.representationProxy,
      setupCroppingWidget
    )
  }
}

export default createCroppingButtons;
