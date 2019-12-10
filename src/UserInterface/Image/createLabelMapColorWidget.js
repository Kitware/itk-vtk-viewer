import { autorun, action } from 'mobx';

import getContrastSensitiveStyle from '../getContrastSensitiveStyle';

import style from '../ItkVtkViewer.module.css';

import opacityIcon from '../icons/opacity.svg';

function createLabelMapColorWidget(
  store,
  uiContainer,
) {
  const viewerDOMId = store.id;

  const labelMapColorUIGroup = document.createElement('div');
  labelMapColorUIGroup.setAttribute('class', style.uiGroup);

  const labelMapWidgetRow = document.createElement('div');
  labelMapWidgetRow.setAttribute('class', style.uiRow);
  labelMapWidgetRow.className += ` ${viewerDOMId}-toggle`;

  const contrastSensitiveStyle = getContrastSensitiveStyle(
    ['invertibleButton'],
    store.isBackgroundDark
  );

  const defaultLabelMapColorOpacity = 0.75;

  const sliderEntry = document.createElement('div');
  sliderEntry.setAttribute('class', style.sliderEntry);
  sliderEntry.innerHTML = `
    <div itk-vtk-tooltip itk-vtk-tooltip-top itk-vtk-tooltip-content="Gradient opacity" class="${
      contrastSensitiveStyle.invertibleButton
    } ${style.gradientOpacitySlider}">
      ${opacityIcon}
    </div>
    <input type="range" min="0" max="1" value="${defaultLabelMapColorOpacity}" step="0.01"
      id="${store.id}-labelMapColorOpacitySlider"
      class="${style.slider}" />`;
  const opacityElement = sliderEntry.querySelector(
    `#${store.id}-labelMapColorOpacitySlider`
  );
  const volume = store.imageUI.representationProxy.getVolumes()[0]
  const volumeProperty = volume.getProperty()
  function updateLabelMapColorOpacity() {
    const labelMapOpacity = store.imageUI.labelMapOpacity;
    opacityElement.value = labelMapOpacity;
    const numberOfComponents = store.imageUI.numberOfComponents;
    volumeProperty.setComponentWeight(numberOfComponents, labelMapOpacity);
    store.renderWindow.render();
  }
  autorun(() => {
    updateLabelMapColorOpacity();
  })
  opacityElement.addEventListener('input', action((event) => {
      event.preventDefault();
      event.stopPropagation();
      store.imageUI.labelMapOpacity = Number(opacityElement.value);
  }));

  labelMapWidgetRow.appendChild(sliderEntry);

  labelMapColorUIGroup.appendChild(labelMapWidgetRow);
  uiContainer.appendChild(labelMapColorUIGroup);
}

export default createLabelMapColorWidget;
