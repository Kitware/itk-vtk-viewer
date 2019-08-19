import { autorun } from 'mobx';

import style from '../ItkVtkViewer.module.css';

import annotationIcon from '../icons/annotations.svg';

function createAnnotationButton(
  viewerStore,
  contrastSensitiveStyle,
  mainUIRow
) {
  const annotationButton = document.createElement('div');
  annotationButton.innerHTML = `<input id="${viewerStore.id}-toggleAnnotationsButton" type="checkbox" class="${
    style.toggleInput
  }" checked><label itk-vtk-tooltip itk-vtk-tooltip-top-annotation itk-vtk-tooltip-content="Annotations" class="${
    contrastSensitiveStyle.invertibleButton
  } ${style.annotationButton} ${
    style.toggleButton
  }" for="${viewerStore.id}-toggleAnnotationsButton">${annotationIcon}</label>`;
  const annotationButtonInput = annotationButton.children[0];
  function toggleAnnotations() {
    const annotationsEnabled = viewerStore.mainUI.annotationsEnabled;
    annotationButtonInput.checked = annotationsEnabled;
    viewerStore.itkVtkView.setOrientationAnnotationVisibility(annotationsEnabled);
  }
  autorun(() => {
    toggleAnnotations();
  })
  annotationButton.addEventListener('change',
    () => { viewerStore.mainUI.annotationsEnabled = !viewerStore.mainUI.annotationsEnabled; }
  );
  mainUIRow.appendChild(annotationButton);
}

export default createAnnotationButton;
