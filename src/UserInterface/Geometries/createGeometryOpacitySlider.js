import { reaction } from 'mobx';

import getContrastSensitiveStyle from '../getContrastSensitiveStyle';

import style from '../ItkVtkViewer.module.css';

import opacityIcon from '../icons/opacity.svg';

function createGeometryOpacitySlider(
  store,
  geometryColorRow
) {
  const contrastSensitiveStyle = getContrastSensitiveStyle(
    ['invertibleButton'],
    store.isBackgroundDark
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
      id="${store.id}-geometryOpacitySlider"
      class="${style.slider}" />`;
  const opacityElement = sliderEntry.querySelector(
    `#${store.id}-geometryOpacitySlider`
  );

  reaction(() => {
    return store.geometriesUI.geometries.slice();
  },
    (geometries) => {
      if(!!!geometries || geometries.length === 0) {
        return;
      }


      geometries.forEach((geometry, index) => {
        if (store.geometriesUI.geometryOpacities.length <= index) {
          store.geometriesUI.geometryOpacities.push(defaultGeometryOpacity);
        }
      })
      const selectedGeometryIndex = store.geometriesUI.selectedGeometryIndex;
      opacityElement.value = store.geometriesUI.geometryOpacities[selectedGeometryIndex];
    }
  )

  reaction(() => {
    return store.geometriesUI.selectedGeometryIndex;
    },
    (selectedGeometryIndex) => {
      opacityElement.value = store.geometriesUI.geometryOpacities[selectedGeometryIndex];
    });

  reaction(() => {
    return store.geometriesUI.geometryOpacities.slice();
  },
    (geometryOpacities) => {
      const selectedGeometryIndex = store.geometriesUI.selectedGeometryIndex;
      const value = geometryOpacities[selectedGeometryIndex];
      store.geometriesUI.representationProxies[selectedGeometryIndex].setOpacity(value)
      store.renderWindow.render();
      opacityElement.value = value;
    });


  opacityElement.addEventListener('input', (event) => {
      event.preventDefault();
      event.stopPropagation();
      const selectedGeometryIndex = store.geometriesUI.selectedGeometryIndex;
      store.geometriesUI.geometryOpacities[selectedGeometryIndex] = Number(event.target.value);
    });

  const defaultGeometryOpacities = new Array(store.geometriesUI.geometries.length);
  defaultGeometryOpacities.fill(defaultGeometryOpacity);
  opacityElement.value = defaultGeometryOpacity;
  store.geometriesUI.geometryOpacities = defaultGeometryOpacities;

  geometryColorRow.appendChild(sliderEntry);
}

export default createGeometryOpacitySlider;
