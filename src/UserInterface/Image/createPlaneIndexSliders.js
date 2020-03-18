import { reaction, action } from 'mobx';

import style from '../ItkVtkViewer.module.css';
import applyContrastSensitiveStyle from '../applyContrastSensitiveStyle';

function createPlaneIndexSliders(store, uiContainer) {
  const planeIndexUIGroup = document.createElement('div');
  planeIndexUIGroup.setAttribute('class', style.uiGroup);

  const numberOfValueChars = 6;
  let currentSlicePosition = null;
  const viewerDOMId = store.id;
  const renderWindow = store.renderWindow;

  const volumeRepresentation = store.imageUI.representationProxy;

  const xPlaneRow = document.createElement('div');
  xPlaneRow.setAttribute('class', style.uiRow);
  xPlaneRow.className += ` ${viewerDOMId}-toggleCollapse ${viewerDOMId}-x-plane-row`;

  const xSliderEntry = document.createElement('div');
  xSliderEntry.setAttribute('class', style.sliderEntry);
  const xSlice = volumeRepresentation.getPropertyDomainByName('xSlice');
  currentSlicePosition = volumeRepresentation.getXSlice();
  store.imageUI.xSlice = currentSlicePosition;
  xSliderEntry.innerHTML = `
    <label id="${viewerDOMId}-xSliceLabel" class="${style.sliderLabelCommon}">X:</label><input type="range" min="${
    xSlice.min
  }" max="${xSlice.max}" value="${currentSlicePosition}" step="${xSlice.step}"
      id="${viewerDOMId}-xSlice" class="${style.slider}" />`;
  const xSliceElement = xSliderEntry.querySelector(`#${viewerDOMId}-xSlice`);
  const xPlaneLabel = xSliderEntry.querySelector(
    `#${viewerDOMId}-xSliceLabel`
  );
  applyContrastSensitiveStyle(store, 'sliderLabel', xPlaneLabel);
  function updateXSlice(position) {
    volumeRepresentation.setXSlice(Number(position));
    const valueString = String(position).substring(
      0,
      numberOfValueChars
    );
    const padLength =
      valueString.length < numberOfValueChars
        ? numberOfValueChars - valueString.length
        : 0;
    const pad = '&nbsp;'.repeat(padLength);
    xPlaneLabel.innerHTML = `X: ${pad}${valueString}`;
    renderWindow.render();
  }
  xPlaneRow.appendChild(xSliderEntry);
  updateXSlice(currentSlicePosition);
  xPlaneRow.style.display = 'none';
  reaction(() => {
    return store.imageUI.xSlice;
  },
    (position) => {
      updateXSlice(position);
    });
  xSliceElement.addEventListener('input', action((event) => {
      event.preventDefault();
      event.stopPropagation();
      store.imageUI.xSlice = Number(xSliceElement.value);
    }));

  planeIndexUIGroup.appendChild(xPlaneRow);

  const yPlaneRow = document.createElement('div');
  yPlaneRow.setAttribute('class', style.uiRow);
  yPlaneRow.className += ` ${viewerDOMId}-toggleCollapse ${viewerDOMId}-y-plane-row`;

  const ySliderEntry = document.createElement('div');
  ySliderEntry.setAttribute('class', style.sliderEntry);
  const ySlice = volumeRepresentation.getPropertyDomainByName('ySlice');
  currentSlicePosition = volumeRepresentation.getYSlice();
  store.imageUI.ySlice = currentSlicePosition;
  ySliderEntry.innerHTML = `
    <label id="${viewerDOMId}-ySliceLabel" class="${style.sliderLabelCommon}">Y:</label><input type="range" min="${
    ySlice.min
  }" max="${ySlice.max}" value="${currentSlicePosition}" step="${ySlice.step}"
      id="${viewerDOMId}-ySlice" class="${style.slider}" />`;
  const ySliceElement = ySliderEntry.querySelector(`#${viewerDOMId}-ySlice`);
  const yPlaneLabel = ySliderEntry.querySelector(
    `#${viewerDOMId}-ySliceLabel`
  );
  applyContrastSensitiveStyle(store, 'sliderLabel', yPlaneLabel);
  function updateYSlice(position) {
    volumeRepresentation.setYSlice(Number(position));
    const valueString = String(position).substring(
     0,
      numberOfValueChars
    );
    const padLength =
      valueString.length < numberOfValueChars
        ? numberOfValueChars - valueString.length
        : 0;
    const pad = '&nbsp;'.repeat(padLength);
    yPlaneLabel.innerHTML = `Y: ${pad}${valueString}`;
    renderWindow.render();
  }
  yPlaneRow.appendChild(ySliderEntry);
  updateYSlice(currentSlicePosition);
  yPlaneRow.style.display = 'none';
  xPlaneRow.style.display = 'none';
  reaction(() => {
    return store.imageUI.ySlice;
  },
    (position) => {
      updateYSlice(position);
    });
  ySliceElement.addEventListener('input', action((event) => {
      event.preventDefault();
      event.stopPropagation();
      store.imageUI.ySlice = Number(ySliceElement.value);
    }));

  planeIndexUIGroup.appendChild(yPlaneRow);

  const zPlaneRow = document.createElement('div');
  zPlaneRow.setAttribute('class', style.uiRow);
  zPlaneRow.className += ` ${viewerDOMId}-toggleCollapse ${viewerDOMId}-z-plane-row`;

  const zSliderEntry = document.createElement('div');
  zSliderEntry.setAttribute('class', style.sliderEntry);
  const zSlice = volumeRepresentation.getPropertyDomainByName('zSlice');
  currentSlicePosition = volumeRepresentation.getZSlice();
  store.imageUI.zSlice = currentSlicePosition;
  zSliderEntry.innerHTML = `
    <label id="${viewerDOMId}-zSliceLabel" class="${style.sliderLabelCommon}">Z:</label><input type="range" min="${
    zSlice.min
  }" max="${zSlice.max}" value="${currentSlicePosition}" step="${zSlice.step}"
      id="${viewerDOMId}-zSlice" class="${style.slider}" />`;
  const zSliceElement = zSliderEntry.querySelector(`#${viewerDOMId}-zSlice`);
  const zPlaneLabel = zSliderEntry.querySelector(
    `#${viewerDOMId}-zSliceLabel`
  );
  applyContrastSensitiveStyle(store, 'sliderLabel', zPlaneLabel);
  function updateZSlice(position) {
    volumeRepresentation.setZSlice(Number(position));
    const valueString = String(position).substring(
      0,
      numberOfValueChars
    );
    const padLength =
      valueString.length < numberOfValueChars
        ? numberOfValueChars - valueString.length
        : 0;
    const pad = '&nbsp;'.repeat(padLength);
    zPlaneLabel.innerHTML = `Z: ${pad}${valueString}`;
    renderWindow.render();
  }
  zPlaneRow.appendChild(zSliderEntry);
  updateZSlice(currentSlicePosition);
  zPlaneRow.style.display = 'none';
  reaction(() => {
    return store.imageUI.zSlice;
  },
    (position) => {
      updateZSlice(position);
    });
  zSliceElement.addEventListener('input', action((event) => {
      event.preventDefault();
      event.stopPropagation();
      store.imageUI.zSlice = Number(zSliceElement.value);
    }));

  planeIndexUIGroup.appendChild(zPlaneRow);

  uiContainer.appendChild(planeIndexUIGroup);
}

export default createPlaneIndexSliders;
