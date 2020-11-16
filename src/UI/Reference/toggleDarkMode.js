import applyMainContrastSensitiveStyle from './Main/applyMainContrastSensitiveStyle'
import applyLayersContrastSensitiveStyle from './Layers/applyLayersContrastSensitiveStyle'

function toggleDarkMode(context) {
  applyMainContrastSensitiveStyle(context)
  applyLayersContrastSensitiveStyle(context)
}

export default toggleDarkMode
