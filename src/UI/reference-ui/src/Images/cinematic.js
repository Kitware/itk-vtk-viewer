import { interpolationIconDataUri } from 'itk-viewer-icons'
import style from '../ItkVtkViewer.module.css'

let cinematicInputToggle, rootContainer, scatteringToggle, laoToggle

const sliderMap = new Map()

function makeSlider(context, label, parameterName, { min, max, step, start }) {
  const container = document.createElement('div')
  container.setAttribute('class', style.sliderEntry)
  container.innerHTML = `
    <label itk-vtk-tooltip itk-vtk-tooltip-top-screenshot itk-vtk-tooltip-content="${label}">
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

function makeCheckbox(context, label, parameter) {
  const container = document.createElement('div')
  container.innerHTML = `
    <label itk-vtk-tooltip itk-vtk-tooltip-top-screenshot itk-vtk-tooltip-content="${label}">
      ${label}
    </label>
    <input type="checkbox" />`
  const input = container.children[1]
  rootContainer.appendChild(container)

  input.addEventListener('input', event => {
    event.preventDefault()
    event.stopPropagation()
    context.service.send({
      type: 'SET_CINEMATIC_PARAMETERS',
      data: {
        name: context.images.selectedName,
        params: { [parameter]: input.checked },
      },
    })
  })
  return input
}

export function createCinematicParameters(context, toggleParent, rowParent) {
  const toggleButton = document.createElement('div')

  toggleButton.innerHTML = `<input id="${context.id}-toggleCinematicButton" type="checkbox" class="${style.toggleInput}"><label itk-vtk-tooltip itk-vtk-tooltip-top-screenshot itk-vtk-tooltip-content="Toggle Cinematic" class="${style.interpolationButton} ${style.toggleButton} ${style.cinematicButton}" for="${context.id}-cinemanticButton"><img src="${interpolationIconDataUri}" alt="cinemantic" /></label>`
  cinematicInputToggle = toggleButton.children[0]

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

  rootContainer = document.createElement('div')
  rootContainer.setAttribute('class', style.sliderColumn)
  row.appendChild(rootContainer)
  rowParent.appendChild(row)

  context.images.volumeUiElements.push(row)

  rootContainer.style.flexDirection = 'column'
  rootContainer.style.display = 'none'

  rootContainer.appendChild(
    makeSlider(context, 'Diffuse', 'diffuse', {
      min: 0,
      max: 2,
      step: 2 / 100,
      start: 1,
    })
  )

  rootContainer.appendChild(
    makeSlider(context, 'Ambient', 'ambient', {
      min: 0,
      max: 1,
      step: 1 / 100,
      start: 0.4,
    })
  )

  scatteringToggle = makeCheckbox(
    context,
    'Volumetric Scattering',
    'isScatteringOn'
  )

  rootContainer.appendChild(
    makeSlider(context, 'Volumetric Scattering Blend', 'scatteringBlend', {
      min: 0,
      max: 1,
      step: 1 / 100,
      start: 0.3,
    })
  )

  laoToggle = makeCheckbox(context, 'Local Ambient Occlusion', 'isLaoOn')

  rootContainer.appendChild(
    makeSlider(context, 'Local Ambient Occlusion Kernel', 'laoKernelSize', {
      min: 5,
      max: 32,
      step: 1,
      start: 5,
    })
  )

  rootContainer.appendChild(
    makeSlider(context, 'Local Ambient Occlusion Radius', 'laoKernelRadius', {
      min: 1,
      max: 32,
      step: 1,
      start: 1,
    })
  )
}

export function applyCinematicChanged(context, { actorContext }) {
  const { cinematicParameters } = actorContext

  cinematicInputToggle.checked = cinematicParameters.isCinematicOn
  rootContainer.style.display = cinematicParameters.isCinematicOn
    ? 'flex'
    : 'none'
  scatteringToggle.checked = cinematicParameters.isScatteringOn
  scatteringToggle.disabled = cinematicParameters.isLaoOn
  sliderMap.get(
    'scatteringBlend'
  ).disabled = !cinematicParameters.isScatteringOn

  laoToggle.checked = cinematicParameters.isLaoOn
  laoToggle.disabled = cinematicParameters.isScatteringOn
  ;['laoKernelSize', 'laoKernelRadius']
    .map(param => sliderMap.get(param))
    .forEach(slider => (slider.disabled = !cinematicParameters.isLaoOn))
  ;[
    'scatteringBlend',
    'laoKernelSize',
    'laoKernelRadius',
    'diffuse',
    'ambient',
  ].forEach(param => {
    sliderMap.get(param).value = cinematicParameters[param]
  })
}
