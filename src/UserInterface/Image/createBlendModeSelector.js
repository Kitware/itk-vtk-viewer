import { reaction } from 'mobx';

import style from '../ItkVtkViewer.module.css';
import applyContrastSensitiveStyle from '../applyContrastSensitiveStyle';

import blendModeIcon from '../icons/blend-mode.svg';

function createBlendModeSelector(
  store,
  uiContainer,
) {
  const blendModeEntry = document.createElement('div');
  blendModeEntry.innerHTML = `
    <div itk-vtk-tooltip itk-vtk-tooltip-top itk-vtk-tooltip-content="Blend mode"
      class="${style.blendModeButton}">
      ${blendModeIcon}
    </div>
    `
  const blendModeDiv = blendModeEntry.children[0];
  applyContrastSensitiveStyle(store, 'invertibleButton', blendModeDiv);
  uiContainer.appendChild(blendModeEntry);

  const blendModeSelector = document.createElement('select');
  blendModeSelector.setAttribute('class', style.selector);
  blendModeSelector.id = `${store.id}-colorMapSelector`;
  blendModeSelector.innerHTML = `<option selected value="0">Composite</option>
    <option value="1">Maximum</option>
    <option value="2">Minimum</option>
    <option value="3">Average</option>`;
  blendModeEntry.appendChild(blendModeSelector)


  function updateBlendMode(blendMode) {
    const volumeMapper = store.imageUI.representationProxy.getMapper();
    volumeMapper.setBlendMode(blendMode);
    store.renderWindow.render();
    blendModeSelector.value = blendMode;
  }
  reaction(() => { return store.imageUI.blendMode },
    (blendMode) => { updateBlendMode(blendMode); }
  )
  blendModeSelector.addEventListener('change',
    (event) => {
      event.preventDefault();
      event.stopPropagation();
      store.imageUI.blendMode = parseInt(event.target.value);
    }
  );

  uiContainer.appendChild(blendModeSelector);
}

export default createBlendModeSelector;
