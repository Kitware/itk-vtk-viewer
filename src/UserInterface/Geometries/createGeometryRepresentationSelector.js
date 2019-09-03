import { reaction } from 'mobx';

import getContrastSensitiveStyle from '../getContrastSensitiveStyle';

import style from '../ItkVtkViewer.module.css';

import hiddenIcon from '../icons/hidden.svg';
import wireframeIcon from '../icons/geometry-wireframe.svg';
import surfaceIcon from '../icons/geometry-surface.svg';
import surfaceWithEdgesIcon from '../icons/geometry-surface-with-edges.svg';

function createGeometryRepresentationSelector(
  store,
  geometryRepresentationRow
) {
  const viewerDOMId = store.id;

  const contrastSensitiveStyle = getContrastSensitiveStyle(
    ['invertibleButton'],
    store.isBackgroundDark
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
      const selectedGeometryIndex = store.geometriesUI.selectedGeometryIndex;
      store.geometriesUI.geometryRepresentations[selectedGeometryIndex] = 'Hidden';
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
      const selectedGeometryIndex = store.geometriesUI.selectedGeometryIndex;
      store.geometriesUI.geometryRepresentations[selectedGeometryIndex] = 'Wireframe';
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
      const selectedGeometryIndex = store.geometriesUI.selectedGeometryIndex;
      store.geometriesUI.geometryRepresentations[selectedGeometryIndex] = 'Surface';
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
      const selectedGeometryIndex = store.geometriesUI.selectedGeometryIndex;
      store.geometriesUI.geometryRepresentations[selectedGeometryIndex] = 'Surface with edges';
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
      store.geometriesUI.representationProxies[index].setVisibility(false)
    } else {
      store.geometriesUI.representationProxies[index].setRepresentation(value)
      store.geometriesUI.representationProxies[index].setVisibility(true)
    }
    updateEnabledRepresentationButtons(value);
    store.renderWindow.render()
  }

  reaction(() => {
    return store.geometriesUI.geometryRepresentations.slice();
  },
    (geometryRepresentations) => {
      const selectedGeometryIndex = store.geometriesUI.selectedGeometryIndex;
      const representation = store.geometriesUI.geometryRepresentations[selectedGeometryIndex];
      setRepresentation(representation, selectedGeometryIndex);
      store.renderWindow.render()
    }
  )

  reaction(() => { return store.geometriesUI.selectedGeometryIndex; },
    (selectedIndex) => {
      const selectedGeometryRepresentation = store.geometriesUI.geometryRepresentations[selectedIndex];
      updateEnabledRepresentationButtons(selectedGeometryRepresentation);
    }
  )

  const defaultGeometryRepresentation = 'Surface';

  reaction(() => {
    return store.geometriesUI.geometries.slice();
  },
    (geometries) => {
      if(!!!geometries || geometries.length === 0) {
        return;
      }

      geometries.forEach((geometry, index) => {
        if (store.geometriesUI.geometryRepresentations.length <= index) {
          store.geometriesUI.geometryRepresentations.push(defaultGeometryRepresentation);
        }
      })
      const selectedGeometryIndex = store.geometriesUI.selectedGeometryIndex;
      updateEnabledRepresentationButtons(store.geometriesUI.geometryRepresentations[selectedGeometryIndex]);
    }
  )

  const defaultGeometryRepresentations = new Array(store.geometriesUI.geometries.length);
  defaultGeometryRepresentations.fill(defaultGeometryRepresentation);
  updateEnabledRepresentationButtons(defaultGeometryRepresentation);
  store.geometriesUI.geometryRepresentations = defaultGeometryRepresentations;
}

export default createGeometryRepresentationSelector;
