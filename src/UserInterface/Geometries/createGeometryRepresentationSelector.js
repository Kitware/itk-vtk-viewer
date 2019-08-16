import getContrastSensitiveStyle from '../getContrastSensitiveStyle';

import style from '../ItkVtkViewer.module.css';

import hiddenIcon from '../icons/hidden.svg';
import wireframeIcon from '../icons/geometry-wireframe.svg';
import surfaceIcon from '../icons/geometry-surface.svg';
import surfaceWithEdgesIcon from '../icons/geometry-surface-with-edges.svg';

function createGeometryRepresentationSelector(
  geometryNames,
  renderWindow,
  viewerStore,
  geometrySelector,
  geometryRepresentationRow
) {
  const viewerDOMId = viewerStore.id;
  const geometryRepresentations = new Array(geometryNames.length);
  const defaultGeometryRepresentation = 'Surface';
  geometryRepresentations.fill(defaultGeometryRepresentation);

  const contrastSensitiveStyle = getContrastSensitiveStyle(
    ['invertibleButton'],
    viewerStore.isBackgroundDark
  );

  function setRepresentation(value) {
    if(value === 'Hidden') {
      viewerStore.geometriesUI.representationProxies[geometrySelector.selectedIndex].setVisibility(false)
    } else {
      viewerStore.geometriesUI.representationProxies[geometrySelector.selectedIndex].setRepresentation(value)
      viewerStore.geometriesUI.representationProxies[geometrySelector.selectedIndex].setVisibility(true)
    }
    renderWindow.render()
    geometryRepresentations[geometrySelector.selectedIndex] = value
  }

  function setRepresentationToHidden() {
    setRepresentation('Hidden');
    document.getElementById(`${viewerDOMId}-geometryHiddenButton`).checked = true;
    document.getElementById(`${viewerDOMId}-geometryWireframeButton`).checked = false;
    document.getElementById(`${viewerDOMId}-geometrySurfaceButton`).checked = false;
    document.getElementById(`${viewerDOMId}-geometrySurfaceWithEdgesButton`).checked = false;
  }
  const geometryHiddenButton = document.createElement('div');
  geometryHiddenButton.innerHTML = `<input id="${viewerDOMId}-geometryHiddenButton" type="checkbox" class="${
    style.toggleInput
  }"><label itk-vtk-tooltip itk-vtk-tooltip-top itk-vtk-tooltip-content="Hidden" class="${
    contrastSensitiveStyle.tooltipButton
  } ${style.fullscreenButton} ${
    style.toggleButton
  }" for="${viewerDOMId}-geometryHiddenButton">${hiddenIcon}</label>`;
  geometryHiddenButton.addEventListener('click', setRepresentationToHidden);
  geometryRepresentationRow.appendChild(geometryHiddenButton);

  function setRepresentationToWireframe() {
    setRepresentation('Wireframe');
    document.getElementById(`${viewerDOMId}-geometryHiddenButton`).checked = false;
    document.getElementById(`${viewerDOMId}-geometryWireframeButton`).checked = true;
    document.getElementById(`${viewerDOMId}-geometrySurfaceButton`).checked = false;
    document.getElementById(`${viewerDOMId}-geometrySurfaceWithEdgesButton`).checked = false;
  }
  const geometryWireframeButton = document.createElement('div');
  geometryWireframeButton.innerHTML = `<input id="${viewerDOMId}-geometryWireframeButton" type="checkbox" class="${
    style.toggleInput
  }"><label itk-vtk-tooltip itk-vtk-tooltip-top itk-vtk-tooltip-content="Wireframe" class="${
    contrastSensitiveStyle.tooltipButton
  } ${style.fullscreenButton} ${
    style.toggleButton
  }" for="${viewerDOMId}-geometryWireframeButton">${wireframeIcon}</label>`;
  geometryWireframeButton.addEventListener('click', setRepresentationToWireframe);
  geometryRepresentationRow.appendChild(geometryWireframeButton);

  function setRepresentationToSurface() {
    setRepresentation('Surface');
    document.getElementById(`${viewerDOMId}-geometryHiddenButton`).checked = false;
    document.getElementById(`${viewerDOMId}-geometryWireframeButton`).checked = false;
    document.getElementById(`${viewerDOMId}-geometrySurfaceButton`).checked = true;
    document.getElementById(`${viewerDOMId}-geometrySurfaceWithEdgesButton`).checked = false;
  }
  const geometrySurfaceButton = document.createElement('div');
  geometrySurfaceButton.innerHTML = `<input id="${viewerDOMId}-geometrySurfaceButton" type="checkbox" class="${
    style.toggleInput
  }"><label itk-vtk-tooltip itk-vtk-tooltip-top itk-vtk-tooltip-content="Surface" class="${
    contrastSensitiveStyle.tooltipButton
  } ${style.fullscreenButton} ${
    style.toggleButton
  }" for="${viewerDOMId}-geometrySurfaceButton">${surfaceIcon}</label>`;
  geometrySurfaceButton.addEventListener('click', setRepresentationToSurface);
  geometryRepresentationRow.appendChild(geometrySurfaceButton);

  function setRepresentationToSurfaceWithEdges() {
    setRepresentation('Surface with edges');
    document.getElementById(`${viewerDOMId}-geometryHiddenButton`).checked = false;
    document.getElementById(`${viewerDOMId}-geometryWireframeButton`).checked = false;
    document.getElementById(`${viewerDOMId}-geometrySurfaceButton`).checked = false;
    document.getElementById(`${viewerDOMId}-geometrySurfaceWithEdgesButton`).checked = true;
  }
  const geometrySurfaceWithEdgesButton = document.createElement('div');
  geometrySurfaceWithEdgesButton.innerHTML = `<input id="${viewerDOMId}-geometrySurfaceWithEdgesButton" type="checkbox" class="${
    style.toggleInput
  }"><label itk-vtk-tooltip itk-vtk-tooltip-top itk-vtk-tooltip-content="Surface with edges" class="${
    contrastSensitiveStyle.tooltipButton
  } ${style.viewModeButton} ${
    style.toggleButton
  }" for="${viewerDOMId}-geometrySurfaceWithEdgesButton">${surfaceWithEdgesIcon}</label>`;
  geometrySurfaceWithEdgesButton.addEventListener('click', setRepresentationToSurfaceWithEdges);
  geometryRepresentationRow.appendChild(geometrySurfaceWithEdgesButton);

  geometrySelector.addEventListener('change',
    (event) => {
      setRepresentation(geometryRepresentations[geometrySelector.selectedIndex]);
    });
  setRepresentation(defaultGeometryRepresentation);
}

export default createGeometryRepresentationSelector;
