import style from './ItkVtkViewer.module.css';

function getContrastSensitiveStyle(cssClasses, isBackgroundDark) {
  const stylePostFix = isBackgroundDark ? 'DarkBG' : 'BrightBG';
  const contrastSensitiveStyle = {};
  cssClasses.forEach((name) => {
    contrastSensitiveStyle[name] = style[`${name}${stylePostFix}`];
  });
  return contrastSensitiveStyle;
}

export default getContrastSensitiveStyle;
