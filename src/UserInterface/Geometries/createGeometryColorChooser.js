import style from '../ItkVtkViewer.module.css';

function createGeometryColorChooser(
  geometryHasScalars,
  viewerDOMId,
  renderWindow,
  geometryRepresentationProxies,
  geometrySelector,
  geometryColorRow
) {
  const geometryColors = new Array(geometryHasScalars.length);
  const defaultGeometryColor = '#ffffff';
  geometryColors.fill(defaultGeometryColor);

  const geometryColorInput = document.createElement('input');
  geometryColorInput.setAttribute('type', 'color');
  geometryColorInput.id = `${viewerDOMId}-geometryColorInput`;
  geometryColorInput.value = defaultGeometryColor;
  if (geometryHasScalars[geometrySelector.selectedIndex]) {
    geometryColorInput.style.display = 'none';
  } else {
    geometryColorInput.style.display = 'inline-block';
  }
  geometryColorRow.appendChild(geometryColorInput);

  geometrySelector.addEventListener('change',
    (event) => {
      geometryColorInput.value = geometryColors[geometrySelector.selectedIndex]
      if (geometryHasScalars[geometrySelector.selectedIndex]) {
        geometryColorInput.style.display = 'none';
      } else {
        geometryColorInput.style.display = 'inline-block';
      }
    });

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
    });
}

export default createGeometryColorChooser;
