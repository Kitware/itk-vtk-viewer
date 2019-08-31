import style from '../ItkVtkViewer.module.css';

import ColorPresetNames from '../ColorPresetNames';

function createPointSetColorPresetSelector(
  viewerStore,
  pointSetColorPresetRow
) {
  const presetSelector = document.createElement('select');
  presetSelector.setAttribute('class', style.selector);
  presetSelector.id = `${viewerStore.id}-pointSetColorMapSelector`;
  presetSelector.innerHTML = ColorPresetNames
    .map((name) => `<option value="${name}">${name}</option>`)
    .join('');

  const defaultPointSetColorPreset = 'Viridis (matplotlib)';

  reaction(() => {
    return viewerStore.pointSetsUI.pointSets.slice();
  },
    (pointSets) => {
      if(!!!pointSets || pointSets.length === 0) {
        return;
      }

      const pointSetHasScalars = viewerStore.pointSetsUI.pointSetHasScalars;
      const selectedPointSetIndex = viewerStore.pointSetsUI.selectedPointSetIndex;

      if (viewerStore.pointSetsUI.pointSetHasScalars[selectedPointSetIndex]) {
        pointSetColorPresetRow.style.display = 'flex';
      } else {
        pointSetColorPresetRow.style.display = 'none';
      }

      pointSets.forEach((pointSet, index) => {
        if (viewerStore.pointSetsUI.pointSetColorPresets.length <= index) {
          viewerStore.pointSetsUI.pointSetColorPresets.push(defaultPointSetColorPreset);
        }
      })

      if (pointSetHasScalars[selectedPointSetIndex]) {
        presetSelector.value = viewerStore.pointSetsUI.pointSetColorPresets[selectedPointSetIndex];
      }
    }
  )

  reaction(() => {
    return viewerStore.pointSetsUI.selectedPointSetIndex;
    },
    (selectedPointSetIndex) => {
      presetSelector.value = viewerStore.pointSetsUI.pointSetColorPresets[selectedPointSetIndex]
      const pointSetHasScalars = viewerStore.pointSetsUI.pointSetHasScalars;
      if (pointSetHasScalars[selectedPointSetIndex]) {
        pointSetColorPresetRow.style.display = 'flex';
      } else {
        pointSetColorPresetRow.style.display = 'none';
      }
    });

  reaction(() => {
    return viewerStore.pointSetsUI.pointSetColorPresets.slice();
  },
    (pointSetColorPresets) => {
      const selectedPointSetIndex = viewerStore.pointSetsUI.selectedPointSetIndex;
      const value = pointSetColorPresets[selectedPointSetIndex];
      presetSelector.value = value;
      const proxy = viewerStore.pointSetsUI.representationProxies[selectedPointSetIndex];
      const lutProxy = proxy.getLookupTableProxy();
      if (lutProxy) {
        lutProxy.setPresetName(value);
      }
      viewerStore.renderWindow.render();
    });

  presetSelector.addEventListener('change', (event) => {
      event.preventDefault();
      event.stopPropagation();
      const selectedPointSetIndex = viewerStore.pointSetsUI.selectedPointSetIndex;
      viewerStore.pointSetsUI.pointSetColorPresets[selectedPointSetIndex] = event.target.value;
    });

  const pointSetHasScalars = viewerStore.pointSetsUI.pointSetHasScalars;
  const selectedPointSetIndex = viewerStore.pointSetsUI.selectedPointSetIndex;
  if (pointSetHasScalars[selectedPointSetIndex]) {
    pointSetColorPresetRow.style.display = 'flex';
  } else {
    pointSetColorPresetRow.style.display = 'none';
  }
  const defaultPointSetColorPresets = new Array(viewerStore.pointSetsUI.pointSets.length);
  defaultPointSetColorPresets.fill(defaultPointSetColorPreset);
  presetSelector.value = defaultPointSetColorPreset;
  viewerStore.pointSetsUI.pointSetColorPresets = defaultPointSetColorPresets;
  const representationProxies = viewerStore.pointSetsUI.representationProxies;
  representationProxies.forEach((proxy) => {
    const lutProxy = proxy.getLookupTableProxy();
    if (lutProxy) {
      lutProxy.setPresetName(defaultPointSetColorPreset);
    }
  })

  pointSetColorPresetRow.appendChild(presetSelector);
}

export default createPointSetColorPresetSelector;
