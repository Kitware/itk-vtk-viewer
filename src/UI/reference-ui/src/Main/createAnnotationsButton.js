import style from '../ItkVtkViewer.module.css'

import annotationsIcon from '.././Icons/annotations.svg'
import applyContrastSensitiveStyleToElement from '../applyContrastSensitiveStyleToElement'
import toggleAnnotations from './toggleAnnotations'

function createAnnotationsButton(context, mainUIRow) {
  const annotationsButton = document.createElement('div')
  annotationsButton.innerHTML = `<input id="${context.id}-toggleAnnotationsButton" type="checkbox" class="${style.toggleInput}" checked><label itk-vtk-tooltip itk-vtk-tooltip-top-annotations itk-vtk-tooltip-content="Annotations" class="${style.annotationsButton} ${style.toggleButton}" for="${context.id}-toggleAnnotationsButton">${annotationsIcon}</label>`
  const annotationsButtonInput = annotationsButton.children[0]
  const annotationsButtonLabel = annotationsButton.children[1]
  context.main.annotationsButtonLabel = annotationsButtonLabel
  context.main.annotationsButtonInput = annotationsButtonInput
  applyContrastSensitiveStyleToElement(
    context,
    'invertibleButton',
    annotationsButtonLabel
  )

  toggleAnnotations(context)

  annotationsButton.addEventListener('change', event => {
    event.preventDefault()
    event.stopPropagation()
    context.service.send('TOGGLE_ANNOTATIONS')
  })

  mainUIRow.appendChild(annotationsButton)
}

export default createAnnotationsButton
