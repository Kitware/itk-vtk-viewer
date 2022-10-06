import style from '../ItkVtkViewer.module.css'
import { volumeScatteringIconDataUri } from 'itk-viewer-icons'

const sliderMap = new Map()

function makeSlider(context, label, parameterName, { min, max, step, start }) {
  const container = document.createElement('div')
  container.setAttribute('class', style.sliderEntry)
  container.innerHTML = `
    <div itk-vtk-tooltip itk-vtk-tooltip-top-screenshot itk-vtk-tooltip-content="${label}" class="${style.sliderIcon}">
      <img src="${volumeScatteringIconDataUri}" alt="${label}" />
    </div>
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

export function createCinematicParameters(context, rowParent) {
  // hidable sliders
  const row = document.createElement('div')

  const rootContainer = document.createElement('div')
  rootContainer.setAttribute('class', style.sliderColumn)
  row.appendChild(rootContainer)
  rowParent.appendChild(row)

  context.images.volumeUiElements.push(row)

  rootContainer.style.flexDirection = 'column'

  rootContainer.appendChild(
    makeSlider(context, 'Volume Scattering', 'scatteringBlend', {
      min: 0,
      max: 1,
      step: 1 / 100,
      start: 0,
    })
  )
}

export function applyCinematicChanged(context, { actorContext }) {
  const { cinematicParameters } = actorContext
  sliderMap.get(
    'scatteringBlend'
  ).disabled = !cinematicParameters.isCinematicPossible
  ;['scatteringBlend'].forEach(param => {
    sliderMap.get(param).value = cinematicParameters[param]
  })
}
