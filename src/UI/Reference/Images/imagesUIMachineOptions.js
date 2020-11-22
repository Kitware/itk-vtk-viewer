import createImagesInterface from './createImagesInterface'
import updateImageInterface from './updateImageInterface'
import selectImageComponent from './selectImageComponent'
import applyComponentVisibility from './applyComponentVisibility'
import applyColorRange from './applyColorRange'
import applyColorRangeBounds from './applyColorRangeBounds'
import applyColorMap from './applyColorMap'

const imagesUIMachineOptions = {
  actions: {
    createImagesInterface,

    updateImageInterface,

    selectImageComponent,

    applyComponentVisibility,
    applyColorRange,
    applyColorRangeBounds,
    applyColorMap,
  },
}

export default imagesUIMachineOptions
