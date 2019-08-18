import style from '../ItkVtkViewer.module.css';

import volumeRenderingIcon from '../icons/volume-rendering.svg';
import xPlaneIcon from '../icons/x-plane.svg';
import yPlaneIcon from '../icons/y-plane.svg';
import zPlaneIcon from '../icons/z-plane.svg';

function createViewModeButtons(
  viewerStore,
  contrastSensitiveStyle,
  use2D,
  mainUIRow
) {
  const viewerDOMId = viewerStore.id;
  const uiContainer = viewerStore.mainUI.uiContainer;
  function setViewModeXPlane() {
    viewerStore.itkVtkView.setViewMode('XPlane');
    document.getElementById(`${viewerDOMId}-xPlaneButton`).checked = true;
    document.getElementById(`${viewerDOMId}-yPlaneButton`).checked = false;
    document.getElementById(`${viewerDOMId}-zPlaneButton`).checked = false;
    document.getElementById(
      `${viewerDOMId}-volumeRenderingButton`
    ).checked = false;
    if (viewerStore.imageUI.representationProxy) {
      const volumeRenderingRow = uiContainer.querySelector(
        `.${viewerDOMId}-volumeRendering`
      );
      volumeRenderingRow.style.display = 'none';
      const xPlaneRow = uiContainer.querySelector(`.${viewerDOMId}-x-plane-row`);
      xPlaneRow.style.display = 'flex';
      const yPlaneRow = uiContainer.querySelector(`.${viewerDOMId}-y-plane-row`);
      yPlaneRow.style.display = 'none';
      const zPlaneRow = uiContainer.querySelector(`.${viewerDOMId}-z-plane-row`);
      zPlaneRow.style.display = 'none';
    }
  }
  function setViewModeYPlane() {
    viewerStore.itkVtkView.setViewMode('YPlane');
    document.getElementById(`${viewerDOMId}-xPlaneButton`).checked = false;
    document.getElementById(`${viewerDOMId}-yPlaneButton`).checked = true;
    document.getElementById(`${viewerDOMId}-zPlaneButton`).checked = false;
    document.getElementById(
      `${viewerDOMId}-volumeRenderingButton`
    ).checked = false;
    if (viewerStore.imageUI.representationProxy) {
      const volumeRenderingRow = uiContainer.querySelector(
        `.${viewerDOMId}-volumeRendering`
      );
      volumeRenderingRow.style.display = 'none';
      const xPlaneRow = uiContainer.querySelector(`.${viewerDOMId}-x-plane-row`);
      xPlaneRow.style.display = 'none';
      const yPlaneRow = uiContainer.querySelector(`.${viewerDOMId}-y-plane-row`);
      yPlaneRow.style.display = 'flex';
      const zPlaneRow = uiContainer.querySelector(`.${viewerDOMId}-z-plane-row`);
      zPlaneRow.style.display = 'none';
    }
  }
  function setViewModeZPlane() {
    viewerStore.itkVtkView.setViewMode('ZPlane');
    document.getElementById(`${viewerDOMId}-xPlaneButton`).checked = false;
    document.getElementById(`${viewerDOMId}-yPlaneButton`).checked = false;
    document.getElementById(`${viewerDOMId}-zPlaneButton`).checked = true;
    document.getElementById(
      `${viewerDOMId}-volumeRenderingButton`
    ).checked = false;
    if (viewerStore.imageUI.representationProxy) {
      const volumeRenderingRow = uiContainer.querySelector(
        `.${viewerDOMId}-volumeRendering`
      );
      volumeRenderingRow.style.display = 'none';
      const xPlaneRow = uiContainer.querySelector(`.${viewerDOMId}-x-plane-row`);
      xPlaneRow.style.display = 'none';
      const yPlaneRow = uiContainer.querySelector(`.${viewerDOMId}-y-plane-row`);
      yPlaneRow.style.display = 'none';
      const zPlaneRow = uiContainer.querySelector(`.${viewerDOMId}-z-plane-row`);
      zPlaneRow.style.display = 'flex';
    }
  }
  function setViewModeVolumeRendering() {
    viewerStore.itkVtkView.setViewMode('VolumeRendering');
    document.getElementById(`${viewerDOMId}-xPlaneButton`).checked = false;
    document.getElementById(`${viewerDOMId}-yPlaneButton`).checked = false;
    document.getElementById(`${viewerDOMId}-zPlaneButton`).checked = false;
    document.getElementById(
      `${viewerDOMId}-volumeRenderingButton`
    ).checked = true;
    if (viewerStore.imageUI.representationProxy) {
      const volumeRenderingRow = uiContainer.querySelector(
        `.${viewerDOMId}-volumeRendering`
      );
      volumeRenderingRow.style.display = 'flex';
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
    xPlaneButton.innerHTML = `<input id="${viewerDOMId}-xPlaneButton" type="checkbox" class="${
      style.toggleInput
    }"><label itk-vtk-tooltip itk-vtk-tooltip-top itk-vtk-tooltip-content="X plane [1]" class="${
      contrastSensitiveStyle.tooltipButton
    } ${style.viewModeButton} ${
      style.toggleButton
    }" for="${viewerDOMId}-xPlaneButton">${xPlaneIcon}</label>`;
    xPlaneButton.addEventListener('click', setViewModeXPlane);
    mainUIRow.appendChild(xPlaneButton);

    const yPlaneButton = document.createElement('div');
    yPlaneButton.innerHTML = `<input id="${viewerDOMId}-yPlaneButton" type="checkbox" class="${
      style.toggleInput
    }"><label itk-vtk-tooltip itk-vtk-tooltip-top itk-vtk-tooltip-content="Y plane [2]" class="${
      contrastSensitiveStyle.tooltipButton
    } ${style.viewModeButton} ${
      style.toggleButton
    }" for="${viewerDOMId}-yPlaneButton">${yPlaneIcon}</label>`;
    yPlaneButton.addEventListener('click', setViewModeYPlane);
    mainUIRow.appendChild(yPlaneButton);

    const zPlaneButton = document.createElement('div');
    zPlaneButton.innerHTML = `<input id="${viewerDOMId}-zPlaneButton" type="checkbox" class="${
      style.toggleInput
    }"><label itk-vtk-tooltip itk-vtk-tooltip-top itk-vtk-tooltip-content="Z plane [3]" class="${
      contrastSensitiveStyle.tooltipButton
    } ${style.viewModeButton} ${
      style.toggleButton
    }" for="${viewerDOMId}-zPlaneButton">${zPlaneIcon}</label>`;
    zPlaneButton.addEventListener('click', setViewModeZPlane);
    mainUIRow.appendChild(zPlaneButton);

    const volumeRenderingButton = document.createElement('div');
    volumeRenderingButton.innerHTML = `<input id="${viewerDOMId}-volumeRenderingButton" type="checkbox" class="${
      style.toggleInput
    }" checked><label itk-vtk-tooltip itk-vtk-tooltip-top itk-vtk-tooltip-content="Volume [4]" class="${
      contrastSensitiveStyle.tooltipButton
    } ${style.viewModeButton} ${
      style.toggleButton
    }" for="${viewerDOMId}-volumeRenderingButton">${volumeRenderingIcon}</label>`;
    volumeRenderingButton.addEventListener('click', setViewModeVolumeRendering);
    mainUIRow.appendChild(volumeRenderingButton);
  }
}

export default createViewModeButtons;
