import { reaction } from 'mobx';

import style from '../ItkVtkViewer.module.css';

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
    const range = dataArray.getRange(0);
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
    store.imageUI.colorRange = range;
  }
  reaction(() => { return store.imageUI.image; },
    (image) => { updateColorRangeInput(); }
  )
  reaction(() => { return store.imageUI.colorRange.slice(); },
    (colorRange) => {
      minimumInput.value = colorRange[0];
      maximumInput.value = colorRange[1];
    }
  )
  minimumInput.addEventListener('change',
    (event) => {
      event.preventDefault();
      event.stopPropagation();
      store.imageUI.colorRange[0] = Number(event.target.value);
    }
  );
  maximumInput.addEventListener('change',
    (event) => {
      event.preventDefault();
      event.stopPropagation();
      store.imageUI.colorRange[1] = Number(event.target.value);
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
    const range = dataArray.getRange(0);

    const lookupTable = store.imageUI.lookupTableProxy.getLookupTable();
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
  reaction(() => { return store.imageUI.colorMap; },
    (colorMap) => { updateColorCanvas(); }
  )

  updateColorCanvas();

  uiContainer.appendChild(minimumInput);
  uiContainer.appendChild(canvas);
  uiContainer.appendChild(maximumInput);
}

export default createColorRangeInput;
