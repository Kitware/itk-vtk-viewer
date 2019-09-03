import { reaction, autorun } from 'mobx';

import style from './ItkVtkViewer.module.css';

import createPointSetRepresentationSelector from './PointSets/createPointSetRepresentationSelector';
import createPointSetColorWidget from './PointSets/createPointSetColorWidget';

function createPointSetsUI(
  store,
) {
  const pointSetsUIGroup = document.createElement('div');
  pointSetsUIGroup.setAttribute('class', style.uiGroup);

  const pointSetRepresentationRow = document.createElement('div');
  pointSetRepresentationRow.setAttribute('class', style.uiRow);
  pointSetRepresentationRow.className += ` ${store.id}-toggle`;

  const pointSetSelector = document.createElement('select');
  pointSetSelector.setAttribute('class', style.selector);
  pointSetSelector.id = `${store.id}-pointSetSelector`;
  pointSetRepresentationRow.appendChild(pointSetSelector);

  pointSetSelector.addEventListener('change', (event) => {
    event.preventDefault();
    event.stopPropagation();
    store.pointSetsUI.selectedPointSetIndex = pointSetSelector.selectedIndex;
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
  reaction(() => { return store.pointSetsUI.pointSetNames.slice(); },
    (pointSetNames) => { updatePointSetNames(pointSetNames); }
  )
  if(store.pointSetsUI.pointSets.length > 0) {
    store.pointSetsUI.selectedPointSetIndex = 0;
  }
  autorun(() => {
      const pointSets = store.pointSetsUI.pointSets;
      if (pointSets.length === 1) {
        store.pointSetsUI.pointSetNames = ['Point Set'];
      } else {
        store.pointSetsUI.pointSetNames = pointSets.map((pointSet, index) => `Point Set ${index}`);
      }
    })

  createPointSetRepresentationSelector(
    store,
    pointSetRepresentationRow
  )
  pointSetsUIGroup.appendChild(pointSetRepresentationRow);

  createPointSetColorWidget(
    store,
    pointSetsUIGroup
  )

  store.mainUI.uiContainer.appendChild(pointSetsUIGroup);
  store.pointSetsUI.initialized = true;
}

export default createPointSetsUI;
