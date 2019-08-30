import { reaction } from 'mobx';

import getContrastSensitiveStyle from '../getContrastSensitiveStyle';

import style from '../ItkVtkViewer.module.css';

import hiddenIcon from '../icons/hidden.svg';
import wireframeIcon from '../icons/geometry-wireframe.svg';
import surfaceIcon from '../icons/geometry-surface.svg';
import surfaceWithEdgesIcon from '../icons/geometry-surface-with-edges.svg';

function createGeometryRepresentationSelector(
  viewerStore,
  geometryRepresentationRow
) {
  const viewerDOMId = viewerStore.id;

  const contrastSensitiveStyle = getContrastSensitiveStyle(
    ['invertibleButton'],
    viewerStore.isBackgroundDark
  );

  const geometryHiddenButton = document.createElement('div');
  geometryHiddenButton.innerHTML = `<input id="${viewerDOMId}-geometryHiddenButton" type="checkbox" class="${
    style.toggleInput
  }"><label itk-vtk-tooltip itk-vtk-tooltip-top itk-vtk-tooltip-content="Hidden" class="${
    contrastSensitiveStyle.tooltipButton
  } ${style.fullscreenButton} ${
    style.toggleButton
  }" for="${viewerDOMId}-geometryHiddenButton">${hiddenIcon}</label>`;
  geometryHiddenButton.addEventListener('click',
    (event) => {
      const selectedGeometryIndex = viewerStore.geometriesUI.selectedGeometryIndex;
      viewerStore.geometriesUI.geometryRepresentations[selectedGeometryIndex] = 'Hidden';
    }
  )
  geometryRepresentationRow.appendChild(geometryHiddenButton);
  const geometryHiddenButtonInput = geometryHiddenButton.children[0];

  const geometryWireframeButton = document.createElement('div');
  geometryWireframeButton.innerHTML = `<input id="${viewerDOMId}-geometryWireframeButton" type="checkbox" class="${
    style.toggleInput
  }"><label itk-vtk-tooltip itk-vtk-tooltip-top itk-vtk-tooltip-content="Wireframe" class="${
    contrastSensitiveStyle.tooltipButton
  } ${style.fullscreenButton} ${
    style.toggleButton
  }" for="${viewerDOMId}-geometryWireframeButton">${wireframeIcon}</label>`;
  geometryWireframeButton.addEventListener('click',
    (event) => {
      const selectedGeometryIndex = viewerStore.geometriesUI.selectedGeometryIndex;
      viewerStore.geometriesUI.geometryRepresentations[selectedGeometryIndex] = 'Wireframe';
    }
  )
  geometryRepresentationRow.appendChild(geometryWireframeButton);
  const geometryWireframeButtonInput = geometryWireframeButton.children[0];

  const geometrySurfaceButton = document.createElement('div');
  geometrySurfaceButton.innerHTML = `<input id="${viewerDOMId}-geometrySurfaceButton" type="checkbox" class="${
    style.toggleInput
  }"><label itk-vtk-tooltip itk-vtk-tooltip-top itk-vtk-tooltip-content="Surface" class="${
    contrastSensitiveStyle.tooltipButton
  } ${style.fullscreenButton} ${
    style.toggleButton
  }" for="${viewerDOMId}-geometrySurfaceButton">${surfaceIcon}</label>`;
  geometrySurfaceButton.addEventListener('click',
    (event) => {
      const selectedGeometryIndex = viewerStore.geometriesUI.selectedGeometryIndex;
      viewerStore.geometriesUI.geometryRepresentations[selectedGeometryIndex] = 'Surface';
    }
  )
  geometryRepresentationRow.appendChild(geometrySurfaceButton);
  const geometrySurfaceButtonInput = geometrySurfaceButton.children[0];

  const geometrySurfaceWithEdgesButton = document.createElement('div');
  geometrySurfaceWithEdgesButton.innerHTML = `<input id="${viewerDOMId}-geometrySurfaceWithEdgesButton" type="checkbox" class="${
    style.toggleInput
  }"><label itk-vtk-tooltip itk-vtk-tooltip-top itk-vtk-tooltip-content="Surface with edges" class="${
    contrastSensitiveStyle.tooltipButton
  } ${style.viewModeButton} ${
    style.toggleButton
  }" for="${viewerDOMId}-geometrySurfaceWithEdgesButton">${surfaceWithEdgesIcon}</label>`;
  geometrySurfaceWithEdgesButton.addEventListener('click',
    (event) => {
      const selectedGeometryIndex = viewerStore.geometriesUI.selectedGeometryIndex;
      viewerStore.geometriesUI.geometryRepresentations[selectedGeometryIndex] = 'Surface with edges';
    }
  )
  geometryRepresentationRow.appendChild(geometrySurfaceWithEdgesButton);
  const geometrySurfaceWithEdgesButtonInput = geometrySurfaceWithEdgesButton.children[0];

  function updateEnabledRepresentationButtons(selectedGeometryRepresentation) {
      switch(selectedGeometryRepresentation) {
      case 'Hidden':
        geometryHiddenButtonInput.checked = true;
        geometryWireframeButtonInput.checked = false;
        geometrySurfaceButtonInput.checked = false;
        geometrySurfaceWithEdgesButtonInput.checked = false;
        break;
      case 'Wireframe':
        geometryHiddenButtonInput.checked = false;
        geometryWireframeButtonInput.checked = true;
        geometrySurfaceButtonInput.checked = false;
        geometrySurfaceWithEdgesButtonInput.checked = false;
        break;
      case 'Surface':
        geometryHiddenButtonInput.checked = false;
        geometryWireframeButtonInput.checked = false;
        geometrySurfaceButtonInput.checked = true;
        geometrySurfaceWithEdgesButtonInput.checked = false;
        break;
      case 'Surface with edges':
        geometryHiddenButtonInput.checked = false;
        geometryWireframeButtonInput.checked = false;
        geometrySurfaceButtonInput.checked = false;
        geometrySurfaceWithEdgesButtonInput.checked = true;
        break;
      default:
        console.error('Invalid geometry representation: ' + selectedGeometryRepresentation);
      }
  }

  function setRepresentation(value, index) {
    if(value === 'Hidden') {
      viewerStore.geometriesUI.representationProxies[index].setVisibility(false)
    } else {
      viewerStore.geometriesUI.representationProxies[index].setRepresentation(value)
      viewerStore.geometriesUI.representationProxies[index].setVisibility(true)
    }
    updateEnabledRepresentationButtons(value);
  }

  reaction(() => {
    return viewerStore.geometriesUI.geometryRepresentations.slice();
  },
    (geometryRepresentations) => {
      const selectedGeometryIndex = viewerStore.geometriesUI.selectedGeometryIndex;
      const representation = viewerStore.geometriesUI.geometryRepresentations[selectedGeometryIndex];
      setRepresentation(representation, selectedGeometryIndex);
      viewerStore.renderWindow.render()
    }
  )

  reaction(() => { return viewerStore.geometriesUI.selectedGeometryIndex; },
    (selectedIndex) => {
      const selectedGeometryRepresentation = viewerStore.geometriesUI.geometryRepresentations[selectedIndex];
      updateEnabledRepresentationButtons(selectedGeometryRepresentation);
    }
  )

  const defaultGeometryRepresentation = 'Surface';

  reaction(() => {
    return viewerStore.geometriesUI.geometries.slice();
  },
    (geometries) => {
      if(!!!geometries || geometries.length === 0) {
        return;
      }

      geometries.forEach((geometry, index) => {
        if (viewerStore.geometriesUI.geometryRepresentations.length <= index) {
          viewerStore.geometriesUI.geometryRepresentations.push(defaultGeometryRepresentation);
        }
      })
      const selectedGeometryIndex = viewerStore.geometriesUI.selectedGeometryIndex;
      updateEnabledRepresentationButtons(viewerStore.geometriesUI.geometryRepresentations[selectedGeometryIndex]);
    }
  )

  const defaultGeometryRepresentations = new Array(viewerStore.geometriesUI.geometries.length);
  defaultGeometryRepresentations.fill(defaultGeometryRepresentation);
  updateEnabledRepresentationButtons(defaultGeometryRepresentation);
  viewerStore.geometriesUI.geometryRepresentations = defaultGeometryRepresentations;
}

export default createGeometryRepresentationSelector;
