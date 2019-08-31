import { reaction, autorun } from 'mobx';

import style from './ItkVtkViewer.module.css';

import createPointSetRepresentationSelector from './PointSets/createPointSetRepresentationSelector';
import createPointSetColorWidget from './PointSets/createPointSetColorWidget';

function createPointSetsUI(
  viewerStore,
) {
  const pointSetsUIGroup = document.createElement('div');
  pointSetsUIGroup.setAttribute('class', style.uiGroup);

  const pointSetRepresentationRow = document.createElement('div');
  pointSetRepresentationRow.setAttribute('class', style.uiRow);
  pointSetRepresentationRow.className += ` ${viewerStore.id}-toggle`;

  const pointSetSelector = document.createElement('select');
  pointSetSelector.setAttribute('class', style.selector);
  pointSetSelector.id = `${viewerStore.id}-pointSetSelector`;
  pointSetRepresentationRow.appendChild(pointSetSelector);

  pointSetSelector.addEventListener('change', (event) => {
    event.preventDefault();
    event.stopPropagation();
    viewerStore.pointSetsUI.selectedPointSetIndex = pointSetSelector.selectedIndex;
  })

  function updatePointSetNames(pointSetNames) {
    pointSetSelector.innerHTML = pointSetNames
      .map((name) => `<option value="${name}">${name}</option>`)
      .join('');
    if(pointSetNames.length > 1) {
      pointSetSelector.disabled = false;
    } else {
      pointSetSelector.disabled = true;
    }
  }
  reaction(() => { return viewerStore.pointSetsUI.pointSetNames.slice(); },
    (pointSetNames) => { updatePointSetNames(pointSetNames); }
  )
  if(viewerStore.pointSetsUI.pointSets.length > 0) {
    viewerStore.pointSetsUI.selectedPointSetIndex = 0;
  }
  autorun(() => {
      const pointSets = viewerStore.pointSetsUI.pointSets;
      if (pointSets.length === 1) {
        viewerStore.pointSetsUI.pointSetNames = ['Point Set'];
      } else {
        viewerStore.pointSetsUI.pointSetNames = pointSets.map((pointSet, index) => `Point Set ${index}`);
      }
    })

  createPointSetRepresentationSelector(
    viewerStore,
    pointSetRepresentationRow
  )
  pointSetsUIGroup.appendChild(pointSetRepresentationRow);

  createPointSetColorWidget(
    viewerStore,
    pointSets,
    pointSetSelector,
    pointSetsUIGroup
  )

  viewerStore.mainUI.uiContainer.appendChild(pointSetsUIGroup);
  viewerStore.pointSetsUI.initialized = true;
}

export default createPointSetsUI;
