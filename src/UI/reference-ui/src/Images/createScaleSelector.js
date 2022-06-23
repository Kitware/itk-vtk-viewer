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

function createScaleSelector(context, imagesUIGroup) {
  const row = document.createElement('div')
  row.setAttribute('class', style.uiRow)
  imagesUIGroup.appendChild(row)

  const scaleSelectorDiv = document.createElement('div')
  row.appendChild(scaleSelectorDiv)

  scaleSelectorDiv.setAttribute('style', 'display: flex;')

  scaleSelectorDiv.innerHTML = `
    <div itk-vtk-tooltip itk-vtk-tooltip-top-screenshot itk-vtk-tooltip-content="Resolution Scale"
      class="${style.blendModeButton}">
      <img src="${blendModeIconDataUri}" alt="Resolution Scale" />
    </div>
    `
  const scaleSelectorIcon = scaleSelectorDiv.children[0]
  context.images.scaleSelectorIcon = scaleSelectorIcon
  applyContrastSensitiveStyleToElement(
    context,
    'invertibleButton',
    scaleSelectorIcon
  )

  const scaleSelector = document.createElement('select')
  scaleSelectorDiv.appendChild(scaleSelector)

  scaleSelector.setAttribute('class', style.selector)

  scaleSelector.addEventListener('change', event => {
    event.preventDefault()
    event.stopPropagation()
    context.service.send('SET_IMAGE_SCALE', {
      renderedScale: parseInt(event.target.value),
    })
  })

  context.service.onTransition(state => {
    if (state.event.type === 'IMAGE_ASSIGNED') {
      const scaleCount = context.images.actorContext.get(state.event.data).image
        .scaleInfo.length
      if (scaleCount > 1) {
        scaleSelectorDiv.style.display = 'flex'
        applyScaleCount(scaleSelector, scaleCount)
      } else {
        scaleSelectorDiv.style.display = 'none'
      }
    } else if (state.event.type === 'RENDERED_IMAGE_ASSIGNED') {
      applyRenderedScale(
        scaleSelector,
        context.images.actorContext.get(state.event.data).renderedScale
      )
    }
  })
}

export default createScaleSelector
