import getContrastSensitiveStyle from '../getContrastSensitiveStyle';

import style from '../ItkVtkViewer.module.css';

import hiddenIcon from '../icons/hidden.svg';
import pointsIcon from '../icons/point-set-points.svg';
import spheresIcon from '../icons/point-set-spheres.svg';

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
    if (pointSetRepresentations[pointSetIndex] === value) {
      return
    }

    if(value === 'Hidden') {
      pointSetRepresentationProxies[pointSetIndex].setVisibility(false)
    } else {
      pointSetRepresentationProxies[pointSetIndex].setRepresentation(value)
      pointSetRepresentationProxies[pointSetIndex].setVisibility(true)
    }
    renderWindow.render()
    pointSetRepresentations[pointSetIndex] = value
  }

  function setRepresentationToHidden() {
    setRepresentation('Hidden', pointSetSelector.selectedIndex);
    document.getElementById(`${viewerDOMId}-pointSetHiddenButton`).checked = true;
    document.getElementById(`${viewerDOMId}-pointSetPointsButton`).checked = false;
    document.getElementById(`${viewerDOMId}-pointSetSpheresButton`).checked = false;
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
    document.getElementById(`${viewerDOMId}-pointSetSpheresButton`).checked = false;
  }
  const pointSetPointsButton = document.createElement('div');
  pointSetPointsButton.innerHTML = `<input id="${viewerDOMId}-pointSetPointsButton" type="checkbox" class="${
    style.toggleInput
  }"><label itk-vtk-tooltip itk-vtk-tooltip-top itk-vtk-tooltip-content="Points" class="${
    contrastSensitiveStyle.tooltipButton
  } ${style.fullscreenButton} ${
    style.toggleButton
  }" for="${viewerDOMId}-pointSetPointsButton">${pointsIcon}</label>`;
  pointSetPointsButton.addEventListener('click', setRepresentationToPoints);
  pointSetRepresentationRow.appendChild(pointSetPointsButton);

  function setRepresentationToSpheres() {
    setRepresentation('Spheres', pointSetSelector.selectedIndex);
    document.getElementById(`${viewerDOMId}-pointSetHiddenButton`).checked = false;
    document.getElementById(`${viewerDOMId}-pointSetPointsButton`).checked = false;
    document.getElementById(`${viewerDOMId}-pointSetSpheresButton`).checked = true;
  }
  const pointSetSpheresButton = document.createElement('div');
  pointSetSpheresButton.innerHTML = `<input id="${viewerDOMId}-pointSetSpheresButton" type="checkbox" class="${
    style.toggleInput
  }"><label itk-vtk-tooltip itk-vtk-tooltip-top itk-vtk-tooltip-content="Spheres" class="${
    contrastSensitiveStyle.tooltipButton
  } ${style.fullscreenButton} ${
    style.toggleButton
  }" for="${viewerDOMId}-pointSetSpheresButton">${spheresIcon}</label>`;
  pointSetSpheresButton.addEventListener('click', setRepresentationToSpheres);
  pointSetRepresentationRow.appendChild(pointSetSpheresButton);

  pointSetSelector.addEventListener('change',
    (event) => {
      setRepresentation(pointSetRepresentations[pointSetSelector.selectedIndex], pointSetSelector.selectedIndex);
    });
  pointSetRepresentations.map((rep, index) => setRepresentation(defaultPointSetRepresentation, index));
}

export default createPointSetRepresentationSelector;
