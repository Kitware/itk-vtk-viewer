import { reaction, observable } from 'mobx';

import vtkLookupTableProxy from 'vtk.js/Sources/Proxy/Core/LookupTableProxy';

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
    const selectedGeometryIndex = store.geometriesUI.selectedGeometryIndex;
    if (!store.geometriesUI.hasScalars[selectedGeometryIndex]) {
      return;
    }
    const colorByKey = store.geometriesUI.colorBy[selectedGeometryIndex].value;
    const [location, colorByArrayName] = colorByKey.split(':');
    const geometry = store.geometriesUI.geometries[selectedGeometryIndex];
    const dataArray = location === 'pointData' ?
      geometry.getPointData().getArrayByName(colorByArrayName) :
      geometry.getCellData().getArrayByName(colorByArrayName);
    const range = dataArray.getRange();

    minimumInput.min = range[0];
    minimumInput.max = range[1];
    maximumInput.min = range[0];
    maximumInput.max = range[1];
    const data = dataArray.getData();
    if (data instanceof Float32Array || data instanceof Float64Array) {
      const step = (range[1] - range[0]) / 100.0;
      minimumInput.step = step;
      maximumInput.step = step;
    }

    const colorRange = store.geometriesUI.selectedColorRange;
    minimumInput.value = colorRange[0];
    maximumInput.value = colorRange[1];
  }

  function setDefaultColorRangesColorMaps() {
    const colorByOptions = store.geometriesUI.colorByOptions;
    if(!!!colorByOptions || colorByOptions.length === 0) {
      return;
    }

    const geometries = store.geometriesUI.geometries;
    colorByOptions.forEach((options, index) => {
      const geometry = geometries[index];
      if (store.geometriesUI.colorRanges.length <= index) {
        const colorRanges = observable(new Map());
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
        store.geometriesUI.colorRanges.push(colorRanges);
      } else {
        // Constrain by min / max of possibly new inputs
        const colorRanges = store.geometriesUI.colorRanges[index];
        !!options && options.forEach((option) => {
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
      if (store.geometriesUI.colorMaps.length <= index) {
        const defaultColorMap = 'Viridis (matplotlib)';
        store.geometriesUI.colorMaps.push(defaultColorMap);
        const lutProxy = store.geometriesUI.selecetdLookupTableProxy;
        if (!!lutProxy) {
          lutProxy.setPresetName(defaultColorMap);
        }
      }
    })
    updateColorRangeInput();
  }

  setDefaultColorRangesColorMaps();

  reaction(() => { return store.geometriesUI.selectedColorRange; },
    (colorRange) => {
      console.log('rrrreaction!!!')
      console.log(colorRange)
      if (!!colorRange) {
        minimumInput.value = colorRange[0];
        maximumInput.value = colorRange[1];
        const lutProxy = store.geometriesUI.selecetdLookupTableProxy;
        const colorTransferFunction = lutProxy.getLookupTable();
        colorTransferFunction.setMappingRange(...range);
        colorTransferFunction.updateRange();
      }
    }
  )

  minimumInput.addEventListener('change',
    (event) => {
      event.preventDefault();
      event.stopPropagation();
      const selectedGeometryIndex = store.geometriesUI.selectedGeometryIndex;
      const colorByKey = store.geometriesUI.colorBy[selectedGeometryIndex].value;
      const range = store.geometriesUI.colorRanges[selectedGeometryIndex].get(colorByKey);
      console.log(range)
      console.log(store.geometriesUI.selectedColorRange);
      range[0] = Number(event.target.value);
      console.log(range)
      console.log(store.geometriesUI.selectedColorRange);
      store.geometriesUI.colorRanges[selectedGeometryIndex].set(colorByKey, range);
    }
  );
  maximumInput.addEventListener('change',
    (event) => {
      event.preventDefault();
      event.stopPropagation();
      const selectedGeometryIndex = store.geometriesUI.selectedGeometryIndex;
      const colorByKey = store.geometriesUI.colorBy[selectedGeometryIndex].value;
      const range = store.geometriesUI.colorRanges[selectedGeometryIndex].get(colorByKey);
      range[1] = Number(event.target.value);
      store.geometriesUI.colorRanges[selectedGeometryIndex].set(colorByKey, range);
    }
  );

  const canvas = document.createElement('canvas');
  const width = 240;
  const height = 20;
  canvas.setAttribute('width', width);
  canvas.setAttribute('height', height);

  function customColorMapIcon(colorTransferFunction, range) {
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
    return canvas.toDataURL('image/png')
  }

  const colorMapSelector = document.createElement('div');
  colorMapSelector.id = `${store.id}-geometryColorMapSelector`;

  const rows = 20;
  const cols = 3;
  const iconSelectParameters = {'selectedIconWidth': 230,
      'selectedIconHeight': 22,
      'selectedBoxPadding': 1,
      'iconsWidth': 60,
      'iconsHeight': 22,
      'boxIconSpace': 1,
      'vectoralIconNumber': cols,
      'horizontalIconNumber': rows};
  const iconSelect = new IconSelect(`${colorMapSelector.id}`,
    colorMapSelector, iconSelectParameters);
  colorMapSelector.style.width = '244px';
  const icons = new Array(rows * cols);
  let count = 0;
  for (let [key, value] of ColorPresetIcons.entries()) {
    const index = Math.floor(count % rows)*cols + Math.floor(count / rows);
    icons[index] = {'iconFilePath': value, 'iconValue': key};
    count++;
  }
  iconSelect.refresh(icons)

  function updateColorCanvas() {
      const geometryIndex = store.geometriesUI.selectedGeometryIndex;
      if (!store.geometriesUI.hasScalars[geometryIndex]) {
        return;
      }
      const colorMap = store.geometriesUI.colorMaps[geometryIndex];
      const lookupTableProxy = store.geometriesUI.selectedLookupTableProxy;
      const colorTransferFunction = lookupTableProxy.getLookupTable();

      if (colorMap.startsWith('Custom')) {
        lookupTableProxy.setMode(vtkLookupTableProxy.Mode.RGBPoints)
        const colorRange = store.geometriesUI.selectedColorRange;
        const isIcons = iconSelect.getIcons();
        if (!!!customIcon) {
          const colorMapIcon = customColorMapIcon(colorTransferFunction, colorDataRange);
          customIcon = { 'iconFilePath': colorMapIcon, 'iconValue': colorMap };
          icons.push(customIcon);
          iconSelect.refresh(icons);
        } else if(isIcons[isIcons.length-1].iconValue !== colorMap) {
          const colorMapIcon = customColorMapIcon(colorTransferFunction, colorDataRange);
          isIcons[isIcons.length-1].element.src = colorMapIcon;
          isIcons[isIcons.length-1].iconFilePath = colorMapIcon;
          isIcons[isIcons.length-1].iconValue = colorMap;
          isIcons[isIcons.length-1].element.setAttribute('icon-value', colorMap);
          isIcons[isIcons.length-1].element.setAttribute('alt', colorMap);
          isIcons[isIcons.length-1].element.setAttribute('title', colorMap);
        }
      } else {
        lookupTableProxy.setPresetName(colorMap);
        lookupTableProxy.setMode(vtkLookupTableProxy.Mode.Preset)
      }
      iconSelect.setSelectedValue(colorMap);
      if (!store.renderWindow.getInteractor().isAnimating()) {
        store.renderWindow.render();
      }
    }
  let customIcon = null;
  reaction(() => { return store.geometriesUI.colorMaps.slice() },
    (colorMaps) => { updateColorCanvas(); }
  )
  colorMapSelector.addEventListener('changed',
    (event) => {
      event.preventDefault();
      event.stopPropagation();
      const geometryIndex = store.geometriesUI.selectedGeometryIndex;
      store.geometriesUI.colorMaps[geometryIndex] = iconSelect.getSelectedValue();
    }
  );
  const geometryIndex = store.geometriesUI.selectedGeometryIndex;
  iconSelect.setSelectedValue(store.geometriesUI.colorMaps[geometryIndex]);

  reaction(() => { return store.geometriesUI.colorByOptions.slice(); },
    () => {
      setDefaultColorRangesColorMaps();
    }
  )

  reaction(() => { return store.geometriesUI.selectedGeometryIndex; },
    (selectedGeometryIndex) => {
      const hasScalars = store.geometriesUI.hasScalars;
      if (hasScalars[selectedGeometryIndex]) {
        uiContainer.style.display = 'flex';
        updateColorRangeInput();
        updateColorCanvas();
      } else {
        uiContainer.style.display = 'none';
      }
    }
  )
  reaction(() => { return store.geometriesUI.colorBy.slice(); },
    () => {
      updateColorRangeInput();
      updateColorCanvas();
    }
  )

  updateColorCanvas();
  const hasScalars = store.geometriesUI.hasScalars;
  const selectedGeometryIndex = store.geometriesUI.selectedGeometryIndex;
  if (hasScalars[selectedGeometryIndex]) {
    uiContainer.style.display = 'flex';
  } else {
    uiContainer.style.display = 'none';
  }

  uiContainer.appendChild(minimumInput);
  //uiContainer.appendChild(canvas);
  uiContainer.appendChild(colorMapSelector);
  uiContainer.appendChild(maximumInput);
}

export default createColorRangeInput;
