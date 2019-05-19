import getContrastSensitiveStyle from './getContrastSensitiveStyle';
import style from './ItkVtkViewer.module.css';

import opacityIcon from './icons/opacity.svg';

function createGeometryRepresentationSelector(
  viewerDOMId,
  geometryNames,
  renderWindow,
  geometryRepresentationProxies,
  geometrySelector,
  geometryRepresentationRow
) {
  const geometryRepresentations = new Array(geometryNames.length)
  geometryRepresentations.fill('Surface')
  const geometryRepresentationOptions = ['Hidden', 'Wireframe', 'Surface', 'Surface with edges']
  const geometryRepresentationSelector = document.createElement('select');
  geometryRepresentationSelector.setAttribute('class', style.selector);
  geometryRepresentationSelector.id = `${viewerDOMId}-geometryRepresentationSelector`;
  geometryRepresentationSelector.innerHTML = geometryRepresentationOptions
    .map((name, idx) => `<option value="${name}">${name}</option>`)
    .join('')
  geometryRepresentationSelector.value = 'Surface'
  geometryRepresentationRow.appendChild(geometryRepresentationSelector)
  geometrySelector.addEventListener('change',
    (event) => {
      geometryRepresentationSelector.value = geometryRepresentations[geometrySelector.selectedIndex]
    })
  geometryRepresentationSelector.addEventListener('change',
    (event) => {
      const value = event.target.value
      if(value === 'Hidden') {
        geometryRepresentationProxies[geometrySelector.selectedIndex].setVisibility(false)
      } else {
        geometryRepresentationProxies[geometrySelector.selectedIndex].setRepresentation(value)
        geometryRepresentationProxies[geometrySelector.selectedIndex].setVisibility(true)
      }
      renderWindow.render()
      geometryRepresentations[geometrySelector.selectedIndex] = value
    })
}

function createGeometryColorChooser(
  viewerDOMId,
  geometryNames,
  renderWindow,
  geometryRepresentationProxies,
  geometrySelector,
  geometryColorRow
) {
  const geometryColors = new Array(geometryNames.length)
  geometryColors.fill('#ffffff')
  const geometryColorInput = document.createElement('input');
  geometryColorInput.setAttribute('type', 'color');
  geometryColorInput.id = `${viewerDOMId}-geometryColorInput`;
  geometryColorInput.value = '#ffffff'
  geometryColorRow.appendChild(geometryColorInput)
  geometrySelector.addEventListener('change',
    (event) => {
      geometryColorInput.value = geometryColors[geometrySelector.selectedIndex]
    })
  function hex2rgb(hexColor) {
    const bigint = parseInt(hexColor.substring(1), 16)
    const r = ((bigint >> 16) & 255) / 255.0
    const g = ((bigint >> 8) & 255) / 255.0
    const b = (bigint & 255) / 255.0

    return [r, g, b]
  }
  geometryColorInput.addEventListener('input',
    (event) => {
      const value = event.target.value
      const rgb = hex2rgb(value)
      geometryRepresentationProxies[geometrySelector.selectedIndex].setColor(rgb)
      renderWindow.render()
      geometryColors[geometrySelector.selectedIndex] = value
    })
}

function createGeometriesUI(
  uiContainer,
  viewerDOMId,
  geometries,
  geometryRepresentationProxies,
  view,
  isBackgroundDark
) {
  const renderWindow = view.getRenderWindow();

  const geometriesUIGroup = document.createElement('div');
  geometriesUIGroup.setAttribute('class', style.uiGroup);

  const geometryRepresentationRow = document.createElement('div')
  geometryRepresentationRow.setAttribute('class', style.uiRow)

  const geometryNames = geometries.map((geometry, index) => `Geometry ${index}`)
  const geometrySelector = document.createElement('select');
  geometrySelector.setAttribute('class', style.selector);
  geometrySelector.id = `${viewerDOMId}-geometrySelector`;
  geometrySelector.innerHTML = geometryNames
    .map((name) => `<option value="${name}">${name}</option>`)
    .join('');
  if(geometryNames.length > 1) {
    geometryRepresentationRow.appendChild(geometrySelector)
  }

  createGeometryRepresentationSelector(
    viewerDOMId,
    geometryNames,
    renderWindow,
    geometryRepresentationProxies,
    geometrySelector,
    geometryRepresentationRow
  )
  geometriesUIGroup.appendChild(geometryRepresentationRow)


  const geometryColorRow = document.createElement('div')
  geometryColorRow.setAttribute('class', style.uiRow)

  createGeometryColorChooser(
    viewerDOMId,
    geometryNames,
    renderWindow,
    geometryRepresentationProxies,
    geometrySelector,
    geometryColorRow
  )

  const contrastSensitiveStyle = getContrastSensitiveStyle(
    ['invertibleButton'],
    isBackgroundDark
  );
  const geometryOpacities = new Array(geometryNames.length)
  geometryOpacities.fill(0.7)
  const sliderEntry = document.createElement('div');
  sliderEntry.setAttribute('class', style.sliderEntry);
  sliderEntry.innerHTML = `
    <div itk-vtk-tooltip itk-vtk-tooltip-top itk-vtk-tooltip-content="Opacity" class="${
      contrastSensitiveStyle.invertibleButton
    } ${style.gradientOpacitySlider}">
      ${opacityIcon}
    </div>
    <input type="range" min="0" max="1" value="0.7" step="0.01"
      id="${viewerDOMId}-opacitySlider"
      class="${style.slider}" />`;
  const opacityElement = sliderEntry.querySelector(
    `#${viewerDOMId}-opacitySlider`
  );
  function updateOpacity() {
    const value = Number(opacityElement.value);
    geometryOpacities[geometrySelector.selectedIndex] = value
    geometryRepresentationProxies[geometrySelector.selectedIndex].setOpacity(value)
    renderWindow.render();
  }
  opacityElement.addEventListener('input', updateOpacity);
  updateOpacity();
  geometrySelector.addEventListener('change',
    (event) => {
      opacityElement.value = geometryOpacities[geometrySelector.selectedIndex]
    })
  geometryColorRow.appendChild(sliderEntry);

  geometriesUIGroup.appendChild(geometryColorRow)

  uiContainer.appendChild(geometriesUIGroup);

  return {};
}

export default createGeometriesUI;
