import getContrastSensitiveStyle from '../getContrastSensitiveStyle';

import style from '../ItkVtkViewer.module.css';

import opacityIcon from '../icons/opacity.svg';

function createPointSetOpacitySlider(
  store,
  pointSetColorRow
) {
  const contrastSensitiveStyle = getContrastSensitiveStyle(
    ['invertibleButton'],
    store.isBackgroundDark
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
      id="${store.id}-pointSetOpacitySlider"
      class="${style.slider}" />`;
  const opacityElement = sliderEntry.querySelector(
    `#${store.id}-pointSetOpacitySlider`
  );

  reaction(() => {
    return store.pointSetsUI.pointSets.slice();
  },
    (pointSets) => {
      if(!!!pointSets || pointSets.length === 0) {
        return;
      }

      pointSets.forEach((pointSet, index) => {
        if (store.pointSetsUI.opacities.length <= index) {
          store.pointSetsUI.opacities.push(defaultPointSetOpacity);
        }
      })
      const selectedPointSetIndex = store.pointSetsUI.selectedPointSetIndex;
      opacityElement.value = store.pointSetsUI.opacities[selectedPointSetIndex];
    }
  )

  reaction(() => {
    return store.pointSetsUI.selectedPointSetIndex;
    },
    (selectedPointSetIndex) => {
      opacityElement.value = store.pointSetsUI.opacities[selectedPointSetIndex];
    });

  reaction(() => {
    return store.pointSetsUI.opacities.slice();
  },
    (opacities) => {
      const selectedPointSetIndex = store.pointSetsUI.selectedPointSetIndex;
      const value = opacities[selectedPointSetIndex];
      store.pointSetsUI.representationProxies[selectedPointSetIndex].setOpacity(value)
      store.renderWindow.render();
      opacityElement.value = value;
    });

  opacityElement.addEventListener('input', (event) => {
      event.preventDefault();
      event.stopPropagation();
      const selectedPointSetIndex = store.pointSetsUI.selectedPointSetIndex;
      store.pointSetsUI.opacities[selectedPointSetIndex] = Number(event.target.value);
    });

  const defaultPointSetOpacities = new Array(store.pointSetsUI.pointSets.length);
  defaultPointSetOpacities.fill(defaultPointSetOpacity);
  opacityElement.value = defaultPointSetOpacity;
  store.pointSetsUI.opacities = defaultPointSetOpacities;

  pointSetColorRow.appendChild(sliderEntry);
}

export default createPointSetOpacitySlider;
