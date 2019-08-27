import style from '../ItkVtkViewer.module.css';
import hex2rgb from '../hex2rgb';

function createGeometryColorChooser(
  viewerStore,
  geometryColorRow
) {
  const geometryColors = new Array(geometryHasScalars.length);
  geometryColors.fill(defaultGeometryColor);

  const geometryColorInput = document.createElement('input');
  geometryColorInput.setAttribute('type', 'color');
  geometryColorInput.id = `${viewerStore.id}-geometryColorInput`;

  reaction(() => {
    return viewerStore.geometriesUI.selectedGeometryIndex;
    },
    (selectedGeometryIndex) => {
      geometryColorInput.value = viewerStore.geometriesUI.geometryColors[selectedGeometryIndex];
      if (viewerStore.geometriesUI.geometryHasScalars[selectedGeometryIndex]) {
        geometryColorInput.style.display = 'none';
      } else {
        geometryColorInput.style.display = 'inline-block';
      }
    });


  reaction(() => {
    return viewerStore.geometriesUI.geometryColors;
  },
    (geometryColors) => {
      const selectedGeometryIndex = viewerStore.geometriesUI.selectedGeometryIndex;
      const value = geometryColors[selectedGeometryIndex];
      const rgb = hex2rgb(value)
      viewerStore.geometriesUI.representationProxies[selectedGeometryIndex].setColor(rgb)
      viewerStore.renderWindow.render()
      geometryColorInput.value = value;
    });

  geometryColorInput.addEventListener('input',
    (event) => {
      event.preventDefault();
      event.stopPropagation();
      const selectedGeometryIndex = viewerStore.geometriesUI.selectedGeometryIndex;
      viewerStore.geometriesUI.geometryColors[selectedGeometryIndex] = event.target.value;
    });

  const defaultGeometryColors = Array(viewerStore.geometries.length);
  defaultGeometryColors.fill('#ffffff');
  geometryColorInput.value = defaultGeometryColor;
  viewerStore.geometriesUI.geometryColors.concat(defaultGeometryColors);
  const selectedGeometryIndex = viewerStore.geometriesUI.selectedGeometryIndex;
  if (viewerStore.geometriesUI.geometryHasScalars[selectedGeometryIndex]) {
    geometryColorInput.style.display = 'none';
  } else {
    geometryColorInput.style.display = 'inline-block';
  }

  geometryColorRow.appendChild(geometryColorInput);
}

export default createGeometryColorChooser;
