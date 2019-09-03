import getContrastSensitiveStyle from '../getContrastSensitiveStyle';

import style from '../ItkVtkViewer.module.css';

import pointSetSizeIcon from '../icons/point-set-size.svg';

function createPointSetSizeSlider(
  store,
  pointSetSizeRow
) {
  const contrastSensitiveStyle = getContrastSensitiveStyle(
    ['invertibleButton'],
    store.isBackgroundDark
  );

  const defaultPointSetSize = 3;

  const sliderEntry = document.createElement('div');
  sliderEntry.setAttribute('class', style.sliderEntry);
  sliderEntry.innerHTML = `
    <div itk-vtk-tooltip itk-vtk-tooltip-bottom itk-vtk-tooltip-content="Size" class="${
      contrastSensitiveStyle.invertibleButton
    } ${style.gradientOpacitySlider}">
      ${pointSetSizeIcon}
    </div>
    <input type="range" min="1" max="10" value="${defaultPointSetSize}" step="1"
      id="${store.id}-pointSetSizeSlider"
      class="${style.slider}" />`;
  const sizeElement = sliderEntry.querySelector(
    `#${store.id}-pointSetSizeSlider`
  );

  reaction(() => {
    return store.pointSetsUI.pointSets.slice();
  },
    (pointSets) => {
      if(!!!pointSets || pointSets.length === 0) {
        return;
      }

      pointSets.forEach((pointSet, index) => {
        if (store.pointSetsUI.pointSetSizes.length <= index) {
          store.pointSetsUI.pointSetSizes.push(defaultPointSetSize);
        }
      })
      const selectedPointSetIndex = store.pointSetsUI.selectedPointSetIndex;
      sizeElement.value = store.pointSetsUI.pointSetSizes[selectedPointSetIndex];
    }
  )

  reaction(() => {
    return store.pointSetsUI.selectedPointSetIndex;
    },
    (selectedPointSetIndex) => {
      sizeElement.value = store.pointSetsUI.pointSetSizes[selectedPointSetIndex];
    });

  reaction(() => {
    return store.pointSetsUI.pointSetSizes.slice();
  },
    (pointSetSizes) => {
      const selectedPointSetIndex = store.pointSetsUI.selectedPointSetIndex;
      const value = pointSetSizes[selectedPointSetIndex];
      store.pointSetsUI.representationProxies[selectedPointSetIndex].setPointSize(value)
      store.renderWindow.render();
      sizeElement.value = value;
    });

  sizeElement.addEventListener('input', (event) => {
      event.preventDefault();
      event.stopPropagation();
      const selectedPointSetIndex = store.pointSetsUI.selectedPointSetIndex;
      store.pointSetsUI.pointSetSizes[selectedPointSetIndex] = Number(event.target.value);
    });

  const defaultPointSetSizes = new Array(store.pointSetsUI.pointSets.length);
  defaultPointSetSizes.fill(defaultPointSetsize);
  sizeElement.value = defaultPointSetSize;
  store.pointSetsUI.pointSetSizes = defaultPointSetSizes;

  pointSetSizeRow.appendChild(sliderEntry);
}

export default createPointSetSizeSlider;
