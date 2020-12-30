import style from '../ItkVtkViewer.module.css'

import createComponentSelector from './createComponentSelector'
import createColorRangeInput from './createColorRangeInput'
import createTransferFunctionWidget from './createTransferFunctionWidget'
import createVolumeRenderingInputs from './createVolumeRenderingInputs'

import createLabelImageColorWidget from './createLabelImageColorWidget'

function createImagesInterface(context) {
  const imagesUIGroup = document.createElement('div')
  imagesUIGroup.setAttribute('class', style.uiGroup)
  context.images.imagesUIGroup = imagesUIGroup

  createComponentSelector(context, imagesUIGroup)
  createColorRangeInput(context, imagesUIGroup)
  createTransferFunctionWidget(context, imagesUIGroup)
  createVolumeRenderingInputs(context, imagesUIGroup)

  createLabelImageColorWidget(context)

  context.uiContainer.appendChild(imagesUIGroup)
}

export default createImagesInterface
