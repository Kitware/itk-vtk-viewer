import getContrastSensitiveStyle from '../getContrastSensitiveStyle';

import style from '../ItkVtkViewer.module.css';

import opacityIcon from '../icons/opacity.svg';

function createPointSetOpacitySlider(
  viewerStore,
  pointSetColorRow
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
    <input type="range" min="0" max="1" value="${defaultPointSetOpacity}" step="0.01"
      id="${viewerStore.id}-pointSetOpacitySlider"
      class="${style.slider}" />`;
  const opacityElement = sliderEntry.querySelector(
    `#${viewerStore.id}-pointSetOpacitySlider`
  );

  reaction(() => {
    return viewerStore.pointSetsUI.pointSets.slice();
  },
    (pointSets) => {
      if(!!!pointSets || pointSets.length === 0) {
        return;
      }

      pointSets.forEach((pointSet, index) => {
        if (viewerStore.pointSetsUI.pointSetOpacities.length <= index) {
          viewerStore.pointSetsUI.pointSetOpacities.push(defaultPointSetOpacity);
        }
      })
      const selectedPointSetIndex = viewerStore.pointSetsUI.selectedPointSetIndex;
      opacityElement.value = viewerStore.pointSetsUI.pointSetOpacities[selectedPointSetIndex];
    }
  )

  reaction(() => {
    return viewerStore.pointSetsUI.selectedPointSetIndex;
    },
    (selectedPointSetIndex) => {
      opacityElement.value = viewerStore.pointSetsUI.pointSetOpacities[selectedPointSetIndex];
    });

  reaction(() => {
    return viewerStore.pointSetsUI.pointSetOpacities.slice();
  },
    (pointSetOpacities) => {
      const selectedPointSetIndex = viewerStore.pointSetsUI.selectedPointSetIndex;
      const value = pointSetOpacities[selectedPointSetIndex];
      viewerStore.pointSetsUI.representationProxies[selectedPointSetIndex].setOpacity(value)
      viewerStore.renderWindow.render();
      opacityElement.value = value;
    });

  opacityElement.addEventListener('input', (event) => {
      event.preventDefault();
      event.stopPropagation();
      const selectedPointSetIndex = viewerStore.pointSetsUI.selectedPointSetIndex;
      viewerStore.pointSetsUI.pointSetOpacities[selectedPointSetIndex] = Number(event.target.value);
    });

  const defaultPointSetOpacities = new Array(viewerStore.pointSetsUI.pointSets.length);
  defaultPointSetOpacities.fill(defaultPointSetOpacity);
  opacityElement.value = defaultPointSetOpacity;
  viewerStore.pointSetsUI.pointSetOpacities = defaultPointSetOpacities;

  pointSetColorRow.appendChild(sliderEntry);
}

export default createPointSetOpacitySlider;
