import {
  playIconDataUri,
  pauseIconDataUri,
  rotateIconDataUri,
} from '@itk-viewer/icons'
import style from '../ItkVtkViewer.module.css'
import { makeHtml } from '../utils'

export const compareUI = context => (send, onReceive) => {
  const root = document.createElement('div')
  root.setAttribute(
    'style',
    'align-self: center; align-content: center; margin-left: 4px; margin-right: 4px'
  )
  const parent = context.layers.compareContainer
  parent.appendChild(root)

  const checkerboardUi = makeHtml(`
    <div style="display: flex; justify-content: space-between;">
      <label class="${style.inputLabel}">Checkerboard Pattern X</label>
      <input id="x-pattern" type="number" class="${style.selector} ${style.numberInput}" style="max-width: 3.2ch" />
      <label class="${style.inputLabel}">Y</label>
      <input type="number" class="${style.selector} ${style.numberInput}" style="max-width: 3.2ch" />
      <label class="${style.inputLabel}">Z</label>
      <input type="number" class="${style.selector} ${style.numberInput}" style="max-width: 3.2ch" />
    </div>
  `)
  root.appendChild(checkerboardUi)

  const swapButtonId = `${context.id}-swapImageOrder`
  const playImageMixButtonId = `${context.id}-image-mix-play`
  const playImageMixImgId = `${context.id}-image-mix-play-img`
  const imageMixRoot = makeHtml(`
    <div style="display: flex; justify-content: space-between;">
      <label class="${style.inputLabel}">Image Mix</label>
      <input id="${playImageMixButtonId}" type="checkbox" class="${style.toggleInput}">
        <label itk-vtk-tooltip itk-vtk-tooltip-top-annotations itk-vtk-tooltip-content="animate" class="${style.visibleButton} ${style.noFlexBasis} ${style.toggleButton}" for="${playImageMixButtonId}">
          <img src="${playIconDataUri}" id="${playImageMixImgId}" alt="animate" />
        </label>
      </input>
      <input type="range" min="0" max="1" step=".01" value=".5" 
        class="${style.slider}" />
      <input type="checkbox" id="${swapButtonId}" class="${style.toggleInput}">
        <label for="${swapButtonId}" itk-vtk-tooltip itk-vtk-tooltip-left-fullscreen itk-vtk-tooltip-content="Swap image" class="${style.rotateButton} ${style.toggleButton}">
          <img src="${rotateIconDataUri}" alt="rotate"/>
        </label>
      </input>
    </div>
  `)
  root.appendChild(imageMixRoot)

  const [xPattern, yPattern, zPattern] = checkerboardUi.querySelectorAll(
    'input'
  )

  const [
    animateImageMix,
    imageMixSlider,
    swapOrder,
  ] = imageMixRoot.querySelectorAll('input')
  const animateImageImg = imageMixRoot.querySelector(`#${playImageMixImgId}`)

  const update = () => {
    const name = context.images.selectedName
    const imageContext = context.images.actorContext.get(name)
    const { compare = undefined } = imageContext ?? {}
    const { method = undefined, checkerboard } = compare ?? {}

    if (method && method !== 'disabled') root.style.display = 'block'
    else root.style.display = 'none'

    if (checkerboard) {
      checkerboardUi.style.display = 'flex'
    } else {
      checkerboardUi.style.display = 'none'
    }

    const [x, y, z] = compare?.pattern ?? []
    xPattern.value = x
    yPattern.value = y
    zPattern.value = z
    swapOrder.checked = !!compare?.swapImageOrder ?? false

    imageMixSlider.value = compare?.imageMix ?? 0.5

    animateImageImg.src = imageContext?.imageMixAnimation
      ? pauseIconDataUri
      : playIconDataUri
  }

  update()

  const updateCompare = options => {
    const name = context.images.selectedName
    const imageContext = context.images.actorContext.get(name)
    const { compare } = imageContext
    context.service.send({
      type: 'COMPARE_IMAGES',
      data: {
        name,
        fixedImageName: compare.fixedImageName,
        options: { ...options },
      },
    })
  }

  const parsePattern = value => Math.max(1, parseInt(value))

  xPattern.addEventListener('change', event => {
    event.preventDefault()
    event.stopPropagation()

    const [, ...yz] =
      context.images.actorContext.get(context.images.selectedName).compare
        .pattern ?? []

    const x = parsePattern(event.target.value)
    updateCompare({ pattern: [x, ...yz] })
  })

  yPattern.addEventListener('change', event => {
    event.preventDefault()
    event.stopPropagation()

    const [x, , z] =
      context.images.actorContext.get(context.images.selectedName).compare
        .pattern ?? []

    const y = parsePattern(event.target.value)
    updateCompare({ pattern: [x, y, z] })
  })

  zPattern.addEventListener('change', event => {
    event.preventDefault()
    event.stopPropagation()

    const [x, y] =
      context.images.actorContext.get(context.images.selectedName).compare
        .pattern ?? []

    const z = parsePattern(event.target.value)
    updateCompare({ pattern: [x, y, z] })
  })

  animateImageMix.addEventListener('input', event => {
    event.preventDefault()
    event.stopPropagation()

    const name = context.images.selectedName
    context.service.send({
      type: 'ANIMATE_IMAGE_MIX',
      data: {
        name,
        play: event.target.checked,
      },
    })
  })

  imageMixSlider.addEventListener('input', event => {
    event.preventDefault()
    event.stopPropagation()

    updateCompare({ imageMix: event.target.value })
  })

  swapOrder.addEventListener('change', event => {
    event.preventDefault()
    event.stopPropagation()

    updateCompare({ swapImageOrder: event.target.checked })
  })

  onReceive(event => {
    const { type } = event
    if (type === 'COMPARE_UPDATED') {
      update()
    }
  })
}
