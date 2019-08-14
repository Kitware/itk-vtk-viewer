import getContrastSensitiveStyle from '../getContrastSensitiveStyle';

import style from '../ItkVtkViewer.module.css';

import viewPlansIcon from '../icons/view-planes.svg';

function createViewPlanesToggle(
  imageUIGroup,
  viewerDOMId,
  volumeRenderingRow,
  view,
  viewerStore
) {
  const contrastSensitiveStyle = getContrastSensitiveStyle(
    ['tooltipButton'],
    viewerStore.isBackgroundDark
  );

  let viewPlanes = false;
  function setViewPlanes() {
    viewPlanes = !viewPlanes;
    view.setViewPlanes(viewPlanes);
    const xPlaneRow = imageUIGroup.querySelector(`.${viewerDOMId}-x-plane-row`);
    const yPlaneRow = imageUIGroup.querySelector(`.${viewerDOMId}-y-plane-row`);
    const zPlaneRow = imageUIGroup.querySelector(`.${viewerDOMId}-z-plane-row`);
    if (view.getViewMode() === 'VolumeRendering') {
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

  const viewPlanesButton = document.createElement('div');
  viewPlanesButton.innerHTML = `<input id="${viewerDOMId}-toggleSlicingPlanesButton" type="checkbox" class="${
    style.toggleInput
  }"><label itk-vtk-tooltip itk-vtk-tooltip-top-annotation itk-vtk-tooltip-content="View planes [s]" class="${
    contrastSensitiveStyle.tooltipButton
  } ${style.viewPlanesButton} ${
    style.toggleButton
  }" for="${viewerDOMId}-toggleSlicingPlanesButton">${viewPlansIcon}</label>`;
  viewPlanesButton.addEventListener('change', (event) => {
    setViewPlanes();
  });
  volumeRenderingRow.appendChild(viewPlanesButton);
}

export default createViewPlanesToggle;
