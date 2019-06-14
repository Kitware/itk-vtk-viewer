import style from './ItkVtkViewer.module.css';

import createPointSetRepresentationSelector from './PointSets/createPointSetRepresentationSelector';
import createPointSetColorWidget from './PointSets/createPointSetColorWidget';

function createPointSetsUI(
  uiContainer,
  viewerDOMId,
  pointSets,
  pointSetRepresentationProxies,
  view,
  isBackgroundDark
) {
  const renderWindow = view.getRenderWindow();

  const pointSetsUIGroup = document.createElement('div');
  pointSetsUIGroup.setAttribute('class', style.uiGroup);

  const pointSetRepresentationRow = document.createElement('div');
  pointSetRepresentationRow.setAttribute('class', style.uiRow);
  pointSetRepresentationRow.className += ` ${viewerDOMId}-toggle`;

  const pointSetNames = pointSets.map((pointSet, index) => `Point Set ${index}`);
  const pointSetSelector = document.createElement('select');
  pointSetSelector.setAttribute('class', style.selector);
  pointSetSelector.id = `${viewerDOMId}-pointSetSelector`;
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
    viewerDOMId,
    pointSetNames,
    renderWindow,
    isBackgroundDark,
    pointSetRepresentationProxies,
    pointSetSelector,
    pointSetRepresentationRow
  )
  pointSetsUIGroup.appendChild(pointSetRepresentationRow);

  createPointSetColorWidget(
    viewerDOMId,
    renderWindow,
    pointSets,
    pointSetRepresentationProxies,
    isBackgroundDark,
    pointSetSelector,
    pointSetsUIGroup
  )

  uiContainer.appendChild(pointSetsUIGroup);

  return {};
}

export default createPointSetsUI;
