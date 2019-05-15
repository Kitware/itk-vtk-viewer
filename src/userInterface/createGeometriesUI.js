import style from './ItkVtkViewer.module.css';

function createGeometriesUI(
  uiContainer,
  viewerDOMId,
  geometries,
  geometriesRepresentations,
  view
) {
  const renderWindow = view.getRenderWindow();
  //console.log(geometries)
  //console.log(geometriesRepresentations)

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
        geometriesRepresentations[geometrySelector.selectedIndex].setVisibility(false)
      } else {
        geometriesRepresentations[geometrySelector.selectedIndex].setRepresentation(value)
        geometriesRepresentations[geometrySelector.selectedIndex].setVisibility(true)
      }
      renderWindow.render()
      geometryRepresentations[geometrySelector.selectedIndex] = value
    })
  geometriesUIGroup.appendChild(geometryRepresentationRow)

  const geometryColorRow = document.createElement('div')
  geometryColorRow.setAttribute('class', style.uiRow)

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
      geometriesRepresentations[geometrySelector.selectedIndex].setColor(rgb)
      renderWindow.render()
      geometryColors[geometrySelector.selectedIndex] = value
    })

  geometriesUIGroup.appendChild(geometryColorRow)

  uiContainer.appendChild(geometriesUIGroup);

  return {};
}

export default createGeometriesUI;
