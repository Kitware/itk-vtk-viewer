import style from '../ItkVtkViewer.module.css'
import applyGroupVisibility from '../applyGroupVisibility'

import createScaleSelector from './createScaleSelector'
import createComponentSelector from './createComponentSelector'
import createColorRangeInput from './createColorRangeInput'
import createTransferFunctionWidget from './createTransferFunctionWidget'
import createVolumeRenderingInputs from './createVolumeRenderingInputs'

import createLabelImageColorWidget from './createLabelImageColorWidget'
import createLabelImageWeightWidget from './createLabelImageWeightWidget'

function createImagesInterface(context) {
  const imagesUIGroup = document.createElement('div')
  imagesUIGroup.setAttribute('class', style.uiGroup)
  context.images.imagesUIGroup = imagesUIGroup
  context.uiGroups.set('images', imagesUIGroup)

  createScaleSelector(context, imagesUIGroup)
  createComponentSelector(context, imagesUIGroup)
  createColorRangeInput(context, imagesUIGroup)
  createTransferFunctionWidget(context, imagesUIGroup)
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
