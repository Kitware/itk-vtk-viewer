import { interpolationIconDataUri } from 'itk-viewer-icons'
import style from '../ItkVtkViewer.module.css'

let toggleCinematicInput, toggleContainer

const sliderMap = new Map()

function makeSlider(context, label, parameterName, { min, max, step, start }) {
  const container = document.createElement('div')
  container.setAttribute('class', style.sliderEntry)
  container.innerHTML = `
    <label itk-vtk-tooltip itk-vtk-tooltip-top-screenshot itk-vtk-tooltip-content=" ${label}">
      ${label}
    </label>
    <input type="range" min="${min}" max="${max}" step="${step}" value="${start}" 
      class="${style.slider}" />`
  const slider = container.children[1]
  slider.addEventListener('input', event => {
    event.preventDefault()
    event.stopPropagation()
    context.service.send({
      type: 'SET_CINEMATIC_PARAMETERS',
      data: {
        name: context.images.selectedName,
        params: { [parameterName]: Number(slider.value) },
      },
    })
  })

  sliderMap.set(parameterName, slider)

  return container
}

export function createCinematicParameters(context, toggleParent, rowParent) {
  const toggleButton = document.createElement('div')

  toggleButton.innerHTML = `<input id="${context.id}-toggleCinematicButton" type="checkbox" class="${style.toggleInput}"><label itk-vtk-tooltip itk-vtk-tooltip-top-screenshot itk-vtk-tooltip-content="Toggle Cinematic" class="${style.interpolationButton} ${style.toggleButton} ${style.cinematicButton}" for="${context.id}-cinemanticButton"><img src="${interpolationIconDataUri}" alt="cinemantic" /></label>`
  toggleCinematicInput = toggleButton.children[0]

  toggleButton.addEventListener('click', event => {
    event.preventDefault()
    event.stopPropagation()
    const {
      cinematicParameters: { isCinematicOn },
    } = context.images.actorContext.get(context.images.selectedName)
    context.service.send({
      type: 'SET_CINEMATIC_PARAMETERS',
      data: {
        name: context.images.selectedName,
        params: { isCinematicOn: !isCinematicOn },
      },
    })
  })

  toggleParent.appendChild(toggleButton)

  // hidable sliders
  const row = document.createElement('div')

  toggleContainer = document.createElement('div')
  toggleContainer.setAttribute('class', style.sliderColumn)
  row.appendChild(toggleContainer)
  rowParent.appendChild(row)

  context.images.volumeUiElements.push(row)

  toggleContainer.style.flexDirection = 'column'
  toggleContainer.style.display = 'none'

  toggleContainer.appendChild(
    makeSlider(context, 'Local Ambient Occlusion Kernel', 'laoKernelSize', {
      min: 5,
      max: 32,
      step: 1,
      start: 5,
    })
  )

  toggleContainer.appendChild(
    makeSlider(context, 'Local Ambient Occlusion Radius', 'laoKernelRadius', {
      min: 1,
      max: 32,
      step: 1,
      start: 1,
    })
  )

  toggleContainer.appendChild(
    makeSlider(context, 'Diffuse', 'diffuse', {
      min: 0,
      max: 2,
      step: 2 / 100,
      start: 1,
    })
  )

  toggleContainer.appendChild(
    makeSlider(context, 'Ambient', 'ambient', {
      min: 0,
      max: 1,
      step: 1 / 100,
      start: 0.4,
    })
  )
}

export function applyCinematicChanged(context, { actorContext }) {
  const { cinematicParameters } = actorContext

  toggleCinematicInput.checked = cinematicParameters.isCinematicOn
  toggleContainer.style.display = cinematicParameters.isCinematicOn
    ? 'flex'
    : 'none'
  ;['laoKernelSize', 'laoKernelRadius', 'diffuse', 'ambient'].forEach(param => {
    sliderMap.get(param).value = cinematicParameters[param]
  })
}
