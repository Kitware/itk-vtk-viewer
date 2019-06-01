import getContrastSensitiveStyle from '../getContrastSensitiveStyle';

import style from '../ItkVtkViewer.module.css';

import hiddenIcon from '../icons/geometry-hidden.svg';
import wireframeIcon from '../icons/geometry-wireframe.svg';
import surfaceIcon from '../icons/geometry-surface.svg';

function createPointSetRepresentationSelector(
  viewerDOMId,
  pointSetNames,
  renderWindow,
  isBackgroundDark,
  pointSetRepresentationProxies,
  pointSetSelector,
  pointSetRepresentationRow
) {
  const pointSetRepresentations = new Array(pointSetNames.length);
  const defaultPointSetRepresentation = 'Points';
  pointSetRepresentations.fill(defaultPointSetRepresentation);

  const contrastSensitiveStyle = getContrastSensitiveStyle(
    ['invertibleButton'],
    isBackgroundDark
  );

  function setRepresentation(value, pointSetIndex) {
    if(value === 'Hidden') {
      pointSetRepresentationProxies[pointSetIndex][0].setVisibility(false)
    } else {
      pointSetRepresentationProxies[pointSetIndex][0].setRepresentation(value)
      pointSetRepresentationProxies[pointSetIndex][0].setVisibility(true)
    }
    renderWindow.render()
    pointSetRepresentations[pointSetIndex] = value
  }

  function setRepresentationToHidden() {
    setRepresentation('Hidden', pointSetSelector.selectedIndex);
    document.getElementById(`${viewerDOMId}-pointSetHiddenButton`).checked = true;
    document.getElementById(`${viewerDOMId}-pointSetPointsButton`).checked = false;
  }
  const pointSetHiddenButton = document.createElement('div');
  pointSetHiddenButton.innerHTML = `<input id="${viewerDOMId}-pointSetHiddenButton" type="checkbox" class="${
    style.toggleInput
  }"><label itk-vtk-tooltip itk-vtk-tooltip-top itk-vtk-tooltip-content="Hidden" class="${
    contrastSensitiveStyle.tooltipButton
  } ${style.fullscreenButton} ${
    style.toggleButton
  }" for="${viewerDOMId}-pointSetHiddenButton">${hiddenIcon}</label>`;
  pointSetHiddenButton.addEventListener('click', setRepresentationToHidden);
  pointSetRepresentationRow.appendChild(pointSetHiddenButton);

  function setRepresentationToPoints() {
    setRepresentation('Points', pointSetSelector.selectedIndex);
    document.getElementById(`${viewerDOMId}-pointSetHiddenButton`).checked = false;
    document.getElementById(`${viewerDOMId}-pointSetPointsButton`).checked = true;
  }
  const pointSetPointsButton = document.createElement('div');
  pointSetPointsButton.innerHTML = `<input id="${viewerDOMId}-pointSetPointsButton" type="checkbox" class="${
    style.toggleInput
  }"><label itk-vtk-tooltip itk-vtk-tooltip-top itk-vtk-tooltip-content="Points" class="${
    contrastSensitiveStyle.tooltipButton
  } ${style.fullscreenButton} ${
    style.toggleButton
  }" for="${viewerDOMId}-pointSetPointsButton">${wireframeIcon}</label>`;
  pointSetPointsButton.addEventListener('click', setRepresentationToPoints);
  pointSetRepresentationRow.appendChild(pointSetPointsButton);

  pointSetSelector.addEventListener('change',
    (event) => {
      setRepresentation(pointSetRepresentations[pointSetSelector.selectedIndex], pointSetSelector.selectedIndex);
    });
  pointSetRepresentations.map((rep, index) => setRepresentation(defaultPointSetRepresentation, index));
}

export default createPointSetRepresentationSelector;
