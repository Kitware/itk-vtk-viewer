import style from './ItkVtkViewer.module.css'
import { autorun, reaction } from 'mobx'

function applyContrastSensitiveStyleToElement(event, cssClass, element) {
  const isBackgroundDark = event.type === 'UI_DARK_MODE'
  const addPostFix = isBackgroundDark ? 'DarkBG' : 'BrightBG'
  const removePostFix = !isBackgroundDark ? 'DarkBG' : 'BrightBG'
  const removeClass = style[`${cssClass}${removePostFix}`]
  if (element.classList.contains(removeClass)) {
    element.classList.remove(removeClass)
  }
  element.classList.add(style[`${cssClass}${addPostFix}`])
}

export default applyContrastSensitiveStyleToElement
