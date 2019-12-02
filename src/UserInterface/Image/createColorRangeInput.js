import { reaction } from 'mobx';

import vtkLookupTableProxy from 'vtk.js/Sources/Proxy/Core/LookupTableProxy';

import style from '../ItkVtkViewer.module.css';

import createColorMapIconSelector from '../createColorMapIconSelector';
import customColorMapIcon from '../customColorMapIcon';

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

  const colorMapSelector = document.createElement('div');
  colorMapSelector.id = `${store.id}-imageColorMapSelector`;

  uiContainer.appendChild(minimumInput);
  uiContainer.appendChild(colorMapSelector);
  uiContainer.appendChild(maximumInput);

  const iconSelector = createColorMapIconSelector(colorMapSelector);

  let customIcon = null;
  reaction(() => { return store.imageUI.colorMaps.slice() },
    (colorMaps) => {
      const component = store.imageUI.selectedComponentIndex;
      const colorMap = colorMaps[component];

      const lookupTableProxy = store.imageUI.lookupTableProxies[component];
      const colorTransferFunction = lookupTableProxy.getLookupTable();

      const transferFunctionWidget = store.imageUI.transferFunctionWidget;
      const piecewiseFunction = store.imageUI.piecewiseFunctionProxies[component].getPiecewiseFunction()
      if (colorMap.startsWith('Custom')) {
        lookupTableProxy.setMode(vtkLookupTableProxy.Mode.RGBPoints)
        transferFunctionWidget.applyOpacity(piecewiseFunction);
        const colorDataRange = transferFunctionWidget.getOpacityRange();
        if (!!colorDataRange) {
          colorTransferFunction.setMappingRange(...colorDataRange);
        }
        colorTransferFunction.updateRange();

        const isIcons = iconSelector.getIcons();
        if (!!!customIcon) {
          const colorMapIcon = customColorMapIcon(colorTransferFunction, colorDataRange);
          customIcon = { 'iconFilePath': colorMapIcon, 'iconValue': colorMap };
          icons.push(customIcon);
          iconSelector.refresh(icons);
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
        transferFunctionWidget.applyOpacity(piecewiseFunction);
        const colorDataRange = transferFunctionWidget.getOpacityRange();
        if (!!colorDataRange) {
          colorTransferFunction.setMappingRange(...colorDataRange);
        }
        colorTransferFunction.updateRange();
      }
      iconSelector.setSelectedValue(colorMap);
      transferFunctionWidget.render();
      if (!store.renderWindow.getInteractor().isAnimating()) {
        store.renderWindow.render();
      }
    }
  )
  colorMapSelector.addEventListener('changed',
    (event) => {
      event.preventDefault();
      event.stopPropagation();
      const componentIndex = store.imageUI.selectedComponentIndex;
      store.imageUI.colorMaps[componentIndex] = iconSelector.getSelectedValue();
    }
  );
  const component = store.imageUI.selectedComponentIndex;
  iconSelector.setSelectedValue(store.imageUI.colorMaps[component]);
}

export default createColorRangeInput;
