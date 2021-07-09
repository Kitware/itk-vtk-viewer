import style from './ItkVtkViewer.module.css'

function applyContrastSensitiveStyleToElement(context, cssClass, element) {
  if (element) {
    const uiDarkMode = context.uiDarkMode
    const addPostFix = uiDarkMode ? 'DarkBG' : 'BrightBG'
    const removePostFix = !uiDarkMode ? 'DarkBG' : 'BrightBG'
    const removeClass = style[`${cssClass}${removePostFix}`]
    if (element.classList.contains(removeClass)) {
      element.classList.remove(removeClass)
    }
    element.classList.add(style[`${cssClass}${addPostFix}`])
  }
}

export default applyContrastSensitiveStyleToElement
