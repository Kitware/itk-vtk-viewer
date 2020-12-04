import style from '../ItkVtkViewer.module.css'

import createComponentSelector from './createComponentSelector'
import createColorRangeInput from './createColorRangeInput'
import createTransferFunctionWidget from './createTransferFunctionWidget'
import createVolumeRenderingInputs from './createVolumeRenderingInputs'

function createImagesInterface(context) {
  const imagesUIGroup = document.createElement('div')
  imagesUIGroup.setAttribute('class', style.uiGroup)
  context.images.imagesUIGroup = imagesUIGroup

  createComponentSelector(context, imagesUIGroup)
  createColorRangeInput(context, imagesUIGroup)
  createTransferFunctionWidget(context, imagesUIGroup)
  createVolumeRenderingInputs(context, imagesUIGroup)

  context.uiContainer.appendChild(imagesUIGroup)
}

export default createImagesInterface
