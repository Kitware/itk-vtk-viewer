import { reaction } from 'mobx';

import getContrastSensitiveStyle from '../getContrastSensitiveStyle';

import style from '../ItkVtkViewer.module.css';

import hiddenIcon from '../icons/hidden.svg';
import pointsIcon from '../icons/point-set-points.svg';
import spheresIcon from '../icons/point-set-spheres.svg';

function createPointSetRepresentationSelector(
  viewerStore,
  pointSetRepresentationRow
) {
  const viewerDOMId = viewerStore.id;

  const contrastSensitiveStyle = getContrastSensitiveStyle(
      ['invertibleButton'],
      viewerStore.isBackgroundDark
    );

  const pointSetHiddenButton = document.createElement('div');
  pointSetHiddenButton.innerHTML = `<input id="${viewerDOMId}-pointSetHiddenButton" type="checkbox" class="${
    style.toggleInput
  }"><label itk-vtk-tooltip itk-vtk-tooltip-top itk-vtk-tooltip-content="Hidden" class="${
    contrastSensitiveStyle.tooltipButton
  } ${style.fullscreenButton} ${
    style.toggleButton
  }" for="${viewerDOMId}-pointSetHiddenButton">${hiddenIcon}</label>`;
  pointSetHiddenButton.addEventListener('click',
    (event) => {
      const selectedPointSetIndex = viewerStore.pointSetsUI.selectedPointSetIndex;
      viewerStore.pointSetsUI.pointSetRepresentations[selectedPointSetIndex] = 'Hidden';
    }
  )
  pointSetRepresentationRow.appendChild(pointSetHiddenButton);
  const pointSetHiddenButtonInput = pointSetHiddenButton.children[0];

  const pointSetPointsButton = document.createElement('div');
  pointSetPointsButton.innerHTML = `<input id="${viewerDOMId}-pointSetPointsButton" type="checkbox" class="${
    style.toggleInput
  }"><label itk-vtk-tooltip itk-vtk-tooltip-top itk-vtk-tooltip-content="Points" class="${
    contrastSensitiveStyle.tooltipButton
  } ${style.fullscreenButton} ${
    style.toggleButton
  }" for="${viewerDOMId}-pointSetPointsButton">${pointsIcon}</label>`;
  pointSetPointsButton.addEventListener('click',
    (event) => {
      const selectedPointSetIndex = viewerStore.pointSetsUI.selectedPointSetIndex;
      viewerStore.pointSetsUI.pointSetRepresentations[selectedPointSetIndex] = 'Points';
    }
  )
  pointSetRepresentationRow.appendChild(pointSetPointsButton);
  const pointSetPointsButtonInput = pointSetPointsButton.children[0];

  const pointSetSpheresButton = document.createElement('div');
  pointSetSpheresButton.innerHTML = `<input id="${viewerDOMId}-pointSetSpheresButton" type="checkbox" class="${
    style.toggleInput
  }"><label itk-vtk-tooltip itk-vtk-tooltip-top itk-vtk-tooltip-content="Spheres" class="${
    contrastSensitiveStyle.tooltipButton
  } ${style.fullscreenButton} ${
    style.toggleButton
  }" for="${viewerDOMId}-pointSetSpheresButton">${spheresIcon}</label>`;
  pointSetSpheresButton.addEventListener('click',
    (event) => {
      const selectedPointSetIndex = viewerStore.pointSetsUI.selectedPointSetIndex;
      viewerStore.pointSetsUI.pointSetRepresentations[selectedPointSetIndex] = 'Spheres';
    }
  )
  pointSetRepresentationRow.appendChild(pointSetSpheresButton);
  const pointSetSpheresButtonInput = pointSetSpheresButton.children[0];

  function updateEnabledRepresentationButtons(selectedPointSetRepresentation) {
      switch(selectedPointSetRepresentation) {
      case 'Hidden':
        pointSetHiddenButtonInput.checked = true;
        pointSetPointsButtonInput.checked = false;
        pointSetSpheresButtonInput.checked = false;
        break;
      case 'Points':
        pointSetHiddenButtonInput.checked = false;
        pointSetPointsButtonInput.checked = true;
        pointSetSpheresButtonInput.checked = false;
        break;
      case 'Spheres':
        pointSetHiddenButtonInput.checked = false;
        pointSetPointsButtonInput.checked = false;
        pointSetSpheresButtonInput.checked = true;
        break;
      default:
        console.error('Invalid pointSet representation: ' + selectedPointSetRepresentation);
      }
  }

  function setRepresentation(value, index) {
    if(value === 'Hidden') {
      viewerStore.pointSetsUI.representationProxies[index].setVisibility(false)
    } else {
      viewerStore.pointSetsUI.representationProxies[index].setRepresentation(value)
      viewerStore.pointSetsUI.representationProxies[index].setVisibility(true)
    }
    updateEnabledRepresentationButtons(value);
    viewerStore.renderWindow.render()
  }

  pointSetSelector.addEventListener('change',
    (event) => {
      setRepresentation(pointSetRepresentations[pointSetSelector.selectedIndex], pointSetSelector.selectedIndex);
    });
  pointSetRepresentations.map((rep, index) => setRepresentation(defaultPointSetRepresentation, index));

  reaction(() => {
    return viewerStore.pointSetsUI.pointSetRepresentations.slice();
  },
    (pointSetRepresentations) => {
      const selectedPointSetIndex = viewerStore.pointSetsUI.selectedPointSetIndex;
      const representation = viewerStore.pointSetsUI.pointSetRepresentations[selectedPointSetIndex];
      setRepresentation(representation, selectedPointSetIndex);
      viewerStore.renderWindow.render()
    }
  )

  reaction(() => { return viewerStore.pointSetsUI.selectedPointSetIndex; },
    (selectedIndex) => {
      const selectedPointSetRepresentation = viewerStore.pointSetsUI.pointSetRepresentations[selectedIndex];
      updateEnabledRepresentationButtons(selectedPointSetRepresentation);
    }
  )

  const defaultPointSetRepresentation = 'Points';

  reaction(() => {
    return viewerStore.pointSetsUI.pointSets.slice();
  },
    (pointSets) => {
      if(!!!pointSets || pointSets.length === 0) {
        return;
      }

      pointSets.forEach((pointSet, index) => {
        if (viewerStore.pointSetsUI.pointSetRepresentations.length <= index) {
          viewerStore.pointSetsUI.pointSetRepresentations.push(defaultPointSetRepresentation);
        }
      })
      const selectedPointSetIndex = viewerStore.pointSetsUI.selectedPointSetIndex;
      updateEnabledRepresentationButtons(viewerStore.pointSetsUI.pointSetRepresentations[selectedPointSetIndex]);
    }
  )

  const defaultPointSetRepresentations = new Array(viewerStore.pointSetsUI.pointSets.length);
  defaultPointSetRepresentations.fill(defaultPointSetRepresentation);
  updateEnabledRepresentationButtons(defaultPointSetRepresentation);
  viewerStore.pointSetsUI.pointSetRepresentations = defaultPointSetRepresentations;
  const pointSetRepresentationProxies = viewerStore.pointSetsUI.representationProxies;
}

export default createPointSetRepresentationSelector;
