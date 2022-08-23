import applyContrastSensitiveStyleToElement from '../applyContrastSensitiveStyleToElement'
import style from '../ItkVtkViewer.module.css'
import { scaleSelectIconDataUri } from 'itk-viewer-icons'

function applyScaleCount(input, scaleCount) {
  input.innerHTML = '' // clear old options
  const autoPickOption = document.createElement('option')
  autoPickOption.value = 'Framerate-pick'
  autoPickOption.innerHTML = 'Framerate-pick'
  input.appendChild(autoPickOption)
  ;[...Array(scaleCount).keys()].reverse().forEach(i => {
    const option = document.createElement('option')
    option.value = i
    option.innerHTML = i
    input.appendChild(option)
  })
}

const scaleSelector = (context, event) => (send, onReceive) => {
  const scaleSelectorDiv = document.createElement('div')
  scaleSelectorDiv.setAttribute(
    'style',
    'display: flex; align-self: center; height: 25px; margin-right: 5px'
  )
  context.images.componentAndScale.appendChild(scaleSelectorDiv)

  scaleSelectorDiv.innerHTML = `
    <div itk-vtk-tooltip itk-vtk-tooltip-top-screenshot itk-vtk-tooltip-content="Resolution Scale"
      class="${style.blendModeButton}">
      <img src="${scaleSelectIconDataUri}" alt="Resolution Scale" />
    </div>
    `
  const scaleSelectorIcon = scaleSelectorDiv.children[0]
  context.images.scaleSelectorIconDiv = scaleSelectorIcon // stash for applyImagesContrastSensitiveStyle
  applyContrastSensitiveStyleToElement(
    context,
    'invertibleButton',
    scaleSelectorIcon
  )

  const scaleSelector = document.createElement('select')
  scaleSelectorDiv.appendChild(scaleSelector)
  scaleSelector.setAttribute('style', 'max-width: 3.2ch')
  scaleSelector.setAttribute('class', style.selector)

  scaleSelector.addEventListener('change', event => {
    event.preventDefault()
    event.stopPropagation()

    const imageActor = context.images.imageRenderingActors.get(
      context.images.selectedName
    )
    if (event.target.value === 'Framerate-pick') {
      imageActor.send('ADJUST_SCALE_FOR_FRAMERATE')
    } else {
      imageActor.send('SET_IMAGE_SCALE', {
        renderedScale: parseInt(event.target.value),
      })
    }
  })

  function onImageAssigned(name) {
    const imageActorContext = context.images.actorContext.get(name)
    const image = imageActorContext.image ?? imageActorContext.labelImage
    const scaleCount = image.scaleInfo.length
    if (scaleCount > 1) {
      scaleSelectorDiv.style.display = 'flex'
      applyScaleCount(scaleSelector, scaleCount)
    } else {
      scaleSelectorDiv.style.display = 'none'
    }
  }

  onImageAssigned(event.data)

  onReceive(event => {
    const { type } = event
    if (type === 'IMAGE_ASSIGNED') {
      onImageAssigned(event.data)
    } else if (type === 'RENDERED_IMAGE_ASSIGNED') {
      scaleSelector.value = event.loadedScale
    } else if (
      type === 'IMAGE_HISTOGRAM_UPDATED' ||
      type === 'IMAGE_RENDERING_ACTIVE'
    ) {
      // set scale number after ADJUST_SCALE_FOR_FRAMERATE even if no scale change
      scaleSelector.value = context.images.actorContext.get(
        event.data.name
      ).loadedScale
    }
  })
}

export default scaleSelector
