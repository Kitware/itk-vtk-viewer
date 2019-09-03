import { reaction } from 'mobx';

import style from '../ItkVtkViewer.module.css';

function createColorRangeInput(
  viewerStore,
  uiContainer,
) {

  const minimumInput = document.createElement('input');
  minimumInput.type = 'number';
  minimumInput.setAttribute('class', style.numberInput);
  const maximumInput = document.createElement('input');
  maximumInput.type = 'number';
  maximumInput.setAttribute('class', style.numberInput);

  function updateColorTransferFunction() {
    const selectedGeometryIndex = viewerStore.geometriesUI.selectedGeometryIndex;
    const colorRanges = viewerStore.geometriesUI.geometryColorRanges[selectedGeometryIndex];
    const colorByKey = viewerStore.geometriesUI.geometryColorBy[selectedGeometryIndex].value;
    const colorRange = colorRanges.get(colorByKey);

    const proxy = viewerStore.geometriesUI.representationProxies[selectedGeometryIndex];
    const [colorByArrayName, location] = proxy.getColorBy();
    const lutProxy = proxy.getLookupTableProxy(colorByArrayName, location);
    const colorTransferFunction = lutProxy.getLookupTable();
    const colorPreset = viewerStore.geometriesUI.geometryColorPresets[selectedGeometryIndex];
    lutProxy.setPresetName(colorPreset);
    colorTransferFunction.setMappingRange(...colorRange);
    colorTransferFunction.updateRange();
    viewerStore.renderWindow.render();

    minimumInput.value = colorRange[0];
    maximumInput.value = colorRange[1];
  }

  function updateColorRangeInput() {
    const selectedGeometryIndex = viewerStore.geometriesUI.selectedGeometryIndex;
    if (!viewerStore.geometriesUI.geometryHasScalars[selectedGeometryIndex]) {
      return;
    }
    const colorByKey = viewerStore.geometriesUI.geometryColorBy[selectedGeometryIndex].value;
    const [location, colorByArrayName] = colorByKey.split(':');
    const geometry = viewerStore.geometriesUI.geometries[selectedGeometryIndex];
    const dataArray = location === 'pointData' ?
      geometry.getPointData().getArrayByName(colorByArrayName) :
      geometry.getCellData().getArrayByName(colorByArrayName);
    const range = dataArray.getRange();

    minimumInput.min = range[0];
    minimumInput.max = range[1];
    maximumInput.min = range[0];
    maximumInput.max = range[1];
    if (dataArray instanceof Float32Array || dataArray instanceof Float64Array) {
      const step = (range[1] - range[0]) / 1000.0;
      minimumInput.step = step;
      maximumInput.step = step;
    }
    updateColorTransferFunction();
  }

  function setDefaultColorRanges() {
    const colorByOptions = viewerStore.geometriesUI.geometryColorByOptions;
    if(!!!colorByOptions || colorByOptions.length === 0) {
      return;
    }

    const geometries = viewerStore.geometriesUI.geometries;
    colorByOptions.forEach((options, index) => {
      const geometry = geometries[index];
      if (viewerStore.geometriesUI.geometryColorRanges.length <= index) {
        const colorRanges = new Map();
        if (options) {
          options.forEach((option) => {
            const [location, colorByArrayName] = option.value.split(':');
            const dataArray = location === 'pointData' ?
              geometry.getPointData().getArrayByName(colorByArrayName) :
              geometry.getCellData().getArrayByName(colorByArrayName);
            const range = dataArray.getRange();
            colorRanges.set(option.value, range);
          })
        }
        viewerStore.geometriesUI.geometryColorRanges.push(colorRanges);
      } else {
        const colorRanges = viewerStore.geometriesUI.geometryColorRanges[index];
        options.forEach((option) => {
          const [location, colorByArrayName] = option.value.split(':');
          const dataArray = location === 'pointData' ?
            geometry.getPointData().getArrayByName(colorByArrayName) :
            geometry.getCellData().getArrayByName(colorByArrayName);
          const range = dataArray.getRange();

          if (colorRanges.has(option.value)) {
            const current = colorRanges.get(option.value);
            if (current[0] < range[0] || current[1] > range[1]) {
              const newRange = current.slice();
              if (current[0] < range[0]) {
                newRange[0] = range[0];
              }
              if (current[1] > range[1]) {
                newRange[1] = range[1];
              }
              colorRanges.set(option.value, newRange);
            }
          } else {
            colorRanges.set(option.value, range);
          }
        })
      }
    })
    updateColorRangeInput();
  }

  setDefaultColorRanges();

  minimumInput.addEventListener('change',
    (event) => {
      event.preventDefault();
      event.stopPropagation();
      const selectedGeometryIndex = viewerStore.geometriesUI.selectedGeometryIndex;
      const colorByKey = viewerStore.geometriesUI.geometryColorBy[selectedGeometryIndex].value;
      const range = viewerStore.geometriesUI.geometryColorRanges[selectedGeometryIndex].get(colorByKey);
      range[0] = Number(event.target.value);
      viewerStore.geometriesUI.geometryColorRanges[selectedGeometryIndex].set(colorByKey, range);
      updateColorTransferFunction();
    }
  );
  maximumInput.addEventListener('change',
    (event) => {
      event.preventDefault();
      event.stopPropagation();
      const selectedGeometryIndex = viewerStore.geometriesUI.selectedGeometryIndex;
      const colorByKey = viewerStore.geometriesUI.geometryColorBy[selectedGeometryIndex].value;
      const range = viewerStore.geometriesUI.geometryColorRanges[selectedGeometryIndex].get(colorByKey);
      range[1] = Number(event.target.value);
      viewerStore.geometriesUI.geometryColorRanges[selectedGeometryIndex].set(colorByKey, range);
      updateColorTransferFunction();
    }
  );

  const canvas = document.createElement('canvas');
  const width = 240;
  const height = 20;
  canvas.setAttribute('width', width);
  canvas.setAttribute('height', height);

  function updateColorCanvas() {
    const selectedGeometryIndex = viewerStore.geometriesUI.selectedGeometryIndex;
    if (!viewerStore.geometriesUI.geometryHasScalars[selectedGeometryIndex]) {
      return;
    }
    const colorByKey = viewerStore.geometriesUI.geometryColorBy[selectedGeometryIndex].value;
    const range = viewerStore.geometriesUI.geometryColorRanges[selectedGeometryIndex].get(colorByKey);

    const proxy = viewerStore.geometriesUI.representationProxies[selectedGeometryIndex];
    const [colorByArrayName, location] = proxy.getColorBy();
    const lutProxy = proxy.getLookupTableProxy(colorByArrayName, location);
    const colorPreset = viewerStore.geometriesUI.geometryColorPresets[selectedGeometryIndex];
    lutProxy.setPresetName(colorPreset);
    const colorTransferFunction = lutProxy.getLookupTable();
    colorTransferFunction.setMappingRange(...range);
    colorTransferFunction.updateRange();
    const ctx = canvas.getContext('2d');

    const rgba = colorTransferFunction.getUint8Table(
      range[0],
      range[1],
      width,
      4,
    );
    const pixelsArea = ctx.getImageData(0, 0, width, 256);
    for (let lineIdx = 0; lineIdx < 256; lineIdx++) {
      pixelsArea.data.set(rgba, lineIdx * 4 * width);
    }

    const nbValues = 256 * width * 4;
    const lineSize = width * 4;
    for (let i = 3; i < nbValues; i += 4) {
      pixelsArea.data[i] = 255 - Math.floor(i / lineSize);
    }

    ctx.putImageData(pixelsArea, 0, 0);
  }

  updateColorCanvas();

  reaction(() => { return viewerStore.geometriesUI.geometryColorByOptions.slice(); },
    () => {
      setDefaultColorRanges();
    }
  )

  reaction(() => { return viewerStore.geometriesUI.selectedGeometryIndex; },
    (selectedGeometryIndex) => {
      const geometryHasScalars = viewerStore.geometriesUI.geometryHasScalars;
      if (geometryHasScalars[selectedGeometryIndex]) {
        uiContainer.style.display = 'flex';
        updateColorCanvas();
        updateColorRangeInput();
      } else {
        uiContainer.style.display = 'none';
      }
    }
  )
  reaction(() => { return viewerStore.geometriesUI.geometryColorPresets.slice(); },
    () => {
      updateColorCanvas();
      updateColorRangeInput();
    }
  )

  reaction(() => { return viewerStore.geometriesUI.geometryColorBy.slice(); },
    () => {
      updateColorCanvas();
      updateColorRangeInput();
    }
  )

  const geometryHasScalars = viewerStore.geometriesUI.geometryHasScalars;
  const selectedGeometryIndex = viewerStore.geometriesUI.selectedGeometryIndex;
  if (geometryHasScalars[selectedGeometryIndex]) {
    uiContainer.style.display = 'flex';
  } else {
    uiContainer.style.display = 'none';
  }

  uiContainer.appendChild(minimumInput);
  uiContainer.appendChild(canvas);
  uiContainer.appendChild(maximumInput);
}

export default createColorRangeInput;
