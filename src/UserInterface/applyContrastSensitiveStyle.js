import style from './ItkVtkViewer.module.css';
import { autorun, reaction } from 'mobx';

function applyContrastSensitiveStyle(store, cssClass, element) {
  autorun(() => {
    const isBackgroundDark = store.isBackgroundDark;
    const addPostFix = isBackgroundDark ? 'DarkBG' : 'BrightBG';
    const removePostFix = !isBackgroundDark ? 'DarkBG' : 'BrightBG';
    const removeClass = style[`${cssClass}${removePostFix}`];
    if (element.classList.contains(removeClass)) {
      element.classList.remove(removeClass);
    }
    element.classList.add(style[`${cssClass}${addPostFix}`]);
  })
}

export default applyContrastSensitiveStyle;
