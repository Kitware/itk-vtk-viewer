import { reaction, observable, action, toJS } from 'mobx';

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
    const selectedIndex = store.pointSetsUI.selectedPointSetIndex;
    if (!store.pointSetsUI.hasScalars[selectedIndex]) {
      return;
    }
    const colorByKey = store.pointSetsUI.colorBy[selectedIndex].value;
    const [location, colorByArrayName] = colorByKey.split(':');
    const pointSet = store.pointSetsUI.pointSets[selectedIndex];
    const dataArray = location === 'pointData' ?
      pointSet.getPointData().getArrayByName(colorByArrayName) :
      pointSet.getCellData().getArrayByName(colorByArrayName);
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

    const colorRange = store.pointSetsUI.selectedColorRange;
    minimumInput.value = colorRange[0];
    maximumInput.value = colorRange[1];
  }

  function addColorRangesReactions(index, colorRanges) {
    if (store.pointSetsUI.colorRangesReactions.has(index)) {
      const disposer = store.pointSetsUI.colorRangesReactions.get(index);
      disposer.dispose();
    }
    const disposer = reaction(() => {
      return toJS(store.pointSetsUI.colorRanges);
    },
      (colorRanges) => {
        if (index !== store.pointSetsUI.selectedPointSetIndex) {
          return;
        }
        const colorRange = store.pointSetsUI.selectedColorRange;
        if (!!colorRange) {
          minimumInput.value = colorRange[0];
          maximumInput.value = colorRange[1];
          const lutProxy = store.pointSetsUI.selectedLookupTableProxy;
          const colorTransferFunction = lutProxy.getLookupTable();
          colorTransferFunction.setMappingRange(...colorRange);
          colorTransferFunction.updateRange();
          if (!store.renderWindow.getInteractor().isAnimating()) {
            store.renderWindow.render();
          }
        }
      })
    store.pointSetsUI.colorRangesReactions.set(index, disposer);
  }

  function setDefaultColorRangesColorMaps() {
    const colorByOptions = store.pointSetsUI.colorByOptions;
    if(!!!colorByOptions || colorByOptions.length === 0) {
      return;
    }

    const pointSets = store.pointSetsUI.pointSets;
    colorByOptions.forEach((options, index) => {
      const pointSet = pointSets[index];
      if (!store.pointSetsUI.colorRanges.has(index)) {
        const colorRanges = observable(new Map());
        if (options) {
          options.forEach((option) => {
            const [location, colorByArrayName] = option.value.split(':');
            const dataArray = location === 'pointData' ?
              pointSet.getPointData().getArrayByName(colorByArrayName) :
              pointSet.getCellData().getArrayByName(colorByArrayName);
            const range = dataArray.getRange();
            colorRanges.set(option.value, range);
          })
        }
        store.pointSetsUI.colorRanges.set(index, colorRanges);
        addColorRangesReactions(index, colorRanges);
      } else {
        // Constrain by min / max of possibly new inputs
        const colorRanges = store.pointSetsUI.colorRanges.get(index);
        !!options && options.forEach((option) => {
          const [location, colorByArrayName] = option.value.split(':');
          const dataArray = location === 'pointData' ?
            pointSet.getPointData().getArrayByName(colorByArrayName) :
            pointSet.getCellData().getArrayByName(colorByArrayName);
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
        addColorRangesReactions(index, colorRanges);
      }
      if (store.pointSetsUI.colorMaps.length <= index) {
        const defaultColorMap = 'Viridis (matplotlib)';
        store.pointSetsUI.colorMaps.push(defaultColorMap);
        const lutProxy = store.pointSetsUI.selectedLookupTableProxy;
        if (!!lutProxy) {
          lutProxy.setPresetName(defaultColorMap);
        }
      }
    })
    updateColorRangeInput();
  }

  setDefaultColorRangesColorMaps();

  reaction(() => { return store.pointSetsUI.selectedColorRange; },
    (colorRange) => {
      if (!!colorRange) {
        minimumInput.value = colorRange[0];
        maximumInput.value = colorRange[1];
        const lutProxy = store.pointSetsUI.selectedLookupTableProxy;
        const colorTransferFunction = lutProxy.getLookupTable();
        colorTransferFunction.setMappingRange(...colorRange);
        colorTransferFunction.updateRange();
      }
    }
  )

  minimumInput.addEventListener('change',
    action((event) => {
      event.preventDefault();
      event.stopPropagation();
      const selectedIndex = store.pointSetsUI.selectedPointSetIndex;
      const colorByKey = store.pointSetsUI.colorBy[selectedIndex].value;
      const range = store.pointSetsUI.colorRanges.get(selectedIndex).get(colorByKey);
      range[0] = Number(event.target.value);
      store.pointSetsUI.colorRanges.get(selectedIndex).set(colorByKey, range);
    })
  );
  maximumInput.addEventListener('change',
    action((event) => {
      event.preventDefault();
      event.stopPropagation();
      const selectedIndex = store.pointSetsUI.selectedPointSetIndex;
      const colorByKey = store.pointSetsUI.colorBy[selectedIndex].value;
      const range = store.pointSetsUI.colorRanges.get(selectedIndex).get(colorByKey);
      range[1] = Number(event.target.value);
      store.pointSetsUI.colorRanges.get(selectedIndex).set(colorByKey, range);
    })
  );

  const colorMapSelector = document.createElement('div');
  colorMapSelector.id = `${store.id}-pointSetColorMapSelector`;

  const iconSelector = createColorMapIconSelector(colorMapSelector);

  function updateColorCanvas() {
      const selectedIndex = store.pointSetsUI.selectedPointSetIndex;
      if (!store.pointSetsUI.hasScalars[selectedIndex]) {
        return;
      }
      const colorMap = store.pointSetsUI.colorMaps[selectedIndex];
      const lookupTableProxy = store.pointSetsUI.selectedLookupTableProxy;
      const colorTransferFunction = lookupTableProxy.getLookupTable();

      if (colorMap.startsWith('Custom')) {
        lookupTableProxy.setMode(vtkLookupTableProxy.Mode.RGBPoints)
        const colorRange = store.pointSetsUI.selectedColorRange;
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
      }
      iconSelector.setSelectedValue(colorMap);
      if (!store.renderWindow.getInteractor().isAnimating()) {
        store.renderWindow.render();
      }
    }
  let customIcon = null;
  reaction(() => { return store.pointSetsUI.colorMaps.slice() },
    (colorMaps) => { updateColorCanvas(); }
  )
  colorMapSelector.addEventListener('changed',
    (event) => {
      event.preventDefault();
      event.stopPropagation();
      const selectedIndex = store.pointSetsUI.selectedPointSetIndex;
      store.pointSetsUI.colorMaps[selectedIndex] = iconSelector.getSelectedValue();
    }
  );
  const pointSetIndex = store.pointSetsUI.selectedPointSetIndex;
  iconSelector.setSelectedValue(store.pointSetsUI.colorMaps[pointSetIndex]);

  reaction(() => { return store.pointSetsUI.colorByOptions.slice(); },
    () => {
      setDefaultColorRangesColorMaps();
    }
  )

  reaction(() => { return store.pointSetsUI.selectedPointSetIndex; },
    (selectedIndex) => {
      const hasScalars = store.pointSetsUI.hasScalars;
      if (hasScalars[selectedIndex]) {
        uiContainer.style.display = 'flex';
        updateColorRangeInput();
        updateColorCanvas();
      } else {
        uiContainer.style.display = 'none';
      }
    }
  )
  reaction(() => { return store.pointSetsUI.colorBy.slice(); },
    () => {
      updateColorRangeInput();
      updateColorCanvas();
    }
  )

  updateColorCanvas();
  const hasScalars = store.pointSetsUI.hasScalars;
  const selectedIndex = store.pointSetsUI.selectedPointSetIndex;
  if (hasScalars[selectedIndex]) {
    uiContainer.style.display = 'flex';
  } else {
    uiContainer.style.display = 'none';
  }

  uiContainer.appendChild(minimumInput);
  uiContainer.appendChild(colorMapSelector);
  uiContainer.appendChild(maximumInput);
}

export default createColorRangeInput;
