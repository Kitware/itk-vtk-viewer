import { reaction } from 'mobx';

import getContrastSensitiveStyle from '../getContrastSensitiveStyle';

import style from '../ItkVtkViewer.module.css';

import hiddenIcon from '../icons/hidden.svg';
import pointsIcon from '../icons/point-set-points.svg';
import spheresIcon from '../icons/point-set-spheres.svg';

function createPointSetRepresentationSelector(
  store,
  pointSetRepresentationRow
) {
  const viewerDOMId = store.id;

  const contrastSensitiveStyle = getContrastSensitiveStyle(
      ['invertibleButton'],
      store.isBackgroundDark
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
      const selectedPointSetIndex = store.pointSetsUI.selectedPointSetIndex;
      store.pointSetsUI.representations[selectedPointSetIndex] = 'Hidden';
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
      const selectedPointSetIndex = store.pointSetsUI.selectedPointSetIndex;
      store.pointSetsUI.representations[selectedPointSetIndex] = 'Points';
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
      const selectedPointSetIndex = store.pointSetsUI.selectedPointSetIndex;
      store.pointSetsUI.representations[selectedPointSetIndex] = 'Spheres';
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
      store.pointSetsUI.representationProxies[index].setVisibility(false)
    } else {
      store.pointSetsUI.representationProxies[index].setRepresentation(value)
      store.pointSetsUI.representationProxies[index].setVisibility(true)
    }
    updateEnabledRepresentationButtons(value);
    store.renderWindow.render()
  }

  pointSetSelector.addEventListener('change',
    (event) => {
      setRepresentation(representations[pointSetSelector.selectedIndex], pointSetSelector.selectedIndex);
    });
  representations.map((rep, index) => setRepresentation(defaultPointSetRepresentation, index));

  reaction(() => {
    return store.pointSetsUI.representations.slice();
  },
    (representations) => {
      const selectedPointSetIndex = store.pointSetsUI.selectedPointSetIndex;
      const representation = store.pointSetsUI.representations[selectedPointSetIndex];
      setRepresentation(representation, selectedPointSetIndex);
      store.renderWindow.render()
    }
  )

  reaction(() => { return store.pointSetsUI.selectedPointSetIndex; },
    (selectedIndex) => {
      const selectedPointSetRepresentation = store.pointSetsUI.representations[selectedIndex];
      updateEnabledRepresentationButtons(selectedPointSetRepresentation);
    }
  )

  const defaultPointSetRepresentation = 'Points';

  reaction(() => {
    return store.pointSetsUI.pointSets.slice();
  },
    (pointSets) => {
      if(!!!pointSets || pointSets.length === 0) {
        return;
      }

      pointSets.forEach((pointSet, index) => {
        if (store.pointSetsUI.representations.length <= index) {
          store.pointSetsUI.representations.push(defaultPointSetRepresentation);
        }
      })
      const selectedPointSetIndex = store.pointSetsUI.selectedPointSetIndex;
      updateEnabledRepresentationButtons(store.pointSetsUI.representations[selectedPointSetIndex]);
    }
  )

  const defaultPointSetRepresentations = new Array(store.pointSetsUI.pointSets.length);
  defaultPointSetRepresentations.fill(defaultPointSetRepresentation);
  updateEnabledRepresentationButtons(defaultPointSetRepresentation);
  store.pointSetsUI.representations = defaultPointSetRepresentations;
  const pointSetRepresentationProxies = store.pointSetsUI.representationProxies;
}

export default createPointSetRepresentationSelector;
