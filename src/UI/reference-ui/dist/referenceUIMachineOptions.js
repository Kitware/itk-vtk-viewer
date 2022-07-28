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

var src$1 = bind$1.call(Function.call, Object.prototype.hasOwnProperty)

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
var hasOwn = src$1
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
        last === '"' || last === "'" || last === '`') &&
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

function ownKeys$5(object, enumerableOnly) {
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

function _objectSpread$5(target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = null != arguments[i] ? arguments[i] : {}
    i % 2
      ? ownKeys$5(Object(source), !0).forEach(function(key) {
          _defineProperty(target, key, source[key])
        })
      : Object.getOwnPropertyDescriptors
      ? Object.defineProperties(
          target,
          Object.getOwnPropertyDescriptors(source)
        )
      : ownKeys$5(Object(source)).forEach(function(key) {
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

  var model = _objectSpread$5({}, obj) // Convert into vtkObject any nested key

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

function ownKeys$4(object, enumerableOnly) {
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

function _objectSpread$4(target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = null != arguments[i] ? arguments[i] : {}
    i % 2
      ? ownKeys$4(Object(source), !0).forEach(function(key) {
          _defineProperty(target, key, source[key])
        })
      : Object.getOwnPropertyDescriptors
      ? Object.defineProperties(
          target,
          Object.getOwnPropertyDescriptors(source)
        )
      : ownKeys$4(Object(source)).forEach(function(key) {
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
function vtkDebugMacro$1() {
  loggerFunctions.debug.apply(loggerFunctions, arguments)
}
function vtkErrorMacro$2() {
  loggerFunctions.error.apply(loggerFunctions, arguments)
}
function vtkWarningMacro$1() {
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
      vtkErrorMacro$2('instance deleted - cannot call any method')
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
      vtkErrorMacro$2('instance deleted - cannot call any method')
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
          vtkWarningMacro$1(
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

    var jsonArchive = _objectSpread$4(
      _objectSpread$4({}, model),
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
          vtkDebugMacro$1('add '.concat(key, ' in shallowCopy'))
        }
      } else {
        keyList.splice(keyIdx, 1)
      }

      model[key] = otherModel[key]
    })

    if (keyList.length && debug) {
      vtkDebugMacro$1('Untouched keys: '.concat(keyList.join(', ')))
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

        vtkErrorMacro$2(
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

          vtkErrorMacro$2(
            'Set Enum outside numeric range '.concat(field, ', ').concat(value)
          )
          throw new RangeError('Set Enum outside numeric range')
        }

        return false
      }

      vtkErrorMacro$2(
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

    vtkErrorMacro$2('No setter for field '.concat(field))
    throw new TypeError('No setter for field')
  }

  return function getSetter(publicAPI, model) {
    return function setter(value) {
      if (model.deleted) {
        vtkErrorMacro$2('instance deleted - cannot call any method')
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
        vtkErrorMacro$2('instance deleted - cannot call any method')
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
      vtkErrorMacro$2('instance deleted - cannot call any method')
      return
    }

    if (port >= model.numberOfInputs) {
      vtkErrorMacro$2(
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
      vtkErrorMacro$2('instance deleted - cannot call any method')
      return
    }

    if (port >= model.numberOfInputs) {
      var msg = 'algorithm '.concat(publicAPI.getClassName(), ' only has ')
      msg += ''.concat(model.numberOfInputs)
      msg += ' input ports. To add more input ports, use addInputConnection()'
      vtkErrorMacro$2(msg)
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
      vtkErrorMacro$2('instance deleted - cannot call any method')
      return
    }

    setInputConnection(outputPort, getPortToFill())
  }

  function addInputData(dataset) {
    if (model.deleted) {
      vtkErrorMacro$2('instance deleted - cannot call any method')
      return
    }

    setInputData(dataset, getPortToFill())
  }

  function getOutputData() {
    var port =
      arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0

    if (model.deleted) {
      vtkErrorMacro$2('instance deleted - cannot call any method')
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
      vtkErrorMacro$2('instance deleted - cannot call any method')
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
      vtkErrorMacro$2('instance deleted - cannot call any method')
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

function newInstance$7(extend, className) {
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
      propertyMap[propertyName] = _objectSpread$4({}, propUI)
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
  newInstance: newInstance$7,
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
  vtkDebugMacro: vtkDebugMacro$1,
  vtkErrorMacro: vtkErrorMacro$2,
  vtkInfoMacro: vtkInfoMacro,
  vtkLogMacro: vtkLogMacro,
  vtkOnceErrorMacro: vtkOnceErrorMacro,
  vtkWarningMacro: vtkWarningMacro$1,
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

var vtkColorMaps$1 = [
  {
    Name: 'KAAMS',
    IndexedColors: [
      1,
      1,
      1,
      1,
      0,
      0,
      0,
      1,
      0,
      0,
      0,
      1,
      1,
      1,
      0,
      1,
      0,
      1,
      0,
      1,
      1,
      0.63,
      0.63,
      1,
      0.67,
      0.5,
      0.33,
      1,
      0.5,
      0.75,
      0.53,
      0.35,
      0.7,
      1,
      0.75,
      0.5,
    ],
    Annotations: [
      0,
      0,
      1,
      1,
      2,
      2,
      3,
      3,
      4,
      4,
      5,
      5,
      6,
      6,
      7,
      7,
      8,
      8,
      9,
      9,
      10,
      10,
      11,
      11,
    ],
  },
  {
    ColorSpace: 'Diverging',
    Name: 'Cool to Warm',
    NanColor: [1, 1, 0],
    RGBPoints: [
      0,
      0.23137254902,
      0.298039215686,
      0.752941176471,
      0.5,
      0.865,
      0.865,
      0.865,
      1,
      0.705882352941,
      0.0156862745098,
      0.149019607843,
    ],
  },
  {
    ColorSpace: 'Lab',
    Creator: 'Francesca Samsel',
    Name: 'Cool to Warm (Extended)',
    NanColor: [0.25, 0, 0],
    RGBPoints: [
      0,
      0,
      0,
      0.34902,
      0.03125,
      0.039216,
      0.062745,
      0.380392,
      0.0625,
      0.062745,
      0.117647,
      0.411765,
      0.09375,
      0.090196,
      0.184314,
      0.45098,
      0.125,
      0.12549,
      0.262745,
      0.501961,
      0.15625,
      0.160784,
      0.337255,
      0.541176,
      0.1875,
      0.2,
      0.396078,
      0.568627,
      0.21875,
      0.239216,
      0.454902,
      0.6,
      0.25,
      0.286275,
      0.521569,
      0.65098,
      0.28125,
      0.337255,
      0.592157,
      0.701961,
      0.3125,
      0.388235,
      0.654902,
      0.74902,
      0.34375,
      0.466667,
      0.737255,
      0.819608,
      0.375,
      0.572549,
      0.819608,
      0.878431,
      0.40625,
      0.654902,
      0.866667,
      0.909804,
      0.4375,
      0.752941,
      0.917647,
      0.941176,
      0.46875,
      0.823529,
      0.956863,
      0.968627,
      0.5,
      0.988235,
      0.960784,
      0.901961,
      0.5,
      0.941176,
      0.984314,
      0.988235,
      0.52,
      0.988235,
      0.945098,
      0.85098,
      0.54,
      0.980392,
      0.898039,
      0.784314,
      0.5625,
      0.968627,
      0.835294,
      0.698039,
      0.59375,
      0.94902,
      0.733333,
      0.588235,
      0.625,
      0.929412,
      0.65098,
      0.509804,
      0.65625,
      0.909804,
      0.564706,
      0.435294,
      0.6875,
      0.878431,
      0.458824,
      0.352941,
      0.71875,
      0.839216,
      0.388235,
      0.286275,
      0.75,
      0.760784,
      0.294118,
      0.211765,
      0.78125,
      0.701961,
      0.211765,
      0.168627,
      0.8125,
      0.65098,
      0.156863,
      0.129412,
      0.84375,
      0.6,
      0.094118,
      0.094118,
      0.875,
      0.54902,
      0.066667,
      0.098039,
      0.90625,
      0.501961,
      0.05098,
      0.12549,
      0.9375,
      0.45098,
      0.054902,
      0.172549,
      0.96875,
      0.4,
      0.054902,
      0.192157,
      1,
      0.34902,
      0.070588,
      0.211765,
    ],
  },
  {
    ColorSpace: 'Diverging',
    Name: 'Warm to Cool',
    NanColor: [1, 1, 0],
    RGBPoints: [
      0,
      0.705882352941,
      0.0156862745098,
      0.149019607843,
      0.5,
      0.865,
      0.865,
      0.865,
      1,
      0.23137254902,
      0.298039215686,
      0.752941176471,
    ],
  },
  {
    ColorSpace: 'Lab',
    Creator: 'Francesca Samsel',
    Name: 'Warm to Cool (Extended)',
    NanColor: [0.250004, 0, 0],
    RGBPoints: [
      0,
      0.34902,
      0,
      0.129412,
      0.025,
      0.4,
      0.00392157,
      0.101961,
      0.05,
      0.470588,
      0.0156863,
      0.0901961,
      0.075,
      0.54902,
      0.027451,
      0.0705882,
      0.1,
      0.619608,
      0.0627451,
      0.0431373,
      0.125,
      0.690196,
      0.12549,
      0.0627451,
      0.15,
      0.741176,
      0.184314,
      0.0745098,
      0.175,
      0.788235,
      0.266667,
      0.0941176,
      0.2,
      0.811765,
      0.345098,
      0.113725,
      0.225,
      0.831373,
      0.411765,
      0.133333,
      0.25,
      0.85098,
      0.47451,
      0.145098,
      0.275,
      0.870588,
      0.54902,
      0.156863,
      0.3,
      0.878431,
      0.619608,
      0.168627,
      0.325,
      0.890196,
      0.658824,
      0.196078,
      0.35,
      0.909804,
      0.717647,
      0.235294,
      0.375,
      0.929412,
      0.776471,
      0.278431,
      0.395522,
      0.94902,
      0.823529,
      0.321569,
      0.418905,
      0.968627,
      0.87451,
      0.407843,
      0.444278,
      0.980392,
      0.917647,
      0.509804,
      0.470149,
      0.988235,
      0.956863,
      0.643137,
      0.483582,
      0.992157,
      0.964706,
      0.713725,
      0.499,
      0.988235,
      0.980392,
      0.870588,
      0.5,
      1,
      1,
      1,
      0.501,
      0.913725,
      0.988235,
      0.937255,
      0.516418,
      0.827451,
      0.980392,
      0.886275,
      0.531343,
      0.764706,
      0.980392,
      0.866667,
      0.546766,
      0.658824,
      0.980392,
      0.843137,
      0.564179,
      0.572549,
      0.964706,
      0.835294,
      0.587562,
      0.423529,
      0.941176,
      0.87451,
      0.60597,
      0.262745,
      0.901961,
      0.862745,
      0.629851,
      0.0705882,
      0.854902,
      0.870588,
      0.651741,
      0.0509804,
      0.8,
      0.85098,
      0.681592,
      0.0235294,
      0.709804,
      0.831373,
      0.712935,
      0.0313725,
      0.615686,
      0.811765,
      0.75,
      0.0313725,
      0.537255,
      0.788235,
      0.775,
      0.0392157,
      0.466667,
      0.768627,
      0.8,
      0.0509804,
      0.396078,
      0.741176,
      0.825,
      0.054902,
      0.317647,
      0.709804,
      0.85,
      0.054902,
      0.243137,
      0.678431,
      0.875,
      0.0431373,
      0.164706,
      0.639216,
      0.9,
      0.0313725,
      0.0980392,
      0.6,
      0.925,
      0.0392157,
      0.0392157,
      0.560784,
      0.95,
      0.105882,
      0.0509804,
      0.509804,
      0.975,
      0.113725,
      0.0235294,
      0.45098,
      1,
      0.12549,
      0,
      0.380392,
    ],
  },
  {
    ColorSpace: 'RGB',
    Name: 'Rainbow Desaturated',
    NanColor: [1, 1, 0],
    RGBPoints: [
      0,
      0.278431372549,
      0.278431372549,
      0.858823529412,
      0.143,
      0,
      0,
      0.360784313725,
      0.285,
      0,
      1,
      1,
      0.429,
      0,
      0.501960784314,
      0,
      0.571,
      1,
      1,
      0,
      0.714,
      1,
      0.380392156863,
      0,
      0.857,
      0.419607843137,
      0,
      0,
      1,
      0.878431372549,
      0.301960784314,
      0.301960784314,
    ],
  },
  {
    ColorSpace: 'RGB',
    Name: 'Cold and Hot',
    NanColor: [1, 1, 0],
    RGBPoints: [
      0,
      0,
      1,
      1,
      0.45,
      0,
      0,
      1,
      0.5,
      0,
      0,
      0.501960784314,
      0.55,
      1,
      0,
      0,
      1,
      1,
      1,
      0,
    ],
  },
  {
    ColorSpace: 'RGB',
    Name: 'Black-Body Radiation',
    NanColor: [0, 0.498039215686, 1],
    RGBPoints: [
      0,
      0,
      0,
      0,
      0.4,
      0.901960784314,
      0,
      0,
      0.8,
      0.901960784314,
      0.901960784314,
      0,
      1,
      1,
      1,
      1,
    ],
  },
  {
    ColorSpace: 'RGB',
    Name: 'X Ray',
    NanColor: [1, 0, 0],
    RGBPoints: [0, 1, 1, 1, 1, 0, 0, 0],
  },
  {
    ColorSpace: 'RGB',
    Name: 'Grayscale',
    NanColor: [1, 0, 0],
    RGBPoints: [0, 0, 0, 0, 1, 1, 1, 1],
  },
  {
    ColorSpace: 'RGB',
    Name: 'BkRd',
    NanColor: [0, 1, 1],
    RGBPoints: [0, 0, 0, 0, 1, 1, 0, 0],
  },
  {
    ColorSpace: 'RGB',
    Name: 'BkGn',
    NanColor: [1, 0, 1],
    RGBPoints: [0, 0, 0, 0, 1, 0, 1, 0],
  },
  {
    ColorSpace: 'RGB',
    Name: 'BkBu',
    NanColor: [1, 1, 0],
    RGBPoints: [0, 0, 0, 0, 1, 0, 0, 1],
  },
  {
    ColorSpace: 'RGB',
    Name: 'BkMa',
    NanColor: [0, 1, 0],
    RGBPoints: [0, 0, 0, 0, 1, 1, 0, 1],
  },
  {
    ColorSpace: 'RGB',
    Name: 'BkCy',
    NanColor: [0, 1, 1],
    RGBPoints: [0, 0, 0, 0, 1, 0, 1, 1],
  },
  {
    ColorSpace: 'RGB',
    Name: 'Black, Blue and White',
    NanColor: [1, 1, 0],
    RGBPoints: [
      0,
      0,
      0,
      0,
      0.333,
      0,
      0,
      0.501960784314,
      0.666,
      0,
      0.501960784314,
      1,
      1,
      1,
      1,
      1,
    ],
  },
  {
    ColorSpace: 'RGB',
    Name: 'Black, Orange and White',
    NanColor: [1, 1, 0],
    RGBPoints: [
      0,
      0,
      0,
      0,
      0.333,
      0.501960784314,
      0,
      0,
      0.666,
      1,
      0.501960784314,
      0,
      1,
      1,
      1,
      1,
    ],
  },
  {
    ColorSpace: 'Lab',
    Creator: 'Francesca Samsel',
    Name: 'Linear YGB 1211g',
    NanColor: [0.25, 0, 0],
    RGBPoints: [
      0,
      1,
      0.988235,
      0.968627,
      0.02,
      1,
      0.952941,
      0.878431,
      0.05,
      0.968627,
      0.905882,
      0.776471,
      0.1,
      0.94902,
      0.898039,
      0.647059,
      0.15,
      0.901961,
      0.878431,
      0.556863,
      0.2,
      0.847059,
      0.858824,
      0.482353,
      0.25,
      0.690196,
      0.819608,
      0.435294,
      0.3,
      0.513725,
      0.768627,
      0.384314,
      0.35,
      0.337255,
      0.721569,
      0.337255,
      0.4,
      0.278431,
      0.658824,
      0.392157,
      0.45,
      0.231373,
      0.639216,
      0.435294,
      0.5,
      0.203922,
      0.6,
      0.486275,
      0.55,
      0.172549,
      0.568627,
      0.537255,
      0.6,
      0.141176,
      0.517647,
      0.54902,
      0.65,
      0.133333,
      0.458824,
      0.541176,
      0.7,
      0.12549,
      0.396078,
      0.529412,
      0.75,
      0.117647,
      0.321569,
      0.521569,
      0.8,
      0.121569,
      0.258824,
      0.509804,
      0.85,
      0.133333,
      0.227451,
      0.501961,
      0.9,
      0.145098,
      0.192157,
      0.490196,
      0.95,
      0.188235,
      0.164706,
      0.470588,
      1,
      0.258824,
      0.196078,
      0.439216,
    ],
  },
  {
    ColorSpace: 'CIELAB',
    Creator: 'Francesca Samsel',
    Name: 'Linear Green (Gr4L)',
    NanColor: [0.25, 0, 0],
    RGBPoints: [
      0,
      0.054902,
      0.109804,
      0.121569,
      0.05,
      0.07451,
      0.172549,
      0.180392,
      0.1,
      0.086275,
      0.231373,
      0.219608,
      0.15,
      0.094118,
      0.278431,
      0.25098,
      0.2,
      0.109804,
      0.34902,
      0.278431,
      0.25,
      0.113725,
      0.4,
      0.278431,
      0.3,
      0.117647,
      0.45098,
      0.270588,
      0.35,
      0.117647,
      0.490196,
      0.243137,
      0.4,
      0.113725,
      0.521569,
      0.203922,
      0.45,
      0.109804,
      0.54902,
      0.152941,
      0.5,
      0.082353,
      0.588235,
      0.082353,
      0.55,
      0.109804,
      0.631373,
      0.05098,
      0.6,
      0.211765,
      0.678431,
      0.082353,
      0.65,
      0.317647,
      0.721569,
      0.113725,
      0.7,
      0.431373,
      0.760784,
      0.160784,
      0.75,
      0.556863,
      0.8,
      0.239216,
      0.8,
      0.666667,
      0.839216,
      0.294118,
      0.85,
      0.784314,
      0.878431,
      0.396078,
      0.9,
      0.886275,
      0.921569,
      0.533333,
      0.95,
      0.960784,
      0.94902,
      0.670588,
      1,
      1,
      0.984314,
      0.901961,
    ],
  },
  {
    ColorSpace: 'Lab',
    Creator: 'Francesca Samsel',
    Name: 'Linear Blue (8_31f)',
    NanColor: [0.25, 0, 0],
    RGBPoints: [
      0,
      0.960784,
      1,
      0.980392,
      0.05,
      0.815686,
      0.960784,
      0.913725,
      0.1,
      0.670588,
      0.929412,
      0.870588,
      0.15,
      0.556863,
      0.901961,
      0.843137,
      0.2,
      0.478431,
      0.870588,
      0.823529,
      0.25,
      0.439216,
      0.831373,
      0.803922,
      0.3,
      0.4,
      0.8,
      0.788235,
      0.35,
      0.376471,
      0.768627,
      0.768627,
      0.4,
      0.34902,
      0.709804,
      0.729412,
      0.45,
      0.32549,
      0.654902,
      0.690196,
      0.5,
      0.301961,
      0.607843,
      0.658824,
      0.55,
      0.247059,
      0.545098,
      0.619608,
      0.6,
      0.239216,
      0.494118,
      0.580392,
      0.65,
      0.227451,
      0.439216,
      0.541176,
      0.7,
      0.227451,
      0.403922,
      0.521569,
      0.75,
      0.231373,
      0.368627,
      0.501961,
      0.8,
      0.227451,
      0.321569,
      0.470588,
      0.85,
      0.219608,
      0.282353,
      0.439216,
      0.9,
      0.192157,
      0.235294,
      0.4,
      0.95,
      0.160784,
      0.184314,
      0.34902,
      1,
      0.133333,
      0.12549,
      0.301961,
    ],
  },
  {
    ColorSpace: 'HSV',
    Name: 'Blue to Red Rainbow',
    NanColor: [0.498039215686, 0.498039215686, 0.498039215686],
    RGBPoints: [0, 0, 0, 1, 1, 1, 0, 0],
  },
  {
    ColorSpace: 'HSV',
    Name: 'Red to Blue Rainbow',
    NanColor: [0.498039215686, 0.498039215686, 0.498039215686],
    RGBPoints: [0, 1, 0, 0, 1, 0, 0, 1],
  },
  {
    ColorSpace: 'RGB',
    Name: 'Rainbow Blended White',
    NanColor: [1, 1, 0],
    RGBPoints: [
      0,
      1,
      1,
      1,
      0.17,
      0,
      0,
      1,
      0.34,
      0,
      1,
      1,
      0.5,
      0,
      1,
      0,
      0.67,
      1,
      1,
      0,
      0.84,
      1,
      0,
      0,
      1,
      0.878431372549,
      0,
      1,
    ],
  },
  {
    ColorSpace: 'RGB',
    Name: 'Rainbow Blended Grey',
    NanColor: [1, 1, 0],
    RGBPoints: [
      0,
      0.317647058824,
      0.341176470588,
      0.43137254902,
      0.17,
      0,
      0,
      1,
      0.34,
      0,
      1,
      1,
      0.5,
      0,
      1,
      0,
      0.67,
      1,
      1,
      0,
      0.84,
      1,
      0,
      0,
      1,
      0.878431372549,
      0,
      1,
    ],
  },
  {
    ColorSpace: 'RGB',
    Name: 'Rainbow Blended Black',
    NanColor: [1, 1, 0],
    RGBPoints: [
      0,
      0,
      0,
      0,
      0.17,
      0,
      0,
      1,
      0.34,
      0,
      1,
      1,
      0.5,
      0,
      1,
      0,
      0.67,
      1,
      1,
      0,
      0.84,
      1,
      0,
      0,
      1,
      0.878431372549,
      0,
      1,
    ],
  },
  {
    ColorSpace: 'RGB',
    Name: 'Blue to Yellow',
    NanColor: [1, 0, 0],
    RGBPoints: [
      0,
      0.0392156862745,
      0.0392156862745,
      0.949019607843,
      1,
      0.949019607843,
      0.949019607843,
      0.0392156862745,
    ],
  },
  {
    ColorSpace: 'HSV',
    Name: 'blot',
    RGBPoints: [
      0,
      0,
      0,
      1,
      0.166,
      0,
      0,
      1,
      0.167,
      1,
      0,
      1,
      0.332,
      1,
      0,
      1,
      0.333,
      0,
      1,
      1,
      0.5,
      0,
      1,
      1,
      0.501,
      0,
      1,
      0,
      0.666,
      0,
      1,
      0,
      0.667,
      1,
      1,
      0,
      0.832,
      1,
      1,
      0,
      0.833,
      1,
      0,
      0,
      1,
      1,
      0,
      0,
    ],
  },
  {
    ColorSpace: 'Lab',
    Name: 'CIELab Blue to Red',
    NanColor: [1, 1, 0],
    RGBPoints: [
      0,
      0,
      0.6,
      0.749019607843,
      1,
      0.76862745098,
      0.466666666667,
      0.341176470588,
    ],
  },
  {
    ColorSpace: 'RGB',
    Name: 'jet',
    RGBPoints: [
      -1,
      0,
      0,
      0.5625,
      -0.777778,
      0,
      0,
      1,
      -0.269841,
      0,
      1,
      1,
      -0.015873,
      0.5,
      1,
      0.5,
      0.238095,
      1,
      1,
      0,
      0.746032,
      1,
      0,
      0,
      1,
      0.5,
      0,
      0,
    ],
  },
  {
    ColorSpace: 'RGB',
    Name: 'rainbow',
    RGBPoints: [
      -1,
      0,
      0,
      1,
      -0.5,
      0,
      1,
      1,
      0,
      0,
      1,
      0,
      0.5,
      1,
      1,
      0,
      1,
      1,
      0,
      0,
    ],
  },
  {
    ColorSpace: 'Lab',
    Name: 'erdc_rainbow_bright',
    RGBPoints: [
      -1,
      0.32549,
      0.14902,
      0.960784,
      -0.866221,
      0.297047,
      0.375586,
      0.963836,
      -0.732441,
      0.180302,
      0.536818,
      0.964627,
      -0.598662,
      0.1302,
      0.649207,
      0.929647,
      -0.464883,
      0.0445143,
      0.749654,
      0.855998,
      -0.331104,
      0.0271325,
      0.830713,
      0.721527,
      -0.197324,
      0.259504,
      0.866145,
      0.543555,
      -0.0635452,
      0.428364,
      0.890725,
      0.329819,
      0.0702341,
      0.568503,
      0.898508,
      0.187623,
      0.204013,
      0.738259,
      0.890317,
      0.0825461,
      0.337793,
      0.84546,
      0.86136,
      0.0147555,
      0.471572,
      0.912191,
      0.808018,
      0,
      0.605351,
      0.962848,
      0.710445,
      0,
      0.73913,
      0.999469,
      0.600258,
      0.0176284,
      0.87291,
      0.994156,
      0.445975,
      0.193912,
      1,
      0.980407,
      0.247105,
      0.262699,
    ],
  },
  {
    ColorSpace: 'Lab',
    Name: 'erdc_rainbow_dark',
    RGBPoints: [
      -1,
      0,
      0,
      0.423499,
      -0.866221,
      0,
      0.119346,
      0.529237,
      -0.732441,
      0,
      0.238691,
      0.634976,
      -0.598662,
      0,
      0.346852,
      0.68788,
      -0.464883,
      0,
      0.45022,
      0.718141,
      -0.331104,
      0,
      0.553554,
      0.664839,
      -0.197324,
      0,
      0.651082,
      0.519303,
      -0.0635452,
      0.115841,
      0.72479,
      0.352857,
      0.0702341,
      0.326771,
      0.781195,
      0.140187,
      0.204013,
      0.522765,
      0.798524,
      0.0284624,
      0.337793,
      0.703162,
      0.788685,
      0.00885756,
      0.471572,
      0.845118,
      0.751133,
      0,
      0.605351,
      0.955734,
      0.690825,
      0,
      0.73913,
      0.995402,
      0.567916,
      0.0618524,
      0.87291,
      0.987712,
      0.403398,
      0.164851,
      1,
      0.980407,
      0.247105,
      0.262699,
    ],
  },
  {
    ColorSpace: 'Lab',
    Name: 'nic_CubicL',
    RGBPoints: [
      -1,
      0.479965,
      0.0118108,
      0.5307,
      -0.87451,
      0.522213,
      0.0551282,
      0.706919,
      -0.74902,
      0.50839,
      0.237278,
      0.867764,
      -0.623529,
      0.451617,
      0.373834,
      0.987255,
      -0.498039,
      0.39365,
      0.497255,
      0.97506,
      -0.372549,
      0.328631,
      0.599639,
      0.891843,
      -0.247059,
      0.250043,
      0.690286,
      0.778553,
      -0.121569,
      0.249656,
      0.764905,
      0.645857,
      0.00392157,
      0.297954,
      0.821466,
      0.50449,
      0.129412,
      0.337509,
      0.872595,
      0.358447,
      0.254902,
      0.430011,
      0.913789,
      0.297079,
      0.380392,
      0.587191,
      0.931381,
      0.333353,
      0.505882,
      0.727937,
      0.93591,
      0.353742,
      0.631373,
      0.826403,
      0.921081,
      0.365066,
      0.756863,
      0.893201,
      0.846317,
      0.372662,
      0.882353,
      0.965347,
      0.73884,
      0.378506,
      1,
      0.983235,
      0.597451,
      0.366856,
    ],
  },
  {
    ColorSpace: 'Lab',
    Name: 'nic_CubicYF',
    RGBPoints: [
      -1,
      0.5151,
      0.0482,
      0.6697,
      -0.87451,
      0.520711,
      0.168955,
      0.800574,
      -0.74902,
      0.493694,
      0.278596,
      0.911824,
      -0.623529,
      0.440026,
      0.369475,
      0.984978,
      -0.498039,
      0.398932,
      0.457593,
      0.987053,
      -0.372549,
      0.350651,
      0.540644,
      0.929608,
      -0.247059,
      0.298827,
      0.615625,
      0.857729,
      -0.121569,
      0.239928,
      0.685061,
      0.769531,
      0.00392157,
      0.228832,
      0.739349,
      0.673287,
      0.129412,
      0.263297,
      0.78608,
      0.569988,
      0.254902,
      0.298107,
      0.828337,
      0.460214,
      0.380392,
      0.33092,
      0.864071,
      0.352674,
      0.505882,
      0.38306,
      0.898169,
      0.287309,
      0.631373,
      0.49023,
      0.917481,
      0.307961,
      0.756863,
      0.62372,
      0.926026,
      0.332309,
      0.882353,
      0.717458,
      0.92527,
      0.342476,
      1,
      0.8,
      0.9255,
      0.3529,
    ],
  },
  {
    ColorSpace: 'Lab',
    Name: 'gist_earth',
    RGBPoints: [
      -1,
      0,
      0,
      0,
      -0.87451,
      0.239216,
      0.027451,
      0.415686,
      -0.74902,
      0.0901961,
      0.254902,
      0.556863,
      -0.623529,
      0.0941176,
      0.352941,
      0.54902,
      -0.498039,
      0.105882,
      0.435294,
      0.533333,
      -0.372549,
      0.12549,
      0.52549,
      0.501961,
      -0.247059,
      0.156863,
      0.596078,
      0.443137,
      -0.121569,
      0.196078,
      0.65098,
      0.380392,
      0.00392157,
      0.282353,
      0.717647,
      0.301961,
      0.129412,
      0.466667,
      0.772549,
      0.27451,
      0.254902,
      0.678431,
      0.784314,
      0.309804,
      0.380392,
      0.901961,
      0.756863,
      0.376471,
      0.505882,
      0.992157,
      0.705882,
      0.521569,
      0.631373,
      1,
      0.721569,
      0.701961,
      0.756863,
      1,
      0.784314,
      0.784314,
      0.882353,
      1,
      0.866667,
      0.866667,
      1,
      1,
      1,
      1,
    ],
  },
  {
    ColorSpace: 'Lab',
    Name: '2hot',
    RGBPoints: [
      -1,
      0.0416667,
      0,
      0,
      -0.873016,
      0.208333,
      0,
      0,
      -0.746032,
      0.375,
      0,
      0,
      -0.619048,
      0.541667,
      0,
      0,
      -0.492063,
      0.708333,
      0,
      0,
      -0.365079,
      0.854137,
      0,
      0,
      -0.238095,
      0.937488,
      0.039062,
      0,
      -0.111111,
      1,
      0.208333,
      0,
      0.015873,
      1,
      0.375,
      0,
      0.142857,
      1,
      0.541667,
      0,
      0.269841,
      1,
      0.708333,
      0,
      0.396825,
      1,
      0.858805,
      0.03125,
      0.52381,
      1,
      0.947392,
      0.15625,
      0.650794,
      1,
      1,
      0.3125,
      0.777778,
      1,
      1,
      0.5625,
      0.904762,
      1,
      1,
      0.8125,
      1,
      1,
      1,
      1,
    ],
  },
  {
    ColorSpace: 'Lab',
    Name: 'erdc_red2yellow_BW',
    RGBPoints: [
      -1,
      7.54296e-7,
      0,
      0.0000109827,
      -0.87451,
      0.18285,
      0.0264094,
      0,
      -0.74902,
      0.3066,
      0,
      0,
      -0.623529,
      0.422841,
      0,
      0,
      -0.498039,
      0.522945,
      0,
      0,
      -0.372549,
      0.605721,
      0,
      0,
      -0.247059,
      0.672502,
      0.14168,
      0,
      -0.121569,
      0.728167,
      0.244025,
      0,
      0.00392157,
      0.781215,
      0.333454,
      0,
      0.129412,
      0.825,
      0.423586,
      0,
      0.254902,
      0.855893,
      0.516793,
      0,
      0.380392,
      0.880491,
      0.608846,
      0,
      0.505882,
      0.910305,
      0.695505,
      0,
      0.631373,
      0.94109,
      0.779067,
      0.223528,
      0.756863,
      0.967873,
      0.858572,
      0.473521,
      0.882353,
      0.986815,
      0.933211,
      0.751583,
      1,
      1,
      1,
      0.999997,
    ],
  },
  {
    ColorSpace: 'Lab',
    Name: 'erdc_marine2gold_BW',
    RGBPoints: [
      -1,
      1.11641e-7,
      0,
      0.00000162551,
      -0.87451,
      0.0413146,
      0.0619808,
      0.209857,
      -0.74902,
      0.0185557,
      0.101341,
      0.350684,
      -0.623529,
      0.00486405,
      0.149847,
      0.461054,
      -0.498039,
      0.0836345,
      0.210845,
      0.517906,
      -0.372549,
      0.173222,
      0.276134,
      0.541793,
      -0.247059,
      0.259857,
      0.343877,
      0.535869,
      -0.121569,
      0.362299,
      0.408124,
      0.504293,
      0.00392157,
      0.468266,
      0.468276,
      0.468257,
      0.129412,
      0.582781,
      0.527545,
      0.374914,
      0.254902,
      0.691591,
      0.585251,
      0.274266,
      0.380392,
      0.784454,
      0.645091,
      0.247332,
      0.505882,
      0.862299,
      0.710383,
      0.27518,
      0.631373,
      0.920863,
      0.782923,
      0.351563,
      0.756863,
      0.955792,
      0.859699,
      0.533541,
      0.882353,
      0.976162,
      0.93433,
      0.780671,
      1,
      1,
      1,
      0.999983,
    ],
  },
  {
    ColorSpace: 'Lab',
    Name: 'erdc_blue2gold_BW',
    RGBPoints: [
      -1,
      0,
      0,
      0,
      -0.87451,
      0.0742735,
      0.0440331,
      0.230013,
      -0.74902,
      0.125276,
      0.0258685,
      0.415826,
      -0.623529,
      0.143879,
      0.0163031,
      0.591346,
      -0.498039,
      0.212261,
      0.0627855,
      0.705239,
      -0.372549,
      0.306048,
      0.141178,
      0.763636,
      -0.247059,
      0.391537,
      0.232286,
      0.773263,
      -0.121569,
      0.461734,
      0.336633,
      0.708321,
      0.00392157,
      0.54209,
      0.427581,
      0.590007,
      0.129412,
      0.61704,
      0.508623,
      0.460978,
      0.254902,
      0.702703,
      0.579586,
      0.309117,
      0.380392,
      0.790336,
      0.644811,
      0.170397,
      0.505882,
      0.870173,
      0.710733,
      0.117134,
      0.631373,
      0.93656,
      0.781991,
      0.157144,
      0.756863,
      0.965672,
      0.862068,
      0.409836,
      0.882353,
      0.985751,
      0.936296,
      0.714162,
      1,
      1,
      1,
      0.999999,
    ],
  },
  {
    ColorSpace: 'Lab',
    Name: 'erdc_sapphire2gold_BW',
    RGBPoints: [
      -1,
      0.107704,
      0.107708,
      0.107694,
      -0.87451,
      0.1851,
      0.112354,
      0.308554,
      -0.74902,
      0.236782,
      0.114233,
      0.48788,
      -0.623529,
      0.28296,
      0.126187,
      0.639464,
      -0.498039,
      0.344787,
      0.171643,
      0.739713,
      -0.372549,
      0.413325,
      0.242371,
      0.76913,
      -0.247059,
      0.481863,
      0.3131,
      0.719841,
      -0.121569,
      0.550402,
      0.383829,
      0.612222,
      0.00392157,
      0.61894,
      0.454558,
      0.51126,
      0.129412,
      0.687478,
      0.525287,
      0.39993,
      0.254902,
      0.756017,
      0.596016,
      0.289923,
      0.380392,
      0.824555,
      0.666745,
      0.255498,
      0.505882,
      0.892979,
      0.736822,
      0.27696,
      0.631373,
      0.938851,
      0.804966,
      0.351734,
      0.756863,
      0.966491,
      0.874853,
      0.53572,
      0.882353,
      0.982105,
      0.94153,
      0.782579,
      1,
      1,
      1,
      0.999986,
    ],
  },
  {
    ColorSpace: 'Lab',
    Name: 'erdc_red2purple_BW',
    RGBPoints: [
      -1,
      0,
      0,
      0,
      -0.87451,
      0.167793,
      0.0166271,
      0.0431278,
      -0.74902,
      0.262608,
      0.0107595,
      0.0791181,
      -0.623529,
      0.351902,
      0.0101858,
      0.100926,
      -0.498039,
      0.441257,
      0.0160835,
      0.131919,
      -0.372549,
      0.5221,
      0.0555972,
      0.195625,
      -0.247059,
      0.593852,
      0.104294,
      0.310234,
      -0.121569,
      0.654628,
      0.158115,
      0.448486,
      0.00392157,
      0.707443,
      0.220914,
      0.570253,
      0.129412,
      0.749504,
      0.293268,
      0.67897,
      0.254902,
      0.781587,
      0.370517,
      0.779269,
      0.380392,
      0.809951,
      0.451099,
      0.855831,
      0.505882,
      0.84424,
      0.531462,
      0.900451,
      0.631373,
      0.865174,
      0.620901,
      0.91606,
      0.756863,
      0.875041,
      0.714054,
      0.910284,
      0.882353,
      0.880764,
      0.80554,
      0.896276,
      1,
      0.887572,
      0.887591,
      0.887556,
    ],
  },
  {
    ColorSpace: 'Lab',
    Name: 'erdc_purple2pink_BW',
    RGBPoints: [
      -1,
      0,
      0,
      0,
      -0.87451,
      0.117562,
      0.0291202,
      0.175876,
      -0.74902,
      0.178368,
      0.0458476,
      0.285454,
      -0.623529,
      0.237731,
      0.0680173,
      0.387717,
      -0.498039,
      0.300877,
      0.0956291,
      0.484802,
      -0.372549,
      0.370929,
      0.136858,
      0.554985,
      -0.247059,
      0.449033,
      0.189273,
      0.58863,
      -0.121569,
      0.529971,
      0.245796,
      0.598587,
      0.00392157,
      0.609914,
      0.300643,
      0.610244,
      0.129412,
      0.697079,
      0.351286,
      0.616371,
      0.254902,
      0.785858,
      0.401991,
      0.617376,
      0.380392,
      0.862517,
      0.45745,
      0.64463,
      0.505882,
      0.91359,
      0.525462,
      0.705336,
      0.631373,
      0.932583,
      0.61064,
      0.767412,
      0.756863,
      0.922478,
      0.706966,
      0.817522,
      0.882353,
      0.901302,
      0.803071,
      0.856311,
      1,
      0.887571,
      0.887591,
      0.887549,
    ],
  },
  {
    ColorSpace: 'Lab',
    Name: 'erdc_pbj_lin',
    RGBPoints: [
      -1,
      0,
      0,
      0,
      -0.87451,
      0.091821,
      0.0611476,
      0.10617,
      -0.74902,
      0.160311,
      0.0900022,
      0.192713,
      -0.623529,
      0.22484,
      0.12126,
      0.272128,
      -0.498039,
      0.291263,
      0.157469,
      0.340828,
      -0.372549,
      0.360015,
      0.200388,
      0.388903,
      -0.247059,
      0.437497,
      0.250058,
      0.387201,
      -0.121569,
      0.512636,
      0.304969,
      0.355955,
      0.00392157,
      0.582603,
      0.360874,
      0.33488,
      0.129412,
      0.655126,
      0.416374,
      0.306351,
      0.254902,
      0.725889,
      0.473329,
      0.279051,
      0.380392,
      0.778125,
      0.537928,
      0.302697,
      0.505882,
      0.815894,
      0.606931,
      0.382431,
      0.631373,
      0.839159,
      0.679308,
      0.497608,
      0.756863,
      0.854748,
      0.751666,
      0.631792,
      0.882353,
      0.869483,
      0.822508,
      0.768592,
      1,
      0.887572,
      0.887589,
      0.887565,
    ],
  },
  {
    ColorSpace: 'Lab',
    Name: 'erdc_blue2green_muted',
    RGBPoints: [
      -1,
      0.107704,
      0.107708,
      0.107695,
      -0.87451,
      0.141522,
      0.13066,
      0.270741,
      -0.74902,
      0.180123,
      0.146119,
      0.42308,
      -0.623529,
      0.210161,
      0.169674,
      0.551795,
      -0.498039,
      0.239701,
      0.212939,
      0.634969,
      -0.372549,
      0.253916,
      0.282947,
      0.653641,
      -0.247059,
      0.242791,
      0.366933,
      0.608521,
      -0.121569,
      0.226302,
      0.446776,
      0.52693,
      0.00392157,
      0.236237,
      0.514689,
      0.458798,
      0.129412,
      0.274641,
      0.577589,
      0.376069,
      0.254902,
      0.349625,
      0.633993,
      0.288131,
      0.380392,
      0.4437,
      0.683677,
      0.260497,
      0.505882,
      0.536247,
      0.731214,
      0.285424,
      0.631373,
      0.628472,
      0.777128,
      0.349151,
      0.756863,
      0.718259,
      0.819287,
      0.496825,
      0.882353,
      0.804768,
      0.856164,
      0.703299,
      1,
      0.887571,
      0.887591,
      0.887548,
    ],
  },
  {
    ColorSpace: 'Lab',
    Name: 'erdc_blue2green_BW',
    RGBPoints: [
      -1,
      3.63578e-7,
      0,
      0.00000529374,
      -0.87451,
      0.0539915,
      0.0577948,
      0.212806,
      -0.74902,
      0.0620393,
      0.0758942,
      0.388959,
      -0.623529,
      0.0697499,
      0.102032,
      0.54177,
      -0.498039,
      0.113295,
      0.156156,
      0.64334,
      -0.372549,
      0.152047,
      0.243196,
      0.670283,
      -0.247059,
      0.158096,
      0.344084,
      0.622864,
      -0.121569,
      0.151142,
      0.43922,
      0.532767,
      0.00392157,
      0.17155,
      0.521588,
      0.457719,
      0.129412,
      0.225861,
      0.599141,
      0.363997,
      0.254902,
      0.32328,
      0.67007,
      0.259083,
      0.380392,
      0.442344,
      0.733697,
      0.223754,
      0.505882,
      0.558409,
      0.794941,
      0.257411,
      0.631373,
      0.673875,
      0.854344,
      0.340822,
      0.756863,
      0.787244,
      0.909326,
      0.524717,
      0.882353,
      0.896483,
      0.958063,
      0.775914,
      1,
      1,
      1,
      0.999982,
    ],
  },
  {
    ColorSpace: 'Lab',
    Name: 'GREEN-WHITE_LINEAR',
    RGBPoints: [
      -1,
      0,
      0,
      0,
      -0.87451,
      0,
      0.062745,
      0,
      -0.74902,
      0,
      0.12549,
      0,
      -0.623529,
      0,
      0.188235,
      0,
      -0.498039,
      0,
      0.25098,
      0,
      -0.372549,
      0,
      0.313725,
      0,
      -0.247059,
      0,
      0.376471,
      0,
      -0.121569,
      0.094118,
      0.439216,
      0,
      0.00392157,
      0.196078,
      0.501961,
      0,
      0.129412,
      0.294118,
      0.564706,
      0,
      0.254902,
      0.396078,
      0.627451,
      0,
      0.380392,
      0.498039,
      0.690196,
      0,
      0.505882,
      0.6,
      0.752941,
      0.145098,
      0.631373,
      0.701961,
      0.815686,
      0.364706,
      0.756863,
      0.8,
      0.878431,
      0.580392,
      0.882353,
      0.901961,
      0.941176,
      0.796078,
      1,
      1,
      1,
      1,
    ],
  },
  {
    ColorSpace: 'Lab',
    Name: 'erdc_green2yellow_BW',
    RGBPoints: [
      -1,
      0,
      0,
      0,
      -0.87451,
      0,
      0.105542,
      0.0603919,
      -0.74902,
      0,
      0.159454,
      0.104148,
      -0.623529,
      0,
      0.219502,
      0.15542,
      -0.498039,
      0,
      0.282276,
      0.203811,
      -0.372549,
      0,
      0.346331,
      0.235652,
      -0.247059,
      0,
      0.411765,
      0.235428,
      -0.121569,
      0,
      0.477177,
      0.217977,
      0.00392157,
      0.0593644,
      0.541635,
      0.21361,
      0.129412,
      0.233081,
      0.604722,
      0.210591,
      0.254902,
      0.369803,
      0.664942,
      0.226536,
      0.380392,
      0.498446,
      0.722367,
      0.288237,
      0.505882,
      0.601929,
      0.782244,
      0.380815,
      0.631373,
      0.703207,
      0.840497,
      0.512134,
      0.756863,
      0.803186,
      0.896433,
      0.674462,
      0.882353,
      0.903834,
      0.950266,
      0.846715,
      1,
      1,
      1,
      0.999981,
    ],
  },
  {
    ColorSpace: 'Lab',
    Name: 'blue2cyan',
    RGBPoints: [
      -1,
      0,
      0,
      0,
      -0.87451,
      0,
      0.152941,
      0.364706,
      -0.74902,
      0,
      0.254902,
      0.470588,
      -0.623529,
      0,
      0.34902,
      0.572549,
      -0.498039,
      0,
      0.443137,
      0.670588,
      -0.372549,
      0,
      0.537255,
      0.772549,
      -0.247059,
      0,
      0.627451,
      0.870588,
      -0.121569,
      0,
      0.717647,
      0.964706,
      0.00392157,
      0.0784314,
      0.772549,
      1,
      0.129412,
      0.207843,
      0.858824,
      1,
      0.254902,
      0.32549,
      0.941176,
      1,
      0.380392,
      0.45098,
      1,
      1,
      0.505882,
      0.560784,
      1,
      1,
      0.631373,
      0.662745,
      1,
      1,
      0.756863,
      0.760784,
      1,
      1,
      0.882353,
      0.870588,
      1,
      1,
      1,
      1,
      1,
      1,
    ],
  },
  {
    ColorSpace: 'Lab',
    Name: 'erdc_blue2cyan_BW',
    RGBPoints: [
      -1,
      4.05298e-7,
      0,
      0.0000059012,
      -0.87451,
      0.0207526,
      0.0740933,
      0.18093,
      -0.74902,
      0,
      0.121033,
      0.30343,
      -0.623529,
      0,
      0.166892,
      0.416095,
      -0.498039,
      0,
      0.216768,
      0.524796,
      -0.372549,
      0.0164769,
      0.275471,
      0.608585,
      -0.247059,
      0.0544527,
      0.344824,
      0.659267,
      -0.121569,
      0.0880643,
      0.419118,
      0.688675,
      0.00392157,
      0.127938,
      0.492556,
      0.720256,
      0.129412,
      0.149476,
      0.566946,
      0.756918,
      0.254902,
      0.188961,
      0.641333,
      0.792122,
      0.380392,
      0.245482,
      0.715336,
      0.827609,
      0.505882,
      0.329216,
      0.786235,
      0.874761,
      0.631373,
      0.453558,
      0.852803,
      0.918466,
      0.756863,
      0.626281,
      0.910493,
      0.954,
      0.882353,
      0.82257,
      0.958709,
      0.980146,
      1,
      1,
      1,
      0.999989,
    ],
  },
  {
    ColorSpace: 'Lab',
    Name: 'erdc_blue_BW',
    RGBPoints: [
      -1,
      0,
      0,
      0,
      -0.87451,
      0.0425591,
      0.0763529,
      0.150682,
      -0.74902,
      0.0569472,
      0.119154,
      0.275403,
      -0.623529,
      0.0635978,
      0.164772,
      0.395427,
      -0.498039,
      0.0774342,
      0.213851,
      0.510014,
      -0.372549,
      0.106815,
      0.267034,
      0.615102,
      -0.247059,
      0.122093,
      0.324649,
      0.720068,
      -0.121569,
      0.160851,
      0.387068,
      0.806956,
      0.00392157,
      0.213754,
      0.453516,
      0.878012,
      0.129412,
      0.26722,
      0.524656,
      0.932436,
      0.254902,
      0.326844,
      0.599279,
      0.968038,
      0.380392,
      0.403403,
      0.674712,
      0.984784,
      0.505882,
      0.499703,
      0.745519,
      1,
      0.631373,
      0.615055,
      0.813983,
      1,
      0.756863,
      0.74405,
      0.879228,
      1,
      0.882353,
      0.877909,
      0.941913,
      1,
      1,
      1,
      1,
      0.999996,
    ],
  },
  {
    ColorSpace: 'Lab',
    Name: 'BLUE-WHITE',
    RGBPoints: [
      -1,
      0,
      0,
      0,
      -0.87451,
      0,
      0,
      0.082353,
      -0.74902,
      0,
      0,
      0.168627,
      -0.623529,
      0,
      0,
      0.254902,
      -0.498039,
      0,
      0,
      0.337255,
      -0.372549,
      0,
      0,
      0.423529,
      -0.247059,
      0,
      0,
      0.509804,
      -0.121569,
      0,
      0.101961,
      0.592157,
      0.00392157,
      0,
      0.203922,
      0.678431,
      0.129412,
      0,
      0.301961,
      0.764706,
      0.254902,
      0,
      0.403922,
      0.85098,
      0.380392,
      0,
      0.505882,
      0.933333,
      0.505882,
      0,
      0.603922,
      1,
      0.631373,
      0.254902,
      0.705882,
      1,
      0.756863,
      0.509804,
      0.807843,
      1,
      0.882353,
      0.764706,
      0.905882,
      1,
      1,
      1,
      1,
      1,
    ],
  },
  {
    ColorSpace: 'Lab',
    Name: 'erdc_purple_BW',
    RGBPoints: [
      -1,
      4.264e-8,
      0,
      6.20844e-7,
      -0.87451,
      0.100579,
      0.0593111,
      0.145666,
      -0.74902,
      0.167794,
      0.0889224,
      0.254953,
      -0.623529,
      0.231446,
      0.123339,
      0.360511,
      -0.498039,
      0.296699,
      0.163027,
      0.461278,
      -0.372549,
      0.363211,
      0.209286,
      0.55306,
      -0.247059,
      0.431136,
      0.260776,
      0.637195,
      -0.121569,
      0.498202,
      0.320012,
      0.705799,
      0.00392157,
      0.567456,
      0.380459,
      0.778091,
      0.129412,
      0.629381,
      0.445284,
      0.8448,
      0.254902,
      0.688373,
      0.517374,
      0.895694,
      0.380392,
      0.74891,
      0.590906,
      0.93976,
      0.505882,
      0.805017,
      0.667956,
      0.977626,
      0.631373,
      0.850914,
      0.752618,
      0.992396,
      0.756863,
      0.89724,
      0.838454,
      0.994093,
      0.882353,
      0.948461,
      0.922603,
      0.994449,
      1,
      1,
      1,
      0.999967,
    ],
  },
  {
    ColorSpace: 'Lab',
    Name: 'erdc_magenta_BW',
    RGBPoints: [
      -1,
      0,
      0,
      0.0000254023,
      -0.87451,
      0.128696,
      0.0456782,
      0.11635,
      -0.74902,
      0.228133,
      0.0476299,
      0.201452,
      -0.623529,
      0.327273,
      0.0374065,
      0.282107,
      -0.498039,
      0.420953,
      0.0408166,
      0.35709,
      -0.372549,
      0.511562,
      0.0642203,
      0.430511,
      -0.247059,
      0.599552,
      0.102686,
      0.504257,
      -0.121569,
      0.684646,
      0.150536,
      0.579429,
      0.00392157,
      0.765817,
      0.205978,
      0.656062,
      0.129412,
      0.839176,
      0.27229,
      0.731807,
      0.254902,
      0.89536,
      0.357594,
      0.797309,
      0.380392,
      0.930238,
      0.457825,
      0.846984,
      0.505882,
      0.945921,
      0.564536,
      0.880571,
      0.631373,
      0.948995,
      0.670753,
      0.902279,
      0.756863,
      0.947124,
      0.772819,
      0.918171,
      0.882353,
      0.947265,
      0.869424,
      0.934352,
      1,
      0.954719,
      0.95475,
      0.954726,
    ],
  },
  {
    ColorSpace: 'Lab',
    Name: 'magenta',
    RGBPoints: [
      -1,
      0,
      0,
      0,
      -0.87451,
      0.364706,
      0,
      0.152941,
      -0.74902,
      0.470588,
      0,
      0.254902,
      -0.623529,
      0.572549,
      0,
      0.34902,
      -0.498039,
      0.670588,
      0,
      0.443137,
      -0.372549,
      0.772549,
      0,
      0.537255,
      -0.247059,
      0.870588,
      0,
      0.627451,
      -0.121569,
      0.964706,
      0,
      0.717647,
      0.00392157,
      1,
      0.0784314,
      0.772549,
      0.129412,
      1,
      0.207843,
      0.858824,
      0.254902,
      1,
      0.32549,
      0.941176,
      0.380392,
      1,
      0.45098,
      1,
      0.505882,
      1,
      0.560784,
      1,
      0.631373,
      1,
      0.662745,
      1,
      0.756863,
      1,
      0.760784,
      1,
      0.882353,
      1,
      0.870588,
      1,
      1,
      1,
      1,
      1,
    ],
  },
  {
    ColorSpace: 'Lab',
    Name: 'RED-PURPLE',
    RGBPoints: [
      -1,
      0,
      0,
      0,
      -0.87451,
      0.188235,
      0,
      0.007843,
      -0.74902,
      0.345098,
      0,
      0.035294,
      -0.623529,
      0.439216,
      0,
      0.098039,
      -0.498039,
      0.533333,
      0,
      0.152941,
      -0.372549,
      0.627451,
      0.015686,
      0.211765,
      -0.247059,
      0.721569,
      0.031373,
      0.266667,
      -0.121569,
      0.8,
      0.047059,
      0.329412,
      0.00392157,
      0.862745,
      0.047059,
      0.403922,
      0.129412,
      0.941176,
      0.062745,
      0.466667,
      0.254902,
      0.988235,
      0.078431,
      0.54902,
      0.380392,
      0.988235,
      0.141176,
      0.643137,
      0.505882,
      0.988235,
      0.25098,
      0.729412,
      0.631373,
      0.988235,
      0.376471,
      0.811765,
      0.756863,
      0.988235,
      0.54902,
      0.886275,
      0.882353,
      0.988235,
      0.752941,
      0.952941,
      1,
      0.996078,
      0.996078,
      0.996078,
    ],
  },
  {
    ColorSpace: 'Lab',
    Name: 'erdc_red_BW',
    RGBPoints: [
      -1,
      0,
      0,
      0,
      -0.87451,
      0.147204,
      0.0480135,
      0.0401815,
      -0.74902,
      0.253411,
      0.0617478,
      0.0301333,
      -0.623529,
      0.356059,
      0.0746331,
      0.0446897,
      -0.498039,
      0.457731,
      0.0934935,
      0.0636931,
      -0.372549,
      0.557199,
      0.122714,
      0.0860013,
      -0.247059,
      0.665179,
      0.144238,
      0.105585,
      -0.121569,
      0.763833,
      0.187056,
      0.138326,
      0.00392157,
      0.847035,
      0.254558,
      0.189407,
      0.129412,
      0.905663,
      0.345937,
      0.258215,
      0.254902,
      0.941431,
      0.447111,
      0.346277,
      0.380392,
      0.962608,
      0.546927,
      0.457571,
      0.505882,
      0.987833,
      0.637276,
      0.569944,
      0.631373,
      0.994202,
      0.732176,
      0.687958,
      0.756863,
      0.993304,
      0.826268,
      0.800567,
      0.882353,
      0.994413,
      0.917205,
      0.906393,
      1,
      1,
      1,
      0.999979,
    ],
  },
  {
    ColorSpace: 'Lab',
    Name: 'RED_TEMPERATURE',
    RGBPoints: [
      -1,
      0,
      0,
      0,
      -0.87451,
      0.090196,
      0,
      0,
      -0.74902,
      0.180392,
      0,
      0,
      -0.623529,
      0.270588,
      0,
      0,
      -0.498039,
      0.360784,
      0,
      0,
      -0.372549,
      0.45098,
      0,
      0,
      -0.247059,
      0.545098,
      0,
      0,
      -0.121569,
      0.635294,
      0,
      0,
      0.00392157,
      0.72549,
      0.058824,
      0,
      0.129412,
      0.815686,
      0.176471,
      0,
      0.254902,
      0.905882,
      0.294118,
      0,
      0.380392,
      1,
      0.411765,
      0,
      0.505882,
      1,
      0.533333,
      0.027451,
      0.631373,
      1,
      0.65098,
      0.27451,
      0.756863,
      1,
      0.768627,
      0.521569,
      0.882353,
      1,
      0.886275,
      0.768627,
      1,
      1,
      1,
      1,
    ],
  },
  {
    ColorSpace: 'Lab',
    Name: 'erdc_orange_BW',
    RGBPoints: [
      -1,
      0,
      0,
      0.0000253806,
      -0.87451,
      0.135871,
      0.0593824,
      0,
      -0.74902,
      0.224328,
      0.0907216,
      0,
      -0.623529,
      0.318083,
      0.119647,
      0,
      -0.498039,
      0.414443,
      0.150246,
      0,
      -0.372549,
      0.511077,
      0.184884,
      0,
      -0.247059,
      0.605501,
      0.226033,
      0,
      -0.121569,
      0.695274,
      0.275491,
      0,
      0.00392157,
      0.777826,
      0.334445,
      0,
      0.129412,
      0.851498,
      0.402441,
      0,
      0.254902,
      0.915899,
      0.47759,
      0.000602975,
      0.380392,
      0.971984,
      0.557882,
      0.0361443,
      0.505882,
      1,
      0.641287,
      0.135967,
      0.631373,
      1,
      0.725198,
      0.27997,
      0.756863,
      1,
      0.808205,
      0.438135,
      0.882353,
      1,
      0.89306,
      0.587036,
      1,
      1,
      0.977928,
      0.721599,
    ],
  },
  {
    ColorSpace: 'Lab',
    Name: 'heated_object',
    RGBPoints: [
      -1,
      0,
      0,
      0,
      -0.87451,
      0.34902,
      0.0862745,
      0,
      -0.74902,
      0.45098,
      0.172549,
      0,
      -0.623529,
      0.52549,
      0.231373,
      0,
      -0.498039,
      0.580392,
      0.278431,
      0,
      -0.372549,
      0.623529,
      0.313725,
      0,
      -0.247059,
      0.670588,
      0.352941,
      0,
      -0.121569,
      0.717647,
      0.392157,
      0,
      0.00392157,
      0.772549,
      0.439216,
      0,
      0.129412,
      0.839216,
      0.494118,
      0,
      0.254902,
      0.901961,
      0.541176,
      0,
      0.380392,
      0.968627,
      0.6,
      0,
      0.505882,
      1,
      0.658824,
      0,
      0.631373,
      1,
      0.721569,
      0,
      0.756863,
      1,
      0.827451,
      0.298039,
      0.882353,
      1,
      0.976471,
      0.72549,
      1,
      1,
      1,
      1,
    ],
  },
  {
    ColorSpace: 'Lab',
    Name: 'erdc_gold_BW',
    RGBPoints: [
      -1,
      0,
      0,
      0.0000190933,
      -0.87451,
      0.128363,
      0.0636265,
      0,
      -0.74902,
      0.193795,
      0.111057,
      0,
      -0.623529,
      0.25976,
      0.15987,
      0,
      -0.498039,
      0.328546,
      0.210589,
      0,
      -0.372549,
      0.399726,
      0.26332,
      0,
      -0.247059,
      0.472969,
      0.318261,
      0,
      -0.121569,
      0.546245,
      0.375827,
      0,
      0.00392157,
      0.61745,
      0.436719,
      0,
      0.129412,
      0.685545,
      0.501113,
      0,
      0.254902,
      0.749578,
      0.568799,
      0,
      0.380392,
      0.80962,
      0.6394,
      0,
      0.505882,
      0.865572,
      0.712699,
      0.10257,
      0.631373,
      0.917709,
      0.787569,
      0.233665,
      0.756863,
      0.966914,
      0.863138,
      0.369608,
      0.882353,
      1,
      0.939405,
      0.496104,
      1,
      0.999225,
      1,
      0.612275,
    ],
  },
  {
    ColorSpace: 'Lab',
    Name: 'erdc_brown_BW',
    RGBPoints: [
      -1,
      3.3216e-7,
      0,
      0.00000483629,
      -0.87451,
      0.14693,
      0.0518172,
      0,
      -0.74902,
      0.225806,
      0.0814996,
      0,
      -0.623529,
      0.301681,
      0.111452,
      0,
      -0.498039,
      0.370487,
      0.150664,
      0,
      -0.372549,
      0.43108,
      0.199477,
      0,
      -0.247059,
      0.4849,
      0.255107,
      0,
      -0.121569,
      0.536798,
      0.313486,
      0,
      0.00392157,
      0.59286,
      0.371167,
      0,
      0.129412,
      0.653119,
      0.428135,
      0,
      0.254902,
      0.714589,
      0.485917,
      0.0379541,
      0.380392,
      0.774667,
      0.54565,
      0.116634,
      0.505882,
      0.831222,
      0.608047,
      0.183895,
      0.631373,
      0.880305,
      0.674199,
      0.260298,
      0.756863,
      0.922314,
      0.742472,
      0.367086,
      0.882353,
      0.959408,
      0.811222,
      0.497258,
      1,
      0.993548,
      0.875183,
      0.622093,
    ],
  },
  {
    ColorSpace: 'Lab',
    Name: 'copper_Matlab',
    RGBPoints: [
      -1,
      0,
      0,
      0,
      -0.87451,
      0.0784314,
      0.0501961,
      0.0313725,
      -0.74902,
      0.156863,
      0.100392,
      0.0627451,
      -0.623529,
      0.235294,
      0.150588,
      0.0941176,
      -0.498039,
      0.313725,
      0.200784,
      0.12549,
      -0.372549,
      0.392157,
      0.25098,
      0.156863,
      -0.247059,
      0.470588,
      0.301176,
      0.188235,
      -0.121569,
      0.54902,
      0.351373,
      0.219608,
      0.00392157,
      0.627451,
      0.401569,
      0.25098,
      0.129412,
      0.705882,
      0.451765,
      0.282353,
      0.254902,
      0.784314,
      0.501961,
      0.313725,
      0.380392,
      0.862745,
      0.552157,
      0.345098,
      0.505882,
      0.941176,
      0.602353,
      0.376471,
      0.631373,
      1,
      0.652549,
      0.407843,
      0.756863,
      1,
      0.702745,
      0.439216,
      0.882353,
      1,
      0.752941,
      0.470588,
      1,
      1,
      0.8,
      0.5,
    ],
  },
  {
    ColorSpace: 'Lab',
    Name: 'pink_Matlab',
    RGBPoints: [
      -1,
      0,
      0,
      0,
      -0.87451,
      0.312416,
      0.204524,
      0.204524,
      -0.74902,
      0.441822,
      0.289241,
      0.289241,
      -0.623529,
      0.54112,
      0.354246,
      0.354246,
      -0.498039,
      0.624831,
      0.409048,
      0.409048,
      -0.372549,
      0.698582,
      0.45733,
      0.45733,
      -0.247059,
      0.764404,
      0.502282,
      0.500979,
      -0.121569,
      0.791292,
      0.591516,
      0.54112,
      0.00392157,
      0.817297,
      0.66895,
      0.578481,
      0.129412,
      0.842499,
      0.738308,
      0.613572,
      0.254902,
      0.866968,
      0.801687,
      0.646762,
      0.380392,
      0.890766,
      0.86041,
      0.678329,
      0.505882,
      0.913944,
      0.913944,
      0.711254,
      0.631373,
      0.936549,
      0.936549,
      0.79459,
      0.756863,
      0.958621,
      0.958621,
      0.869979,
      0.882353,
      0.980196,
      0.980196,
      0.939336,
      1,
      1,
      1,
      1,
    ],
  },
  {
    ColorSpace: 'Lab',
    Name: 'bone_Matlab',
    RGBPoints: [
      -1,
      0,
      0,
      0,
      -0.87451,
      0.054902,
      0.054902,
      0.075817,
      -0.74902,
      0.109804,
      0.109804,
      0.151634,
      -0.623529,
      0.164706,
      0.164706,
      0.227451,
      -0.498039,
      0.219608,
      0.219608,
      0.303268,
      -0.372549,
      0.27451,
      0.27451,
      0.379085,
      -0.247059,
      0.329412,
      0.329902,
      0.454412,
      -0.121569,
      0.384314,
      0.405719,
      0.509314,
      0.00392157,
      0.439216,
      0.481536,
      0.564216,
      0.129412,
      0.494118,
      0.557353,
      0.619118,
      0.254902,
      0.54902,
      0.63317,
      0.67402,
      0.380392,
      0.603922,
      0.708987,
      0.728922,
      0.505882,
      0.660294,
      0.783824,
      0.783824,
      0.631373,
      0.746569,
      0.838725,
      0.838725,
      0.756863,
      0.832843,
      0.893627,
      0.893627,
      0.882353,
      0.919118,
      0.948529,
      0.948529,
      1,
      1,
      1,
      1,
    ],
  },
  {
    ColorSpace: 'Lab',
    Name: 'gray_Matlab',
    RGBPoints: [
      -1,
      0,
      0,
      0,
      -0.87451,
      0.0627451,
      0.0627451,
      0.0627451,
      -0.74902,
      0.12549,
      0.12549,
      0.12549,
      -0.623529,
      0.188235,
      0.188235,
      0.188235,
      -0.498039,
      0.25098,
      0.25098,
      0.25098,
      -0.372549,
      0.313725,
      0.313725,
      0.313725,
      -0.247059,
      0.376471,
      0.376471,
      0.376471,
      -0.121569,
      0.439216,
      0.439216,
      0.439216,
      0.00392157,
      0.501961,
      0.501961,
      0.501961,
      0.129412,
      0.564706,
      0.564706,
      0.564706,
      0.254902,
      0.627451,
      0.627451,
      0.627451,
      0.380392,
      0.690196,
      0.690196,
      0.690196,
      0.505882,
      0.752941,
      0.752941,
      0.752941,
      0.631373,
      0.815686,
      0.815686,
      0.815686,
      0.756863,
      0.878431,
      0.878431,
      0.878431,
      0.882353,
      0.941176,
      0.941176,
      0.941176,
      1,
      1,
      1,
      1,
    ],
  },
  {
    ColorSpace: 'Lab',
    Name: 'Purples',
    RGBPoints: [
      -1,
      0.247059,
      0,
      0.490196,
      -0.87451,
      0.288397,
      0.07677,
      0.525629,
      -0.74902,
      0.32975,
      0.153587,
      0.561092,
      -0.623529,
      0.373057,
      0.236263,
      0.600461,
      -0.498039,
      0.416363,
      0.319,
      0.639923,
      -0.372549,
      0.459669,
      0.405613,
      0.685198,
      -0.247059,
      0.503345,
      0.491534,
      0.730058,
      -0.121569,
      0.562399,
      0.54862,
      0.757616,
      0.00392157,
      0.621453,
      0.606075,
      0.785544,
      0.129412,
      0.680508,
      0.674971,
      0.824914,
      0.254902,
      0.739562,
      0.743406,
      0.863899,
      0.380392,
      0.798616,
      0.800492,
      0.893426,
      0.505882,
      0.85684,
      0.856655,
      0.922491,
      0.631373,
      0.898178,
      0.894056,
      0.942176,
      0.756863,
      0.938654,
      0.930919,
      0.961646,
      0.882353,
      0.964245,
      0.958478,
      0.977393,
      1,
      0.988235,
      0.984314,
      0.992157,
    ],
  },
  {
    ColorSpace: 'Lab',
    Name: 'Blues',
    RGBPoints: [
      -1,
      0.031373,
      0.188235,
      0.419608,
      -0.87451,
      0.031373,
      0.253195,
      0.516063,
      -0.74902,
      0.031757,
      0.318139,
      0.612149,
      -0.623529,
      0.080969,
      0.38113,
      0.661361,
      -0.498039,
      0.130427,
      0.444152,
      0.710327,
      -0.372549,
      0.195386,
      0.509112,
      0.743791,
      -0.247059,
      0.260715,
      0.573841,
      0.777209,
      -0.121569,
      0.341423,
      0.628958,
      0.808704,
      0.00392157,
      0.422745,
      0.684075,
      0.839892,
      0.129412,
      0.523137,
      0.739193,
      0.861546,
      0.254902,
      0.622684,
      0.793464,
      0.883429,
      0.380392,
      0.701423,
      0.826928,
      0.910988,
      0.505882,
      0.778685,
      0.8603,
      0.937993,
      0.631373,
      0.825928,
      0.891795,
      0.953741,
      0.756863,
      0.87328,
      0.923291,
      0.969489,
      0.882353,
      0.922491,
      0.954787,
      0.985236,
      1,
      0.968627,
      0.984314,
      1,
    ],
  },
  {
    ColorSpace: 'Lab',
    Name: 'Greens',
    RGBPoints: [
      -1,
      0,
      0.266667,
      0.105882,
      -0.87451,
      0,
      0.347374,
      0.139346,
      -0.74902,
      0.000538,
      0.427912,
      0.172933,
      -0.623529,
      0.069435,
      0.486967,
      0.222145,
      -0.498039,
      0.138178,
      0.546082,
      0.271326,
      -0.372549,
      0.197232,
      0.609073,
      0.31857,
      -0.247059,
      0.257255,
      0.671742,
      0.365859,
      -0.121569,
      0.357647,
      0.720953,
      0.415071,
      0.00392157,
      0.45767,
      0.769919,
      0.465021,
      0.129412,
      0.546251,
      0.811257,
      0.537855,
      0.254902,
      0.634295,
      0.852211,
      0.610688,
      0.380392,
      0.709097,
      0.883706,
      0.683522,
      0.505882,
      0.78316,
      0.914833,
      0.755894,
      0.631373,
      0.842215,
      0.938454,
      0.818885,
      0.756863,
      0.899977,
      0.961538,
      0.880692,
      0.882353,
      0.935409,
      0.975317,
      0.92203,
      1,
      0.968627,
      0.988235,
      0.960784,
    ],
  },
  {
    ColorSpace: 'Lab',
    Name: 'PuBu',
    RGBPoints: [
      -1,
      0.301961,
      0,
      0.294118,
      -0.87451,
      0.404321,
      0.029527,
      0.390573,
      -0.74902,
      0.50599,
      0.059592,
      0.486782,
      -0.623529,
      0.519769,
      0.158016,
      0.551742,
      -0.498039,
      0.533456,
      0.256194,
      0.616301,
      -0.372549,
      0.54133,
      0.33887,
      0.655671,
      -0.247059,
      0.54902,
      0.421592,
      0.695087,
      -0.121569,
      0.54902,
      0.506236,
      0.736424,
      0.00392157,
      0.550127,
      0.590573,
      0.777701,
      0.129412,
      0.585559,
      0.665375,
      0.81707,
      0.254902,
      0.622145,
      0.739023,
      0.855825,
      0.380392,
      0.687105,
      0.784298,
      0.879446,
      0.505882,
      0.752065,
      0.829758,
      0.903253,
      0.631373,
      0.817024,
      0.87897,
      0.930811,
      0.756863,
      0.880907,
      0.927213,
      0.957832,
      0.882353,
      0.926182,
      0.958708,
      0.975548,
      1,
      0.968627,
      0.988235,
      0.992157,
    ],
  },
  {
    ColorSpace: 'Lab',
    Name: 'BuPu',
    RGBPoints: [
      -1,
      0.007843,
      0.219608,
      0.345098,
      -0.87451,
      0.01178,
      0.286536,
      0.449427,
      -0.74902,
      0.015702,
      0.35328,
      0.553479,
      -0.623529,
      0.01767,
      0.396586,
      0.622376,
      -0.498039,
      0.021115,
      0.4402,
      0.690688,
      -0.372549,
      0.11757,
      0.503191,
      0.722184,
      -0.247059,
      0.214625,
      0.565859,
      0.753633,
      -0.121569,
      0.336671,
      0.615071,
      0.78316,
      0.00392157,
      0.457978,
      0.663975,
      0.812503,
      0.129412,
      0.556401,
      0.703345,
      0.836125,
      0.254902,
      0.65421,
      0.742714,
      0.859669,
      0.380392,
      0.736886,
      0.782084,
      0.881323,
      0.505882,
      0.81827,
      0.821638,
      0.903068,
      0.631373,
      0.873387,
      0.864944,
      0.92669,
      0.756863,
      0.927536,
      0.907605,
      0.949988,
      0.882353,
      0.964937,
      0.9391,
      0.967705,
      1,
      1,
      0.968627,
      0.984314,
    ],
  },
  {
    ColorSpace: 'Lab',
    Name: 'BuGn',
    RGBPoints: [
      -1,
      0.031373,
      0.25098,
      0.505882,
      -0.87451,
      0.031373,
      0.329719,
      0.590527,
      -0.74902,
      0.031911,
      0.408397,
      0.674787,
      -0.623529,
      0.100807,
      0.479262,
      0.710219,
      -0.498039,
      0.169704,
      0.550219,
      0.745744,
      -0.372549,
      0.238601,
      0.62699,
      0.787082,
      -0.247059,
      0.307958,
      0.703114,
      0.826759,
      -0.121569,
      0.39654,
      0.752326,
      0.797232,
      0.00392157,
      0.485121,
      0.801046,
      0.767705,
      0.129412,
      0.573702,
      0.83451,
      0.738178,
      0.254902,
      0.661592,
      0.867743,
      0.711034,
      0.380392,
      0.732457,
      0.895302,
      0.74253,
      0.505882,
      0.801845,
      0.922307,
      0.774579,
      0.631373,
      0.841215,
      0.938055,
      0.817885,
      0.756863,
      0.880907,
      0.95391,
      0.861084,
      0.882353,
      0.926182,
      0.971626,
      0.902422,
      1,
      0.968627,
      0.988235,
      0.941176,
    ],
  },
  {
    ColorSpace: 'Lab',
    Name: 'GnBu',
    RGBPoints: [
      -1,
      0,
      0.266667,
      0.105882,
      -0.87451,
      0,
      0.347374,
      0.139346,
      -0.74902,
      0.000538,
      0.427912,
      0.172933,
      -0.623529,
      0.069435,
      0.486967,
      0.222145,
      -0.498039,
      0.138178,
      0.546175,
      0.272095,
      -0.372549,
      0.197232,
      0.615071,
      0.368551,
      -0.247059,
      0.256609,
      0.683276,
      0.464867,
      -0.121569,
      0.329443,
      0.722645,
      0.555417,
      0.00392157,
      0.403137,
      0.762138,
      0.645413,
      0.129412,
      0.503529,
      0.805444,
      0.718247,
      0.254902,
      0.603922,
      0.848597,
      0.790465,
      0.380392,
      0.704314,
      0.887966,
      0.847551,
      0.505882,
      0.802307,
      0.926321,
      0.903714,
      0.631373,
      0.851519,
      0.944037,
      0.941115,
      0.756863,
      0.899977,
      0.961538,
      0.976901,
      0.882353,
      0.935409,
      0.975317,
      0.984775,
      1,
      0.968627,
      0.988235,
      0.992157,
    ],
  },
  {
    ColorSpace: 'Lab',
    Name: 'GnBuPu',
    RGBPoints: [
      -1,
      0.003922,
      0.27451,
      0.211765,
      -0.87451,
      0.003922,
      0.349312,
      0.280661,
      -0.74902,
      0.003937,
      0.423852,
      0.349773,
      -0.623529,
      0.005905,
      0.46519,
      0.446228,
      -0.498039,
      0.009443,
      0.506344,
      0.542837,
      -0.372549,
      0.111803,
      0.535871,
      0.649135,
      -0.247059,
      0.214025,
      0.565859,
      0.753633,
      -0.121569,
      0.310481,
      0.615071,
      0.78316,
      0.00392157,
      0.407797,
      0.663975,
      0.812503,
      0.129412,
      0.531811,
      0.703345,
      0.836125,
      0.254902,
      0.65421,
      0.742714,
      0.859669,
      0.380392,
      0.736886,
      0.782084,
      0.881323,
      0.505882,
      0.81827,
      0.821176,
      0.902884,
      0.631373,
      0.873387,
      0.854641,
      0.922568,
      0.756863,
      0.927536,
      0.888535,
      0.942361,
      0.882353,
      0.964937,
      0.929873,
      0.964014,
      1,
      1,
      0.968627,
      0.984314,
    ],
  },
  {
    ColorSpace: 'Lab',
    Name: 'BuGnYl',
    RGBPoints: [
      -1,
      0.031373,
      0.113725,
      0.345098,
      -0.87451,
      0.088458,
      0.159,
      0.463206,
      -0.74902,
      0.145052,
      0.204567,
      0.5807,
      -0.623529,
      0.139146,
      0.287243,
      0.620069,
      -0.498039,
      0.13318,
      0.370196,
      0.659562,
      -0.372549,
      0.123337,
      0.470588,
      0.706805,
      -0.247059,
      0.115386,
      0.570335,
      0.753126,
      -0.121569,
      0.186251,
      0.643168,
      0.761,
      0.00392157,
      0.258716,
      0.71514,
      0.768074,
      0.129412,
      0.380761,
      0.760415,
      0.750358,
      0.254902,
      0.503576,
      0.806075,
      0.732795,
      0.380392,
      0.645306,
      0.861192,
      0.719016,
      0.505882,
      0.783899,
      0.91511,
      0.705606,
      0.631373,
      0.858701,
      0.944637,
      0.6997,
      0.756863,
      0.931349,
      0.973303,
      0.698424,
      0.882353,
      0.966782,
      0.987082,
      0.777163,
      1,
      1,
      1,
      0.85098,
    ],
  },
  {
    ColorSpace: 'Lab',
    Name: 'PuRd',
    RGBPoints: [
      -1,
      0.286275,
      0,
      0.415686,
      -0.87451,
      0.38273,
      0.001968,
      0.441276,
      -0.74902,
      0.479231,
      0.003922,
      0.466774,
      -0.623529,
      0.581592,
      0.003922,
      0.480554,
      -0.498039,
      0.683799,
      0.00549,
      0.494887,
      -0.372549,
      0.776317,
      0.105882,
      0.544098,
      -0.247059,
      0.867866,
      0.206321,
      0.592618,
      -0.121569,
      0.919047,
      0.308681,
      0.612303,
      0.00392157,
      0.968812,
      0.411226,
      0.632603,
      0.129412,
      0.974717,
      0.519493,
      0.671972,
      0.254902,
      0.980546,
      0.626451,
      0.71065,
      0.380392,
      0.984483,
      0.701253,
      0.732303,
      0.505882,
      0.988328,
      0.77504,
      0.755617,
      0.631373,
      0.990296,
      0.828189,
      0.812703,
      0.756863,
      0.992372,
      0.880907,
      0.869035,
      0.882353,
      0.996309,
      0.926182,
      0.912341,
      1,
      1,
      0.968627,
      0.952941,
    ],
  },
  {
    ColorSpace: 'Lab',
    Name: 'RdPu',
    RGBPoints: [
      -1,
      0.403922,
      0,
      0.121569,
      -0.87451,
      0.500377,
      0,
      0.192434,
      -0.74902,
      0.596909,
      0.000277,
      0.263037,
      -0.623529,
      0.703206,
      0.035709,
      0.300438,
      -0.498039,
      0.808612,
      0.071296,
      0.338854,
      -0.372549,
      0.857824,
      0.116571,
      0.441215,
      -0.247059,
      0.905513,
      0.163552,
      0.54293,
      -0.121569,
      0.889765,
      0.281661,
      0.617732,
      0.00392157,
      0.873156,
      0.39897,
      0.691611,
      0.129412,
      0.82985,
      0.491488,
      0.736886,
      0.254902,
      0.789081,
      0.583237,
      0.781853,
      0.380392,
      0.810734,
      0.656071,
      0.819254,
      0.505882,
      0.833126,
      0.729181,
      0.85684,
      0.631373,
      0.870527,
      0.80792,
      0.898178,
      0.756863,
      0.907605,
      0.884398,
      0.938331,
      0.882353,
      0.9391,
      0.921799,
      0.958016,
      1,
      0.968627,
      0.956863,
      0.976471,
    ],
  },
  {
    ColorSpace: 'Lab',
    Name: 'Oranges',
    RGBPoints: [
      -1,
      0.498039,
      0.152941,
      0.015686,
      -0.87451,
      0.57481,
      0.182468,
      0.013718,
      -0.74902,
      0.651765,
      0.212042,
      0.011734,
      -0.623529,
      0.752157,
      0.247474,
      0.007797,
      -0.498039,
      0.851719,
      0.283368,
      0.004475,
      -0.372549,
      0.898962,
      0.348328,
      0.039908,
      -0.247059,
      0.945652,
      0.413426,
      0.076401,
      -0.121569,
      0.969273,
      0.484291,
      0.157109,
      0.00392157,
      0.992157,
      0.554971,
      0.238185,
      0.129412,
      0.992157,
      0.619931,
      0.330704,
      0.254902,
      0.992157,
      0.684967,
      0.423837,
      0.380392,
      0.992157,
      0.751895,
      0.532103,
      0.505882,
      0.992249,
      0.817716,
      0.639354,
      0.631373,
      0.994218,
      0.861023,
      0.725967,
      0.756863,
      0.996186,
      0.903576,
      0.810965,
      0.882353,
      0.998155,
      0.933103,
      0.868051,
      1,
      1,
      0.960784,
      0.921569,
    ],
  },
  {
    ColorSpace: 'Lab',
    Name: 'Reds',
    RGBPoints: [
      -1,
      0.403922,
      0,
      0.05098,
      -0.87451,
      0.525967,
      0.029527,
      0.066728,
      -0.74902,
      0.647643,
      0.058962,
      0.082476,
      -0.623529,
      0.722445,
      0.076678,
      0.098224,
      -0.498039,
      0.797186,
      0.095194,
      0.114187,
      -0.372549,
      0.868051,
      0.164091,
      0.143714,
      -0.247059,
      0.937809,
      0.233541,
      0.173933,
      -0.121569,
      0.96143,
      0.326059,
      0.232987,
      0.00392157,
      0.984375,
      0.418147,
      0.292657,
      0.129412,
      0.986344,
      0.496886,
      0.371396,
      0.254902,
      0.988235,
      0.575702,
      0.450673,
      0.380392,
      0.988235,
      0.656409,
      0.543191,
      0.505882,
      0.98842,
      0.736747,
      0.635894,
      0.631373,
      0.992357,
      0.809581,
      0.732349,
      0.756863,
      0.996186,
      0.880692,
      0.826759,
      0.882353,
      0.998155,
      0.92203,
      0.885813,
      1,
      1,
      0.960784,
      0.941176,
    ],
  },
  {
    ColorSpace: 'Lab',
    Name: 'RdOr',
    RGBPoints: [
      -1,
      0.498039,
      0,
      0,
      -0.87451,
      0.6004,
      0,
      0,
      -0.74902,
      0.702514,
      0.000738,
      0.000477,
      -0.623529,
      0.773379,
      0.095225,
      0.061499,
      -0.498039,
      0.843875,
      0.189865,
      0.12283,
      -0.372549,
      0.891119,
      0.294195,
      0.203537,
      -0.247059,
      0.937855,
      0.397924,
      0.283137,
      -0.121569,
      0.963445,
      0.476663,
      0.316601,
      0.00392157,
      0.988297,
      0.555771,
      0.351665,
      0.129412,
      0.990265,
      0.646321,
      0.436309,
      0.254902,
      0.992157,
      0.735256,
      0.519646,
      0.380392,
      0.992157,
      0.784468,
      0.570827,
      0.505882,
      0.992249,
      0.833218,
      0.623483,
      0.631373,
      0.994218,
      0.872587,
      0.706159,
      0.756863,
      0.996186,
      0.911419,
      0.788189,
      0.882353,
      0.998155,
      0.940946,
      0.859054,
      1,
      1,
      0.968627,
      0.92549,
    ],
  },
  {
    ColorSpace: 'Lab',
    Name: 'BrOrYl',
    RGBPoints: [
      -1,
      0.4,
      0.145098,
      0.023529,
      -0.87451,
      0.500392,
      0.174625,
      0.019592,
      -0.74902,
      0.600784,
      0.204291,
      0.015656,
      -0.623529,
      0.701176,
      0.251534,
      0.011719,
      -0.498039,
      0.800984,
      0.299146,
      0.008397,
      -0.372549,
      0.863975,
      0.370012,
      0.043829,
      -0.247059,
      0.926321,
      0.441107,
      0.0794,
      -0.121569,
      0.961753,
      0.521815,
      0.120738,
      0.00392157,
      0.996078,
      0.602645,
      0.163122,
      0.129412,
      0.996078,
      0.68729,
      0.237924,
      0.254902,
      0.996078,
      0.771011,
      0.314879,
      0.380392,
      0.996078,
      0.832034,
      0.444798,
      0.505882,
      0.996171,
      0.892042,
      0.572595,
      0.631373,
      0.998139,
      0.931411,
      0.65724,
      0.756863,
      1,
      0.969489,
      0.741669,
      0.882353,
      1,
      0.985236,
      0.822376,
      1,
      1,
      1,
      0.898039,
    ],
  },
  {
    ColorSpace: 'Lab',
    Name: 'RdOrYl',
    RGBPoints: [
      -1,
      0.501961,
      0,
      0.14902,
      -0.87451,
      0.622038,
      0,
      0.14902,
      -0.74902,
      0.741761,
      0.0004,
      0.148866,
      -0.623529,
      0.816563,
      0.05158,
      0.129181,
      -0.498039,
      0.890965,
      0.10356,
      0.110235,
      -0.372549,
      0.940177,
      0.205921,
      0.137793,
      -0.247059,
      0.988281,
      0.308789,
      0.165536,
      -0.121569,
      0.99025,
      0.432803,
      0.200969,
      0.00392157,
      0.992218,
      0.555217,
      0.236278,
      0.129412,
      0.994187,
      0.628051,
      0.267774,
      0.254902,
      0.996078,
      0.701038,
      0.301269,
      0.380392,
      0.996078,
      0.777809,
      0.383945,
      0.505882,
      0.996171,
      0.852826,
      0.466621,
      0.631373,
      0.998139,
      0.892195,
      0.549296,
      0.756863,
      1,
      0.931349,
      0.632188,
      0.882353,
      1,
      0.966782,
      0.7188,
      1,
      1,
      1,
      0.8,
    ],
  },
  {
    ColorSpace: 'Lab',
    Name: 'CIELab_blue2red',
    RGBPoints: [-1, 0, 0.6, 0.74902, 1, 0.76863, 0.46667, 0.34118],
  },
  {
    ColorSpace: 'Lab',
    Name: 'blue2yellow',
    RGBPoints: [-1, 0, 0, 1, 0, 0.5, 0.5, 0.5, 1, 1, 1, 0],
  },
  {
    ColorSpace: 'Lab',
    Name: 'erdc_blue2gold',
    RGBPoints: [
      -1,
      0.175119,
      0.0438468,
      1,
      -0.874016,
      0.22383,
      0.159771,
      0.94557,
      -0.748031,
      0.27254,
      0.233611,
      0.891216,
      -0.622047,
      0.321251,
      0.296526,
      0.836857,
      -0.496063,
      0.369962,
      0.354296,
      0.782359,
      -0.370079,
      0.418672,
      0.409139,
      0.72754,
      -0.244094,
      0.467383,
      0.462152,
      0.672148,
      -0.11811,
      0.51609,
      0.51396,
      0.615825,
      0.00787402,
      0.572863,
      0.55452,
      0.559172,
      0.133858,
      0.630269,
      0.593822,
      0.517729,
      0.259843,
      0.689588,
      0.624668,
      0.47446,
      0.385827,
      0.745394,
      0.656113,
      0.428638,
      0.511811,
      0.798624,
      0.688104,
      0.379105,
      0.637795,
      0.849926,
      0.720593,
      0.323834,
      0.76378,
      0.899765,
      0.753543,
      0.258657,
      0.889764,
      0.948487,
      0.78692,
      0.171778,
      1,
      0.990413,
      0.816451,
      0.00729848,
    ],
  },
  {
    ColorSpace: 'Lab',
    Name: 'erdc_blue2yellow',
    RGBPoints: [
      -1,
      0.0830122,
      0,
      0.495617,
      -0.87451,
      0.141973,
      0.0551288,
      0.57363,
      -0.74902,
      0.193048,
      0.110258,
      0.604561,
      -0.623529,
      0.234231,
      0.165386,
      0.57643,
      -0.498039,
      0.275413,
      0.220515,
      0.548299,
      -0.372549,
      0.316596,
      0.275644,
      0.520169,
      -0.247059,
      0.357778,
      0.330773,
      0.492038,
      -0.121569,
      0.398961,
      0.385901,
      0.463908,
      0.00392157,
      0.449929,
      0.438487,
      0.426815,
      0.129412,
      0.511572,
      0.488299,
      0.379944,
      0.254902,
      0.581222,
      0.53603,
      0.325741,
      0.380392,
      0.650871,
      0.583761,
      0.271538,
      0.505882,
      0.720521,
      0.631493,
      0.217335,
      0.631373,
      0.79017,
      0.679224,
      0.163132,
      0.756863,
      0.85982,
      0.726955,
      0.108929,
      0.882353,
      0.910254,
      0.774159,
      0.14112,
      1,
      0.927513,
      0.81759,
      0.306289,
    ],
  },
  {
    ColorSpace: 'Lab',
    Name: 'erdc_cyan2orange',
    RGBPoints: [
      -1,
      0.0471513,
      0.213874,
      0.414329,
      -0.87451,
      0.0674702,
      0.256648,
      0.439027,
      -0.74902,
      0.0959957,
      0.299331,
      0.462089,
      -0.623529,
      0.132428,
      0.341872,
      0.483212,
      -0.498039,
      0.188743,
      0.38277,
      0.500597,
      -0.372549,
      0.268511,
      0.420229,
      0.512179,
      -0.247059,
      0.352945,
      0.455602,
      0.519101,
      -0.121569,
      0.43893,
      0.489368,
      0.521538,
      0.00392157,
      0.522445,
      0.522495,
      0.522436,
      0.129412,
      0.600089,
      0.555682,
      0.53205,
      0.254902,
      0.67988,
      0.587981,
      0.539163,
      0.380392,
      0.761011,
      0.619586,
      0.544439,
      0.505882,
      0.84278,
      0.650741,
      0.548567,
      0.631373,
      0.910713,
      0.687347,
      0.557822,
      0.756863,
      0.952232,
      0.734972,
      0.577775,
      0.882353,
      0.975642,
      0.789858,
      0.604868,
      1,
      0.990752,
      0.843643,
      0.632857,
    ],
  },
  {
    ColorSpace: 'Lab',
    Name: 'erdc_purple2green',
    RGBPoints: [
      -1,
      0.235006,
      0.0483128,
      0.530899,
      -0.87451,
      0.302968,
      0.108419,
      0.552391,
      -0.74902,
      0.360241,
      0.166059,
      0.569502,
      -0.623529,
      0.406746,
      0.226782,
      0.579373,
      -0.498039,
      0.444073,
      0.28964,
      0.582094,
      -0.372549,
      0.473648,
      0.353774,
      0.577947,
      -0.247059,
      0.497636,
      0.418154,
      0.567911,
      -0.121569,
      0.519086,
      0.481741,
      0.553968,
      0.00392157,
      0.542884,
      0.542914,
      0.542875,
      0.129412,
      0.566303,
      0.603989,
      0.527499,
      0.254902,
      0.595218,
      0.662965,
      0.516857,
      0.380392,
      0.628641,
      0.720701,
      0.510673,
      0.505882,
      0.665373,
      0.777849,
      0.508165,
      0.631373,
      0.704182,
      0.834921,
      0.508303,
      0.756863,
      0.743846,
      0.892328,
      0.50999,
      0.882353,
      0.783158,
      0.950422,
      0.512181,
      1,
      0.818617,
      1,
      0.513888,
    ],
  },
  {
    ColorSpace: 'Lab',
    Name: 'erdc_purple2green_dark',
    RGBPoints: [
      -1,
      0.107656,
      0,
      0.428682,
      -0.87451,
      0.1924,
      0,
      0.449799,
      -0.74902,
      0.255118,
      0.0648939,
      0.466726,
      -0.623529,
      0.304256,
      0.133066,
      0.476703,
      -0.498039,
      0.343202,
      0.19716,
      0.479793,
      -0.372549,
      0.373876,
      0.260353,
      0.476241,
      -0.247059,
      0.398497,
      0.322872,
      0.466953,
      -0.121569,
      0.420016,
      0.384252,
      0.453785,
      0.00392157,
      0.44319,
      0.443216,
      0.443186,
      0.129412,
      0.465553,
      0.502139,
      0.428233,
      0.254902,
      0.492959,
      0.559151,
      0.417591,
      0.380392,
      0.524654,
      0.615092,
      0.411016,
      0.505882,
      0.55959,
      0.670583,
      0.40779,
      0.631373,
      0.596614,
      0.726102,
      0.406948,
      0.756863,
      0.634544,
      0.782032,
      0.407439,
      0.882353,
      0.672183,
      0.838703,
      0.408237,
      1,
      0.706131,
      0.892759,
      0.408452,
    ],
  },
  {
    ColorSpace: 'Lab',
    Name: 'coolwarm',
    RGBPoints: [
      -1,
      0.229806,
      0.298718,
      0.753683,
      -0.875,
      0.303869,
      0.406535,
      0.844959,
      -0.75,
      0.383013,
      0.509419,
      0.917388,
      -0.625,
      0.466667,
      0.604563,
      0.968155,
      -0.5,
      0.552953,
      0.688929,
      0.995376,
      -0.375,
      0.639176,
      0.7596,
      0.998151,
      -0.25,
      0.722193,
      0.813953,
      0.976575,
      -0.125,
      0.798692,
      0.849786,
      0.931689,
      0,
      0.865395,
      0.86541,
      0.865396,
      0.125,
      0.924128,
      0.827385,
      0.774508,
      0.25,
      0.958853,
      0.769768,
      0.678008,
      0.375,
      0.969954,
      0.694267,
      0.579375,
      0.5,
      0.958003,
      0.602842,
      0.481776,
      0.625,
      0.923945,
      0.497309,
      0.38797,
      0.75,
      0.869187,
      0.378313,
      0.300267,
      0.875,
      0.795632,
      0.241284,
      0.220526,
      1,
      0.705673,
      0.0155562,
      0.150233,
    ],
  },
  {
    ColorSpace: 'Lab',
    Name: 'BuRd',
    RGBPoints: [
      -1,
      0.019608,
      0.188235,
      0.380392,
      -0.87451,
      0.088504,
      0.321107,
      0.564937,
      -0.74902,
      0.163399,
      0.444983,
      0.697501,
      -0.623529,
      0.247059,
      0.555709,
      0.754095,
      -0.498039,
      0.420684,
      0.676432,
      0.818685,
      -0.372549,
      0.606459,
      0.789773,
      0.880277,
      -0.247059,
      0.761476,
      0.868512,
      0.924567,
      -0.121569,
      0.878047,
      0.925721,
      0.951942,
      0.00392157,
      0.969089,
      0.966474,
      0.964937,
      0.129412,
      0.983852,
      0.897578,
      0.846828,
      0.254902,
      0.982468,
      0.800692,
      0.706113,
      0.380392,
      0.960323,
      0.66782,
      0.536332,
      0.505882,
      0.894579,
      0.503806,
      0.399769,
      0.631373,
      0.81707,
      0.33218,
      0.281046,
      0.756863,
      0.728489,
      0.155017,
      0.197386,
      0.882353,
      0.576932,
      0.055363,
      0.14925,
      1,
      0.403922,
      0,
      0.121569,
    ],
  },
  {
    ColorSpace: 'Lab',
    Name: 'Spectral_lowBlue',
    RGBPoints: [
      -1,
      0.368627,
      0.309804,
      0.635294,
      -0.87451,
      0.260361,
      0.450058,
      0.70173,
      -0.74902,
      0.248058,
      0.591311,
      0.717186,
      -0.623529,
      0.376009,
      0.734025,
      0.658132,
      -0.498039,
      0.537947,
      0.814764,
      0.64506,
      -0.372549,
      0.702345,
      0.879585,
      0.636678,
      -0.247059,
      0.84752,
      0.938639,
      0.607151,
      -0.121569,
      0.940408,
      0.976163,
      0.656055,
      0.00392157,
      0.999923,
      0.997616,
      0.745021,
      0.129412,
      0.997463,
      0.921338,
      0.61707,
      0.254902,
      0.995002,
      0.824606,
      0.499885,
      0.380392,
      0.992541,
      0.701576,
      0.39654,
      0.505882,
      0.973472,
      0.547405,
      0.318108,
      0.631373,
      0.937793,
      0.398539,
      0.270127,
      0.756863,
      0.861515,
      0.282891,
      0.299654,
      0.882353,
      0.746482,
      0.144637,
      0.288812,
      1,
      0.619608,
      0.003922,
      0.258824,
    ],
  },
  {
    ColorSpace: 'Lab',
    Name: 'GnRP',
    RGBPoints: [
      -1,
      0,
      0.266667,
      0.105882,
      -0.87451,
      0.066436,
      0.394617,
      0.174779,
      -0.74902,
      0.168858,
      0.524567,
      0.25767,
      -0.623529,
      0.323875,
      0.657439,
      0.361015,
      -0.498039,
      0.504883,
      0.772318,
      0.506344,
      -0.372549,
      0.678431,
      0.870127,
      0.654902,
      -0.247059,
      0.803922,
      0.921799,
      0.780392,
      -0.121569,
      0.897116,
      0.951942,
      0.882814,
      0.00392157,
      0.967397,
      0.965936,
      0.967474,
      0.129412,
      0.928028,
      0.879815,
      0.930565,
      0.254902,
      0.866052,
      0.780777,
      0.882891,
      0.380392,
      0.77501,
      0.665129,
      0.821376,
      0.505882,
      0.675663,
      0.537024,
      0.737024,
      0.631373,
      0.57847,
      0.396155,
      0.645982,
      0.756863,
      0.492349,
      0.223914,
      0.547559,
      0.882353,
      0.375548,
      0.096886,
      0.423299,
      1,
      0.25098,
      0,
      0.294118,
    ],
  },
  {
    ColorSpace: 'Lab',
    Name: 'GYPi',
    RGBPoints: [
      -1,
      0.152941,
      0.392157,
      0.098039,
      -0.87451,
      0.246444,
      0.505344,
      0.117724,
      -0.74902,
      0.351942,
      0.614533,
      0.161399,
      -0.623529,
      0.474971,
      0.717878,
      0.240138,
      -0.498039,
      0.611995,
      0.811226,
      0.392849,
      -0.372549,
      0.746328,
      0.893118,
      0.565321,
      -0.247059,
      0.859516,
      0.94233,
      0.747405,
      -0.121569,
      0.928105,
      0.96386,
      0.875663,
      0.00392157,
      0.969089,
      0.966859,
      0.968012,
      0.129412,
      0.983852,
      0.910265,
      0.948328,
      0.254902,
      0.979239,
      0.833218,
      0.914648,
      0.380392,
      0.949712,
      0.729873,
      0.862976,
      0.505882,
      0.905652,
      0.58293,
      0.763552,
      0.631373,
      0.85521,
      0.410073,
      0.652211,
      0.756863,
      0.793695,
      0.183699,
      0.531642,
      0.882353,
      0.683737,
      0.063899,
      0.420761,
      1,
      0.556863,
      0.003922,
      0.321569,
    ],
  },
  {
    ColorSpace: 'Lab',
    Name: 'GnYlRd',
    RGBPoints: [
      -1,
      0,
      0.407843,
      0.215686,
      -0.87451,
      0.063975,
      0.525952,
      0.277201,
      -0.74902,
      0.177932,
      0.633064,
      0.332718,
      -0.623529,
      0.364937,
      0.724106,
      0.379469,
      -0.498039,
      0.527951,
      0.797155,
      0.40223,
      -0.372549,
      0.678431,
      0.862822,
      0.433449,
      -0.247059,
      0.803922,
      0.916955,
      0.514648,
      -0.121569,
      0.909419,
      0.961861,
      0.625067,
      0.00392157,
      0.999923,
      0.997616,
      0.745021,
      0.129412,
      0.997463,
      0.921338,
      0.61707,
      0.254902,
      0.995002,
      0.824606,
      0.499885,
      0.380392,
      0.992541,
      0.701576,
      0.39654,
      0.505882,
      0.973472,
      0.547405,
      0.318108,
      0.631373,
      0.939023,
      0.389927,
      0.245521,
      0.756863,
      0.867666,
      0.239831,
      0.176624,
      0.882353,
      0.762399,
      0.110727,
      0.151326,
      1,
      0.647059,
      0,
      0.14902,
    ],
  },
  {
    ColorSpace: 'Lab',
    Name: 'GBBr',
    RGBPoints: [
      -1,
      0,
      0.235294,
      0.188235,
      -0.87451,
      0.002461,
      0.338639,
      0.301423,
      -0.74902,
      0.055902,
      0.448981,
      0.417609,
      -0.623529,
      0.183852,
      0.56955,
      0.538178,
      -0.498039,
      0.357785,
      0.700115,
      0.660746,
      -0.372549,
      0.540177,
      0.819531,
      0.77624,
      -0.247059,
      0.714879,
      0.890888,
      0.864821,
      -0.121569,
      0.851134,
      0.934564,
      0.922645,
      0.00392157,
      0.960861,
      0.959785,
      0.95694,
      0.129412,
      0.963322,
      0.927797,
      0.83391,
      0.254902,
      0.939946,
      0.868897,
      0.68935,
      0.380392,
      0.883353,
      0.775394,
      0.517109,
      0.505882,
      0.808074,
      0.625836,
      0.324106,
      0.631373,
      0.717647,
      0.476355,
      0.15494,
      0.756863,
      0.592157,
      0.358247,
      0.06882,
      0.882353,
      0.458593,
      0.26436,
      0.031142,
      1,
      0.329412,
      0.188235,
      0.019608,
    ],
  },
  {
    ColorSpace: 'Lab',
    Name: 'PuOr',
    RGBPoints: [
      -1,
      0.498039,
      0.231373,
      0.031373,
      -0.87451,
      0.62599,
      0.30273,
      0.026451,
      -0.74902,
      0.746943,
      0.387082,
      0.037524,
      -0.623529,
      0.85767,
      0.490427,
      0.071972,
      -0.498039,
      0.936409,
      0.617762,
      0.236371,
      -0.372549,
      0.992695,
      0.743099,
      0.43291,
      -0.247059,
      0.995156,
      0.841523,
      0.63714,
      -0.121569,
      0.985313,
      0.913802,
      0.813687,
      0.00392157,
      0.966244,
      0.966398,
      0.967705,
      0.129412,
      0.889965,
      0.89504,
      0.938178,
      0.254902,
      0.806151,
      0.804306,
      0.894656,
      0.380392,
      0.712649,
      0.688658,
      0.833141,
      0.505882,
      0.594233,
      0.554325,
      0.744637,
      0.631373,
      0.474894,
      0.404229,
      0.652364,
      0.756863,
      0.366628,
      0.217224,
      0.563783,
      0.882353,
      0.266436,
      0.089965,
      0.434833,
      1,
      0.176471,
      0,
      0.294118,
    ],
  },
  {
    ColorSpace: 'Lab',
    Name: 'PRGn',
    RGBPoints: [
      -1,
      0.25098,
      0,
      0.294118,
      -0.87451,
      0.383852,
      0.103345,
      0.431911,
      -0.74902,
      0.497732,
      0.234679,
      0.55371,
      -0.623529,
      0.583852,
      0.40692,
      0.652134,
      -0.498039,
      0.681968,
      0.545175,
      0.742561,
      -0.372549,
      0.7807,
      0.672357,
      0.825221,
      -0.247059,
      0.871742,
      0.788005,
      0.886736,
      -0.121569,
      0.930488,
      0.885198,
      0.932872,
      0.00392157,
      0.966321,
      0.968089,
      0.965859,
      0.129412,
      0.892503,
      0.950865,
      0.877278,
      0.254902,
      0.796078,
      0.91857,
      0.772549,
      0.380392,
      0.670588,
      0.866897,
      0.647059,
      0.505882,
      0.493195,
      0.765398,
      0.496655,
      0.631373,
      0.314187,
      0.649135,
      0.354556,
      0.756863,
      0.15917,
      0.516263,
      0.251211,
      0.882353,
      0.062284,
      0.386621,
      0.170473,
      1,
      0,
      0.266667,
      0.105882,
    ],
  },
  {
    ColorSpace: 'Lab',
    Name: 'PiYG',
    RGBPoints: [
      -1,
      0.556863,
      0.003922,
      0.321569,
      -0.87451,
      0.692195,
      0.067897,
      0.427374,
      -0.74902,
      0.797539,
      0.197847,
      0.539177,
      -0.623529,
      0.859054,
      0.424221,
      0.659746,
      -0.498039,
      0.908574,
      0.592618,
      0.770319,
      -0.372549,
      0.951557,
      0.736332,
      0.866205,
      -0.247059,
      0.981084,
      0.839677,
      0.917878,
      -0.121569,
      0.98293,
      0.913802,
      0.949558,
      0.00392157,
      0.96732,
      0.968474,
      0.965629,
      0.129412,
      0.92549,
      0.963552,
      0.869666,
      0.254902,
      0.852441,
      0.939254,
      0.736025,
      0.380392,
      0.739254,
      0.890042,
      0.553941,
      0.505882,
      0.60323,
      0.805536,
      0.382238,
      0.631373,
      0.467282,
      0.711419,
      0.235217,
      0.756863,
      0.344252,
      0.608074,
      0.156478,
      0.882353,
      0.2406,
      0.49827,
      0.116494,
      1,
      0.152941,
      0.392157,
      0.098039,
    ],
  },
  {
    ColorSpace: 'Lab',
    Name: 'OrPu',
    RGBPoints: [
      -1,
      0.176471,
      0,
      0.294118,
      -0.87451,
      0.272434,
      0.095963,
      0.444214,
      -0.74902,
      0.373395,
      0.228912,
      0.56932,
      -0.623529,
      0.481661,
      0.415917,
      0.657901,
      -0.498039,
      0.601922,
      0.562937,
      0.750481,
      -0.372549,
      0.718493,
      0.695886,
      0.836986,
      -0.247059,
      0.811995,
      0.811534,
      0.898501,
      -0.121569,
      0.894733,
      0.8995,
      0.940023,
      0.00392157,
      0.969166,
      0.966859,
      0.963629,
      0.129412,
      0.98639,
      0.910265,
      0.803691,
      0.254902,
      0.995002,
      0.835371,
      0.624375,
      0.380392,
      0.992541,
      0.736947,
      0.420146,
      0.505882,
      0.931949,
      0.609458,
      0.224221,
      0.631373,
      0.85075,
      0.483968,
      0.069819,
      0.756863,
      0.740023,
      0.380623,
      0.035371,
      0.882353,
      0.617993,
      0.29827,
      0.026759,
      1,
      0.498039,
      0.231373,
      0.031373,
    ],
  },
  {
    ColorSpace: 'Lab',
    Name: 'BrBG',
    RGBPoints: [
      -1,
      0.329412,
      0.188235,
      0.019608,
      -0.87451,
      0.467205,
      0.269435,
      0.031911,
      -0.74902,
      0.6,
      0.365629,
      0.074202,
      -0.623529,
      0.72549,
      0.483737,
      0.160323,
      -0.498039,
      0.812995,
      0.635832,
      0.336409,
      -0.372549,
      0.88689,
      0.781238,
      0.527874,
      -0.247059,
      0.943483,
      0.87474,
      0.700115,
      -0.121569,
      0.963168,
      0.929796,
      0.841599,
      0.00392157,
      0.957247,
      0.959938,
      0.959554,
      0.129412,
      0.84406,
      0.932872,
      0.920185,
      0.254902,
      0.70396,
      0.886428,
      0.859285,
      0.380392,
      0.529258,
      0.815071,
      0.770704,
      0.505882,
      0.346251,
      0.691811,
      0.653057,
      0.631373,
      0.175855,
      0.562015,
      0.530642,
      0.756863,
      0.047905,
      0.441446,
      0.410073,
      0.882353,
      0.002307,
      0.33218,
      0.294348,
      1,
      0,
      0.235294,
      0.188235,
    ],
  },
  {
    ColorSpace: 'Lab',
    Name: 'GyRd',
    RGBPoints: [
      -1,
      0.101961,
      0.101961,
      0.101961,
      -0.87451,
      0.227451,
      0.227451,
      0.227451,
      -0.74902,
      0.359939,
      0.359939,
      0.359939,
      -0.623529,
      0.502653,
      0.502653,
      0.502653,
      -0.498039,
      0.631373,
      0.631373,
      0.631373,
      -0.372549,
      0.749865,
      0.749865,
      0.749865,
      -0.247059,
      0.843368,
      0.843368,
      0.843368,
      -0.121569,
      0.926105,
      0.926105,
      0.926105,
      0.00392157,
      0.999846,
      0.997232,
      0.995694,
      0.129412,
      0.994925,
      0.908651,
      0.857901,
      0.254902,
      0.982468,
      0.800692,
      0.706113,
      0.380392,
      0.960323,
      0.66782,
      0.536332,
      0.505882,
      0.894579,
      0.503806,
      0.399769,
      0.631373,
      0.81707,
      0.33218,
      0.281046,
      0.756863,
      0.728489,
      0.155017,
      0.197386,
      0.882353,
      0.576932,
      0.055363,
      0.14925,
      1,
      0.403922,
      0,
      0.121569,
    ],
  },
  {
    ColorSpace: 'Lab',
    Name: 'erdc_divHi_purpleGreen',
    RGBPoints: [
      -1,
      0.297553,
      0,
      0.489074,
      -0.87451,
      0.40259,
      0.151146,
      0.567754,
      -0.74902,
      0.516038,
      0.284843,
      0.658231,
      -0.623529,
      0.629783,
      0.423646,
      0.750938,
      -0.498039,
      0.735198,
      0.563697,
      0.835956,
      -0.372549,
      0.82408,
      0.695541,
      0.903582,
      -0.247059,
      0.889091,
      0.807454,
      0.944862,
      -0.121569,
      0.92334,
      0.886917,
      0.951839,
      0.00392157,
      0.921045,
      0.921084,
      0.921003,
      0.129412,
      0.877324,
      0.907455,
      0.845381,
      0.254902,
      0.797649,
      0.849713,
      0.734695,
      0.380392,
      0.691646,
      0.75964,
      0.600532,
      0.505882,
      0.568981,
      0.649159,
      0.453807,
      0.631373,
      0.438945,
      0.529756,
      0.304259,
      0.756863,
      0.30973,
      0.412001,
      0.158303,
      0.882353,
      0.187078,
      0.305111,
      0.00251458,
      1,
      0.101655,
      0.220836,
      0,
    ],
  },
  {
    ColorSpace: 'Lab',
    Name: 'erdc_divHi_purpleGreen_dim',
    RGBPoints: [
      -1,
      0.404088,
      0.131038,
      0.592767,
      -0.87451,
      0.486469,
      0.230957,
      0.651243,
      -0.74902,
      0.575165,
      0.339335,
      0.717723,
      -0.623529,
      0.662741,
      0.454332,
      0.784263,
      -0.498039,
      0.742071,
      0.570213,
      0.842918,
      -0.372549,
      0.806935,
      0.678992,
      0.886227,
      -0.247059,
      0.852219,
      0.771315,
      0.90763,
      -0.121569,
      0.873345,
      0.837327,
      0.901572,
      0.00392157,
      0.866783,
      0.86682,
      0.866745,
      0.129412,
      0.82839,
      0.858225,
      0.796812,
      0.254902,
      0.762578,
      0.814287,
      0.700202,
      0.380392,
      0.676429,
      0.744229,
      0.585735,
      0.505882,
      0.577033,
      0.65732,
      0.461526,
      0.631373,
      0.47128,
      0.562476,
      0.33476,
      0.756863,
      0.365461,
      0.467957,
      0.21076,
      0.882353,
      0.264758,
      0.381138,
      0.0878313,
      1,
      0.182591,
      0.312249,
      0,
    ],
  },
  {
    ColorSpace: 'Lab',
    Name: 'erdc_divLow_icePeach',
    RGBPoints: [
      -1,
      0.480048,
      0.817441,
      0.998056,
      -0.87451,
      0.425898,
      0.726921,
      0.883187,
      -0.74902,
      0.366682,
      0.629445,
      0.761936,
      -0.623529,
      0.308756,
      0.531002,
      0.640217,
      -0.498039,
      0.258021,
      0.43705,
      0.523433,
      -0.372549,
      0.219244,
      0.352381,
      0.416348,
      -0.247059,
      0.195127,
      0.281032,
      0.322979,
      -0.121569,
      0.186286,
      0.22627,
      0.246525,
      0.00392157,
      0.192352,
      0.19236,
      0.192364,
      0.129412,
      0.255927,
      0.214469,
      0.191756,
      0.254902,
      0.340459,
      0.254426,
      0.206666,
      0.380392,
      0.444655,
      0.309315,
      0.234029,
      0.505882,
      0.565353,
      0.376004,
      0.270969,
      0.631373,
      0.697917,
      0.450748,
      0.314293,
      0.756863,
      0.836657,
      0.529064,
      0.360227,
      0.882353,
      0.972695,
      0.614884,
      0.413123,
      1,
      1,
      0.705904,
      0.472699,
    ],
  },
  {
    ColorSpace: 'Lab',
    Name: 'erdc_divLow_purpleGreen',
    RGBPoints: [
      -1,
      0.956034,
      0.666487,
      0.952663,
      -0.87451,
      0.874457,
      0.572698,
      0.936352,
      -0.74902,
      0.753465,
      0.488253,
      0.909063,
      -0.623529,
      0.63309,
      0.413507,
      0.763833,
      -0.498039,
      0.514491,
      0.345878,
      0.620015,
      -0.372549,
      0.405008,
      0.288141,
      0.484376,
      -0.247059,
      0.311388,
      0.241986,
      0.363556,
      -0.121569,
      0.238722,
      0.209044,
      0.263449,
      0.00392157,
      0.192352,
      0.192366,
      0.192362,
      0.129412,
      0.200379,
      0.233201,
      0.168618,
      0.254902,
      0.230151,
      0.291737,
      0.165227,
      0.380392,
      0.279481,
      0.366076,
      0.178607,
      0.505882,
      0.344927,
      0.453267,
      0.205703,
      0.631373,
      0.421554,
      0.549449,
      0.242643,
      0.756863,
      0.503334,
      0.649999,
      0.284377,
      0.882353,
      0.583497,
      0.749672,
      0.324969,
      1,
      0.650705,
      0.837228,
      0.356264,
    ],
  },
  {
    ColorSpace: 'Lab',
    Name: 'Haze_green',
    RGBPoints: [
      -1,
      1,
      0.835294,
      0.886275,
      -0.87451,
      0.937255,
      0.756863,
      0.870443,
      -0.74902,
      0.875817,
      0.666376,
      0.857807,
      -0.623529,
      0.778359,
      0.583007,
      0.808134,
      -0.498039,
      0.676253,
      0.494118,
      0.745098,
      -0.372549,
      0.561365,
      0.390123,
      0.682353,
      -0.247059,
      0.438344,
      0.262745,
      0.621496,
      -0.121569,
      0.321133,
      0.141031,
      0.558751,
      0.00392157,
      0.203922,
      0.0217865,
      0.495861,
      0.129412,
      0.265505,
      0.129412,
      0.433261,
      0.254902,
      0.311692,
      0.255338,
      0.37008,
      0.380392,
      0.356282,
      0.377342,
      0.310821,
      0.505882,
      0.39971,
      0.488889,
      0.258243,
      0.631373,
      0.442556,
      0.604357,
      0.205519,
      0.756863,
      0.48671,
      0.71968,
      0.152941,
      0.882353,
      0.529847,
      0.830356,
      0.100944,
      1,
      0.572549,
      0.933333,
      0.054902,
    ],
  },
  {
    ColorSpace: 'Lab',
    Name: 'Haze_lime',
    RGBPoints: [
      -1,
      0.704034,
      0.784196,
      1,
      -0.87451,
      0.633111,
      0.691418,
      0.956078,
      -0.74902,
      0.564021,
      0.600606,
      0.912157,
      -0.623529,
      0.496827,
      0.51189,
      0.868235,
      -0.498039,
      0.43157,
      0.425416,
      0.824314,
      -0.372549,
      0.368248,
      0.341347,
      0.780392,
      -0.247059,
      0.306767,
      0.259855,
      0.736471,
      -0.121569,
      0.246862,
      0.181069,
      0.692549,
      0.00392157,
      0.191619,
      0.109542,
      0.648627,
      0.129412,
      0.257404,
      0.194031,
      0.604706,
      0.254902,
      0.321794,
      0.278775,
      0.560784,
      0.380392,
      0.387909,
      0.364617,
      0.516863,
      0.505882,
      0.456569,
      0.451881,
      0.472941,
      0.631373,
      0.527424,
      0.540773,
      0.42902,
      0.756863,
      0.599759,
      0.631427,
      0.385098,
      0.882353,
      0.673065,
      0.723898,
      0.341176,
      1,
      0.742751,
      0.812252,
      0.3,
    ],
  },
  {
    ColorSpace: 'RGB',
    Name: 'Haze',
    RGBPoints: [
      -1,
      1,
      0.835294,
      0.996078,
      -0.00392157,
      0.023529,
      0.141176,
      0.498039,
      0.00392157,
      0.015686,
      0.137255,
      0.494118,
      1,
      0.984314,
      0.764706,
      0,
    ],
  },
  {
    ColorSpace: 'Lab',
    Name: 'Haze_cyan',
    RGBPoints: [
      -1,
      0.956863,
      1,
      0.835294,
      -0.87451,
      0.933188,
      0.921714,
      0.760784,
      -0.74902,
      0.870588,
      0.803486,
      0.671605,
      -0.623529,
      0.807843,
      0.684096,
      0.583297,
      -0.498039,
      0.745098,
      0.569208,
      0.494118,
      -0.372549,
      0.682353,
      0.437763,
      0.390123,
      -0.247059,
      0.621496,
      0.288163,
      0.262745,
      -0.121569,
      0.558751,
      0.144517,
      0.141031,
      0.00392157,
      0.495861,
      0.0217865,
      0.0413943,
      0.129412,
      0.433261,
      0.137255,
      0.129412,
      0.254902,
      0.37008,
      0.263181,
      0.255338,
      0.380392,
      0.306318,
      0.381845,
      0.372694,
      0.505882,
      0.243137,
      0.503994,
      0.494263,
      0.631373,
      0.180392,
      0.629484,
      0.619753,
      0.756863,
      0.117647,
      0.754975,
      0.747131,
      0.882353,
      0.054902,
      0.876398,
      0.866812,
      1,
      0,
      0.988235,
      0.976471,
    ],
  },
  {
    ColorSpace: 'Lab',
    Name: 'nic_Edge',
    RGBPoints: [
      -1,
      0.191208,
      0.191208,
      0.191208,
      -0.87451,
      0.239484,
      0.00545035,
      0.614821,
      -0.74902,
      0.220593,
      0.0617459,
      0.863547,
      -0.623529,
      0.17509,
      0.278988,
      0.97794,
      -0.498039,
      0.143526,
      0.576069,
      0.998553,
      -0.372549,
      0.166456,
      0.871883,
      0.96594,
      -0.247059,
      0.376202,
      0.993555,
      0.981833,
      -0.121569,
      0.681996,
      0.991297,
      0.999239,
      0.00392157,
      0.954172,
      0.952734,
      0.94374,
      0.129412,
      0.999735,
      0.99301,
      0.662896,
      0.254902,
      0.979399,
      0.991466,
      0.357973,
      0.380392,
      0.968771,
      0.854967,
      0.162659,
      0.505882,
      0.999245,
      0.556697,
      0.144323,
      0.631373,
      0.973959,
      0.26223,
      0.177946,
      0.756863,
      0.852358,
      0.0526707,
      0.222974,
      0.882353,
      0.593889,
      0.00912724,
      0.238855,
      1,
      0.191208,
      0.191208,
      0.191208,
    ],
  },
  {
    ColorSpace: 'Lab',
    Name: 'erdc_iceFire_H',
    RGBPoints: [
      -1,
      4.05432e-7,
      0,
      0.00000590122,
      -0.87451,
      0,
      0.120401,
      0.302675,
      -0.74902,
      0,
      0.216583,
      0.524574,
      -0.623529,
      0.0552475,
      0.345025,
      0.6595,
      -0.498039,
      0.128047,
      0.492588,
      0.720288,
      -0.372549,
      0.188955,
      0.641309,
      0.792092,
      -0.247059,
      0.327673,
      0.784935,
      0.873434,
      -0.121569,
      0.60824,
      0.892164,
      0.935547,
      0.00392157,
      0.881371,
      0.912178,
      0.818099,
      0.129412,
      0.951407,
      0.835621,
      0.449279,
      0.254902,
      0.904481,
      0.690489,
      0,
      0.380392,
      0.85407,
      0.510864,
      0,
      0.505882,
      0.777093,
      0.33018,
      0.00088199,
      0.631373,
      0.672862,
      0.139087,
      0.00269398,
      0.756863,
      0.508815,
      0,
      0,
      0.882353,
      0.299417,
      0.000366289,
      0.000547829,
      1,
      0.0157519,
      0.00332021,
      4.55569e-8,
    ],
  },
  {
    ColorSpace: 'Lab',
    Name: 'erdc_iceFire_L',
    RGBPoints: [
      -1,
      0.870485,
      0.913768,
      0.832905,
      -0.87451,
      0.586919,
      0.887865,
      0.934003,
      -0.74902,
      0.31583,
      0.776442,
      0.867858,
      -0.623529,
      0.18302,
      0.632034,
      0.787722,
      -0.498039,
      0.117909,
      0.484134,
      0.713825,
      -0.372549,
      0.0507239,
      0.335979,
      0.654741,
      -0.247059,
      0,
      0.209874,
      0.511832,
      -0.121569,
      0,
      0.114689,
      0.28935,
      0.00392157,
      0.0157519,
      0.00332021,
      4.55569e-8,
      0.129412,
      0.312914,
      0,
      0,
      0.254902,
      0.520865,
      0,
      0,
      0.380392,
      0.680105,
      0.15255,
      0.0025996,
      0.505882,
      0.785109,
      0.339479,
      0.000797922,
      0.631373,
      0.857354,
      0.522494,
      0,
      0.756863,
      0.910974,
      0.699774,
      0,
      0.882353,
      0.951921,
      0.842817,
      0.478545,
      1,
      0.881371,
      0.912178,
      0.818099,
    ],
  },
  {
    ColorSpace: 'RGB',
    Name: 'hsv',
    RGBPoints: [
      -1,
      1,
      0,
      0,
      -0.666666,
      1,
      0,
      1,
      -0.333333,
      0,
      0,
      1,
      0,
      0,
      1,
      1,
      0.33333,
      0,
      1,
      0,
      0.66666,
      1,
      1,
      0,
      1,
      1,
      0,
      0,
    ],
  },
  {
    ColorSpace: 'Lab',
    Name: 'hue_L60',
    RGBPoints: [
      -1,
      0.964784,
      0.400592,
      0.349549,
      -0.87451,
      0.964915,
      0.372498,
      0.53785,
      -0.74902,
      0.892353,
      0.401039,
      0.759569,
      -0.623529,
      0.79263,
      0.446956,
      0.903017,
      -0.498039,
      0.682208,
      0.49954,
      0.966673,
      -0.372549,
      0.56392,
      0.553082,
      0.968836,
      -0.247059,
      0.442031,
      0.606396,
      0.901601,
      -0.121569,
      0.305499,
      0.65701,
      0.765784,
      0.00392157,
      0.197251,
      0.687914,
      0.620914,
      0.129412,
      0.193882,
      0.701887,
      0.472654,
      0.254902,
      0.249866,
      0.706123,
      0.320005,
      0.380392,
      0.35132,
      0.697417,
      0.202919,
      0.505882,
      0.498097,
      0.669467,
      0.125232,
      0.631373,
      0.637477,
      0.626239,
      0.107431,
      0.756863,
      0.762115,
      0.56872,
      0.155812,
      0.882353,
      0.889434,
      0.481116,
      0.240445,
      1,
      0.964784,
      0.400592,
      0.349549,
    ],
  },
  {
    IndexedColors: [
      0,
      0,
      0,
      0.8941176470588236,
      0.1019607843137255,
      0.1098039215686274,
      0.2156862745098039,
      0.4941176470588236,
      0.7215686274509804,
      0.3019607843137255,
      0.6862745098039216,
      0.2901960784313726,
      0.596078431372549,
      0.3058823529411765,
      0.6392156862745098,
      1,
      0.4980392156862745,
      0,
      0.6509803921568628,
      0.3372549019607843,
      0.1568627450980392,
    ],
    Name: 'Spectrum',
    NanColor: [0.6509803921568628, 0.3372549019607843, 0.1568627450980392],
  },
  {
    IndexedColors: [
      0.4745098039215686,
      0.09019607843137255,
      0.09019607843137255,
      0.7098039215686275,
      0.00392156862745098,
      0.00392156862745098,
      0.9372549019607843,
      0.2784313725490196,
      0.09803921568627451,
      0.9764705882352941,
      0.5137254901960784,
      0.1411764705882353,
      1,
      0.7058823529411765,
      0,
      1,
      0.8980392156862745,
      0.02352941176470588,
    ],
    Name: 'Warm',
    NanColor: [1, 0.8980392156862745, 0.02352941176470588],
  },
  {
    IndexedColors: [
      0.4588235294117647,
      0.6941176470588235,
      0.00392156862745098,
      0.3450980392156863,
      0.5019607843137255,
      0.1607843137254902,
      0.3137254901960784,
      0.8431372549019608,
      0.7490196078431373,
      0.1098039215686274,
      0.5843137254901961,
      0.803921568627451,
      0.2313725490196079,
      0.407843137254902,
      0.6705882352941176,
      0.6039215686274509,
      0.407843137254902,
      1,
      0.3725490196078431,
      0.2,
      0.5019607843137255,
    ],
    Name: 'Cool',
    NanColor: [0.3725490196078431, 0.2, 0.5019607843137255],
  },
  {
    IndexedColors: [
      0.2313725490196079,
      0.407843137254902,
      0.6705882352941176,
      0.1098039215686274,
      0.5843137254901961,
      0.803921568627451,
      0.3058823529411765,
      0.8509803921568627,
      0.9176470588235294,
      0.4509803921568628,
      0.6039215686274509,
      0.8352941176470589,
      0.2588235294117647,
      0.2392156862745098,
      0.6627450980392157,
      0.3137254901960784,
      0.3294117647058823,
      0.5294117647058824,
      0.06274509803921569,
      0.1647058823529412,
      0.3215686274509804,
    ],
    Name: 'Blues',
    NanColor: [0.06274509803921569, 0.1647058823529412, 0.3215686274509804],
  },
  {
    IndexedColors: [
      0.1098039215686274,
      0.5843137254901961,
      0.803921568627451,
      0.2313725490196079,
      0.407843137254902,
      0.6705882352941176,
      0.4,
      0.2431372549019608,
      0.7176470588235294,
      0.6352941176470588,
      0.3294117647058823,
      0.8117647058823529,
      0.8705882352941177,
      0.3803921568627451,
      0.807843137254902,
      0.8627450980392157,
      0.3803921568627451,
      0.5843137254901961,
      0.2392156862745098,
      0.06274509803921569,
      0.3215686274509804,
    ],
    Name: 'Wild Flower',
    NanColor: [0.2392156862745098, 0.06274509803921569, 0.3215686274509804],
  },
  {
    IndexedColors: [
      0.396078431372549,
      0.4862745098039216,
      0.2156862745098039,
      0.4588235294117647,
      0.6941176470588235,
      0.00392156862745098,
      0.6980392156862745,
      0.7294117647058823,
      0.1882352941176471,
      1,
      0.8980392156862745,
      0.02352941176470588,
      1,
      0.7058823529411765,
      0,
      0.9764705882352941,
      0.5137254901960784,
      0.1411764705882353,
    ],
    Name: 'Citrus',
    NanColor: [0.9764705882352941, 0.5137254901960784, 0.1411764705882353],
  },
  {
    IndexedColors: [
      0.4980392156862745,
      0.2313725490196079,
      0.03137254901960784,
      0.7019607843137254,
      0.3450980392156863,
      0.02352941176470588,
      0.8784313725490196,
      0.5098039215686274,
      0.0784313725490196,
      0.9921568627450981,
      0.7215686274509804,
      0.3882352941176471,
      0.996078431372549,
      0.8784313725490196,
      0.7137254901960784,
      0.9686274509803922,
      0.9686274509803922,
      0.9686274509803922,
      0.8470588235294118,
      0.8549019607843137,
      0.9215686274509803,
      0.6980392156862745,
      0.6705882352941176,
      0.8235294117647058,
      0.5019607843137255,
      0.4509803921568628,
      0.6745098039215687,
      0.3294117647058823,
      0.1529411764705882,
      0.5333333333333333,
      0.1764705882352941,
      0,
      0.2941176470588235,
    ],
    Name: 'Brewer Diverging Purple-Orange (11)',
    NanColor: [0.1764705882352941, 0, 0.2941176470588235],
  },
  {
    IndexedColors: [
      0.4980392156862745,
      0.2313725490196079,
      0.03137254901960784,
      0.7019607843137254,
      0.3450980392156863,
      0.02352941176470588,
      0.8784313725490196,
      0.5098039215686274,
      0.0784313725490196,
      0.9921568627450981,
      0.7215686274509804,
      0.3882352941176471,
      0.996078431372549,
      0.8784313725490196,
      0.7137254901960784,
      0.8470588235294118,
      0.8549019607843137,
      0.9215686274509803,
      0.6980392156862745,
      0.6705882352941176,
      0.8235294117647058,
      0.5019607843137255,
      0.4509803921568628,
      0.6745098039215687,
      0.3294117647058823,
      0.1529411764705882,
      0.5333333333333333,
      0.1764705882352941,
      0,
      0.2941176470588235,
    ],
    Name: 'Brewer Diverging Purple-Orange (10)',
    NanColor: [0.1764705882352941, 0, 0.2941176470588235],
  },
  {
    IndexedColors: [
      0.7019607843137254,
      0.3450980392156863,
      0.02352941176470588,
      0.8784313725490196,
      0.5098039215686274,
      0.0784313725490196,
      0.9921568627450981,
      0.7215686274509804,
      0.3882352941176471,
      0.996078431372549,
      0.8784313725490196,
      0.7137254901960784,
      0.9686274509803922,
      0.9686274509803922,
      0.9686274509803922,
      0.8470588235294118,
      0.8549019607843137,
      0.9215686274509803,
      0.6980392156862745,
      0.6705882352941176,
      0.8235294117647058,
      0.5019607843137255,
      0.4509803921568628,
      0.6745098039215687,
      0.3294117647058823,
      0.1529411764705882,
      0.5333333333333333,
    ],
    Name: 'Brewer Diverging Purple-Orange (9)',
    NanColor: [0.3294117647058823, 0.1529411764705882, 0.5333333333333333],
  },
  {
    IndexedColors: [
      0.7019607843137254,
      0.3450980392156863,
      0.02352941176470588,
      0.8784313725490196,
      0.5098039215686274,
      0.0784313725490196,
      0.9921568627450981,
      0.7215686274509804,
      0.3882352941176471,
      0.996078431372549,
      0.8784313725490196,
      0.7137254901960784,
      0.8470588235294118,
      0.8549019607843137,
      0.9215686274509803,
      0.6980392156862745,
      0.6705882352941176,
      0.8235294117647058,
      0.5019607843137255,
      0.4509803921568628,
      0.6745098039215687,
      0.3294117647058823,
      0.1529411764705882,
      0.5333333333333333,
    ],
    Name: 'Brewer Diverging Purple-Orange (8)',
    NanColor: [0.3294117647058823, 0.1529411764705882, 0.5333333333333333],
  },
  {
    IndexedColors: [
      0.7019607843137254,
      0.3450980392156863,
      0.02352941176470588,
      0.9450980392156862,
      0.6392156862745098,
      0.2509803921568627,
      0.996078431372549,
      0.8784313725490196,
      0.7137254901960784,
      0.9686274509803922,
      0.9686274509803922,
      0.9686274509803922,
      0.8470588235294118,
      0.8549019607843137,
      0.9215686274509803,
      0.6,
      0.5568627450980392,
      0.7647058823529411,
      0.3294117647058823,
      0.1529411764705882,
      0.5333333333333333,
    ],
    Name: 'Brewer Diverging Purple-Orange (7)',
    NanColor: [0.3294117647058823, 0.1529411764705882, 0.5333333333333333],
  },
  {
    IndexedColors: [
      0.7019607843137254,
      0.3450980392156863,
      0.02352941176470588,
      0.9450980392156862,
      0.6392156862745098,
      0.2509803921568627,
      0.996078431372549,
      0.8784313725490196,
      0.7137254901960784,
      0.8470588235294118,
      0.8549019607843137,
      0.9215686274509803,
      0.6,
      0.5568627450980392,
      0.7647058823529411,
      0.3294117647058823,
      0.1529411764705882,
      0.5333333333333333,
    ],
    Name: 'Brewer Diverging Purple-Orange (6)',
    NanColor: [0.3294117647058823, 0.1529411764705882, 0.5333333333333333],
  },
  {
    IndexedColors: [
      0.9019607843137255,
      0.3803921568627451,
      0.00392156862745098,
      0.9921568627450981,
      0.7215686274509804,
      0.3882352941176471,
      0.9686274509803922,
      0.9686274509803922,
      0.9686274509803922,
      0.6980392156862745,
      0.6705882352941176,
      0.8235294117647058,
      0.3686274509803922,
      0.2352941176470588,
      0.6,
    ],
    Name: 'Brewer Diverging Purple-Orange (5)',
    NanColor: [0.3686274509803922, 0.2352941176470588, 0.6],
  },
  {
    IndexedColors: [
      0.9019607843137255,
      0.3803921568627451,
      0.00392156862745098,
      0.9921568627450981,
      0.7215686274509804,
      0.3882352941176471,
      0.6980392156862745,
      0.6705882352941176,
      0.8235294117647058,
      0.3686274509803922,
      0.2352941176470588,
      0.6,
    ],
    Name: 'Brewer Diverging Purple-Orange (4)',
    NanColor: [0.3686274509803922, 0.2352941176470588, 0.6],
  },
  {
    IndexedColors: [
      0.9450980392156862,
      0.6392156862745098,
      0.2509803921568627,
      0.9686274509803922,
      0.9686274509803922,
      0.9686274509803922,
      0.6,
      0.5568627450980392,
      0.7647058823529411,
    ],
    Name: 'Brewer Diverging Purple-Orange (3)',
    NanColor: [0.6, 0.5568627450980392, 0.7647058823529411],
  },
  {
    IndexedColors: [
      0.6196078431372549,
      0.00392156862745098,
      0.2588235294117647,
      0.8352941176470589,
      0.2431372549019608,
      0.3098039215686275,
      0.9568627450980393,
      0.4274509803921568,
      0.2627450980392157,
      0.9921568627450981,
      0.6823529411764706,
      0.3803921568627451,
      0.996078431372549,
      0.8784313725490196,
      0.5450980392156862,
      1,
      1,
      0.7490196078431373,
      0.9019607843137255,
      0.9607843137254902,
      0.596078431372549,
      0.6705882352941176,
      0.8666666666666667,
      0.6431372549019608,
      0.4,
      0.7607843137254902,
      0.6470588235294118,
      0.196078431372549,
      0.5333333333333333,
      0.7411764705882353,
      0.3686274509803922,
      0.3098039215686275,
      0.6352941176470588,
    ],
    Name: 'Brewer Diverging Spectral (11)',
    NanColor: [0.3686274509803922, 0.3098039215686275, 0.6352941176470588],
  },
  {
    IndexedColors: [
      0.6196078431372549,
      0.00392156862745098,
      0.2588235294117647,
      0.8352941176470589,
      0.2431372549019608,
      0.3098039215686275,
      0.9568627450980393,
      0.4274509803921568,
      0.2627450980392157,
      0.9921568627450981,
      0.6823529411764706,
      0.3803921568627451,
      0.996078431372549,
      0.8784313725490196,
      0.5450980392156862,
      0.9019607843137255,
      0.9607843137254902,
      0.596078431372549,
      0.6705882352941176,
      0.8666666666666667,
      0.6431372549019608,
      0.4,
      0.7607843137254902,
      0.6470588235294118,
      0.196078431372549,
      0.5333333333333333,
      0.7411764705882353,
      0.3686274509803922,
      0.3098039215686275,
      0.6352941176470588,
    ],
    Name: 'Brewer Diverging Spectral (10)',
    NanColor: [0.3686274509803922, 0.3098039215686275, 0.6352941176470588],
  },
  {
    IndexedColors: [
      0.8352941176470589,
      0.2431372549019608,
      0.3098039215686275,
      0.9568627450980393,
      0.4274509803921568,
      0.2627450980392157,
      0.9921568627450981,
      0.6823529411764706,
      0.3803921568627451,
      0.996078431372549,
      0.8784313725490196,
      0.5450980392156862,
      1,
      1,
      0.7490196078431373,
      0.9019607843137255,
      0.9607843137254902,
      0.596078431372549,
      0.6705882352941176,
      0.8666666666666667,
      0.6431372549019608,
      0.4,
      0.7607843137254902,
      0.6470588235294118,
      0.196078431372549,
      0.5333333333333333,
      0.7411764705882353,
    ],
    Name: 'Brewer Diverging Spectral (9)',
    NanColor: [0.196078431372549, 0.5333333333333333, 0.7411764705882353],
  },
  {
    IndexedColors: [
      0.8352941176470589,
      0.2431372549019608,
      0.3098039215686275,
      0.9568627450980393,
      0.4274509803921568,
      0.2627450980392157,
      0.9921568627450981,
      0.6823529411764706,
      0.3803921568627451,
      0.996078431372549,
      0.8784313725490196,
      0.5450980392156862,
      0.9019607843137255,
      0.9607843137254902,
      0.596078431372549,
      0.6705882352941176,
      0.8666666666666667,
      0.6431372549019608,
      0.4,
      0.7607843137254902,
      0.6470588235294118,
      0.196078431372549,
      0.5333333333333333,
      0.7411764705882353,
    ],
    Name: 'Brewer Diverging Spectral (8)',
    NanColor: [0.196078431372549, 0.5333333333333333, 0.7411764705882353],
  },
  {
    IndexedColors: [
      0.8352941176470589,
      0.2431372549019608,
      0.3098039215686275,
      0.9882352941176471,
      0.5529411764705883,
      0.3490196078431372,
      0.996078431372549,
      0.8784313725490196,
      0.5450980392156862,
      1,
      1,
      0.7490196078431373,
      0.9019607843137255,
      0.9607843137254902,
      0.596078431372549,
      0.6,
      0.8352941176470589,
      0.5803921568627451,
      0.196078431372549,
      0.5333333333333333,
      0.7411764705882353,
    ],
    Name: 'Brewer Diverging Spectral (7)',
    NanColor: [0.196078431372549, 0.5333333333333333, 0.7411764705882353],
  },
  {
    IndexedColors: [
      0.8352941176470589,
      0.2431372549019608,
      0.3098039215686275,
      0.9882352941176471,
      0.5529411764705883,
      0.3490196078431372,
      0.996078431372549,
      0.8784313725490196,
      0.5450980392156862,
      0.9019607843137255,
      0.9607843137254902,
      0.596078431372549,
      0.6,
      0.8352941176470589,
      0.5803921568627451,
      0.196078431372549,
      0.5333333333333333,
      0.7411764705882353,
    ],
    Name: 'Brewer Diverging Spectral (6)',
    NanColor: [0.196078431372549, 0.5333333333333333, 0.7411764705882353],
  },
  {
    IndexedColors: [
      0.8431372549019608,
      0.09803921568627451,
      0.1098039215686274,
      0.9921568627450981,
      0.6823529411764706,
      0.3803921568627451,
      1,
      1,
      0.7490196078431373,
      0.6705882352941176,
      0.8666666666666667,
      0.6431372549019608,
      0.1686274509803922,
      0.5137254901960784,
      0.7294117647058823,
    ],
    Name: 'Brewer Diverging Spectral (5)',
    NanColor: [0.1686274509803922, 0.5137254901960784, 0.7294117647058823],
  },
  {
    IndexedColors: [
      0.8431372549019608,
      0.09803921568627451,
      0.1098039215686274,
      0.9921568627450981,
      0.6823529411764706,
      0.3803921568627451,
      0.6705882352941176,
      0.8666666666666667,
      0.6431372549019608,
      0.1686274509803922,
      0.5137254901960784,
      0.7294117647058823,
    ],
    Name: 'Brewer Diverging Spectral (4)',
    NanColor: [0.1686274509803922, 0.5137254901960784, 0.7294117647058823],
  },
  {
    IndexedColors: [
      0.9882352941176471,
      0.5529411764705883,
      0.3490196078431372,
      1,
      1,
      0.7490196078431373,
      0.6,
      0.8352941176470589,
      0.5803921568627451,
    ],
    Name: 'Brewer Diverging Spectral (3)',
    NanColor: [0.6, 0.8352941176470589, 0.5803921568627451],
  },
  {
    IndexedColors: [
      0.3294117647058823,
      0.1882352941176471,
      0.0196078431372549,
      0.5490196078431373,
      0.3176470588235294,
      0.0392156862745098,
      0.7490196078431373,
      0.5058823529411764,
      0.1764705882352941,
      0.8745098039215686,
      0.7607843137254902,
      0.4901960784313725,
      0.9647058823529412,
      0.9098039215686274,
      0.7647058823529411,
      0.9607843137254902,
      0.9607843137254902,
      0.9607843137254902,
      0.7803921568627451,
      0.9176470588235294,
      0.8980392156862745,
      0.5019607843137255,
      0.803921568627451,
      0.7568627450980392,
      0.207843137254902,
      0.592156862745098,
      0.5607843137254902,
      0.00392156862745098,
      0.4,
      0.3686274509803922,
      0,
      0.2352941176470588,
      0.1882352941176471,
    ],
    Name: 'Brewer Diverging Brown-Blue-Green (11)',
    NanColor: [0, 0.2352941176470588, 0.1882352941176471],
  },
  {
    IndexedColors: [
      0.3294117647058823,
      0.1882352941176471,
      0.0196078431372549,
      0.5490196078431373,
      0.3176470588235294,
      0.0392156862745098,
      0.7490196078431373,
      0.5058823529411764,
      0.1764705882352941,
      0.8745098039215686,
      0.7607843137254902,
      0.4901960784313725,
      0.9647058823529412,
      0.9098039215686274,
      0.7647058823529411,
      0.7803921568627451,
      0.9176470588235294,
      0.8980392156862745,
      0.5019607843137255,
      0.803921568627451,
      0.7568627450980392,
      0.207843137254902,
      0.592156862745098,
      0.5607843137254902,
      0.00392156862745098,
      0.4,
      0.3686274509803922,
      0,
      0.2352941176470588,
      0.1882352941176471,
    ],
    Name: 'Brewer Diverging Brown-Blue-Green (10)',
    NanColor: [0, 0.2352941176470588, 0.1882352941176471],
  },
  {
    IndexedColors: [
      0.5490196078431373,
      0.3176470588235294,
      0.0392156862745098,
      0.7490196078431373,
      0.5058823529411764,
      0.1764705882352941,
      0.8745098039215686,
      0.7607843137254902,
      0.4901960784313725,
      0.9647058823529412,
      0.9098039215686274,
      0.7647058823529411,
      0.9607843137254902,
      0.9607843137254902,
      0.9607843137254902,
      0.7803921568627451,
      0.9176470588235294,
      0.8980392156862745,
      0.5019607843137255,
      0.803921568627451,
      0.7568627450980392,
      0.207843137254902,
      0.592156862745098,
      0.5607843137254902,
      0.00392156862745098,
      0.4,
      0.3686274509803922,
    ],
    Name: 'Brewer Diverging Brown-Blue-Green (9)',
    NanColor: [0.00392156862745098, 0.4, 0.3686274509803922],
  },
  {
    IndexedColors: [
      0.5490196078431373,
      0.3176470588235294,
      0.0392156862745098,
      0.7490196078431373,
      0.5058823529411764,
      0.1764705882352941,
      0.8745098039215686,
      0.7607843137254902,
      0.4901960784313725,
      0.9647058823529412,
      0.9098039215686274,
      0.7647058823529411,
      0.7803921568627451,
      0.9176470588235294,
      0.8980392156862745,
      0.5019607843137255,
      0.803921568627451,
      0.7568627450980392,
      0.207843137254902,
      0.592156862745098,
      0.5607843137254902,
      0.00392156862745098,
      0.4,
      0.3686274509803922,
    ],
    Name: 'Brewer Diverging Brown-Blue-Green (8)',
    NanColor: [0.00392156862745098, 0.4, 0.3686274509803922],
  },
  {
    IndexedColors: [
      0.5490196078431373,
      0.3176470588235294,
      0.0392156862745098,
      0.8470588235294118,
      0.7019607843137254,
      0.396078431372549,
      0.9647058823529412,
      0.9098039215686274,
      0.7647058823529411,
      0.9607843137254902,
      0.9607843137254902,
      0.9607843137254902,
      0.7803921568627451,
      0.9176470588235294,
      0.8980392156862745,
      0.3529411764705883,
      0.7058823529411765,
      0.6745098039215687,
      0.00392156862745098,
      0.4,
      0.3686274509803922,
    ],
    Name: 'Brewer Diverging Brown-Blue-Green (7)',
    NanColor: [0.00392156862745098, 0.4, 0.3686274509803922],
  },
  {
    IndexedColors: [
      0.5490196078431373,
      0.3176470588235294,
      0.0392156862745098,
      0.8470588235294118,
      0.7019607843137254,
      0.396078431372549,
      0.9647058823529412,
      0.9098039215686274,
      0.7647058823529411,
      0.7803921568627451,
      0.9176470588235294,
      0.8980392156862745,
      0.3529411764705883,
      0.7058823529411765,
      0.6745098039215687,
      0.00392156862745098,
      0.4,
      0.3686274509803922,
    ],
    Name: 'Brewer Diverging Brown-Blue-Green (6)',
    NanColor: [0.00392156862745098, 0.4, 0.3686274509803922],
  },
  {
    IndexedColors: [
      0.6509803921568628,
      0.3803921568627451,
      0.1019607843137255,
      0.8745098039215686,
      0.7607843137254902,
      0.4901960784313725,
      0.9607843137254902,
      0.9607843137254902,
      0.9607843137254902,
      0.5019607843137255,
      0.803921568627451,
      0.7568627450980392,
      0.00392156862745098,
      0.5215686274509804,
      0.4431372549019608,
    ],
    Name: 'Brewer Diverging Brown-Blue-Green (5)',
    NanColor: [0.00392156862745098, 0.5215686274509804, 0.4431372549019608],
  },
  {
    IndexedColors: [
      0.6509803921568628,
      0.3803921568627451,
      0.1019607843137255,
      0.8745098039215686,
      0.7607843137254902,
      0.4901960784313725,
      0.5019607843137255,
      0.803921568627451,
      0.7568627450980392,
      0.00392156862745098,
      0.5215686274509804,
      0.4431372549019608,
    ],
    Name: 'Brewer Diverging Brown-Blue-Green (4)',
    NanColor: [0.00392156862745098, 0.5215686274509804, 0.4431372549019608],
  },
  {
    IndexedColors: [
      0.8470588235294118,
      0.7019607843137254,
      0.396078431372549,
      0.9607843137254902,
      0.9607843137254902,
      0.9607843137254902,
      0.3529411764705883,
      0.7058823529411765,
      0.6745098039215687,
    ],
    Name: 'Brewer Diverging Brown-Blue-Green (3)',
    NanColor: [0.3529411764705883, 0.7058823529411765, 0.6745098039215687],
  },
  {
    IndexedColors: [
      0.9686274509803922,
      0.9882352941176471,
      0.9921568627450981,
      0.8980392156862745,
      0.9607843137254902,
      0.9764705882352941,
      0.8,
      0.9254901960784314,
      0.9019607843137255,
      0.6,
      0.8470588235294118,
      0.788235294117647,
      0.4,
      0.7607843137254902,
      0.6431372549019608,
      0.2549019607843137,
      0.6823529411764706,
      0.4627450980392157,
      0.1372549019607843,
      0.5450980392156862,
      0.2705882352941176,
      0,
      0.4274509803921568,
      0.1725490196078431,
      0,
      0.2666666666666667,
      0.1058823529411765,
    ],
    Name: 'Brewer Sequential Blue-Green (9)',
    NanColor: [0, 0.2666666666666667, 0.1058823529411765],
  },
  {
    IndexedColors: [
      0.9686274509803922,
      0.9882352941176471,
      0.9921568627450981,
      0.8980392156862745,
      0.9607843137254902,
      0.9764705882352941,
      0.8,
      0.9254901960784314,
      0.9019607843137255,
      0.6,
      0.8470588235294118,
      0.788235294117647,
      0.4,
      0.7607843137254902,
      0.6431372549019608,
      0.2549019607843137,
      0.6823529411764706,
      0.4627450980392157,
      0.1372549019607843,
      0.5450980392156862,
      0.2705882352941176,
      0,
      0.3450980392156863,
      0.1411764705882353,
    ],
    Name: 'Brewer Sequential Blue-Green (8)',
    NanColor: [0, 0.3450980392156863, 0.1411764705882353],
  },
  {
    IndexedColors: [
      0.9294117647058824,
      0.9725490196078431,
      0.984313725490196,
      0.8,
      0.9254901960784314,
      0.9019607843137255,
      0.8,
      0.9254901960784314,
      0.9019607843137255,
      0.4,
      0.7607843137254902,
      0.6431372549019608,
      0.2549019607843137,
      0.6823529411764706,
      0.4627450980392157,
      0.1372549019607843,
      0.5450980392156862,
      0.2705882352941176,
      0,
      0.3450980392156863,
      0.1411764705882353,
    ],
    Name: 'Brewer Sequential Blue-Green (7)',
    NanColor: [0, 0.3450980392156863, 0.1411764705882353],
  },
  {
    IndexedColors: [
      0.9294117647058824,
      0.9725490196078431,
      0.984313725490196,
      0.8,
      0.9254901960784314,
      0.9019607843137255,
      0.6,
      0.8470588235294118,
      0.788235294117647,
      0.4,
      0.7607843137254902,
      0.6431372549019608,
      0.1725490196078431,
      0.6352941176470588,
      0.3725490196078431,
      0,
      0.4274509803921568,
      0.1725490196078431,
    ],
    Name: 'Brewer Sequential Blue-Green (6)',
    NanColor: [0, 0.4274509803921568, 0.1725490196078431],
  },
  {
    IndexedColors: [
      0.9294117647058824,
      0.9725490196078431,
      0.984313725490196,
      0.6980392156862745,
      0.8862745098039215,
      0.8862745098039215,
      0.4,
      0.7607843137254902,
      0.6431372549019608,
      0.1725490196078431,
      0.6352941176470588,
      0.3725490196078431,
      0,
      0.4274509803921568,
      0.1725490196078431,
    ],
    Name: 'Brewer Sequential Blue-Green (5)',
    NanColor: [0, 0.4274509803921568, 0.1725490196078431],
  },
  {
    IndexedColors: [
      0.9294117647058824,
      0.9725490196078431,
      0.984313725490196,
      0.6980392156862745,
      0.8862745098039215,
      0.8862745098039215,
      0.4,
      0.7607843137254902,
      0.6431372549019608,
      0.1372549019607843,
      0.5450980392156862,
      0.2705882352941176,
    ],
    Name: 'Brewer Sequential Blue-Green (4)',
    NanColor: [0.1372549019607843, 0.5450980392156862, 0.2705882352941176],
  },
  {
    IndexedColors: [
      0.8980392156862745,
      0.9607843137254902,
      0.9764705882352941,
      0.6,
      0.8470588235294118,
      0.788235294117647,
      0.1725490196078431,
      0.6352941176470588,
      0.3725490196078431,
    ],
    Name: 'Brewer Sequential Blue-Green (3)',
    NanColor: [0.1725490196078431, 0.6352941176470588, 0.3725490196078431],
  },
  {
    IndexedColors: [
      1,
      1,
      0.8980392156862745,
      1,
      0.9686274509803922,
      0.7372549019607844,
      0.996078431372549,
      0.8901960784313725,
      0.5686274509803921,
      0.996078431372549,
      0.7686274509803922,
      0.3098039215686275,
      0.996078431372549,
      0.6,
      0.1607843137254902,
      0.9254901960784314,
      0.4392156862745098,
      0.0784313725490196,
      0.8,
      0.2980392156862745,
      0.00784313725490196,
      0.6,
      0.203921568627451,
      0.01568627450980392,
      0.4,
      0.1450980392156863,
      0.02352941176470588,
    ],
    Name: 'Brewer Sequential Yellow-Orange-Brown (9)',
    NanColor: [0.4, 0.1450980392156863, 0.02352941176470588],
  },
  {
    IndexedColors: [
      1,
      1,
      0.8980392156862745,
      1,
      0.9686274509803922,
      0.7372549019607844,
      0.996078431372549,
      0.8901960784313725,
      0.5686274509803921,
      0.996078431372549,
      0.7686274509803922,
      0.3098039215686275,
      0.996078431372549,
      0.6,
      0.1607843137254902,
      0.9254901960784314,
      0.4392156862745098,
      0.0784313725490196,
      0.8,
      0.2980392156862745,
      0.00784313725490196,
      0.5490196078431373,
      0.1764705882352941,
      0.01568627450980392,
    ],
    Name: 'Brewer Sequential Yellow-Orange-Brown (8)',
    NanColor: [0.5490196078431373, 0.1764705882352941, 0.01568627450980392],
  },
  {
    IndexedColors: [
      1,
      1,
      0.8313725490196079,
      0.996078431372549,
      0.8901960784313725,
      0.5686274509803921,
      0.996078431372549,
      0.7686274509803922,
      0.3098039215686275,
      0.996078431372549,
      0.6,
      0.1607843137254902,
      0.9254901960784314,
      0.4392156862745098,
      0.0784313725490196,
      0.8,
      0.2980392156862745,
      0.00784313725490196,
      0.5490196078431373,
      0.1764705882352941,
      0.01568627450980392,
    ],
    Name: 'Brewer Sequential Yellow-Orange-Brown (7)',
    NanColor: [0.5490196078431373, 0.1764705882352941, 0.01568627450980392],
  },
  {
    IndexedColors: [
      1,
      1,
      0.8313725490196079,
      0.996078431372549,
      0.8901960784313725,
      0.5686274509803921,
      0.996078431372549,
      0.7686274509803922,
      0.3098039215686275,
      0.996078431372549,
      0.6,
      0.1607843137254902,
      0.8509803921568627,
      0.3725490196078431,
      0.05490196078431372,
      0.6,
      0.203921568627451,
      0.01568627450980392,
    ],
    Name: 'Brewer Sequential Yellow-Orange-Brown (6)',
    NanColor: [0.6, 0.203921568627451, 0.01568627450980392],
  },
  {
    IndexedColors: [
      1,
      1,
      0.8313725490196079,
      0.996078431372549,
      0.8509803921568627,
      0.5568627450980392,
      0.996078431372549,
      0.6,
      0.1607843137254902,
      0.8509803921568627,
      0.3725490196078431,
      0.05490196078431372,
      0.6,
      0.203921568627451,
      0.01568627450980392,
    ],
    Name: 'Brewer Sequential Yellow-Orange-Brown (5)',
    NanColor: [0.6, 0.203921568627451, 0.01568627450980392],
  },
  {
    IndexedColors: [
      1,
      1,
      0.8313725490196079,
      0.996078431372549,
      0.8509803921568627,
      0.5568627450980392,
      0.996078431372549,
      0.6,
      0.1607843137254902,
      0.8,
      0.2980392156862745,
      0.00784313725490196,
    ],
    Name: 'Brewer Sequential Yellow-Orange-Brown (4)',
    NanColor: [0.8, 0.2980392156862745, 0.00784313725490196],
  },
  {
    IndexedColors: [
      1,
      0.9686274509803922,
      0.7372549019607844,
      0.996078431372549,
      0.7686274509803922,
      0.3098039215686275,
      0.8509803921568627,
      0.3725490196078431,
      0.05490196078431372,
    ],
    Name: 'Brewer Sequential Yellow-Orange-Brown (3)',
    NanColor: [0.8509803921568627, 0.3725490196078431, 0.05490196078431372],
  },
  {
    IndexedColors: [
      0.9686274509803922,
      0.9882352941176471,
      0.9921568627450981,
      0.8784313725490196,
      0.9254901960784314,
      0.9568627450980393,
      0.7490196078431373,
      0.8274509803921568,
      0.9019607843137255,
      0.6196078431372549,
      0.7372549019607844,
      0.8549019607843137,
      0.5490196078431373,
      0.5882352941176471,
      0.7764705882352941,
      0.5490196078431373,
      0.4196078431372549,
      0.6941176470588235,
      0.5333333333333333,
      0.2549019607843137,
      0.615686274509804,
      0.5058823529411764,
      0.05882352941176471,
      0.4862745098039216,
      0.3019607843137255,
      0,
      0.2941176470588235,
    ],
    Name: 'Brewer Sequential Blue-Purple (9)',
    NanColor: [0.3019607843137255, 0, 0.2941176470588235],
  },
  {
    IndexedColors: [
      0.9686274509803922,
      0.9882352941176471,
      0.9921568627450981,
      0.8784313725490196,
      0.9254901960784314,
      0.9568627450980393,
      0.7490196078431373,
      0.8274509803921568,
      0.9019607843137255,
      0.6196078431372549,
      0.7372549019607844,
      0.8549019607843137,
      0.5490196078431373,
      0.5882352941176471,
      0.7764705882352941,
      0.5490196078431373,
      0.4196078431372549,
      0.6941176470588235,
      0.5333333333333333,
      0.2549019607843137,
      0.615686274509804,
      0.4313725490196079,
      0.00392156862745098,
      0.4196078431372549,
    ],
    Name: 'Brewer Sequential Blue-Purple (8)',
    NanColor: [0.4313725490196079, 0.00392156862745098, 0.4196078431372549],
  },
  {
    IndexedColors: [
      0.9294117647058824,
      0.9725490196078431,
      0.984313725490196,
      0.7490196078431373,
      0.8274509803921568,
      0.9019607843137255,
      0.6196078431372549,
      0.7372549019607844,
      0.8549019607843137,
      0.5490196078431373,
      0.5882352941176471,
      0.7764705882352941,
      0.5490196078431373,
      0.4196078431372549,
      0.6941176470588235,
      0.5333333333333333,
      0.2549019607843137,
      0.615686274509804,
      0.4313725490196079,
      0.00392156862745098,
      0.4196078431372549,
    ],
    Name: 'Brewer Sequential Blue-Purple (7)',
    NanColor: [0.4313725490196079, 0.00392156862745098, 0.4196078431372549],
  },
  {
    IndexedColors: [
      0.9294117647058824,
      0.9725490196078431,
      0.984313725490196,
      0.7490196078431373,
      0.8274509803921568,
      0.9019607843137255,
      0.6196078431372549,
      0.7372549019607844,
      0.8549019607843137,
      0.5490196078431373,
      0.5882352941176471,
      0.7764705882352941,
      0.5333333333333333,
      0.3372549019607843,
      0.6549019607843137,
      0.5058823529411764,
      0.05882352941176471,
      0.4862745098039216,
    ],
    Name: 'Brewer Sequential Blue-Purple (6)',
    NanColor: [0.5058823529411764, 0.05882352941176471, 0.4862745098039216],
  },
  {
    IndexedColors: [
      0.9294117647058824,
      0.9725490196078431,
      0.984313725490196,
      0.7019607843137254,
      0.803921568627451,
      0.8901960784313725,
      0.5490196078431373,
      0.5882352941176471,
      0.7764705882352941,
      0.5333333333333333,
      0.3372549019607843,
      0.6549019607843137,
      0.5058823529411764,
      0.05882352941176471,
      0.4862745098039216,
    ],
    Name: 'Brewer Sequential Blue-Purple (5)',
    NanColor: [0.5058823529411764, 0.05882352941176471, 0.4862745098039216],
  },
  {
    IndexedColors: [
      0.9294117647058824,
      0.9725490196078431,
      0.984313725490196,
      0.7019607843137254,
      0.803921568627451,
      0.8901960784313725,
      0.5490196078431373,
      0.5882352941176471,
      0.7764705882352941,
      0.5333333333333333,
      0.2549019607843137,
      0.615686274509804,
    ],
    Name: 'Brewer Sequential Blue-Purple (4)',
    NanColor: [0.5333333333333333, 0.2549019607843137, 0.615686274509804],
  },
  {
    IndexedColors: [
      0.8784313725490196,
      0.9254901960784314,
      0.9568627450980393,
      0.6196078431372549,
      0.7372549019607844,
      0.8549019607843137,
      0.5333333333333333,
      0.3372549019607843,
      0.6549019607843137,
    ],
    Name: 'Brewer Sequential Blue-Purple (3)',
    NanColor: [0.5333333333333333, 0.3372549019607843, 0.6549019607843137],
  },
  {
    IndexedColors: [
      0.4980392156862745,
      0.788235294117647,
      0.4980392156862745,
      0.7450980392156863,
      0.6823529411764706,
      0.8313725490196079,
      0.9921568627450981,
      0.7529411764705882,
      0.5254901960784314,
      1,
      1,
      0.6,
      0.2196078431372549,
      0.4235294117647059,
      0.6901960784313725,
      0.9411764705882353,
      0.00784313725490196,
      0.4980392156862745,
      0.7490196078431373,
      0.3568627450980392,
      0.09019607843137255,
      0.4,
      0.4,
      0.4,
    ],
    Name: 'Brewer Qualitative Accent',
    NanColor: [0.4, 0.4, 0.4],
  },
  {
    IndexedColors: [
      0.1058823529411765,
      0.6196078431372549,
      0.4666666666666667,
      0.8509803921568627,
      0.3725490196078431,
      0.00784313725490196,
      0.4588235294117647,
      0.4392156862745098,
      0.7019607843137254,
      0.9058823529411765,
      0.1607843137254902,
      0.5411764705882353,
      0.4,
      0.6509803921568628,
      0.1176470588235294,
      0.9019607843137255,
      0.6705882352941176,
      0.00784313725490196,
      0.6509803921568628,
      0.4627450980392157,
      0.1137254901960784,
      0.4,
      0.4,
      0.4,
    ],
    Name: 'Brewer Qualitative Dark2',
    NanColor: [0.4, 0.4, 0.4],
  },
  {
    IndexedColors: [
      0.4,
      0.7607843137254902,
      0.6470588235294118,
      0.9882352941176471,
      0.5529411764705883,
      0.3843137254901961,
      0.5529411764705883,
      0.6274509803921569,
      0.796078431372549,
      0.9058823529411765,
      0.5411764705882353,
      0.7647058823529411,
      0.6509803921568628,
      0.8470588235294118,
      0.3294117647058823,
      1,
      0.8509803921568627,
      0.1843137254901961,
      0.8980392156862745,
      0.7686274509803922,
      0.5803921568627451,
      0.7019607843137254,
      0.7019607843137254,
      0.7019607843137254,
    ],
    Name: 'Brewer Qualitative Set2',
    NanColor: [0.7019607843137254, 0.7019607843137254, 0.7019607843137254],
  },
  {
    IndexedColors: [
      0.7019607843137254,
      0.8862745098039215,
      0.803921568627451,
      0.9921568627450981,
      0.803921568627451,
      0.6745098039215687,
      0.796078431372549,
      0.8352941176470589,
      0.9098039215686274,
      0.9568627450980393,
      0.792156862745098,
      0.8941176470588236,
      0.9019607843137255,
      0.9607843137254902,
      0.788235294117647,
      1,
      0.9490196078431372,
      0.6823529411764706,
      0.9450980392156862,
      0.8862745098039215,
      0.8,
      0.8,
      0.8,
      0.8,
    ],
    Name: 'Brewer Qualitative Pastel2',
    NanColor: [0.8, 0.8, 0.8],
  },
  {
    IndexedColors: [
      0.984313725490196,
      0.7058823529411765,
      0.6823529411764706,
      0.7019607843137254,
      0.803921568627451,
      0.8901960784313725,
      0.8,
      0.9215686274509803,
      0.7725490196078432,
      0.8705882352941177,
      0.796078431372549,
      0.8941176470588236,
      0.996078431372549,
      0.8509803921568627,
      0.6509803921568628,
      1,
      1,
      0.8,
      0.8980392156862745,
      0.8470588235294118,
      0.7411764705882353,
      0.9921568627450981,
      0.8549019607843137,
      0.9254901960784314,
      0.9490196078431372,
      0.9490196078431372,
      0.9490196078431372,
    ],
    Name: 'Brewer Qualitative Pastel1',
    NanColor: [0.9490196078431372, 0.9490196078431372, 0.9490196078431372],
  },
  {
    IndexedColors: [
      0.8941176470588236,
      0.1019607843137255,
      0.1098039215686274,
      0.2156862745098039,
      0.4941176470588236,
      0.7215686274509804,
      0.3019607843137255,
      0.6862745098039216,
      0.2901960784313726,
      0.596078431372549,
      0.3058823529411765,
      0.6392156862745098,
      1,
      0.4980392156862745,
      0,
      1,
      1,
      0.2,
      0.6509803921568628,
      0.3372549019607843,
      0.1568627450980392,
      0.9686274509803922,
      0.5058823529411764,
      0.7490196078431373,
      0.6,
      0.6,
      0.6,
    ],
    Name: 'Brewer Qualitative Set1',
    NanColor: [0.6, 0.6, 0.6],
  },
  {
    IndexedColors: [
      0.6509803921568628,
      0.807843137254902,
      0.8901960784313725,
      0.1215686274509804,
      0.4705882352941176,
      0.7058823529411765,
      0.6980392156862745,
      0.8745098039215686,
      0.5411764705882353,
      0.2,
      0.6274509803921569,
      0.1725490196078431,
      0.984313725490196,
      0.6039215686274509,
      0.6,
      0.8901960784313725,
      0.1019607843137255,
      0.1098039215686274,
      0.9921568627450981,
      0.7490196078431373,
      0.4352941176470588,
      1,
      0.4980392156862745,
      0,
      0.792156862745098,
      0.6980392156862745,
      0.8392156862745098,
      0.4156862745098039,
      0.2392156862745098,
      0.6039215686274509,
      1,
      1,
      0.6,
    ],
    Name: 'Brewer Qualitative Paired',
    NanColor: [1, 1, 0.6],
  },
  {
    IndexedColors: [
      0.5529411764705883,
      0.8274509803921568,
      0.7803921568627451,
      1,
      1,
      0.7019607843137254,
      0.7450980392156863,
      0.7294117647058823,
      0.8549019607843137,
      0.984313725490196,
      0.5019607843137255,
      0.4470588235294118,
      0.5019607843137255,
      0.6941176470588235,
      0.8274509803921568,
      0.9921568627450981,
      0.7058823529411765,
      0.3843137254901961,
      0.7019607843137254,
      0.8705882352941177,
      0.4117647058823529,
      0.9882352941176471,
      0.803921568627451,
      0.8980392156862745,
      0.8509803921568627,
      0.8509803921568627,
      0.8509803921568627,
      0.7372549019607844,
      0.5019607843137255,
      0.7411764705882353,
      0.8,
      0.9215686274509803,
      0.7725490196078432,
      1,
      0.9294117647058824,
      0.4352941176470588,
    ],
    Name: 'Brewer Qualitative Set3',
    NanColor: [1, 0.9294117647058824, 0.4352941176470588],
  },
  {
    IndexedColors: [1, 0, 0, 1, 0.862745, 0, 0, 0.695201, 0],
    Name: 'Traffic Lights',
    NanColor: [0.803922, 0, 0.803922],
  },
  {
    IndexedColors: [
      0.908659,
      0.604013,
      0.581857,
      1,
      0.862745,
      0,
      0,
      0.695201,
      0,
    ],
    Name: 'Traffic Lights For Deuteranopes',
    NanColor: [0.803922, 0, 0.803922],
  },
  {
    IndexedColors: [
      0.4196078431372549,
      0,
      0.07058823529411765,
      0.9019607843137255,
      0.9411764705882353,
      0.0196078431372549,
      0.01568627450980392,
      0.6196078431372549,
      0.00784313725490196,
    ],
    Name: 'Traffic Lights For Deuteranopes 2',
    NanColor: [0.803922, 0, 0.803922],
  },
  {
    ColorSpace: 'Lab',
    Creator: 'Francesca Samsel',
    Name: 'Muted Blue-Green',
    NanColor: [0.25, 0, 0],
    RGBPoints: [
      0,
      0.109804,
      0.27451,
      0.301961,
      0.02,
      0.129412,
      0.309804,
      0.341176,
      0.05,
      0.14902,
      0.341176,
      0.380392,
      0.1,
      0.188235,
      0.403922,
      0.458824,
      0.15,
      0.227451,
      0.447059,
      0.521569,
      0.2,
      0.290196,
      0.494118,
      0.588235,
      0.25,
      0.368627,
      0.552941,
      0.670588,
      0.3,
      0.458824,
      0.619608,
      0.74902,
      0.35,
      0.588235,
      0.713725,
      0.85098,
      0.4,
      0.72549,
      0.815686,
      0.941176,
      0.45,
      0.831373,
      0.882353,
      0.980392,
      0.475,
      0.909804,
      0.933333,
      1,
      0.5,
      0.980392,
      0.984314,
      1,
      0.5,
      0.996078,
      1,
      0.94902,
      0.5,
      1,
      1,
      0.980392,
      0.5,
      0.980392,
      0.984314,
      1,
      0.525,
      0.972549,
      0.988235,
      0.890196,
      0.55,
      0.917647,
      0.960784,
      0.835294,
      0.6,
      0.835294,
      0.921569,
      0.772549,
      0.65,
      0.768627,
      0.901961,
      0.737255,
      0.7,
      0.670588,
      0.831373,
      0.654902,
      0.75,
      0.576471,
      0.760784,
      0.584314,
      0.8,
      0.498039,
      0.678431,
      0.521569,
      0.85,
      0.392157,
      0.560784,
      0.427451,
      0.9,
      0.294118,
      0.45098,
      0.333333,
      0.95,
      0.211765,
      0.34902,
      0.254902,
      1,
      0.152941,
      0.278431,
      0.196078,
    ],
  },
  {
    ColorSpace: 'Lab',
    Creator: 'Francesca Samsel',
    Name: 'Green-Blue Asymmetric Divergent (62Blbc)',
    NanColor: [0.25, 0, 0],
    RGBPoints: [
      0,
      0.121569,
      0.2,
      0.145098,
      0.05,
      0.196078,
      0.301961,
      0.223529,
      0.1,
      0.258824,
      0.4,
      0.278431,
      0.2,
      0.341176,
      0.54902,
      0.341176,
      0.25,
      0.419608,
      0.619608,
      0.376471,
      0.3,
      0.545098,
      0.701961,
      0.392157,
      0.35,
      0.643137,
      0.780392,
      0.403922,
      0.4,
      0.729412,
      0.819608,
      0.45098,
      0.45,
      0.811765,
      0.870588,
      0.521569,
      0.5,
      0.898039,
      0.909804,
      0.564706,
      0.55,
      0.941176,
      0.92549,
      0.686275,
      0.6,
      0.960784,
      0.94902,
      0.776471,
      0.64,
      1,
      1,
      1,
      0.65,
      0.890196,
      0.988235,
      0.972549,
      0.7,
      0.721569,
      0.894118,
      0.901961,
      0.75,
      0.631373,
      0.823529,
      0.839216,
      0.8,
      0.517647,
      0.662745,
      0.701961,
      0.85,
      0.384314,
      0.494118,
      0.54902,
      0.9,
      0.298039,
      0.360784,
      0.45098,
      0.95,
      0.223529,
      0.25098,
      0.34902,
      0.99,
      0.156863,
      0.172549,
      0.25098,
      1,
      0.137255,
      0.137255,
      0.188235,
    ],
  },
  {
    ColorSpace: 'Lab',
    Creator: 'Francesca Samsel',
    Name: 'Asymmtrical Earth Tones (6_21b)',
    NanColor: [0.25, 0, 0],
    RGBPoints: [
      0,
      0.141176,
      0.14902,
      0.2,
      0.05,
      0.215686,
      0.258824,
      0.321569,
      0.1,
      0.243137,
      0.368627,
      0.380392,
      0.15,
      0.27451,
      0.439216,
      0.4,
      0.2,
      0.32549,
      0.501961,
      0.384314,
      0.25,
      0.403922,
      0.6,
      0.419608,
      0.3,
      0.486275,
      0.701961,
      0.454902,
      0.35,
      0.556863,
      0.74902,
      0.494118,
      0.4,
      0.670588,
      0.8,
      0.545098,
      0.5,
      0.854902,
      0.901961,
      0.631373,
      0.55,
      0.92549,
      0.941176,
      0.694118,
      0.6,
      0.960784,
      0.94902,
      0.776471,
      0.65,
      0.988235,
      0.968627,
      0.909804,
      0.7,
      0.839216,
      0.815686,
      0.772549,
      0.75,
      0.701961,
      0.662745,
      0.615686,
      0.8,
      0.6,
      0.529412,
      0.478431,
      0.85,
      0.501961,
      0.403922,
      0.360784,
      0.9,
      0.439216,
      0.313725,
      0.290196,
      1,
      0.301961,
      0.164706,
      0.176471,
    ],
  },
  {
    ColorSpace: 'Lab',
    Creator: 'Francesca Samsel',
    Name: 'Yellow 15',
    NanColor: [0.25, 0, 0],
    RGBPoints: [
      0,
      1,
      1,
      0.988235,
      0.002,
      1,
      1,
      0.988235,
      0.05,
      0.984314,
      0.988235,
      0.843137,
      0.1,
      0.988235,
      0.988235,
      0.741176,
      0.15,
      0.980392,
      0.968627,
      0.654902,
      0.2,
      0.980392,
      0.945098,
      0.576471,
      0.25,
      0.968627,
      0.905882,
      0.486275,
      0.3,
      0.968627,
      0.862745,
      0.388235,
      0.35,
      0.960784,
      0.803922,
      0.286275,
      0.4,
      0.94902,
      0.741176,
      0.219608,
      0.45,
      0.941176,
      0.678431,
      0.14902,
      0.5,
      0.929412,
      0.607843,
      0.094118,
      0.55,
      0.921569,
      0.545098,
      0.054902,
      0.6,
      0.909804,
      0.486275,
      0.035294,
      0.65,
      0.890196,
      0.411765,
      0.019608,
      0.7,
      0.8,
      0.305882,
      0,
      0.75,
      0.760784,
      0.239216,
      0,
      0.8,
      0.678431,
      0.180392,
      0.011765,
      0.85,
      0.6,
      0.121569,
      0.023529,
      0.9,
      0.501961,
      0.054902,
      0.031373,
      0.95,
      0.4,
      0.039216,
      0.058824,
      1,
      0.301961,
      0.047059,
      0.090196,
    ],
  },
  {
    ColorSpace: 'Diverging',
    Name: 'Magma (matplotlib)',
    NanColor: [0, 1, 0],
    Source: 'https://github.com/BIDS/colormap/blob/master/colormaps.py',
    License: 'CC0',
    Creator: 'Nathaniel J. Smith & Stefan van der Walt',
    RGBPoints: [
      0,
      0.001462,
      0.000466,
      0.013866,
      0.003922,
      0.002258,
      0.001295,
      0.018331,
      0.007843,
      0.003279,
      0.002305,
      0.023708,
      0.011765,
      0.004512,
      0.00349,
      0.029965,
      0.015686,
      0.00595,
      0.004843,
      0.03713,
      0.019608,
      0.007588,
      0.006356,
      0.044973,
      0.023529,
      0.009426,
      0.008022,
      0.052844,
      0.027451,
      0.011465,
      0.009828,
      0.06075,
      0.031373,
      0.013708,
      0.011771,
      0.068667,
      0.035294,
      0.016156,
      0.01384,
      0.076603,
      0.039216,
      0.018815,
      0.016026,
      0.084584,
      0.043137,
      0.021692,
      0.01832,
      0.09261,
      0.047059,
      0.024792,
      0.020715,
      0.100676,
      0.05098,
      0.028123,
      0.023201,
      0.108787,
      0.054902,
      0.031696,
      0.025765,
      0.116965,
      0.058824,
      0.03552,
      0.028397,
      0.125209,
      0.062745,
      0.039608,
      0.03109,
      0.133515,
      0.066667,
      0.04383,
      0.03383,
      0.141886,
      0.070588,
      0.048062,
      0.036607,
      0.150327,
      0.07451,
      0.05232,
      0.039407,
      0.158841,
      0.078431,
      0.056615,
      0.04216,
      0.167446,
      0.082353,
      0.060949,
      0.044794,
      0.176129,
      0.086275,
      0.06533,
      0.047318,
      0.184892,
      0.090196,
      0.069764,
      0.049726,
      0.193735,
      0.094118,
      0.074257,
      0.052017,
      0.20266,
      0.098039,
      0.078815,
      0.054184,
      0.211667,
      0.101961,
      0.083446,
      0.056225,
      0.220755,
      0.105882,
      0.088155,
      0.058133,
      0.229922,
      0.109804,
      0.092949,
      0.059904,
      0.239164,
      0.113725,
      0.097833,
      0.061531,
      0.248477,
      0.117647,
      0.102815,
      0.06301,
      0.257854,
      0.121569,
      0.107899,
      0.064335,
      0.267289,
      0.12549,
      0.113094,
      0.065492,
      0.276784,
      0.129412,
      0.118405,
      0.066479,
      0.286321,
      0.133333,
      0.123833,
      0.067295,
      0.295879,
      0.137255,
      0.12938,
      0.067935,
      0.305443,
      0.141176,
      0.135053,
      0.068391,
      0.315,
      0.145098,
      0.140858,
      0.068654,
      0.324538,
      0.14902,
      0.146785,
      0.068738,
      0.334011,
      0.152941,
      0.152839,
      0.068637,
      0.343404,
      0.156863,
      0.159018,
      0.068354,
      0.352688,
      0.160784,
      0.165308,
      0.067911,
      0.361816,
      0.164706,
      0.171713,
      0.067305,
      0.370771,
      0.168627,
      0.178212,
      0.066576,
      0.379497,
      0.172549,
      0.184801,
      0.065732,
      0.387973,
      0.176471,
      0.19146,
      0.064818,
      0.396152,
      0.180392,
      0.198177,
      0.063862,
      0.404009,
      0.184314,
      0.204935,
      0.062907,
      0.411514,
      0.188235,
      0.211718,
      0.061992,
      0.418647,
      0.192157,
      0.218512,
      0.061158,
      0.425392,
      0.196078,
      0.225302,
      0.060445,
      0.431742,
      0.2,
      0.232077,
      0.059889,
      0.437695,
      0.203922,
      0.238826,
      0.059517,
      0.443256,
      0.207843,
      0.245543,
      0.059352,
      0.448436,
      0.211765,
      0.25222,
      0.059415,
      0.453248,
      0.215686,
      0.258857,
      0.059706,
      0.45771,
      0.219608,
      0.265447,
      0.060237,
      0.46184,
      0.223529,
      0.271994,
      0.060994,
      0.46566,
      0.227451,
      0.278493,
      0.061978,
      0.46919,
      0.231373,
      0.284951,
      0.063168,
      0.472451,
      0.235294,
      0.291366,
      0.064553,
      0.475462,
      0.239216,
      0.29774,
      0.066117,
      0.478243,
      0.243137,
      0.304081,
      0.067835,
      0.480812,
      0.247059,
      0.310382,
      0.069702,
      0.483186,
      0.25098,
      0.316654,
      0.07169,
      0.48538,
      0.254902,
      0.322899,
      0.073782,
      0.487408,
      0.258824,
      0.329114,
      0.075972,
      0.489287,
      0.262745,
      0.335308,
      0.078236,
      0.491024,
      0.266667,
      0.341482,
      0.080564,
      0.492631,
      0.270588,
      0.347636,
      0.082946,
      0.494121,
      0.27451,
      0.353773,
      0.085373,
      0.495501,
      0.278431,
      0.359898,
      0.087831,
      0.496778,
      0.282353,
      0.366012,
      0.090314,
      0.49796,
      0.286275,
      0.372116,
      0.092816,
      0.499053,
      0.290196,
      0.378211,
      0.095332,
      0.500067,
      0.294118,
      0.384299,
      0.097855,
      0.501002,
      0.298039,
      0.390384,
      0.100379,
      0.501864,
      0.301961,
      0.396467,
      0.102902,
      0.502658,
      0.305882,
      0.402548,
      0.10542,
      0.503386,
      0.309804,
      0.408629,
      0.10793,
      0.504052,
      0.313725,
      0.414709,
      0.110431,
      0.504662,
      0.317647,
      0.420791,
      0.11292,
      0.505215,
      0.321569,
      0.426877,
      0.115395,
      0.505714,
      0.32549,
      0.432967,
      0.117855,
      0.50616,
      0.329412,
      0.439062,
      0.120298,
      0.506555,
      0.333333,
      0.445163,
      0.122724,
      0.506901,
      0.337255,
      0.451271,
      0.125132,
      0.507198,
      0.341176,
      0.457386,
      0.127522,
      0.507448,
      0.345098,
      0.463508,
      0.129893,
      0.507652,
      0.34902,
      0.46964,
      0.132245,
      0.507809,
      0.352941,
      0.47578,
      0.134577,
      0.507921,
      0.356863,
      0.481929,
      0.136891,
      0.507989,
      0.360784,
      0.488088,
      0.139186,
      0.508011,
      0.364706,
      0.494258,
      0.141462,
      0.507988,
      0.368627,
      0.500438,
      0.143719,
      0.50792,
      0.372549,
      0.506629,
      0.145958,
      0.507806,
      0.376471,
      0.512831,
      0.148179,
      0.507648,
      0.380392,
      0.519045,
      0.150383,
      0.507443,
      0.384314,
      0.52527,
      0.152569,
      0.507192,
      0.388235,
      0.531507,
      0.154739,
      0.506895,
      0.392157,
      0.537755,
      0.156894,
      0.506551,
      0.396078,
      0.544015,
      0.159033,
      0.506159,
      0.4,
      0.550287,
      0.161158,
      0.505719,
      0.403922,
      0.556571,
      0.163269,
      0.50523,
      0.407843,
      0.562866,
      0.165368,
      0.504692,
      0.411765,
      0.569172,
      0.167454,
      0.504105,
      0.415686,
      0.57549,
      0.16953,
      0.503466,
      0.419608,
      0.581819,
      0.171596,
      0.502777,
      0.423529,
      0.588158,
      0.173652,
      0.502035,
      0.427451,
      0.594508,
      0.175701,
      0.501241,
      0.431373,
      0.600868,
      0.177743,
      0.500394,
      0.435294,
      0.607238,
      0.179779,
      0.499492,
      0.439216,
      0.613617,
      0.181811,
      0.498536,
      0.443137,
      0.620005,
      0.18384,
      0.497524,
      0.447059,
      0.626401,
      0.185867,
      0.496456,
      0.45098,
      0.632805,
      0.187893,
      0.495332,
      0.454902,
      0.639216,
      0.189921,
      0.49415,
      0.458824,
      0.645633,
      0.191952,
      0.49291,
      0.462745,
      0.652056,
      0.193986,
      0.491611,
      0.466667,
      0.658483,
      0.196027,
      0.490253,
      0.470588,
      0.664915,
      0.198075,
      0.488836,
      0.47451,
      0.671349,
      0.200133,
      0.487358,
      0.478431,
      0.677786,
      0.202203,
      0.485819,
      0.482353,
      0.684224,
      0.204286,
      0.484219,
      0.486275,
      0.690661,
      0.206384,
      0.482558,
      0.490196,
      0.697098,
      0.208501,
      0.480835,
      0.494118,
      0.703532,
      0.210638,
      0.479049,
      0.498039,
      0.709962,
      0.212797,
      0.477201,
      0.501961,
      0.716387,
      0.214982,
      0.47529,
      0.505882,
      0.722805,
      0.217194,
      0.473316,
      0.509804,
      0.729216,
      0.219437,
      0.471279,
      0.513725,
      0.735616,
      0.221713,
      0.46918,
      0.517647,
      0.742004,
      0.224025,
      0.467018,
      0.521569,
      0.748378,
      0.226377,
      0.464794,
      0.52549,
      0.754737,
      0.228772,
      0.462509,
      0.529412,
      0.761077,
      0.231214,
      0.460162,
      0.533333,
      0.767398,
      0.233705,
      0.457755,
      0.537255,
      0.773695,
      0.236249,
      0.455289,
      0.541176,
      0.779968,
      0.238851,
      0.452765,
      0.545098,
      0.786212,
      0.241514,
      0.450184,
      0.54902,
      0.792427,
      0.244242,
      0.447543,
      0.552941,
      0.798608,
      0.24704,
      0.444848,
      0.556863,
      0.804752,
      0.249911,
      0.442102,
      0.560784,
      0.810855,
      0.252861,
      0.439305,
      0.564706,
      0.816914,
      0.255895,
      0.436461,
      0.568627,
      0.822926,
      0.259016,
      0.433573,
      0.572549,
      0.828886,
      0.262229,
      0.430644,
      0.576471,
      0.834791,
      0.26554,
      0.427671,
      0.580392,
      0.840636,
      0.268953,
      0.424666,
      0.584314,
      0.846416,
      0.272473,
      0.421631,
      0.588235,
      0.852126,
      0.276106,
      0.418573,
      0.592157,
      0.857763,
      0.279857,
      0.415496,
      0.596078,
      0.86332,
      0.283729,
      0.412403,
      0.6,
      0.868793,
      0.287728,
      0.409303,
      0.603922,
      0.874176,
      0.291859,
      0.406205,
      0.607843,
      0.879464,
      0.296125,
      0.403118,
      0.611765,
      0.884651,
      0.30053,
      0.400047,
      0.615686,
      0.889731,
      0.305079,
      0.397002,
      0.619608,
      0.8947,
      0.309773,
      0.393995,
      0.623529,
      0.899552,
      0.314616,
      0.391037,
      0.627451,
      0.904281,
      0.31961,
      0.388137,
      0.631373,
      0.908884,
      0.324755,
      0.385308,
      0.635294,
      0.913354,
      0.330052,
      0.382563,
      0.639216,
      0.917689,
      0.3355,
      0.379915,
      0.643137,
      0.921884,
      0.341098,
      0.377376,
      0.647059,
      0.925937,
      0.346844,
      0.374959,
      0.65098,
      0.929845,
      0.352734,
      0.372677,
      0.654902,
      0.933606,
      0.358764,
      0.370541,
      0.658824,
      0.937221,
      0.364929,
      0.368567,
      0.662745,
      0.940687,
      0.371224,
      0.366762,
      0.666667,
      0.944006,
      0.377643,
      0.365136,
      0.670588,
      0.94718,
      0.384178,
      0.363701,
      0.67451,
      0.95021,
      0.39082,
      0.362468,
      0.678431,
      0.953099,
      0.397563,
      0.361438,
      0.682353,
      0.955849,
      0.4044,
      0.360619,
      0.686275,
      0.958464,
      0.411324,
      0.360014,
      0.690196,
      0.960949,
      0.418323,
      0.35963,
      0.694118,
      0.96331,
      0.42539,
      0.359469,
      0.698039,
      0.965549,
      0.432519,
      0.359529,
      0.701961,
      0.967671,
      0.439703,
      0.35981,
      0.705882,
      0.96968,
      0.446936,
      0.360311,
      0.709804,
      0.971582,
      0.45421,
      0.36103,
      0.713725,
      0.973381,
      0.46152,
      0.361965,
      0.717647,
      0.975082,
      0.468861,
      0.363111,
      0.721569,
      0.97669,
      0.476226,
      0.364466,
      0.72549,
      0.97821,
      0.483612,
      0.366025,
      0.729412,
      0.979645,
      0.491014,
      0.367783,
      0.733333,
      0.981,
      0.498428,
      0.369734,
      0.737255,
      0.982279,
      0.505851,
      0.371874,
      0.741176,
      0.983485,
      0.51328,
      0.374198,
      0.745098,
      0.984622,
      0.520713,
      0.376698,
      0.74902,
      0.985693,
      0.528148,
      0.379371,
      0.752941,
      0.9867,
      0.535582,
      0.38221,
      0.756863,
      0.987646,
      0.543015,
      0.38521,
      0.760784,
      0.988533,
      0.550446,
      0.388365,
      0.764706,
      0.989363,
      0.557873,
      0.391671,
      0.768627,
      0.990138,
      0.565296,
      0.395122,
      0.772549,
      0.990871,
      0.572706,
      0.398714,
      0.776471,
      0.991558,
      0.580107,
      0.402441,
      0.780392,
      0.992196,
      0.587502,
      0.406299,
      0.784314,
      0.992785,
      0.594891,
      0.410283,
      0.788235,
      0.993326,
      0.602275,
      0.41439,
      0.792157,
      0.993834,
      0.609644,
      0.418613,
      0.796078,
      0.994309,
      0.616999,
      0.42295,
      0.8,
      0.994738,
      0.62435,
      0.427397,
      0.803922,
      0.995122,
      0.631696,
      0.431951,
      0.807843,
      0.99548,
      0.639027,
      0.436607,
      0.811765,
      0.99581,
      0.646344,
      0.441361,
      0.815686,
      0.996096,
      0.653659,
      0.446213,
      0.819608,
      0.996341,
      0.660969,
      0.45116,
      0.823529,
      0.99658,
      0.668256,
      0.456192,
      0.827451,
      0.996775,
      0.675541,
      0.461314,
      0.831373,
      0.996925,
      0.682828,
      0.466526,
      0.835294,
      0.997077,
      0.690088,
      0.471811,
      0.839216,
      0.997186,
      0.697349,
      0.477182,
      0.843137,
      0.997254,
      0.704611,
      0.482635,
      0.847059,
      0.997325,
      0.711848,
      0.488154,
      0.85098,
      0.997351,
      0.719089,
      0.493755,
      0.854902,
      0.997351,
      0.726324,
      0.499428,
      0.858824,
      0.997341,
      0.733545,
      0.505167,
      0.862745,
      0.997285,
      0.740772,
      0.510983,
      0.866667,
      0.997228,
      0.747981,
      0.516859,
      0.870588,
      0.997138,
      0.75519,
      0.522806,
      0.87451,
      0.997019,
      0.762398,
      0.528821,
      0.878431,
      0.996898,
      0.769591,
      0.534892,
      0.882353,
      0.996727,
      0.776795,
      0.541039,
      0.886275,
      0.996571,
      0.783977,
      0.547233,
      0.890196,
      0.996369,
      0.791167,
      0.553499,
      0.894118,
      0.996162,
      0.798348,
      0.55982,
      0.898039,
      0.995932,
      0.805527,
      0.566202,
      0.901961,
      0.99568,
      0.812706,
      0.572645,
      0.905882,
      0.995424,
      0.819875,
      0.57914,
      0.909804,
      0.995131,
      0.827052,
      0.585701,
      0.913725,
      0.994851,
      0.834213,
      0.592307,
      0.917647,
      0.994524,
      0.841387,
      0.598983,
      0.921569,
      0.994222,
      0.84854,
      0.605696,
      0.92549,
      0.993866,
      0.855711,
      0.612482,
      0.929412,
      0.993545,
      0.862859,
      0.619299,
      0.933333,
      0.99317,
      0.870024,
      0.626189,
      0.937255,
      0.992831,
      0.877168,
      0.633109,
      0.941176,
      0.99244,
      0.88433,
      0.640099,
      0.945098,
      0.992089,
      0.89147,
      0.647116,
      0.94902,
      0.991688,
      0.898627,
      0.654202,
      0.952941,
      0.991332,
      0.905763,
      0.661309,
      0.956863,
      0.99093,
      0.912915,
      0.668481,
      0.960784,
      0.99057,
      0.920049,
      0.675675,
      0.964706,
      0.990175,
      0.927196,
      0.682926,
      0.968627,
      0.989815,
      0.934329,
      0.690198,
      0.972549,
      0.989434,
      0.94147,
      0.697519,
      0.976471,
      0.989077,
      0.948604,
      0.704863,
      0.980392,
      0.988717,
      0.955742,
      0.712242,
      0.984314,
      0.988367,
      0.962878,
      0.719649,
      0.988235,
      0.988033,
      0.970012,
      0.727077,
      0.992157,
      0.987691,
      0.977154,
      0.734536,
      0.996078,
      0.987387,
      0.984288,
      0.742002,
      1,
      0.987053,
      0.991438,
      0.749504,
    ],
  },
  {
    ColorSpace: 'Diverging',
    Name: 'Inferno (matplotlib)',
    NanColor: [0, 1, 0],
    Source: 'https://github.com/BIDS/colormap/blob/master/colormaps.py',
    License: 'CC0',
    Creator: 'Nathaniel J. Smith & Stefan van der Walt',
    RGBPoints: [
      0,
      0.001462,
      0.000466,
      0.013866,
      0.003922,
      0.002267,
      0.00127,
      0.01857,
      0.007843,
      0.003299,
      0.002249,
      0.024239,
      0.011765,
      0.004547,
      0.003392,
      0.030909,
      0.015686,
      0.006006,
      0.004692,
      0.038558,
      0.019608,
      0.007676,
      0.006136,
      0.046836,
      0.023529,
      0.009561,
      0.007713,
      0.055143,
      0.027451,
      0.011663,
      0.009417,
      0.06346,
      0.031373,
      0.013995,
      0.011225,
      0.071862,
      0.035294,
      0.016561,
      0.013136,
      0.080282,
      0.039216,
      0.019373,
      0.015133,
      0.088767,
      0.043137,
      0.022447,
      0.017199,
      0.097327,
      0.047059,
      0.025793,
      0.019331,
      0.10593,
      0.05098,
      0.029432,
      0.021503,
      0.114621,
      0.054902,
      0.033385,
      0.023702,
      0.123397,
      0.058824,
      0.037668,
      0.025921,
      0.132232,
      0.062745,
      0.042253,
      0.028139,
      0.141141,
      0.066667,
      0.046915,
      0.030324,
      0.150164,
      0.070588,
      0.051644,
      0.032474,
      0.159254,
      0.07451,
      0.056449,
      0.034569,
      0.168414,
      0.078431,
      0.06134,
      0.03659,
      0.177642,
      0.082353,
      0.066331,
      0.038504,
      0.186962,
      0.086275,
      0.071429,
      0.040294,
      0.196354,
      0.090196,
      0.076637,
      0.041905,
      0.205799,
      0.094118,
      0.081962,
      0.043328,
      0.215289,
      0.098039,
      0.087411,
      0.044556,
      0.224813,
      0.101961,
      0.09299,
      0.045583,
      0.234358,
      0.105882,
      0.098702,
      0.046402,
      0.243904,
      0.109804,
      0.104551,
      0.047008,
      0.25343,
      0.113725,
      0.110536,
      0.047399,
      0.262912,
      0.117647,
      0.116656,
      0.047574,
      0.272321,
      0.121569,
      0.122908,
      0.047536,
      0.281624,
      0.12549,
      0.129285,
      0.047293,
      0.290788,
      0.129412,
      0.135778,
      0.046856,
      0.299776,
      0.133333,
      0.142378,
      0.046242,
      0.308553,
      0.137255,
      0.149073,
      0.045468,
      0.317085,
      0.141176,
      0.15585,
      0.044559,
      0.325338,
      0.145098,
      0.162689,
      0.043554,
      0.333277,
      0.14902,
      0.169575,
      0.042489,
      0.340874,
      0.152941,
      0.176493,
      0.041402,
      0.348111,
      0.156863,
      0.183429,
      0.040329,
      0.354971,
      0.160784,
      0.190367,
      0.039309,
      0.361447,
      0.164706,
      0.197297,
      0.0384,
      0.367535,
      0.168627,
      0.204209,
      0.037632,
      0.373238,
      0.172549,
      0.211095,
      0.03703,
      0.378563,
      0.176471,
      0.217949,
      0.036615,
      0.383522,
      0.180392,
      0.224763,
      0.036405,
      0.388129,
      0.184314,
      0.231538,
      0.036405,
      0.3924,
      0.188235,
      0.238273,
      0.036621,
      0.396353,
      0.192157,
      0.244967,
      0.037055,
      0.400007,
      0.196078,
      0.25162,
      0.037705,
      0.403378,
      0.2,
      0.258234,
      0.038571,
      0.406485,
      0.203922,
      0.26481,
      0.039647,
      0.409345,
      0.207843,
      0.271347,
      0.040922,
      0.411976,
      0.211765,
      0.27785,
      0.042353,
      0.414392,
      0.215686,
      0.284321,
      0.043933,
      0.416608,
      0.219608,
      0.290763,
      0.045644,
      0.418637,
      0.223529,
      0.297178,
      0.04747,
      0.420491,
      0.227451,
      0.303568,
      0.049396,
      0.422182,
      0.231373,
      0.309935,
      0.051407,
      0.423721,
      0.235294,
      0.316282,
      0.05349,
      0.425116,
      0.239216,
      0.32261,
      0.055634,
      0.426377,
      0.243137,
      0.328921,
      0.057827,
      0.427511,
      0.247059,
      0.335217,
      0.06006,
      0.428524,
      0.25098,
      0.3415,
      0.062325,
      0.429425,
      0.254902,
      0.347771,
      0.064616,
      0.430217,
      0.258824,
      0.354032,
      0.066925,
      0.430906,
      0.262745,
      0.360284,
      0.069247,
      0.431497,
      0.266667,
      0.366529,
      0.071579,
      0.431994,
      0.270588,
      0.372768,
      0.073915,
      0.4324,
      0.27451,
      0.379001,
      0.076253,
      0.432719,
      0.278431,
      0.385228,
      0.078591,
      0.432955,
      0.282353,
      0.391453,
      0.080927,
      0.433109,
      0.286275,
      0.397674,
      0.083257,
      0.433183,
      0.290196,
      0.403894,
      0.08558,
      0.433179,
      0.294118,
      0.410113,
      0.087896,
      0.433098,
      0.298039,
      0.416331,
      0.090203,
      0.432943,
      0.301961,
      0.422549,
      0.092501,
      0.432714,
      0.305882,
      0.428768,
      0.09479,
      0.432412,
      0.309804,
      0.434987,
      0.097069,
      0.432039,
      0.313725,
      0.441207,
      0.099338,
      0.431594,
      0.317647,
      0.447428,
      0.101597,
      0.43108,
      0.321569,
      0.453651,
      0.103848,
      0.430498,
      0.32549,
      0.459875,
      0.106089,
      0.429846,
      0.329412,
      0.4661,
      0.108322,
      0.429125,
      0.333333,
      0.472328,
      0.110547,
      0.428334,
      0.337255,
      0.478558,
      0.112764,
      0.427475,
      0.341176,
      0.484789,
      0.114974,
      0.426548,
      0.345098,
      0.491022,
      0.117179,
      0.425552,
      0.34902,
      0.497257,
      0.119379,
      0.424488,
      0.352941,
      0.503493,
      0.121575,
      0.423356,
      0.356863,
      0.50973,
      0.123769,
      0.422156,
      0.360784,
      0.515967,
      0.12596,
      0.420887,
      0.364706,
      0.522206,
      0.12815,
      0.419549,
      0.368627,
      0.528444,
      0.130341,
      0.418142,
      0.372549,
      0.534683,
      0.132534,
      0.416667,
      0.376471,
      0.54092,
      0.134729,
      0.415123,
      0.380392,
      0.547157,
      0.136929,
      0.413511,
      0.384314,
      0.553392,
      0.139134,
      0.411829,
      0.388235,
      0.559624,
      0.141346,
      0.410078,
      0.392157,
      0.565854,
      0.143567,
      0.408258,
      0.396078,
      0.572081,
      0.145797,
      0.406369,
      0.4,
      0.578304,
      0.148039,
      0.404411,
      0.403922,
      0.584521,
      0.150294,
      0.402385,
      0.407843,
      0.590734,
      0.152563,
      0.40029,
      0.411765,
      0.59694,
      0.154848,
      0.398125,
      0.415686,
      0.603139,
      0.157151,
      0.395891,
      0.419608,
      0.60933,
      0.159474,
      0.393589,
      0.423529,
      0.615513,
      0.161817,
      0.391219,
      0.427451,
      0.621685,
      0.164184,
      0.388781,
      0.431373,
      0.627847,
      0.166575,
      0.386276,
      0.435294,
      0.633998,
      0.168992,
      0.383704,
      0.439216,
      0.640135,
      0.171438,
      0.381065,
      0.443137,
      0.64626,
      0.173914,
      0.378359,
      0.447059,
      0.652369,
      0.176421,
      0.375586,
      0.45098,
      0.658463,
      0.178962,
      0.372748,
      0.454902,
      0.66454,
      0.181539,
      0.369846,
      0.458824,
      0.670599,
      0.184153,
      0.366879,
      0.462745,
      0.676638,
      0.186807,
      0.363849,
      0.466667,
      0.682656,
      0.189501,
      0.360757,
      0.470588,
      0.688653,
      0.192239,
      0.357603,
      0.47451,
      0.694627,
      0.195021,
      0.354388,
      0.478431,
      0.700576,
      0.197851,
      0.351113,
      0.482353,
      0.7065,
      0.200728,
      0.347777,
      0.486275,
      0.712396,
      0.203656,
      0.344383,
      0.490196,
      0.718264,
      0.206636,
      0.340931,
      0.494118,
      0.724103,
      0.20967,
      0.337424,
      0.498039,
      0.729909,
      0.212759,
      0.333861,
      0.501961,
      0.735683,
      0.215906,
      0.330245,
      0.505882,
      0.741423,
      0.219112,
      0.326576,
      0.509804,
      0.747127,
      0.222378,
      0.322856,
      0.513725,
      0.752794,
      0.225706,
      0.319085,
      0.517647,
      0.758422,
      0.229097,
      0.315266,
      0.521569,
      0.76401,
      0.232554,
      0.311399,
      0.52549,
      0.769556,
      0.236077,
      0.307485,
      0.529412,
      0.775059,
      0.239667,
      0.303526,
      0.533333,
      0.780517,
      0.243327,
      0.299523,
      0.537255,
      0.785929,
      0.247056,
      0.295477,
      0.541176,
      0.791293,
      0.250856,
      0.29139,
      0.545098,
      0.796607,
      0.254728,
      0.287264,
      0.54902,
      0.801871,
      0.258674,
      0.283099,
      0.552941,
      0.807082,
      0.262692,
      0.278898,
      0.556863,
      0.812239,
      0.266786,
      0.274661,
      0.560784,
      0.817341,
      0.270954,
      0.27039,
      0.564706,
      0.822386,
      0.275197,
      0.266085,
      0.568627,
      0.827372,
      0.279517,
      0.26175,
      0.572549,
      0.832299,
      0.283913,
      0.257383,
      0.576471,
      0.837165,
      0.288385,
      0.252988,
      0.580392,
      0.841969,
      0.292933,
      0.248564,
      0.584314,
      0.846709,
      0.297559,
      0.244113,
      0.588235,
      0.851384,
      0.30226,
      0.239636,
      0.592157,
      0.855992,
      0.307038,
      0.235133,
      0.596078,
      0.860533,
      0.311892,
      0.230606,
      0.6,
      0.865006,
      0.316822,
      0.226055,
      0.603922,
      0.869409,
      0.321827,
      0.221482,
      0.607843,
      0.873741,
      0.326906,
      0.216886,
      0.611765,
      0.878001,
      0.33206,
      0.212268,
      0.615686,
      0.882188,
      0.337287,
      0.207628,
      0.619608,
      0.886302,
      0.342586,
      0.202968,
      0.623529,
      0.890341,
      0.347957,
      0.198286,
      0.627451,
      0.894305,
      0.353399,
      0.193584,
      0.631373,
      0.898192,
      0.358911,
      0.18886,
      0.635294,
      0.902003,
      0.364492,
      0.184116,
      0.639216,
      0.905735,
      0.37014,
      0.17935,
      0.643137,
      0.90939,
      0.375856,
      0.174563,
      0.647059,
      0.912966,
      0.381636,
      0.169755,
      0.65098,
      0.916462,
      0.387481,
      0.164924,
      0.654902,
      0.919879,
      0.393389,
      0.16007,
      0.658824,
      0.923215,
      0.399359,
      0.155193,
      0.662745,
      0.92647,
      0.405389,
      0.150292,
      0.666667,
      0.929644,
      0.411479,
      0.145367,
      0.670588,
      0.932737,
      0.417627,
      0.140417,
      0.67451,
      0.935747,
      0.423831,
      0.13544,
      0.678431,
      0.938675,
      0.430091,
      0.130438,
      0.682353,
      0.941521,
      0.436405,
      0.125409,
      0.686275,
      0.944285,
      0.442772,
      0.120354,
      0.690196,
      0.946965,
      0.449191,
      0.115272,
      0.694118,
      0.949562,
      0.45566,
      0.110164,
      0.698039,
      0.952075,
      0.462178,
      0.105031,
      0.701961,
      0.954506,
      0.468744,
      0.099874,
      0.705882,
      0.956852,
      0.475356,
      0.094695,
      0.709804,
      0.959114,
      0.482014,
      0.089499,
      0.713725,
      0.961293,
      0.488716,
      0.084289,
      0.717647,
      0.963387,
      0.495462,
      0.079073,
      0.721569,
      0.965397,
      0.502249,
      0.073859,
      0.72549,
      0.967322,
      0.509078,
      0.068659,
      0.729412,
      0.969163,
      0.515946,
      0.063488,
      0.733333,
      0.970919,
      0.522853,
      0.058367,
      0.737255,
      0.97259,
      0.529798,
      0.053324,
      0.741176,
      0.974176,
      0.53678,
      0.048392,
      0.745098,
      0.975677,
      0.543798,
      0.043618,
      0.74902,
      0.977092,
      0.55085,
      0.03905,
      0.752941,
      0.978422,
      0.557937,
      0.034931,
      0.756863,
      0.979666,
      0.565057,
      0.031409,
      0.760784,
      0.980824,
      0.572209,
      0.028508,
      0.764706,
      0.981895,
      0.579392,
      0.02625,
      0.768627,
      0.982881,
      0.586606,
      0.024661,
      0.772549,
      0.983779,
      0.593849,
      0.02377,
      0.776471,
      0.984591,
      0.601122,
      0.023606,
      0.780392,
      0.985315,
      0.608422,
      0.024202,
      0.784314,
      0.985952,
      0.61575,
      0.025592,
      0.788235,
      0.986502,
      0.623105,
      0.027814,
      0.792157,
      0.986964,
      0.630485,
      0.030908,
      0.796078,
      0.987337,
      0.63789,
      0.034916,
      0.8,
      0.987622,
      0.64532,
      0.039886,
      0.803922,
      0.987819,
      0.652773,
      0.045581,
      0.807843,
      0.987926,
      0.66025,
      0.05175,
      0.811765,
      0.987945,
      0.667748,
      0.058329,
      0.815686,
      0.987874,
      0.675267,
      0.065257,
      0.819608,
      0.987714,
      0.682807,
      0.072489,
      0.823529,
      0.987464,
      0.690366,
      0.07999,
      0.827451,
      0.987124,
      0.697944,
      0.087731,
      0.831373,
      0.986694,
      0.70554,
      0.095694,
      0.835294,
      0.986175,
      0.713153,
      0.103863,
      0.839216,
      0.985566,
      0.720782,
      0.112229,
      0.843137,
      0.984865,
      0.728427,
      0.120785,
      0.847059,
      0.984075,
      0.736087,
      0.129527,
      0.85098,
      0.983196,
      0.743758,
      0.138453,
      0.854902,
      0.982228,
      0.751442,
      0.147565,
      0.858824,
      0.981173,
      0.759135,
      0.156863,
      0.862745,
      0.980032,
      0.766837,
      0.166353,
      0.866667,
      0.978806,
      0.774545,
      0.176037,
      0.870588,
      0.977497,
      0.782258,
      0.185923,
      0.87451,
      0.976108,
      0.789974,
      0.196018,
      0.878431,
      0.974638,
      0.797692,
      0.206332,
      0.882353,
      0.973088,
      0.805409,
      0.216877,
      0.886275,
      0.971468,
      0.813122,
      0.227658,
      0.890196,
      0.969783,
      0.820825,
      0.238686,
      0.894118,
      0.968041,
      0.828515,
      0.249972,
      0.898039,
      0.966243,
      0.836191,
      0.261534,
      0.901961,
      0.964394,
      0.843848,
      0.273391,
      0.905882,
      0.962517,
      0.851476,
      0.285546,
      0.909804,
      0.960626,
      0.859069,
      0.29801,
      0.913725,
      0.95872,
      0.866624,
      0.31082,
      0.917647,
      0.956834,
      0.874129,
      0.323974,
      0.921569,
      0.954997,
      0.881569,
      0.337475,
      0.92549,
      0.953215,
      0.888942,
      0.351369,
      0.929412,
      0.951546,
      0.896226,
      0.365627,
      0.933333,
      0.950018,
      0.903409,
      0.380271,
      0.937255,
      0.948683,
      0.910473,
      0.395289,
      0.941176,
      0.947594,
      0.917399,
      0.410665,
      0.945098,
      0.946809,
      0.924168,
      0.426373,
      0.94902,
      0.946392,
      0.930761,
      0.442367,
      0.952941,
      0.946403,
      0.937159,
      0.458592,
      0.956863,
      0.946903,
      0.943348,
      0.47497,
      0.960784,
      0.947937,
      0.949318,
      0.491426,
      0.964706,
      0.949545,
      0.955063,
      0.50786,
      0.968627,
      0.95174,
      0.960587,
      0.524203,
      0.972549,
      0.954529,
      0.965896,
      0.540361,
      0.976471,
      0.957896,
      0.971003,
      0.556275,
      0.980392,
      0.961812,
      0.975924,
      0.571925,
      0.984314,
      0.966249,
      0.980678,
      0.587206,
      0.988235,
      0.971162,
      0.985282,
      0.602154,
      0.992157,
      0.976511,
      0.989753,
      0.61676,
      0.996078,
      0.982257,
      0.994109,
      0.631017,
      1,
      0.988362,
      0.998364,
      0.644924,
    ],
  },
  {
    ColorSpace: 'Diverging',
    Name: 'Plasma (matplotlib)',
    NanColor: [0, 1, 0],
    Source: 'https://github.com/BIDS/colormap/blob/master/colormaps.py',
    License: 'CC0',
    Creator: 'Nathaniel J. Smith & Stefan van der Walt',
    RGBPoints: [
      0,
      0.050383,
      0.029803,
      0.527975,
      0.003922,
      0.063536,
      0.028426,
      0.533124,
      0.007843,
      0.075353,
      0.027206,
      0.538007,
      0.011765,
      0.086222,
      0.026125,
      0.542658,
      0.015686,
      0.096379,
      0.025165,
      0.547103,
      0.019608,
      0.10598,
      0.024309,
      0.551368,
      0.023529,
      0.115124,
      0.023556,
      0.555468,
      0.027451,
      0.123903,
      0.022878,
      0.559423,
      0.031373,
      0.132381,
      0.022258,
      0.56325,
      0.035294,
      0.140603,
      0.021687,
      0.566959,
      0.039216,
      0.148607,
      0.021154,
      0.570562,
      0.043137,
      0.156421,
      0.020651,
      0.574065,
      0.047059,
      0.16407,
      0.020171,
      0.577478,
      0.05098,
      0.171574,
      0.019706,
      0.580806,
      0.054902,
      0.17895,
      0.019252,
      0.584054,
      0.058824,
      0.186213,
      0.018803,
      0.587228,
      0.062745,
      0.193374,
      0.018354,
      0.59033,
      0.066667,
      0.200445,
      0.017902,
      0.593364,
      0.070588,
      0.207435,
      0.017442,
      0.596333,
      0.07451,
      0.21435,
      0.016973,
      0.599239,
      0.078431,
      0.221197,
      0.016497,
      0.602083,
      0.082353,
      0.227983,
      0.016007,
      0.604867,
      0.086275,
      0.234715,
      0.015502,
      0.607592,
      0.090196,
      0.241396,
      0.014979,
      0.610259,
      0.094118,
      0.248032,
      0.014439,
      0.612868,
      0.098039,
      0.254627,
      0.013882,
      0.615419,
      0.101961,
      0.261183,
      0.013308,
      0.617911,
      0.105882,
      0.267703,
      0.012716,
      0.620346,
      0.109804,
      0.274191,
      0.012109,
      0.622722,
      0.113725,
      0.280648,
      0.011488,
      0.625038,
      0.117647,
      0.287076,
      0.010855,
      0.627295,
      0.121569,
      0.293478,
      0.010213,
      0.62949,
      0.12549,
      0.299855,
      0.009561,
      0.631624,
      0.129412,
      0.30621,
      0.008902,
      0.633694,
      0.133333,
      0.312543,
      0.008239,
      0.6357,
      0.137255,
      0.318856,
      0.007576,
      0.63764,
      0.141176,
      0.32515,
      0.006915,
      0.639512,
      0.145098,
      0.331426,
      0.006261,
      0.641316,
      0.14902,
      0.337683,
      0.005618,
      0.643049,
      0.152941,
      0.343925,
      0.004991,
      0.64471,
      0.156863,
      0.35015,
      0.004382,
      0.646298,
      0.160784,
      0.356359,
      0.003798,
      0.64781,
      0.164706,
      0.362553,
      0.003243,
      0.649245,
      0.168627,
      0.368733,
      0.002724,
      0.650601,
      0.172549,
      0.374897,
      0.002245,
      0.651876,
      0.176471,
      0.381047,
      0.001814,
      0.653068,
      0.180392,
      0.387183,
      0.001434,
      0.654177,
      0.184314,
      0.393304,
      0.001114,
      0.655199,
      0.188235,
      0.399411,
      0.000859,
      0.656133,
      0.192157,
      0.405503,
      0.000678,
      0.656977,
      0.196078,
      0.41158,
      0.000577,
      0.65773,
      0.2,
      0.417642,
      0.000564,
      0.65839,
      0.203922,
      0.423689,
      0.000646,
      0.658956,
      0.207843,
      0.429719,
      0.000831,
      0.659425,
      0.211765,
      0.435734,
      0.001127,
      0.659797,
      0.215686,
      0.441732,
      0.00154,
      0.660069,
      0.219608,
      0.447714,
      0.00208,
      0.66024,
      0.223529,
      0.453677,
      0.002755,
      0.66031,
      0.227451,
      0.459623,
      0.003574,
      0.660277,
      0.231373,
      0.46555,
      0.004545,
      0.660139,
      0.235294,
      0.471457,
      0.005678,
      0.659897,
      0.239216,
      0.477344,
      0.00698,
      0.659549,
      0.243137,
      0.48321,
      0.00846,
      0.659095,
      0.247059,
      0.489055,
      0.010127,
      0.658534,
      0.25098,
      0.494877,
      0.01199,
      0.657865,
      0.254902,
      0.500678,
      0.014055,
      0.657088,
      0.258824,
      0.506454,
      0.016333,
      0.656202,
      0.262745,
      0.512206,
      0.018833,
      0.655209,
      0.266667,
      0.517933,
      0.021563,
      0.654109,
      0.270588,
      0.523633,
      0.024532,
      0.652901,
      0.27451,
      0.529306,
      0.027747,
      0.651586,
      0.278431,
      0.534952,
      0.031217,
      0.650165,
      0.282353,
      0.54057,
      0.03495,
      0.64864,
      0.286275,
      0.546157,
      0.038954,
      0.64701,
      0.290196,
      0.551715,
      0.043136,
      0.645277,
      0.294118,
      0.557243,
      0.047331,
      0.643443,
      0.298039,
      0.562738,
      0.051545,
      0.641509,
      0.301961,
      0.568201,
      0.055778,
      0.639477,
      0.305882,
      0.573632,
      0.060028,
      0.637349,
      0.309804,
      0.579029,
      0.064296,
      0.635126,
      0.313725,
      0.584391,
      0.068579,
      0.632812,
      0.317647,
      0.589719,
      0.072878,
      0.630408,
      0.321569,
      0.595011,
      0.07719,
      0.627917,
      0.32549,
      0.600266,
      0.081516,
      0.625342,
      0.329412,
      0.605485,
      0.085854,
      0.622686,
      0.333333,
      0.610667,
      0.090204,
      0.619951,
      0.337255,
      0.615812,
      0.094564,
      0.61714,
      0.341176,
      0.620919,
      0.098934,
      0.614257,
      0.345098,
      0.625987,
      0.103312,
      0.611305,
      0.34902,
      0.631017,
      0.107699,
      0.608287,
      0.352941,
      0.636008,
      0.112092,
      0.605205,
      0.356863,
      0.640959,
      0.116492,
      0.602065,
      0.360784,
      0.645872,
      0.120898,
      0.598867,
      0.364706,
      0.650746,
      0.125309,
      0.595617,
      0.368627,
      0.65558,
      0.129725,
      0.592317,
      0.372549,
      0.660374,
      0.134144,
      0.588971,
      0.376471,
      0.665129,
      0.138566,
      0.585582,
      0.380392,
      0.669845,
      0.142992,
      0.582154,
      0.384314,
      0.674522,
      0.147419,
      0.578688,
      0.388235,
      0.67916,
      0.151848,
      0.575189,
      0.392157,
      0.683758,
      0.156278,
      0.57166,
      0.396078,
      0.688318,
      0.160709,
      0.568103,
      0.4,
      0.69284,
      0.165141,
      0.564522,
      0.403922,
      0.697324,
      0.169573,
      0.560919,
      0.407843,
      0.701769,
      0.174005,
      0.557296,
      0.411765,
      0.706178,
      0.178437,
      0.553657,
      0.415686,
      0.710549,
      0.182868,
      0.550004,
      0.419608,
      0.714883,
      0.187299,
      0.546338,
      0.423529,
      0.719181,
      0.191729,
      0.542663,
      0.427451,
      0.723444,
      0.196158,
      0.538981,
      0.431373,
      0.72767,
      0.200586,
      0.535293,
      0.435294,
      0.731862,
      0.205013,
      0.531601,
      0.439216,
      0.736019,
      0.209439,
      0.527908,
      0.443137,
      0.740143,
      0.213864,
      0.524216,
      0.447059,
      0.744232,
      0.218288,
      0.520524,
      0.45098,
      0.748289,
      0.222711,
      0.516834,
      0.454902,
      0.752312,
      0.227133,
      0.513149,
      0.458824,
      0.756304,
      0.231555,
      0.509468,
      0.462745,
      0.760264,
      0.235976,
      0.505794,
      0.466667,
      0.764193,
      0.240396,
      0.502126,
      0.470588,
      0.76809,
      0.244817,
      0.498465,
      0.47451,
      0.771958,
      0.249237,
      0.494813,
      0.478431,
      0.775796,
      0.253658,
      0.491171,
      0.482353,
      0.779604,
      0.258078,
      0.487539,
      0.486275,
      0.783383,
      0.2625,
      0.483918,
      0.490196,
      0.787133,
      0.266922,
      0.480307,
      0.494118,
      0.790855,
      0.271345,
      0.476706,
      0.498039,
      0.794549,
      0.27577,
      0.473117,
      0.501961,
      0.798216,
      0.280197,
      0.469538,
      0.505882,
      0.801855,
      0.284626,
      0.465971,
      0.509804,
      0.805467,
      0.289057,
      0.462415,
      0.513725,
      0.809052,
      0.293491,
      0.45887,
      0.517647,
      0.812612,
      0.297928,
      0.455338,
      0.521569,
      0.816144,
      0.302368,
      0.451816,
      0.52549,
      0.819651,
      0.306812,
      0.448306,
      0.529412,
      0.823132,
      0.311261,
      0.444806,
      0.533333,
      0.826588,
      0.315714,
      0.441316,
      0.537255,
      0.830018,
      0.320172,
      0.437836,
      0.541176,
      0.833422,
      0.324635,
      0.434366,
      0.545098,
      0.836801,
      0.329105,
      0.430905,
      0.54902,
      0.840155,
      0.33358,
      0.427455,
      0.552941,
      0.843484,
      0.338062,
      0.424013,
      0.556863,
      0.846788,
      0.342551,
      0.420579,
      0.560784,
      0.850066,
      0.347048,
      0.417153,
      0.564706,
      0.853319,
      0.351553,
      0.413734,
      0.568627,
      0.856547,
      0.356066,
      0.410322,
      0.572549,
      0.85975,
      0.360588,
      0.406917,
      0.576471,
      0.862927,
      0.365119,
      0.403519,
      0.580392,
      0.866078,
      0.36966,
      0.400126,
      0.584314,
      0.869203,
      0.374212,
      0.396738,
      0.588235,
      0.872303,
      0.378774,
      0.393355,
      0.592157,
      0.875376,
      0.383347,
      0.389976,
      0.596078,
      0.878423,
      0.387932,
      0.3866,
      0.6,
      0.881443,
      0.392529,
      0.383229,
      0.603922,
      0.884436,
      0.397139,
      0.37986,
      0.607843,
      0.887402,
      0.401762,
      0.376494,
      0.611765,
      0.89034,
      0.406398,
      0.37313,
      0.615686,
      0.89325,
      0.411048,
      0.369768,
      0.619608,
      0.896131,
      0.415712,
      0.366407,
      0.623529,
      0.898984,
      0.420392,
      0.363047,
      0.627451,
      0.901807,
      0.425087,
      0.359688,
      0.631373,
      0.904601,
      0.429797,
      0.356329,
      0.635294,
      0.907365,
      0.434524,
      0.35297,
      0.639216,
      0.910098,
      0.439268,
      0.34961,
      0.643137,
      0.9128,
      0.444029,
      0.346251,
      0.647059,
      0.915471,
      0.448807,
      0.34289,
      0.65098,
      0.918109,
      0.453603,
      0.339529,
      0.654902,
      0.920714,
      0.458417,
      0.336166,
      0.658824,
      0.923287,
      0.463251,
      0.332801,
      0.662745,
      0.925825,
      0.468103,
      0.329435,
      0.666667,
      0.928329,
      0.472975,
      0.326067,
      0.670588,
      0.930798,
      0.477867,
      0.322697,
      0.67451,
      0.933232,
      0.48278,
      0.319325,
      0.678431,
      0.93563,
      0.487712,
      0.315952,
      0.682353,
      0.93799,
      0.492667,
      0.312575,
      0.686275,
      0.940313,
      0.497642,
      0.309197,
      0.690196,
      0.942598,
      0.502639,
      0.305816,
      0.694118,
      0.944844,
      0.507658,
      0.302433,
      0.698039,
      0.947051,
      0.512699,
      0.299049,
      0.701961,
      0.949217,
      0.517763,
      0.295662,
      0.705882,
      0.951344,
      0.52285,
      0.292275,
      0.709804,
      0.953428,
      0.52796,
      0.288883,
      0.713725,
      0.95547,
      0.533093,
      0.28549,
      0.717647,
      0.957469,
      0.53825,
      0.282096,
      0.721569,
      0.959424,
      0.543431,
      0.278701,
      0.72549,
      0.961336,
      0.548636,
      0.275305,
      0.729412,
      0.963203,
      0.553865,
      0.271909,
      0.733333,
      0.965024,
      0.559118,
      0.268513,
      0.737255,
      0.966798,
      0.564396,
      0.265118,
      0.741176,
      0.968526,
      0.5697,
      0.261721,
      0.745098,
      0.970205,
      0.575028,
      0.258325,
      0.74902,
      0.971835,
      0.580382,
      0.254931,
      0.752941,
      0.973416,
      0.585761,
      0.25154,
      0.756863,
      0.974947,
      0.591165,
      0.248151,
      0.760784,
      0.976428,
      0.596595,
      0.244767,
      0.764706,
      0.977856,
      0.602051,
      0.241387,
      0.768627,
      0.979233,
      0.607532,
      0.238013,
      0.772549,
      0.980556,
      0.613039,
      0.234646,
      0.776471,
      0.981826,
      0.618572,
      0.231287,
      0.780392,
      0.983041,
      0.624131,
      0.227937,
      0.784314,
      0.984199,
      0.629718,
      0.224595,
      0.788235,
      0.985301,
      0.63533,
      0.221265,
      0.792157,
      0.986345,
      0.640969,
      0.217948,
      0.796078,
      0.987332,
      0.646633,
      0.214648,
      0.8,
      0.98826,
      0.652325,
      0.211364,
      0.803922,
      0.989128,
      0.658043,
      0.2081,
      0.807843,
      0.989935,
      0.663787,
      0.204859,
      0.811765,
      0.990681,
      0.669558,
      0.201642,
      0.815686,
      0.991365,
      0.675355,
      0.198453,
      0.819608,
      0.991985,
      0.681179,
      0.195295,
      0.823529,
      0.992541,
      0.68703,
      0.19217,
      0.827451,
      0.993032,
      0.692907,
      0.189084,
      0.831373,
      0.993456,
      0.69881,
      0.186041,
      0.835294,
      0.993814,
      0.704741,
      0.183043,
      0.839216,
      0.994103,
      0.710698,
      0.180097,
      0.843137,
      0.994324,
      0.716681,
      0.177208,
      0.847059,
      0.994474,
      0.722691,
      0.174381,
      0.85098,
      0.994553,
      0.728728,
      0.171622,
      0.854902,
      0.994561,
      0.734791,
      0.168938,
      0.858824,
      0.994495,
      0.74088,
      0.166335,
      0.862745,
      0.994355,
      0.746995,
      0.163821,
      0.866667,
      0.994141,
      0.753137,
      0.161404,
      0.870588,
      0.993851,
      0.759304,
      0.159092,
      0.87451,
      0.993482,
      0.765499,
      0.156891,
      0.878431,
      0.993033,
      0.77172,
      0.154808,
      0.882353,
      0.992505,
      0.777967,
      0.152855,
      0.886275,
      0.991897,
      0.784239,
      0.151042,
      0.890196,
      0.991209,
      0.790537,
      0.149377,
      0.894118,
      0.990439,
      0.796859,
      0.14787,
      0.898039,
      0.989587,
      0.803205,
      0.146529,
      0.901961,
      0.988648,
      0.809579,
      0.145357,
      0.905882,
      0.987621,
      0.815978,
      0.144363,
      0.909804,
      0.986509,
      0.822401,
      0.143557,
      0.913725,
      0.985314,
      0.828846,
      0.142945,
      0.917647,
      0.984031,
      0.835315,
      0.142528,
      0.921569,
      0.982653,
      0.841812,
      0.142303,
      0.92549,
      0.98119,
      0.848329,
      0.142279,
      0.929412,
      0.979644,
      0.854866,
      0.142453,
      0.933333,
      0.977995,
      0.861432,
      0.142808,
      0.937255,
      0.976265,
      0.868016,
      0.143351,
      0.941176,
      0.974443,
      0.874622,
      0.144061,
      0.945098,
      0.97253,
      0.88125,
      0.144923,
      0.94902,
      0.970533,
      0.887896,
      0.145919,
      0.952941,
      0.968443,
      0.894564,
      0.147014,
      0.956863,
      0.966271,
      0.901249,
      0.14818,
      0.960784,
      0.964021,
      0.90795,
      0.14937,
      0.964706,
      0.961681,
      0.914672,
      0.15052,
      0.968627,
      0.959276,
      0.921407,
      0.151566,
      0.972549,
      0.956808,
      0.928152,
      0.152409,
      0.976471,
      0.954287,
      0.934908,
      0.152921,
      0.980392,
      0.951726,
      0.941671,
      0.152925,
      0.984314,
      0.949151,
      0.948435,
      0.152178,
      0.988235,
      0.946602,
      0.95519,
      0.150328,
      0.992157,
      0.944152,
      0.961916,
      0.146861,
      0.996078,
      0.941896,
      0.96859,
      0.140956,
      1,
      0.940015,
      0.975158,
      0.131326,
    ],
  },
  {
    ColorSpace: 'Diverging',
    Name: 'Viridis (matplotlib)',
    NanColor: [1, 0, 0],
    Source: 'https://github.com/BIDS/colormap/blob/master/colormaps.py',
    License: 'CC0',
    Creator: 'Eric Firing',
    RGBPoints: [
      0,
      0.267004,
      0.004874,
      0.329415,
      0.003922,
      0.26851,
      0.009605,
      0.335427,
      0.007843,
      0.269944,
      0.014625,
      0.341379,
      0.011765,
      0.271305,
      0.019942,
      0.347269,
      0.015686,
      0.272594,
      0.025563,
      0.353093,
      0.019608,
      0.273809,
      0.031497,
      0.358853,
      0.023529,
      0.274952,
      0.037752,
      0.364543,
      0.027451,
      0.276022,
      0.044167,
      0.370164,
      0.031373,
      0.277018,
      0.050344,
      0.375715,
      0.035294,
      0.277941,
      0.056324,
      0.381191,
      0.039216,
      0.278791,
      0.062145,
      0.386592,
      0.043137,
      0.279566,
      0.067836,
      0.391917,
      0.047059,
      0.280267,
      0.073417,
      0.397163,
      0.05098,
      0.280894,
      0.078907,
      0.402329,
      0.054902,
      0.281446,
      0.08432,
      0.407414,
      0.058824,
      0.281924,
      0.089666,
      0.412415,
      0.062745,
      0.282327,
      0.094955,
      0.417331,
      0.066667,
      0.282656,
      0.100196,
      0.42216,
      0.070588,
      0.28291,
      0.105393,
      0.426902,
      0.07451,
      0.283091,
      0.110553,
      0.431554,
      0.078431,
      0.283197,
      0.11568,
      0.436115,
      0.082353,
      0.283229,
      0.120777,
      0.440584,
      0.086275,
      0.283187,
      0.125848,
      0.44496,
      0.090196,
      0.283072,
      0.130895,
      0.449241,
      0.094118,
      0.282884,
      0.13592,
      0.453427,
      0.098039,
      0.282623,
      0.140926,
      0.457517,
      0.101961,
      0.28229,
      0.145912,
      0.46151,
      0.105882,
      0.281887,
      0.150881,
      0.465405,
      0.109804,
      0.281412,
      0.155834,
      0.469201,
      0.113725,
      0.280868,
      0.160771,
      0.472899,
      0.117647,
      0.280255,
      0.165693,
      0.476498,
      0.121569,
      0.279574,
      0.170599,
      0.479997,
      0.12549,
      0.278826,
      0.17549,
      0.483397,
      0.129412,
      0.278012,
      0.180367,
      0.486697,
      0.133333,
      0.277134,
      0.185228,
      0.489898,
      0.137255,
      0.276194,
      0.190074,
      0.493001,
      0.141176,
      0.275191,
      0.194905,
      0.496005,
      0.145098,
      0.274128,
      0.199721,
      0.498911,
      0.14902,
      0.273006,
      0.20452,
      0.501721,
      0.152941,
      0.271828,
      0.209303,
      0.504434,
      0.156863,
      0.270595,
      0.214069,
      0.507052,
      0.160784,
      0.269308,
      0.218818,
      0.509577,
      0.164706,
      0.267968,
      0.223549,
      0.512008,
      0.168627,
      0.26658,
      0.228262,
      0.514349,
      0.172549,
      0.265145,
      0.232956,
      0.516599,
      0.176471,
      0.263663,
      0.237631,
      0.518762,
      0.180392,
      0.262138,
      0.242286,
      0.520837,
      0.184314,
      0.260571,
      0.246922,
      0.522828,
      0.188235,
      0.258965,
      0.251537,
      0.524736,
      0.192157,
      0.257322,
      0.25613,
      0.526563,
      0.196078,
      0.255645,
      0.260703,
      0.528312,
      0.2,
      0.253935,
      0.265254,
      0.529983,
      0.203922,
      0.252194,
      0.269783,
      0.531579,
      0.207843,
      0.250425,
      0.27429,
      0.533103,
      0.211765,
      0.248629,
      0.278775,
      0.534556,
      0.215686,
      0.246811,
      0.283237,
      0.535941,
      0.219608,
      0.244972,
      0.287675,
      0.53726,
      0.223529,
      0.243113,
      0.292092,
      0.538516,
      0.227451,
      0.241237,
      0.296485,
      0.539709,
      0.231373,
      0.239346,
      0.300855,
      0.540844,
      0.235294,
      0.237441,
      0.305202,
      0.541921,
      0.239216,
      0.235526,
      0.309527,
      0.542944,
      0.243137,
      0.233603,
      0.313828,
      0.543914,
      0.247059,
      0.231674,
      0.318106,
      0.544834,
      0.25098,
      0.229739,
      0.322361,
      0.545706,
      0.254902,
      0.227802,
      0.326594,
      0.546532,
      0.258824,
      0.225863,
      0.330805,
      0.547314,
      0.262745,
      0.223925,
      0.334994,
      0.548053,
      0.266667,
      0.221989,
      0.339161,
      0.548752,
      0.270588,
      0.220057,
      0.343307,
      0.549413,
      0.27451,
      0.21813,
      0.347432,
      0.550038,
      0.278431,
      0.21621,
      0.351535,
      0.550627,
      0.282353,
      0.214298,
      0.355619,
      0.551184,
      0.286275,
      0.212395,
      0.359683,
      0.55171,
      0.290196,
      0.210503,
      0.363727,
      0.552206,
      0.294118,
      0.208623,
      0.367752,
      0.552675,
      0.298039,
      0.206756,
      0.371758,
      0.553117,
      0.301961,
      0.204903,
      0.375746,
      0.553533,
      0.305882,
      0.203063,
      0.379716,
      0.553925,
      0.309804,
      0.201239,
      0.38367,
      0.554294,
      0.313725,
      0.19943,
      0.387607,
      0.554642,
      0.317647,
      0.197636,
      0.391528,
      0.554969,
      0.321569,
      0.19586,
      0.395433,
      0.555276,
      0.32549,
      0.1941,
      0.399323,
      0.555565,
      0.329412,
      0.192357,
      0.403199,
      0.555836,
      0.333333,
      0.190631,
      0.407061,
      0.556089,
      0.337255,
      0.188923,
      0.41091,
      0.556326,
      0.341176,
      0.187231,
      0.414746,
      0.556547,
      0.345098,
      0.185556,
      0.41857,
      0.556753,
      0.34902,
      0.183898,
      0.422383,
      0.556944,
      0.352941,
      0.182256,
      0.426184,
      0.55712,
      0.356863,
      0.180629,
      0.429975,
      0.557282,
      0.360784,
      0.179019,
      0.433756,
      0.55743,
      0.364706,
      0.177423,
      0.437527,
      0.557565,
      0.368627,
      0.175841,
      0.44129,
      0.557685,
      0.372549,
      0.174274,
      0.445044,
      0.557792,
      0.376471,
      0.172719,
      0.448791,
      0.557885,
      0.380392,
      0.171176,
      0.45253,
      0.557965,
      0.384314,
      0.169646,
      0.456262,
      0.55803,
      0.388235,
      0.168126,
      0.459988,
      0.558082,
      0.392157,
      0.166617,
      0.463708,
      0.558119,
      0.396078,
      0.165117,
      0.467423,
      0.558141,
      0.4,
      0.163625,
      0.471133,
      0.558148,
      0.403922,
      0.162142,
      0.474838,
      0.55814,
      0.407843,
      0.160665,
      0.47854,
      0.558115,
      0.411765,
      0.159194,
      0.482237,
      0.558073,
      0.415686,
      0.157729,
      0.485932,
      0.558013,
      0.419608,
      0.15627,
      0.489624,
      0.557936,
      0.423529,
      0.154815,
      0.493313,
      0.55784,
      0.427451,
      0.153364,
      0.497,
      0.557724,
      0.431373,
      0.151918,
      0.500685,
      0.557587,
      0.435294,
      0.150476,
      0.504369,
      0.55743,
      0.439216,
      0.149039,
      0.508051,
      0.55725,
      0.443137,
      0.147607,
      0.511733,
      0.557049,
      0.447059,
      0.14618,
      0.515413,
      0.556823,
      0.45098,
      0.144759,
      0.519093,
      0.556572,
      0.454902,
      0.143343,
      0.522773,
      0.556295,
      0.458824,
      0.141935,
      0.526453,
      0.555991,
      0.462745,
      0.140536,
      0.530132,
      0.555659,
      0.466667,
      0.139147,
      0.533812,
      0.555298,
      0.470588,
      0.13777,
      0.537492,
      0.554906,
      0.47451,
      0.136408,
      0.541173,
      0.554483,
      0.478431,
      0.135066,
      0.544853,
      0.554029,
      0.482353,
      0.133743,
      0.548535,
      0.553541,
      0.486275,
      0.132444,
      0.552216,
      0.553018,
      0.490196,
      0.131172,
      0.555899,
      0.552459,
      0.494118,
      0.129933,
      0.559582,
      0.551864,
      0.498039,
      0.128729,
      0.563265,
      0.551229,
      0.501961,
      0.127568,
      0.566949,
      0.550556,
      0.505882,
      0.126453,
      0.570633,
      0.549841,
      0.509804,
      0.125394,
      0.574318,
      0.549086,
      0.513725,
      0.124395,
      0.578002,
      0.548287,
      0.517647,
      0.123463,
      0.581687,
      0.547445,
      0.521569,
      0.122606,
      0.585371,
      0.546557,
      0.52549,
      0.121831,
      0.589055,
      0.545623,
      0.529412,
      0.121148,
      0.592739,
      0.544641,
      0.533333,
      0.120565,
      0.596422,
      0.543611,
      0.537255,
      0.120092,
      0.600104,
      0.54253,
      0.541176,
      0.119738,
      0.603785,
      0.5414,
      0.545098,
      0.119512,
      0.607464,
      0.540218,
      0.54902,
      0.119423,
      0.611141,
      0.538982,
      0.552941,
      0.119483,
      0.614817,
      0.537692,
      0.556863,
      0.119699,
      0.61849,
      0.536347,
      0.560784,
      0.120081,
      0.622161,
      0.534946,
      0.564706,
      0.120638,
      0.625828,
      0.533488,
      0.568627,
      0.12138,
      0.629492,
      0.531973,
      0.572549,
      0.122312,
      0.633153,
      0.530398,
      0.576471,
      0.123444,
      0.636809,
      0.528763,
      0.580392,
      0.12478,
      0.640461,
      0.527068,
      0.584314,
      0.126326,
      0.644107,
      0.525311,
      0.588235,
      0.128087,
      0.647749,
      0.523491,
      0.592157,
      0.130067,
      0.651384,
      0.521608,
      0.596078,
      0.132268,
      0.655014,
      0.519661,
      0.6,
      0.134692,
      0.658636,
      0.517649,
      0.603922,
      0.137339,
      0.662252,
      0.515571,
      0.607843,
      0.14021,
      0.665859,
      0.513427,
      0.611765,
      0.143303,
      0.669459,
      0.511215,
      0.615686,
      0.146616,
      0.67305,
      0.508936,
      0.619608,
      0.150148,
      0.676631,
      0.506589,
      0.623529,
      0.153894,
      0.680203,
      0.504172,
      0.627451,
      0.157851,
      0.683765,
      0.501686,
      0.631373,
      0.162016,
      0.687316,
      0.499129,
      0.635294,
      0.166383,
      0.690856,
      0.496502,
      0.639216,
      0.170948,
      0.694384,
      0.493803,
      0.643137,
      0.175707,
      0.6979,
      0.491033,
      0.647059,
      0.180653,
      0.701402,
      0.488189,
      0.65098,
      0.185783,
      0.704891,
      0.485273,
      0.654902,
      0.19109,
      0.708366,
      0.482284,
      0.658824,
      0.196571,
      0.711827,
      0.479221,
      0.662745,
      0.202219,
      0.715272,
      0.476084,
      0.666667,
      0.20803,
      0.718701,
      0.472873,
      0.670588,
      0.214,
      0.722114,
      0.469588,
      0.67451,
      0.220124,
      0.725509,
      0.466226,
      0.678431,
      0.226397,
      0.728888,
      0.462789,
      0.682353,
      0.232815,
      0.732247,
      0.459277,
      0.686275,
      0.239374,
      0.735588,
      0.455688,
      0.690196,
      0.24607,
      0.73891,
      0.452024,
      0.694118,
      0.252899,
      0.742211,
      0.448284,
      0.698039,
      0.259857,
      0.745492,
      0.444467,
      0.701961,
      0.266941,
      0.748751,
      0.440573,
      0.705882,
      0.274149,
      0.751988,
      0.436601,
      0.709804,
      0.281477,
      0.755203,
      0.432552,
      0.713725,
      0.288921,
      0.758394,
      0.428426,
      0.717647,
      0.296479,
      0.761561,
      0.424223,
      0.721569,
      0.304148,
      0.764704,
      0.419943,
      0.72549,
      0.311925,
      0.767822,
      0.415586,
      0.729412,
      0.319809,
      0.770914,
      0.411152,
      0.733333,
      0.327796,
      0.77398,
      0.40664,
      0.737255,
      0.335885,
      0.777018,
      0.402049,
      0.741176,
      0.344074,
      0.780029,
      0.397381,
      0.745098,
      0.35236,
      0.783011,
      0.392636,
      0.74902,
      0.360741,
      0.785964,
      0.387814,
      0.752941,
      0.369214,
      0.788888,
      0.382914,
      0.756863,
      0.377779,
      0.791781,
      0.377939,
      0.760784,
      0.386433,
      0.794644,
      0.372886,
      0.764706,
      0.395174,
      0.797475,
      0.367757,
      0.768627,
      0.404001,
      0.800275,
      0.362552,
      0.772549,
      0.412913,
      0.803041,
      0.357269,
      0.776471,
      0.421908,
      0.805774,
      0.35191,
      0.780392,
      0.430983,
      0.808473,
      0.346476,
      0.784314,
      0.440137,
      0.811138,
      0.340967,
      0.788235,
      0.449368,
      0.813768,
      0.335384,
      0.792157,
      0.458674,
      0.816363,
      0.329727,
      0.796078,
      0.468053,
      0.818921,
      0.323998,
      0.8,
      0.477504,
      0.821444,
      0.318195,
      0.803922,
      0.487026,
      0.823929,
      0.312321,
      0.807843,
      0.496615,
      0.826376,
      0.306377,
      0.811765,
      0.506271,
      0.828786,
      0.300362,
      0.815686,
      0.515992,
      0.831158,
      0.294279,
      0.819608,
      0.525776,
      0.833491,
      0.288127,
      0.823529,
      0.535621,
      0.835785,
      0.281908,
      0.827451,
      0.545524,
      0.838039,
      0.275626,
      0.831373,
      0.555484,
      0.840254,
      0.269281,
      0.835294,
      0.565498,
      0.84243,
      0.262877,
      0.839216,
      0.575563,
      0.844566,
      0.256415,
      0.843137,
      0.585678,
      0.846661,
      0.249897,
      0.847059,
      0.595839,
      0.848717,
      0.243329,
      0.85098,
      0.606045,
      0.850733,
      0.236712,
      0.854902,
      0.616293,
      0.852709,
      0.230052,
      0.858824,
      0.626579,
      0.854645,
      0.223353,
      0.862745,
      0.636902,
      0.856542,
      0.21662,
      0.866667,
      0.647257,
      0.8584,
      0.209861,
      0.870588,
      0.657642,
      0.860219,
      0.203082,
      0.87451,
      0.668054,
      0.861999,
      0.196293,
      0.878431,
      0.678489,
      0.863742,
      0.189503,
      0.882353,
      0.688944,
      0.865448,
      0.182725,
      0.886275,
      0.699415,
      0.867117,
      0.175971,
      0.890196,
      0.709898,
      0.868751,
      0.169257,
      0.894118,
      0.720391,
      0.87035,
      0.162603,
      0.898039,
      0.730889,
      0.871916,
      0.156029,
      0.901961,
      0.741388,
      0.873449,
      0.149561,
      0.905882,
      0.751884,
      0.874951,
      0.143228,
      0.909804,
      0.762373,
      0.876424,
      0.137064,
      0.913725,
      0.772852,
      0.877868,
      0.131109,
      0.917647,
      0.783315,
      0.879285,
      0.125405,
      0.921569,
      0.79376,
      0.880678,
      0.120005,
      0.92549,
      0.804182,
      0.882046,
      0.114965,
      0.929412,
      0.814576,
      0.883393,
      0.110347,
      0.933333,
      0.82494,
      0.88472,
      0.106217,
      0.937255,
      0.83527,
      0.886029,
      0.102646,
      0.941176,
      0.845561,
      0.887322,
      0.099702,
      0.945098,
      0.85581,
      0.888601,
      0.097452,
      0.94902,
      0.866013,
      0.889868,
      0.095953,
      0.952941,
      0.876168,
      0.891125,
      0.09525,
      0.956863,
      0.886271,
      0.892374,
      0.095374,
      0.960784,
      0.89632,
      0.893616,
      0.096335,
      0.964706,
      0.906311,
      0.894855,
      0.098125,
      0.968627,
      0.916242,
      0.896091,
      0.100717,
      0.972549,
      0.926106,
      0.89733,
      0.104071,
      0.976471,
      0.935904,
      0.89857,
      0.108131,
      0.980392,
      0.945636,
      0.899815,
      0.112838,
      0.984314,
      0.9553,
      0.901065,
      0.118128,
      0.988235,
      0.964894,
      0.902323,
      0.123941,
      0.992157,
      0.974417,
      0.90359,
      0.130215,
      0.996078,
      0.983868,
      0.904867,
      0.136897,
      1,
      0.993248,
      0.906157,
      0.143936,
    ],
  },
  {
    ShowIndexedColorActiveValues: 1,
    IndexedColors: [
      0.07,
      0.5,
      0.7,
      1,
      1,
      1,
      0.85,
      1,
      1,
      0.8,
      0.5,
      1,
      0.76,
      1,
      0,
      1,
      0.71,
      0.71,
      0.5,
      0.5,
      0.5,
      0.05,
      0.05,
      1,
      1,
      0.05,
      0.05,
      0.7,
      1,
      1,
      0.7,
      0.89,
      0.96,
      0.67,
      0.36,
      0.95,
      0.54,
      1,
      0,
      0.75,
      0.65,
      0.65,
      0.5,
      0.6,
      0.6,
      1,
      0.5,
      0,
      1,
      1,
      0.19,
      0.12,
      0.94,
      0.12,
      0.5,
      0.82,
      0.89,
      0.56,
      0.25,
      0.83,
      0.24,
      1,
      0,
      0.9,
      0.9,
      0.9,
      0.75,
      0.76,
      0.78,
      0.65,
      0.65,
      0.67,
      0.54,
      0.6,
      0.78,
      0.61,
      0.48,
      0.78,
      0.5,
      0.48,
      0.78,
      0.44,
      0.48,
      0.78,
      0.36,
      0.48,
      0.76,
      1,
      0.48,
      0.38,
      0.49,
      0.5,
      0.69,
      0.76,
      0.56,
      0.56,
      0.4,
      0.56,
      0.56,
      0.74,
      0.5,
      0.89,
      1,
      0.63,
      0,
      0.65,
      0.16,
      0.16,
      0.36,
      0.72,
      0.82,
      0.44,
      0.18,
      0.69,
      0,
      1,
      0,
      0.58,
      1,
      1,
      0.58,
      0.88,
      0.88,
      0.45,
      0.76,
      0.79,
      0.33,
      0.71,
      0.71,
      0.23,
      0.62,
      0.62,
      0.14,
      0.56,
      0.56,
      0.04,
      0.49,
      0.55,
      0,
      0.41,
      0.52,
      0.88,
      0.88,
      1,
      1,
      0.85,
      0.56,
      0.65,
      0.46,
      0.45,
      0.4,
      0.5,
      0.5,
      0.62,
      0.39,
      0.71,
      0.83,
      0.48,
      0,
      0.58,
      0,
      0.58,
      0.26,
      0.62,
      0.69,
      0.34,
      0.09,
      0.56,
      0,
      0.79,
      0,
      0.44,
      0.83,
      1,
      1,
      1,
      0.78,
      0.85,
      1,
      0.78,
      0.78,
      1,
      0.78,
      0.64,
      1,
      0.78,
      0.56,
      1,
      0.78,
      0.38,
      1,
      0.78,
      0.27,
      1,
      0.78,
      0.19,
      1,
      0.78,
      0.12,
      1,
      0.78,
      0,
      1,
      0.61,
      0,
      0.9,
      0.46,
      0,
      0.83,
      0.32,
      0,
      0.75,
      0.22,
      0,
      0.67,
      0.14,
      0.3,
      0.76,
      1,
      0.3,
      0.65,
      1,
      0.13,
      0.58,
      0.84,
      0.15,
      0.49,
      0.67,
      0.15,
      0.4,
      0.59,
      0.09,
      0.33,
      0.53,
      0.96,
      0.93,
      0.82,
      0.8,
      0.82,
      0.12,
      0.71,
      0.71,
      0.76,
      0.65,
      0.33,
      0.3,
      0.34,
      0.35,
      0.38,
      0.62,
      0.31,
      0.71,
      0.67,
      0.36,
      0,
      0.46,
      0.31,
      0.27,
      0.26,
      0.51,
      0.59,
      0.26,
      0,
      0.4,
      0,
      0.49,
      0,
      0.44,
      0.67,
      0.98,
      0,
      0.73,
      1,
      0,
      0.63,
      1,
      0,
      0.56,
      1,
      0,
      0.5,
      1,
      0,
      0.42,
      1,
      0.33,
      0.36,
      0.95,
      0.47,
      0.36,
      0.89,
      0.54,
      0.31,
      0.89,
      0.63,
      0.21,
      0.83,
      0.7,
      0.12,
      0.83,
      0.7,
      0.12,
      0.73,
      0.7,
      0.05,
      0.65,
      0.74,
      0.05,
      0.53,
      0.78,
      0,
      0.4,
      0.8,
      0,
      0.35,
      0.82,
      0,
      0.31,
      0.85,
      0,
      0.27,
      0.88,
      0,
      0.22,
      0.9,
      0,
      0.18,
      0.91,
      0,
      0.15,
      0.92,
      0,
      0.14,
      0.93,
      0,
      0.13,
      0.94,
      0,
      0.12,
      0.95,
      0,
      0.11,
      0.96,
      0,
      0.1,
      0.97,
      0,
      0.09,
      0.98,
      0,
      0.08,
      0.99,
      0,
      0.07,
      1,
      0,
      0.06,
    ],
    Annotations: [
      0,
      'Xx',
      1,
      'H',
      2,
      'He',
      3,
      'Li',
      4,
      'Be',
      5,
      'B',
      6,
      'C',
      7,
      'N',
      8,
      'O',
      9,
      'F',
      10,
      'Ne',
      11,
      'Na',
      12,
      'Mg',
      13,
      'Al',
      14,
      'Si',
      15,
      'P',
      16,
      'S',
      17,
      'Cl',
      18,
      'Ar',
      19,
      'K',
      20,
      'Ca',
      21,
      'Sc',
      22,
      'Ti',
      23,
      'V',
      24,
      'Cr',
      25,
      'Mn',
      26,
      'Fe',
      27,
      'Co',
      28,
      'Ni',
      29,
      'Cu',
      30,
      'Zn',
      31,
      'Ga',
      32,
      'Ge',
      33,
      'As',
      34,
      'Se',
      35,
      'Br',
      36,
      'Kr',
      37,
      'Rb',
      38,
      'Sr',
      39,
      'Y',
      40,
      'Zr',
      41,
      'Nb',
      42,
      'Mo',
      43,
      'Tc',
      44,
      'Ru',
      45,
      'Rh',
      46,
      'Pd',
      47,
      'Ag',
      48,
      'Cd',
      49,
      'In',
      50,
      'Sn',
      51,
      'Sb',
      52,
      'Te',
      53,
      'I',
      54,
      'Xe',
      55,
      'Cs',
      56,
      'Ba',
      57,
      'La',
      58,
      'Ce',
      59,
      'Pr',
      60,
      'Nd',
      61,
      'Pm',
      62,
      'Sm',
      63,
      'Eu',
      64,
      'Gd',
      65,
      'Tb',
      66,
      'Dy',
      67,
      'Ho',
      68,
      'Er',
      69,
      'Tm',
      70,
      'Yb',
      71,
      'Lu',
      72,
      'Hf',
      73,
      'Ta',
      74,
      'W',
      75,
      'Re',
      76,
      'Os',
      77,
      'Ir',
      78,
      'Pt',
      79,
      'Au',
      80,
      'Hg',
      81,
      'Tl',
      82,
      'Pb',
      83,
      'Bi',
      84,
      'Po',
      85,
      'At',
      86,
      'Rn',
      87,
      'Fr',
      88,
      'Ra',
      89,
      'Ac',
      90,
      'Th',
      91,
      'Pa',
      92,
      'U',
      93,
      'Np',
      94,
      'Pu',
      95,
      'Am',
      96,
      'Cm',
      97,
      'Bk',
      98,
      'Cf',
      99,
      'Es',
      100,
      'Fm',
      101,
      'Md',
      102,
      'No',
      103,
      'Lr',
      104,
      'Rf',
      105,
      'Db',
      106,
      'Sg',
      107,
      'Bh',
      108,
      'Hs',
      109,
      'Mt',
      110,
      'Ds',
      111,
      'Rg',
      112,
      'Cn',
      113,
      'Uut',
      114,
      'Uuq',
      115,
      'Uup',
      116,
      'Uuh',
      117,
      'Uus',
      118,
      'Uuo',
    ],
    Name: 'BlueObeliskElements',
  },
]

var presetMap = Object.create(null)
vtkColorMaps$1
  .filter(function(p) {
    return p.RGBPoints
  })
  .filter(function(p) {
    return p.ColorSpace !== 'CIELAB'
  })
  .forEach(function(p) {
    presetMap[p.Name] = p
  }) // ----------------------------------------------------------------------------

var rgbPresetNames = Object.keys(presetMap)
rgbPresetNames.sort() // ----------------------------------------------------------------------------

function getPresetByName(name) {
  return presetMap[name]
} // ----------------------------------------------------------------------------

function addPreset(preset) {
  if (!preset.RGBPoints || preset.ColorSpace === 'CIELAB') {
    return
  }

  if (!presetMap[preset.Name]) {
    rgbPresetNames.push(preset.Name)
    rgbPresetNames.sort()
  }

  presetMap[preset.Name] = preset
} // ----------------------------------------------------------------------------

function removePresetByName(name) {
  var index = rgbPresetNames.indexOf(name)

  if (index > -1) {
    rgbPresetNames.splice(index, 1)
  }

  delete presetMap[name]
} // ----------------------------------------------------------------------------

var vtkColorMaps = {
  addPreset: addPreset,
  removePresetByName: removePresetByName,
  getPresetByName: getPresetByName,
  rgbPresetNames: rgbPresetNames,
}

var alea$1 = { exports: {} }

;(function(module) {
  // A port of an algorithm by Johannes Baagøe <baagoe@baagoe.com>, 2010
  // http://baagoe.com/en/RandomMusings/javascript/
  // https://github.com/nquinlan/better-random-numbers-for-javascript-mirror
  // Original work is under MIT license -

  // Copyright (C) 2010 by Johannes Baagøe <baagoe@baagoe.org>
  //
  // Permission is hereby granted, free of charge, to any person obtaining a copy
  // of this software and associated documentation files (the "Software"), to deal
  // in the Software without restriction, including without limitation the rights
  // to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
  // copies of the Software, and to permit persons to whom the Software is
  // furnished to do so, subject to the following conditions:
  //
  // The above copyright notice and this permission notice shall be included in
  // all copies or substantial portions of the Software.
  //
  // THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
  // IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
  // FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
  // AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
  // LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
  // OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
  // THE SOFTWARE.

  ;(function(global, module, define) {
    function Alea(seed) {
      var me = this,
        mash = Mash()

      me.next = function() {
        var t = 2091639 * me.s0 + me.c * 2.3283064365386963e-10 // 2^-32
        me.s0 = me.s1
        me.s1 = me.s2
        return (me.s2 = t - (me.c = t | 0))
      }

      // Apply the seeding algorithm from Baagoe.
      me.c = 1
      me.s0 = mash(' ')
      me.s1 = mash(' ')
      me.s2 = mash(' ')
      me.s0 -= mash(seed)
      if (me.s0 < 0) {
        me.s0 += 1
      }
      me.s1 -= mash(seed)
      if (me.s1 < 0) {
        me.s1 += 1
      }
      me.s2 -= mash(seed)
      if (me.s2 < 0) {
        me.s2 += 1
      }
      mash = null
    }

    function copy(f, t) {
      t.c = f.c
      t.s0 = f.s0
      t.s1 = f.s1
      t.s2 = f.s2
      return t
    }

    function impl(seed, opts) {
      var xg = new Alea(seed),
        state = opts && opts.state,
        prng = xg.next
      prng.int32 = function() {
        return (xg.next() * 0x100000000) | 0
      }
      prng.double = function() {
        return prng() + ((prng() * 0x200000) | 0) * 1.1102230246251565e-16 // 2^-53
      }
      prng.quick = prng
      if (state) {
        if (typeof state == 'object') copy(state, xg)
        prng.state = function() {
          return copy(xg, {})
        }
      }
      return prng
    }

    function Mash() {
      var n = 0xefc8249d

      var mash = function(data) {
        data = String(data)
        for (var i = 0; i < data.length; i++) {
          n += data.charCodeAt(i)
          var h = 0.02519603282416938 * n
          n = h >>> 0
          h -= n
          h *= n
          n = h >>> 0
          h -= n
          n += h * 0x100000000 // 2^32
        }
        return (n >>> 0) * 2.3283064365386963e-10 // 2^-32
      }

      return mash
    }

    if (module && module.exports) {
      module.exports = impl
    } else if (define && define.amd) {
      define(function() {
        return impl
      })
    } else {
      this.alea = impl
    }
  })(
    commonjsGlobal,
    module, // present in node.js
    typeof undefined == 'function' // present with an AMD loader
  )
})(alea$1)

var xor128$1 = { exports: {} }

;(function(module) {
  // A Javascript implementaion of the "xor128" prng algorithm by
  // George Marsaglia.  See http://www.jstatsoft.org/v08/i14/paper

  ;(function(global, module, define) {
    function XorGen(seed) {
      var me = this,
        strseed = ''

      me.x = 0
      me.y = 0
      me.z = 0
      me.w = 0

      // Set up generator function.
      me.next = function() {
        var t = me.x ^ (me.x << 11)
        me.x = me.y
        me.y = me.z
        me.z = me.w
        return (me.w ^= (me.w >>> 19) ^ t ^ (t >>> 8))
      }

      if (seed === (seed | 0)) {
        // Integer seed.
        me.x = seed
      } else {
        // String seed.
        strseed += seed
      }

      // Mix in string seed, then discard an initial batch of 64 values.
      for (var k = 0; k < strseed.length + 64; k++) {
        me.x ^= strseed.charCodeAt(k) | 0
        me.next()
      }
    }

    function copy(f, t) {
      t.x = f.x
      t.y = f.y
      t.z = f.z
      t.w = f.w
      return t
    }

    function impl(seed, opts) {
      var xg = new XorGen(seed),
        state = opts && opts.state,
        prng = function() {
          return (xg.next() >>> 0) / 0x100000000
        }
      prng.double = function() {
        do {
          var top = xg.next() >>> 11,
            bot = (xg.next() >>> 0) / 0x100000000,
            result = (top + bot) / (1 << 21)
        } while (result === 0)
        return result
      }
      prng.int32 = xg.next
      prng.quick = prng
      if (state) {
        if (typeof state == 'object') copy(state, xg)
        prng.state = function() {
          return copy(xg, {})
        }
      }
      return prng
    }

    if (module && module.exports) {
      module.exports = impl
    } else if (define && define.amd) {
      define(function() {
        return impl
      })
    } else {
      this.xor128 = impl
    }
  })(
    commonjsGlobal,
    module, // present in node.js
    typeof undefined == 'function' // present with an AMD loader
  )
})(xor128$1)

var xorwow$1 = { exports: {} }

;(function(module) {
  // A Javascript implementaion of the "xorwow" prng algorithm by
  // George Marsaglia.  See http://www.jstatsoft.org/v08/i14/paper

  ;(function(global, module, define) {
    function XorGen(seed) {
      var me = this,
        strseed = ''

      // Set up generator function.
      me.next = function() {
        var t = me.x ^ (me.x >>> 2)
        me.x = me.y
        me.y = me.z
        me.z = me.w
        me.w = me.v
        return (
          ((me.d = (me.d + 362437) | 0) +
            (me.v = me.v ^ (me.v << 4) ^ (t ^ (t << 1)))) |
          0
        )
      }

      me.x = 0
      me.y = 0
      me.z = 0
      me.w = 0
      me.v = 0

      if (seed === (seed | 0)) {
        // Integer seed.
        me.x = seed
      } else {
        // String seed.
        strseed += seed
      }

      // Mix in string seed, then discard an initial batch of 64 values.
      for (var k = 0; k < strseed.length + 64; k++) {
        me.x ^= strseed.charCodeAt(k) | 0
        if (k == strseed.length) {
          me.d = (me.x << 10) ^ (me.x >>> 4)
        }
        me.next()
      }
    }

    function copy(f, t) {
      t.x = f.x
      t.y = f.y
      t.z = f.z
      t.w = f.w
      t.v = f.v
      t.d = f.d
      return t
    }

    function impl(seed, opts) {
      var xg = new XorGen(seed),
        state = opts && opts.state,
        prng = function() {
          return (xg.next() >>> 0) / 0x100000000
        }
      prng.double = function() {
        do {
          var top = xg.next() >>> 11,
            bot = (xg.next() >>> 0) / 0x100000000,
            result = (top + bot) / (1 << 21)
        } while (result === 0)
        return result
      }
      prng.int32 = xg.next
      prng.quick = prng
      if (state) {
        if (typeof state == 'object') copy(state, xg)
        prng.state = function() {
          return copy(xg, {})
        }
      }
      return prng
    }

    if (module && module.exports) {
      module.exports = impl
    } else if (define && define.amd) {
      define(function() {
        return impl
      })
    } else {
      this.xorwow = impl
    }
  })(
    commonjsGlobal,
    module, // present in node.js
    typeof undefined == 'function' // present with an AMD loader
  )
})(xorwow$1)

var xorshift7$1 = { exports: {} }

;(function(module) {
  // A Javascript implementaion of the "xorshift7" algorithm by
  // François Panneton and Pierre L'ecuyer:
  // "On the Xorgshift Random Number Generators"
  // http://saluc.engr.uconn.edu/refs/crypto/rng/panneton05onthexorshift.pdf

  ;(function(global, module, define) {
    function XorGen(seed) {
      var me = this

      // Set up generator function.
      me.next = function() {
        // Update xor generator.
        var X = me.x,
          i = me.i,
          t,
          v
        t = X[i]
        t ^= t >>> 7
        v = t ^ (t << 24)
        t = X[(i + 1) & 7]
        v ^= t ^ (t >>> 10)
        t = X[(i + 3) & 7]
        v ^= t ^ (t >>> 3)
        t = X[(i + 4) & 7]
        v ^= t ^ (t << 7)
        t = X[(i + 7) & 7]
        t = t ^ (t << 13)
        v ^= t ^ (t << 9)
        X[i] = v
        me.i = (i + 1) & 7
        return v
      }

      function init(me, seed) {
        var j,
          X = []

        if (seed === (seed | 0)) {
          // Seed state array using a 32-bit integer.
          X[0] = seed
        } else {
          // Seed state using a string.
          seed = '' + seed
          for (j = 0; j < seed.length; ++j) {
            X[j & 7] =
              (X[j & 7] << 15) ^ ((seed.charCodeAt(j) + X[(j + 1) & 7]) << 13)
          }
        }
        // Enforce an array length of 8, not all zeroes.
        while (X.length < 8) X.push(0)
        for (j = 0; j < 8 && X[j] === 0; ++j);
        if (j == 8) X[7] = -1
        else X[j]

        me.x = X
        me.i = 0

        // Discard an initial 256 values.
        for (j = 256; j > 0; --j) {
          me.next()
        }
      }

      init(me, seed)
    }

    function copy(f, t) {
      t.x = f.x.slice()
      t.i = f.i
      return t
    }

    function impl(seed, opts) {
      if (seed == null) seed = +new Date()
      var xg = new XorGen(seed),
        state = opts && opts.state,
        prng = function() {
          return (xg.next() >>> 0) / 0x100000000
        }
      prng.double = function() {
        do {
          var top = xg.next() >>> 11,
            bot = (xg.next() >>> 0) / 0x100000000,
            result = (top + bot) / (1 << 21)
        } while (result === 0)
        return result
      }
      prng.int32 = xg.next
      prng.quick = prng
      if (state) {
        if (state.x) copy(state, xg)
        prng.state = function() {
          return copy(xg, {})
        }
      }
      return prng
    }

    if (module && module.exports) {
      module.exports = impl
    } else if (define && define.amd) {
      define(function() {
        return impl
      })
    } else {
      this.xorshift7 = impl
    }
  })(
    commonjsGlobal,
    module, // present in node.js
    typeof undefined == 'function' // present with an AMD loader
  )
})(xorshift7$1)

var xor4096$1 = { exports: {} }

;(function(module) {
  // A Javascript implementaion of Richard Brent's Xorgens xor4096 algorithm.
  //
  // This fast non-cryptographic random number generator is designed for
  // use in Monte-Carlo algorithms. It combines a long-period xorshift
  // generator with a Weyl generator, and it passes all common batteries
  // of stasticial tests for randomness while consuming only a few nanoseconds
  // for each prng generated.  For background on the generator, see Brent's
  // paper: "Some long-period random number generators using shifts and xors."
  // http://arxiv.org/pdf/1004.3115v1.pdf
  //
  // Usage:
  //
  // var xor4096 = require('xor4096');
  // random = xor4096(1);                        // Seed with int32 or string.
  // assert.equal(random(), 0.1520436450538547); // (0, 1) range, 53 bits.
  // assert.equal(random.int32(), 1806534897);   // signed int32, 32 bits.
  //
  // For nonzero numeric keys, this impelementation provides a sequence
  // identical to that by Brent's xorgens 3 implementaion in C.  This
  // implementation also provides for initalizing the generator with
  // string seeds, or for saving and restoring the state of the generator.
  //
  // On Chrome, this prng benchmarks about 2.1 times slower than
  // Javascript's built-in Math.random().

  ;(function(global, module, define) {
    function XorGen(seed) {
      var me = this

      // Set up generator function.
      me.next = function() {
        var w = me.w,
          X = me.X,
          i = me.i,
          t,
          v
        // Update Weyl generator.
        me.w = w = (w + 0x61c88647) | 0
        // Update xor generator.
        v = X[(i + 34) & 127]
        t = X[(i = (i + 1) & 127)]
        v ^= v << 13
        t ^= t << 17
        v ^= v >>> 15
        t ^= t >>> 12
        // Update Xor generator array state.
        v = X[i] = v ^ t
        me.i = i
        // Result is the combination.
        return (v + (w ^ (w >>> 16))) | 0
      }

      function init(me, seed) {
        var t,
          v,
          i,
          j,
          w,
          X = [],
          limit = 128
        if (seed === (seed | 0)) {
          // Numeric seeds initialize v, which is used to generates X.
          v = seed
          seed = null
        } else {
          // String seeds are mixed into v and X one character at a time.
          seed = seed + '\0'
          v = 0
          limit = Math.max(limit, seed.length)
        }
        // Initialize circular array and weyl value.
        for (i = 0, j = -32; j < limit; ++j) {
          // Put the unicode characters into the array, and shuffle them.
          if (seed) v ^= seed.charCodeAt((j + 32) % seed.length)
          // After 32 shuffles, take v as the starting w value.
          if (j === 0) w = v
          v ^= v << 10
          v ^= v >>> 15
          v ^= v << 4
          v ^= v >>> 13
          if (j >= 0) {
            w = (w + 0x61c88647) | 0 // Weyl.
            t = X[j & 127] ^= v + w // Combine xor and weyl to init array.
            i = 0 == t ? i + 1 : 0 // Count zeroes.
          }
        }
        // We have detected all zeroes; make the key nonzero.
        if (i >= 128) {
          X[((seed && seed.length) || 0) & 127] = -1
        }
        // Run the generator 512 times to further mix the state before using it.
        // Factoring this as a function slows the main generator, so it is just
        // unrolled here.  The weyl generator is not advanced while warming up.
        i = 127
        for (j = 4 * 128; j > 0; --j) {
          v = X[(i + 34) & 127]
          t = X[(i = (i + 1) & 127)]
          v ^= v << 13
          t ^= t << 17
          v ^= v >>> 15
          t ^= t >>> 12
          X[i] = v ^ t
        }
        // Storing state as object members is faster than using closure variables.
        me.w = w
        me.X = X
        me.i = i
      }

      init(me, seed)
    }

    function copy(f, t) {
      t.i = f.i
      t.w = f.w
      t.X = f.X.slice()
      return t
    }
    function impl(seed, opts) {
      if (seed == null) seed = +new Date()
      var xg = new XorGen(seed),
        state = opts && opts.state,
        prng = function() {
          return (xg.next() >>> 0) / 0x100000000
        }
      prng.double = function() {
        do {
          var top = xg.next() >>> 11,
            bot = (xg.next() >>> 0) / 0x100000000,
            result = (top + bot) / (1 << 21)
        } while (result === 0)
        return result
      }
      prng.int32 = xg.next
      prng.quick = prng
      if (state) {
        if (state.X) copy(state, xg)
        prng.state = function() {
          return copy(xg, {})
        }
      }
      return prng
    }

    if (module && module.exports) {
      module.exports = impl
    } else if (define && define.amd) {
      define(function() {
        return impl
      })
    } else {
      this.xor4096 = impl
    }
  })(
    commonjsGlobal, // window object or global
    module, // present in node.js
    typeof undefined == 'function' // present with an AMD loader
  )
})(xor4096$1)

var tychei$1 = { exports: {} }

;(function(module) {
  // A Javascript implementaion of the "Tyche-i" prng algorithm by
  // Samuel Neves and Filipe Araujo.
  // See https://eden.dei.uc.pt/~sneves/pubs/2011-snfa2.pdf

  ;(function(global, module, define) {
    function XorGen(seed) {
      var me = this,
        strseed = ''

      // Set up generator function.
      me.next = function() {
        var b = me.b,
          c = me.c,
          d = me.d,
          a = me.a
        b = (b << 25) ^ (b >>> 7) ^ c
        c = (c - d) | 0
        d = (d << 24) ^ (d >>> 8) ^ a
        a = (a - b) | 0
        me.b = b = (b << 20) ^ (b >>> 12) ^ c
        me.c = c = (c - d) | 0
        me.d = (d << 16) ^ (c >>> 16) ^ a
        return (me.a = (a - b) | 0)
      }

      /* The following is non-inverted tyche, which has better internal
   * bit diffusion, but which is about 25% slower than tyche-i in JS.
  me.next = function() {
    var a = me.a, b = me.b, c = me.c, d = me.d;
    a = (me.a + me.b | 0) >>> 0;
    d = me.d ^ a; d = d << 16 ^ d >>> 16;
    c = me.c + d | 0;
    b = me.b ^ c; b = b << 12 ^ d >>> 20;
    me.a = a = a + b | 0;
    d = d ^ a; me.d = d = d << 8 ^ d >>> 24;
    me.c = c = c + d | 0;
    b = b ^ c;
    return me.b = (b << 7 ^ b >>> 25);
  }
  */

      me.a = 0
      me.b = 0
      me.c = 2654435769 | 0
      me.d = 1367130551

      if (seed === Math.floor(seed)) {
        // Integer seed.
        me.a = (seed / 0x100000000) | 0
        me.b = seed | 0
      } else {
        // String seed.
        strseed += seed
      }

      // Mix in string seed, then discard an initial batch of 64 values.
      for (var k = 0; k < strseed.length + 20; k++) {
        me.b ^= strseed.charCodeAt(k) | 0
        me.next()
      }
    }

    function copy(f, t) {
      t.a = f.a
      t.b = f.b
      t.c = f.c
      t.d = f.d
      return t
    }
    function impl(seed, opts) {
      var xg = new XorGen(seed),
        state = opts && opts.state,
        prng = function() {
          return (xg.next() >>> 0) / 0x100000000
        }
      prng.double = function() {
        do {
          var top = xg.next() >>> 11,
            bot = (xg.next() >>> 0) / 0x100000000,
            result = (top + bot) / (1 << 21)
        } while (result === 0)
        return result
      }
      prng.int32 = xg.next
      prng.quick = prng
      if (state) {
        if (typeof state == 'object') copy(state, xg)
        prng.state = function() {
          return copy(xg, {})
        }
      }
      return prng
    }

    if (module && module.exports) {
      module.exports = impl
    } else if (define && define.amd) {
      define(function() {
        return impl
      })
    } else {
      this.tychei = impl
    }
  })(
    commonjsGlobal,
    module, // present in node.js
    typeof undefined == 'function' // present with an AMD loader
  )
})(tychei$1)

var seedrandom = { exports: {} }

/*
Copyright 2019 David Bau.

Permission is hereby granted, free of charge, to any person obtaining
a copy of this software and associated documentation files (the
"Software"), to deal in the Software without restriction, including
without limitation the rights to use, copy, modify, merge, publish,
distribute, sublicense, and/or sell copies of the Software, and to
permit persons to whom the Software is furnished to do so, subject to
the following conditions:

The above copyright notice and this permission notice shall be
included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT.
IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY
CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT,
TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE
SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.

*/

;(function(module) {
  ;(function(global, pool, math) {
    //
    // The following constants are related to IEEE 754 limits.
    //

    var width = 256, // each RC4 output is 0 <= x < 256
      chunks = 6, // at least six RC4 outputs for each double
      digits = 52, // there are 52 significant digits in a double
      rngname = 'random', // rngname: name for Math.random and Math.seedrandom
      startdenom = math.pow(width, chunks),
      significance = math.pow(2, digits),
      overflow = significance * 2,
      mask = width - 1,
      nodecrypto // node.js crypto module, initialized at the bottom.

    //
    // seedrandom()
    // This is the seedrandom function described above.
    //
    function seedrandom(seed, options, callback) {
      var key = []
      options = options == true ? { entropy: true } : options || {}

      // Flatten the seed string or build one from local entropy if needed.
      var shortseed = mixkey(
        flatten(
          options.entropy
            ? [seed, tostring(pool)]
            : seed == null
            ? autoseed()
            : seed,
          3
        ),
        key
      )

      // Use the seed to initialize an ARC4 generator.
      var arc4 = new ARC4(key)

      // This function returns a random double in [0, 1) that contains
      // randomness in every bit of the mantissa of the IEEE 754 value.
      var prng = function() {
        var n = arc4.g(chunks), // Start with a numerator n < 2 ^ 48
          d = startdenom, //   and denominator d = 2 ^ 48.
          x = 0 //   and no 'extra last byte'.
        while (n < significance) {
          // Fill up all significant digits by
          n = (n + x) * width //   shifting numerator and
          d *= width //   denominator and generating a
          x = arc4.g(1) //   new least-significant-byte.
        }
        while (n >= overflow) {
          // To avoid rounding up, before adding
          n /= 2 //   last byte, shift everything
          d /= 2 //   right using integer math until
          x >>>= 1 //   we have exactly the desired bits.
        }
        return (n + x) / d // Form the number within [0, 1).
      }

      prng.int32 = function() {
        return arc4.g(4) | 0
      }
      prng.quick = function() {
        return arc4.g(4) / 0x100000000
      }
      prng.double = prng

      // Mix the randomness into accumulated entropy.
      mixkey(tostring(arc4.S), pool)

      // Calling convention: what to return as a function of prng, seed, is_math.
      return (
        options.pass ||
        callback ||
        function(prng, seed, is_math_call, state) {
          if (state) {
            // Load the arc4 state from the given state if it has an S array.
            if (state.S) {
              copy(state, arc4)
            }
            // Only provide the .state method if requested via options.state.
            prng.state = function() {
              return copy(arc4, {})
            }
          }

          // If called as a method of Math (Math.seedrandom()), mutate
          // Math.random because that is how seedrandom.js has worked since v1.0.
          if (is_math_call) {
            math[rngname] = prng
            return seed
          }

          // Otherwise, it is a newer calling convention, so return the
          // prng directly.
          else return prng
        }
      )(
        prng,
        shortseed,
        'global' in options ? options.global : this == math,
        options.state
      )
    }

    //
    // ARC4
    //
    // An ARC4 implementation.  The constructor takes a key in the form of
    // an array of at most (width) integers that should be 0 <= x < (width).
    //
    // The g(count) method returns a pseudorandom integer that concatenates
    // the next (count) outputs from ARC4.  Its return value is a number x
    // that is in the range 0 <= x < (width ^ count).
    //
    function ARC4(key) {
      var t,
        keylen = key.length,
        me = this,
        i = 0,
        j = (me.i = me.j = 0),
        s = (me.S = [])

      // The empty key [] is treated as [0].
      if (!keylen) {
        key = [keylen++]
      }

      // Set up S using the standard key scheduling algorithm.
      while (i < width) {
        s[i] = i++
      }
      for (i = 0; i < width; i++) {
        s[i] = s[(j = mask & (j + key[i % keylen] + (t = s[i])))]
        s[j] = t
      }

      // The "g" method returns the next (count) outputs as one number.
      ;(me.g = function(count) {
        // Using instance members instead of closure state nearly doubles speed.
        var t,
          r = 0,
          i = me.i,
          j = me.j,
          s = me.S
        while (count--) {
          t = s[(i = mask & (i + 1))]
          r =
            r * width +
            s[mask & ((s[i] = s[(j = mask & (j + t))]) + (s[j] = t))]
        }
        me.i = i
        me.j = j
        return r
        // For robust unpredictability, the function call below automatically
        // discards an initial batch of values.  This is called RC4-drop[256].
        // See http://google.com/search?q=rsa+fluhrer+response&btnI
      })(width)
    }

    //
    // copy()
    // Copies internal state of ARC4 to or from a plain object.
    //
    function copy(f, t) {
      t.i = f.i
      t.j = f.j
      t.S = f.S.slice()
      return t
    }
    //
    // flatten()
    // Converts an object tree to nested arrays of strings.
    //
    function flatten(obj, depth) {
      var result = [],
        typ = typeof obj,
        prop
      if (depth && typ == 'object') {
        for (prop in obj) {
          try {
            result.push(flatten(obj[prop], depth - 1))
          } catch (e) {}
        }
      }
      return result.length ? result : typ == 'string' ? obj : obj + '\0'
    }

    //
    // mixkey()
    // Mixes a string seed into a key that is an array of integers, and
    // returns a shortened string seed that is equivalent to the result key.
    //
    function mixkey(seed, key) {
      var stringseed = seed + '',
        smear,
        j = 0
      while (j < stringseed.length) {
        key[mask & j] =
          mask & ((smear ^= key[mask & j] * 19) + stringseed.charCodeAt(j++))
      }
      return tostring(key)
    }

    //
    // autoseed()
    // Returns an object for autoseeding, using window.crypto and Node crypto
    // module if available.
    //
    function autoseed() {
      try {
        var out
        if (nodecrypto && (out = nodecrypto.randomBytes)) {
          // The use of 'out' to remember randomBytes makes tight minified code.
          out = out(width)
        } else {
          out = new Uint8Array(width)
          ;(global.crypto || global.msCrypto).getRandomValues(out)
        }
        return tostring(out)
      } catch (e) {
        var browser = global.navigator,
          plugins = browser && browser.plugins
        return [+new Date(), global, plugins, global.screen, tostring(pool)]
      }
    }

    //
    // tostring()
    // Converts an array of charcodes to a string
    //
    function tostring(a) {
      return String.fromCharCode.apply(0, a)
    }

    //
    // When seedrandom.js is loaded, we immediately mix a few bits
    // from the built-in RNG into the entropy pool.  Because we do
    // not want to interfere with deterministic PRNG state later,
    // seedrandom will not call math.random on its own again after
    // initialization.
    //
    mixkey(math.random(), pool)

    //
    // Nodejs and AMD support: export the implementation as a module using
    // either convention.
    //
    if (module.exports) {
      module.exports = seedrandom
      // When in node.js, try using crypto package for autoseeding.
      try {
        nodecrypto = require('crypto')
      } catch (ex) {}
    } else {
      // When included as a plain script, set up Math.seedrandom global.
      math['seed' + rngname] = seedrandom
    }

    // End anonymous scope, and pass initial values.
  })(
    // global: `self` in browsers (including strict mode and web workers),
    // otherwise `this` in Node and other environments
    typeof self !== 'undefined' ? self : commonjsGlobal,
    [], // pool: entropy pool starts empty
    Math // math: package containing random, pow, and seedrandom
  )
})(seedrandom)

// A library of seedable RNGs implemented in Javascript.
//
// Usage:
//
// var seedrandom = require('seedrandom');
// var random = seedrandom(1); // or any seed.
// var x = random();       // 0 <= x < 1.  Every bit is random.
// var x = random.quick(); // 0 <= x < 1.  32 bits of randomness.

// alea, a 53-bit multiply-with-carry generator by Johannes Baagøe.
// Period: ~2^116
// Reported to pass all BigCrush tests.
var alea = alea$1.exports

// xor128, a pure xor-shift generator by George Marsaglia.
// Period: 2^128-1.
// Reported to fail: MatrixRank and LinearComp.
var xor128 = xor128$1.exports

// xorwow, George Marsaglia's 160-bit xor-shift combined plus weyl.
// Period: 2^192-2^32
// Reported to fail: CollisionOver, SimpPoker, and LinearComp.
var xorwow = xorwow$1.exports

// xorshift7, by François Panneton and Pierre L'ecuyer, takes
// a different approach: it adds robustness by allowing more shifts
// than Marsaglia's original three.  It is a 7-shift generator
// with 256 bits, that passes BigCrush with no systmatic failures.
// Period 2^256-1.
// No systematic BigCrush failures reported.
var xorshift7 = xorshift7$1.exports

// xor4096, by Richard Brent, is a 4096-bit xor-shift with a
// very long period that also adds a Weyl generator. It also passes
// BigCrush with no systematic failures.  Its long period may
// be useful if you have many generators and need to avoid
// collisions.
// Period: 2^4128-2^32.
// No systematic BigCrush failures reported.
var xor4096 = xor4096$1.exports

// Tyche-i, by Samuel Neves and Filipe Araujo, is a bit-shifting random
// number generator derived from ChaCha, a modern stream cipher.
// https://eden.dei.uc.pt/~sneves/pubs/2011-snfa2.pdf
// Period: ~2^127
// No systematic BigCrush failures reported.
var tychei = tychei$1.exports

// The original ARC4-based prng included in this library.
// Period: ~2^1600
var sr = seedrandom.exports

sr.alea = alea
sr.xor128 = xor128
sr.xorwow = xorwow
sr.xorshift7 = xorshift7
sr.xor4096 = xor4096
sr.tychei = tychei

var floor = Math.floor
function arrayRange(arr) {
  var offset =
    arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0
  var stride =
    arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 1
  var minValue = Infinity
  var maxValue = -Infinity

  for (var i = offset, len = arr.length; i < len; i += stride) {
    if (arr[i] < minValue) {
      minValue = arr[i]
    }

    if (maxValue < arr[i]) {
      maxValue = arr[i]
    }
  }

  return [minValue, maxValue]
}
function norm(x) {
  var n = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 3

  switch (n) {
    case 1:
      return Math.abs(x)

    case 2:
      return Math.sqrt(x[0] * x[0] + x[1] * x[1])

    case 3:
      return Math.sqrt(x[0] * x[0] + x[1] * x[1] + x[2] * x[2])

    default: {
      var sum = 0

      for (var i = 0; i < n; i++) {
        sum += x[i] * x[i]
      }

      return Math.sqrt(sum)
    }
  }
}
function rgb2hsv(rgb, hsv) {
  var h
  var s

  var _rgb = _slicedToArray(rgb, 3),
    r = _rgb[0],
    g = _rgb[1],
    b = _rgb[2]

  var onethird = 1.0 / 3.0
  var onesixth = 1.0 / 6.0
  var twothird = 2.0 / 3.0
  var cmax = r
  var cmin = r

  if (g > cmax) {
    cmax = g
  } else if (g < cmin) {
    cmin = g
  }

  if (b > cmax) {
    cmax = b
  } else if (b < cmin) {
    cmin = b
  }

  var v = cmax

  if (v > 0.0) {
    s = (cmax - cmin) / cmax
  } else {
    s = 0.0
  }

  if (s > 0) {
    if (r === cmax) {
      h = (onesixth * (g - b)) / (cmax - cmin)
    } else if (g === cmax) {
      h = onethird + (onesixth * (b - r)) / (cmax - cmin)
    } else {
      h = twothird + (onesixth * (r - g)) / (cmax - cmin)
    }

    if (h < 0.0) {
      h += 1.0
    }
  } else {
    h = 0.0
  } // Set the values back to the array

  hsv[0] = h
  hsv[1] = s
  hsv[2] = v
}
function hsv2rgb(hsv, rgb) {
  var _hsv = _slicedToArray(hsv, 3),
    h = _hsv[0],
    s = _hsv[1],
    v = _hsv[2]

  var onethird = 1.0 / 3.0
  var onesixth = 1.0 / 6.0
  var twothird = 2.0 / 3.0
  var fivesixth = 5.0 / 6.0
  var r
  var g
  var b // compute RGB from HSV

  if (h > onesixth && h <= onethird) {
    // green/red
    g = 1.0
    r = (onethird - h) / onesixth
    b = 0.0
  } else if (h > onethird && h <= 0.5) {
    // green/blue
    g = 1.0
    b = (h - onethird) / onesixth
    r = 0.0
  } else if (h > 0.5 && h <= twothird) {
    // blue/green
    b = 1.0
    g = (twothird - h) / onesixth
    r = 0.0
  } else if (h > twothird && h <= fivesixth) {
    // blue/red
    b = 1.0
    r = (h - twothird) / onesixth
    g = 0.0
  } else if (h > fivesixth && h <= 1.0) {
    // red/blue
    r = 1.0
    b = (1.0 - h) / onesixth
    g = 0.0
  } else {
    // red/green
    r = 1.0
    g = h / onesixth
    b = 0.0
  } // add Saturation to the equation.

  r = s * r + (1.0 - s)
  g = s * g + (1.0 - s)
  b = s * b + (1.0 - s)
  r *= v
  g *= v
  b *= v // Assign back to the array

  rgb[0] = r
  rgb[1] = g
  rgb[2] = b
}
function lab2xyz(lab, xyz) {
  // LAB to XYZ
  var _lab = _slicedToArray(lab, 3),
    L = _lab[0],
    a = _lab[1],
    b = _lab[2]

  var var_Y = (L + 16) / 116
  var var_X = a / 500 + var_Y
  var var_Z = var_Y - b / 200

  if (Math.pow(var_Y, 3) > 0.008856) {
    var_Y = Math.pow(var_Y, 3)
  } else {
    var_Y = (var_Y - 16.0 / 116.0) / 7.787
  }

  if (Math.pow(var_X, 3) > 0.008856) {
    var_X = Math.pow(var_X, 3)
  } else {
    var_X = (var_X - 16.0 / 116.0) / 7.787
  }

  if (Math.pow(var_Z, 3) > 0.008856) {
    var_Z = Math.pow(var_Z, 3)
  } else {
    var_Z = (var_Z - 16.0 / 116.0) / 7.787
  }

  var ref_X = 0.9505
  var ref_Y = 1.0
  var ref_Z = 1.089
  xyz[0] = ref_X * var_X // ref_X = 0.9505  Observer= 2 deg Illuminant= D65

  xyz[1] = ref_Y * var_Y // ref_Y = 1.000

  xyz[2] = ref_Z * var_Z // ref_Z = 1.089
}
function xyz2lab(xyz, lab) {
  var _xyz = _slicedToArray(xyz, 3),
    x = _xyz[0],
    y = _xyz[1],
    z = _xyz[2]

  var ref_X = 0.9505
  var ref_Y = 1.0
  var ref_Z = 1.089
  var var_X = x / ref_X // ref_X = 0.9505  Observer= 2 deg, Illuminant= D65

  var var_Y = y / ref_Y // ref_Y = 1.000

  var var_Z = z / ref_Z // ref_Z = 1.089

  if (var_X > 0.008856) var_X = Math.pow(var_X, 1.0 / 3.0)
  else var_X = 7.787 * var_X + 16.0 / 116.0
  if (var_Y > 0.008856) var_Y = Math.pow(var_Y, 1.0 / 3.0)
  else var_Y = 7.787 * var_Y + 16.0 / 116.0
  if (var_Z > 0.008856) var_Z = Math.pow(var_Z, 1.0 / 3.0)
  else var_Z = 7.787 * var_Z + 16.0 / 116.0
  lab[0] = 116 * var_Y - 16
  lab[1] = 500 * (var_X - var_Y)
  lab[2] = 200 * (var_Y - var_Z)
}
function xyz2rgb(xyz, rgb) {
  var _xyz2 = _slicedToArray(xyz, 3),
    x = _xyz2[0],
    y = _xyz2[1],
    z = _xyz2[2]

  var r = x * 3.2406 + y * -1.5372 + z * -0.4986
  var g = x * -0.9689 + y * 1.8758 + z * 0.0415
  var b = x * 0.0557 + y * -0.204 + z * 1.057 // The following performs a "gamma correction" specified by the sRGB color
  // space.  sRGB is defined by a canonical definition of a display monitor and
  // has been standardized by the International Electrotechnical Commission (IEC
  // 61966-2-1).  The nonlinearity of the correction is designed to make the
  // colors more perceptually uniform.  This color space has been adopted by
  // several applications including Adobe Photoshop and Microsoft Windows color
  // management.  OpenGL is agnostic on its RGB color space, but it is reasonable
  // to assume it is close to this one.

  if (r > 0.0031308) r = 1.055 * Math.pow(r, 1 / 2.4) - 0.055
  else r *= 12.92
  if (g > 0.0031308) g = 1.055 * Math.pow(g, 1 / 2.4) - 0.055
  else g *= 12.92
  if (b > 0.0031308) b = 1.055 * Math.pow(b, 1 / 2.4) - 0.055
  else b *= 12.92 // Clip colors. ideally we would do something that is perceptually closest
  // (since we can see colors outside of the display gamut), but this seems to
  // work well enough.

  var maxVal = r
  if (maxVal < g) maxVal = g
  if (maxVal < b) maxVal = b

  if (maxVal > 1.0) {
    r /= maxVal
    g /= maxVal
    b /= maxVal
  }

  if (r < 0) r = 0
  if (g < 0) g = 0
  if (b < 0) b = 0 // Push values back to array

  rgb[0] = r
  rgb[1] = g
  rgb[2] = b
}
function rgb2xyz(rgb, xyz) {
  var _rgb2 = _slicedToArray(rgb, 3),
    r = _rgb2[0],
    g = _rgb2[1],
    b = _rgb2[2] // The following performs a "gamma correction" specified by the sRGB color
  // space.  sRGB is defined by a canonical definition of a display monitor and
  // has been standardized by the International Electrotechnical Commission (IEC
  // 61966-2-1).  The nonlinearity of the correction is designed to make the
  // colors more perceptually uniform.  This color space has been adopted by
  // several applications including Adobe Photoshop and Microsoft Windows color
  // management.  OpenGL is agnostic on its RGB color space, but it is reasonable
  // to assume it is close to this one.

  if (r > 0.04045) r = Math.pow((r + 0.055) / 1.055, 2.4)
  else r /= 12.92
  if (g > 0.04045) g = Math.pow((g + 0.055) / 1.055, 2.4)
  else g /= 12.92
  if (b > 0.04045) b = Math.pow((b + 0.055) / 1.055, 2.4)
  else b /= 12.92 // Observer. = 2 deg, Illuminant = D65

  xyz[0] = r * 0.4124 + g * 0.3576 + b * 0.1805
  xyz[1] = r * 0.2126 + g * 0.7152 + b * 0.0722
  xyz[2] = r * 0.0193 + g * 0.1192 + b * 0.9505
}
function rgb2lab(rgb, lab) {
  var xyz = [0, 0, 0]
  rgb2xyz(rgb, xyz)
  xyz2lab(xyz, lab)
}
function lab2rgb(lab, rgb) {
  var xyz = [0, 0, 0]
  lab2xyz(lab, xyz)
  xyz2rgb(xyz, rgb)
}
var isInf = function isInf(value) {
  return !Number.isFinite(value)
}
var isNaN$1 = Number.isNaN
var isNan = isNaN$1 // JavaScript - add-on ----------------------

var DataTypeByteSize = {
  Int8Array: 1,
  Uint8Array: 1,
  Uint8ClampedArray: 1,
  Int16Array: 2,
  Uint16Array: 2,
  Int32Array: 4,
  Uint32Array: 4,
  Float32Array: 4,
  Float64Array: 8,
}
var VtkDataTypes$1 = {
  VOID: '',
  // not sure to know what that should be
  CHAR: 'Int8Array',
  SIGNED_CHAR: 'Int8Array',
  UNSIGNED_CHAR: 'Uint8Array',
  SHORT: 'Int16Array',
  UNSIGNED_SHORT: 'Uint16Array',
  INT: 'Int32Array',
  UNSIGNED_INT: 'Uint32Array',
  FLOAT: 'Float32Array',
  DOUBLE: 'Float64Array',
}
var DefaultDataType$1 = VtkDataTypes$1.FLOAT
var Constants$3 = {
  DefaultDataType: DefaultDataType$1,
  DataTypeByteSize: DataTypeByteSize,
  VtkDataTypes: VtkDataTypes$1,
}

function ownKeys$3(object, enumerableOnly) {
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

function _objectSpread$3(target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = null != arguments[i] ? arguments[i] : {}
    i % 2
      ? ownKeys$3(Object(source), !0).forEach(function(key) {
          _defineProperty(target, key, source[key])
        })
      : Object.getOwnPropertyDescriptors
      ? Object.defineProperties(
          target,
          Object.getOwnPropertyDescriptors(source)
        )
      : ownKeys$3(Object(source)).forEach(function(key) {
          Object.defineProperty(
            target,
            key,
            Object.getOwnPropertyDescriptor(source, key)
          )
        })
  }
  return target
}
var DefaultDataType = Constants$3.DefaultDataType
var TUPLE_HOLDER = [] // ----------------------------------------------------------------------------
// Global methods
// ----------------------------------------------------------------------------
// Original source from https://www.npmjs.com/package/compute-range
// Modified to accept type arrays

function fastComputeRange(arr, offset, numberOfComponents) {
  var len = arr.length
  var min
  var max
  var x
  var i

  if (len === 0) {
    return {
      min: Number.MAX_VALUE,
      max: -Number.MAX_VALUE,
    }
  }

  min = arr[offset]
  max = min

  for (i = offset; i < len; i += numberOfComponents) {
    x = arr[i]

    if (x < min) {
      min = x
    } else if (x > max) {
      max = x
    }
  }

  return {
    min: min,
    max: max,
  }
}
/**
 * @deprecated please use fastComputeRange instead
 */

function createRangeHelper() {
  var min = Number.MAX_VALUE
  var max = -Number.MAX_VALUE
  var count = 0
  var sum = 0
  return {
    add: function add(value) {
      if (min > value) {
        min = value
      }

      if (max < value) {
        max = value
      }

      count++
      sum += value
    },
    get: function get() {
      return {
        min: min,
        max: max,
        count: count,
        sum: sum,
        mean: sum / count,
      }
    },
    getRange: function getRange() {
      return {
        min: min,
        max: max,
      }
    },
  }
}

function computeRange(values) {
  var component =
    arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0
  var numberOfComponents =
    arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 1

  if (component < 0 && numberOfComponents > 1) {
    // Compute magnitude
    var size = values.length
    var numberOfValues = size / numberOfComponents
    var data = new Float64Array(numberOfValues)

    for (var i = 0, j = 0; i < numberOfValues; ++i) {
      var _i

      for (var nextJ = j + numberOfComponents; j < nextJ; ++j) {
        data[i] += values[j] * values[j]
      }

      ;(_i = i), (data[_i] = Math.pow(data[_i], 0.5))
    }

    return fastComputeRange(data, 0, 1)
  }

  return fastComputeRange(
    values,
    component < 0 ? 0 : component,
    numberOfComponents
  )
}

function ensureRangeSize(rangeArray) {
  var size =
    arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0
  var ranges = rangeArray || [] // Pad ranges with null value to get the

  while (ranges.length <= size) {
    ranges.push(null)
  }

  return ranges
}

function getDataType(typedArray) {
  // Expects toString() to return "[object ...Array]"
  return Object.prototype.toString.call(typedArray).slice(8, -1)
}

function getMaxNorm(normArray) {
  var numComps = normArray.getNumberOfComponents()
  var maxNorm = 0.0

  for (var i = 0; i < normArray.getNumberOfTuples(); ++i) {
    var norm$1 = norm(normArray.getTuple(i), numComps)

    if (norm$1 > maxNorm) {
      maxNorm = norm$1
    }
  }

  return maxNorm
} // ----------------------------------------------------------------------------
// Static API
// ----------------------------------------------------------------------------

var STATIC$1 = {
  computeRange: computeRange,
  createRangeHelper: createRangeHelper,
  fastComputeRange: fastComputeRange,
  getDataType: getDataType,
  getMaxNorm: getMaxNorm,
} // ----------------------------------------------------------------------------
// vtkDataArray methods
// ----------------------------------------------------------------------------

function vtkDataArray(publicAPI, model) {
  // Set our className
  model.classHierarchy.push('vtkDataArray')

  function dataChange() {
    model.ranges = null
    publicAPI.modified()
  }

  publicAPI.getElementComponentSize = function() {
    return model.values.BYTES_PER_ELEMENT
  } // Description:
  // Return the data component at the location specified by tupleIdx and
  // compIdx.

  publicAPI.getComponent = function(tupleIdx) {
    var compIdx =
      arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0
    return model.values[tupleIdx * model.numberOfComponents + compIdx]
  } // Description:
  // Set the data component at the location specified by tupleIdx and compIdx
  // to value.
  // Note that i is less than NumberOfTuples and j is less than
  //  NumberOfComponents. Make sure enough memory has been allocated
  // (use SetNumberOfTuples() and SetNumberOfComponents()).

  publicAPI.setComponent = function(tupleIdx, compIdx, value) {
    if (value !== model.values[tupleIdx * model.numberOfComponents + compIdx]) {
      model.values[tupleIdx * model.numberOfComponents + compIdx] = value
      dataChange()
    }
  }

  publicAPI.getData = function() {
    return model.values
  }

  publicAPI.getRange = function() {
    var componentIndex =
      arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : -1
    var rangeIdx =
      componentIndex < 0 ? model.numberOfComponents : componentIndex
    var range = null

    if (!model.ranges) {
      model.ranges = ensureRangeSize(model.ranges, model.numberOfComponents)
    }

    range = model.ranges[rangeIdx]

    if (range) {
      model.rangeTuple[0] = range.min
      model.rangeTuple[1] = range.max
      return model.rangeTuple
    } // Need to compute ranges...

    range = computeRange(model.values, componentIndex, model.numberOfComponents)
    model.ranges[rangeIdx] = range
    model.rangeTuple[0] = range.min
    model.rangeTuple[1] = range.max
    return model.rangeTuple
  }

  publicAPI.setRange = function(rangeValue, componentIndex) {
    if (!model.ranges) {
      model.ranges = ensureRangeSize(model.ranges, model.numberOfComponents)
    }

    var range = {
      min: rangeValue.min,
      max: rangeValue.max,
    }
    model.ranges[componentIndex] = range
    model.rangeTuple[0] = range.min
    model.rangeTuple[1] = range.max
    return model.rangeTuple
  }

  publicAPI.setTuple = function(idx, tuple) {
    var offset = idx * model.numberOfComponents

    for (var i = 0; i < model.numberOfComponents; i++) {
      model.values[offset + i] = tuple[i]
    }
  }

  publicAPI.getTuple = function(idx) {
    var tupleToFill =
      arguments.length > 1 && arguments[1] !== undefined
        ? arguments[1]
        : TUPLE_HOLDER
    var numberOfComponents = model.numberOfComponents || 1

    if (tupleToFill.length !== numberOfComponents) {
      tupleToFill.length = numberOfComponents
    }

    var offset = idx * numberOfComponents // Check most common component sizes first
    // to avoid doing a for loop if possible

    if (numberOfComponents === 1) {
      tupleToFill[0] = model.values[offset]
    } else if (numberOfComponents === 2) {
      tupleToFill[0] = model.values[offset]
      tupleToFill[1] = model.values[offset + 1]
    } else if (numberOfComponents === 3) {
      tupleToFill[0] = model.values[offset]
      tupleToFill[1] = model.values[offset + 1]
      tupleToFill[2] = model.values[offset + 2]
    } else if (numberOfComponents === 4) {
      tupleToFill[0] = model.values[offset]
      tupleToFill[1] = model.values[offset + 1]
      tupleToFill[2] = model.values[offset + 2]
      tupleToFill[3] = model.values[offset + 3]
    } else {
      for (var i = 0; i < numberOfComponents; i++) {
        tupleToFill[i] = model.values[offset + i]
      }
    }

    return tupleToFill
  }

  publicAPI.getTupleLocation = function() {
    var idx =
      arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 1
    return idx * model.numberOfComponents
  }

  publicAPI.getNumberOfComponents = function() {
    return model.numberOfComponents
  }

  publicAPI.getNumberOfValues = function() {
    return model.values.length
  }

  publicAPI.getNumberOfTuples = function() {
    return model.values.length / model.numberOfComponents
  }

  publicAPI.getDataType = function() {
    return model.dataType
  }
  /* eslint-disable no-use-before-define */

  publicAPI.newClone = function() {
    return newInstance$6({
      empty: true,
      name: model.name,
      dataType: model.dataType,
      numberOfComponents: model.numberOfComponents,
    })
  }
  /* eslint-enable no-use-before-define */

  publicAPI.getName = function() {
    if (!model.name) {
      publicAPI.modified()
      model.name = 'vtkDataArray'.concat(publicAPI.getMTime())
    }

    return model.name
  }

  publicAPI.setData = function(typedArray, numberOfComponents) {
    model.values = typedArray
    model.size = typedArray.length
    model.dataType = getDataType(typedArray)

    if (numberOfComponents) {
      model.numberOfComponents = numberOfComponents
    }

    if (model.size % model.numberOfComponents !== 0) {
      model.numberOfComponents = 1
    }

    dataChange()
  } // Override serialization support

  publicAPI.getState = function() {
    if (model.deleted) {
      return null
    }

    var jsonArchive = _objectSpread$3(
      _objectSpread$3({}, model),
      {},
      {
        vtkClass: publicAPI.getClassName(),
      }
    ) // Convert typed array to regular array

    jsonArchive.values = Array.from(jsonArchive.values)
    delete jsonArchive.buffer // Clean any empty data

    Object.keys(jsonArchive).forEach(function(keyName) {
      if (!jsonArchive[keyName]) {
        delete jsonArchive[keyName]
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
  }
} // ----------------------------------------------------------------------------
// Object factory
// ----------------------------------------------------------------------------

var DEFAULT_VALUES$7 = {
  name: '',
  numberOfComponents: 1,
  size: 0,
  dataType: DefaultDataType,
  rangeTuple: [0, 0], // values: null,
  // ranges: null,
} // ----------------------------------------------------------------------------

function extend$7(publicAPI, model) {
  var initialValues =
    arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {}
  Object.assign(model, DEFAULT_VALUES$7, initialValues)

  if (!model.empty && !model.values && !model.size) {
    throw new TypeError(
      'Cannot create vtkDataArray object without: size > 0, values'
    )
  }

  if (!model.values) {
    model.values = newTypedArray(model.dataType, model.size)
  } else if (Array.isArray(model.values)) {
    model.values = newTypedArrayFrom(model.dataType, model.values)
  }

  if (model.values) {
    model.size = model.values.length
    model.dataType = getDataType(model.values)
  } // Object methods

  obj(publicAPI, model)
  set(publicAPI, model, ['name', 'numberOfComponents']) // Object specific methods

  vtkDataArray(publicAPI, model)
} // ----------------------------------------------------------------------------

var newInstance$6 = newInstance$7(extend$7, 'vtkDataArray') // ----------------------------------------------------------------------------

var vtkDataArray$1 = _objectSpread$3(
  _objectSpread$3(
    {
      newInstance: newInstance$6,
      extend: extend$7,
    },
    STATIC$1
  ),
  Constants$3
)

var VectorMode$1 = {
  MAGNITUDE: 0,
  COMPONENT: 1,
  RGBCOLORS: 2,
}
var ScalarMappingTarget$2 = {
  LUMINANCE: 1,
  LUMINANCE_ALPHA: 2,
  RGB: 3,
  RGBA: 4,
}
var vtkScalarsToColors$2 = {
  VectorMode: VectorMode$1,
  ScalarMappingTarget: ScalarMappingTarget$2,
}

var ColorMode$1 = {
  DEFAULT: 0,
  MAP_SCALARS: 1,
  DIRECT_SCALARS: 2,
}
var ScalarMode = {
  DEFAULT: 0,
  USE_POINT_DATA: 1,
  USE_CELL_DATA: 2,
  USE_POINT_FIELD_DATA: 3,
  USE_CELL_FIELD_DATA: 4,
  USE_FIELD_DATA: 5,
}
var GetArray = {
  BY_ID: 0,
  BY_NAME: 1,
}
var Constants$2 = {
  ColorMode: ColorMode$1,
  GetArray: GetArray,
  ScalarMode: ScalarMode,
}

function ownKeys$2(object, enumerableOnly) {
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

function _objectSpread$2(target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = null != arguments[i] ? arguments[i] : {}
    i % 2
      ? ownKeys$2(Object(source), !0).forEach(function(key) {
          _defineProperty(target, key, source[key])
        })
      : Object.getOwnPropertyDescriptors
      ? Object.defineProperties(
          target,
          Object.getOwnPropertyDescriptors(source)
        )
      : ownKeys$2(Object(source)).forEach(function(key) {
          Object.defineProperty(
            target,
            key,
            Object.getOwnPropertyDescriptor(source, key)
          )
        })
  }
  return target
}

var ScalarMappingTarget$1 = vtkScalarsToColors$2.ScalarMappingTarget,
  VectorMode = vtkScalarsToColors$2.VectorMode
var VtkDataTypes = vtkDataArray$1.VtkDataTypes
var ColorMode = Constants$2.ColorMode
var vtkErrorMacro$1 = macro.vtkErrorMacro // ----------------------------------------------------------------------------
// Global methods
// ----------------------------------------------------------------------------
// Add module-level functions or api that you want to expose statically via
// the next section...
// ----------------------------------------------------------------------------
// Static API
// ----------------------------------------------------------------------------

function intColorToUChar(c) {
  return c
}

function floatColorToUChar(c) {
  return Math.floor(c * 255.0 + 0.5)
} // ----------------------------------------------------------------------------
// vtkScalarsToColors methods
// ----------------------------------------------------------------------------

function vtkScalarsToColors(publicAPI, model) {
  // Set our className
  model.classHierarchy.push('vtkScalarsToColors')

  publicAPI.setVectorModeToMagnitude = function() {
    return publicAPI.setVectorMode(VectorMode.MAGNITUDE)
  }

  publicAPI.setVectorModeToComponent = function() {
    return publicAPI.setVectorMode(VectorMode.COMPONENT)
  }

  publicAPI.setVectorModeToRGBColors = function() {
    return publicAPI.setVectorMode(VectorMode.RGBCOLORS)
  }

  publicAPI.build = function() {}

  publicAPI.isOpaque = function() {
    return true
  } //----------------------------------------------------------------------------

  publicAPI.setAnnotations = function(values, annotations) {
    if ((values && !annotations) || (!values && annotations)) {
      return
    }

    if (values && annotations && values.length !== annotations.length) {
      vtkErrorMacro$1(
        'Values and annotations do not have the same number of tuples so ignoring'
      )
      return
    }

    model.annotationArray = []

    if (annotations && values) {
      var num = annotations.length

      for (var i = 0; i < num; i++) {
        model.annotationArray.push({
          value: values[i],
          annotation: String(annotations[i]),
        })
      }
    }

    publicAPI.updateAnnotatedValueMap()
    publicAPI.modified()
  } //----------------------------------------------------------------------------

  publicAPI.setAnnotation = function(value, annotation) {
    var i = publicAPI.checkForAnnotatedValue(value)
    var modified = false

    if (i >= 0) {
      if (model.annotationArray[i].annotation !== annotation) {
        model.annotationArray[i].annotation = annotation
        modified = true
      }
    } else {
      model.annotationArray.push({
        value: value,
        annotation: annotation,
      })
      i = model.annotationArray.length - 1
      modified = true
    }

    if (modified) {
      publicAPI.updateAnnotatedValueMap()
      publicAPI.modified()
    }

    return i
  } //----------------------------------------------------------------------------

  publicAPI.getNumberOfAnnotatedValues = function() {
    return model.annotationArray.length
  } //----------------------------------------------------------------------------

  publicAPI.getAnnotatedValue = function(idx) {
    if (idx < 0 || idx >= model.annotationArray.length) {
      return null
    }

    return model.annotationArray[idx].value
  } //----------------------------------------------------------------------------

  publicAPI.getAnnotation = function(idx) {
    if (model.annotationArray[idx] === undefined) {
      return null
    }

    return model.annotationArray[idx].annotation
  } //----------------------------------------------------------------------------

  publicAPI.getAnnotatedValueIndex = function(val) {
    return model.annotationArray.length
      ? publicAPI.checkForAnnotatedValue(val)
      : -1
  } //----------------------------------------------------------------------------

  publicAPI.removeAnnotation = function(value) {
    var i = publicAPI.checkForAnnotatedValue(value)
    var needToRemove = i >= 0

    if (needToRemove) {
      model.annotationArray.splice(i, 1)
      publicAPI.updateAnnotatedValueMap()
      publicAPI.modified()
    }

    return needToRemove
  } //----------------------------------------------------------------------------

  publicAPI.resetAnnotations = function() {
    model.annotationArray = []
    model.annotatedValueMap = []
    publicAPI.modified()
  } //----------------------------------------------------------------------------

  publicAPI.getAnnotationColor = function(val, rgba) {
    if (model.indexedLookup) {
      var i = publicAPI.getAnnotatedValueIndex(val)
      publicAPI.getIndexedColor(i, rgba)
    } else {
      publicAPI.getColor(parseFloat(val), rgba)
      rgba[3] = 1.0
    }
  } //----------------------------------------------------------------------------

  publicAPI.checkForAnnotatedValue = function(value) {
    return publicAPI.getAnnotatedValueIndexInternal(value)
  } //----------------------------------------------------------------------------
  // An unsafe version of vtkScalarsToColors::CheckForAnnotatedValue for
  // internal use (no pointer checks performed)

  publicAPI.getAnnotatedValueIndexInternal = function(value) {
    if (model.annotatedValueMap[value] !== undefined) {
      var na = model.annotationArray.length
      return model.annotatedValueMap[value] % na
    } // Treat as a NaN

    return -1
  } //----------------------------------------------------------------------------

  publicAPI.getIndexedColor = function(val, rgba) {
    rgba[0] = 0.0
    rgba[1] = 0.0
    rgba[2] = 0.0
    rgba[3] = 0.0
  } //----------------------------------------------------------------------------

  publicAPI.updateAnnotatedValueMap = function() {
    model.annotatedValueMap = []
    var na = model.annotationArray.length

    for (var i = 0; i < na; i++) {
      model.annotatedValueMap[model.annotationArray[i].value] = i
    }
  } // Description:
  // Internal methods that map a data array into a 4-component,
  // unsigned char RGBA array. The color mode determines the behavior
  // of mapping. If ColorMode.DEFAULT is set, then unsigned char
  // data arrays are treated as colors (and converted to RGBA if
  // necessary); If ColorMode.DIRECT_SCALARS is set, then all arrays
  // are treated as colors (integer types are clamped in the range 0-255,
  // floating point arrays are clamped in the range 0.0-1.0. Note 'char' does
  // not have enough values to represent a color so mapping this type is
  // considered an error);
  // otherwise, the data is mapped through this instance
  // of ScalarsToColors. The component argument is used for data
  // arrays with more than one component; it indicates which component
  // to use to do the blending.  When the component argument is -1,
  // then the this object uses its own selected technique to change a
  // vector into a scalar to map.

  publicAPI.mapScalars = function(scalars, colorMode, componentIn) {
    var numberOfComponents = scalars.getNumberOfComponents()
    var newColors = null // map scalars through lookup table only if needed

    if (
      (colorMode === ColorMode.DEFAULT &&
        scalars.getDataType() === VtkDataTypes.UNSIGNED_CHAR) ||
      (colorMode === ColorMode.DIRECT_SCALARS && scalars)
    ) {
      newColors = publicAPI.convertToRGBA(
        scalars,
        numberOfComponents,
        scalars.getNumberOfTuples()
      )
    } else {
      var newscalars = {
        type: 'vtkDataArray',
        name: 'temp',
        numberOfComponents: 4,
        dataType: VtkDataTypes.UNSIGNED_CHAR,
      }
      var s = macro.newTypedArray(
        newscalars.dataType,
        4 * scalars.getNumberOfTuples()
      )
      newscalars.values = s
      newscalars.size = s.length
      newColors = vtkDataArray$1.newInstance(newscalars)
      var component = componentIn // If mapper did not specify a component, use the VectorMode

      if (component < 0 && numberOfComponents > 1) {
        publicAPI.mapVectorsThroughTable(
          scalars,
          newColors,
          ScalarMappingTarget$1.RGBA,
          -1,
          -1
        )
      } else {
        if (component < 0) {
          component = 0
        }

        if (component >= numberOfComponents) {
          component = numberOfComponents - 1
        } // Map the scalars to colors

        publicAPI.mapScalarsThroughTable(
          scalars,
          newColors,
          ScalarMappingTarget$1.RGBA,
          component
        )
      }
    }

    return newColors
  }

  publicAPI.mapVectorsToMagnitude = function(input, output, compsToUse) {
    var length = input.getNumberOfTuples()
    var inIncr = input.getNumberOfComponents()
    var outputV = output.getData()
    var inputV = input.getData()

    for (var i = 0; i < length; i++) {
      var sum = 0.0

      for (var j = 0; j < compsToUse; j++) {
        sum += inputV[i * inIncr + j] * inputV[i * inIncr + j]
      }

      outputV[i] = Math.sqrt(sum)
    }
  } //----------------------------------------------------------------------------
  // Map a set of vector values through the table

  publicAPI.mapVectorsThroughTable = function(
    input,
    output,
    outputFormat,
    vectorComponentIn,
    vectorSizeIn
  ) {
    var vectorMode = publicAPI.getVectorMode()
    var vectorSize = vectorSizeIn
    var vectorComponent = vectorComponentIn
    var inComponents = input.getNumberOfComponents()

    if (vectorMode === VectorMode.COMPONENT) {
      // make sure vectorComponent is within allowed range
      if (vectorComponent === -1) {
        // if set to -1, use default value provided by table
        vectorComponent = publicAPI.getVectorComponent()
      }

      if (vectorComponent < 0) {
        vectorComponent = 0
      }

      if (vectorComponent >= inComponents) {
        vectorComponent = inComponents - 1
      }
    } else {
      // make sure vectorSize is within allowed range
      if (vectorSize === -1) {
        // if set to -1, use default value provided by table
        vectorSize = publicAPI.getVectorSize()
      }

      if (vectorSize <= 0) {
        vectorComponent = 0
        vectorSize = inComponents
      } else {
        if (vectorComponent < 0) {
          vectorComponent = 0
        }

        if (vectorComponent >= inComponents) {
          vectorComponent = inComponents - 1
        }

        if (vectorComponent + vectorSize > inComponents) {
          vectorSize = inComponents - vectorComponent
        }
      }

      if (
        vectorMode === VectorMode.MAGNITUDE &&
        (inComponents === 1 || vectorSize === 1)
      ) {
        vectorMode = VectorMode.COMPONENT
      }
    } // increment input pointer to the first component to map

    var inputOffset = 0

    if (vectorComponent > 0) {
      inputOffset = vectorComponent
    } // map according to the current vector mode

    switch (vectorMode) {
      case VectorMode.COMPONENT: {
        publicAPI.mapScalarsThroughTable(
          input,
          output,
          outputFormat,
          inputOffset
        )
        break
      }

      case VectorMode.RGBCOLORS: {
        // publicAPI.mapColorsToColors(
        //   input, output, inComponents, vectorSize,
        //   outputFormat);
        break
      }
      // MAGNITUDE is considered default

      case VectorMode.MAGNITUDE:
      default: {
        var magValues = vtkDataArray$1.newInstance({
          numberOfComponents: 1,
          values: new Float32Array(input.getNumberOfTuples()),
        })
        publicAPI.mapVectorsToMagnitude(input, magValues, vectorSize)
        publicAPI.mapScalarsThroughTable(magValues, output, outputFormat, 0)
        break
      }
    }
  }

  publicAPI.luminanceToRGBA = function(newColors, colors, alpha, convtFun) {
    var a = convtFun(alpha)
    var values = colors.getData()
    var newValues = newColors.getData()
    var size = values.length
    var component = 0
    var tuple = 1
    var count = 0

    for (var i = component; i < size; i += tuple) {
      var l = convtFun(values[i])
      newValues[count * 4] = l
      newValues[count * 4 + 1] = l
      newValues[count * 4 + 2] = l
      newValues[count * 4 + 3] = a
      count++
    }
  }

  publicAPI.luminanceAlphaToRGBA = function(
    newColors,
    colors,
    alpha,
    convtFun
  ) {
    var values = colors.getData()
    var newValues = newColors.getData()
    var size = values.length
    var component = 0
    var tuple = 2
    var count = 0

    for (var i = component; i < size; i += tuple) {
      var l = convtFun(values[i])
      newValues[count] = l
      newValues[count + 1] = l
      newValues[count + 2] = l
      newValues[count + 3] = convtFun(values[i + 1]) * alpha
      count += 4
    }
  }

  publicAPI.rGBToRGBA = function(newColors, colors, alpha, convtFun) {
    var a = floatColorToUChar(alpha)
    var values = colors.getData()
    var newValues = newColors.getData()
    var size = values.length
    var component = 0
    var tuple = 3
    var count = 0

    for (var i = component; i < size; i += tuple) {
      newValues[count * 4] = convtFun(values[i])
      newValues[count * 4 + 1] = convtFun(values[i + 1])
      newValues[count * 4 + 2] = convtFun(values[i + 2])
      newValues[count * 4 + 3] = a
      count++
    }
  }

  publicAPI.rGBAToRGBA = function(newColors, colors, alpha, convtFun) {
    var values = colors.getData()
    var newValues = newColors.getData()
    var size = values.length
    var component = 0
    var tuple = 4
    var count = 0

    for (var i = component; i < size; i += tuple) {
      newValues[count * 4] = convtFun(values[i])
      newValues[count * 4 + 1] = convtFun(values[i + 1])
      newValues[count * 4 + 2] = convtFun(values[i + 2])
      newValues[count * 4 + 3] = convtFun(values[i + 3]) * alpha
      count++
    }
  } //----------------------------------------------------------------------------

  publicAPI.convertToRGBA = function(colors, numComp, numTuples) {
    var alpha = model.alpha

    if (
      numComp === 4 &&
      alpha >= 1.0 &&
      colors.getDataType() === VtkDataTypes.UNSIGNED_CHAR
    ) {
      return colors
    }

    var newColors = vtkDataArray$1.newInstance({
      numberOfComponents: 4,
      empty: true,
      size: 4 * numTuples,
      dataType: VtkDataTypes.UNSIGNED_CHAR,
    })

    if (numTuples <= 0) {
      return newColors
    }

    alpha = alpha > 0 ? alpha : 0
    alpha = alpha < 1 ? alpha : 1
    var convtFun = intColorToUChar

    if (
      colors.getDataType() === VtkDataTypes.FLOAT ||
      colors.getDataType() === VtkDataTypes.DOUBLE
    ) {
      convtFun = floatColorToUChar
    }

    switch (numComp) {
      case 1:
        publicAPI.luminanceToRGBA(newColors, colors, alpha, convtFun)
        break

      case 2:
        publicAPI.luminanceAlphaToRGBA(newColors, colors, convtFun)
        break

      case 3:
        publicAPI.rGBToRGBA(newColors, colors, alpha, convtFun)
        break

      case 4:
        publicAPI.rGBAToRGBA(newColors, colors, alpha, convtFun)
        break

      default:
        vtkErrorMacro$1('Cannot convert colors')
        return null
    }

    return newColors
  }

  publicAPI.usingLogScale = function() {
    return false
  }

  publicAPI.getNumberOfAvailableColors = function() {
    return 256 * 256 * 256
  }

  publicAPI.setRange = function(min, max) {
    return publicAPI.setMappingRange(min, max)
  }

  publicAPI.getRange = function(min, max) {
    return publicAPI.getMappingRange()
  }
} // ----------------------------------------------------------------------------
// Object factory
// ----------------------------------------------------------------------------

var DEFAULT_VALUES$6 = {
  alpha: 1.0,
  vectorComponent: 0,
  vectorSize: -1,
  vectorMode: VectorMode.COMPONENT,
  mappingRange: null,
  annotationArray: null,
  annotatedValueMap: null,
  indexedLookup: false,
} // ----------------------------------------------------------------------------

function extend$6(publicAPI, model) {
  var initialValues =
    arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {}
  Object.assign(model, DEFAULT_VALUES$6, initialValues) // Object methods

  macro.obj(publicAPI, model)
  model.mappingRange = [0, 255]
  model.annotationArray = []
  model.annotatedValueMap = [] // Create get-set macros

  macro.setGet(publicAPI, model, [
    'vectorSize',
    'vectorComponent',
    'vectorMode',
    'alpha',
    'indexedLookup',
  ]) // Create set macros for array (needs to know size)

  macro.setArray(publicAPI, model, ['mappingRange'], 2) // Create get macros for array

  macro.getArray(publicAPI, model, ['mappingRange']) // For more macro methods, see "Sources/macros.js"
  // Object specific methods

  vtkScalarsToColors(publicAPI, model)
} // ----------------------------------------------------------------------------

var newInstance$5 = macro.newInstance(extend$6, 'vtkScalarsToColors') // ----------------------------------------------------------------------------

var vtkScalarsToColors$1 = _objectSpread$2(
  {
    newInstance: newInstance$5,
    extend: extend$6,
  },
  vtkScalarsToColors$2
)

var ColorSpace$1 = {
  RGB: 0,
  HSV: 1,
  LAB: 2,
  DIVERGING: 3,
}
var Scale$1 = {
  LINEAR: 0,
  LOG10: 1,
}
var Constants$1 = {
  ColorSpace: ColorSpace$1,
  Scale: Scale$1,
}

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
var ColorSpace = Constants$1.ColorSpace,
  Scale = Constants$1.Scale
var ScalarMappingTarget = vtkScalarsToColors$1.ScalarMappingTarget
var vtkDebugMacro = macro.vtkDebugMacro,
  vtkErrorMacro = macro.vtkErrorMacro,
  vtkWarningMacro = macro.vtkWarningMacro // ----------------------------------------------------------------------------
// Global methods
// ----------------------------------------------------------------------------

/* eslint-disable no-continue                                                */
// Convert to and from a special polar version of CIELAB (useful for creating
// continuous diverging color maps).

function vtkColorTransferFunctionLabToMsh(lab, msh) {
  var L = lab[0]
  var a = lab[1]
  var b = lab[2]
  var M = Math.sqrt(L * L + a * a + b * b)
  var s = M > 0.001 ? Math.acos(L / M) : 0.0
  var h = s > 0.001 ? Math.atan2(b, a) : 0.0
  msh[0] = M
  msh[1] = s
  msh[2] = h
}

function vtkColorTransferFunctionMshToLab(msh, lab) {
  var M = msh[0]
  var s = msh[1]
  var h = msh[2]
  lab[0] = M * Math.cos(s)
  lab[1] = M * Math.sin(s) * Math.cos(h)
  lab[2] = M * Math.sin(s) * Math.sin(h)
} // For the case when interpolating from a saturated color to an unsaturated
// color, find a hue for the unsaturated color that makes sense.

function vtkColorTransferFunctionAdjustHue(msh, unsatM) {
  if (msh[0] >= unsatM - 0.1) {
    // The best we can do is hold hue constant.
    return msh[2]
  } // This equation is designed to make the perceptual change of the
  // interpolation to be close to constant.

  var hueSpin =
    (msh[1] * Math.sqrt(unsatM * unsatM - msh[0] * msh[0])) /
    (msh[0] * Math.sin(msh[1])) // Spin hue away from 0 except in purple hues.

  if (msh[2] > -0.3 * Math.PI) {
    return msh[2] + hueSpin
  }

  return msh[2] - hueSpin
}

function vtkColorTransferFunctionAngleDiff(a1, a2) {
  var adiff = a1 - a2

  if (adiff < 0.0) {
    adiff = -adiff
  }

  while (adiff >= 2.0 * Math.PI) {
    adiff -= 2.0 * Math.PI
  }

  if (adiff > Math.PI) {
    adiff = 2.0 * Math.PI - adiff
  }

  return adiff
} // Interpolate a diverging color map.

function vtkColorTransferFunctionInterpolateDiverging(s, rgb1, rgb2, result) {
  var lab1 = []
  var lab2 = []
  rgb2lab(rgb1, lab1)
  rgb2lab(rgb2, lab2)
  var msh1 = []
  var msh2 = []
  vtkColorTransferFunctionLabToMsh(lab1, msh1)
  vtkColorTransferFunctionLabToMsh(lab2, msh2) // If the endpoints are distinct saturated colors, then place white in between
  // them.

  var localS = s

  if (
    msh1[1] > 0.05 &&
    msh2[1] > 0.05 &&
    vtkColorTransferFunctionAngleDiff(msh1[2], msh2[2]) > 0.33 * Math.PI
  ) {
    // Insert the white midpoint by setting one end to white and adjusting the
    // scalar value.
    var Mmid = Math.max(msh1[0], msh2[0])
    Mmid = Math.max(88.0, Mmid)

    if (s < 0.5) {
      msh2[0] = Mmid
      msh2[1] = 0.0
      msh2[2] = 0.0
      localS *= 2.0
    } else {
      msh1[0] = Mmid
      msh1[1] = 0.0
      msh1[2] = 0.0
      localS = 2.0 * localS - 1.0
    }
  } // If one color has no saturation, then its hue value is invalid.  In this
  // case, we want to set it to something logical so that the interpolation of
  // hue makes sense.

  if (msh1[1] < 0.05 && msh2[1] > 0.05) {
    msh1[2] = vtkColorTransferFunctionAdjustHue(msh2, msh1[0])
  } else if (msh2[1] < 0.05 && msh1[1] > 0.05) {
    msh2[2] = vtkColorTransferFunctionAdjustHue(msh1, msh2[0])
  }

  var mshTmp = []
  mshTmp[0] = (1 - localS) * msh1[0] + localS * msh2[0]
  mshTmp[1] = (1 - localS) * msh1[1] + localS * msh2[1]
  mshTmp[2] = (1 - localS) * msh1[2] + localS * msh2[2] // Now convert back to RGB

  var labTmp = []
  vtkColorTransferFunctionMshToLab(mshTmp, labTmp)
  lab2rgb(labTmp, result)
} // ----------------------------------------------------------------------------
// vtkColorTransferFunction methods
// ----------------------------------------------------------------------------

function vtkColorTransferFunction(publicAPI, model) {
  // Set our className
  model.classHierarchy.push('vtkColorTransferFunction') // Return the number of points which specify this function

  publicAPI.getSize = function() {
    return model.nodes.length
  } //----------------------------------------------------------------------------
  // Add a point defined in RGB

  publicAPI.addRGBPoint = function(x, r, g, b) {
    return publicAPI.addRGBPointLong(x, r, g, b, 0.5, 0.0)
  } //----------------------------------------------------------------------------
  // Add a point defined in RGB

  publicAPI.addRGBPointLong = function(x, r, g, b) {
    var midpoint =
      arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : 0.5
    var sharpness =
      arguments.length > 5 && arguments[5] !== undefined ? arguments[5] : 0.0

    // Error check
    if (midpoint < 0.0 || midpoint > 1.0) {
      vtkErrorMacro('Midpoint outside range [0.0, 1.0]')
      return -1
    }

    if (sharpness < 0.0 || sharpness > 1.0) {
      vtkErrorMacro('Sharpness outside range [0.0, 1.0]')
      return -1
    } // remove any node already at this X location

    if (!model.allowDuplicateScalars) {
      publicAPI.removePoint(x)
    } // Create the new node

    var node = {
      x: x,
      r: r,
      g: g,
      b: b,
      midpoint: midpoint,
      sharpness: sharpness,
    } // Add it, then sort to get everything in order

    model.nodes.push(node)
    publicAPI.sortAndUpdateRange() // We need to find the index of the node we just added in order
    // to return this value

    var i = 0

    for (; i < model.nodes.length; i++) {
      if (model.nodes[i].x === x) {
        break
      }
    } // If we didn't find it, something went horribly wrong so
    // return -1

    if (i < model.nodes.length) {
      return i
    }

    return -1
  } //----------------------------------------------------------------------------
  // Add a point defined in HSV

  publicAPI.addHSVPoint = function(x, h, s, v) {
    return publicAPI.addHSVPointLong(x, h, s, v, 0.5, 0.0)
  } //----------------------------------------------------------------------------
  // Add a point defined in HSV

  publicAPI.addHSVPointLong = function(x, h, s, v) {
    var midpoint =
      arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : 0.5
    var sharpness =
      arguments.length > 5 && arguments[5] !== undefined ? arguments[5] : 0.0
    var rgb = []
    var hsv = [h, s, v]
    hsv2rgb(hsv, rgb)
    return publicAPI.addRGBPoint(x, rgb[0], rgb[1], rgb[2], midpoint, sharpness)
  } //----------------------------------------------------------------------------
  // Set nodes directly

  publicAPI.setNodes = function(nodes) {
    if (model.nodes !== nodes) {
      var before = JSON.stringify(model.nodes)
      model.nodes = nodes
      var after = JSON.stringify(model.nodes)

      if (publicAPI.sortAndUpdateRange() || before !== after) {
        publicAPI.modified()
        return true
      }
    }

    return false
  } //----------------------------------------------------------------------------
  // Sort the vector in increasing order, then fill in
  // the Range

  publicAPI.sortAndUpdateRange = function() {
    var before = JSON.stringify(model.nodes)
    model.nodes.sort(function(a, b) {
      return a.x - b.x
    })
    var after = JSON.stringify(model.nodes)
    var modifiedInvoked = publicAPI.updateRange() // If range is updated, Modified() has been called, don't call it again.

    if (!modifiedInvoked && before !== after) {
      publicAPI.modified()
      return true
    }

    return modifiedInvoked
  } //----------------------------------------------------------------------------

  publicAPI.updateRange = function() {
    var oldRange = [2]
    oldRange[0] = model.mappingRange[0]
    oldRange[1] = model.mappingRange[1]
    var size = model.nodes.length

    if (size) {
      model.mappingRange[0] = model.nodes[0].x
      model.mappingRange[1] = model.nodes[size - 1].x
    } else {
      model.mappingRange[0] = 0
      model.mappingRange[1] = 0
    } // If the range is the same, then no need to call Modified()

    if (
      oldRange[0] === model.mappingRange[0] &&
      oldRange[1] === model.mappingRange[1]
    ) {
      return false
    }

    publicAPI.modified()
    return true
  } //----------------------------------------------------------------------------
  // Remove a point

  publicAPI.removePoint = function(x) {
    // First find the node since we need to know its
    // index as our return value
    var i = 0

    for (; i < model.nodes.length; i++) {
      if (model.nodes[i].x === x) {
        break
      }
    }

    var retVal = i // If the node doesn't exist, we return -1

    if (i >= model.nodes.length) {
      return -1
    } // If the first or last point has been removed, then we update the range
    // No need to sort here as the order of points hasn't changed.

    var modifiedInvoked = false
    model.nodes.splice(i, 1)

    if (i === 0 || i === model.nodes.length) {
      modifiedInvoked = publicAPI.updateRange()
    }

    if (!modifiedInvoked) {
      publicAPI.modified()
    }

    return retVal
  } //----------------------------------------------------------------------------

  publicAPI.movePoint = function(oldX, newX) {
    if (oldX === newX) {
      // Nothing to do.
      return
    }

    publicAPI.removePoint(newX)

    for (var i = 0; i < model.nodes.length; i++) {
      if (model.nodes[i].x === oldX) {
        model.nodes[i].x = newX
        publicAPI.sortAndUpdateRange()
        break
      }
    }
  } //----------------------------------------------------------------------------
  // Remove all points

  publicAPI.removeAllPoints = function() {
    model.nodes = []
    publicAPI.sortAndUpdateRange()
  } //----------------------------------------------------------------------------
  // Add a line defined in RGB

  publicAPI.addRGBSegment = function(x1, r1, g1, b1, x2, r2, g2, b2) {
    // First, find all points in this range and remove them
    publicAPI.sortAndUpdateRange()

    for (var i = 0; i < model.nodes.length; ) {
      if (model.nodes[i].x >= x1 && model.nodes[i].x <= x2) {
        model.nodes.splice(i, 1)
      } else {
        i++
      }
    } // Now add the points

    publicAPI.addRGBPointLong(x1, r1, g1, b1, 0.5, 0.0)
    publicAPI.addRGBPointLong(x2, r2, g2, b2, 0.5, 0.0)
    publicAPI.modified()
  } //----------------------------------------------------------------------------
  // Add a line defined in HSV

  publicAPI.addHSVSegment = function(x1, h1, s1, v1, x2, h2, s2, v2) {
    var hsv1 = [h1, s1, v1]
    var hsv2 = [h2, s2, v2]
    var rgb1 = []
    var rgb2 = []
    hsv2rgb(hsv1, rgb1)
    hsv2rgb(hsv2, rgb2)
    publicAPI.addRGBSegment(
      x1,
      rgb1[0],
      rgb1[1],
      rgb1[2],
      x2,
      rgb2[0],
      rgb2[1],
      rgb2[2]
    )
  } //----------------------------------------------------------------------------
  // Returns the RGBA color evaluated at the specified location

  publicAPI.mapValue = function(x) {
    var rgb = []
    publicAPI.getColor(x, rgb)
    return [
      Math.floor(255.0 * rgb[0] + 0.5),
      Math.floor(255.0 * rgb[1] + 0.5),
      Math.floor(255.0 * rgb[2] + 0.5),
      255,
    ]
  } //----------------------------------------------------------------------------
  // Returns the RGB color evaluated at the specified location

  publicAPI.getColor = function(x, rgb) {
    if (model.indexedLookup) {
      var numNodes = publicAPI.getSize() // todo

      var idx = publicAPI.getAnnotatedValueIndexInternal(x)

      if (idx < 0 || numNodes === 0) {
        publicAPI.getNanColor(rgb)
      } else {
        var nodeVal = []
        publicAPI.getNodeValue(idx % numNodes, nodeVal)
        rgb[0] = nodeVal.r
        rgb[1] = nodeVal.g
        rgb[2] = nodeVal.b
      }

      return
    }

    publicAPI.getTable(x, x, 1, rgb)
  } //----------------------------------------------------------------------------
  // Returns the red color evaluated at the specified location

  publicAPI.getRedValue = function(x) {
    var rgb = []
    publicAPI.getColor(x, rgb)
    return rgb[0]
  } //----------------------------------------------------------------------------
  // Returns the green color evaluated at the specified location

  publicAPI.getGreenValue = function(x) {
    var rgb = []
    publicAPI.getColor(x, rgb)
    return rgb[1]
  } //----------------------------------------------------------------------------
  // Returns the blue color evaluated at the specified location

  publicAPI.getBlueValue = function(x) {
    var rgb = []
    publicAPI.getColor(x, rgb)
    return rgb[2]
  } //----------------------------------------------------------------------------
  // Returns a table of RGB colors at regular intervals along the function

  publicAPI.getTable = function(xStart, xEnd, size, table) {
    // Special case: If either the start or end is a NaN, then all any
    // interpolation done on them is also a NaN.  Therefore, fill the table with
    // the NaN color.
    if (isNan(xStart) || isNan(xEnd)) {
      for (var i = 0; i < size; i++) {
        table[i * 3 + 0] = model.nanColor[0]
        table[i * 3 + 1] = model.nanColor[1]
        table[i * 3 + 2] = model.nanColor[2]
      }

      return
    }

    var idx = 0
    var numNodes = model.nodes.length // Need to keep track of the last value so that
    // we can fill in table locations past this with
    // this value if Clamping is On.

    var lastR = 0.0
    var lastG = 0.0
    var lastB = 0.0

    if (numNodes !== 0) {
      lastR = model.nodes[numNodes - 1].r
      lastG = model.nodes[numNodes - 1].g
      lastB = model.nodes[numNodes - 1].b
    }

    var x = 0.0
    var x1 = 0.0
    var x2 = 0.0
    var rgb1 = [0.0, 0.0, 0.0]
    var rgb2 = [0.0, 0.0, 0.0]
    var midpoint = 0.0
    var sharpness = 0.0
    var tmpVec = [] // If the scale is logarithmic, make sure the range is valid.

    var usingLogScale = model.scale === Scale.LOG10

    if (usingLogScale) {
      // Note: This requires range[0] <= range[1].
      usingLogScale = model.mappingRange[0] > 0.0
    }

    var logStart = 0.0
    var logEnd = 0.0
    var logX = 0.0

    if (usingLogScale) {
      logStart = Math.log10(xStart)
      logEnd = Math.log10(xEnd)
    } // For each table entry

    for (var _i = 0; _i < size; _i++) {
      // Find our location in the table
      var tidx = 3 * _i // Find our X location. If we are taking only 1 sample, make
      // it halfway between start and end (usually start and end will
      // be the same in this case)

      if (size > 1) {
        if (usingLogScale) {
          logX = logStart + (_i / (size - 1.0)) * (logEnd - logStart)
          x = Math.pow(10.0, logX)
        } else {
          x = xStart + (_i / (size - 1.0)) * (xEnd - xStart)
        }
      } else if (usingLogScale) {
        logX = 0.5 * (logStart + logEnd)
        x = Math.pow(10.0, logX)
      } else {
        x = 0.5 * (xStart + xEnd)
      } // Linearly map x from mappingRange to [0, numberOfValues-1],
      // discretize (round down to the closest integer),
      // then map back to mappingRange

      if (model.discretize) {
        var range = model.mappingRange

        if (x >= range[0] && x <= range[1]) {
          var numberOfValues = model.numberOfValues
          var deltaRange = range[1] - range[0]

          if (numberOfValues <= 1) {
            x = range[0] + deltaRange / 2.0
          } else {
            // normalize x
            var xn = (x - range[0]) / deltaRange // discretize

            var discretizeIndex = floor(numberOfValues * xn) // get discretized x

            x = range[0] + (discretizeIndex / (numberOfValues - 1)) * deltaRange
          }
        }
      } // Do we need to move to the next node?

      while (idx < numNodes && x > model.nodes[idx].x) {
        idx++ // If we are at a valid point index, fill in
        // the value at this node, and the one before (the
        // two that surround our current sample location)
        // idx cannot be 0 since we just incremented it.

        if (idx < numNodes) {
          x1 = model.nodes[idx - 1].x
          x2 = model.nodes[idx].x

          if (usingLogScale) {
            x1 = Math.log10(x1)
            x2 = Math.log10(x2)
          }

          rgb1[0] = model.nodes[idx - 1].r
          rgb2[0] = model.nodes[idx].r
          rgb1[1] = model.nodes[idx - 1].g
          rgb2[1] = model.nodes[idx].g
          rgb1[2] = model.nodes[idx - 1].b
          rgb2[2] = model.nodes[idx].b // We only need the previous midpoint and sharpness
          // since these control this region

          midpoint = model.nodes[idx - 1].midpoint
          sharpness = model.nodes[idx - 1].sharpness // Move midpoint away from extreme ends of range to avoid
          // degenerate math

          if (midpoint < 0.00001) {
            midpoint = 0.00001
          }

          if (midpoint > 0.99999) {
            midpoint = 0.99999
          }
        }
      } // Are we at or past the end? If so, just use the last value

      if (x > model.mappingRange[1]) {
        table[tidx] = 0.0
        table[tidx + 1] = 0.0
        table[tidx + 2] = 0.0

        if (model.clamping) {
          if (publicAPI.getUseAboveRangeColor()) {
            table[tidx] = model.aboveRangeColor[0]
            table[tidx + 1] = model.aboveRangeColor[1]
            table[tidx + 2] = model.aboveRangeColor[2]
          } else {
            table[tidx] = lastR
            table[tidx + 1] = lastG
            table[tidx + 2] = lastB
          }
        }
      } else if (x < model.mappingRange[0] || (isInf(x) && x < 0)) {
        // we are before the first node? If so, duplicate this node's values.
        // We have to deal with -inf here
        table[tidx] = 0.0
        table[tidx + 1] = 0.0
        table[tidx + 2] = 0.0

        if (model.clamping) {
          if (publicAPI.getUseBelowRangeColor()) {
            table[tidx] = model.belowRangeColor[0]
            table[tidx + 1] = model.belowRangeColor[1]
            table[tidx + 2] = model.belowRangeColor[2]
          } else if (numNodes > 0) {
            table[tidx] = model.nodes[0].r
            table[tidx + 1] = model.nodes[0].g
            table[tidx + 2] = model.nodes[0].b
          }
        }
      } else if (
        idx === 0 &&
        (Math.abs(x - xStart) < 1e-6 || model.discretize)
      ) {
        if (numNodes > 0) {
          table[tidx] = model.nodes[0].r
          table[tidx + 1] = model.nodes[0].g
          table[tidx + 2] = model.nodes[0].b
        } else {
          table[tidx] = 0.0
          table[tidx + 1] = 0.0
          table[tidx + 2] = 0.0
        }
      } else {
        // OK, we are between two nodes - interpolate
        // Our first attempt at a normalized location [0,1] -
        // we will be modifying this based on midpoint and
        // sharpness to get the curve shape we want and to have
        // it pass through (y1+y2)/2 at the midpoint.
        var s = 0.0

        if (usingLogScale) {
          s = (logX - x1) / (x2 - x1)
        } else {
          s = (x - x1) / (x2 - x1)
        } // Readjust based on the midpoint - linear adjustment

        if (s < midpoint) {
          s = (0.5 * s) / midpoint
        } else {
          s = 0.5 + (0.5 * (s - midpoint)) / (1.0 - midpoint)
        } // override for sharpness > 0.99
        // In this case we just want piecewise constant

        if (sharpness > 0.99) {
          // Use the first value since we are below the midpoint
          if (s < 0.5) {
            table[tidx] = rgb1[0]
            table[tidx + 1] = rgb1[1]
            table[tidx + 2] = rgb1[2]
            continue
          } else {
            // Use the second value at or above the midpoint
            table[tidx] = rgb2[0]
            table[tidx + 1] = rgb2[1]
            table[tidx + 2] = rgb2[2]
            continue
          }
        } // Override for sharpness < 0.01
        // In this case we want piecewise linear

        if (sharpness < 0.01) {
          // Simple linear interpolation
          if (model.colorSpace === ColorSpace.RGB) {
            table[tidx] = (1 - s) * rgb1[0] + s * rgb2[0]
            table[tidx + 1] = (1 - s) * rgb1[1] + s * rgb2[1]
            table[tidx + 2] = (1 - s) * rgb1[2] + s * rgb2[2]
          } else if (model.colorSpace === ColorSpace.HSV) {
            var hsv1 = []
            var hsv2 = []
            rgb2hsv(rgb1, hsv1)
            rgb2hsv(rgb2, hsv2)

            if (
              model.hSVWrap &&
              (hsv1[0] - hsv2[0] > 0.5 || hsv2[0] - hsv1[0] > 0.5)
            ) {
              if (hsv1[0] > hsv2[0]) {
                hsv1[0] -= 1.0
              } else {
                hsv2[0] -= 1.0
              }
            }

            var hsvTmp = []
            hsvTmp[0] = (1.0 - s) * hsv1[0] + s * hsv2[0]

            if (hsvTmp[0] < 0.0) {
              hsvTmp[0] += 1.0
            }

            hsvTmp[1] = (1.0 - s) * hsv1[1] + s * hsv2[1]
            hsvTmp[2] = (1.0 - s) * hsv1[2] + s * hsv2[2] // Now convert this back to RGB

            hsv2rgb(hsvTmp, tmpVec)
            table[tidx] = tmpVec[0]
            table[tidx + 1] = tmpVec[1]
            table[tidx + 2] = tmpVec[2]
          } else if (model.colorSpace === ColorSpace.LAB) {
            var lab1 = []
            var lab2 = []
            rgb2lab(rgb1, lab1)
            rgb2lab(rgb2, lab2)
            var labTmp = []
            labTmp[0] = (1 - s) * lab1[0] + s * lab2[0]
            labTmp[1] = (1 - s) * lab1[1] + s * lab2[1]
            labTmp[2] = (1 - s) * lab1[2] + s * lab2[2] // Now convert back to RGB

            lab2rgb(labTmp, tmpVec)
            table[tidx] = tmpVec[0]
            table[tidx + 1] = tmpVec[1]
            table[tidx + 2] = tmpVec[2]
          } else if (model.colorSpace === ColorSpace.DIVERGING) {
            vtkColorTransferFunctionInterpolateDiverging(s, rgb1, rgb2, tmpVec)
            table[tidx] = tmpVec[0]
            table[tidx + 1] = tmpVec[1]
            table[tidx + 2] = tmpVec[2]
          } else {
            vtkErrorMacro('ColorSpace set to invalid value.', model.colorSpace)
          }

          continue
        } // We have a sharpness between [0.01, 0.99] - we will
        // used a modified hermite curve interpolation where we
        // derive the slope based on the sharpness, and we compress
        // the curve non-linearly based on the sharpness
        // First, we will adjust our position based on sharpness in
        // order to make the curve sharper (closer to piecewise constant)

        if (s < 0.5) {
          s = 0.5 * Math.pow(s * 2.0, 1.0 + 10.0 * sharpness)
        } else if (s > 0.5) {
          s = 1.0 - 0.5 * Math.pow((1.0 - s) * 2, 1 + 10.0 * sharpness)
        } // Compute some coefficients we will need for the hermite curve

        var ss = s * s
        var sss = ss * s
        var h1 = 2.0 * sss - 3 * ss + 1
        var h2 = -2 * sss + 3 * ss
        var h3 = sss - 2 * ss + s
        var h4 = sss - ss
        var slope = void 0
        var t = void 0

        if (model.colorSpace === ColorSpace.RGB) {
          for (var j = 0; j < 3; j++) {
            // Use one slope for both end points
            slope = rgb2[j] - rgb1[j]
            t = (1.0 - sharpness) * slope // Compute the value

            table[tidx + j] = h1 * rgb1[j] + h2 * rgb2[j] + h3 * t + h4 * t
          }
        } else if (model.colorSpace === ColorSpace.HSV) {
          var _hsv = []
          var _hsv2 = []
          rgb2hsv(rgb1, _hsv)
          rgb2hsv(rgb2, _hsv2)

          if (
            model.hSVWrap &&
            (_hsv[0] - _hsv2[0] > 0.5 || _hsv2[0] - _hsv[0] > 0.5)
          ) {
            if (_hsv[0] > _hsv2[0]) {
              _hsv[0] -= 1.0
            } else {
              _hsv2[0] -= 1.0
            }
          }

          var _hsvTmp = []

          for (var _j = 0; _j < 3; _j++) {
            // Use one slope for both end points
            slope = _hsv2[_j] - _hsv[_j]
            t = (1.0 - sharpness) * slope // Compute the value

            _hsvTmp[_j] = h1 * _hsv[_j] + h2 * _hsv2[_j] + h3 * t + h4 * t

            if (_j === 0 && _hsvTmp[_j] < 0.0) {
              _hsvTmp[_j] += 1.0
            }
          } // Now convert this back to RGB

          hsv2rgb(_hsvTmp, tmpVec)
          table[tidx] = tmpVec[0]
          table[tidx + 1] = tmpVec[1]
          table[tidx + 2] = tmpVec[2]
        } else if (model.colorSpace === ColorSpace.LAB) {
          var _lab = []
          var _lab2 = []
          rgb2lab(rgb1, _lab)
          rgb2lab(rgb2, _lab2)
          var _labTmp = []

          for (var _j2 = 0; _j2 < 3; _j2++) {
            // Use one slope for both end points
            slope = _lab2[_j2] - _lab[_j2]
            t = (1.0 - sharpness) * slope // Compute the value

            _labTmp[_j2] = h1 * _lab[_j2] + h2 * _lab2[_j2] + h3 * t + h4 * t
          } // Now convert this back to RGB

          lab2rgb(_labTmp, tmpVec)
          table[tidx] = tmpVec[0]
          table[tidx + 1] = tmpVec[1]
          table[tidx + 2] = tmpVec[2]
        } else if (model.colorSpace === ColorSpace.DIVERGING) {
          // I have not implemented proper interpolation by a hermite curve for
          // the diverging color map, but I cannot think of a good use case for
          // that anyway.
          vtkColorTransferFunctionInterpolateDiverging(s, rgb1, rgb2, tmpVec)
          table[tidx] = tmpVec[0]
          table[tidx + 1] = tmpVec[1]
          table[tidx + 2] = tmpVec[2]
        } else {
          vtkErrorMacro('ColorSpace set to invalid value.')
        } // Final error check to make sure we don't go outside [0,1]

        for (var _j3 = 0; _j3 < 3; _j3++) {
          table[tidx + _j3] = table[tidx + _j3] < 0.0 ? 0.0 : table[tidx + _j3]
          table[tidx + _j3] = table[tidx + _j3] > 1.0 ? 1.0 : table[tidx + _j3]
        }
      }
    }
  } //----------------------------------------------------------------------------

  publicAPI.getUint8Table = function(xStart, xEnd, size) {
    var withAlpha =
      arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : false

    if (
      publicAPI.getMTime() <= model.buildTime &&
      model.tableSize === size &&
      model.tableWithAlpha !== withAlpha
    ) {
      return model.table
    }

    if (model.nodes.length === 0) {
      vtkErrorMacro(
        'Attempting to lookup a value with no points in the function'
      )
      return model.table
    }

    var nbChannels = withAlpha ? 4 : 3

    if (model.tableSize !== size || model.tableWithAlpha !== withAlpha) {
      model.table = new Uint8Array(size * nbChannels)
      model.tableSize = size
      model.tableWithAlpha = withAlpha
    }

    var tmpTable = []
    publicAPI.getTable(xStart, xEnd, size, tmpTable)

    for (var i = 0; i < size; i++) {
      model.table[i * nbChannels + 0] = Math.floor(
        tmpTable[i * 3 + 0] * 255.0 + 0.5
      )
      model.table[i * nbChannels + 1] = Math.floor(
        tmpTable[i * 3 + 1] * 255.0 + 0.5
      )
      model.table[i * nbChannels + 2] = Math.floor(
        tmpTable[i * 3 + 2] * 255.0 + 0.5
      )

      if (withAlpha) {
        model.table[i * nbChannels + 3] = 255
      }
    }

    model.buildTime.modified()
    return model.table
  } //----------------------------------------------------------------------------

  publicAPI.buildFunctionFromTable = function(xStart, xEnd, size, table) {
    var inc = 0.0
    publicAPI.removeAllPoints()

    if (size > 1) {
      inc = (xEnd - xStart) / (size - 1.0)
    }

    for (var i = 0; i < size; i++) {
      var node = {
        x: xStart + inc * i,
        r: table[i * 3],
        g: table[i * 3 + 1],
        b: table[i * 3 + 2],
        sharpness: 0.0,
        midpoint: 0.5,
      }
      model.nodes.push(node)
    }

    publicAPI.sortAndUpdateRange()
  } //----------------------------------------------------------------------------
  // For a specified index value, get the node parameters

  publicAPI.getNodeValue = function(index, val) {
    if (index < 0 || index >= model.nodes.length) {
      vtkErrorMacro('Index out of range!')
      return -1
    }

    val[0] = model.nodes[index].x
    val[1] = model.nodes[index].r
    val[2] = model.nodes[index].g
    val[3] = model.nodes[index].b
    val[4] = model.nodes[index].midpoint
    val[5] = model.nodes[index].sharpness
    return 1
  } //----------------------------------------------------------------------------
  // For a specified index value, get the node parameters

  publicAPI.setNodeValue = function(index, val) {
    if (index < 0 || index >= model.nodes.length) {
      vtkErrorMacro('Index out of range!')
      return -1
    }

    var oldX = model.nodes[index].x
    model.nodes[index].x = val[0]
    model.nodes[index].r = val[1]
    model.nodes[index].g = val[2]
    model.nodes[index].b = val[3]
    model.nodes[index].midpoint = val[4]
    model.nodes[index].sharpness = val[5]

    if (oldX !== val[0]) {
      // The point has been moved, the order of points or the range might have
      // been modified.
      publicAPI.sortAndUpdateRange() // No need to call Modified() here because SortAndUpdateRange() has done it
      // already.
    } else {
      publicAPI.modified()
    }

    return 1
  } //----------------------------------------------------------------------------

  publicAPI.getNumberOfAvailableColors = function() {
    if (model.indexedLookup && publicAPI.getSize()) {
      return publicAPI.getSize()
    }

    if (model.tableSize) {
      // Not sure if this is correct since it is only set if
      // "const unsigned char *::GetTable(double xStart, double xEnd,int size)"
      // has been called.
      return model.tableSize
    }

    return 16777216 // 2^24
  } //----------------------------------------------------------------------------

  publicAPI.getIndexedColor = function(idx, rgba) {
    var n = publicAPI.getSize()

    if (n > 0 && idx >= 0) {
      var nodeValue = []
      publicAPI.getNodeValue(idx % n, nodeValue)

      for (var j = 0; j < 3; ++j) {
        rgba[j] = nodeValue[j + 1]
      }

      rgba[3] = 1.0 // NodeColor is RGB-only.

      return
    }

    publicAPI.getNanColor(rgba)
    rgba[3] = 1.0 // NanColor is RGB-only.
  } //----------------------------------------------------------------------------

  publicAPI.fillFromDataPointer = function(nb, ptr) {
    if (nb <= 0 || !ptr) {
      return
    }

    publicAPI.removeAllPoints()

    for (var i = 0; i < nb; i++) {
      publicAPI.addRGBPoint(
        ptr[i * 4],
        ptr[i * 4 + 1],
        ptr[i * 4 + 2],
        ptr[i * 4 + 3]
      )
    }
  } //----------------------------------------------------------------------------

  publicAPI.setMappingRange = function(min, max) {
    var range = [min, max]
    var originalRange = publicAPI.getRange()

    if (originalRange[1] === range[1] && originalRange[0] === range[0]) {
      return
    }

    if (range[1] === range[0]) {
      vtkErrorMacro('attempt to set zero width color range')
      return
    }

    var scale = (range[1] - range[0]) / (originalRange[1] - originalRange[0])
    var shift = range[0] - originalRange[0] * scale

    for (var i = 0; i < model.nodes.length; ++i) {
      model.nodes[i].x = model.nodes[i].x * scale + shift
    }

    model.mappingRange[0] = range[0]
    model.mappingRange[1] = range[1]
    publicAPI.modified()
  } //----------------------------------------------------------------------------

  publicAPI.adjustRange = function(range) {
    var functionRange = publicAPI.getRange() // Make sure we have points at each end of the range

    var rgb = []

    if (functionRange[0] < range[0]) {
      publicAPI.getColor(range[0], rgb)
      publicAPI.addRGBPoint(range[0], rgb[0], rgb[1], rgb[2])
    } else {
      publicAPI.getColor(functionRange[0], rgb)
      publicAPI.addRGBPoint(range[0], rgb[0], rgb[1], rgb[2])
    }

    if (functionRange[1] > range[1]) {
      publicAPI.getColor(range[1], rgb)
      publicAPI.addRGBPoint(range[1], rgb[0], rgb[1], rgb[2])
    } else {
      publicAPI.getColor(functionRange[1], rgb)
      publicAPI.addRGBPoint(range[1], rgb[0], rgb[1], rgb[2])
    } // Remove all points out-of-range

    publicAPI.sortAndUpdateRange()

    for (var i = 0; i < model.nodes.length; ) {
      if (model.nodes[i].x >= range[0] && model.nodes[i].x <= range[1]) {
        model.nodes.splice(i, 1)
      } else {
        ++i
      }
    }

    return 1
  } //--------------------------------------------------------------------------

  publicAPI.estimateMinNumberOfSamples = function(x1, x2) {
    var d = publicAPI.findMinimumXDistance()
    return Math.ceil((x2 - x1) / d)
  } //----------------------------------------------------------------------------

  publicAPI.findMinimumXDistance = function() {
    if (model.nodes.length < 2) {
      return -1.0
    }

    var distance = Number.MAX_VALUE

    for (var i = 0; i < model.nodes.length - 1; i++) {
      var currentDist = model.nodes[i + 1].x - model.nodes[i].x

      if (currentDist < distance) {
        distance = currentDist
      }
    }

    return distance
  }

  publicAPI.mapScalarsThroughTable = function(
    input,
    output,
    outFormat,
    inputOffset
  ) {
    if (publicAPI.getSize() === 0) {
      vtkDebugMacro('Transfer Function Has No Points!')
      return
    }

    if (model.indexedLookup) {
      publicAPI.mapDataIndexed(input, output, outFormat, inputOffset)
    } else {
      publicAPI.mapData(input, output, outFormat, inputOffset)
    }
  } //----------------------------------------------------------------------------

  publicAPI.mapData = function(input, output, outFormat, inputOffset) {
    if (publicAPI.getSize() === 0) {
      vtkWarningMacro('Transfer Function Has No Points!')
      return
    }

    var alpha = Math.floor(publicAPI.getAlpha() * 255.0 + 0.5)
    var length = input.getNumberOfTuples()
    var inIncr = input.getNumberOfComponents()
    var outputV = output.getData()
    var inputV = input.getData()
    var rgb = []

    if (outFormat === ScalarMappingTarget.RGBA) {
      for (var i = 0; i < length; i++) {
        var x = inputV[i * inIncr + inputOffset]
        publicAPI.getColor(x, rgb)
        outputV[i * 4] = Math.floor(rgb[0] * 255.0 + 0.5)
        outputV[i * 4 + 1] = Math.floor(rgb[1] * 255.0 + 0.5)
        outputV[i * 4 + 2] = Math.floor(rgb[2] * 255.0 + 0.5)
        outputV[i * 4 + 3] = alpha
      }
    }

    if (outFormat === ScalarMappingTarget.RGB) {
      for (var _i2 = 0; _i2 < length; _i2++) {
        var _x = inputV[_i2 * inIncr + inputOffset]
        publicAPI.getColor(_x, rgb)
        outputV[_i2 * 3] = Math.floor(rgb[0] * 255.0 + 0.5)
        outputV[_i2 * 3 + 1] = Math.floor(rgb[1] * 255.0 + 0.5)
        outputV[_i2 * 3 + 2] = Math.floor(rgb[2] * 255.0 + 0.5)
      }
    }

    if (outFormat === ScalarMappingTarget.LUMINANCE) {
      for (var _i3 = 0; _i3 < length; _i3++) {
        var _x2 = inputV[_i3 * inIncr + inputOffset]
        publicAPI.getColor(_x2, rgb)
        outputV[_i3] = Math.floor(
          rgb[0] * 76.5 + rgb[1] * 150.45 + rgb[2] * 28.05 + 0.5
        )
      }
    }

    if (outFormat === ScalarMappingTarget.LUMINANCE_ALPHA) {
      for (var _i4 = 0; _i4 < length; _i4++) {
        var _x3 = inputV[_i4 * inIncr + inputOffset]
        publicAPI.getColor(_x3, rgb)
        outputV[_i4 * 2] = Math.floor(
          rgb[0] * 76.5 + rgb[1] * 150.45 + rgb[2] * 28.05 + 0.5
        )
        outputV[_i4 * 2 + 1] = alpha
      }
    }
  } //----------------------------------------------------------------------------

  publicAPI.applyColorMap = function(colorMap) {
    if (colorMap.ColorSpace) {
      model.colorSpace = ColorSpace[colorMap.ColorSpace.toUpperCase()]

      if (model.colorSpace === undefined) {
        vtkErrorMacro(
          'ColorSpace '.concat(
            colorMap.ColorSpace,
            ' not supported, using RGB instead'
          )
        )
        model.colorSpace = ColorSpace.RGB
      }
    }

    if (colorMap.NanColor) {
      model.nanColor = [].concat(colorMap.NanColor)

      while (model.nanColor.length < 4) {
        model.nanColor.push(1.0)
      }
    }

    if (colorMap.RGBPoints) {
      var size = colorMap.RGBPoints.length
      model.nodes = []
      var midpoint = 0.5
      var sharpness = 0.0

      for (var i = 0; i < size; i += 4) {
        model.nodes.push({
          x: colorMap.RGBPoints[i],
          r: colorMap.RGBPoints[i + 1],
          g: colorMap.RGBPoints[i + 2],
          b: colorMap.RGBPoints[i + 3],
          midpoint: midpoint,
          sharpness: sharpness,
        })
      }
    } // FIXME: not supported ?
    // if (colorMap.IndexedColors) {
    // }
    // if (colorMap.Annotations) {
    // }

    publicAPI.sortAndUpdateRange()
  }
} // ----------------------------------------------------------------------------
// Object factory
// ----------------------------------------------------------------------------

var DEFAULT_VALUES$5 = {
  clamping: true,
  colorSpace: ColorSpace.RGB,
  hSVWrap: true,
  scale: Scale.LINEAR,
  nanColor: null,
  belowRangeColor: null,
  aboveRangeColor: null,
  useAboveRangeColor: false,
  useBelowRangeColor: false,
  allowDuplicateScalars: false,
  table: null,
  tableSize: 0,
  buildTime: null,
  nodes: null,
  discretize: false,
  numberOfValues: 256,
} // ----------------------------------------------------------------------------

function extend$5(publicAPI, model) {
  var initialValues =
    arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {}
  Object.assign(model, DEFAULT_VALUES$5, initialValues) // Inheritance

  vtkScalarsToColors$1.extend(publicAPI, model, initialValues) // Internal objects initialization

  model.table = []
  model.nodes = []
  model.nanColor = [0.5, 0.0, 0.0, 1.0]
  model.belowRangeColor = [0.0, 0.0, 0.0, 1.0]
  model.aboveRangeColor = [1.0, 1.0, 1.0, 1.0]
  model.buildTime = {}
  macro.obj(model.buildTime) // Create get-only macros

  macro.get(publicAPI, model, ['buildTime', 'mappingRange']) // Create get-set macros

  macro.setGet(publicAPI, model, [
    'useAboveRangeColor',
    'useBelowRangeColor',
    'colorSpace',
    'discretize',
    'numberOfValues',
  ])
  macro.setArray(
    publicAPI,
    model,
    ['nanColor', 'belowRangeColor', 'aboveRangeColor'],
    4
  ) // Create get macros for array

  macro.getArray(publicAPI, model, [
    'nanColor',
    'belowRangeColor',
    'aboveRangeColor',
  ]) // For more macro methods, see "Sources/macros.js"
  // Object specific methods

  vtkColorTransferFunction(publicAPI, model)
} // ----------------------------------------------------------------------------

var newInstance$4 = macro.newInstance(extend$5, 'vtkColorTransferFunction') // ----------------------------------------------------------------------------

var vtkColorTransferFunction$1 = _objectSpread$1(
  {
    newInstance: newInstance$4,
    extend: extend$5,
  },
  Constants$1
)

var Mode$1 = {
  Preset: 0,
  RGBPoints: 1,
  HSVPoints: 2,
  Nodes: 3,
}
var Defaults$1 = {
  Preset: 'Cool to Warm',
  RGBPoints: [
    [0, 0, 0, 0],
    [1, 1, 1, 1],
  ],
  HSVPoints: [
    [0, 0, 0, 0],
    [1, 0, 0, 1],
  ],
  Nodes: [
    {
      x: 0,
      r: 0,
      g: 0,
      b: 0,
      midpoint: 0.5,
      sharpness: 0,
    },
    {
      x: 1,
      r: 1,
      g: 1,
      b: 1,
      midpoint: 0.5,
      sharpness: 0,
    },
  ],
}
var Constants = {
  Defaults: Defaults$1,
  Mode: Mode$1,
}

var Mode = Constants.Mode,
  Defaults = Constants.Defaults // ----------------------------------------------------------------------------
// vtkLookupTableProxy methods
// ----------------------------------------------------------------------------

function vtkLookupTableProxy(publicAPI, model) {
  // Set our className
  model.classHierarchy.push('vtkLookupTableProxy')
  model.lookupTable =
    model.lookupTable || vtkColorTransferFunction$1.newInstance() // Initialize lookup table

  model.lookupTable.setVectorModeToMagnitude() // Takes a preset colormap name

  publicAPI.setPresetName = function(presetName) {
    if (model.presetName !== presetName) {
      model.presetName = presetName
      model.mode = Mode.Preset
      publicAPI.applyMode()
    }
  } // Takes an array of points [x, r, g, b, m=0.5, s=0.0]

  publicAPI.setRGBPoints = function(rgbPoints) {
    if (model.rgbPoints !== rgbPoints) {
      model.rgbPoints = (rgbPoints || Defaults.RGBPoints).slice()
      publicAPI.applyMode()
    }
  } // Takes an array of points [x, h, s, v, m=0.5, s=0.0]

  publicAPI.setHSVPoints = function(hsvPoints) {
    if (model.hsvPoints !== hsvPoints) {
      model.hsvPoints = (hsvPoints || Defaults.HSVPoints).slice()
      publicAPI.applyMode()
    }
  } // Takes an array of ColorTransferFunction nodes

  publicAPI.setNodes = function(nodes) {
    if (model.nodes !== nodes) {
      model.nodes = (nodes || Defaults.Nodes).slice()
      publicAPI.applyMode()
    }
  }

  publicAPI.setMode = function(mode) {
    if (model.mode !== mode) {
      model.mode = mode
      publicAPI.applyMode()
    }
  }

  publicAPI.applyMode = function() {
    switch (model.mode) {
      case Mode.Preset:
        {
          var preset = vtkColorMaps.getPresetByName(model.presetName)

          if (preset) {
            model.lookupTable.applyColorMap(preset)
          }
        }
        break

      case Mode.RGBPoints:
        model.lookupTable.removeAllPoints()
        model.rgbPoints.forEach(function(point) {
          var _model$lookupTable

          return (_model$lookupTable = model.lookupTable).addRGBPointLong.apply(
            _model$lookupTable,
            _toConsumableArray(point)
          )
        })
        break

      case Mode.HSVPoints:
        model.lookupTable.removeAllPoints()
        model.hsvPoints.forEach(function(point) {
          var _model$lookupTable2

          return (_model$lookupTable2 =
            model.lookupTable).addHSVPointLong.apply(
            _model$lookupTable2,
            _toConsumableArray(point)
          )
        })
        break

      case Mode.Nodes:
        model.lookupTable.setNodes(model.nodes)
        break
    }

    model.lookupTable.setMappingRange(model.dataRange[0], model.dataRange[1])
    model.lookupTable.updateRange()
    publicAPI.modified()
  }

  publicAPI.setDataRange = function(min, max) {
    if (model.dataRange[0] !== min || model.dataRange[1] !== max) {
      model.dataRange[0] = min
      model.dataRange[1] = max
      model.lookupTable.setMappingRange(model.dataRange[0], model.dataRange[1])
      model.lookupTable.updateRange()
      publicAPI.applyMode()
    }
  } // Initialization ------------------------------------------------------------

  publicAPI.applyMode()
} // ----------------------------------------------------------------------------
// Object factory
// ----------------------------------------------------------------------------

var DEFAULT_VALUES$4 = {
  mode: Mode.Preset,
  presetName: Defaults.Preset,
  rgbPoints: Defaults.RGBPoints,
  hsvPoints: Defaults.HSVPoints,
  nodes: Defaults.Nodes,
  arrayName: 'No array associated',
  arrayLocation: 'pointData',
  dataRange: [0, 1],
} // ----------------------------------------------------------------------------

function extend$4(publicAPI, model) {
  var initialValues =
    arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {}
  Object.assign(model, DEFAULT_VALUES$4, initialValues)
  macro.obj(publicAPI, model)
  macro.setGet(publicAPI, model, ['arrayName'])
  macro.get(publicAPI, model, [
    'mode',
    'lookupTable',
    'presetName',
    'rgbPoints',
    'hsvPoints',
    'nodes',
    'dataRange',
  ]) // Object specific methods

  vtkLookupTableProxy(publicAPI, model) // Proxy handling

  macro.proxy(publicAPI, model)
} // ----------------------------------------------------------------------------

var newInstance$3 = macro.newInstance(extend$4, 'vtkLookupTableProxy') // ----------------------------------------------------------------------------

var vtkLookupTableProxy$1 = {
  newInstance: newInstance$3,
  extend: extend$4,
  Mode: Mode,
  Defaults: Defaults,
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
      type: 'IMAGE_COLOR_MAP_CHANGED',
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

var DEFAULT_VALUES$3 = {
  button: 1,
  shift: false,
  control: false,
  alt: false,
  dragEnabled: true,
  scrollEnabled: false,
} // ----------------------------------------------------------------------------

function extend$3(publicAPI, model) {
  var initialValues =
    arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {}
  Object.assign(model, DEFAULT_VALUES$3, initialValues) // Create get-set macros

  macro.setGet(publicAPI, model, ['button', 'shift', 'control', 'alt'])
  macro.set(publicAPI, model, ['dragEnabled', 'scrollEnabled']) // Object specific methods

  vtkCompositeMouseManipulator(publicAPI, model)
} // ----------------------------------------------------------------------------

var vtkCompositeMouseManipulator$1 = {
  extend: extend$3,
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

var DEFAULT_VALUES$2 = {
  horizontalListener: null,
  verticalListener: null,
  scrollListener: null,
} // ----------------------------------------------------------------------------

function extend$2(publicAPI, model) {
  var initialValues =
    arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {}
  Object.assign(model, DEFAULT_VALUES$2, initialValues) // Inheritance

  macro.obj(publicAPI, model)
  vtkCompositeMouseManipulator$1.extend(publicAPI, model, initialValues) // Create get-set macros

  macro.setGet(publicAPI, model, ['usePointerLock']) // Object specific methods

  vtkMouseRangeManipulator(publicAPI, model)
} // ----------------------------------------------------------------------------

var newInstance$2 = macro.newInstance(extend$2, 'vtkMouseRangeManipulator') // ----------------------------------------------------------------------------

var vtkMouseRangeManipulator$1 = {
  newInstance: newInstance$2,
  extend: extend$2,
}

class TinyEmitter$1 {
  constructor() {
    Object.defineProperty(this, '__listeners', {
      value: {},
      enumerable: false,
      writable: false,
    })
  }

  emit(eventName, ...args) {
    if (!this.__listeners[eventName]) return this

    for (const handler of this.__listeners[eventName]) {
      handler(...args)
    }

    return this
  }

  once(eventName, handler) {
    const once = (...args) => {
      this.off(eventName, once)
      handler(...args)
    }

    return this.on(eventName, once)
  }

  on(eventName, handler) {
    if (!this.__listeners[eventName]) this.__listeners[eventName] = []

    this.__listeners[eventName].push(handler)

    return this
  }

  off(eventName, handler) {
    if (handler)
      this.__listeners[eventName] = this.__listeners[eventName].filter(
        h => h !== handler
      )
    else this.__listeners[eventName] = []

    return this
  }
}

var tinyEmitter = TinyEmitter$1

const TinyEmitter = tinyEmitter

const MESSAGE_RESULT = 0
const MESSAGE_EVENT = 1
const RESULT_SUCCESS = 1

class Worker$1 extends TinyEmitter {
  /**
   *
   * @param worker {Worker}
   */
  constructor(worker) {
    super()

    this._messageId = 1
    this._messages = new Map()

    this._worker = worker
    this._worker.onmessage = this._onMessage.bind(this)
    this._id = Math.ceil(Math.random() * 10000000)
  }

  terminate() {
    this._worker.terminate()
  }

  /**
   * return true if there is no unresolved jobs
   * @returns {boolean}
   */
  isFree() {
    return this._messages.size === 0
  }

  jobsLength() {
    return this._messages.size
  }

  /**
   * @param operationName string
   * @param data any
   * @param transferable array
   * @param onEvent function
   * @returns {Promise}
   */
  exec(operationName, data = null, transferable = [], onEvent) {
    return new Promise((res, rej) => {
      const messageId = this._messageId++
      this._messages.set(messageId, [res, rej, onEvent])
      this._worker.postMessage(
        [messageId, data, operationName],
        transferable || []
      )
    })
  }

  /**
   *
   * @param data any
   * @param transferable array
   * @param onEvent function
   * @returns {Promise}
   */
  postMessage(data = null, transferable = [], onEvent) {
    return new Promise((res, rej) => {
      const messageId = this._messageId++
      this._messages.set(messageId, [res, rej, onEvent])
      this._worker.postMessage([messageId, data], transferable || [])
    })
  }

  emit(eventName, ...args) {
    this._worker.postMessage({ eventName, args })
  }

  _onMessage(e) {
    //if we got usual event, just emit it locally
    if (!Array.isArray(e.data) && e.data.eventName) {
      return super.emit(e.data.eventName, ...e.data.args)
    }

    const [type, ...args] = e.data

    if (type === MESSAGE_EVENT) this._onEvent(...args)
    else if (type === MESSAGE_RESULT) this._onResult(...args)
    else throw new Error(`Wrong message type '${type}'`)
  }

  _onResult(messageId, success, payload) {
    const [res, rej] = this._messages.get(messageId)
    this._messages.delete(messageId)

    return success === RESULT_SUCCESS ? res(payload) : rej(payload)
  }

  _onEvent(messageId, eventName, data) {
    const [, , onEvent] = this._messages.get(messageId)

    if (onEvent) {
      onEvent(eventName, data)
    }
  }
}

var src = Worker$1

function funcToSource(fn, sourcemapArg) {
  var sourcemap = sourcemapArg === undefined ? null : sourcemapArg
  var regex = /(['"])__worker_loader_strict__(['"])/g
  var lines = []

  // instead of extracting the function source code, just return the function as if it's being evaluated
  // by the caller.
  var source = fn.toString()
  source = source.replace(regex, '$1use strict$2')
  lines.push('(' + source + ')()')

  if (sourcemap) {
    lines.push('//# sourceMappingURL=' + sourcemap + '\n')
  }
  return lines
}

function createURL(fn, sourcemapArg) {
  var lines = funcToSource(fn, sourcemapArg)
  var blob = new Blob(lines, { type: 'application/javascript' })
  return URL.createObjectURL(blob)
}

function createInlineWorkerFactory(fn, sourcemapArg) {
  var url
  return function WorkerFactory(options) {
    url = url || createURL(fn, sourcemapArg)
    return new Worker(url, options)
  }
}

var WorkerFactory = createInlineWorkerFactory(
  /* rollup-plugin-web-worker-loader */ function() {
    ;(function() {
      '__worker_loader_strict__'

      var register = { exports: {} }

      var _createClass$1 = (function() {
        function defineProperties(target, props) {
          for (var i = 0; i < props.length; i++) {
            var descriptor = props[i]
            descriptor.enumerable = descriptor.enumerable || false
            descriptor.configurable = true
            if ('value' in descriptor) descriptor.writable = true
            Object.defineProperty(target, descriptor.key, descriptor)
          }
        }
        return function(Constructor, protoProps, staticProps) {
          if (protoProps) defineProperties(Constructor.prototype, protoProps)
          if (staticProps) defineProperties(Constructor, staticProps)
          return Constructor
        }
      })()

      function _classCallCheck$1(instance, Constructor) {
        if (!(instance instanceof Constructor)) {
          throw new TypeError('Cannot call a class as a function')
        }
      }

      var TinyEmitter$1 = (function() {
        function TinyEmitter() {
          _classCallCheck$1(this, TinyEmitter)

          Object.defineProperty(this, '__listeners', {
            value: {},
            enumerable: false,
            writable: false,
          })
        }

        _createClass$1(TinyEmitter, [
          {
            key: 'emit',
            value: function emit(eventName) {
              if (!this.__listeners[eventName]) return this

              for (
                var _len = arguments.length,
                  args = Array(_len > 1 ? _len - 1 : 0),
                  _key = 1;
                _key < _len;
                _key++
              ) {
                args[_key - 1] = arguments[_key]
              }

              var _iteratorNormalCompletion = true
              var _didIteratorError = false
              var _iteratorError = undefined

              try {
                for (
                  var _iterator = this.__listeners[eventName][
                      Symbol.iterator
                    ](),
                    _step;
                  !(_iteratorNormalCompletion = (_step = _iterator.next())
                    .done);
                  _iteratorNormalCompletion = true
                ) {
                  var handler = _step.value

                  handler.apply(undefined, args)
                }
              } catch (err) {
                _didIteratorError = true
                _iteratorError = err
              } finally {
                try {
                  if (!_iteratorNormalCompletion && _iterator.return) {
                    _iterator.return()
                  }
                } finally {
                  if (_didIteratorError) {
                    throw _iteratorError
                  }
                }
              }

              return this
            },
          },
          {
            key: 'once',
            value: function once(eventName, handler) {
              var _this = this

              var once = function once() {
                _this.off(eventName, once)
                handler.apply(undefined, arguments)
              }

              return this.on(eventName, once)
            },
          },
          {
            key: 'on',
            value: function on(eventName, handler) {
              if (!this.__listeners[eventName]) this.__listeners[eventName] = []

              this.__listeners[eventName].push(handler)

              return this
            },
          },
          {
            key: 'off',
            value: function off(eventName, handler) {
              if (handler)
                this.__listeners[eventName] = this.__listeners[
                  eventName
                ].filter(function(h) {
                  return h !== handler
                })
              else this.__listeners[eventName] = []

              return this
            },
          },
        ])

        return TinyEmitter
      })()

      var tinyEmitter = TinyEmitter$1

      var _createClass = (function() {
        function defineProperties(target, props) {
          for (var i = 0; i < props.length; i++) {
            var descriptor = props[i]
            descriptor.enumerable = descriptor.enumerable || false
            descriptor.configurable = true
            if ('value' in descriptor) descriptor.writable = true
            Object.defineProperty(target, descriptor.key, descriptor)
          }
        }
        return function(Constructor, protoProps, staticProps) {
          if (protoProps) defineProperties(Constructor.prototype, protoProps)
          if (staticProps) defineProperties(Constructor, staticProps)
          return Constructor
        }
      })()

      var _get = function get(object, property, receiver) {
        if (object === null) object = Function.prototype
        var desc = Object.getOwnPropertyDescriptor(object, property)
        if (desc === undefined) {
          var parent = Object.getPrototypeOf(object)
          if (parent === null) {
            return undefined
          } else {
            return get(parent, property, receiver)
          }
        } else if ('value' in desc) {
          return desc.value
        } else {
          var getter = desc.get
          if (getter === undefined) {
            return undefined
          }
          return getter.call(receiver)
        }
      }

      var _typeof =
        typeof Symbol === 'function' && typeof Symbol.iterator === 'symbol'
          ? function(obj) {
              return typeof obj
            }
          : function(obj) {
              return obj &&
                typeof Symbol === 'function' &&
                obj.constructor === Symbol &&
                obj !== Symbol.prototype
                ? 'symbol'
                : typeof obj
            }

      function _toConsumableArray(arr) {
        if (Array.isArray(arr)) {
          for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) {
            arr2[i] = arr[i]
          }
          return arr2
        } else {
          return Array.from(arr)
        }
      }

      function _classCallCheck(instance, Constructor) {
        if (!(instance instanceof Constructor)) {
          throw new TypeError('Cannot call a class as a function')
        }
      }

      function _possibleConstructorReturn(self, call) {
        if (!self) {
          throw new ReferenceError(
            "this hasn't been initialised - super() hasn't been called"
          )
        }
        return call && (typeof call === 'object' || typeof call === 'function')
          ? call
          : self
      }

      function _inherits(subClass, superClass) {
        if (typeof superClass !== 'function' && superClass !== null) {
          throw new TypeError(
            'Super expression must either be null or a function, not ' +
              typeof superClass
          )
        }
        subClass.prototype = Object.create(superClass && superClass.prototype, {
          constructor: {
            value: subClass,
            enumerable: false,
            writable: true,
            configurable: true,
          },
        })
        if (superClass)
          Object.setPrototypeOf
            ? Object.setPrototypeOf(subClass, superClass)
            : (subClass.__proto__ = superClass)
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

      var TinyEmitter = tinyEmitter

      var MESSAGE_RESULT = 0
      var MESSAGE_EVENT = 1

      var RESULT_ERROR = 0
      var RESULT_SUCCESS = 1

      var DEFAULT_HANDLER = 'main'

      var isPromise = function isPromise(o) {
        return (
          (typeof o === 'undefined' ? 'undefined' : _typeof(o)) === 'object' &&
          o !== null &&
          typeof o.then === 'function' &&
          typeof o.catch === 'function'
        )
      }

      function RegisterPromise(fn) {
        var handlers = _defineProperty({}, DEFAULT_HANDLER, fn)
        var sendPostMessage = self.postMessage.bind(self)

        var server = new ((function(_TinyEmitter) {
          _inherits(WorkerRegister, _TinyEmitter)

          function WorkerRegister() {
            _classCallCheck(this, WorkerRegister)

            return _possibleConstructorReturn(
              this,
              (
                WorkerRegister.__proto__ ||
                Object.getPrototypeOf(WorkerRegister)
              ).apply(this, arguments)
            )
          }

          _createClass(WorkerRegister, [
            {
              key: 'emit',
              value: function emit(eventName) {
                for (
                  var _len = arguments.length,
                    args = Array(_len > 1 ? _len - 1 : 0),
                    _key = 1;
                  _key < _len;
                  _key++
                ) {
                  args[_key - 1] = arguments[_key]
                }

                if (
                  args.length == 1 &&
                  args[0] instanceof TransferableResponse
                ) {
                  sendPostMessage(
                    { eventName: eventName, args: args },
                    args[0].transferable
                  )
                } else {
                  sendPostMessage({ eventName: eventName, args: args })
                }
                return this
              },
            },
            {
              key: 'emitLocally',
              value: function emitLocally(eventName) {
                var _get2

                for (
                  var _len2 = arguments.length,
                    args = Array(_len2 > 1 ? _len2 - 1 : 0),
                    _key2 = 1;
                  _key2 < _len2;
                  _key2++
                ) {
                  args[_key2 - 1] = arguments[_key2]
                }

                ;(_get2 = _get(
                  WorkerRegister.prototype.__proto__ ||
                    Object.getPrototypeOf(WorkerRegister.prototype),
                  'emit',
                  this
                )).call.apply(_get2, [this, eventName].concat(args))
              },
            },
            {
              key: 'operation',
              value: function operation(name, handler) {
                handlers[name] = handler
                return this
              },
            },
          ])

          return WorkerRegister
        })(TinyEmitter))()

        var run = function run(messageId, payload, handlerName) {
          var onSuccess = function onSuccess(result) {
            if (result && result instanceof TransferableResponse) {
              sendResult(
                messageId,
                RESULT_SUCCESS,
                result.payload,
                result.transferable
              )
            } else {
              sendResult(messageId, RESULT_SUCCESS, result)
            }
          }

          var onError = function onError(e) {
            sendResult(messageId, RESULT_ERROR, {
              message: e.message,
              stack: e.stack,
            })
          }

          try {
            var result = runFn(messageId, payload, handlerName)
            if (isPromise(result)) {
              result.then(onSuccess).catch(onError)
            } else {
              onSuccess(result)
            }
          } catch (e) {
            onError(e)
          }
        }

        var runFn = function runFn(messageId, payload, handlerName) {
          var handler = handlers[handlerName || DEFAULT_HANDLER]
          if (!handler) throw new Error('Not found handler for this request')

          return handler(payload, sendEvent.bind(null, messageId))
        }

        var sendResult = function sendResult(messageId, success, payload) {
          var transferable =
            arguments.length > 3 && arguments[3] !== undefined
              ? arguments[3]
              : []

          sendPostMessage(
            [MESSAGE_RESULT, messageId, success, payload],
            transferable
          )
        }

        var sendEvent = function sendEvent(messageId, eventName, payload) {
          if (!eventName) throw new Error('eventName is required')

          if (typeof eventName !== 'string')
            throw new Error('eventName should be string')

          sendPostMessage([MESSAGE_EVENT, messageId, eventName, payload])
        }

        self.addEventListener('message', function(_ref) {
          var data = _ref.data

          if (Array.isArray(data)) {
            run.apply(undefined, _toConsumableArray(data))
          } else if (data && data.eventName) {
            server.emitLocally.apply(
              server,
              [data.eventName].concat(_toConsumableArray(data.args))
            )
          }
        })

        return server
      }

      var TransferableResponse = function TransferableResponse(
        payload,
        transferable
      ) {
        _classCallCheck(this, TransferableResponse)

        this.payload = payload
        this.transferable = transferable
      }

      register.exports = RegisterPromise
      register.exports.TransferableResponse = TransferableResponse

      var registerWebworker = register.exports

      /* eslint-disable */
      // prettier-ignore

      registerWebworker(function (message, emit) {
    var array = message.array;
    var min = message.min;
    var max = message.max;
    var offset = message.component || 0;
    var step = message.numberOfComponents || 1;
    var numberOfBins = message.numberOfBins;
    var delta = max - min;
    var histogram = new Float32Array(numberOfBins);
    histogram.fill(0);
    var len = array.length;

    for (var i = offset; i < len; i += step) {
      var idx = Math.floor((numberOfBins - 1) * (Number(array[i]) - min) / delta);
      histogram[idx] += 1;
    }

    return Promise.resolve(new registerWebworker.TransferableResponse(histogram, [histogram.buffer]));
  });
    })()
  },
  null
)

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
/* eslint-disable no-continue */
// ----------------------------------------------------------------------------
// Global structures
// ----------------------------------------------------------------------------

var MIN_GAUSSIAN_WIDTH = 0.001
var ACTION_TO_CURSOR = {
  adjustPosition: '-webkit-grab',
  adjustHeight: 'row-resize',
  adjustBias: 'crosshair',
  adjustWidth: 'col-resize',
  adjustZoom: 'col-resize',
}
var TOUCH_CLICK = [] // ----------------------------------------------------------------------------
// Global methods
// ----------------------------------------------------------------------------

var ACTIONS = {
  adjustPosition: function adjustPosition(x, y, _ref) {
    var originalXY = _ref.originalXY,
      gaussian = _ref.gaussian,
      originalGaussian = _ref.originalGaussian
    var xOffset = originalGaussian.position - originalXY[0]
    gaussian.position = x + xOffset
    return true
  },
  adjustHeight: function adjustHeight(x, y, _ref2) {
    var model = _ref2.model,
      gaussian = _ref2.gaussian
    gaussian.height = 1 - y
    gaussian.height = Math.min(
      1,
      Math.max(model.gaussianMinimumHeight, gaussian.height)
    )
    return true
  },
  adjustBias: function adjustBias(x, y, _ref3) {
    var originalXY = _ref3.originalXY,
      gaussian = _ref3.gaussian,
      originalGaussian = _ref3.originalGaussian
    gaussian.xBias =
      originalGaussian.xBias - (originalXY[0] - x) / gaussian.height
    gaussian.yBias =
      originalGaussian.yBias + (4 * (originalXY[1] - y)) / gaussian.height // Clamps

    gaussian.xBias = Math.max(-1, Math.min(1, gaussian.xBias))
    gaussian.yBias = Math.max(0, Math.min(2, gaussian.yBias))
    return true
  },
  adjustWidth: function adjustWidth(x, y, _ref4) {
    var originalXY = _ref4.originalXY,
      gaussian = _ref4.gaussian,
      originalGaussian = _ref4.originalGaussian,
      gaussianSide = _ref4.gaussianSide
    gaussian.width =
      gaussianSide < 0
        ? originalGaussian.width - (originalXY[0] - x)
        : originalGaussian.width + (originalXY[0] - x)

    if (gaussian.width < MIN_GAUSSIAN_WIDTH) {
      gaussian.width = MIN_GAUSSIAN_WIDTH
    }

    return true
  },
  adjustZoom: function adjustZoom(x, y, _ref5) {
    var rangeZoom = _ref5.rangeZoom,
      publicAPI = _ref5.publicAPI
    var delta = rangeZoom[1] - rangeZoom[0]
    var absNormX = (x - rangeZoom[0]) / delta
    var minDelta = Math.abs(absNormX - rangeZoom[0])
    var maxDelta = Math.abs(absNormX - rangeZoom[1])
    var meanDelta = Math.abs(absNormX - 0.5 * (rangeZoom[0] + rangeZoom[1]))

    if (meanDelta < Math.min(minDelta, maxDelta)) {
      var halfDelta = delta * 0.5
      rangeZoom[0] = Math.min(
        Math.max(absNormX - halfDelta, 0),
        rangeZoom[1] - 0.1
      )
      rangeZoom[1] = Math.max(
        Math.min(absNormX + halfDelta, 1),
        rangeZoom[0] + 0.1
      )
    } else if (minDelta < maxDelta) {
      rangeZoom[0] = Math.min(Math.max(absNormX, 0), rangeZoom[1] - 0.1)
    } else {
      rangeZoom[1] = Math.max(Math.min(absNormX, 1), rangeZoom[0] + 0.1)
    }

    publicAPI.invokeZoomChange(rangeZoom) // The opacity did not changed

    return false
  },
} // ----------------------------------------------------------------------------

function computeOpacities(gaussians) {
  var sampling =
    arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 256
  var opacities = []

  while (opacities.length < sampling) {
    opacities.push(0)
  }

  var count = gaussians.length

  while (count--) {
    var _gaussians$count = gaussians[count],
      position = _gaussians$count.position,
      height = _gaussians$count.height,
      width = _gaussians$count.width,
      xBias = _gaussians$count.xBias,
      yBias = _gaussians$count.yBias

    for (var i = 0; i < sampling; i++) {
      var x = i / (sampling - 1) // clamp non-zero values to pos +/- width

      if (x > position + width || x < position - width) {
        if (opacities[i] < 0.0) {
          opacities[i] = 0.0
        }

        continue
      } // non-zero width

      var correctedWidth =
        width < MIN_GAUSSIAN_WIDTH ? MIN_GAUSSIAN_WIDTH : width // translate the original x to a new x based on the xbias

      var x0 = 0

      if (xBias === 0 || x === position + xBias) {
        x0 = x
      } else if (x > position + xBias) {
        if (correctedWidth === xBias) {
          x0 = position
        } else {
          x0 =
            position +
            (x - position - xBias) * (correctedWidth / (correctedWidth - xBias))
        }
      } else if (-correctedWidth === xBias) {
        // (x < pos+xBias)
        x0 = position
      } else {
        x0 =
          position -
          (x - position - xBias) * (correctedWidth / (correctedWidth + xBias))
      } // center around 0 and normalize to -1,1

      var x1 = (x0 - position) / correctedWidth // do a linear interpolation between:
      //    a gaussian and a parabola        if 0 < yBias <1
      //    a parabola and a step function   if 1 < yBias <2

      var h0a = Math.exp(-(4 * x1 * x1))
      var h0b = 1.0 - x1 * x1
      var h0c = 1.0
      var h1 = void 0

      if (yBias < 1) {
        h1 = yBias * h0b + (1 - yBias) * h0a
      } else {
        h1 = (2 - yBias) * h0b + (yBias - 1) * h0c
      }

      var h2 = height * h1 // perform the MAX over different gaussians, not the sum

      if (h2 > opacities[i]) {
        opacities[i] = h2
      }
    }
  }

  return opacities
} // ----------------------------------------------------------------------------

function applyGaussianToPiecewiseFunction(
  gaussians,
  sampling,
  rangeToUse,
  piecewiseFunction
) {
  var opacities = computeOpacities(gaussians, sampling)
  var nodes = []
  var delta = (rangeToUse[1] - rangeToUse[0]) / (opacities.length - 1)
  var midpoint = 0.5
  var sharpness = 0

  for (var index = 0; index < opacities.length; index++) {
    var x = rangeToUse[0] + delta * index
    var y = opacities[index]
    nodes.push({
      x: x,
      y: y,
      midpoint: midpoint,
      sharpness: sharpness,
    })
  }

  piecewiseFunction.setNodes(nodes)
} // ----------------------------------------------------------------------------

function drawChart(ctx, area, values) {
  var style =
    arguments.length > 3 && arguments[3] !== undefined
      ? arguments[3]
      : {
          lineWidth: 1,
          strokeStyle: '#000',
        }
  var verticalScale = area[3]
  var horizontalScale = area[2] / (values.length - 1)
  var fill = !!style.fillStyle
  var offset = verticalScale + area[1]
  ctx.lineWidth = style.lineWidth
  ctx.strokeStyle = style.strokeStyle
  ctx.beginPath()
  ctx.moveTo(area[0], area[1] + area[3])

  for (var index = 0; index < values.length; index++) {
    ctx.lineTo(
      area[0] + index * horizontalScale,
      Math.max(area[1], offset - values[index] * verticalScale)
    )
  }

  if (fill) {
    ctx.fillStyle = style.fillStyle
    ctx.lineTo(area[0] + area[2], area[1] + area[3])

    if (style.clip) {
      ctx.clip()
      return
    }

    ctx.fill()
  }

  ctx.stroke()
} // ----------------------------------------------------------------------------

function updateColorCanvas(colorTransferFunction, width, rangeToUse, canvas) {
  var workCanvas = canvas || document.createElement('canvas')
  workCanvas.setAttribute('width', width)
  workCanvas.setAttribute('height', 256)
  var ctx = workCanvas.getContext('2d')
  var rgba = colorTransferFunction.getUint8Table(
    rangeToUse[0],
    rangeToUse[1],
    width,
    4
  )
  var pixelsArea = ctx.getImageData(0, 0, width, 256)

  for (var lineIdx = 0; lineIdx < 256; lineIdx++) {
    pixelsArea.data.set(rgba, lineIdx * 4 * width)
  }

  var nbValues = 256 * width * 4
  var lineSize = width * 4

  for (var i = 3; i < nbValues; i += 4) {
    pixelsArea.data[i] = 255 - Math.floor(i / lineSize)
  }

  ctx.putImageData(pixelsArea, 0, 0)
  return workCanvas
} // ----------------------------------------------------------------------------

function updateColorCanvasFromImage(img, width, canvas) {
  var workCanvas = canvas || document.createElement('canvas')
  workCanvas.setAttribute('width', width)
  workCanvas.setAttribute('height', 256)
  var ctx = workCanvas.getContext('2d')
  ctx.drawImage(img, 0, 0, img.width, img.height, 0, 0, width, 256)
  return workCanvas
} // ----------------------------------------------------------------------------

function normalizeCoordinates(x, y, subRectangeArea) {
  var zoomRange =
    arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : [0, 1]
  return [
    zoomRange[0] +
      ((x - subRectangeArea[0]) / subRectangeArea[2]) *
        (zoomRange[1] - zoomRange[0]),
    (y - subRectangeArea[1]) / subRectangeArea[3],
  ]
} // ----------------------------------------------------------------------------

function findGaussian(x, gaussians) {
  var distances = gaussians.map(function(g) {
    return Math.abs(g.position - x)
  })
  var min = Math.min.apply(Math, _toConsumableArray(distances))
  return distances.indexOf(min)
} // ----------------------------------------------------------------------------

function createListener(callback) {
  var preventDefault =
    arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true
  return function(e) {
    var offsetX = e.offsetX,
      offsetY = e.offsetY

    if (preventDefault) {
      e.preventDefault()
    }

    callback(offsetX, offsetY)
  }
} // ----------------------------------------------------------------------------

function createTouchClickListener() {
  var id = TOUCH_CLICK.length

  for (
    var _len = arguments.length, callbacks = new Array(_len), _key = 0;
    _key < _len;
    _key++
  ) {
    callbacks[_key] = arguments[_key]
  }

  TOUCH_CLICK.push({
    callbacks: callbacks,
    timeout: 0,
    deltaT: 200,
    count: 0,
    ready: false,
  })
  return id
} // ----------------------------------------------------------------------------

function processTouchClicks() {
  TOUCH_CLICK.filter(function(t) {
    return t.ready
  }).forEach(function(touchHandle) {
    touchHandle.callbacks.forEach(function(callback) {
      if (
        callback.touches === touchHandle.touches &&
        callback.clicks === touchHandle.count
      ) {
        callback.action.apply(
          callback,
          _toConsumableArray(touchHandle.singleTouche)
        )
      }
    }) // Clear state

    touchHandle.ts = 0
    touchHandle.count = 0
    touchHandle.touches = 0
    touchHandle.ready = false
  })
} // ----------------------------------------------------------------------------

function createTouchListener(id, callback) {
  var nbTouches =
    arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 1
  var preventDefault =
    arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : true
  return function(e) {
    var targetBounds = e.target.getBoundingClientRect()
    var relativeTouches = Array.prototype.map.call(e.touches, function(t) {
      return [t.pageX - targetBounds.left, t.pageY - targetBounds.top]
    })
    var singleTouche = relativeTouches
      .reduce(
        function(a, b) {
          return [a[0] + b[0], a[1] + b[1]]
        },
        [0, 0]
      )
      .map(function(v) {
        return v / e.touches.length
      })

    if (e.type === 'touchstart') {
      clearTimeout(TOUCH_CLICK[id].timeout)
      TOUCH_CLICK[id].ts = e.timeStamp
      TOUCH_CLICK[id].singleTouche = singleTouche
      TOUCH_CLICK[id].touches = e.touches.length
    } else if (e.type === 'touchmove') {
      TOUCH_CLICK[id].ts = 0
      TOUCH_CLICK[id].count = 0
      TOUCH_CLICK[id].ready = false
    } else if (e.type === 'touchend') {
      if (e.timeStamp - TOUCH_CLICK[id].ts < TOUCH_CLICK[id].deltaT) {
        TOUCH_CLICK[id].count += 1
        TOUCH_CLICK[id].ready = true

        if (preventDefault) {
          e.preventDefault()
        }

        TOUCH_CLICK[id].timeout = setTimeout(
          processTouchClicks,
          TOUCH_CLICK[id].deltaT
        )
      } else {
        TOUCH_CLICK[id].ready = false
      }
    }

    if (e.touches.length === nbTouches) {
      callback.apply(void 0, _toConsumableArray(singleTouche))

      if (preventDefault) {
        e.preventDefault()
      }
    }
  }
} // ----------------------------------------------------------------------------

function listenerSelector(condition, ok, ko) {
  return function(e) {
    return condition() ? ok(e) : ko(e)
  }
} // ----------------------------------------------------------------------------

function rescaleArray(array, focusArea) {
  if (!focusArea) {
    return array
  }

  var maxIdx = array.length - 1
  var idxRange = focusArea.map(function(v) {
    return Math.round(v * maxIdx)
  })
  return array.slice(idxRange[0], idxRange[1] + 1)
} // ----------------------------------------------------------------------------

function rescaleValue(value, focusArea) {
  if (!focusArea) {
    return value
  }

  return (value - focusArea[0]) / (focusArea[1] - focusArea[0])
} // ----------------------------------------------------------------------------
// Static API
// ----------------------------------------------------------------------------

var STATIC = {
  applyGaussianToPiecewiseFunction: applyGaussianToPiecewiseFunction,
  computeOpacities: computeOpacities,
  createListener: createListener,
  drawChart: drawChart,
  findGaussian: findGaussian,
  listenerSelector: listenerSelector,
  normalizeCoordinates: normalizeCoordinates,
} // ----------------------------------------------------------------------------
// vtkPiecewiseGaussianWidget methods
// ----------------------------------------------------------------------------

function vtkPiecewiseGaussianWidget(publicAPI, model) {
  // Set our className
  model.classHierarchy.push('vtkPiecewiseGaussianWidget')

  if (!model.canvas) {
    model.canvas = document.createElement('canvas')
  }

  publicAPI.setContainer = function(el) {
    if (model.container && model.container !== el) {
      model.container.removeChild(model.canvas)
    }

    if (model.container !== el) {
      model.container = el

      if (model.container) {
        model.container.appendChild(model.canvas)
      }

      publicAPI.modified()
    }
  }

  publicAPI.setGaussians = function(gaussians) {
    if (model.gaussians === gaussians) {
      return
    }

    model.gaussians = gaussians
    model.opacities = computeOpacities(model.gaussians, model.piecewiseSize)
    publicAPI.invokeOpacityChange(publicAPI)
    publicAPI.modified()
  }

  publicAPI.addGaussian = function(position, height, width, xBias, yBias) {
    var nextIndex = model.gaussians.length
    model.gaussians.push({
      position: position,
      height: height,
      width: width,
      xBias: xBias,
      yBias: yBias,
    })
    model.opacities = computeOpacities(model.gaussians, model.piecewiseSize)
    publicAPI.invokeOpacityChange(publicAPI)
    publicAPI.modified()
    return nextIndex
  }

  publicAPI.removeGaussian = function(index) {
    model.gaussians.splice(index, 1)
    model.opacities = computeOpacities(model.gaussians, model.piecewiseSize)
    publicAPI.invokeOpacityChange(publicAPI)
    publicAPI.modified()
  }

  publicAPI.setSize = function(width, height) {
    model.canvas.setAttribute('width', width)
    model.canvas.setAttribute('height', height)

    if (model.size[0] !== width || model.size[1] !== height) {
      model.size = [width, height]
      model.colorCanvasMTime = 0
      publicAPI.modified()
    }
  }

  publicAPI.updateStyle = function(style) {
    model.style = _objectSpread(_objectSpread({}, model.style), style)
    publicAPI.modified()
  } // Method used to compute and show data distribution in the background.
  // When an array with many components is used, you can provide additional
  // information to choose which component you want to extract the histogram
  // from.

  publicAPI.setDataArray = function(array) {
    var _ref6 =
        arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {},
      _ref6$numberOfBinToCo = _ref6.numberOfBinToConsiders,
      numberOfBinToConsiders =
        _ref6$numberOfBinToCo === void 0 ? 1 : _ref6$numberOfBinToCo,
      _ref6$numberOfBinsToS = _ref6.numberOfBinsToSkip,
      numberOfBinsToSkip =
        _ref6$numberOfBinsToS === void 0 ? 1 : _ref6$numberOfBinsToS,
      _ref6$numberOfCompone = _ref6.numberOfComponents,
      numberOfComponents =
        _ref6$numberOfCompone === void 0 ? 1 : _ref6$numberOfCompone,
      _ref6$component = _ref6.component,
      component = _ref6$component === void 0 ? 0 : _ref6$component

    model.histogram = null
    model.histogramArray = array
    model.dataRange = arrayRange(array, component, numberOfComponents)

    var _model$dataRange = _slicedToArray(model.dataRange, 2),
      min = _model$dataRange[0],
      max = _model$dataRange[1]

    var maxNumberOfWorkers = 4
    var arrayStride = Math.floor(array.length / maxNumberOfWorkers) || 1
    arrayStride += arrayStride % numberOfComponents
    var arrayIndex = 0
    var workerChunks = []
    var workers = []

    while (arrayIndex < array.length) {
      var worker = new WorkerFactory()
      workers.push(worker)
      var workerPromise = new src(worker)
      var arrayStart = arrayIndex
      var arrayEnd = Math.min(arrayIndex + arrayStride, array.length - 1)
      var subArray = new array.constructor(
        array.slice(arrayStart, arrayEnd + 1)
      )
      workerChunks.push(
        workerPromise.postMessage(
          {
            array: subArray,
            component: component,
            numberOfComponents: numberOfComponents,
            min: min,
            max: max,
            numberOfBins: model.numberOfBins,
          },
          [subArray.buffer]
        )
      )
      arrayIndex += arrayStride
    }

    Promise.all(workerChunks).then(function(subHistograms) {
      workers.forEach(function(worker) {
        return worker.terminate()
      })
      model.histogram = new Float32Array(model.numberOfBins)
      model.histogram.fill(0)
      subHistograms.forEach(function(subHistogram) {
        for (var i = 0, len = subHistogram.length; i < len; ++i) {
          model.histogram[i] += subHistogram[i]
        }
      }) // Smart Rescale Histogram

      var sampleSize = Math.min(
        numberOfBinToConsiders,
        model.histogram.length - numberOfBinsToSkip
      )
      var sortedArray = Array.from(model.histogram)
      sortedArray.sort(function(a, b) {
        return Number(a) - Number(b)
      })

      for (var i = 0; i < numberOfBinsToSkip; i++) {
        sortedArray.pop()
      }

      while (sortedArray.length > sampleSize) {
        sortedArray.shift()
      }

      var mean =
        sortedArray.reduce(function(a, b) {
          return a + b
        }, 0) / sampleSize

      for (var _i = 0, len = model.histogram.length; _i < len; ++_i) {
        model.histogram[_i] /= mean
      }

      publicAPI.modified()
      setTimeout(publicAPI.render, 0)
    })
    publicAPI.modified()
  }

  publicAPI.onClick = function(x, y) {
    var _normalizeCoordinates = normalizeCoordinates(
        x,
        y,
        model.graphArea,
        model.enableRangeZoom ? model.rangeZoom : null
      ),
      _normalizeCoordinates2 = _slicedToArray(_normalizeCoordinates, 2),
      xNormalized = _normalizeCoordinates2[0],
      yNormalized = _normalizeCoordinates2[1]

    if (xNormalized < 0 && model.style.iconSize > 1) {
      // Control buttons
      var delta = model.style.iconSize + model.style.padding
      var offset = delta
      var buttonIdx = 0

      while (y > offset) {
        buttonIdx += 1
        offset += delta
      }

      switch (buttonIdx) {
        case 0: {
          var gaussianIdx = publicAPI.addGaussian(0, 1, 0.1, 0, 0)
          var gaussian = model.gaussians[gaussianIdx]

          var originalGaussian = _objectSpread({}, gaussian)

          var action = ACTIONS.adjustPosition
          model.activeGaussian = gaussianIdx
          model.selectedGaussian = gaussianIdx // Fake active action

          macro.setImmediate(function() {
            publicAPI.onDown(x, y)
            model.dragAction = {
              originalXY: [0, 0],
              action: action,
              gaussian: gaussian,
              originalGaussian: originalGaussian,
            }
          })
          break
        }

        case 1: {
          if (model.selectedGaussian !== -1) {
            publicAPI.removeGaussian(model.selectedGaussian)
          }

          break
        }

        default: {
          model.selectedGaussian = -1
          model.dragAction = null
        }
      }
    } else if (
      xNormalized < 0 ||
      xNormalized > 1 ||
      yNormalized < 0 ||
      yNormalized > 1
    ) {
      model.selectedGaussian = -1
      model.dragAction = null
    } else {
      var newSelected = findGaussian(xNormalized, model.gaussians)

      if (newSelected !== model.selectedGaussian) {
        model.selectedGaussian = newSelected
        publicAPI.modified()
      }
    }

    return true
  }

  publicAPI.onHover = function(x, y) {
    // Determines the interaction region size for adjusting the Gaussian's
    // height.
    var tolerance = 20 / model.canvas.height

    var _normalizeCoordinates3 = normalizeCoordinates(
        x,
        y,
        model.graphArea,
        model.enableRangeZoom ? model.rangeZoom : null
      ),
      _normalizeCoordinates4 = _slicedToArray(_normalizeCoordinates3, 2),
      xNormalized = _normalizeCoordinates4[0],
      yNormalized = _normalizeCoordinates4[1]

    var _normalizeCoordinates5 = normalizeCoordinates(x, y, model.graphArea),
      _normalizeCoordinates6 = _slicedToArray(_normalizeCoordinates5, 1),
      xNormalizedAbs = _normalizeCoordinates6[0]

    var newActive =
      xNormalized < 0
        ? model.selectedGaussian
        : findGaussian(xNormalized, model.gaussians)
    model.canvas.style.cursor = 'default'
    var gaussian = model.gaussians[newActive]

    if (
      model.enableRangeZoom &&
      xNormalizedAbs >= 0 &&
      y < model.graphArea[1] - 6 // circle radius
    ) {
      var thirdDelta = (model.rangeZoom[1] - model.rangeZoom[0]) / 3

      if (
        xNormalizedAbs < model.rangeZoom[0] + thirdDelta ||
        xNormalizedAbs > model.rangeZoom[1] - thirdDelta
      ) {
        model.canvas.style.cursor = ACTION_TO_CURSOR.adjustZoom
      } else {
        model.canvas.style.cursor = ACTION_TO_CURSOR.adjustPosition
      }

      model.dragAction = {
        rangeZoom: model.rangeZoom,
        action: ACTIONS.adjustZoom,
      }
    } else if (gaussian && xNormalizedAbs >= 0) {
      var invY = 1 - yNormalized
      var actionName = null

      if (invY > gaussian.height + tolerance) {
        actionName = 'adjustPosition'
      } else if (invY > gaussian.height - tolerance) {
        if (Math.abs(xNormalized - gaussian.position) < tolerance) {
          actionName = 'adjustHeight'
        } else {
          actionName = 'adjustPosition'
        }
      } else if (invY > gaussian.height * 0.5 + tolerance) {
        actionName = 'adjustPosition'
      } else if (invY > gaussian.height * 0.5 - tolerance) {
        if (Math.abs(xNormalized - gaussian.position) < tolerance) {
          actionName = 'adjustBias'
        } else {
          actionName = 'adjustPosition'
        }
      } else if (invY > tolerance) {
        actionName = 'adjustPosition'
      } else {
        actionName = 'adjustWidth'
      }

      model.canvas.style.cursor = ACTION_TO_CURSOR[actionName]
      var action = ACTIONS[actionName]

      var originalGaussian = _objectSpread({}, gaussian)

      model.dragAction = {
        originalXY: [xNormalized, yNormalized],
        action: action,
        gaussian: gaussian,
        originalGaussian: originalGaussian,
      }
    }

    if (newActive !== model.activeGaussian) {
      model.activeGaussian = newActive
      publicAPI.modified()
    }

    return true
  }

  publicAPI.onDown = function(x, y) {
    if (!model.mouseIsDown) {
      publicAPI.invokeAnimation(true)
    }

    model.mouseIsDown = true
    var xNormalized = normalizeCoordinates(
      x,
      y,
      model.graphArea,
      model.enableRangeZoom ? model.rangeZoom : null
    )[0]
    var newSelected = findGaussian(xNormalized, model.gaussians)
    model.gaussianSide = 0
    var gaussian = model.gaussians[newSelected]

    if (gaussian) {
      model.gaussianSide = gaussian.position - xNormalized
    }

    if (newSelected !== model.selectedGaussian && xNormalized > 0) {
      model.selectedGaussian = newSelected
      publicAPI.modified()
    }

    return true
  }

  publicAPI.onDrag = function(x, y) {
    if (model.dragAction) {
      var _normalizeCoordinates7 = normalizeCoordinates(
          x,
          y,
          model.graphArea,
          model.enableRangeZoom ? model.rangeZoom : null
        ),
        _normalizeCoordinates8 = _slicedToArray(_normalizeCoordinates7, 2),
        xNormalized = _normalizeCoordinates8[0],
        yNormalized = _normalizeCoordinates8[1]

      var action = model.dragAction.action

      if (
        action(
          xNormalized,
          yNormalized,
          _objectSpread(
            {
              gaussianSide: model.gaussianSide,
              model: model,
              publicAPI: publicAPI,
            },
            model.dragAction
          )
        )
      ) {
        model.opacities = computeOpacities(model.gaussians, model.piecewiseSize)
        publicAPI.invokeOpacityChange(publicAPI, true)
      }

      publicAPI.modified()
    }

    return true
  }

  publicAPI.onUp = function(x, y) {
    if (model.mouseIsDown) {
      publicAPI.invokeAnimation(false)
    }

    model.mouseIsDown = false
    return true
  }

  publicAPI.onLeave = function(x, y) {
    publicAPI.onUp(x, y)
    model.canvas.style.cursor = 'default'
    model.activeGaussian = -1
    publicAPI.modified()
    return true
  }

  publicAPI.onAddGaussian = function(x, y) {
    var _normalizeCoordinates9 = normalizeCoordinates(
        x,
        y,
        model.graphArea,
        model.enableRangeZoom ? model.rangeZoom : null
      ),
      _normalizeCoordinates10 = _slicedToArray(_normalizeCoordinates9, 2),
      xNormalized = _normalizeCoordinates10[0],
      yNormalized = _normalizeCoordinates10[1]

    if (xNormalized >= 0) {
      publicAPI.addGaussian(xNormalized, 1 - yNormalized, 0.1, 0, 0)
    }

    return true
  }

  publicAPI.onRemoveGaussian = function(x, y) {
    var xNormalized = normalizeCoordinates(
      x,
      y,
      model.graphArea,
      model.enableRangeZoom ? model.rangeZoom : null
    )[0]
    var newSelected = findGaussian(xNormalized, model.gaussians)

    if (xNormalized >= 0 && newSelected !== -1) {
      publicAPI.removeGaussian(newSelected)
    }

    return true
  }

  publicAPI.bindMouseListeners = function() {
    if (!model.listeners) {
      var isDown = function isDown() {
        return !!model.mouseIsDown
      }

      var touchId = createTouchClickListener(
        {
          clicks: 1,
          touches: 1,
          action: publicAPI.onClick,
        },
        {
          clicks: 2,
          touches: 1,
          action: publicAPI.onAddGaussian,
        },
        {
          clicks: 2,
          touches: 2,
          action: publicAPI.onRemoveGaussian,
        }
      )
      model.listeners = {
        mousemove: listenerSelector(
          isDown,
          createListener(publicAPI.onDrag),
          createListener(publicAPI.onHover)
        ),
        dblclick: createListener(publicAPI.onAddGaussian),
        contextmenu: createListener(publicAPI.onRemoveGaussian),
        click: createListener(publicAPI.onClick),
        mouseup: createListener(publicAPI.onUp),
        mousedown: createListener(publicAPI.onDown),
        mouseout: createListener(publicAPI.onLeave),
        touchstart: createTouchListener(
          touchId,
          macro.chain(publicAPI.onHover, publicAPI.onDown)
        ),
        touchmove: listenerSelector(
          isDown,
          createTouchListener(touchId, publicAPI.onDrag),
          createTouchListener(touchId, publicAPI.onHover)
        ),
        touchend: createTouchListener(touchId, publicAPI.onUp, 0), // touchend have 0 touch event...
      }
      Object.keys(model.listeners).forEach(function(eventType) {
        model.canvas.addEventListener(
          eventType,
          model.listeners[eventType],
          false
        )
      })
    }
  }

  publicAPI.unbindMouseListeners = function() {
    if (model.listeners) {
      Object.keys(model.listeners).forEach(function(eventType) {
        model.canvas.removeEventListener(eventType, model.listeners[eventType])
      })
      delete model.listeners
    }
  }

  publicAPI.render = function() {
    var ctx = model.canvas.getContext('2d')
    ctx.imageSmoothingEnabled = true

    var _model$size = _slicedToArray(model.size, 2),
      width = _model$size[0],
      height = _model$size[1]

    var offset = model.style.padding
    var graphArea = [
      Math.floor(model.style.iconSize + offset),
      Math.floor(offset),
      Math.ceil(width - 2 * offset - model.style.iconSize),
      Math.ceil(height - 2 * offset),
    ]
    var zoomControlHeight = model.style.zoomControlHeight

    if (model.enableRangeZoom) {
      graphArea[1] += Math.floor(zoomControlHeight)
      graphArea[3] -= Math.floor(zoomControlHeight)
    }

    model.graphArea = graphArea // Clear canvas

    ctx.clearRect(0, 0, width, height)
    ctx.lineJoin = 'round'
    ctx.fillStyle = model.style.backgroundColor
    ctx.fillRect.apply(ctx, graphArea)

    if (model.style.iconSize > 1) {
      // Draw icons
      // +
      var halfSize = Math.round(
        model.style.iconSize / 2 - model.style.strokeWidth
      )
      var center = Math.round(halfSize + offset + model.style.strokeWidth)
      ctx.beginPath()
      ctx.lineWidth = model.style.buttonStrokeWidth
      ctx.strokeStyle = model.style.buttonStrokeColor
      ctx.arc(center - offset / 2, center, halfSize, 0, 2 * Math.PI, false)
      ctx.fillStyle = model.style.buttonFillColor
      ctx.fill()
      ctx.stroke()
      ctx.moveTo(
        center - halfSize + model.style.strokeWidth + 2 - offset / 2,
        center
      )
      ctx.lineTo(
        center + halfSize - model.style.strokeWidth - 2 - offset / 2,
        center
      )
      ctx.stroke()
      ctx.moveTo(
        center - offset / 2,
        center - halfSize + model.style.strokeWidth + 2
      )
      ctx.lineTo(
        center - offset / 2,
        center + halfSize - model.style.strokeWidth - 2
      )
      ctx.stroke() // -

      if (model.selectedGaussian === -1) {
        ctx.fillStyle = model.style.buttonDisableFillColor
        ctx.lineWidth = model.style.buttonDisableStrokeWidth
        ctx.strokeStyle = model.style.buttonDisableStrokeColor
      } else {
        ctx.fillStyle = model.style.buttonFillColor
        ctx.lineWidth = model.style.buttonStrokeWidth
        ctx.strokeStyle = model.style.buttonStrokeColor
      }

      ctx.beginPath()
      ctx.arc(
        center - offset / 2,
        center + offset / 2 + model.style.iconSize,
        halfSize,
        0,
        2 * Math.PI,
        false
      )
      ctx.fill()
      ctx.stroke()
      ctx.moveTo(
        center - halfSize + model.style.strokeWidth + 2 - offset / 2,
        center + offset / 2 + model.style.iconSize
      )
      ctx.lineTo(
        center + halfSize - model.style.strokeWidth - 2 - offset / 2,
        center + offset / 2 + model.style.iconSize
      )
      ctx.stroke()
    } // Draw histogram

    if (model.histogram) {
      drawChart(
        ctx,
        graphArea,
        rescaleArray(model.histogram, model.rangeZoom),
        {
          lineWidth: 1,
          strokeStyle: model.style.histogramColor,
          fillStyle: model.style.histogramColor,
        }
      )
    } // Draw gaussians

    drawChart(
      ctx,
      graphArea,
      rescaleArray(model.opacities, model.enableRangeZoom && model.rangeZoom),
      {
        lineWidth: model.style.strokeWidth,
        strokeStyle: model.style.strokeColor,
      }
    ) // Draw color function if any

    if (model.colorTransferFunction && model.colorTransferFunction.getSize()) {
      var rangeToUse =
        model.dataRange || model.colorTransferFunction.getMappingRange()

      if (
        !model.colorCanvas ||
        model.colorCanvasMTime !== model.colorTransferFunction.getMTime()
      ) {
        model.colorCanvasMTime = model.colorTransferFunction.getMTime()
        model.colorCanvas = updateColorCanvas(
          model.colorTransferFunction,
          graphArea[2],
          rangeToUse,
          model.colorCanvas
        )
      }

      ctx.save()
      drawChart(
        ctx,
        graphArea,
        rescaleArray(model.opacities, model.enableRangeZoom && model.rangeZoom),
        {
          lineWidth: 1,
          strokeStyle: 'rgba(0,0,0,0)',
          fillStyle: 'rgba(0,0,0,1)',
          clip: true,
        }
      ) // Draw the correct portion of the color BG image

      if (model.enableRangeZoom) {
        ctx.drawImage(
          model.colorCanvas,
          model.rangeZoom[0] * graphArea[2],
          0,
          graphArea[2],
          graphArea[3],
          graphArea[0],
          graphArea[1],
          graphArea[2] / (model.rangeZoom[1] - model.rangeZoom[0]),
          graphArea[3]
        )
      } else {
        ctx.drawImage(model.colorCanvas, graphArea[0], graphArea[1])
      }

      ctx.restore()
    } else if (model.backgroundImage) {
      model.colorCanvas = updateColorCanvasFromImage(
        model.backgroundImage,
        graphArea[2],
        model.colorCanvas
      )
      ctx.save()
      drawChart(
        ctx,
        graphArea,
        rescaleArray(model.opacities, model.enableRangeZoom && model.rangeZoom),
        {
          lineWidth: 1,
          strokeStyle: 'rgba(0,0,0,0)',
          fillStyle: 'rgba(0,0,0,1)',
          clip: true,
        }
      )
      ctx.drawImage(model.colorCanvas, graphArea[0], graphArea[1])
      ctx.restore()
    } // Draw zoomed area

    if (model.enableRangeZoom) {
      ctx.fillStyle = model.style.zoomControlColor
      ctx.beginPath()
      ctx.rect(
        graphArea[0] + model.rangeZoom[0] * graphArea[2],
        0,
        (model.rangeZoom[1] - model.rangeZoom[0]) * graphArea[2],
        zoomControlHeight
      )
      ctx.fill()
    } // Draw active gaussian

    var activeGaussian =
      model.gaussians[model.activeGaussian] ||
      model.gaussians[model.selectedGaussian]

    if (activeGaussian) {
      var activeOpacities = computeOpacities([activeGaussian], graphArea[2])
      drawChart(
        ctx,
        graphArea,
        rescaleArray(activeOpacities, model.enableRangeZoom && model.rangeZoom),
        {
          lineWidth: model.style.activeStrokeWidth,
          strokeStyle: model.style.activeColor,
        }
      ) // Draw controls

      var xCenter =
        graphArea[0] +
        rescaleValue(
          activeGaussian.position,
          model.enableRangeZoom && model.rangeZoom
        ) *
          graphArea[2]
      var yTop = graphArea[1] + (1 - activeGaussian.height) * graphArea[3]
      var yMiddle =
        graphArea[1] + (1 - 0.5 * activeGaussian.height) * graphArea[3]
      var yBottom = graphArea[1] + graphArea[3]
      var widthInPixel = activeGaussian.width * graphArea[2]

      if (model.enableRangeZoom) {
        widthInPixel /= model.rangeZoom[1] - model.rangeZoom[0]
      }

      ctx.lineWidth = model.style.handleWidth
      ctx.strokeStyle = model.style.handleColor
      ctx.fillStyle = model.style.backgroundColor
      ctx.beginPath()
      ctx.moveTo(
        xCenter,
        graphArea[1] + (1 - activeGaussian.height) * graphArea[3]
      )
      ctx.lineTo(xCenter, graphArea[1] + graphArea[3])
      ctx.stroke() // Height

      ctx.beginPath()
      ctx.arc(xCenter, yTop, 6, 0, 2 * Math.PI)
      ctx.fill()
      ctx.stroke() // Bias

      var radius = Math.min(
        widthInPixel * 0.1,
        activeGaussian.height * graphArea[3] * 0.2
      )
      ctx.beginPath()
      ctx.rect(xCenter - radius, yMiddle - radius, radius * 2, radius * 2)
      ctx.fill()
      ctx.stroke()
      ctx.beginPath() // Width

      var sliderWidth = widthInPixel * 0.8
      ctx.rect(xCenter - sliderWidth, yBottom - 5, 2 * sliderWidth, 10)
      ctx.fill()
      ctx.stroke()
    }
  }

  publicAPI.getOpacityNodes = function(dataRange) {
    var rangeToUse = dataRange || model.dataRange
    var delta = (rangeToUse[1] - rangeToUse[0]) / (model.opacities.length - 1)
    var nodes = []
    var midpoint = 0.5
    var sharpness = 0

    for (var index = 0; index < model.opacities.length; index++) {
      var x = rangeToUse[0] + delta * index
      var y = model.opacities[index]
      nodes.push({
        x: x,
        y: y,
        midpoint: midpoint,
        sharpness: sharpness,
      })
    }

    return nodes
  }

  publicAPI.applyOpacity = function(piecewiseFunction, dataRange) {
    var nodes = publicAPI.getOpacityNodes(dataRange)
    piecewiseFunction.setNodes(nodes)
  }

  publicAPI.getOpacityRange = function(dataRange) {
    var rangeToUse = dataRange || model.dataRange
    var delta = (rangeToUse[1] - rangeToUse[0]) / (model.opacities.length - 1)
    var minIndex = model.opacities.length - 1
    var maxIndex = 0

    for (var index = 0; index < model.opacities.length; index++) {
      if (model.opacities[index] > 0) {
        minIndex = Math.min(minIndex, index)
      }

      if (model.opacities[index] > 0) {
        maxIndex = Math.max(maxIndex, index)
      }
    }

    return [rangeToUse[0] + minIndex * delta, rangeToUse[0] + maxIndex * delta]
  }

  var enableZoom = publicAPI.setEnableRangeZoom

  publicAPI.setEnableRangeZoom = function(v) {
    var change = enableZoom(v)

    if (change) {
      model.colorCanvasMTime = 0
      model.rangeZoom = [0, 1]
    }

    return change
  }

  var rangeZoom = publicAPI.setRangeZoom

  publicAPI.setRangeZoom = function() {
    var change = rangeZoom.apply(void 0, arguments)

    if (change) {
      model.colorCanvasMTime = 0
    }

    return change
  } // Trigger rendering for any modified event

  publicAPI.onModified(function() {
    return publicAPI.render()
  })
  publicAPI.setSize.apply(publicAPI, _toConsumableArray(model.size))
} // ----------------------------------------------------------------------------
// Object factory
// ----------------------------------------------------------------------------

var DEFAULT_VALUES$1 = {
  histogram: [],
  numberOfBins: 256,
  histogramArray: null,
  dataRange: [0, 1],
  gaussians: [],
  opacities: [],
  size: [600, 300],
  piecewiseSize: 256,
  colorCanvasMTime: 0,
  gaussianMinimumHeight: 0.05,
  style: {
    backgroundColor: 'rgba(255, 255, 255, 1)',
    histogramColor: 'rgba(200, 200, 200, 0.5)',
    strokeColor: 'rgb(0, 0, 0)',
    activeColor: 'rgb(0, 0, 150)',
    buttonDisableFillColor: 'rgba(255, 255, 255, 0.5)',
    buttonDisableStrokeColor: 'rgba(0, 0, 0, 0.5)',
    buttonStrokeColor: 'rgba(0, 0, 0, 1)',
    buttonFillColor: 'rgba(255, 255, 255, 1)',
    handleColor: 'rgb(0, 150, 0)',
    strokeWidth: 2,
    activeStrokeWidth: 3,
    buttonStrokeWidth: 1.5,
    handleWidth: 3,
    iconSize: 20,
    padding: 10,
    zoomControlHeight: 10,
    zoomControlColor: '#999',
  },
  activeGaussian: -1,
  selectedGaussian: -1,
  enableRangeZoom: true,
  rangeZoom: [0, 1], // normalized value
} // ----------------------------------------------------------------------------

function extend$1(publicAPI, model) {
  var initialValues =
    arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {}
  Object.assign(model, DEFAULT_VALUES$1, initialValues) // Object methods

  macro.obj(publicAPI, model)
  macro.setGet(publicAPI, model, [
    'piecewiseSize',
    'numberOfBins',
    'colorTransferFunction',
    'backgroundImage',
    'enableRangeZoom',
    'gaussianMinimumHeight',
  ])
  macro.setGetArray(publicAPI, model, ['rangeZoom'], 2)
  macro.get(publicAPI, model, ['size', 'canvas', 'gaussians'])
  macro.event(publicAPI, model, 'opacityChange')
  macro.event(publicAPI, model, 'animation')
  macro.event(publicAPI, model, 'zoomChange') // Object specific methods

  vtkPiecewiseGaussianWidget(publicAPI, model)
} // ----------------------------------------------------------------------------

var newInstance$1 = macro.newInstance(extend$1, 'vtkPiecewiseGaussianWidget') // ----------------------------------------------------------------------------

var vtkPiecewiseGaussianWidget$1 = _objectSpread(
  {
    newInstance: newInstance$1,
    extend: extend$1,
  },
  STATIC
)

/* eslint-disable no-continue */
// ----------------------------------------------------------------------------
// vtkPiecewiseGaussianWidget methods
// ----------------------------------------------------------------------------

function vtkItkPiecewiseGaussianWidget(publicAPI, model) {
  // Set our className
  model.classHierarchy.push('vtkItkPiecewiseGaussianWidget')
} // ----------------------------------------------------------------------------
// Object factory
// ----------------------------------------------------------------------------

var DEFAULT_VALUES = {} // ----------------------------------------------------------------------------

function extend(publicAPI, model) {
  var initialValues =
    arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {}
  Object.assign(model, DEFAULT_VALUES, initialValues) // Inheritance

  vtkPiecewiseGaussianWidget$1.extend(publicAPI, model, initialValues)
  macro.setGet(publicAPI, model, ['histogram'])
  macro.setGetArray(publicAPI, model, ['dataRange'], 2) // Object specific methods

  vtkItkPiecewiseGaussianWidget(publicAPI, model)
} // ----------------------------------------------------------------------------

var newInstance = macro.newInstance(extend, 'vtkItkPiecewiseGaussianWidget') // ----------------------------------------------------------------------------

var vtkItkPiecewiseGaussianWidget$1 = {
  newInstance: newInstance,
  extend: extend,
}

function createTransferFunctionWidget(context, imagesUIGroup) {
  var transferFunctionWidget = vtkItkPiecewiseGaussianWidget$1.newInstance({
    numberOfBins: 256,
    size: [400, 150],
  })
  context.images.transferFunctionWidget = transferFunctionWidget
  transferFunctionWidget.setEnableRangeZoom(true)
  var iconSize = 20

  if (context.use2D) {
    iconSize = 0
  }

  transferFunctionWidget.updateStyle({
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    histogramColor: 'rgba(30, 30, 30, 0.6)',
    strokeColor: 'rgb(0, 0, 0)',
    activeColor: 'rgb(255, 255, 255)',
    handleColor: 'rgb(70, 70, 150)',
    buttonDisableFillColor: 'rgba(255, 255, 255, 0.5)',
    buttonDisableStrokeColor: 'rgba(0, 0, 0, 0.5)',
    buttonStrokeColor: 'rgba(0, 0, 0, 1)',
    buttonFillColor: 'rgba(255, 255, 255, 1)',
    strokeWidth: 2,
    activeStrokeWidth: 3,
    buttonStrokeWidth: 1.5,
    handleWidth: 2,
    zoomControlHeight: 20,
    zoomControlColor: 'rgba(50, 50, 100, 1)',
    iconSize: iconSize,
    // Can be 0 if you want to remove buttons (dblClick for (+) / rightClick for (-))
    padding: 10,
  })
  var piecewiseWidgetContainer = document.createElement('div')
  piecewiseWidgetContainer.setAttribute('class', style.piecewiseWidget)
  transferFunctionWidget.setContainer(piecewiseWidgetContainer)
  transferFunctionWidget.bindMouseListeners() // Create color map and piecewise function objects as needed

  if (typeof context.images.lookupTableProxies === 'undefined') {
    context.images.lookupTableProxies = new Map()
  } // Manage update when opacity changes

  transferFunctionWidget.onAnimation(function(start) {
    if (start) {
      context.service.send({
        type: 'REQUEST_ANIMATION',
        data: 'transferFunctionWidget',
      })
    } else {
      context.service.send({
        type: 'CANCEL_ANIMATION',
        data: 'transferFunctionWidget',
      })
    }
  })
  transferFunctionWidget.onOpacityChange(function() {
    var name = context.images.selectedName
    var actorContext = context.images.actorContext.get(name)
    var component = actorContext.selectedComponent
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
  })

  var onZoomChange = function onZoomChange(zoom) {
    var name = context.images.selectedName
    var actorContext = context.images.actorContext.get(name)
    var component = actorContext.selectedComponent
    var fullRange = actorContext.colorRanges.get(component)
    var diff = fullRange[1] - fullRange[0]
    var colorRange = new Array(2)
    colorRange[0] = fullRange[0] + zoom[0] * diff
    colorRange[1] = fullRange[0] + zoom[1] * diff
    context.service.send({
      type: 'IMAGE_COLOR_RANGE_CHANGED',
      data: {
        name: name,
        component: component,
        range: colorRange,
      },
    })
  }

  transferFunctionWidget.onZoomChange(macro.throttle(onZoomChange, 150))
  var transferFunctionWidgetRow = document.createElement('div')
  transferFunctionWidgetRow.setAttribute('class', style.uiRow) // This row needs background different from normal uiRows, to aid
  // in the illusion that it's the content portion of a tabbed pane

  transferFunctionWidgetRow.setAttribute(
    'style',
    'background: rgba(127, 127, 127, 0.5);'
  )
  transferFunctionWidgetRow.appendChild(piecewiseWidgetContainer)
  imagesUIGroup.appendChild(transferFunctionWidgetRow) // Create range manipulator

  var rangeManipulator = vtkMouseRangeManipulator$1.newInstance({
    button: 1,
    alt: true,
  })
  context.images.transferFunctionManipulator = {
    rangeManipulator: null,
    windowMotionScale: 150.0,
    levelMotionScale: 150.0,
    windowGet: null,
    windowSet: null,
    levelGet: null,
    levelSet: null,
  }
  context.images.transferFunctionManipulator.rangeManipulator = rangeManipulator // Window

  var windowGet = function windowGet() {
    var gaussian = transferFunctionWidget.getGaussians()[0]
    return (
      gaussian.width *
      context.images.transferFunctionManipulator.windowMotionScale
    )
  }

  context.images.transferFunctionManipulator.windowGet = windowGet

  var windowSet = function windowSet(value) {
    var gaussians = transferFunctionWidget.getGaussians()
    var newGaussians = gaussians.slice()
    newGaussians[0].width =
      value / context.images.transferFunctionManipulator.windowMotionScale
    var name = context.images.selectedName
    context.images.actorContext.get(name)
    var component = context.images.selectedComponent
    context.service.send({
      type: 'IMAGE_PIECEWISE_FUNCTION_GAUSSIANS_CHANGED',
      data: {
        name: name,
        component: component,
        gaussians: newGaussians,
      },
    })
  }

  context.images.transferFunctionManipulator.windowSet = windowSet // Level

  var levelGet = function levelGet() {
    var gaussian = transferFunctionWidget.getGaussians()[0]
    return (
      gaussian.position *
      context.images.transferFunctionManipulator.levelMotionScale
    )
  }

  context.images.transferFunctionManipulator.levelGet = levelGet

  var levelSet = function levelSet(value) {
    var gaussians = transferFunctionWidget.getGaussians()
    var newGaussians = gaussians.slice()
    var name = context.images.selectedName
    context.images.actorContext.get(name)
    var component = context.images.selectedComponent
    context.service.send({
      type: 'IMAGE_PIECEWISE_FUNCTION_GAUSSIANS_CHANGED',
      data: {
        name: name,
        component: component,
        gaussians: newGaussians,
      },
    })
  }

  context.images.transferFunctionManipulator.levelSet = levelSet // Add range manipulator

  context.itkVtkView
    .getInteractorStyle2D()
    .addMouseManipulator(rangeManipulator)
  context.itkVtkView
    .getInteractorStyle3D()
    .addMouseManipulator(rangeManipulator)
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
  var pwfMotionScale = 200.0

  var pwfGet = function pwfGet() {
    var gaussian = transferFunctionWidget.getGaussians()[0]
    return gaussian.height * pwfMotionScale
  }

  var pwfSet = function pwfSet(value) {
    var gaussians = transferFunctionWidget.getGaussians()
    var newGaussians = gaussians.slice()
    newGaussians[0].height = value / pwfMotionScale
    var name = context.images.selectedName
    context.images.actorContext.get(name)
    var component = context.images.selectedComponent
    context.service.send({
      type: 'IMAGE_PIECEWISE_FUNCTION_GAUSSIANS_CHANGED',
      data: {
        name: name,
        component: component,
        gaussians: newGaussians,
      },
    })
  }

  pwfRangeManipulator.setVerticalListener(0, pwfMotionScale, 1, pwfGet, pwfSet)
  pwfRangeManipulatorShift.setVerticalListener(
    0,
    pwfMotionScale,
    1,
    pwfGet,
    pwfSet
  )
  context.itkVtkView
    .getInteractorStyle3D()
    .addMouseManipulator(pwfRangeManipulator)
  context.itkVtkView
    .getInteractorStyle3D()
    .addMouseManipulator(pwfRangeManipulatorShift)
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
  context.id
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
}

function applyColorRange(context, event) {
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
  var gaussians = actorContext.piecewiseFunctionGaussians.get(component)
  var newGaussians = gaussians.slice()
  var fullRange = colorRange

  if (actorContext.colorRangeBounds.has(component)) {
    fullRange = actorContext.colorRangeBounds.get(component)
  }

  var diff = fullRange[1] - fullRange[0]
  context.images.transferFunctionManipulator.windowMotionScale = diff
  context.images.transferFunctionManipulator.levelMotionScale = diff
  var _context$images$trans = context.images.transferFunctionManipulator,
    rangeManipulator = _context$images$trans.rangeManipulator,
    windowMotionScale = _context$images$trans.windowMotionScale
  _context$images$trans.levelMotionScale
  var windowGet = _context$images$trans.windowGet,
    windowSet = _context$images$trans.windowSet,
    levelGet = _context$images$trans.levelGet,
    levelSet = _context$images$trans.levelSet
  rangeManipulator.setVerticalListener(
    0,
    windowMotionScale,
    diff / 100.0,
    windowGet,
    windowSet
  )
  rangeManipulator.setHorizontalListener(
    fullRange[0],
    fullRange[1],
    diff / 100.0,
    levelGet,
    levelSet
  )
  var colorRangeNormalized = new Array(2)
  colorRangeNormalized[0] = (colorRange[0] - fullRange[0]) / diff
  colorRangeNormalized[1] = (colorRange[1] - fullRange[0]) / diff
  var transferFunctionWidget = context.images.transferFunctionWidget
  transferFunctionWidget.setRangeZoom(colorRangeNormalized)
  var minValue = Infinity
  var maxValue = -Infinity
  var count = gaussians.length

  while (count--) {
    var _newGaussians$count = newGaussians[count],
      position = _newGaussians$count.position,
      width = _newGaussians$count.width,
      xBias = _newGaussians$count.xBias,
      yBias = _newGaussians$count.yBias

    if (position - width < colorRangeNormalized[0]) {
      position = colorRangeNormalized[0] + width
      newGaussians[count].position = position

      if (position + width > colorRangeNormalized[1]) {
        var newWidth = (colorRangeNormalized[1] - colorRangeNormalized[0]) / 2
        position = colorRangeNormalized[0] + newWidth
        newGaussians[count].position = position
        newGaussians[count].width = newWidth

        if (!context.use2D) {
          newGaussians[count].xBias = (newWidth / width) * xBias
          newGaussians[count].yBias = (newWidth / width) * yBias
        }
      }
    }

    if (position + width > colorRangeNormalized[1]) {
      position = colorRangeNormalized[1] - width
      newGaussians[count].position = position

      if (position - width < colorRangeNormalized[0]) {
        var _newWidth = (colorRangeNormalized[1] - colorRangeNormalized[0]) / 2

        position = colorRangeNormalized[0] + _newWidth
        newGaussians[count].position = position
        newGaussians[count].width = _newWidth

        if (!context.use2D) {
          newGaussians[count].xBias = (_newWidth / width) * xBias
          newGaussians[count].yBias = (_newWidth / width) * yBias
        }
      }
    }

    minValue = Math.min(minValue, position - width)
    maxValue = Math.max(maxValue, position + width)
  }

  if (
    colorRangeNormalized[0] < minValue ||
    colorRangeNormalized[1] > maxValue
  ) {
    var _newWidth2 = (colorRangeNormalized[1] - colorRangeNormalized[0]) / 2

    var _position = colorRangeNormalized[0] + _newWidth2

    newGaussians[0].position = _position

    if (!context.use2D) {
      newGaussians[0].xBias =
        (_newWidth2 / newGaussians[0].width) * newGaussians[0].xBias
      newGaussians[0].yBias =
        (_newWidth2 / newGaussians[0].width) * newGaussians[0].yBias
    }

    newGaussians[0].width = _newWidth2
  }

  context.images.transferFunctionWidget.setDataRange(colorRange)
  context.images.transferFunctionWidget.render()
  context.service.send({
    type: 'IMAGE_PIECEWISE_FUNCTION_GAUSSIANS_CHANGED',
    data: {
      name: name,
      component: component,
      gaussians: newGaussians,
    },
  })
}

function applyColorMap(context, event) {
  var name = event.data.name
  var component = event.data.component
  var actorContext = context.images.actorContext.get(name)
  var colorMap = event.data.colorMap

  if (
    name !== context.images.selectedName ||
    component !== actorContext.selectedComponent
  ) {
    return
  }

  var lookupTableProxy = null

  if (context.images.lookupTableProxies.has(component)) {
    lookupTableProxy = context.images.lookupTableProxies.get(component)
  } else {
    lookupTableProxy = vtkLookupTableProxy$1.newInstance()
    context.images.lookupTableProxies.set(component, lookupTableProxy)
  }

  var currentColorMap = lookupTableProxy.getPresetName()

  if (currentColorMap !== colorMap) {
    lookupTableProxy.setPresetName(colorMap)
    lookupTableProxy.setMode(vtkLookupTableProxy$1.Mode.Preset)
    var colorTransferFunction = lookupTableProxy.getLookupTable()

    if (actorContext.colorRanges.has(component)) {
      var range = actorContext.colorRanges.get(component)
      colorTransferFunction.setMappingRange(range[0], range[1])
      colorTransferFunction.updateRange()
    }
  }

  var transferFunctionWidget = context.images.transferFunctionWidget
  transferFunctionWidget.setColorTransferFunction(
    lookupTableProxy.getLookupTable()
  )
  transferFunctionWidget.render() // Todo:
  //const transferFunctionWidget = store.imageUI.transferFunctionWidget
  //if (colorMap.startsWith('Custom')) {
  //lookupTableProxy.setMode(vtkLookupTableProxy.Mode.RGBPoints)
  //const colorDataRange = transferFunctionWidget.getOpacityRange(dataRange)
  //if (!!colorDataRange) {
  //colorTransferFunction.setMappingRange(...colorDataRange)
  //}
  //colorTransferFunction.updateRange()
  //const isIcons = iconSelector.getIcons()
  //if (!!!customIcon) {
  //const colorMapIcon = customColorMapIcon(
  //colorTransferFunction,
  //colorDataRange
  //)
  //customIcon = { iconFilePath: colorMapIcon, iconValue: colorMap }
  //icons.push(customIcon)
  //iconSelector.refresh(icons)
  //} else if (isIcons[isIcons.length - 1].iconValue !== colorMap) {
  //const colorMapIcon = customColorMapIcon(
  //colorTransferFunction,
  //colorDataRange
  //)
  //isIcons[isIcons.length - 1].element.src = colorMapIcon
  //isIcons[isIcons.length - 1].iconFilePath = colorMapIcon
  //isIcons[isIcons.length - 1].iconValue = colorMap
  //isIcons[isIcons.length - 1].element.setAttribute('icon-value', colorMap)
  //isIcons[isIcons.length - 1].element.setAttribute('alt', colorMap)
  //isIcons[isIcons.length - 1].element.setAttribute('title', colorMap)
  //}
  //}
  //context.images.iconSelector.setSelectedValue(colorMap)
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
    } //debugger

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

    if (actorContext.piecewiseFunctionGaussians.has(component)) {
      var gaussians = actorContext.piecewiseFunctionGaussians.get(component)
      applyPiecewiseFunctionGaussians(context, {
        data: {
          name: name,
          component: component,
          gaussians: gaussians,
        },
      })
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

var CategoricalColors = new Map()
CategoricalColors.set('glasbey', [
  [0.843137, 0.0, 0.0],
  [0.54902, 0.235294, 1.0],
  [0.007843, 0.533333, 0.0],
  [0.0, 0.67451, 0.780392],
  [0.596078, 1.0, 0.0],
  [1.0, 0.498039, 0.819608],
  [0.423529, 0.0, 0.309804],
  [1.0, 0.647059, 0.188235],
  [0.345098, 0.231373, 0.0],
  [0.0, 0.341176, 0.34902],
  [0.0, 0.0, 0.866667],
  [0.0, 0.992157, 0.811765],
  [0.631373, 0.458824, 0.415686],
  [0.737255, 0.717647, 1.0],
  [0.584314, 0.709804, 0.470588],
  [0.752941, 0.015686, 0.72549],
  [0.392157, 0.329412, 0.454902],
  [0.47451, 0.0, 0.0],
  [0.027451, 0.454902, 0.847059],
  [0.996078, 0.960784, 0.564706],
  [0.0, 0.294118, 0.0],
  [0.560784, 0.478431, 0.0],
  [1.0, 0.447059, 0.4],
  [0.933333, 0.72549, 0.72549],
  [0.368627, 0.494118, 0.4],
  [0.607843, 0.894118, 1.0],
  [0.92549, 0.0, 0.466667],
  [0.65098, 0.482353, 0.72549],
  [0.352941, 0.0, 0.643137],
  [0.015686, 0.776471, 0.0],
  [0.619608, 0.294118, 0.0],
  [0.611765, 0.231373, 0.313725],
  [0.796078, 0.768627, 0.0],
  [0.443137, 0.509804, 0.596078],
  [0.0, 0.686275, 0.541176],
  [0.513725, 0.533333, 1.0],
  [0.364706, 0.215686, 0.231373],
  [0.223529, 0.0, 0.0],
  [0.992157, 0.752941, 1.0],
  [0.745098, 0.905882, 0.752941],
  [0.858824, 0.427451, 0.003922],
  [0.576471, 0.721569, 0.713725],
  [0.894118, 0.321569, 1.0],
  [0.184314, 0.32549, 0.509804],
  [0.768627, 0.4, 0.564706],
  [0.333333, 0.384314, 0.12549],
  [0.772549, 0.623529, 0.447059],
  [0.015686, 0.509804, 0.529412],
  [0.411765, 0.905882, 0.501961],
  [0.501961, 0.152941, 0.564706],
  [0.427451, 0.705882, 1.0],
  [0.305882, 0.2, 1.0],
  [0.52549, 0.639216, 0.007843],
  [0.996078, 0.011765, 0.796078],
  [0.760784, 0.65098, 0.772549],
  [0.772549, 0.341176, 0.27451],
  [0.462745, 0.345098, 0.239216],
  [0.003922, 0.407843, 0.258824],
  [0.0, 0.839216, 0.835294],
  [0.854902, 0.878431, 1.0],
  [0.976471, 1.0, 0.0],
  [0.415686, 0.407843, 0.690196],
  [0.764706, 0.596078, 0.0],
  [0.882353, 0.803922, 0.611765],
  [0.854902, 0.588235, 1.0],
  [0.733333, 0.011765, 0.992157],
  [0.572549, 0.321569, 0.509804],
  [0.627451, 0.0, 0.45098],
  [0.341176, 0.607843, 0.333333],
  [0.827451, 0.54902, 0.560784],
  [0.215686, 0.270588, 0.152941],
  [0.592157, 0.647059, 0.764706],
  [0.556863, 0.552941, 0.372549],
  [1.0, 0.27451, 0.0],
  [0.784314, 1.0, 0.980392],
  [0.682353, 0.427451, 1.0],
  [0.431373, 0.815686, 0.654902],
  [0.74902, 1.0, 0.54902],
  [0.54902, 0.329412, 0.694118],
  [0.470588, 0.211765, 0.098039],
  [1.0, 0.627451, 0.47451],
  [0.662745, 0.0, 0.121569],
  [1.0, 0.109804, 0.270588],
  [0.372549, 0.066667, 0.137255],
  [0.403922, 0.592157, 0.580392],
  [1.0, 0.372549, 0.580392],
  [0.298039, 0.403922, 0.454902],
  [0.32549, 0.572549, 0.8],
  [0.666667, 0.443137, 0.192157],
  [0.007843, 0.811765, 0.996078],
  [0.0, 0.768627, 0.423529],
  [0.380392, 0.207843, 0.364706],
  [0.564706, 0.831373, 0.184314],
  [0.74902, 0.835294, 0.486275],
  [0.317647, 0.270588, 0.635294],
  [0.305882, 0.137255, 0.047059],
  [0.486275, 0.352941, 0.0],
  [1.0, 0.807843, 0.266667],
  [0.513725, 0.007843, 0.811765],
  [0.301961, 0.992157, 1.0],
  [0.537255, 0.0, 0.239216],
  [0.482353, 0.321569, 0.360784],
  [0.0, 0.454902, 0.615686],
  [0.666667, 0.513725, 0.596078],
  [0.505882, 0.443137, 0.560784],
  [0.384314, 0.396078, 0.996078],
  [0.764706, 0.203922, 0.537255],
  [0.803922, 0.160784, 0.278431],
  [1.0, 0.603922, 0.709804],
  [0.764706, 0.364706, 0.733333],
  [0.129412, 0.407843, 0.007843],
  [0.0, 0.556863, 0.396078],
  [0.388235, 0.501961, 0.137255],
  [0.537255, 0.529412, 0.74902],
  [0.596078, 0.866667, 0.835294],
  [0.807843, 0.498039, 0.345098],
  [0.823529, 0.717647, 0.356863],
  [0.380392, 0.0, 0.431373],
  [0.6, 0.329412, 0.266667],
  [0.690196, 0.780392, 0.858824],
  [0.94902, 1.0, 0.823529],
  [0.0, 0.92549, 0.007843],
  [0.803922, 0.52549, 0.741176],
  [0.270588, 0.0, 0.772549],
  [0.478431, 0.615686, 0.498039],
  [0.447059, 0.443137, 0.278431],
  [0.576471, 1.0, 0.729412],
  [0.0, 0.329412, 0.756863],
  [0.678431, 0.580392, 0.92549],
  [0.247059, 0.643137, 0.086275],
  [0.372549, 0.227451, 0.501961],
  [0.0, 0.298039, 0.2],
  [0.486275, 0.721569, 0.827451],
  [0.596078, 0.164706, 0.0],
  [0.223529, 0.431373, 0.392157],
  [0.721569, 0.0, 0.356863],
  [1.0, 0.501961, 0.239216],
  [1.0, 0.823529, 0.913725],
  [0.501961, 0.188235, 0.352941],
  [0.129412, 0.203922, 0.0],
  [0.631373, 0.368627, 0.435294],
  [0.309804, 0.709804, 0.690196],
  [0.623529, 0.623529, 0.27451],
  [0.2, 0.486275, 0.239216],
  [0.760784, 0.254902, 0.0],
  [0.780392, 0.909804, 0.243137],
  [0.423529, 0.019608, 0.909804],
  [0.462745, 0.737255, 0.313725],
  [0.647059, 0.772549, 0.662745],
  [0.854902, 0.329412, 0.431373],
  [0.847059, 0.560784, 0.219608],
  [0.984314, 0.486275, 1.0],
  [0.294118, 0.392157, 0.286275],
  [0.839216, 0.764706, 0.921569],
  [0.478431, 0.180392, 0.211765],
  [0.298039, 0.560784, 0.647059],
  [0.27451, 0.533333, 1.0],
  [0.639216, 0.0, 0.768627],
  [0.917647, 0.639216, 0.835294],
  [1.0, 0.737255, 0.470588],
  [0.278431, 0.282353, 0.0],
  [0.635294, 0.780392, 1.0],
  [0.568627, 0.635294, 0.917647],
  [0.309804, 0.411765, 0.576471],
  [0.905882, 0.368627, 0.698039],
  [0.623529, 0.568627, 0.690196],
  [0.345098, 0.317647, 0.168627],
  [0.690196, 0.368627, 0.831373],
  [0.52549, 0.427451, 0.882353],
  [0.756863, 0.431373, 0.447059],
  [0.894118, 0.0, 0.890196],
  [0.72549, 0.717647, 0.545098],
  [0.223529, 0.180392, 0.0],
  [0.890196, 0.494118, 0.643137],
  [0.678431, 0.231373, 0.188235],
  [0.662745, 0.733333, 0.298039],
  [0.411765, 0.709804, 0.513725],
  [0.580392, 0.823529, 0.564706],
  [0.690196, 0.552941, 0.27451],
  [0.027451, 0.372549, 0.470588],
  [0.0, 0.596078, 0.537255],
  [0.352941, 0.058824, 0.007843],
  [0.356863, 0.490196, 0.501961],
  [0.188235, 0.345098, 0.14902],
  [0.898039, 0.396078, 0.231373],
  [0.372549, 0.25098, 0.160784],
  [0.45098, 0.290196, 0.737255],
  [0.294118, 0.32549, 0.419608],
  [0.788235, 0.478431, 0.866667],
  [0.611765, 0.196078, 0.568627],
  [0.784314, 0.901961, 0.94902],
  [0.019608, 0.670588, 0.921569],
  [0.654902, 0.419608, 0.603922],
  [0.905882, 0.690196, 0.0],
  [0.376471, 1.0, 0.388235],
  [0.94902, 0.870588, 0.0],
  [0.466667, 0.266667, 0.003922],
  [0.376471, 0.145098, 0.254902],
  [0.407843, 0.498039, 0.796078],
  [0.47451, 0.623529, 0.690196],
  [0.05098, 0.913725, 0.635294],
  [0.615686, 0.972549, 0.858824],
  [0.517647, 0.0, 0.462745],
  [0.556863, 0.427451, 0.286275],
  [0.890196, 0.254902, 0.188235],
  [0.72549, 0.286275, 0.423529],
  [0.478431, 0.290196, 0.52549],
  [1.0, 0.815686, 0.713725],
  [0.298039, 0.364706, 0.780392],
  [0.886275, 0.701961, 0.572549],
  [1.0, 0.298039, 0.933333],
  [0.839216, 0.941176, 0.647059],
  [0.74902, 0.376471, 0.14902],
  [0.843137, 0.639216, 0.709804],
  [0.741176, 0.490196, 0.0],
  [0.533333, 0.435294, 0.698039],
  [1.0, 0.188235, 0.631373],
  [1.0, 0.913725, 0.690196],
  [0.2, 0.345098, 0.298039],
  [0.721569, 0.54902, 0.478431],
  [0.423529, 0.529412, 0.321569],
  [0.737255, 0.580392, 0.823529],
  [0.105882, 0.901961, 0.996078],
  [0.631373, 0.235294, 0.447059],
  [0.639216, 0.317647, 0.658824],
  [0.427451, 0.0, 0.596078],
  [0.537255, 0.396078, 0.482353],
  [0.352941, 0.345098, 0.545098],
  [0.976471, 0.560784, 0.545098],
  [0.905882, 0.843137, 0.486275],
  [0.439216, 0.423529, 0.003922],
  [0.098039, 0.34902, 1.0],
  [0.090196, 0.14902, 1.0],
  [0.0, 0.847059, 0.337255],
  [0.972549, 0.631373, 0.992157],
  [0.478431, 0.588235, 0.235294],
  [0.694118, 0.654902, 0.835294],
  [0.494118, 0.815686, 0.866667],
  [0.0, 0.796078, 0.690196],
  [0.478431, 0.278431, 0.235294],
  [0.854902, 1.0, 0.901961],
  [0.858824, 0.019608, 0.694118],
  [0.952941, 0.866667, 1.0],
  [0.639216, 0.894118, 0.435294],
  [0.541176, 0.07451, 0.137255],
  [0.4, 0.407843, 0.513725],
  [0.909804, 0.992157, 0.439216],
  [0.847059, 0.670588, 0.909804],
  [0.878431, 0.729412, 0.835294],
  [0.996078, 0.32549, 0.411765],
  [0.458824, 0.682353, 0.607843],
  [0.596078, 0.2, 0.878431],
  [0.894118, 0.45098, 0.494118],
  [0.54902, 0.34902, 0.14902],
  [0.466667, 0.278431, 0.411765],
  [0.184314, 0.243137, 0.658824],
])
CategoricalColors.set('glasbey_bw', [
  [0.843137, 0.0, 0.0],
  [0.54902, 0.235294, 1.0],
  [0.007843, 0.533333, 0.0],
  [0.0, 0.67451, 0.780392],
  [0.596078, 1.0, 0.0],
  [1.0, 0.498039, 0.819608],
  [0.423529, 0.0, 0.309804],
  [1.0, 0.647059, 0.188235],
  [0.0, 0.0, 0.615686],
  [0.52549, 0.439216, 0.407843],
  [0.0, 0.286275, 0.258824],
  [0.309804, 0.164706, 0.0],
  [0.0, 0.992157, 0.811765],
  [0.737255, 0.717647, 1.0],
  [0.584314, 0.705882, 0.478431],
  [0.752941, 0.015686, 0.72549],
  [0.145098, 0.4, 0.635294],
  [0.156863, 0.0, 0.254902],
  [0.862745, 0.701961, 0.686275],
  [0.996078, 0.960784, 0.564706],
  [0.313725, 0.270588, 0.356863],
  [0.643137, 0.486275, 0.0],
  [1.0, 0.443137, 0.4],
  [0.247059, 0.505882, 0.431373],
  [0.509804, 0.0, 0.05098],
  [0.639216, 0.482353, 0.701961],
  [0.203922, 0.305882, 0.0],
  [0.607843, 0.894118, 1.0],
  [0.921569, 0.0, 0.466667],
  [0.176471, 0.0, 0.039216],
  [0.368627, 0.564706, 1.0],
  [0.0, 0.780392, 0.12549],
  [0.345098, 0.003922, 0.666667],
  [0.0, 0.117647, 0.0],
  [0.603922, 0.278431, 0.0],
  [0.588235, 0.623529, 0.65098],
  [0.607843, 0.258824, 0.360784],
  [0.0, 0.121569, 0.196078],
  [0.784314, 0.768627, 0.0],
  [1.0, 0.815686, 1.0],
  [0.0, 0.745098, 0.603922],
  [0.215686, 0.082353, 1.0],
  [0.176471, 0.145098, 0.145098],
  [0.87451, 0.345098, 1.0],
  [0.745098, 0.905882, 0.752941],
  [0.498039, 0.270588, 0.596078],
  [0.321569, 0.309804, 0.235294],
  [0.847059, 0.4, 0.0],
  [0.392157, 0.454902, 0.219608],
  [0.756863, 0.45098, 0.533333],
  [0.431373, 0.454902, 0.541176],
  [0.501961, 0.615686, 0.011765],
  [0.745098, 0.545098, 0.396078],
  [0.388235, 0.2, 0.223529],
  [0.792157, 0.803922, 0.854902],
  [0.423529, 0.921569, 0.513725],
  [0.133333, 0.25098, 0.411765],
  [0.635294, 0.498039, 1.0],
  [0.996078, 0.011765, 0.796078],
  [0.462745, 0.737255, 0.992157],
  [0.85098, 0.764706, 0.509804],
  [0.807843, 0.639216, 0.807843],
  [0.427451, 0.313725, 0.0],
  [0.0, 0.411765, 0.454902],
  [0.278431, 0.623529, 0.368627],
  [0.580392, 0.776471, 0.74902],
  [0.976471, 1.0, 0.0],
  [0.752941, 0.329412, 0.270588],
  [0.0, 0.396078, 0.235294],
  [0.356863, 0.313725, 0.658824],
  [0.32549, 0.12549, 0.392157],
  [0.309804, 0.372549, 1.0],
  [0.494118, 0.560784, 0.466667],
  [0.72549, 0.031373, 0.980392],
  [0.545098, 0.572549, 0.764706],
  [0.701961, 0.0, 0.207843],
  [0.533333, 0.376471, 0.494118],
  [0.623529, 0.0, 0.458824],
  [1.0, 0.870588, 0.768627],
  [0.317647, 0.031373, 0.0],
  [0.101961, 0.031373, 0.0],
  [0.298039, 0.537255, 0.713725],
  [0.0, 0.87451, 0.87451],
  [0.784314, 1.0, 0.980392],
  [0.188235, 0.207843, 0.082353],
  [1.0, 0.152941, 0.278431],
  [1.0, 0.592157, 0.666667],
  [0.015686, 0.0, 0.101961],
  [0.788235, 0.376471, 0.694118],
  [0.764706, 0.635294, 0.215686],
  [0.486275, 0.309804, 0.227451],
  [0.976471, 0.619608, 0.466667],
  [0.337255, 0.396078, 0.392157],
  [0.819608, 0.576471, 1.0],
  [0.176471, 0.121569, 0.411765],
  [0.254902, 0.105882, 0.203922],
  [0.686275, 0.576471, 0.596078],
  [0.384314, 0.619608, 0.6],
  [0.741176, 0.870588, 0.482353],
  [1.0, 0.368627, 0.580392],
  [0.058824, 0.160784, 0.137255],
  [0.721569, 0.745098, 0.67451],
  [0.454902, 0.231373, 0.396078],
  [0.062745, 0.0, 0.05098],
  [0.498039, 0.431373, 0.741176],
  [0.619608, 0.419608, 0.231373],
  [1.0, 0.27451, 0.0],
  [0.498039, 0.0, 0.529412],
  [1.0, 0.807843, 0.243137],
  [0.188235, 0.231373, 0.262745],
  [0.996078, 0.647059, 1.0],
  [0.541176, 0.007843, 0.243137],
  [0.462745, 0.172549, 0.003922],
  [0.039216, 0.541176, 0.588235],
  [0.019608, 0.0, 0.321569],
  [0.556863, 0.839216, 0.196078],
  [0.32549, 0.768627, 0.45098],
  [0.278431, 0.34902, 0.443137],
  [0.345098, 0.007843, 0.133333],
  [0.65098, 0.133333, 0.003922],
  [0.564706, 0.576471, 0.298039],
  [0.0, 0.262745, 0.117647],
  [0.505882, 0.0, 0.819608],
  [0.184314, 0.14902, 0.247059],
  [0.74902, 0.223529, 0.517647],
  [0.960784, 1.0, 0.835294],
  [0.0, 0.827451, 1.0],
  [0.415686, 0.0, 0.972549],
  [0.611765, 0.733333, 0.823529],
  [0.478431, 0.85098, 0.670588],
  [0.411765, 0.341176, 0.364706],
  [0.0, 0.411765, 0.019608],
  [0.211765, 0.211765, 0.611765],
  [0.003922, 0.513725, 0.278431],
  [0.266667, 0.117647, 0.094118],
  [0.027451, 0.647059, 0.937255],
  [1.0, 0.505882, 0.188235],
  [0.654902, 0.333333, 0.721569],
  [0.407843, 0.352941, 0.513725],
  [0.45098, 1.0, 1.0],
  [0.85098, 0.529412, 0.007843],
  [0.733333, 0.827451, 1.0],
  [0.556863, 0.215686, 0.184314],
  [0.654902, 0.627451, 0.501961],
  [0.0, 0.490196, 0.890196],
  [0.556863, 0.494118, 0.560784],
  [0.6, 0.266667, 0.533333],
  [0.0, 0.945098, 0.207843],
  [0.682353, 0.666667, 0.788235],
  [0.627451, 0.380392, 0.384314],
  [0.298039, 0.227451, 0.466667],
  [0.423529, 0.509804, 0.513725],
  [0.945098, 0.866667, 0.905882],
  [1.0, 0.733333, 0.827451],
  [0.219608, 0.647059, 0.137255],
  [0.705882, 1.0, 0.658824],
  [0.047059, 0.070588, 0.027451],
  [0.843137, 0.321569, 0.431373],
  [0.584314, 0.623529, 0.996078],
  [0.490196, 0.498039, 0.0],
  [0.462745, 0.623529, 0.72549],
  [0.858824, 0.529412, 0.498039],
  [0.066667, 0.07451, 0.098039],
  [0.831373, 0.509804, 0.831373],
  [0.623529, 0.0, 0.74902],
  [0.862745, 0.937255, 1.0],
  [0.556863, 0.670588, 0.603922],
  [0.443137, 0.392157, 0.258824],
  [0.290196, 0.235294, 0.243137],
  [0.031373, 0.305882, 0.372549],
  [0.611765, 0.721569, 0.266667],
  [0.847059, 0.870588, 0.835294],
  [0.796078, 1.0, 0.423529],
  [0.701961, 0.392157, 0.921569],
  [0.27451, 0.364706, 0.2],
  [0.0, 0.619608, 0.490196],
  [0.760784, 0.254902, 0.0],
  [0.309804, 0.737255, 0.733333],
  [0.85098, 0.545098, 0.694118],
  [0.356863, 0.45098, 0.713725],
  [0.294118, 0.254902, 0.003922],
  [0.584314, 0.513725, 0.368627],
  [0.286275, 0.454902, 0.545098],
  [1.0, 0.45098, 1.0],
  [0.513725, 0.415686, 0.113725],
  [0.862745, 0.811765, 1.0],
  [0.494118, 0.419608, 0.996078],
  [0.388235, 0.462745, 0.376471],
  [1.0, 0.756863, 0.572549],
  [0.34902, 0.368627, 0.0],
  [0.894118, 0.035294, 0.901961],
  [0.72549, 0.694118, 0.717647],
  [0.827451, 0.176471, 0.254902],
  [0.196078, 0.258824, 0.215686],
  [0.85098, 0.639216, 0.388235],
  [0.356863, 0.545098, 0.2],
  [0.184314, 0.121569, 0.0],
  [0.596078, 0.905882, 0.843137],
  [0.164706, 0.384314, 0.341176],
  [0.807843, 0.447059, 0.301961],
  [0.364706, 0.239216, 0.156863],
  [0.0, 0.34902, 0.85098],
  [0.678431, 0.580392, 0.839216],
  [0.419608, 0.117647, 0.580392],
  [0.705882, 0.003922, 0.368627],
  [0.254902, 0.0, 0.27451],
  [0.615686, 1.0, 0.811765],
  [0.894118, 0.282353, 0.615686],
  [0.890196, 0.890196, 0.278431],
  [0.862745, 0.886275, 0.647059],
  [0.0, 0.156863, 0.352941],
  [0.666667, 0.356863, 0.509804],
  [0.0, 0.0, 0.862745],
  [0.294118, 0.305882, 0.317647],
  [0.854902, 0.74902, 0.835294],
  [0.0, 0.301961, 0.6],
  [0.533333, 0.392157, 0.619608],
  [0.415686, 0.117647, 0.113725],
  [0.556863, 0.321569, 0.772549],
  [0.721569, 0.854902, 0.87451],
  [0.866667, 0.701961, 0.992157],
  [0.482353, 0.282353, 0.329412],
  [0.298039, 0.45098, 0.0],
  [0.270588, 0.0, 0.466667],
  [0.698039, 0.372549, 0.0],
  [0.572549, 0.819608, 0.52549],
  [0.333333, 0.2, 0.298039],
  [0.411765, 0.690196, 0.521569],
  [0.670588, 0.576471, 0.690196],
  [0.905882, 0.329412, 0.258824],
  [0.560784, 0.54902, 0.541176],
  [0.439216, 0.678431, 0.317647],
  [0.670588, 0.486275, 0.454902],
  [0.0, 0.203922, 0.235294],
  [0.145098, 0.058824, 0.07451],
  [0.905882, 0.690196, 0.0],
  [0.478431, 0.8, 0.862745],
  [0.094118, 0.078431, 0.227451],
  [0.615686, 0.321569, 0.223529],
  [0.733333, 0.482353, 0.192157],
  [0.717647, 0.792157, 0.580392],
  [0.192157, 0.031373, 0.0],
  [0.639216, 0.584314, 0.023529],
  [0.0, 0.854902, 0.729412],
  [0.454902, 0.627451, 0.870588],
  [0.388235, 0.235294, 0.45098],
  [1.0, 0.854902, 0.560784],
  [0.466667, 0.721569, 0.0],
  [0.25098, 0.184314, 0.113725],
  [0.345098, 0.529412, 0.34902],
  [0.176471, 0.0, 0.129412],
  [0.960784, 0.631373, 0.831373],
  [0.854902, 0.0, 0.666667],
  [0.462745, 0.160784, 0.286275],
  [0.741176, 0.898039, 0.0],
  [0.764706, 0.760784, 0.364706],
])
CategoricalColors.set('glasbey_warm', [
  [0.843137, 0.0, 0.0],
  [1.0, 0.384314, 0.972549],
  [0.67451, 0.615686, 0.0],
  [0.454902, 0.0, 0.443137],
  [0.317647, 0.286275, 0.0],
  [1.0, 0.603922, 0.537255],
  [0.568627, 0.443137, 0.541176],
  [1.0, 0.945098, 0.439216],
  [0.815686, 0.0, 0.505882],
  [0.509804, 0.227451, 0.196078],
  [1.0, 0.760784, 0.956863],
  [0.729412, 0.423529, 0.188235],
  [0.776471, 0.74902, 0.572549],
  [1.0, 0.607843, 0.0],
  [1.0, 0.301961, 0.419608],
  [0.470588, 0.45098, 0.298039],
  [0.835294, 0.545098, 0.701961],
  [0.392157, 0.27451, 0.368627],
  [1.0, 0.352941, 0.0],
  [0.627451, 0.25098, 0.607843],
  [0.713725, 0.345098, 0.388235],
  [0.576471, 0.0, 0.301961],
  [0.52549, 0.309804, 0.003922],
  [0.729412, 0.54902, 0.498039],
  [0.603922, 0.0, 0.0],
  [1.0, 0.8, 0.729412],
  [0.87451, 0.0, 0.811765],
  [0.894118, 0.752941, 0.0],
  [1.0, 0.27451, 0.686275],
  [0.619608, 0.596078, 0.388235],
  [0.592157, 0.458824, 0.0],
  [0.976471, 0.94902, 0.756863],
  [1.0, 0.776471, 0.443137],
  [0.74902, 0.011765, 0.25098],
  [0.682353, 0.25098, 0.015686],
  [0.541176, 0.376471, 0.341176],
  [0.768627, 0.364706, 0.607843],
  [0.835294, 0.615686, 0.368627],
  [0.866667, 0.447059, 0.380392],
  [0.564706, 0.266667, 0.4],
  [0.403922, 0.309804, 0.192157],
  [0.882353, 0.690196, 0.745098],
  [0.780392, 0.521569, 0.0],
  [1.0, 0.494118, 0.615686],
  [1.0, 0.588235, 0.901961],
  [0.972549, 0.52549, 0.270588],
  [0.431373, 0.388235, 0.003922],
  [0.843137, 0.278431, 0.258824],
  [0.607843, 0.0, 0.490196],
  [0.913725, 0.0, 0.380392],
  [1.0, 0.0, 0.192157],
  [0.756863, 0.713725, 0.337255],
  [0.717647, 0.466667, 0.537255],
  [0.619608, 0.470588, 0.341176],
  [0.823529, 0.45098, 0.788235],
  [0.862745, 0.682353, 0.588235],
  [0.662745, 0.231373, 0.219608],
  [0.486275, 0.227451, 0.462745],
  [0.529412, 0.207843, 0.0],
  [0.858824, 0.396078, 0.517647],
  [0.827451, 0.32549, 0.0],
  [0.533333, 0.082353, 0.156863],
  [0.611765, 0.341176, 0.196078],
  [0.682353, 0.54902, 0.65098],
  [0.894118, 0.858824, 0.541176],
  [0.698039, 0.215686, 0.388235],
  [0.858824, 0.541176, 0.564706],
  [0.74902, 0.0, 0.627451],
  [0.870588, 0.447059, 0.0],
  [1.0, 0.662745, 0.427451],
  [1.0, 0.623529, 0.764706],
  [0.447059, 0.290196, 0.298039],
  [0.847059, 0.635294, 0.039216],
  [0.501961, 0.341176, 0.478431],
  [0.964706, 0.466667, 0.756863],
  [0.713725, 0.439216, 0.384314],
  [1.0, 0.803922, 0.866667],
  [0.639216, 0.368627, 0.498039],
  [0.478431, 0.133333, 0.34902],
  [0.870588, 0.65098, 0.831373],
  [1.0, 0.376471, 0.298039],
  [0.560784, 0.407843, 0.176471],
  [0.709804, 0.533333, 0.286275],
  [0.686275, 0.45098, 0.654902],
  [0.956863, 0.87451, 0.0],
  [0.745098, 0.313725, 0.721569],
  [1.0, 0.184314, 0.854902],
  [0.823529, 0.509804, 0.317647],
  [0.741176, 0.345098, 0.227451],
  [0.945098, 0.203922, 0.003922],
  [0.588235, 0.301961, 0.317647],
  [0.917647, 0.023529, 0.670588],
  [0.545098, 0.513725, 0.25098],
  [0.890196, 0.247059, 0.529412],
  [0.513725, 0.180392, 0.27451],
  [0.690196, 0.258824, 0.52549],
  [0.917647, 0.819608, 0.647059],
  [0.721569, 0.07451, 0.105882],
  [1.0, 0.721569, 0.172549],
  [0.866667, 0.011765, 0.215686],
  [0.647059, 0.352941, 0.0],
  [0.733333, 0.643137, 0.486275],
  [0.392157, 0.372549, 0.188235],
  [0.486275, 0.27451, 0.141176],
  [0.686275, 0.003922, 0.427451],
  [0.733333, 0.611765, 0.254902],
  [0.807843, 0.254902, 0.376471],
  [0.411765, 0.27451, 0.0],
  [1.0, 0.486275, 0.466667],
  [0.972549, 0.827451, 0.333333],
  [1.0, 0.701961, 0.690196],
  [0.862745, 0.584314, 0.482353],
  [0.784314, 0.6, 0.654902],
  [0.627451, 0.141176, 0.262745],
  [0.858824, 0.717647, 0.435294],
  [0.607843, 0.423529, 0.454902],
  [0.890196, 0.552941, 0.180392],
  [0.894118, 0.415686, 0.211765],
  [0.886275, 0.34902, 0.729412],
  [0.992157, 0.360784, 0.576471],
  [0.486275, 0.380392, 0.258824],
  [0.529412, 0.345098, 0.403922],
  [0.615686, 0.364706, 0.588235],
  [0.580392, 0.176471, 0.105882],
  [0.588235, 0.537255, 0.003922],
  [0.694118, 0.443137, 0.007843],
  [0.792157, 0.239216, 0.094118],
  [0.458824, 0.231373, 0.34902],
  [0.760784, 0.698039, 0.070588],
  [0.635294, 0.0, 0.631373],
  [0.886275, 0.305882, 0.862745],
  [0.988235, 0.752941, 0.568627],
  [0.756863, 0.313725, 0.482353],
  [0.85098, 0.443137, 0.647059],
  [0.870588, 0.552941, 0.827451],
  [0.933333, 0.662745, 0.298039],
  [0.8, 0.239216, 0.647059],
  [0.894118, 0.74902, 0.858824],
  [0.580392, 0.160784, 0.396078],
  [0.662745, 0.552941, 0.415686],
  [0.635294, 0.0, 0.141176],
  [1.0, 0.172549, 0.486275],
  [0.666667, 0.529412, 0.14902],
  [0.886275, 0.360784, 0.392157],
  [0.894118, 0.631373, 0.619608],
  [0.490196, 0.439216, 0.168627],
  [0.796078, 0.086275, 0.380392],
  [0.470588, 0.356863, 0.105882],
  [0.65098, 0.360784, 0.313725],
  [1.0, 0.454902, 0.0],
  [0.803922, 0.454902, 0.478431],
  [1.0, 0.945098, 0.611765],
  [0.839216, 0.792157, 0.34902],
  [0.596078, 0.282353, 0.027451],
  [0.929412, 0.203922, 0.313725],
  [0.564706, 0.286275, 0.498039],
  [0.756863, 0.12549, 0.74902],
  [0.533333, 0.109804, 0.517647],
  [0.988235, 0.717647, 0.839216],
  [0.768627, 0.192157, 0.227451],
  [0.592157, 0.266667, 0.176471],
  [0.698039, 0.666667, 0.411765],
  [0.662745, 0.14902, 0.0],
  [0.976471, 0.588235, 0.635294],
  [0.937255, 0.52549, 0.407843],
  [0.87451, 0.713725, 0.270588],
  [0.517647, 0.305882, 0.254902],
  [0.619608, 0.478431, 0.215686],
  [0.992157, 0.0, 0.592157],
  [0.909804, 0.321569, 0.196078],
  [0.772549, 0.603922, 0.737255],
  [0.721569, 0.501961, 0.368627],
  [0.788235, 0.380392, 0.34902],
  [0.564706, 0.513725, 0.356863],
  [0.72549, 0.341176, 0.086275],
  [0.764706, 0.517647, 0.729412],
  [0.8, 0.505882, 0.439216],
  [0.784314, 0.431373, 0.294118],
  [0.623529, 0.588235, 0.254902],
  [0.698039, 0.0, 0.32549],
  [0.784314, 0.490196, 0.180392],
  [0.972549, 0.678431, 0.564706],
  [1.0, 0.858824, 0.584314],
  [1.0, 0.0, 0.996078],
  [0.662745, 0.411765, 0.278431],
  [1.0, 0.376471, 0.839216],
  [0.956863, 0.419608, 0.498039],
  [0.768627, 0.580392, 0.431373],
  [0.509804, 0.262745, 0.313725],
  [0.647059, 0.301961, 0.407843],
  [0.670588, 0.486275, 0.482353],
  [0.890196, 0.603922, 0.694118],
  [0.811765, 0.780392, 0.486275],
  [0.529412, 0.396078, 0.0],
  [1.0, 0.6, 0.258824],
  [0.419608, 0.164706, 0.403922],
  [0.890196, 0.505882, 0.627451],
  [0.333333, 0.313725, 0.160784],
  [0.941176, 0.564706, 0.780392],
  [0.960784, 0.490196, 0.878431],
  [0.917647, 0.588235, 0.380392],
  [0.898039, 0.168627, 0.156863],
  [0.741176, 0.298039, 0.282353],
  [0.52549, 0.101961, 0.0],
  [0.52549, 0.341176, 0.168627],
  [0.580392, 0.223529, 0.254902],
  [0.756863, 0.478431, 0.631373],
  [1.0, 0.447059, 0.254902],
  [0.760784, 0.403922, 0.537255],
  [0.905882, 0.286275, 0.443137],
  [0.898039, 0.678431, 0.478431],
  [0.4, 0.32549, 0.0],
  [0.619608, 0.2, 0.509804],
  [0.615686, 0.431373, 0.380392],
  [0.466667, 0.247059, 0.0],
  [1.0, 0.262745, 0.282353],
  [1.0, 0.835294, 0.960784],
  [0.992157, 0.67451, 0.894118],
  [0.501961, 0.454902, 0.0],
  [0.788235, 0.392157, 0.003922],
  [0.658824, 0.478431, 0.588235],
  [0.905882, 0.352941, 0.615686],
  [0.733333, 0.572549, 0.003922],
  [0.756863, 0.533333, 0.560784],
  [0.572549, 0.4, 0.282353],
  [0.835294, 0.607843, 0.227451],
  [0.517647, 0.0, 0.419608],
  [1.0, 0.807843, 0.0],
  [0.690196, 0.262745, 0.32549],
  [0.796078, 0.239216, 0.541176],
  [1.0, 0.533333, 0.003922],
  [0.866667, 0.741176, 0.580392],
  [0.8, 0.611765, 0.564706],
  [0.466667, 0.298039, 0.384314],
  [0.709804, 0.266667, 0.168627],
  [0.596078, 0.207843, 0.337255],
  [0.698039, 0.32549, 0.607843],
  [0.611765, 0.4, 0.007843],
  [0.752941, 0.4, 0.694118],
  [0.623529, 0.360784, 0.403922],
  [0.737255, 0.603922, 0.364706],
  [0.529412, 0.0, 0.054902],
  [0.894118, 0.0, 0.478431],
  [0.690196, 0.415686, 0.443137],
  [0.498039, 0.0, 0.301961],
  [0.752941, 0.137255, 0.0],
  [0.729412, 0.12549, 0.521569],
  [0.905882, 0.780392, 0.419608],
  [0.52549, 0.0, 0.211765],
  [0.643137, 0.407843, 0.164706],
  [1.0, 0.015686, 0.364706],
  [0.866667, 0.490196, 0.745098],
  [0.678431, 0.466667, 0.262745],
  [0.901961, 0.482353, 0.490196],
  [0.870588, 0.270588, 0.631373],
  [0.803922, 0.34902, 0.423529],
])
CategoricalColors.set('glasbey_cool', [
  [0.05098, 0.415686, 1.0],
  [0.035294, 0.584314, 0.301961],
  [0.0, 0.792157, 0.898039],
  [0.290196, 1.0, 0.568627],
  [0.0, 0.345098, 0.376471],
  [0.678431, 0.643137, 1.0],
  [0.458824, 0.447059, 0.560784],
  [0.298039, 0.0, 0.745098],
  [0.607843, 0.733333, 0.623529],
  [0.584314, 1.0, 0.94902],
  [0.258824, 0.560784, 0.568627],
  [0.0, 0.270588, 0.12549],
  [0.737255, 0.858824, 1.0],
  [0.254902, 0.643137, 1.0],
  [0.305882, 0.419608, 0.32549],
  [0.572549, 0.65098, 0.729412],
  [0.027451, 0.313725, 0.588235],
  [0.0, 0.784314, 0.494118],
  [0.52549, 0.435294, 0.980392],
  [0.003922, 0.478431, 0.666667],
  [0.380392, 0.329412, 0.682353],
  [0.443137, 0.572549, 0.462745],
  [0.780392, 0.913725, 0.792157],
  [0.294118, 0.32549, 0.419608],
  [0.0, 0.858824, 0.760784],
  [0.113725, 0.0, 1.0],
  [0.603922, 0.803922, 0.815686],
  [0.478431, 0.54902, 0.776471],
  [0.329412, 0.690196, 0.603922],
  [0.0, 0.639216, 0.784314],
  [0.313725, 0.431373, 0.466667],
  [0.745098, 0.729412, 0.862745],
  [0.482353, 0.768627, 0.996078],
  [0.0, 0.509804, 0.4],
  [0.513725, 0.870588, 0.662745],
  [0.356863, 0.141176, 1.0],
  [0.007843, 0.396078, 0.196078],
  [0.0, 0.945098, 1.0],
  [0.823529, 0.964706, 0.996078],
  [0.0, 1.0, 0.788235],
  [0.439216, 0.537255, 0.611765],
  [0.329412, 0.443137, 0.72549],
  [0.180392, 0.321569, 0.270588],
  [0.356863, 0.517647, 0.992157],
  [0.407843, 0.686275, 0.72549],
  [0.662745, 1.0, 0.737255],
  [0.352941, 0.662745, 0.439216],
  [0.890196, 0.87451, 1.0],
  [0.172549, 0.380392, 0.501961],
  [0.568627, 0.556863, 0.670588],
  [0.556863, 0.662745, 0.886275],
  [0.529412, 0.866667, 0.988235],
  [0.015686, 0.545098, 0.866667],
  [0.0, 0.447059, 0.439216],
  [0.223529, 0.341176, 0.768627],
  [0.380392, 0.360784, 0.94902],
  [0.462745, 0.607843, 0.592157],
  [0.0, 0.619608, 0.470588],
  [0.34902, 0.494118, 0.454902],
  [0.254902, 0.262745, 0.596078],
  [0.686275, 0.760784, 1.0],
  [0.478431, 0.447059, 0.733333],
  [0.623529, 0.756863, 0.862745],
  [0.541176, 0.564706, 0.980392],
  [0.286275, 0.360784, 0.568627],
  [0.490196, 0.784314, 0.698039],
  [0.011765, 0.72549, 0.956863],
  [0.34902, 0.454902, 0.580392],
  [0.423529, 0.615686, 0.768627],
  [0.627451, 0.890196, 0.811765],
  [0.015686, 0.403922, 0.317647],
  [0.0, 0.756863, 0.733333],
  [0.309804, 0.509804, 0.356863],
  [0.0, 0.886275, 0.466667],
  [0.0, 0.498039, 0.568627],
  [0.47451, 0.760784, 0.545098],
  [0.647059, 0.631373, 0.811765],
  [0.0, 0.490196, 0.262745],
  [0.796078, 1.0, 0.933333],
  [0.552941, 0.701961, 0.686275],
  [0.270588, 0.545098, 0.666667],
  [0.0, 0.968627, 0.894118],
  [0.0, 0.654902, 0.662745],
  [0.0, 0.403922, 0.694118],
  [0.376471, 0.843137, 0.854902],
  [0.647059, 0.909804, 0.937255],
  [0.003922, 0.866667, 0.639216],
  [0.227451, 0.380392, 0.372549],
  [0.380392, 0.368627, 0.517647],
  [0.482353, 0.662745, 0.54902],
  [0.454902, 0.709804, 0.839216],
  [0.0, 0.270588, 1.0],
  [0.313725, 0.294118, 0.494118],
  [0.239216, 0.192157, 0.803922],
  [0.0, 0.776471, 0.623529],
  [0.658824, 0.831373, 0.701961],
  [0.333333, 0.576471, 0.505882],
  [0.576471, 0.984314, 0.827451],
  [0.341176, 0.521569, 0.733333],
  [0.231373, 0.341176, 0.392157],
  [0.380392, 0.6, 0.658824],
  [0.807843, 0.8, 1.0],
  [0.588235, 0.560784, 0.835294],
  [0.0, 0.705882, 0.368627],
  [0.729412, 0.843137, 0.894118],
  [0.345098, 0.227451, 0.752941],
  [0.0, 0.705882, 0.501961],
  [0.0, 0.239216, 0.705882],
  [0.0, 0.337255, 0.215686],
  [0.47451, 0.635294, 1.0],
  [0.415686, 0.454902, 0.858824],
  [0.415686, 0.905882, 0.768627],
  [0.494118, 0.784314, 0.862745],
  [0.447059, 0.498039, 0.647059],
  [0.0, 0.419608, 0.486275],
  [0.341176, 0.396078, 0.478431],
  [0.431373, 0.964706, 0.690196],
  [0.113725, 0.462745, 0.815686],
  [0.364706, 0.505882, 0.533333],
  [0.235294, 0.443137, 0.388235],
  [0.0, 0.709804, 0.788235],
  [0.368627, 0.572549, 0.878431],
  [0.4, 0.427451, 0.619608],
  [0.227451, 0.611765, 0.847059],
  [0.211765, 0.368627, 0.25098],
  [0.317647, 0.819608, 1.0],
  [0.443137, 0.760784, 0.752941],
  [0.0, 0.564706, 0.501961],
  [0.419608, 0.686275, 0.92549],
  [0.309804, 0.588235, 0.415686],
  [0.752941, 0.905882, 0.886275],
  [0.639216, 0.694118, 0.831373],
  [0.411765, 0.278431, 0.87451],
  [0.0, 0.588235, 0.662745],
  [0.443137, 0.380392, 0.803922],
  [0.839216, 0.913725, 1.0],
  [0.54902, 0.603922, 0.756863],
  [0.729412, 0.705882, 0.94902],
  [0.74902, 0.796078, 0.894118],
  [0.184314, 0.443137, 0.305882],
  [0.556863, 0.713725, 0.764706],
  [0.498039, 0.909804, 0.87451],
  [0.227451, 0.447059, 0.54902],
  [0.529412, 0.509804, 0.713725],
  [0.403922, 0.835294, 0.533333],
  [0.043137, 0.505882, 1.0],
  [0.513725, 0.501961, 0.854902],
  [0.14902, 0.635294, 0.568627],
  [0.631373, 0.784314, 0.733333],
  [0.27451, 0.294118, 1.0],
  [0.243137, 0.419608, 0.603922],
  [0.780392, 1.0, 0.839216],
  [0.223529, 0.498039, 0.482353],
  [0.658824, 0.921569, 0.74902],
  [0.003922, 0.345098, 0.313725],
  [0.184314, 0.003922, 0.827451],
  [0.501961, 0.972549, 1.0],
  [0.607843, 0.823529, 0.996078],
  [0.733333, 0.913725, 1.0],
  [0.196078, 0.329412, 0.498039],
  [0.0, 0.87451, 0.992157],
  [0.501961, 0.639216, 0.67451],
  [0.062745, 0.556863, 0.376471],
  [0.341176, 0.380392, 0.768627],
  [0.0, 0.647059, 0.4],
  [0.317647, 0.435294, 1.0],
  [0.305882, 0.501961, 0.843137],
  [0.360784, 0.647059, 0.631373],
  [0.568627, 0.729412, 1.0],
  [0.376471, 0.713725, 0.54902],
  [0.031373, 0.92549, 0.603922],
  [0.380392, 0.8, 0.623529],
  [0.333333, 0.643137, 0.509804],
  [0.152941, 0.290196, 0.188235],
  [0.733333, 1.0, 1.0],
  [0.360784, 0.654902, 0.760784],
  [0.0, 0.545098, 0.752941],
  [0.596078, 0.666667, 1.0],
  [0.486275, 0.6, 0.686275],
  [0.423529, 0.486275, 0.745098],
  [0.156863, 0.576471, 0.996078],
  [0.0, 0.392157, 0.839216],
  [0.007843, 0.345098, 0.439216],
  [0.435294, 0.552941, 0.698039],
  [0.0, 0.301961, 0.784314],
  [0.215686, 0.321569, 0.623529],
  [0.52549, 0.6, 0.882353],
  [0.552941, 0.717647, 0.890196],
  [0.0, 0.368627, 0.576471],
  [0.4, 0.545098, 0.529412],
  [0.341176, 0.0, 0.890196],
  [0.505882, 0.831373, 0.792157],
  [0.478431, 0.894118, 0.945098],
  [0.513725, 0.717647, 0.635294],
  [0.329412, 0.756863, 0.682353],
  [0.627451, 0.823529, 0.909804],
  [0.247059, 0.152941, 1.0],
  [0.482353, 0.352941, 0.984314],
  [0.321569, 0.494118, 0.580392],
  [0.25098, 0.392157, 0.682353],
  [0.403922, 1.0, 0.878431],
  [0.47451, 0.498039, 1.0],
  [0.270588, 0.423529, 0.847059],
  [0.27451, 0.52549, 0.431373],
  [0.552941, 0.784314, 0.643137],
  [0.243137, 0.384314, 0.32549],
  [0.392157, 0.513725, 0.419608],
  [0.345098, 0.733333, 0.462745],
  [0.207843, 0.454902, 0.490196],
  [0.321569, 0.752941, 0.8],
  [0.45098, 0.623529, 0.862745],
  [0.301961, 0.305882, 0.701961],
  [0.247059, 0.470588, 0.698039],
  [0.423529, 0.392157, 0.67451],
  [0.031373, 0.698039, 0.647059],
  [0.435294, 0.52549, 0.862745],
  [0.52549, 0.654902, 0.796078],
  [0.219608, 0.396078, 0.435294],
  [0.27451, 0.368627, 0.494118],
  [0.458824, 0.905882, 0.588235],
  [0.419608, 0.478431, 0.560784],
  [0.309804, 0.666667, 0.854902],
  [0.266667, 0.729412, 0.862745],
  [0.352941, 0.345098, 0.576471],
  [0.443137, 0.568627, 0.596078],
  [0.643137, 0.666667, 0.905882],
  [0.682353, 0.788235, 0.945098],
  [0.0, 0.898039, 0.866667],
  [0.509804, 0.501961, 0.623529],
  [0.0, 0.423529, 0.588235],
  [0.662745, 0.776471, 0.823529],
  [0.435294, 0.701961, 0.670588],
  [0.501961, 0.54902, 0.654902],
  [0.682353, 0.839216, 0.815686],
  [0.294118, 0.196078, 0.639216],
  [0.807843, 0.847059, 0.984314],
  [0.721569, 0.941176, 0.843137],
  [0.435294, 0.611765, 0.537255],
  [0.329412, 0.286275, 0.596078],
  [0.054902, 0.388235, 0.384314],
  [0.254902, 0.305882, 0.521569],
  [0.227451, 0.639216, 0.705882],
  [0.533333, 0.847059, 0.72549],
  [0.305882, 0.470588, 0.380392],
  [0.572549, 0.501961, 1.0],
  [0.607843, 0.615686, 0.72549],
  [0.145098, 1.0, 0.996078],
  [0.007843, 0.823529, 0.796078],
  [0.345098, 0.392157, 0.65098],
  [0.682353, 0.670588, 0.788235],
  [0.662745, 0.937255, 0.901961],
  [0.423529, 0.623529, 0.466667],
  [0.32549, 0.313725, 0.847059],
  [0.0, 0.529412, 0.545098],
  [0.435294, 0.572549, 1.0],
  [0.25098, 0.529412, 0.588235],
])
CategoricalColors.set('modulate', [
  [1.0, 1.0, 1.0],
  [1.0, 1.0, 1.0],
  [1.0, 1.0, 1.0],
  [1.0, 1.0, 1.0],
  [1.0, 1.0, 1.0],
  [1.0, 1.0, 1.0],
  [1.0, 1.0, 1.0],
  [1.0, 1.0, 1.0],
  [1.0, 1.0, 1.0],
  [1.0, 1.0, 1.0],
  [1.0, 1.0, 1.0],
  [1.0, 1.0, 1.0],
])
CategoricalColors.set('glasbey_light', [
  [0.843137, 0.0, 0.0],
  [0.007843, 0.533333, 0.0],
  [0.713725, 0.0, 1.0],
  [0.023529, 0.67451, 0.776471],
  [0.596078, 1.0, 0.0],
  [1.0, 0.647059, 0.188235],
  [1.0, 0.560784, 0.784314],
  [0.47451, 0.321569, 0.372549],
  [0.0, 0.996078, 0.811765],
  [0.690196, 0.647059, 1.0],
  [0.580392, 0.678431, 0.517647],
  [0.603922, 0.411765, 0.0],
  [0.215686, 0.415686, 0.384314],
  [0.827451, 0.0, 0.54902],
  [0.996078, 0.960784, 0.564706],
  [0.784314, 0.435294, 0.4],
  [0.619608, 0.890196, 1.0],
  [0.0, 0.788235, 0.27451],
  [0.662745, 0.466667, 0.678431],
  [0.721569, 0.733333, 0.007843],
  [0.956863, 0.752941, 0.694118],
  [1.0, 0.156863, 0.992157],
  [0.952941, 0.807843, 1.0],
  [0.0, 0.623529, 0.490196],
  [1.0, 0.384314, 0.0],
  [0.337255, 0.396078, 0.168627],
  [0.588235, 0.247059, 0.121569],
  [0.568627, 0.192157, 0.560784],
  [1.0, 0.203922, 0.396078],
  [0.627451, 0.894118, 0.572549],
  [0.552941, 0.607843, 0.698039],
  [0.509804, 0.568627, 0.14902],
  [0.682353, 0.035294, 0.247059],
  [0.470588, 0.780392, 0.733333],
  [0.737255, 0.572549, 0.345098],
  [0.898039, 0.560784, 1.0],
  [0.447059, 0.72549, 1.0],
  [0.776471, 0.647059, 0.756863],
  [1.0, 0.568627, 0.443137],
  [0.827451, 0.764706, 0.490196],
  [0.741176, 0.933333, 0.858824],
  [0.419608, 0.521569, 0.407843],
  [0.572549, 0.431373, 0.337255],
  [0.976471, 1.0, 0.0],
  [0.729412, 0.760784, 0.878431],
  [0.678431, 0.341176, 0.490196],
  [1.0, 0.807843, 0.011765],
  [1.0, 0.290196, 0.694118],
  [0.760784, 0.341176, 0.011765],
  [0.364706, 0.54902, 0.564706],
  [0.760784, 0.266667, 0.741176],
  [0.0, 0.458824, 0.25098],
  [0.729412, 0.435294, 0.996078],
  [0.0, 0.831373, 0.580392],
  [0.0, 1.0, 0.462745],
  [0.286275, 0.635294, 0.317647],
  [0.8, 0.596078, 0.568627],
  [0.0, 0.921569, 0.933333],
  [0.858824, 0.494118, 0.003922],
  [0.972549, 0.458824, 0.541176],
  [0.72549, 0.588235, 0.0],
  [0.788235, 0.258824, 0.282353],
  [0.0, 0.815686, 0.980392],
  [0.462745, 0.345098, 0.152941],
  [0.521569, 0.831373, 0.003922],
  [0.92549, 1.0, 0.831373],
  [0.654902, 0.482353, 0.533333],
  [0.862745, 0.447059, 0.788235],
  [0.796078, 0.890196, 0.341176],
  [0.545098, 0.74902, 0.368627],
  [0.631373, 0.129412, 0.419608],
  [0.52549, 0.356863, 0.537255],
  [0.541176, 0.733333, 0.815686],
  [1.0, 0.729412, 0.843137],
  [0.717647, 0.811765, 0.670588],
  [0.592157, 0.254902, 0.305882],
  [0.407843, 0.670588, 0.0],
  [0.996078, 0.882353, 0.698039],
  [1.0, 0.215686, 0.160784],
  [0.501961, 0.478431, 0.243137],
  [0.843137, 0.909804, 1.0],
  [0.654902, 0.584314, 0.776471],
  [0.494118, 0.647059, 0.607843],
  [0.819608, 0.513725, 0.643137],
  [0.329412, 0.509804, 0.231373],
  [0.901961, 0.662745, 0.45098],
  [0.611765, 1.0, 1.0],
  [0.854902, 0.333333, 0.505882],
  [0.019608, 0.705882, 0.666667],
  [1.0, 0.670588, 0.964706],
  [0.819608, 0.686275, 0.937255],
  [0.854902, 0.007843, 0.368627],
  [0.67451, 0.105882, 0.07451],
  [0.376471, 0.701961, 0.521569],
  [0.835294, 0.258824, 0.992157],
  [0.678431, 0.670588, 0.34902],
  [0.984314, 0.615686, 0.654902],
  [0.701961, 0.447059, 0.235294],
  [0.94902, 0.415686, 0.32549],
  [0.682353, 0.823529, 0.835294],
  [0.607843, 1.0, 0.768627],
  [0.858824, 0.701961, 0.2],
  [0.92549, 0.007843, 0.764706],
  [0.6, 0.0, 0.772549],
  [0.815686, 1.0, 0.619608],
  [0.65098, 0.352941, 0.290196],
  [0.235294, 0.427451, 0.003922],
  [0.0, 0.521569, 0.478431],
  [0.584314, 0.572549, 0.403922],
  [0.541176, 0.862745, 0.701961],
  [0.427451, 0.454902, 0.0],
  [0.666667, 0.368627, 0.792157],
  [0.027451, 0.941176, 0.0],
  [0.505882, 0.309804, 0.243137],
  [0.85098, 0.505882, 0.321569],
  [1.0, 0.784314, 0.388235],
  [0.721569, 0.0, 0.623529],
  [0.6, 0.67451, 0.870588],
  [0.568627, 0.309804, 0.0],
  [0.54902, 0.270588, 0.439216],
  [0.309804, 0.431373, 0.321569],
  [1.0, 0.533333, 0.203922],
  [0.780392, 0.560784, 0.807843],
  [0.835294, 0.886275, 0.619608],
  [0.698039, 0.509804, 0.427451],
  [0.615686, 0.984314, 0.458824],
  [0.341176, 0.870588, 0.466667],
  [0.980392, 0.0, 0.529412],
  [0.635294, 0.803922, 1.0],
  [0.078431, 0.796078, 0.823529],
  [0.066667, 0.560784, 0.333333],
  [0.823529, 0.329412, 0.647059],
  [0.0, 0.87451, 0.764706],
  [0.639216, 0.517647, 0.184314],
  [0.466667, 0.592157, 0.356863],
  [0.733333, 0.670588, 0.501961],
  [0.439216, 0.639216, 0.690196],
  [0.839216, 0.984314, 1.0],
  [0.909804, 0.007843, 0.227451],
  [0.847059, 0.278431, 0.133333],
  [1.0, 0.513725, 0.929412],
  [0.717647, 0.219608, 0.388235],
  [0.717647, 0.807843, 0.447059],
  [0.596078, 0.384314, 0.419608],
  [0.541176, 0.454902, 0.568627],
  [0.0, 0.639216, 0.090196],
  [0.0, 0.960784, 0.631373],
  [0.752941, 0.568627, 0.94902],
  [0.541176, 0.894118, 0.847059],
  [0.643137, 0.305882, 0.584314],
  [0.431373, 0.368627, 0.0],
  [0.54902, 0.776471, 0.556863],
  [0.584314, 0.666667, 0.168627],
  [0.780392, 0.45098, 0.866667],
  [0.705882, 0.231373, 0.003922],
  [0.843137, 0.603922, 0.215686],
  [0.87451, 0.678431, 0.717647],
  [0.0, 0.607843, 0.627451],
  [0.352941, 0.564706, 0.0],
  [0.592157, 0.737255, 0.658824],
  [0.678431, 0.552941, 0.658824],
  [0.854902, 0.835294, 1.0],
  [0.333333, 0.490196, 0.447059],
  [0.0, 0.733333, 0.411765],
  [1.0, 0.768627, 0.556863],
  [0.72549, 0.0, 0.831373],
  [0.878431, 0.815686, 0.356863],
  [0.388235, 0.603922, 0.482353],
  [0.752941, 0.933333, 0.737255],
  [0.760784, 0.745098, 0.996078],
  [0.501961, 0.827451, 0.870588],
  [0.886275, 0.521569, 0.494118],
  [0.980392, 0.921569, 0.305882],
  [0.752941, 0.427451, 0.513725],
  [0.796078, 1.0, 0.313725],
  [0.941176, 0.447059, 0.666667],
  [0.929412, 0.407843, 1.0],
  [0.6, 0.278431, 0.682353],
  [0.427451, 0.411765, 0.262745],
  [0.890196, 0.341176, 0.380392],
  [0.866667, 0.4, 0.176471],
  [0.615686, 0.858824, 0.364706],
  [0.886275, 0.615686, 0.815686],
  [0.72549, 0.462745, 0.0],
  [0.776471, 0.0, 0.176471],
  [0.87451, 0.741176, 0.854902],
  [0.352941, 0.713725, 0.87451],
  [1.0, 0.352941, 0.854902],
  [0.219608, 0.760784, 0.631373],
  [0.619608, 0.415686, 0.54902],
  [0.678431, 0.666667, 0.784314],
  [0.588235, 0.388235, 0.188235],
  [0.713725, 0.337255, 0.384314],
  [0.172549, 0.498039, 0.376471],
  [0.698039, 0.894118, 0.0],
  [0.933333, 0.647059, 0.568627],
  [0.584314, 0.996078, 0.886275],
  [1.0, 0.333333, 0.556863],
  [0.745098, 0.435294, 0.631373],
  [0.666667, 0.235294, 0.215686],
  [0.85098, 0.811765, 0.0],
  [0.670588, 0.501961, 0.807843],
  [0.627451, 0.501961, 0.321569],
  [0.882353, 0.0, 0.909804],
  [0.764706, 0.360784, 0.243137],
  [0.709804, 0.227451, 0.521569],
  [0.54902, 0.470588, 0.0],
  [0.858824, 0.737255, 0.588235],
  [0.321569, 0.619608, 0.576471],
  [0.690196, 0.741176, 0.513725],
  [0.572549, 0.713725, 0.717647],
  [0.654902, 0.329412, 0.141176],
  [1.0, 0.835294, 0.937255],
  [0.47451, 0.682353, 0.419608],
  [0.368627, 0.709804, 0.298039],
  [0.501961, 0.984314, 0.607843],
  [0.282353, 1.0, 0.937255],
  [0.596078, 0.588235, 0.282353],
  [0.580392, 0.533333, 0.654902],
  [0.196078, 0.835294, 0.0],
  [0.431373, 0.917647, 0.337255],
  [0.717647, 0.831373, 0.921569],
  [0.439216, 0.333333, 0.439216],
  [0.94902, 0.858824, 0.545098],
  [0.670588, 0.835294, 0.760784],
  [0.498039, 0.803922, 0.94902],
  [0.541176, 0.733333, 0.0],
  [0.396078, 0.717647, 0.733333],
  [1.0, 0.713725, 0.0],
  [0.764706, 0.509804, 0.52549],
  [0.796078, 0.670588, 0.372549],
  [0.396078, 0.470588, 0.282353],
  [0.34902, 0.890196, 1.0],
  [0.87451, 0.305882, 0.803922],
  [0.917647, 1.0, 0.47451],
  [0.741176, 0.4, 0.72549],
  [0.768627, 0.584314, 0.65098],
  [0.392157, 0.776471, 0.454902],
  [0.819608, 0.584314, 0.439216],
  [0.439216, 0.811765, 0.309804],
  [0.670588, 0.431373, 0.4],
  [0.615686, 0.380392, 0.647059],
  [0.0, 0.721569, 0.0],
  [0.890196, 0.6, 0.705882],
  [0.741176, 0.0, 0.423529],
  [0.701961, 0.913725, 0.941176],
  [0.807843, 0.74902, 0.894118],
  [0.466667, 0.639216, 0.262745],
  [0.521569, 0.384314, 0.470588],
  [0.341176, 0.560784, 0.360784],
  [0.619608, 0.690196, 0.772549],
  [0.909804, 0.188235, 0.627451],
  [0.145098, 0.486275, 0.164706],
  [0.509804, 0.407843, 0.137255],
  [0.752941, 0.737255, 0.305882],
  [0.866667, 0.827451, 0.647059],
])
CategoricalColors.set('glasbey_dark', [
  [0.843137, 0.0, 0.0],
  [0.54902, 0.235294, 1.0],
  [0.007843, 0.533333, 0.0],
  [0.0, 0.67451, 0.780392],
  [0.905882, 0.647059, 0.0],
  [1.0, 0.498039, 0.819608],
  [0.423529, 0.0, 0.309804],
  [0.345098, 0.231373, 0.0],
  [0.0, 0.341176, 0.34902],
  [0.082353, 0.882353, 0.552941],
  [0.0, 0.0, 0.866667],
  [0.635294, 0.462745, 0.415686],
  [0.737255, 0.717647, 1.0],
  [0.752941, 0.015686, 0.72549],
  [0.392157, 0.329412, 0.45098],
  [0.47451, 0.0, 0.0],
  [0.027451, 0.454902, 0.847059],
  [0.45098, 0.607843, 0.490196],
  [1.0, 0.470588, 0.321569],
  [0.0, 0.294118, 0.0],
  [0.560784, 0.482353, 0.003922],
  [0.952941, 0.0, 0.482353],
  [0.560784, 0.729412, 0.0],
  [0.65098, 0.482353, 0.721569],
  [0.352941, 0.007843, 0.639216],
  [0.890196, 0.686275, 0.686275],
  [0.627451, 0.227451, 0.321569],
  [0.635294, 0.784314, 0.784314],
  [0.619608, 0.294118, 0.0],
  [0.329412, 0.403922, 0.270588],
  [0.733333, 0.764706, 0.537255],
  [0.372549, 0.482353, 0.533333],
  [0.376471, 0.219608, 0.235294],
  [0.513725, 0.533333, 1.0],
  [0.223529, 0.0, 0.0],
  [0.890196, 0.32549, 1.0],
  [0.188235, 0.32549, 0.509804],
  [0.498039, 0.792157, 1.0],
  [0.772549, 0.4, 0.560784],
  [0.0, 0.505882, 0.415686],
  [0.572549, 0.619608, 0.717647],
  [0.8, 0.454902, 0.027451],
  [0.498039, 0.168627, 0.556863],
  [0.0, 0.745098, 0.643137],
  [0.176471, 0.694118, 0.321569],
  [0.305882, 0.2, 1.0],
  [0.0, 0.898039, 0.0],
  [1.0, 0.0, 0.807843],
  [0.784314, 0.345098, 0.282353],
  [0.898039, 0.611765, 1.0],
  [0.113725, 0.631373, 1.0],
  [0.431373, 0.439216, 0.670588],
  [0.784314, 0.603922, 0.411765],
  [0.470588, 0.341176, 0.231373],
  [0.015686, 0.854902, 0.901961],
  [0.756863, 0.639216, 0.768627],
  [1.0, 0.415686, 0.541176],
  [0.733333, 0.0, 0.996078],
  [0.572549, 0.32549, 0.501961],
  [0.623529, 0.007843, 0.454902],
  [0.580392, 0.631373, 0.313725],
  [0.215686, 0.266667, 0.145098],
  [0.686275, 0.427451, 1.0],
  [0.34902, 0.427451, 0.0],
  [1.0, 0.192157, 0.278431],
  [0.513725, 0.501961, 0.341176],
  [0.0, 0.427451, 0.180392],
  [0.537255, 0.337255, 0.686275],
  [0.352941, 0.290196, 0.639216],
  [0.466667, 0.207843, 0.086275],
  [0.52549, 0.764706, 0.603922],
  [0.372549, 0.066667, 0.137255],
  [0.835294, 0.521569, 0.505882],
  [0.643137, 0.160784, 0.094118],
  [0.0, 0.533333, 0.694118],
  [0.796078, 0.0, 0.266667],
  [1.0, 0.627451, 0.337255],
  [0.921569, 0.305882, 0.0],
  [0.423529, 0.592157, 0.0],
  [0.32549, 0.52549, 0.286275],
  [0.458824, 0.352941, 0.0],
  [0.784314, 0.768627, 0.25098],
  [0.572549, 0.827451, 0.439216],
  [0.294118, 0.596078, 0.580392],
  [0.301961, 0.137255, 0.05098],
  [0.380392, 0.203922, 0.360784],
  [0.517647, 0.0, 0.811765],
  [0.545098, 0.0, 0.192157],
  [0.623529, 0.431373, 0.196078],
  [0.67451, 0.517647, 0.6],
  [0.776471, 0.192157, 0.537255],
  [0.007843, 0.329412, 0.219608],
  [0.031373, 0.419608, 0.517647],
  [0.529412, 0.658824, 0.92549],
  [0.392157, 0.4, 0.937255],
  [0.768627, 0.364706, 0.729412],
  [0.003922, 0.623529, 0.439216],
  [0.505882, 0.317647, 0.34902],
  [0.513725, 0.435294, 0.54902],
  [0.701961, 0.752941, 0.854902],
  [0.72549, 0.568627, 0.160784],
  [1.0, 0.592157, 0.698039],
  [0.654902, 0.576471, 0.882353],
  [0.411765, 0.552941, 0.745098],
  [0.298039, 0.313725, 0.003922],
  [0.282353, 0.007843, 0.8],
  [0.380392, 0.0, 0.431373],
  [0.270588, 0.415686, 0.4],
  [0.615686, 0.341176, 0.262745],
  [0.482353, 0.67451, 0.709804],
  [0.803922, 0.517647, 0.741176],
  [0.0, 0.329412, 0.756863],
  [0.482353, 0.184314, 0.309804],
  [0.984314, 0.486275, 0.0],
  [0.203922, 0.752941, 0.0],
  [1.0, 0.611765, 0.533333],
  [0.882353, 0.717647, 0.411765],
  [0.32549, 0.380392, 0.466667],
  [0.360784, 0.227451, 0.486275],
  [0.929412, 0.647059, 0.854902],
  [0.941176, 0.32549, 0.639216],
  [0.364706, 0.494118, 0.411765],
  [0.768627, 0.466667, 0.313725],
  [0.819608, 0.282353, 0.407843],
  [0.431373, 0.0, 0.921569],
  [0.121569, 0.203922, 0.0],
  [0.756863, 0.254902, 0.015686],
  [0.427451, 0.835294, 0.760784],
  [0.27451, 0.439216, 0.623529],
  [0.635294, 0.003922, 0.768627],
  [0.039216, 0.509804, 0.537255],
  [0.686275, 0.65098, 0.003922],
  [0.65098, 0.360784, 0.419608],
  [0.996078, 0.466667, 1.0],
  [0.545098, 0.521569, 0.682353],
  [0.780392, 0.498039, 0.913725],
  [0.603922, 0.670588, 0.521569],
  [0.529412, 0.423529, 0.85098],
  [0.003922, 0.729412, 0.968627],
  [0.686275, 0.368627, 0.823529],
  [0.34902, 0.317647, 0.168627],
  [0.713725, 0.0, 0.372549],
  [0.486275, 0.713725, 0.415686],
  [0.286275, 0.521569, 1.0],
  [0.0, 0.760784, 0.509804],
  [0.823529, 0.584314, 0.670588],
  [0.639216, 0.294118, 0.658824],
  [0.890196, 0.023529, 0.890196],
  [0.086275, 0.639216, 0.0],
  [0.223529, 0.180392, 0.0],
  [0.517647, 0.188235, 0.2],
  [0.368627, 0.584314, 0.666667],
  [0.352941, 0.062745, 0.0],
  [0.482353, 0.27451, 0.0],
  [0.435294, 0.435294, 0.192157],
  [0.2, 0.345098, 0.14902],
  [0.301961, 0.376471, 0.713725],
  [0.635294, 0.584314, 0.392157],
  [0.384314, 0.25098, 0.156863],
  [0.270588, 0.831373, 0.345098],
  [0.439216, 0.666667, 0.815686],
  [0.180392, 0.419608, 0.305882],
  [0.45098, 0.686275, 0.619608],
  [0.992157, 0.082353, 0.0],
  [0.847059, 0.705882, 0.572549],
  [0.478431, 0.537255, 0.231373],
  [0.490196, 0.776471, 0.85098],
  [0.862745, 0.568627, 0.215686],
  [0.92549, 0.380392, 0.368627],
  [0.92549, 0.372549, 0.831373],
  [0.898039, 0.482353, 0.654902],
  [0.65098, 0.423529, 0.596078],
  [0.0, 0.592157, 0.266667],
  [0.729412, 0.372549, 0.133333],
  [0.737255, 0.678431, 0.32549],
  [0.533333, 0.847059, 0.188235],
  [0.529412, 0.207843, 0.45098],
  [0.682353, 0.658824, 0.823529],
  [0.890196, 0.54902, 0.388235],
  [0.819608, 0.694118, 0.92549],
  [0.215686, 0.258824, 0.623529],
  [0.227451, 0.745098, 0.760784],
  [0.4, 0.615686, 0.301961],
  [0.619608, 0.011765, 0.6],
  [0.305882, 0.305882, 0.478431],
  [0.482353, 0.298039, 0.52549],
  [0.764706, 0.207843, 0.192157],
  [0.552941, 0.4, 0.466667],
  [0.666667, 0.0, 0.176471],
  [0.498039, 0.003922, 0.458824],
  [0.003922, 0.509804, 0.301961],
  [0.45098, 0.290196, 0.403922],
  [0.447059, 0.466667, 0.568627],
  [0.431373, 0.0, 0.6],
  [0.627451, 0.729412, 0.321569],
  [0.882353, 0.431373, 0.192157],
  [0.772549, 0.415686, 0.443137],
  [0.427451, 0.356863, 0.588235],
  [0.639216, 0.235294, 0.454902],
  [0.196078, 0.384314, 0.0],
  [0.533333, 0.0, 0.313725],
  [0.2, 0.345098, 0.411765],
  [0.729412, 0.552941, 0.486275],
  [0.098039, 0.34902, 1.0],
  [0.568627, 0.572549, 0.007843],
  [0.172549, 0.545098, 0.835294],
  [0.090196, 0.14902, 1.0],
  [0.129412, 0.827451, 1.0],
  [0.643137, 0.564706, 0.686275],
  [0.545098, 0.427451, 0.309804],
  [0.368627, 0.129412, 0.243137],
  [0.862745, 0.011765, 0.701961],
  [0.435294, 0.341176, 0.792157],
  [0.396078, 0.156863, 0.129412],
  [0.678431, 0.466667, 0.0],
  [0.639216, 0.74902, 0.968627],
  [0.709804, 0.517647, 0.27451],
  [0.592157, 0.219608, 0.862745],
  [0.698039, 0.317647, 0.580392],
  [0.447059, 0.258824, 0.639216],
  [0.529412, 0.560784, 0.819608],
  [0.541176, 0.439216, 0.694118],
  [0.419608, 0.686275, 0.211765],
  [0.352941, 0.478431, 0.788235],
  [0.780392, 0.623529, 1.0],
  [0.337255, 0.517647, 0.101961],
  [0.0, 0.839216, 0.654902],
  [0.509804, 0.278431, 0.223529],
  [0.066667, 0.262745, 0.113725],
  [0.352941, 0.670588, 0.458824],
  [0.568627, 0.356863, 0.003922],
  [0.964706, 0.270588, 0.439216],
  [1.0, 0.592157, 0.011765],
  [0.882353, 0.258824, 0.192157],
  [0.729412, 0.572549, 0.811765],
  [0.203922, 0.345098, 0.301961],
  [0.972549, 0.501961, 0.490196],
  [0.568627, 0.203922, 0.0],
  [0.701961, 0.803922, 0.0],
  [0.180392, 0.623529, 0.827451],
  [0.47451, 0.545098, 0.623529],
  [0.317647, 0.505882, 0.490196],
  [0.756863, 0.211765, 0.843137],
  [0.92549, 0.019608, 0.32549],
  [0.72549, 0.67451, 0.494118],
  [0.282353, 0.439216, 0.196078],
  [0.517647, 0.584314, 0.396078],
  [0.85098, 0.615686, 0.537255],
  [0.0, 0.392157, 0.639216],
  [0.298039, 0.564706, 0.470588],
  [0.560784, 0.380392, 0.596078],
  [1.0, 0.32549, 0.219608],
  [0.654902, 0.258824, 0.231373],
  [0.0, 0.431373, 0.439216],
  [0.596078, 0.517647, 0.243137],
  [0.862745, 0.690196, 0.784314],
])
CategoricalColors.set('modulate_dark', [
  [0.0, 0.0, 0.0],
  [0.0, 0.0, 0.0],
  [0.0, 0.0, 0.0],
  [0.0, 0.0, 0.0],
  [0.0, 0.0, 0.0],
  [0.0, 0.0, 0.0],
  [0.0, 0.0, 0.0],
  [0.0, 0.0, 0.0],
  [0.0, 0.0, 0.0],
  [0.0, 0.0, 0.0],
  [0.0, 0.0, 0.0],
  [0.0, 0.0, 0.0],
])

function applyLookupTable(context, event) {
  var name = event.data.name
  event.data.component
  context.images.actorContext.get(name)
  var lut = event.data.lookupTable

  if (name !== context.images.selectedName) {
    return
  } //let lookupTableProxy = null
  //if (context.images.lookupTableProxies.has('labelImage')) {
  //lookupTableProxy = context.images.lookupTableProxies.get('labelImage')
  //} else {
  //lookupTableProxy = vtkLookupTableProxy.newInstance()
  //context.images.lookupTableProxies.set('labelImage', lookupTableProxy)
  //}
  //const currentLut = lookupTableProxy.getPresetName()
  //if (currentLut !== lut) {
  //// If we are not using the vtk.js / Reference
  //applyCategoricalColorToLookupTableProxy(
  //lookupTableProxy,
  //Array.from(actorContext.labelNames.keys()),
  //lut
  //)
  //}

  if (lut !== context.images.labelImageIconSelector.getSelectedValue()) {
    context.images.labelImageIconSelector.setSelectedValue(lut)
  } // Todo:
  //
  //if (categoricalColor.startsWith('Custom')) {
  //// TODO
  ////lookupTableProxy.setMode(vtkLookupTableProxy.Mode.RGBPoints)
  ////transferFunctionWidget.applyOpacity(piecewiseFunction, dataRange);
  ////const colorDataRange = transferFunctionWidget.getOpacityRange(dataRange);
  ////if (!!colorDataRange) {
  ////colorTransferFunction.setMappingRange(...colorDataRange);
  ////}
  ////colorTransferFunction.updateRange();
  ////const isIcons = iconSelector.getIcons();
  ////if (!!!customIcon) {
  ////const categoricalColorIcon = customColorMapIcon(colorTransferFunction, colorDataRange);
  ////customIcon = { 'iconFilePath': categoricalColorIcon, 'iconValue': categoricalColor };
  ////icons.push(customIcon);
  ////iconSelector.refresh(icons);
  ////} else if(isIcons[isIcons.length-1].iconValue !== categoricalColor) {
  ////const categoricalColorIcon = customColorMapIcon(colorTransferFunction, colorDataRange);
  ////isIcons[isIcons.length-1].element.src = categoricalColorIcon;
  ////isIcons[isIcons.length-1].iconFilePath = categoricalColorIcon;
  ////isIcons[isIcons.length-1].iconValue = categoricalColor;
  ////isIcons[isIcons.length-1].element.setAttribute('icon-value', categoricalColor);
  ////isIcons[isIcons.length-1].element.setAttribute('alt', categoricalColor);
  ////isIcons[isIcons.length-1].element.setAttribute('title', categoricalColor);
  ////}
  //context.images.iconSelector.setSelectedValue(colorMap)
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
  var transferFunctionWidget = context.images.transferFunctionWidget // Apply piecewise functions

  for (var i = 0; i < visualizedComponents.length; i++) {
    var component = visualizedComponents[i]

    if (component < 0) {
      continue
    }

    context.images.selectedComponent = component

    var _gaussians = actorContext.piecewiseFunctionGaussians.get(component)

    if (transferFunctionWidget && _gaussians) {
      transferFunctionWidget.setGaussians(_gaussians)
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
    }
  }

  var selectedComponent = context.images.selectedComponent
  var gaussians = actorContext.piecewiseFunctionGaussians.get(selectedComponent)

  if (transferFunctionWidget && gaussians) {
    transferFunctionWidget.setGaussians(gaussians)
  }
}

function selectImageComponent(context, event) {
  context.images.componentSelector.value = event.data
  var name = event.data.name
  var actorContext = context.images.actorContext.get(name)
  var component = event.data.component
  var gaussians = actorContext.piecewiseFunctionGaussians.get(component)
  var transferFunctionWidget = context.images.transferFunctionWidget

  if (transferFunctionWidget && gaussians) {
    transferFunctionWidget.setGaussians(gaussians)
  }

  if (actorContext.colorRanges.has(component)) {
    var range = actorContext.colorRanges.get(component)
    applyColorRange(context, {
      data: {
        name: name,
        component: component,
        range: range,
      },
    })
    transferFunctionWidget.setDataRange(range)
    transferFunctionWidget.render()
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

  context.service.send({
    type: 'UPDATE_IMAGE_HISTOGRAM',
    data: {
      name: name,
      component: component,
    },
  })
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
  context.images.transferFunctionWidget.render()
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

function applyRenderedScale(input, renderedScale) {
  input.value = renderedScale
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
          renderedScale: parseInt(event.target.value),
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
    onReceive(function(_ref) {
      var type = _ref.type,
        data = _ref.data

      if (type === 'IMAGE_ASSIGNED') {
        onImageAssigned(data)
      } else if (type === 'RENDERED_IMAGE_ASSIGNED') {
        applyRenderedScale(
          scaleSelector,
          context.images.actorContext.get(data).renderedScale
        )
      } else if (type === 'IMAGE_HISTOGRAM_UPDATED') {
        // set scale number after ADJUST_SCALE_FOR_FRAMERATE even if no scale change
        applyRenderedScale(
          scaleSelector,
          context.images.actorContext.get(data.name).renderedScale
        )
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
