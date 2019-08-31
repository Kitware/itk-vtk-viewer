import getContrastSensitiveStyle from '../getContrastSensitiveStyle';

import style from '../ItkVtkViewer.module.css';

import pointSetSizeIcon from '../icons/point-set-size.svg';

function createPointSetSizeSlider(
  viewerStore,
  pointSetSizeRow
) {
  const contrastSensitiveStyle = getContrastSensitiveStyle(
    ['invertibleButton'],
    viewerStore.isBackgroundDark
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
      id="${viewerStore.id}-pointSetSizeSlider"
      class="${style.slider}" />`;
  const sizeElement = sliderEntry.querySelector(
    `#${viewerStore.id}-pointSetSizeSlider`
  );

  reaction(() => {
    return viewerStore.pointSetsUI.pointSets.slice();
  },
    (pointSets) => {
      if(!!!pointSets || pointSets.length === 0) {
        return;
      }

      pointSets.forEach((pointSet, index) => {
        if (viewerStore.pointSetsUI.pointSetSizes.length <= index) {
          viewerStore.pointSetsUI.pointSetSizes.push(defaultPointSetSize);
        }
      })
      const selectedPointSetIndex = viewerStore.pointSetsUI.selectedPointSetIndex;
      sizeElement.value = viewerStore.pointSetsUI.pointSetSizes[selectedPointSetIndex];
    }
  )

  reaction(() => {
    return viewerStore.pointSetsUI.selectedPointSetIndex;
    },
    (selectedPointSetIndex) => {
      sizeElement.value = viewerStore.pointSetsUI.pointSetSizes[selectedPointSetIndex];
    });

  reaction(() => {
    return viewerStore.pointSetsUI.pointSetSizes.slice();
  },
    (pointSetSizes) => {
      const selectedPointSetIndex = viewerStore.pointSetsUI.selectedPointSetIndex;
      const value = pointSetSizes[selectedPointSetIndex];
      viewerStore.pointSetsUI.representationProxies[selectedPointSetIndex].setPointSize(value)
      viewerStore.renderWindow.render();
      sizeElement.value = value;
    });

  sizeElement.addEventListener('input', (event) => {
      event.preventDefault();
      event.stopPropagation();
      const selectedPointSetIndex = viewerStore.pointSetsUI.selectedPointSetIndex;
      viewerStore.pointSetsUI.pointSetSizes[selectedPointSetIndex] = Number(event.target.value);
    });

  const defaultPointSetSizes = new Array(viewerStore.pointSetsUI.pointSets.length);
  defaultPointSetSizes.fill(defaultPointSetsize);
  sizeElement.value = defaultPointSetSize;
  viewerStore.pointSetsUI.pointSetSizes = defaultPointSetSizes;

  pointSetSizeRow.appendChild(sliderEntry);
}

export default createPointSetSizeSlider;
