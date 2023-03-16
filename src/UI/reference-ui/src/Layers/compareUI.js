import { rotateIconDataUri } from 'itk-viewer-icons'
import style from '../ItkVtkViewer.module.css'
import { makeHtml } from '../utils'

export const compareUI = context => (send, onReceive) => {
  const root = document.createElement('div')
  root.setAttribute(
    'style',
    'align-self: center; align-content: center; height: 25px; margin-left: 4px; margin-right: 4px'
  )
  const parent = context.layers.compareContainer
  parent.appendChild(root)

  const swapButtonId = `${context.id}-swapImageOrder`
  const checkerboardRoot = makeHtml(`
    <div style="display: flex; justify-content: space-between;">
      <label class="${style.inputLabel}">Checkerboard Pattern X:</label>
      <input id="x-pattern" type="number" class="${style.selector} ${style.numberInput}" style="max-width: 3.2ch" />
      <label class="${style.inputLabel}">Y:</label>
      <input type="number" class="${style.selector} ${style.numberInput}" style="max-width: 3.2ch" />
      <label class="${style.inputLabel}">Z:</label>
      <input type="number" class="${style.selector} ${style.numberInput}" style="max-width: 3.2ch" />
      <input type="checkbox" id="${swapButtonId}" class="${style.toggleInput}"><label for="${swapButtonId}" itk-vtk-tooltip itk-vtk-tooltip-left-fullscreen itk-vtk-tooltip-content="Swap image order" class="${style.rotateButton} ${style.toggleButton}"><img src="${rotateIconDataUri}" alt="rotate"/></label></input>
    </div>
  `)

  const [
    xPattern,
    yPattern,
    zPattern,
    swapOrder,
  ] = checkerboardRoot.querySelectorAll('input')

  const update = () => {
    const name = context.images.selectedName
    const imageContext = context.images.actorContext.get(name)
    const { compare = undefined } = imageContext ?? {}
    const { method = undefined } = compare ?? {}

    if (!method || method === 'disable') {
      root.style.display = 'none'
    } else {
      root.style.display = 'block'
      if (method === 'checkerboard') {
        if (root.firstChild) root.removeChild(root.firstChild)
        root.appendChild(checkerboardRoot)

        const compare = context.images.actorContext.get(
          context.images.selectedName
        ).compare
        const [x, y, z] = compare.pattern ?? []
        xPattern.value = x
        yPattern.value = y
        zPattern.value = z
        swapOrder.checked = !!compare.swapImageOrder
      }
    }
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
        options: { ...compare, ...options },
      },
    })
  }
  xPattern.addEventListener('change', event => {
    event.preventDefault()
    event.stopPropagation()

    const [, ...yz] =
      context.images.actorContext.get(context.images.selectedName).compare
        .pattern ?? []

    const x = parseInt(event.target.value)
    updateCompare({ pattern: [x, ...yz] })
  })
  yPattern.addEventListener('change', event => {
    event.preventDefault()
    event.stopPropagation()

    const [x, , z] =
      context.images.actorContext.get(context.images.selectedName).compare
        .pattern ?? []

    const y = parseInt(event.target.value)
    updateCompare({ pattern: [x, y, z] })
  })
  zPattern.addEventListener('change', event => {
    event.preventDefault()
    event.stopPropagation()

    const [x, y] =
      context.images.actorContext.get(context.images.selectedName).compare
        .pattern ?? []

    const z = parseInt(event.target.value)
    updateCompare({ pattern: [x, y, z] })
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
