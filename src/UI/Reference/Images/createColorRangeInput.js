import vtkLookupTableProxy from 'vtk.js/Sources/Proxy/Core/LookupTableProxy'

import style from '../ItkVtkViewer.module.css'

//import applyPiecewiseFunctionOpacities from '../../Rendering/applyPiecewiseFunctionOpacities'
import createColorMapIconSelector from '../createColorMapIconSelector'
//import customColorMapIcon from '../customColorMapIcon'

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

  const minimumInput = document.createElement('input')
  minimumInput.type = 'number'
  minimumInput.setAttribute('class', style.numberInput)
  const maximumInput = document.createElement('input')
  maximumInput.type = 'number'
  maximumInput.setAttribute('class', style.numberInput)

  minimumInput.addEventListener('change', event => {
    event.preventDefault()
    event.stopPropagation()
    const name = context.images.selectedName
    const actorContext = context.images.actorContext.get(name)
    const currentRange = actorContext.colorRanges.get(
      actorContext.selectedComponentIndex
    )
    const newRange = [Number(event.target.value), currentRange[1]]
    context.service.send({
      type: 'IMAGE_COLOR_RANGE_CHANGED',
      data: {
        name,
        component: actorContext.selectedComponentIndex,
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
      actorContext.selectedComponentIndex
    )
    const newRange = [currentRange[0], Number(event.target.value)]
    context.service.send({
      type: 'IMAGE_COLOR_RANGE_CHANGED',
      data: {
        name,
        component: actorContext.selectedComponentIndex,
        range: newRange,
      },
    })
  })

  const colorMapSelector = document.createElement('div')
  colorMapSelector.id = `${viewerDOMId}-imageColorMapSelector`

  colorRangeInputRow.appendChild(minimumInput)
  colorRangeInputRow.appendChild(colorMapSelector)
  colorRangeInputRow.appendChild(maximumInput)

  const iconSelector = createColorMapIconSelector(colorMapSelector)
  context.images.iconSelector = iconSelector

  colorMapSelector.addEventListener('changed', event => {
    event.preventDefault()
    event.stopPropagation()
    const name = context.images.selectedName
    const actorContext = context.images.actorContext.get(name)
    const componentIndex = actorContext.selectedComponentIndex
    const colorMap = iconSelector.getSelectedValue()
    context.service.send({
      type: 'IMAGE_COLOR_MAP_CHANGED',
      data: { name, component: componentIndex, colorMap },
    })
  })
  context.images.colorMapSelector = colorMapSelector

  imageUIGroup.appendChild(colorRangeInputRow)
}

export default createColorRangeInput
