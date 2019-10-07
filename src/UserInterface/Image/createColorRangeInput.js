import { reaction } from 'mobx';

import style from '../ItkVtkViewer.module.css';

import { IconSelect } from '@thewtex/iconselect.js/lib/control/iconselect';
import ColorPresetIcons from '../ColorPresetIcons';

function createColorRangeInput(
  store,
  uiContainer,
) {

  const minimumInput = document.createElement('input');
  minimumInput.type = 'number';
  minimumInput.setAttribute('class', style.numberInput);
  const maximumInput = document.createElement('input');
  maximumInput.type = 'number';
  maximumInput.setAttribute('class', style.numberInput);

  function updateColorRangeInput() {
    const dataArray = store.imageUI.image.getPointData().getScalars();
    const numberOfComponents = dataArray.getNumberOfComponents();
    for (let component = 0; component < numberOfComponents; component++) {
      const range = dataArray.getRange(component);
      minimumInput.min = range[0];
      minimumInput.max = range[1];
      minimumInput.value = range[0];
      maximumInput.min = range[0];
      maximumInput.max = range[1];
      maximumInput.value = range[1];
      if (dataArray instanceof Float32Array || dataArray instanceof Float64Array) {
        const step = (range[1] - range[0]) / 1000.0;
        minimumInput.step = step;
        maximumInput.step = step;
      }
      store.imageUI.colorRanges[component] = range;
    }
  }
  reaction(() => { return store.imageUI.image; },
    (image) => { updateColorRangeInput(); }
  )
  reaction(() => { return store.imageUI.colorRanges.slice(); },
    (colorRanges) => {
      const colorRange = colorRanges[store.imageUI.selectedComponentIndex];
      minimumInput.value = colorRange[0];
      maximumInput.value = colorRange[1];
    }
  )
  minimumInput.addEventListener('change',
    (event) => {
      event.preventDefault();
      event.stopPropagation();
      const component = store.imageUI.selectedComponentIndex;
      store.imageUI.colorRanges[component] = [Number(event.target.value), store.imageUI.colorRanges[component][1]];
    }
  );
  maximumInput.addEventListener('change',
    (event) => {
      event.preventDefault();
      event.stopPropagation();
      const component = store.imageUI.selectedComponentIndex;
      store.imageUI.colorRanges[component] = [store.imageUI.colorRanges[component][0], Number(event.target.value)];
    }
  );

  updateColorRangeInput();

  const canvas = document.createElement('canvas');
  const width = 240;
  const height = 20;
  canvas.setAttribute('width', width);
  canvas.setAttribute('height', height);

  function updateColorCanvas() {
    const dataArray = store.imageUI.image.getPointData().getScalars();
    const component = store.imageUI.selectedComponentIndex;
    const range = dataArray.getRange(component);

    const lookupTable = store.imageUI.lookupTableProxies[component].getLookupTable();
    const colorTransferFunction = lookupTable;
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
  reaction(() => { return store.imageUI.colorMaps.slice(); },
    (colorMaps) => { updateColorCanvas(); }
  )

  updateColorCanvas();
  const colorMapSelector = document.createElement('div');
  colorMapSelector.id = `${store.id}-imageColorMapSelector`;

  uiContainer.appendChild(minimumInput);
  //uiContainer.appendChild(canvas);
  uiContainer.appendChild(colorMapSelector);
  uiContainer.appendChild(maximumInput);

  const rows = 20;
  const cols = 3;
  const iconSelect = new IconSelect(`${colorMapSelector.id}`,
    colorMapSelector,
      {'selectedIconWidth': 230,
      'selectedIconHeight': 20,
      'selectedBoxPadding': 1,
      'iconsWidth': 60,
      'iconsHeight': 19,
      'boxIconSpace': 1,
      'vectoralIconNumber': cols,
      'horizontalIconNumber': rows});
  colorMapSelector.style.width = '244px';
  const icons = new Array(rows * cols);
  let count = 0;
  for (let [key, value] of ColorPresetIcons.entries()) {
    const index = Math.floor(count % rows)*cols + Math.floor(count / rows);
    icons[index] = {'iconFilePath': value, 'iconValue': key};
    count++;
  }
  iconSelect.refresh(icons)

  function updateColorMap(colorMaps) {
    const componentIndex = store.imageUI.selectedComponentIndex;
    const colorMap = colorMaps[componentIndex];
    store.imageUI.lookupTableProxies[componentIndex].setPresetName(colorMap);
    const lut = store.imageUI.lookupTableProxies[component].getLookupTable();
    const range = store.imageUI.colorRanges[componentIndex];
    lut.setMappingRange(range[0], range[1]);
    if (!store.renderWindow.getInteractor().isAnimating()) {
      store.renderWindow.render();
    }
    iconSelect.setSelectedValue(colorMap);
  }
  reaction(() => { return store.imageUI.colorMaps.slice() },
    (colorMaps) => {
      updateColorMap(colorMaps);
    }
  )
  colorMapSelector.addEventListener('changed',
    (event) => {
      event.preventDefault();
      event.stopPropagation();
      const componentIndex = store.imageUI.selectedComponentIndex;
      store.imageUI.colorMaps[componentIndex] = iconSelect.getSelectedValue();
    }
  );
  const component = store.imageUI.selectedComponentIndex;
  iconSelect.setSelectedValue(store.imageUI.colorMaps[component]);
}

export default createColorRangeInput;
