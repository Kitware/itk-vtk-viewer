import { reaction } from 'mobx';

import style from '../ItkVtkViewer.module.css';

import volumeRenderingIcon from '../icons/volume-rendering.svg';
import xPlaneIcon from '../icons/x-plane.svg';
import yPlaneIcon from '../icons/y-plane.svg';
import zPlaneIcon from '../icons/z-plane.svg';

function createViewModeButtons(
  store,
  contrastSensitiveStyle,
  use2D,
  mainUIRow
) {
  const viewerDOMId = store.id;
  const uiContainer = store.mainUI.uiContainer;
  function setViewModeXPlane() {
    store.itkVtkView.setViewMode('XPlane');
    store.mainUI.xPlaneButton.checked = true;
    store.mainUI.yPlaneButton.checked = false;
    store.mainUI.zPlaneButton.checked = false;
    store.mainUI.volumeRenderingButton.checked = false;
    if (store.imageUI.representationProxy) {
      const xPlaneRow = uiContainer.querySelector(`.${viewerDOMId}-x-plane-row`);
      xPlaneRow.style.display = 'flex';
      const yPlaneRow = uiContainer.querySelector(`.${viewerDOMId}-y-plane-row`);
      yPlaneRow.style.display = 'none';
      const zPlaneRow = uiContainer.querySelector(`.${viewerDOMId}-z-plane-row`);
      zPlaneRow.style.display = 'none';
    }
  }
  function setViewModeYPlane() {
    store.itkVtkView.setViewMode('YPlane');
    store.mainUI.xPlaneButton.checked = false;
    store.mainUI.yPlaneButton.checked = true;
    store.mainUI.zPlaneButton.checked = false;
    store.mainUI.volumeRenderingButton.checked = false;
    if (store.imageUI.representationProxy) {
      const xPlaneRow = uiContainer.querySelector(`.${viewerDOMId}-x-plane-row`);
      xPlaneRow.style.display = 'none';
      const yPlaneRow = uiContainer.querySelector(`.${viewerDOMId}-y-plane-row`);
      yPlaneRow.style.display = 'flex';
      const zPlaneRow = uiContainer.querySelector(`.${viewerDOMId}-z-plane-row`);
      zPlaneRow.style.display = 'none';
    }
  }
  function setViewModeZPlane() {
    store.itkVtkView.setViewMode('ZPlane');
    store.mainUI.xPlaneButton.checked = false;
    store.mainUI.yPlaneButton.checked = false;
    store.mainUI.zPlaneButton.checked = true;
    store.mainUI.volumeRenderingButton.checked = false;
    if (store.imageUI.representationProxy) {
      const xPlaneRow = uiContainer.querySelector(`.${viewerDOMId}-x-plane-row`);
      xPlaneRow.style.display = 'none';
      const yPlaneRow = uiContainer.querySelector(`.${viewerDOMId}-y-plane-row`);
      yPlaneRow.style.display = 'none';
      const zPlaneRow = uiContainer.querySelector(`.${viewerDOMId}-z-plane-row`);
      zPlaneRow.style.display = 'flex';
    }
  }
  function setViewModeVolumeRendering() {
    store.itkVtkView.setViewMode('VolumeRendering');
    store.mainUI.xPlaneButton.checked = false;
    store.mainUI.yPlaneButton.checked = false;
    store.mainUI.zPlaneButton.checked = false;
    store.mainUI.volumeRenderingButton.checked = true;
    if (store.imageUI.representationProxy && !!store.imageUI.image) {
      const viewPlanes = document.getElementById(
        `${viewerDOMId}-toggleSlicingPlanesButton`
      ).checked;
      const xPlaneRow = uiContainer.querySelector(`.${viewerDOMId}-x-plane-row`);
      const yPlaneRow = uiContainer.querySelector(`.${viewerDOMId}-y-plane-row`);
      const zPlaneRow = uiContainer.querySelector(`.${viewerDOMId}-z-plane-row`);
      if (viewPlanes) {
        xPlaneRow.style.display = 'flex';
        yPlaneRow.style.display = 'flex';
        zPlaneRow.style.display = 'flex';
      } else {
        xPlaneRow.style.display = 'none';
        yPlaneRow.style.display = 'none';
        zPlaneRow.style.display = 'none';
      }
    }
  }
  if (!use2D) {
    const xPlaneButton = document.createElement('div');
    store.mainUI.xPlaneButton = xPlaneButton;
    xPlaneButton.innerHTML = `<input id="${viewerDOMId}-xPlaneButton" type="checkbox" class="${
      style.toggleInput
    }"><label itk-vtk-tooltip itk-vtk-tooltip-top itk-vtk-tooltip-content="X plane [1]" class="${
      contrastSensitiveStyle.tooltipButton
    } ${style.viewModeButton} ${
      style.toggleButton
    }" for="${viewerDOMId}-xPlaneButton">${xPlaneIcon}</label>`;
    xPlaneButton.addEventListener('click',
      (event) => {
        event.preventDefault();
        event.stopPropagation();
        store.mainUI.viewMode = 'XPlane';
      }
    );
    mainUIRow.appendChild(xPlaneButton);

    const yPlaneButton = document.createElement('div');
    store.mainUI.yPlaneButton = yPlaneButton;
    yPlaneButton.innerHTML = `<input id="${viewerDOMId}-yPlaneButton" type="checkbox" class="${
      style.toggleInput
    }"><label itk-vtk-tooltip itk-vtk-tooltip-top itk-vtk-tooltip-content="Y plane [2]" class="${
      contrastSensitiveStyle.tooltipButton
    } ${style.viewModeButton} ${
      style.toggleButton
    }" for="${viewerDOMId}-yPlaneButton">${yPlaneIcon}</label>`;
    yPlaneButton.addEventListener('click',
      (event) => {
        event.preventDefault();
        event.stopPropagation();
        store.mainUI.viewMode = 'YPlane';
      }
    );
    mainUIRow.appendChild(yPlaneButton);

    const zPlaneButton = document.createElement('div');
    store.mainUI.zPlaneButton = zPlaneButton;
    zPlaneButton.innerHTML = `<input id="${viewerDOMId}-zPlaneButton" type="checkbox" class="${
      style.toggleInput
    }"><label itk-vtk-tooltip itk-vtk-tooltip-top itk-vtk-tooltip-content="Z plane [3]" class="${
      contrastSensitiveStyle.tooltipButton
    } ${style.viewModeButton} ${
      style.toggleButton
    }" for="${viewerDOMId}-zPlaneButton">${zPlaneIcon}</label>`;
    zPlaneButton.addEventListener('click',
      (event) => {
        event.preventDefault();
        event.stopPropagation();
        store.mainUI.viewMode = 'ZPlane';
      }
    );
    mainUIRow.appendChild(zPlaneButton);

    const volumeRenderingButton = document.createElement('div');
    store.mainUI.volumeRenderingButton = volumeRenderingButton;
    volumeRenderingButton.innerHTML = `<input id="${viewerDOMId}-volumeRenderingButton" type="checkbox" class="${
      style.toggleInput
    }" checked><label itk-vtk-tooltip itk-vtk-tooltip-top itk-vtk-tooltip-content="Volume [4]" class="${
      contrastSensitiveStyle.tooltipButton
    } ${style.viewModeButton} ${
      style.toggleButton
    }" for="${viewerDOMId}-volumeRenderingButton">${volumeRenderingIcon}</label>`;
    volumeRenderingButton.addEventListener('click',
      (event) => {
        event.preventDefault();
        event.stopPropagation();
        store.mainUI.viewMode = 'VolumeRendering';
      }
    );
    mainUIRow.appendChild(volumeRenderingButton);

    reaction(() => { return store.mainUI.viewMode; },
      (viewMode) => {
        switch(viewMode) {
        case 'XPlane':
          setViewModeXPlane();
          break;
        case 'YPlane':
          setViewModeYPlane();
          break;
        case 'ZPlane':
          setViewModeZPlane();
          break;
        case 'VolumeRendering':
          setViewModeVolumeRendering();
          break;
        default:
          console.error('Invalid view mode: ' + viewMode);
        }
      }
    )
  }
}

export default createViewModeButtons;
