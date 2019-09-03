import { autorun } from 'mobx';

import getContrastSensitiveStyle from '../getContrastSensitiveStyle';

import style from '../ItkVtkViewer.module.css';

import viewPlansIcon from '../icons/view-planes.svg';

function createViewPlanesToggle(
  store,
  imageUIGroup,
  volumeRenderingRow,
) {
  const contrastSensitiveStyle = getContrastSensitiveStyle(
    ['tooltipButton'],
    store.isBackgroundDark
  );
  const viewerDOMId = store.id;

  const viewPlanesButton = document.createElement('div');
  viewPlanesButton.innerHTML = `<input id="${viewerDOMId}-toggleSlicingPlanesButton" type="checkbox" class="${
    style.toggleInput
  }"><label itk-vtk-tooltip itk-vtk-tooltip-top-annotation itk-vtk-tooltip-content="View planes [s]" class="${
    contrastSensitiveStyle.tooltipButton
  } ${style.viewPlanesButton} ${
    style.toggleButton
  }" for="${viewerDOMId}-toggleSlicingPlanesButton">${viewPlansIcon}</label>`;

  const viewPlanesButtonInput = viewPlanesButton.children[0];
  function setViewPlanes() {
    const viewPlanes = store.imageUI.slicingPlanesEnabled;
    viewPlanesButtonInput.checked = viewPlanes;
    store.itkVtkView.setViewPlanes(viewPlanes);
    const xPlaneRow = imageUIGroup.querySelector(`.${viewerDOMId}-x-plane-row`);
    const yPlaneRow = imageUIGroup.querySelector(`.${viewerDOMId}-y-plane-row`);
    const zPlaneRow = imageUIGroup.querySelector(`.${viewerDOMId}-z-plane-row`);
    if (store.itkVtkView.getViewMode() === 'VolumeRendering') {
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
  autorun(() => {
    setViewPlanes();
  })
  viewPlanesButton.addEventListener('change', (event) => {
    event.preventDefault();
    event.stopPropagation();
    store.imageUI.slicingPlanesEnabled = !store.imageUI.slicingPlanesEnabled;
  });
  volumeRenderingRow.appendChild(viewPlanesButton);
}

export default createViewPlanesToggle;
