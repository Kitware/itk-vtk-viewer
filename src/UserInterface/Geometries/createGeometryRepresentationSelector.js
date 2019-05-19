import style from '../ItkVtkViewer.module.css';

function createGeometryRepresentationSelector(
  viewerDOMId,
  geometryNames,
  renderWindow,
  geometryRepresentationProxies,
  geometrySelector,
  geometryRepresentationRow
) {
  const geometryRepresentations = new Array(geometryNames.length);
  const defaultGeometryRepresentation = 'Surface';
  geometryRepresentations.fill(defaultGeometryRepresentation);
  const geometryRepresentationOptions = ['Hidden', 'Wireframe', 'Surface', 'Surface with edges'];
  const geometryRepresentationSelector = document.createElement('select');
  geometryRepresentationSelector.setAttribute('class', style.selector);
  geometryRepresentationSelector.id = `${viewerDOMId}-geometryRepresentationSelector`;
  geometryRepresentationSelector.innerHTML = geometryRepresentationOptions
    .map((name, idx) => `<option value="${name}">${name}</option>`)
    .join('')
  geometryRepresentationSelector.value = defaultGeometryRepresentation;
  geometryRepresentationRow.appendChild(geometryRepresentationSelector);
  geometrySelector.addEventListener('change',
    (event) => {
      geometryRepresentationSelector.value = geometryRepresentations[geometrySelector.selectedIndex]
    });
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
    });
}

export default createGeometryRepresentationSelector;
