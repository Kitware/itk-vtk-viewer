import applyContrastSensitiveStyleToElement from '../applyContrastSensitiveStyleToElement'
import style from '../ItkVtkViewer.module.css'
import { blendModeIconDataUri } from 'itk-viewer-icons'

function applyScaleCount(input, scaleCount) {
  input.innerHTML = '' // clear old options
  ;[...Array(scaleCount).keys()].reverse().forEach(i => {
    const option = document.createElement('option')
    option.value = i
    option.innerHTML = i
    input.appendChild(option)
  })
}

function applyRenderedScale(input, renderedScale) {
  input.value = renderedScale
}

const scaleSelector = (context, event) => (send, onReceive) => {
  const scaleSelectorDiv = document.createElement('div')
  context.images.componentAndScale.appendChild(scaleSelectorDiv)

  scaleSelectorDiv.setAttribute('style', 'display: flex;')

  scaleSelectorDiv.innerHTML = `
    <div itk-vtk-tooltip itk-vtk-tooltip-top-screenshot itk-vtk-tooltip-content="Resolution Scale"
      class="${style.blendModeButton}">
      <img src="${blendModeIconDataUri}" alt="Resolution Scale" />
    </div>
    `
  const scaleSelectorIcon = scaleSelectorDiv.children[0]
  applyContrastSensitiveStyleToElement(
    context,
    'invertibleButton',
    scaleSelectorIcon
  )

  const scaleSelector = document.createElement('select')
  scaleSelectorDiv.appendChild(scaleSelector)
  scaleSelectorDiv.setAttribute('style', 'height: 25px;')

  scaleSelector.setAttribute('class', style.selector)

  scaleSelector.addEventListener('change', event => {
    event.preventDefault()
    event.stopPropagation()
    context.images.imageRenderingActors
      .get(context.images.selectedName)
      .send('SET_IMAGE_SCALE', {
        renderedScale: parseInt(event.target.value),
      })
  })

  function onImageAssigned(name) {
    const scaleCount = context.images.actorContext.get(name).image.scaleInfo
      .length
    if (scaleCount > 1) {
      scaleSelectorDiv.style.display = 'flex'
      applyScaleCount(scaleSelector, scaleCount)
    } else {
      scaleSelectorDiv.style.display = 'none'
    }
  }

  onImageAssigned(event.data)

  onReceive(({ type, data }) => {
    if (type === 'IMAGE_ASSIGNED') {
      onImageAssigned(data)
    } else if (type === 'RENDERED_IMAGE_ASSIGNED') {
      applyRenderedScale(
        scaleSelector,
        context.images.actorContext.get(data).renderedScale
      )
    }
  })
}

export default scaleSelector
