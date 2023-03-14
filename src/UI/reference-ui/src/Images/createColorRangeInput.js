import style from '../ItkVtkViewer.module.css'

import createInterpolationButton from './createInterpolationButton'
import createColorMapIconSelector from '../createColorMapIconSelector'
import createWindowLevelReset from './createWindowLevelReset'

function createColorRangeInput(context, imageUIGroup) {
  const viewerDOMId = context.id

  const colorRangeInputRow = document.createElement('div')
  colorRangeInputRow.setAttribute('class', style.uiRow)
  // This row needs background different from normal uiRows, to aid
  // in the illusion that it's the content portion of a tabbed pane
  colorRangeInputRow.setAttribute(
    'style',
    'background: rgba(127, 127, 127, 0.5);'
  )
  context.images.colorRangeInputRow = colorRangeInputRow
  createInterpolationButton(context, colorRangeInputRow)

  const minimumInput = document.createElement('input')
  minimumInput.type = 'number'
  minimumInput.setAttribute('class', style.numberInput)
  const minimumDiv = document.createElement('div')
  minimumDiv.setAttribute('itk-vtk-tooltip', '')
  minimumDiv.setAttribute('itk-vtk-tooltip-top-input', '')
  minimumDiv.setAttribute('itk-vtk-tooltip-content', 'Color range min')
  minimumDiv.appendChild(minimumInput)
  const maximumInput = document.createElement('input')
  maximumInput.type = 'number'
  maximumInput.setAttribute('class', style.numberInput)
  const maximumDiv = document.createElement('div')
  maximumDiv.setAttribute('itk-vtk-tooltip', '')
  maximumDiv.setAttribute('itk-vtk-tooltip-top-input', '')
  maximumDiv.setAttribute('itk-vtk-tooltip-content', 'Color range max')
  maximumDiv.appendChild(maximumInput)

  minimumInput.addEventListener('change', event => {
    event.preventDefault()
    event.stopPropagation()
    const name = context.images.selectedName
    const actorContext = context.images.actorContext.get(name)
    const currentRange = actorContext.colorRanges.get(
      actorContext.selectedComponent
    )
    let newRange = []
    if (actorContext.windowLevelEnabled) {
      const level = (currentRange[1] + currentRange[0]) / 2
      const width = Number(event.target.value)
      newRange = [level - width / 2, level + width / 2]
    } else {
      newRange = [Number(event.target.value), currentRange[1]]
    }
    context.service.send({
      type: 'IMAGE_COLOR_RANGE_CHANGED',
      data: {
        name,
        component: actorContext.selectedComponent,
        range: newRange,
      },
    })
  })
  maximumInput.addEventListener('change', event => {
    event.preventDefault()
    event.stopPropagation()
    const name = context.images.selectedName
    const actorContext = context.images.actorContext.get(name)
    const currentRange = actorContext.colorRanges.get(
      actorContext.selectedComponent
    )
    let newRange = []
    if (actorContext.windowLevelEnabled) {
      const width = currentRange[1] - currentRange[0]
      const level = Number(event.target.value)
      newRange = [level - width / 2, level + width / 2]
    } else {
      newRange = [currentRange[0], Number(event.target.value)]
    }
    context.service.send({
      type: 'IMAGE_COLOR_RANGE_CHANGED',
      data: {
        name,
        component: actorContext.selectedComponent,
        range: newRange,
      },
    })
  })

  const colorMapSelector = document.createElement('div')
  colorMapSelector.id = `${viewerDOMId}-imageColorMapSelector`

  colorRangeInputRow.appendChild(minimumDiv)
  colorRangeInputRow.appendChild(colorMapSelector)
  colorRangeInputRow.appendChild(maximumDiv)

  const iconSelector = createColorMapIconSelector(colorMapSelector)
  context.images.iconSelector = iconSelector

  colorMapSelector.addEventListener('changed', event => {
    event.preventDefault()
    event.stopPropagation()
    const name = context.images.selectedName
    const actorContext = context.images.actorContext.get(name)
    const componentIndex = actorContext.selectedComponent
    const colorMap = iconSelector.getSelectedValue()
    const currentColorMap = actorContext.colorMaps.get(componentIndex)
    if (currentColorMap !== colorMap) {
      context.service.send({
        type: 'IMAGE_COLOR_MAP_CHANGED',
        data: { name, component: componentIndex, colorMap },
      })
    }
  })
  context.images.colorMapSelector = colorMapSelector

  createWindowLevelReset(context, colorRangeInputRow)

  imageUIGroup.appendChild(colorRangeInputRow)
}

export default createColorRangeInput
