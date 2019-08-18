import style from '../ItkVtkViewer.module.css';
import hex2rgb from '../hex2rgb';

function createGeometryColorChooser(
  viewerStore,
  geometryHasScalars,
  geometrySelector,
  geometryColorRow
) {
  const geometryColors = new Array(geometryHasScalars.length);
  const defaultGeometryColor = '#ffffff';
  geometryColors.fill(defaultGeometryColor);

  const geometryColorInput = document.createElement('input');
  geometryColorInput.setAttribute('type', 'color');
  geometryColorInput.id = `${viewerStore.id}-geometryColorInput`;
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

  geometryColorInput.addEventListener('input',
    (event) => {
      const value = event.target.value
      const rgb = hex2rgb(value)
      viewerStore.geometriesUI.representationProxies[geometrySelector.selectedIndex].setColor(rgb)
      viewerStore.renderWindow.render()
      geometryColors[geometrySelector.selectedIndex] = value
    });
}

export default createGeometryColorChooser;
