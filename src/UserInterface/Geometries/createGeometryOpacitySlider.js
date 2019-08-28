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
    return viewerStore.geometriesUI.selectedGeometryIndex;
    },
    (selectedGeometryIndex) => {
      opacityElement.value = viewerStore.geometriesUI.geometryOpacities[selectedGeometryIndex];
    });

  reaction(() => {
    return viewerStore.geometriesUI.geometryOpacities;
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
      viewerStore.geometriesUI.geometryOpacities[selectedGeometryIndex] = event.target.value;
    });

  const defaultGeometryOpacities = new Array(viewerStore.geometries.length);
  defaultGeometryOpacities.fill(1.0);
  opacityElement.value = 1.0;
  viewerStore.geometriesUI.geometryOpacities.concat(defaultGeometryOpacities);

  geometryColorRow.appendChild(sliderEntry);
}

export default createGeometryOpacitySlider;
