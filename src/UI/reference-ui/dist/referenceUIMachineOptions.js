function styleInject(css, ref) {
  if (ref === void 0) ref = {}
  var insertAt = ref.insertAt

  if (!css || typeof document === 'undefined') {
    return
  }

  var head = document.head || document.getElementsByTagName('head')[0]
  var style = document.createElement('style')
  style.type = 'text/css'

  if (insertAt === 'top') {
    if (head.firstChild) {
      head.insertBefore(style, head.firstChild)
    } else {
      head.appendChild(style)
    }
  } else {
    head.appendChild(style)
  }

  if (style.styleSheet) {
    style.styleSheet.cssText = css
  } else {
    style.appendChild(document.createTextNode(css))
  }
}

var css_248z$1 =
  ".ItkVtkViewer-module_loading__11c63 {\n  border: 16px solid #f3f3f3; /* Light grey */\n  border-top: 16px solid #3498db; /* Blue */\n  border-radius: 50%;\n  width: 120px;\n  height: 120px;\n  position: absolute;\n  left: calc(50% - 60px);\n  top: calc(50% - 60px);\n  -webkit-animation: ItkVtkViewer-module_spin__mT5S6 2s linear infinite;\n          animation: ItkVtkViewer-module_spin__mT5S6 2s linear infinite;\n  box-sizing: border-box;\n}\n\n@-webkit-keyframes ItkVtkViewer-module_spin__mT5S6 {\n  0% { transform: rotate(0deg); }\n  100% { transform: rotate(360deg); }\n}\n\n@keyframes ItkVtkViewer-module_spin__mT5S6 {\n  0% { transform: rotate(0deg); }\n  100% { transform: rotate(360deg); }\n}\n\n.ItkVtkViewer-module_viewContainer__-5zNz {\n  position: absolute;\n  top: 0;\n  left: 0;\n  bottom: 0;\n  right: 0;\n  display: flex;\n  flex-direction: column;\n  background: rgba(128, 128, 128, 0.8);\n}\n\n.ItkVtkViewer-module_uiContainer__CiawP {\n  display: flex;\n  align-items: stretch;\n  flex-direction: column;\n  justify-content: space-between;\n  position: absolute;\n  top: 5px;\n  left: 5px;\n  padding: 2px;\n  border: 0px;\n  box-sizing: border-box;\n  z-index: 1000;\n}\n\n.ItkVtkViewer-module_uiGroup__ad-WI {\n  background: rgba(128, 128, 128, 0.5);\n  border-radius: 4px;\n  margin: 2px;\n}\n\n.ItkVtkViewer-module_uiRow__KTQa8 {\n  display: flex;\n  flex-direction: row;\n  flex: 1;\n  align-items: center;\n  justify-content: space-between;\n  padding: 5px;\n}\n\n.ItkVtkViewer-module_mainUIRow__vTXih {\n  justify-content: space-around;\n  max-width: 420px;\n}\n\n.ItkVtkViewer-module_planeUIRow__D5gCh {\n  background: rgba(128, 128, 128, 0.5);\n}\n\n.ItkVtkViewer-module_layersUIRow__0LDm5 {\n  justify-content: space-around;\n  max-width: 420px;\n}\n\n.ItkVtkViewer-module_progress__WydXH {\n  color: white;\n  font-size: 200%;\n  height: 100vh;\n  width: 100vw;\n  text-align: center;\n  vertical-align: middle;\n  line-height: 100vh;\n}\n\n.ItkVtkViewer-module_piecewiseWidget__5gKl5 {\n  flex: 1;\n  background: rgba(255, 255, 255, 0.2);\n  border-radius: 3px;\n  z-index: 1000;\n}\n\n.ItkVtkViewer-module_logo__9ErCF {\n  position: absolute;\n  top: 5px;\n  right: 5px;\n  height: 2.0em;\n  width: 2.0em;\n  cursor: pointer;\n  z-index: 100;\n}\n\n.ItkVtkViewer-module_fpsMonitor__bnwqr {\n  position: absolute;\n  top: 5px;\n  right: 5px;\n  border-radius: 5px;\n  background: rgba(255, 255, 255, 0.6);\n  cursor: pointer;\n  z-index: 101;\n}\n\n[itk-vtk-tooltip] {\n    position: relative;\n}\n[itk-vtk-tooltip]::before {\n    content: attr(itk-vtk-tooltip-content);\n    visibility: hidden;\n    position: absolute;\n    top: 50%;\n    right: calc(100% + 16px);\n    width: 400%;\n    padding: 4px 6px;\n    text-align: center;\n    text-transform: none;\n    font-size: 0.9em;\n    font-family: monospace;\n    border-radius: 3px;\n    background: rgba(0.9, 0.9, 0.9, 0.95);\n    color: white;\n    opacity: 0;\n    transform: translate(15px, -50%);\n    transition-property: all;\n    transition-duration: 0.3s;\n    transition-timing-function: ease-in-out;\n    transition-delay: 0.8s;\n    z-index: 1;\n}\n\n[itk-vtk-tooltip]:hover::before {\n    opacity: 1;\n    visibility: visible;\n    transform: translate(0, -50%);\n}\n\n[itk-vtk-tooltip-bottom]::before {\n    top: calc(100% + 16px);\n    left: 50%;\n    right: initial;\n    transform: translate(-50%, -15px);\n}\n[itk-vtk-tooltip-bottom]:hover::before {\n    transform: translate(-50%, 0)\n}\n[itk-vtk-tooltip-right]::before {\n    top: 50%;\n    left: calc(100% + 16px);\n    right: initial;\n    transform: translate(-15px, -50%);\n}\n[itk-vtk-tooltip-right]:hover::before {\n    transform: translate(0, -50%);\n}\n\n[itk-vtk-tooltip-top-screenshot]::before {\n    top: initial;\n    left: 260%;\n    right: initial;\n    bottom: calc(100% + 8px);\n    transform: translate(-50%, 15px);\n}\n[itk-vtk-tooltip-top-screenshot]:hover::before {\n    transform: translate(-50%, 0);\n}\n[itk-vtk-tooltip-top-annotations]::before {\n    top: initial;\n    left: 160%;\n    right: initial;\n    bottom: calc(100% + 10px);\n    transform: translate(-50%, 15px);\n}\n[itk-vtk-tooltip-top-annotations]:hover::before {\n    transform: translate(-50%, 0);\n}\n[itk-vtk-tooltip-top-axes]::before {\n    top: initial;\n    left: 160%;\n    right: initial;\n    bottom: calc(100% + 10px);\n    transform: translate(-50%, 15px);\n}\n[itk-vtk-tooltip-top-axes]:hover::before {\n    transform: translate(-50%, 0);\n}\n[itk-vtk-tooltip-top-fullscreen]::before {\n    top: initial;\n    left: 120%;\n    right: initial;\n    bottom: calc(100% + 10px);\n    transform: translate(-50%, 15px);\n    width: 400%;\n}\n[itk-vtk-tooltip-top-fullscreen]:hover::before {\n    transform: translate(-50%, 0);\n}\n[itk-vtk-tooltip-top]::before {\n    top: initial;\n    left: 60%;\n    right: initial;\n    bottom: calc(100% + 10px);\n    transform: translate(-50%, 15px);\n}\n[itk-vtk-tooltip-top]:hover::before {\n    transform: translate(-50%, 0);\n}\n[itk-vtk-tooltip-top-fullscreen]::before {\n    top: initial;\n    left: 120%;\n    right: initial;\n    bottom: calc(100% + 10px);\n    transform: translate(-50%, 15px);\n    width: 400%;\n}\n\n.ItkVtkViewer-module_layerEntryCommon__oIE1u {\n  flex: 1;\n  display: flex;\n  flex-direction: row;\n  align-items: stretch;\n  justify-content: space-between;\n  border-style: solid;\n  border-width: 2px;\n  border-radius: 10%;\n}\n\n.ItkVtkViewer-module_layerEntryBrightBG__qXyI2 {\n  border-color: #666;\n}\n\n.ItkVtkViewer-module_layerEntryDarkBG__BmiCj {\n  border-color: #AAA;\n}\n\n.ItkVtkViewer-module_layerLabelCommon__kTiO9 {\n  border: none;\n  background: transparent;\n  font-size: 1.2em;\n  margin-right: 10px;\n  z-index: 1000;\n}\n\n.ItkVtkViewer-module_layerLabelBrightBG__vAfex {\n  color: black;\n}\n\n.ItkVtkViewer-module_layerLabelDarkBG__sM6Bg {\n  color: white;\n}\n\n.ItkVtkViewer-module_visibleButton__ezrIc {\n  flex-basis: 2.5em;\n  cursor: pointer;\n  z-index: 1000;\n}\n\n.ItkVtkViewer-module_visibleButton__ezrIc img {\n  height: 1.2em;\n  width: 1.2em;\n  padding-top: 2px;\n  padding-bottom: 2px;\n  padding-left: 6px;\n  padding-right: 6px;\n}\n\n.ItkVtkViewer-module_layerIcon__v-rxO img {\n  height: 1.2em;\n  width: 1.2em;\n  padding-top: 2px;\n  padding-bottom: 2px;\n  padding-left: 8px;\n  padding-right: 6px;\n}\n\n.ItkVtkViewer-module_tooltipButtonBrightBG__yffVf::before {\n}\n\n.ItkVtkViewer-module_tooltipButtonDarkBG__gEu0i::before {\n  filter: invert(100%);\n  -webkit-filter: invert(100%);\n}\n\n.ItkVtkViewer-module_invertibleButtonBrightBG__VmIfT {\n}\n\n.ItkVtkViewer-module_invertibleButtonDarkBG__GoKgD {\n  filter: invert(100%);\n  -webkit-filter: invert(100%);\n}\n\n.ItkVtkViewer-module_collapseUIButton__Ac6-L {\n  height: 1.5em;\n  width: 1.5em;\n  cursor: pointer;\n  z-index: 1000;\n}\n\n.ItkVtkViewer-module_screenshotButton__OL4Na {\n  flex: 1;\n  width: 8mm;\n  padding-top: 2px;\n  padding-bottom: 2px;\n  padding-left: 6px;\n  padding-right: 6px;\n  cursor: pointer;\n  z-index: 1000;\n}\n\n.ItkVtkViewer-module_screenshotButton__OL4Na img {\n  height: 1.2em;\n  width: 1.2em;\n}\n\n.ItkVtkViewer-module_annotationsButton__Msb-p {\n  flex: 1;\n  width: 8mm;\n  padding-top: 2px;\n  padding-bottom: 2px;\n  padding-left: 6px;\n  padding-right: 6px;\n  cursor: pointer;\n  z-index: 1000;\n}\n\n.ItkVtkViewer-module_annotationsButton__Msb-p img {\n  height: 1.2em;\n  width: 1.2em;\n}\n\n.ItkVtkViewer-module_axesButton__k2H6p {\n  flex: 1;\n  width: 8mm;\n  padding-top: 2px;\n  padding-bottom: 2px;\n  padding-left: 6px;\n  padding-right: 6px;\n  cursor: pointer;\n  z-index: 1000;\n}\n\n.ItkVtkViewer-module_axesButton__k2H6p img {\n  height: 1.2em;\n  width: 1.2em;\n}\n\n.ItkVtkViewer-module_fullscreenButton__en3Z5 {\n  flex: 1;\n  width: 8m;\n  padding-top: 2px;\n  padding-bottom: 2px;\n  padding-left: 6px;\n  padding-right: 6px;\n  cursor: pointer;\n  z-index: 1000;\n}\n\n.ItkVtkViewer-module_fullscreenButton__en3Z5 img {\n  height: 1.2em;\n  width: 1.2em;\n}\n\n.ItkVtkViewer-module_interpolationButton__2P0HJ {\n  flex: 1;\n  width: 8mm;\n  padding-top: 2px;\n  padding-bottom: 2px;\n  padding-left: 2px;\n  padding-right: 4px;\n  cursor: pointer;\n  z-index: 1000;\n}\n\n.ItkVtkViewer-module_interpolationButton__2P0HJ img {\n  height: 1.2em;\n  width: 1.2em;\n}\n\n.ItkVtkViewer-module_cropButton__ljwuU {\n  flex: 1;\n  height: 8mm;\n  padding-top: 2px;\n  padding-bottom: 2px;\n  padding-left: 6px;\n  padding-right: 6px;\n  cursor: pointer;\n  z-index: 1000;\n}\n\n.ItkVtkViewer-module_cropButton__ljwuU img {\n  height: 1.2em;\n  width: 1.2em;\n}\n\n.ItkVtkViewer-module_resetCropButton__SCGTH {\n  flex: 1;\n  width: 8mm;\n  padding-top: 2px;\n  padding-bottom: 2px;\n  padding-left: 6px;\n  padding-right: 6px;\n  cursor: pointer;\n  z-index: 1000;\n}\n\n.ItkVtkViewer-module_resetCropButton__SCGTH img {\n  height: 1.2em;\n  width: 1.2em;\n}\n\n.ItkVtkViewer-module_distanceEntry__zXMUS {\n  flex: 1;\n  display: flex;\n  flex-direction: row;\n  align-items: self-start;\n}\n\n.ItkVtkViewer-module_distanceButton__NhxBT {\n  flex: 1;\n  height: 8mm;\n  padding-top: 2px;\n  padding-bottom: 2px;\n  padding-left: 6px;\n  padding-right: 6px;\n  cursor: pointer;\n  z-index: 1000;\n}\n\n.ItkVtkViewer-module_distanceButton__NhxBT img {\n  height: 1.2em;\n  width: 1.2em;\n}\n\n.ItkVtkViewer-module_distanceLabelCommon__Ec-uc {\n  border: none;\n  background: transparent;\n  font-size: 1.2em;\n  margin-right: 10px;\n  z-index: 1000;\n}\n\n.ItkVtkViewer-module_distanceLabelBrightBG__aYmfG {\n  color: black;\n}\n\n.ItkVtkViewer-module_distanceLabelDarkBG__kYXvI {\n  color: white;\n}\n\n.ItkVtkViewer-module_distanceInput__gyNaU {\n  background: transparent;\n  color: white;\n  font-size: 1.0em;\n  width: 80px;\n}\n\n.ItkVtkViewer-module_resetCameraButton__l9FGp {\n  flex: 1;\n  width: 8mm;\n  padding-top: 2px;\n  padding-bottom: 2px;\n  padding-left: 6px;\n  padding-right: 6px;\n  cursor: pointer;\n  z-index: 1000;\n}\n\n.ItkVtkViewer-module_resetCameraButton__l9FGp img {\n  height: 1.2em;\n  width: 1.2em;\n}\n\n.ItkVtkViewer-module_bgColorButton__yrjOX {\n  flex: 1;\n  width: 8mm;\n  padding-top: 2px;\n  padding-bottom: 2px;\n  padding-left: 6px;\n  padding-right: 6px;\n  cursor: pointer;\n  z-index: 1000;\n}\n\n.ItkVtkViewer-module_bgColorButton__yrjOX img {\n  height: 1.2em;\n  width: 1.2em;\n}\n\n.ItkVtkViewer-module_viewModeButton__OtTng {\n  flex: 1;\n  width: 8mm;\n  padding-top: 2px;\n  padding-bottom: 2px;\n  padding-left: 6px;\n  padding-right: 6px;\n  cursor: pointer;\n  z-index: 1000;\n}\n\n.ItkVtkViewer-module_viewModeButton__OtTng img {\n  width: 1.3em;\n  height: 1.3em;\n}\n\n.ItkVtkViewer-module_shadowButton__09fEk {\n  width: 8mm;\n  padding: 4px;\n  padding-left: 0px;\n  cursor: pointer;\n  z-index: 1000;\n}\n\n.ItkVtkViewer-module_shadowButton__09fEk img {\n  width: 1.3em;\n  height: 1.3em;\n}\n\n\n.ItkVtkViewer-module_viewPlanesButton__rSnuZ {\n  flex: 1;\n  width: 8mm;\n  padding-top: 2px;\n  padding-bottom: 2px;\n  padding-left: 0px;\n  padding-right: 6px;\n  cursor: pointer;\n  z-index: 1000;\n}\n\n.ItkVtkViewer-module_viewPlanesButton__rSnuZ img {\n  width: 1.3em;\n  height: 1.3em;\n}\n\n.ItkVtkViewer-module_toggleInput__jHLTo {\n  margin: 0px;\n  width: 0%;\n  opacity: 0;\n  box-sizing: content-box;\n}\n\n.ItkVtkViewer-module_toggleButton__qHhHZ {\n  cursor: pointer;\n  border-radius: 0.2em;\n  opacity: 0.45;\n}\n\ninput:checked.ItkVtkViewer-module_toggleInput__jHLTo + label {\n  opacity: 1.0;\n}\n\n.ItkVtkViewer-module_numberInput__pDxYH {\n  color: white;\n  background: transparent;\n  font-size: 1.0em;\n  padding-left: 2px;\n  width: 70px;\n}\n\n.ItkVtkViewer-module_selector__yw8l- {\n  display: flex;\n  direction: row;\n  font-size: 1.2em;\n  z-index: 1000;\n}\n\n.ItkVtkViewer-module_componentTab__6KSJF {\n  position: absolute;\n  opacity: 0;\n  pointer-events: none;\n}\n\n.ItkVtkViewer-module_disableInterface__CGB4S {\n  pointer-events: none;\n  opacity: 0.5;\n}\n\n.ItkVtkViewer-module_componentTab__6KSJF + .ItkVtkViewer-module_compTabLabel__8u4iU {\n  background: rgba(40, 40, 40, 0.5);\n  padding: 5px;\n  margin-right: 2px;\n  border-radius: 5px 5px 0px 0px;\n  color: #777;\n}\n\n.ItkVtkViewer-module_componentTab__6KSJF:hover + .ItkVtkViewer-module_compTabLabel__8u4iU {\n  background: rgba(90, 90, 90, 0.5);\n}\n\n.ItkVtkViewer-module_componentTab__6KSJF:checked + .ItkVtkViewer-module_compTabLabel__8u4iU {\n  background: rgba(127, 127, 127, 0.5);\n  color: #FFF;\n}\n\n.ItkVtkViewer-module_componentVisibility__y1rRS {\n  position: relative;\n  top: -2px;\n  margin-left: 10px;\n}\n\nselect {\n  -moz-appearance: none;\n}\n\nselect option {\n  color: black;\n}\n\nselect:focus {\n  outline: none;\n  border: none;\n}\n\n.ItkVtkViewer-module_sampleDistanceButton__NjT0o {\n  width: 8mm;\n  padding: 4px;\n  padding-left: 6px;\n  z-index: 1000;\n}\n\n.ItkVtkViewer-module_sampleDistanceButton__NjT0o img {\n  width: 1.2em;\n  height: 1.2em;\n}\n\n.ItkVtkViewer-module_blendModeButton__cit1w {\n  width: 8mm;\n  padding: 4px;\n  padding-left: 8px;\n  padding-right: 0px;\n  z-index: 1000;\n}\n\n.ItkVtkViewer-module_blendModeButton__cit1w img {\n  width: 1.2em;\n  height: 1.2em;\n}\n\n.ItkVtkViewer-module_gradientOpacitySlider__wkEqP {\n  width: 8mm;\n  padding: 4px;\n  padding-left: 6px;\n  padding-right: 0px;\n  z-index: 1000;\n}\n\n.ItkVtkViewer-module_gradientOpacitySlider__wkEqP img {\n  width: 1.2em;\n  height: 1.2em;\n}\n\n.ItkVtkViewer-module_sliderEntry__3r3gO {\n  flex: 1;\n  display: flex;\n  flex-direction: row;\n  align-items: center;\n}\n\n.ItkVtkViewer-module_slider__eT9qm {\n  flex: 1;\n  min-height: 1rem;\n  width: 5px;\n}\n\n.ItkVtkViewer-module_planeLabel__E1zOk {\n  padding-left: 6px;\n  padding: 2px;\n  display: block;\n  font-size: 1.1em;\n  font-family: monospace;\n  color: black;\n  border-width: 2px;\n  border-radius: 10%;\n}\n\n.ItkVtkViewer-module_xPlaneLabel__wK4Cb {\n  background-color: #ef5350;\n}\n\n.ItkVtkViewer-module_yPlaneLabel__rIm0j {\n  background-color: #fdd835;\n}\n\n.ItkVtkViewer-module_zPlaneLabel__94NL7 {\n  background-color: #4caf50;\n}\n\n.ItkVtkViewer-module_gradientOpacityScale__NrqOZ {\n  z-index: 1100;\n  position: relative;\n}\n\n.ItkVtkViewer-module_gradientOpacityScale__NrqOZ input {\n  position: absolute;\n  bottom: 20px;\n  left: -24px;\n  width: 12px;\n  -ms-writing-mode: bt-lr;\n      writing-mode: bt-lr;\n  -webkit-appearance: slider-vertical;\n}\n\n.ItkVtkViewer-module_bigFileDrop__cZdkP {\n  position: absolute;\n  left: 50%;\n  top: 50%;\n  transform: translate(-50%, -50%);\n  background-color: white;\n  background-image: url('./dropBG.jpg');\n  background-repeat: no-repeat;\n  background-position: center;\n  background-size: contain;\n  border-radius: 10px;\n  width: 50px;\n  padding: calc(50vh - 2em) calc(50vw - 25px - 2em);\n}\n\n.ItkVtkViewer-module_fullscreenContainer__-H3c8 {\n  position: absolute;\n  width: 100vw;\n  height: 100vh;\n  top: 0;\n  left: 0;\n  overflow: hidden;\n  background: black;\n  margin: 0;\n  padding: 0;\n}\n"
var style = {
  loading: 'ItkVtkViewer-module_loading__11c63',
  spin: 'ItkVtkViewer-module_spin__mT5S6',
  viewContainer: 'ItkVtkViewer-module_viewContainer__-5zNz',
  uiContainer: 'ItkVtkViewer-module_uiContainer__CiawP',
  uiGroup: 'ItkVtkViewer-module_uiGroup__ad-WI',
  uiRow: 'ItkVtkViewer-module_uiRow__KTQa8',
  mainUIRow:
    'ItkVtkViewer-module_mainUIRow__vTXih ItkVtkViewer-module_uiRow__KTQa8',
  planeUIRow:
    'ItkVtkViewer-module_planeUIRow__D5gCh ItkVtkViewer-module_uiRow__KTQa8',
  layersUIRow:
    'ItkVtkViewer-module_layersUIRow__0LDm5 ItkVtkViewer-module_uiRow__KTQa8',
  progress: 'ItkVtkViewer-module_progress__WydXH',
  piecewiseWidget: 'ItkVtkViewer-module_piecewiseWidget__5gKl5',
  logo: 'ItkVtkViewer-module_logo__9ErCF',
  fpsMonitor: 'ItkVtkViewer-module_fpsMonitor__bnwqr',
  layerEntryCommon: 'ItkVtkViewer-module_layerEntryCommon__oIE1u',
  layerEntryBrightBG: 'ItkVtkViewer-module_layerEntryBrightBG__qXyI2',
  layerEntryDarkBG: 'ItkVtkViewer-module_layerEntryDarkBG__BmiCj',
  layerLabelCommon: 'ItkVtkViewer-module_layerLabelCommon__kTiO9',
  layerLabelBrightBG: 'ItkVtkViewer-module_layerLabelBrightBG__vAfex',
  layerLabelDarkBG: 'ItkVtkViewer-module_layerLabelDarkBG__sM6Bg',
  visibleButton: 'ItkVtkViewer-module_visibleButton__ezrIc',
  layerIcon: 'ItkVtkViewer-module_layerIcon__v-rxO',
  tooltipButtonBrightBG: 'ItkVtkViewer-module_tooltipButtonBrightBG__yffVf',
  tooltipButtonDarkBG: 'ItkVtkViewer-module_tooltipButtonDarkBG__gEu0i',
  invertibleButtonBrightBG:
    'ItkVtkViewer-module_invertibleButtonBrightBG__VmIfT',
  invertibleButtonDarkBG: 'ItkVtkViewer-module_invertibleButtonDarkBG__GoKgD',
  collapseUIButton: 'ItkVtkViewer-module_collapseUIButton__Ac6-L',
  screenshotButton: 'ItkVtkViewer-module_screenshotButton__OL4Na',
  annotationsButton: 'ItkVtkViewer-module_annotationsButton__Msb-p',
  axesButton: 'ItkVtkViewer-module_axesButton__k2H6p',
  fullscreenButton: 'ItkVtkViewer-module_fullscreenButton__en3Z5',
  interpolationButton: 'ItkVtkViewer-module_interpolationButton__2P0HJ',
  cropButton: 'ItkVtkViewer-module_cropButton__ljwuU',
  resetCropButton: 'ItkVtkViewer-module_resetCropButton__SCGTH',
  distanceEntry: 'ItkVtkViewer-module_distanceEntry__zXMUS',
  distanceButton: 'ItkVtkViewer-module_distanceButton__NhxBT',
  distanceLabelCommon: 'ItkVtkViewer-module_distanceLabelCommon__Ec-uc',
  distanceLabelBrightBG: 'ItkVtkViewer-module_distanceLabelBrightBG__aYmfG',
  distanceLabelDarkBG: 'ItkVtkViewer-module_distanceLabelDarkBG__kYXvI',
  distanceInput: 'ItkVtkViewer-module_distanceInput__gyNaU',
  resetCameraButton: 'ItkVtkViewer-module_resetCameraButton__l9FGp',
  bgColorButton: 'ItkVtkViewer-module_bgColorButton__yrjOX',
  viewModeButton: 'ItkVtkViewer-module_viewModeButton__OtTng',
  shadowButton: 'ItkVtkViewer-module_shadowButton__09fEk',
  viewPlanesButton: 'ItkVtkViewer-module_viewPlanesButton__rSnuZ',
  toggleInput: 'ItkVtkViewer-module_toggleInput__jHLTo',
  toggleButton: 'ItkVtkViewer-module_toggleButton__qHhHZ',
  numberInput: 'ItkVtkViewer-module_numberInput__pDxYH',
  selector: 'ItkVtkViewer-module_selector__yw8l-',
  componentTab: 'ItkVtkViewer-module_componentTab__6KSJF',
  disableInterface: 'ItkVtkViewer-module_disableInterface__CGB4S',
  compTabLabel: 'ItkVtkViewer-module_compTabLabel__8u4iU',
  componentVisibility: 'ItkVtkViewer-module_componentVisibility__y1rRS',
  sampleDistanceButton: 'ItkVtkViewer-module_sampleDistanceButton__NjT0o',
  blendModeButton: 'ItkVtkViewer-module_blendModeButton__cit1w',
  gradientOpacitySlider: 'ItkVtkViewer-module_gradientOpacitySlider__wkEqP',
  sliderEntry: 'ItkVtkViewer-module_sliderEntry__3r3gO',
  slider: 'ItkVtkViewer-module_slider__eT9qm',
  planeLabel: 'ItkVtkViewer-module_planeLabel__E1zOk',
  xPlaneLabel:
    'ItkVtkViewer-module_xPlaneLabel__wK4Cb ItkVtkViewer-module_planeLabel__E1zOk',
  yPlaneLabel:
    'ItkVtkViewer-module_yPlaneLabel__rIm0j ItkVtkViewer-module_planeLabel__E1zOk',
  zPlaneLabel:
    'ItkVtkViewer-module_zPlaneLabel__94NL7 ItkVtkViewer-module_planeLabel__E1zOk',
  gradientOpacityScale: 'ItkVtkViewer-module_gradientOpacityScale__NrqOZ',
  bigFileDrop: 'ItkVtkViewer-module_bigFileDrop__cZdkP',
  fullscreenContainer: 'ItkVtkViewer-module_fullscreenContainer__-H3c8',
}
styleInject(css_248z$1)

const optimizedSVGDataUri$s =
  "data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 1664 1536'%3e%3cpath d='M725 431L555 881q33 0 136.5 2t160.5 2q19 0 57-2-87-253-184-452zM0 1536l2-79q23-7 56-12.5t57-10.5 49.5-14.5 44.5-29 31-50.5l237-616L757 0h128q8 14 11 21l205 480q33 78 106 257.5t114 274.5q15 34 58 144.5t72 168.5q20 45 35 57 19 15 88 29.5t84 20.5q6 38 6 57 0 4-.5 13t-.5 13q-63 0-190-8t-191-8q-76 0-215 7t-178 8q0-43 4-78l131-28q1 0 12.5-2.5t15.5-3.5 14.5-4.5 15-6.5 11-8 9-11 2.5-14q0-16-31-96.5t-72-177.5-42-100l-450-2q-26 58-76.5 195.5T382 1361q0 22 14 37.5t43.5 24.5 48.5 13.5 57 8.5 41 4q1 19 1 58 0 9-2 27-58 0-174.5-10T236 1514q-8 0-26.5 4t-21.5 4q-80 14-188 14z'/%3e%3c/svg%3e"

const optimizedSVGDataUri$r =
  "data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 43 41.91699981689453'%3e%3cpath d='M15 24.089V7.375L9 13V7.5L17 0l8 7.5V13l-6-5.625v15.542h16.625l-5.625-6h5.5l7.5 8-7.5 8H30l5.625-6H17.828l-11 11H15l-4 4H0v-11l4-4v8.172l11-11zm6.253 8.361L18.8 37.262v2.655h-1.707v-2.625l-2.346-4.842h1.921l1.195 2.785.17.61h.022l.165-.588 1.252-2.807h1.781zm8.267-10.533h-2.03l-1.308-2.432-.154-.5h-.021l-.175.522-1.314 2.41H22.48l2.42-3.733-2.207-3.734h2.079l1.083 2.239.227.63h.021l.235-.65 1.194-2.219h1.881l-2.235 3.702 2.342 3.765zm-16.48 1H6.96v-.985l3.875-5.095H7.28V15.45h5.76v.955L9.248 21.53h3.792v1.387z'/%3e%3c/svg%3e"

const optimizedSVGDataUri$q =
  "data:image/svg+xml,%3c%3fxml version='1.0' encoding='UTF-8' standalone='no'%3f%3e %3csvg viewBox='0 0 1763.3333740234375 1792' version='1.1' id='svg113' sodipodi:docname='blendMode.svg' inkscape:version='1.2 (1:1.2%2b202206011326%2bfc4e4096c5)' xmlns:inkscape='http://www.inkscape.org/namespaces/inkscape' xmlns:sodipodi='http://sodipodi.sourceforge.net/DTD/sodipodi-0.dtd' xmlns='http://www.w3.org/2000/svg' xmlns:svg='http://www.w3.org/2000/svg'%3e %3cdefs id='defs117' /%3e %3csodipodi:namedview id='namedview115' pagecolor='white' bordercolor='black' borderopacity='0.25' inkscape:showpageshadow='2' inkscape:pageopacity='0.0' inkscape:pagecheckerboard='0' inkscape:deskcolor='%23d1d1d1' showgrid='false' inkscape:zoom='0.27047836' inkscape:cx='763.46218' inkscape:cy='1454.8299' inkscape:window-width='1846' inkscape:window-height='1136' inkscape:window-x='74' inkscape:window-y='27' inkscape:window-maximized='1' inkscape:current-layer='svg113' /%3e %3cellipse style='fill:none%3bfill-opacity:1%3bstroke:black%3bstroke-width:149.145%3bstroke-dasharray:none%3bstroke-opacity:1' id='path223' cx='601' cy='899.99982' rx='525.42761' ry='525.42743' /%3e %3ccircle style='fill:black%3bfill-opacity:1%3bstroke:none%3bstroke-width:100%3bstroke-dasharray:none%3bstroke-opacity:1' id='path223-3' cx='1163' cy='900' r='600' /%3e %3c/svg%3e"

const optimizedSVGDataUri$p =
  "data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 384 384'%3e%3cpath d='M64 0h32v48H64zm32 288V112H64v208h208v-32zm240 0h48v32h-48z'/%3e%3cpath d='M0 64v32h288v288h32V64z'/%3e%3c/svg%3e"

const optimizedSVGDataUri$o =
  "data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 1536 1536'%3e%3cpath d='M1283 413L928 768l355 355 144-144q29-31 70-14 39 17 39 59v448q0 26-19 45t-45 19h-448q-42 0-59-40-17-39 14-69l144-144-355-355-355 355 144 144q31 30 14 69-17 40-59 40H64q-26 0-45-19t-19-45v-448q0-42 40-59 39-17 69 14l144 144 355-355-355-355-144 144q-19 19-45 19-12 0-24-5-40-17-40-59V64q0-26 19-45T64 0h448q42 0 59 40 17 39-14 69L413 253l355 355 355-355-144-144q-31-30-14-69 17-40 59-40h448q26 0 45 19t19 45v448q0 42-39 59-13 5-25 5-26 0-45-19z'/%3e%3c/svg%3e"

const optimizedSVGDataUri$n =
  "data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 36 36'%3e%3cpath d='M16 12h4v4h-4zm-4 4h4v4h-4zm8 0h4v4h-4zm4-4h4v4h-4zM8 12h4v4H8zM32 0H4C1.8 0 0 1.8 0 4v28c0 2.2 1.8 4 4 4h28c2.2 0 4-1.8 4-4V4c0-2.2-1.8-4-4-4zM12 30H8v-4h4v4zm8 0h-4v-4h4v4zm8 0h-4v-4h4v4zm4-14h-4v4h4v4h-4v-4h-4v4h-4v-4h-4v4h-4v-4H8v4H4v-4h4v-4H4V4h28v12z'/%3e%3c/svg%3e"

const optimizedSVGDataUri$m =
  "data:image/svg+xml,%3c%3fxml version='1.0' encoding='UTF-8' standalone='no'%3f%3e %3c!DOCTYPE svg PUBLIC '-//W3C//DTD SVG 1.1//EN' 'http://www.w3.org/Graphics/SVG/1.1/DTD/svg11.dtd'%3e %3csvg version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink' preserveAspectRatio='xMidYMid meet' viewBox='13.909765010254631 15.20464974120776 126.4822541859144 128.7097615525036' width='122.48' height='124.71'%3e%3cdefs%3e%3cpath d='M76.43 16.2L130.98 47.58L76.43 75.4L21.89 47.58L76.43 16.2Z' id='bhsnPtSOa'%3e%3c/path%3e%3cpath d='M69.91 140.91L14.91 114.08L15 60L70 87.88L69.91 140.91Z' id='agS5SeOOL'%3e%3c/path%3e%3cpath d='M137.39 113.62L136.4 59.17L82.61 87.3L83.59 140.83L137.39 113.62Z' id='c3paZhyh3s'%3e%3c/path%3e%3c/defs%3e%3cg%3e%3cg%3e%3cuse xlink:href='%23bhsnPtSOa' opacity='1' fill='%2359d87d' fill-opacity='1'%3e%3c/use%3e%3c/g%3e%3cg%3e%3cuse xlink:href='%23agS5SeOOL' opacity='1' fill='%233384c5' fill-opacity='1'%3e%3c/use%3e%3c/g%3e%3cg%3e%3cuse xlink:href='%23c3paZhyh3s' opacity='1' fill='%233384c5' fill-opacity='1'%3e%3c/use%3e%3c/g%3e%3c/g%3e%3c/svg%3e"

const optimizedSVGDataUri$l =
  "data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 1920 1536'%3e%3cpath d='M640 448q0 80-56 136t-136 56-136-56-56-136 56-136 136-56 136 56 56 136zm1024 384v448H256v-192l320-320 160 160 512-512zm96-704H160q-13 0-22.5 9.5T128 160v1216q0 13 9.5 22.5t22.5 9.5h1600q13 0 22.5-9.5t9.5-22.5V160q0-13-9.5-22.5T1760 128zm160 32v1216q0 66-47 113t-113 47H160q-66 0-113-47T0 1376V160Q0 94 47 47T160 0h1600q66 0 113 47t47 113z'/%3e%3c/svg%3e"

const optimizedSVGDataUri$k =
  "data:image/svg+xml,%3c%3fxml version='1.0' encoding='UTF-8' standalone='no'%3f%3e %3c!DOCTYPE svg PUBLIC '-//W3C//DTD SVG 1.1//EN' 'http://www.w3.org/Graphics/SVG/1.1/DTD/svg11.dtd'%3e %3csvg version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink' preserveAspectRatio='xMidYMid meet' viewBox='24.474820143884916 11.75539568345329 107.73381294964032 102.35251798561154' width='102.73' height='97.35'%3e%3cdefs%3e%3cpath d='M26.47 13.76L129.21 13.76L129.21 111.11L26.47 111.11L26.47 13.76Z' id='a3ZYhJlju'%3e%3c/path%3e%3clinearGradient id='gradientbexcZGM80' gradientUnits='userSpaceOnUse' x1='27.65' y1='13.76' x2='129.21' y2='111.57'%3e%3cstop style='stop-color: white%3bstop-opacity: 1' offset='0%25'%3e%3c/stop%3e%3cstop style='stop-color: %23010000%3bstop-opacity: 1' offset='100%25'%3e%3c/stop%3e%3c/linearGradient%3e%3c/defs%3e%3cg%3e%3cg%3e%3cuse xlink:href='%23a3ZYhJlju' opacity='1' fill='url(%23gradientbexcZGM80)'%3e%3c/use%3e%3cg%3e%3cuse xlink:href='%23a3ZYhJlju' opacity='1' fill-opacity='0' stroke='white' stroke-width='4' stroke-opacity='1'%3e%3c/use%3e%3c/g%3e%3c/g%3e%3c/g%3e%3c/svg%3e"

const optimizedSVGDataUri$j =
  "data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 1792 1344'%3e%3cpath d='M555 1047l78-141q-87-63-136-159t-49-203q0-121 61-225-229 117-381 353 167 258 427 375zm389-759q0-20-14-34t-34-14q-125 0-214.5 89.5T592 544q0 20 14 34t34 14 34-14 14-34q0-86 61-147t147-61q20 0 34-14t14-34zm363-191q0 7-1 9-105 188-315 566t-316 567l-49 89q-10 16-28 16-12 0-134-70-16-10-16-28 0-12 44-87-143-65-263.5-173T20 741Q0 710 0 672t20-69q153-235 380-371T896 96q89 0 180 17l54-97q10-16 28-16 5 0 18 6t31 15.5 33 18.5 31.5 18.5T1291 70q16 10 16 27zm37 447q0 139-79 253.5T1056 962l280-502q8 45 8 84zm448 128q0 35-20 69-39 64-109 145-150 172-347.5 267T896 1248l74-132q212-18 392.5-137T1664 672q-115-179-282-294l63-112q95 64 182.5 153T1772 603q20 34 20 69z'/%3e%3c/svg%3e"

const optimizedSVGDataUri$i =
  "data:image/svg+xml,%3c%3fxml version='1.0' encoding='utf-8'%3f%3e %3csvg version='1.1' id='Layer_1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink' x='0px' y='0px' viewBox='0 0 100 100' style='enable-background:new 0 0 100 100%3b' xml:space='preserve'%3e %3ccircle cx='59.6' cy='42.7' r='4.9'/%3e %3cpath d='M41.1%2c84.2c-1%2c0-2-0.4-2.7-1.3l-22-26.7c-1.2-1.5-1-3.7%2c0.5-4.9l31.9-26.4c0.6-0.5%2c1.4-0.8%2c2.2-0.8c0%2c0%2c0%2c0%2c0%2c0l27.1%2c0.1 c1%2c0%2c2%2c0.5%2c2.7%2c1.3c0.7%2c0.8%2c0.9%2c1.9%2c0.7%2c2.9L76.5%2c55c-0.2%2c0.8-0.6%2c1.5-1.2%2c2L43.3%2c83.4C42.7%2c83.9%2c41.9%2c84.2%2c41.1%2c84.2z M24%2c54.5 l17.6%2c21.3l28.3-23.3l4-21.2l-21.6-0.1L24%2c54.5z'/%3e %3c/svg%3e"

const optimizedSVGDataUri$h =
  "data:image/svg+xml,%3c%3fxml version='1.0' encoding='UTF-8' standalone='no'%3f%3e %3csvg xmlns:dc='http://purl.org/dc/elements/1.1/' xmlns:cc='http://creativecommons.org/ns%23' xmlns:rdf='http://www.w3.org/1999/02/22-rdf-syntax-ns%23' xmlns:svg='http://www.w3.org/2000/svg' xmlns='http://www.w3.org/2000/svg' version='1.1' id='svg2' viewBox='0 0 62.221396 60.130392' height='16.970133mm' width='17.560261mm'%3e %3cdefs id='defs4' /%3e %3cmetadata id='metadata7'%3e %3crdf:RDF%3e %3ccc:Work rdf:about=''%3e %3cdc:format%3eimage/svg%2bxml%3c/dc:format%3e %3cdc:type rdf:resource='http://purl.org/dc/dcmitype/StillImage' /%3e %3cdc:title%3e%3c/dc:title%3e %3c/cc:Work%3e %3c/rdf:RDF%3e %3c/metadata%3e %3cg transform='translate(-204.3732%2c-426.67465)' id='layer1'%3e %3crect transform='matrix(0.67893789%2c0.73419571%2c-0.73419571%2c0.67893789%2c0%2c0)' y='107.51627' x='484.44534' height='59.38089' width='21.540062' id='rect4140' style='fill:none%3bfill-opacity:1%3bstroke:black%3bstroke-width:4%3bstroke-linecap:round%3bstroke-linejoin:round%3bstroke-miterlimit:4%3bstroke-dasharray:none%3bstroke-dashoffset:0%3bstroke-opacity:1' /%3e %3cpath id='path4148' d='m 243.29116%2c434.92064 c 3.16419%2c3.42172 6.32839%2c6.84344 9.49258%2c10.26516' style='fill:none%3bfill-rule:evenodd%3bstroke:black%3bstroke-width:4%3bstroke-linecap:round%3bstroke-linejoin:miter%3bstroke-miterlimit:4%3bstroke-dasharray:none%3bstroke-opacity:1' /%3e %3cpath id='path4148-3-5' d='m 236.26734%2c441.53481 c 1.96377%2c2.12361 3.92755%2c4.24722 5.89132%2c6.37082' style='fill:none%3bfill-rule:evenodd%3bstroke:black%3bstroke-width:4%3bstroke-linecap:round%3bstroke-linejoin:miter%3bstroke-miterlimit:4%3bstroke-dasharray:none%3bstroke-opacity:1' /%3e %3cpath id='path4148-3' d='m 228.61436%2c448.49077 c 3.16419%2c3.42172 6.32839%2c6.84345 9.49259%2c10.26516' style='fill:none%3bfill-rule:evenodd%3bstroke:black%3bstroke-width:4%3bstroke-linecap:round%3bstroke-linejoin:miter%3bstroke-miterlimit:4%3bstroke-dasharray:none%3bstroke-opacity:1' /%3e %3cpath id='path4148-3-5-5' d='m 220.76246%2c455.75236 c 1.96378%2c2.12361 3.92756%2c4.24721 5.89133%2c6.37081' style='fill:none%3bfill-rule:evenodd%3bstroke:black%3bstroke-width:4%3bstroke-linecap:round%3bstroke-linejoin:miter%3bstroke-miterlimit:4%3bstroke-dasharray:none%3bstroke-opacity:1' /%3e %3cpath id='path4148-6' d='m 213.55887%2c462.41313 c 3.16419%2c3.42173 6.32839%2c6.84345 9.49258%2c10.26518' style='fill:none%3bfill-rule:evenodd%3bstroke:black%3bstroke-width:4%3bstroke-linecap:round%3bstroke-linejoin:miter%3bstroke-miterlimit:4%3bstroke-dasharray:none%3bstroke-opacity:1' /%3e %3c/g%3e %3c/svg%3e"

const optimizedSVGDataUri$g =
  "data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 1536 1536'%3e%3cpath d='M768 1312V224q-148 0-273 73T297 495t-73 273 73 273 198 198 273 73zm768-544q0 209-103 385.5T1153.5 1433 768 1536t-385.5-103T103 1153.5 0 768t103-385.5T382.5 103 768 0t385.5 103T1433 382.5 1536 768z'/%3e%3c/svg%3e"

const optimizedSVGDataUri$f =
  "data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 1536 1536'%3e%3cpath d='M768 0q209 0 385.5 103T1433 382.5 1536 768t-103 385.5-279.5 279.5T768 1536t-385.5-103T103 1153.5 0 768t103-385.5T382.5 103 768 0zm0 1312q148 0 273-73t198-198 73-273-73-273-198-198-273-73-273 73-198 198-73 273 73 273 198 198 273 73zm96-224q-14 0-23-9t-9-23V480q0-14 9-23t23-9h192q14 0 23 9t9 23v576q0 14-9 23t-23 9H864zm-384 0q-14 0-23-9t-9-23V480q0-14 9-23t23-9h192q14 0 23 9t9 23v576q0 14-9 23t-23 9H480z'/%3e%3c/svg%3e"

const optimizedSVGDataUri$e =
  "data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 1536 1536'%3e%3cpath d='M1184 768q0 37-32 55l-544 320q-15 9-32 9-16 0-32-8-32-19-32-56V448q0-37 32-56 33-18 64 1l544 320q32 18 32 55zm128 0q0-148-73-273t-198-198-273-73-273 73-198 198-73 273 73 273 198 198 273 73 273-73 198-198 73-273zm224 0q0 209-103 385.5T1153.5 1433 768 1536t-385.5-103T103 1153.5 0 768t103-385.5T382.5 103 768 0t385.5 103T1433 382.5 1536 768z'/%3e%3c/svg%3e"

const optimizedSVGDataUri$d =
  "data:image/svg+xml,%3c%3fxml version='1.0' encoding='UTF-8' standalone='no'%3f%3e %3c!DOCTYPE svg PUBLIC '-//W3C//DTD SVG 1.1//EN' 'http://www.w3.org/Graphics/SVG/1.1/DTD/svg11.dtd'%3e %3csvg version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink' preserveAspectRatio='xMidYMid meet' viewBox='23.526450466849894 25.20464974120776 126.86556872931914 128.62412323660308' width='122.87' height='124.62'%3e%3cdefs%3e%3cpath d='M85.45 26.2L140 57.58L85.45 85.4L30.91 57.58L85.45 26.2Z' id='bljQJJOjU'%3e%3c/path%3e%3cpath d='M79.53 149.62L24.53 122.78L24.62 68.7L79.62 96.58L79.53 149.62Z' id='a2OxwluQL6'%3e%3c/path%3e%3cpath d='M147.39 123.62L146.4 69.17L92.61 97.3L93.59 150.83L147.39 123.62Z' id='a4nIltkDon'%3e%3c/path%3e%3c/defs%3e%3cg%3e%3cg%3e%3cuse xlink:href='%23bljQJJOjU' opacity='1' fill='%233384c5' fill-opacity='1'%3e%3c/use%3e%3c/g%3e%3cg%3e%3cuse xlink:href='%23a2OxwluQL6' opacity='1' fill='%23ff7b7b' fill-opacity='1'%3e%3c/use%3e%3c/g%3e%3cg%3e%3cuse xlink:href='%23a4nIltkDon' opacity='1' fill='%233384c5' fill-opacity='1'%3e%3c/use%3e%3c/g%3e%3c/g%3e%3c/svg%3e"

const optimizedSVGDataUri$c =
  "data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 448 448'%3e%3cpath d='M224 144c-44.004 0-80.001 36-80.001 80 0 44.004 35.997 80 80.001 80 44.005 0 79.999-35.996 79.999-80 0-44-35.994-80-79.999-80zm190.938 58.667c-9.605-88.531-81.074-160-169.605-169.599V0h-42.666v33.067c-88.531 9.599-160 81.068-169.604 169.599H0v42.667h33.062c9.604 88.531 81.072 160 169.604 169.604V448h42.666v-33.062c88.531-9.604 160-81.073 169.605-169.604H448v-42.667h-33.062zM224 373.333c-82.137 0-149.334-67.198-149.334-149.333 0-82.136 67.197-149.333 149.334-149.333 82.135 0 149.332 67.198 149.332 149.333S306.135 373.333 224 373.333z'/%3e%3c/svg%3e"

const optimizedSVGDataUri$b =
  "data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 384 384'%3e%3cpath d='M332.795 332.8H256V384h128V256h-51.205zm.005-281.595V128H384V0H256v51.205zM51.205 51.2H128V0H0v128h51.205zM51.2 332.795V256H0v128h128v-51.205z'/%3e%3c/svg%3e"

const optimizedSVGDataUri$a =
  "data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24'%3e%3cpath d='M12 6v3l4-4-4-4v3c-4.42 0-8 3.58-8 8 0 1.57.46 3.03 1.24 4.26L6.7 14.8c-.45-.83-.7-1.79-.7-2.8 0-3.31 2.69-6 6-6zm6.76 1.74L17.3 9.2c.44.84.7 1.79.7 2.8 0 3.31-2.69 6-6 6v-3l-4 4 4 4v-3c4.42 0 8-3.58 8-8 0-1.57-.46-3.03-1.24-4.26z'/%3e%3c/svg%3e"

const optimizedSVGDataUri$9 =
  "data:image/svg+xml,%3csvg viewBox='0 0 180 180' xmlns='http://www.w3.org/2000/svg'%3e%3cg stroke='black' stroke-width='10' fill='none' fill-rule='evenodd' stroke-linecap='square'%3e%3cpath d='M10 90h160M10 133.488V47M170 133.488V47M90 133.488V47'/%3e%3c/g%3e%3c/svg%3e"

const optimizedSVGDataUri$8 =
  "data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 1763.3333740234375 1792'%3e%3cpath d='M707.333 1440q0 12-10 24l-319 319q-10 9-23 9-12 0-23-9l-320-320q-15-16-7-35 8-20 30-20h192V32q0-14 9-23t23-9h192q14 0 23 9t9 23v1376h192q14 0 23 9t9 23zm1056 128v192q0 14-9 23t-23 9h-832q-14 0-23-9t-9-23v-192q0-14 9-23t23-9h832q14 0 23 9t9 23zm-192-512v192q0 14-9 23t-23 9h-640q-14 0-23-9t-9-23v-192q0-14 9-23t23-9h640q14 0 23 9t9 23zm-192-512v192q0 14-9 23t-23 9h-448q-14 0-23-9t-9-23V544q0-14 9-23t23-9h448q14 0 23 9t9 23zm-192-512v192q0 14-9 23t-23 9h-256q-14 0-23-9t-9-23V32q0-14 9-23t23-9h256q14 0 23 9t9 23z'/%3e%3c/svg%3e"

const optimizedSVGDataUri$7 =
  "data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 1920 1664'%3e%3cpath d='M960 672q119 0 203.5 84.5T1248 960t-84.5 203.5T960 1248t-203.5-84.5T672 960t84.5-203.5T960 672zm704-416q106 0 181 75t75 181v896q0 106-75 181t-181 75H256q-106 0-181-75T0 1408V512q0-106 75-181t181-75h224l51-136q19-49 69.5-84.5T704 0h512q53 0 103.5 35.5T1389 120l51 136h224zM960 1408q185 0 316.5-131.5T1408 960t-131.5-316.5T960 512 643.5 643.5 512 960t131.5 316.5T960 1408z'/%3e%3c/svg%3e"

const optimizedSVGDataUri$6 =
  "data:image/svg+xml,%3csvg id='Layer_1' data-name='Layer 1' xmlns='http://www.w3.org/2000/svg' viewBox='0 0 64 64'%3e%3ctitle%3eSVG_Artboards%3c/title%3e%3crect x='17.52' y='15.45' width='28.97' height='49.1' transform='translate(72 8) rotate(90)' style='fill:%23a7d28c%3bstroke:%236f6f59%3bstroke-linecap:round%3bstroke-linejoin:round%3bstroke-width:2.2536px'/%3e%3crect x='8.56' y='26.62' width='2.96' height='26.71' style='fill:%23603c89'/%3e%3crect x='11.52' y='26.62' width='2.96' height='26.71' style='fill:%2346449b'/%3e%3crect x='14.42' y='26.62' width='2.96' height='26.71' style='fill:%232a5aa8'/%3e%3crect x='17.38' y='26.62' width='2.96' height='26.71' style='fill:%230c71b8'/%3e%3crect x='20.36' y='26.62' width='2.96' height='26.71' style='fill:%230d7fc2'/%3e%3crect x='23.32' y='26.62' width='2.96' height='26.71' style='fill:%23198ece'/%3e%3crect x='26.22' y='26.62' width='2.96' height='26.71' style='fill:%2325a1db'/%3e%3crect x='29.18' y='26.62' width='2.96' height='26.71' style='fill:%2312b2d2'/%3e%3crect x='32.19' y='26.62' width='2.96' height='26.71' style='fill:%234bb88e'/%3e%3crect x='23.21' y='38.49' width='26.71' height='2.96' transform='translate(76.54 3.41) rotate(90)' style='fill:%2398c37e'/%3e%3crect x='26.17' y='38.49' width='26.71' height='2.96' transform='translate(79.5 0.45) rotate(90)' style='fill:%23a4c661'/%3e%3crect x='29.07' y='38.49' width='26.71' height='2.96' transform='translate(82.4 -2.45) rotate(90)' style='fill:%23c6c835'/%3e%3crect x='32.03' y='38.49' width='26.71' height='2.96' transform='translate(85.36 -5.41) rotate(90)' style='fill:%23e8c61d'/%3e%3crect x='35.01' y='38.49' width='26.71' height='2.96' transform='translate(88.34 -8.39) rotate(90)' style='fill:%23e2ae27'/%3e%3crect x='37.97' y='38.49' width='26.71' height='2.96' transform='translate(91.3 -11.35) rotate(90)' style='fill:%23dc9a2a'/%3e%3crect x='40.87' y='38.49' width='26.71' height='2.96' transform='translate(94.2 -14.25) rotate(90)' style='fill:%23c58338'/%3e%3cline x1='23.49' y1='34.89' x2='23.49' y2='46.71' style='fill:none%3bstroke:%236f6f59%3bstroke-linecap:round%3bstroke-linejoin:round%3bstroke-width:2.2536px'/%3e%3cline x1='39.95' y1='34.89' x2='39.95' y2='46.71' style='fill:none%3bstroke:%236f6f59%3bstroke-linecap:round%3bstroke-linejoin:round%3bstroke-width:2.2536px'/%3e%3cline x1='56.07' y1='40.8' x2='8.94' y2='40.8' style='fill:none%3bstroke:%236f6f59%3bstroke-linecap:round%3bstroke-linejoin:round%3bstroke-width:2.2536px'/%3e%3ccircle cx='21.12' cy='20.63' r='15.5' style='fill:%23a7d28c%3bstroke:%236f6f59%3bstroke-linecap:round%3bstroke-linejoin:round%3bstroke-width:2.2536px'/%3e%3c/svg%3e"

const optimizedSVGDataUri$5 =
  "data:image/svg+xml,%3c%3fxml version='1.0' encoding='UTF-8' standalone='no'%3f%3e %3c!DOCTYPE svg PUBLIC '-//W3C//DTD SVG 1.1//EN' 'http://www.w3.org/Graphics/SVG/1.1/DTD/svg11.dtd'%3e %3csvg version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink' preserveAspectRatio='xMidYMid meet' viewBox='15 15 75.15107913669064 70.19424460431657' width='61.15' height='59.19'%3e%3cdefs%3e%3cpath d='M15 15L76.15 15L76.15 74.19L15 74.19L15 15Z' id='a28rcsTDH'%3e%3c/path%3e%3cclipPath id='clipa5ipCW0hFw'%3e%3cuse xlink:href='%23a28rcsTDH' opacity='1'%3e%3c/use%3e%3c/clipPath%3e%3c/defs%3e%3cg%3e%3cg%3e%3cg%3e%3cfilter id='shadow11528463' x='-5' y='-5' width='113.15' height='108.19' filterUnits='userSpaceOnUse' primitiveUnits='userSpaceOnUse'%3e%3cfeFlood%3e%3c/feFlood%3e%3cfeComposite in2='SourceAlpha' operator='in'%3e%3c/feComposite%3e%3cfeGaussianBlur stdDeviation='1'%3e%3c/feGaussianBlur%3e%3cfeOffset dx='12' dy='9' result='afterOffset'%3e%3c/feOffset%3e%3cfeFlood flood-color='black' flood-opacity='0.5'%3e%3c/feFlood%3e%3cfeComposite in2='afterOffset' operator='in'%3e%3c/feComposite%3e%3cfeMorphology operator='dilate' radius='1'%3e%3c/feMorphology%3e%3cfeComposite in2='SourceAlpha' operator='out'%3e%3c/feComposite%3e%3c/filter%3e%3cpath d='M15 15L76.15 15L76.15 74.19L15 74.19L15 15Z' id='ciVjyGjh3' fill='white' fill-opacity='1' filter='url(%23shadow11528463)'%3e%3c/path%3e%3c/g%3e%3cuse xlink:href='%23a28rcsTDH' opacity='1' fill='white' fill-opacity='0'%3e%3c/use%3e%3cg clip-path='url(%23clipa5ipCW0hFw)'%3e%3cuse xlink:href='%23a28rcsTDH' opacity='1' fill-opacity='0' stroke='black' stroke-width='8' stroke-opacity='1'%3e%3c/use%3e%3c/g%3e%3c/g%3e%3c/g%3e%3c/svg%3e"

const optimizedSVGDataUri$4 =
  "data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 384 320'%3e%3cpath d='M353.4 128H30.6C13.7 128 0 142.3 0 160s13.7 32 30.6 32h322.8c16.9 0 30.6-14.3 30.6-32s-13.7-32-30.6-32zm0-128H30.6C13.7 0 0 14.3 0 32s13.7 32 30.6 32h322.8c16.9 0 30.6-14.3 30.6-32S370.3 0 353.4 0zm0 256H30.6C13.7 256 0 270.3 0 288s13.7 32 30.6 32h322.8c16.9 0 30.6-14.3 30.6-32s-13.7-32-30.6-32z'/%3e%3c/svg%3e"

const optimizedSVGDataUri$3 =
  "data:image/svg+xml,%3c%3fxml version='1.0' encoding='UTF-8' standalone='no'%3f%3e %3c!DOCTYPE svg PUBLIC '-//W3C//DTD SVG 1.1//EN' 'http://www.w3.org/Graphics/SVG/1.1/DTD/svg11.dtd'%3e %3csvg version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink' preserveAspectRatio='xMidYMid meet' viewBox='31.654362741230607 28.850229150738443 113.67896134435179 115.80278931174794' width='109.68' height='111.8'%3e%3cdefs%3e%3cpath d='M87.79 29.85L142.33 61.23L87.79 89.05L33.24 61.23L87.79 29.85Z' id='b6gn5Ph4a'%3e%3c/path%3e%3clinearGradient id='gradientc5ieAzTlrB' gradientUnits='userSpaceOnUse' x1='87.79' y1='88.11' x2='86.79' y2='15.31'%3e%3cstop style='stop-color: %238dbee6%3bstop-opacity: 1' offset='0%25'%3e%3c/stop%3e%3cstop style='stop-color: %233384c5%3bstop-opacity: 1' offset='100%25'%3e%3c/stop%3e%3c/linearGradient%3e%3cpath d='M87.79 141.63L33.24 115L33.24 61.17L87.79 88.83L87.79 141.63Z' id='bcpTLWFe1'%3e%3c/path%3e%3clinearGradient id='gradienta1vdPb9Tx' gradientUnits='userSpaceOnUse' x1='86.52' y1='89.05' x2='58.85' y2='125.96'%3e%3cstop style='stop-color: %237bb2de%3bstop-opacity: 1' offset='0%25'%3e%3c/stop%3e%3cstop style='stop-color: %233789cb%3bstop-opacity: 1' offset='100%25'%3e%3c/stop%3e%3c/linearGradient%3e%3cpath d='M142.33 115.48L142.31 61.17L87.77 88.26L87.8 141.65L142.33 115.48Z' id='doqFZ6o0V'%3e%3c/path%3e%3clinearGradient id='gradientb6QK8E71A' gradientUnits='userSpaceOnUse' x1='87.77' y1='89.05' x2='125.07' y2='123.31'%3e%3cstop style='stop-color: %237db2dd%3bstop-opacity: 1' offset='0%25'%3e%3c/stop%3e%3cstop style='stop-color: %233384c5%3bstop-opacity: 1' offset='100%25'%3e%3c/stop%3e%3c/linearGradient%3e%3cpath d='M87.2 58.24L141.75 89.62L87.2 117.43L32.65 89.62L87.2 58.24Z' id='dDpnVVPsa'%3e%3c/path%3e%3cpath d='M117.39 102.02L116.4 47.72L62.36 75.78L63.33 129.16L117.39 102.02Z' id='b2LmEtWKW7'%3e%3c/path%3e%3cpath d='M111.39 129L54.95 100.95L56.3 47.13L112.71 76.21L111.39 129Z' id='a2vWKwK9hV'%3e%3c/path%3e%3cpath d='M87.18 91.77L87.39 62.98L63.46 77.15L63.25 105.45L87.18 91.77Z' id='blEPHXHzV'%3e%3c/path%3e%3cpath d='M87.7 91.5L112.05 105.3L87.7 117.53L63.35 105.3L87.7 91.5Z' id='d10FgvNsKq'%3e%3c/path%3e%3cpath d='M53.45 81.07L63.41 91.93L63.21 105.2L53.84 95.8L53.45 81.07Z' id='b4fb7ce3g6'%3e%3c/path%3e%3cpath d='M54.34 78L63.46 82.93L63.26 92.41L54.68 88.36L54.34 78Z' id='b4t14UEF2B'%3e%3c/path%3e%3cpath d='M45.58 84.93L58.54 91.93L62.69 104.55L50.76 98.72L45.58 84.93Z' id='b7nuEYAotU'%3e%3c/path%3e%3cpath d='M117.88 95.3L117.38 101.98L112.01 104.88L112.16 98.78L117.88 95.3Z' id='cbfwgDbHI'%3e%3c/path%3e%3cpath d='M118.38 75.8L117.88 82.48L112.51 85.38L112.66 79.28L118.38 75.8Z' id='a7u7rrS51C'%3e%3c/path%3e%3cpath d='M118.08 83.3L117.58 89.98L112.21 92.88L112.36 86.78L118.08 83.3Z' id='b2cAudVEyd'%3e%3c/path%3e%3cpath d='M117.98 89.2L117.48 95.88L112.11 98.78L112.26 92.68L117.98 89.2Z' id='hMEdWtW14'%3e%3c/path%3e%3cpath d='M112.44 88.87L118.08 85.26L118.09 79.16L112.79 82.18L112.44 88.87Z' id='d6AqxDBdCj'%3e%3c/path%3e%3c/defs%3e%3cg%3e%3cg%3e%3cuse xlink:href='%23b6gn5Ph4a' opacity='0.4' fill='url(%23gradientc5ieAzTlrB)'%3e%3c/use%3e%3c/g%3e%3cg%3e%3cuse xlink:href='%23bcpTLWFe1' opacity='0.4' fill='url(%23gradienta1vdPb9Tx)'%3e%3c/use%3e%3cg%3e%3cuse xlink:href='%23bcpTLWFe1' opacity='0.4' fill-opacity='0' stroke='white' stroke-width='1' stroke-opacity='1'%3e%3c/use%3e%3c/g%3e%3c/g%3e%3cg%3e%3cuse xlink:href='%23doqFZ6o0V' opacity='0.4' fill='url(%23gradientb6QK8E71A)'%3e%3c/use%3e%3cg%3e%3cuse xlink:href='%23doqFZ6o0V' opacity='0.4' fill-opacity='0' stroke='white' stroke-width='1' stroke-opacity='1'%3e%3c/use%3e%3c/g%3e%3c/g%3e%3cg%3e%3cuse xlink:href='%23dDpnVVPsa' opacity='1' fill='%2359d87d' fill-opacity='1'%3e%3c/use%3e%3c/g%3e%3cg%3e%3cuse xlink:href='%23b2LmEtWKW7' opacity='1' fill='%23ffff72' fill-opacity='1'%3e%3c/use%3e%3c/g%3e%3cg%3e%3cuse xlink:href='%23a2vWKwK9hV' opacity='1' fill='%23ff7b7b' fill-opacity='1'%3e%3c/use%3e%3c/g%3e%3cg%3e%3cuse xlink:href='%23blEPHXHzV' opacity='1' fill='%23ffff72' fill-opacity='1'%3e%3c/use%3e%3c/g%3e%3cg%3e%3cuse xlink:href='%23d10FgvNsKq' opacity='1' fill='%2359d87d' fill-opacity='1'%3e%3c/use%3e%3c/g%3e%3cg%3e%3cuse xlink:href='%23b4fb7ce3g6' opacity='1' fill='%2359d87d' fill-opacity='1'%3e%3c/use%3e%3c/g%3e%3cg%3e%3cuse xlink:href='%23b4t14UEF2B' opacity='1' fill='%2359d87d' fill-opacity='1'%3e%3c/use%3e%3c/g%3e%3cg%3e%3cuse xlink:href='%23b7nuEYAotU' opacity='1' fill='%2359d87d' fill-opacity='1'%3e%3c/use%3e%3c/g%3e%3cg%3e%3cuse xlink:href='%23cbfwgDbHI' opacity='1' fill='%2359d87d' fill-opacity='1'%3e%3c/use%3e%3c/g%3e%3cg%3e%3cuse xlink:href='%23a7u7rrS51C' opacity='1' fill='%2359d87d' fill-opacity='1'%3e%3c/use%3e%3c/g%3e%3cg%3e%3cuse xlink:href='%23b2cAudVEyd' opacity='1' fill='%2359d87d' fill-opacity='1'%3e%3c/use%3e%3c/g%3e%3cg%3e%3cuse xlink:href='%23hMEdWtW14' opacity='1' fill='%2359d87d' fill-opacity='1'%3e%3c/use%3e%3c/g%3e%3cg%3e%3cuse xlink:href='%23d6AqxDBdCj' opacity='1' fill='%2359d87d' fill-opacity='1'%3e%3c/use%3e%3c/g%3e%3c/g%3e%3c/svg%3e"

const optimizedSVGDataUri$2 =
  "data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 1792 1152'%3e%3cpath d='M1664 576q-152-236-381-353 61 104 61 225 0 185-131.5 316.5T896 896 579.5 764.5 448 448q0-121 61-225-229 117-381 353 133 205 333.5 326.5T896 1024t434.5-121.5T1664 576zM944 192q0-20-14-34t-34-14q-125 0-214.5 89.5T592 448q0 20 14 34t34 14 34-14 14-34q0-86 61-147t147-61q20 0 34-14t14-34zm848 384q0 34-20 69-140 230-376.5 368.5T896 1152t-499.5-139T20 645Q0 610 0 576t20-69q140-229 376.5-368T896 0t499.5 139T1772 507q20 35 20 69z'/%3e%3c/svg%3e"

const optimizedSVGDataUri$1 =
  "data:image/svg+xml,%3c%3fxml version='1.0' encoding='UTF-8' standalone='no'%3f%3e %3c!DOCTYPE svg PUBLIC '-//W3C//DTD SVG 1.1//EN' 'http://www.w3.org/Graphics/SVG/1.1/DTD/svg11.dtd'%3e %3csvg version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink' preserveAspectRatio='xMidYMid meet' viewBox='17.242414994673346 15 113.09090909090907 115.80278931174797' width='109.09' height='111.8'%3e%3cdefs%3e%3cpath d='M72.79 16L127.33 47.38L72.79 75.19L18.24 47.38L72.79 16Z' id='ahuegR4Z7'%3e%3c/path%3e%3clinearGradient id='gradientg1v0yQ7cPQ' gradientUnits='userSpaceOnUse' x1='72.79' y1='74.26' x2='71.79' y2='1.46'%3e%3cstop style='stop-color: %238dbee6%3bstop-opacity: 1' offset='0%25'%3e%3c/stop%3e%3cstop style='stop-color: %233384c5%3bstop-opacity: 1' offset='100%25'%3e%3c/stop%3e%3c/linearGradient%3e%3cpath d='M72.79 127.78L18.24 101.15L18.24 47.32L72.79 74.98L72.79 127.78Z' id='apgu3VIlv'%3e%3c/path%3e%3clinearGradient id='gradientbx3q582Ag' gradientUnits='userSpaceOnUse' x1='71.52' y1='75.19' x2='43.85' y2='112.11'%3e%3cstop style='stop-color: %237bb2de%3bstop-opacity: 1' offset='0%25'%3e%3c/stop%3e%3cstop style='stop-color: %233789cb%3bstop-opacity: 1' offset='100%25'%3e%3c/stop%3e%3c/linearGradient%3e%3cpath d='M127.33 101.63L127.31 47.32L72.77 74.41L72.8 127.8L127.33 101.63Z' id='czTPGmX6c'%3e%3c/path%3e%3clinearGradient id='gradiente44kLH46ez' gradientUnits='userSpaceOnUse' x1='72.77' y1='75.19' x2='110.07' y2='109.46'%3e%3cstop style='stop-color: %237db2dd%3bstop-opacity: 1' offset='0%25'%3e%3c/stop%3e%3cstop style='stop-color: %233384c5%3bstop-opacity: 1' offset='100%25'%3e%3c/stop%3e%3c/linearGradient%3e%3c/defs%3e%3cg%3e%3cg%3e%3cuse xlink:href='%23ahuegR4Z7' opacity='0.7' fill='url(%23gradientg1v0yQ7cPQ)'%3e%3c/use%3e%3c/g%3e%3cg%3e%3cuse xlink:href='%23apgu3VIlv' opacity='0.7' fill='url(%23gradientbx3q582Ag)'%3e%3c/use%3e%3cg%3e%3cuse xlink:href='%23apgu3VIlv' opacity='0.7' fill-opacity='0' stroke='white' stroke-width='1' stroke-opacity='1'%3e%3c/use%3e%3c/g%3e%3c/g%3e%3cg%3e%3cuse xlink:href='%23czTPGmX6c' opacity='0.7' fill='url(%23gradiente44kLH46ez)'%3e%3c/use%3e%3cg%3e%3cuse xlink:href='%23czTPGmX6c' opacity='0.7' fill-opacity='0' stroke='white' stroke-width='1' stroke-opacity='1'%3e%3c/use%3e%3c/g%3e%3c/g%3e%3c/g%3e%3c/svg%3e"

const optimizedSVGDataUri =
  "data:image/svg+xml,%3c%3fxml version='1.0' encoding='UTF-8' standalone='no'%3f%3e %3c!DOCTYPE svg PUBLIC '-//W3C//DTD SVG 1.1//EN' 'http://www.w3.org/Graphics/SVG/1.1/DTD/svg11.dtd'%3e %3csvg version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink' preserveAspectRatio='xMidYMid meet' viewBox='23.90976501025463 25.20464974120776 126.4822541859144 128.7097615525036' width='122.48' height='124.71'%3e%3cdefs%3e%3cpath d='M85.45 26.2L140 57.58L85.45 85.4L30.91 57.58L85.45 26.2Z' id='a1uePnz4ps'%3e%3c/path%3e%3cpath d='M79.91 150.91L24.91 124.08L25 70L80 97.88L79.91 150.91Z' id='e2gEmj1vzg'%3e%3c/path%3e%3cpath d='M147.39 123.62L146.4 69.17L92.61 97.3L93.59 150.83L147.39 123.62Z' id='flL3aFB8'%3e%3c/path%3e%3c/defs%3e%3cg%3e%3cg%3e%3cuse xlink:href='%23a1uePnz4ps' opacity='1' fill='%233384c5' fill-opacity='1'%3e%3c/use%3e%3c/g%3e%3cg%3e%3cuse xlink:href='%23e2gEmj1vzg' opacity='1' fill='%233384c5' fill-opacity='1'%3e%3c/use%3e%3c/g%3e%3cg%3e%3cuse xlink:href='%23flL3aFB8' opacity='1' fill='%23ffff72' fill-opacity='1'%3e%3c/use%3e%3c/g%3e%3c/g%3e%3c/svg%3e"

function applyContrastSensitiveStyleToElement(context, cssClass, element) {
  if (element) {
    var uiDarkMode = context.uiDarkMode
    var addPostFix = uiDarkMode ? 'DarkBG' : 'BrightBG'
    var removePostFix = !uiDarkMode ? 'DarkBG' : 'BrightBG'
    var removeClass = style[''.concat(cssClass).concat(removePostFix)]

    if (element.classList.contains(removeClass)) {
      element.classList.remove(removeClass)
    }

    element.classList.add(style[''.concat(cssClass).concat(addPostFix)])
  }
}

function createScreenshotButton(context, mainUIRow) {
  var screenshotButton = document.createElement('div')
  screenshotButton.innerHTML = '<input id="'
    .concat(context.id, '-screenshotButton" type="checkbox" checked class="')
    .concat(
      style.toggleInput,
      '"><label itk-vtk-tooltip itk-vtk-tooltip-top-annotations itk-vtk-tooltip-content="Screenshot" class="'
    )
    .concat(style.screenshotButton, ' ')
    .concat(style.toggleButton, '" for="')
    .concat(context.id, '-screenshotButton"><img src="')
    .concat(optimizedSVGDataUri$7, '" alt="screenshot" /></label>')
  screenshotButton.children[0]
  var screenshotLabel = screenshotButton.children[1]
  applyContrastSensitiveStyleToElement(
    context,
    'invertibleButton',
    screenshotLabel
  )
  screenshotButton.addEventListener('click', function(event) {
    event.preventDefault()
    event.stopPropagation()
    context.service.send('TAKE_SCREENSHOT')
    screenshotButton.checked = true
  })
  context.main.screenshotButton = screenshotButton
  mainUIRow.appendChild(screenshotButton)
}

function _arrayLikeToArray$3(arr, len) {
  if (len == null || len > arr.length) len = arr.length

  for (var i = 0, arr2 = new Array(len); i < len; i++) {
    arr2[i] = arr[i]
  }

  return arr2
}

function _arrayWithoutHoles(arr) {
  if (Array.isArray(arr)) return _arrayLikeToArray$3(arr)
}

function _iterableToArray(iter) {
  if (
    (typeof Symbol !== 'undefined' && iter[Symbol.iterator] != null) ||
    iter['@@iterator'] != null
  )
    return Array.from(iter)
}

function _unsupportedIterableToArray$3(o, minLen) {
  if (!o) return
  if (typeof o === 'string') return _arrayLikeToArray$3(o, minLen)
  var n = Object.prototype.toString.call(o).slice(8, -1)
  if (n === 'Object' && o.constructor) n = o.constructor.name
  if (n === 'Map' || n === 'Set') return Array.from(o)
  if (n === 'Arguments' || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n))
    return _arrayLikeToArray$3(o, minLen)
}

function _nonIterableSpread() {
  throw new TypeError(
    'Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.'
  )
}

function _toConsumableArray(arr) {
  return (
    _arrayWithoutHoles(arr) ||
    _iterableToArray(arr) ||
    _unsupportedIterableToArray$3(arr) ||
    _nonIterableSpread()
  )
}

var fullscreenMethods = []
window.addEventListener('load', function() {
  var body = document.querySelector('body') // https://developer.mozilla.org/en-US/docs/Web/API/Fullscreen_API
  ;[
    ['requestFullscreen', 'exitFullscreen', 'fullscreenchange', 'fullscreen'],
    [
      'mozRequestFullScreen',
      'mozCancelFullScreen',
      'mozfullscreenchange',
      'mozFullScreen',
    ],
    [
      'msRequestFullscreen',
      'msExitFullscreen',
      'MSFullscreenChange',
      'msFullscreenEnabled',
    ],
    [
      'webkitRequestFullscreen',
      'webkitExitFullscreen',
      'webkitfullscreenchange',
      'webkitIsFullScreen',
    ],
  ].forEach(function(methods) {
    if (body[methods[0]] && fullscreenMethods.length === 0) {
      fullscreenMethods.splice.apply(
        fullscreenMethods,
        [methods, methods.length].concat(_toConsumableArray(methods))
      )
    }
  })
})

function createFullscreenButton(context, mainUIRow) {
  if (fullscreenMethods) {
    var fullscreenButton = document.createElement('div')
    fullscreenButton.innerHTML = '<input id="'
      .concat(context.id, '-toggleFullscreenButton" type="checkbox" class="')
      .concat(
        style.toggleInput,
        '"><label itk-vtk-tooltip itk-vtk-tooltip-top-annotations itk-vtk-tooltip-content="Fullscreen [f]" class="'
      )
      .concat(style.fullscreenButton, ' ')
      .concat(style.toggleButton, '" for="')
      .concat(context.id, '-toggleFullscreenButton"><img src="')
      .concat(optimizedSVGDataUri$o, '" alt="fullscreen"/></label>')
    fullscreenButton.children[0]
    fullscreenButton.children[1]
    applyContrastSensitiveStyleToElement(
      context,
      'invertibleButton',
      fullscreenButton
    )
    var container = context.rootContainer
    container.style.width
    container.style.height
    context.main.rootContainerOldWidth = container.style.width
    context.main.rootContainerOldHeight = container.style.height
    fullscreenButton.addEventListener('change', function(event) {
      event.preventDefault()
      event.stopPropagation()
      context.service.send('TOGGLE_FULLSCREEN')
    })
    document.addEventListener(fullscreenMethods[2], function(event) {
      if (!document[fullscreenMethods[3]]) {
        context.service.send('DISABLE_FULLSCREEN')
      }
    })
    context.main.fullscreenButton = fullscreenButton
    mainUIRow.appendChild(fullscreenButton)
  }
}

function toggleRotate(context) {
  if (context.main.rotateButtonInput) {
    context.main.rotateButtonInput.checked = context.main.rotateEnabled
  }
}

function createRotateButton(context, mainUIRow) {
  var rotateButton = document.createElement('div')
  rotateButton.innerHTML = '<input id="'
    .concat(context.id, '-toggleRotateButton" type="checkbox" class="')
    .concat(
      style.toggleInput,
      '"><label itk-vtk-tooltip itk-vtk-tooltip-top-fullscreen itk-vtk-tooltip-content="Spin in 3D [p]" class="'
    )
    .concat(style.rotateButton, ' ')
    .concat(style.toggleButton, '" for="')
    .concat(context.id, '-toggleRotateButton"><img src="')
    .concat(optimizedSVGDataUri$a, '" alt="rotate"/></label>')
  var rotateButtonInput = rotateButton.children[0]
  var rotateButtonLabel = rotateButton.children[1]
  context.main.rotateButtonLabel = rotateButtonLabel
  context.main.rotateButtonInput = rotateButtonInput
  applyContrastSensitiveStyleToElement(
    context,
    'invertibleButton',
    rotateButtonLabel
  )
  toggleRotate(context)
  rotateButton.addEventListener('change', function(event) {
    event.preventDefault()
    event.stopPropagation()
    context.service.send('TOGGLE_ROTATE')
  })
  mainUIRow.appendChild(rotateButton)
}

function toggleAnnotations(context) {
  if (context.main.annotationsButtonInput) {
    context.main.annotationsButtonInput.checked =
      context.main.annotationsEnabled
  }
}

function createAnnotationsButton(context, mainUIRow) {
  var annotationsButton = document.createElement('div')
  annotationsButton.innerHTML = '<input id="'
    .concat(context.id, '-toggleAnnotationsButton" type="checkbox" class="')
    .concat(
      style.toggleInput,
      '" checked><label itk-vtk-tooltip itk-vtk-tooltip-top-annotations itk-vtk-tooltip-content="Annotations" class="'
    )
    .concat(style.annotationsButton, ' ')
    .concat(style.toggleButton, '" for="')
    .concat(context.id, '-toggleAnnotationsButton"><img src="')
    .concat(optimizedSVGDataUri$s, '" alt="annotations"/></label>')
  var annotationsButtonInput = annotationsButton.children[0]
  var annotationsButtonLabel = annotationsButton.children[1]
  context.main.annotationsButtonLabel = annotationsButtonLabel
  context.main.annotationsButtonInput = annotationsButtonInput
  applyContrastSensitiveStyleToElement(
    context,
    'invertibleButton',
    annotationsButtonLabel
  )
  toggleAnnotations(context)
  annotationsButton.addEventListener('change', function(event) {
    event.preventDefault()
    event.stopPropagation()
    context.service.send('TOGGLE_ANNOTATIONS')
  })
  mainUIRow.appendChild(annotationsButton)
}

function toggleAxes(context) {
  if (context.main.axesButtonInput) {
    context.main.axesButtonInput.checked = context.main.axesEnabled
  }
}

function createAxesButton(context, mainUIRow) {
  var axesButton = document.createElement('div')
  axesButton.innerHTML = '<input id="'
    .concat(context.id, '-toggleAxesButton" type="checkbox" class="')
    .concat(
      style.toggleInput,
      '"><label itk-vtk-tooltip itk-vtk-tooltip-top-axes itk-vtk-tooltip-content="Axes" class="'
    )
    .concat(style.axesButton, ' ')
    .concat(style.toggleButton, '" for="')
    .concat(context.id, '-toggleAxesButton"><img src="')
    .concat(optimizedSVGDataUri$r, '" alt="axes"/></label>')
  var axesButtonInput = axesButton.children[0]
  var axesButtonLabel = axesButton.children[1]
  context.main.axesButtonLabel = axesButtonLabel
  context.main.axesButtonInput = axesButtonInput
  applyContrastSensitiveStyleToElement(
    context,
    'invertibleButton',
    axesButtonLabel
  )
  toggleAxes(context)
  axesButton.addEventListener('change', function(event) {
    event.preventDefault()
    event.stopPropagation()
    context.service.send('TOGGLE_AXES')
  })
  mainUIRow.appendChild(axesButton)
}

function createViewPlanesToggle(context, volumeRow) {
  var viewerDOMId = context.id
  var viewPlanesButton = document.createElement('div')
  viewPlanesButton.innerHTML = '<input id="'
    .concat(viewerDOMId, '-toggleSlicingPlanesButton" type="checkbox" class="')
    .concat(
      style.toggleInput,
      '"><label itk-vtk-tooltip itk-vtk-tooltip-top-axes itk-vtk-tooltip-content="View planes [s]" class="'
    )
    .concat(style.viewPlanesButton, ' ')
    .concat(style.toggleButton, '" for="')
    .concat(viewerDOMId, '-toggleSlicingPlanesButton"><img src="')
    .concat(optimizedSVGDataUri$3, '" alt="view planes" /></label>')
  var viewPlanesButtonInput = viewPlanesButton.children[0]
  var viewPlanesButtonLabel = viewPlanesButton.children[1]
  context.main.viewPlanesButton = viewPlanesButton
  context.main.viewPlanesButtonLabel = viewPlanesButtonLabel
  context.main.viewPlanesButtonInput = viewPlanesButtonInput
  applyContrastSensitiveStyleToElement(
    context,
    'tooltipButton',
    viewPlanesButtonLabel
  )
  viewPlanesButton.addEventListener('change', function(event) {
    event.preventDefault()
    event.stopPropagation()
    var slicingPlanes = context.main.slicingPlanes

    if (
      !slicingPlanes.x.visibile &&
      !slicingPlanes.y.visible &&
      !slicingPlanes.z.visible
    ) {
      slicingPlanes.x.visible = true
      slicingPlanes.y.visible = true
      slicingPlanes.z.visible = true
      context.service.send({
        type: 'SLICING_PLANES_CHANGED',
        data: slicingPlanes,
      })
    } else {
      slicingPlanes.x.visible = false
      slicingPlanes.y.visible = false
      slicingPlanes.z.visible = false
      context.service.send({
        type: 'SLICING_PLANES_CHANGED',
        data: slicingPlanes,
      })
    }
  })
  volumeRow.appendChild(viewPlanesButton)
}

function _arrayWithHoles(arr) {
  if (Array.isArray(arr)) return arr
}

function _iterableToArrayLimit(arr, i) {
  var _i =
    arr == null
      ? null
      : (typeof Symbol !== 'undefined' && arr[Symbol.iterator]) ||
        arr['@@iterator']

  if (_i == null) return
  var _arr = []
  var _n = true
  var _d = false

  var _s, _e

  try {
    for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) {
      _arr.push(_s.value)

      if (i && _arr.length === i) break
    }
  } catch (err) {
    _d = true
    _e = err
  } finally {
    try {
      if (!_n && _i['return'] != null) _i['return']()
    } finally {
      if (_d) throw _e
    }
  }

  return _arr
}

function _nonIterableRest() {
  throw new TypeError(
    'Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.'
  )
}

function _slicedToArray(arr, i) {
  return (
    _arrayWithHoles(arr) ||
    _iterableToArrayLimit(arr, i) ||
    _unsupportedIterableToArray$3(arr, i) ||
    _nonIterableRest()
  )
}

function _typeof(obj) {
  '@babel/helpers - typeof'

  return (
    (_typeof =
      'function' == typeof Symbol && 'symbol' == typeof Symbol.iterator
        ? function(obj) {
            return typeof obj
          }
        : function(obj) {
            return obj &&
              'function' == typeof Symbol &&
              obj.constructor === Symbol &&
              obj !== Symbol.prototype
              ? 'symbol'
              : typeof obj
          }),
    _typeof(obj)
  )
}

function _defineProperty(obj, key, value) {
  if (key in obj) {
    Object.defineProperty(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true,
    })
  } else {
    obj[key] = value
  }

  return obj
}

function _setPrototypeOf(o, p) {
  _setPrototypeOf =
    Object.setPrototypeOf ||
    function _setPrototypeOf(o, p) {
      o.__proto__ = p
      return o
    }

  return _setPrototypeOf(o, p)
}

function _isNativeReflectConstruct$1() {
  if (typeof Reflect === 'undefined' || !Reflect.construct) return false
  if (Reflect.construct.sham) return false
  if (typeof Proxy === 'function') return true

  try {
    Boolean.prototype.valueOf.call(
      Reflect.construct(Boolean, [], function() {})
    )
    return true
  } catch (e) {
    return false
  }
}

function _construct(Parent, args, Class) {
  if (_isNativeReflectConstruct$1()) {
    _construct = Reflect.construct
  } else {
    _construct = function _construct(Parent, args, Class) {
      var a = [null]
      a.push.apply(a, args)
      var Constructor = Function.bind.apply(Parent, a)
      var instance = new Constructor()
      if (Class) _setPrototypeOf(instance, Class.prototype)
      return instance
    }
  }

  return _construct.apply(null, arguments)
}

var commonjsGlobal =
  typeof globalThis !== 'undefined'
    ? globalThis
    : typeof window !== 'undefined'
    ? window
    : typeof global !== 'undefined'
    ? global
    : typeof self !== 'undefined'
    ? self
    : {}

var toStr$3 = Object.prototype.toString

var isArguments = function isArguments(value) {
  var str = toStr$3.call(value)
  var isArgs = str === '[object Arguments]'
  if (!isArgs) {
    isArgs =
      str !== '[object Array]' &&
      value !== null &&
      typeof value === 'object' &&
      typeof value.length === 'number' &&
      value.length >= 0 &&
      toStr$3.call(value.callee) === '[object Function]'
  }
  return isArgs
}

var keysShim$1
if (!Object.keys) {
  // modified from https://github.com/es-shims/es5-shim
  var has = Object.prototype.hasOwnProperty
  var toStr$2 = Object.prototype.toString
  var isArgs$1 = isArguments // eslint-disable-line global-require
  var isEnumerable = Object.prototype.propertyIsEnumerable
  var hasDontEnumBug = !isEnumerable.call({ toString: null }, 'toString')
  var hasProtoEnumBug = isEnumerable.call(function() {}, 'prototype')
  var dontEnums = [
    'toString',
    'toLocaleString',
    'valueOf',
    'hasOwnProperty',
    'isPrototypeOf',
    'propertyIsEnumerable',
    'constructor',
  ]
  var equalsConstructorPrototype = function(o) {
    var ctor = o.constructor
    return ctor && ctor.prototype === o
  }
  var excludedKeys = {
    $applicationCache: true,
    $console: true,
    $external: true,
    $frame: true,
    $frameElement: true,
    $frames: true,
    $innerHeight: true,
    $innerWidth: true,
    $onmozfullscreenchange: true,
    $onmozfullscreenerror: true,
    $outerHeight: true,
    $outerWidth: true,
    $pageXOffset: true,
    $pageYOffset: true,
    $parent: true,
    $scrollLeft: true,
    $scrollTop: true,
    $scrollX: true,
    $scrollY: true,
    $self: true,
    $webkitIndexedDB: true,
    $webkitStorageInfo: true,
    $window: true,
  }
  var hasAutomationEqualityBug = (function() {
    /* global window */
    if (typeof window === 'undefined') {
      return false
    }
    for (var k in window) {
      try {
        if (
          !excludedKeys['$' + k] &&
          has.call(window, k) &&
          window[k] !== null &&
          typeof window[k] === 'object'
        ) {
          try {
            equalsConstructorPrototype(window[k])
          } catch (e) {
            return true
          }
        }
      } catch (e) {
        return true
      }
    }
    return false
  })()
  var equalsConstructorPrototypeIfNotBuggy = function(o) {
    /* global window */
    if (typeof window === 'undefined' || !hasAutomationEqualityBug) {
      return equalsConstructorPrototype(o)
    }
    try {
      return equalsConstructorPrototype(o)
    } catch (e) {
      return false
    }
  }

  keysShim$1 = function keys(object) {
    var isObject = object !== null && typeof object === 'object'
    var isFunction = toStr$2.call(object) === '[object Function]'
    var isArguments = isArgs$1(object)
    var isString = isObject && toStr$2.call(object) === '[object String]'
    var theKeys = []

    if (!isObject && !isFunction && !isArguments) {
      throw new TypeError('Object.keys called on a non-object')
    }

    var skipProto = hasProtoEnumBug && isFunction
    if (isString && object.length > 0 && !has.call(object, 0)) {
      for (var i = 0; i < object.length; ++i) {
        theKeys.push(String(i))
      }
    }

    if (isArguments && object.length > 0) {
      for (var j = 0; j < object.length; ++j) {
        theKeys.push(String(j))
      }
    } else {
      for (var name in object) {
        if (!(skipProto && name === 'prototype') && has.call(object, name)) {
          theKeys.push(String(name))
        }
      }
    }

    if (hasDontEnumBug) {
      var skipConstructor = equalsConstructorPrototypeIfNotBuggy(object)

      for (var k = 0; k < dontEnums.length; ++k) {
        if (
          !(skipConstructor && dontEnums[k] === 'constructor') &&
          has.call(object, dontEnums[k])
        ) {
          theKeys.push(dontEnums[k])
        }
      }
    }
    return theKeys
  }
}
var implementation$4 = keysShim$1

var slice$1 = Array.prototype.slice
var isArgs = isArguments

var origKeys = Object.keys
var keysShim = origKeys
  ? function keys(o) {
      return origKeys(o)
    }
  : implementation$4

var originalKeys = Object.keys

keysShim.shim = function shimObjectKeys() {
  if (Object.keys) {
    var keysWorksWithArguments = (function() {
      // Safari 5.0 bug
      var args = Object.keys(arguments)
      return args && args.length === arguments.length
    })(1, 2)
    if (!keysWorksWithArguments) {
      Object.keys = function keys(object) {
        // eslint-disable-line func-name-matching
        if (isArgs(object)) {
          return originalKeys(slice$1.call(object))
        }
        return originalKeys(object)
      }
    }
  } else {
    Object.keys = keysShim
  }
  return Object.keys || keysShim
}

var objectKeys = keysShim

/* eslint complexity: [2, 18], max-statements: [2, 33] */
var shams = function hasSymbols() {
  if (
    typeof Symbol !== 'function' ||
    typeof Object.getOwnPropertySymbols !== 'function'
  ) {
    return false
  }
  if (typeof Symbol.iterator === 'symbol') {
    return true
  }

  var obj = {}
  var sym = Symbol('test')
  var symObj = Object(sym)
  if (typeof sym === 'string') {
    return false
  }

  if (Object.prototype.toString.call(sym) !== '[object Symbol]') {
    return false
  }
  if (Object.prototype.toString.call(symObj) !== '[object Symbol]') {
    return false
  }

  // temp disabled per https://github.com/ljharb/object.assign/issues/17
  // if (sym instanceof Symbol) { return false; }
  // temp disabled per https://github.com/WebReflection/get-own-property-symbols/issues/4
  // if (!(symObj instanceof Symbol)) { return false; }

  // if (typeof Symbol.prototype.toString !== 'function') { return false; }
  // if (String(sym) !== Symbol.prototype.toString.call(sym)) { return false; }

  var symVal = 42
  obj[sym] = symVal
  for (sym in obj) {
    return false
  } // eslint-disable-line no-restricted-syntax, no-unreachable-loop
  if (typeof Object.keys === 'function' && Object.keys(obj).length !== 0) {
    return false
  }

  if (
    typeof Object.getOwnPropertyNames === 'function' &&
    Object.getOwnPropertyNames(obj).length !== 0
  ) {
    return false
  }

  var syms = Object.getOwnPropertySymbols(obj)
  if (syms.length !== 1 || syms[0] !== sym) {
    return false
  }

  if (!Object.prototype.propertyIsEnumerable.call(obj, sym)) {
    return false
  }

  if (typeof Object.getOwnPropertyDescriptor === 'function') {
    var descriptor = Object.getOwnPropertyDescriptor(obj, sym)
    if (descriptor.value !== symVal || descriptor.enumerable !== true) {
      return false
    }
  }

  return true
}

var origSymbol = typeof Symbol !== 'undefined' && Symbol
var hasSymbolSham = shams

var hasSymbols$2 = function hasNativeSymbols() {
  if (typeof origSymbol !== 'function') {
    return false
  }
  if (typeof Symbol !== 'function') {
    return false
  }
  if (typeof origSymbol('foo') !== 'symbol') {
    return false
  }
  if (typeof Symbol('bar') !== 'symbol') {
    return false
  }

  return hasSymbolSham()
}

/* eslint no-invalid-this: 1 */

var ERROR_MESSAGE = 'Function.prototype.bind called on incompatible '
var slice = Array.prototype.slice
var toStr$1 = Object.prototype.toString
var funcType = '[object Function]'

var implementation$3 = function bind(that) {
  var target = this
  if (typeof target !== 'function' || toStr$1.call(target) !== funcType) {
    throw new TypeError(ERROR_MESSAGE + target)
  }
  var args = slice.call(arguments, 1)

  var bound
  var binder = function() {
    if (this instanceof bound) {
      var result = target.apply(this, args.concat(slice.call(arguments)))
      if (Object(result) === result) {
        return result
      }
      return this
    } else {
      return target.apply(that, args.concat(slice.call(arguments)))
    }
  }

  var boundLength = Math.max(0, target.length - args.length)
  var boundArgs = []
  for (var i = 0; i < boundLength; i++) {
    boundArgs.push('$' + i)
  }

  bound = Function(
    'binder',
    'return function (' +
      boundArgs.join(',') +
      '){ return binder.apply(this,arguments); }'
  )(binder)

  if (target.prototype) {
    var Empty = function Empty() {}
    Empty.prototype = target.prototype
    bound.prototype = new Empty()
    Empty.prototype = null
  }

  return bound
}

var implementation$2 = implementation$3

var functionBind = Function.prototype.bind || implementation$2

var bind$1 = functionBind

var src = bind$1.call(Function.call, Object.prototype.hasOwnProperty)

var undefined$1

var $SyntaxError = SyntaxError
var $Function = Function
var $TypeError = TypeError

// eslint-disable-next-line consistent-return
var getEvalledConstructor = function(expressionSyntax) {
  try {
    return $Function(
      '"use strict"; return (' + expressionSyntax + ').constructor;'
    )()
  } catch (e) {}
}

var $gOPD = Object.getOwnPropertyDescriptor
if ($gOPD) {
  try {
    $gOPD({}, '')
  } catch (e) {
    $gOPD = null // this is IE 8, which has a broken gOPD
  }
}

var throwTypeError = function() {
  throw new $TypeError()
}
var ThrowTypeError = $gOPD
  ? (function() {
      try {
        // eslint-disable-next-line no-unused-expressions, no-caller, no-restricted-properties
        arguments.callee // IE 8 does not throw here
        return throwTypeError
      } catch (calleeThrows) {
        try {
          // IE 8 throws on Object.getOwnPropertyDescriptor(arguments, '')
          return $gOPD(arguments, 'callee').get
        } catch (gOPDthrows) {
          return throwTypeError
        }
      }
    })()
  : throwTypeError

var hasSymbols$1 = hasSymbols$2()

var getProto =
  Object.getPrototypeOf ||
  function(x) {
    return x.__proto__
  } // eslint-disable-line no-proto

var needsEval = {}

var TypedArray =
  typeof Uint8Array === 'undefined' ? undefined$1 : getProto(Uint8Array)

var INTRINSICS = {
  '%AggregateError%':
    typeof AggregateError === 'undefined' ? undefined$1 : AggregateError,
  '%Array%': Array,
  '%ArrayBuffer%':
    typeof ArrayBuffer === 'undefined' ? undefined$1 : ArrayBuffer,
  '%ArrayIteratorPrototype%': hasSymbols$1
    ? getProto([][Symbol.iterator]())
    : undefined$1,
  '%AsyncFromSyncIteratorPrototype%': undefined$1,
  '%AsyncFunction%': needsEval,
  '%AsyncGenerator%': needsEval,
  '%AsyncGeneratorFunction%': needsEval,
  '%AsyncIteratorPrototype%': needsEval,
  '%Atomics%': typeof Atomics === 'undefined' ? undefined$1 : Atomics,
  '%BigInt%': typeof BigInt === 'undefined' ? undefined$1 : BigInt,
  '%Boolean%': Boolean,
  '%DataView%': typeof DataView === 'undefined' ? undefined$1 : DataView,
  '%Date%': Date,
  '%decodeURI%': decodeURI,
  '%decodeURIComponent%': decodeURIComponent,
  '%encodeURI%': encodeURI,
  '%encodeURIComponent%': encodeURIComponent,
  '%Error%': Error,
  '%eval%': eval, // eslint-disable-line no-eval
  '%EvalError%': EvalError,
  '%Float32Array%':
    typeof Float32Array === 'undefined' ? undefined$1 : Float32Array,
  '%Float64Array%':
    typeof Float64Array === 'undefined' ? undefined$1 : Float64Array,
  '%FinalizationRegistry%':
    typeof FinalizationRegistry === 'undefined'
      ? undefined$1
      : FinalizationRegistry,
  '%Function%': $Function,
  '%GeneratorFunction%': needsEval,
  '%Int8Array%': typeof Int8Array === 'undefined' ? undefined$1 : Int8Array,
  '%Int16Array%': typeof Int16Array === 'undefined' ? undefined$1 : Int16Array,
  '%Int32Array%': typeof Int32Array === 'undefined' ? undefined$1 : Int32Array,
  '%isFinite%': isFinite,
  '%isNaN%': isNaN,
  '%IteratorPrototype%': hasSymbols$1
    ? getProto(getProto([][Symbol.iterator]()))
    : undefined$1,
  '%JSON%': typeof JSON === 'object' ? JSON : undefined$1,
  '%Map%': typeof Map === 'undefined' ? undefined$1 : Map,
  '%MapIteratorPrototype%':
    typeof Map === 'undefined' || !hasSymbols$1
      ? undefined$1
      : getProto(new Map()[Symbol.iterator]()),
  '%Math%': Math,
  '%Number%': Number,
  '%Object%': Object,
  '%parseFloat%': parseFloat,
  '%parseInt%': parseInt,
  '%Promise%': typeof Promise === 'undefined' ? undefined$1 : Promise,
  '%Proxy%': typeof Proxy === 'undefined' ? undefined$1 : Proxy,
  '%RangeError%': RangeError,
  '%ReferenceError%': ReferenceError,
  '%Reflect%': typeof Reflect === 'undefined' ? undefined$1 : Reflect,
  '%RegExp%': RegExp,
  '%Set%': typeof Set === 'undefined' ? undefined$1 : Set,
  '%SetIteratorPrototype%':
    typeof Set === 'undefined' || !hasSymbols$1
      ? undefined$1
      : getProto(new Set()[Symbol.iterator]()),
  '%SharedArrayBuffer%':
    typeof SharedArrayBuffer === 'undefined' ? undefined$1 : SharedArrayBuffer,
  '%String%': String,
  '%StringIteratorPrototype%': hasSymbols$1
    ? getProto(''[Symbol.iterator]())
    : undefined$1,
  '%Symbol%': hasSymbols$1 ? Symbol : undefined$1,
  '%SyntaxError%': $SyntaxError,
  '%ThrowTypeError%': ThrowTypeError,
  '%TypedArray%': TypedArray,
  '%TypeError%': $TypeError,
  '%Uint8Array%': typeof Uint8Array === 'undefined' ? undefined$1 : Uint8Array,
  '%Uint8ClampedArray%':
    typeof Uint8ClampedArray === 'undefined' ? undefined$1 : Uint8ClampedArray,
  '%Uint16Array%':
    typeof Uint16Array === 'undefined' ? undefined$1 : Uint16Array,
  '%Uint32Array%':
    typeof Uint32Array === 'undefined' ? undefined$1 : Uint32Array,
  '%URIError%': URIError,
  '%WeakMap%': typeof WeakMap === 'undefined' ? undefined$1 : WeakMap,
  '%WeakRef%': typeof WeakRef === 'undefined' ? undefined$1 : WeakRef,
  '%WeakSet%': typeof WeakSet === 'undefined' ? undefined$1 : WeakSet,
}

var doEval = function doEval(name) {
  var value
  if (name === '%AsyncFunction%') {
    value = getEvalledConstructor('async function () {}')
  } else if (name === '%GeneratorFunction%') {
    value = getEvalledConstructor('function* () {}')
  } else if (name === '%AsyncGeneratorFunction%') {
    value = getEvalledConstructor('async function* () {}')
  } else if (name === '%AsyncGenerator%') {
    var fn = doEval('%AsyncGeneratorFunction%')
    if (fn) {
      value = fn.prototype
    }
  } else if (name === '%AsyncIteratorPrototype%') {
    var gen = doEval('%AsyncGenerator%')
    if (gen) {
      value = getProto(gen.prototype)
    }
  }

  INTRINSICS[name] = value

  return value
}

var LEGACY_ALIASES = {
  '%ArrayBufferPrototype%': ['ArrayBuffer', 'prototype'],
  '%ArrayPrototype%': ['Array', 'prototype'],
  '%ArrayProto_entries%': ['Array', 'prototype', 'entries'],
  '%ArrayProto_forEach%': ['Array', 'prototype', 'forEach'],
  '%ArrayProto_keys%': ['Array', 'prototype', 'keys'],
  '%ArrayProto_values%': ['Array', 'prototype', 'values'],
  '%AsyncFunctionPrototype%': ['AsyncFunction', 'prototype'],
  '%AsyncGenerator%': ['AsyncGeneratorFunction', 'prototype'],
  '%AsyncGeneratorPrototype%': [
    'AsyncGeneratorFunction',
    'prototype',
    'prototype',
  ],
  '%BooleanPrototype%': ['Boolean', 'prototype'],
  '%DataViewPrototype%': ['DataView', 'prototype'],
  '%DatePrototype%': ['Date', 'prototype'],
  '%ErrorPrototype%': ['Error', 'prototype'],
  '%EvalErrorPrototype%': ['EvalError', 'prototype'],
  '%Float32ArrayPrototype%': ['Float32Array', 'prototype'],
  '%Float64ArrayPrototype%': ['Float64Array', 'prototype'],
  '%FunctionPrototype%': ['Function', 'prototype'],
  '%Generator%': ['GeneratorFunction', 'prototype'],
  '%GeneratorPrototype%': ['GeneratorFunction', 'prototype', 'prototype'],
  '%Int8ArrayPrototype%': ['Int8Array', 'prototype'],
  '%Int16ArrayPrototype%': ['Int16Array', 'prototype'],
  '%Int32ArrayPrototype%': ['Int32Array', 'prototype'],
  '%JSONParse%': ['JSON', 'parse'],
  '%JSONStringify%': ['JSON', 'stringify'],
  '%MapPrototype%': ['Map', 'prototype'],
  '%NumberPrototype%': ['Number', 'prototype'],
  '%ObjectPrototype%': ['Object', 'prototype'],
  '%ObjProto_toString%': ['Object', 'prototype', 'toString'],
  '%ObjProto_valueOf%': ['Object', 'prototype', 'valueOf'],
  '%PromisePrototype%': ['Promise', 'prototype'],
  '%PromiseProto_then%': ['Promise', 'prototype', 'then'],
  '%Promise_all%': ['Promise', 'all'],
  '%Promise_reject%': ['Promise', 'reject'],
  '%Promise_resolve%': ['Promise', 'resolve'],
  '%RangeErrorPrototype%': ['RangeError', 'prototype'],
  '%ReferenceErrorPrototype%': ['ReferenceError', 'prototype'],
  '%RegExpPrototype%': ['RegExp', 'prototype'],
  '%SetPrototype%': ['Set', 'prototype'],
  '%SharedArrayBufferPrototype%': ['SharedArrayBuffer', 'prototype'],
  '%StringPrototype%': ['String', 'prototype'],
  '%SymbolPrototype%': ['Symbol', 'prototype'],
  '%SyntaxErrorPrototype%': ['SyntaxError', 'prototype'],
  '%TypedArrayPrototype%': ['TypedArray', 'prototype'],
  '%TypeErrorPrototype%': ['TypeError', 'prototype'],
  '%Uint8ArrayPrototype%': ['Uint8Array', 'prototype'],
  '%Uint8ClampedArrayPrototype%': ['Uint8ClampedArray', 'prototype'],
  '%Uint16ArrayPrototype%': ['Uint16Array', 'prototype'],
  '%Uint32ArrayPrototype%': ['Uint32Array', 'prototype'],
  '%URIErrorPrototype%': ['URIError', 'prototype'],
  '%WeakMapPrototype%': ['WeakMap', 'prototype'],
  '%WeakSetPrototype%': ['WeakSet', 'prototype'],
}

var bind = functionBind
var hasOwn = src
var $concat = bind.call(Function.call, Array.prototype.concat)
var $spliceApply = bind.call(Function.apply, Array.prototype.splice)
var $replace = bind.call(Function.call, String.prototype.replace)
var $strSlice = bind.call(Function.call, String.prototype.slice)
var $exec = bind.call(Function.call, RegExp.prototype.exec)

/* adapted from https://github.com/lodash/lodash/blob/4.17.15/dist/lodash.js#L6735-L6744 */
var rePropName = /[^%.[\]]+|\[(?:(-?\d+(?:\.\d+)?)|(["'])((?:(?!\2)[^\\]|\\.)*?)\2)\]|(?=(?:\.|\[\])(?:\.|\[\]|%$))/g
var reEscapeChar = /\\(\\)?/g /** Used to match backslashes in property paths. */
var stringToPath = function stringToPath(string) {
  var first = $strSlice(string, 0, 1)
  var last = $strSlice(string, -1)
  if (first === '%' && last !== '%') {
    throw new $SyntaxError('invalid intrinsic syntax, expected closing `%`')
  } else if (last === '%' && first !== '%') {
    throw new $SyntaxError('invalid intrinsic syntax, expected opening `%`')
  }
  var result = []
  $replace(string, rePropName, function(match, number, quote, subString) {
    result[result.length] = quote
      ? $replace(subString, reEscapeChar, '$1')
      : number || match
  })
  return result
}
/* end adaptation */

var getBaseIntrinsic = function getBaseIntrinsic(name, allowMissing) {
  var intrinsicName = name
  var alias
  if (hasOwn(LEGACY_ALIASES, intrinsicName)) {
    alias = LEGACY_ALIASES[intrinsicName]
    intrinsicName = '%' + alias[0] + '%'
  }

  if (hasOwn(INTRINSICS, intrinsicName)) {
    var value = INTRINSICS[intrinsicName]
    if (value === needsEval) {
      value = doEval(intrinsicName)
    }
    if (typeof value === 'undefined' && !allowMissing) {
      throw new $TypeError(
        'intrinsic ' +
          name +
          ' exists, but is not available. Please file an issue!'
      )
    }

    return {
      alias: alias,
      name: intrinsicName,
      value: value,
    }
  }

  throw new $SyntaxError('intrinsic ' + name + ' does not exist!')
}

var getIntrinsic = function GetIntrinsic(name, allowMissing) {
  if (typeof name !== 'string' || name.length === 0) {
    throw new $TypeError('intrinsic name must be a non-empty string')
  }
  if (arguments.length > 1 && typeof allowMissing !== 'boolean') {
    throw new $TypeError('"allowMissing" argument must be a boolean')
  }

  if ($exec(/^%?[^%]*%?$/g, name) === null) {
    throw new $SyntaxError(
      '`%` may not be present anywhere but at the beginning and end of the intrinsic name'
    )
  }
  var parts = stringToPath(name)
  var intrinsicBaseName = parts.length > 0 ? parts[0] : ''

  var intrinsic = getBaseIntrinsic('%' + intrinsicBaseName + '%', allowMissing)
  var intrinsicRealName = intrinsic.name
  var value = intrinsic.value
  var skipFurtherCaching = false

  var alias = intrinsic.alias
  if (alias) {
    intrinsicBaseName = alias[0]
    $spliceApply(parts, $concat([0, 1], alias))
  }

  for (var i = 1, isOwn = true; i < parts.length; i += 1) {
    var part = parts[i]
    var first = $strSlice(part, 0, 1)
    var last = $strSlice(part, -1)
    if (
      (first === '"' ||
        first === "'" ||
        first === '`' ||
        last === '"' ||
        last === "'" ||
        last === '`') &&
      first !== last
    ) {
      throw new $SyntaxError(
        'property names with quotes must have matching quotes'
      )
    }
    if (part === 'constructor' || !isOwn) {
      skipFurtherCaching = true
    }

    intrinsicBaseName += '.' + part
    intrinsicRealName = '%' + intrinsicBaseName + '%'

    if (hasOwn(INTRINSICS, intrinsicRealName)) {
      value = INTRINSICS[intrinsicRealName]
    } else if (value != null) {
      if (!(part in value)) {
        if (!allowMissing) {
          throw new $TypeError(
            'base intrinsic for ' +
              name +
              ' exists, but the property is not available.'
          )
        }
        return void undefined$1
      }
      if ($gOPD && i + 1 >= parts.length) {
        var desc = $gOPD(value, part)
        isOwn = !!desc

        // By convention, when a data property is converted to an accessor
        // property to emulate a data property that does not suffer from
        // the override mistake, that accessor's getter is marked with
        // an `originalValue` property. Here, when we detect this, we
        // uphold the illusion by pretending to see that original data
        // property, i.e., returning the value rather than the getter
        // itself.
        if (isOwn && 'get' in desc && !('originalValue' in desc.get)) {
          value = desc.get
        } else {
          value = value[part]
        }
      } else {
        isOwn = hasOwn(value, part)
        value = value[part]
      }

      if (isOwn && !skipFurtherCaching) {
        INTRINSICS[intrinsicRealName] = value
      }
    }
  }
  return value
}

var GetIntrinsic = getIntrinsic

var $defineProperty = GetIntrinsic('%Object.defineProperty%', true)

var hasPropertyDescriptors$1 = function hasPropertyDescriptors() {
  if ($defineProperty) {
    try {
      $defineProperty({}, 'a', { value: 1 })
      return true
    } catch (e) {
      // IE 8 has a broken defineProperty
      return false
    }
  }
  return false
}

hasPropertyDescriptors$1.hasArrayLengthDefineBug = function hasArrayLengthDefineBug() {
  // node v0.6 has a bug where array lengths can be Set but not Defined
  if (!hasPropertyDescriptors$1()) {
    return null
  }
  try {
    return $defineProperty([], 'length', { value: 1 }).length !== 1
  } catch (e) {
    // In Firefox 4-22, defining length on an array throws an exception.
    return true
  }
}

var hasPropertyDescriptors_1 = hasPropertyDescriptors$1

var keys = objectKeys
var hasSymbols =
  typeof Symbol === 'function' && typeof Symbol('foo') === 'symbol'

var toStr = Object.prototype.toString
var concat = Array.prototype.concat
var origDefineProperty = Object.defineProperty

var isFunction = function(fn) {
  return typeof fn === 'function' && toStr.call(fn) === '[object Function]'
}

var hasPropertyDescriptors = hasPropertyDescriptors_1()

var supportsDescriptors = origDefineProperty && hasPropertyDescriptors

var defineProperty = function(object, name, value, predicate) {
  if (name in object && (!isFunction(predicate) || !predicate())) {
    return
  }
  if (supportsDescriptors) {
    origDefineProperty(object, name, {
      configurable: true,
      enumerable: false,
      value: value,
      writable: true,
    })
  } else {
    object[name] = value // eslint-disable-line no-param-reassign
  }
}

var defineProperties$1 = function(object, map) {
  var predicates = arguments.length > 2 ? arguments[2] : {}
  var props = keys(map)
  if (hasSymbols) {
    props = concat.call(props, Object.getOwnPropertySymbols(map))
  }
  for (var i = 0; i < props.length; i += 1) {
    defineProperty(object, props[i], map[props[i]], predicates[props[i]])
  }
}

defineProperties$1.supportsDescriptors = !!supportsDescriptors

var defineProperties_1 = defineProperties$1

var implementation_browser = { exports: {} }

/* eslint no-negated-condition: 0, no-new-func: 0 */

if (typeof self !== 'undefined') {
  implementation_browser.exports = self
} else if (typeof window !== 'undefined') {
  implementation_browser.exports = window
} else {
  implementation_browser.exports = Function('return this')()
}

var implementation$1 = implementation_browser.exports

var polyfill$1 = function getPolyfill() {
  if (
    typeof commonjsGlobal !== 'object' ||
    !commonjsGlobal ||
    commonjsGlobal.Math !== Math ||
    commonjsGlobal.Array !== Array
  ) {
    return implementation$1
  }
  return commonjsGlobal
}

var define = defineProperties_1
var getPolyfill$1 = polyfill$1

var shim$1 = function shimGlobal() {
  var polyfill = getPolyfill$1()
  if (define.supportsDescriptors) {
    var descriptor = Object.getOwnPropertyDescriptor(polyfill, 'globalThis')
    if (
      !descriptor ||
      (descriptor.configurable &&
        (descriptor.enumerable ||
          !descriptor.writable ||
          globalThis !== polyfill))
    ) {
      // eslint-disable-line max-len
      Object.defineProperty(polyfill, 'globalThis', {
        configurable: true,
        enumerable: false,
        value: polyfill,
        writable: true,
      })
    }
  } else if (typeof globalThis !== 'object' || globalThis !== polyfill) {
    polyfill.globalThis = polyfill
  }
  return polyfill
}

var defineProperties = defineProperties_1

var implementation = implementation_browser.exports
var getPolyfill = polyfill$1
var shim = shim$1

var polyfill = getPolyfill()

var getGlobal = function() {
  return polyfill
}

defineProperties(getGlobal, {
  getPolyfill: getPolyfill,
  implementation: implementation,
  shim: shim,
})

var globalthis = getGlobal

function ownKeys$1(object, enumerableOnly) {
  var keys = Object.keys(object)
  if (Object.getOwnPropertySymbols) {
    var symbols = Object.getOwnPropertySymbols(object)
    enumerableOnly &&
      (symbols = symbols.filter(function(sym) {
        return Object.getOwnPropertyDescriptor(object, sym).enumerable
      })),
      keys.push.apply(keys, symbols)
  }
  return keys
}

function _objectSpread$1(target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = null != arguments[i] ? arguments[i] : {}
    i % 2
      ? ownKeys$1(Object(source), !0).forEach(function(key) {
          _defineProperty(target, key, source[key])
        })
      : Object.getOwnPropertyDescriptors
      ? Object.defineProperties(
          target,
          Object.getOwnPropertyDescriptors(source)
        )
      : ownKeys$1(Object(source)).forEach(function(key) {
          Object.defineProperty(
            target,
            key,
            Object.getOwnPropertyDescriptor(source, key)
          )
        })
  }
  return target
}
var vtkGlobal = globalthis() // returns native globalThis if compliant

var factoryMapping = {
  vtkObject: function vtkObject() {
    return null
  },
}
function vtk(obj) {
  if (obj === null || obj === undefined) {
    return obj
  }

  if (obj.isA) {
    return obj
  }

  if (!obj.vtkClass) {
    if (vtkGlobal.console && vtkGlobal.console.error) {
      vtkGlobal.console.error('Invalid VTK object')
    }

    return null
  }

  var constructor = factoryMapping[obj.vtkClass]

  if (!constructor) {
    if (vtkGlobal.console && vtkGlobal.console.error) {
      vtkGlobal.console.error(
        'No vtk class found for Object of type '.concat(obj.vtkClass)
      )
    }

    return null
  } // Shallow copy object

  var model = _objectSpread$1({}, obj) // Convert into vtkObject any nested key

  Object.keys(model).forEach(function(keyName) {
    if (
      model[keyName] &&
      _typeof(model[keyName]) === 'object' &&
      model[keyName].vtkClass
    ) {
      model[keyName] = vtk(model[keyName])
    }
  }) // Return the root

  var newInst = constructor(model)

  if (newInst && newInst.modified) {
    newInst.modified()
  }

  return newInst
}

function register(vtkClassName, constructor) {
  factoryMapping[vtkClassName] = constructor
} // Nest register method under the vtk function

vtk.register = register

function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError('Cannot call a class as a function')
  }
}

function _defineProperties(target, props) {
  for (var i = 0; i < props.length; i++) {
    var descriptor = props[i]
    descriptor.enumerable = descriptor.enumerable || false
    descriptor.configurable = true
    if ('value' in descriptor) descriptor.writable = true
    Object.defineProperty(target, descriptor.key, descriptor)
  }
}

function _createClass(Constructor, protoProps, staticProps) {
  if (protoProps) _defineProperties(Constructor.prototype, protoProps)
  if (staticProps) _defineProperties(Constructor, staticProps)
  Object.defineProperty(Constructor, 'prototype', {
    writable: false,
  })
  return Constructor
}

function _getPrototypeOf(o) {
  _getPrototypeOf = Object.setPrototypeOf
    ? Object.getPrototypeOf
    : function _getPrototypeOf(o) {
        return o.__proto__ || Object.getPrototypeOf(o)
      }
  return _getPrototypeOf(o)
}

function _superPropBase(object, property) {
  while (!Object.prototype.hasOwnProperty.call(object, property)) {
    object = _getPrototypeOf(object)
    if (object === null) break
  }

  return object
}

function _get() {
  if (typeof Reflect !== 'undefined' && Reflect.get) {
    _get = Reflect.get
  } else {
    _get = function _get(target, property, receiver) {
      var base = _superPropBase(target, property)
      if (!base) return
      var desc = Object.getOwnPropertyDescriptor(base, property)

      if (desc.get) {
        return desc.get.call(arguments.length < 3 ? target : receiver)
      }

      return desc.value
    }
  }

  return _get.apply(this, arguments)
}

function _inherits(subClass, superClass) {
  if (typeof superClass !== 'function' && superClass !== null) {
    throw new TypeError('Super expression must either be null or a function')
  }

  subClass.prototype = Object.create(superClass && superClass.prototype, {
    constructor: {
      value: subClass,
      writable: true,
      configurable: true,
    },
  })
  Object.defineProperty(subClass, 'prototype', {
    writable: false,
  })
  if (superClass) _setPrototypeOf(subClass, superClass)
}

function _assertThisInitialized(self) {
  if (self === void 0) {
    throw new ReferenceError(
      "this hasn't been initialised - super() hasn't been called"
    )
  }

  return self
}

function _possibleConstructorReturn(self, call) {
  if (call && (_typeof(call) === 'object' || typeof call === 'function')) {
    return call
  } else if (call !== void 0) {
    throw new TypeError(
      'Derived constructors may only return object or undefined'
    )
  }

  return _assertThisInitialized(self)
}

function _isNativeFunction(fn) {
  return Function.toString.call(fn).indexOf('[native code]') !== -1
}

function _wrapNativeSuper(Class) {
  var _cache = typeof Map === 'function' ? new Map() : undefined

  _wrapNativeSuper = function _wrapNativeSuper(Class) {
    if (Class === null || !_isNativeFunction(Class)) return Class

    if (typeof Class !== 'function') {
      throw new TypeError('Super expression must either be null or a function')
    }

    if (typeof _cache !== 'undefined') {
      if (_cache.has(Class)) return _cache.get(Class)

      _cache.set(Class, Wrapper)
    }

    function Wrapper() {
      return _construct(Class, arguments, _getPrototypeOf(this).constructor)
    }

    Wrapper.prototype = Object.create(Class.prototype, {
      constructor: {
        value: Wrapper,
        enumerable: false,
        writable: true,
        configurable: true,
      },
    })
    return _setPrototypeOf(Wrapper, Class)
  }

  return _wrapNativeSuper(Class)
}

function _createSuper(Derived) {
  var hasNativeReflectConstruct = _isNativeReflectConstruct()
  return function _createSuperInternal() {
    var Super = _getPrototypeOf(Derived),
      result
    if (hasNativeReflectConstruct) {
      var NewTarget = _getPrototypeOf(this).constructor
      result = Reflect.construct(Super, arguments, NewTarget)
    } else {
      result = Super.apply(this, arguments)
    }
    return _possibleConstructorReturn(this, result)
  }
}

function _isNativeReflectConstruct() {
  if (typeof Reflect === 'undefined' || !Reflect.construct) return false
  if (Reflect.construct.sham) return false
  if (typeof Proxy === 'function') return true
  try {
    Boolean.prototype.valueOf.call(
      Reflect.construct(Boolean, [], function() {})
    )
    return true
  } catch (e) {
    return false
  }
}

var ClassHierarchy = /*#__PURE__*/ (function(_Array) {
  _inherits(ClassHierarchy, _Array)

  var _super = _createSuper(ClassHierarchy)

  function ClassHierarchy() {
    _classCallCheck(this, ClassHierarchy)

    return _super.apply(this, arguments)
  }

  _createClass(ClassHierarchy, [
    {
      key: 'push',
      value: function push() {
        var _this = this,
          _get2

        for (
          var _len = arguments.length, args = new Array(_len), _key = 0;
          _key < _len;
          _key++
        ) {
          args[_key] = arguments[_key]
        }

        // no perf issue since args.length should be small
        var newArgs = args.filter(function(arg) {
          return !_this.includes(arg)
        })
        return (_get2 = _get(
          _getPrototypeOf(ClassHierarchy.prototype),
          'push',
          this
        )).call.apply(_get2, [this].concat(_toConsumableArray(newArgs)))
      },
    },
  ])

  return ClassHierarchy
})(/*#__PURE__*/ _wrapNativeSuper(Array))

function ownKeys(object, enumerableOnly) {
  var keys = Object.keys(object)
  if (Object.getOwnPropertySymbols) {
    var symbols = Object.getOwnPropertySymbols(object)
    enumerableOnly &&
      (symbols = symbols.filter(function(sym) {
        return Object.getOwnPropertyDescriptor(object, sym).enumerable
      })),
      keys.push.apply(keys, symbols)
  }
  return keys
}

function _objectSpread(target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = null != arguments[i] ? arguments[i] : {}
    i % 2
      ? ownKeys(Object(source), !0).forEach(function(key) {
          _defineProperty(target, key, source[key])
        })
      : Object.getOwnPropertyDescriptors
      ? Object.defineProperties(
          target,
          Object.getOwnPropertyDescriptors(source)
        )
      : ownKeys(Object(source)).forEach(function(key) {
          Object.defineProperty(
            target,
            key,
            Object.getOwnPropertyDescriptor(source, key)
          )
        })
  }
  return target
}
var globalMTime = 0
var VOID = Symbol('void')

function getCurrentGlobalMTime() {
  return globalMTime
} // ----------------------------------------------------------------------------
// Logging function calls
// ----------------------------------------------------------------------------

/* eslint-disable no-prototype-builtins                                      */

var fakeConsole = {}

function noOp() {}

var consoleMethods = [
  'log',
  'debug',
  'info',
  'warn',
  'error',
  'time',
  'timeEnd',
  'group',
  'groupEnd',
]
consoleMethods.forEach(function(methodName) {
  fakeConsole[methodName] = noOp
})
vtkGlobal.console = console.hasOwnProperty('log') ? console : fakeConsole
var loggerFunctions = {
  debug: noOp,
  // Don't print debug by default
  error: vtkGlobal.console.error || noOp,
  info: vtkGlobal.console.info || noOp,
  log: vtkGlobal.console.log || noOp,
  warn: vtkGlobal.console.warn || noOp,
}
function setLoggerFunction(name, fn) {
  if (loggerFunctions[name]) {
    loggerFunctions[name] = fn || noOp
  }
}
function vtkLogMacro() {
  loggerFunctions.log.apply(loggerFunctions, arguments)
}
function vtkInfoMacro() {
  loggerFunctions.info.apply(loggerFunctions, arguments)
}
function vtkDebugMacro() {
  loggerFunctions.debug.apply(loggerFunctions, arguments)
}
function vtkErrorMacro() {
  loggerFunctions.error.apply(loggerFunctions, arguments)
}
function vtkWarningMacro() {
  loggerFunctions.warn.apply(loggerFunctions, arguments)
}
var ERROR_ONCE_MAP = {}
function vtkOnceErrorMacro(str) {
  if (!ERROR_ONCE_MAP[str]) {
    loggerFunctions.error(str)
    ERROR_ONCE_MAP[str] = true
  }
} // ----------------------------------------------------------------------------
// TypedArray
// ----------------------------------------------------------------------------

var TYPED_ARRAYS = Object.create(null)
TYPED_ARRAYS.Float32Array = Float32Array
TYPED_ARRAYS.Float64Array = Float64Array
TYPED_ARRAYS.Uint8Array = Uint8Array
TYPED_ARRAYS.Int8Array = Int8Array
TYPED_ARRAYS.Uint16Array = Uint16Array
TYPED_ARRAYS.Int16Array = Int16Array
TYPED_ARRAYS.Uint32Array = Uint32Array
TYPED_ARRAYS.Int32Array = Int32Array
TYPED_ARRAYS.Uint8ClampedArray = Uint8ClampedArray // TYPED_ARRAYS.BigInt64Array = BigInt64Array;
// TYPED_ARRAYS.BigUint64Array = BigUint64Array;

function newTypedArray(type) {
  for (
    var _len = arguments.length,
      args = new Array(_len > 1 ? _len - 1 : 0),
      _key = 1;
    _key < _len;
    _key++
  ) {
    args[_key - 1] = arguments[_key]
  }

  return _construct(TYPED_ARRAYS[type] || Float64Array, args)
}
function newTypedArrayFrom(type) {
  var _ref

  for (
    var _len2 = arguments.length,
      args = new Array(_len2 > 1 ? _len2 - 1 : 0),
      _key2 = 1;
    _key2 < _len2;
    _key2++
  ) {
    args[_key2 - 1] = arguments[_key2]
  }

  return (_ref = TYPED_ARRAYS[type] || Float64Array).from.apply(_ref, args)
} // ----------------------------------------------------------------------------
// capitilize provided string
// ----------------------------------------------------------------------------

function capitalize(str) {
  return str.charAt(0).toUpperCase() + str.slice(1)
}
function _capitalize(str) {
  return capitalize(str[0] === '_' ? str.slice(1) : str)
}
function uncapitalize(str) {
  return str.charAt(0).toLowerCase() + str.slice(1)
} // ----------------------------------------------------------------------------
// Convert byte size into a well formatted string
// ----------------------------------------------------------------------------

function formatBytesToProperUnit(size) {
  var precision =
    arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 2
  var chunkSize =
    arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 1000
  var units = ['TB', 'GB', 'MB', 'KB']
  var value = Number(size)
  var currentUnit = 'B'

  while (value > chunkSize) {
    value /= chunkSize
    currentUnit = units.pop()
  }

  return ''.concat(value.toFixed(precision), ' ').concat(currentUnit)
} // ----------------------------------------------------------------------------
// Convert thousand number with proper separator
// ----------------------------------------------------------------------------

function formatNumbersWithThousandSeparator(n) {
  var separator =
    arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : ' '
  var sections = []
  var size = n

  while (size > 1000) {
    sections.push('000'.concat(size % 1000).slice(-3))
    size = Math.floor(size / 1000)
  }

  if (size > 0) {
    sections.push(size)
  }

  sections.reverse()
  return sections.join(separator)
} // ----------------------------------------------------------------------------
// Array helper
// ----------------------------------------------------------------------------

function safeArrays(model) {
  Object.keys(model).forEach(function(key) {
    if (Array.isArray(model[key])) {
      model[key] = [].concat(model[key])
    }
  })
} // ----------------------------------------------------------------------------
// shallow equals
// ----------------------------------------------------------------------------

function shallowEquals(a, b) {
  if (a === b) {
    return true
  }

  if (Array.isArray(a) && Array.isArray(b)) {
    if (a.length !== b.length) {
      return false
    }

    for (var i = 0; i < a.length; i++) {
      if (a[i] !== b[i]) {
        return false
      }
    }

    return true
  }

  return false
} // ----------------------------------------------------------------------------

function enumToString(e, value) {
  return Object.keys(e).find(function(key) {
    return e[key] === value
  })
}

function getStateArrayMapFunc(item) {
  if (item && item.isA) {
    return item.getState()
  }

  return item
} // ----------------------------------------------------------------------------
// setImmediate
// ----------------------------------------------------------------------------

function setImmediateVTK(fn) {
  setTimeout(fn, 0)
} // ----------------------------------------------------------------------------
// measurePromiseExecution
//
// Measures the time it takes for a promise to finish from
//   the time this function is invoked.
// The callback receives the time it took for the promise to resolve or reject.
// ----------------------------------------------------------------------------

function measurePromiseExecution(promise, callback) {
  var start = performance.now()
  promise.finally(function() {
    var delta = performance.now() - start
    callback(delta)
  })
} // ----------------------------------------------------------------------------
// vtkObject: modified(), onModified(callback), delete()
// ----------------------------------------------------------------------------

function obj() {
  var publicAPI =
    arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {}
  var model =
    arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {}
  // Ensure each instance as a unique ref of array
  safeArrays(model)
  var callbacks = []

  if (!Number.isInteger(model.mtime)) {
    model.mtime = ++globalMTime
  }

  if (!('classHierarchy' in model)) {
    model.classHierarchy = new ClassHierarchy('vtkObject')
  } else if (!(model.classHierarchy instanceof ClassHierarchy)) {
    model.classHierarchy = ClassHierarchy.from(model.classHierarchy)
  }

  function off(index) {
    callbacks[index] = null
  }

  function on(index) {
    function unsubscribe() {
      off(index)
    }

    return Object.freeze({
      unsubscribe: unsubscribe,
    })
  }

  publicAPI.isDeleted = function() {
    return !!model.deleted
  }

  publicAPI.modified = function(otherMTime) {
    if (model.deleted) {
      vtkErrorMacro('instance deleted - cannot call any method')
      return
    }

    if (otherMTime && otherMTime < publicAPI.getMTime()) {
      return
    }

    model.mtime = ++globalMTime
    callbacks.forEach(function(callback) {
      return callback && callback(publicAPI)
    })
  }

  publicAPI.onModified = function(callback) {
    if (model.deleted) {
      vtkErrorMacro('instance deleted - cannot call any method')
      return null
    }

    var index = callbacks.length
    callbacks.push(callback)
    return on(index)
  }

  publicAPI.getMTime = function() {
    return model.mtime
  }

  publicAPI.isA = function(className) {
    var count = model.classHierarchy.length // we go backwards as that is more likely for
    // early termination

    while (count--) {
      if (model.classHierarchy[count] === className) {
        return true
      }
    }

    return false
  }

  publicAPI.getClassName = function() {
    var depth =
      arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0
    return model.classHierarchy[model.classHierarchy.length - 1 - depth]
  }

  publicAPI.set = function() {
    var map =
      arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {}
    var noWarning =
      arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false
    var noFunction =
      arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false
    var ret = false
    Object.keys(map).forEach(function(name) {
      var fn = noFunction ? null : publicAPI['set'.concat(capitalize(name))]

      if (fn && Array.isArray(map[name]) && fn.length > 1) {
        ret = fn.apply(void 0, _toConsumableArray(map[name])) || ret
      } else if (fn) {
        ret = fn(map[name]) || ret
      } else {
        // Set data on model directly
        if (['mtime'].indexOf(name) === -1 && !noWarning) {
          vtkWarningMacro(
            'Warning: Set value to model directly '
              .concat(name, ', ')
              .concat(map[name])
          )
        }

        ret = model[name] !== map[name] || ret
        model[name] = map[name]
      }
    })
    return ret
  }

  publicAPI.get = function() {
    for (
      var _len3 = arguments.length, list = new Array(_len3), _key3 = 0;
      _key3 < _len3;
      _key3++
    ) {
      list[_key3] = arguments[_key3]
    }

    if (!list.length) {
      return model
    }

    var subset = {}
    list.forEach(function(name) {
      subset[name] = model[name]
    })
    return subset
  }

  publicAPI.getReferenceByName = function(val) {
    return model[val]
  }

  publicAPI.delete = function() {
    Object.keys(model).forEach(function(field) {
      return delete model[field]
    })
    callbacks.forEach(function(el, index) {
      return off(index)
    }) // Flag the instance being deleted

    model.deleted = true
  } // Add serialization support

  publicAPI.getState = function() {
    if (model.deleted) {
      return null
    }

    var jsonArchive = _objectSpread(
      _objectSpread({}, model),
      {},
      {
        vtkClass: publicAPI.getClassName(),
      }
    ) // Convert every vtkObject to its serializable form

    Object.keys(jsonArchive).forEach(function(keyName) {
      if (
        jsonArchive[keyName] === null ||
        jsonArchive[keyName] === undefined ||
        keyName[0] === '_' // protected members start with _
      ) {
        delete jsonArchive[keyName]
      } else if (jsonArchive[keyName].isA) {
        jsonArchive[keyName] = jsonArchive[keyName].getState()
      } else if (Array.isArray(jsonArchive[keyName])) {
        jsonArchive[keyName] = jsonArchive[keyName].map(getStateArrayMapFunc)
      }
    }) // Sort resulting object by key name

    var sortedObj = {}
    Object.keys(jsonArchive)
      .sort()
      .forEach(function(name) {
        sortedObj[name] = jsonArchive[name]
      }) // Remove mtime

    if (sortedObj.mtime) {
      delete sortedObj.mtime
    }

    return sortedObj
  } // Add shallowCopy(otherInstance) support

  publicAPI.shallowCopy = function(other) {
    var debug =
      arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false

    if (other.getClassName() !== publicAPI.getClassName()) {
      throw new Error(
        'Cannot ShallowCopy '
          .concat(other.getClassName(), ' into ')
          .concat(publicAPI.getClassName())
      )
    }

    var otherModel = other.get()
    var keyList = Object.keys(model).sort()
    var otherKeyList = Object.keys(otherModel).sort()
    otherKeyList.forEach(function(key) {
      var keyIdx = keyList.indexOf(key)

      if (keyIdx === -1) {
        if (debug) {
          vtkDebugMacro('add '.concat(key, ' in shallowCopy'))
        }
      } else {
        keyList.splice(keyIdx, 1)
      }

      model[key] = otherModel[key]
    })

    if (keyList.length && debug) {
      vtkDebugMacro('Untouched keys: '.concat(keyList.join(', ')))
    }

    publicAPI.modified()
  } // This function will get called when one invoke JSON.stringify(vtkObject)
  // JSON.stringify will only stringify the return value of this function

  publicAPI.toJSON = function vtkObjToJSON() {
    return publicAPI.getState()
  } // Allow usage as decorator

  return publicAPI
} // ----------------------------------------------------------------------------
// getXXX: add getters
// ----------------------------------------------------------------------------

function get(publicAPI, model, fieldNames) {
  fieldNames.forEach(function(field) {
    if (_typeof(field) === 'object') {
      publicAPI['get'.concat(_capitalize(field.name))] = function() {
        return model[field.name]
      }
    } else {
      publicAPI['get'.concat(_capitalize(field))] = function() {
        return model[field]
      }
    }
  })
} // ----------------------------------------------------------------------------
// setXXX: add setters
// ----------------------------------------------------------------------------

var objectSetterMap = {
  enum: function _enum(publicAPI, model, field) {
    return function(value) {
      if (typeof value === 'string') {
        if (field.enum[value] !== undefined) {
          if (model[field.name] !== field.enum[value]) {
            model[field.name] = field.enum[value]
            publicAPI.modified()
            return true
          }

          return false
        }

        vtkErrorMacro(
          'Set Enum with invalid argument '.concat(field, ', ').concat(value)
        )
        throw new RangeError('Set Enum with invalid string argument')
      }

      if (typeof value === 'number') {
        if (model[field.name] !== value) {
          if (
            Object.keys(field.enum)
              .map(function(key) {
                return field.enum[key]
              })
              .indexOf(value) !== -1
          ) {
            model[field.name] = value
            publicAPI.modified()
            return true
          }

          vtkErrorMacro(
            'Set Enum outside numeric range '.concat(field, ', ').concat(value)
          )
          throw new RangeError('Set Enum outside numeric range')
        }

        return false
      }

      vtkErrorMacro(
        'Set Enum with invalid argument (String/Number) '
          .concat(field, ', ')
          .concat(value)
      )
      throw new TypeError('Set Enum with invalid argument (String/Number)')
    }
  },
}

function findSetter(field) {
  if (_typeof(field) === 'object') {
    var fn = objectSetterMap[field.type]

    if (fn) {
      return function(publicAPI, model) {
        return fn(publicAPI, model, field)
      }
    }

    vtkErrorMacro('No setter for field '.concat(field))
    throw new TypeError('No setter for field')
  }

  return function getSetter(publicAPI, model) {
    return function setter(value) {
      if (model.deleted) {
        vtkErrorMacro('instance deleted - cannot call any method')
        return false
      }

      if (model[field] !== value) {
        model[field] = value
        publicAPI.modified()
        return true
      }

      return false
    }
  }
}

function set(publicAPI, model, fields) {
  fields.forEach(function(field) {
    if (_typeof(field) === 'object') {
      publicAPI['set'.concat(_capitalize(field.name))] = findSetter(field)(
        publicAPI,
        model
      )
    } else {
      publicAPI['set'.concat(_capitalize(field))] = findSetter(field)(
        publicAPI,
        model
      )
    }
  })
} // ----------------------------------------------------------------------------
// set/get XXX: add both setters and getters
// ----------------------------------------------------------------------------

function setGet(publicAPI, model, fieldNames) {
  get(publicAPI, model, fieldNames)
  set(publicAPI, model, fieldNames)
} // ----------------------------------------------------------------------------
// getXXX: add getters for object of type array with copy to be safe
// getXXXByReference: add getters for object of type array without copy
// ----------------------------------------------------------------------------

function getArray(publicAPI, model, fieldNames) {
  fieldNames.forEach(function(field) {
    publicAPI['get'.concat(_capitalize(field))] = function() {
      return model[field] ? [].concat(model[field]) : model[field]
    }

    publicAPI['get'.concat(_capitalize(field), 'ByReference')] = function() {
      return model[field]
    }
  })
} // ----------------------------------------------------------------------------
// setXXX: add setter for object of type array
// if 'defaultVal' is supplied, shorter arrays will be padded to 'size' with 'defaultVal'
// set...From: fast path to copy the content of an array to the current one without call to modified.
// ----------------------------------------------------------------------------

function setArray(publicAPI, model, fieldNames, size) {
  var defaultVal =
    arguments.length > 4 && arguments[4] !== undefined
      ? arguments[4]
      : undefined
  fieldNames.forEach(function(field) {
    if (model[field] && size && model[field].length !== size) {
      throw new RangeError(
        'Invalid initial number of values for array ('.concat(field, ')')
      )
    }

    publicAPI['set'.concat(_capitalize(field))] = function() {
      if (model.deleted) {
        vtkErrorMacro('instance deleted - cannot call any method')
        return false
      }

      for (
        var _len4 = arguments.length, args = new Array(_len4), _key4 = 0;
        _key4 < _len4;
        _key4++
      ) {
        args[_key4] = arguments[_key4]
      }

      var array = args
      var changeDetected
      var needCopy = false // allow null or an array to be passed as a single arg.

      if (array.length === 1 && (array[0] == null || array[0].length >= 0)) {
        /* eslint-disable prefer-destructuring */
        array = array[0]
        /* eslint-enable prefer-destructuring */

        needCopy = true
      }

      if (array == null) {
        changeDetected = model[field] !== array
      } else {
        if (size && array.length !== size) {
          if (array.length < size && defaultVal !== undefined) {
            array = Array.from(array)
            needCopy = false

            while (array.length < size) {
              array.push(defaultVal)
            }
          } else {
            throw new RangeError(
              'Invalid number of values for array setter ('.concat(field, ')')
            )
          }
        }

        changeDetected =
          model[field] == null ||
          model[field].some(function(item, index) {
            return item !== array[index]
          }) ||
          model[field].length !== array.length

        if (changeDetected && needCopy) {
          array = Array.from(array)
        }
      }

      if (changeDetected) {
        model[field] = array
        publicAPI.modified()
      }

      return changeDetected
    }

    publicAPI['set'.concat(_capitalize(field), 'From')] = function(otherArray) {
      var target = model[field]
      otherArray.forEach(function(v, i) {
        target[i] = v
      })
    }
  })
} // ----------------------------------------------------------------------------
// set/get XXX: add setter and getter for object of type array
// ----------------------------------------------------------------------------

function setGetArray(publicAPI, model, fieldNames, size) {
  var defaultVal =
    arguments.length > 4 && arguments[4] !== undefined
      ? arguments[4]
      : undefined
  getArray(publicAPI, model, fieldNames)
  setArray(publicAPI, model, fieldNames, size, defaultVal)
}
function moveToProtected(publicAPI, model, fieldNames) {
  for (var i = 0; i < fieldNames.length; i++) {
    var fieldName = fieldNames[i]

    if (model[fieldName] !== undefined) {
      model['_'.concat(fieldName)] = model[fieldName]
      delete model[fieldName]
    }
  }
} // ----------------------------------------------------------------------------
// vtkAlgorithm: setInputData(), setInputConnection(), getOutputData(), getOutputPort()
// ----------------------------------------------------------------------------

function algo(publicAPI, model, numberOfInputs, numberOfOutputs) {
  if (model.inputData) {
    model.inputData = model.inputData.map(vtk)
  } else {
    model.inputData = []
  }

  if (model.inputConnection) {
    model.inputConnection = model.inputConnection.map(vtk)
  } else {
    model.inputConnection = []
  }

  if (model.output) {
    model.output = model.output.map(vtk)
  } else {
    model.output = []
  }

  if (model.inputArrayToProcess) {
    model.inputArrayToProcess = model.inputArrayToProcess.map(vtk)
  } else {
    model.inputArrayToProcess = []
  } // Cache the argument for later manipulation

  model.numberOfInputs = numberOfInputs // Methods

  function setInputData(dataset) {
    var port =
      arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0

    if (model.deleted) {
      vtkErrorMacro('instance deleted - cannot call any method')
      return
    }

    if (port >= model.numberOfInputs) {
      vtkErrorMacro(
        'algorithm '
          .concat(publicAPI.getClassName(), ' only has ')
          .concat(
            model.numberOfInputs,
            ' input ports. To add more input ports, use addInputData()'
          )
      )
      return
    }

    if (model.inputData[port] !== dataset || model.inputConnection[port]) {
      model.inputData[port] = dataset
      model.inputConnection[port] = null

      if (publicAPI.modified) {
        publicAPI.modified()
      }
    }
  }

  function getInputData() {
    var port =
      arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0

    if (model.inputConnection[port]) {
      model.inputData[port] = model.inputConnection[port]()
    }

    return model.inputData[port]
  }

  function setInputConnection(outputPort) {
    var port =
      arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0

    if (model.deleted) {
      vtkErrorMacro('instance deleted - cannot call any method')
      return
    }

    if (port >= model.numberOfInputs) {
      var msg = 'algorithm '.concat(publicAPI.getClassName(), ' only has ')
      msg += ''.concat(model.numberOfInputs)
      msg += ' input ports. To add more input ports, use addInputConnection()'
      vtkErrorMacro(msg)
      return
    }

    model.inputData[port] = null
    model.inputConnection[port] = outputPort
  }

  function getInputConnection() {
    var port =
      arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0
    return model.inputConnection[port]
  }

  function getPortToFill() {
    var portToFill = model.numberOfInputs

    while (
      portToFill &&
      !model.inputData[portToFill - 1] &&
      !model.inputConnection[portToFill - 1]
    ) {
      portToFill--
    }

    if (portToFill === model.numberOfInputs) {
      model.numberOfInputs++
    }

    return portToFill
  }

  function addInputConnection(outputPort) {
    if (model.deleted) {
      vtkErrorMacro('instance deleted - cannot call any method')
      return
    }

    setInputConnection(outputPort, getPortToFill())
  }

  function addInputData(dataset) {
    if (model.deleted) {
      vtkErrorMacro('instance deleted - cannot call any method')
      return
    }

    setInputData(dataset, getPortToFill())
  }

  function getOutputData() {
    var port =
      arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0

    if (model.deleted) {
      vtkErrorMacro('instance deleted - cannot call any method')
      return null
    }

    if (publicAPI.shouldUpdate()) {
      publicAPI.update()
    }

    return model.output[port]
  }

  publicAPI.shouldUpdate = function() {
    var localMTime = publicAPI.getMTime()
    var minOutputMTime = Infinity
    var count = numberOfOutputs

    while (count--) {
      if (!model.output[count] || model.output[count].isDeleted()) {
        return true
      }

      var mt = model.output[count].getMTime()

      if (mt < localMTime) {
        return true
      }

      if (mt < minOutputMTime) {
        minOutputMTime = mt
      }
    }

    count = model.numberOfInputs

    while (count--) {
      var _model$inputConnectio, _publicAPI$getInputDa

      if (
        ((_model$inputConnectio = model.inputConnection[count]) !== null &&
          _model$inputConnectio !== void 0 &&
          _model$inputConnectio.filter.shouldUpdate()) ||
        ((_publicAPI$getInputDa = publicAPI.getInputData(count)) === null ||
        _publicAPI$getInputDa === void 0
          ? void 0
          : _publicAPI$getInputDa.getMTime()) > minOutputMTime
      ) {
        return true
      }
    }

    return false
  }

  function getOutputPort() {
    var port =
      arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0

    var outputPortAccess = function outputPortAccess() {
      return getOutputData(port)
    } // Add reference to filter

    outputPortAccess.filter = publicAPI
    return outputPortAccess
  } // Handle input if needed

  if (model.numberOfInputs) {
    // Reserve inputs
    var count = model.numberOfInputs

    while (count--) {
      model.inputData.push(null)
      model.inputConnection.push(null)
    } // Expose public methods

    publicAPI.setInputData = setInputData
    publicAPI.setInputConnection = setInputConnection
    publicAPI.addInputData = addInputData
    publicAPI.addInputConnection = addInputConnection
    publicAPI.getInputData = getInputData
    publicAPI.getInputConnection = getInputConnection
  }

  if (numberOfOutputs) {
    publicAPI.getOutputData = getOutputData
    publicAPI.getOutputPort = getOutputPort
  }

  publicAPI.update = function() {
    var ins = []

    if (model.numberOfInputs) {
      var _count = 0

      while (_count < model.numberOfInputs) {
        ins[_count] = publicAPI.getInputData(_count)
        _count++
      }
    }

    if (publicAPI.shouldUpdate() && publicAPI.requestData) {
      publicAPI.requestData(ins, model.output)
    }
  }

  publicAPI.getNumberOfInputPorts = function() {
    return model.numberOfInputs
  }

  publicAPI.getNumberOfOutputPorts = function() {
    return numberOfOutputs || model.output.length
  }

  publicAPI.getInputArrayToProcess = function(inputPort) {
    var arrayDesc = model.inputArrayToProcess[inputPort]
    var ds = model.inputData[inputPort]

    if (arrayDesc && ds) {
      return ds['get'.concat(arrayDesc.fieldAssociation)]().getArray(
        arrayDesc.arrayName
      )
    }

    return null
  }

  publicAPI.setInputArrayToProcess = function(
    inputPort,
    arrayName,
    fieldAssociation
  ) {
    var attributeType =
      arguments.length > 3 && arguments[3] !== undefined
        ? arguments[3]
        : 'Scalars'

    while (model.inputArrayToProcess.length < inputPort) {
      model.inputArrayToProcess.push(null)
    }

    model.inputArrayToProcess[inputPort] = {
      arrayName: arrayName,
      fieldAssociation: fieldAssociation,
      attributeType: attributeType,
    }
  }
} // ----------------------------------------------------------------------------
// Event handling: onXXX(callback), invokeXXX(args...)
// ----------------------------------------------------------------------------

var EVENT_ABORT = Symbol('Event abort')
function event(publicAPI, model, eventName) {
  var callbacks = []
  var previousDelete = publicAPI.delete
  var curCallbackID = 1

  function off(callbackID) {
    for (var i = 0; i < callbacks.length; ++i) {
      var _callbacks$i = _slicedToArray(callbacks[i], 1),
        cbID = _callbacks$i[0]

      if (cbID === callbackID) {
        callbacks.splice(i, 1)
        return
      }
    }
  }

  function on(callbackID) {
    function unsubscribe() {
      off(callbackID)
    }

    return Object.freeze({
      unsubscribe: unsubscribe,
    })
  }

  function invoke() {
    var _arguments = arguments

    if (model.deleted) {
      vtkErrorMacro('instance deleted - cannot call any method')
      return
    }
    /* eslint-disable prefer-rest-params */
    // Go through a copy of the callbacks array in case new callbacks
    // get prepended within previous callbacks

    var currentCallbacks = callbacks.slice()

    var _loop = function _loop(index) {
      var _currentCallbacks$ind = _slicedToArray(currentCallbacks[index], 3),
        cb = _currentCallbacks$ind[1],
        priority = _currentCallbacks$ind[2]

      if (!cb) {
        return 'continue' // eslint-disable-line
      }

      if (priority < 0) {
        setTimeout(function() {
          return cb.apply(publicAPI, _arguments)
        }, 1 - priority)
      } else {
        // Abort only if the callback explicitly returns false
        var continueNext = cb.apply(publicAPI, _arguments)

        if (continueNext === EVENT_ABORT) {
          return 'break'
        }
      }
    }

    for (var index = 0; index < currentCallbacks.length; ++index) {
      var _ret = _loop(index)

      if (_ret === 'continue') continue
      if (_ret === 'break') break
    }
    /* eslint-enable prefer-rest-params */
  }

  publicAPI['invoke'.concat(_capitalize(eventName))] = invoke

  publicAPI['on'.concat(_capitalize(eventName))] = function(callback) {
    var priority =
      arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0.0

    if (!callback.apply) {
      console.error('Invalid callback for event '.concat(eventName))
      return null
    }

    if (model.deleted) {
      vtkErrorMacro('instance deleted - cannot call any method')
      return null
    }

    var callbackID = curCallbackID++
    callbacks.push([callbackID, callback, priority])
    callbacks.sort(function(cb1, cb2) {
      return cb2[2] - cb1[2]
    })
    return on(callbackID)
  }

  publicAPI.delete = function() {
    previousDelete()
    callbacks.forEach(function(_ref2) {
      var _ref3 = _slicedToArray(_ref2, 1),
        cbID = _ref3[0]

      return off(cbID)
    })
  }
} // ----------------------------------------------------------------------------
// newInstance
// ----------------------------------------------------------------------------

function newInstance$1(extend, className) {
  var constructor = function constructor() {
    var initialValues =
      arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {}
    var model = {}
    var publicAPI = {}
    extend(publicAPI, model, initialValues)
    return Object.freeze(publicAPI)
  } // Register constructor to factory

  if (className) {
    vtk.register(className, constructor)
  }

  return constructor
} // ----------------------------------------------------------------------------
// Chain function calls
// ----------------------------------------------------------------------------

function chain() {
  for (
    var _len5 = arguments.length, fn = new Array(_len5), _key5 = 0;
    _key5 < _len5;
    _key5++
  ) {
    fn[_key5] = arguments[_key5]
  }

  return function() {
    for (
      var _len6 = arguments.length, args = new Array(_len6), _key6 = 0;
      _key6 < _len6;
      _key6++
    ) {
      args[_key6] = arguments[_key6]
    }

    return fn
      .filter(function(i) {
        return !!i
      })
      .map(function(i) {
        return i.apply(void 0, args)
      })
  }
} // ----------------------------------------------------------------------------
// Some utility methods for vtk objects
// ----------------------------------------------------------------------------

function isVtkObject(instance) {
  return instance && instance.isA && instance.isA('vtkObject')
}
function traverseInstanceTree(instance, extractFunction) {
  var accumulator =
    arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : []
  var visitedInstances =
    arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : []

  if (isVtkObject(instance)) {
    if (visitedInstances.indexOf(instance) >= 0) {
      // avoid cycles
      return accumulator
    }

    visitedInstances.push(instance)
    var result = extractFunction(instance)

    if (result !== undefined) {
      accumulator.push(result)
    } // Now go through this instance's model

    var model = instance.get()
    Object.keys(model).forEach(function(key) {
      var modelObj = model[key]

      if (Array.isArray(modelObj)) {
        modelObj.forEach(function(subObj) {
          traverseInstanceTree(
            subObj,
            extractFunction,
            accumulator,
            visitedInstances
          )
        })
      } else {
        traverseInstanceTree(
          modelObj,
          extractFunction,
          accumulator,
          visitedInstances
        )
      }
    })
  }

  return accumulator
} // ----------------------------------------------------------------------------
// Returns a function, that, as long as it continues to be invoked, will not
// be triggered. The function will be called after it stops being called for
// N milliseconds. If `immediate` is passed, trigger the function on the
// leading edge, instead of the trailing.

function debounce(func, wait, immediate) {
  var _this = this

  var timeout

  var debounced = function debounced() {
    for (
      var _len7 = arguments.length, args = new Array(_len7), _key7 = 0;
      _key7 < _len7;
      _key7++
    ) {
      args[_key7] = arguments[_key7]
    }

    var context = _this

    var later = function later() {
      timeout = null

      if (!immediate) {
        func.apply(context, args)
      }
    }

    var callNow = immediate && !timeout
    clearTimeout(timeout)
    timeout = setTimeout(later, wait)

    if (callNow) {
      func.apply(context, args)
    }
  }

  debounced.cancel = function() {
    return clearTimeout(timeout)
  }

  return debounced
} // ----------------------------------------------------------------------------
// Creates a throttled function that only invokes `func` at most once per
// every `wait` milliseconds.

function throttle(callback, delay) {
  var isThrottled = false
  var argsToUse = null

  function next() {
    isThrottled = false

    if (argsToUse !== null) {
      wrapper.apply(void 0, _toConsumableArray(argsToUse)) // eslint-disable-line

      argsToUse = null
    }
  }

  function wrapper() {
    for (
      var _len8 = arguments.length, args = new Array(_len8), _key8 = 0;
      _key8 < _len8;
      _key8++
    ) {
      args[_key8] = arguments[_key8]
    }

    if (isThrottled) {
      argsToUse = args
      return
    }

    isThrottled = true
    callback.apply(void 0, args)
    setTimeout(next, delay)
  }

  return wrapper
} // ----------------------------------------------------------------------------
// keystore(publicAPI, model, initialKeystore)
//
//    - initialKeystore: Initial keystore. This can be either a Map or an
//      object.
//
// Generated API
//  setKey(key, value) : mixed (returns value)
//  getKey(key) : mixed
//  getAllKeys() : [mixed]
//  deleteKey(key) : Boolean
// ----------------------------------------------------------------------------

function keystore(publicAPI, model) {
  var initialKeystore =
    arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {}
  model.keystore = Object.assign(model.keystore || {}, initialKeystore)

  publicAPI.setKey = function(key, value) {
    model.keystore[key] = value
  }

  publicAPI.getKey = function(key) {
    return model.keystore[key]
  }

  publicAPI.getAllKeys = function() {
    return Object.keys(model.keystore)
  }

  publicAPI.deleteKey = function(key) {
    return delete model.keystore[key]
  }

  publicAPI.clearKeystore = function() {
    return publicAPI.getAllKeys().forEach(function(key) {
      return delete model.keystore[key]
    })
  }
} // ----------------------------------------------------------------------------
// proxy(publicAPI, model, sectionName, propertyUI)
//
//    - sectionName: Name of the section for UI
//    - propertyUI: List of props with their UI description
//
// Generated API
//  getProxyId() : String
//  listProxyProperties() : [string]
//  updateProxyProperty(name, prop)
//  getProxySection() => List of properties for UI generation
// ----------------------------------------------------------------------------

var nextProxyId = 1
var ROOT_GROUP_NAME = '__root__'
function proxy(publicAPI, model) {
  // Proxies are keystores
  keystore(publicAPI, model)
  var parentDelete = publicAPI.delete // getProxyId

  model.proxyId = ''.concat(nextProxyId++) // ui handling

  model.ui = JSON.parse(JSON.stringify(model.ui || [])) // deep copy

  get(publicAPI, model, ['proxyId', 'proxyGroup', 'proxyName'])
  setGet(publicAPI, model, ['proxyManager']) // group properties

  var propertyMap = {}
  var groupChildrenNames = {}

  function registerProperties(descriptionList, currentGroupName) {
    if (!groupChildrenNames[currentGroupName]) {
      groupChildrenNames[currentGroupName] = []
    }

    var childrenNames = groupChildrenNames[currentGroupName]

    for (var i = 0; i < descriptionList.length; i++) {
      childrenNames.push(descriptionList[i].name)
      propertyMap[descriptionList[i].name] = descriptionList[i]

      if (descriptionList[i].children && descriptionList[i].children.length) {
        registerProperties(descriptionList[i].children, descriptionList[i].name)
      }
    }
  }

  registerProperties(model.ui, ROOT_GROUP_NAME)

  publicAPI.updateUI = function(ui) {
    model.ui = JSON.parse(JSON.stringify(ui || [])) // deep copy

    Object.keys(propertyMap).forEach(function(k) {
      return delete propertyMap[k]
    })
    Object.keys(groupChildrenNames).forEach(function(k) {
      return delete groupChildrenNames[k]
    })
    registerProperties(model.ui, ROOT_GROUP_NAME)
    publicAPI.modified()
  }

  function listProxyProperties() {
    var gName =
      arguments.length > 0 && arguments[0] !== undefined
        ? arguments[0]
        : ROOT_GROUP_NAME
    return groupChildrenNames[gName]
  }

  publicAPI.updateProxyProperty = function(propertyName, propUI) {
    var prop = propertyMap[propertyName]

    if (prop) {
      Object.assign(prop, propUI)
    } else {
      propertyMap[propertyName] = _objectSpread({}, propUI)
    }
  }

  publicAPI.activate = function() {
    if (model.proxyManager) {
      var setActiveMethod = 'setActive'.concat(
        _capitalize(publicAPI.getProxyGroup().slice(0, -1))
      )

      if (model.proxyManager[setActiveMethod]) {
        model.proxyManager[setActiveMethod](publicAPI)
      }
    }
  } // property link

  model.propertyLinkSubscribers = {}

  publicAPI.registerPropertyLinkForGC = function(otherLink, type) {
    if (!(type in model.propertyLinkSubscribers)) {
      model.propertyLinkSubscribers[type] = []
    }

    model.propertyLinkSubscribers[type].push(otherLink)
  }

  publicAPI.gcPropertyLinks = function(type) {
    var subscribers = model.propertyLinkSubscribers[type] || []

    while (subscribers.length) {
      subscribers.pop().unbind(publicAPI)
    }
  }

  model.propertyLinkMap = {}

  publicAPI.getPropertyLink = function(id) {
    var persistent =
      arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false

    if (model.propertyLinkMap[id]) {
      return model.propertyLinkMap[id]
    }

    var value = null
    var links = []
    var count = 0
    var updateInProgress = false

    function update(source) {
      var force =
        arguments.length > 1 && arguments[1] !== undefined
          ? arguments[1]
          : false

      if (updateInProgress) {
        return null
      }

      var needUpdate = []
      var sourceLink = null
      count = links.length

      while (count--) {
        var link = links[count]

        if (link.instance === source) {
          sourceLink = link
        } else {
          needUpdate.push(link)
        }
      }

      if (!sourceLink) {
        return null
      }

      var newValue = sourceLink.instance[
        'get'.concat(_capitalize(sourceLink.propertyName))
      ]()

      if (!shallowEquals(newValue, value) || force) {
        value = newValue
        updateInProgress = true

        while (needUpdate.length) {
          var linkToUpdate = needUpdate.pop()
          linkToUpdate.instance.set(
            _defineProperty({}, linkToUpdate.propertyName, value)
          )
        }

        updateInProgress = false
      }

      if (model.propertyLinkMap[id].persistent) {
        model.propertyLinkMap[id].value = newValue
      }

      return newValue
    }

    function unbind(instance, propertyName) {
      var indexToDelete = []
      count = links.length

      while (count--) {
        var link = links[count]

        if (
          link.instance === instance &&
          (link.propertyName === propertyName || propertyName === undefined)
        ) {
          link.subscription.unsubscribe()
          indexToDelete.push(count)
        }
      }

      while (indexToDelete.length) {
        links.splice(indexToDelete.pop(), 1)
      }
    }

    function bind(instance, propertyName) {
      var updateMe =
        arguments.length > 2 && arguments[2] !== undefined
          ? arguments[2]
          : false
      var subscription = instance.onModified(update)
      var other = links[0]
      links.push({
        instance: instance,
        propertyName: propertyName,
        subscription: subscription,
      })

      if (updateMe) {
        if (
          model.propertyLinkMap[id].persistent &&
          model.propertyLinkMap[id].value !== undefined
        ) {
          instance.set(
            _defineProperty({}, propertyName, model.propertyLinkMap[id].value)
          )
        } else if (other) {
          update(other.instance, true)
        }
      }

      return {
        unsubscribe: function unsubscribe() {
          return unbind(instance, propertyName)
        },
      }
    }

    function unsubscribe() {
      while (links.length) {
        links.pop().subscription.unsubscribe()
      }
    }

    var linkHandler = {
      bind: bind,
      unbind: unbind,
      unsubscribe: unsubscribe,
      persistent: persistent,
    }
    model.propertyLinkMap[id] = linkHandler
    return linkHandler
  } // extract values

  function getProperties() {
    var groupName =
      arguments.length > 0 && arguments[0] !== undefined
        ? arguments[0]
        : ROOT_GROUP_NAME
    var values = []
    var id = model.proxyId
    var propertyNames = listProxyProperties(groupName) || []

    for (var i = 0; i < propertyNames.length; i++) {
      var name = propertyNames[i]
      var method = publicAPI['get'.concat(_capitalize(name))]
      var value = method ? method() : undefined
      var prop = {
        id: id,
        name: name,
        value: value,
      }
      var children = getProperties(name)

      if (children.length) {
        prop.children = children
      }

      values.push(prop)
    }

    return values
  }

  publicAPI.listPropertyNames = function() {
    return getProperties().map(function(p) {
      return p.name
    })
  }

  publicAPI.getPropertyByName = function(name) {
    return getProperties().find(function(p) {
      return p.name === name
    })
  }

  publicAPI.getPropertyDomainByName = function(name) {
    return (propertyMap[name] || {}).domain
  } // ui section

  publicAPI.getProxySection = function() {
    return {
      id: model.proxyId,
      name: model.proxyGroup,
      ui: model.ui,
      properties: getProperties(),
    }
  } // free resources

  publicAPI.delete = function() {
    var list = Object.keys(model.propertyLinkMap)
    var count = list.length

    while (count--) {
      model.propertyLinkMap[list[count]].unsubscribe()
    }

    Object.keys(model.propertyLinkSubscribers).forEach(
      publicAPI.gcPropertyLinks
    )
    parentDelete()
  } // @todo fix infinite recursion due to active source

  publicAPI.getState = function() {
    return null
  }

  function registerLinks() {
    // Allow dynamic registration of links at the application level
    if (model.links) {
      for (var i = 0; i < model.links.length; i++) {
        var _model$links$i = model.links[i],
          link = _model$links$i.link,
          property = _model$links$i.property,
          persistent = _model$links$i.persistent,
          updateOnBind = _model$links$i.updateOnBind,
          type = _model$links$i.type

        if (type === 'application') {
          var sLink = model.proxyManager.getPropertyLink(link, persistent)
          publicAPI.registerPropertyLinkForGC(sLink, 'application')
          sLink.bind(publicAPI, property, updateOnBind)
        }
      }
    }
  }

  setImmediateVTK(registerLinks)
} // ----------------------------------------------------------------------------
// proxyPropertyMapping(publicAPI, model, map)
//
//   map = {
//      opacity: { modelKey: 'property', property: 'opacity' },
//   }
//
// Generated API:
//  Elevate set/get methods from internal object stored in the model to current one
// ----------------------------------------------------------------------------

function proxyPropertyMapping(publicAPI, model, map) {
  var parentDelete = publicAPI.delete
  var subscriptions = []
  var propertyNames = Object.keys(map)
  var count = propertyNames.length

  while (count--) {
    var propertyName = propertyNames[count]
    var _map$propertyName = map[propertyName],
      modelKey = _map$propertyName.modelKey,
      property = _map$propertyName.property,
      _map$propertyName$mod = _map$propertyName.modified,
      modified = _map$propertyName$mod === void 0 ? true : _map$propertyName$mod

    var methodSrc = _capitalize(property)

    var methodDst = _capitalize(propertyName)

    publicAPI['get'.concat(methodDst)] =
      model[modelKey]['get'.concat(methodSrc)]
    publicAPI['set'.concat(methodDst)] =
      model[modelKey]['set'.concat(methodSrc)]

    if (modified) {
      subscriptions.push(model[modelKey].onModified(publicAPI.modified))
    }
  }

  publicAPI.delete = function() {
    while (subscriptions.length) {
      subscriptions.pop().unsubscribe()
    }

    parentDelete()
  }
} // ----------------------------------------------------------------------------
// proxyPropertyState(publicAPI, model, state, defaults)
//
//   state = {
//     representation: {
//       'Surface with edges': { property: { edgeVisibility: true, representation: 2 } },
//       Surface: { property: { edgeVisibility: false, representation: 2 } },
//       Wireframe: { property: { edgeVisibility: false, representation: 1 } },
//       Points: { property: { edgeVisibility: false, representation: 0 } },
//     },
//   }
//
//   defaults = {
//      representation: 'Surface',
//   }
//
// Generated API
//   get / set Representation ( string ) => push state to various internal objects
// ----------------------------------------------------------------------------

function proxyPropertyState(publicAPI, model) {
  var state =
    arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {}
  var defaults =
    arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : {}
  model.this = publicAPI

  function applyState(map) {
    var modelKeys = Object.keys(map)
    var count = modelKeys.length

    while (count--) {
      var modelKey = modelKeys[count]
      model[modelKey].set(map[modelKey])
    }
  }

  var modelKeys = Object.keys(defaults)
  var count = modelKeys.length

  var _loop2 = function _loop2() {
    // Add default
    var key = modelKeys[count]
    model[key] = defaults[key] // Add set method

    var mapping = state[key]

    publicAPI['set'.concat(_capitalize(key))] = function(value) {
      if (value !== model[key]) {
        model[key] = value
        var propValues = mapping[value]
        applyState(propValues)
        publicAPI.modified()
      }
    }
  }

  while (count--) {
    _loop2()
  } // Add getter

  if (modelKeys.length) {
    get(publicAPI, model, modelKeys)
  }
} // ----------------------------------------------------------------------------
// From : https://github.com/facebookarchive/fixed-data-table/blob/master/src/vendor_upstream/dom/normalizeWheel.js
//
//
// Copyright (c) 2015, Facebook, Inc.
// All rights reserved.
//
// This source code is licensed under the BSD-style license found in the
// LICENSE file in the root directory of this source tree. An additional grant
// of patent rights can be found in the PATENTS file in the same directory.
//
//
// Mouse wheel (and 2-finger trackpad) support on the web sucks.  It is
// complicated, thus this doc is long and (hopefully) detailed enough to answer
// your questions.
//
// If you need to react to the mouse wheel in a predictable way, this code is
// like your bestest friend.// hugs//
//
// As of today, there are 4 DOM event types you can listen to:
//
//   'wheel'                -- Chrome(31+), FF(17+), IE(9+)
//   'mousewheel'           -- Chrome, IE(6+), Opera, Safari
//   'MozMousePixelScroll'  -- FF(3.5 only!) (2010-2013) -- don't bother!
//   'DOMMouseScroll'       -- FF(0.9.7+) since 2003
//
// So what to do?  The is the best:
//
//   normalizeWheel.getEventType();
//
// In your event callback, use this code to get sane interpretation of the
// deltas.  This code will return an object with properties:
//
//   spinX   -- normalized spin speed (use for zoom) - x plane
//   spinY   -- " - y plane
//   pixelX  -- normalized distance (to pixels) - x plane
//   pixelY  -- " - y plane
//
// Wheel values are provided by the browser assuming you are using the wheel to
// scroll a web page by a number of lines or pixels (or pages).  Values can vary
// significantly on different platforms and browsers, forgetting that you can
// scroll at different speeds.  Some devices (like trackpads) emit more events
// at smaller increments with fine granularity, and some emit massive jumps with
// linear speed or acceleration.
//
// This code does its best to normalize the deltas for you:
//
//   - spin is trying to normalize how far the wheel was spun (or trackpad
//     dragged).  This is super useful for zoom support where you want to
//     throw away the chunky scroll steps on the PC and make those equal to
//     the slow and smooth tiny steps on the Mac. Key data: This code tries to
//     resolve a single slow step on a wheel to 1.
//
//   - pixel is normalizing the desired scroll delta in pixel units.  You'll
//     get the crazy differences between browsers, but at least it'll be in
//     pixels!
//
//   - positive value indicates scrolling DOWN/RIGHT, negative UP/LEFT.  This
//     should translate to positive value zooming IN, negative zooming OUT.
//     This matches the newer 'wheel' event.
//
// Why are there spinX, spinY (or pixels)?
//
//   - spinX is a 2-finger side drag on the trackpad, and a shift + wheel turn
//     with a mouse.  It results in side-scrolling in the browser by default.
//
//   - spinY is what you expect -- it's the classic axis of a mouse wheel.
//
//   - I dropped spinZ/pixelZ.  It is supported by the DOM 3 'wheel' event and
//     probably is by browsers in conjunction with fancy 3D controllers .. but
//     you know.
//
// Implementation info:
//
// Examples of 'wheel' event if you scroll slowly (down) by one step with an
// average mouse:
//
//   OS X + Chrome  (mouse)     -    4   pixel delta  (wheelDelta -120)
//   OS X + Safari  (mouse)     -  N/A   pixel delta  (wheelDelta  -12)
//   OS X + Firefox (mouse)     -    0.1 line  delta  (wheelDelta  N/A)
//   Win8 + Chrome  (mouse)     -  100   pixel delta  (wheelDelta -120)
//   Win8 + Firefox (mouse)     -    3   line  delta  (wheelDelta -120)
//
// On the trackpad:
//
//   OS X + Chrome  (trackpad)  -    2   pixel delta  (wheelDelta   -6)
//   OS X + Firefox (trackpad)  -    1   pixel delta  (wheelDelta  N/A)
//
// On other/older browsers.. it's more complicated as there can be multiple and
// also missing delta values.
//
// The 'wheel' event is more standard:
//
// http://www.w3.org/TR/DOM-Level-3-Events/#events-wheelevents
//
// The basics is that it includes a unit, deltaMode (pixels, lines, pages), and
// deltaX, deltaY and deltaZ.  Some browsers provide other values to maintain
// backward compatibility with older events.  Those other values help us
// better normalize spin speed.  Example of what the browsers provide:
//
//                          | event.wheelDelta | event.detail
//        ------------------+------------------+--------------
//          Safari v5/OS X  |       -120       |       0
//          Safari v5/Win7  |       -120       |       0
//         Chrome v17/OS X  |       -120       |       0
//         Chrome v17/Win7  |       -120       |       0
//                IE9/Win7  |       -120       |   undefined
//         Firefox v4/OS X  |     undefined    |       1
//         Firefox v4/Win7  |     undefined    |       3
//
// ----------------------------------------------------------------------------
// Reasonable defaults

var PIXEL_STEP = 10
var LINE_HEIGHT = 40
var PAGE_HEIGHT = 800
function normalizeWheel(wheelEvent) {
  var sX = 0 // spinX

  var sY = 0 // spinY

  var pX = 0 // pixelX

  var pY = 0 // pixelY
  // Legacy

  if ('detail' in wheelEvent) {
    sY = wheelEvent.detail
  }

  if ('wheelDelta' in wheelEvent) {
    sY = -wheelEvent.wheelDelta / 120
  }

  if ('wheelDeltaY' in wheelEvent) {
    sY = -wheelEvent.wheelDeltaY / 120
  }

  if ('wheelDeltaX' in wheelEvent) {
    sX = -wheelEvent.wheelDeltaX / 120
  } // side scrolling on FF with DOMMouseScroll

  if ('axis' in wheelEvent && wheelEvent.axis === wheelEvent.HORIZONTAL_AXIS) {
    sX = sY
    sY = 0
  }

  pX = sX * PIXEL_STEP
  pY = sY * PIXEL_STEP

  if ('deltaY' in wheelEvent) {
    pY = wheelEvent.deltaY
  }

  if ('deltaX' in wheelEvent) {
    pX = wheelEvent.deltaX
  }

  if ((pX || pY) && wheelEvent.deltaMode) {
    if (wheelEvent.deltaMode === 1) {
      // delta in LINE units
      pX *= LINE_HEIGHT
      pY *= LINE_HEIGHT
    } else {
      // delta in PAGE units
      pX *= PAGE_HEIGHT
      pY *= PAGE_HEIGHT
    }
  } // Fall-back if spin cannot be determined

  if (pX && !sX) {
    sX = pX < 1 ? -1 : 1
  }

  if (pY && !sY) {
    sY = pY < 1 ? -1 : 1
  }

  return {
    spinX: sX,
    spinY: sY,
    pixelX: pX,
    pixelY: pY,
  }
} // ----------------------------------------------------------------------------
// Default export
// ----------------------------------------------------------------------------

var macro = {
  algo: algo,
  capitalize: capitalize,
  chain: chain,
  debounce: debounce,
  enumToString: enumToString,
  event: event,
  EVENT_ABORT: EVENT_ABORT,
  formatBytesToProperUnit: formatBytesToProperUnit,
  formatNumbersWithThousandSeparator: formatNumbersWithThousandSeparator,
  get: get,
  getArray: getArray,
  getCurrentGlobalMTime: getCurrentGlobalMTime,
  getStateArrayMapFunc: getStateArrayMapFunc,
  isVtkObject: isVtkObject,
  keystore: keystore,
  measurePromiseExecution: measurePromiseExecution,
  moveToProtected: moveToProtected,
  newInstance: newInstance$1,
  newTypedArray: newTypedArray,
  newTypedArrayFrom: newTypedArrayFrom,
  normalizeWheel: normalizeWheel,
  obj: obj,
  proxy: proxy,
  proxyPropertyMapping: proxyPropertyMapping,
  proxyPropertyState: proxyPropertyState,
  safeArrays: safeArrays,
  set: set,
  setArray: setArray,
  setGet: setGet,
  setGetArray: setGetArray,
  setImmediate: setImmediateVTK,
  setLoggerFunction: setLoggerFunction,
  throttle: throttle,
  traverseInstanceTree: traverseInstanceTree,
  TYPED_ARRAYS: TYPED_ARRAYS,
  // deprecated todo remove on breaking API revision
  uncapitalize: uncapitalize,
  VOID: VOID,
  vtkDebugMacro: vtkDebugMacro,
  vtkErrorMacro: vtkErrorMacro,
  vtkInfoMacro: vtkInfoMacro,
  vtkLogMacro: vtkLogMacro,
  vtkOnceErrorMacro: vtkOnceErrorMacro,
  vtkWarningMacro: vtkWarningMacro,
}

function createPlaneSliders(context) {
  var planeUIGroup = document.createElement('div')
  planeUIGroup.setAttribute('class', style.uiGroup)
  var viewerDOMId = context.id
  var xPlaneRow = document.createElement('div')
  xPlaneRow.setAttribute('class', style.planeUIRow)
  xPlaneRow.className += ' '.concat(viewerDOMId, '-x-plane-row')
  context.main.xPlaneRow = xPlaneRow
  var xPlaneVisibleButton = document.createElement('div')
  xPlaneVisibleButton.innerHTML = '<input id="'
    .concat(context.id, '-xPlaneVisibleButton" type="checkbox" checked class="')
    .concat(
      style.toggleInput,
      '"><label itk-vtk-tooltip itk-vtk-tooltip-top-annotations itk-vtk-tooltip-content="X plane visibility" class="'
    )
    .concat(style.visibleButton, ' ')
    .concat(style.toggleButton, '" for="')
    .concat(context.id, '-xPlaneVisibleButton"><img src="')
    .concat(optimizedSVGDataUri$2, '" alt="visible" /></label>')
  xPlaneVisibleButton.children[0]
  xPlaneVisibleButton.children[1]
  xPlaneRow.appendChild(xPlaneVisibleButton)
  context.main.xPlaneVisibleButton = xPlaneVisibleButton
  var xPlaneInvisibleButton = document.createElement('div')
  xPlaneVisibleButton.setAttribute('class', style.visibleButton)
  xPlaneInvisibleButton.setAttribute('class', style.visibleButton)
  xPlaneInvisibleButton.innerHTML = '<input id="'
    .concat(context.id, '-invisibleButton" type="checkbox" class="')
    .concat(
      style.toggleInput,
      '"><label itk-vtk-tooltip itk-vtk-tooltip-top-annotations itk-vtk-tooltip-content="X plane visibility" class="'
    )
    .concat(style.visibleButton, ' ')
    .concat(style.toggleButton, '" for="')
    .concat(context.id, '-xPlaneInvisibleButton"><img src="')
    .concat(optimizedSVGDataUri$j, '" alt="invisible" /></label>')
  xPlaneInvisibleButton.children[0]
  xPlaneInvisibleButton.children[1]
  xPlaneRow.appendChild(xPlaneInvisibleButton)
  context.main.xPlaneInvisibleButton = xPlaneInvisibleButton

  if (context.main.viewMode === 'Volume') {
    if (context.main.slicingPlanes.x.visible) {
      xPlaneVisibleButton.style.display = 'flex'
      xPlaneInvisibleButton.style.display = 'none'
    } else {
      xPlaneVisibleButton.style.display = 'none'
      xPlaneInvisibleButton.style.display = 'flex'
    }
  } else {
    xPlaneVisibleButton.style.display = 'none'
    xPlaneInvisibleButton.style.display = 'none'
  }

  xPlaneVisibleButton.addEventListener('click', function(event) {
    event.preventDefault()
    event.stopPropagation()
    var slicingPlanes = context.main.slicingPlanes
    slicingPlanes.x.visible = false
    context.service.send({
      type: 'SLICING_PLANES_CHANGED',
      data: slicingPlanes,
    })
    xPlaneVisibleButton.checked = true
  })
  xPlaneInvisibleButton.addEventListener('click', function(event) {
    event.preventDefault()
    event.stopPropagation()
    var slicingPlanes = context.main.slicingPlanes
    slicingPlanes.x.visible = true
    context.service.send({
      type: 'SLICING_PLANES_CHANGED',
      data: slicingPlanes,
    })
    xPlaneInvisibleButton.checked = false
  })
  var xPlanePauseButton = document.createElement('div')
  xPlanePauseButton.innerHTML = '<input id="'
    .concat(context.id, '-xPlanePauseButton" type="checkbox" checked class="')
    .concat(
      style.toggleInput,
      '"><label itk-vtk-tooltip itk-vtk-tooltip-top-annotations itk-vtk-tooltip-content="X plane pause scroll" class="'
    )
    .concat(style.visibleButton, ' ')
    .concat(style.toggleButton, '" for="')
    .concat(context.id, '-xPlanePauseButton"><img src="')
    .concat(optimizedSVGDataUri$f, '" alt="pause" /></label>')
  xPlanePauseButton.children[0]
  xPlanePauseButton.children[1]
  xPlaneRow.appendChild(xPlanePauseButton)
  context.main.xPlanePauseButton = xPlanePauseButton
  var xPlanePlayButton = document.createElement('div')
  xPlanePauseButton.setAttribute('class', style.visibleButton)
  xPlanePlayButton.setAttribute('class', style.visibleButton)
  xPlanePlayButton.innerHTML = '<input id="'
    .concat(context.id, '-xPlanePlayButton" type="checkbox" class="')
    .concat(
      style.toggleInput,
      '"><label itk-vtk-tooltip itk-vtk-tooltip-top-annotations itk-vtk-tooltip-content="X plane play scroll" class="'
    )
    .concat(style.visibleButton, ' ')
    .concat(style.toggleButton, '" for="')
    .concat(context.id, '-xPlanePlayButton"><img src="')
    .concat(optimizedSVGDataUri$e, '" alt="play"/></label>')
  xPlanePlayButton.children[0]
  xPlanePlayButton.children[1]
  xPlaneRow.appendChild(xPlanePlayButton)
  context.main.xPlanePlayButton = xPlanePlayButton

  if (context.main.slicingPlanes.x.scroll) {
    xPlanePauseButton.style.display = 'flex'
    xPlanePlayButton.style.display = 'none'
  } else {
    xPlanePauseButton.style.display = 'none'
    xPlanePlayButton.style.display = 'flex'
  }

  xPlanePauseButton.addEventListener('click', function(event) {
    event.preventDefault()
    event.stopPropagation()
    var slicingPlanes = context.main.slicingPlanes
    slicingPlanes.x.scroll = false
    context.service.send({
      type: 'SLICING_PLANES_CHANGED',
      data: slicingPlanes,
    })
    xPlanePauseButton.checked = true
  })
  xPlanePlayButton.addEventListener('click', function(event) {
    event.preventDefault()
    event.stopPropagation()
    var slicingPlanes = context.main.slicingPlanes
    slicingPlanes.x.scroll = true
    slicingPlanes.x.visible = true
    context.service.send({
      type: 'SLICING_PLANES_CHANGED',
      data: slicingPlanes,
    })
    xPlanePlayButton.checked = false
  })
  var xSliderEntry = document.createElement('div')
  xSliderEntry.setAttribute('class', style.sliderEntry)
  xSliderEntry.innerHTML = '\n    <label id="'
    .concat(viewerDOMId, '-xSliceLabel" class="')
    .concat(
      style.xPlaneLabel,
      '">X:</label><input type="range" min="0.0" max="1.0" value="0.5" step="0.1"\n      id="'
    )
    .concat(viewerDOMId, '-xSlice" class="')
    .concat(style.slider, '" />')
  var xPlaneLabel = xSliderEntry.querySelector(
    '#'.concat(viewerDOMId, '-xSliceLabel')
  )
  context.main.xPlaneLabel = xPlaneLabel
  var xSliceElement = xSliderEntry.querySelector(
    '#'.concat(viewerDOMId, '-xSlice')
  )
  xSliceElement.addEventListener('input', function(event) {
    event.preventDefault()
    event.stopPropagation()
    context.service.send({
      type: 'X_SLICE_CHANGED',
      data: Number(xSliceElement.value),
    })
  })
  context.main.xSliceElement = xSliceElement
  xPlaneRow.appendChild(xSliderEntry)
  planeUIGroup.appendChild(xPlaneRow)
  var yPlaneRow = document.createElement('div')
  yPlaneRow.setAttribute('class', style.planeUIRow)
  yPlaneRow.className += ' '.concat(viewerDOMId, '-y-plane-row')
  context.main.yPlaneRow = yPlaneRow
  var yPlaneVisibleButton = document.createElement('div')
  yPlaneVisibleButton.setAttribute('class', style.visibleButton)
  yPlaneVisibleButton.innerHTML = '<input id="'
    .concat(context.id, '-yPlaneVisibleButton" type="checkbox" checked class="')
    .concat(
      style.toggleInput,
      '"><label itk-vtk-tooltip itk-vtk-tooltip-top-annotations itk-vtk-tooltip-content="Y plane visibility" class="'
    )
    .concat(style.visibleButton, ' ')
    .concat(style.toggleButton, '" for="')
    .concat(context.id, '-yPlaneVisibleButton"><img src="')
    .concat(optimizedSVGDataUri$2, '" alt="visible"/></label>')
  yPlaneVisibleButton.children[0]
  yPlaneVisibleButton.children[1]
  yPlaneRow.appendChild(yPlaneVisibleButton)
  context.main.yPlaneVisibleButton = yPlaneVisibleButton
  var yPlaneInvisibleButton = document.createElement('div')
  yPlaneInvisibleButton.setAttribute('class', style.visibleButton)
  yPlaneInvisibleButton.innerHTML = '<input id="'
    .concat(context.id, '-invisibleButton" type="checkbox" class="')
    .concat(
      style.toggleInput,
      '"><label itk-vtk-tooltip itk-vtk-tooltip-top-annotations itk-vtk-tooltip-content="Y plane visibility" class="'
    )
    .concat(style.visibleButton, ' ')
    .concat(style.toggleButton, '" for="')
    .concat(context.id, '-yPlaneInvisibleButton"><img src="')
    .concat(optimizedSVGDataUri$j, '" alt="invisible" /></label>')
  yPlaneInvisibleButton.children[0]
  yPlaneInvisibleButton.children[1]
  yPlaneRow.appendChild(yPlaneInvisibleButton)
  context.main.yPlaneInvisibleButton = yPlaneInvisibleButton

  if (context.main.viewMode === 'Volume') {
    if (context.main.slicingPlanes.y.visible) {
      yPlaneVisibleButton.style.display = 'flex'
      yPlaneInvisibleButton.style.display = 'none'
    } else {
      yPlaneVisibleButton.style.display = 'none'
      yPlaneInvisibleButton.style.display = 'flex'
    }
  } else {
    yPlaneVisibleButton.style.display = 'none'
    yPlaneInvisibleButton.style.display = 'none'
  }

  yPlaneVisibleButton.addEventListener('click', function(event) {
    event.preventDefault()
    event.stopPropagation()
    var slicingPlanes = context.main.slicingPlanes
    slicingPlanes.y.visible = false
    context.service.send({
      type: 'SLICING_PLANES_CHANGED',
      data: slicingPlanes,
    })
    yPlaneVisibleButton.checked = true
  })
  yPlaneInvisibleButton.addEventListener('click', function(event) {
    event.preventDefault()
    event.stopPropagation()
    var slicingPlanes = context.main.slicingPlanes
    slicingPlanes.y.visible = true
    context.service.send({
      type: 'SLICING_PLANES_CHANGED',
      data: slicingPlanes,
    })
    yPlaneInvisibleButton.checked = false
  })
  var yPlanePauseButton = document.createElement('div')
  yPlanePauseButton.innerHTML = '<input id="'
    .concat(context.id, '-yPlanePauseButton" type="checkbox" checked class="')
    .concat(
      style.toggleInput,
      '"><label itk-vtk-tooltip itk-vtk-tooltip-top-annotations itk-vtk-tooltip-content="Y plane pause scroll" class="'
    )
    .concat(style.visibleButton, ' ')
    .concat(style.toggleButton, '" for="')
    .concat(context.id, '-yPlanePauseButton"><img src="')
    .concat(optimizedSVGDataUri$f, '" alt="pause" /></label>')
  yPlanePauseButton.children[0]
  yPlanePauseButton.children[1]
  yPlaneRow.appendChild(yPlanePauseButton)
  context.main.yPlanePauseButton = yPlanePauseButton
  var yPlanePlayButton = document.createElement('div')
  yPlanePauseButton.setAttribute('class', style.visibleButton)
  yPlanePlayButton.setAttribute('class', style.visibleButton)
  yPlanePlayButton.innerHTML = '<input id="'
    .concat(context.id, '-yPlanePlayButton" type="checkbox" class="')
    .concat(
      style.toggleInput,
      '"><label itk-vtk-tooltip itk-vtk-tooltip-top-annotations itk-vtk-tooltip-content="Y plane play scroll" class="'
    )
    .concat(style.visibleButton, ' ')
    .concat(style.toggleButton, '" for="')
    .concat(context.id, '-yPlanePlayButton"><img src="')
    .concat(optimizedSVGDataUri$e, '" alt="play"/></label>')
  yPlanePlayButton.children[0]
  yPlanePlayButton.children[1]
  yPlaneRow.appendChild(yPlanePlayButton)
  context.main.yPlanePlayButton = yPlanePlayButton

  if (context.main.slicingPlanes.y.scroll) {
    yPlanePauseButton.style.display = 'flex'
    yPlanePlayButton.style.display = 'none'
  } else {
    yPlanePauseButton.style.display = 'none'
    yPlanePlayButton.style.display = 'flex'
  }

  yPlanePauseButton.addEventListener('click', function(event) {
    event.preventDefault()
    event.stopPropagation()
    var slicingPlanes = context.main.slicingPlanes
    slicingPlanes.y.scroll = false
    context.service.send({
      type: 'SLICING_PLANES_CHANGED',
      data: slicingPlanes,
    })
    yPlanePauseButton.checked = true
  })
  yPlanePlayButton.addEventListener('click', function(event) {
    event.preventDefault()
    event.stopPropagation()
    var slicingPlanes = context.main.slicingPlanes
    slicingPlanes.y.scroll = true
    slicingPlanes.y.visible = true
    context.service.send({
      type: 'SLICING_PLANES_CHANGED',
      data: slicingPlanes,
    })
    yPlanePlayButton.checked = false
  })
  var ySliderEntry = document.createElement('div')
  ySliderEntry.setAttribute('class', style.sliderEntry)
  ySliderEntry.innerHTML = '\n    <label id="'
    .concat(viewerDOMId, '-ySliceLabel" class="')
    .concat(
      style.yPlaneLabel,
      '">Y:</label><input type="range" min="0.0" max="1.0" value="0.5" step="0.1"\n      id="'
    )
    .concat(viewerDOMId, '-ySlice" class="')
    .concat(style.slider, '" />')
  var yPlaneLabel = ySliderEntry.querySelector(
    '#'.concat(viewerDOMId, '-ySliceLabel')
  )
  context.main.yPlaneLabel = yPlaneLabel
  var ySliceElement = ySliderEntry.querySelector(
    '#'.concat(viewerDOMId, '-ySlice')
  )
  ySliceElement.addEventListener('input', function(event) {
    event.preventDefault()
    event.stopPropagation()
    context.service.send({
      type: 'Y_SLICE_CHANGED',
      data: Number(ySliceElement.value),
    })
  })
  context.main.ySliceElement = ySliceElement
  yPlaneRow.appendChild(ySliderEntry)
  planeUIGroup.appendChild(yPlaneRow)
  var zPlaneRow = document.createElement('div')
  zPlaneRow.setAttribute('class', style.planeUIRow)
  zPlaneRow.className += ' '.concat(viewerDOMId, '-z-plane-row')
  context.main.zPlaneRow = zPlaneRow
  var zPlaneVisibleButton = document.createElement('div')
  zPlaneVisibleButton.setAttribute('class', style.visibleButton)
  zPlaneVisibleButton.innerHTML = '<input id="'
    .concat(context.id, '-zPlaneVisibleButton" type="checkbox" checked class="')
    .concat(
      style.toggleInput,
      '"><label itk-vtk-tooltip itk-vtk-tooltip-top-annotations itk-vtk-tooltip-content="Z plane visibility" class="'
    )
    .concat(style.visibleButton, ' ')
    .concat(style.toggleButton, '" for="')
    .concat(context.id, '-zPlaneVisibleButton"><img src="')
    .concat(optimizedSVGDataUri$2, '" alt="visible" /></label>')
  zPlaneVisibleButton.children[0]
  zPlaneVisibleButton.children[1]
  zPlaneRow.appendChild(zPlaneVisibleButton)
  context.main.zPlaneVisibleButton = zPlaneVisibleButton
  var zPlaneInvisibleButton = document.createElement('div')
  zPlaneInvisibleButton.setAttribute('class', style.visibleButton)
  zPlaneInvisibleButton.innerHTML = '<input id="'
    .concat(context.id, '-invisibleButton" type="checkbox" class="')
    .concat(
      style.toggleInput,
      '"><label itk-vtk-tooltip itk-vtk-tooltip-top-annotations itk-vtk-tooltip-content="Z plane visibility" class="'
    )
    .concat(style.visibleButton, ' ')
    .concat(style.toggleButton, '" for="')
    .concat(context.id, '-zPlaneInvisibleButton"><img src="')
    .concat(optimizedSVGDataUri$j, '" alt="invisible" /></label>')
  zPlaneInvisibleButton.children[0]
  zPlaneInvisibleButton.children[1]
  zPlaneRow.appendChild(zPlaneInvisibleButton)
  context.main.zPlaneInvisibleButton = zPlaneInvisibleButton

  if (context.main.viewMode === 'Volume') {
    if (context.main.slicingPlanes.z.visible) {
      zPlaneVisibleButton.style.display = 'flex'
      zPlaneInvisibleButton.style.display = 'none'
    } else {
      zPlaneVisibleButton.style.display = 'none'
      zPlaneInvisibleButton.style.display = 'flex'
    }
  } else {
    zPlaneVisibleButton.style.display = 'none'
    zPlaneInvisibleButton.style.display = 'none'
  }

  zPlaneVisibleButton.addEventListener('click', function(event) {
    event.preventDefault()
    event.stopPropagation()
    var slicingPlanes = context.main.slicingPlanes
    slicingPlanes.z.visible = false
    context.service.send({
      type: 'SLICING_PLANES_CHANGED',
      data: slicingPlanes,
    })
    zPlaneVisibleButton.checked = true
  })
  zPlaneInvisibleButton.addEventListener('click', function(event) {
    event.preventDefault()
    event.stopPropagation()
    var slicingPlanes = context.main.slicingPlanes
    slicingPlanes.z.visible = true
    context.service.send({
      type: 'SLICING_PLANES_CHANGED',
      data: slicingPlanes,
    })
    zPlaneInvisibleButton.checked = false
  })
  var zPlanePauseButton = document.createElement('div')
  zPlanePauseButton.innerHTML = '<input id="'
    .concat(context.id, '-zPlanePauseButton" type="checkbox" checked class="')
    .concat(
      style.toggleInput,
      '"><label itk-vtk-tooltip itk-vtk-tooltip-top-annotations itk-vtk-tooltip-content="Z plane pause scroll" class="'
    )
    .concat(style.visibleButton, ' ')
    .concat(style.toggleButton, '" for="')
    .concat(context.id, '-zPlanePauseButton"><img src="')
    .concat(optimizedSVGDataUri$f, '" alt="pause" /></label>')
  zPlanePauseButton.children[0]
  zPlanePauseButton.children[1]
  zPlaneRow.appendChild(zPlanePauseButton)
  context.main.zPlanePauseButton = zPlanePauseButton
  var zPlanePlayButton = document.createElement('div')
  zPlanePauseButton.setAttribute('class', style.visibleButton)
  zPlanePlayButton.setAttribute('class', style.visibleButton)
  zPlanePlayButton.innerHTML = '<input id="'
    .concat(context.id, '-zPlanePlayButton" type="checkbox" class="')
    .concat(
      style.toggleInput,
      '"><label itk-vtk-tooltip itk-vtk-tooltip-top-annotations itk-vtk-tooltip-content="Z plane play scroll" class="'
    )
    .concat(style.visibleButton, ' ')
    .concat(style.toggleButton, '" for="')
    .concat(context.id, '-zPlanePlayButton"><img src="')
    .concat(optimizedSVGDataUri$e, '" alt="play" /></label>')
  zPlanePlayButton.children[0]
  zPlanePlayButton.children[1]
  zPlaneRow.appendChild(zPlanePlayButton)
  context.main.zPlanePlayButton = zPlanePlayButton

  if (context.main.slicingPlanes.z.scroll) {
    zPlanePauseButton.style.display = 'flex'
    zPlanePlayButton.style.display = 'none'
  } else {
    zPlanePauseButton.style.display = 'none'
    zPlanePlayButton.style.display = 'flex'
  }

  zPlanePauseButton.addEventListener('click', function(event) {
    event.preventDefault()
    event.stopPropagation()
    var slicingPlanes = context.main.slicingPlanes
    slicingPlanes.z.scroll = false
    context.service.send({
      type: 'SLICING_PLANES_CHANGED',
      data: slicingPlanes,
    })
    zPlanePauseButton.checked = true
  })
  zPlanePlayButton.addEventListener('click', function(event) {
    event.preventDefault()
    event.stopPropagation()
    var slicingPlanes = context.main.slicingPlanes
    slicingPlanes.z.scroll = true
    slicingPlanes.z.visible = true
    context.service.send({
      type: 'SLICING_PLANES_CHANGED',
      data: slicingPlanes,
    })
    zPlanePlayButton.checked = false
  })
  var zSliderEntry = document.createElement('div')
  zSliderEntry.setAttribute('class', style.sliderEntry)
  zSliderEntry.innerHTML = '\n    <label id="'
    .concat(viewerDOMId, '-zSliceLabel" class="')
    .concat(
      style.zPlaneLabel,
      '">Z:</label><input type="range" min="0.0" max="1.0" value="0.5" step="0.1"\n      id="'
    )
    .concat(viewerDOMId, '-zSlice" class="')
    .concat(style.slider, '" />')
  var zPlaneLabel = zSliderEntry.querySelector(
    '#'.concat(viewerDOMId, '-zSliceLabel')
  )
  context.main.zPlaneLabel = zPlaneLabel
  var zSliceElement = zSliderEntry.querySelector(
    '#'.concat(viewerDOMId, '-zSlice')
  )
  zSliceElement.addEventListener('input', function(event) {
    event.preventDefault()
    event.stopPropagation()
    context.service.send({
      type: 'Z_SLICE_CHANGED',
      data: Number(zSliceElement.value),
    })
  })
  context.main.zSliceElement = zSliceElement
  zPlaneRow.appendChild(zSliderEntry)
  planeUIGroup.appendChild(zPlaneRow)
  var viewContainer = context.viewContainers.get('volume')
  viewContainer.appendChild(planeUIGroup)

  if (context.use2D || context.uiCollapsed) {
    planeUIGroup.style.display = 'none'
  }

  context.main.planeUIGroup = planeUIGroup
}

function createBackgroundColorButton(context, mainUIRow) {
  var viewerDOMId = context.id
  var bgColorButton = document.createElement('div')
  bgColorButton.innerHTML = '<input id="'
    .concat(viewerDOMId, '-bgColorButton" type="checkbox" class="')
    .concat(
      style.toggleInput,
      '" checked><label itk-vtk-tooltip itk-vtk-tooltip-top itk-vtk-tooltip-content="Toggle Background Color" class="'
    )
    .concat(style.bgColorButton, ' ')
    .concat(style.toggleButton, '" for="')
    .concat(viewerDOMId, '-bgColorButton"><img src="')
    .concat(optimizedSVGDataUri$6, '" alt="select color" /></label>')
  var bgColorButtonInput = bgColorButton.children[0]
  var bgColorButtonLabel = bgColorButton.children[1]
  context.main.bgColorButtonLabel = bgColorButtonLabel
  context.main.bgColorButtonInput = bgColorButtonInput
  applyContrastSensitiveStyleToElement(
    context,
    'invertibleButton',
    bgColorButtonLabel
  )
  bgColorButton.addEventListener('change', function(event) {
    event.preventDefault()
    event.stopPropagation()
    context.service.send('TOGGLE_BACKGROUND_COLOR')
  })
  bgColorButton.addEventListener('click', function(event) {
    event.preventDefault()
    event.stopPropagation()
    context.service.send('TOGGLE_BACKGROUND_COLOR')
  })
  mainUIRow.appendChild(bgColorButton)
}

function toggleCroppingPlanes(context) {
  if (context.main.cropButtonInput) {
    context.main.cropButtonInput.checked = context.main.croppingPlanesEnabled
  }
}

function createCroppingButtons(context, mainUIRow) {
  var viewerDOMId = context.id
  var cropButton = document.createElement('div')
  cropButton.innerHTML = '<input id="'
    .concat(viewerDOMId, '-toggleCroppingPlanesButton" type="checkbox" class="')
    .concat(
      style.toggleInput,
      '"><label itk-vtk-tooltip itk-vtk-tooltip-top itk-vtk-tooltip-content="Cropping planes [w]" class="'
    )
    .concat(style.cropButton, ' ')
    .concat(style.toggleButton, '" for="')
    .concat(viewerDOMId, '-toggleCroppingPlanesButton"><img src="')
    .concat(optimizedSVGDataUri$p, '" alt="crop"/></label>')
  var cropButtonInput = cropButton.children[0]
  var cropButtonLabel = cropButton.children[1]
  context.main.cropButtonLabel = cropButtonLabel
  applyContrastSensitiveStyleToElement(
    context,
    'invertibleButton',
    cropButtonLabel
  )
  context.main.cropButtonInput = cropButtonInput
  toggleCroppingPlanes(context)
  cropButton.addEventListener('change', function(event) {
    event.preventDefault()
    event.stopPropagation()
    context.service.send('TOGGLE_CROPPING_PLANES')
  })
  mainUIRow.appendChild(cropButton)
  var resetCropButton = document.createElement('div')
  resetCropButton.innerHTML = '<input id="'
    .concat(viewerDOMId, '-resetCroppingPlanesButton" type="checkbox" class="')
    .concat(
      style.toggleInput,
      '" checked><label itk-vtk-tooltip itk-vtk-tooltip-top itk-vtk-tooltip-content="Reset cropping planes [e]" class="'
    )
    .concat(style.resetCropButton, ' ')
    .concat(style.toggleButton, '" for="')
    .concat(viewerDOMId, '-resetCroppingPlanesButton"><img src="')
    .concat(optimizedSVGDataUri$b, '" alt="reset crop"/></label>')
  var resetCropButtonLabel = resetCropButton.children[1]
  context.main.resetCropButtonLabel = resetCropButtonLabel
  applyContrastSensitiveStyleToElement(
    context,
    'invertibleButton',
    resetCropButtonLabel
  )
  resetCropButton.addEventListener('change', function(event) {
    event.preventDefault()
    event.stopPropagation()
    context.service.send('RESET_CROPPING_PLANES')
    context.service.send('CROPPING_PLANES_CHANGED_BY_USER')
  })
  resetCropButton.addEventListener('click', function(event) {
    event.preventDefault()
    event.stopPropagation()
    context.service.send('RESET_CROPPING_PLANES')
    context.service.send('CROPPING_PLANES_CHANGED_BY_USER')
  })
  mainUIRow.appendChild(resetCropButton)
}

function createViewModeButtons(context, mainRow) {
  var viewerDOMId = context.id
  var xPlaneButton = document.createElement('div')
  context.main.xPlaneButton = xPlaneButton
  xPlaneButton.innerHTML = '<input id="'
    .concat(viewerDOMId, '-xPlaneButton" type="checkbox" class="')
    .concat(
      style.toggleInput,
      '"><label itk-vtk-tooltip itk-vtk-tooltip-top itk-vtk-tooltip-content="X plane [1]" class="'
    )
    .concat(style.viewModeButton, ' ')
    .concat(style.toggleButton, '" for="')
    .concat(viewerDOMId, '-xPlaneButton"><img src="')
    .concat(optimizedSVGDataUri$d, '" alt="x plane"/></label>')
  var xPlaneButtonLabel = xPlaneButton.children[1]
  context.main.xPlaneButtonLabel = xPlaneButtonLabel
  applyContrastSensitiveStyleToElement(
    context,
    'tooltipButton',
    xPlaneButtonLabel
  )
  xPlaneButton.addEventListener('click', function(event) {
    event.preventDefault()
    event.stopPropagation()
    context.service.send({
      type: 'VIEW_MODE_CHANGED',
      data: 'XPlane',
    })
  })
  mainRow.appendChild(xPlaneButton)
  var yPlaneButton = document.createElement('div')
  context.main.yPlaneButton = yPlaneButton
  yPlaneButton.innerHTML = '<input id="'
    .concat(viewerDOMId, '-yPlaneButton" type="checkbox" class="')
    .concat(
      style.toggleInput,
      '"><label itk-vtk-tooltip itk-vtk-tooltip-top itk-vtk-tooltip-content="Y plane [2]" class="'
    )
    .concat(style.viewModeButton, ' ')
    .concat(style.toggleButton, '" for="')
    .concat(viewerDOMId, '-yPlaneButton"><img src="')
    .concat(optimizedSVGDataUri, '" alt="y plane" /></label>')
  var yPlaneButtonLabel = yPlaneButton.children[1]
  context.main.yPlaneButtonLabel = yPlaneButtonLabel
  applyContrastSensitiveStyleToElement(
    context,
    'tooltipButton',
    yPlaneButtonLabel
  )
  yPlaneButton.addEventListener('click', function(event) {
    event.preventDefault()
    event.stopPropagation()
    context.service.send({
      type: 'VIEW_MODE_CHANGED',
      data: 'YPlane',
    })
  })
  mainRow.appendChild(yPlaneButton)
  var zPlaneButton = document.createElement('div')
  context.main.zPlaneButton = zPlaneButton
  zPlaneButton.innerHTML = '<input id="'
    .concat(viewerDOMId, '-zPlaneButton" type="checkbox" class="')
    .concat(
      style.toggleInput,
      '"><label itk-vtk-tooltip itk-vtk-tooltip-top itk-vtk-tooltip-content="Z plane [3]" class="'
    )
    .concat(style.viewModeButton, ' ')
    .concat(style.toggleButton, '" for="')
    .concat(viewerDOMId, '-zPlaneButton"><img src="')
    .concat(optimizedSVGDataUri$m, '" alt="z plane" /></label>')
  var zPlaneButtonLabel = zPlaneButton.children[1]
  context.main.zPlaneButtonLabel = zPlaneButtonLabel
  applyContrastSensitiveStyleToElement(
    context,
    'tooltipButton',
    zPlaneButtonLabel
  )
  zPlaneButton.addEventListener('click', function(event) {
    event.preventDefault()
    event.stopPropagation()
    context.service.send({
      type: 'VIEW_MODE_CHANGED',
      data: 'ZPlane',
    })
  })
  mainRow.appendChild(zPlaneButton)
  var volumeButton = document.createElement('div')
  context.main.volumeButton = volumeButton
  volumeButton.innerHTML = '<input id="'
    .concat(viewerDOMId, '-volumeButton" type="checkbox" class="')
    .concat(
      style.toggleInput,
      '" checked><label itk-vtk-tooltip itk-vtk-tooltip-top itk-vtk-tooltip-content="Volume [4]" class="'
    )
    .concat(style.viewModeButton, ' ')
    .concat(style.toggleButton, '" for="')
    .concat(viewerDOMId, '-volumeButton"><img src="')
    .concat(optimizedSVGDataUri$1, '" alt="volume" /></label>')
  var volumeButtonLabel = volumeButton.children[1]
  context.main.volumeButtonLabel = volumeButtonLabel
  applyContrastSensitiveStyleToElement(
    context,
    'tooltipButton',
    volumeButtonLabel
  )
  volumeButton.addEventListener('click', function(event) {
    event.preventDefault()
    event.stopPropagation()
    context.service.send({
      type: 'VIEW_MODE_CHANGED',
      data: 'Volume',
    })
  })
  mainRow.appendChild(volumeButton)
}

function createResetCameraButton(context, mainUIRow) {
  var viewerDOMId = context.id
  var resetCameraButton = document.createElement('div')
  resetCameraButton.innerHTML = '<input id="'
    .concat(viewerDOMId, '-resetCameraButton" type="checkbox" class="')
    .concat(
      style.toggleInput,
      '" checked><label itk-vtk-tooltip itk-vtk-tooltip-top itk-vtk-tooltip-content="Reset camera [r]" class="'
    )
    .concat(style.resetCameraButton, ' ')
    .concat(style.toggleButton, '" for="')
    .concat(viewerDOMId, '-resetCameraButton"><img src="')
    .concat(optimizedSVGDataUri$c, '" alt="reset camera" /></label>')
  var resetCameraButtonLabel = resetCameraButton.children[1]
  context.main.resetCameraButtonLabel = resetCameraButtonLabel
  applyContrastSensitiveStyleToElement(
    context,
    'invertibleButton',
    resetCameraButtonLabel
  )
  resetCameraButton.addEventListener('change', function(event) {
    event.preventDefault()
    event.stopPropagation()
    context.service.send('RESET_CAMERA')
  })
  resetCameraButton.addEventListener('click', function(event) {
    event.preventDefault()
    event.stopPropagation()
    context.service.send('RESET_CAMERA')
  })
  mainUIRow.appendChild(resetCameraButton)
}

function createMainInterface(context) {
  var mainUIGroup = document.createElement('div')
  mainUIGroup.setAttribute('class', style.uiGroup)
  context.uiGroups.set('main', mainUIGroup)
  var mainUIRow1 = document.createElement('div')
  mainUIRow1.setAttribute('class', style.mainUIRow)
  mainUIGroup.appendChild(mainUIRow1)
  createScreenshotButton(context, mainUIRow1)
  createFullscreenButton(context, mainUIRow1)

  if (!context.use2D) {
    createRotateButton(context, mainUIRow1)
  }

  createAnnotationsButton(context, mainUIRow1)
  createAxesButton(context, mainUIRow1)
  createViewPlanesToggle(context, mainUIRow1)
  createPlaneSliders(context)
  createBackgroundColorButton(context, mainUIRow1)
  var mainUIRow2 = document.createElement('div')
  mainUIRow2.setAttribute('class', style.mainUIRow)

  if (context.use2D) {
    createViewModeButtons(context, mainUIRow2)
    createCroppingButtons(context, mainUIRow1)
    createResetCameraButton(context, mainUIRow1)
  } else {
    createViewModeButtons(context, mainUIRow2)
    createCroppingButtons(context, mainUIRow2)
    createResetCameraButton(context, mainUIRow2)
    mainUIGroup.appendChild(mainUIRow2)
  }

  context.uiContainer.appendChild(mainUIGroup)
}

function toggleFullscreen(context, event, actionMeta) {
  var fullscreenEnabled = context.main.fullscreenEnabled
  var fullscreenButtonInput = context.main.fullscreenButton.children[0]
  fullscreenButtonInput.checked = fullscreenEnabled // Triggered by operating system events, e.g. pressing Esc while in
  // Fullscreen or F11 when not in fullscreen

  if (fullscreenEnabled === document[fullscreenMethods[3]]) {
    return
  }

  var container = context.rootContainer
  var oldWidth = context.main.rootContainerOldWidth
  var oldHeight = context.main.rootContainerOldHeight

  if (fullscreenEnabled) {
    context.main.rootContainerOldWidth = container.style.width
    context.main.rootContainerOldHeight = container.style.height
    container.style.width = '100vw'
    container.style.height = '100vh'
    context.rootContainer[fullscreenMethods[0]]()
  } else {
    container.style.width = oldWidth
    container.style.height = oldHeight
    document[fullscreenMethods[1]]()
  }
}

function toggleBackgroundColor(context) {
  context.main.selectedBackgroundColor =
    (context.main.selectedBackgroundColor + 1) %
    context.main.backgroundColors.length
  context.main.backgroundColor =
    context.main.backgroundColors[context.main.selectedBackgroundColor]
}

function viewModeXPlane$1(context) {
  var main = context.main

  if (main.xPlaneButton) {
    main.xPlaneButton.checked = true
  }

  if (main.yPlaneButton) {
    main.yPlaneButton.checked = false
  }

  if (main.zPlaneButton) {
    main.zPlaneButton.checked = false
  }

  if (main.volumeButton) {
    main.volumeButton.checked = false
  }

  if (!main.planeUIGroup) {
    return
  }

  if (!context.use2D) {
    main.xPlaneVisibleButton.style.display = 'none'
    main.xPlaneInvisibleButton.style.display = 'none'
    main.yPlaneVisibleButton.style.display = 'none'
    main.yPlaneInvisibleButton.style.display = 'none'
    main.zPlaneVisibleButton.style.display = 'none'
    main.zPlaneInvisibleButton.style.display = 'none'
  }

  main.planeUIGroup.style.display = 'block'
  main.xPlaneRow.style.display = 'flex'
  main.yPlaneRow.style.display = 'none'
  main.zPlaneRow.style.display = 'none'
}

function viewModeYPlane$1(context) {
  var main = context.main

  if (main.xPlaneButton) {
    main.xPlaneButton.checked = false
  }

  if (main.yPlaneButton) {
    main.yPlaneButton.checked = true
  }

  if (main.zPlaneButton) {
    main.zPlaneButton.checked = false
  }

  if (main.volumeButton) {
    main.volumeButton.checked = false
  }

  if (!main.planeUIGroup) {
    return
  }

  if (!context.use2D) {
    main.xPlaneVisibleButton.style.display = 'none'
    main.xPlaneInvisibleButton.style.display = 'none'
    main.yPlaneVisibleButton.style.display = 'none'
    main.yPlaneInvisibleButton.style.display = 'none'
    main.zPlaneVisibleButton.style.display = 'none'
    main.zPlaneInvisibleButton.style.display = 'none'
  }

  main.planeUIGroup.style.display = 'block'
  main.xPlaneRow.style.display = 'none'
  main.yPlaneRow.style.display = 'flex'
  main.zPlaneRow.style.display = 'none'
}

function viewModeZPlane$1(context) {
  var main = context.main

  if (main.xPlaneButton) {
    main.xPlaneButton.checked = false
  }

  if (main.yPlaneButton) {
    main.yPlaneButton.checked = false
  }

  if (main.zPlaneButton) {
    main.zPlaneButton.checked = true
  }

  if (main.volumeButton) {
    main.volumeButton.checked = false
  }

  if (!main.planeUIGroup) {
    return
  }

  if (!context.use2D) {
    main.xPlaneVisibleButton.style.display = 'none'
    main.xPlaneInvisibleButton.style.display = 'none'
    main.yPlaneVisibleButton.style.display = 'none'
    main.yPlaneInvisibleButton.style.display = 'none'
    main.zPlaneVisibleButton.style.display = 'none'
    main.zPlaneInvisibleButton.style.display = 'none'
  }

  main.planeUIGroup.style.display = 'block'
  main.xPlaneRow.style.display = 'none'
  main.yPlaneRow.style.display = 'none'
  main.zPlaneRow.style.display = 'flex'
}

function viewModeVolume$1(context) {
  var main = context.main

  if (main.xPlaneButton) {
    main.xPlaneButton.checked = false
  }

  if (main.yPlaneButton) {
    main.yPlaneButton.checked = false
  }

  if (main.zPlaneButton) {
    main.zPlaneButton.checked = false
  }

  if (main.volumeButton) {
    main.volumeButton.checked = true
  }

  if (!main.planeUIGroup) {
    return
  }

  var slicingPlanes = main.slicingPlanes
  main.xPlaneVisibleButton.style.display = slicingPlanes.x.visible
    ? 'flex'
    : 'none'
  main.xPlaneInvisibleButton.style.display = slicingPlanes.x.visible
    ? 'none'
    : 'flex'
  main.yPlaneVisibleButton.style.display = slicingPlanes.y.visible
    ? 'flex'
    : 'none'
  main.yPlaneInvisibleButton.style.display = slicingPlanes.y.visible
    ? 'none'
    : 'flex'
  main.zPlaneVisibleButton.style.display = slicingPlanes.z.visible
    ? 'flex'
    : 'none'
  main.zPlaneInvisibleButton.style.display = slicingPlanes.z.visible
    ? 'none'
    : 'flex'

  if (context.uiCollapsed) {
    main.planeUIGroup.style.display = 'none'
  } else {
    main.planeUIGroup.style.display = 'block'
    main.xPlaneRow.style.display = 'flex'
    main.yPlaneRow.style.display = 'flex'
    main.zPlaneRow.style.display = 'flex'
  }
}

function applySlicingPlanes(context, event) {
  var slicingPlanes = event.data
  var main = context.main

  if (context.use2D) {
    if (main.viewPlanesButton) {
      main.viewPlanesButton.style.display = 'none'
    }

    return
  }

  if (
    !slicingPlanes.x.visibile &&
    !slicingPlanes.y.visible &&
    !slicingPlanes.z.visible
  ) {
    if (main.viewPlanesButtonInput) {
      main.viewPlanesButtonInput.checked = false
    }
  } else {
    if (main.viewPlanesButtonInput) {
      main.viewPlanesButtonInput.checked = true
    }
  }

  if (!main.planeUIGroup) {
    return
  }

  main.xSliceElement.min = slicingPlanes.x.min
  main.xSliceElement.max = slicingPlanes.x.max
  main.xSliceElement.step = slicingPlanes.x.step
  main.ySliceElement.min = slicingPlanes.y.min
  main.ySliceElement.max = slicingPlanes.y.max
  main.ySliceElement.step = slicingPlanes.y.step
  main.zSliceElement.min = slicingPlanes.z.min
  main.zSliceElement.max = slicingPlanes.z.max
  main.zSliceElement.step = slicingPlanes.z.step

  if (main.viewMode === 'Volume') {
    main.xPlaneVisibleButton.style.display = slicingPlanes.x.visible
      ? 'flex'
      : 'none'
    main.xPlaneInvisibleButton.style.display = slicingPlanes.x.visible
      ? 'none'
      : 'flex'
    main.yPlaneVisibleButton.style.display = slicingPlanes.y.visible
      ? 'flex'
      : 'none'
    main.yPlaneInvisibleButton.style.display = slicingPlanes.y.visible
      ? 'none'
      : 'flex'
    main.zPlaneVisibleButton.style.display = slicingPlanes.z.visible
      ? 'flex'
      : 'none'
    main.zPlaneInvisibleButton.style.display = slicingPlanes.z.visible
      ? 'none'
      : 'flex'
  }

  main.xPlanePauseButton.style.display = slicingPlanes.x.scroll
    ? 'flex'
    : 'none'
  main.xPlanePlayButton.style.display = slicingPlanes.x.scroll ? 'none' : 'flex'
  main.yPlanePauseButton.style.display = slicingPlanes.y.scroll
    ? 'flex'
    : 'none'
  main.yPlanePlayButton.style.display = slicingPlanes.y.scroll ? 'none' : 'flex'
  main.zPlanePauseButton.style.display = slicingPlanes.z.scroll
    ? 'flex'
    : 'none'
  main.zPlanePlayButton.style.display = slicingPlanes.z.scroll ? 'none' : 'flex'
}

function applyXSlice(context, event) {
  var position = event.data
  var xPlaneLabel = context.main.xPlaneLabel

  if (!xPlaneLabel) {
    return
  }

  var numberOfValueChars = 6
  var valueString = String(position).substring(0, numberOfValueChars)
  var padLength =
    valueString.length < numberOfValueChars
      ? numberOfValueChars - valueString.length
      : 0
  var pad = '&nbsp;'.repeat(padLength)
  xPlaneLabel.innerHTML = 'X: '.concat(pad).concat(valueString)
  context.main.xSliceElement.value = position
}

function applyYSlice(context, event) {
  var position = event.data
  var yPlaneLabel = context.main.yPlaneLabel

  if (!yPlaneLabel) {
    return
  }

  var numberOfValueChars = 6
  var valueString = String(position).substring(0, numberOfValueChars)
  var padLength =
    valueString.length < numberOfValueChars
      ? numberOfValueChars - valueString.length
      : 0
  var pad = '&nbsp;'.repeat(padLength)
  yPlaneLabel.innerHTML = 'Y: '.concat(pad).concat(valueString)
  context.main.ySliceElement.value = position
}

function applyZSlice(context, event) {
  var position = event.data
  var zPlaneLabel = context.main.zPlaneLabel

  if (!zPlaneLabel) {
    return
  }

  var numberOfValueChars = 6
  var valueString = String(position).substring(0, numberOfValueChars)
  var padLength =
    valueString.length < numberOfValueChars
      ? numberOfValueChars - valueString.length
      : 0
  var pad = '&nbsp;'.repeat(padLength)
  zPlaneLabel.innerHTML = 'Z: '.concat(pad).concat(valueString)
  context.main.zSliceElement.value = position
}

var mainUIMachineOptions = {
  actions: {
    createMainInterface: createMainInterface,
    toggleAnnotations: toggleAnnotations,
    toggleFullscreen: toggleFullscreen,
    toggleRotate: toggleRotate,
    toggleAxes: toggleAxes,
    toggleBackgroundColor: toggleBackgroundColor,
    toggleCroppingPlanes: toggleCroppingPlanes,
    viewModeXPlane: viewModeXPlane$1,
    viewModeYPlane: viewModeYPlane$1,
    viewModeZPlane: viewModeZPlane$1,
    viewModeVolume: viewModeVolume$1,
    applySlicingPlanes: applySlicingPlanes,
    applyXSlice: applyXSlice,
    applyYSlice: applyYSlice,
    applyZSlice: applyZSlice,
  },
}

function addLayerUIRow$1(context) {
  var layersUIRow = document.createElement('div')
  layersUIRow.setAttribute('class', style.layersUIRow)
  context.layers.layersUIGroup.appendChild(layersUIRow)
}

function createLayersInterface(context) {
  var layersUIGroup = document.createElement('div')
  layersUIGroup.setAttribute('class', style.uiGroup)
  context.layers.layersUIGroup = layersUIGroup
  context.uiGroups.set('layers', layersUIGroup) // layer name -> layerEntry map

  context.layers.uiLayers = new Map()
  addLayerUIRow$1(context)
  context.uiContainer.appendChild(layersUIGroup)
}

function createLayerEntry(context, name, layer) {
  var layerEntry = document.createElement('div')
  layerEntry.setAttribute('class', style.layerEntryCommon)
  layerEntry.style.borderWidth = '3px'
  applyContrastSensitiveStyleToElement(context, 'layerEntry', layerEntry)
  var visibleButton = document.createElement('div')
  visibleButton.innerHTML = '<input id="'
    .concat(context.id, '-visibleButton" type="checkbox" checked class="')
    .concat(
      style.toggleInput,
      '"><label itk-vtk-tooltip itk-vtk-tooltip-top-annotations itk-vtk-tooltip-content="Visibility" class="'
    )
    .concat(style.visibleButton, ' ')
    .concat(style.toggleButton, '" for="')
    .concat(context.id, '-visibleButton"><img src="')
    .concat(optimizedSVGDataUri$2, '" alt="visible"/></label>')
  visibleButton.children[0]
  var visibleLabel = visibleButton.children[1]
  applyContrastSensitiveStyleToElement(
    context,
    'invertibleButton',
    visibleLabel
  )
  layerEntry.appendChild(visibleButton)
  var invisibleButton = document.createElement('div')
  invisibleButton.innerHTML = '<input id="'
    .concat(context.id, '-invisibleButton" type="checkbox" class="')
    .concat(
      style.toggleInput,
      '"><label itk-vtk-tooltip itk-vtk-tooltip-top-annotations itk-vtk-tooltip-content="Visibility" class="'
    )
    .concat(style.visibleButton, ' ')
    .concat(style.toggleButton, '" for="')
    .concat(context.id, '-invisibleButton"><img src="')
    .concat(optimizedSVGDataUri$j, ' alt="invisible""/></label>')
  invisibleButton.children[0]
  var invisibleLabel = invisibleButton.children[1]
  applyContrastSensitiveStyleToElement(
    context,
    'invertibleButton',
    invisibleLabel
  )
  layerEntry.appendChild(invisibleButton)

  if (layer.visible) {
    visibleButton.style.display = 'flex'
    invisibleButton.style.display = 'none'
  } else {
    visibleButton.style.display = 'none'
    invisibleButton.style.display = 'flex'
  }

  visibleButton.addEventListener('click', function(event) {
    event.preventDefault()
    event.stopPropagation()
    context.service.send({
      type: 'TOGGLE_LAYER_VISIBILITY',
      data: name,
    })
    visibleButton.checked = true
  })
  invisibleButton.addEventListener('click', function(event) {
    event.preventDefault()
    event.stopPropagation()
    context.service.send({
      type: 'TOGGLE_LAYER_VISIBILITY',
      data: name,
    })
    invisibleButton.checked = false
  })
  var layerLabel = document.createElement('label')
  layerLabel.setAttribute('class', ''.concat(style.layerLabelCommon))
  applyContrastSensitiveStyleToElement(context, 'layerLabel', layerLabel)
  layerLabel.innerText = name
  layerEntry.appendChild(layerLabel)
  var iconElement = document.createElement('div')

  switch (layer.type) {
    case 'image': {
      iconElement.innerHTML = '<img src="'.concat(
        optimizedSVGDataUri$l,
        '" alt="image"/>'
      )
      break
    }

    case 'labelImage': {
      iconElement.innerHTML = '<img src="'.concat(
        optimizedSVGDataUri$i,
        '" alt="labels"/>'
      )
      break
    }

    default:
      throw new Error('Unsupported layer type: '.concat(layer.type))
  }

  iconElement.setAttribute('class', style.layerIcon)
  applyContrastSensitiveStyleToElement(context, 'invertibleButton', iconElement)
  layerEntry.appendChild(iconElement)
  layerEntry.addEventListener('click', function(event) {
    event.preventDefault()
    context.service.send({
      type: 'SELECT_LAYER',
      data: name,
    })
  })
  return layerEntry
}

function createLayerInterface(context, event) {
  var name = context.layers.lastAddedData.name
  var layer = context.layers.actorContext.get(name)
  var layersUIGroup = context.layers.layersUIGroup
  var layerEntry = null
  var numRows = layersUIGroup.children.length

  for (var row = 0; row < numRows; row++) {
    var uiRow = layersUIGroup.children[row]

    if (uiRow.children.length < 2) {
      layerEntry = createLayerEntry(context, name, layer)
      uiRow.appendChild(layerEntry)
    }
  }

  if (!!!layerEntry) {
    addLayerUIRow(context)
    var _uiRow = layersUIGroup[layersUIGroup.children.length - 1]
    layerEntry = createLayerEntry(context, name, layer)

    _uiRow.appendChild(layerEntry)
  }

  context.layers.uiLayers.set(name, layerEntry)
}

function applyGroupVisibility(context, groupNames, visible) {
  for (var idx = 0; idx < groupNames.length; idx++) {
    if (!context.uiGroups.has(groupNames[idx])) {
      continue
    }

    var uiGroup = context.uiGroups.get(groupNames[idx])

    if (visible) {
      uiGroup.style.display = 'block'
    } else {
      uiGroup.style.display = 'none'
    }
  }
}

function toggleLayerVisibility(context, event) {
  var layers = context.layers
  var name = event.data
  var actorContext = layers.actorContext.get(name)
  var visible = actorContext.visible
  var layerEntry = context.layers.uiLayers.get(name)
  var visibleButton = layerEntry.children[0]
  var invisibleButton = layerEntry.children[1]

  if (visible) {
    visibleButton.style.display = 'flex'
    invisibleButton.style.display = 'none'
  } else {
    visibleButton.style.display = 'none'
    invisibleButton.style.display = 'flex'

    switch (actorContext.type) {
      case 'image':
        applyGroupVisibility(context, ['images'], false)
        break

      case 'labelImage':
        applyGroupVisibility(
          context,
          ['labelImages', 'labelImageWeights'],
          false
        )
        break

      default:
        console.error('Unsupported layer type: '.concat(type))
    }
  }
}

var selectedBorderWidth = '3px'
var unselectedBorderWidth = '2px'

function selectLayer(context, event) {
  var name = event.data
  var actorContext = context.layers.actorContext.get(name)
  var layerEntry = context.layers.uiLayers.get(name)
  layerEntry.style.borderWidth = selectedBorderWidth
  var type = actorContext.type
  context.layers.actorContext.forEach(function(ac, layerName) {
    if (layerName !== name && ac.type === type) {
      var entry = context.layers.uiLayers.get(layerName)
      entry.style.borderWidth = unselectedBorderWidth
    }
  })

  if (!actorContext.visible) {
    context.service.send({
      type: 'TOGGLE_LAYER_VISIBILITY',
      data: name,
    })
  }

  if (!context.uiCollapsed) {
    switch (type) {
      case 'image':
        applyGroupVisibility(context, ['images'], true)
        var imageActorContext = context.images.actorContext.get(name)

        if (imageActorContext.labelImageName) {
          applyGroupVisibility(
            context,
            ['labelImages', 'labelImageWeights'],
            true
          )
        }

        break

      case 'labelImage':
        if (actorContext.imageName) {
          applyGroupVisibility(context, ['images'], true)
        }

        applyGroupVisibility(
          context,
          ['labelImages', 'labelImageWeights'],
          true
        )
        break

      default:
        console.error('Unsupported layer type: '.concat(type))
    }
  }
}

var layersUIMachineOptions = {
  layerUIActor: {
    actions: {
      createLayerInterface: createLayerInterface,
      selectLayer: selectLayer,
      toggleLayerVisibility: toggleLayerVisibility,
    },
  },
  actions: {
    createLayersInterface: createLayersInterface,
  },
}

function createComponentSelector(context, imageUIGroup) {
  var viewerDOMId = context.id
  var componentSelector = document.createElement('div')
  componentSelector.setAttribute('class', style.selector)
  componentSelector.id = ''.concat(viewerDOMId, '-componentSelector')
  context.images.componentSelector = componentSelector
  var componentRow = document.createElement('div')
  componentRow.setAttribute('class', style.uiRow) // This row needs custom bottom padding, to aid in the illusion
  // that it's the tabbed portion of a tabbed pane

  componentRow.setAttribute('style', 'padding-bottom: 0px;')
  componentRow.className += ' '.concat(viewerDOMId, '-volumeComponents')
  context.images.componentRow = componentRow
  componentSelector.addEventListener('change', function(event) {
    event.preventDefault()
    event.stopPropagation()
    var selectedIndex = Number(event.target.dataset.componentIndex)

    if (event.target.type === 'radio') {
      context.service.send({
        type: 'SELECT_IMAGE_COMPONENT',
        data: {
          name: context.images.selectedName,
          component: selectedIndex,
        },
      })
    } else if (event.target.type === 'checkbox') {
      var visibility = event.target.checked
      context.service.send({
        type: 'IMAGE_COMPONENT_VISIBILITY_CHANGED',
        data: {
          name: context.images.selectedName,
          component: selectedIndex,
          visibility: visibility,
        },
      })
    }
  })
  componentRow.appendChild(componentSelector)
  imageUIGroup.appendChild(componentRow)
}

function toggleInterpolation(context, event) {
  var name = event.data
  var actorContext = context.images.actorContext.get(name)
  var interpolation = actorContext.interpolationEnabled
  context.images.interpolationButtonInput.checked = interpolation
}

function createInterpolationButton(context, uiRow) {
  var interpolationButton = document.createElement('div') // Todo: send event to disable interpolation when label maps added
  //if (context.images.labelMaps.length) {
  //context.images.interpolationEnabled = false
  //}
  // and the "input" element needs to get the 'disabled' attribute added

  interpolationButton.innerHTML = '<input id="'
    .concat(context.id, '-toggleInterpolationButton" type="checkbox" class="')
    .concat(
      style.toggleInput,
      '"><label itk-vtk-tooltip itk-vtk-tooltip-top-screenshot itk-vtk-tooltip-content="Interpolation" class="'
    )
    .concat(style.interpolationButton, ' ')
    .concat(style.toggleButton, '" for="')
    .concat(context.id, '-toggleInterpolationButton"><img src="')
    .concat(optimizedSVGDataUri$k, '" alt="interpolation" /></label>')
  var interpolationButtonInput = interpolationButton.children[0]
  var interpolationButtonLabel = interpolationButton.children[1]
  context.images.interpolationButtonLabel = interpolationButtonLabel
  context.images.interpolationButtonInput = interpolationButtonInput
  toggleInterpolation(context, {
    data: context.images.selectedName,
  })
  interpolationButton.addEventListener('change', function(event) {
    event.preventDefault()
    event.stopPropagation()
    context.service.send({
      type: 'TOGGLE_IMAGE_INTERPOLATION',
      data: context.images.selectedName,
    })
  })
  uiRow.appendChild(interpolationButton)
}

var css_248z =
  '/*\nTo change this license header, choose License Headers in Project Properties.\nTo change this template file, choose Tools | Templates\nand open the template in the editor.\n*/\n/* \n    Created on : Nov 28, 2013, 7:09:35 AM\n    Author     : bugraozden\n*/\n\n.iconselect_icon-select__Sd-E3{\n    width:0px;\n    z-index: 2000;\n }\n\n .iconselect_icon-select__Sd-E3 .iconselect_selected-box__YaAz- {\n\n     position: relative;\n     margin: 0px;\n     padding: 0px;\n     width: 70px; /* sil */\n     height: 60px; /* sil */\n     border: 1px solid #999999;\n     border-radius: 3px;\n\t background-color: white;\n\t \n\t z-index: 1000;\n\n }\n\n .iconselect_icon-select__Sd-E3 .iconselect_selected-box__YaAz-:hover {\n\n     position: relative;\n     margin: 0px;\n     padding: 0px;\n     width: 70px; /* sil */\n     height: 60px; /* sil */\n     border: 1px solid #000000;\n     background-color: #FFFFFF;\n     border-radius: 3px;\n\n }\n\n .iconselect_icon-select__Sd-E3 .iconselect_selected-icon__iswfk {\n\n     position: absolute;\n     margin: 0px;\n     padding: 0px;\n     top:5px;\n     left:5px;\n     width: 48px; /* sil */\n     height: 48px; /* sil */\n     border-radius: 3px;\n\n }\n\n .iconselect_icon-select__Sd-E3 .iconselect_component-icon__AY7IZ{\n     position: absolute;\n     bottom:2px;\n     right:4px;\n }\n\n .iconselect_icon-select__Sd-E3 .iconselect_box__ITflu {\n\n     position: absolute;\n     top:0px;\n     left:71px;\n     margin: 0px;\n     padding: 0px;\n     width: 170px; /* sil */\n     height: 170px; /* sil */\n     border: 1px solid #EEEEEE;\n     background-color: #EEEEEE;\n     border-radius: 3px;\n     \n     \n     overflow:auto;\n     /*\n     -webkit-overflow-scrolling: touch;\n     */\n\n }\n\n .iconselect_icon-select__Sd-E3 .iconselect_icon__dPhWj {\n     position: relative;\n     margin: 5px 0px 0px 5px;\n     padding: 0px;\n     width: 48px; /* sil */\n     height: 48px; /* sil */\n     border: 1px solid #CCCCCC;\n     background-color: #FFFFFF;\n     border-radius: 3px;\n\n     overflow:hidden;\n     float: left;\n }\n\n .iconselect_icon-select__Sd-E3 .iconselect_icon__dPhWj:hover {\n     border: 1px solid #000000;\n }\n\n .iconselect_icon-select__Sd-E3 .iconselect_icon__dPhWj.iconselect_selected__zCJ2U {\n     position: relative;\n     margin: 5px 0px 0px 5px;\n     padding: 0px;\n     width: 48px; /* sil */\n     height: 48px; /* sil */\n     border: 1px solid #EEEEEE;\n     background-color: #EEEEEE;\n     border-radius: 3px;\n\n     overflow:hidden;\n     float: left;\n }\n'
styleInject(css_248z)

IconSelect.DEFAULT = {}
IconSelect.DEFAULT.SELECTED_ICON_WIDTH = 48
IconSelect.DEFAULT.SELECTED_ICON_HEIGHT = 48
IconSelect.DEFAULT.SELECTED_BOX_PADDING = 1
IconSelect.DEFAULT.SELECTED_BOX_PADDING_RIGHT = 12
IconSelect.DEFAULT.ICONS_WIDTH = 32
IconSelect.DEFAULT.ICONS_HEIGHT = 32
IconSelect.DEFAULT.BOX_ICON_SPACE = 1
IconSelect.DEFAULT.HORIZONTAL_ICON_NUMBER = 3
IconSelect.DEFAULT.VECTORAL_ICON_NUMBER = 3

IconSelect.COMPONENT_ICON_FILE_PATH =
  'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAUAAAAICAQAAACb+P2wAAAABGdBTUEAALGPC/xhBQAAAAJiS0dEAP+Hj8y/AAAACXBIWXMAAAsSAAALEgHS3X78AAAAB3RJTUUH4woCEhUXF3kHawAAAEZJREFUCNc9xrERQEAQAMB1IzajHS28XhSgAoFuCEU0oQctcCI2WjAkt2DK05S32PLQOOzpk+K/eslZeKyir4pW0VVgTC4vEbMU+2VifuUAAAAWdEVYdENyZWF0aW9uIFRpbWUAMTEvMjgvMTNLZvc+AAAAJXRFWHRkYXRlOmNyZWF0ZQAyMDE5LTEwLTAyVDE4OjIxOjIzLTA0OjAwbIGKZAAAACV0RVh0ZGF0ZTptb2RpZnkAMjAxOS0xMC0wMlQxODoyMToyMy0wNDowMB3cMtgAAAAcdEVYdFNvZnR3YXJlAEFkb2JlIEZpcmV3b3JrcyBDUzbovLKMAAAAAElFTkSuQmCC'

function IconSelect($$elementID, $$element, $$parameters) {
  var _icons = []
  var _selectedIndex = -1

  var _default = IconSelect.DEFAULT

  function _init() {
    //parametreler boş gelirse
    if (!$$parameters) $$parameters = {}
    //En üst elementi seç
    if (_View.setIconSelectElement($$element)) {
      //set parameters
      $$parameters = _Model.checkParameters($$parameters)
      //create UI
      _View.createUI($$parameters, $$elementID)
      //basıldığında göster/gizle
      _View.iconSelectElement.onclick = function() {
        _View.showBox()
      }

      //Başlangıçta gizle
      _View.showBox(false)

      //Nesneye basıldığında gizlemeyi iptal et.
      _View.iconSelectElement.addEventListener('click', function($event) {
        $event.stopPropagation()
      })

      //dışarı basıldığında gizle.
      window.addEventListener('click', function() {
        _View.showBox(false)
      })
    } else {
      alert('Element not found.')
    }
  }

  //Tüm iconları yeniden yükle.
  this.refresh = function($icons) {
    _icons = []

    _View.clearIcons()

    var setSelectedIndex = this.setSelectedIndex

    for (var i = 0; i < $icons.length; i++) {
      $icons[i].element = _View.createIcon(
        $icons[i].iconFilePath,
        $icons[i].iconValue,
        i,
        $$parameters
      )
      $icons[i].element.onclick = function() {
        setSelectedIndex(this.childNodes[0].getAttribute('icon-index'))
      }
      _icons.push($icons[i])
    }

    var horizontalIconNumber = Math.ceil(
      $icons.length / $$parameters.vectoralIconNumber
    )

    _View.boxElement.style.height =
      ($$parameters.iconsHeight + 2) * horizontalIconNumber +
      (horizontalIconNumber + 1) * $$parameters.boxIconSpace +
      'px'
    this.setSelectedIndex(0)
  }

  //icon listesini al.
  this.getIcons = function() {
    return _icons
  }

  //iconu seçili hale gelir.
  this.setSelectedIndex = function($index) {
    var icon

    if (_icons.length > $index) icon = _icons[$index]

    if (icon) {
      //eski icondan seçilme özelliğini kaldır.
      if (_selectedIndex != -1)
        _icons[_selectedIndex].element.setAttribute('class', 'icon')
      _selectedIndex = $index
      _View.selectedIconImgElement.setAttribute('src', icon.iconFilePath)
      if (_selectedIndex != -1)
        _icons[_selectedIndex].element.setAttribute('class', 'icon selected')
    }

    //_View.iconSelectElement.dispatchEvent(new Event('changed'));
    _View.iconSelectElement.dispatchEvent(new CustomEvent('changed'))

    //_View.showBox(false);
  }

  this.setSelectedValue = function(value) {
    var icon = _icons.filter(e => e.iconValue == value)
    var index = icon.length > 0 ? _icons.indexOf(icon[0]) : -1

    return this.setSelectedIndex(index)
  }

  this.getSelectedIndex = function() {
    return _selectedIndex
  }
  this.getSelectedValue = function() {
    return _icons[_selectedIndex].iconValue
  }
  this.getSelectedFilePath = function() {
    return _icons[_selectedIndex].iconFilePath
  }

  //### VIEW CLASS ###

  function _View() {}

  _View.iconSelectElement
  _View.boxElement
  _View.boxScrollElement
  _View.selectedIconImgElement
  _View.selectedIconElement

  _View.showBox = function($isShown) {
    if ($isShown == null) {
      $isShown = _View.boxElement.style.display == 'none' ? true : false
    }

    if ($isShown) {
      _View.boxElement.style.display = 'block'
      _View.boxScrollElement.style.display = 'block'
    } else {
      _View.boxElement.style.display = 'none'
      _View.boxScrollElement.style.display = 'none'
    }

    _View.boxElement.style.display = $isShown ? 'block' : 'none'
  }

  _View.setIconSelectElement = function($element) {
    _View.iconSelectElement = $element
    return _View.iconSelectElement
  }

  _View.clearUI = function() {
    _View.iconSelectElement.innerHTML = ''
  }

  _View.clearIcons = function() {
    _View.boxElement.innerHTML = ''
  }

  _View.createUI = function($parameters) {
    /* HTML MODEL
        
        <div id="my-icon-select" class="icon-select">
            <div class="selected-box">
                <div class="selected-icon"><img src="images/icons/i2.png"></div>
                <div class="component-icon"><img src="images/control/icon-select/arrow.png"></div>
                <div class="box">
                    <div class="icon"><img src="images/icons/i1.png"></div>
                    <div class="icon selected"><img src="images/icons/i2.png"></div>
                    <div class="icon"><img src="images/icons/i3.png"></div>
                    <div class="icon"><img src="images/icons/i4.png"></div>
                    <div class="icon"><img src="images/icons/i3.png"></div>
                    <div class="icon"><img src="images/icons/i4.png"></div>
                    <div class="icon"><img src="images/icons/i5.png"></div>
                    <div class="icon"><img src="images/icons/i6.png"></div>
                    <div class="icon"><img src="images/icons/i7.png"></div>
                    <div class="icon"><img src="images/icons/i8.png"></div>
                </div>
            </div>
        </div>
        
        */

    _View.clearUI()

    _View.iconSelectElement.setAttribute('class', 'icon-select')

    var selectedBoxElement = document.createElement('div')
    selectedBoxElement.setAttribute('class', 'selected-box')

    var selectedIconElement = document.createElement('div')
    selectedIconElement.setAttribute('class', 'selected-icon')

    _View.selectedIconImgElement = document.createElement('img')
    _View.selectedIconImgElement.setAttribute('src', '')
    selectedIconElement.appendChild(_View.selectedIconImgElement)

    var componentIconElement = document.createElement('div')
    componentIconElement.setAttribute('class', 'component-icon')

    var componentIconImgElement = document.createElement('img')
    componentIconImgElement.setAttribute(
      'src',
      IconSelect.COMPONENT_ICON_FILE_PATH
    )
    componentIconElement.appendChild(componentIconImgElement)

    _View.boxScrollElement = document.createElement('div')
    _View.boxScrollElement.setAttribute('id', $$elementID + '-box-scroll')
    _View.boxScrollElement.setAttribute('class', 'box')

    _View.boxElement = document.createElement('div')

    //_View.boxElement.setAttribute('class', 'box');
    _View.boxScrollElement.appendChild(_View.boxElement)

    _View.selectedIconImgElement.setAttribute(
      'width',
      $parameters.selectedIconWidth
    )
    _View.selectedIconImgElement.setAttribute(
      'height',
      $parameters.selectedIconHeight
    )
    selectedBoxElement.style.width =
      $parameters.selectedIconWidth +
      $parameters.selectedBoxPadding +
      $parameters.selectedBoxPaddingRight +
      'px'
    selectedBoxElement.style.height =
      $parameters.selectedIconHeight + $parameters.selectedBoxPadding * 2 + 'px'
    selectedIconElement.style.width = $parameters.selectedIconWidth + 'px'
    selectedIconElement.style.height = $parameters.selectedIconHeight + 'px'
    selectedIconElement.style.top = '0px'
    selectedIconElement.style.left = '0px'
    componentIconElement.style.bottom =
      4 + $parameters.selectedBoxPadding + 'px'

    _View.boxScrollElement.style.left =
      parseInt(selectedBoxElement.style.width) + 1 + 'px'

    _View.boxScrollElement.style.width =
      ($parameters.iconsWidth + 6) * $parameters.vectoralIconNumber +
      ($parameters.vectoralIconNumber + 1) * $parameters.boxIconSpace +
      'px'
    _View.boxScrollElement.style.height =
      ($parameters.iconsHeight + 2) * $parameters.horizontalIconNumber +
      ($parameters.horizontalIconNumber + 1) * $parameters.boxIconSpace +
      'px'

    _View.boxElement.style.left = _View.boxScrollElement.style.left + 'px'
    _View.boxElement.style.width = _View.boxScrollElement.style.width + 'px'

    _View.iconSelectElement.appendChild(selectedBoxElement)
    selectedBoxElement.appendChild(selectedIconElement)
    selectedBoxElement.appendChild(componentIconElement)
    selectedBoxElement.appendChild(_View.boxScrollElement)

    var results = {}
    results['iconSelectElement'] = _View.iconSelectElement
    results['selectedBoxElement'] = selectedBoxElement
    results['selectedIconElement'] = selectedIconElement
    results['selectedIconImgElement'] = _View.selectedIconImgElement
    results['componentIconElement'] = componentIconElement
    results['componentIconImgElement'] = componentIconImgElement

    return results

    //trigger: created ( run setValues )
  }

  _View.createIcon = function($iconFilePath, $iconValue, $index, $parameters) {
    /* HTML MODEL 
         
         <div class="icon"><img src="images/icons/i1.png"></div>
         
         */

    var iconElement = document.createElement('div')
    iconElement.setAttribute('class', 'icon')
    iconElement.style.width = $parameters.iconsWidth + 'px'
    iconElement.style.height = $parameters.iconsHeight + 'px'
    iconElement.style.marginLeft = $parameters.boxIconSpace + 'px'
    iconElement.style.marginTop = $parameters.boxIconSpace + 'px'

    var iconImgElement = document.createElement('img')
    iconImgElement.setAttribute('src', $iconFilePath)
    iconImgElement.setAttribute('alt', $iconValue)
    iconImgElement.setAttribute('title', $iconValue)
    iconImgElement.setAttribute('icon-value', $iconValue)
    iconImgElement.setAttribute('icon-index', $index)
    iconImgElement.setAttribute('width', $parameters.iconsWidth)
    iconImgElement.setAttribute('height', $parameters.iconsHeight)
    iconImgElement.style.width = $parameters.iconsWidth + 'px'
    iconImgElement.style.height = $parameters.iconsHeight + 'px'

    iconElement.appendChild(iconImgElement)
    _View.boxElement.appendChild(iconElement)

    return iconElement
  }

  //### MODEL CLASS ###

  function _Model() {}

  //TODO: params değişkenini kaldır yeni oluştursun.
  _Model.checkParameters = function($parameters) {
    $parameters.selectedIconWidth = $parameters.selectedIconWidth
      ? $parameters.selectedIconWidth
      : _default.SELECTED_ICON_WIDTH
    $parameters.selectedIconHeight = $parameters.selectedIconHeight
      ? $parameters.selectedIconHeight
      : _default.SELECTED_ICON_HEIGHT
    $parameters.selectedBoxPadding = $parameters.selectedBoxPadding
      ? $parameters.selectedBoxPadding
      : _default.SELECTED_BOX_PADDING
    $parameters.selectedBoxPaddingRight = $parameters.selectedBoxPaddingRight
      ? $parameters.selectedBoxPaddingRight
      : _default.SELECTED_BOX_PADDING_RIGHT
    $parameters.iconsWidth = $parameters.iconsWidth
      ? $parameters.iconsWidth
      : _default.ICONS_WIDTH
    $parameters.iconsHeight = $parameters.iconsHeight
      ? $parameters.iconsHeight
      : _default.ICONS_HEIGHT
    $parameters.boxIconSpace = $parameters.boxIconSpace
      ? $parameters.boxIconSpace
      : _default.BOX_ICON_SPACE
    $parameters.vectoralIconNumber = $parameters.vectoralIconNumber
      ? $parameters.vectoralIconNumber
      : _default.VECTORAL_ICON_NUMBER
    $parameters.horizontalIconNumber = $parameters.horizontalIconNumber
      ? $parameters.horizontalIconNumber
      : _default.HORIZONTAL_ICON_NUMBER

    return $parameters
  }

  _init()
}

;(function() {
  if (typeof window.CustomEvent === 'function') return false //If not IE

  function CustomEvent(event, params) {
    params = params || { bubbles: false, cancelable: false, detail: undefined }
    var evt = document.createEvent('CustomEvent')
    evt.initCustomEvent(event, params.bubbles, params.cancelable, params.detail)
    return evt
  }

  CustomEvent.prototype = window.Event.prototype

  window.CustomEvent = CustomEvent
})()

var ColorMapPresetIcons = new Map()
ColorMapPresetIcons.set(
  'Viridis (matplotlib)',
  'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADwAAAAFCAYAAAAZiY8XAAAAxklEQVQ4T+WTUU4DMQxEnxPbaZseq0fo/c9BuxsHZQOtKoQECJAQH6OZJF+jvJGTnHvyghRH3MFtyozuCpYJU7olwkdOhAmhMv2WmXc6HMKgv2a95659ex8+xE1B0iBroNowbbg2iq6UvLLTlV1e2OvCIV/Z54WaL1uu6bLpmIc/cZSXc7pSpVFFqMk4SEFOco7/Vrh9uLBlmif6H//h9d3CprBh/DWkJ7oT8bt/M9I6sP0c0subwjZ3/JMbjof9ji3/zoafAa6pEjNEHZsCAAAAAElFTkSuQmCC'
)
ColorMapPresetIcons.set(
  'Plasma (matplotlib)',
  'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADwAAAAFCAYAAAAZiY8XAAAAt0lEQVQ4T9WTy25DIQxEjy9g0yr57nx0AFc87iZKlAh10S5GM2Y3Ooxc880vLfFN5MsjmYh5GMocmE/pyIIhqIAJ00NDo6OpoakOpdi9kJbiQ46x0N9OhVRHDuut30Hn3fOhhaNnLYiue2XRAlaZ3nCr+HDHDaoJLcvyO3LNt7ZbeJT+h4XrbuEtwg90J9lfIpwbru8Jl93Cf5pwdlyff+n7buEtwn2nLzZ87vijDVtB0rndzzf8A9HeIj3mfi1WAAAAAElFTkSuQmCC'
)
ColorMapPresetIcons.set(
  'Inferno (matplotlib)',
  'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADwAAAAFCAYAAAAZiY8XAAAAv0lEQVQ4T+WTwU4DMQxEX+ys7Syl0P7/l252YxRVVOLUA4gicRi9uY5mpkBNKY5IQ6Wx6IrJ1AvGirMS2fA0Ig0visuU4FJw5Sb5ZOKSmA5cBn7ngeuB6X6n1Y7VHVs6y6R16vS2Uaf3jtqGRkd9Q6aiU2KnRFJCIRwiyNbIWBntxIgTo50Z8Ub6heJXql2w5Z0Cdfy3wMdTA+ut2d9seH9q4B+ddGO014eT7n8p8LJ06vzw5Pzutz58Jv365cMfOKjLEgYA0aMAAAAASUVORK5CYII='
)
ColorMapPresetIcons.set(
  'Magma (matplotlib)',
  'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADwAAAAFCAYAAAAZiY8XAAAAwElEQVQ4T9WT20oEMRAFqy9JJ7P//7VuJtKJioKswojiQ3E6j8XJEfCpUlHtmHXcOiXRg6oHRW6EHMRMOm0GQSHUCdWNCdVkZSj7rZMw9nvdc6eeG3vNQdggfFAXd0oZlDrwOBfWQBeKLAxpjvQCLanviH1HY7a8M9vKRMDP68JKTbmHwin+IvnHwuO68MWGdRDlNxruq+H7deH/1fDTI2GXG+2LDb/tN7+0QPhPbPiOx/xkw7L3+60N527jw4afARTJfpA8jM5iAAAAAElFTkSuQmCC'
)
ColorMapPresetIcons.set(
  'Grayscale',
  'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADwAAAAFCAYAAAAZiY8XAAAAYklEQVQ4T8VSSQrAQAjLoOP//9uV3EopRU2hJz1kRQeAw90x5wRnZ+9w/vIbAHY1sMqvllf8WHhTBLpfUS15xSt5WXjNCJgZIuLx7TP8LzF3LeZivowHCy8Z4BtG5VevrfidE8UT6MnfR0YAAAAASUVORK5CYII='
)
ColorMapPresetIcons.set(
  'X Ray',
  'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADwAAAAFCAYAAAAZiY8XAAAAYUlEQVQ4T8VSSwqAUAj03f/GT21idhER6gStdDFfdAFARJi7G+dkn3D+8lsADjWwyu+WV/xYOBWB6Vd0S17xSl4WjopAZtre+/HtK/wvMXct5mK+igcLewX4hlH53WsrficmEnokOp1YogAAAABJRU5ErkJggg=='
)
ColorMapPresetIcons.set(
  'BkMa',
  'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADwAAAAFCAYAAAAZiY8XAAAAY0lEQVQ4T8WSSQqAQAwEa5jl//91pW8iIpm04Ck59EpSgKPR6HQ0M3uG85dfAXY3sMufLe/4qfDmCGS/YrbkFe/kVeE1IlCpDMbj20f4X2LuWsqlfBEPFV4iwDeMy5+9tuN3AmHODu0pCn69AAAAAElFTkSuQmCC'
)
ColorMapPresetIcons.set(
  'BkCy',
  'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADwAAAAFCAYAAAAZiY8XAAAAVklEQVQ4T2NkYGD4z8DCwsDAysoApslhk6NngOxjZGBg+EeWJ5EdPMQ8/HekefgPUR5mZmZgYGPDnuwHOoZB7gK5jwh3gJL0b2IU4lVDhEUU20GlLAQAXNMO7ZdYpGcAAAAASUVORK5CYII='
)
ColorMapPresetIcons.set(
  'gray_Matlab',
  'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADwAAAAFCAYAAAAZiY8XAAAAZ0lEQVQ4T92TSw6AMAhEy+few739hp0WNZKgMS66IQ3DPBgCsIhIY+bwquos3ISf1TibtdcmM5uPzHrtl4YBTFXG7lLeAn5b2zc8fnXDDoOIdlHLAgonDWDINsn+r8ywqgYIV/HrtVeUThPozHrNVQAAAABJRU5ErkJggg=='
)
ColorMapPresetIcons.set(
  'bone_Matlab',
  'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADwAAAAFCAYAAAAZiY8XAAAAjElEQVQ4T92T3QqDMAyFz88e2Gtfwgd2c5KOSaWdhYkoXpSEkDQJXw67fnjTgiQobO4vMYJfv5aXaojmP+KqhyWUjzDLeMy3yiUrte0cdv0wpUFri0YTC/S9Fn41yexe2JCZriC/orMIPy9F2IRx7EmP24SDDkoNPwQx1/1vDQfJT48dhG041+2fGp4Be5oT6CFo9DwAAAAASUVORK5CYII='
)
ColorMapPresetIcons.set(
  'pink_Matlab',
  'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADwAAAAFCAYAAAAZiY8XAAAAlUlEQVQ4T+VTyQ2AMAyzU/b/sAXTsA+n0jS09IM4hIR4IBfHIKW22XftQiEYBIaMiJLT826WtM4njN+UWor9p9ZROQEZ0iMA/Gxo764p58YBivU8c3le6fuunf+28HS4sLqurmzuf9vhsVxYgsX5UqT9Yjz+j0XaI5xjfifSw6HDsYMCrY71e++wpAt6r8MNAE3d+Q6v73kT6FKU6qEAAAAASUVORK5CYII='
)
ColorMapPresetIcons.set(
  '2hot',
  'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADwAAAAFCAYAAAAZiY8XAAAAlElEQVQ4T+VTyw7DMAgzDdD2G/v/X7FHJq8gRUy7TJ2mqQcLMOFAjKVv6DAAXpAcY+2PPc6ZvMKDUwOaA00L2l6LA1PCgMkA0YgLgHVHj1wYiTl49pOLXJKLuaGWvuF+toVvhyxMRXVQ+iOFqax/XeHrIQvXs57jA3520nHWtEI56Qs0LDH6+J2HaR2+f3o34/94+AHB0CLoaujV1gAAAABJRU5ErkJggg=='
)
ColorMapPresetIcons.set(
  'gist_earth',
  'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADwAAAAFCAYAAAAZiY8XAAAAm0lEQVQ4T+WTzQrCQBCDv5n99cl66+P25dSOTDu1HgQRqpceQpJZWAgkMkyjNZ1palQl2LVR1GhidFE6QhOhOaNP3c3fEs7N9cKrL3MmzYVkZeUN4UUqUEH8V+fNV9AMmgK66xQ35xT3Rb8gZyjlLWSYxvlsge9nC3w7MvDFlPrvSnuFVfdaf6j09dvAHaXGno/bcAMpsenfbfgBpkt86Bn+d34AAAAASUVORK5CYII='
)
ColorMapPresetIcons.set(
  'Haze',
  'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADwAAAAFCAYAAAAZiY8XAAAAqklEQVQ4T8VUWxKDIAwMIelFPCjeuyZ2QpBSqy3OaPvBDIib1+4SeEgzogBFBY4KhJr3eaH4t3r2vf/nmGVxi4uS41RsufOz33Xhmnp4hct11DjPmOuclq/tK/AwKuL0/4apDLEd1DUNJ+lmOCgQncGwqWP2IX9SxjUNj1Nl+CX5jyW9ybBJtQzmPEmn+x7DEQVuux42G3gxX5k66GHLGd/ejcWnW+ro9/ADh/80vNSw528AAAAASUVORK5CYII='
)
ColorMapPresetIcons.set(
  'Haze_green',
  'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADwAAAAFCAYAAAAZiY8XAAAAlElEQVQ4T+VUQQ7DIAxLAqgv6vvYv1vCZAhtinacVk09RAE7gMAxvC65siiFpCSxkEQlCS4wR6RC3LK23AP11fiOoRb4OTa+4ZUYe9v6njt/1nu+Gj7yVBc8jn3s3AM3Prh16/JSlvKkC+dyn8JQhH6u8P4/CuOBnAU+tTSsKZMVri2dt/sU/paHR6dMHk72Z7gLvwEQyDHMFbb/rgAAAABJRU5ErkJggg=='
)
ColorMapPresetIcons.set(
  'Haze_lime',
  'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADwAAAAFCAYAAAAZiY8XAAAAk0lEQVQ4T81TUQ6FMAjrgGt4CC/tJXXby4BFjPphosv7YqzpoCukeVoqUQFzBbFHKiDPe1T87r7zOPLsfHjXcdZ4jRu296K5hN5CLX1brOcDT/a88zue5mkpYwQDxNk/4SxYuCKpmO8F5zGCzSVzfYDDUkDktYLjzeFtjOD/cXh9W3Aczdd3uO0stWnJEAbSwx3+AWa2MkOC82ICAAAAAElFTkSuQmCC'
)
ColorMapPresetIcons.set(
  'Haze_cyan',
  'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADwAAAAFCAYAAAAZiY8XAAAAp0lEQVQ4T+VU0Q7DIAikAvXFf3b/PcUF0LZZTLYs7fawBxK9E1A5WHJMTSiArAhCbhURBANI0D2BsFsjgkpsWO1rxdTGOcV3fnDcfT3O0ddi95jOsfGez3ONM+bHHZvmZShHfPPd77TcYpL6kwev0PSDv/3gHFP9twqX9yqMJrHzJH12hV3qLyWdY7pfUmHUfvuwh03m8x4u7PPA+efZwVA0J3Z80sMPESU1z7RU/B0AAAAASUVORK5CYII='
)
ColorMapPresetIcons.set(
  'Black, Blue and White',
  'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADwAAAAFCAYAAAAZiY8XAAAAXklEQVQ4T92TuwqAMAxFTwvmKtj//1ifgxVEsGToEodwlmQ4uUkCDhBgdGE2kMBaNDCBHvyYmZQpxlVqc3b0JGDvInovLIDwFl54hDKAN+E1vHA9da/w8kvhmvr770+O7xPo4c8kpAAAAABJRU5ErkJggg=='
)
ColorMapPresetIcons.set(
  'Black, Orange and White',
  'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADwAAAAFCAYAAAAZiY8XAAAAYElEQVQ4T92TywqAMAwEx4K7Cvb/P9YnIj0olPbQSz2EuSSHySYDcBoQ0IQBbJDylMGCFzMzwTMoPuUCtRR7BuBoIpoW1oHw3r3wFGG8069LeOteOJ16pfD6S+GU+ufvL47vE+hPhfMGAAAAAElFTkSuQmCC'
)
ColorMapPresetIcons.set(
  'Black-Body Radiation',
  'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADwAAAAFCAYAAAAZiY8XAAAAcklEQVQ4T82SyQrAIAxEn1FKl1Ohy/9/Z1dS7MGeDPXgIQTDMPiSccDVAx2g/a1S7yZE01KGnw9KGBFZYs1J917n6cwBpxV4ANrMBdUIfFiBLfoagXcLgGp/XVijrQaFIp4X6RWR6Ym7RnqzAlv0tV34BrWHE+gE36UrAAAAAElFTkSuQmCC'
)
ColorMapPresetIcons.set(
  'Cool to Warm',
  'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADwAAAAFCAYAAAAZiY8XAAAAx0lEQVQ4T92TMW4DMQwE504idX/yF/xoP8d1kMQnUtIFlIN07hw4SDEYtotdLqfz5ZCtIEXvbIoWmbeWjJQ8rRpOqK53JLygEoAIaD6+GUgaaAp3dG3I2slL2Mk4gpN7JQ8jdyO1SmrG2upk8TuYgYUrR1CNYZWxV3o1engPG74b7Wb4zfHwp2Mfhr079taoV2c5nS/jYeAtIzPo/wrc81bQv9ZwtDybfX7D7eUNDyP5b0/aqdc2J+2PAv/879Mn3VCM9IIf/gLj9LxcOY7OJQAAAABJRU5ErkJggg=='
)
ColorMapPresetIcons.set(
  'Warm to Cool',
  'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADwAAAAFCAYAAAAZiY8XAAAA0ElEQVQ4T92Ty27CQBAEy96dGUgiznwB/3/g49iZfUQ2hhtKDkaKcij1uVXd0zVfhp0FPWX0S9BPRT4EOSpyFPKSByU9MZIp88GY1ZhMmdTgiTLEVnq+07LSslGTUmelJiMQKkJ0oY5M9IT3TLSEt5loM14XppUI8JWB+8Cj475RGu4VL5Uoj3S8BHFzomzcCtM1X/q/KrwUvy3FXxduuxdWY2x2/4phL07dDFc7Z/Qk75202H3O7570LwzH7oZ/+HBLhqNUlu/u++HHj19N+hshjKpp+CdA7QAAAABJRU5ErkJggg=='
)
ColorMapPresetIcons.set(
  'Cool to Warm (Extended)',
  'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADwAAAAFCAYAAAAZiY8XAAAA30lEQVQ4T+WTu07EMAAEJ46fSUjLt93/F9BBiB3bceygO9HQQHOC4orVNtuMtNPB5VRWop2it5LeKqRTqEEjR3NrNWpuGytR7toK7QzmmuErVuMGyzgNzKNjniyTUYxaMhvJk1EMSjLLk+cuooRAxxda+KD6N9q6UJd3agi0sFF9oK4bx+IpfmPfIslvhHUjhkTyhZx2ci7kWEjpIB8dexXk1pNPTe40GUmmJwtBFj0dXNqjAddHAz7+D/iVFpY/v3S5B7C2muGbw47JyDs4vFJ8/NHhPRbiLw4nIdhFzydAO3orQqN1cQAAAABJRU5ErkJggg=='
)
ColorMapPresetIcons.set(
  'Warm to Cool (Extended)',
  'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADwAAAAFCAYAAAAZiY8XAAAA6klEQVQ4T+WTvU7DMBRGz712k+bHLSwdkfJYfXck1KmV2HCakNiOUZgZIgaEYDgPcPR9R850uZJALQmnC04Tbhdpi0DbWOpGqWplf7QUzmCdxbQG0yi2MRin6EqtaLnDVCWmKbH1SoWpDtjqAS0fkfKEFCfEdFzME6954MrMLSVu0XKZLc/jwsuo+CGR+kj0C+IT2Sd0SORxQe4R6RPqwyf4mewD2U8sfiL1MzJO7Od3ah2RMKDxjsYeOdMt/004bRI+WIrDL174LZD7bQvHTcJ/6NLhK2FXBJqNDa8dy7caHrky/VjDEns+AEvpg4p+ccXrAAAAAElFTkSuQmCC'
)
ColorMapPresetIcons.set(
  'Blue to Red Rainbow',
  'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADwAAAAFCAYAAAAZiY8XAAAAWUlEQVQ4T+WTwQrAIAxDnzDQ7f+/VTfmVil4ck7ZcfRQGpL2EJo6EFmBAGh/wzP9695CBlKtvYN7nM7P+LHuQG5rhi9rhnNr2ANbE+//RToCx+NVNNKnpQsX/Pif8u6bT0gAAAAASUVORK5CYII='
)
ColorMapPresetIcons.set(
  'Red to Blue Rainbow',
  'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADwAAAAFCAYAAAAZiY8XAAAAWklEQVQ4T+WTUQuAIAyEPyFI+/+/1YqsidZDpBI+yh7GHdvu4djNCAg4wHJji//N+3SBiRVybQ++ea3X2u3RGYFLm+FTm+FQGp6B5RPvsSLtgb3yKinSh6YLRx8gn/KBGWDTAAAAAElFTkSuQmCC'
)
ColorMapPresetIcons.set(
  'jet',
  'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADwAAAAFCAYAAAAZiY8XAAAAUElEQVQ4T2Ns/1/xn5PhOwMHww8GEI3Mhonhohl+MDAwfGdgoDdNibWM7f8r/o00D/8daR7+Q8jDMHn0pE3zpAzLLmhpmNIk/ZuQh4dTHgYAGGMuhpYUxcAAAAAASUVORK5CYII='
)
ColorMapPresetIcons.set(
  'rainbow',
  'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADwAAAAFCAYAAAAZiY8XAAAAWUlEQVQ4T+WTzQqAMAyDv4Gw6fs/q244rRQ87YfiUXooDUl7CE0DgqxAArTPsKV/3VsqcLyVB3jE6bzFG3pAuL0ZvrwZrq3hCGxNvH8X6R0o/atopE9PF34Akwef8n4QTNkAAAAASUVORK5CYII='
)
ColorMapPresetIcons.set(
  'hsv',
  'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADwAAAAFCAYAAAAZiY8XAAAAWUlEQVQ4T2Nk+P//PwPDZwby8BcMfSwM3xl4GRiohlm+Y3EaprVEO5+R4f//f0SrxgiYoenhvyPNw39o5WEeBgYGPhKTN0g9SB8sW9AiSf+mlYepkZep7WEAn+jR8hNeDScAAAAASUVORK5CYII='
)
ColorMapPresetIcons.set(
  'Rainbow Desaturated',
  'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADwAAAAFCAYAAAAZiY8XAAAAr0lEQVQ4T92TsQ6CMBRFDwkOJUFIEMfyOf3/mUldBSyB0EREQySRIgNs6PByXrud3HcdpdKnMZqm0Yw53lvfhSQCeQAZQTLh0QN9/p7y8xfvGmQISQAymDCE2AUyIB843TPQFeQVFLXNvIaigrZz2Qthje951ttRKu3+STgQAn8kPSf8+DnhPuk+1SHptQm3mxIugOvMeS886SUJ323hEmNuVp/XdfgC+vTu8wY7/ALmVGBoc5I6iwAAAABJRU5ErkJggg=='
)
ColorMapPresetIcons.set(
  'Cold and Hot',
  'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADwAAAAFCAYAAAAZiY8XAAAAb0lEQVQ4T+WTzQpAUBBGz11Y4EEU74MHd9+CJRYXI39FISQWdzHN9E1NnZqjEBEqoIZNfytb3zEFoMeKyEjQxGgCJwcPcJn60by3v5kpRDrbgFvbgJs/gEMy0p9e2lwCHhwvH7j+hcP+7P/i84nXPT82uO2FaAb2AAAAAElFTkSuQmCC'
)
ColorMapPresetIcons.set(
  'Rainbow Blended Black',
  'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADwAAAAFCAYAAAAZiY8XAAAAeElEQVQ4T+WUywqAIBBFj61z3+P/P63aS7u0QlBQm1oVQS2G0etrLkdVwAYt0CHnZKxV+RRpmdeqCRguQ2OyU88q0DPgtxuLXGibqbH0uBBp22uxr4D1aDSa92V8z7B7k7BEtgeacOeeIGz/Rnh5k3D6eKRf5G7COyjIqVIQRHJVAAAAAElFTkSuQmCC'
)
ColorMapPresetIcons.set(
  'Rainbow Blended Grey',
  'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADwAAAAFCAYAAAAZiY8XAAAAfklEQVQ4T+WTOwqAMBBEn9Z+Wj+nsvIW3lrtRciCX6IRQpBYiYXFMLtTDAw7G1R1s4lKEEk5WKWInKwcnRwOFIbt2dbCHmi9iBkerbRlPALarnPY0bYhYqZkMbBnrV17UNXN+rfAy5eB70pSApkp0hsXnr8M7PuOtyo9/SnwDu6XDWHq89sRAAAAAElFTkSuQmCC'
)
ColorMapPresetIcons.set(
  'Rainbow Blended White',
  'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADwAAAAFCAYAAAAZiY8XAAAAcUlEQVQ4T+WTvQqAMAyEP53t7s/7P5rtXtysnhQUSil1Kg4O4ZIbDj6SdJLkHFgLJU09jcAEzLemfer1DlirZfCvUTHSbECMs5lmnvxAYOG4K+2j98ydpPNvwMeXwKUjWYB4TK02HL4Ern1HK+D9T8AX/1USYcw4csAAAAAASUVORK5CYII='
)
ColorMapPresetIcons.set(
  'nic_CubicL',
  'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADwAAAAFCAYAAAAZiY8XAAAApUlEQVQ4T9WTSw6DMAwF59mBXo5TcUOuQ35VQoSKKnXFoiys8UtWT9Zo2dZqFpFFTI0Js71njRxUcCu4CqEzn3mSmBGzxITRc9/V984xAc73tocqvBMc4RXCoBewLKyAZzovOYEnHX/pGG/MQrGiCOwHW6ZxBy3bWu4o/JIIDymc7yj8pAunOwo/6cLxZ2FPBP7A4do8/XB6OPvtsKFYhsPN36vDbya36ax4ixSiAAAAAElFTkSuQmCC'
)
ColorMapPresetIcons.set(
  'Spectral_lowBlue',
  'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADwAAAAFCAYAAAAZiY8XAAAAgElEQVQ4T+WTQQ7EMAgDnf+/qQ8rBryCNFJ3L+05e7AYcwErZCgPIRNIAuFAEMiqDq2eT9/65fKtmJUBLV/MmD0rzi8uL6r7udgmp49WXLpzr8FrLDXH1/rFBtDVck+QAq36Ak9hKI/8t8CxU+AwwB5e2LcJXKfL55PmNoFf/OEPYpjKesZkFyMAAAAASUVORK5CYII='
)
ColorMapPresetIcons.set(
  'Yellow 15',
  'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADwAAAAFCAYAAAAZiY8XAAAAnklEQVQ4T+WTsYoDMQwFx7v//7UXIlmy9YKdJdXBXZdii2GMDYZXTJOGpAfSD6UHYDRsW9WhHGn5Yna0cTQcFtMgDaV/rAwUyduxzfK6i3G9TRQT5aJQCkVRIdSLcOFWm9FhBMxc3zQ8Gz0bcXmdPRq2DVYnVgemA28n1k6cgyaNutvgebfB426D83+DY/fMbw2XQTxR9u81fHX9V8Mv8S3IResi7K8AAAAASUVORK5CYII='
)
ColorMapPresetIcons.set(
  'Asymmtrical Earth Tones (6_21b)',
  'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADwAAAAFCAYAAAAZiY8XAAAAxUlEQVQ4T+WTS27DMAwFxxIp2UqPEeQCuf+lLMof2U0KJWkLdNFVUBTtYvDedvDI7ng6X8OQiOlAS58UNyguKT64Bx2iVzRckACx98TBf2br0ROkIUQVktwZVOhF6N9T/K1HUYJvBNQFfBcfJJw74LoX1mUnZyPnguURG/MtJzOWYsxmzGViKRPzVKhzZVsr21Kpa2Oj1sb+0bvj6Xz5b8Kvf1e43tf9svD+u4UL2Qwbn3fS248Kq6cXJYo8/4enyla//+E3Xh1NOvT2YcEAAAAASUVORK5CYII='
)
ColorMapPresetIcons.set(
  'Green-Blue Asymmetric Divergent (62Blbc)',
  'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADwAAAAFCAYAAAAZiY8XAAAA2klEQVQ4T+WTu1IDMRAEW1pJq/MFFEQmcuQv8P//DhHJPVeSeZUPJwQEEPEIpnrTrp1xh9PxNXWK5sSFqYvEHIldICRBkhDUv98qG/WarJ5ePTt19OrI13TRoyGQJW7UoGhMaIhkEVQCSZTgesTtEN/hfcb5TAi3hHRPkRseamEojcEa1hqlnSmtYdPKOs6s08wyTMzDxDJOlNm21KVQV6OZbaxlpdpCmR9xh9Px5b8JP/9V4WpGW4xaP3746WcJ3xHS/vNKnxs2fr3SxRbqtdLn7wtftiu/asNvehtHVE0BanQAAAAASUVORK5CYII='
)
ColorMapPresetIcons.set(
  'Muted Blue-Green',
  'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADwAAAAFCAYAAAAZiY8XAAAAx0lEQVQ4T92TS27DMAxExxB/QoyeIOfJLvc/RbcSRVl2YbvpOi2KAs3iYUjuBsOZrrf7RmZIrEjEINFzZgURnzcSMAmE+FBlhbIdaiIw2dUwZ8PF8sGc9dxVkIWQJeGihLecMGeAqWKb3lF6gS8NbXS0JRDrglgHYhvwHvBoBzX2+aS1QPNdO7w6SnHU4vCHVofXhvZJj44H0/V2X79lmAVK/9vweMbwnrK+SMLLM4a/XvoFEu7JDPSDDgsr8i91OEaH/0GHPwChV7smZTI6wQAAAABJRU5ErkJggg=='
)
ColorMapPresetIcons.set(
  'BkRd',
  'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADwAAAAFCAYAAAAZiY8XAAAAYUlEQVQ4T8WSOwqAQAxE3+Lq/e+rrjKdCEqSEaySYr4kDTg6MAOalb3C+cuvAcMN7PKz5R0/Fd4dgepXZEte8U5eFd4iAhOwPLx9hP8l5q6lXMoX8VDhNQJ8w7j87LUdvxO00gny7iMvrwAAAABJRU5ErkJggg=='
)
ColorMapPresetIcons.set(
  'BkGn',
  'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADwAAAAFCAYAAAAZiY8XAAAAVUlEQVQ4T2NkYGD4z8DCwMDAysAApslhk6NngOxjZGBg+EeWJ5EdPMQ8/HekefgPUR5mZmBgYMOR7Ac6hkHuArmPCHeAkvRvYhTiVUOERRTbQaUsBACv1wnyhDHKpwAAAABJRU5ErkJggg=='
)
ColorMapPresetIcons.set(
  'BkBu',
  'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADwAAAAFCAYAAAAZiY8XAAAAVUlEQVQ4T2NkYGD4z8DAwsDAwMoAoclhk6NnYOxjZGBg+EeeJ5EdPLQ8/HekefgPcR5mZmBgYMOR7Ac6hkHuArmPsDtASfo3MQrxqyFsEeV2UCcLAQCq3AnypgxRmwAAAABJRU5ErkJggg=='
)
ColorMapPresetIcons.set(
  'Purples',
  'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADwAAAAFCAYAAAAZiY8XAAAAj0lEQVQ4T+VTWwrDMAyT5N3/AP3oeXqnbd2w0oQWCn2MMUY/gm3ZmBhJ7LvhJREKwXGeR9YTvtKPOn8ykoRIUEDLCf8ha2bufs6VmXmOiiWOqd8wA95Rdzn23TBe7eDnJwdHFDaaOg6w/SuGH9sHC7K8l5L/V0nffchN9st5D6fXi//2vsqwAmm44tcve/gNvYMTu+Wg0JMAAAAASUVORK5CYII='
)
ColorMapPresetIcons.set(
  'Oranges',
  'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADwAAAAFCAYAAAAZiY8XAAAAhElEQVQ4T9VT0Q6AIAg81P7KX/SLy2oQFA/W1uaaPTDGIeANjmrJG0IEYoJ4b5Fjh0vsMJ+XejPrp7VnTmttFmk/54n7N3CZy7jkAkBtoxvc3lMtee1LeDo+5EkORrj2JaxbTQmgMTe89CX8csMsC1yn/cVJz4+E+RxNU7/RMGudmjrfASUoE1Iv4qLWAAAAAElFTkSuQmCC'
)
ColorMapPresetIcons.set(
  'PuBu',
  'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADwAAAAFCAYAAAAZiY8XAAAAmUlEQVQ4T+VTQQ7DIAyLk+/3zJP6qXZrFScwtE4TEr1MO1QOxESY2ljKesAgUBUlQmBK5DprR2UvuI6+5odAU2l122NPGs8aP/Ysz9Y57HczP3E4DxD4WUhiX0vcn5zKTVzK+vw3wY9pwfmav/KH9zHBRmveZmkLi32ztNvbrfnOmbX0Nib4muF6oWuGldl65e++DLt4TGT4BCECE6fvwvj3AAAAAElFTkSuQmCC'
)
ColorMapPresetIcons.set(
  'BuPu',
  'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADwAAAAFCAYAAAAZiY8XAAAAhElEQVQ4T+WTSw6AIAxEZ4pH9lKexgP5DS0tkrjDjbqizJuSFBiO03wMJJIQiYDXuhZ9IApn8KtX1Fs91georue23HTjIoyVRLOv3HRmv/Yg6tyTdWNeV7/zYOM0738beOsaOBGCd73wej+wxDf92pdeul64ZLBm2C/qgQx7vku2n8jwCVBxE6z5mXacAAAAAElFTkSuQmCC'
)
ColorMapPresetIcons.set(
  'BuGn',
  'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADwAAAAFCAYAAAAZiY8XAAAAjElEQVQ4T+VTSQqAQAxLOv7a73n0R66kVUcUQVBE8VDSHUoalnU1JA6QFUILX2YH+bkePUQiYbSVP+cyLn2IXs1QhpgTKlbNowmpvcps8j6zqin2TsepttnvM2Vd9X87uNsfDCT2tzBciBkis/8ChttDhvXe2L/611+6ufzSFvrJen5KwwkGhJZPangEi8xdZol1lYAAAAAASUVORK5CYII='
)
ColorMapPresetIcons.set(
  'GnBu',
  'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADwAAAAFCAYAAAAZiY8XAAAAlElEQVQ4T+VTWw6DMAzzo2flZJyEa409lLTAmKYNJDQJTf1w6qQfbmx2Q38vFCxjQcMSTKOsUCgyvJpXfcfoNcz+G67x07xIkITiRA0milrqqFj7yc6INhOI5CsC+nTvhv72b4Kv2wVPG392xPk2PG4XLBQbxvGCHV78kaUvuwR/y7CEkh/ymuHIPpPfm+HM9EEZfgBX1hOn6/4s/AAAAABJRU5ErkJggg=='
)
ColorMapPresetIcons.set(
  'PuRd',
  'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADwAAAAFCAYAAAAZiY8XAAAAfElEQVQ4T+VTyw7AIAhr0f3rfsuv9LBnRBbN5smDS7YDKdRCJA2MczjgCXgBE7qcK+cIVnlTI6YT5N4UysEw11T+phEBUtDQaj741NvQklAtr3farILU2VUd57A3F57sox9ceBvrsBT3X3J4/ZvDy1iHqzvvcbi++Y4bPgEMFROEHSZGdgAAAABJRU5ErkJggg=='
)
ColorMapPresetIcons.set(
  'RdPu',
  'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADwAAAAFCAYAAAAZiY8XAAAAnElEQVQ4T+VTWw7DIAyzDTsq9+NG3T26wUQCVVmlaR/dpGkfKOSBURKbS8q1BqFEwmx4sj1+yEWvpQQGAqLZ2Re4i8Pycx2DoBELjqWOOd8dS+MPwrHYDtya73fDHHHL9Zol5fKy4QtRpeMwfrjh+79t+Pb5DTsdB6UbLbHR9suUvqa8lrM0HJtu9pp+V8PtDdD0PHRrQ5n0fI6GH7KlXmuUkZHCAAAAAElFTkSuQmCC'
)
ColorMapPresetIcons.set(
  'RdOr',
  'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADwAAAAFCAYAAAAZiY8XAAAAjUlEQVQ4T9VT0Q6DMAi8o/3JfpRfbKdLEbRdfJBkW/SBAAchOQ5Yp7IiJeyWE6i5HFhfH2IBpDPyyOk4gT0Wi62PCWgm5i2m9o+Yzhh6LXdcvYA686y24axTWeKEsy3kmYRfccJ+EUa4XYNu9VcK5232lxSuccJ3U9gXcu2k5zjhD4X9j0MKd7/2xx9+A3wmE2GgDJ73AAAAAElFTkSuQmCC'
)
ColorMapPresetIcons.set(
  'BuRd',
  'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADwAAAAFCAYAAAAZiY8XAAAAq0lEQVQ4T+VTMQ7DQAjz9f/vPSmATUVpmg4d0uoydUA2iMWyPeaceUsCDAzFgQoMBiAHwgHWxBvve4Yh3Zp78/2W7pA7aAFZ88LH/rrHY++fg9OLE3Q11mw9YYJTMBYmPHr3SFgIpoQxsRXqQMvEmHPq3wRziWA60q5wuFwV6ITK3QUOxxLBiyJdsY6K9leR5jPa5yLtnwUTo3p7cYdzF/hLh6u7OtthwRK4A4HRK8JPJN7MAAAAAElFTkSuQmCC'
)
ColorMapPresetIcons.set(
  'GnRP',
  'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADwAAAAFCAYAAAAZiY8XAAAApklEQVQ4T+VTQQrDMAxz///fHCrJHYqTtgw2NjrYYAcjWclFyFpaa1tkRCpj09YnO9Zu7rdkhsyZtQ8u62N44qK6TiO0o/VdQ711bXL/7ZyhVZFrYU1xgjVEkMbTDgasayDRd4hBIZbWWv6bYV02rAzBaR5p/2LCGAnzsmGfOTPwDcM+bZ/rPPEXThpPDefo7V2H3e/qrnH29dMJZ+SKtzqMafxBh28D+XLa7dKmVQAAAABJRU5ErkJggg=='
)
ColorMapPresetIcons.set(
  'GYPi',
  'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADwAAAAFCAYAAAAZiY8XAAAAl0lEQVQ4T+VTywoCMRBL//9/rbuTZKSdouhBRPew4CHk0VPopPV+yWYABpoTcKL84PITSqQeGvLMkyM3kgtTV+YQMgQHX3jkhPdC7rrr8uttI7wRug4OuHNCG0EWJJWO5UMIEWGCk1V6cev94n8rrMMLj2vgeX+Yhxc++UnHx4XXlsee328YSI3t/rphze1+v+FA2E8bvgEqfyiJNWxHKwAAAABJRU5ErkJggg=='
)
ColorMapPresetIcons.set(
  'GBBr',
  'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADwAAAAFCAYAAAAZiY8XAAAAmElEQVQ4T+VTyw7DMAhz/v9308PAwERCo3aXrdoOm3ZAfnCywK1vPVoYEARC0RI9+dQxtCIOc9ROgdvD7B4Fpje4FOrE4Q0usLFTcNeFVEJpIB2kFU9d3AJqDmWAxSfmoDwMnh59Yutb938LbNcC58VlXfwXL8xrgfX04iuwCxb/8pfWjwQ+9viVwNnv7O/TDs8ezz6/3+E7c0Y70T8nz20AAAAASUVORK5CYII='
)
ColorMapPresetIcons.set(
  'PRGn',
  'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADwAAAAFCAYAAAAZiY8XAAAAl0lEQVQ4T+WT0WpDMQxDdf//fwM3kuyi3LTbWzsY7WAEcyyRF8XOMcboQo7h9hfbceDW8kNtrr7uXnqCFV7F5kUTMyXi9Fy86wfjpZg7u5cwKTCl0IuTxtzaMkzDqkVtra3rO1VoGvGOMUb9t8D+WOBMlO+fsF4PXHDzWu+frLSJU39npfkscLWht/3hPIx/+Q8bnZQq3ABoeWf/yz5kpwAAAABJRU5ErkJggg=='
)
ColorMapPresetIcons.set(
  'PiYG',
  'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADwAAAAFCAYAAAAZiY8XAAAAiElEQVQ4T92TQQ7DQAgDnf//N6sGGyqzG6mnqD12D2gYxMVCHGOcVUgkiIKQJRSIhGl3H5BZnwwIhPIC8wWWeddyXQjNmdl9M5YHSPezaLZ7TyAFKhFm92YuFsiC2k17Lk4XAeneQ8+OMc7cKrADxnNgbRW4L/0cmFsF/uLC8WvgqgD9z3/4w29mxUtY5qAONAAAAABJRU5ErkJggg=='
)
ColorMapPresetIcons.set(
  'OrPu',
  'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADwAAAAFCAYAAAAZiY8XAAAApUlEQVQ4T+WTwQ7DMAhDnf//33QJNkw06VppmtZqp2oHy0ByseCVpdYoYShugPcP3lDUgVT+mQ41rOL0Qx1sCHY425DN2kavlBFOg1I23NkhdpACGaACor/qbUZhfUs33+u9z3lZ3+mATS9Lrf4vgeVABtadAosBm5s9veHtCmZg3inwLye9bdhOB/bB8c5w9o/rDCv5fWd48Jssf2E42T5we4XhJ6yo2OFpMEgEAAAAAElFTkSuQmCC'
)
ColorMapPresetIcons.set(
  'BrBG',
  'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADwAAAAFCAYAAAAZiY8XAAAAfklEQVQ4T+WTsQ4DMQxCuf//3dzQGOyKXHLt0KHdKmWwHuCJgaOdrVQAK8EqqOrW9s7Dl4saeuSZ6Cl06TNJPEj0dfHyziP8i0miD28GggTfb2YrTxIpYpBE+XQRU5uQvUZmfbSz5W6FtVth7lY4fi/sbV9b/osNx9zvFxt+AsjWWUD6OtYJAAAAAElFTkSuQmCC'
)

function _createForOfIteratorHelper$2(o, allowArrayLike) {
  var it
  if (typeof Symbol === 'undefined' || o[Symbol.iterator] == null) {
    if (
      Array.isArray(o) ||
      (it = _unsupportedIterableToArray$2(o)) ||
      (allowArrayLike && o && typeof o.length === 'number')
    ) {
      if (it) o = it
      var i = 0
      var F = function F() {}
      return {
        s: F,
        n: function n() {
          if (i >= o.length) return { done: true }
          return { done: false, value: o[i++] }
        },
        e: function e(_e) {
          throw _e
        },
        f: F,
      }
    }
    throw new TypeError(
      'Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.'
    )
  }
  var normalCompletion = true,
    didErr = false,
    err
  return {
    s: function s() {
      it = o[Symbol.iterator]()
    },
    n: function n() {
      var step = it.next()
      normalCompletion = step.done
      return step
    },
    e: function e(_e2) {
      didErr = true
      err = _e2
    },
    f: function f() {
      try {
        if (!normalCompletion && it.return != null) it.return()
      } finally {
        if (didErr) throw err
      }
    },
  }
}

function _unsupportedIterableToArray$2(o, minLen) {
  if (!o) return
  if (typeof o === 'string') return _arrayLikeToArray$2(o, minLen)
  var n = Object.prototype.toString.call(o).slice(8, -1)
  if (n === 'Object' && o.constructor) n = o.constructor.name
  if (n === 'Map' || n === 'Set') return Array.from(o)
  if (n === 'Arguments' || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n))
    return _arrayLikeToArray$2(o, minLen)
}

function _arrayLikeToArray$2(arr, len) {
  if (len == null || len > arr.length) len = arr.length
  for (var i = 0, arr2 = new Array(len); i < len; i++) {
    arr2[i] = arr[i]
  }
  return arr2
}

function createColorMapIconSelector(colorMapSelectorDiv) {
  var rows = 20
  var cols = 3
  var iconSelectParameters = {
    selectedIconWidth: 170,
    selectedIconHeight: 22,
    selectedBoxPadding: 1,
    iconsWidth: 60,
    iconsHeight: 22,
    boxIconSpace: 1,
    vectoralIconNumber: cols,
    horizontalIconNumber: rows,
  }
  var iconSelect = new IconSelect(
    ''.concat(colorMapSelectorDiv.id),
    colorMapSelectorDiv,
    iconSelectParameters
  )
  colorMapSelectorDiv.style.width = '174px'
  var icons = new Array(rows * cols)
  var count = 0

  var _iterator = _createForOfIteratorHelper$2(ColorMapPresetIcons.entries()),
    _step

  try {
    for (_iterator.s(); !(_step = _iterator.n()).done; ) {
      var _step$value = _slicedToArray(_step.value, 2),
        key = _step$value[0],
        value = _step$value[1]

      var index = Math.floor(count % rows) * cols + Math.floor(count / rows)
      icons[index] = {
        iconFilePath: value,
        iconValue: key,
      }
      count++
    }
  } catch (err) {
    _iterator.e(err)
  } finally {
    _iterator.f()
  }

  iconSelect.refresh(icons)
  return iconSelect
}

function createColorRangeInput(context, imageUIGroup) {
  var viewerDOMId = context.id
  var colorRangeInputRow = document.createElement('div')
  colorRangeInputRow.setAttribute('class', style.uiRow) // This row needs background different from normal uiRows, to aid
  // in the illusion that it's the content portion of a tabbed pane

  colorRangeInputRow.setAttribute(
    'style',
    'background: rgba(127, 127, 127, 0.5);'
  )
  context.images.colorRangeInputRow = colorRangeInputRow
  createInterpolationButton(context, colorRangeInputRow)
  var minimumInput = document.createElement('input')
  minimumInput.type = 'number'
  minimumInput.setAttribute('class', style.numberInput)
  var maximumInput = document.createElement('input')
  maximumInput.type = 'number'
  maximumInput.setAttribute('class', style.numberInput)
  minimumInput.addEventListener('change', function(event) {
    event.preventDefault()
    event.stopPropagation()
    var name = context.images.selectedName
    var actorContext = context.images.actorContext.get(name)
    var currentRange = actorContext.colorRanges.get(
      actorContext.selectedComponent
    )
    var newRange = [Number(event.target.value), currentRange[1]]
    context.service.send({
      type: 'IMAGE_COLOR_RANGE_CHANGED',
      data: {
        name: name,
        component: actorContext.selectedComponent,
        range: newRange,
      },
    })
  })
  maximumInput.addEventListener('change', function(event) {
    event.preventDefault()
    event.stopPropagation()
    var name = context.images.selectedName
    var actorContext = context.images.actorContext.get(name)
    var currentRange = actorContext.colorRanges.get(
      actorContext.selectedComponent
    )
    var newRange = [currentRange[0], Number(event.target.value)]
    context.service.send({
      type: 'IMAGE_COLOR_RANGE_CHANGED',
      data: {
        name: name,
        component: actorContext.selectedComponent,
        range: newRange,
      },
    })
  })
  var colorMapSelector = document.createElement('div')
  colorMapSelector.id = ''.concat(viewerDOMId, '-imageColorMapSelector')
  colorRangeInputRow.appendChild(minimumInput)
  colorRangeInputRow.appendChild(colorMapSelector)
  colorRangeInputRow.appendChild(maximumInput)
  var iconSelector = createColorMapIconSelector(colorMapSelector)
  context.images.iconSelector = iconSelector
  colorMapSelector.addEventListener('changed', function(event) {
    event.preventDefault()
    event.stopPropagation()
    var name = context.images.selectedName
    var actorContext = context.images.actorContext.get(name)
    var componentIndex = actorContext.selectedComponent
    var colorMap = iconSelector.getSelectedValue()
    context.service.send({
      type: 'IMAGE_COLOR_MAP_SELECTED',
      data: {
        name: name,
        component: componentIndex,
        colorMap: colorMap,
      },
    })
  })
  context.images.colorMapSelector = colorMapSelector
  imageUIGroup.appendChild(colorRangeInputRow)
}

// vtkCompositeMouseManipulator methods
// ----------------------------------------------------------------------------

function vtkCompositeMouseManipulator(publicAPI, model) {
  // Set our className
  model.classHierarchy.push('vtkCompositeMouseManipulator')

  publicAPI.startInteraction = function() {}

  publicAPI.endInteraction = function() {}

  publicAPI.onButtonDown = function(interactor, renderer, position) {}

  publicAPI.onButtonUp = function(interactor) {}

  publicAPI.onMouseMove = function(interactor, renderer, position) {}

  publicAPI.onStartScroll = function(interactor, renderer, delta) {}

  publicAPI.onScroll = function(interactor, renderer, delta) {}

  publicAPI.onEndScroll = function(interactor) {}

  publicAPI.isDragEnabled = function() {
    return model.dragEnabled
  }

  publicAPI.isScrollEnabled = function() {
    return model.scrollEnabled
  }
} // ----------------------------------------------------------------------------
// Object factory
// ----------------------------------------------------------------------------

var DEFAULT_VALUES$1 = {
  button: 1,
  shift: false,
  control: false,
  alt: false,
  dragEnabled: true,
  scrollEnabled: false,
} // ----------------------------------------------------------------------------

function extend$1(publicAPI, model) {
  var initialValues =
    arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {}
  Object.assign(model, DEFAULT_VALUES$1, initialValues) // Create get-set macros

  macro.setGet(publicAPI, model, ['button', 'shift', 'control', 'alt'])
  macro.set(publicAPI, model, ['dragEnabled', 'scrollEnabled']) // Object specific methods

  vtkCompositeMouseManipulator(publicAPI, model)
} // ----------------------------------------------------------------------------

var vtkCompositeMouseManipulator$1 = {
  extend: extend$1,
}

// vtkMouseRangeManipulator methods
// ----------------------------------------------------------------------------

function vtkMouseRangeManipulator(publicAPI, model) {
  // Set our className
  model.classHierarchy.push('vtkMouseRangeManipulator') // Keep track of delta that is below the value
  // of one step to progressively increment it

  var incrementalDelta = new Map() // Internal methods
  //-------------------------------------------------------------------------

  function scaleDeltaToRange(listener, normalizedDelta) {
    return (
      normalizedDelta * ((listener.max - listener.min) / (listener.step + 1))
    )
  } //-------------------------------------------------------------------------

  function processDelta(listener, delta) {
    var oldValue = listener.getValue() // if exponential scroll is enabled, we raise our scale to the
    //  exponent of the net delta of the interaction. The further away
    // the user's cursor is from the start of the interaction, the more
    // their movements will effect the value.

    var scalingFactor = listener.exponentialScroll
      ? Math.pow(
          listener.scale,
          Math.log2(Math.abs(model.interactionNetDelta) + 2)
        )
      : listener.scale
    var newDelta = delta * scalingFactor + incrementalDelta.get(listener)
    var value = oldValue + newDelta // Compute new value based on step

    var difference = value - listener.min
    var stepsToDifference = Math.round(difference / listener.step)
    value = listener.min + listener.step * stepsToDifference
    value = Math.max(value, listener.min)
    value = Math.min(value, listener.max)

    if (value !== oldValue) {
      // Update value
      listener.setValue(value)
      incrementalDelta.set(listener, 0)
    } else if (
      (value === listener.min && newDelta < 0) ||
      (value === listener.max && newDelta > 0)
    ) {
      // Do not allow incremental delta to go past range
      incrementalDelta.set(listener, 0)
    } else {
      // Store delta for the next iteration
      incrementalDelta.set(listener, newDelta)
    }
  } // Public API methods
  // min:number = minimum allowable value
  // max:number = maximum allowable value
  // step:number = value per step -- smaller = more steps over a given distance, larger = fewer steps over a given distance
  // getValue:fn = function that returns current value
  // setValue:fn = function to set value
  // scale:number = scale value is applied to mouse event to allow users accelerate or decelerate delta without emitting more events
  //-------------------------------------------------------------------------

  publicAPI.setHorizontalListener = function(
    min,
    max,
    step,
    getValue,
    setValue
  ) {
    var scale =
      arguments.length > 5 && arguments[5] !== undefined ? arguments[5] : 1
    var exponentialScroll =
      arguments.length > 6 && arguments[6] !== undefined ? arguments[6] : false
    var getFn = Number.isFinite(getValue)
      ? function() {
          return getValue
        }
      : getValue
    model.horizontalListener = {
      min: min,
      max: max,
      step: step,
      getValue: getFn,
      setValue: setValue,
      scale: scale,
      exponentialScroll: exponentialScroll,
    }
    incrementalDelta.set(model.horizontalListener, 0)
    publicAPI.modified()
  } //-------------------------------------------------------------------------

  publicAPI.setVerticalListener = function(min, max, step, getValue, setValue) {
    var scale =
      arguments.length > 5 && arguments[5] !== undefined ? arguments[5] : 1
    var exponentialScroll =
      arguments.length > 6 && arguments[6] !== undefined ? arguments[6] : false
    var getFn = Number.isFinite(getValue)
      ? function() {
          return getValue
        }
      : getValue
    model.verticalListener = {
      min: min,
      max: max,
      step: step,
      getValue: getFn,
      setValue: setValue,
      scale: scale,
      exponentialScroll: exponentialScroll,
    }
    incrementalDelta.set(model.verticalListener, 0)
    publicAPI.modified()
  } //-------------------------------------------------------------------------

  publicAPI.setScrollListener = function(min, max, step, getValue, setValue) {
    var scale =
      arguments.length > 5 && arguments[5] !== undefined ? arguments[5] : 1
    var exponentialScroll =
      arguments.length > 6 && arguments[6] !== undefined ? arguments[6] : false
    var getFn = Number.isFinite(getValue)
      ? function() {
          return getValue
        }
      : getValue
    model.scrollListener = {
      min: min,
      max: max,
      step: step,
      getValue: getFn,
      setValue: setValue,
      scale: scale,
      exponentialScroll: exponentialScroll,
    }
    incrementalDelta.set(model.scrollListener, 0)
    publicAPI.modified()
  } //-------------------------------------------------------------------------

  publicAPI.removeHorizontalListener = function() {
    if (model.verticalListener) {
      incrementalDelta.delete(model.verticalListener)
      delete model.verticalListener
      publicAPI.modified()
    }
  } //-------------------------------------------------------------------------

  publicAPI.removeVerticalListener = function() {
    if (model.horizontalListener) {
      incrementalDelta.delete(model.horizontalListener)
      delete model.horizontalListener
      publicAPI.modified()
    }
  } //-------------------------------------------------------------------------

  publicAPI.removeScrollListener = function() {
    if (model.scrollListener) {
      incrementalDelta.delete(model.scrollListener)
      delete model.scrollListener
      publicAPI.modified()
    }
  } //-------------------------------------------------------------------------

  publicAPI.removeAllListeners = function() {
    publicAPI.removeHorizontalListener()
    publicAPI.removeVerticalListener()
    publicAPI.removeScrollListener()
  } //-------------------------------------------------------------------------

  publicAPI.onButtonDown = function(interactor, renderer, position) {
    model.previousPosition = position
    model.interactionNetDelta = 0
    var glRenderWindow = interactor.getView() // Ratio is the dom size vs renderwindow size

    var ratio =
      glRenderWindow.getContainerSize()[0] / glRenderWindow.getSize()[0] // Get proper pixel range used by viewport in rw size space

    var size = glRenderWindow.getViewportSize(renderer) // rescale size to match mouse event position

    model.containerSize = size.map(function(v) {
      return v * ratio
    })
  }

  publicAPI.onButtonUp = function(interactor) {
    interactor.exitPointerLock()
  } //--------------------------------------------------------------------------
  // TODO: at some point, this should perhaps be done in
  // RenderWindowInteractor instead of here.
  // We need to hook into mousemove directly for two reasons:
  // 1. We need to keep receiving mouse move events after the mouse button
  //    is released. This is currently not possible with
  //    vtkInteractorStyleManipulator.
  // 2. Since the mouse is stationary in pointer lock mode, we need the
  //    event.movementX and event.movementY info, which are not currently
  //    passed via interactor.onMouseMove.

  publicAPI.startPointerLockEvent = function(interactor, renderer) {
    var handlePointerLockMove = function handlePointerLockMove(event) {
      publicAPI.onPointerLockMove(interactor, renderer, event)
    }

    document.addEventListener('mousemove', handlePointerLockMove)
    var subscription = null

    var endInteraction = function endInteraction() {
      var _subscription

      document.removeEventListener('mousemove', handlePointerLockMove)
      ;(_subscription = subscription) === null || _subscription === void 0
        ? void 0
        : _subscription.unsubscribe()
    }

    subscription =
      interactor === null || interactor === void 0
        ? void 0
        : interactor.onEndPointerLock(endInteraction)
  }

  publicAPI.onPointerLockMove = function(interactor, renderer, event) {
    // There is a slight delay between the `onEndPointerLock` call
    // and the last `onMouseMove` event, we must make sure the pointer
    // is still locked before we run this logic otherwise we may
    // get a `onMouseMove` call after the pointer has been unlocked.
    if (!interactor.isPointerLocked()) return // previousPosition could be undefined if for some reason the
    // `startPointerLockEvent` method is called before the `onButtonDown` one.

    if (model.previousPosition == null) return
    model.previousPosition.x += event.movementX
    model.previousPosition.y += event.movementY
    publicAPI.onMouseMove(interactor, renderer, model.previousPosition)
  } //-------------------------------------------------------------------------

  publicAPI.onMouseMove = function(interactor, renderer, position) {
    if (!model.verticalListener && !model.horizontalListener) {
      return
    } // We only want to initialize the pointer lock listener
    // after the user starts moving their mouse, this way
    // we don't interfere with other events such as doubleClick,
    // for this reason we don't call this from `onButtonDown`

    if (model.usePointerLock && !interactor.isPointerLocked()) {
      interactor.requestPointerLock()
      publicAPI.startPointerLockEvent(interactor, renderer)
    }

    if (!position) {
      return
    }

    if (model.horizontalListener) {
      var dxNorm =
        (position.x - model.previousPosition.x) / model.containerSize[0]
      var dx = scaleDeltaToRange(model.horizontalListener, dxNorm)
      model.interactionNetDelta += dx
      processDelta(model.horizontalListener, dx)
    }

    if (model.verticalListener) {
      var dyNorm =
        (position.y - model.previousPosition.y) / model.containerSize[1]
      var dy = scaleDeltaToRange(model.verticalListener, dyNorm)
      model.interactionNetDelta += dy
      processDelta(model.verticalListener, dy)
    }

    model.previousPosition = position
  } //-------------------------------------------------------------------------

  publicAPI.onScroll = function(interactor, renderer, delta) {
    if (!model.scrollListener || !delta) {
      return
    }

    model.interactionNetDelta += delta * model.scrollListener.step
    processDelta(model.scrollListener, delta * model.scrollListener.step)
  }

  publicAPI.onStartScroll = function(payload) {
    model.interactionNetDelta = 0
    publicAPI.onScroll(payload)
  }
} // ----------------------------------------------------------------------------
// Object factory
// ----------------------------------------------------------------------------

var DEFAULT_VALUES = {
  horizontalListener: null,
  verticalListener: null,
  scrollListener: null,
} // ----------------------------------------------------------------------------

function extend(publicAPI, model) {
  var initialValues =
    arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {}
  Object.assign(model, DEFAULT_VALUES, initialValues) // Inheritance

  macro.obj(publicAPI, model)
  vtkCompositeMouseManipulator$1.extend(publicAPI, model, initialValues) // Create get-set macros

  macro.setGet(publicAPI, model, ['usePointerLock']) // Object specific methods

  vtkMouseRangeManipulator(publicAPI, model)
} // ----------------------------------------------------------------------------

var newInstance = macro.newInstance(extend, 'vtkMouseRangeManipulator') // ----------------------------------------------------------------------------

var vtkMouseRangeManipulator$1 = {
  newInstance: newInstance,
  extend: extend,
}

var __defProp = Object.defineProperty
var __defNormalProp = (obj, key, value) =>
  key in obj
    ? __defProp(obj, key, {
        enumerable: true,
        configurable: true,
        writable: true,
        value,
      })
    : (obj[key] = value)
var __publicField = (obj, key, value) => {
  __defNormalProp(obj, typeof key !== 'symbol' ? key + '' : key, value)
  return value
}
const PADDING = 10
const makeSvg = () => {
  const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg')
  svg.setAttribute(
    'style',
    'position: absolute; top: 0; left: 0; z-index: 2; box-sizing: border-box; width: 100%; height: 100%;'
  )
  return svg
}
const Container = parent => {
  const root = document.createElement('div')
  root.setAttribute('style', 'position: relative; width: 100%; height: 100%')
  parent.appendChild(root)
  const svg = makeSvg()
  root.appendChild(svg)
  const sizeEmitter = new EventTarget()
  const addSizeObserver = cb => {
    sizeEmitter.addEventListener('sizeupdated', cb)
  }
  const resizeObserver = new ResizeObserver(() => {
    sizeEmitter.dispatchEvent(new Event('sizeupdated'))
  })
  resizeObserver.observe(root)
  const paddedBorder = document.createElementNS(
    'http://www.w3.org/2000/svg',
    'rect'
  )
  svg.appendChild(paddedBorder)
  paddedBorder.setAttribute('fill', 'none')
  paddedBorder.setAttribute('stroke', 'black')
  const appendChild = shape => {
    svg.appendChild(shape)
  }
  const removeChild = shape => {
    svg.removeChild(shape)
  }
  let viewBox = [0, 1, 0, 1]
  const getViewBox = () => viewBox
  const setViewBox = (valueStart, valueEnd, opacityMin = 0, opacityMax = 1) => {
    viewBox = [valueStart, valueEnd, opacityMin, opacityMax]
    sizeEmitter.dispatchEvent(new Event('sizeupdated'))
  }
  const getSize = () => {
    const { top, left, width, height } = root.getBoundingClientRect()
    return {
      width: width - 2 * PADDING,
      height: height - 2 * PADDING,
      top: top + PADDING,
      left: left + PADDING,
    }
  }
  const domToNormalized = (x, y) => {
    const { top, left, width, height } = getSize()
    const valueRange = viewBox[1] - viewBox[0]
    const opacityRange = viewBox[3] - viewBox[2]
    return [
      ((x - left) / width) * valueRange + viewBox[0],
      (1 - (y - top) / height) * opacityRange + viewBox[2],
    ]
  }
  const normalizedToSvg = (x, y) => {
    const { width, height } = getSize()
    const valueRange = viewBox[1] - viewBox[0]
    const xSvg = ((x - viewBox[0]) / valueRange) * width + PADDING
    const opacityRange = viewBox[3] - viewBox[2]
    const ySvg = (1 - (y - viewBox[2]) / opacityRange) * height + PADDING
    return [xSvg, ySvg]
  }
  const borderSize = () => {
    const [left, bottom] = normalizedToSvg(0, 0)
    const [right, top] = normalizedToSvg(1, 1)
    return { left, bottom, right, top }
  }
  const updateBorder = () => {
    const { left, bottom, right, top } = borderSize()
    paddedBorder.setAttribute('x', `${left}`)
    paddedBorder.setAttribute('y', `${top}`)
    paddedBorder.setAttribute('width', `${Math.max(0, right - left)}`)
    paddedBorder.setAttribute('height', `${Math.max(0, bottom - top)}`)
  }
  addSizeObserver(updateBorder)
  const remove = () => parent.removeChild(root)
  return {
    appendChild,
    removeChild,
    addSizeObserver,
    getViewBox,
    setViewBox,
    domToNormalized,
    normalizedToSvg,
    borderSize,
    remove,
    root,
  }
}
const CONTROL_POINT_CLASS = 'controlPoint'
const makeCircle = () => {
  const circle = document.createElementNS(
    'http://www.w3.org/2000/svg',
    'circle'
  )
  circle.setAttribute('r', '9')
  circle.setAttribute('fill', 'white')
  circle.setAttribute('stroke', 'black')
  circle.setAttribute('stroke-width', '2')
  circle.setAttribute('class', CONTROL_POINT_CLASS)
  circle.setAttribute('style', 'cursor: move;')
  return circle
}
class ControlPoint {
  constructor(
    container,
    point,
    deleteEventCallback,
    isNewPointFromPointer = false
  ) {
    __publicField(this, 'element')
    __publicField(this, 'container')
    __publicField(this, 'isDragging', false)
    __publicField(this, 'isHovered', false)
    __publicField(this, 'point')
    __publicField(this, 'DELETE_EVENT', 'deleteme')
    __publicField(this, 'eventTarget', new EventTarget())
    this.element = makeCircle()
    this.point = point
    this.container = container
    container.addSizeObserver(() => {
      this.positionElement()
    })
    if (deleteEventCallback) {
      this.eventTarget.addEventListener(this.DELETE_EVENT, e => {
        deleteEventCallback(e)
      })
    }
    container.appendChild(this.element)
    this.positionElement()
    this.setupInteraction()
    if (isNewPointFromPointer) this.startInteraction(true)
  }
  remove() {
    this.container.removeChild(this.element)
  }
  positionElement() {
    const { x, y } = this.point
    const [xSvg, ySvg] = this.container.normalizedToSvg(x, y)
    this.element.setAttribute('cx', String(xSvg))
    this.element.setAttribute('cy', String(ySvg))
  }
  movePoint(e) {
    const [x, y] = this.container.domToNormalized(e.clientX, e.clientY)
    this.point.setPosition(x, y)
    this.positionElement()
  }
  startInteraction(forceDragging = false) {
    this.isDragging = forceDragging
    if (!this.isDragging) {
      this.element.setAttribute('stroke', 'red')
    }
    const onPointerMove = e => {
      this.isDragging = true
      this.element.setAttribute('stroke', 'black')
      this.movePoint(e)
    }
    document.addEventListener('pointermove', onPointerMove)
    const onPointerUp = () => {
      document.removeEventListener('pointermove', onPointerMove)
      document.removeEventListener('pointerup', onPointerUp)
      if (!this.isDragging) {
        const delEvent = new CustomEvent(this.DELETE_EVENT, { detail: this })
        this.eventTarget.dispatchEvent(delEvent)
      }
      if (!this.isHovered) this.element.setAttribute('stroke-width', '2')
      this.isDragging = false
    }
    document.addEventListener('pointerup', onPointerUp)
  }
  setupInteraction() {
    this.element.addEventListener('pointerdown', event => {
      event.stopPropagation()
      event.preventDefault()
      this.startInteraction()
    })
    this.element.addEventListener('pointerenter', () => {
      this.isHovered = true
      this.element.setAttribute('stroke-width', '4')
    })
    this.element.addEventListener('pointerleave', () => {
      this.isHovered = false
      if (!this.isDragging) {
        this.element.setAttribute('stroke-width', '2')
      }
    })
  }
}
class PointsController {
  constructor(container, points) {
    __publicField(this, 'container')
    __publicField(this, 'points')
    __publicField(this, 'onPointsUpdated')
    __publicField(this, 'controlPoints', [])
    __publicField(this, 'isNewPointFromPointer', false)
    this.container = container
    this.points = points
    const { root } = container
    root.addEventListener('pointerdown', e => this.onPointerDown(e))
    this.onPointsUpdated = () => this.updatePoints()
    this.points.eventTarget.addEventListener('updated', this.onPointsUpdated)
    this.updatePoints()
  }
  remove() {
    this.points.eventTarget.removeEventListener('updated', this.onPointsUpdated)
  }
  onPointerDown(event) {
    event.preventDefault()
    const [x, y] = this.container.domToNormalized(event.clientX, event.clientY)
    this.isNewPointFromPointer = true
    this.points.addPoint(x, y)
    this.isNewPointFromPointer = false
  }
  onControlPointDelete(event) {
    this.points.removePoint(event.detail.point)
  }
  updatePoints() {
    const orphans = this.controlPoints.filter(
      cp => !this.points.points.find(point => point === cp.point)
    )
    orphans.forEach(cp => cp.remove())
    this.controlPoints = this.controlPoints.filter(cp => !orphans.includes(cp))
    const isPointInControlPoints = point =>
      this.controlPoints.find(cp => cp.point === point)
    const addNewControlPoint = point =>
      this.controlPoints.push(
        new ControlPoint(
          this.container,
          point,
          e => this.onControlPointDelete(e),
          this.isNewPointFromPointer
        )
      )
    this.points.points
      .filter(pointModel => !isPointInControlPoints(pointModel))
      .forEach(addNewControlPoint)
  }
}
const clamp0to1 = x => Math.max(0, Math.min(1, x))
class Point {
  constructor(x, y) {
    __publicField(this, '_x')
    __publicField(this, '_y')
    __publicField(this, 'eventTarget', new EventTarget())
    this.x = x
    this.y = y
  }
  get x() {
    return this._x
  }
  set x(newX) {
    this._x = clamp0to1(newX)
    this.dispatchUpdatedEvent()
  }
  get y() {
    return this._y
  }
  set y(newY) {
    this._y = clamp0to1(newY)
    this.dispatchUpdatedEvent()
  }
  setPosition(x, y) {
    this.x = x
    this.y = y
    this.dispatchUpdatedEvent()
  }
  dispatchUpdatedEvent() {
    this.eventTarget.dispatchEvent(
      new CustomEvent('updated', { detail: [this.x, this.y] })
    )
  }
}
const windowPoints = points => {
  if (points.length === 0) {
    return [
      [0, 1],
      [1, 1],
    ]
  }
  if (points.length === 1) {
    const [, y] = points[0]
    return [
      [0, y],
      [1, y],
    ]
  }
  const head = points[0]
  const tail = points[points.length - 1]
  return [[head[0], 0], ...points, [tail[0], 0]]
}
const pointsToWindowedPoints = points =>
  windowPoints(points.map(({ x, y }) => [x, y]))
class Points {
  constructor() {
    __publicField(this, '_points', [])
    __publicField(this, 'eventTarget', new EventTarget())
  }
  get points() {
    return [...this._points]
  }
  addPoint(x, y) {
    const pointToAdd = this.createPoint(x, y)
    this.dispatchUpdatedEvent()
    return pointToAdd
  }
  addPoints(points) {
    const pointsMade = points.map(([x, y]) => this.createPoint(x, y))
    return pointsMade
  }
  setPoints(points) {
    ;[...this._points].forEach(point => this.deletePoint(point))
    return this.addPoints(points)
  }
  removePoint(point) {
    this.deletePoint(point)
    this.dispatchUpdatedEvent()
  }
  dispatchUpdatedEvent() {
    this.eventTarget.dispatchEvent(
      new CustomEvent('updated', { detail: this._points })
    )
  }
  createPoint(x, y) {
    const pointToAdd = new Point(x, y)
    pointToAdd.eventTarget.addEventListener('updated', () => {
      this._points.sort((a, b) => a.x - b.x)
      this.dispatchUpdatedEvent()
    })
    this._points.push(pointToAdd)
    this._points.sort((a, b) => a.x - b.x)
    return pointToAdd
  }
  deletePoint(point) {
    this._points = this._points.filter(p => p !== point)
  }
}
const createLine = () => {
  const line = document.createElementNS(
    'http://www.w3.org/2000/svg',
    'polyline'
  )
  line.setAttribute('fill', 'none')
  line.setAttribute('stroke', 'black')
  line.setAttribute('stroke-width', '2')
  return line
}
class Line {
  constructor(container, points) {
    __publicField(this, 'points')
    __publicField(this, 'container')
    __publicField(this, 'onPointsUpdated')
    __publicField(this, 'element')
    this.container = container
    this.points = points
    this.element = createLine()
    this.container.appendChild(this.element)
    this.onPointsUpdated = () => this.update()
    this.points.eventTarget.addEventListener('updated', this.onPointsUpdated)
    this.container.addSizeObserver(() => {
      this.update()
    })
    this.update()
  }
  remove() {
    this.points.eventTarget.removeEventListener('updated', this.onPointsUpdated)
  }
  update() {
    if (this.points.points.length === 0) {
      this.element.setAttribute('points', '')
      return
    }
    const stringPoints = pointsToWindowedPoints(this.points.points)
      .map(([x, y]) => this.container.normalizedToSvg(x, y))
      .map(([x, y]) => `${x},${y}`)
      .join(' ')
    this.element.setAttribute('points', stringPoints)
  }
}
const SCALE_SENSITIVITY = 1.1
const WheelZoom = container => {
  container.root.addEventListener('wheel', e => {
    e.preventDefault()
    e.stopPropagation()
    const scaleFactor = e.deltaY > 0 ? SCALE_SENSITIVITY : 1 / SCALE_SENSITIVITY
    const [targetX, targetY] = container.domToNormalized(e.clientX, e.clientY)
    const [left, right, bottom, top] = container.getViewBox()
    const newLeft = Math.max(
      0,
      left - Math.max(0, targetX - left) * (scaleFactor - 1)
    )
    const newRight = Math.min(1, (right - left) * scaleFactor + newLeft)
    const newBottom = Math.max(
      0,
      bottom - Math.max(0, targetY - bottom) * (scaleFactor - 1)
    )
    const newTop = Math.min(1, (top - bottom) * scaleFactor + newBottom)
    container.setViewBox(newLeft, newRight, newBottom, newTop)
  })
}
const drawChart = (
  ctx,
  area,
  values,
  style = {
    lineWidth: 1,
    strokeStyle: '#000',
    fillStyle: void 0,
    clip: false,
  }
) => {
  const verticalScale = area[3]
  const horizontalScale = area[2] / (values.length - 1)
  const offset = verticalScale + area[1]
  ctx.lineWidth = style.lineWidth
  ctx.strokeStyle = style.strokeStyle
  ctx.beginPath()
  ctx.moveTo(area[0], area[1] + area[3])
  for (let index = 0; index < values.length; index++) {
    ctx.lineTo(
      area[0] + index * horizontalScale,
      Math.max(area[1], offset - values[index] * verticalScale)
    )
  }
  if (style.fillStyle) {
    ctx.fillStyle = style.fillStyle
    ctx.lineTo(area[0] + area[2], area[1] + area[3])
    if (style.clip) {
      ctx.clip()
      return
    }
    ctx.fill()
  }
  ctx.stroke()
}
const CANVAS_HEIGHT = 1
const updateColorCanvas = (
  colorTransferFunction,
  width,
  renderedDataRange,
  canvas
) => {
  const workCanvas = canvas || document.createElement('canvas')
  workCanvas.setAttribute('width', String(width))
  workCanvas.setAttribute('height', String(CANVAS_HEIGHT))
  const rgba = colorTransferFunction.getUint8Table(
    renderedDataRange[0],
    renderedDataRange[1],
    width,
    true
  )
  const ctx = workCanvas.getContext('2d')
  if (ctx) {
    const pixelsArea = ctx.getImageData(0, 0, width, CANVAS_HEIGHT)
    for (let lineIdx = 0; lineIdx < CANVAS_HEIGHT; lineIdx++) {
      pixelsArea.data.set(rgba, lineIdx * 4 * width)
    }
    const nbValues = CANVAS_HEIGHT * width * 4
    for (let i = 3; i < nbValues; i += 4) {
      pixelsArea.data[i] = 255
    }
    ctx.putImageData(pixelsArea, 0, 0)
  }
  return workCanvas
}
const windowPointsForSort = points => {
  const windowedPoints = windowPoints(points)
  windowedPoints[0][0] -= 1e-8
  windowedPoints[windowedPoints.length - 1][0] += 1e-8
  return windowedPoints
}
const HISTOGRAM_COLOR = 'rgba(50, 50, 50, 0.3)'
const Background = (container, points) => {
  const canvas = document.createElement('canvas')
  container.root.appendChild(canvas)
  canvas.setAttribute('style', 'width: 100%; height: 100%; ')
  const ctx = canvas.getContext('2d')
  let colorTransferFunction
  let histogram
  const colorCanvas = document.createElement('canvas')
  const render = () => {
    if (!ctx) return
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    if (colorTransferFunction) {
      const { width, height } = container.root.getBoundingClientRect()
      canvas.setAttribute('width', String(width))
      canvas.setAttribute('height', String(height))
      const { left, right, bottom, top } = container.borderSize()
      const borderWidth = Math.ceil(right - left)
      if (borderWidth < 0) return
      const windowed = pointsToWindowedPoints(points.points)
      const linePoints = [[0, 0], ...windowed, [1, 0]].map(([x, y]) =>
        container.normalizedToSvg(x, y)
      )
      ctx.save()
      ctx.beginPath()
      linePoints.forEach(([x, y]) => {
        ctx.lineTo(x, y)
      })
      ctx.clip()
      const [headX] = linePoints[1]
      const [tailX] = linePoints[linePoints.length - 2]
      const headXClamped = Math.min(width, Math.max(0, headX))
      const tailXClamped = Math.min(width, Math.max(0, tailX))
      const colorCanvasWidth = Math.ceil(tailXClamped - headXClamped)
      if (colorCanvasWidth) {
        const pointPixelWidth = tailX - headX
        const headClampAmount = (headXClamped - headX) / pointPixelWidth
        const tailClampAmount = (tailXClamped - tailX) / pointPixelWidth
        const dataRange = colorTransferFunction.getMappingRange()
        const dataWidth = dataRange[1] - dataRange[0]
        const visibleDataRange = [
          dataRange[0] + dataWidth * headClampAmount,
          dataRange[1] + dataWidth * tailClampAmount,
        ]
        updateColorCanvas(
          colorTransferFunction,
          colorCanvasWidth,
          visibleDataRange,
          colorCanvas
        )
        ctx.drawImage(
          colorCanvas,
          0,
          0,
          colorCanvas.width,
          colorCanvas.height,
          Math.floor(headXClamped),
          Math.floor(top),
          colorCanvasWidth,
          Math.ceil(bottom - top)
        )
      }
      ctx.restore()
    }
    if (histogram) {
      const { left, right, bottom, top } = container.borderSize()
      const graphArea = [left, top, right - left, bottom - top]
      drawChart(ctx, graphArea, histogram, {
        lineWidth: 1,
        strokeStyle: HISTOGRAM_COLOR,
        fillStyle: HISTOGRAM_COLOR,
      })
    }
  }
  container.addSizeObserver(render)
  points.eventTarget.addEventListener('updated', render)
  const setColorTransferFunction = ctf => {
    colorTransferFunction = ctf
    render()
  }
  const setHistogram = newHistogram => {
    histogram = newHistogram
    render()
  }
  return {
    container,
    canvas,
    setColorTransferFunction,
    setHistogram,
    render,
    remove: () => container.root.removeChild(canvas),
  }
}
class TransferFunctionEditor {
  constructor(root) {
    __publicField(this, 'points')
    __publicField(this, 'line')
    __publicField(this, 'pointController')
    __publicField(this, 'container')
    __publicField(this, 'background')
    this.container = Container(root)
    WheelZoom(this.container)
    this.points = new Points()
    const startPoints = [
      [0, 0],
      [1, 1],
    ]
    this.points.setPoints(startPoints)
    this.background = Background(this.container, this.points)
    this.line = new Line(this.container, this.points)
    this.pointController = new PointsController(this.container, this.points)
  }
  remove() {
    this.background.remove()
    this.container.remove()
  }
  getPoints() {
    return this.points.points.map(({ x, y }) => [x, y])
  }
  setPoints(points) {
    this.points.setPoints(points)
    this.pointController.updatePoints()
    this.line.update()
    this.background.render()
  }
  get eventTarget() {
    return this.points.eventTarget
  }
  setViewBox(valueStart, valueEnd, opacityMin = 0, opacityMax = 1) {
    this.container.setViewBox(valueStart, valueEnd, opacityMin, opacityMax)
  }
  setColorTransferFunction(ctf) {
    this.background.setColorTransferFunction(ctf)
  }
  setHistogram(histogram) {
    this.background.setHistogram(histogram)
  }
}

var PIECEWISE_UPDATE_DELAY = 100
var getNodes = function getNodes(range, points) {
  var delta = range[1] - range[0]
  var windowedPoints = windowPointsForSort(points)
  return windowedPoints.map(function(_ref) {
    var _ref2 = _slicedToArray(_ref, 2),
      x = _ref2[0],
      y = _ref2[1]

    return {
      x: range[0] + delta * x,
      y: y,
      midpoint: 0.5,
      sharpness: 0,
    }
  })
} // grab head and tail or fallback to data range if 1 or less points

var getRange = function getRange(dataRange, nodes) {
  return nodes.length > 1 ? [nodes[0].x, nodes[nodes.length - 1].x] : dataRange
}

var updateContextPiecewiseFunction = function updateContextPiecewiseFunction(
  context,
  dataRange,
  points
) {
  if (!context.images.piecewiseFunctions) return // not ready yet

  var name = context.images.selectedName
  var actorContext = context.images.actorContext.get(name)
  var component = actorContext.selectedComponent
  context.service.send({
    type: 'IMAGE_PIECEWISE_FUNCTION_POINTS_CHANGED',
    data: {
      name: name,
      component: component,
      points: points,
    },
  })
  var nodes = getNodes(dataRange, points)
  var range = getRange(dataRange, nodes)
  context.service.send({
    type: 'IMAGE_PIECEWISE_FUNCTION_CHANGED',
    data: {
      name: name,
      component: component,
      range: range,
      nodes: nodes,
    },
  })
}

var vtkPiecewiseGaussianWidgetFacade = function vtkPiecewiseGaussianWidgetFacade(
  tfEditor,
  context
) {
  var dataRange = [0, 255]

  var update = function update() {
    return updateContextPiecewiseFunction(
      context,
      dataRange,
      tfEditor.getPoints()
    )
  }

  var throttledUpdate = throttle(update, PIECEWISE_UPDATE_DELAY)
  tfEditor.eventTarget.addEventListener('updated', throttledUpdate)

  var getOpacityNodes = function getOpacityNodes() {
    var range =
      arguments.length > 0 && arguments[0] !== undefined
        ? arguments[0]
        : dataRange
    return getNodes(range, tfEditor.getPoints())
  }

  var getOpacityRange = function getOpacityRange() {
    var range =
      arguments.length > 0 && arguments[0] !== undefined
        ? arguments[0]
        : dataRange
    return getRange(range, getOpacityNodes(range))
  }

  return {
    setColorTransferFunction: function setColorTransferFunction(tf) {
      tfEditor.setColorTransferFunction(tf)
    },
    setPoints: function setPoints(points) {
      tfEditor.setPoints(points)
      updateContextPiecewiseFunction(context, dataRange, points)
    },
    getPoints: function getPoints() {
      return tfEditor.getPoints()
    },
    setRangeZoom: function setRangeZoom(newRange) {
      tfEditor.setViewBox.apply(tfEditor, _toConsumableArray(newRange))
    },
    setDataRange: function setDataRange(newRange) {
      dataRange = _toConsumableArray(newRange)
    },
    getOpacityNodes: getOpacityNodes,
    getOpacityRange: getOpacityRange,
    setHistogram: function setHistogram(h) {
      return tfEditor.setHistogram(h)
    },
    render: function render() {
      return undefined
    },
    getGaussians: function getGaussians() {
      console.warn('getGaussians not implemented, use getPoints')
      return []
    },
    setGaussians: function setGaussians() {
      console.warn('setGaussians not implemented, use setPoints')
    },
  }
}

var createTransferFunctionEditor = function createTransferFunctionEditor(
  context,
  mount
) {
  var editor = new TransferFunctionEditor(mount)
  return vtkPiecewiseGaussianWidgetFacade(editor, context)
}

var MIN_WIDTH = 1e-8

var createTransferFunctionWidget = function createTransferFunctionWidget(
  context,
  imagesUIGroup
) {
  var piecewiseWidgetContainer = document.createElement('div')
  piecewiseWidgetContainer.setAttribute('style', 'height: 150px; width: 400px')
  piecewiseWidgetContainer.setAttribute('class', style.piecewiseWidget)
  var transferFunctionWidgetRow = document.createElement('div')
  transferFunctionWidgetRow.setAttribute('class', style.uiRow) // This row needs background different from normal uiRows, to aid
  // in the illusion that it's the content portion of a tabbed pane

  transferFunctionWidgetRow.setAttribute(
    'style',
    'background: rgba(127, 127, 127, 0.5);'
  )
  imagesUIGroup.appendChild(transferFunctionWidgetRow)
  transferFunctionWidgetRow.appendChild(piecewiseWidgetContainer)
  var transferFunctionWidget = createTransferFunctionEditor(
    context,
    piecewiseWidgetContainer
  )
  context.images.transferFunctionWidget = transferFunctionWidget // lookupTableProxies used elsewhere
  // if (typeof context.images.lookupTableProxies === 'undefined') {
  //   context.images.lookupTableProxies = new Map()
  // }

  var getXMinMax = function getXMinMax() {
    var xPositions = transferFunctionWidget.getPoints().map(function(_ref) {
      var _ref2 = _slicedToArray(_ref, 1),
        x = _ref2[0]

      return x
    })
    return {
      min: Math.min.apply(Math, _toConsumableArray(xPositions)),
      max: Math.max.apply(Math, _toConsumableArray(xPositions)),
    }
  }

  var windowGet = function windowGet() {
    var _getXMinMax = getXMinMax(),
      min = _getXMinMax.min,
      max = _getXMinMax.max

    var width = max - min
    return width
  }

  var windowSet = function windowSet(newWidth) {
    var _getXMinMax2 = getXMinMax(),
      min = _getXMinMax2.min,
      max = _getXMinMax2.max

    var width = max - min || MIN_WIDTH
    var newMin = (min + max) / 2 - newWidth / 2
    var newPoints = transferFunctionWidget
      .getPoints() // normalize in old range, then scale to new range
      .map(function(_ref3) {
        var _ref4 = _slicedToArray(_ref3, 2),
          x = _ref4[0],
          y = _ref4[1]

        return [((x - min) / width) * newWidth + newMin, y]
      })
    transferFunctionWidget.setPoints(newPoints)
  }

  var levelGet = function levelGet() {
    var _getXMinMax3 = getXMinMax(),
      min = _getXMinMax3.min,
      max = _getXMinMax3.max

    return (min + max) / 2
  }

  var levelSet = function levelSet(newLevel) {
    var oldLevel = levelGet()
    var delta = newLevel - oldLevel
    var newPoints = transferFunctionWidget
      .getPoints() // normalize in old range, then scale to new range
      .map(function(_ref5) {
        var _ref6 = _slicedToArray(_ref5, 2),
          x = _ref6[0],
          y = _ref6[1]

        return [x + delta, y]
      })
    transferFunctionWidget.setPoints(newPoints)
  } // Create range manipulator

  var rangeManipulator = vtkMouseRangeManipulator$1.newInstance({
    button: 1,
    alt: true,
  })
  context.images.transferFunctionManipulator = {
    rangeManipulator: rangeManipulator,
    windowGet: windowGet,
    windowSet: windowSet,
    levelGet: levelGet,
    levelSet: levelSet,
  }
  var pwfRangeManipulator = vtkMouseRangeManipulator$1.newInstance({
    button: 3,
    // Right mouse
    alt: true,
  })
  var pwfRangeManipulatorShift = vtkMouseRangeManipulator$1.newInstance({
    button: 1,
    // Left mouse
    shift: true,
    // For the macOS folks
    alt: true,
  })

  var pwfGet = function pwfGet() {
    var opacities = transferFunctionWidget.getPoints().map(function(_ref7) {
      var _ref8 = _slicedToArray(_ref7, 2),
        y = _ref8[1]

      return y
    })
    return Math.max.apply(Math, _toConsumableArray(opacities))
  }

  var pwfSet = function pwfSet(newMaxOpacity) {
    var oldMax = pwfGet()
    var delta = newMaxOpacity - oldMax
    var newPoints = transferFunctionWidget.getPoints().map(function(_ref9) {
      var _ref10 = _slicedToArray(_ref9, 2),
        x = _ref10[0],
        y = _ref10[1]

      return [x, Math.min(y + delta, 1)]
    })
    transferFunctionWidget.setPoints(newPoints)
  } // max as 1.01 not 1.0 to allow for squishing of low function points if a point is already at 1

  pwfRangeManipulator.setVerticalListener(0, 1.01, 0.01, pwfGet, pwfSet)
  pwfRangeManipulatorShift.setVerticalListener(0, 1.01, 0.01, pwfGet, pwfSet)
  ;[rangeManipulator, pwfRangeManipulator, pwfRangeManipulatorShift].forEach(
    function(m) {
      context.itkVtkView.getInteractorStyle2D().addMouseManipulator(m)
      context.itkVtkView.getInteractorStyle3D().addMouseManipulator(m)
    }
  )
}
var applyPiecewiseFunctionPointsToEditor = function applyPiecewiseFunctionPointsToEditor(
  context,
  event
) {
  var _context$images = context.images,
    transferFunctionWidget = _context$images.transferFunctionWidget,
    actorContext = _context$images.actorContext
  var _event$data = event.data,
    points = _event$data.points,
    component = _event$data.component,
    name = _event$data.name
  var imageActorContext = actorContext.get(name)

  if (component === imageActorContext.selectedComponent) {
    transferFunctionWidget.setPoints(points)
  }
}

function createShadowToggle(context, uiContainer) {
  var shadowButton = document.createElement('div')
  shadowButton.innerHTML = '<input id="'
    .concat(context.id, '-toggleShadowButton" type="checkbox" class="')
    .concat(
      style.toggleInput,
      '" checked><label itk-vtk-tooltip itk-vtk-tooltip-top-screenshot itk-vtk-tooltip-content="Use shadow" class="'
    )
    .concat(style.shadowButton, ' ')
    .concat(style.toggleButton, '" for="')
    .concat(context.id, '-toggleShadowButton"><img src="')
    .concat(optimizedSVGDataUri$5, '" alt="shadow" /></label>')
  var shadowButtonInput = shadowButton.children[0]
  var shadowButtonLabel = shadowButton.children[1]
  applyContrastSensitiveStyleToElement(
    context,
    'invertibleButton',
    shadowButtonLabel
  )
  context.images.shadowButtonLabel = shadowButtonLabel
  context.images.shadowButtonInput = shadowButtonInput
  shadowButton.addEventListener('change', function(event) {
    event.preventDefault()
    event.stopPropagation()
    context.service.send({
      type: 'TOGGLE_IMAGE_SHADOW',
      data: context.images.selectedName,
    })
  })
  uiContainer.appendChild(shadowButton)
}

function createGradientOpacitySlider(context, uiContainer) {
  var sliderEntry = document.createElement('div')
  sliderEntry.setAttribute('class', style.sliderEntry)
  sliderEntry.innerHTML = '\n    <div itk-vtk-tooltip itk-vtk-tooltip-top-fullscreen itk-vtk-tooltip-content="Gradient opacity scale" class="'
    .concat(style.gradientOpacitySlider, '">\n      <img src="')
    .concat(
      optimizedSVGDataUri$n,
      '" alt="gradient opacity"/>\n    </div>\n    <div class="'
    )
    .concat(
      style.gradientOpacityScale,
      '" style="display: none;">\n      <input type="range" min="0" max="0.99" value="0.5" step="0.01" id="'
    )
    .concat(
      context.id,
      '-gradientOpacityScaleSlider" />\n    </div>\n\n    <input type="range" min="0" max="1" value="0.2" step="0.01" orient="vertical"\n      id="'
    )
    .concat(context.id, '-gradientOpacitySlider"\n      class="')
    .concat(style.slider, '" />')
  var sliderEntryDiv = sliderEntry.children[0]
  var gradientOpacityScaleDiv = sliderEntry.children[1]
  var gradientOpacityScaleSlider = gradientOpacityScaleDiv.children[0]
  var gradientOpacitySlider = sliderEntry.children[2]
  context.images.sliderEntryDiv = sliderEntryDiv
  applyContrastSensitiveStyleToElement(
    context,
    'invertibleButton',
    sliderEntryDiv
  )
  context.images.gradientOpacitySlider = gradientOpacitySlider
  context.images.gradientOpacityScaleSlider = gradientOpacityScaleSlider
  sliderEntryDiv.addEventListener('click', function(event) {
    if (gradientOpacityScaleDiv.style.display === 'none') {
      gradientOpacityScaleDiv.style.display = 'block'
    } else {
      gradientOpacityScaleDiv.style.display = 'none'
    }
  })
  gradientOpacitySlider.addEventListener('input', function(event) {
    event.preventDefault()
    event.stopPropagation()
    context.service.send({
      type: 'IMAGE_GRADIENT_OPACITY_CHANGED',
      data: {
        name: context.images.selectedName,
        gradientOpacity: Number(gradientOpacitySlider.value),
      },
    })
  })
  gradientOpacityScaleSlider.addEventListener('input', function(event) {
    event.preventDefault()
    event.stopPropagation()
    context.service.send({
      type: 'IMAGE_GRADIENT_OPACITY_SCALE_CHANGED',
      data: {
        name: context.images.selectedName,
        gradientOpacityScale: Number(gradientOpacityScaleSlider.value),
      },
    })
  })
  uiContainer.appendChild(sliderEntry)
}

function createSampleDistanceSlider(context, uiContainer) {
  var sliderEntry = document.createElement('div')
  sliderEntry.setAttribute('class', style.sliderEntry)
  sliderEntry.innerHTML = '\n    <div itk-vtk-tooltip itk-vtk-tooltip-top-screenshot itk-vtk-tooltip-content="Volume sample distance" class="'
    .concat(style.sampleDistanceButton, '">\n      <img src="')
    .concat(
      optimizedSVGDataUri$9,
      '" alt="sample distance" />\n    </div>\n    <input type="range" min="0" max="1" value="0.25" step="0.01"\n      class="'
    )
    .concat(style.slider, ' ')
    .concat(context.id, '-spacing" />')
  var spacingElement = sliderEntry.querySelector(
    '.'.concat(context.id, '-spacing')
  )
  var spacingDiv = sliderEntry.children[0]
  context.images.volumeSampleDistanceDiv = spacingDiv
  context.images.volumeSampleDistanceSlider = spacingElement
  applyContrastSensitiveStyleToElement(context, 'invertibleButton', spacingDiv)
  spacingElement.addEventListener('input', function(event) {
    event.preventDefault()
    event.stopPropagation()
    context.service.send({
      type: 'IMAGE_VOLUME_SAMPLE_DISTANCE_CHANGED',
      data: {
        name: context.images.selectedName,
        volumeSampleDistance: Number(spacingElement.value),
      },
    })
  })
  uiContainer.appendChild(sliderEntry)
}

function createBlendModeSelector(context, uiContainer) {
  var blendModeEntry = document.createElement('div')
  blendModeEntry.innerHTML = '\n    <div itk-vtk-tooltip itk-vtk-tooltip-top itk-vtk-tooltip-content="Blend mode"\n      class="'
    .concat(style.blendModeButton, '">\n      <img src="')
    .concat(optimizedSVGDataUri$q, '" alt="blend mode" />\n    </div>\n    ')
  var blendModeDiv = blendModeEntry.children[0]
  context.images.blendModeDiv = blendModeDiv
  applyContrastSensitiveStyleToElement(
    context,
    'invertibleButton',
    blendModeDiv
  )
  uiContainer.appendChild(blendModeEntry)
  var blendModeSelector = document.createElement('select')
  blendModeSelector.setAttribute('class', style.selector)
  blendModeSelector.id = ''.concat(context.id, '-colorMapSelector')
  blendModeSelector.innerHTML =
    '<option selected value="0">Composite</option>\n    <option value="1">Maximum</option>\n    <option value="2">Minimum</option>\n    <option value="3">Average</option>'
  blendModeEntry.appendChild(blendModeSelector)
  context.images.blendModeSelector = blendModeSelector
  blendModeSelector.addEventListener('change', function(event) {
    event.preventDefault()
    event.stopPropagation()
    var mode = 'blendmode'

    switch (parseInt(event.target.value)) {
      case 0:
        mode = 'Composite'
        break

      case 1:
        mode = 'Maximum'
        break

      case 2:
        mode = 'Minimum'
        break

      case 3:
        mode = 'Average'
        break
    }

    context.service.send({
      type: 'IMAGE_BLEND_MODE_CHANGED',
      data: {
        name: context.images.selectedName,
        blendMode: mode,
      },
    })
  })
  uiContainer.appendChild(blendModeSelector)
}

function createVolumeRenderingInputs(context, imagesUIGroup) {
  context.id
  var volumeRow1 = document.createElement('div')
  volumeRow1.setAttribute('class', style.uiRow)
  createShadowToggle(context, volumeRow1)
  createGradientOpacitySlider(context, volumeRow1)
  imagesUIGroup.appendChild(volumeRow1)
  context.images.volumeRow1 = volumeRow1
  var volumeRow2 = document.createElement('div')
  volumeRow2.setAttribute('class', style.uiRow)
  createSampleDistanceSlider(context, volumeRow2)
  createBlendModeSelector(context, volumeRow2)
  imagesUIGroup.appendChild(volumeRow2)
  context.images.volumeRow1 = volumeRow1
  context.images.volumeRow2 = volumeRow2
}

var CategoricalPresetIcons = new Map()
CategoricalPresetIcons.set(
  'glasbey',
  'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADwAAAAFCAYAAAAZiY8XAAAAbUlEQVQ4T2O8zsDwnwENbLXBEGIo82FEV8bwT+U4htiMYEsMsfSGixhiuY11GGKTlz7EEIucdgFDbIVMJIYYw8oWTLG/nzDEGK8zMPyjuYcbsXi4YeA8/JfmHh5kMfyH5h4eZDH8m+YeHkQxDACSRl3zepXFtQAAAABJRU5ErkJggg=='
)
CategoricalPresetIcons.set(
  'glasbey_light',
  'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADwAAAAFCAYAAAAZiY8XAAAAXUlEQVQ4T2O8zsDwnwENaHegizAwbKnAUMYQsOY4hsJJwVYYYunLDDANfDUDQ6zq8HQMsfY1BRhiG5ZjmveEoxVDHdueGgwxxusMDP9Gmof/jjQP/xlpHv49kjwMAGwvWgYDwlVYAAAAAElFTkSuQmCC'
)
CategoricalPresetIcons.set(
  'glasbey_warm',
  'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADwAAAAFCAYAAAAZiY8XAAAAXklEQVQ4T2O8zsDwnwENaCT9QBdiWGvNgSF2IrkQQ+yuZz+G2LrATgyxSdcZMcTyGp5hiF3kF8QQ22S1EUOstuMQhtjuVTYYYozXGRj+jTQP/x1pHv4z0jz8eyR5GAB6w1ulCOS6owAAAABJRU5ErkJggg=='
)
CategoricalPresetIcons.set(
  'modulate',
  'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADwAAAAFCAYAAAAZiY8XAAAAJ0lEQVQ4T+XPBw0AAAjAMPAvmTOCjtVBEyBEEljRNz48tnDbwmUKHxUmE+jjOrX6AAAAAElFTkSuQmCC'
)
CategoricalPresetIcons.set(
  'glasbey_bw',
  'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADwAAAAFCAYAAAAZiY8XAAAAbUlEQVQ4T2O8zsDwnwENbLXBEGIo82FEV8bwT+U4htiMYEsMsfSGixhiuY11GGKTlz7EEGOMzsUQays4jSFWdfMWhpj/w32Y5l1nYPhHcw83YvFww8B5+C/NPTzIYvgPzT08yGL4N809PIhiGADz42FUcjTZogAAAABJRU5ErkJggg=='
)
CategoricalPresetIcons.set(
  'glasbey_dark',
  'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADwAAAAFCAYAAAAZiY8XAAAAbklEQVQ4T2O8zsDwnwENbLXBEGIo82FEV8bwT+U4htjzn5YYYhK3LmKI5TbWYYi9sd6IIbZCJhJDTLTLBEPstXwAhtiisl4MMcbrDAz/aO7h21g83DBwHv5Lcw8Pshj+Q3MPD7IY/k1zDw+iGAYAOVBcgZzUS9MAAAAASUVORK5CYII='
)
CategoricalPresetIcons.set(
  'glasbey_cool',
  'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADwAAAAFCAYAAAAZiY8XAAAAcElEQVQ4T2Pkzfr/nwEN/NH2Qxdi+G46A0PMy3QNhti2yPMYYmt95mOInTg3AUPsep8+hpj/7ocYYr9cgjHtmIBpx75t/RjqGHmz/v8baR7+O9I8/Gekefg3dT18DkseXkBBHn6EJQ8HEZmH+zDUAQAnhWrvPnCKfAAAAABJRU5ErkJggg=='
)
CategoricalPresetIcons.set(
  'modulate_dark',
  'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADwAAAAFCAYAAAAZiY8XAAAAJklEQVQ4T+XPBw0AAAjAsOFfMjfoWB00gEUkgBF9+XDbwmULpyl8/eAE9wt5lvIAAAAASUVORK5CYII='
)

function _createForOfIteratorHelper$1(o, allowArrayLike) {
  var it
  if (typeof Symbol === 'undefined' || o[Symbol.iterator] == null) {
    if (
      Array.isArray(o) ||
      (it = _unsupportedIterableToArray$1(o)) ||
      (allowArrayLike && o && typeof o.length === 'number')
    ) {
      if (it) o = it
      var i = 0
      var F = function F() {}
      return {
        s: F,
        n: function n() {
          if (i >= o.length) return { done: true }
          return { done: false, value: o[i++] }
        },
        e: function e(_e) {
          throw _e
        },
        f: F,
      }
    }
    throw new TypeError(
      'Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.'
    )
  }
  var normalCompletion = true,
    didErr = false,
    err
  return {
    s: function s() {
      it = o[Symbol.iterator]()
    },
    n: function n() {
      var step = it.next()
      normalCompletion = step.done
      return step
    },
    e: function e(_e2) {
      didErr = true
      err = _e2
    },
    f: function f() {
      try {
        if (!normalCompletion && it.return != null) it.return()
      } finally {
        if (didErr) throw err
      }
    },
  }
}

function _unsupportedIterableToArray$1(o, minLen) {
  if (!o) return
  if (typeof o === 'string') return _arrayLikeToArray$1(o, minLen)
  var n = Object.prototype.toString.call(o).slice(8, -1)
  if (n === 'Object' && o.constructor) n = o.constructor.name
  if (n === 'Map' || n === 'Set') return Array.from(o)
  if (n === 'Arguments' || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n))
    return _arrayLikeToArray$1(o, minLen)
}

function _arrayLikeToArray$1(arr, len) {
  if (len == null || len > arr.length) len = arr.length
  for (var i = 0, arr2 = new Array(len); i < len; i++) {
    arr2[i] = arr[i]
  }
  return arr2
}

function createCategoricalColorIconSelector(categoricalColorSelectorDiv) {
  var rows = 4
  var cols = 2
  var iconSelectParameters = {
    selectedIconWidth: 140,
    selectedIconHeight: 22,
    selectedBoxPadding: 1,
    iconsWidth: 60,
    iconsHeight: 22,
    boxIconSpace: 1,
    vectoralIconNumber: cols,
    horizontalIconNumber: rows,
  }
  var iconSelect = new IconSelect(
    ''.concat(categoricalColorSelectorDiv.id),
    categoricalColorSelectorDiv,
    iconSelectParameters
  )
  categoricalColorSelectorDiv.style.width = '154px'
  var icons = new Array(rows * cols)
  var count = 0

  var _iterator = _createForOfIteratorHelper$1(
      CategoricalPresetIcons.entries()
    ),
    _step

  try {
    for (_iterator.s(); !(_step = _iterator.n()).done; ) {
      var _step$value = _slicedToArray(_step.value, 2),
        key = _step$value[0],
        value = _step$value[1]

      var index = Math.floor(count % rows) * cols + Math.floor(count / rows)
      icons[index] = {
        iconFilePath: value,
        iconValue: key,
      }
      count++
    }
  } catch (err) {
    _iterator.e(err)
  } finally {
    _iterator.f()
  }

  iconSelect.refresh(icons)
  return iconSelect
}

function createLabelImageColorWidget(context) {
  context.id
  var labelImageColorUIGroup = document.createElement('div')
  context.images.labelImageColorUIGroup = labelImageColorUIGroup
  labelImageColorUIGroup.setAttribute('class', style.uiGroup)
  context.uiGroups.set('labelImages', labelImageColorUIGroup)
  var labelImageWidgetRow = document.createElement('div')
  labelImageWidgetRow.setAttribute('class', style.uiRow)
  var categoricalColorSelector = document.createElement('div')
  categoricalColorSelector.id = ''.concat(context.id, '-lookupTableSelector')
  var iconSelector = createCategoricalColorIconSelector(
    categoricalColorSelector
  )
  context.images.labelImageIconSelector = iconSelector
  categoricalColorSelector.addEventListener('changed', function(event) {
    event.preventDefault()
    event.stopPropagation()
    var name = context.images.selectedName
    var lut = iconSelector.getSelectedValue()
    context.service.send({
      type: 'LABEL_IMAGE_LOOKUP_TABLE_CHANGED',
      data: {
        name: name,
        lookupTable: lut,
      },
    })
  })
  var sliderEntry = document.createElement('div')
  sliderEntry.setAttribute('class', style.sliderEntry)
  sliderEntry.innerHTML = '\n  <div itk-vtk-tooltip itk-vtk-tooltip-top itk-vtk-tooltip-content="Label image blend" class="'
    .concat(style.gradientOpacitySlider, '">\n    <img src="')
    .concat(
      optimizedSVGDataUri$g,
      '" alt="opacity"/>\n  </div>\n  <input type="range" min="0" max="1" value="0.5" step="0.01"\n  id="'
    )
    .concat(context.id, '-labelImageBlendSlider"\n  class="')
    .concat(style.slider, '" />')
  var labelImageBlendSlider = sliderEntry.querySelector(
    '#'.concat(context.id, '-labelImageBlendSlider')
  )
  context.images.labelImageBlendSlider = labelImageBlendSlider
  var sliderEntryDiv = sliderEntry.children[0]
  context.images.labelImageBlendDiv = sliderEntryDiv
  applyContrastSensitiveStyleToElement(
    context,
    'invertibleButton',
    sliderEntryDiv
  )
  labelImageBlendSlider.addEventListener('input', function(event) {
    event.preventDefault()
    event.stopPropagation()
    var name = context.images.selectedName
    context.service.send({
      type: 'LABEL_IMAGE_BLEND_CHANGED',
      data: {
        name: name,
        labelImageBlend: Number(labelImageBlendSlider.value),
      },
    })
  })
  labelImageWidgetRow.appendChild(categoricalColorSelector)
  labelImageWidgetRow.appendChild(sliderEntry)
  labelImageColorUIGroup.appendChild(labelImageWidgetRow)
  context.uiContainer.appendChild(labelImageColorUIGroup)
}

function _createForOfIteratorHelper(o, allowArrayLike) {
  var it
  if (typeof Symbol === 'undefined' || o[Symbol.iterator] == null) {
    if (
      Array.isArray(o) ||
      (it = _unsupportedIterableToArray(o)) ||
      (allowArrayLike && o && typeof o.length === 'number')
    ) {
      if (it) o = it
      var i = 0
      var F = function F() {}
      return {
        s: F,
        n: function n() {
          if (i >= o.length) return { done: true }
          return { done: false, value: o[i++] }
        },
        e: function e(_e) {
          throw _e
        },
        f: F,
      }
    }
    throw new TypeError(
      'Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.'
    )
  }
  var normalCompletion = true,
    didErr = false,
    err
  return {
    s: function s() {
      it = o[Symbol.iterator]()
    },
    n: function n() {
      var step = it.next()
      normalCompletion = step.done
      return step
    },
    e: function e(_e2) {
      didErr = true
      err = _e2
    },
    f: function f() {
      try {
        if (!normalCompletion && it.return != null) it.return()
      } finally {
        if (didErr) throw err
      }
    },
  }
}

function _unsupportedIterableToArray(o, minLen) {
  if (!o) return
  if (typeof o === 'string') return _arrayLikeToArray(o, minLen)
  var n = Object.prototype.toString.call(o).slice(8, -1)
  if (n === 'Object' && o.constructor) n = o.constructor.name
  if (n === 'Map' || n === 'Set') return Array.from(o)
  if (n === 'Arguments' || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n))
    return _arrayLikeToArray(o, minLen)
}

function _arrayLikeToArray(arr, len) {
  if (len == null || len > arr.length) len = arr.length
  for (var i = 0, arr2 = new Array(len); i < len; i++) {
    arr2[i] = arr[i]
  }
  return arr2
}

function createLabelMapWeightWidget(context) {
  var labelImageWeightUIGroup = document.createElement('div')
  context.images.labelImageWeightUIGroup = labelImageWeightUIGroup
  labelImageWeightUIGroup.setAttribute('class', style.uiGroup)
  context.uiGroups.set('labelImageWeights', labelImageWeightUIGroup)
  var labelImageWidgetRow = document.createElement('div')
  labelImageWidgetRow.setAttribute('class', style.uiRow)
  var uniqueLabelSelectorDiv = document.createElement('div')
  uniqueLabelSelectorDiv.id = ''.concat(
    context.id,
    '-labelImageUniqueLabelSelector'
  )
  var labelSelector = document.createElement('select')
  labelSelector.setAttribute('class', style.selector)
  labelSelector.id = ''.concat(context.id, '-labelSelector')
  context.images.labelSelector = labelSelector
  context.images.labelSelector = labelSelector
  uniqueLabelSelectorDiv.appendChild(labelSelector)
  var sliderEntry = document.createElement('div')
  sliderEntry.setAttribute('class', style.sliderEntry) // <input type="range" min="0" max="1" value="${context.images.labelImageWeights[0]}" step="0.05" id="${context.id}-labelImageWeightSlider" class="${style.slider}" />`

  sliderEntry.innerHTML = '\n    <input type="range" min="0" max="1" value="1.0" step="0.05" id="'
    .concat(context.id, '-labelImageWeightSlider" class="')
    .concat(style.slider, '" />')
  var weightElement = sliderEntry.querySelector(
    '#'.concat(context.id, '-labelImageWeightSlider')
  )
  context.images.labelImageWeightSlider = weightElement
  labelImageWidgetRow.appendChild(uniqueLabelSelectorDiv)
  labelImageWidgetRow.appendChild(sliderEntry)
  labelImageWeightUIGroup.appendChild(labelImageWidgetRow)
  context.uiContainer.appendChild(labelImageWeightUIGroup)
  labelSelector.addEventListener('change', function(event) {
    event.preventDefault()
    event.stopPropagation()
    context.service.send({
      type: 'LABEL_IMAGE_SELECTED_LABEL_CHANGED',
      data: {
        name: context.images.selectedName,
        selectedLabel: event.target.value,
      },
    })
  })
  weightElement.addEventListener('input', function(event) {
    event.preventDefault()
    event.stopPropagation()
    var name = context.images.selectedName
    var actorContext = context.images.actorContext.get(name)
    var labelImageWeights = actorContext.labelImageWeights

    if (actorContext.selectedLabel === 'all') {
      var weight = Number(weightElement.value)

      var _iterator = _createForOfIteratorHelper(labelImageWeights.keys()),
        _step

      try {
        for (_iterator.s(); !(_step = _iterator.n()).done; ) {
          var label = _step.value
          labelImageWeights.set(label, weight)
        }
      } catch (err) {
        _iterator.e(err)
      } finally {
        _iterator.f()
      }

      actorContext.labelImageToggleWeight = weight
    } else {
      labelImageWeights.set(
        parseInt(actorContext.selectedLabel),
        Number(weightElement.value)
      )
    }

    context.service.send({
      type: 'LABEL_IMAGE_WEIGHTS_CHANGED',
      data: {
        name: context.images.selectedName,
        labelImageWeights: labelImageWeights,
      },
    })
  })
}

function createImagesInterface(context) {
  var imagesUIGroup = document.createElement('div')
  imagesUIGroup.setAttribute('class', style.uiGroup)
  context.images.imagesUIGroup = imagesUIGroup
  context.uiGroups.set('images', imagesUIGroup)
  var componentAndScale = document.createElement('div')
  imagesUIGroup.appendChild(componentAndScale)
  componentAndScale.setAttribute('style', 'display: flex;')
  context.images.componentAndScale = componentAndScale
  createComponentSelector(context, componentAndScale)
  createColorRangeInput(context, imagesUIGroup)
  createTransferFunctionWidget(context, imagesUIGroup)
  createVolumeRenderingInputs(context, imagesUIGroup)
  context.uiContainer.appendChild(imagesUIGroup)
  createLabelImageColorWidget(context)
  createLabelMapWeightWidget(context)
  applyGroupVisibility(
    context,
    ['images', 'labelImages', 'labelImageWeights'],
    false
  )
}

function updateAvailableComponents(context) {
  var name = context.images.selectedName
  var actorContext = context.images.actorContext.get(name)
  var image = actorContext.image

  if (image) {
    var components = image.imageType.components
    context.id

    if (components > 1 && actorContext.independentComponents) {
      context.images.componentRow.style.display = 'flex'
    } else {
      context.images.componentRow.style.display = 'none'
    }

    context.images.componentSelector.innerHTML = new Array(components)
      .fill(undefined)
      .map(function(_, ii) {
        return ii
      })
      .map(function(idx, component) {
        return '<input name="tabs" type="radio" id="tab-'
          .concat(component, '" ')
          .concat(idx === 0 ? 'checked="checked"' : '', ' class="')
          .concat(style.componentTab, '" data-component-index="')
          .concat(component, '"/><label for="tab-')
          .concat(component, '" class="')
          .concat(style.compTabLabel, '">&nbsp;')
          .concat(component, '&nbsp;<input type="checkbox" ')
          .concat(
            actorContext.componentVisibilities[idx] ? 'checked="checked"' : '',
            ' class="'
          )
          .concat(style.componentVisibility, '" data-component-index="')
          .concat(component, '"></label>')
      })
      .join('')
    context.images.componentSelector.value = actorContext.selectedComponent
  }
}

function applyColorRangeBounds(context, event) {
  var name = event.data.name
  var componentIndex = event.data.component
  var actorContext = context.images.actorContext.get(name)

  if (
    name !== context.images.selectedName ||
    componentIndex !== actorContext.selectedComponent
  ) {
    return
  }

  var range = event.data.range
  var minimumInput = context.images.colorRangeInputRow.children[0]
  var maximumInput = context.images.colorRangeInputRow.children[2]
  minimumInput.min = range[0]
  minimumInput.max = range[1]
  maximumInput.min = range[0]
  maximumInput.max = range[1]
  var image = actorContext.image

  if (
    (image && image.imageType.componentType === 'float') ||
    image.imageType.componentType === 'double'
  ) {
    var step = (range[1] - range[0]) / 1000.0
    minimumInput.step = step
    maximumInput.step = step
  }

  context.images.transferFunctionWidget.setDataRange(range)
}

var MIN_WINDOW = 1e-8

function applyColorRange(context, event) {
  var _actorContext$piecewi

  var name = event.data.name
  var component = event.data.component
  var actorContext = context.images.actorContext.get(name)

  if (
    name !== context.images.selectedName ||
    component !== actorContext.selectedComponent
  ) {
    return
  }

  var colorRange = event.data.range
  var minimumInput = context.images.colorRangeInputRow.children[1]
  var maximumInput = context.images.colorRangeInputRow.children[3]
  minimumInput.value = colorRange[0]
  maximumInput.value = colorRange[1]
  var fullRange = colorRange

  if (actorContext.colorRangeBounds.has(component)) {
    fullRange = actorContext.colorRangeBounds.get(component)
  }

  var diff = fullRange[1] - fullRange[0]
  var colorRangeNormalized = [
    (colorRange[0] - fullRange[0]) / diff,
    (colorRange[1] - fullRange[0]) / diff,
  ]
  var normDelta = colorRangeNormalized[1] - colorRangeNormalized[0]
  var _context$images$trans = context.images.transferFunctionManipulator,
    rangeManipulator = _context$images$trans.rangeManipulator,
    windowGet = _context$images$trans.windowGet,
    windowSet = _context$images$trans.windowSet,
    levelGet = _context$images$trans.levelGet,
    levelSet = _context$images$trans.levelSet // level

  rangeManipulator.setHorizontalListener(
    colorRangeNormalized[0],
    colorRangeNormalized[1],
    normDelta / 100.0,
    levelGet,
    levelSet
  ) // window

  rangeManipulator.setVerticalListener(
    MIN_WINDOW,
    normDelta,
    normDelta / 100.0,
    windowGet,
    windowSet
  )
  var transferFunctionWidget = context.images.transferFunctionWidget
  transferFunctionWidget.setRangeZoom(colorRangeNormalized)
  var oldPoints =
    (_actorContext$piecewi = actorContext.piecewiseFunctionPoints) === null ||
    _actorContext$piecewi === void 0
      ? void 0
      : _actorContext$piecewi.get(component)

  if (!event.data.dontUpdatePoints && oldPoints) {
    var xValues = oldPoints.map(function(_ref) {
      var _ref2 = _slicedToArray(_ref, 1),
        x = _ref2[0]

      return x
    }) // if 1 point, assume whole range

    var maxOldPoints =
      xValues.length > 1 ? Math.max.apply(Math, _toConsumableArray(xValues)) : 1
    var minOldPoints =
      xValues.length > 1 ? Math.min.apply(Math, _toConsumableArray(xValues)) : 0
    var rangeOldPoints = maxOldPoints - minOldPoints
    var points = oldPoints // find normalized position of old points
      .map(function(_ref3) {
        var _ref4 = _slicedToArray(_ref3, 2),
          x = _ref4[0],
          y = _ref4[1]

        return [(x - minOldPoints) / rangeOldPoints, y]
      }) // rescale to new range
      .map(function(_ref5) {
        var _ref6 = _slicedToArray(_ref5, 2),
          x = _ref6[0],
          y = _ref6[1]

        return [x * normDelta + colorRangeNormalized[0], y]
      })
    transferFunctionWidget.setPoints(points)
  }
}

function applyColorMap(context, _ref) {
  var _context$images$looku

  var _ref$data = _ref.data,
    component = _ref$data.component,
    name = _ref$data.name,
    colorMap = _ref$data.colorMap
  var actorContext = context.images.actorContext.get(name)
  var lookupTableProxy =
    (_context$images$looku = context.images.lookupTableProxies) === null ||
    _context$images$looku === void 0
      ? void 0
      : _context$images$looku.get(component)

  if (component === actorContext.selectedComponent) {
    context.images.iconSelector.setSelectedValue(colorMap)

    if (lookupTableProxy) {
      context.images.transferFunctionWidget.setColorTransferFunction(
        lookupTableProxy.getLookupTable()
      )
    }
  }
}

function toggleShadow(context, event) {
  var name = event.data
  var actorContext = context.images.actorContext.get(name)
  var shadow = actorContext.shadowEnabled
  context.images.shadowButtonInput.checked = shadow
}

function applyGradientOpacity(context, event) {
  event.data.name
  var gradientOpacity = event.data.gradientOpacity
  context.images.gradientOpacitySlider.value = gradientOpacity
}

function applyGradientOpacityScale(context, event) {
  event.data.name
  var gradientOpacityScale = event.data.gradientOpacityScale
  context.images.gradientOpacityScaleSlider.value = gradientOpacityScale
}

function applyVolumeSampleDistance(context, event) {
  event.data.name
  var volumeSampleDistance = event.data.volumeSampleDistance
  context.images.volumeSampleDistanceSlider.value = volumeSampleDistance
}

function applyBlendMode(context, event) {
  event.data.name
  var blendMode = event.data.blendMode
  var blendModeLower = blendMode.toLowerCase()

  switch (blendModeLower) {
    case 'composite':
      context.images.blendModeSelector.value = 0

      if (!context.use2D) {
        context.images.volumeRow1.style.display = 'flex'
      }

      break

    case 'maximum':
      context.images.blendModeSelector.value = 1
      context.images.volumeRow1.style.display = 'none'
      break

    case 'minimum':
      context.images.blendModeSelector.value = 2
      context.images.volumeRow1.style.display = 'none'
      break

    case 'average':
      context.images.blendModeSelector.value = 3
      context.images.volumeRow1.style.display = 'none'
      break

    default:
      throw new Error('Invalid blend mode: '.concat(blendMode))
  }
}

function updateImageInterface(context) {
  updateAvailableComponents(context)
  var name = context.images.selectedName
  var actorContext = context.images.actorContext.get(name)
  var image = actorContext.image
  var component = actorContext.selectedComponent // If not a 2D RGB image

  if (actorContext.independentComponents) {
    context.images.colorRangeInputRow.style.display = 'flex'
    context.images.colorMapSelector.style.display = 'block'
  } else {
    context.images.colorRangeInputRow.style.display = 'none'
    context.images.colorMapSelector.style.display = 'none'
  }

  if (image) {
    if (image.imageType.dimension === 3) {
      context.images.volumeRow1.style.display = 'flex'
      context.images.volumeRow2.style.display = 'flex'

      if (context.main.xPlaneRow) {
        context.main.xPlaneRow.style.display = 'flex'
        context.main.yPlaneRow.style.display = 'flex'
        context.main.zPlaneRow.style.display = 'flex'
      }
    } else {
      context.images.volumeRow1.style.display = 'none'
      context.images.volumeRow2.style.display = 'none'

      if (context.main.xPlaneRow) {
        context.main.xPlaneRow.style.display = 'none'
        context.main.yPlaneRow.style.display = 'none'
        context.main.zPlaneRow.style.display = 'none'
      }
    }

    toggleInterpolation(context, {
      data: name,
    })

    if (actorContext.colorRanges.has(component)) {
      applyColorRange(context, {
        data: {
          name: name,
          component: component,
          range: actorContext.colorRanges.get(component),
        },
      })
    }

    if (actorContext.colorRangeBounds.has(component)) {
      applyColorRangeBounds(context, {
        data: {
          name: name,
          component: component,
          range: actorContext.colorRangeBounds.get(component),
        },
      })
    }

    if (actorContext.colorMaps.has(component)) {
      var colorMap = actorContext.colorMaps.get(component)
      applyColorMap(context, {
        data: {
          name: name,
          component: component,
          colorMap: colorMap,
        },
      })
      context.images.iconSelector.setSelectedValue(colorMap)
    }

    toggleShadow(context, {
      data: name,
    })
    applyGradientOpacity(context, {
      data: {
        name: name,
        gradientOpacity: actorContext.gradientOpacity,
      },
    })
    applyGradientOpacityScale(context, {
      data: {
        name: name,
        gradientOpacityScale: actorContext.gradientOpacityScale,
      },
    })
    applyVolumeSampleDistance(context, {
      data: {
        name: name,
        volumeSampleDistance: actorContext.volumeSampleDistance,
      },
    })
    applyBlendMode(context, {
      data: {
        name: name,
        blendMode: actorContext.blendMode,
      },
    })
  }
}

function applyLookupTable(context, event) {
  var name = event.data.name
  var lut = event.data.lookupTable

  if (name !== context.images.selectedName) {
    return
  }

  if (lut !== context.images.labelImageIconSelector.getSelectedValue()) {
    context.images.labelImageIconSelector.setSelectedValue(lut)
  }
}

function applyLabelImageBlend(context, event) {
  var name = event.data.name
  var actorContext = context.images.actorContext.get(name)
  var labelImageBlend = event.data.labelImageBlend
  var slider = context.images.labelImageBlendSlider
  slider.value = labelImageBlend
  var haveImage = !!actorContext.image

  if (haveImage) {
    slider.style.display = 'flex'
  } else {
    slider.style.display = 'none'
  }
}

function updateLabelImageInterface(context) {
  var name = context.images.selectedName
  var actorContext = context.images.actorContext.get(name)
  var labelImage = actorContext.labelImage

  if (labelImage) {
    applyLookupTable(context, {
      data: {
        name: name,
        lookupTable: actorContext.lookupTable,
      },
    })
    applyLabelImageBlend(context, {
      data: {
        name: name,
        labelImageBlend: actorContext.labelImageBlend,
      },
    })
  }
}

function updateRenderedImageInterface(context, event) {
  var name = event.data
  var actorContext = context.images.actorContext.get(name)
  var visualizedComponents = actorContext.visualizedComponents
  var transferFunctionWidget = context.images.transferFunctionWidget

  if (!transferFunctionWidget) {
    console.warn('No transfer function widget')
    return
  } //Apply piecewise functions

  var selectedComponent = actorContext.selectedComponent
  visualizedComponents
    .filter(function(c) {
      return c >= 0 && c !== selectedComponent
    })
    .concat([selectedComponent])
    .forEach(function(component) {
      var points = actorContext.piecewiseFunctionPoints.get(component)

      if (points) {
        transferFunctionWidget.setPoints(points)
        var dataRange = actorContext.colorRanges.get(component)
        var range = transferFunctionWidget.getOpacityRange(dataRange)
        var nodes = transferFunctionWidget.getOpacityNodes(dataRange)
        context.service.send({
          type: 'IMAGE_PIECEWISE_FUNCTION_CHANGED',
          data: {
            name: name,
            component: component,
            range: range,
            nodes: nodes,
          },
        })
      } else {
        console.warn('No transfer function points for component')
      }
    })
}

function applyHistogram(context, event) {
  var name = event.data.name
  var component = event.data.component
  var actorContext = context.images.actorContext.get(name)

  if (
    name !== context.images.selectedName ||
    component !== actorContext.selectedComponent
  ) {
    return
  }

  var histogram = event.data.histogram
  context.images.transferFunctionWidget.setHistogram(histogram)
}

function selectImageComponent(context, event) {
  context.images.componentSelector.value = event.data
  var name = event.data.name
  var actorContext = context.images.actorContext.get(name)
  var component = event.data.component
  var transferFunctionWidget = context.images.transferFunctionWidget

  if (actorContext.colorRanges.has(component)) {
    var range = actorContext.colorRanges.get(component)
    applyColorRange(context, {
      data: {
        name: name,
        component: component,
        range: range,
        dontUpdatePoints: true,
      },
    })
  }

  var piecewiseFunctionPoints = actorContext.piecewiseFunctionPoints.get(
    component
  )

  if (transferFunctionWidget && piecewiseFunctionPoints) {
    transferFunctionWidget.setPoints(piecewiseFunctionPoints)
  }

  if (actorContext.colorRangeBounds.has(component)) {
    // calls transferFunctionWidget.setDataRange(range)
    applyColorRangeBounds(context, {
      data: {
        name: name,
        component: component,
        range: actorContext.colorRangeBounds.get(component),
      },
    })
  }

  if (actorContext.colorMaps.has(component)) {
    applyColorMap(context, {
      data: {
        name: name,
        component: component,
        colorMap: actorContext.colorMaps.get(component),
      },
    })
    context.images.iconSelector.setSelectedValue(
      actorContext.colorMaps.get(component)
    )
  }

  var histogram = actorContext.histograms.get(component)

  if (histogram) {
    applyHistogram(context, {
      data: {
        name: name,
        component: component,
        histogram: histogram,
      },
    })
  } else {
    context.service.send({
      type: 'UPDATE_IMAGE_HISTOGRAM',
      data: {
        name: name,
        component: component,
      },
    })
  }
}

function applyComponentVisibility(context, event) {
  var name = event.data.name

  if (name !== context.images.selectedName) {
    return
  }

  var actorContext = context.images.actorContext.get(name)
  var componentSelector = context.images.componentSelector
  actorContext.componentVisibilities.forEach(function(visibility, compIdx) {
    var element = componentSelector.querySelector(
      'input[data-component-index="'.concat(compIdx, '"][type="checkbox"]')
    )
    element.checked = visibility
  })
}

function applyPiecewiseFunctionGaussians(context, event) {
  context.images
  var name = event.data.name
  context.images.actorContext.get(name)
  event.data.component
  var gaussians = event.data.gaussians
  var transferFunctionWidget = context.images.transferFunctionWidget
  transferFunctionWidget.setGaussians(gaussians)
}

function applyLabelImageWeights(context, event) {}

function applyLabelNames(context, event) {
  var name = event.data.name
  var actorContext = context.images.actorContext.get(name)
  var labelNames = event.data.labelNames
  var optionsList = []
  labelNames.forEach(function(name, label) {
    return optionsList.push(
      '<option '
        .concat(
          label === actorContext.selectedLabel ? 'selected' : '',
          ' value="'
        )
        .concat(label, '">')
        .concat(name, '</option>')
    )
  })
  optionsList.unshift('<option value="all">All</option>')
  context.images.labelSelector.innerHTML = optionsList.join('')
}

function applySelectedLabel(context, event) {
  var name = event.data.name
  var actorContext = context.images.actorContext.get(name)
  var selectedLabel = event.data.selectedLabel

  if (selectedLabel === 'all') {
    context.images.labelSelector.selectedIndex = 0 // 'All' is first
  } else {
    context.images.labelImageWeightSlider.value = actorContext.labelImageWeights.get(
      selectedLabel
    )
    context.images.labelSelector.selectedIndex = parseInt(selectedLabel) + 1 // 'All' is first
  }
}

function applyScaleCount(input, scaleCount) {
  input.innerHTML = '' // clear old options

  var autoPickOption = document.createElement('option')
  autoPickOption.value = 'Framerate-pick'
  autoPickOption.innerHTML = 'Framerate-pick'
  input.appendChild(autoPickOption)

  _toConsumableArray(Array(scaleCount).keys())
    .reverse()
    .forEach(function(i) {
      var option = document.createElement('option')
      option.value = i
      option.innerHTML = i
      input.appendChild(option)
    })
}

var scaleSelector = function scaleSelector(context, event) {
  return function(send, onReceive) {
    var scaleSelectorDiv = document.createElement('div')
    scaleSelectorDiv.setAttribute(
      'style',
      'display: flex; align-self: center; height: 25px; margin-right: 5px'
    )
    context.images.componentAndScale.appendChild(scaleSelectorDiv)
    scaleSelectorDiv.innerHTML = '\n    <div itk-vtk-tooltip itk-vtk-tooltip-top-screenshot itk-vtk-tooltip-content="Resolution Scale"\n      class="'
      .concat(style.blendModeButton, '">\n      <img src="')
      .concat(
        optimizedSVGDataUri$8,
        '" alt="Resolution Scale" />\n    </div>\n    '
      )
    var scaleSelectorIcon = scaleSelectorDiv.children[0]
    context.images.scaleSelectorIconDiv = scaleSelectorIcon // stash for applyImagesContrastSensitiveStyle

    applyContrastSensitiveStyleToElement(
      context,
      'invertibleButton',
      scaleSelectorIcon
    )
    var scaleSelector = document.createElement('select')
    scaleSelectorDiv.appendChild(scaleSelector)
    scaleSelector.setAttribute('style', 'max-width: 3.2ch')
    scaleSelector.setAttribute('class', style.selector)
    scaleSelector.addEventListener('change', function(event) {
      event.preventDefault()
      event.stopPropagation()
      var imageActor = context.images.imageRenderingActors.get(
        context.images.selectedName
      )

      if (event.target.value === 'Framerate-pick') {
        imageActor.send('ADJUST_SCALE_FOR_FRAMERATE')
      } else {
        imageActor.send('SET_IMAGE_SCALE', {
          targetScale: parseInt(event.target.value),
        })
      }
    })

    function onImageAssigned(name) {
      var _imageActorContext$im

      var imageActorContext = context.images.actorContext.get(name)
      var image =
        (_imageActorContext$im = imageActorContext.image) !== null &&
        _imageActorContext$im !== void 0
          ? _imageActorContext$im
          : imageActorContext.labelImage
      var scaleCount = image.scaleInfo.length

      if (scaleCount > 1) {
        scaleSelectorDiv.style.display = 'flex'
        applyScaleCount(scaleSelector, scaleCount)
      } else {
        scaleSelectorDiv.style.display = 'none'
      }
    }

    onImageAssigned(event.data)
    onReceive(function(event) {
      var type = event.type

      if (type === 'IMAGE_ASSIGNED') {
        onImageAssigned(event.data)
      } else if (type === 'RENDERED_IMAGE_ASSIGNED') {
        scaleSelector.value = event.loadedScale
      } else if (type === 'IMAGE_RENDERING_ACTIVE') {
        // set scale number after ADJUST_SCALE_FOR_FRAMERATE even if no scale change
        scaleSelector.value = context.images.actorContext.get(
          event.data.name
        ).loadedScale
      }
    })
  }
}

var imagesUIMachineOptions = {
  actions: {
    createImagesInterface: createImagesInterface,
    updateImageInterface: updateImageInterface,
    updateLabelImageInterface: updateLabelImageInterface,
    updateRenderedImageInterface: updateRenderedImageInterface,
    selectImageComponent: selectImageComponent,
    toggleInterpolation: toggleInterpolation,
    applyComponentVisibility: applyComponentVisibility,
    applyColorRange: applyColorRange,
    applyColorRangeBounds: applyColorRangeBounds,
    applyColorMap: applyColorMap,
    applyPiecewiseFunctionGaussians: applyPiecewiseFunctionGaussians,
    applyPiecewiseFunctionPointsToEditor: applyPiecewiseFunctionPointsToEditor,
    toggleShadow: toggleShadow,
    applyGradientOpacity: applyGradientOpacity,
    applyGradientOpacityScale: applyGradientOpacityScale,
    applyVolumeSampleDistance: applyVolumeSampleDistance,
    applyBlendMode: applyBlendMode,
    applyHistogram: applyHistogram,
    applyLookupTable: applyLookupTable,
    applyLabelImageBlend: applyLabelImageBlend,
    applyLabelImageWeights: applyLabelImageWeights,
    applyLabelNames: applyLabelNames,
    applySelectedLabel: applySelectedLabel,
  },
  services: {
    scaleSelector: scaleSelector,
  },
}

function createDistanceWidget(context, widgetsUIGroup) {
  var viewerDOMId = context.id // Put distance tools in their own row

  var distanceRulerRow = document.createElement('div')
  distanceRulerRow.setAttribute('class', style.uiRow)
  distanceRulerRow.style.display = context.use2D ? 'flex' : 'none'

  if (context.main.viewMode === 'Volume' && !context.use2D) {
    distanceRulerRow.style.display = 'none'
  } else {
    distanceRulerRow.style.display = 'flex'
  }

  var distanceEntry = document.createElement('div')
  distanceEntry.setAttribute('class', style.distanceEntry)
  var distanceButton = document.createElement('span')
  distanceButton.innerHTML = '<input id="'
    .concat(viewerDOMId, '-toggleDistanceButton" type="checkbox" class="')
    .concat(
      style.toggleInput,
      '" checked><label itk-vtk-tooltip itk-vtk-tooltip-top itk-vtk-tooltip-content="Length" class="'
    )
    .concat(style.distanceButton, ' ')
    .concat(style.toggleButton, '" for="')
    .concat(viewerDOMId, '-toggleDistanceButton"><img src="')
    .concat(optimizedSVGDataUri$h, '" alt="distance"/></label>')
  context.widgets.distanceButtonInput = distanceButton.children[0]
  context.widgets.distanceButtonInput.checked = context.widgets.distanceEnabled
  var distanceButtonLabel = distanceButton.children[1]
  context.widgets.distanceButtonLabel = distanceButtonLabel
  applyContrastSensitiveStyleToElement(
    context,
    'invertibleButton',
    distanceButtonLabel
  )
  distanceButton.addEventListener('change', function(event) {
    event.preventDefault()
    event.stopPropagation()
    context.service.send('TOGGLE_DISTANCE_WIDGET')
  })
  distanceEntry.appendChild(distanceButton)
  var distanceLabel = document.createElement('label')
  distanceLabel.setAttribute('class', ''.concat(style.distanceLabelCommon))
  context.widgets.distanceLabel = distanceLabel
  applyContrastSensitiveStyleToElement(context, 'distanceLabel', distanceLabel)
  distanceLabel.setAttribute('for', ''.concat(viewerDOMId, '-distanceValue'))
  distanceLabel.id = ''.concat(viewerDOMId, '-distanceLabel')
  distanceLabel.innerText = 'Length:'
  distanceEntry.appendChild(distanceLabel)
  var distanceValue = document.createElement('input')
  distanceValue.type = 'text'
  distanceValue.setAttribute('class', style.distanceInput)
  distanceValue.id = ''.concat(viewerDOMId, '-distanceValue')
  distanceValue.setAttribute('name', 'length')
  distanceValue.setAttribute('value', context.widgets.distanceValue.toString())
  distanceValue.setAttribute('disabled', true)
  context.widgets.distanceValueElement = distanceValue
  distanceEntry.appendChild(distanceValue)
  context.widgets.distanceRulerRow = distanceRulerRow
  distanceRulerRow.appendChild(distanceEntry)
  widgetsUIGroup.appendChild(distanceRulerRow)
}

function createWidgetsInterface(context) {
  var widgetsUIGroup = document.createElement('div')
  widgetsUIGroup.setAttribute('class', style.uiGroup)
  context.widgets.widgetsUIGroup = widgetsUIGroup
  context.uiGroups.set('widgets', widgetsUIGroup)
  createDistanceWidget(context, widgetsUIGroup)
  context.uiContainer.appendChild(widgetsUIGroup)
}

function viewModeXPlane(context) {
  context.widgets.distanceRulerRow.style.display = 'flex'
}

function viewModeYPlane(context) {
  context.widgets.distanceRulerRow.style.display = 'flex'
}

function viewModeZPlane(context) {
  context.widgets.distanceRulerRow.style.display = 'flex'
}

function viewModeVolume(context) {
  // Disable if in volume mode
  if (context.widgets.distanceEnabled) {
    context.service.send('TOGGLE_DISTANCE_WIDGET')
  }

  context.widgets.distanceRulerRow.style.display = 'none'
}

function toggleDistanceWidget(context) {
  context.widgets.distanceButtonInput.checked = context.widgets.distanceEnabled
}

function applyDistanceWidgetValue(context, event) {
  context.widgets.distanceValueElement.setAttribute(
    'value',
    ''.concat(event.data)
  )
}

var widgetsUIMachineOptions = {
  actions: {
    createWidgetsInterface: createWidgetsInterface,
    viewModeXPlane: viewModeXPlane,
    viewModeYPlane: viewModeYPlane,
    viewModeZPlane: viewModeZPlane,
    viewModeVolume: viewModeVolume,
    toggleDistanceWidget: toggleDistanceWidget,
    applyDistanceWidgetValue: applyDistanceWidgetValue,
  },
}

function applyMainContrastSensitiveStyle$1(context) {
  applyContrastSensitiveStyleToElement(
    context,
    'invertibleButton',
    context.main.collapseUIButton
  )
  applyContrastSensitiveStyleToElement(
    context,
    'invertibleButton',
    context.main.screenshotButton
  )

  if (context.main.fullscreenButton) {
    applyContrastSensitiveStyleToElement(
      context,
      'invertibleButton',
      context.main.fullscreenButton
    )
  }

  if (context.main.rotateButtonLabel) {
    applyContrastSensitiveStyleToElement(
      context,
      'invertibleButton',
      context.main.rotateButtonLabel
    )
  }

  applyContrastSensitiveStyleToElement(
    context,
    'invertibleButton',
    context.main.annotationsButtonLabel
  )
  applyContrastSensitiveStyleToElement(
    context,
    'invertibleButton',
    context.main.axesButtonLabel
  )
  applyContrastSensitiveStyleToElement(
    context,
    'invertibleButton',
    context.main.cropButtonLabel
  )
  applyContrastSensitiveStyleToElement(
    context,
    'invertibleButton',
    context.main.resetCropButtonLabel
  )
  applyContrastSensitiveStyleToElement(
    context,
    'invertibleButton',
    context.main.bgColorButtonLabel
  )

  if (!context.use2D) {
    applyContrastSensitiveStyleToElement(
      context,
      'tooltipButton',
      context.main.xPlaneButtonLabel
    )
    applyContrastSensitiveStyleToElement(
      context,
      'tooltipButton',
      context.main.yPlaneButtonLabel
    )
    applyContrastSensitiveStyleToElement(
      context,
      'tooltipButton',
      context.main.zPlaneButtonLabel
    )
    applyContrastSensitiveStyleToElement(
      context,
      'tooltipButton',
      context.main.volumeButtonLabel
    )
    applyContrastSensitiveStyleToElement(
      context,
      'tooltipButton',
      context.main.viewPlanesButtonLabel
    )
  }

  applyContrastSensitiveStyleToElement(
    context,
    'invertibleButton',
    context.main.resetCameraButtonLabel
  )
}

function applyLayersContrastSensitiveStyle(context) {
  context.layers.uiLayers.forEach(function(layerEntry) {
    applyContrastSensitiveStyleToElement(context, 'layerEntry', layerEntry)
    var visibleButton = layerEntry.children[0]
    var visibleLabel = visibleButton.children[1]
    applyContrastSensitiveStyleToElement(
      context,
      'invertibleButton',
      visibleLabel
    )
    var invisibleButton = layerEntry.children[1]
    var invisibleLabel = invisibleButton.children[1]
    applyContrastSensitiveStyleToElement(
      context,
      'invertibleButton',
      invisibleLabel
    )
    var layerLabel = layerEntry.children[2]
    applyContrastSensitiveStyleToElement(context, 'layerLabel', layerLabel)
    var iconElement = layerEntry.children[3]
    applyContrastSensitiveStyleToElement(
      context,
      'invertibleButton',
      iconElement
    )
  })
}

function applyImagesContrastSensitiveStyle(context) {
  if (context.images.distanceButtonLabel) {
    applyContrastSensitiveStyleToElement(
      context,
      'invertibleButton',
      context.images.distanceButtonLabel
    )
    applyContrastSensitiveStyleToElement(
      context,
      'distanceLabel',
      context.images.distanceLabel
    )
  }

  if (context.images.shadowButtonLabel) {
    applyContrastSensitiveStyleToElement(
      context,
      'invertibleButton',
      context.images.shadowButtonLabel
    )
    applyContrastSensitiveStyleToElement(
      context,
      'invertibleButton',
      context.images.sliderEntryDiv
    )
    applyContrastSensitiveStyleToElement(
      context,
      'invertibleButton',
      context.images.volumeSampleDistanceDiv
    )
    applyContrastSensitiveStyleToElement(
      context,
      'invertibleButton',
      context.images.blendModeDiv
    )
    applyContrastSensitiveStyleToElement(
      context,
      'invertibleButton',
      context.images.labelImageBlendDiv
    )
    applyContrastSensitiveStyleToElement(
      context,
      'invertibleButton',
      context.images.scaleSelectorIconDiv
    )
  }
}

function applyMainContrastSensitiveStyle(context) {
  applyContrastSensitiveStyleToElement(
    context,
    'invertibleButton',
    context.widgets.distanceButtonLabel
  )
  applyContrastSensitiveStyleToElement(
    context,
    'distanceLabel',
    context.widgets.distanceLabel
  )
}

function toggleDarkMode(context) {
  applyMainContrastSensitiveStyle$1(context)
  applyLayersContrastSensitiveStyle(context)
  applyImagesContrastSensitiveStyle(context)
  applyMainContrastSensitiveStyle(context)
}

function toggleUICollapsed(context, event, actionMeta) {
  if (!context.uiContainer) {
    return
  }

  if (actionMeta) {
    context.uiCollapsed =
      actionMeta.state.value.active.uiCollapsed === 'enabled'
  }

  if (context.uiCollapsed) {
    applyGroupVisibility(
      context,
      [
        'main',
        'layers',
        'widgets',
        'images',
        'labelImages',
        'labelImageWeights',
      ],
      !context.uiCollapsed
    )
  } else {
    applyGroupVisibility(
      context,
      ['main', 'layers', 'widgets'],
      !context.uiCollapsed
    )

    if (context.images.selectedName) {
      context.service.send({
        type: 'SELECT_LAYER',
        data: context.images.selectedName,
      })
    }
  }

  if (!context.use2D && !!context.main.planeUIGroup) {
    if (context.uiCollapsed && context.main.viewMode === 'Volume') {
      context.main.planeUIGroup.style.display = 'none'
    } else {
      context.main.planeUIGroup.style.display = 'block'
    }
  }
}

function createCollapseUIButton(context) {
  var collapseUIButton = document.createElement('div')
  collapseUIButton.className = ''.concat(style.collapseUIButton)
  applyContrastSensitiveStyleToElement(
    context,
    'invertibleButton',
    collapseUIButton
  )
  collapseUIButton.id = ''.concat(context.id, '-collapseUIButton')
  collapseUIButton.innerHTML = '<img src="'.concat(
    optimizedSVGDataUri$4,
    '" alt="toggle"/>'
  )
  toggleUICollapsed(context)
  collapseUIButton.addEventListener('click', function(event) {
    event.preventDefault()
    event.stopPropagation()
    context.service.send('TOGGLE_UI_COLLAPSED')
  })
  context.main.collapseUIButton = collapseUIButton
  context.uiContainer.appendChild(collapseUIButton)
}

function createInterface(context) {
  context.viewContainers = new Map()
  var viewContainer = document.createElement('div')
  viewContainer.className = ''.concat(style.viewContainer)
  context.viewContainers.set('volume', viewContainer)
  viewContainer.appendChild(context.renderingViewContainers.get('volume'))
  context.rootContainer.appendChild(viewContainer)

  if (!context.uiContainer) {
    var uiContainer = document.createElement('div')
    uiContainer.setAttribute('class', style.uiContainer)
    context.uiContainer = uiContainer
  }

  context.rootContainer.appendChild(context.uiContainer)

  if (!context.uiGroups) {
    // String to UI group element map
    context.uiGroups = new Map()
  }

  createCollapseUIButton(context)
}

var referenceUIMachineOptions = {
  main: mainUIMachineOptions,
  layers: layersUIMachineOptions,
  images: imagesUIMachineOptions,
  widgets: widgetsUIMachineOptions,
  actions: {
    toggleDarkMode: toggleDarkMode,
    createInterface: createInterface,
    toggleUICollapsed: toggleUICollapsed,
  },
}

export { referenceUIMachineOptions as default }
