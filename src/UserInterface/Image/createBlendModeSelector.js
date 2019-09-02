import { reaction } from 'mobx';

import getContrastSensitiveStyle from '../getContrastSensitiveStyle';

import style from '../ItkVtkViewer.module.css';

import blendModeIcon from '../icons/blend-mode.svg';

function createBlendModeSelector(
  viewerStore,
  uiContainer,
) {
  const contrastSensitiveStyle = getContrastSensitiveStyle(
    ['invertibleButton'],
    viewerStore.isBackgroundDark
  );


  const blendModeEntry = document.createElement('div');
  blendModeEntry.innerHTML = `
    <div itk-vtk-tooltip itk-vtk-tooltip-top itk-vtk-tooltip-content="Blend mode"
      class="${contrastSensitiveStyle.invertibleButton} ${style.blendModeButton}">
      ${blendModeIcon}
    </div>
    `
  uiContainer.appendChild(blendModeEntry);

  const blendModeSelector = document.createElement('select');
  blendModeSelector.setAttribute('class', style.selector);
  blendModeSelector.id = `${viewerStore.id}-colorMapSelector`;
  blendModeSelector.innerHTML = `<option selected value="0">Composite</option>
    <option value="1">Maximum</option>
    <option value="2">Minimum</option>
    <option value="3">Average</option>`;
  blendModeEntry.appendChild(blendModeSelector)


  function updateBlendMode(blendMode) {
    const volumeMapper = viewerStore.imageUI.representationProxy.getMapper();
    volumeMapper.setBlendMode(blendMode);
    viewerStore.renderWindow.render();
    blendModeSelector.value = blendMode;
  }
  reaction(() => { return viewerStore.imageUI.blendMode },
    (blendMode) => { updateBlendMode(blendMode); }
  )
  blendModeSelector.addEventListener('change',
    (event) => {
      event.preventDefault();
      event.stopPropagation();
      viewerStore.imageUI.blendMode = parseInt(event.target.value);
    }
  );

  uiContainer.appendChild(blendModeSelector);
}

export default createBlendModeSelector;
