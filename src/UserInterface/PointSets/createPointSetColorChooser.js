import style from '../ItkVtkViewer.module.css';
import hex2rgb from '../hex2rgb';

function createPointSetColorChooser(
  viewerStore,
  pointSetHasScalars,
  renderWindow,
  pointSetRepresentationProxies,
  pointSetSelector,
  pointSetColorRow
) {
  const pointSetColors = new Array(pointSetHasScalars.length);
  const defaultPointSetColor = '#ffffff';
  pointSetColors.fill(defaultPointSetColor);

  const pointSetColorInput = document.createElement('input');
  pointSetColorInput.setAttribute('type', 'color');
  pointSetColorInput.id = `${viewerStore.id}-pointSetColorInput`;
  pointSetColorInput.value = defaultPointSetColor;
  if (pointSetHasScalars[pointSetSelector.selectedIndex]) {
    pointSetColorInput.style.display = 'none';
  } else {
    pointSetColorInput.style.display = 'inline-block';
  }
  pointSetColorRow.appendChild(pointSetColorInput);

  pointSetSelector.addEventListener('change',
    (event) => {
      pointSetColorInput.value = pointSetColors[pointSetSelector.selectedIndex]
      if (pointSetHasScalars[pointSetSelector.selectedIndex]) {
        pointSetColorInput.style.display = 'none';
      } else {
        pointSetColorInput.style.display = 'inline-block';
      }
    });

  pointSetColorInput.addEventListener('input',
    (event) => {
      const value = event.target.value
      const rgb = hex2rgb(value)
      pointSetRepresentationProxies[pointSetSelector.selectedIndex].setColor(rgb)
      renderWindow.render()
      pointSetColors[pointSetSelector.selectedIndex] = value
    });
}

export default createPointSetColorChooser;
