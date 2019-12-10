import style from '../ItkVtkViewer.module.css';

import getContrastSensitiveStyle from '../getContrastSensitiveStyle';

function createPlaneIndexSliders(
  store,
  uiContainer,
) {
  const planeIndexUIGroup = document.createElement('div');
  planeIndexUIGroup.setAttribute('class', style.uiGroup);

  const contrastSensitiveStyle = getContrastSensitiveStyle(
    ['sliderLabel'],
    store.isBackgroundDark
  );
  const numberOfValueChars = 6;
  let currentSlicePosition = null;
  const viewerDOMId = store.id;
  const renderWindow = store.renderWindow;

  const volumeRepresentation = store.imageUI.representationProxy;

  const xPlaneRow = document.createElement('div');
  xPlaneRow.setAttribute('class', style.uiRow);
  xPlaneRow.className += ` ${viewerDOMId}-toggle ${viewerDOMId}-x-plane-row`;

  const xSlice = volumeRepresentation.getPropertyDomainByName('xSlice');
  const ySlice = volumeRepresentation.getPropertyDomainByName('ySlice');
  const zSlice = volumeRepresentation.getPropertyDomainByName('zSlice');

  const xSliderEntry = document.createElement('div');
  xSliderEntry.setAttribute('class', style.sliderEntry);
  currentSlicePosition = volumeRepresentation.getXSlice();
  xSliderEntry.innerHTML = `
    <label id="${viewerDOMId}-xSliceLabel" class="${
      contrastSensitiveStyle.sliderLabel
    }">X:</label><input type="range" min="${
    xSlice.min
  }" max="${xSlice.max}" value="${currentSlicePosition}" step="${xSlice.step}"
      id="${viewerDOMId}-xSlice" class="${style.slider}" />`;
  const xSliceElement = xSliderEntry.querySelector(`#${viewerDOMId}-xSlice`);
  const xPlaneLabel = xSliderEntry.querySelector(
    `#${viewerDOMId}-xSliceLabel`
  );
  function updateXSlice() {
    const value = Number(xSliceElement.value);
    volumeRepresentation.setXSlice(value);
    const valueString = String(xSliceElement.value).substring(
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
  xSliceElement.addEventListener('input', updateXSlice);
  xPlaneRow.appendChild(xSliderEntry);
  updateXSlice();
  xPlaneRow.style.display = 'none';

  planeIndexUIGroup.appendChild(xPlaneRow);

  const yPlaneRow = document.createElement('div');
  yPlaneRow.setAttribute('class', style.uiRow);
  yPlaneRow.className += ` ${viewerDOMId}-toggle ${viewerDOMId}-y-plane-row`;

  const ySliderEntry = document.createElement('div');
  ySliderEntry.setAttribute('class', style.sliderEntry);
  currentSlicePosition = volumeRepresentation.getYSlice();
  ySliderEntry.innerHTML = `
    <label id="${viewerDOMId}-ySliceLabel" class="${
      contrastSensitiveStyle.sliderLabel
    }">Y:</label><input type="range" min="${
    ySlice.min
  }" max="${ySlice.max}" value="${currentSlicePosition}" step="${ySlice.step}"
      id="${viewerDOMId}-ySlice" class="${style.slider}" />`;
  const ySliceElement = ySliderEntry.querySelector(`#${viewerDOMId}-ySlice`);
  const yPlaneLabel = ySliderEntry.querySelector(
    `#${viewerDOMId}-ySliceLabel`
  );
  function updateYSlice() {
    const value = Number(ySliceElement.value);
    volumeRepresentation.setYSlice(value);
    const valueString = String(ySliceElement.value).substring(
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
  ySliceElement.addEventListener('input', updateYSlice);
  yPlaneRow.appendChild(ySliderEntry);
  updateYSlice();
  yPlaneRow.style.display = 'none';

  planeIndexUIGroup.appendChild(yPlaneRow);

  const zPlaneRow = document.createElement('div');
  zPlaneRow.setAttribute('class', style.uiRow);
  zPlaneRow.className += ` ${viewerDOMId}-toggle ${viewerDOMId}-z-plane-row`;

  const zSliderEntry = document.createElement('div');
  zSliderEntry.setAttribute('class', style.sliderEntry);
  currentSlicePosition = volumeRepresentation.getZSlice();
  zSliderEntry.innerHTML = `
    <label id="${viewerDOMId}-zSliceLabel" class="${
      contrastSensitiveStyle.sliderLabel
    }">Z:</label><input type="range" min="${
    zSlice.min
  }" max="${zSlice.max}" value="${currentSlicePosition}" step="${zSlice.step}"
      id="${viewerDOMId}-zSlice" class="${style.slider}" />`;
  const zSliceElement = zSliderEntry.querySelector(`#${viewerDOMId}-zSlice`);
  const zPlaneLabel = zSliderEntry.querySelector(
    `#${viewerDOMId}-zSliceLabel`
  );
  function updateZSlice() {
    const value = Number(zSliceElement.value);
    volumeRepresentation.setZSlice(value);
    const valueString = String(zSliceElement.value).substring(
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
  zSliceElement.addEventListener('input', updateZSlice);
  zPlaneRow.appendChild(zSliderEntry);
  updateZSlice();
  zPlaneRow.style.display = 'none';

  planeIndexUIGroup.appendChild(zPlaneRow);

  uiContainer.appendChild(planeIndexUIGroup);
}

export default createPlaneIndexSliders;
