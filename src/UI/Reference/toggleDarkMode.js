import applyMainContrastSensitiveStyle from './Main/applyMainContrastSensitiveStyle'
import applyLayersContrastSensitiveStyle from './Layers/applyLayersContrastSensitiveStyle'
import applyImagesContrastSensitiveStyle from './Images/applyImagesContrastSensitiveStyle'
import applyWidgetsContrastSensitiveStyle from './Widgets/applyWidgetsContrastSensitiveStyle'

function toggleDarkMode(context) {
  applyMainContrastSensitiveStyle(context)
  applyLayersContrastSensitiveStyle(context)
  applyImagesContrastSensitiveStyle(context)
  applyWidgetsContrastSensitiveStyle(context)
}

export default toggleDarkMode
