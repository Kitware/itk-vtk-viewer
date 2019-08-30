import { reaction } from 'mobx';

import getContrastSensitiveStyle from '../getContrastSensitiveStyle';

import style from '../ItkVtkViewer.module.css';

import opacityIcon from '../icons/opacity.svg';

function createGeometryOpacitySlider(
  viewerStore,
  geometryColorRow
) {
  const contrastSensitiveStyle = getContrastSensitiveStyle(
    ['invertibleButton'],
    viewerStore.isBackgroundDark
  );

  const defaultGeometryOpacity = 1.0;

  const sliderEntry = document.createElement('div');
  sliderEntry.setAttribute('class', style.sliderEntry);
  sliderEntry.innerHTML = `
    <div itk-vtk-tooltip itk-vtk-tooltip-bottom itk-vtk-tooltip-content="Opacity" class="${
      contrastSensitiveStyle.invertibleButton
    } ${style.gradientOpacitySlider}">
      ${opacityIcon}
    </div>
    <input type="range" min="0" max="1" value="${defaultGeometryOpacity}" step="0.01"
      id="${viewerStore.id}-geometryOpacitySlider"
      class="${style.slider}" />`;
  const opacityElement = sliderEntry.querySelector(
    `#${viewerStore.id}-geometryOpacitySlider`
  );

  reaction(() => {
    return viewerStore.geometriesUI.geometries.slice();
  },
    (geometries) => {
      if(!!!geometries || geometries.length === 0) {
        return;
      }


      geometries.forEach((geometry, index) => {
        if (viewerStore.geometriesUI.geometryOpacities.length <= index) {
          viewerStore.geometriesUI.geometryOpacities.push(defaultGeometryOpacity);
        }
      })
      const selectedGeometryIndex = viewerStore.geometriesUI.selectedGeometryIndex;
      opacityElement.value = viewerStore.geometriesUI.geometryOpacities[selectedGeometryIndex];
    }
  )

  reaction(() => {
    return viewerStore.geometriesUI.selectedGeometryIndex;
    },
    (selectedGeometryIndex) => {
      opacityElement.value = viewerStore.geometriesUI.geometryOpacities[selectedGeometryIndex];
    });

  reaction(() => {
    return viewerStore.geometriesUI.geometryOpacities.slice();
  },
    (geometryOpacities) => {
      const selectedGeometryIndex = viewerStore.geometriesUI.selectedGeometryIndex;
      const value = geometryOpacities[selectedGeometryIndex];
      viewerStore.geometriesUI.representationProxies[selectedGeometryIndex].setOpacity(value)
      viewerStore.renderWindow.render();
      opacityElement.value = value;
    });


  opacityElement.addEventListener('input', (event) => {
      event.preventDefault();
      event.stopPropagation();
      const selectedGeometryIndex = viewerStore.geometriesUI.selectedGeometryIndex;
      viewerStore.geometriesUI.geometryOpacities[selectedGeometryIndex] = Number(event.target.value);
    });

  const defaultGeometryOpacities = new Array(viewerStore.geometriesUI.geometries.length);
  defaultGeometryOpacities.fill(defaultGeometryOpacity);
  opacityElement.value = defaultGeometryOpacity;
  viewerStore.geometriesUI.geometryOpacities = defaultGeometryOpacities;

  geometryColorRow.appendChild(sliderEntry);
}

export default createGeometryOpacitySlider;
