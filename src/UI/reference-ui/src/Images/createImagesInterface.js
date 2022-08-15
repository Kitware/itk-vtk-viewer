import style from '../ItkVtkViewer.module.css'
import applyGroupVisibility from '../applyGroupVisibility'

import createComponentSelector from './createComponentSelector'
import createColorRangeInput from './createColorRangeInput'
import createTransferFunctionWidget from 'itk-viewer-transfer-function-editor/itk-vtk-viewer/createTransferFunctionWidget'
import createVolumeRenderingInputs from './createVolumeRenderingInputs'

import createLabelImageColorWidget from './createLabelImageColorWidget'
import createLabelImageWeightWidget from './createLabelImageWeightWidget'

function createImagesInterface(context) {
  const imagesUIGroup = document.createElement('div')
  imagesUIGroup.setAttribute('class', style.uiGroup)
  context.images.imagesUIGroup = imagesUIGroup
  context.uiGroups.set('images', imagesUIGroup)

  const componentAndScale = document.createElement('div')
  imagesUIGroup.appendChild(componentAndScale)
  componentAndScale.setAttribute('style', 'display: flex;')
  context.images.componentAndScale = componentAndScale

  createComponentSelector(context, componentAndScale)
  createColorRangeInput(context, imagesUIGroup)
  createTransferFunctionWidget(context, imagesUIGroup, style)
  createVolumeRenderingInputs(context, imagesUIGroup)

  context.uiContainer.appendChild(imagesUIGroup)

  createLabelImageColorWidget(context)
  createLabelImageWeightWidget(context)

  applyGroupVisibility(
    context,
    ['images', 'labelImages', 'labelImageWeights'],
    false
  )
}

export default createImagesInterface
