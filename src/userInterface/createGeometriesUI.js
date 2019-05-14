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

  const geometryNames = geometries.map((geometry, index) => `Geometry ${index}`)
  const geometrySelector = document.createElement('select');
  geometrySelector.setAttribute('class', style.selector);
  geometrySelector.id = `${viewerDOMId}-geometrySelector`;
  geometrySelector.innerHTML = geometryNames
    .map((name) => `<option value="${name}">${name}</option>`)
    .join('');
  if(geometryNames.length > 1) {
    geometriesUIGroup.appendChild(geometrySelector)
  }

  const geometryRenderingTypes = new Array(geometryNames.length)
  geometryRenderingTypes.fill('Surface')
  const geometryRenderingTypeOptions = ['Hidden', 'Wireframe', 'Surface', 'Surface with edges']
  const geometryRenderingTypeSelector = document.createElement('select');
  geometryRenderingTypeSelector.setAttribute('class', style.selector);
  geometryRenderingTypeSelector.id = `${viewerDOMId}-geometryRenderingTypeSelector`;
  geometryRenderingTypeSelector.innerHTML = geometryRenderingTypeOptions
    .map((name, idx) => `<option value="${name}">${name}</option>`)
    .join('')
  geometryRenderingTypeSelector.value = 'Surface'
  geometriesUIGroup.appendChild(geometryRenderingTypeSelector)
  geometrySelector.addEventListener('change',
    (event) => {
      geometryRenderingTypeSelector.value = geometryRenderingTypes[geometrySelector.selectedIndex]
    })
  geometryRenderingTypeSelector.addEventListener('change',
    (event) => {
      const value = event.target.value
      if(value === 'Hidden') {
        geometriesRepresentations[geometrySelector.selectedIndex].setVisibility(false)
      } else {
        geometriesRepresentations[geometrySelector.selectedIndex].setRepresentation(value)
        geometriesRepresentations[geometrySelector.selectedIndex].setVisibility(true)
      }
      renderWindow.render()
      geometryRenderingTypes[geometrySelector.selectedIndex] = value
    })

  uiContainer.appendChild(geometriesUIGroup);

  return {};
}

export default createGeometriesUI;
