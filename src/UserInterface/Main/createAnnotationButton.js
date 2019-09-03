import { autorun } from 'mobx';

import style from '../ItkVtkViewer.module.css';

import annotationIcon from '../icons/annotations.svg';

function createAnnotationButton(
  store,
  contrastSensitiveStyle,
  mainUIRow
) {
  const annotationButton = document.createElement('div');
  annotationButton.innerHTML = `<input id="${store.id}-toggleAnnotationsButton" type="checkbox" class="${
    style.toggleInput
  }" checked><label itk-vtk-tooltip itk-vtk-tooltip-top-annotation itk-vtk-tooltip-content="Annotations" class="${
    contrastSensitiveStyle.invertibleButton
  } ${style.annotationButton} ${
    style.toggleButton
  }" for="${store.id}-toggleAnnotationsButton">${annotationIcon}</label>`;
  const annotationButtonInput = annotationButton.children[0];
  function toggleAnnotations() {
    const annotationsEnabled = store.mainUI.annotationsEnabled;
    annotationButtonInput.checked = annotationsEnabled;
    store.itkVtkView.setOrientationAnnotationVisibility(annotationsEnabled);
  }
  autorun(() => {
    toggleAnnotations();
  })
  annotationButton.addEventListener('change',
    (event) => {
      event.preventDefault();
      event.stopPropagation();
      store.mainUI.annotationsEnabled = !store.mainUI.annotationsEnabled;
    }
  );
  mainUIRow.appendChild(annotationButton);
}

export default createAnnotationButton;
