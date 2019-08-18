import style from './ItkVtkViewer.module.css';

import createPointSetRepresentationSelector from './PointSets/createPointSetRepresentationSelector';
import createPointSetColorWidget from './PointSets/createPointSetColorWidget';

function createPointSetsUI(
  viewerStore,
  pointSets,
) {
  const pointSetsUIGroup = document.createElement('div');
  pointSetsUIGroup.setAttribute('class', style.uiGroup);

  const pointSetRepresentationRow = document.createElement('div');
  pointSetRepresentationRow.setAttribute('class', style.uiRow);
  pointSetRepresentationRow.className += ` ${viewerStore.id}-toggle`;

  const pointSetNames = pointSets.map((pointSet, index) => `Point Set ${index}`);
  const pointSetSelector = document.createElement('select');
  pointSetSelector.setAttribute('class', style.selector);
  pointSetSelector.id = `${viewerStore.id}-pointSetSelector`;
  pointSetSelector.innerHTML = pointSetNames
    .map((name) => `<option value="${name}">${name}</option>`)
    .join('');
  if(pointSetNames.length > 1) {
    pointSetRepresentationRow.appendChild(pointSetSelector);
  } else {
    // Results in a more consistent layout with the representation buttons
    const pointSetLabel = document.createElement('label');
    pointSetLabel.innerHTML = "Point Set ";
    pointSetLabel.setAttribute('class', style.selector);
    pointSetRepresentationRow.appendChild(pointSetLabel);
  }

  createPointSetRepresentationSelector(
    viewerStore,
    pointSetNames,
    pointSetSelector,
    pointSetRepresentationRow
  )
  pointSetsUIGroup.appendChild(pointSetRepresentationRow);

  createPointSetColorWidget(
    viewerStore,
    pointSets,
    pointSetSelector,
    pointSetsUIGroup
  )

  viewerStore.uiContainer.appendChild(pointSetsUIGroup);
}

export default createPointSetsUI;
