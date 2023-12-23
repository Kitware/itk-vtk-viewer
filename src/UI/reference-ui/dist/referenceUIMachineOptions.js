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
  ".ItkVtkViewer-module_loading__11c63 {\n  border: 16px solid #f3f3f3; /* Light grey */\n  border-top: 16px solid #3498db; /* Blue */\n  border-radius: 50%;\n  width: 120px;\n  height: 120px;\n  position: absolute;\n  left: calc(50% - 60px);\n  top: calc(50% - 60px);\n  animation: ItkVtkViewer-module_spin__mT5S6 2s linear infinite;\n  box-sizing: border-box;\n}\n\n@keyframes ItkVtkViewer-module_spin__mT5S6 {\n  0% {\n    transform: rotate(0deg);\n  }\n  100% {\n    transform: rotate(360deg);\n  }\n}\n\n.ItkVtkViewer-module_viewContainer__-5zNz {\n  position: absolute;\n  top: 0;\n  left: 0;\n  bottom: 0;\n  right: 0;\n  display: flex;\n  flex-direction: column;\n  background: rgba(128, 128, 128, 0.8);\n}\n\n.ItkVtkViewer-module_viewport__BMgOt {\n  position: relative;\n  flex: 1;\n  min-height: 0;\n}\n\n.ItkVtkViewer-module_uiContainer__CiawP {\n  position: absolute;\n  top: 0;\n  left: 0;\n  z-index: 1000;\n\n  height: -moz-fit-content;\n\n  height: -webkit-fit-content;\n\n  height: fit-content;\n  max-height: 100%;\n\n  display: flex;\n\n  padding: 6px 0 0 6px;\n  border: 0px;\n  box-sizing: border-box;\n\n  --md-navigation-drawer-container-shape-start-end: 0;\n  --md-navigation-drawer-container-shape-end-end: 0;\n  --md-navigation-drawer-container-color: rgba(128, 128, 128, 0.5);\n}\n\n.ItkVtkViewer-module_drawer__b66eM {\n  overflow: hidden auto;\n}\n\n.ItkVtkViewer-module_floater__sSNkw {\n  position: absolute;\n  z-index: 3000;\n}\n\n.ItkVtkViewer-module_uiGroup__ad-WI {\n  background: rgba(128, 128, 128, 0.5);\n  border-radius: 4px;\n  margin: 2px;\n}\n\n.ItkVtkViewer-module_uiRow__KTQa8 {\n  display: flex;\n  flex-direction: row;\n  flex: 1;\n  align-items: center;\n  justify-content: space-between;\n  padding: 5px;\n}\n\n.ItkVtkViewer-module_mainUIRow__vTXih {\n  justify-content: space-around;\n  max-width: 420px;\n}\n\n.ItkVtkViewer-module_planeUIRow__D5gCh {\n  background: rgba(128, 128, 128, 0.5);\n}\n\n.ItkVtkViewer-module_layers__ZF-gN {\n  flex-wrap: wrap;\n}\n\n.ItkVtkViewer-module_progress__WydXH {\n  color: white;\n  font-size: 200%;\n  height: 100vh;\n  width: 100vw;\n  text-align: center;\n  vertical-align: middle;\n  line-height: 100vh;\n}\n\n.ItkVtkViewer-module_piecewiseWidget__5gKl5 {\n  flex: 1;\n  background: rgba(255, 255, 255, 0.2);\n  border-radius: 3px;\n  z-index: 1000;\n}\n\n.ItkVtkViewer-module_logo__9ErCF {\n  position: absolute;\n  top: 5px;\n  right: 5px;\n  height: 2em;\n  width: 2em;\n  cursor: pointer;\n  z-index: 100;\n}\n\n.ItkVtkViewer-module_fpsMonitor__bnwqr {\n  position: absolute;\n  top: 5px;\n  right: 5px;\n  border-radius: 5px;\n  background: rgba(255, 255, 255, 0.6);\n  cursor: pointer;\n  z-index: 101;\n}\n\n[itk-vtk-tooltip] {\n  position: relative;\n}\n[itk-vtk-tooltip]::before {\n  content: attr(itk-vtk-tooltip-content);\n  visibility: hidden;\n  position: absolute;\n  top: 50%;\n  right: calc(100% + 16px);\n  width: 400%;\n  padding: 4px 6px;\n  text-align: center;\n  text-transform: none;\n  font-size: 0.9em;\n  font-family: monospace;\n  border-radius: 3px;\n  background: rgba(0.9, 0.9, 0.9, 0.95);\n  color: white;\n  opacity: 0;\n  transform: translate(15px, -50%);\n  transition-property: all;\n  transition-duration: 0.3s;\n  transition-timing-function: ease-in-out;\n  transition-delay: 0.8s;\n  z-index: 3000;\n}\n\n[itk-vtk-tooltip]:hover::before {\n  opacity: 1;\n  visibility: visible;\n  transform: translate(0, -50%);\n}\n\n[itk-vtk-tooltip-bottom]::before {\n  top: calc(100% + 16px);\n  left: 50%;\n  right: initial;\n  transform: translate(-50%, -15px);\n}\n[itk-vtk-tooltip-bottom]:hover::before {\n  transform: translate(-50%, 0);\n}\n[itk-vtk-tooltip-right]::before {\n  top: 50%;\n  left: calc(100% + 16px);\n  right: initial;\n  transform: translate(-15px, -50%);\n}\n[itk-vtk-tooltip-right]:hover::before {\n  transform: translate(0, -50%);\n}\n[itk-vtk-tooltip-left]::before {\n  top: -50%;\n  right: 50%;\n  left: initial;\n}\n\n[itk-vtk-tooltip-top-screenshot]::before {\n  top: initial;\n  left: 260%;\n  right: initial;\n  bottom: calc(100% + 8px);\n  transform: translate(-50%, 15px);\n}\n[itk-vtk-tooltip-top-screenshot]:hover::before {\n  transform: translate(-50%, 0);\n}\n[itk-vtk-tooltip-top-annotations]::before {\n  top: initial;\n  left: 160%;\n  right: initial;\n  bottom: calc(100% + 10px);\n  transform: translate(-50%, 15px);\n}\n[itk-vtk-tooltip-top-annotations]:hover::before {\n  transform: translate(-50%, 0);\n}\n[itk-vtk-tooltip-top-axes]::before {\n  top: initial;\n  left: 160%;\n  right: initial;\n  bottom: calc(100% + 10px);\n  transform: translate(-50%, 15px);\n}\n[itk-vtk-tooltip-top-axes]:hover::before {\n  transform: translate(-50%, 0);\n}\n[itk-vtk-tooltip-top-fullscreen]::before {\n  top: initial;\n  left: 120%;\n  right: initial;\n  bottom: calc(100% + 10px);\n  transform: translate(-50%, 15px);\n  width: 400%;\n}\n[itk-vtk-tooltip-top-fullscreen]:hover::before {\n  transform: translate(-50%, 0);\n}\n[itk-vtk-tooltip-top]::before {\n  top: initial;\n  left: 60%;\n  right: initial;\n  bottom: calc(100% + 10px);\n  transform: translate(-50%, 15px);\n}\n[itk-vtk-tooltip-top]:hover::before {\n  transform: translate(-50%, 0);\n}\n[itk-vtk-tooltip-top-fullscreen]::before {\n  top: initial;\n  left: 120%;\n  right: initial;\n  bottom: calc(100% + 10px);\n  transform: translate(-50%, 15px);\n  width: 400%;\n}\n[itk-vtk-tooltip-top-input]::before {\n  top: initial;\n  right: initial;\n  bottom: 25%;\n  transform: translate(-50%, 15px);\n  width: -moz-fit-content;\n  width: -webkit-fit-content;\n  width: fit-content;\n}\n\n.ItkVtkViewer-module_layerEntryCommon__oIE1u {\n  flex: 1;\n  display: flex;\n  flex-direction: row;\n  align-items: stretch;\n  justify-content: space-between;\n  border-style: solid;\n  border-width: 2px;\n}\n\n.ItkVtkViewer-module_layerEntryBrightBG__qXyI2 {\n  border-color: #666;\n}\n\n.ItkVtkViewer-module_layerEntryDarkBG__BmiCj {\n  border-color: #aaa;\n}\n\n.ItkVtkViewer-module_layerLabelCommon__kTiO9 {\n  border: none;\n  background: transparent;\n  font-size: 1.2em;\n  z-index: 1000;\n\n  flex: 1;\n  overflow: hidden;\n  text-overflow: ellipsis;\n  text-align: center;\n}\n\n.ItkVtkViewer-module_layerLabelBrightBG__vAfex {\n  color: black;\n}\n\n.ItkVtkViewer-module_layerLabelDarkBG__sM6Bg {\n  color: white;\n}\n\n.ItkVtkViewer-module_visibleButton__ezrIc {\n  flex-basis: 2.5em;\n  cursor: pointer;\n  z-index: 1000;\n}\n\n.ItkVtkViewer-module_visibleButton__ezrIc img {\n  height: 1.2em;\n  width: 1.2em;\n  padding-top: 2px;\n  padding-bottom: 2px;\n  padding-left: 6px;\n  padding-right: 6px;\n}\n\n.ItkVtkViewer-module_noFlexBasis__8d4hI {\n  flex-basis: auto;\n}\n\n.ItkVtkViewer-module_layerIcon__v-rxO {\n  display: inline-block;\n}\n\n.ItkVtkViewer-module_layerIcon__v-rxO img {\n  height: 1.2em;\n  width: 1.2em;\n  padding-top: 2px;\n  padding-bottom: 2px;\n  padding-left: 8px;\n  padding-right: 6px;\n}\n\n.ItkVtkViewer-module_iconGroup__qqZrW {\n  display: inline-block;\n}\n\n.ItkVtkViewer-module_ldsRing__QT1wT {\n  display: inline-block;\n  position: relative;\n  width: 20px;\n  height: 20px;\n  margin-top: 4px;\n}\n.ItkVtkViewer-module_ldsRing__QT1wT div {\n  box-sizing: border-box;\n  display: block;\n  position: absolute;\n  width: 1em;\n  height: 1em;\n  margin: 0;\n  border: 0.15em solid #000;\n  border-radius: 50%;\n  animation: ItkVtkViewer-module_ldsRing__QT1wT 1.2s cubic-bezier(0.5, 0, 0.5, 1) infinite;\n  border-color: #000 transparent transparent transparent;\n}\n.ItkVtkViewer-module_ldsRing__QT1wT div:nth-child(1) {\n  animation-delay: -0.45s;\n}\n.ItkVtkViewer-module_ldsRing__QT1wT div:nth-child(2) {\n  animation-delay: -0.3s;\n}\n.ItkVtkViewer-module_ldsRing__QT1wT div:nth-child(3) {\n  animation-delay: -0.15s;\n}\n@keyframes ItkVtkViewer-module_ldsRing__QT1wT {\n  0% {\n    transform: rotate(0deg);\n  }\n  100% {\n    transform: rotate(360deg);\n  }\n}\n\n.ItkVtkViewer-module_tooltipButtonBrightBG__yffVf::before {\n}\n\n.ItkVtkViewer-module_tooltipButtonDarkBG__gEu0i::before {\n  filter: invert(100%);\n  -webkit-filter: invert(100%);\n}\n\n.ItkVtkViewer-module_invertibleButtonBrightBG__VmIfT {\n}\n\n.ItkVtkViewer-module_invertibleButtonDarkBG__GoKgD {\n  filter: invert(100%);\n  -webkit-filter: invert(100%);\n}\n\n.ItkVtkViewer-module_screenshotButton__OL4Na {\n  flex: 1;\n  width: 8mm;\n  padding-top: 2px;\n  padding-bottom: 2px;\n  padding-left: 6px;\n  padding-right: 6px;\n  cursor: pointer;\n  z-index: 1000;\n}\n\n.ItkVtkViewer-module_screenshotButton__OL4Na img {\n  height: 1.2em;\n  width: 1.2em;\n}\n\n.ItkVtkViewer-module_annotationsButton__Msb-p {\n  flex: 1;\n  width: 8mm;\n  padding-top: 2px;\n  padding-bottom: 2px;\n  padding-left: 6px;\n  padding-right: 6px;\n  cursor: pointer;\n  z-index: 1000;\n}\n\n.ItkVtkViewer-module_annotationsButton__Msb-p img {\n  height: 1.2em;\n  width: 1.2em;\n}\n\n.ItkVtkViewer-module_axesButton__k2H6p {\n  flex: 1;\n  width: 8mm;\n  padding-top: 2px;\n  padding-bottom: 2px;\n  padding-left: 6px;\n  padding-right: 6px;\n  cursor: pointer;\n  z-index: 1000;\n}\n\n.ItkVtkViewer-module_axesButton__k2H6p img {\n  height: 1.2em;\n  width: 1.2em;\n}\n\n.ItkVtkViewer-module_fullscreenButton__en3Z5 {\n  flex: 1;\n  width: 8m;\n  padding-top: 2px;\n  padding-bottom: 2px;\n  padding-left: 6px;\n  padding-right: 6px;\n  cursor: pointer;\n  z-index: 1000;\n}\n\n.ItkVtkViewer-module_fullscreenButton__en3Z5 img {\n  height: 1.2em;\n  width: 1.2em;\n}\n\n.ItkVtkViewer-module_interpolationButton__2P0HJ {\n  flex: 1;\n  width: 8mm;\n  padding-top: 2px;\n  padding-bottom: 2px;\n  padding-right: 4px;\n  cursor: pointer;\n  z-index: 1000;\n}\n\n.ItkVtkViewer-module_interpolationButton__2P0HJ img {\n  width: 1.2em;\n  margin-top: 4px;\n}\n\n.ItkVtkViewer-module_cropButton__ljwuU {\n  flex: 1;\n  height: 8mm;\n  padding-top: 2px;\n  padding-bottom: 2px;\n  padding-left: 6px;\n  padding-right: 6px;\n  cursor: pointer;\n  z-index: 1000;\n}\n\n.ItkVtkViewer-module_cropButton__ljwuU img {\n  height: 1.2em;\n  width: 1.2em;\n}\n\n.ItkVtkViewer-module_resetCropButton__SCGTH {\n  flex: 1;\n  width: 8mm;\n  padding-top: 2px;\n  padding-bottom: 2px;\n  padding-left: 6px;\n  padding-right: 6px;\n  cursor: pointer;\n  z-index: 1000;\n}\n\n.ItkVtkViewer-module_resetCropButton__SCGTH img {\n  height: 1.2em;\n  width: 1.2em;\n}\n\n.ItkVtkViewer-module_distanceEntry__zXMUS {\n  flex: 1;\n  display: flex;\n  flex-direction: row;\n  align-items: self-start;\n}\n\n.ItkVtkViewer-module_distanceButton__NhxBT {\n  flex: 1;\n  height: 8mm;\n  padding-top: 2px;\n  padding-bottom: 2px;\n  padding-left: 6px;\n  padding-right: 6px;\n  cursor: pointer;\n  z-index: 1000;\n}\n\n.ItkVtkViewer-module_distanceButton__NhxBT img {\n  height: 1.2em;\n  width: 1.2em;\n}\n\n.ItkVtkViewer-module_distanceLabelCommon__Ec-uc {\n  border: none;\n  background: transparent;\n  font-size: 1.2em;\n  margin-right: 10px;\n  z-index: 1000;\n}\n\n.ItkVtkViewer-module_distanceLabelBrightBG__aYmfG {\n  color: black;\n}\n\n.ItkVtkViewer-module_distanceLabelDarkBG__kYXvI {\n  color: white;\n}\n\n.ItkVtkViewer-module_distanceInput__gyNaU {\n  background: transparent;\n  color: white;\n  font-size: 1em;\n  width: 80px;\n}\n\n.ItkVtkViewer-module_resetCameraButton__l9FGp {\n  flex: 1;\n  width: 8mm;\n  padding-top: 2px;\n  padding-bottom: 2px;\n  padding-left: 6px;\n  padding-right: 6px;\n  cursor: pointer;\n  z-index: 1000;\n}\n\n.ItkVtkViewer-module_resetCameraButton__l9FGp img {\n  height: 1.2em;\n  width: 1.2em;\n}\n\n.ItkVtkViewer-module_bgColorButton__yrjOX {\n  flex: 1;\n  width: 8mm;\n  padding-top: 2px;\n  padding-bottom: 2px;\n  padding-left: 6px;\n  padding-right: 6px;\n  cursor: pointer;\n  z-index: 1000;\n}\n\n.ItkVtkViewer-module_bgColorButton__yrjOX img {\n  height: 1.2em;\n  width: 1.2em;\n}\n\n.ItkVtkViewer-module_viewModeButton__OtTng {\n  flex: 1;\n  width: 8mm;\n  padding-top: 2px;\n  padding-bottom: 2px;\n  padding-left: 6px;\n  padding-right: 6px;\n  cursor: pointer;\n  z-index: 1000;\n}\n\n.ItkVtkViewer-module_viewModeButton__OtTng img {\n  width: 1.3em;\n  height: 1.3em;\n}\n\n.ItkVtkViewer-module_shadowButton__09fEk {\n  width: 8mm;\n  padding: 4px;\n  padding-left: 0px;\n  cursor: pointer;\n  z-index: 1000;\n}\n\n.ItkVtkViewer-module_shadowButton__09fEk img {\n  width: 1.3em;\n  height: 1.3em;\n}\n\n.ItkVtkViewer-module_viewPlanesButton__rSnuZ {\n  flex: 1;\n  width: 8mm;\n  padding-top: 2px;\n  padding-bottom: 2px;\n  padding-left: 0px;\n  padding-right: 6px;\n  cursor: pointer;\n  z-index: 1000;\n}\n\n.ItkVtkViewer-module_viewPlanesButton__rSnuZ img {\n  width: 1.3em;\n  height: 1.3em;\n}\n\n.ItkVtkViewer-module_toggleInput__jHLTo {\n  margin: 0px;\n  width: 0;\n  opacity: 0;\n  box-sizing: content-box;\n}\n\n.ItkVtkViewer-module_toggleButton__qHhHZ {\n  cursor: pointer;\n  border-radius: 0.2em;\n  opacity: 0.45;\n}\n\ninput:checked.ItkVtkViewer-module_toggleInput__jHLTo + label {\n  opacity: 1;\n}\n\n.ItkVtkViewer-module_numberInput__pDxYH {\n  color: white;\n  background: transparent;\n  font-size: 1em;\n  padding-left: 2px;\n  width: 70px;\n}\n\n.ItkVtkViewer-module_selector__yw8l- {\n  display: flex;\n  direction: row;\n  font-size: 1.2em;\n  z-index: 1000;\n}\n\n.ItkVtkViewer-module_componentTab__6KSJF {\n  position: absolute;\n  opacity: 0;\n  pointer-events: none;\n}\n\n.ItkVtkViewer-module_disableInterface__CGB4S {\n  pointer-events: none;\n  opacity: 0.5;\n}\n\n.ItkVtkViewer-module_componentTab__6KSJF + .ItkVtkViewer-module_compTabLabel__8u4iU {\n  background: rgba(40, 40, 40, 0.5);\n  padding: 5px;\n  margin-right: 2px;\n  border-radius: 5px 5px 0px 0px;\n  color: #777;\n}\n\n.ItkVtkViewer-module_componentTab__6KSJF:hover + .ItkVtkViewer-module_compTabLabel__8u4iU {\n  background: rgba(90, 90, 90, 0.5);\n}\n\n.ItkVtkViewer-module_componentTab__6KSJF:checked + .ItkVtkViewer-module_compTabLabel__8u4iU {\n  background: rgba(127, 127, 127, 0.5);\n  color: #fff;\n}\n\n.ItkVtkViewer-module_componentVisibility__y1rRS {\n  position: relative;\n  top: -2px;\n  margin-left: 10px;\n}\n\nselect {\n  -moz-appearance: none;\n}\n\nselect option {\n  color: black;\n}\n\nselect:focus {\n  outline: none;\n  border: none;\n}\n\n.ItkVtkViewer-module_sampleDistanceButton__NjT0o {\n  width: 8mm;\n  padding: 4px;\n  padding-left: 6px;\n  z-index: 1000;\n}\n\n.ItkVtkViewer-module_sampleDistanceButton__NjT0o img {\n  width: 1.2em;\n  height: 1.2em;\n}\n\n.ItkVtkViewer-module_sliderColumn__ZwISb {\n  display: flex;\n  flex-direction: column;\n  flex: 1;\n  padding: 0 5px;\n}\n\n.ItkVtkViewer-module_sliderIcon__jfoL- {\n  width: 1.8em;\n  margin-right: 10px;\n  z-index: 1000;\n}\n\n.ItkVtkViewer-module_blendModeButton__cit1w {\n  width: 8mm;\n  padding: 4px;\n  padding-left: 8px;\n  padding-right: 0px;\n  z-index: 1000;\n}\n\n.ItkVtkViewer-module_blendModeButton__cit1w img {\n  width: 1.2em;\n  height: 1.2em;\n}\n\n.ItkVtkViewer-module_gradientOpacitySlider__wkEqP {\n  width: 8mm;\n  padding: 4px;\n  padding-left: 6px;\n  padding-right: 0px;\n  z-index: 1000;\n}\n\n.ItkVtkViewer-module_gradientOpacitySlider__wkEqP img {\n  width: 1.2em;\n  height: 1.2em;\n}\n\n.ItkVtkViewer-module_sliderEntry__3r3gO {\n  flex: 1;\n  display: flex;\n  flex-direction: row;\n  align-items: center;\n}\n\n.ItkVtkViewer-module_slider__eT9qm {\n  flex: 1;\n  min-height: 1rem;\n}\n\n.ItkVtkViewer-module_planeLabel__E1zOk {\n  padding-left: 6px;\n  padding: 2px;\n  display: block;\n  font-size: 1.1em;\n  font-family: monospace;\n  color: black;\n  border-width: 2px;\n  border-radius: 10%;\n}\n\n.ItkVtkViewer-module_xPlaneLabel__wK4Cb {\n  background-color: #ef5350;\n}\n\n.ItkVtkViewer-module_yPlaneLabel__rIm0j {\n  background-color: #fdd835;\n}\n\n.ItkVtkViewer-module_zPlaneLabel__94NL7 {\n  background-color: #4caf50;\n}\n\n.ItkVtkViewer-module_gradientOpacityScale__NrqOZ {\n  z-index: 1100;\n  position: relative;\n}\n\n.ItkVtkViewer-module_gradientOpacityScale__NrqOZ input {\n  position: absolute;\n  bottom: 20px;\n  left: -24px;\n  width: 12px;\n  writing-mode: bt-lr;\n  -webkit-appearance: slider-vertical;\n}\n\n.ItkVtkViewer-module_bigFileDrop__cZdkP {\n  position: absolute;\n  left: 50%;\n  top: 50%;\n  transform: translate(-50%, -50%);\n  background-color: white;\n  background-image: url('./dropBG.jpg');\n  background-repeat: no-repeat;\n  background-position: center;\n  background-size: contain;\n  border-radius: 10px;\n  width: 50px;\n  padding: calc(50vh - 2em) calc(50vw - 25px - 2em);\n}\n\n.ItkVtkViewer-module_fullscreenContainer__-H3c8 {\n  position: absolute;\n  width: 100vw;\n  height: 100vh;\n  top: 0;\n  left: 0;\n  overflow: hidden;\n  background: black;\n  margin: 0;\n  padding: 0;\n}\n\n.ItkVtkViewer-module_collapseButton__uzHPY {\n  position: absolute;\n  top: 0;\n  right: -48px;\n}\n\n.ItkVtkViewer-module_windowLevelButton__Lx0Tj {\n  width: 8mm;\n  padding: 4px;\n  padding-left: 0px;\n  cursor: pointer;\n  z-index: 1000;\n}\n\n.ItkVtkViewer-module_windowLevelButton__Lx0Tj img {\n  width: 1.3em;\n  height: 1.3em;\n}\n\n.ItkVtkViewer-module_inputLabel__dDf8G {\n  line-height: 1.7;\n}\n\n.ItkVtkViewer-module_saveDialog__BKmAa label {\n  display: flex;\n  align-items: center;\n}\n"
var style = {
  loading: 'ItkVtkViewer-module_loading__11c63',
  spin: 'ItkVtkViewer-module_spin__mT5S6',
  viewContainer: 'ItkVtkViewer-module_viewContainer__-5zNz',
  viewport: 'ItkVtkViewer-module_viewport__BMgOt',
  uiContainer: 'ItkVtkViewer-module_uiContainer__CiawP',
  drawer: 'ItkVtkViewer-module_drawer__b66eM',
  floater: 'ItkVtkViewer-module_floater__sSNkw',
  uiGroup: 'ItkVtkViewer-module_uiGroup__ad-WI',
  uiRow: 'ItkVtkViewer-module_uiRow__KTQa8',
  mainUIRow:
    'ItkVtkViewer-module_mainUIRow__vTXih ItkVtkViewer-module_uiRow__KTQa8',
  planeUIRow:
    'ItkVtkViewer-module_planeUIRow__D5gCh ItkVtkViewer-module_uiRow__KTQa8',
  layers: 'ItkVtkViewer-module_layers__ZF-gN',
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
  noFlexBasis: 'ItkVtkViewer-module_noFlexBasis__8d4hI',
  layerIcon: 'ItkVtkViewer-module_layerIcon__v-rxO',
  iconGroup: 'ItkVtkViewer-module_iconGroup__qqZrW',
  ldsRing: 'ItkVtkViewer-module_ldsRing__QT1wT',
  tooltipButtonBrightBG: 'ItkVtkViewer-module_tooltipButtonBrightBG__yffVf',
  tooltipButtonDarkBG: 'ItkVtkViewer-module_tooltipButtonDarkBG__gEu0i',
  invertibleButtonBrightBG:
    'ItkVtkViewer-module_invertibleButtonBrightBG__VmIfT',
  invertibleButtonDarkBG: 'ItkVtkViewer-module_invertibleButtonDarkBG__GoKgD',
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
  sliderColumn: 'ItkVtkViewer-module_sliderColumn__ZwISb',
  sliderIcon: 'ItkVtkViewer-module_sliderIcon__jfoL-',
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
  collapseButton: 'ItkVtkViewer-module_collapseButton__uzHPY',
  windowLevelButton: 'ItkVtkViewer-module_windowLevelButton__Lx0Tj',
  inputLabel: 'ItkVtkViewer-module_inputLabel__dDf8G',
  saveDialog: 'ItkVtkViewer-module_saveDialog__BKmAa',
}
styleInject(css_248z$1)

const optimizedSVGDataUri$x =
  "data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 1664 1536'%3e%3cpath d='M725 431L555 881q33 0 136.5 2t160.5 2q19 0 57-2-87-253-184-452zM0 1536l2-79q23-7 56-12.5t57-10.5 49.5-14.5 44.5-29 31-50.5l237-616L757 0h128q8 14 11 21l205 480q33 78 106 257.5t114 274.5q15 34 58 144.5t72 168.5q20 45 35 57 19 15 88 29.5t84 20.5q6 38 6 57 0 4-.5 13t-.5 13q-63 0-190-8t-191-8q-76 0-215 7t-178 8q0-43 4-78l131-28q1 0 12.5-2.5t15.5-3.5 14.5-4.5 15-6.5 11-8 9-11 2.5-14q0-16-31-96.5t-72-177.5-42-100l-450-2q-26 58-76.5 195.5T382 1361q0 22 14 37.5t43.5 24.5 48.5 13.5 57 8.5 41 4q1 19 1 58 0 9-2 27-58 0-174.5-10T236 1514q-8 0-26.5 4t-21.5 4q-80 14-188 14z'/%3e%3c/svg%3e"

const optimizedSVGDataUri$w =
  "data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 43 41.91699981689453'%3e%3cpath d='M15 24.089V7.375L9 13V7.5L17 0l8 7.5V13l-6-5.625v15.542h16.625l-5.625-6h5.5l7.5 8-7.5 8H30l5.625-6H17.828l-11 11H15l-4 4H0v-11l4-4v8.172l11-11zm6.253 8.361L18.8 37.262v2.655h-1.707v-2.625l-2.346-4.842h1.921l1.195 2.785.17.61h.022l.165-.588 1.252-2.807h1.781zm8.267-10.533h-2.03l-1.308-2.432-.154-.5h-.021l-.175.522-1.314 2.41H22.48l2.42-3.733-2.207-3.734h2.079l1.083 2.239.227.63h.021l.235-.65 1.194-2.219h1.881l-2.235 3.702 2.342 3.765zm-16.48 1H6.96v-.985l3.875-5.095H7.28V15.45h5.76v.955L9.248 21.53h3.792v1.387z'/%3e%3c/svg%3e"

const optimizedSVGDataUri$v =
  "data:image/svg+xml,%3c%3fxml version='1.0' encoding='UTF-8' standalone='no'%3f%3e %3csvg viewBox='0 0 1763.3333740234375 1792' version='1.1' id='svg113' sodipodi:docname='blendMode.svg' inkscape:version='1.2 (1:1.2%2b202206011326%2bfc4e4096c5)' xmlns:inkscape='http://www.inkscape.org/namespaces/inkscape' xmlns:sodipodi='http://sodipodi.sourceforge.net/DTD/sodipodi-0.dtd' xmlns='http://www.w3.org/2000/svg' xmlns:svg='http://www.w3.org/2000/svg'%3e %3cdefs id='defs117' /%3e %3csodipodi:namedview id='namedview115' pagecolor='white' bordercolor='black' borderopacity='0.25' inkscape:showpageshadow='2' inkscape:pageopacity='0.0' inkscape:pagecheckerboard='0' inkscape:deskcolor='%23d1d1d1' showgrid='false' inkscape:zoom='0.27047836' inkscape:cx='763.46218' inkscape:cy='1454.8299' inkscape:window-width='1846' inkscape:window-height='1136' inkscape:window-x='74' inkscape:window-y='27' inkscape:window-maximized='1' inkscape:current-layer='svg113' /%3e %3cellipse style='fill:none%3bfill-opacity:1%3bstroke:black%3bstroke-width:149.145%3bstroke-dasharray:none%3bstroke-opacity:1' id='path223' cx='601' cy='899.99982' rx='525.42761' ry='525.42743' /%3e %3ccircle style='fill:black%3bfill-opacity:1%3bstroke:none%3bstroke-width:100%3bstroke-dasharray:none%3bstroke-opacity:1' id='path223-3' cx='1163' cy='900' r='600' /%3e %3c/svg%3e"

const optimizedSVGDataUri$u =
  "data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24'%3e%3cpath fill='currentColor' d='M17 22v-2h3v-3h2v3.5c0 .39-.16.74-.46 1.04c-.3.3-.65.46-1.04.46H17M7 22H3.5c-.39 0-.74-.16-1.04-.46c-.3-.3-.46-.65-.46-1.04V17h2v3h3v2M17 2h3.5c.39 0 .74.16 1.04.46c.3.3.46.65.46 1.04V7h-2V4h-3V2M7 2v2H4v3H2V3.5c0-.39.16-.74.46-1.04c.3-.3.65-.46 1.04-.46H7m6 15.25l4-2.3v-4.59l-4 2.3v4.59m-1-6.33l4-2.29l-4-2.35l-4 2.35l4 2.29m-5 4.03l4 2.3v-4.59l-4-2.3v4.59m11.23-7.36c.5.32.77.75.77 1.32v6.32c0 .57-.27 1-.77 1.32l-5.48 3.18c-.5.32-1 .32-1.5 0l-5.48-3.18c-.5-.32-.77-.75-.77-1.32V8.91c0-.57.27-1 .77-1.32l5.48-3.18c.25-.13.5-.19.75-.19s.5.06.75.19l5.48 3.18Z'/%3e%3c/svg%3e"

const optimizedSVGDataUri$t =
  "data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 384 384'%3e%3cpath d='M64 0h32v48H64zm32 288V112H64v208h208v-32zm240 0h48v32h-48z'/%3e%3cpath d='M0 64v32h288v288h32V64z'/%3e%3c/svg%3e"

const optimizedSVGDataUri$s =
  "data:image/svg+xml,%3c%3fxml version='1.0' encoding='utf-8'%3f%3e%3c!-- Uploaded to: SVG Repo%2c www.svgrepo.com%2c Generator: SVG Repo Mixer Tools --%3e %3csvg fill='black' width='800px' height='800px' viewBox='0 0 24 24' xmlns='http://www.w3.org/2000/svg'%3e%3cpath d='M7.293%2c13.707a1%2c1%2c0%2c1%2c1%2c1.414-1.414L11%2c14.586V3a1%2c1%2c0%2c0%2c1%2c2%2c0V14.586l2.293-2.293a1%2c1%2c0%2c0%2c1%2c1.414%2c1.414l-4%2c4a1%2c1%2c0%2c0%2c1-.325.216.986.986%2c0%2c0%2c1-.764%2c0%2c1%2c1%2c0%2c0%2c1-.325-.216ZM22%2c12a1%2c1%2c0%2c0%2c0-1%2c1v7H3V13a1%2c1%2c0%2c0%2c0-2%2c0v8a1%2c1%2c0%2c0%2c0%2c1%2c1H22a1%2c1%2c0%2c0%2c0%2c1-1V13A1%2c1%2c0%2c0%2c0%2c22%2c12Z'/%3e%3c/svg%3e"

const optimizedSVGDataUri$r =
  "data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 1536 1536'%3e%3cpath d='M1283 413L928 768l355 355 144-144q29-31 70-14 39 17 39 59v448q0 26-19 45t-45 19h-448q-42 0-59-40-17-39 14-69l144-144-355-355-355 355 144 144q31 30 14 69-17 40-59 40H64q-26 0-45-19t-19-45v-448q0-42 40-59 39-17 69 14l144 144 355-355-355-355-144 144q-19 19-45 19-12 0-24-5-40-17-40-59V64q0-26 19-45T64 0h448q42 0 59 40 17 39-14 69L413 253l355 355 355-355-144-144q-31-30-14-69 17-40 59-40h448q26 0 45 19t19 45v448q0 42-39 59-13 5-25 5-26 0-45-19z'/%3e%3c/svg%3e"

const optimizedSVGDataUri$q =
  "data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 36 36'%3e%3cpath d='M16 12h4v4h-4zm-4 4h4v4h-4zm8 0h4v4h-4zm4-4h4v4h-4zM8 12h4v4H8zM32 0H4C1.8 0 0 1.8 0 4v28c0 2.2 1.8 4 4 4h28c2.2 0 4-1.8 4-4V4c0-2.2-1.8-4-4-4zM12 30H8v-4h4v4zm8 0h-4v-4h4v4zm8 0h-4v-4h4v4zm4-14h-4v4h4v4h-4v-4h-4v4h-4v-4h-4v4h-4v-4H8v4H4v-4h4v-4H4V4h28v12z'/%3e%3c/svg%3e"

const optimizedSVGDataUri$p =
  "data:image/svg+xml,%3c%3fxml version='1.0' encoding='UTF-8' standalone='no'%3f%3e %3c!DOCTYPE svg PUBLIC '-//W3C//DTD SVG 1.1//EN' 'http://www.w3.org/Graphics/SVG/1.1/DTD/svg11.dtd'%3e %3csvg version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink' preserveAspectRatio='xMidYMid meet' viewBox='13.909765010254631 15.20464974120776 126.4822541859144 128.7097615525036' width='122.48' height='124.71'%3e%3cdefs%3e%3cpath d='M76.43 16.2L130.98 47.58L76.43 75.4L21.89 47.58L76.43 16.2Z' id='bhsnPtSOa'%3e%3c/path%3e%3cpath d='M69.91 140.91L14.91 114.08L15 60L70 87.88L69.91 140.91Z' id='agS5SeOOL'%3e%3c/path%3e%3cpath d='M137.39 113.62L136.4 59.17L82.61 87.3L83.59 140.83L137.39 113.62Z' id='c3paZhyh3s'%3e%3c/path%3e%3c/defs%3e%3cg%3e%3cg%3e%3cuse xlink:href='%23bhsnPtSOa' opacity='1' fill='%2359d87d' fill-opacity='1'%3e%3c/use%3e%3c/g%3e%3cg%3e%3cuse xlink:href='%23agS5SeOOL' opacity='1' fill='%233384c5' fill-opacity='1'%3e%3c/use%3e%3c/g%3e%3cg%3e%3cuse xlink:href='%23c3paZhyh3s' opacity='1' fill='%233384c5' fill-opacity='1'%3e%3c/use%3e%3c/g%3e%3c/g%3e%3c/svg%3e"

const optimizedSVGDataUri$o =
  "data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 1920 1536'%3e%3cpath d='M640 448q0 80-56 136t-136 56-136-56-56-136 56-136 136-56 136 56 56 136zm1024 384v448H256v-192l320-320 160 160 512-512zm96-704H160q-13 0-22.5 9.5T128 160v1216q0 13 9.5 22.5t22.5 9.5h1600q13 0 22.5-9.5t9.5-22.5V160q0-13-9.5-22.5T1760 128zm160 32v1216q0 66-47 113t-113 47H160q-66 0-113-47T0 1376V160Q0 94 47 47T160 0h1600q66 0 113 47t47 113z'/%3e%3c/svg%3e"

const optimizedSVGDataUri$n =
  "data:image/svg+xml,%3c%3fxml version='1.0' encoding='UTF-8' standalone='no'%3f%3e %3c!DOCTYPE svg PUBLIC '-//W3C//DTD SVG 1.1//EN' 'http://www.w3.org/Graphics/SVG/1.1/DTD/svg11.dtd'%3e %3csvg version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink' preserveAspectRatio='xMidYMid meet' viewBox='24.474820143884916 11.75539568345329 107.73381294964032 102.35251798561154' width='102.73' height='97.35'%3e%3cdefs%3e%3cpath d='M26.47 13.76L129.21 13.76L129.21 111.11L26.47 111.11L26.47 13.76Z' id='a3ZYhJlju'%3e%3c/path%3e%3clinearGradient id='gradientbexcZGM80' gradientUnits='userSpaceOnUse' x1='27.65' y1='13.76' x2='129.21' y2='111.57'%3e%3cstop style='stop-color: white%3bstop-opacity: 1' offset='0%25'%3e%3c/stop%3e%3cstop style='stop-color: %23010000%3bstop-opacity: 1' offset='100%25'%3e%3c/stop%3e%3c/linearGradient%3e%3c/defs%3e%3cg%3e%3cg%3e%3cuse xlink:href='%23a3ZYhJlju' opacity='1' fill='url(%23gradientbexcZGM80)'%3e%3c/use%3e%3cg%3e%3cuse xlink:href='%23a3ZYhJlju' opacity='1' fill-opacity='0' stroke='white' stroke-width='4' stroke-opacity='1'%3e%3c/use%3e%3c/g%3e%3c/g%3e%3c/g%3e%3c/svg%3e"

const optimizedSVGDataUri$m =
  "data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 1792 1344'%3e%3cpath d='M555 1047l78-141q-87-63-136-159t-49-203q0-121 61-225-229 117-381 353 167 258 427 375zm389-759q0-20-14-34t-34-14q-125 0-214.5 89.5T592 544q0 20 14 34t34 14 34-14 14-34q0-86 61-147t147-61q20 0 34-14t14-34zm363-191q0 7-1 9-105 188-315 566t-316 567l-49 89q-10 16-28 16-12 0-134-70-16-10-16-28 0-12 44-87-143-65-263.5-173T20 741Q0 710 0 672t20-69q153-235 380-371T896 96q89 0 180 17l54-97q10-16 28-16 5 0 18 6t31 15.5 33 18.5 31.5 18.5T1291 70q16 10 16 27zm37 447q0 139-79 253.5T1056 962l280-502q8 45 8 84zm448 128q0 35-20 69-39 64-109 145-150 172-347.5 267T896 1248l74-132q212-18 392.5-137T1664 672q-115-179-282-294l63-112q95 64 182.5 153T1772 603q20 34 20 69z'/%3e%3c/svg%3e"

const optimizedSVGDataUri$l =
  "data:image/svg+xml,%3c%3fxml version='1.0' encoding='utf-8'%3f%3e %3csvg version='1.1' id='Layer_1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink' x='0px' y='0px' viewBox='0 0 100 100' style='enable-background:new 0 0 100 100%3b' xml:space='preserve'%3e %3ccircle cx='59.6' cy='42.7' r='4.9'/%3e %3cpath d='M41.1%2c84.2c-1%2c0-2-0.4-2.7-1.3l-22-26.7c-1.2-1.5-1-3.7%2c0.5-4.9l31.9-26.4c0.6-0.5%2c1.4-0.8%2c2.2-0.8c0%2c0%2c0%2c0%2c0%2c0l27.1%2c0.1 c1%2c0%2c2%2c0.5%2c2.7%2c1.3c0.7%2c0.8%2c0.9%2c1.9%2c0.7%2c2.9L76.5%2c55c-0.2%2c0.8-0.6%2c1.5-1.2%2c2L43.3%2c83.4C42.7%2c83.9%2c41.9%2c84.2%2c41.1%2c84.2z M24%2c54.5 l17.6%2c21.3l28.3-23.3l4-21.2l-21.6-0.1L24%2c54.5z'/%3e %3c/svg%3e"

const optimizedSVGDataUri$k =
  "data:image/svg+xml,%3c%3fxml version='1.0' encoding='UTF-8' standalone='no'%3f%3e %3csvg xmlns:dc='http://purl.org/dc/elements/1.1/' xmlns:cc='http://creativecommons.org/ns%23' xmlns:rdf='http://www.w3.org/1999/02/22-rdf-syntax-ns%23' xmlns:svg='http://www.w3.org/2000/svg' xmlns='http://www.w3.org/2000/svg' version='1.1' id='svg2' viewBox='0 0 62.221396 60.130392' height='16.970133mm' width='17.560261mm'%3e %3cdefs id='defs4' /%3e %3cmetadata id='metadata7'%3e %3crdf:RDF%3e %3ccc:Work rdf:about=''%3e %3cdc:format%3eimage/svg%2bxml%3c/dc:format%3e %3cdc:type rdf:resource='http://purl.org/dc/dcmitype/StillImage' /%3e %3cdc:title%3e%3c/dc:title%3e %3c/cc:Work%3e %3c/rdf:RDF%3e %3c/metadata%3e %3cg transform='translate(-204.3732%2c-426.67465)' id='layer1'%3e %3crect transform='matrix(0.67893789%2c0.73419571%2c-0.73419571%2c0.67893789%2c0%2c0)' y='107.51627' x='484.44534' height='59.38089' width='21.540062' id='rect4140' style='fill:none%3bfill-opacity:1%3bstroke:black%3bstroke-width:4%3bstroke-linecap:round%3bstroke-linejoin:round%3bstroke-miterlimit:4%3bstroke-dasharray:none%3bstroke-dashoffset:0%3bstroke-opacity:1' /%3e %3cpath id='path4148' d='m 243.29116%2c434.92064 c 3.16419%2c3.42172 6.32839%2c6.84344 9.49258%2c10.26516' style='fill:none%3bfill-rule:evenodd%3bstroke:black%3bstroke-width:4%3bstroke-linecap:round%3bstroke-linejoin:miter%3bstroke-miterlimit:4%3bstroke-dasharray:none%3bstroke-opacity:1' /%3e %3cpath id='path4148-3-5' d='m 236.26734%2c441.53481 c 1.96377%2c2.12361 3.92755%2c4.24722 5.89132%2c6.37082' style='fill:none%3bfill-rule:evenodd%3bstroke:black%3bstroke-width:4%3bstroke-linecap:round%3bstroke-linejoin:miter%3bstroke-miterlimit:4%3bstroke-dasharray:none%3bstroke-opacity:1' /%3e %3cpath id='path4148-3' d='m 228.61436%2c448.49077 c 3.16419%2c3.42172 6.32839%2c6.84345 9.49259%2c10.26516' style='fill:none%3bfill-rule:evenodd%3bstroke:black%3bstroke-width:4%3bstroke-linecap:round%3bstroke-linejoin:miter%3bstroke-miterlimit:4%3bstroke-dasharray:none%3bstroke-opacity:1' /%3e %3cpath id='path4148-3-5-5' d='m 220.76246%2c455.75236 c 1.96378%2c2.12361 3.92756%2c4.24721 5.89133%2c6.37081' style='fill:none%3bfill-rule:evenodd%3bstroke:black%3bstroke-width:4%3bstroke-linecap:round%3bstroke-linejoin:miter%3bstroke-miterlimit:4%3bstroke-dasharray:none%3bstroke-opacity:1' /%3e %3cpath id='path4148-6' d='m 213.55887%2c462.41313 c 3.16419%2c3.42173 6.32839%2c6.84345 9.49258%2c10.26518' style='fill:none%3bfill-rule:evenodd%3bstroke:black%3bstroke-width:4%3bstroke-linecap:round%3bstroke-linejoin:miter%3bstroke-miterlimit:4%3bstroke-dasharray:none%3bstroke-opacity:1' /%3e %3c/g%3e %3c/svg%3e"

const optimizedSVGDataUri$j =
  "data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 1536 1536'%3e%3cpath d='M768 1312V224q-148 0-273 73T297 495t-73 273 73 273 198 198 273 73zm768-544q0 209-103 385.5T1153.5 1433 768 1536t-385.5-103T103 1153.5 0 768t103-385.5T382.5 103 768 0t385.5 103T1433 382.5 1536 768z'/%3e%3c/svg%3e"

const optimizedSVGDataUri$i =
  "data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 1536 1536'%3e%3cpath d='M768 0q209 0 385.5 103T1433 382.5 1536 768t-103 385.5-279.5 279.5T768 1536t-385.5-103T103 1153.5 0 768t103-385.5T382.5 103 768 0zm0 1312q148 0 273-73t198-198 73-273-73-273-198-198-273-73-273 73-198 198-73 273 73 273 198 198 273 73zm96-224q-14 0-23-9t-9-23V480q0-14 9-23t23-9h192q14 0 23 9t9 23v576q0 14-9 23t-23 9H864zm-384 0q-14 0-23-9t-9-23V480q0-14 9-23t23-9h192q14 0 23 9t9 23v576q0 14-9 23t-23 9H480z'/%3e%3c/svg%3e"

const optimizedSVGDataUri$h =
  "data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 1536 1536'%3e%3cpath d='M1184 768q0 37-32 55l-544 320q-15 9-32 9-16 0-32-8-32-19-32-56V448q0-37 32-56 33-18 64 1l544 320q32 18 32 55zm128 0q0-148-73-273t-198-198-273-73-273 73-198 198-73 273 73 273 198 198 273 73 273-73 198-198 73-273zm224 0q0 209-103 385.5T1153.5 1433 768 1536t-385.5-103T103 1153.5 0 768t103-385.5T382.5 103 768 0t385.5 103T1433 382.5 1536 768z'/%3e%3c/svg%3e"

const optimizedSVGDataUri$g =
  "data:image/svg+xml,%3c%3fxml version='1.0' encoding='UTF-8' standalone='no'%3f%3e %3c!DOCTYPE svg PUBLIC '-//W3C//DTD SVG 1.1//EN' 'http://www.w3.org/Graphics/SVG/1.1/DTD/svg11.dtd'%3e %3csvg version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink' preserveAspectRatio='xMidYMid meet' viewBox='23.526450466849894 25.20464974120776 126.86556872931914 128.62412323660308' width='122.87' height='124.62'%3e%3cdefs%3e%3cpath d='M85.45 26.2L140 57.58L85.45 85.4L30.91 57.58L85.45 26.2Z' id='bljQJJOjU'%3e%3c/path%3e%3cpath d='M79.53 149.62L24.53 122.78L24.62 68.7L79.62 96.58L79.53 149.62Z' id='a2OxwluQL6'%3e%3c/path%3e%3cpath d='M147.39 123.62L146.4 69.17L92.61 97.3L93.59 150.83L147.39 123.62Z' id='a4nIltkDon'%3e%3c/path%3e%3c/defs%3e%3cg%3e%3cg%3e%3cuse xlink:href='%23bljQJJOjU' opacity='1' fill='%233384c5' fill-opacity='1'%3e%3c/use%3e%3c/g%3e%3cg%3e%3cuse xlink:href='%23a2OxwluQL6' opacity='1' fill='%23ff7b7b' fill-opacity='1'%3e%3c/use%3e%3c/g%3e%3cg%3e%3cuse xlink:href='%23a4nIltkDon' opacity='1' fill='%233384c5' fill-opacity='1'%3e%3c/use%3e%3c/g%3e%3c/g%3e%3c/svg%3e"

const optimizedSVGDataUri$f =
  "data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 448 448'%3e%3cpath d='M224 144c-44.004 0-80.001 36-80.001 80 0 44.004 35.997 80 80.001 80 44.005 0 79.999-35.996 79.999-80 0-44-35.994-80-79.999-80zm190.938 58.667c-9.605-88.531-81.074-160-169.605-169.599V0h-42.666v33.067c-88.531 9.599-160 81.068-169.604 169.599H0v42.667h33.062c9.604 88.531 81.072 160 169.604 169.604V448h42.666v-33.062c88.531-9.604 160-81.073 169.605-169.604H448v-42.667h-33.062zM224 373.333c-82.137 0-149.334-67.198-149.334-149.333 0-82.136 67.197-149.333 149.334-149.333 82.135 0 149.332 67.198 149.332 149.333S306.135 373.333 224 373.333z'/%3e%3c/svg%3e"

const optimizedSVGDataUri$e =
  "data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 384 384'%3e%3cpath d='M332.795 332.8H256V384h128V256h-51.205zm.005-281.595V128H384V0H256v51.205zM51.205 51.2H128V0H0v128h51.205zM51.2 332.795V256H0v128h128v-51.205z'/%3e%3c/svg%3e"

const optimizedSVGDataUri$d =
  "data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24'%3e%3cpath fill='currentColor' d='M3 9V3h2v3.35Q6.25 4.8 8.063 3.9T12 3q2.95 0 5.263 1.675T20.5 9h-2.175q-.85-1.8-2.525-2.9T12 5q-1.425 0-2.688.525T7.1 7H9v2H3Zm3 9h12l-3.75-5l-3 4L9 14l-3 4Zm-1 4q-.825 0-1.413-.588T3 20v-8h2v8h14v-8h2v8q0 .825-.588 1.413T19 22H5Z'/%3e%3c/svg%3e"

const optimizedSVGDataUri$c =
  "data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24'%3e%3cpath d='M12 6v3l4-4-4-4v3c-4.42 0-8 3.58-8 8 0 1.57.46 3.03 1.24 4.26L6.7 14.8c-.45-.83-.7-1.79-.7-2.8 0-3.31 2.69-6 6-6zm6.76 1.74L17.3 9.2c.44.84.7 1.79.7 2.8 0 3.31-2.69 6-6 6v-3l-4 4 4 4v-3c4.42 0 8-3.58 8-8 0-1.57-.46-3.03-1.24-4.26z'/%3e%3c/svg%3e"

const optimizedSVGDataUri$b =
  "data:image/svg+xml,%3csvg viewBox='0 0 180 180' xmlns='http://www.w3.org/2000/svg'%3e%3cg stroke='black' stroke-width='10' fill='none' fill-rule='evenodd' stroke-linecap='square'%3e%3cpath d='M10 90h160M10 133.488V47M170 133.488V47M90 133.488V47'/%3e%3c/g%3e%3c/svg%3e"

const optimizedSVGDataUri$a =
  "data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 1763.3333740234375 1792'%3e%3cpath d='M707.333 1440q0 12-10 24l-319 319q-10 9-23 9-12 0-23-9l-320-320q-15-16-7-35 8-20 30-20h192V32q0-14 9-23t23-9h192q14 0 23 9t9 23v1376h192q14 0 23 9t9 23zm1056 128v192q0 14-9 23t-23 9h-832q-14 0-23-9t-9-23v-192q0-14 9-23t23-9h832q14 0 23 9t9 23zm-192-512v192q0 14-9 23t-23 9h-640q-14 0-23-9t-9-23v-192q0-14 9-23t23-9h640q14 0 23 9t9 23zm-192-512v192q0 14-9 23t-23 9h-448q-14 0-23-9t-9-23V544q0-14 9-23t23-9h448q14 0 23 9t9 23zm-192-512v192q0 14-9 23t-23 9h-256q-14 0-23-9t-9-23V32q0-14 9-23t23-9h256q14 0 23 9t9 23z'/%3e%3c/svg%3e"

const optimizedSVGDataUri$9 =
  "data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 1920 1664'%3e%3cpath d='M960 672q119 0 203.5 84.5T1248 960t-84.5 203.5T960 1248t-203.5-84.5T672 960t84.5-203.5T960 672zm704-416q106 0 181 75t75 181v896q0 106-75 181t-181 75H256q-106 0-181-75T0 1408V512q0-106 75-181t181-75h224l51-136q19-49 69.5-84.5T704 0h512q53 0 103.5 35.5T1389 120l51 136h224zM960 1408q185 0 316.5-131.5T1408 960t-131.5-316.5T960 512 643.5 643.5 512 960t131.5 316.5T960 1408z'/%3e%3c/svg%3e"

const optimizedSVGDataUri$8 =
  "data:image/svg+xml,%3csvg id='Layer_1' data-name='Layer 1' xmlns='http://www.w3.org/2000/svg' viewBox='0 0 64 64'%3e%3ctitle%3eSVG_Artboards%3c/title%3e%3crect x='17.52' y='15.45' width='28.97' height='49.1' transform='translate(72 8) rotate(90)' style='fill:%23a7d28c%3bstroke:%236f6f59%3bstroke-linecap:round%3bstroke-linejoin:round%3bstroke-width:2.2536px'/%3e%3crect x='8.56' y='26.62' width='2.96' height='26.71' style='fill:%23603c89'/%3e%3crect x='11.52' y='26.62' width='2.96' height='26.71' style='fill:%2346449b'/%3e%3crect x='14.42' y='26.62' width='2.96' height='26.71' style='fill:%232a5aa8'/%3e%3crect x='17.38' y='26.62' width='2.96' height='26.71' style='fill:%230c71b8'/%3e%3crect x='20.36' y='26.62' width='2.96' height='26.71' style='fill:%230d7fc2'/%3e%3crect x='23.32' y='26.62' width='2.96' height='26.71' style='fill:%23198ece'/%3e%3crect x='26.22' y='26.62' width='2.96' height='26.71' style='fill:%2325a1db'/%3e%3crect x='29.18' y='26.62' width='2.96' height='26.71' style='fill:%2312b2d2'/%3e%3crect x='32.19' y='26.62' width='2.96' height='26.71' style='fill:%234bb88e'/%3e%3crect x='23.21' y='38.49' width='26.71' height='2.96' transform='translate(76.54 3.41) rotate(90)' style='fill:%2398c37e'/%3e%3crect x='26.17' y='38.49' width='26.71' height='2.96' transform='translate(79.5 0.45) rotate(90)' style='fill:%23a4c661'/%3e%3crect x='29.07' y='38.49' width='26.71' height='2.96' transform='translate(82.4 -2.45) rotate(90)' style='fill:%23c6c835'/%3e%3crect x='32.03' y='38.49' width='26.71' height='2.96' transform='translate(85.36 -5.41) rotate(90)' style='fill:%23e8c61d'/%3e%3crect x='35.01' y='38.49' width='26.71' height='2.96' transform='translate(88.34 -8.39) rotate(90)' style='fill:%23e2ae27'/%3e%3crect x='37.97' y='38.49' width='26.71' height='2.96' transform='translate(91.3 -11.35) rotate(90)' style='fill:%23dc9a2a'/%3e%3crect x='40.87' y='38.49' width='26.71' height='2.96' transform='translate(94.2 -14.25) rotate(90)' style='fill:%23c58338'/%3e%3cline x1='23.49' y1='34.89' x2='23.49' y2='46.71' style='fill:none%3bstroke:%236f6f59%3bstroke-linecap:round%3bstroke-linejoin:round%3bstroke-width:2.2536px'/%3e%3cline x1='39.95' y1='34.89' x2='39.95' y2='46.71' style='fill:none%3bstroke:%236f6f59%3bstroke-linecap:round%3bstroke-linejoin:round%3bstroke-width:2.2536px'/%3e%3cline x1='56.07' y1='40.8' x2='8.94' y2='40.8' style='fill:none%3bstroke:%236f6f59%3bstroke-linecap:round%3bstroke-linejoin:round%3bstroke-width:2.2536px'/%3e%3ccircle cx='21.12' cy='20.63' r='15.5' style='fill:%23a7d28c%3bstroke:%236f6f59%3bstroke-linecap:round%3bstroke-linejoin:round%3bstroke-width:2.2536px'/%3e%3c/svg%3e"

const optimizedSVGDataUri$7 =
  "data:image/svg+xml,%3c%3fxml version='1.0' encoding='UTF-8' standalone='no'%3f%3e %3c!DOCTYPE svg PUBLIC '-//W3C//DTD SVG 1.1//EN' 'http://www.w3.org/Graphics/SVG/1.1/DTD/svg11.dtd'%3e %3csvg version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink' preserveAspectRatio='xMidYMid meet' viewBox='15 15 75.15107913669064 70.19424460431657' width='61.15' height='59.19'%3e%3cdefs%3e%3cpath d='M15 15L76.15 15L76.15 74.19L15 74.19L15 15Z' id='a28rcsTDH'%3e%3c/path%3e%3cclipPath id='clipa5ipCW0hFw'%3e%3cuse xlink:href='%23a28rcsTDH' opacity='1'%3e%3c/use%3e%3c/clipPath%3e%3c/defs%3e%3cg%3e%3cg%3e%3cg%3e%3cfilter id='shadow11528463' x='-5' y='-5' width='113.15' height='108.19' filterUnits='userSpaceOnUse' primitiveUnits='userSpaceOnUse'%3e%3cfeFlood%3e%3c/feFlood%3e%3cfeComposite in2='SourceAlpha' operator='in'%3e%3c/feComposite%3e%3cfeGaussianBlur stdDeviation='1'%3e%3c/feGaussianBlur%3e%3cfeOffset dx='12' dy='9' result='afterOffset'%3e%3c/feOffset%3e%3cfeFlood flood-color='black' flood-opacity='0.5'%3e%3c/feFlood%3e%3cfeComposite in2='afterOffset' operator='in'%3e%3c/feComposite%3e%3cfeMorphology operator='dilate' radius='1'%3e%3c/feMorphology%3e%3cfeComposite in2='SourceAlpha' operator='out'%3e%3c/feComposite%3e%3c/filter%3e%3cpath d='M15 15L76.15 15L76.15 74.19L15 74.19L15 15Z' id='ciVjyGjh3' fill='white' fill-opacity='1' filter='url(%23shadow11528463)'%3e%3c/path%3e%3c/g%3e%3cuse xlink:href='%23a28rcsTDH' opacity='1' fill='white' fill-opacity='0'%3e%3c/use%3e%3cg clip-path='url(%23clipa5ipCW0hFw)'%3e%3cuse xlink:href='%23a28rcsTDH' opacity='1' fill-opacity='0' stroke='black' stroke-width='8' stroke-opacity='1'%3e%3c/use%3e%3c/g%3e%3c/g%3e%3c/g%3e%3c/svg%3e"

const optimizedSVGDataUri$6 =
  "data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 384 320'%3e%3cpath d='M353.4 128H30.6C13.7 128 0 142.3 0 160s13.7 32 30.6 32h322.8c16.9 0 30.6-14.3 30.6-32s-13.7-32-30.6-32zm0-128H30.6C13.7 0 0 14.3 0 32s13.7 32 30.6 32h322.8c16.9 0 30.6-14.3 30.6-32S370.3 0 353.4 0zm0 256H30.6C13.7 256 0 270.3 0 288s13.7 32 30.6 32h322.8c16.9 0 30.6-14.3 30.6-32s-13.7-32-30.6-32z'/%3e%3c/svg%3e"

const optimizedSVGDataUri$5 =
  "data:image/svg+xml,%3c%3fxml version='1.0' encoding='UTF-8' standalone='no'%3f%3e %3c!DOCTYPE svg PUBLIC '-//W3C//DTD SVG 1.1//EN' 'http://www.w3.org/Graphics/SVG/1.1/DTD/svg11.dtd'%3e %3csvg version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink' preserveAspectRatio='xMidYMid meet' viewBox='31.654362741230607 28.850229150738443 113.67896134435179 115.80278931174794' width='109.68' height='111.8'%3e%3cdefs%3e%3cpath d='M87.79 29.85L142.33 61.23L87.79 89.05L33.24 61.23L87.79 29.85Z' id='b6gn5Ph4a'%3e%3c/path%3e%3clinearGradient id='gradientc5ieAzTlrB' gradientUnits='userSpaceOnUse' x1='87.79' y1='88.11' x2='86.79' y2='15.31'%3e%3cstop style='stop-color: %238dbee6%3bstop-opacity: 1' offset='0%25'%3e%3c/stop%3e%3cstop style='stop-color: %233384c5%3bstop-opacity: 1' offset='100%25'%3e%3c/stop%3e%3c/linearGradient%3e%3cpath d='M87.79 141.63L33.24 115L33.24 61.17L87.79 88.83L87.79 141.63Z' id='bcpTLWFe1'%3e%3c/path%3e%3clinearGradient id='gradienta1vdPb9Tx' gradientUnits='userSpaceOnUse' x1='86.52' y1='89.05' x2='58.85' y2='125.96'%3e%3cstop style='stop-color: %237bb2de%3bstop-opacity: 1' offset='0%25'%3e%3c/stop%3e%3cstop style='stop-color: %233789cb%3bstop-opacity: 1' offset='100%25'%3e%3c/stop%3e%3c/linearGradient%3e%3cpath d='M142.33 115.48L142.31 61.17L87.77 88.26L87.8 141.65L142.33 115.48Z' id='doqFZ6o0V'%3e%3c/path%3e%3clinearGradient id='gradientb6QK8E71A' gradientUnits='userSpaceOnUse' x1='87.77' y1='89.05' x2='125.07' y2='123.31'%3e%3cstop style='stop-color: %237db2dd%3bstop-opacity: 1' offset='0%25'%3e%3c/stop%3e%3cstop style='stop-color: %233384c5%3bstop-opacity: 1' offset='100%25'%3e%3c/stop%3e%3c/linearGradient%3e%3cpath d='M87.2 58.24L141.75 89.62L87.2 117.43L32.65 89.62L87.2 58.24Z' id='dDpnVVPsa'%3e%3c/path%3e%3cpath d='M117.39 102.02L116.4 47.72L62.36 75.78L63.33 129.16L117.39 102.02Z' id='b2LmEtWKW7'%3e%3c/path%3e%3cpath d='M111.39 129L54.95 100.95L56.3 47.13L112.71 76.21L111.39 129Z' id='a2vWKwK9hV'%3e%3c/path%3e%3cpath d='M87.18 91.77L87.39 62.98L63.46 77.15L63.25 105.45L87.18 91.77Z' id='blEPHXHzV'%3e%3c/path%3e%3cpath d='M87.7 91.5L112.05 105.3L87.7 117.53L63.35 105.3L87.7 91.5Z' id='d10FgvNsKq'%3e%3c/path%3e%3cpath d='M53.45 81.07L63.41 91.93L63.21 105.2L53.84 95.8L53.45 81.07Z' id='b4fb7ce3g6'%3e%3c/path%3e%3cpath d='M54.34 78L63.46 82.93L63.26 92.41L54.68 88.36L54.34 78Z' id='b4t14UEF2B'%3e%3c/path%3e%3cpath d='M45.58 84.93L58.54 91.93L62.69 104.55L50.76 98.72L45.58 84.93Z' id='b7nuEYAotU'%3e%3c/path%3e%3cpath d='M117.88 95.3L117.38 101.98L112.01 104.88L112.16 98.78L117.88 95.3Z' id='cbfwgDbHI'%3e%3c/path%3e%3cpath d='M118.38 75.8L117.88 82.48L112.51 85.38L112.66 79.28L118.38 75.8Z' id='a7u7rrS51C'%3e%3c/path%3e%3cpath d='M118.08 83.3L117.58 89.98L112.21 92.88L112.36 86.78L118.08 83.3Z' id='b2cAudVEyd'%3e%3c/path%3e%3cpath d='M117.98 89.2L117.48 95.88L112.11 98.78L112.26 92.68L117.98 89.2Z' id='hMEdWtW14'%3e%3c/path%3e%3cpath d='M112.44 88.87L118.08 85.26L118.09 79.16L112.79 82.18L112.44 88.87Z' id='d6AqxDBdCj'%3e%3c/path%3e%3c/defs%3e%3cg%3e%3cg%3e%3cuse xlink:href='%23b6gn5Ph4a' opacity='0.4' fill='url(%23gradientc5ieAzTlrB)'%3e%3c/use%3e%3c/g%3e%3cg%3e%3cuse xlink:href='%23bcpTLWFe1' opacity='0.4' fill='url(%23gradienta1vdPb9Tx)'%3e%3c/use%3e%3cg%3e%3cuse xlink:href='%23bcpTLWFe1' opacity='0.4' fill-opacity='0' stroke='white' stroke-width='1' stroke-opacity='1'%3e%3c/use%3e%3c/g%3e%3c/g%3e%3cg%3e%3cuse xlink:href='%23doqFZ6o0V' opacity='0.4' fill='url(%23gradientb6QK8E71A)'%3e%3c/use%3e%3cg%3e%3cuse xlink:href='%23doqFZ6o0V' opacity='0.4' fill-opacity='0' stroke='white' stroke-width='1' stroke-opacity='1'%3e%3c/use%3e%3c/g%3e%3c/g%3e%3cg%3e%3cuse xlink:href='%23dDpnVVPsa' opacity='1' fill='%2359d87d' fill-opacity='1'%3e%3c/use%3e%3c/g%3e%3cg%3e%3cuse xlink:href='%23b2LmEtWKW7' opacity='1' fill='%23ffff72' fill-opacity='1'%3e%3c/use%3e%3c/g%3e%3cg%3e%3cuse xlink:href='%23a2vWKwK9hV' opacity='1' fill='%23ff7b7b' fill-opacity='1'%3e%3c/use%3e%3c/g%3e%3cg%3e%3cuse xlink:href='%23blEPHXHzV' opacity='1' fill='%23ffff72' fill-opacity='1'%3e%3c/use%3e%3c/g%3e%3cg%3e%3cuse xlink:href='%23d10FgvNsKq' opacity='1' fill='%2359d87d' fill-opacity='1'%3e%3c/use%3e%3c/g%3e%3cg%3e%3cuse xlink:href='%23b4fb7ce3g6' opacity='1' fill='%2359d87d' fill-opacity='1'%3e%3c/use%3e%3c/g%3e%3cg%3e%3cuse xlink:href='%23b4t14UEF2B' opacity='1' fill='%2359d87d' fill-opacity='1'%3e%3c/use%3e%3c/g%3e%3cg%3e%3cuse xlink:href='%23b7nuEYAotU' opacity='1' fill='%2359d87d' fill-opacity='1'%3e%3c/use%3e%3c/g%3e%3cg%3e%3cuse xlink:href='%23cbfwgDbHI' opacity='1' fill='%2359d87d' fill-opacity='1'%3e%3c/use%3e%3c/g%3e%3cg%3e%3cuse xlink:href='%23a7u7rrS51C' opacity='1' fill='%2359d87d' fill-opacity='1'%3e%3c/use%3e%3c/g%3e%3cg%3e%3cuse xlink:href='%23b2cAudVEyd' opacity='1' fill='%2359d87d' fill-opacity='1'%3e%3c/use%3e%3c/g%3e%3cg%3e%3cuse xlink:href='%23hMEdWtW14' opacity='1' fill='%2359d87d' fill-opacity='1'%3e%3c/use%3e%3c/g%3e%3cg%3e%3cuse xlink:href='%23d6AqxDBdCj' opacity='1' fill='%2359d87d' fill-opacity='1'%3e%3c/use%3e%3c/g%3e%3c/g%3e%3c/svg%3e"

const optimizedSVGDataUri$4 =
  "data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 1792 1152'%3e%3cpath d='M1664 576q-152-236-381-353 61 104 61 225 0 185-131.5 316.5T896 896 579.5 764.5 448 448q0-121 61-225-229 117-381 353 133 205 333.5 326.5T896 1024t434.5-121.5T1664 576zM944 192q0-20-14-34t-34-14q-125 0-214.5 89.5T592 448q0 20 14 34t34 14 34-14 14-34q0-86 61-147t147-61q20 0 34-14t14-34zm848 384q0 34-20 69-140 230-376.5 368.5T896 1152t-499.5-139T20 645Q0 610 0 576t20-69q140-229 376.5-368T896 0t499.5 139T1772 507q20 35 20 69z'/%3e%3c/svg%3e"

const optimizedSVGDataUri$3 =
  "data:image/svg+xml,%3c%3fxml version='1.0' encoding='UTF-8' standalone='no'%3f%3e %3c!DOCTYPE svg PUBLIC '-//W3C//DTD SVG 1.1//EN' 'http://www.w3.org/Graphics/SVG/1.1/DTD/svg11.dtd'%3e %3csvg version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink' preserveAspectRatio='xMidYMid meet' viewBox='17.242414994673346 15 113.09090909090907 115.80278931174797' width='109.09' height='111.8'%3e%3cdefs%3e%3cpath d='M72.79 16L127.33 47.38L72.79 75.19L18.24 47.38L72.79 16Z' id='ahuegR4Z7'%3e%3c/path%3e%3clinearGradient id='gradientg1v0yQ7cPQ' gradientUnits='userSpaceOnUse' x1='72.79' y1='74.26' x2='71.79' y2='1.46'%3e%3cstop style='stop-color: %238dbee6%3bstop-opacity: 1' offset='0%25'%3e%3c/stop%3e%3cstop style='stop-color: %233384c5%3bstop-opacity: 1' offset='100%25'%3e%3c/stop%3e%3c/linearGradient%3e%3cpath d='M72.79 127.78L18.24 101.15L18.24 47.32L72.79 74.98L72.79 127.78Z' id='apgu3VIlv'%3e%3c/path%3e%3clinearGradient id='gradientbx3q582Ag' gradientUnits='userSpaceOnUse' x1='71.52' y1='75.19' x2='43.85' y2='112.11'%3e%3cstop style='stop-color: %237bb2de%3bstop-opacity: 1' offset='0%25'%3e%3c/stop%3e%3cstop style='stop-color: %233789cb%3bstop-opacity: 1' offset='100%25'%3e%3c/stop%3e%3c/linearGradient%3e%3cpath d='M127.33 101.63L127.31 47.32L72.77 74.41L72.8 127.8L127.33 101.63Z' id='czTPGmX6c'%3e%3c/path%3e%3clinearGradient id='gradiente44kLH46ez' gradientUnits='userSpaceOnUse' x1='72.77' y1='75.19' x2='110.07' y2='109.46'%3e%3cstop style='stop-color: %237db2dd%3bstop-opacity: 1' offset='0%25'%3e%3c/stop%3e%3cstop style='stop-color: %233384c5%3bstop-opacity: 1' offset='100%25'%3e%3c/stop%3e%3c/linearGradient%3e%3c/defs%3e%3cg%3e%3cg%3e%3cuse xlink:href='%23ahuegR4Z7' opacity='0.7' fill='url(%23gradientg1v0yQ7cPQ)'%3e%3c/use%3e%3c/g%3e%3cg%3e%3cuse xlink:href='%23apgu3VIlv' opacity='0.7' fill='url(%23gradientbx3q582Ag)'%3e%3c/use%3e%3cg%3e%3cuse xlink:href='%23apgu3VIlv' opacity='0.7' fill-opacity='0' stroke='white' stroke-width='1' stroke-opacity='1'%3e%3c/use%3e%3c/g%3e%3c/g%3e%3cg%3e%3cuse xlink:href='%23czTPGmX6c' opacity='0.7' fill='url(%23gradiente44kLH46ez)'%3e%3c/use%3e%3cg%3e%3cuse xlink:href='%23czTPGmX6c' opacity='0.7' fill-opacity='0' stroke='white' stroke-width='1' stroke-opacity='1'%3e%3c/use%3e%3c/g%3e%3c/g%3e%3c/g%3e%3c/svg%3e"

const optimizedSVGDataUri$2 =
  "data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 2304 1000'%3e%3cpath d='M784 976l16-241-16-523q-1-10-7.5-17t-16.5-7q-9 0-16 7t-7 17l-14 523 14 241q1 10 7.5 16.5T760 999q22 0 24-23zm296-29l11-211-12-586q0-16-13-24-8-5-16-5t-16 5q-13 8-13 24l-1 6-10 579q0 1 11 236v1q0 10 6 17 9 11 23 11 11 0 20-9 9-7 9-20zM35 607l20 128-20 126q-2 9-9 9t-9-9L0 735l17-128q2-9 9-9t9 9zm86-79l26 207-26 203q-2 9-10 9-9 0-9-10L79 735l23-207q0-9 9-9 8 0 10 9zm280 453zM213 490l25 245-25 237q0 11-11 11-10 0-12-11l-21-237 21-245q2-12 12-12 11 0 11 12zm94-7l23 252-23 244q-2 13-14 13-13 0-13-13l-21-244 21-252q0-13 13-13 12 0 14 13zm94 18l21 234-21 246q-2 16-16 16-6 0-10.5-4.5T370 981l-20-246 20-234q0-6 4.5-10.5T385 486q14 0 16 15zm383 475zM495 355l21 380-21 246q0 7-5 12.5t-12 5.5q-16 0-18-18l-18-246 18-380q2-18 18-18 7 0 12 5.5t5 12.5zm94-86l19 468-19 244q0 8-5.5 13.5T570 1000q-18 0-20-19l-16-244 16-468q2-19 20-19 8 0 13.5 5.5T589 269zm98-40l18 506-18 242q-2 21-22 21-19 0-21-21l-16-242 16-506q0-9 6.5-15.5T665 207q9 0 15 6.5t7 15.5zm392 742zM881 225l15 510-15 239q0 10-7.5 17.5T856 999t-17-7-8-18l-14-239 14-510q0-11 7.5-18t17.5-7 17.5 7 7.5 18zm99 19l14 492-14 236q0 11-8 19t-19 8-19-8-9-19l-12-236 12-492q1-12 9-20t19-8 18.5 8 8.5 20zm212 492l-14 231q0 13-9 22t-22 9-22-9-10-22l-6-114-6-117 12-636v-3q2-15 12-24 9-7 20-7 8 0 15 5 14 8 16 26zm1112-19q0 117-83 199.5T2021 999h-786q-13-2-22-11t-9-22V67q0-23 28-33 85-34 181-34 195 0 338 131.5T1911 455q53-22 110-22 117 0 200 83t83 201z'/%3e%3c/svg%3e"

const optimizedSVGDataUri$1 =
  "data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' width='256' height='256' viewBox='0 0 256 256'%3e%3cpath fill='currentColor' d='M128 24a104 104 0 1 0 104 104A104.1 104.1 0 0 0 128 24ZM40 128a88 88 0 0 1 150.2-62.2L65.8 190.2A87.7 87.7 0 0 1 40 128Z'/%3e%3c/svg%3e"

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
    .concat(optimizedSVGDataUri$9, '" alt="screenshot" /></label>')
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

function getDefaultExportFromCjs(x) {
  return x && x.__esModule && Object.prototype.hasOwnProperty.call(x, 'default')
    ? x['default']
    : x
}

function getAugmentedNamespace(n) {
  if (n.__esModule) return n
  var a = Object.defineProperty({}, '__esModule', { value: true })
  Object.keys(n).forEach(function(k) {
    var d = Object.getOwnPropertyDescriptor(n, k)
    Object.defineProperty(
      a,
      k,
      d.get
        ? d
        : {
            enumerable: true,
            get: function() {
              return n[k]
            },
          }
    )
  })
  return a
}

var toConsumableArray$1 = { exports: {} }

var arrayWithoutHoles$1 = { exports: {} }

var arrayLikeToArray$1 = { exports: {} }

;(function(module) {
  function _arrayLikeToArray(arr, len) {
    if (len == null || len > arr.length) len = arr.length

    for (var i = 0, arr2 = new Array(len); i < len; i++) {
      arr2[i] = arr[i]
    }

    return arr2
  }

  ;(module.exports = _arrayLikeToArray),
    (module.exports.__esModule = true),
    (module.exports['default'] = module.exports)
})(arrayLikeToArray$1)

;(function(module) {
  var arrayLikeToArray = arrayLikeToArray$1.exports

  function _arrayWithoutHoles(arr) {
    if (Array.isArray(arr)) return arrayLikeToArray(arr)
  }

  ;(module.exports = _arrayWithoutHoles),
    (module.exports.__esModule = true),
    (module.exports['default'] = module.exports)
})(arrayWithoutHoles$1)

var iterableToArray$1 = { exports: {} }

;(function(module) {
  function _iterableToArray(iter) {
    if (
      (typeof Symbol !== 'undefined' && iter[Symbol.iterator] != null) ||
      iter['@@iterator'] != null
    )
      return Array.from(iter)
  }

  ;(module.exports = _iterableToArray),
    (module.exports.__esModule = true),
    (module.exports['default'] = module.exports)
})(iterableToArray$1)

var unsupportedIterableToArray$1 = { exports: {} }

;(function(module) {
  var arrayLikeToArray = arrayLikeToArray$1.exports

  function _unsupportedIterableToArray(o, minLen) {
    if (!o) return
    if (typeof o === 'string') return arrayLikeToArray(o, minLen)
    var n = Object.prototype.toString.call(o).slice(8, -1)
    if (n === 'Object' && o.constructor) n = o.constructor.name
    if (n === 'Map' || n === 'Set') return Array.from(o)
    if (n === 'Arguments' || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n))
      return arrayLikeToArray(o, minLen)
  }

  ;(module.exports = _unsupportedIterableToArray),
    (module.exports.__esModule = true),
    (module.exports['default'] = module.exports)
})(unsupportedIterableToArray$1)

var nonIterableSpread$1 = { exports: {} }

;(function(module) {
  function _nonIterableSpread() {
    throw new TypeError(
      'Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.'
    )
  }

  ;(module.exports = _nonIterableSpread),
    (module.exports.__esModule = true),
    (module.exports['default'] = module.exports)
})(nonIterableSpread$1)

;(function(module) {
  var arrayWithoutHoles = arrayWithoutHoles$1.exports

  var iterableToArray = iterableToArray$1.exports

  var unsupportedIterableToArray = unsupportedIterableToArray$1.exports

  var nonIterableSpread = nonIterableSpread$1.exports

  function _toConsumableArray(arr) {
    return (
      arrayWithoutHoles(arr) ||
      iterableToArray(arr) ||
      unsupportedIterableToArray(arr) ||
      nonIterableSpread()
    )
  }

  ;(module.exports = _toConsumableArray),
    (module.exports.__esModule = true),
    (module.exports['default'] = module.exports)
})(toConsumableArray$1)

var _toConsumableArray = /*@__PURE__*/ getDefaultExportFromCjs(
  toConsumableArray$1.exports
)

var fullscreenMethods = []
window.addEventListener('load', function() {
  var body = document.querySelector('body')
  // https://developer.mozilla.org/en-US/docs/Web/API/Fullscreen_API
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
      .concat(optimizedSVGDataUri$r, '" alt="fullscreen"/></label>')
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
    .concat(optimizedSVGDataUri$c, '" alt="rotate"/></label>')
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
    .concat(optimizedSVGDataUri$x, '" alt="annotations"/></label>')
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
    .concat(optimizedSVGDataUri$w, '" alt="axes"/></label>')
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
    .concat(optimizedSVGDataUri$5, '" alt="view planes" /></label>')
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

var slicedToArray$1 = { exports: {} }

var arrayWithHoles$1 = { exports: {} }

;(function(module) {
  function _arrayWithHoles(arr) {
    if (Array.isArray(arr)) return arr
  }

  ;(module.exports = _arrayWithHoles),
    (module.exports.__esModule = true),
    (module.exports['default'] = module.exports)
})(arrayWithHoles$1)

var iterableToArrayLimit$1 = { exports: {} }

;(function(module) {
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

  ;(module.exports = _iterableToArrayLimit),
    (module.exports.__esModule = true),
    (module.exports['default'] = module.exports)
})(iterableToArrayLimit$1)

var unsupportedIterableToArray = { exports: {} }

var arrayLikeToArray = { exports: {} }

;(function(module) {
  function _arrayLikeToArray(arr, len) {
    if (len == null || len > arr.length) len = arr.length

    for (var i = 0, arr2 = new Array(len); i < len; i++) {
      arr2[i] = arr[i]
    }

    return arr2
  }

  ;(module.exports = _arrayLikeToArray),
    (module.exports.__esModule = true),
    (module.exports['default'] = module.exports)
})(arrayLikeToArray)

;(function(module) {
  var arrayLikeToArray$1 = arrayLikeToArray.exports

  function _unsupportedIterableToArray(o, minLen) {
    if (!o) return
    if (typeof o === 'string') return arrayLikeToArray$1(o, minLen)
    var n = Object.prototype.toString.call(o).slice(8, -1)
    if (n === 'Object' && o.constructor) n = o.constructor.name
    if (n === 'Map' || n === 'Set') return Array.from(o)
    if (n === 'Arguments' || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n))
      return arrayLikeToArray$1(o, minLen)
  }

  ;(module.exports = _unsupportedIterableToArray),
    (module.exports.__esModule = true),
    (module.exports['default'] = module.exports)
})(unsupportedIterableToArray)

var nonIterableRest$1 = { exports: {} }

;(function(module) {
  function _nonIterableRest() {
    throw new TypeError(
      'Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.'
    )
  }

  ;(module.exports = _nonIterableRest),
    (module.exports.__esModule = true),
    (module.exports['default'] = module.exports)
})(nonIterableRest$1)

;(function(module) {
  var arrayWithHoles = arrayWithHoles$1.exports

  var iterableToArrayLimit = iterableToArrayLimit$1.exports

  var unsupportedIterableToArray$1 = unsupportedIterableToArray.exports

  var nonIterableRest = nonIterableRest$1.exports

  function _slicedToArray(arr, i) {
    return (
      arrayWithHoles(arr) ||
      iterableToArrayLimit(arr, i) ||
      unsupportedIterableToArray$1(arr, i) ||
      nonIterableRest()
    )
  }

  ;(module.exports = _slicedToArray),
    (module.exports.__esModule = true),
    (module.exports['default'] = module.exports)
})(slicedToArray$1)

var _typeof = { exports: {} }

;(function(module) {
  function _typeof(obj) {
    '@babel/helpers - typeof'

    return (
      ((module.exports = _typeof =
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
      (module.exports.__esModule = true),
      (module.exports['default'] = module.exports)),
      _typeof(obj)
    )
  }

  ;(module.exports = _typeof),
    (module.exports.__esModule = true),
    (module.exports['default'] = module.exports)
})(_typeof)

var defineProperty$2 = { exports: {} }

;(function(module) {
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

  ;(module.exports = _defineProperty),
    (module.exports.__esModule = true),
    (module.exports['default'] = module.exports)
})(defineProperty$2)

var toConsumableArray = { exports: {} }

var arrayWithoutHoles = { exports: {} }

;(function(module) {
  var arrayLikeToArray$1 = arrayLikeToArray.exports

  function _arrayWithoutHoles(arr) {
    if (Array.isArray(arr)) return arrayLikeToArray$1(arr)
  }

  ;(module.exports = _arrayWithoutHoles),
    (module.exports.__esModule = true),
    (module.exports['default'] = module.exports)
})(arrayWithoutHoles)

var iterableToArray = { exports: {} }

;(function(module) {
  function _iterableToArray(iter) {
    if (
      (typeof Symbol !== 'undefined' && iter[Symbol.iterator] != null) ||
      iter['@@iterator'] != null
    )
      return Array.from(iter)
  }

  ;(module.exports = _iterableToArray),
    (module.exports.__esModule = true),
    (module.exports['default'] = module.exports)
})(iterableToArray)

var nonIterableSpread = { exports: {} }

;(function(module) {
  function _nonIterableSpread() {
    throw new TypeError(
      'Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.'
    )
  }

  ;(module.exports = _nonIterableSpread),
    (module.exports.__esModule = true),
    (module.exports['default'] = module.exports)
})(nonIterableSpread)

;(function(module) {
  var arrayWithoutHoles$1 = arrayWithoutHoles.exports

  var iterableToArray$1 = iterableToArray.exports

  var unsupportedIterableToArray$1 = unsupportedIterableToArray.exports

  var nonIterableSpread$1 = nonIterableSpread.exports

  function _toConsumableArray(arr) {
    return (
      arrayWithoutHoles$1(arr) ||
      iterableToArray$1(arr) ||
      unsupportedIterableToArray$1(arr) ||
      nonIterableSpread$1()
    )
  }

  ;(module.exports = _toConsumableArray),
    (module.exports.__esModule = true),
    (module.exports['default'] = module.exports)
})(toConsumableArray)

var construct = { exports: {} }

var setPrototypeOf = { exports: {} }

;(function(module) {
  function _setPrototypeOf(o, p) {
    ;(module.exports = _setPrototypeOf =
      Object.setPrototypeOf ||
      function _setPrototypeOf(o, p) {
        o.__proto__ = p
        return o
      }),
      (module.exports.__esModule = true),
      (module.exports['default'] = module.exports)
    return _setPrototypeOf(o, p)
  }

  ;(module.exports = _setPrototypeOf),
    (module.exports.__esModule = true),
    (module.exports['default'] = module.exports)
})(setPrototypeOf)

var isNativeReflectConstruct = { exports: {} }

;(function(module) {
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

  ;(module.exports = _isNativeReflectConstruct),
    (module.exports.__esModule = true),
    (module.exports['default'] = module.exports)
})(isNativeReflectConstruct)

;(function(module) {
  var setPrototypeOf$1 = setPrototypeOf.exports

  var isNativeReflectConstruct$1 = isNativeReflectConstruct.exports

  function _construct(Parent, args, Class) {
    if (isNativeReflectConstruct$1()) {
      ;(module.exports = _construct = Reflect.construct),
        (module.exports.__esModule = true),
        (module.exports['default'] = module.exports)
    } else {
      ;(module.exports = _construct = function _construct(Parent, args, Class) {
        var a = [null]
        a.push.apply(a, args)
        var Constructor = Function.bind.apply(Parent, a)
        var instance = new Constructor()
        if (Class) setPrototypeOf$1(instance, Class.prototype)
        return instance
      }),
        (module.exports.__esModule = true),
        (module.exports['default'] = module.exports)
    }

    return _construct.apply(null, arguments)
  }

  ;(module.exports = _construct),
    (module.exports.__esModule = true),
    (module.exports['default'] = module.exports)
})(construct)

var toStr$2 = Object.prototype.toString

var isArguments = function isArguments(value) {
  var str = toStr$2.call(value)
  var isArgs = str === '[object Arguments]'
  if (!isArgs) {
    isArgs =
      str !== '[object Array]' &&
      value !== null &&
      typeof value === 'object' &&
      typeof value.length === 'number' &&
      value.length >= 0 &&
      toStr$2.call(value.callee) === '[object Function]'
  }
  return isArgs
}

var keysShim$1
if (!Object.keys) {
  // modified from https://github.com/es-shims/es5-shim
  var has = Object.prototype.hasOwnProperty
  var toStr$1 = Object.prototype.toString
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
    var isFunction = toStr$1.call(object) === '[object Function]'
    var isArguments = isArgs$1(object)
    var isString = isObject && toStr$1.call(object) === '[object String]'
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
var implementation$3 = keysShim$1

var slice = Array.prototype.slice
var isArgs = isArguments

var origKeys = Object.keys
var keysShim = origKeys
  ? function keys(o) {
      return origKeys(o)
    }
  : implementation$3

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
          return originalKeys(slice.call(object))
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

var keys = objectKeys
var hasSymbols =
  typeof Symbol === 'function' && typeof Symbol('foo') === 'symbol'

var toStr = Object.prototype.toString
var concat = Array.prototype.concat
var origDefineProperty = Object.defineProperty

var isFunction = function(fn) {
  return typeof fn === 'function' && toStr.call(fn) === '[object Function]'
}

var arePropertyDescriptorsSupported = function() {
  var obj = {}
  try {
    origDefineProperty(obj, 'x', { enumerable: false, value: obj })
    // eslint-disable-next-line no-unused-vars, no-restricted-syntax
    for (var _ in obj) {
      // jscs:ignore disallowUnusedVariables
      return false
    }
    return obj.x === obj
  } catch (e) {
    /* this is IE 8. */
    return false
  }
}
var supportsDescriptors =
  origDefineProperty && arePropertyDescriptorsSupported()

var defineProperty$1 = function(object, name, value, predicate) {
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
    object[name] = value
  }
}

var defineProperties$1 = function(object, map) {
  var predicates = arguments.length > 2 ? arguments[2] : {}
  var props = keys(map)
  if (hasSymbols) {
    props = concat.call(props, Object.getOwnPropertySymbols(map))
  }
  for (var i = 0; i < props.length; i += 1) {
    defineProperty$1(object, props[i], map[props[i]], predicates[props[i]])
  }
}

defineProperties$1.supportsDescriptors = !!supportsDescriptors

var defineProperties_1 = defineProperties$1

var implementation$2 = commonjsGlobal

var implementation$1 = implementation$2

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

var implementation = implementation$2
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

var vtkGlobal = globalthis() // returns native globalThis if compliant

var classCallCheck = { exports: {} }

;(function(module) {
  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError('Cannot call a class as a function')
    }
  }

  ;(module.exports = _classCallCheck),
    (module.exports.__esModule = true),
    (module.exports['default'] = module.exports)
})(classCallCheck)

var createClass = { exports: {} }

;(function(module) {
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

  ;(module.exports = _createClass),
    (module.exports.__esModule = true),
    (module.exports['default'] = module.exports)
})(createClass)

var get = { exports: {} }

var superPropBase = { exports: {} }

var getPrototypeOf = { exports: {} }

;(function(module) {
  function _getPrototypeOf(o) {
    ;(module.exports = _getPrototypeOf = Object.setPrototypeOf
      ? Object.getPrototypeOf
      : function _getPrototypeOf(o) {
          return o.__proto__ || Object.getPrototypeOf(o)
        }),
      (module.exports.__esModule = true),
      (module.exports['default'] = module.exports)
    return _getPrototypeOf(o)
  }

  ;(module.exports = _getPrototypeOf),
    (module.exports.__esModule = true),
    (module.exports['default'] = module.exports)
})(getPrototypeOf)

;(function(module) {
  var getPrototypeOf$1 = getPrototypeOf.exports

  function _superPropBase(object, property) {
    while (!Object.prototype.hasOwnProperty.call(object, property)) {
      object = getPrototypeOf$1(object)
      if (object === null) break
    }

    return object
  }

  ;(module.exports = _superPropBase),
    (module.exports.__esModule = true),
    (module.exports['default'] = module.exports)
})(superPropBase)

;(function(module) {
  var superPropBase$1 = superPropBase.exports

  function _get() {
    if (typeof Reflect !== 'undefined' && Reflect.get) {
      ;(module.exports = _get = Reflect.get),
        (module.exports.__esModule = true),
        (module.exports['default'] = module.exports)
    } else {
      ;(module.exports = _get = function _get(target, property, receiver) {
        var base = superPropBase$1(target, property)
        if (!base) return
        var desc = Object.getOwnPropertyDescriptor(base, property)

        if (desc.get) {
          return desc.get.call(arguments.length < 3 ? target : receiver)
        }

        return desc.value
      }),
        (module.exports.__esModule = true),
        (module.exports['default'] = module.exports)
    }

    return _get.apply(this, arguments)
  }

  ;(module.exports = _get),
    (module.exports.__esModule = true),
    (module.exports['default'] = module.exports)
})(get)

var inherits = { exports: {} }

;(function(module) {
  var setPrototypeOf$1 = setPrototypeOf.exports

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
    if (superClass) setPrototypeOf$1(subClass, superClass)
  }

  ;(module.exports = _inherits),
    (module.exports.__esModule = true),
    (module.exports['default'] = module.exports)
})(inherits)

var possibleConstructorReturn = { exports: {} }

var assertThisInitialized = { exports: {} }

;(function(module) {
  function _assertThisInitialized(self) {
    if (self === void 0) {
      throw new ReferenceError(
        "this hasn't been initialised - super() hasn't been called"
      )
    }

    return self
  }

  ;(module.exports = _assertThisInitialized),
    (module.exports.__esModule = true),
    (module.exports['default'] = module.exports)
})(assertThisInitialized)

;(function(module) {
  var _typeof$1 = _typeof.exports['default']

  var assertThisInitialized$1 = assertThisInitialized.exports

  function _possibleConstructorReturn(self, call) {
    if (call && (_typeof$1(call) === 'object' || typeof call === 'function')) {
      return call
    } else if (call !== void 0) {
      throw new TypeError(
        'Derived constructors may only return object or undefined'
      )
    }

    return assertThisInitialized$1(self)
  }

  ;(module.exports = _possibleConstructorReturn),
    (module.exports.__esModule = true),
    (module.exports['default'] = module.exports)
})(possibleConstructorReturn)

var wrapNativeSuper = { exports: {} }

var isNativeFunction = { exports: {} }

;(function(module) {
  function _isNativeFunction(fn) {
    return Function.toString.call(fn).indexOf('[native code]') !== -1
  }

  ;(module.exports = _isNativeFunction),
    (module.exports.__esModule = true),
    (module.exports['default'] = module.exports)
})(isNativeFunction)

;(function(module) {
  var getPrototypeOf$1 = getPrototypeOf.exports

  var setPrototypeOf$1 = setPrototypeOf.exports

  var isNativeFunction$1 = isNativeFunction.exports

  var construct$1 = construct.exports

  function _wrapNativeSuper(Class) {
    var _cache = typeof Map === 'function' ? new Map() : undefined

    ;(module.exports = _wrapNativeSuper = function _wrapNativeSuper(Class) {
      if (Class === null || !isNativeFunction$1(Class)) return Class

      if (typeof Class !== 'function') {
        throw new TypeError(
          'Super expression must either be null or a function'
        )
      }

      if (typeof _cache !== 'undefined') {
        if (_cache.has(Class)) return _cache.get(Class)

        _cache.set(Class, Wrapper)
      }

      function Wrapper() {
        return construct$1(Class, arguments, getPrototypeOf$1(this).constructor)
      }

      Wrapper.prototype = Object.create(Class.prototype, {
        constructor: {
          value: Wrapper,
          enumerable: false,
          writable: true,
          configurable: true,
        },
      })
      return setPrototypeOf$1(Wrapper, Class)
    }),
      (module.exports.__esModule = true),
      (module.exports['default'] = module.exports)
    return _wrapNativeSuper(Class)
  }

  ;(module.exports = _wrapNativeSuper),
    (module.exports.__esModule = true),
    (module.exports['default'] = module.exports)
})(wrapNativeSuper)

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
;({
  debug: noOp,
  // Don't print debug by default
  error: vtkGlobal.console.error || noOp,
  info: vtkGlobal.console.info || noOp,
  log: vtkGlobal.console.log || noOp,
  warn: vtkGlobal.console.warn || noOp,
})
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
TYPED_ARRAYS.Uint8ClampedArray = Uint8ClampedArray

try {
  TYPED_ARRAYS.BigInt64Array = BigInt64Array
  TYPED_ARRAYS.BigUint64Array = BigUint64Array
} catch (_unused) {
  // ignore
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
    .concat(optimizedSVGDataUri$4, '" alt="visible" /></label>')
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
    .concat(optimizedSVGDataUri$m, '" alt="invisible" /></label>')
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
    .concat(optimizedSVGDataUri$i, '" alt="pause" /></label>')
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
    .concat(optimizedSVGDataUri$h, '" alt="play"/></label>')
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
    .concat(optimizedSVGDataUri$4, '" alt="visible"/></label>')
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
    .concat(optimizedSVGDataUri$m, '" alt="invisible" /></label>')
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
    .concat(optimizedSVGDataUri$i, '" alt="pause" /></label>')
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
    .concat(optimizedSVGDataUri$h, '" alt="play"/></label>')
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
    .concat(optimizedSVGDataUri$4, '" alt="visible" /></label>')
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
    .concat(optimizedSVGDataUri$m, '" alt="invisible" /></label>')
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
    .concat(optimizedSVGDataUri$i, '" alt="pause" /></label>')
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
    .concat(optimizedSVGDataUri$h, '" alt="play" /></label>')
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
      '" checked><label itk-vtk-tooltip itk-vtk-tooltip-left itk-vtk-tooltip-content="Toggle Background Color" class="'
    )
    .concat(style.bgColorButton, ' ')
    .concat(style.toggleButton, '" for="')
    .concat(viewerDOMId, '-bgColorButton"><img src="')
    .concat(optimizedSVGDataUri$8, '" alt="select color" /></label>')
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
    .concat(optimizedSVGDataUri$t, '" alt="crop"/></label>')
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
    .concat(optimizedSVGDataUri$e, '" alt="reset crop"/></label>')
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
    .concat(optimizedSVGDataUri$g, '" alt="x plane"/></label>')
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
    .concat(optimizedSVGDataUri$p, '" alt="z plane" /></label>')
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
    .concat(optimizedSVGDataUri$3, '" alt="volume" /></label>')
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
      '" checked><label itk-vtk-tooltip itk-vtk-tooltip-left itk-vtk-tooltip-content="Reset camera [r]" class="'
    )
    .concat(style.resetCameraButton, ' ')
    .concat(style.toggleButton, '" for="')
    .concat(viewerDOMId, '-resetCameraButton"><img src="')
    .concat(optimizedSVGDataUri$f, '" alt="reset camera" /></label>')
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
  fullscreenButtonInput.checked = fullscreenEnabled

  // Triggered by operating system events, e.g. pressing Esc while in
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

var makeHtml = function makeHtml(htmlString) {
  var template = document.createElement('template')
  template.innerHTML = htmlString
  return template.content.firstElementChild
}

function createLayersInterface(context) {
  var layersUIGroup = makeHtml(
    '\n    <div class="'
      .concat(style.uiGroup, ' ')
      .concat(style.uiRow, ' ')
      .concat(style.layers, '"></div>\n  ')
  )
  context.layers.layersUIGroup = layersUIGroup
  context.uiGroups.set('layers', layersUIGroup)
  context.uiContainer.appendChild(layersUIGroup)

  // layer name -> layerEntry map
  context.layers.uiLayers = new Map()
  var compareContainer = document.createElement('div')
  compareContainer.setAttribute('class', style.uiGroup)
  context.uiContainer.appendChild(compareContainer)
  context.layers.compareContainer = compareContainer
}

/******************************************************************************
Copyright (c) Microsoft Corporation.

Permission to use, copy, modify, and/or distribute this software for any
purpose with or without fee is hereby granted.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
PERFORMANCE OF THIS SOFTWARE.
***************************************************************************** */

function __decorate(decorators, target, key, desc) {
  var c = arguments.length,
    r =
      c < 3
        ? target
        : desc === null
        ? (desc = Object.getOwnPropertyDescriptor(target, key))
        : desc,
    d
  if (typeof Reflect === 'object' && typeof Reflect.decorate === 'function')
    r = Reflect.decorate(decorators, target, key, desc)
  else
    for (var i = decorators.length - 1; i >= 0; i--)
      if ((d = decorators[i]))
        r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r
  return c > 3 && r && Object.defineProperty(target, key, r), r
}

/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const t$9 = t => (e, o) => {
  void 0 !== o
    ? o.addInitializer(() => {
        customElements.define(t, e)
      })
    : customElements.define(t, e)
}

/**
 * @license
 * Copyright 2019 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const t$8 = globalThis,
  e$j =
    t$8.ShadowRoot &&
    (void 0 === t$8.ShadyCSS || t$8.ShadyCSS.nativeShadow) &&
    'adoptedStyleSheets' in Document.prototype &&
    'replace' in CSSStyleSheet.prototype,
  s$b = Symbol(),
  o$f = new WeakMap()
class n$d {
  constructor(t, e, o) {
    if (((this._$cssResult$ = !0), o !== s$b))
      throw Error(
        'CSSResult is not constructable. Use `unsafeCSS` or `css` instead.'
      )
    ;(this.cssText = t), (this.t = e)
  }
  get styleSheet() {
    let t = this.o
    const s = this.t
    if (e$j && void 0 === t) {
      const e = void 0 !== s && 1 === s.length
      e && (t = o$f.get(s)),
        void 0 === t &&
          ((this.o = t = new CSSStyleSheet()).replaceSync(this.cssText),
          e && o$f.set(s, t))
    }
    return t
  }
  toString() {
    return this.cssText
  }
}
const r$b = t => new n$d('string' == typeof t ? t : t + '', void 0, s$b),
  i$8 = (t, ...e) => {
    const o =
      1 === t.length
        ? t[0]
        : e.reduce(
            (e, s, o) =>
              e +
              (t => {
                if (!0 === t._$cssResult$) return t.cssText
                if ('number' == typeof t) return t
                throw Error(
                  "Value passed to 'css' function must be a 'css' function result: " +
                    t +
                    ". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security."
                )
              })(s) +
              t[o + 1],
            t[0]
          )
    return new n$d(o, t, s$b)
  },
  S$3 = (s, o) => {
    if (e$j)
      s.adoptedStyleSheets = o.map(t =>
        t instanceof CSSStyleSheet ? t : t.styleSheet
      )
    else
      for (const e of o) {
        const o = document.createElement('style'),
          n = t$8.litNonce
        void 0 !== n && o.setAttribute('nonce', n),
          (o.textContent = e.cssText),
          s.appendChild(o)
      }
  },
  c$5 = e$j
    ? t => t
    : t =>
        t instanceof CSSStyleSheet
          ? (t => {
              let e = ''
              for (const s of t.cssRules) e += s.cssText
              return r$b(e)
            })(t)
          : t

/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */ const {
    is: i$7,
    defineProperty: e$i,
    getOwnPropertyDescriptor: r$a,
    getOwnPropertyNames: h$5,
    getOwnPropertySymbols: o$e,
    getPrototypeOf: n$c,
  } = Object,
  a$5 = globalThis,
  c$4 = a$5.trustedTypes,
  l$6 = c$4 ? c$4.emptyScript : '',
  p$2 = a$5.reactiveElementPolyfillSupport,
  d$3 = (t, s) => t,
  u$2 = {
    toAttribute(t, s) {
      switch (s) {
        case Boolean:
          t = t ? l$6 : null
          break
        case Object:
        case Array:
          t = null == t ? t : JSON.stringify(t)
      }
      return t
    },
    fromAttribute(t, s) {
      let i = t
      switch (s) {
        case Boolean:
          i = null !== t
          break
        case Number:
          i = null === t ? null : Number(t)
          break
        case Object:
        case Array:
          try {
            i = JSON.parse(t)
          } catch (t) {
            i = null
          }
      }
      return i
    },
  },
  f$2 = (t, s) => !i$7(t, s),
  y$2 = {
    attribute: !0,
    type: String,
    converter: u$2,
    reflect: !1,
    hasChanged: f$2,
  }
;(Symbol.metadata ??= Symbol('metadata')),
  (a$5.litPropertyMetadata ??= new WeakMap())
class b$1 extends HTMLElement {
  static addInitializer(t) {
    this._$Ei(), (this.l ??= []).push(t)
  }
  static get observedAttributes() {
    return this.finalize(), this._$Eh && [...this._$Eh.keys()]
  }
  static createProperty(t, s = y$2) {
    if (
      (s.state && (s.attribute = !1),
      this._$Ei(),
      this.elementProperties.set(t, s),
      !s.noAccessor)
    ) {
      const i = Symbol(),
        r = this.getPropertyDescriptor(t, i, s)
      void 0 !== r && e$i(this.prototype, t, r)
    }
  }
  static getPropertyDescriptor(t, s, i) {
    const { get: e, set: h } = r$a(this.prototype, t) ?? {
      get() {
        return this[s]
      },
      set(t) {
        this[s] = t
      },
    }
    return {
      get() {
        return e?.call(this)
      },
      set(s) {
        const r = e?.call(this)
        h.call(this, s), this.requestUpdate(t, r, i)
      },
      configurable: !0,
      enumerable: !0,
    }
  }
  static getPropertyOptions(t) {
    return this.elementProperties.get(t) ?? y$2
  }
  static _$Ei() {
    if (this.hasOwnProperty(d$3('elementProperties'))) return
    const t = n$c(this)
    t.finalize(),
      void 0 !== t.l && (this.l = [...t.l]),
      (this.elementProperties = new Map(t.elementProperties))
  }
  static finalize() {
    if (this.hasOwnProperty(d$3('finalized'))) return
    if (
      ((this.finalized = !0),
      this._$Ei(),
      this.hasOwnProperty(d$3('properties')))
    ) {
      const t = this.properties,
        s = [...h$5(t), ...o$e(t)]
      for (const i of s) this.createProperty(i, t[i])
    }
    const t = this[Symbol.metadata]
    if (null !== t) {
      const s = litPropertyMetadata.get(t)
      if (void 0 !== s) for (const [t, i] of s) this.elementProperties.set(t, i)
    }
    this._$Eh = new Map()
    for (const [t, s] of this.elementProperties) {
      const i = this._$Eu(t, s)
      void 0 !== i && this._$Eh.set(i, t)
    }
    this.elementStyles = this.finalizeStyles(this.styles)
  }
  static finalizeStyles(s) {
    const i = []
    if (Array.isArray(s)) {
      const e = new Set(s.flat(1 / 0).reverse())
      for (const s of e) i.unshift(c$5(s))
    } else void 0 !== s && i.push(c$5(s))
    return i
  }
  static _$Eu(t, s) {
    const i = s.attribute
    return !1 === i
      ? void 0
      : 'string' == typeof i
      ? i
      : 'string' == typeof t
      ? t.toLowerCase()
      : void 0
  }
  constructor() {
    super(),
      (this._$Ep = void 0),
      (this.isUpdatePending = !1),
      (this.hasUpdated = !1),
      (this._$Em = null),
      this._$Ev()
  }
  _$Ev() {
    ;(this._$Eg = new Promise(t => (this.enableUpdating = t))),
      (this._$AL = new Map()),
      this._$ES(),
      this.requestUpdate(),
      this.constructor.l?.forEach(t => t(this))
  }
  addController(t) {
    ;(this._$E_ ??= new Set()).add(t),
      void 0 !== this.renderRoot && this.isConnected && t.hostConnected?.()
  }
  removeController(t) {
    this._$E_?.delete(t)
  }
  _$ES() {
    const t = new Map(),
      s = this.constructor.elementProperties
    for (const i of s.keys())
      this.hasOwnProperty(i) && (t.set(i, this[i]), delete this[i])
    t.size > 0 && (this._$Ep = t)
  }
  createRenderRoot() {
    const t =
      this.shadowRoot ?? this.attachShadow(this.constructor.shadowRootOptions)
    return S$3(t, this.constructor.elementStyles), t
  }
  connectedCallback() {
    ;(this.renderRoot ??= this.createRenderRoot()),
      this.enableUpdating(!0),
      this._$E_?.forEach(t => t.hostConnected?.())
  }
  enableUpdating(t) {}
  disconnectedCallback() {
    this._$E_?.forEach(t => t.hostDisconnected?.())
  }
  attributeChangedCallback(t, s, i) {
    this._$AK(t, i)
  }
  _$EO(t, s) {
    const i = this.constructor.elementProperties.get(t),
      e = this.constructor._$Eu(t, i)
    if (void 0 !== e && !0 === i.reflect) {
      const r = (void 0 !== i.converter?.toAttribute
        ? i.converter
        : u$2
      ).toAttribute(s, i.type)
      ;(this._$Em = t),
        null == r ? this.removeAttribute(e) : this.setAttribute(e, r),
        (this._$Em = null)
    }
  }
  _$AK(t, s) {
    const i = this.constructor,
      e = i._$Eh.get(t)
    if (void 0 !== e && this._$Em !== e) {
      const t = i.getPropertyOptions(e),
        r =
          'function' == typeof t.converter
            ? { fromAttribute: t.converter }
            : void 0 !== t.converter?.fromAttribute
            ? t.converter
            : u$2
      ;(this._$Em = e),
        (this[e] = r.fromAttribute(s, t.type)),
        (this._$Em = null)
    }
  }
  requestUpdate(t, s, i, e = !1, r) {
    if (void 0 !== t) {
      if (
        ((i ??= this.constructor.getPropertyOptions(t)),
        !(i.hasChanged ?? f$2)(e ? r : this[t], s))
      )
        return
      this.C(t, s, i)
    }
    !1 === this.isUpdatePending && (this._$Eg = this._$EP())
  }
  C(t, s, i) {
    this._$AL.has(t) || this._$AL.set(t, s),
      !0 === i.reflect && this._$Em !== t && (this._$Ej ??= new Set()).add(t)
  }
  async _$EP() {
    this.isUpdatePending = !0
    try {
      await this._$Eg
    } catch (t) {
      Promise.reject(t)
    }
    const t = this.scheduleUpdate()
    return null != t && (await t), !this.isUpdatePending
  }
  scheduleUpdate() {
    return this.performUpdate()
  }
  performUpdate() {
    if (!this.isUpdatePending) return
    if (!this.hasUpdated) {
      if (((this.renderRoot ??= this.createRenderRoot()), this._$Ep)) {
        for (const [t, s] of this._$Ep) this[t] = s
        this._$Ep = void 0
      }
      const t = this.constructor.elementProperties
      if (t.size > 0)
        for (const [s, i] of t)
          !0 !== i.wrapped ||
            this._$AL.has(s) ||
            void 0 === this[s] ||
            this.C(s, this[s], i)
    }
    let t = !1
    const s = this._$AL
    try {
      ;(t = this.shouldUpdate(s)),
        t
          ? (this.willUpdate(s),
            this._$E_?.forEach(t => t.hostUpdate?.()),
            this.update(s))
          : this._$ET()
    } catch (s) {
      throw ((t = !1), this._$ET(), s)
    }
    t && this._$AE(s)
  }
  willUpdate(t) {}
  _$AE(t) {
    this._$E_?.forEach(t => t.hostUpdated?.()),
      this.hasUpdated || ((this.hasUpdated = !0), this.firstUpdated(t)),
      this.updated(t)
  }
  _$ET() {
    ;(this._$AL = new Map()), (this.isUpdatePending = !1)
  }
  get updateComplete() {
    return this.getUpdateComplete()
  }
  getUpdateComplete() {
    return this._$Eg
  }
  shouldUpdate(t) {
    return !0
  }
  update(t) {
    ;(this._$Ej &&= this._$Ej.forEach(t => this._$EO(t, this[t]))), this._$ET()
  }
  updated(t) {}
  firstUpdated(t) {}
}
;(b$1.elementStyles = []),
  (b$1.shadowRootOptions = { mode: 'open' }),
  (b$1[d$3('elementProperties')] = new Map()),
  (b$1[d$3('finalized')] = new Map()),
  p$2?.({ ReactiveElement: b$1 }),
  (a$5.reactiveElementVersions ??= []).push('2.0.2')

/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */ const o$d = {
    attribute: !0,
    type: String,
    converter: u$2,
    reflect: !1,
    hasChanged: f$2,
  },
  r$9 = (t = o$d, e, r) => {
    const { kind: n, metadata: i } = r
    let s = globalThis.litPropertyMetadata.get(i)
    if (
      (void 0 === s && globalThis.litPropertyMetadata.set(i, (s = new Map())),
      s.set(r.name, t),
      'accessor' === n)
    ) {
      const { name: o } = r
      return {
        set(r) {
          const n = e.get.call(this)
          e.set.call(this, r), this.requestUpdate(o, n, t)
        },
        init(e) {
          return void 0 !== e && this.C(o, void 0, t), e
        },
      }
    }
    if ('setter' === n) {
      const { name: o } = r
      return function(r) {
        const n = this[o]
        e.call(this, r), this.requestUpdate(o, n, t)
      }
    }
    throw Error('Unsupported decorator location: ' + n)
  }
function n$b(t) {
  return (e, o) =>
    'object' == typeof o
      ? r$9(t, e, o)
      : ((t, e, o) => {
          const r = e.hasOwnProperty(o)
          return (
            e.constructor.createProperty(o, r ? { ...t, wrapped: !0 } : t),
            r ? Object.getOwnPropertyDescriptor(e, o) : void 0
          )
        })(t, e, o)
}

/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */ function r$8(r) {
  return n$b({ ...r, state: !0, attribute: !1 })
}

/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const e$h = (e, t, c) => (
  (c.configurable = !0),
  (c.enumerable = !0),
  Reflect.decorate && 'object' != typeof t && Object.defineProperty(e, t, c),
  c
)

/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */ function e$g(e, r) {
  return (n, s, i) => {
    const o = t => t.renderRoot?.querySelector(e) ?? null
    if (r) {
      const { get: e, set: r } =
        'object' == typeof s
          ? n
          : i ??
            (() => {
              const t = Symbol()
              return {
                get() {
                  return this[t]
                },
                set(e) {
                  this[t] = e
                },
              }
            })()
      return e$h(n, s, {
        get() {
          let t = e.call(this)
          return (
            void 0 === t &&
              ((t = o(this)),
              (null !== t || this.hasUpdated) && r.call(this, t)),
            t
          )
        },
      })
    }
    return e$h(n, s, {
      get() {
        return o(this)
      },
    })
  }
}

/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
let e$f
function r$7(r) {
  return (n, o) =>
    e$h(n, o, {
      get() {
        return (
          this.renderRoot ?? (e$f ??= document.createDocumentFragment())
        ).querySelectorAll(r)
      },
    })
}

/**
 * @license
 * Copyright 2021 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */ function o$c(o) {
  return (e, n) => {
    const { slot: r, selector: s } = o ?? {},
      c = 'slot' + (r ? `[name=${r}]` : ':not([name])')
    return e$h(e, n, {
      get() {
        const t = this.renderRoot?.querySelector(c),
          e = t?.assignedElements(o) ?? []
        return void 0 === s ? e : e.filter(t => t.matches(s))
      },
    })
  }
}

/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const t$7 = globalThis,
  i$6 = t$7.trustedTypes,
  s$a = i$6 ? i$6.createPolicy('lit-html', { createHTML: t => t }) : void 0,
  e$e = '$lit$',
  h$4 = `lit$${(Math.random() + '').slice(9)}$`,
  o$b = '?' + h$4,
  n$a = `<${o$b}>`,
  r$6 = document,
  l$5 = () => r$6.createComment(''),
  c$3 = t => null === t || ('object' != typeof t && 'function' != typeof t),
  a$4 = Array.isArray,
  u$1 = t => a$4(t) || 'function' == typeof t?.[Symbol.iterator],
  d$2 = '[ \t\n\f\r]',
  f$1 = /<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,
  v$1 = /-->/g,
  _$2 = />/g,
  m$1 = RegExp(
    `>|${d$2}(?:([^\\s"'>=/]+)(${d$2}*=${d$2}*(?:[^ \t\n\f\r"'\`<>=]|("|')|))|$)`,
    'g'
  ),
  p$1 = /'/g,
  g$1 = /"/g,
  $$1 = /^(?:script|style|textarea|title)$/i,
  y$1 = t => (i, ...s) => ({ _$litType$: t, strings: i, values: s }),
  x$1 = y$1(1),
  w = Symbol.for('lit-noChange'),
  T$1 = Symbol.for('lit-nothing'),
  A$2 = new WeakMap(),
  E$1 = r$6.createTreeWalker(r$6, 129)
function C$1(t, i) {
  if (!Array.isArray(t) || !t.hasOwnProperty('raw'))
    throw Error('invalid template strings array')
  return void 0 !== s$a ? s$a.createHTML(i) : i
}
const P$2 = (t, i) => {
  const s = t.length - 1,
    o = []
  let r,
    l = 2 === i ? '<svg>' : '',
    c = f$1
  for (let i = 0; i < s; i++) {
    const s = t[i]
    let a,
      u,
      d = -1,
      y = 0
    for (; y < s.length && ((c.lastIndex = y), (u = c.exec(s)), null !== u); )
      (y = c.lastIndex),
        c === f$1
          ? '!--' === u[1]
            ? (c = v$1)
            : void 0 !== u[1]
            ? (c = _$2)
            : void 0 !== u[2]
            ? ($$1.test(u[2]) && (r = RegExp('</' + u[2], 'g')), (c = m$1))
            : void 0 !== u[3] && (c = m$1)
          : c === m$1
          ? '>' === u[0]
            ? ((c = r ?? f$1), (d = -1))
            : void 0 === u[1]
            ? (d = -2)
            : ((d = c.lastIndex - u[2].length),
              (a = u[1]),
              (c = void 0 === u[3] ? m$1 : '"' === u[3] ? g$1 : p$1))
          : c === g$1 || c === p$1
          ? (c = m$1)
          : c === v$1 || c === _$2
          ? (c = f$1)
          : ((c = m$1), (r = void 0))
    const x = c === m$1 && t[i + 1].startsWith('/>') ? ' ' : ''
    l +=
      c === f$1
        ? s + n$a
        : d >= 0
        ? (o.push(a), s.slice(0, d) + e$e + s.slice(d) + h$4 + x)
        : s + h$4 + (-2 === d ? i : x)
  }
  return [C$1(t, l + (t[s] || '<?>') + (2 === i ? '</svg>' : '')), o]
}
class V$2 {
  constructor({ strings: t, _$litType$: s }, n) {
    let r
    this.parts = []
    let c = 0,
      a = 0
    const u = t.length - 1,
      d = this.parts,
      [f, v] = P$2(t, s)
    if (
      ((this.el = V$2.createElement(f, n)),
      (E$1.currentNode = this.el.content),
      2 === s)
    ) {
      const t = this.el.content.firstChild
      t.replaceWith(...t.childNodes)
    }
    for (; null !== (r = E$1.nextNode()) && d.length < u; ) {
      if (1 === r.nodeType) {
        if (r.hasAttributes())
          for (const t of r.getAttributeNames())
            if (t.endsWith(e$e)) {
              const i = v[a++],
                s = r.getAttribute(t).split(h$4),
                e = /([.?@])?(.*)/.exec(i)
              d.push({
                type: 1,
                index: c,
                name: e[2],
                strings: s,
                ctor:
                  '.' === e[1]
                    ? k$1
                    : '?' === e[1]
                    ? H$2
                    : '@' === e[1]
                    ? I$2
                    : R$1,
              }),
                r.removeAttribute(t)
            } else
              t.startsWith(h$4) &&
                (d.push({ type: 6, index: c }), r.removeAttribute(t))
        if ($$1.test(r.tagName)) {
          const t = r.textContent.split(h$4),
            s = t.length - 1
          if (s > 0) {
            r.textContent = i$6 ? i$6.emptyScript : ''
            for (let i = 0; i < s; i++)
              r.append(t[i], l$5()),
                E$1.nextNode(),
                d.push({ type: 2, index: ++c })
            r.append(t[s], l$5())
          }
        }
      } else if (8 === r.nodeType)
        if (r.data === o$b) d.push({ type: 2, index: c })
        else {
          let t = -1
          for (; -1 !== (t = r.data.indexOf(h$4, t + 1)); )
            d.push({ type: 7, index: c }), (t += h$4.length - 1)
        }
      c++
    }
  }
  static createElement(t, i) {
    const s = r$6.createElement('template')
    return (s.innerHTML = t), s
  }
}
function N$2(t, i, s = t, e) {
  if (i === w) return i
  let h = void 0 !== e ? s._$Co?.[e] : s._$Cl
  const o = c$3(i) ? void 0 : i._$litDirective$
  return (
    h?.constructor !== o &&
      (h?._$AO?.(!1),
      void 0 === o ? (h = void 0) : ((h = new o(t)), h._$AT(t, s, e)),
      void 0 !== e ? ((s._$Co ??= [])[e] = h) : (s._$Cl = h)),
    void 0 !== h && (i = N$2(t, h._$AS(t, i.values), h, e)),
    i
  )
}
class S$2 {
  constructor(t, i) {
    ;(this._$AV = []), (this._$AN = void 0), (this._$AD = t), (this._$AM = i)
  }
  get parentNode() {
    return this._$AM.parentNode
  }
  get _$AU() {
    return this._$AM._$AU
  }
  u(t) {
    const {
        el: { content: i },
        parts: s,
      } = this._$AD,
      e = (t?.creationScope ?? r$6).importNode(i, !0)
    E$1.currentNode = e
    let h = E$1.nextNode(),
      o = 0,
      n = 0,
      l = s[0]
    for (; void 0 !== l; ) {
      if (o === l.index) {
        let i
        2 === l.type
          ? (i = new M$1(h, h.nextSibling, this, t))
          : 1 === l.type
          ? (i = new l.ctor(h, l.name, l.strings, this, t))
          : 6 === l.type && (i = new L(h, this, t)),
          this._$AV.push(i),
          (l = s[++n])
      }
      o !== l?.index && ((h = E$1.nextNode()), o++)
    }
    return (E$1.currentNode = r$6), e
  }
  p(t) {
    let i = 0
    for (const s of this._$AV)
      void 0 !== s &&
        (void 0 !== s.strings
          ? (s._$AI(t, s, i), (i += s.strings.length - 2))
          : s._$AI(t[i])),
        i++
  }
}
class M$1 {
  get _$AU() {
    return this._$AM?._$AU ?? this._$Cv
  }
  constructor(t, i, s, e) {
    ;(this.type = 2),
      (this._$AH = T$1),
      (this._$AN = void 0),
      (this._$AA = t),
      (this._$AB = i),
      (this._$AM = s),
      (this.options = e),
      (this._$Cv = e?.isConnected ?? !0)
  }
  get parentNode() {
    let t = this._$AA.parentNode
    const i = this._$AM
    return void 0 !== i && 11 === t?.nodeType && (t = i.parentNode), t
  }
  get startNode() {
    return this._$AA
  }
  get endNode() {
    return this._$AB
  }
  _$AI(t, i = this) {
    ;(t = N$2(this, t, i)),
      c$3(t)
        ? t === T$1 || null == t || '' === t
          ? (this._$AH !== T$1 && this._$AR(), (this._$AH = T$1))
          : t !== this._$AH && t !== w && this._(t)
        : void 0 !== t._$litType$
        ? this.g(t)
        : void 0 !== t.nodeType
        ? this.$(t)
        : u$1(t)
        ? this.T(t)
        : this._(t)
  }
  k(t) {
    return this._$AA.parentNode.insertBefore(t, this._$AB)
  }
  $(t) {
    this._$AH !== t && (this._$AR(), (this._$AH = this.k(t)))
  }
  _(t) {
    this._$AH !== T$1 && c$3(this._$AH)
      ? (this._$AA.nextSibling.data = t)
      : this.$(r$6.createTextNode(t)),
      (this._$AH = t)
  }
  g(t) {
    const { values: i, _$litType$: s } = t,
      e =
        'number' == typeof s
          ? this._$AC(t)
          : (void 0 === s.el &&
              (s.el = V$2.createElement(C$1(s.h, s.h[0]), this.options)),
            s)
    if (this._$AH?._$AD === e) this._$AH.p(i)
    else {
      const t = new S$2(e, this),
        s = t.u(this.options)
      t.p(i), this.$(s), (this._$AH = t)
    }
  }
  _$AC(t) {
    let i = A$2.get(t.strings)
    return void 0 === i && A$2.set(t.strings, (i = new V$2(t))), i
  }
  T(t) {
    a$4(this._$AH) || ((this._$AH = []), this._$AR())
    const i = this._$AH
    let s,
      e = 0
    for (const h of t)
      e === i.length
        ? i.push(
            (s = new M$1(this.k(l$5()), this.k(l$5()), this, this.options))
          )
        : (s = i[e]),
        s._$AI(h),
        e++
    e < i.length && (this._$AR(s && s._$AB.nextSibling, e), (i.length = e))
  }
  _$AR(t = this._$AA.nextSibling, i) {
    for (this._$AP?.(!1, !0, i); t && t !== this._$AB; ) {
      const i = t.nextSibling
      t.remove(), (t = i)
    }
  }
  setConnected(t) {
    void 0 === this._$AM && ((this._$Cv = t), this._$AP?.(t))
  }
}
class R$1 {
  get tagName() {
    return this.element.tagName
  }
  get _$AU() {
    return this._$AM._$AU
  }
  constructor(t, i, s, e, h) {
    ;(this.type = 1),
      (this._$AH = T$1),
      (this._$AN = void 0),
      (this.element = t),
      (this.name = i),
      (this._$AM = e),
      (this.options = h),
      s.length > 2 || '' !== s[0] || '' !== s[1]
        ? ((this._$AH = Array(s.length - 1).fill(new String())),
          (this.strings = s))
        : (this._$AH = T$1)
  }
  _$AI(t, i = this, s, e) {
    const h = this.strings
    let o = !1
    if (void 0 === h)
      (t = N$2(this, t, i, 0)),
        (o = !c$3(t) || (t !== this._$AH && t !== w)),
        o && (this._$AH = t)
    else {
      const e = t
      let n, r
      for (t = h[0], n = 0; n < h.length - 1; n++)
        (r = N$2(this, e[s + n], i, n)),
          r === w && (r = this._$AH[n]),
          (o ||= !c$3(r) || r !== this._$AH[n]),
          r === T$1 ? (t = T$1) : t !== T$1 && (t += (r ?? '') + h[n + 1]),
          (this._$AH[n] = r)
    }
    o && !e && this.O(t)
  }
  O(t) {
    t === T$1
      ? this.element.removeAttribute(this.name)
      : this.element.setAttribute(this.name, t ?? '')
  }
}
class k$1 extends R$1 {
  constructor() {
    super(...arguments), (this.type = 3)
  }
  O(t) {
    this.element[this.name] = t === T$1 ? void 0 : t
  }
}
class H$2 extends R$1 {
  constructor() {
    super(...arguments), (this.type = 4)
  }
  O(t) {
    this.element.toggleAttribute(this.name, !!t && t !== T$1)
  }
}
class I$2 extends R$1 {
  constructor(t, i, s, e, h) {
    super(t, i, s, e, h), (this.type = 5)
  }
  _$AI(t, i = this) {
    if ((t = N$2(this, t, i, 0) ?? T$1) === w) return
    const s = this._$AH,
      e =
        (t === T$1 && s !== T$1) ||
        t.capture !== s.capture ||
        t.once !== s.once ||
        t.passive !== s.passive,
      h = t !== T$1 && (s === T$1 || e)
    e && this.element.removeEventListener(this.name, this, s),
      h && this.element.addEventListener(this.name, this, t),
      (this._$AH = t)
  }
  handleEvent(t) {
    'function' == typeof this._$AH
      ? this._$AH.call(this.options?.host ?? this.element, t)
      : this._$AH.handleEvent(t)
  }
}
class L {
  constructor(t, i, s) {
    ;(this.element = t),
      (this.type = 6),
      (this._$AN = void 0),
      (this._$AM = i),
      (this.options = s)
  }
  get _$AU() {
    return this._$AM._$AU
  }
  _$AI(t) {
    N$2(this, t)
  }
}
const Z$1 = t$7.litHtmlPolyfillSupport
Z$1?.(V$2, M$1), (t$7.litHtmlVersions ??= []).push('3.1.0')
const j$1 = (t, i, s) => {
  const e = s?.renderBefore ?? i
  let h = e._$litPart$
  if (void 0 === h) {
    const t = s?.renderBefore ?? null
    e._$litPart$ = h = new M$1(i.insertBefore(l$5(), t), t, void 0, s ?? {})
  }
  return h._$AI(t), h
}

/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */ class s$9 extends b$1 {
  constructor() {
    super(...arguments),
      (this.renderOptions = { host: this }),
      (this._$Do = void 0)
  }
  createRenderRoot() {
    const t = super.createRenderRoot()
    return (this.renderOptions.renderBefore ??= t.firstChild), t
  }
  update(t) {
    const i = this.render()
    this.hasUpdated || (this.renderOptions.isConnected = this.isConnected),
      super.update(t),
      (this._$Do = j$1(i, this.renderRoot, this.renderOptions))
  }
  connectedCallback() {
    super.connectedCallback(), this._$Do?.setConnected(!0)
  }
  disconnectedCallback() {
    super.disconnectedCallback(), this._$Do?.setConnected(!1)
  }
  render() {
    return w
  }
}
;(s$9._$litElement$ = !0),
  (s$9['finalized'] = !0),
  globalThis.litElementHydrateSupport?.({ LitElement: s$9 })
const r$5 = globalThis.litElementPolyfillSupport
r$5?.({ LitElement: s$9 })
;(globalThis.litElementVersions ??= []).push('4.0.2')

/**
 * @license
 * Copyright 2023 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */
/**
 * A divider component.
 */
class Divider extends s$9 {
  constructor() {
    super(...arguments)
    /**
     * Indents the divider with equal padding on both sides.
     */
    this.inset = false
    /**
     * Indents the divider with padding on the leading side.
     */
    this.insetStart = false
    /**
     * Indents the divider with padding on the trailing side.
     */
    this.insetEnd = false
  }
}
__decorate(
  [n$b({ type: Boolean, reflect: true })],
  Divider.prototype,
  'inset',
  void 0
)
__decorate(
  [n$b({ type: Boolean, reflect: true, attribute: 'inset-start' })],
  Divider.prototype,
  'insetStart',
  void 0
)
__decorate(
  [n$b({ type: Boolean, reflect: true, attribute: 'inset-end' })],
  Divider.prototype,
  'insetEnd',
  void 0
)

/**
 * @license
 * Copyright 2022 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */
const styles$f = i$8`:host{--_color: var(--md-divider-color, var(--md-sys-color-outline-variant, #cac4d0));--_thickness: var(--md-divider-thickness, 1px);box-sizing:border-box;color:var(--_color);display:flex;height:var(--_thickness);width:100%}:host([inset]),:host([inset-start]){padding-inline-start:16px}:host([inset]),:host([inset-end]){padding-inline-end:16px}:host::before{background:currentColor;content:"";height:100%;width:100%}@media(forced-colors: active){:host::before{background:CanvasText}}/*# sourceMappingURL=divider-styles.css.map */
`

/**
 * @license
 * Copyright 2023 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */
/**
 * @summary A divider is a thin line that groups content in lists and
 * containers.
 *
 * @description Dividers can reinforce tapability, such as when used to separate
 * list items or define tappable regions in an accordion.
 *
 * @final
 * @suppress {visibility}
 */
let MdDivider = class MdDivider extends Divider {}
MdDivider.styles = [styles$f]
MdDivider = __decorate([t$9('md-divider')], MdDivider)

/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const t$6 = {
    ATTRIBUTE: 1,
    CHILD: 2,
    PROPERTY: 3,
    BOOLEAN_ATTRIBUTE: 4,
    EVENT: 5,
    ELEMENT: 6,
  },
  e$d = t => (...e) => ({ _$litDirective$: t, values: e })
class i$5 {
  constructor(t) {}
  get _$AU() {
    return this._$AM._$AU
  }
  _$AT(t, e, i) {
    ;(this._$Ct = t), (this._$AM = e), (this._$Ci = i)
  }
  _$AS(t, e) {
    return this.update(t, e)
  }
  update(t, e) {
    return this.render(...e)
  }
}

/**
 * @license
 * Copyright 2018 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */ const e$c = e$d(
  class extends i$5 {
    constructor(t) {
      if (
        (super(t),
        t.type !== t$6.ATTRIBUTE || 'class' !== t.name || t.strings?.length > 2)
      )
        throw Error(
          '`classMap()` can only be used in the `class` attribute and must be the only part in the attribute.'
        )
    }
    render(t) {
      return (
        ' ' +
        Object.keys(t)
          .filter(s => t[s])
          .join(' ') +
        ' '
      )
    }
    update(s, [i]) {
      if (void 0 === this.it) {
        ;(this.it = new Set()),
          void 0 !== s.strings &&
            (this.st = new Set(
              s.strings
                .join(' ')
                .split(/\s/)
                .filter(t => '' !== t)
            ))
        for (const t in i) i[t] && !this.st?.has(t) && this.it.add(t)
        return this.render(i)
      }
      const r = s.element.classList
      for (const t of this.it) t in i || (r.remove(t), this.it.delete(t))
      for (const t in i) {
        const s = !!i[t]
        s === this.it.has(t) ||
          this.st?.has(t) ||
          (s ? (r.add(t), this.it.add(t)) : (r.remove(t), this.it.delete(t)))
      }
      return w
    }
  }
)

/**
 * @license
 * Copyright 2023 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */
/**
 * Accessibility Object Model reflective aria properties.
 */
const ARIA_PROPERTIES = [
  'ariaAtomic',
  'ariaAutoComplete',
  'ariaBusy',
  'ariaChecked',
  'ariaColCount',
  'ariaColIndex',
  'ariaColSpan',
  'ariaCurrent',
  'ariaDisabled',
  'ariaExpanded',
  'ariaHasPopup',
  'ariaHidden',
  'ariaInvalid',
  'ariaKeyShortcuts',
  'ariaLabel',
  'ariaLevel',
  'ariaLive',
  'ariaModal',
  'ariaMultiLine',
  'ariaMultiSelectable',
  'ariaOrientation',
  'ariaPlaceholder',
  'ariaPosInSet',
  'ariaPressed',
  'ariaReadOnly',
  'ariaRequired',
  'ariaRoleDescription',
  'ariaRowCount',
  'ariaRowIndex',
  'ariaRowSpan',
  'ariaSelected',
  'ariaSetSize',
  'ariaSort',
  'ariaValueMax',
  'ariaValueMin',
  'ariaValueNow',
  'ariaValueText',
]
/**
 * Accessibility Object Model aria attributes.
 */
ARIA_PROPERTIES.map(ariaPropertyToAttribute)
/**
 * Converts an AOM aria property into its corresponding attribute.
 *
 * @example
 * ariaPropertyToAttribute('ariaLabel'); // 'aria-label'
 *
 * @param property The aria property.
 * @return The aria attribute.
 */
function ariaPropertyToAttribute(property) {
  return (
    property
      .replace('aria', 'aria-')
      // IDREF attributes also include an "Element" or "Elements" suffix
      .replace(/Elements?/g, '')
      .toLowerCase()
  )
}
/**
 * Enables a host custom element to be the target for aria roles and attributes.
 * Components should set the `elementInternals.role` property.
 *
 * By default, aria components are tab focusable. Provide a `focusable: false`
 * option for components that should not be tab focusable, such as
 * `role="listbox"`.
 *
 * This function will also polyfill aria `ElementInternals` properties for
 * Firefox.
 *
 * @param ctor The `ReactiveElement` constructor to set up.
 * @param options Options to configure the element's host aria.
 */
function setupHostAria(ctor, { focusable } = {}) {
  if (focusable !== false) {
    ctor.addInitializer(host => {
      host.addController({
        hostConnected() {
          if (host.hasAttribute('tabindex')) {
            return
          }
          host.tabIndex = 0
        },
      })
    })
  }
  if ('role' in Element.prototype) {
    return
  }
  // Polyfill reflective aria properties for Firefox
  for (const ariaProperty of ARIA_PROPERTIES) {
    ctor.createProperty(ariaProperty, {
      attribute: ariaPropertyToAttribute(ariaProperty),
      reflect: true,
    })
  }
  ctor.createProperty('role', { reflect: true })
}
/**
 * Polyfills an element and its `ElementInternals` to support `ARIAMixin`
 * properties on internals. This is needed for Firefox.
 *
 * `setupHostAria()` must be called for the element class.
 *
 * @example
 * class XButton extends LitElement {
 *   static {
 *     setupHostAria(XButton);
 *   }
 *
 *   private internals =
 *       polyfillElementInternalsAria(this, this.attachInternals());
 *
 *   constructor() {
 *     super();
 *     this.internals.role = 'button';
 *   }
 * }
 */
function polyfillElementInternalsAria(host, internals) {
  if (checkIfElementInternalsSupportsAria(internals)) {
    return internals
  }
  if (!('role' in host)) {
    throw new Error('Missing setupHostAria()')
  }
  let firstConnectedCallbacks = []
  let hasBeenConnected = false
  // Add support for Firefox, which has not yet implement ElementInternals aria
  for (const ariaProperty of ARIA_PROPERTIES) {
    let internalAriaValue = null
    Object.defineProperty(internals, ariaProperty, {
      enumerable: true,
      configurable: true,
      get() {
        return internalAriaValue
      },
      set(value) {
        const setValue = () => {
          internalAriaValue = value
          if (!hasBeenConnected) {
            firstConnectedCallbacks.push({
              property: ariaProperty,
              callback: setValue,
            })
            return
          }
          // Dynamic lookup rather than hardcoding all properties.
          // tslint:disable-next-line:no-dict-access-on-struct-type
          host[ariaProperty] = value
        }
        setValue()
      },
    })
  }
  let internalRoleValue = null
  Object.defineProperty(internals, 'role', {
    enumerable: true,
    configurable: true,
    get() {
      return internalRoleValue
    },
    set(value) {
      const setRole = () => {
        internalRoleValue = value
        if (!hasBeenConnected) {
          firstConnectedCallbacks.push({
            property: 'role',
            callback: setRole,
          })
          return
        }
        if (value === null) {
          host.removeAttribute('role')
        } else {
          host.setAttribute('role', value)
        }
      }
      setRole()
    },
  })
  host.addController({
    hostConnected() {
      if (hasBeenConnected) {
        return
      }
      hasBeenConnected = true
      const propertiesSetByUser = new Set()
      // See which properties were set by the user on host before we apply
      // internals values as attributes to host. Needs to be done in another
      // for loop because the callbacks set these attributes on host.
      for (const { property } of firstConnectedCallbacks) {
        const wasSetByUser =
          host.getAttribute(ariaPropertyToAttribute(property)) !== null ||
          // Dynamic lookup rather than hardcoding all properties.
          // tslint:disable-next-line:no-dict-access-on-struct-type
          host[property] !== undefined
        if (wasSetByUser) {
          propertiesSetByUser.add(property)
        }
      }
      for (const { property, callback } of firstConnectedCallbacks) {
        // If the user has set the attribute or property, do not override the
        // user's value
        if (propertiesSetByUser.has(property)) {
          continue
        }
        callback()
      }
      // Remove strong callback references
      firstConnectedCallbacks = []
    },
  })
  return internals
}
// Separate function so that typescript doesn't complain about internals being
// "never".
function checkIfElementInternalsSupportsAria(internals) {
  return 'role' in internals
}

/**
 * @license
 * Copyright 2023 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */
/**
 * Sets up a `ReactiveElement` constructor to enable updates when delegating
 * aria attributes. Elements may bind `this.aria*` properties to `aria-*`
 * attributes in their render functions.
 *
 * This function will:
 * - Call `requestUpdate()` when an aria attribute changes.
 * - Add `role="presentation"` to the host.
 *
 * NOTE: The following features are not currently supported:
 * - Delegating IDREF attributes (ex: `aria-labelledby`, `aria-controls`)
 * - Delegating the `role` attribute
 *
 * @example
 * class XButton extends LitElement {
 *   static {
 *     requestUpdateOnAriaChange(XButton);
 *   }
 *
 *   protected override render() {
 *     return html`
 *       <button aria-label=${this.ariaLabel || nothing}>
 *         <slot></slot>
 *       </button>
 *     `;
 *   }
 * }
 *
 * @param ctor The `ReactiveElement` constructor to patch.
 */
function requestUpdateOnAriaChange(ctor) {
  for (const ariaProperty of ARIA_PROPERTIES) {
    ctor.createProperty(ariaProperty, {
      attribute: ariaPropertyToAttribute(ariaProperty),
      reflect: true,
    })
  }
  ctor.addInitializer(element => {
    const controller = {
      hostConnected() {
        element.setAttribute('role', 'presentation')
      },
    }
    element.addController(controller)
  })
}

/**
 * @license
 * Copyright 2021 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */
/**
 * Re-dispatches an event from the provided element.
 *
 * This function is useful for forwarding non-composed events, such as `change`
 * events.
 *
 * @example
 * class MyInput extends LitElement {
 *   render() {
 *     return html`<input @change=${this.redispatchEvent}>`;
 *   }
 *
 *   protected redispatchEvent(event: Event) {
 *     redispatchEvent(this, event);
 *   }
 * }
 *
 * @param element The element to dispatch the event from.
 * @param event The event to re-dispatch.
 * @return Whether or not the event was dispatched (if cancelable).
 */
function redispatchEvent(element, event) {
  // For bubbling events in SSR light DOM (or composed), stop their propagation
  // and dispatch the copy.
  if (event.bubbles && (!element.shadowRoot || event.composed)) {
    event.stopPropagation()
  }
  const copy = Reflect.construct(event.constructor, [event.type, event])
  const dispatched = element.dispatchEvent(copy)
  if (!dispatched) {
    event.preventDefault()
  }
  return dispatched
}
/**
 * Dispatches a click event to the given element that triggers a native action,
 * but is not composed and therefore is not seen outside the element.
 *
 * This is useful for responding to an external click event on the host element
 * that should trigger an internal action like a button click.
 *
 * Note, a helper is provided because setting this up correctly is a bit tricky.
 * In particular, calling `click` on an element creates a composed event, which
 * is not desirable, and a manually dispatched event must specifically be a
 * `MouseEvent` to trigger a native action.
 *
 * @example
 * hostClickListener = (event: MouseEvent) {
 *   if (isActivationClick(event)) {
 *     this.dispatchActivationClick(this.buttonElement);
 *   }
 * }
 *
 */
function dispatchActivationClick(element) {
  const event = new MouseEvent('click', { bubbles: true })
  element.dispatchEvent(event)
  return event
}
/**
 * Returns true if the click event should trigger an activation behavior. The
 * behavior is defined by the element and is whatever it should do when
 * clicked.
 *
 * Typically when an element needs to handle a click, the click is generated
 * from within the element and an event listener within the element implements
 * the needed behavior; however, it's possible to fire a click directly
 * at the element that the element should handle. This method helps
 * distinguish these "external" clicks.
 *
 * An "external" click can be triggered in a number of ways: via a click
 * on an associated label for a form  associated element, calling
 * `element.click()`, or calling
 * `element.dispatchEvent(new MouseEvent('click', ...))`.
 *
 * Also works around Firefox issue
 * https://bugzilla.mozilla.org/show_bug.cgi?id=1804576 by squelching
 * events for a microtask after called.
 *
 * @example
 * hostClickListener = (event: MouseEvent) {
 *   if (isActivationClick(event)) {
 *     this.dispatchActivationClick(this.buttonElement);
 *   }
 * }
 *
 */
function isActivationClick(event) {
  // Event must start at the event target.
  if (event.currentTarget !== event.target) {
    return false
  }
  // Event must not be retargeted from shadowRoot.
  if (event.composedPath()[0] !== event.target) {
    return false
  }
  // Target must not be disabled; this should only occur for a synthetically
  // dispatched click.
  if (event.target.disabled) {
    return false
  }
  // This is an activation if the event should not be squelched.
  return !squelchEvent(event)
}
// TODO(https://bugzilla.mozilla.org/show_bug.cgi?id=1804576)
//  Remove when Firefox bug is addressed.
function squelchEvent(event) {
  const squelched = isSquelchingEvents
  if (squelched) {
    event.preventDefault()
    event.stopImmediatePropagation()
  }
  squelchEventsForMicrotask()
  return squelched
}
// Ignore events for one microtask only.
let isSquelchingEvents = false
async function squelchEventsForMicrotask() {
  isSquelchingEvents = true
  // Need to pause for just one microtask.
  // tslint:disable-next-line
  await null
  isSquelchingEvents = false
}

/**
 * @license
 * Copyright 2021 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */
/**
 * Easing functions to use for web animations.
 *
 * **NOTE:** `EASING.EMPHASIZED` is approximated with unknown accuracy.
 *
 * TODO(b/241113345): replace with tokens
 */
const EASING = {
  STANDARD: 'cubic-bezier(0.2, 0, 0, 1)',
  STANDARD_ACCELERATE: 'cubic-bezier(.3,0,1,1)',
  STANDARD_DECELERATE: 'cubic-bezier(0,0,0,1)',
  EMPHASIZED: 'cubic-bezier(.3,0,0,1)',
  EMPHASIZED_ACCELERATE: 'cubic-bezier(.3,0,.8,.15)',
  EMPHASIZED_DECELERATE: 'cubic-bezier(.05,.7,.1,1)',
}
/**
 * Creates an `AnimationSignal` that can be used to cancel a previous task.
 *
 * @example
 * class MyClass {
 *   private labelAnimationSignal = createAnimationSignal();
 *
 *   private async animateLabel() {
 *     // Start of the task. Previous tasks will be canceled.
 *     const signal = this.labelAnimationSignal.start();
 *
 *     // Do async work...
 *     if (signal.aborted) {
 *       // Use AbortSignal to check if a request was made to abort after some
 *       // asynchronous work.
 *       return;
 *     }
 *
 *     const animation = this.animate(...);
 *     // Add event listeners to be notified when the task should be canceled.
 *     signal.addEventListener('abort', () => {
 *       animation.cancel();
 *     });
 *
 *     animation.addEventListener('finish', () => {
 *       // Tell the signal that the current task is finished.
 *       this.labelAnimationSignal.finish();
 *     });
 *   }
 * }
 *
 * @return An `AnimationSignal`.
 */
function createAnimationSignal() {
  // The current animation's AbortController
  let animationAbortController = null
  return {
    start() {
      // Tell the previous animation to cancel.
      animationAbortController?.abort()
      // Set up a new AbortController for the current animation.
      animationAbortController = new AbortController()
      // Provide the AbortSignal so that the caller can check aborted status
      // and add listeners.
      return animationAbortController.signal
    },
    finish() {
      animationAbortController = null
    },
  }
}

/**
 * @license
 * Copyright 2023 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */
/**
 * The default dialog open animation.
 */
const DIALOG_DEFAULT_OPEN_ANIMATION = {
  dialog: [
    [
      // Dialog slide down
      [{ transform: 'translateY(-50px)' }, { transform: 'translateY(0)' }],
      { duration: 500, easing: EASING.EMPHASIZED },
    ],
  ],
  scrim: [
    [
      // Scrim fade in
      [{ opacity: 0 }, { opacity: 0.32 }],
      { duration: 500, easing: 'linear' },
    ],
  ],
  container: [
    [
      // Container fade in
      [{ opacity: 0 }, { opacity: 1 }],
      { duration: 50, easing: 'linear', pseudoElement: '::before' },
    ],
    [
      // Container grow
      // Note: current spec says to grow from 0dp->100% and shrink from
      // 100%->35%. We change this to 35%->100% to simplify the animation that
      // is supposed to clip content as it grows. From 0dp it's possible to see
      // text/actions appear before the container has fully grown.
      [{ height: '35%' }, { height: '100%' }],
      { duration: 500, easing: EASING.EMPHASIZED, pseudoElement: '::before' },
    ],
  ],
  headline: [
    [
      // Headline fade in
      [{ opacity: 0 }, { opacity: 0, offset: 0.2 }, { opacity: 1 }],
      { duration: 250, easing: 'linear', fill: 'forwards' },
    ],
  ],
  content: [
    [
      // Content fade in
      [{ opacity: 0 }, { opacity: 0, offset: 0.2 }, { opacity: 1 }],
      { duration: 250, easing: 'linear', fill: 'forwards' },
    ],
  ],
  actions: [
    [
      // Actions fade in
      [{ opacity: 0 }, { opacity: 0, offset: 0.5 }, { opacity: 1 }],
      { duration: 300, easing: 'linear', fill: 'forwards' },
    ],
  ],
}
/**
 * The default dialog close animation.
 */
const DIALOG_DEFAULT_CLOSE_ANIMATION = {
  dialog: [
    [
      // Dialog slide up
      [{ transform: 'translateY(0)' }, { transform: 'translateY(-50px)' }],
      { duration: 150, easing: EASING.EMPHASIZED_ACCELERATE },
    ],
  ],
  scrim: [
    [
      // Scrim fade out
      [{ opacity: 0.32 }, { opacity: 0 }],
      { duration: 150, easing: 'linear' },
    ],
  ],
  container: [
    [
      // Container shrink
      [{ height: '100%' }, { height: '35%' }],
      {
        duration: 150,
        easing: EASING.EMPHASIZED_ACCELERATE,
        pseudoElement: '::before',
      },
    ],
    [
      // Container fade out
      [{ opacity: '1' }, { opacity: '0' }],
      { delay: 100, duration: 50, easing: 'linear', pseudoElement: '::before' },
    ],
  ],
  headline: [
    [
      // Headline fade out
      [{ opacity: 1 }, { opacity: 0 }],
      { duration: 100, easing: 'linear', fill: 'forwards' },
    ],
  ],
  content: [
    [
      // Content fade out
      [{ opacity: 1 }, { opacity: 0 }],
      { duration: 100, easing: 'linear', fill: 'forwards' },
    ],
  ],
  actions: [
    [
      // Actions fade out
      [{ opacity: 1 }, { opacity: 0 }],
      { duration: 100, easing: 'linear', fill: 'forwards' },
    ],
  ],
}

/**
 * @license
 * Copyright 2023 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */
/**
 * A dialog component.
 *
 * @fires open Dispatched when the dialog is opening before any animations.
 * @fires opened Dispatched when the dialog has opened after any animations.
 * @fires close Dispatched when the dialog is closing before any animations.
 * @fires closed Dispatched when the dialog has closed after any animations.
 * @fires cancel Dispatched when the dialog has been canceled by clicking on the
 *     scrim or pressing Escape.
 */
class Dialog extends s$9 {
  /**
   * Opens the dialog when set to `true` and closes it when set to `false`.
   */
  get open() {
    return this.isOpen
  }
  set open(open) {
    if (open === this.isOpen) {
      return
    }
    this.isOpen = open
    if (open) {
      this.setAttribute('open', '')
      this.show()
    } else {
      this.removeAttribute('open')
      this.close()
    }
  }
  constructor() {
    super()
    /**
     * Gets or sets the dialog's return value, usually to indicate which button
     * a user pressed to close it.
     *
     * https://developer.mozilla.org/en-US/docs/Web/API/HTMLDialogElement/returnValue
     */
    this.returnValue = ''
    /**
     * Gets the opening animation for a dialog. Set to a new function to customize
     * the animation.
     */
    this.getOpenAnimation = () => DIALOG_DEFAULT_OPEN_ANIMATION
    /**
     * Gets the closing animation for a dialog. Set to a new function to customize
     * the animation.
     */
    this.getCloseAnimation = () => DIALOG_DEFAULT_CLOSE_ANIMATION
    this.isOpen = false
    this.isOpening = false
    this.isConnectedPromise = this.getIsConnectedPromise()
    this.isAtScrollTop = false
    this.isAtScrollBottom = false
    this.nextClickIsFromContent = false
    // Dialogs should not be SSR'd while open, so we can just use runtime checks.
    this.hasHeadline = false
    this.hasActions = false
    this.hasIcon = false
    {
      this.addEventListener('submit', this.handleSubmit)
    }
  }
  /**
   * Opens the dialog and fires a cancelable `open` event. After a dialog's
   * animation, an `opened` event is fired.
   *
   * Add an `autocomplete` attribute to a child of the dialog that should
   * receive focus after opening.
   *
   * @return A Promise that resolves after the animation is finished and the
   *     `opened` event was fired.
   */
  async show() {
    this.isOpening = true
    // Dialogs can be opened before being attached to the DOM, so we need to
    // wait until we're connected before calling `showModal()`.
    await this.isConnectedPromise
    await this.updateComplete
    const dialog = this.dialog
    // Check if already opened or if `dialog.close()` was called while awaiting.
    if (dialog.open || !this.isOpening) {
      this.isOpening = false
      return
    }
    const preventOpen = !this.dispatchEvent(
      new Event('open', { cancelable: true })
    )
    if (preventOpen) {
      this.open = false
      return
    }
    // All Material dialogs are modal.
    dialog.showModal()
    this.open = true
    // Reset scroll position if re-opening a dialog with the same content.
    if (this.scroller) {
      this.scroller.scrollTop = 0
    }
    // Native modal dialogs ignore autofocus and instead force focus to the
    // first focusable child. Override this behavior if there is a child with
    // an autofocus attribute.
    this.querySelector('[autofocus]')?.focus()
    await this.animateDialog(this.getOpenAnimation())
    this.dispatchEvent(new Event('opened'))
    this.isOpening = false
  }
  /**
   * Closes the dialog and fires a cancelable `close` event. After a dialog's
   * animation, a `closed` event is fired.
   *
   * @param returnValue A return value usually indicating which button was used
   *     to close a dialog. If a dialog is canceled by clicking the scrim or
   *     pressing Escape, it will not change the return value after closing.
   * @return A Promise that resolves after the animation is finished and the
   *     `closed` event was fired.
   */
  async close(returnValue = this.returnValue) {
    this.isOpening = false
    if (!this.isConnected) {
      // Disconnected dialogs do not fire close events or animate.
      this.open = false
      return
    }
    await this.updateComplete
    const dialog = this.dialog
    // Check if already closed or if `dialog.show()` was called while awaiting.
    if (!dialog.open || this.isOpening) {
      this.open = false
      return
    }
    const prevReturnValue = this.returnValue
    this.returnValue = returnValue
    const preventClose = !this.dispatchEvent(
      new Event('close', { cancelable: true })
    )
    if (preventClose) {
      this.returnValue = prevReturnValue
      return
    }
    await this.animateDialog(this.getCloseAnimation())
    dialog.close(returnValue)
    this.open = false
    this.dispatchEvent(new Event('closed'))
  }
  connectedCallback() {
    super.connectedCallback()
    this.isConnectedPromiseResolve()
  }
  disconnectedCallback() {
    super.disconnectedCallback()
    this.isConnectedPromise = this.getIsConnectedPromise()
  }
  render() {
    const scrollable =
      this.open && !(this.isAtScrollTop && this.isAtScrollBottom)
    const classes = {
      'has-headline': this.hasHeadline,
      'has-actions': this.hasActions,
      'has-icon': this.hasIcon,
      scrollable: scrollable,
      'show-top-divider': scrollable && !this.isAtScrollTop,
      'show-bottom-divider': scrollable && !this.isAtScrollBottom,
    }
    const { ariaLabel } = this
    return x$1`
      <div class="scrim"></div>
      <dialog
        class=${e$c(classes)}
        aria-label=${ariaLabel || T$1}
        aria-labelledby=${this.hasHeadline ? 'headline' : T$1}
        role=${this.type === 'alert' ? 'alertdialog' : T$1}
        @cancel=${this.handleCancel}
        @click=${this.handleDialogClick}
        .returnValue=${this.returnValue || T$1}
      >
        <div class="container"
          @click=${this.handleContentClick}
        >
          <div class="headline">
            <div class="icon" aria-hidden="true">
              <slot name="icon" @slotchange=${this.handleIconChange}></slot>
            </div>
            <h2 id="headline" aria-hidden=${!this.hasHeadline || T$1}>
              <slot name="headline"
                  @slotchange=${this.handleHeadlineChange}></slot>
            </h2>
            <md-divider></md-divider>
          </div>
          <div class="scroller">
            <div class="content">
              <div class="top anchor"></div>
              <slot name="content"></slot>
              <div class="bottom anchor"></div>
            </div>
          </div>
          <div class="actions">
            <md-divider></md-divider>
            <slot name="actions"
              @slotchange=${this.handleActionsChange}></slot>
          </div>
        </div>
      </dialog>
    `
  }
  firstUpdated() {
    this.intersectionObserver = new IntersectionObserver(
      entries => {
        for (const entry of entries) {
          this.handleAnchorIntersection(entry)
        }
      },
      { root: this.scroller }
    )
    this.intersectionObserver.observe(this.topAnchor)
    this.intersectionObserver.observe(this.bottomAnchor)
  }
  handleDialogClick() {
    if (this.nextClickIsFromContent) {
      // Avoid doing a layout calculation below if we know the click came from
      // content.
      this.nextClickIsFromContent = false
      return
    }
    // Click originated on the backdrop. Native `<dialog>`s will not cancel,
    // but Material dialogs do.
    const preventDefault = !this.dispatchEvent(
      new Event('cancel', { cancelable: true })
    )
    if (preventDefault) {
      return
    }
    this.close()
  }
  handleContentClick() {
    this.nextClickIsFromContent = true
  }
  handleSubmit(event) {
    const form = event.target
    const { submitter } = event
    if (form.method !== 'dialog' || !submitter) {
      return
    }
    // Close reason is the submitter's value attribute, or the dialog's
    // `returnValue` if there is no attribute.
    this.close(submitter.getAttribute('value') ?? this.returnValue)
  }
  handleCancel(event) {
    if (event.target !== this.dialog) {
      // Ignore any cancel events dispatched by content.
      return
    }
    const preventDefault = !redispatchEvent(this, event)
    // We always prevent default on the original dialog event since we'll
    // animate closing it before it actually closes.
    event.preventDefault()
    if (preventDefault) {
      return
    }
    this.close()
  }
  async animateDialog(animation) {
    const { dialog, scrim, container, headline, content, actions } = this
    if (!dialog || !scrim || !container || !headline || !content || !actions) {
      return
    }
    const {
      container: containerAnimate,
      dialog: dialogAnimate,
      scrim: scrimAnimate,
      headline: headlineAnimate,
      content: contentAnimate,
      actions: actionsAnimate,
    } = animation
    const elementAndAnimation = [
      [dialog, dialogAnimate ?? []],
      [scrim, scrimAnimate ?? []],
      [container, containerAnimate ?? []],
      [headline, headlineAnimate ?? []],
      [content, contentAnimate ?? []],
      [actions, actionsAnimate ?? []],
    ]
    const animations = []
    for (const [element, animation] of elementAndAnimation) {
      for (const animateArgs of animation) {
        animations.push(element.animate(...animateArgs))
      }
    }
    await Promise.all(animations.map(animation => animation.finished))
  }
  handleHeadlineChange(event) {
    const slot = event.target
    this.hasHeadline = slot.assignedElements().length > 0
  }
  handleActionsChange(event) {
    const slot = event.target
    this.hasActions = slot.assignedElements().length > 0
  }
  handleIconChange(event) {
    const slot = event.target
    this.hasIcon = slot.assignedElements().length > 0
  }
  handleAnchorIntersection(entry) {
    const { target, isIntersecting } = entry
    if (target === this.topAnchor) {
      this.isAtScrollTop = isIntersecting
    }
    if (target === this.bottomAnchor) {
      this.isAtScrollBottom = isIntersecting
    }
  }
  getIsConnectedPromise() {
    return new Promise(resolve => {
      this.isConnectedPromiseResolve = resolve
    })
  }
}
;(() => {
  requestUpdateOnAriaChange(Dialog)
})()
/** @nocollapse */
Dialog.shadowRootOptions = {
  ...s$9.shadowRootOptions,
  delegatesFocus: true,
}
__decorate([n$b({ type: Boolean })], Dialog.prototype, 'open', null)
__decorate([n$b({ attribute: false })], Dialog.prototype, 'returnValue', void 0)
__decorate([n$b()], Dialog.prototype, 'type', void 0)
__decorate([e$g('dialog')], Dialog.prototype, 'dialog', void 0)
__decorate([e$g('.scrim')], Dialog.prototype, 'scrim', void 0)
__decorate([e$g('.container')], Dialog.prototype, 'container', void 0)
__decorate([e$g('.headline')], Dialog.prototype, 'headline', void 0)
__decorate([e$g('.content')], Dialog.prototype, 'content', void 0)
__decorate([e$g('.actions')], Dialog.prototype, 'actions', void 0)
__decorate([r$8()], Dialog.prototype, 'isAtScrollTop', void 0)
__decorate([r$8()], Dialog.prototype, 'isAtScrollBottom', void 0)
__decorate([e$g('.scroller')], Dialog.prototype, 'scroller', void 0)
__decorate([e$g('.top.anchor')], Dialog.prototype, 'topAnchor', void 0)
__decorate([e$g('.bottom.anchor')], Dialog.prototype, 'bottomAnchor', void 0)
__decorate([r$8()], Dialog.prototype, 'hasHeadline', void 0)
__decorate([r$8()], Dialog.prototype, 'hasActions', void 0)
__decorate([r$8()], Dialog.prototype, 'hasIcon', void 0)

/**
 * @license
 * Copyright 2022 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */
const styles$e = i$8`:host{--_container-color: var(--md-dialog-container-color, var(--md-sys-color-surface-container-high, #ece6f0));--_container-shape: var(--md-dialog-container-shape, 28px);--_headline-color: var(--md-dialog-headline-color, var(--md-sys-color-on-surface, #1d1b20));--_headline-font: var(--md-dialog-headline-font, var(--md-sys-typescale-headline-small-font, var(--md-ref-typeface-brand, Roboto)));--_headline-line-height: var(--md-dialog-headline-line-height, var(--md-sys-typescale-headline-small-line-height, 2rem));--_headline-size: var(--md-dialog-headline-size, var(--md-sys-typescale-headline-small-size, 1.5rem));--_headline-weight: var(--md-dialog-headline-weight, var(--md-sys-typescale-headline-small-weight, var(--md-ref-typeface-weight-regular, 400)));--_supporting-text-color: var(--md-dialog-supporting-text-color, var(--md-sys-color-on-surface-variant, #49454f));--_supporting-text-font: var(--md-dialog-supporting-text-font, var(--md-sys-typescale-body-medium-font, var(--md-ref-typeface-plain, Roboto)));--_supporting-text-line-height: var(--md-dialog-supporting-text-line-height, var(--md-sys-typescale-body-medium-line-height, 1.25rem));--_supporting-text-size: var(--md-dialog-supporting-text-size, var(--md-sys-typescale-body-medium-size, 0.875rem));--_supporting-text-weight: var(--md-dialog-supporting-text-weight, var(--md-sys-typescale-body-medium-weight, var(--md-ref-typeface-weight-regular, 400)));--_icon-color: var(--md-dialog-icon-color, var(--md-sys-color-secondary, #625b71));--_icon-size: var(--md-dialog-icon-size, 24px);--_container-shape-start-start: var( --md-dialog-container-shape-start-start, var(--_container-shape) );--_container-shape-start-end: var( --md-dialog-container-shape-start-end, var(--_container-shape) );--_container-shape-end-end: var( --md-dialog-container-shape-end-end, var(--_container-shape) );--_container-shape-end-start: var( --md-dialog-container-shape-end-start, var(--_container-shape) );border-start-start-radius:var(--_container-shape-start-start);border-start-end-radius:var(--_container-shape-start-end);border-end-end-radius:var(--_container-shape-end-end);border-end-start-radius:var(--_container-shape-end-start);display:contents;margin:auto;max-height:min(560px,100% - 48px);max-width:min(560px,100% - 48px);min-height:140px;min-width:280px;position:fixed;height:fit-content;width:fit-content}dialog{background:rgba(0,0,0,0);border:none;border-radius:inherit;flex-direction:column;height:inherit;margin:inherit;max-height:inherit;max-width:inherit;min-height:inherit;min-width:inherit;outline:none;overflow:visible;padding:0;width:inherit}dialog[open]{display:flex}::backdrop{background:none}.scrim{background:var(--md-sys-color-scrim, #000);display:none;inset:0;opacity:32%;pointer-events:none;position:fixed;z-index:1}:host([open]) .scrim{display:flex}h2{all:unset;align-self:stretch}.headline{align-items:center;color:var(--_headline-color);display:flex;flex-direction:column;font-family:var(--_headline-font);font-size:var(--_headline-size);line-height:var(--_headline-line-height);font-weight:var(--_headline-weight);position:relative}slot[name=headline]::slotted(*){align-items:center;align-self:stretch;box-sizing:border-box;display:flex;gap:8px;padding:24px 24px 0}.icon{display:flex}slot[name=icon]::slotted(*){color:var(--_icon-color);fill:currentColor;font-size:var(--_icon-size);padding-top:24px;height:var(--_icon-size);width:var(--_icon-size)}.has-icon slot[name=headline]::slotted(*){justify-content:center;padding-top:16px}.scrollable slot[name=headline]::slotted(*){padding-bottom:16px}.scrollable.has-headline slot[name=content]::slotted(*){padding-top:8px}.container{border-radius:inherit;display:flex;flex-direction:column;flex-grow:1;overflow:hidden;position:relative;transform-origin:top}.container::before{background:var(--_container-color);border-radius:inherit;content:"";inset:0;position:absolute}.scroller{display:flex;flex:1;flex-direction:column;overflow:hidden;z-index:1}.scrollable .scroller{overflow-y:scroll}.content{color:var(--_supporting-text-color);font-family:var(--_supporting-text-font);font-size:var(--_supporting-text-size);line-height:var(--_supporting-text-line-height);font-weight:var(--_supporting-text-weight);height:min-content;position:relative}slot[name=content]::slotted(*){box-sizing:border-box;padding:24px}.anchor{position:absolute}.top.anchor{top:0}.bottom.anchor{bottom:0}.actions{position:relative}slot[name=actions]::slotted(*){box-sizing:border-box;display:flex;gap:8px;justify-content:flex-end;padding:16px 24px 24px}.has-actions slot[name=content]::slotted(*){padding-bottom:8px}md-divider{display:none;position:absolute}.has-headline.show-top-divider .headline md-divider,.has-actions.show-bottom-divider .actions md-divider{display:flex}.headline md-divider{bottom:0}.actions md-divider{top:0}@media(forced-colors: active){dialog{outline:2px solid WindowText}}/*# sourceMappingURL=dialog-styles.css.map */
`

/**
 * @license
 * Copyright 2023 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */
/**
 * @summary Dialogs can require an action, communicate information, or help
 * users accomplish a task. There are two types of dialogs: basic and
 * full-screen.
 *
 * @description
 * A dialog is a modal window that appears in front of app content to provide
 * critical information or ask for a decision. Dialogs disable all app
 * functionality when they appear, and remain on screen until confirmed,
 * dismissed, or a required action has been taken.
 *
 * Dialogs are purposefully interruptive, so they should be used sparingly.
 * A less disruptive alternative is to use a menu, which provides options
 * without interrupting a user’s experience.
 *
 * On mobile devices only, complex dialogs should be displayed fullscreen.
 *
 * __Example usages:__
 * - Common use cases for basic dialogs include alerts, quick selection, and
 * confirmation.
 * - More complex dialogs may contain actions that require a series of tasks
 * to complete. One example is creating a calendar entry with the event title,
 * date, location, and time.
 */
let MdDialog = class MdDialog extends Dialog {}
MdDialog.styles = [styles$e]
MdDialog = __decorate([t$9('md-dialog')], MdDialog)

/**
 * @license
 * Copyright 2022 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */
const styles$d = i$8`:host{display:inline-flex;height:var(--_container-height);outline:none;font-family:var(--_label-text-font);font-size:var(--_label-text-size);line-height:var(--_label-text-line-height);font-weight:var(--_label-text-weight);-webkit-tap-highlight-color:rgba(0,0,0,0);vertical-align:top;--md-ripple-hover-color: var(--_hover-state-layer-color);--md-ripple-pressed-color: var(--_pressed-state-layer-color);--md-ripple-hover-opacity: var(--_hover-state-layer-opacity);--md-ripple-pressed-opacity: var(--_pressed-state-layer-opacity)}:host([touch-target=wrapper]){margin:max(0px,(48px - var(--_container-height))/2) 0}md-focus-ring{--md-focus-ring-shape-start-start: var(--_container-shape-start-start);--md-focus-ring-shape-start-end: var(--_container-shape-start-end);--md-focus-ring-shape-end-end: var(--_container-shape-end-end);--md-focus-ring-shape-end-start: var(--_container-shape-end-start)}:host([disabled]){cursor:default;pointer-events:none}.button{display:inline-flex;align-items:center;justify-content:center;box-sizing:border-box;min-inline-size:64px;border:none;outline:none;user-select:none;-webkit-appearance:none;vertical-align:middle;background:rgba(0,0,0,0);text-decoration:none;inline-size:100%;position:relative;z-index:0;height:100%;font:inherit;color:var(--_label-text-color);padding-inline-start:var(--_leading-space);padding-inline-end:var(--_trailing-space);gap:8px}.button::before{background-color:var(--_container-color);border-radius:inherit;content:"";inset:0;position:absolute}.button::-moz-focus-inner{padding:0;border:0}.button:hover{color:var(--_hover-label-text-color);cursor:pointer}.button:focus{color:var(--_focus-label-text-color)}.button:active{color:var(--_pressed-label-text-color);outline:none}.button:disabled .button__label{color:var(--_disabled-label-text-color);opacity:var(--_disabled-label-text-opacity)}.button:disabled::before{background-color:var(--_disabled-container-color);opacity:var(--_disabled-container-opacity)}@media(forced-colors: active){.button::before{content:"";box-sizing:border-box;border:1px solid CanvasText;border-radius:inherit;inset:0;pointer-events:none;position:absolute}.button:disabled{--_disabled-icon-opacity: 1;--_disabled-container-opacity: 1;--_disabled-label-text-opacity: 1}}.button,.button__ripple{border-start-start-radius:var(--_container-shape-start-start);border-start-end-radius:var(--_container-shape-start-end);border-end-start-radius:var(--_container-shape-end-start);border-end-end-radius:var(--_container-shape-end-end)}.button::after,.button::before,md-elevation,.button__ripple{z-index:-1}.button--icon-leading{padding-inline-start:var(--_with-leading-icon-leading-space);padding-inline-end:var(--_with-leading-icon-trailing-space)}.button--icon-trailing{padding-inline-start:var(--_with-trailing-icon-leading-space);padding-inline-end:var(--_with-trailing-icon-trailing-space)}.link-button-wrapper{inline-size:100%}.button ::slotted([slot=icon]){display:inline-flex;position:relative;writing-mode:horizontal-tb;fill:currentColor;color:var(--_icon-color);font-size:var(--_icon-size);inline-size:var(--_icon-size);block-size:var(--_icon-size)}.button:hover ::slotted([slot=icon]){color:var(--_hover-icon-color)}.button:focus ::slotted([slot=icon]){color:var(--_focus-icon-color)}.button:active ::slotted([slot=icon]){color:var(--_pressed-icon-color)}.button:disabled ::slotted([slot=icon]){color:var(--_disabled-icon-color);opacity:var(--_disabled-icon-opacity)}.touch{position:absolute;top:50%;height:48px;left:0;right:0;transform:translateY(-50%)}:host([touch-target=none]) .touch{display:none}/*# sourceMappingURL=shared-styles.css.map */
`

/**
 * @license
 * Copyright 2023 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */
/**
 * A key to retrieve an `Attachable` element's `AttachableController` from a
 * global `MutationObserver`.
 */
const ATTACHABLE_CONTROLLER = Symbol('attachableController')
let FOR_ATTRIBUTE_OBSERVER
{
  /**
   * A global `MutationObserver` that reacts to `for` attribute changes on
   * `Attachable` elements. If the `for` attribute changes, the controller will
   * re-attach to the new referenced element.
   */
  FOR_ATTRIBUTE_OBSERVER = new MutationObserver(records => {
    for (const record of records) {
      // When a control's `for` attribute changes, inform its
      // `AttachableController` to update to a new control.
      record.target[ATTACHABLE_CONTROLLER]?.hostConnected()
    }
  })
}
/**
 * A controller that provides an implementation for `Attachable` elements.
 *
 * @example
 * ```ts
 * class MyElement extends LitElement implements Attachable {
 *   get control() { return this.attachableController.control; }
 *
 *   private readonly attachableController = new AttachableController(
 *     this,
 *     (previousControl, newControl) => {
 *       previousControl?.removeEventListener('click', this.handleClick);
 *       newControl?.addEventListener('click', this.handleClick);
 *     }
 *   );
 *
 *   // Implement remaining `Attachable` properties/methods that call the
 *   // controller's properties/methods.
 * }
 * ```
 */
class AttachableController {
  get htmlFor() {
    return this.host.getAttribute('for')
  }
  set htmlFor(htmlFor) {
    if (htmlFor === null) {
      this.host.removeAttribute('for')
    } else {
      this.host.setAttribute('for', htmlFor)
    }
  }
  get control() {
    if (this.host.hasAttribute('for')) {
      if (!this.htmlFor || !this.host.isConnected) {
        return null
      }
      return this.host.getRootNode().querySelector(`#${this.htmlFor}`)
    }
    return this.currentControl || this.host.parentElement
  }
  set control(control) {
    if (control) {
      this.attach(control)
    } else {
      this.detach()
    }
  }
  /**
   * Creates a new controller for an `Attachable` element.
   *
   * @param host The `Attachable` element.
   * @param onControlChange A callback with two parameters for the previous and
   *     next control. An `Attachable` element may perform setup or teardown
   *     logic whenever the control changes.
   */
  constructor(host, onControlChange) {
    this.host = host
    this.onControlChange = onControlChange
    this.currentControl = null
    host.addController(this)
    host[ATTACHABLE_CONTROLLER] = this
    FOR_ATTRIBUTE_OBSERVER?.observe(host, { attributeFilter: ['for'] })
  }
  attach(control) {
    if (control === this.currentControl) {
      return
    }
    this.setCurrentControl(control)
    // When imperatively attaching, remove the `for` attribute so
    // that the attached control is used instead of a referenced one.
    this.host.removeAttribute('for')
  }
  detach() {
    this.setCurrentControl(null)
    // When imperatively detaching, add an empty `for=""` attribute. This will
    // ensure the control is `null` rather than the `parentElement`.
    this.host.setAttribute('for', '')
  }
  /** @private */
  hostConnected() {
    this.setCurrentControl(this.control)
  }
  /** @private */
  hostDisconnected() {
    this.setCurrentControl(null)
  }
  setCurrentControl(control) {
    this.onControlChange(this.currentControl, control)
    this.currentControl = control
  }
}

/**
 * @license
 * Copyright 2021 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */
/**
 * Events that the focus ring listens to.
 *
 * @fires visibility-changed Fired whenever `visible` changes.
 */
const EVENTS$1 = ['focusin', 'focusout', 'pointerdown']
/**
 * A focus ring component.
 */
class FocusRing extends s$9 {
  constructor() {
    super(...arguments)
    /**
     * Makes the focus ring visible.
     */
    this.visible = false
    /**
     * Makes the focus ring animate inwards instead of outwards.
     */
    this.inward = false
    this.attachableController = new AttachableController(
      this,
      this.onControlChange.bind(this)
    )
  }
  get htmlFor() {
    return this.attachableController.htmlFor
  }
  set htmlFor(htmlFor) {
    this.attachableController.htmlFor = htmlFor
  }
  get control() {
    return this.attachableController.control
  }
  set control(control) {
    this.attachableController.control = control
  }
  attach(control) {
    this.attachableController.attach(control)
  }
  detach() {
    this.attachableController.detach()
  }
  connectedCallback() {
    super.connectedCallback()
    // Needed for VoiceOver, which will create a "group" if the element is a
    // sibling to other content.
    this.setAttribute('aria-hidden', 'true')
  }
  /** @private */
  handleEvent(event) {
    if (event[HANDLED_BY_FOCUS_RING]) {
      // This ensures the focus ring does not activate when multiple focus rings
      // are used within a single component.
      return
    }
    switch (event.type) {
      default:
        return
      case 'focusin':
        this.visible = this.control?.matches(':focus-visible') ?? false
        break
      case 'focusout':
      case 'pointerdown':
        this.visible = false
        break
    }
    event[HANDLED_BY_FOCUS_RING] = true
  }
  onControlChange(prev, next) {
    for (const event of EVENTS$1) {
      prev?.removeEventListener(event, this)
      next?.addEventListener(event, this)
    }
  }
  update(changed) {
    if (changed.has('visible')) {
      // This logic can be removed once the `:has` selector has been introduced
      // to Firefox. This is necessary to allow correct submenu styles.
      this.dispatchEvent(new Event('visibility-changed'))
    }
    super.update(changed)
  }
}
__decorate(
  [n$b({ type: Boolean, reflect: true })],
  FocusRing.prototype,
  'visible',
  void 0
)
__decorate(
  [n$b({ type: Boolean, reflect: true })],
  FocusRing.prototype,
  'inward',
  void 0
)
const HANDLED_BY_FOCUS_RING = Symbol('handledByFocusRing')

/**
 * @license
 * Copyright 2022 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */
const styles$c = i$8`:host{animation-delay:0s,calc(var(--md-focus-ring-duration, 600ms)*.25);animation-duration:calc(var(--md-focus-ring-duration, 600ms)*.25),calc(var(--md-focus-ring-duration, 600ms)*.75);animation-timing-function:cubic-bezier(0.2, 0, 0, 1);box-sizing:border-box;color:var(--md-focus-ring-color, var(--md-sys-color-secondary, #625b71));display:none;pointer-events:none;position:absolute}:host([visible]){display:flex}:host(:not([inward])){animation-name:outward-grow,outward-shrink;border-end-end-radius:calc(var(--md-focus-ring-shape-end-end, var(--md-focus-ring-shape, 9999px)) + var(--md-focus-ring-outward-offset, 2px));border-end-start-radius:calc(var(--md-focus-ring-shape-end-start, var(--md-focus-ring-shape, 9999px)) + var(--md-focus-ring-outward-offset, 2px));border-start-end-radius:calc(var(--md-focus-ring-shape-start-end, var(--md-focus-ring-shape, 9999px)) + var(--md-focus-ring-outward-offset, 2px));border-start-start-radius:calc(var(--md-focus-ring-shape-start-start, var(--md-focus-ring-shape, 9999px)) + var(--md-focus-ring-outward-offset, 2px));inset:calc(-1*var(--md-focus-ring-outward-offset, 2px));outline:var(--md-focus-ring-width, 3px) solid currentColor}:host([inward]){animation-name:inward-grow,inward-shrink;border-end-end-radius:calc(var(--md-focus-ring-shape-end-end, var(--md-focus-ring-shape, 9999px)) - var(--md-focus-ring-inward-offset, 0px));border-end-start-radius:calc(var(--md-focus-ring-shape-end-start, var(--md-focus-ring-shape, 9999px)) - var(--md-focus-ring-inward-offset, 0px));border-start-end-radius:calc(var(--md-focus-ring-shape-start-end, var(--md-focus-ring-shape, 9999px)) - var(--md-focus-ring-inward-offset, 0px));border-start-start-radius:calc(var(--md-focus-ring-shape-start-start, var(--md-focus-ring-shape, 9999px)) - var(--md-focus-ring-inward-offset, 0px));border:var(--md-focus-ring-width, 3px) solid currentColor;inset:var(--md-focus-ring-inward-offset, 0px)}@keyframes outward-grow{from{outline-width:0}to{outline-width:var(--md-focus-ring-active-width, 8px)}}@keyframes outward-shrink{from{outline-width:var(--md-focus-ring-active-width, 8px)}}@keyframes inward-grow{from{border-width:0}to{border-width:var(--md-focus-ring-active-width, 8px)}}@keyframes inward-shrink{from{border-width:var(--md-focus-ring-active-width, 8px)}}@media(prefers-reduced-motion){:host{animation:none}}/*# sourceMappingURL=focus-ring-styles.css.map */
`

/**
 * @license
 * Copyright 2021 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */
/**
 * TODO(b/267336424): add docs
 *
 * @final
 * @suppress {visibility}
 */
let MdFocusRing = class MdFocusRing extends FocusRing {}
MdFocusRing.styles = [styles$c]
MdFocusRing = __decorate([t$9('md-focus-ring')], MdFocusRing)

/**
 * @license
 * Copyright 2022 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */
const PRESS_GROW_MS = 450
const MINIMUM_PRESS_MS = 225
const INITIAL_ORIGIN_SCALE = 0.2
const PADDING = 10
const SOFT_EDGE_MINIMUM_SIZE = 75
const SOFT_EDGE_CONTAINER_RATIO = 0.35
const PRESS_PSEUDO = '::after'
const ANIMATION_FILL = 'forwards'
/**
 * Interaction states for the ripple.
 *
 * On Touch:
 *  - `INACTIVE -> TOUCH_DELAY -> WAITING_FOR_CLICK -> INACTIVE`
 *  - `INACTIVE -> TOUCH_DELAY -> HOLDING -> WAITING_FOR_CLICK -> INACTIVE`
 *
 * On Mouse or Pen:
 *   - `INACTIVE -> WAITING_FOR_CLICK -> INACTIVE`
 */
var State
;(function(State) {
  /**
   * Initial state of the control, no touch in progress.
   *
   * Transitions:
   *   - on touch down: transition to `TOUCH_DELAY`.
   *   - on mouse down: transition to `WAITING_FOR_CLICK`.
   */
  State[(State['INACTIVE'] = 0)] = 'INACTIVE'
  /**
   * Touch down has been received, waiting to determine if it's a swipe or
   * scroll.
   *
   * Transitions:
   *   - on touch up: begin press; transition to `WAITING_FOR_CLICK`.
   *   - on cancel: transition to `INACTIVE`.
   *   - after `TOUCH_DELAY_MS`: begin press; transition to `HOLDING`.
   */
  State[(State['TOUCH_DELAY'] = 1)] = 'TOUCH_DELAY'
  /**
   * A touch has been deemed to be a press
   *
   * Transitions:
   *  - on up: transition to `WAITING_FOR_CLICK`.
   */
  State[(State['HOLDING'] = 2)] = 'HOLDING'
  /**
   * The user touch has finished, transition into rest state.
   *
   * Transitions:
   *   - on click end press; transition to `INACTIVE`.
   */
  State[(State['WAITING_FOR_CLICK'] = 3)] = 'WAITING_FOR_CLICK'
})(State || (State = {}))
/**
 * Events that the ripple listens to.
 */
const EVENTS = [
  'click',
  'contextmenu',
  'pointercancel',
  'pointerdown',
  'pointerenter',
  'pointerleave',
  'pointerup',
]
/**
 * Delay reacting to touch so that we do not show the ripple for a swipe or
 * scroll interaction.
 */
const TOUCH_DELAY_MS = 150
/**
 * A ripple component.
 */
class Ripple extends s$9 {
  constructor() {
    super(...arguments)
    /**
     * Disables the ripple.
     */
    this.disabled = false
    this.hovered = false
    this.pressed = false
    this.rippleSize = ''
    this.rippleScale = ''
    this.initialSize = 0
    this.state = State.INACTIVE
    this.checkBoundsAfterContextMenu = false
    this.attachableController = new AttachableController(
      this,
      this.onControlChange.bind(this)
    )
  }
  get htmlFor() {
    return this.attachableController.htmlFor
  }
  set htmlFor(htmlFor) {
    this.attachableController.htmlFor = htmlFor
  }
  get control() {
    return this.attachableController.control
  }
  set control(control) {
    this.attachableController.control = control
  }
  attach(control) {
    this.attachableController.attach(control)
  }
  detach() {
    this.attachableController.detach()
  }
  connectedCallback() {
    super.connectedCallback()
    // Needed for VoiceOver, which will create a "group" if the element is a
    // sibling to other content.
    this.setAttribute('aria-hidden', 'true')
  }
  render() {
    const classes = {
      hovered: this.hovered,
      pressed: this.pressed,
    }
    return x$1`<div class="surface ${e$c(classes)}"></div>`
  }
  update(changedProps) {
    if (changedProps.has('disabled') && this.disabled) {
      this.hovered = false
      this.pressed = false
    }
    super.update(changedProps)
  }
  /**
   * TODO(b/269799771): make private
   * @private only public for slider
   */
  handlePointerenter(event) {
    if (!this.shouldReactToEvent(event)) {
      return
    }
    this.hovered = true
  }
  /**
   * TODO(b/269799771): make private
   * @private only public for slider
   */
  handlePointerleave(event) {
    if (!this.shouldReactToEvent(event)) {
      return
    }
    this.hovered = false
    // release a held mouse or pen press that moves outside the element
    if (this.state !== State.INACTIVE) {
      this.endPressAnimation()
    }
  }
  handlePointerup(event) {
    if (!this.shouldReactToEvent(event)) {
      return
    }
    if (this.state === State.HOLDING) {
      this.state = State.WAITING_FOR_CLICK
      return
    }
    if (this.state === State.TOUCH_DELAY) {
      this.state = State.WAITING_FOR_CLICK
      this.startPressAnimation(this.rippleStartEvent)
      return
    }
  }
  async handlePointerdown(event) {
    if (!this.shouldReactToEvent(event)) {
      return
    }
    this.rippleStartEvent = event
    if (!this.isTouch(event)) {
      this.state = State.WAITING_FOR_CLICK
      this.startPressAnimation(event)
      return
    }
    // after a longpress contextmenu event, an extra `pointerdown` can be
    // dispatched to the pressed element. Check that the down is within
    // bounds of the element in this case.
    if (this.checkBoundsAfterContextMenu && !this.inBounds(event)) {
      return
    }
    this.checkBoundsAfterContextMenu = false
    // Wait for a hold after touch delay
    this.state = State.TOUCH_DELAY
    await new Promise(resolve => {
      setTimeout(resolve, TOUCH_DELAY_MS)
    })
    if (this.state !== State.TOUCH_DELAY) {
      return
    }
    this.state = State.HOLDING
    this.startPressAnimation(event)
  }
  handleClick() {
    // Click is a MouseEvent in Firefox and Safari, so we cannot use
    // `shouldReactToEvent`
    if (this.disabled) {
      return
    }
    if (this.state === State.WAITING_FOR_CLICK) {
      this.endPressAnimation()
      return
    }
    if (this.state === State.INACTIVE) {
      // keyboard synthesized click event
      this.startPressAnimation()
      this.endPressAnimation()
    }
  }
  handlePointercancel(event) {
    if (!this.shouldReactToEvent(event)) {
      return
    }
    this.endPressAnimation()
  }
  handleContextmenu() {
    if (this.disabled) {
      return
    }
    this.checkBoundsAfterContextMenu = true
    this.endPressAnimation()
  }
  determineRippleSize() {
    const { height, width } = this.getBoundingClientRect()
    const maxDim = Math.max(height, width)
    const softEdgeSize = Math.max(
      SOFT_EDGE_CONTAINER_RATIO * maxDim,
      SOFT_EDGE_MINIMUM_SIZE
    )
    const initialSize = Math.floor(maxDim * INITIAL_ORIGIN_SCALE)
    const hypotenuse = Math.sqrt(width ** 2 + height ** 2)
    const maxRadius = hypotenuse + PADDING
    this.initialSize = initialSize
    this.rippleScale = `${(maxRadius + softEdgeSize) / initialSize}`
    this.rippleSize = `${initialSize}px`
  }
  getNormalizedPointerEventCoords(pointerEvent) {
    const { scrollX, scrollY } = window
    const { left, top } = this.getBoundingClientRect()
    const documentX = scrollX + left
    const documentY = scrollY + top
    const { pageX, pageY } = pointerEvent
    return { x: pageX - documentX, y: pageY - documentY }
  }
  getTranslationCoordinates(positionEvent) {
    const { height, width } = this.getBoundingClientRect()
    // end in the center
    const endPoint = {
      x: (width - this.initialSize) / 2,
      y: (height - this.initialSize) / 2,
    }
    let startPoint
    if (positionEvent instanceof PointerEvent) {
      startPoint = this.getNormalizedPointerEventCoords(positionEvent)
    } else {
      startPoint = {
        x: width / 2,
        y: height / 2,
      }
    }
    // center around start point
    startPoint = {
      x: startPoint.x - this.initialSize / 2,
      y: startPoint.y - this.initialSize / 2,
    }
    return { startPoint, endPoint }
  }
  startPressAnimation(positionEvent) {
    if (!this.mdRoot) {
      return
    }
    this.pressed = true
    this.growAnimation?.cancel()
    this.determineRippleSize()
    const { startPoint, endPoint } = this.getTranslationCoordinates(
      positionEvent
    )
    const translateStart = `${startPoint.x}px, ${startPoint.y}px`
    const translateEnd = `${endPoint.x}px, ${endPoint.y}px`
    this.growAnimation = this.mdRoot.animate(
      {
        top: [0, 0],
        left: [0, 0],
        height: [this.rippleSize, this.rippleSize],
        width: [this.rippleSize, this.rippleSize],
        transform: [
          `translate(${translateStart}) scale(1)`,
          `translate(${translateEnd}) scale(${this.rippleScale})`,
        ],
      },
      {
        pseudoElement: PRESS_PSEUDO,
        duration: PRESS_GROW_MS,
        easing: EASING.STANDARD,
        fill: ANIMATION_FILL,
      }
    )
  }
  async endPressAnimation() {
    this.state = State.INACTIVE
    const animation = this.growAnimation
    let pressAnimationPlayState = Infinity
    if (typeof animation?.currentTime === 'number') {
      pressAnimationPlayState = animation.currentTime
    } else if (animation?.currentTime) {
      pressAnimationPlayState = animation.currentTime.to('ms').value
    }
    if (pressAnimationPlayState >= MINIMUM_PRESS_MS) {
      this.pressed = false
      return
    }
    await new Promise(resolve => {
      setTimeout(resolve, MINIMUM_PRESS_MS - pressAnimationPlayState)
    })
    if (this.growAnimation !== animation) {
      // A new press animation was started. The old animation was canceled and
      // should not finish the pressed state.
      return
    }
    this.pressed = false
  }
  /**
   * Returns `true` if
   *  - the ripple element is enabled
   *  - the pointer is primary for the input type
   *  - the pointer is the pointer that started the interaction, or will start
   * the interaction
   *  - the pointer is a touch, or the pointer state has the primary button
   * held, or the pointer is hovering
   */
  shouldReactToEvent(event) {
    if (this.disabled || !event.isPrimary) {
      return false
    }
    if (
      this.rippleStartEvent &&
      this.rippleStartEvent.pointerId !== event.pointerId
    ) {
      return false
    }
    if (event.type === 'pointerenter' || event.type === 'pointerleave') {
      return !this.isTouch(event)
    }
    const isPrimaryButton = event.buttons === 1
    return this.isTouch(event) || isPrimaryButton
  }
  /**
   * Check if the event is within the bounds of the element.
   *
   * This is only needed for the "stuck" contextmenu longpress on Chrome.
   */
  inBounds({ x, y }) {
    const { top, left, bottom, right } = this.getBoundingClientRect()
    return x >= left && x <= right && y >= top && y <= bottom
  }
  isTouch({ pointerType }) {
    return pointerType === 'touch'
  }
  /** @private */
  async handleEvent(event) {
    switch (event.type) {
      case 'click':
        this.handleClick()
        break
      case 'contextmenu':
        this.handleContextmenu()
        break
      case 'pointercancel':
        this.handlePointercancel(event)
        break
      case 'pointerdown':
        await this.handlePointerdown(event)
        break
      case 'pointerenter':
        this.handlePointerenter(event)
        break
      case 'pointerleave':
        this.handlePointerleave(event)
        break
      case 'pointerup':
        this.handlePointerup(event)
        break
    }
  }
  onControlChange(prev, next) {
    for (const event of EVENTS) {
      prev?.removeEventListener(event, this)
      next?.addEventListener(event, this)
    }
  }
}
__decorate(
  [n$b({ type: Boolean, reflect: true })],
  Ripple.prototype,
  'disabled',
  void 0
)
__decorate([r$8()], Ripple.prototype, 'hovered', void 0)
__decorate([r$8()], Ripple.prototype, 'pressed', void 0)
__decorate([e$g('.surface')], Ripple.prototype, 'mdRoot', void 0)

/**
 * @license
 * Copyright 2022 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */
const styles$b = i$8`:host{--_hover-color: var(--md-ripple-hover-color, var(--md-sys-color-on-surface, #1d1b20));--_hover-opacity: var(--md-ripple-hover-opacity, 0.08);--_pressed-color: var(--md-ripple-pressed-color, var(--md-sys-color-on-surface, #1d1b20));--_pressed-opacity: var(--md-ripple-pressed-opacity, 0.12);display:flex;margin:auto;pointer-events:none}:host([disabled]){display:none}@media(forced-colors: active){:host{display:none}}:host,.surface{border-radius:inherit;position:absolute;inset:0;overflow:hidden}.surface{-webkit-tap-highlight-color:rgba(0,0,0,0)}.surface::before,.surface::after{content:"";opacity:0;position:absolute}.surface::before{background-color:var(--_hover-color);inset:0;transition:opacity 15ms linear,background-color 15ms linear}.surface::after{background:radial-gradient(closest-side, var(--_pressed-color) max(100% - 70px, 65%), transparent 100%);transform-origin:center center;transition:opacity 375ms linear}.hovered::before{background-color:var(--_hover-color);opacity:var(--_hover-opacity)}.pressed::after{opacity:var(--_pressed-opacity);transition-duration:105ms}/*# sourceMappingURL=ripple-styles.css.map */
`

/**
 * @license
 * Copyright 2022 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */
/**
 * @summary Ripples, also known as state layers, are visual indicators used to
 * communicate the status of a component or interactive element.
 *
 * @description A state layer is a semi-transparent covering on an element that
 * indicates its state. State layers provide a systematic approach to
 * visualizing states by using opacity. A layer can be applied to an entire
 * element or in a circular shape and only one state layer can be applied at a
 * given time.
 *
 * @final
 * @suppress {visibility}
 */
let MdRipple = class MdRipple extends Ripple {}
MdRipple.styles = [styles$b]
MdRipple = __decorate([t$9('md-ripple')], MdRipple)

/**
 * @license
 * Copyright 2020 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */ const e$b = Symbol.for(''),
  o$a = t => {
    if (t?.r === e$b) return t?._$litStatic$
  },
  s$8 = (t, ...r) => ({
    _$litStatic$: r.reduce(
      (r, e, o) =>
        r +
        (t => {
          if (void 0 !== t._$litStatic$) return t._$litStatic$
          throw Error(
            `Value passed to 'literal' function must be a 'literal' result: ${t}. Use 'unsafeStatic' to pass non-literal values, but\n            take care to ensure page security.`
          )
        })(e) +
        t[o + 1],
      t[0]
    ),
    r: e$b,
  }),
  a$3 = new Map(),
  l$4 = t => (r, ...e) => {
    const i = e.length
    let s, l
    const n = [],
      u = []
    let c,
      $ = 0,
      f = !1
    for (; $ < i; ) {
      for (c = r[$]; $ < i && void 0 !== ((l = e[$]), (s = o$a(l))); )
        (c += s + r[++$]), (f = !0)
      $ !== i && u.push(l), n.push(c), $++
    }
    if (($ === i && n.push(r[i]), f)) {
      const t = n.join('$$lit$$')
      void 0 === (r = a$3.get(t)) && ((n.raw = n), a$3.set(t, (r = n))), (e = u)
    }
    return t(r, ...e)
  },
  n$9 = l$4(x$1)

/**
 * @license
 * Copyright 2023 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */
/**
 * A unique symbol used for protected access to an instance's
 * `ElementInternals`.
 *
 * @example
 * ```ts
 * class MyElement extends LitElement {
 *   static formAssociated = true;
 *
 *   [internals] = this.attachInternals();
 * }
 *
 * function getForm(element: MyElement) {
 *   return element[internals].form;
 * }
 * ```
 */
const internals = Symbol('internals')

/**
 * @license
 * Copyright 2023 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */
/**
 * Sets up an element's constructor to enable form submission. The element
 * instance should be form associated and have a `type` property.
 *
 * A click listener is added to each element instance. If the click is not
 * default prevented, it will submit the element's form, if any.
 *
 * @example
 * ```ts
 * class MyElement extends LitElement {
 *   static {
 *     setupFormSubmitter(MyElement);
 *   }
 *
 *   static formAssociated = true;
 *
 *   type: FormSubmitterType = 'submit';
 *
 *   [internals] = this.attachInternals();
 * }
 * ```
 *
 * @param ctor The form submitter element's constructor.
 */
function setupFormSubmitter(ctor) {
  ctor.addInitializer(instance => {
    const submitter = instance
    submitter.addEventListener('click', async event => {
      const { type, [internals]: elementInternals } = submitter
      const { form } = elementInternals
      if (!form || type === 'button') {
        return
      }
      // Wait a microtask for event bubbling to complete.
      await new Promise(resolve => {
        resolve()
      })
      if (event.defaultPrevented) {
        return
      }
      if (type === 'reset') {
        form.reset()
        return
      }
      // form.requestSubmit(submitter) does not work with form associated custom
      // elements. This patches the dispatched submit event to add the correct
      // `submitter`.
      // See https://github.com/WICG/webcomponents/issues/814
      form.addEventListener(
        'submit',
        submitEvent => {
          Object.defineProperty(submitEvent, 'submitter', {
            configurable: true,
            enumerable: true,
            get: () => submitter,
          })
        },
        { capture: true, once: true }
      )
      elementInternals.setFormValue(submitter.value)
      form.requestSubmit()
    })
  })
}

/**
 * @license
 * Copyright 2019 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */
var _a$2
/**
 * A button component.
 */
class Button extends s$9 {
  get name() {
    return this.getAttribute('name') ?? ''
  }
  set name(name) {
    this.setAttribute('name', name)
  }
  /**
   * The associated form element with which this element's value will submit.
   */
  get form() {
    return this[internals].form
  }
  constructor() {
    super()
    /**
     * Whether or not the button is disabled.
     */
    this.disabled = false
    /**
     * The URL that the link button points to.
     */
    this.href = ''
    /**
     * Where to display the linked `href` URL for a link button. Common options
     * include `_blank` to open in a new tab.
     */
    this.target = ''
    /**
     * Whether to render the icon at the inline end of the label rather than the
     * inline start.
     *
     * _Note:_ Link buttons cannot have trailing icons.
     */
    this.trailingIcon = false
    /**
     * Whether to display the icon or not.
     */
    this.hasIcon = false
    this.type = 'submit'
    this.value = ''
    /** @private */
    this[_a$2] = this /* needed for closure */.attachInternals()
    this.handleActivationClick = event => {
      if (!isActivationClick(event) || !this.buttonElement) {
        return
      }
      this.focus()
      dispatchActivationClick(this.buttonElement)
    }
    {
      this.addEventListener('click', this.handleActivationClick)
    }
  }
  focus() {
    this.buttonElement?.focus()
  }
  blur() {
    this.buttonElement?.blur()
  }
  render() {
    // Link buttons may not be disabled
    const isDisabled = this.disabled && !this.href
    const button = this.href ? s$8`a` : s$8`button`
    // Needed for closure conformance
    const { ariaLabel, ariaHasPopup, ariaExpanded } = this
    return n$9`
      <${button}
        class="button ${e$c(this.getRenderClasses())}"
        ?disabled=${isDisabled}
        aria-label="${ariaLabel || T$1}"
        aria-haspopup="${ariaHasPopup || T$1}"
        aria-expanded="${ariaExpanded || T$1}"
        href=${this.href || T$1}
        target=${this.target || T$1}
      >${this.renderContent()}</${button}>`
  }
  getRenderClasses() {
    return {
      'button--icon-leading': !this.trailingIcon && this.hasIcon,
      'button--icon-trailing': this.trailingIcon && this.hasIcon,
    }
  }
  renderContent() {
    // Link buttons may not be disabled
    const isDisabled = this.disabled && !this.href
    const icon = x$1`<slot name="icon" @slotchange="${this.handleSlotChange}"></slot>`
    return x$1`
      ${this.renderElevation?.()}
      ${this.renderOutline?.()}
      <md-focus-ring part="focus-ring"></md-focus-ring>
      <md-ripple class="button__ripple" ?disabled="${isDisabled}"></md-ripple>
      <span class="touch"></span>
      ${this.trailingIcon ? T$1 : icon}
      <span class="button__label"><slot></slot></span>
      ${this.trailingIcon ? icon : T$1}
    `
  }
  handleSlotChange() {
    this.hasIcon = this.assignedIcons.length > 0
  }
}
_a$2 = internals
;(() => {
  requestUpdateOnAriaChange(Button)
  setupFormSubmitter(Button)
})()
/** @nocollapse */
Button.formAssociated = true
/** @nocollapse */
Button.shadowRootOptions = { mode: 'open', delegatesFocus: true }
__decorate(
  [n$b({ type: Boolean, reflect: true })],
  Button.prototype,
  'disabled',
  void 0
)
__decorate([n$b()], Button.prototype, 'href', void 0)
__decorate([n$b()], Button.prototype, 'target', void 0)
__decorate(
  [n$b({ type: Boolean, attribute: 'trailing-icon' })],
  Button.prototype,
  'trailingIcon',
  void 0
)
__decorate(
  [n$b({ type: Boolean, attribute: 'has-icon' })],
  Button.prototype,
  'hasIcon',
  void 0
)
__decorate([n$b()], Button.prototype, 'type', void 0)
__decorate([n$b()], Button.prototype, 'value', void 0)
__decorate([e$g('.button')], Button.prototype, 'buttonElement', void 0)
__decorate(
  [o$c({ slot: 'icon', flatten: true })],
  Button.prototype,
  'assignedIcons',
  void 0
)

/**
 * @license
 * Copyright 2021 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */
/**
 * A text button component.
 */
class TextButton extends Button {}

/**
 * @license
 * Copyright 2022 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */
const styles$a = i$8`:host{--_container-height: var(--md-text-button-container-height, 40px);--_container-shape: var(--md-text-button-container-shape, 9999px);--_disabled-label-text-color: var(--md-text-button-disabled-label-text-color, var(--md-sys-color-on-surface, #1d1b20));--_disabled-label-text-opacity: var(--md-text-button-disabled-label-text-opacity, 0.38);--_focus-label-text-color: var(--md-text-button-focus-label-text-color, var(--md-sys-color-primary, #6750a4));--_hover-label-text-color: var(--md-text-button-hover-label-text-color, var(--md-sys-color-primary, #6750a4));--_hover-state-layer-color: var(--md-text-button-hover-state-layer-color, var(--md-sys-color-primary, #6750a4));--_hover-state-layer-opacity: var(--md-text-button-hover-state-layer-opacity, 0.08);--_label-text-color: var(--md-text-button-label-text-color, var(--md-sys-color-primary, #6750a4));--_label-text-font: var(--md-text-button-label-text-font, var(--md-sys-typescale-label-large-font, var(--md-ref-typeface-plain, Roboto)));--_label-text-line-height: var(--md-text-button-label-text-line-height, var(--md-sys-typescale-label-large-line-height, 1.25rem));--_label-text-size: var(--md-text-button-label-text-size, var(--md-sys-typescale-label-large-size, 0.875rem));--_label-text-weight: var(--md-text-button-label-text-weight, var(--md-sys-typescale-label-large-weight, var(--md-ref-typeface-weight-medium, 500)));--_pressed-label-text-color: var(--md-text-button-pressed-label-text-color, var(--md-sys-color-primary, #6750a4));--_pressed-state-layer-color: var(--md-text-button-pressed-state-layer-color, var(--md-sys-color-primary, #6750a4));--_pressed-state-layer-opacity: var(--md-text-button-pressed-state-layer-opacity, 0.12);--_disabled-icon-color: var(--md-text-button-disabled-icon-color, var(--md-sys-color-on-surface, #1d1b20));--_disabled-icon-opacity: var(--md-text-button-disabled-icon-opacity, 0.38);--_focus-icon-color: var(--md-text-button-focus-icon-color, var(--md-sys-color-primary, #6750a4));--_hover-icon-color: var(--md-text-button-hover-icon-color, var(--md-sys-color-primary, #6750a4));--_icon-color: var(--md-text-button-icon-color, var(--md-sys-color-primary, #6750a4));--_icon-size: var(--md-text-button-icon-size, 18px);--_pressed-icon-color: var(--md-text-button-pressed-icon-color, var(--md-sys-color-primary, #6750a4));--_leading-space: var(--md-text-button-leading-space, 12px);--_trailing-space: var(--md-text-button-trailing-space, 12px);--_with-leading-icon-leading-space: var(--md-text-button-with-leading-icon-leading-space, 12px);--_with-leading-icon-trailing-space: var(--md-text-button-with-leading-icon-trailing-space, 16px);--_with-trailing-icon-leading-space: var(--md-text-button-with-trailing-icon-leading-space, 16px);--_with-trailing-icon-trailing-space: var(--md-text-button-with-trailing-icon-trailing-space, 12px);--_container-color: none;--_disabled-container-color: none;--_disabled-container-opacity: 0;--_container-shape-start-start: var( --md-text-button-container-shape-start-start, var(--_container-shape) );--_container-shape-start-end: var( --md-text-button-container-shape-start-end, var(--_container-shape) );--_container-shape-end-end: var( --md-text-button-container-shape-end-end, var(--_container-shape) );--_container-shape-end-start: var( --md-text-button-container-shape-end-start, var(--_container-shape) )}/*# sourceMappingURL=text-styles.css.map */
`

/**
 * @license
 * Copyright 2021 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */
/**
 * @summary Buttons help people take action, such as sending an email, sharing a
 * document, or liking a comment.
 *
 * @description
 * __Emphasis:__ Low emphasis – For optional or supplementary actions with the
 * least amount of prominence
 *
 * __Rationale:__ Text buttons have less visual prominence, so should be used
 * for low emphasis actions, such as an alternative option.
 *
 * __Example usages:__
 * - Learn more
 * - View all
 * - Change account
 * - Turn on
 *
 * @final
 * @suppress {visibility}
 */
let MdTextButton = class MdTextButton extends TextButton {}
MdTextButton.styles = [styles$d, styles$a]
MdTextButton = __decorate([t$9('md-text-button')], MdTextButton)

/**
 * @license
 * Copyright 2022 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */
/**
 * A `ReactiveController` that provides root node-scoped single selection for
 * elements, similar to native `<input type="radio">` selection.
 *
 * To use, elements should add the controller and call
 * `selectionController.handleCheckedChange()` in a getter/setter. This must
 * be synchronous to match native behavior.
 *
 * @example
 * const CHECKED = Symbol('checked');
 *
 * class MyToggle extends LitElement {
 *   get checked() { return this[CHECKED]; }
 *   set checked(checked: boolean) {
 *     const oldValue = this.checked;
 *     if (oldValue === checked) {
 *       return;
 *     }
 *
 *     this[CHECKED] = checked;
 *     this.selectionController.handleCheckedChange();
 *     this.requestUpdate('checked', oldValue);
 *   }
 *
 *   [CHECKED] = false;
 *
 *   private selectionController = new SingleSelectionController(this);
 *
 *   constructor() {
 *     super();
 *     this.addController(this.selectionController);
 *   }
 * }
 */
class SingleSelectionController {
  constructor(host) {
    this.host = host
    this.focused = false
    this.root = null
    this.handleFocusIn = () => {
      this.focused = true
      this.updateTabIndices()
    }
    this.handleFocusOut = () => {
      this.focused = false
      this.updateTabIndices()
    }
    /**
     * Handles arrow key events from the host. Using the arrow keys will
     * select and check the next or previous sibling with the host's
     * `name` attribute.
     */
    this.handleKeyDown = event => {
      const isDown = event.key === 'ArrowDown'
      const isUp = event.key === 'ArrowUp'
      const isLeft = event.key === 'ArrowLeft'
      const isRight = event.key === 'ArrowRight'
      // Ignore non-arrow keys
      if (!isLeft && !isRight && !isDown && !isUp) {
        return
      }
      // Don't try to select another sibling if there aren't any.
      const siblings = this.getNamedSiblings()
      if (!siblings.length) {
        return
      }
      // Prevent default interactions on the element for arrow keys,
      // since this controller will introduce new behavior.
      event.preventDefault()
      // Check if moving forwards or backwards
      const isRtl = getComputedStyle(this.host).direction === 'rtl'
      const forwards = isRtl ? isLeft || isDown : isRight || isDown
      const hostIndex = siblings.indexOf(this.host)
      let nextIndex = forwards ? hostIndex + 1 : hostIndex - 1
      // Search for the next sibling that is not disabled to select.
      // If we return to the host index, there is nothing to select.
      while (nextIndex !== hostIndex) {
        if (nextIndex >= siblings.length) {
          // Return to start if moving past the last item.
          nextIndex = 0
        } else if (nextIndex < 0) {
          // Go to end if moving before the first item.
          nextIndex = siblings.length - 1
        }
        // Check if the next sibling is disabled. If so,
        // move the index and continue searching.
        const nextSibling = siblings[nextIndex]
        if (nextSibling.hasAttribute('disabled')) {
          if (forwards) {
            nextIndex++
          } else {
            nextIndex--
          }
          continue
        }
        // Uncheck and remove focusability from other siblings.
        for (const sibling of siblings) {
          if (sibling !== nextSibling) {
            sibling.checked = false
            sibling.tabIndex = -1
            sibling.blur()
          }
        }
        // The next sibling should be checked, focused and dispatch a change event
        nextSibling.checked = true
        nextSibling.tabIndex = 0
        nextSibling.focus()
        // Fire a change event since the change is triggered by a user action.
        // This matches native <input type="radio"> behavior.
        nextSibling.dispatchEvent(new Event('change', { bubbles: true }))
        break
      }
    }
  }
  hostConnected() {
    this.root = this.host.getRootNode()
    this.host.addEventListener('keydown', this.handleKeyDown)
    this.host.addEventListener('focusin', this.handleFocusIn)
    this.host.addEventListener('focusout', this.handleFocusOut)
    if (this.host.checked) {
      // Uncheck other siblings when attached if already checked. This mimics
      // native <input type="radio"> behavior.
      this.uncheckSiblings()
    }
    // Update for the newly added host.
    this.updateTabIndices()
  }
  hostDisconnected() {
    this.host.removeEventListener('keydown', this.handleKeyDown)
    this.host.removeEventListener('focusin', this.handleFocusIn)
    this.host.removeEventListener('focusout', this.handleFocusOut)
    // Update for siblings that are still connected.
    this.updateTabIndices()
    this.root = null
  }
  /**
   * Should be called whenever the host's `checked` property changes
   * synchronously.
   */
  handleCheckedChange() {
    if (!this.host.checked) {
      return
    }
    this.uncheckSiblings()
    this.updateTabIndices()
  }
  uncheckSiblings() {
    for (const sibling of this.getNamedSiblings()) {
      if (sibling !== this.host) {
        sibling.checked = false
      }
    }
  }
  /**
   * Updates the `tabindex` of the host and its siblings.
   */
  updateTabIndices() {
    // There are three tabindex states for a group of elements:
    // 1. If any are checked, that element is focusable.
    const siblings = this.getNamedSiblings()
    const checkedSibling = siblings.find(sibling => sibling.checked)
    // 2. If an element is focused, the others are no longer focusable.
    if (checkedSibling || this.focused) {
      const focusable = checkedSibling || this.host
      focusable.tabIndex = 0
      for (const sibling of siblings) {
        if (sibling !== focusable) {
          sibling.tabIndex = -1
        }
      }
      return
    }
    // 3. If none are checked or focused, all are focusable.
    for (const sibling of siblings) {
      sibling.tabIndex = 0
    }
  }
  /**
   * Retrieves all siblings in the host element's root with the same `name`
   * attribute.
   */
  getNamedSiblings() {
    const name = this.host.getAttribute('name')
    if (!name || !this.root) {
      return []
    }
    return Array.from(this.root.querySelectorAll(`[name="${name}"]`))
  }
}

/**
 * @license
 * Copyright 2018 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */
var _a$1
const CHECKED = Symbol('checked')
let maskId = 0
/**
 * A radio component.
 *
 * @fires input Dispatched when the value changes from user interaction.
 * --bubbles
 * @fires change Dispatched when the value changes from user interaction.
 * --bubbles --composed
 */
class Radio extends s$9 {
  /**
   * Whether or not the radio is selected.
   */
  get checked() {
    return this[CHECKED]
  }
  set checked(checked) {
    const wasChecked = this.checked
    if (wasChecked === checked) {
      return
    }
    this[CHECKED] = checked
    const state = String(checked)
    this.internals.setFormValue(this.checked ? this.value : null, state)
    this.requestUpdate('checked', wasChecked)
    this.selectionController.handleCheckedChange()
  }
  /**
   * The HTML name to use in form submission.
   */
  get name() {
    return this.getAttribute('name') ?? ''
  }
  set name(name) {
    this.setAttribute('name', name)
  }
  /**
   * The associated form element with which this element's value will submit.
   */
  get form() {
    return this.internals.form
  }
  /**
   * The labels this element is associated with.
   */
  get labels() {
    return this.internals.labels
  }
  constructor() {
    super()
    // Unique maskId is required because of a Safari bug that fail to persist
    // reference to the mask. This should be removed once the bug is fixed.
    this.maskId = `cutout${++maskId}`
    this[_a$1] = false
    /**
     * Whether or not the radio is disabled.
     */
    this.disabled = false
    /**
     * The element value to use in form submission when checked.
     */
    this.value = 'on'
    this.selectionController = new SingleSelectionController(this)
    this.internals = polyfillElementInternalsAria(
      this,
      this /* needed for closure */.attachInternals()
    )
    this.addController(this.selectionController)
    {
      this.internals.role = 'radio'
      this.addEventListener('click', this.handleClick.bind(this))
      this.addEventListener('keydown', this.handleKeydown.bind(this))
    }
  }
  render() {
    const classes = { checked: this.checked }
    return x$1`
      <div class="container ${e$c(classes)}" aria-hidden="true">
        <md-ripple part="ripple" .control=${this}
            ?disabled=${this.disabled}></md-ripple>
        <md-focus-ring part="focus-ring" .control=${this}></md-focus-ring>
        <svg class="icon" viewBox="0 0 20 20">
          <mask id="${this.maskId}">
            <rect width="100%" height="100%" fill="white" />
            <circle cx="10" cy="10" r="8" fill="black" />
          </mask>
          <circle class="outer circle" cx="10" cy="10" r="10"
              mask="url(#${this.maskId})" />
          <circle class="inner circle" cx="10" cy="10" r="5" />
        </svg>

        <input
          id="input"
          type="radio"
          tabindex="-1"
          .checked=${this.checked}
          .value=${this.value}
          ?disabled=${this.disabled}
        >
      </div>
    `
  }
  updated() {
    this.internals.ariaChecked = String(this.checked)
  }
  async handleClick(event) {
    if (this.disabled) {
      return
    }
    // allow event to propagate to user code after a microtask.
    await 0
    if (event.defaultPrevented) {
      return
    }
    if (isActivationClick(event)) {
      this.focus()
    }
    // Per spec, clicking on a radio input always selects it.
    this.checked = true
    this.dispatchEvent(new Event('change', { bubbles: true }))
    this.dispatchEvent(
      new InputEvent('input', { bubbles: true, composed: true })
    )
  }
  async handleKeydown(event) {
    // allow event to propagate to user code after a microtask.
    await 0
    if (event.key !== ' ' || event.defaultPrevented) {
      return
    }
    this.click()
  }
  /** @private */
  formResetCallback() {
    // The checked property does not reflect, so the original attribute set by
    // the user is used to determine the default value.
    this.checked = this.hasAttribute('checked')
  }
  /** @private */
  formStateRestoreCallback(state) {
    this.checked = state === 'true'
  }
}
_a$1 = CHECKED
;(() => {
  setupHostAria(Radio)
})()
/** @nocollapse */
Radio.formAssociated = true
__decorate([n$b({ type: Boolean })], Radio.prototype, 'checked', null)
__decorate(
  [n$b({ type: Boolean, reflect: true })],
  Radio.prototype,
  'disabled',
  void 0
)
__decorate([n$b()], Radio.prototype, 'value', void 0)

/**
 * @license
 * Copyright 2022 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */
const styles$9 = i$8`@layer{:host{--_disabled-selected-icon-color: var(--md-radio-disabled-selected-icon-color, var(--md-sys-color-on-surface, #1d1b20));--_disabled-selected-icon-opacity: var(--md-radio-disabled-selected-icon-opacity, 0.38);--_disabled-unselected-icon-color: var(--md-radio-disabled-unselected-icon-color, var(--md-sys-color-on-surface, #1d1b20));--_disabled-unselected-icon-opacity: var(--md-radio-disabled-unselected-icon-opacity, 0.38);--_icon-size: var(--md-radio-icon-size, 20px);--_selected-focus-icon-color: var(--md-radio-selected-focus-icon-color, var(--md-sys-color-primary, #6750a4));--_selected-hover-icon-color: var(--md-radio-selected-hover-icon-color, var(--md-sys-color-primary, #6750a4));--_selected-hover-state-layer-color: var(--md-radio-selected-hover-state-layer-color, var(--md-sys-color-primary, #6750a4));--_selected-hover-state-layer-opacity: var(--md-radio-selected-hover-state-layer-opacity, 0.08);--_selected-icon-color: var(--md-radio-selected-icon-color, var(--md-sys-color-primary, #6750a4));--_selected-pressed-icon-color: var(--md-radio-selected-pressed-icon-color, var(--md-sys-color-primary, #6750a4));--_selected-pressed-state-layer-color: var(--md-radio-selected-pressed-state-layer-color, var(--md-sys-color-on-surface, #1d1b20));--_selected-pressed-state-layer-opacity: var(--md-radio-selected-pressed-state-layer-opacity, 0.12);--_state-layer-size: var(--md-radio-state-layer-size, 40px);--_focus-icon-color: var(--md-radio-focus-icon-color, var(--md-sys-color-on-surface, #1d1b20));--_hover-icon-color: var(--md-radio-hover-icon-color, var(--md-sys-color-on-surface, #1d1b20));--_hover-state-layer-color: var(--md-radio-hover-state-layer-color, var(--md-sys-color-on-surface, #1d1b20));--_hover-state-layer-opacity: var(--md-radio-hover-state-layer-opacity, 0.08);--_icon-color: var(--md-radio-icon-color, var(--md-sys-color-on-surface-variant, #49454f));--_pressed-icon-color: var(--md-radio-pressed-icon-color, var(--md-sys-color-on-surface, #1d1b20));--_pressed-state-layer-color: var(--md-radio-pressed-state-layer-color, var(--md-sys-color-primary, #6750a4));--_pressed-state-layer-opacity: var(--md-radio-pressed-state-layer-opacity, 0.12);--md-ripple-hover-color: var(--_hover-state-layer-color);--md-ripple-hover-opacity: var(--_hover-state-layer-opacity);--md-ripple-pressed-color: var(--_pressed-state-layer-color);--md-ripple-pressed-opacity: var(--_pressed-state-layer-opacity);display:inline-flex;height:var(--_icon-size);outline:none;position:relative;vertical-align:top;width:var(--_icon-size);-webkit-tap-highlight-color:rgba(0,0,0,0);cursor:pointer}:host([disabled]){cursor:default}:host([touch-target=wrapper]){margin:max(0px,(48px - var(--_icon-size))/2)}.container{display:flex;height:100%;place-content:center;place-items:center;width:100%}md-focus-ring{height:44px;inset:unset;width:44px}.checked{--md-ripple-hover-color: var(--_selected-hover-state-layer-color);--md-ripple-hover-opacity: var(--_selected-hover-state-layer-opacity);--md-ripple-pressed-color: var(--_selected-pressed-state-layer-color);--md-ripple-pressed-opacity: var(--_selected-pressed-state-layer-opacity)}input{appearance:none;height:48px;margin:0;position:absolute;width:48px;cursor:inherit}:host([touch-target=none]) input{width:100%;height:100%}md-ripple{border-radius:50%;height:var(--_state-layer-size);inset:unset;width:var(--_state-layer-size)}.icon{fill:var(--_icon-color);inset:0;position:absolute}.outer.circle{transition:fill 50ms linear}.inner.circle{opacity:0;transform-origin:center;transition:opacity 50ms linear}.checked .icon{fill:var(--_selected-icon-color)}.checked .inner.circle{animation:inner-circle-grow 300ms cubic-bezier(0.05, 0.7, 0.1, 1);opacity:1}@keyframes inner-circle-grow{from{transform:scale(0)}to{transform:scale(1)}}:host([disabled]) .circle{animation-duration:0s;transition-duration:0s}:host(:hover) .icon{fill:var(--_hover-icon-color)}:host(:focus-within) .icon{fill:var(--_focus-icon-color)}:host(:active) .icon{fill:var(--_pressed-icon-color)}:host([disabled]) .icon{fill:var(--_disabled-unselected-icon-color);opacity:var(--_disabled-unselected-icon-opacity)}:host(:hover) .checked .icon{fill:var(--_selected-hover-icon-color)}:host(:focus-within) .checked .icon{fill:var(--_selected-focus-icon-color)}:host(:active) .checked .icon{fill:var(--_selected-pressed-icon-color)}:host([disabled]) .checked .icon{fill:var(--_disabled-selected-icon-color);opacity:var(--_disabled-selected-icon-opacity)}}@layer hcm{@media(forced-colors: active){.icon{fill:CanvasText}:host([disabled]) .icon{fill:GrayText;opacity:1}}}/*# sourceMappingURL=radio-styles.css.map */
`

/**
 * @license
 * Copyright 2022 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */
/**
 * @summary Radio buttons allow users to select one option from a set.
 *
 * @description
 * Radio buttons are the recommended way to allow users to make a single
 * selection from a list of options.
 *
 * Only one radio button can be selected at a time.
 *
 * Use radio buttons to:
 * - Select a single option from a set
 * - Expose all available options
 *
 * @final
 * @suppress {visibility}
 */
let MdRadio = class MdRadio extends Radio {}
MdRadio.styles = [styles$9]
MdRadio = __decorate([t$9('md-radio')], MdRadio)

/**
 * @license
 * Copyright 2019 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const t$5 = window,
  e$a =
    t$5.ShadowRoot &&
    (void 0 === t$5.ShadyCSS || t$5.ShadyCSS.nativeShadow) &&
    'adoptedStyleSheets' in Document.prototype &&
    'replace' in CSSStyleSheet.prototype,
  s$7 = Symbol(),
  n$8 = new WeakMap()
class o$9 {
  constructor(t, e, n) {
    if (((this._$cssResult$ = !0), n !== s$7))
      throw Error(
        'CSSResult is not constructable. Use `unsafeCSS` or `css` instead.'
      )
    ;(this.cssText = t), (this.t = e)
  }
  get styleSheet() {
    let t = this.o
    const s = this.t
    if (e$a && void 0 === t) {
      const e = void 0 !== s && 1 === s.length
      e && (t = n$8.get(s)),
        void 0 === t &&
          ((this.o = t = new CSSStyleSheet()).replaceSync(this.cssText),
          e && n$8.set(s, t))
    }
    return t
  }
  toString() {
    return this.cssText
  }
}
const r$4 = t => new o$9('string' == typeof t ? t : t + '', void 0, s$7),
  i$4 = (t, ...e) => {
    const n =
      1 === t.length
        ? t[0]
        : e.reduce(
            (e, s, n) =>
              e +
              (t => {
                if (!0 === t._$cssResult$) return t.cssText
                if ('number' == typeof t) return t
                throw Error(
                  "Value passed to 'css' function must be a 'css' function result: " +
                    t +
                    ". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security."
                )
              })(s) +
              t[n + 1],
            t[0]
          )
    return new o$9(n, t, s$7)
  },
  S$1 = (s, n) => {
    e$a
      ? (s.adoptedStyleSheets = n.map(t =>
          t instanceof CSSStyleSheet ? t : t.styleSheet
        ))
      : n.forEach(e => {
          const n = document.createElement('style'),
            o = t$5.litNonce
          void 0 !== o && n.setAttribute('nonce', o),
            (n.textContent = e.cssText),
            s.appendChild(n)
        })
  },
  c$2 = e$a
    ? t => t
    : t =>
        t instanceof CSSStyleSheet
          ? (t => {
              let e = ''
              for (const s of t.cssRules) e += s.cssText
              return r$4(e)
            })(t)
          : t

/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */ var s$6
const e$9 = window,
  r$3 = e$9.trustedTypes,
  h$3 = r$3 ? r$3.emptyScript : '',
  o$8 = e$9.reactiveElementPolyfillSupport,
  n$7 = {
    toAttribute(t, i) {
      switch (i) {
        case Boolean:
          t = t ? h$3 : null
          break
        case Object:
        case Array:
          t = null == t ? t : JSON.stringify(t)
      }
      return t
    },
    fromAttribute(t, i) {
      let s = t
      switch (i) {
        case Boolean:
          s = null !== t
          break
        case Number:
          s = null === t ? null : Number(t)
          break
        case Object:
        case Array:
          try {
            s = JSON.parse(t)
          } catch (t) {
            s = null
          }
      }
      return s
    },
  },
  a$2 = (t, i) => i !== t && (i == i || t == t),
  l$3 = {
    attribute: !0,
    type: String,
    converter: n$7,
    reflect: !1,
    hasChanged: a$2,
  }
class d$1 extends HTMLElement {
  constructor() {
    super(),
      (this._$Ei = new Map()),
      (this.isUpdatePending = !1),
      (this.hasUpdated = !1),
      (this._$El = null),
      this.u()
  }
  static addInitializer(t) {
    var i
    this.finalize(),
      (null !== (i = this.h) && void 0 !== i ? i : (this.h = [])).push(t)
  }
  static get observedAttributes() {
    this.finalize()
    const t = []
    return (
      this.elementProperties.forEach((i, s) => {
        const e = this._$Ep(s, i)
        void 0 !== e && (this._$Ev.set(e, s), t.push(e))
      }),
      t
    )
  }
  static createProperty(t, i = l$3) {
    if (
      (i.state && (i.attribute = !1),
      this.finalize(),
      this.elementProperties.set(t, i),
      !i.noAccessor && !this.prototype.hasOwnProperty(t))
    ) {
      const s = 'symbol' == typeof t ? Symbol() : '__' + t,
        e = this.getPropertyDescriptor(t, s, i)
      void 0 !== e && Object.defineProperty(this.prototype, t, e)
    }
  }
  static getPropertyDescriptor(t, i, s) {
    return {
      get() {
        return this[i]
      },
      set(e) {
        const r = this[t]
        ;(this[i] = e), this.requestUpdate(t, r, s)
      },
      configurable: !0,
      enumerable: !0,
    }
  }
  static getPropertyOptions(t) {
    return this.elementProperties.get(t) || l$3
  }
  static finalize() {
    if (this.hasOwnProperty('finalized')) return !1
    this.finalized = !0
    const t = Object.getPrototypeOf(this)
    if (
      (t.finalize(),
      void 0 !== t.h && (this.h = [...t.h]),
      (this.elementProperties = new Map(t.elementProperties)),
      (this._$Ev = new Map()),
      this.hasOwnProperty('properties'))
    ) {
      const t = this.properties,
        i = [
          ...Object.getOwnPropertyNames(t),
          ...Object.getOwnPropertySymbols(t),
        ]
      for (const s of i) this.createProperty(s, t[s])
    }
    return (this.elementStyles = this.finalizeStyles(this.styles)), !0
  }
  static finalizeStyles(i) {
    const s = []
    if (Array.isArray(i)) {
      const e = new Set(i.flat(1 / 0).reverse())
      for (const i of e) s.unshift(c$2(i))
    } else void 0 !== i && s.push(c$2(i))
    return s
  }
  static _$Ep(t, i) {
    const s = i.attribute
    return !1 === s
      ? void 0
      : 'string' == typeof s
      ? s
      : 'string' == typeof t
      ? t.toLowerCase()
      : void 0
  }
  u() {
    var t
    ;(this._$E_ = new Promise(t => (this.enableUpdating = t))),
      (this._$AL = new Map()),
      this._$Eg(),
      this.requestUpdate(),
      null === (t = this.constructor.h) ||
        void 0 === t ||
        t.forEach(t => t(this))
  }
  addController(t) {
    var i, s
    ;(null !== (i = this._$ES) && void 0 !== i ? i : (this._$ES = [])).push(t),
      void 0 !== this.renderRoot &&
        this.isConnected &&
        (null === (s = t.hostConnected) || void 0 === s || s.call(t))
  }
  removeController(t) {
    var i
    null === (i = this._$ES) ||
      void 0 === i ||
      i.splice(this._$ES.indexOf(t) >>> 0, 1)
  }
  _$Eg() {
    this.constructor.elementProperties.forEach((t, i) => {
      this.hasOwnProperty(i) && (this._$Ei.set(i, this[i]), delete this[i])
    })
  }
  createRenderRoot() {
    var t
    const s =
      null !== (t = this.shadowRoot) && void 0 !== t
        ? t
        : this.attachShadow(this.constructor.shadowRootOptions)
    return S$1(s, this.constructor.elementStyles), s
  }
  connectedCallback() {
    var t
    void 0 === this.renderRoot && (this.renderRoot = this.createRenderRoot()),
      this.enableUpdating(!0),
      null === (t = this._$ES) ||
        void 0 === t ||
        t.forEach(t => {
          var i
          return null === (i = t.hostConnected) || void 0 === i
            ? void 0
            : i.call(t)
        })
  }
  enableUpdating(t) {}
  disconnectedCallback() {
    var t
    null === (t = this._$ES) ||
      void 0 === t ||
      t.forEach(t => {
        var i
        return null === (i = t.hostDisconnected) || void 0 === i
          ? void 0
          : i.call(t)
      })
  }
  attributeChangedCallback(t, i, s) {
    this._$AK(t, s)
  }
  _$EO(t, i, s = l$3) {
    var e
    const r = this.constructor._$Ep(t, s)
    if (void 0 !== r && !0 === s.reflect) {
      const h = (void 0 !==
      (null === (e = s.converter) || void 0 === e ? void 0 : e.toAttribute)
        ? s.converter
        : n$7
      ).toAttribute(i, s.type)
      ;(this._$El = t),
        null == h ? this.removeAttribute(r) : this.setAttribute(r, h),
        (this._$El = null)
    }
  }
  _$AK(t, i) {
    var s
    const e = this.constructor,
      r = e._$Ev.get(t)
    if (void 0 !== r && this._$El !== r) {
      const t = e.getPropertyOptions(r),
        h =
          'function' == typeof t.converter
            ? { fromAttribute: t.converter }
            : void 0 !==
              (null === (s = t.converter) || void 0 === s
                ? void 0
                : s.fromAttribute)
            ? t.converter
            : n$7
      ;(this._$El = r),
        (this[r] = h.fromAttribute(i, t.type)),
        (this._$El = null)
    }
  }
  requestUpdate(t, i, s) {
    let e = !0
    void 0 !== t &&
      (((s = s || this.constructor.getPropertyOptions(t)).hasChanged || a$2)(
        this[t],
        i
      )
        ? (this._$AL.has(t) || this._$AL.set(t, i),
          !0 === s.reflect &&
            this._$El !== t &&
            (void 0 === this._$EC && (this._$EC = new Map()),
            this._$EC.set(t, s)))
        : (e = !1)),
      !this.isUpdatePending && e && (this._$E_ = this._$Ej())
  }
  async _$Ej() {
    this.isUpdatePending = !0
    try {
      await this._$E_
    } catch (t) {
      Promise.reject(t)
    }
    const t = this.scheduleUpdate()
    return null != t && (await t), !this.isUpdatePending
  }
  scheduleUpdate() {
    return this.performUpdate()
  }
  performUpdate() {
    var t
    if (!this.isUpdatePending) return
    this.hasUpdated,
      this._$Ei &&
        (this._$Ei.forEach((t, i) => (this[i] = t)), (this._$Ei = void 0))
    let i = !1
    const s = this._$AL
    try {
      ;(i = this.shouldUpdate(s)),
        i
          ? (this.willUpdate(s),
            null === (t = this._$ES) ||
              void 0 === t ||
              t.forEach(t => {
                var i
                return null === (i = t.hostUpdate) || void 0 === i
                  ? void 0
                  : i.call(t)
              }),
            this.update(s))
          : this._$Ek()
    } catch (t) {
      throw ((i = !1), this._$Ek(), t)
    }
    i && this._$AE(s)
  }
  willUpdate(t) {}
  _$AE(t) {
    var i
    null === (i = this._$ES) ||
      void 0 === i ||
      i.forEach(t => {
        var i
        return null === (i = t.hostUpdated) || void 0 === i ? void 0 : i.call(t)
      }),
      this.hasUpdated || ((this.hasUpdated = !0), this.firstUpdated(t)),
      this.updated(t)
  }
  _$Ek() {
    ;(this._$AL = new Map()), (this.isUpdatePending = !1)
  }
  get updateComplete() {
    return this.getUpdateComplete()
  }
  getUpdateComplete() {
    return this._$E_
  }
  shouldUpdate(t) {
    return !0
  }
  update(t) {
    void 0 !== this._$EC &&
      (this._$EC.forEach((t, i) => this._$EO(i, this[i], t)),
      (this._$EC = void 0)),
      this._$Ek()
  }
  updated(t) {}
  firstUpdated(t) {}
}
;(d$1.finalized = !0),
  (d$1.elementProperties = new Map()),
  (d$1.elementStyles = []),
  (d$1.shadowRootOptions = { mode: 'open' }),
  null == o$8 || o$8({ ReactiveElement: d$1 }),
  (null !== (s$6 = e$9.reactiveElementVersions) && void 0 !== s$6
    ? s$6
    : (e$9.reactiveElementVersions = [])
  ).push('1.6.1')

/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
var t$4
const i$3 = window,
  s$5 = i$3.trustedTypes,
  e$8 = s$5 ? s$5.createPolicy('lit-html', { createHTML: t => t }) : void 0,
  o$7 = `lit$${(Math.random() + '').slice(9)}$`,
  n$6 = '?' + o$7,
  l$2 = `<${n$6}>`,
  h$2 = document,
  r$2 = (t = '') => h$2.createComment(t),
  d = t => null === t || ('object' != typeof t && 'function' != typeof t),
  u = Array.isArray,
  c$1 = t =>
    u(t) || 'function' == typeof (null == t ? void 0 : t[Symbol.iterator]),
  v = /<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,
  a$1 = /-->/g,
  f = />/g,
  _$1 = RegExp(
    '>|[ \t\n\f\r](?:([^\\s"\'>=/]+)([ \t\n\f\r]*=[ \t\n\f\r]*(?:[^ \t\n\f\r"\'`<>=]|("|\')|))|$)',
    'g'
  ),
  m = /'/g,
  p = /"/g,
  $ = /^(?:script|style|textarea|title)$/i,
  g = t => (i, ...s) => ({ _$litType$: t, strings: i, values: s }),
  y = g(1),
  x = Symbol.for('lit-noChange'),
  b = Symbol.for('lit-nothing'),
  T = new WeakMap(),
  A$1 = h$2.createTreeWalker(h$2, 129, null, !1),
  E = (t, i) => {
    const s = t.length - 1,
      n = []
    let h,
      r = 2 === i ? '<svg>' : '',
      d = v
    for (let i = 0; i < s; i++) {
      const s = t[i]
      let e,
        u,
        c = -1,
        g = 0
      for (; g < s.length && ((d.lastIndex = g), (u = d.exec(s)), null !== u); )
        (g = d.lastIndex),
          d === v
            ? '!--' === u[1]
              ? (d = a$1)
              : void 0 !== u[1]
              ? (d = f)
              : void 0 !== u[2]
              ? ($.test(u[2]) && (h = RegExp('</' + u[2], 'g')), (d = _$1))
              : void 0 !== u[3] && (d = _$1)
            : d === _$1
            ? '>' === u[0]
              ? ((d = null != h ? h : v), (c = -1))
              : void 0 === u[1]
              ? (c = -2)
              : ((c = d.lastIndex - u[2].length),
                (e = u[1]),
                (d = void 0 === u[3] ? _$1 : '"' === u[3] ? p : m))
            : d === p || d === m
            ? (d = _$1)
            : d === a$1 || d === f
            ? (d = v)
            : ((d = _$1), (h = void 0))
      const y = d === _$1 && t[i + 1].startsWith('/>') ? ' ' : ''
      r +=
        d === v
          ? s + l$2
          : c >= 0
          ? (n.push(e), s.slice(0, c) + '$lit$' + s.slice(c) + o$7 + y)
          : s + o$7 + (-2 === c ? (n.push(void 0), i) : y)
    }
    const u = r + (t[s] || '<?>') + (2 === i ? '</svg>' : '')
    if (!Array.isArray(t) || !t.hasOwnProperty('raw'))
      throw Error('invalid template strings array')
    return [void 0 !== e$8 ? e$8.createHTML(u) : u, n]
  }
class C {
  constructor({ strings: t, _$litType$: i }, e) {
    let l
    this.parts = []
    let h = 0,
      d = 0
    const u = t.length - 1,
      c = this.parts,
      [v, a] = E(t, i)
    if (
      ((this.el = C.createElement(v, e)),
      (A$1.currentNode = this.el.content),
      2 === i)
    ) {
      const t = this.el.content,
        i = t.firstChild
      i.remove(), t.append(...i.childNodes)
    }
    for (; null !== (l = A$1.nextNode()) && c.length < u; ) {
      if (1 === l.nodeType) {
        if (l.hasAttributes()) {
          const t = []
          for (const i of l.getAttributeNames())
            if (i.endsWith('$lit$') || i.startsWith(o$7)) {
              const s = a[d++]
              if ((t.push(i), void 0 !== s)) {
                const t = l.getAttribute(s.toLowerCase() + '$lit$').split(o$7),
                  i = /([.?@])?(.*)/.exec(s)
                c.push({
                  type: 1,
                  index: h,
                  name: i[2],
                  strings: t,
                  ctor:
                    '.' === i[1]
                      ? M
                      : '?' === i[1]
                      ? k
                      : '@' === i[1]
                      ? H$1
                      : S,
                })
              } else c.push({ type: 6, index: h })
            }
          for (const i of t) l.removeAttribute(i)
        }
        if ($.test(l.tagName)) {
          const t = l.textContent.split(o$7),
            i = t.length - 1
          if (i > 0) {
            l.textContent = s$5 ? s$5.emptyScript : ''
            for (let s = 0; s < i; s++)
              l.append(t[s], r$2()),
                A$1.nextNode(),
                c.push({ type: 2, index: ++h })
            l.append(t[i], r$2())
          }
        }
      } else if (8 === l.nodeType)
        if (l.data === n$6) c.push({ type: 2, index: h })
        else {
          let t = -1
          for (; -1 !== (t = l.data.indexOf(o$7, t + 1)); )
            c.push({ type: 7, index: h }), (t += o$7.length - 1)
        }
      h++
    }
  }
  static createElement(t, i) {
    const s = h$2.createElement('template')
    return (s.innerHTML = t), s
  }
}
function P$1(t, i, s = t, e) {
  var o, n, l, h
  if (i === x) return i
  let r =
    void 0 !== e
      ? null === (o = s._$Co) || void 0 === o
        ? void 0
        : o[e]
      : s._$Cl
  const u = d(i) ? void 0 : i._$litDirective$
  return (
    (null == r ? void 0 : r.constructor) !== u &&
      (null === (n = null == r ? void 0 : r._$AO) ||
        void 0 === n ||
        n.call(r, !1),
      void 0 === u ? (r = void 0) : ((r = new u(t)), r._$AT(t, s, e)),
      void 0 !== e
        ? ((null !== (l = (h = s)._$Co) && void 0 !== l ? l : (h._$Co = []))[
            e
          ] = r)
        : (s._$Cl = r)),
    void 0 !== r && (i = P$1(t, r._$AS(t, i.values), r, e)),
    i
  )
}
class V$1 {
  constructor(t, i) {
    ;(this.u = []), (this._$AN = void 0), (this._$AD = t), (this._$AM = i)
  }
  get parentNode() {
    return this._$AM.parentNode
  }
  get _$AU() {
    return this._$AM._$AU
  }
  v(t) {
    var i
    const {
        el: { content: s },
        parts: e,
      } = this._$AD,
      o = (null !== (i = null == t ? void 0 : t.creationScope) && void 0 !== i
        ? i
        : h$2
      ).importNode(s, !0)
    A$1.currentNode = o
    let n = A$1.nextNode(),
      l = 0,
      r = 0,
      d = e[0]
    for (; void 0 !== d; ) {
      if (l === d.index) {
        let i
        2 === d.type
          ? (i = new N$1(n, n.nextSibling, this, t))
          : 1 === d.type
          ? (i = new d.ctor(n, d.name, d.strings, this, t))
          : 6 === d.type && (i = new I$1(n, this, t)),
          this.u.push(i),
          (d = e[++r])
      }
      l !== (null == d ? void 0 : d.index) && ((n = A$1.nextNode()), l++)
    }
    return o
  }
  p(t) {
    let i = 0
    for (const s of this.u)
      void 0 !== s &&
        (void 0 !== s.strings
          ? (s._$AI(t, s, i), (i += s.strings.length - 2))
          : s._$AI(t[i])),
        i++
  }
}
class N$1 {
  constructor(t, i, s, e) {
    var o
    ;(this.type = 2),
      (this._$AH = b),
      (this._$AN = void 0),
      (this._$AA = t),
      (this._$AB = i),
      (this._$AM = s),
      (this.options = e),
      (this._$Cm =
        null === (o = null == e ? void 0 : e.isConnected) || void 0 === o || o)
  }
  get _$AU() {
    var t, i
    return null !==
      (i = null === (t = this._$AM) || void 0 === t ? void 0 : t._$AU) &&
      void 0 !== i
      ? i
      : this._$Cm
  }
  get parentNode() {
    let t = this._$AA.parentNode
    const i = this._$AM
    return void 0 !== i && 11 === t.nodeType && (t = i.parentNode), t
  }
  get startNode() {
    return this._$AA
  }
  get endNode() {
    return this._$AB
  }
  _$AI(t, i = this) {
    ;(t = P$1(this, t, i)),
      d(t)
        ? t === b || null == t || '' === t
          ? (this._$AH !== b && this._$AR(), (this._$AH = b))
          : t !== this._$AH && t !== x && this.g(t)
        : void 0 !== t._$litType$
        ? this.$(t)
        : void 0 !== t.nodeType
        ? this.T(t)
        : c$1(t)
        ? this.k(t)
        : this.g(t)
  }
  O(t, i = this._$AB) {
    return this._$AA.parentNode.insertBefore(t, i)
  }
  T(t) {
    this._$AH !== t && (this._$AR(), (this._$AH = this.O(t)))
  }
  g(t) {
    this._$AH !== b && d(this._$AH)
      ? (this._$AA.nextSibling.data = t)
      : this.T(h$2.createTextNode(t)),
      (this._$AH = t)
  }
  $(t) {
    var i
    const { values: s, _$litType$: e } = t,
      o =
        'number' == typeof e
          ? this._$AC(t)
          : (void 0 === e.el && (e.el = C.createElement(e.h, this.options)), e)
    if ((null === (i = this._$AH) || void 0 === i ? void 0 : i._$AD) === o)
      this._$AH.p(s)
    else {
      const t = new V$1(o, this),
        i = t.v(this.options)
      t.p(s), this.T(i), (this._$AH = t)
    }
  }
  _$AC(t) {
    let i = T.get(t.strings)
    return void 0 === i && T.set(t.strings, (i = new C(t))), i
  }
  k(t) {
    u(this._$AH) || ((this._$AH = []), this._$AR())
    const i = this._$AH
    let s,
      e = 0
    for (const o of t)
      e === i.length
        ? i.push(
            (s = new N$1(this.O(r$2()), this.O(r$2()), this, this.options))
          )
        : (s = i[e]),
        s._$AI(o),
        e++
    e < i.length && (this._$AR(s && s._$AB.nextSibling, e), (i.length = e))
  }
  _$AR(t = this._$AA.nextSibling, i) {
    var s
    for (
      null === (s = this._$AP) || void 0 === s || s.call(this, !1, !0, i);
      t && t !== this._$AB;

    ) {
      const i = t.nextSibling
      t.remove(), (t = i)
    }
  }
  setConnected(t) {
    var i
    void 0 === this._$AM &&
      ((this._$Cm = t),
      null === (i = this._$AP) || void 0 === i || i.call(this, t))
  }
}
class S {
  constructor(t, i, s, e, o) {
    ;(this.type = 1),
      (this._$AH = b),
      (this._$AN = void 0),
      (this.element = t),
      (this.name = i),
      (this._$AM = e),
      (this.options = o),
      s.length > 2 || '' !== s[0] || '' !== s[1]
        ? ((this._$AH = Array(s.length - 1).fill(new String())),
          (this.strings = s))
        : (this._$AH = b)
  }
  get tagName() {
    return this.element.tagName
  }
  get _$AU() {
    return this._$AM._$AU
  }
  _$AI(t, i = this, s, e) {
    const o = this.strings
    let n = !1
    if (void 0 === o)
      (t = P$1(this, t, i, 0)),
        (n = !d(t) || (t !== this._$AH && t !== x)),
        n && (this._$AH = t)
    else {
      const e = t
      let l, h
      for (t = o[0], l = 0; l < o.length - 1; l++)
        (h = P$1(this, e[s + l], i, l)),
          h === x && (h = this._$AH[l]),
          n || (n = !d(h) || h !== this._$AH[l]),
          h === b ? (t = b) : t !== b && (t += (null != h ? h : '') + o[l + 1]),
          (this._$AH[l] = h)
    }
    n && !e && this.j(t)
  }
  j(t) {
    t === b
      ? this.element.removeAttribute(this.name)
      : this.element.setAttribute(this.name, null != t ? t : '')
  }
}
class M extends S {
  constructor() {
    super(...arguments), (this.type = 3)
  }
  j(t) {
    this.element[this.name] = t === b ? void 0 : t
  }
}
const R = s$5 ? s$5.emptyScript : ''
class k extends S {
  constructor() {
    super(...arguments), (this.type = 4)
  }
  j(t) {
    t && t !== b
      ? this.element.setAttribute(this.name, R)
      : this.element.removeAttribute(this.name)
  }
}
class H$1 extends S {
  constructor(t, i, s, e, o) {
    super(t, i, s, e, o), (this.type = 5)
  }
  _$AI(t, i = this) {
    var s
    if ((t = null !== (s = P$1(this, t, i, 0)) && void 0 !== s ? s : b) === x)
      return
    const e = this._$AH,
      o =
        (t === b && e !== b) ||
        t.capture !== e.capture ||
        t.once !== e.once ||
        t.passive !== e.passive,
      n = t !== b && (e === b || o)
    o && this.element.removeEventListener(this.name, this, e),
      n && this.element.addEventListener(this.name, this, t),
      (this._$AH = t)
  }
  handleEvent(t) {
    var i, s
    'function' == typeof this._$AH
      ? this._$AH.call(
          null !==
            (s =
              null === (i = this.options) || void 0 === i ? void 0 : i.host) &&
            void 0 !== s
            ? s
            : this.element,
          t
        )
      : this._$AH.handleEvent(t)
  }
}
class I$1 {
  constructor(t, i, s) {
    ;(this.element = t),
      (this.type = 6),
      (this._$AN = void 0),
      (this._$AM = i),
      (this.options = s)
  }
  get _$AU() {
    return this._$AM._$AU
  }
  _$AI(t) {
    P$1(this, t)
  }
}
const z$1 = i$3.litHtmlPolyfillSupport
null == z$1 || z$1(C, N$1),
  (null !== (t$4 = i$3.litHtmlVersions) && void 0 !== t$4
    ? t$4
    : (i$3.litHtmlVersions = [])
  ).push('2.6.1')
const Z = (t, i, s) => {
  var e, o
  const n =
    null !== (e = null == s ? void 0 : s.renderBefore) && void 0 !== e ? e : i
  let l = n._$litPart$
  if (void 0 === l) {
    const t =
      null !== (o = null == s ? void 0 : s.renderBefore) && void 0 !== o
        ? o
        : null
    n._$litPart$ = l = new N$1(
      i.insertBefore(r$2(), t),
      t,
      void 0,
      null != s ? s : {}
    )
  }
  return l._$AI(t), l
}

/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */ var l$1, o$6
class s$4 extends d$1 {
  constructor() {
    super(...arguments),
      (this.renderOptions = { host: this }),
      (this._$Do = void 0)
  }
  createRenderRoot() {
    var t, e
    const i = super.createRenderRoot()
    return (
      (null !== (t = (e = this.renderOptions).renderBefore) && void 0 !== t) ||
        (e.renderBefore = i.firstChild),
      i
    )
  }
  update(t) {
    const i = this.render()
    this.hasUpdated || (this.renderOptions.isConnected = this.isConnected),
      super.update(t),
      (this._$Do = Z(i, this.renderRoot, this.renderOptions))
  }
  connectedCallback() {
    var t
    super.connectedCallback(),
      null === (t = this._$Do) || void 0 === t || t.setConnected(!0)
  }
  disconnectedCallback() {
    var t
    super.disconnectedCallback(),
      null === (t = this._$Do) || void 0 === t || t.setConnected(!1)
  }
  render() {
    return x
  }
}
;(s$4.finalized = !0),
  (s$4._$litElement$ = !0),
  null === (l$1 = globalThis.litElementHydrateSupport) ||
    void 0 === l$1 ||
    l$1.call(globalThis, { LitElement: s$4 })
const n$5 = globalThis.litElementPolyfillSupport
null == n$5 || n$5({ LitElement: s$4 })
;(null !== (o$6 = globalThis.litElementVersions) && void 0 !== o$6
  ? o$6
  : (globalThis.litElementVersions = [])
).push('3.2.2')

/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const e$7 = e => n =>
  'function' == typeof n
    ? ((e, n) => (customElements.define(e, n), n))(e, n)
    : ((e, n) => {
        const { kind: t, elements: s } = n
        return {
          kind: t,
          elements: s,
          finisher(n) {
            customElements.define(e, n)
          },
        }
      })(e, n)

/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const i$2 = (i, e) =>
  'method' === e.kind && e.descriptor && !('value' in e.descriptor)
    ? {
        ...e,
        finisher(n) {
          n.createProperty(e.key, i)
        },
      }
    : {
        kind: 'field',
        key: Symbol(),
        placement: 'own',
        descriptor: {},
        originalKey: e.key,
        initializer() {
          'function' == typeof e.initializer &&
            (this[e.key] = e.initializer.call(this))
        },
        finisher(n) {
          n.createProperty(e.key, i)
        },
      }
function e$6(e) {
  return (n, t) =>
    void 0 !== t
      ? ((i, e, n) => {
          e.constructor.createProperty(n, i)
        })(e, n, t)
      : i$2(e, n)
}

/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */ function t$3(t) {
  return e$6({ ...t, state: !0 })
}

/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const o$5 = ({ finisher: e, descriptor: t }) => (o, n) => {
  var r
  if (void 0 === n) {
    const n = null !== (r = o.originalKey) && void 0 !== r ? r : o.key,
      i =
        null != t
          ? {
              kind: 'method',
              placement: 'prototype',
              key: n,
              descriptor: t(o.key),
            }
          : { ...o, key: n }
    return (
      null != e &&
        (i.finisher = function(t) {
          e(t, n)
        }),
      i
    )
  }
  {
    const r = o.constructor
    void 0 !== t && Object.defineProperty(o, n, t(n)), null == e || e(r, n)
  }
}

/**
 * @license
 * Copyright 2021 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */ var n$4
null !=
(null === (n$4 = window.HTMLSlotElement) || void 0 === n$4
  ? void 0
  : n$4.prototype.assignedElements)
  ? (o, n) => o.assignedElements(n)
  : (o, n) => o.assignedNodes(n).filter(o => o.nodeType === Node.ELEMENT_NODE)

var selectState = {}

/**
 * @license
 * Copyright 2021 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
class s$3 extends Event {
  constructor(s, t, e) {
    super('context-request', { bubbles: !0, composed: !0 }),
      (this.context = s),
      (this.callback = t),
      (this.subscribe = e)
  }
}

/**
 * @license
 * Copyright 2021 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
function n$3(n) {
  return n
}

/**
 * @license
 * Copyright 2021 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */ class s$2 {
  constructor(t, s, i, h = !1) {
    ;(this.host = t),
      (this.context = s),
      (this.callback = i),
      (this.subscribe = h),
      (this.provided = !1),
      (this.value = void 0),
      this.host.addController(this)
  }
  hostConnected() {
    this.dispatchRequest()
  }
  hostDisconnected() {
    this.unsubscribe && (this.unsubscribe(), (this.unsubscribe = void 0))
  }
  dispatchRequest() {
    this.host.dispatchEvent(
      new s$3(
        this.context,
        (t, s) => {
          this.unsubscribe &&
            (this.unsubscribe !== s &&
              ((this.provided = !1), this.unsubscribe()),
            this.subscribe || this.unsubscribe()),
            (this.value = t),
            this.host.requestUpdate(),
            (this.provided && !this.subscribe) ||
              ((this.provided = !0), this.callback && this.callback(t, s)),
            (this.unsubscribe = s)
        },
        this.subscribe
      )
    )
  }
}

/**
 * @license
 * Copyright 2021 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
class t$2 {
  constructor(t) {
    ;(this.callbacks = new Map()),
      (this.updateObservers = () => {
        for (const [t, s] of this.callbacks) t(this.t, s)
      }),
      void 0 !== t && (this.value = t)
  }
  get value() {
    return this.t
  }
  set value(t) {
    this.setValue(t)
  }
  setValue(t, s = !1) {
    const i = s || !Object.is(t, this.t)
    ;(this.t = t), i && this.updateObservers()
  }
  addCallback(t, s) {
    s &&
      (this.callbacks.has(t) ||
        this.callbacks.set(t, () => {
          this.callbacks.delete(t)
        })),
      t(this.value)
  }
  clearCallbacks() {
    this.callbacks.clear()
  }
}

/**
 * @license
 * Copyright 2021 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */ class s$1 extends Event {
  constructor(t) {
    super('context-provider', { bubbles: !0, composed: !0 }), (this.context = t)
  }
}
class e$5 extends t$2 {
  constructor(t, s, e) {
    super(e),
      (this.host = t),
      (this.context = s),
      (this.onContextRequest = t => {
        t.context === this.context &&
          t.composedPath()[0] !== this.host &&
          (t.stopPropagation(), this.addCallback(t.callback, t.subscribe))
      }),
      this.attachListeners(),
      this.host.addController(this)
  }
  attachListeners() {
    this.host.addEventListener('context-request', this.onContextRequest)
  }
  hostConnected() {
    this.host.dispatchEvent(new s$1(this.context))
  }
}

/**
 * @license
 * Copyright 2021 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */ class e$4 {
  constructor() {
    ;(this.pendingContextRequests = new Map()),
      (this.onContextProvider = e => {
        const s = this.pendingContextRequests.get(e.context)
        s &&
          (this.pendingContextRequests.delete(e.context),
          s.forEach(s => {
            const c = s.element,
              i = s.callback
            c && c.dispatchEvent(new s$3(e.context, i, !0))
          }))
      }),
      (this.onContextRequest = t => {
        if (!t.subscribe) return
        const e = { element: t.target, callback: t.callback }
        let s = this.pendingContextRequests.get(t.context)
        s || ((s = new Set()), this.pendingContextRequests.set(t.context, s)),
          s.add(e)
      })
  }
  attach(t) {
    t.addEventListener('context-request', this.onContextRequest),
      t.addEventListener('context-provider', this.onContextProvider)
  }
  detach(t) {
    t.removeEventListener('context-request', this.onContextRequest),
      t.removeEventListener('context-provider', this.onContextProvider)
  }
}

/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */ function o$4({ context: o }) {
  return o$5({
    finisher: (t, n) => {
      const r = new WeakMap()
      t.addInitializer(t => {
        r.set(t, new e$5(t, o))
      })
      const i = Object.getOwnPropertyDescriptor(t.prototype, n),
        c = null == i ? void 0 : i.set,
        s = {
          ...i,
          set: function(t) {
            var e
            null === (e = r.get(this)) || void 0 === e || e.setValue(t),
              c && c.call(this, t)
          },
        }
      Object.defineProperty(t.prototype, n, s)
    },
  })
}

/**
 * @license
 * Copyright 2022 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */ function t$1({ context: t, subscribe: o }) {
  return o$5({
    finisher: (e, n) => {
      e.addInitializer(e => {
        new s$2(
          e,
          t,
          r => {
            e[n] = r
          },
          o
        )
      })
    },
  })
}

/**
 * @license
 * Copyright 2021 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */ const e$3 = o$4,
  r$1 = t$1

var context = /*#__PURE__*/ Object.freeze({
  __proto__: null,
  contextProvided: r$1,
  contextProvider: e$3,
  ContextEvent: s$3,
  createContext: n$3,
  ContextConsumer: s$2,
  ContextProvider: e$5,
  ContextRoot: e$4,
  provide: o$4,
  consume: t$1,
})

var require$$0 = /*@__PURE__*/ getAugmentedNamespace(context)

var selectController = {}

;(function(exports) {
  Object.defineProperty(exports, '__esModule', { value: true })
  exports.connectSelector = exports.SelectorController = exports.getSnapshot = exports.getServiceSnapshot = exports.isActorWithState = exports.isService = exports.defaultCompare = void 0
  const defaultCompare = (a, b) => a === b
  exports.defaultCompare = defaultCompare
  function isService(actor) {
    return 'state' in actor && 'machine' in actor
  }
  exports.isService = isService
  function isActorWithState(actorRef) {
    return 'state' in actorRef
  }
  exports.isActorWithState = isActorWithState
  function getServiceSnapshot(service) {
    return service.status !== 0
      ? service.getSnapshot()
      : service.machine.initialState
  }
  exports.getServiceSnapshot = getServiceSnapshot
  function getSnapshot(actorRef) {
    if (isService(actorRef)) {
      return getServiceSnapshot(actorRef)
    }
    return isActorWithState(actorRef) ? actorRef.state : undefined
  }
  exports.getSnapshot = getSnapshot
  class SelectorController {
    host
    subscription
    selected
    constructor(host, actorRef, selector, compare = exports.defaultCompare) {
      this.host = host
      this.host.addController(this)
      this.selected = selector(getSnapshot(actorRef))
      this.subscription = actorRef.subscribe(emitted => {
        const nextSelected = selector(emitted)
        if (!compare(this.selected, nextSelected)) {
          this.selected = nextSelected
          this.host.requestUpdate()
        }
      })
    }
    get value() {
      return this.selected
    }
    hostDisconnected() {
      this.subscription.unsubscribe()
    }
  }
  exports.SelectorController = SelectorController
  function connectSelector(
    host,
    actorRef,
    selector,
    compare = exports.defaultCompare
  ) {
    return new SelectorController(host, actorRef, selector, compare)
  }
  exports.connectSelector = connectSelector
})(selectController)

Object.defineProperty(selectState, '__esModule', { value: true })
selectState.compareObjects = compareArrays_1 = selectState.compareArrays = connectState_1 = selectState.connectState = selectState.SelectState = void 0
const context_1 = require$$0
const select_controller_js_1 = selectController
class SelectState {
  serviceContext
  selectorController
  host
  selector
  compare // if current value same as old value, return true
  constructor(
    context,
    host,
    selector,
    compare = select_controller_js_1.defaultCompare
  ) {
    ;(this.host = host).addController(this)
    this.serviceContext = new context_1.ContextConsumer(
      this.host,
      context,
      undefined,
      true
    )
    this.selector = selector
    this.compare = compare
  }
  hostConnected() {
    // has hostConnected already been called?
    if (this.selectorController) {
      this.hostDisconnected()
    }
    this.serviceContext.hostConnected()
    this.selectorController = new select_controller_js_1.SelectorController(
      this.host,
      this.serviceContext.value.service,
      this.selector,
      this.compare
    )
  }
  hostDisconnected() {
    this.serviceContext?.hostDisconnected()
    this.selectorController?.hostDisconnected()
  }
  get value() {
    return this.selectorController?.value
  }
}
selectState.SelectState = SelectState
// Factory function for SelectState
function connectState(
  context,
  host,
  selector,
  compare = select_controller_js_1.defaultCompare
) {
  return new SelectState(context, host, selector, compare)
}
var connectState_1 = (selectState.connectState = connectState)
const compareArrays = (a, b) =>
  a.length === b.length && a.every((value, idx) => value === b[idx])
var compareArrays_1 = (selectState.compareArrays = compareArrays)
const compareObjects = (obj1, obj2) =>
  Object.keys(obj1).length === Object.keys(obj2).length &&
  Object.keys(obj1).every(key => {
    return (
      Object.prototype.hasOwnProperty.call(obj2, key) && obj1[key] === obj2[key]
    )
  })
selectState.compareObjects = compareObjects

// "Inject" XState context into components with DOM events
const viewerContext = n$3('viewer-context')
let appContext
const setContext = context => {
  appContext = context
}

/**
 * @license
 * Copyright 2020 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */ const e$2 = o => void 0 === o.strings

/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const t = {
    ATTRIBUTE: 1,
    CHILD: 2,
    PROPERTY: 3,
    BOOLEAN_ATTRIBUTE: 4,
    EVENT: 5,
    ELEMENT: 6,
  },
  e$1 = t => (...e) => ({ _$litDirective$: t, values: e })
class i$1 {
  constructor(t) {}
  get _$AU() {
    return this._$AM._$AU
  }
  _$AT(t, e, i) {
    ;(this._$Ct = t), (this._$AM = e), (this._$Ci = i)
  }
  _$AS(t, e) {
    return this.update(t, e)
  }
  update(t, e) {
    return this.render(...e)
  }
}

/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */ const s = (i, t) => {
    var e, o
    const r = i._$AN
    if (void 0 === r) return !1
    for (const i of r)
      null === (o = (e = i)._$AO) || void 0 === o || o.call(e, t, !1), s(i, t)
    return !0
  },
  o$3 = i => {
    let t, e
    do {
      if (void 0 === (t = i._$AM)) break
      ;(e = t._$AN), e.delete(i), (i = t)
    } while (0 === (null == e ? void 0 : e.size))
  },
  r = i => {
    for (let t; (t = i._$AM); i = t) {
      let e = t._$AN
      if (void 0 === e) t._$AN = e = new Set()
      else if (e.has(i)) break
      e.add(i), l(t)
    }
  }
function n$2(i) {
  void 0 !== this._$AN ? (o$3(this), (this._$AM = i), r(this)) : (this._$AM = i)
}
function h$1(i, t = !1, e = 0) {
  const r = this._$AH,
    n = this._$AN
  if (void 0 !== n && 0 !== n.size)
    if (t)
      if (Array.isArray(r))
        for (let i = e; i < r.length; i++) s(r[i], !1), o$3(r[i])
      else null != r && (s(r, !1), o$3(r))
    else s(this, i)
}
const l = i => {
  var t$1, s, o, r
  i.type == t.CHILD &&
    ((null !== (t$1 = (o = i)._$AP) && void 0 !== t$1) || (o._$AP = h$1),
    (null !== (s = (r = i)._$AQ) && void 0 !== s) || (r._$AQ = n$2))
}
class c extends i$1 {
  constructor() {
    super(...arguments), (this._$AN = void 0)
  }
  _$AT(i, t, e) {
    super._$AT(i, t, e), r(this), (this.isConnected = i._$AU)
  }
  _$AO(i, t = !0) {
    var e, r
    i !== this.isConnected &&
      ((this.isConnected = i),
      i
        ? null === (e = this.reconnected) || void 0 === e || e.call(this)
        : null === (r = this.disconnected) || void 0 === r || r.call(this)),
      t && (s(this, i), o$3(this))
  }
  setValue(t) {
    if (e$2(this._$Ct)) this._$Ct._$AI(t, this)
    else {
      const i = [...this._$Ct._$AH]
      ;(i[this._$Ci] = t), this._$Ct._$AI(i, this, 0)
    }
  }
  disconnected() {}
  reconnected() {}
}

/**
 * @license
 * Copyright 2020 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */ const e = () => new o$2()
class o$2 {}
const h = new WeakMap(),
  n$1 = e$1(
    class extends c {
      render(t) {
        return b
      }
      update(t, [s]) {
        var e
        const o = s !== this.Y
        return (
          o && void 0 !== this.Y && this.rt(void 0),
          (o || this.lt !== this.ct) &&
            ((this.Y = s),
            (this.dt =
              null === (e = t.options) || void 0 === e ? void 0 : e.host),
            this.rt((this.ct = t.element))),
          b
        )
      }
      rt(i) {
        var t
        if ('function' == typeof this.Y) {
          const s = null !== (t = this.dt) && void 0 !== t ? t : globalThis
          let e = h.get(s)
          void 0 === e && ((e = new WeakMap()), h.set(s, e)),
            void 0 !== e.get(this.Y) && this.Y.call(this.dt, void 0),
            e.set(this.Y, i),
            void 0 !== i && this.Y.call(this.dt, i)
        } else this.Y.value = i
      }
      get lt() {
        var i, t, s
        return 'function' == typeof this.Y
          ? null ===
              (t = h.get(
                null !== (i = this.dt) && void 0 !== i ? i : globalThis
              )) || void 0 === t
            ? void 0
            : t.get(this.Y)
          : null === (s = this.Y) || void 0 === s
          ? void 0
          : s.value
      }
      disconnected() {
        this.lt === this.ct && this.rt(void 0)
      }
      reconnected() {
        this.rt(this.ct)
      }
    }
  )

/**
 * @license
 * Copyright 2021 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
function* o$1(o, f) {
  if (void 0 !== o) {
    let i = 0
    for (const t of o) yield f(t, i++)
  }
}

/**
 * @license
 * Copyright 2022 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */
/**
 * A component for elevation.
 */
class Elevation extends s$9 {
  connectedCallback() {
    super.connectedCallback()
    // Needed for VoiceOver, which will create a "group" if the element is a
    // sibling to other content.
    this.setAttribute('aria-hidden', 'true')
  }
  render() {
    return x$1`<span class="shadow"></span>`
  }
}

/**
 * @license
 * Copyright 2022 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */
const styles$8 = i$8`:host{--_level: var(--md-elevation-level, 0);--_shadow-color: var(--md-elevation-shadow-color, var(--md-sys-color-shadow, #000));display:flex;pointer-events:none}:host,.shadow,.shadow::before,.shadow::after{border-radius:inherit;inset:0;position:absolute;transition-duration:inherit;transition-property:inherit;transition-timing-function:inherit}.shadow::before,.shadow::after{content:"";transition-property:box-shadow,opacity}.shadow::before{box-shadow:0px calc(1px*(clamp(0,var(--_level),1) + clamp(0,var(--_level) - 3,1) + 2*clamp(0,var(--_level) - 4,1))) calc(1px*(2*clamp(0,var(--_level),1) + clamp(0,var(--_level) - 2,1) + clamp(0,var(--_level) - 4,1))) 0px var(--_shadow-color);opacity:.3}.shadow::after{box-shadow:0px calc(1px*(clamp(0,var(--_level),1) + clamp(0,var(--_level) - 1,1) + 2*clamp(0,var(--_level) - 2,3))) calc(1px*(3*clamp(0,var(--_level),2) + 2*clamp(0,var(--_level) - 2,3))) calc(1px*(clamp(0,var(--_level),4) + 2*clamp(0,var(--_level) - 4,1))) var(--_shadow-color);opacity:.15}/*# sourceMappingURL=elevation-styles.css.map */
`

/**
 * @license
 * Copyright 2022 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */
/**
 * The `<md-elevation>` custom element with default styles.
 *
 * Elevation is the relative distance between two surfaces along the z-axis.
 */
let MdElevation = class MdElevation extends Elevation {}
MdElevation.styles = [styles$8]
MdElevation = __decorate([t$9('md-elevation')], MdElevation)

/**
 * @license
 * Copyright 2018 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */ const n = 'important',
  i = ' !' + n,
  o = e$d(
    class extends i$5 {
      constructor(t) {
        if (
          (super(t),
          t.type !== t$6.ATTRIBUTE ||
            'style' !== t.name ||
            t.strings?.length > 2)
        )
          throw Error(
            'The `styleMap` directive must be used in the `style` attribute and must be the only part in the attribute.'
          )
      }
      render(t) {
        return Object.keys(t).reduce((e, r) => {
          const s = t[r]
          return null == s
            ? e
            : e +
                `${(r = r.includes('-')
                  ? r
                  : r
                      .replace(/(?:^(webkit|moz|ms|o)|)(?=[A-Z])/g, '-$&')
                      .toLowerCase())}:${s};`
        }, '')
      }
      update(e, [r]) {
        const { style: s } = e.element
        if (void 0 === this.ut)
          return (this.ut = new Set(Object.keys(r))), this.render(r)
        for (const t of this.ut)
          null == r[t] &&
            (this.ut.delete(t),
            t.includes('-') ? s.removeProperty(t) : (s[t] = null))
        for (const t in r) {
          const e = r[t]
          if (null != e) {
            this.ut.add(t)
            const r = 'string' == typeof e && e.endsWith(i)
            t.includes('-') || r
              ? s.setProperty(t, r ? e.slice(0, -11) : e, r ? n : '')
              : (s[t] = e)
          }
        }
        return w
      }
    }
  )

/**
 * @license
 * Copyright 2023 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */
/**
 * Activates the first non-disabled item of a given array of items.
 *
 * @param items {Array<ListItem>} The items from which to activate the
 *     first item.
 * @param isActivatable Function to determine if an item can be  activated.
 *     Defaults to non-disabled items.
 */
function activateFirstItem(items, isActivatable = isItemNotDisabled) {
  // NOTE: These selector functions are static and not on the instance such
  // that multiple operations can be chained and we do not have to re-query
  // the DOM
  const firstItem = getFirstActivatableItem(items, isActivatable)
  if (firstItem) {
    firstItem.tabIndex = 0
    firstItem.focus()
  }
  return firstItem
}
/**
 * Activates the last non-disabled item of a given array of items.
 *
 * @param items {Array<ListItem>} The items from which to activate the
 *     last item.
 * @param isActivatable Function to determine if an item can be  activated.
 *     Defaults to non-disabled items.
 * @nocollapse
 */
function activateLastItem(items, isActivatable = isItemNotDisabled) {
  const lastItem = getLastActivatableItem(items, isActivatable)
  if (lastItem) {
    lastItem.tabIndex = 0
    lastItem.focus()
  }
  return lastItem
}
/**
 * Retrieves the first activated item of a given array of items.
 *
 * @param items {Array<ListItem>} The items to search.
 * @param isActivatable Function to determine if an item can be  activated.
 *     Defaults to non-disabled items.
 * @return A record of the first activated item including the item and the
 *     index of the item or `null` if none are activated.
 * @nocollapse
 */
function getActiveItem(items, isActivatable = isItemNotDisabled) {
  for (let i = 0; i < items.length; i++) {
    const item = items[i]
    if (item.tabIndex === 0 && isActivatable(item)) {
      return {
        item,
        index: i,
      }
    }
  }
  return null
}
/**
 * Retrieves the first non-disabled item of a given array of items. This
 * the first item that is not disabled.
 *
 * @param items {Array<ListItem>} The items to search.
 * @param isActivatable Function to determine if an item can be  activated.
 *     Defaults to non-disabled items.
 * @return The first activatable item or `null` if none are activatable.
 * @nocollapse
 */
function getFirstActivatableItem(items, isActivatable = isItemNotDisabled) {
  for (const item of items) {
    if (isActivatable(item)) {
      return item
    }
  }
  return null
}
/**
 * Retrieves the last non-disabled item of a given array of items.
 *
 * @param items {Array<ListItem>} The items to search.
 * @param isActivatable Function to determine if an item can be  activated.
 *     Defaults to non-disabled items.
 * @return The last activatable item or `null` if none are activatable.
 * @nocollapse
 */
function getLastActivatableItem(items, isActivatable = isItemNotDisabled) {
  for (let i = items.length - 1; i >= 0; i--) {
    const item = items[i]
    if (isActivatable(item)) {
      return item
    }
  }
  return null
}
/**
 * Retrieves the next non-disabled item of a given array of items.
 *
 * @param items {Array<ListItem>} The items to search.
 * @param index {{index: number}} The index to search from.
 * @param isActivatable Function to determine if an item can be  activated.
 *     Defaults to non-disabled items.
 * @return The next activatable item or `null` if none are activatable.
 */
function getNextItem(items, index, isActivatable = isItemNotDisabled) {
  for (let i = 1; i < items.length; i++) {
    const nextIndex = (i + index) % items.length
    const item = items[nextIndex]
    if (isActivatable(item)) {
      return item
    }
  }
  return items[index] ? items[index] : null
}
/**
 * Retrieves the previous non-disabled item of a given array of items.
 *
 * @param items {Array<ListItem>} The items to search.
 * @param index {{index: number}} The index to search from.
 * @param isActivatable Function to determine if an item can be  activated.
 *     Defaults to non-disabled items.
 * @return The previous activatable item or `null` if none are activatable.
 */
function getPrevItem(items, index, isActivatable = isItemNotDisabled) {
  for (let i = 1; i < items.length; i++) {
    const prevIndex = (index - i + items.length) % items.length
    const item = items[prevIndex]
    if (isActivatable(item)) {
      return item
    }
  }
  return items[index] ? items[index] : null
}
/**
 * Activates the next item and focuses it. If nothing is currently activated,
 * activates the first item.
 */
function activateNextItem(
  items,
  activeItemRecord,
  isActivatable = isItemNotDisabled
) {
  if (activeItemRecord) {
    const next = getNextItem(items, activeItemRecord.index, isActivatable)
    if (next) {
      next.tabIndex = 0
      next.focus()
    }
    return next
  } else {
    return activateFirstItem(items, isActivatable)
  }
}
/**
 * Activates the previous item and focuses it. If nothing is currently
 * activated, activates the last item.
 */
function activatePreviousItem(
  items,
  activeItemRecord,
  isActivatable = isItemNotDisabled
) {
  if (activeItemRecord) {
    const prev = getPrevItem(items, activeItemRecord.index, isActivatable)
    if (prev) {
      prev.tabIndex = 0
      prev.focus()
    }
    return prev
  } else {
    return activateLastItem(items, isActivatable)
  }
}
/**
 * The default `isActivatable` function, which checks if an item is not
 * disabled.
 *
 * @param item The item to check.
 * @return true if `item.disabled` is `false.
 */
function isItemNotDisabled(item) {
  return !item.disabled
}

/**
 * @license
 * Copyright 2023 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */
// TODO: move this file to List and make List use this
/**
 * Default keys that trigger navigation.
 */
// tslint:disable:enforce-name-casing Following Enum style
const NavigableKeys = {
  ArrowDown: 'ArrowDown',
  ArrowLeft: 'ArrowLeft',
  ArrowUp: 'ArrowUp',
  ArrowRight: 'ArrowRight',
  Home: 'Home',
  End: 'End',
}
/**
 * A controller that handles list keyboard navigation and item management.
 */
class ListController {
  constructor(config) {
    /**
     * Handles keyboard navigation. Should be bound to the node that will act as
     * the List.
     */
    this.handleKeydown = event => {
      const key = event.key
      if (event.defaultPrevented || !this.isNavigableKey(key)) {
        return
      }
      // do not use this.items directly in upcoming calculations so we don't
      // re-query the DOM unnecessarily
      const items = this.items
      if (!items.length) {
        return
      }
      const activeItemRecord = getActiveItem(items, this.isActivatable)
      if (activeItemRecord) {
        activeItemRecord.item.tabIndex = -1
      }
      event.preventDefault()
      const isRtl = this.isRtl()
      const inlinePrevious = isRtl
        ? NavigableKeys.ArrowRight
        : NavigableKeys.ArrowLeft
      const inlineNext = isRtl
        ? NavigableKeys.ArrowLeft
        : NavigableKeys.ArrowRight
      switch (key) {
        // Activate the next item
        case NavigableKeys.ArrowDown:
        case inlineNext:
          activateNextItem(items, activeItemRecord, this.isActivatable)
          break
        // Activate the previous item
        case NavigableKeys.ArrowUp:
        case inlinePrevious:
          activatePreviousItem(items, activeItemRecord, this.isActivatable)
          break
        // Activate the first item
        case NavigableKeys.Home:
          activateFirstItem(items, this.isActivatable)
          break
        // Activate the last item
        case NavigableKeys.End:
          activateLastItem(items, this.isActivatable)
          break
      }
    }
    /**
     * Listener to be bound to the `deactivate-items` item event.
     */
    this.onDeactivateItems = () => {
      const items = this.items
      for (const item of items) {
        this.deactivateItem(item)
      }
    }
    /**
     * Listener to be bound to the `request-activation` item event..
     */
    this.onRequestActivation = event => {
      this.onDeactivateItems()
      const target = event.target
      this.activateItem(target)
      target.focus()
    }
    /**
     * Listener to be bound to the `slotchange` event for the slot that renders
     * the items.
     */
    this.onSlotchange = () => {
      const items = this.items
      // Whether we have encountered an item that has been activated
      let encounteredActivated = false
      for (const item of items) {
        const isActivated = !item.disabled && item.tabIndex > -1
        if (isActivated && !encounteredActivated) {
          encounteredActivated = true
          item.tabIndex = 0
          continue
        }
        // Deactivate the rest including disabled
        item.tabIndex = -1
      }
      if (encounteredActivated) {
        return
      }
      const firstActivatableItem = getFirstActivatableItem(
        items,
        this.isActivatable
      )
      if (!firstActivatableItem) {
        return
      }
      firstActivatableItem.tabIndex = 0
    }
    const {
      isItem,
      getPossibleItems,
      isRtl,
      deactivateItem,
      activateItem,
      isNavigableKey,
      isActivatable,
    } = config
    this.isItem = isItem
    this.getPossibleItems = getPossibleItems
    this.isRtl = isRtl
    this.deactivateItem = deactivateItem
    this.activateItem = activateItem
    this.isNavigableKey = isNavigableKey
    this.isActivatable = isActivatable
  }
  /**
   * The items being managed by the list. Additionally, attempts to see if the
   * object has a sub-item in the `.item` property.
   */
  get items() {
    const maybeItems = this.getPossibleItems()
    const items = []
    for (const itemOrParent of maybeItems) {
      const isItem = this.isItem(itemOrParent)
      // if the item is a list item, add it to the list of items
      if (isItem) {
        items.push(itemOrParent)
        continue
      }
      // If the item exposes an `item` property check if it is a list item.
      const subItem = itemOrParent.item
      if (subItem && this.isItem(subItem)) {
        items.push(subItem)
      }
    }
    return items
  }
  /**
   * Activates the next item in the list. If at the end of the list, the first
   * item will be activated.
   *
   * @return The activated list item or `null` if there are no items.
   */
  activateNextItem() {
    const items = this.items
    const activeItemRecord = getActiveItem(items, this.isActivatable)
    if (activeItemRecord) {
      activeItemRecord.item.tabIndex = -1
    }
    return activateNextItem(items, activeItemRecord, this.isActivatable)
  }
  /**
   * Activates the previous item in the list. If at the start of the list, the
   * last item will be activated.
   *
   * @return The activated list item or `null` if there are no items.
   */
  activatePreviousItem() {
    const items = this.items
    const activeItemRecord = getActiveItem(items, this.isActivatable)
    if (activeItemRecord) {
      activeItemRecord.item.tabIndex = -1
    }
    return activatePreviousItem(items, activeItemRecord, this.isActivatable)
  }
}

/**
 * @license
 * Copyright 2023 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */
/**
 * Creates an event that closes any parent menus.
 */
function createCloseMenuEvent(initiator, reason) {
  return new CustomEvent('close-menu', {
    bubbles: true,
    composed: true,
    detail: { initiator, reason, itemPath: [initiator] },
  })
}
/**
 * Creates a default close menu event used by md-menu.
 */
const createDefaultCloseMenuEvent = createCloseMenuEvent
/**
 * Keys that are used for selection in menus.
 */
// tslint:disable-next-line:enforce-name-casing We are mimicking enum style
const SelectionKey = {
  SPACE: 'Space',
  ENTER: 'Enter',
}
/**
 * Default close `Reason` kind values.
 */
// tslint:disable-next-line:enforce-name-casing We are mimicking enum style
const CloseReason = {
  CLICK_SELECTION: 'click-selection',
  KEYDOWN: 'keydown',
}
/**
 * Keys that can close menus.
 */
// tslint:disable-next-line:enforce-name-casing We are mimicking enum style
const KeydownCloseKey = {
  ESCAPE: 'Escape',
  SPACE: SelectionKey.SPACE,
  ENTER: SelectionKey.ENTER,
}
/**
 * Determines whether the given key code is a key code that should close the
 * menu.
 *
 * @param code The KeyboardEvent code to check.
 * @return Whether or not the key code is in the predetermined list to close the
 * menu.
 */
function isClosableKey(code) {
  return Object.values(KeydownCloseKey).some(value => value === code)
}
/**
 * Determines whether a target element is contained inside another element's
 * composed tree.
 *
 * @param target The potential contained element.
 * @param container The potential containing element of the target.
 * @returns Whether the target element is contained inside the container's
 * composed subtree
 */
function isElementInSubtree(target, container) {
  // Dispatch a composed, bubbling event to check its path to see if the
  // newly-focused element is contained in container's subtree
  const focusEv = new Event('md-contains', { bubbles: true, composed: true })
  let composedPath = []
  const listener = ev => {
    composedPath = ev.composedPath()
  }
  container.addEventListener('md-contains', listener)
  target.dispatchEvent(focusEv)
  container.removeEventListener('md-contains', listener)
  const isContained = composedPath.length > 0
  return isContained
}
/**
 * Element to focus on when menu is first opened.
 */
// tslint:disable-next-line:enforce-name-casing We are mimicking enum style
const FocusState = {
  NONE: 'none',
  LIST_ROOT: 'list-root',
  FIRST_ITEM: 'first-item',
  LAST_ITEM: 'last-item',
}

/**
 * @license
 * Copyright 2023 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */
/**
 * An enum of supported Menu corners
 */
// tslint:disable-next-line:enforce-name-casing We are mimicking enum style
const Corner = {
  END_START: 'end-start',
  END_END: 'end-end',
  START_START: 'start-start',
  START_END: 'start-end',
}
/**
 * Given a surface, an anchor, corners, and some options, this surface will
 * calculate the position of a surface to align the two given corners and keep
 * the surface inside the window viewport. It also provides a StyleInfo map that
 * can be applied to the surface to handle visiblility and position.
 */
class SurfacePositionController {
  /**
   * @param host The host to connect the controller to.
   * @param getProperties A function that returns the properties for the
   * controller.
   */
  constructor(host, getProperties) {
    this.host = host
    this.getProperties = getProperties
    // The current styles to apply to the surface.
    this.surfaceStylesInternal = {
      display: 'none',
    }
    // Previous values stored for change detection. Open change detection is
    // calculated separately so initialize it here.
    this.lastValues = { isOpen: false }
    this.host.addController(this)
  }
  /**
   * The StyleInfo map to apply to the surface via Lit's stylemap
   */
  get surfaceStyles() {
    return this.surfaceStylesInternal
  }
  /**
   * Calculates the surface's new position required so that the surface's
   * `surfaceCorner` aligns to the anchor's `anchorCorner` while keeping the
   * surface inside the window viewport. This positioning also respects RTL by
   * checking `getComputedStyle()` on the surface element.
   */
  async position() {
    const {
      surfaceEl,
      anchorEl,
      anchorCorner: anchorCornerRaw,
      surfaceCorner: surfaceCornerRaw,
      positioning,
      xOffset,
      yOffset,
      repositionStrategy,
    } = this.getProperties()
    const anchorCorner = anchorCornerRaw.toLowerCase().trim()
    const surfaceCorner = surfaceCornerRaw.toLowerCase().trim()
    if (!surfaceEl || !anchorEl) {
      return
    }
    // Store these before we potentially resize the window with the next set of
    // lines
    const windowInnerWidth = window.innerWidth
    const windowInnerHeight = window.innerHeight
    // Paint the surface transparently so that we can get the position and the
    // rect info of the surface.
    this.surfaceStylesInternal = {
      display: 'block',
      opacity: '0',
    }
    // Wait for it to be visible.
    this.host.requestUpdate()
    await this.host.updateComplete
    const surfaceRect = surfaceEl.getSurfacePositionClientRect
      ? surfaceEl.getSurfacePositionClientRect()
      : surfaceEl.getBoundingClientRect()
    const anchorRect = anchorEl.getSurfacePositionClientRect
      ? anchorEl.getSurfacePositionClientRect()
      : anchorEl.getBoundingClientRect()
    const [surfaceBlock, surfaceInline] = surfaceCorner.split('-')
    const [anchorBlock, anchorInline] = anchorCorner.split('-')
    // LTR depends on the direction of the SURFACE not the anchor.
    const isLTR = getComputedStyle(surfaceEl).direction === 'ltr'
    /*
     * A diagram that helps describe some of the variables used in the following
     * calculations.
     *
     * ┌───── inline/blockTopLayerOffset
     * │       │
     * │     ┌─▼───┐                  Window
     * │    ┌┼─────┴────────────────────────┐
     * │    ││                              │
     * └──► ││  ┌──inline/blockAnchorOffset │
     *      ││  │     │                     │
     *      └┤  │  ┌──▼───┐                 │
     *       │  │ ┌┼──────┤                 │
     *       │  └─►│Anchor│                 │
     *       │    └┴──────┘                 │
     *       │                              │
     *       │     ┌────────────────────────┼────┐
     *       │     │ Surface                │    │
     *       │     │                        │    │
     *       │     │                        │    │
     *       │     │                        │    │
     *       │     │                        │    │
     *       │     │                        │    │
     *       └─────┼────────────────────────┘    ├┐
     *             │ inline/blockOOBCorrection   ││
     *             │                         │   ││
     *             │                         ├──►││
     *             │                         │   ││
     *             └────────────────────────┐▼───┼┘
     *                                      └────┘
     */
    // Calculate the block positioning properties
    let {
      blockInset,
      blockOutOfBoundsCorrection,
      surfaceBlockProperty,
    } = this.calculateBlock({
      surfaceRect,
      anchorRect,
      anchorBlock,
      surfaceBlock,
      yOffset,
      positioning,
      windowInnerHeight,
    })
    // If the surface should be out of bounds in the block direction, flip the
    // surface and anchor corner block values and recalculate
    if (blockOutOfBoundsCorrection) {
      const flippedSurfaceBlock = surfaceBlock === 'start' ? 'end' : 'start'
      const flippedAnchorBlock = anchorBlock === 'start' ? 'end' : 'start'
      const flippedBlock = this.calculateBlock({
        surfaceRect,
        anchorRect,
        anchorBlock: flippedAnchorBlock,
        surfaceBlock: flippedSurfaceBlock,
        yOffset,
        positioning,
        windowInnerHeight,
      })
      // In the case that the flipped verion would require less out of bounds
      // correcting, use the flipped corner block values
      if (
        blockOutOfBoundsCorrection > flippedBlock.blockOutOfBoundsCorrection
      ) {
        blockInset = flippedBlock.blockInset
        blockOutOfBoundsCorrection = flippedBlock.blockOutOfBoundsCorrection
        surfaceBlockProperty = flippedBlock.surfaceBlockProperty
      }
    }
    // Calculate the inline positioning properties
    let {
      inlineInset,
      inlineOutOfBoundsCorrection,
      surfaceInlineProperty,
    } = this.calculateInline({
      surfaceRect,
      anchorRect,
      anchorInline,
      surfaceInline,
      xOffset,
      positioning,
      isLTR,
      windowInnerWidth,
    })
    // If the surface should be out of bounds in the inline direction, flip the
    // surface and anchor corner inline values and recalculate
    if (inlineOutOfBoundsCorrection) {
      const flippedSurfaceInline = surfaceInline === 'start' ? 'end' : 'start'
      const flippedAnchorInline = anchorInline === 'start' ? 'end' : 'start'
      const flippedInline = this.calculateInline({
        surfaceRect,
        anchorRect,
        anchorInline: flippedAnchorInline,
        surfaceInline: flippedSurfaceInline,
        xOffset,
        positioning,
        isLTR,
        windowInnerWidth,
      })
      // In the case that the flipped verion would require less out of bounds
      // correcting, use the flipped corner inline values
      if (
        Math.abs(inlineOutOfBoundsCorrection) >
        Math.abs(flippedInline.inlineOutOfBoundsCorrection)
      ) {
        inlineInset = flippedInline.inlineInset
        inlineOutOfBoundsCorrection = flippedInline.inlineOutOfBoundsCorrection
        surfaceInlineProperty = flippedInline.surfaceInlineProperty
      }
    }
    // If we are simply repositioning the surface back inside the viewport,
    // subtract the out of bounds correction values from the positioning.
    if (repositionStrategy === 'move') {
      blockInset = blockInset - blockOutOfBoundsCorrection
      inlineInset = inlineInset - inlineOutOfBoundsCorrection
    }
    this.surfaceStylesInternal = {
      display: 'block',
      opacity: '1',
      [surfaceBlockProperty]: `${blockInset}px`,
      [surfaceInlineProperty]: `${inlineInset}px`,
    }
    // In the case that we are resizing the surface to stay inside the viewport
    // we need to set height and width on the surface.
    if (repositionStrategy === 'resize') {
      // Add a height property to the styles if there is block height correction
      if (blockOutOfBoundsCorrection) {
        this.surfaceStylesInternal['height'] = `${surfaceRect.height -
          blockOutOfBoundsCorrection}px`
      }
      // Add a width property to the styles if there is block height correction
      if (inlineOutOfBoundsCorrection) {
        this.surfaceStylesInternal['width'] = `${surfaceRect.width -
          inlineOutOfBoundsCorrection}px`
      }
    }
    this.host.requestUpdate()
  }
  /**
   * Calculates the css property, the inset, and the out of bounds correction
   * for the surface in the block direction.
   */
  calculateBlock(config) {
    const {
      surfaceRect,
      anchorRect,
      anchorBlock,
      surfaceBlock,
      yOffset,
      positioning,
      windowInnerHeight,
    } = config
    // We use number booleans to multiply values rather than `if` / ternary
    // statements because it _heavily_ cuts down on nesting and readability
    const relativeToWindow = positioning === 'fixed' ? 1 : 0
    const isSurfaceBlockStart = surfaceBlock === 'start' ? 1 : 0
    const isSurfaceBlockEnd = surfaceBlock === 'end' ? 1 : 0
    const isOneBlockEnd = anchorBlock !== surfaceBlock ? 1 : 0
    // Whether or not to apply the height of the anchor
    const blockAnchorOffset = isOneBlockEnd * anchorRect.height + yOffset
    // The absolute block position of the anchor relative to window
    const blockTopLayerOffset =
      isSurfaceBlockStart * anchorRect.top +
      isSurfaceBlockEnd * (windowInnerHeight - anchorRect.bottom)
    // If the surface's block would be out of bounds of the window, move it back
    // in
    const blockOutOfBoundsCorrection = Math.abs(
      Math.min(
        0,
        windowInnerHeight -
          blockTopLayerOffset -
          blockAnchorOffset -
          surfaceRect.height
      )
    )
    // The block logical value of the surface
    const blockInset =
      relativeToWindow * blockTopLayerOffset + blockAnchorOffset
    const surfaceBlockProperty =
      surfaceBlock === 'start' ? 'inset-block-start' : 'inset-block-end'
    return { blockInset, blockOutOfBoundsCorrection, surfaceBlockProperty }
  }
  /**
   * Calculates the css property, the inset, and the out of bounds correction
   * for the surface in the inline direction.
   */
  calculateInline(config) {
    const {
      isLTR: isLTRBool,
      surfaceInline,
      anchorInline,
      anchorRect,
      surfaceRect,
      xOffset,
      positioning,
      windowInnerWidth,
    } = config
    // We use number booleans to multiply values rather than `if` / ternary
    // statements because it _heavily_ cuts down on nesting and readability
    const relativeToWindow = positioning === 'fixed' ? 1 : 0
    const isLTR = isLTRBool ? 1 : 0
    const isRTL = isLTRBool ? 0 : 1
    const isSurfaceInlineStart = surfaceInline === 'start' ? 1 : 0
    const isSurfaceInlineEnd = surfaceInline === 'end' ? 1 : 0
    const isOneInlineEnd = anchorInline !== surfaceInline ? 1 : 0
    // Whether or not to apply the width of the anchor
    const inlineAnchorOffset = isOneInlineEnd * anchorRect.width + xOffset
    // The inline position of the anchor relative to window in LTR
    const inlineTopLayerOffsetLTR =
      isSurfaceInlineStart * anchorRect.left +
      isSurfaceInlineEnd * (windowInnerWidth - anchorRect.right)
    // The inline position of the anchor relative to window in RTL
    const inlineTopLayerOffsetRTL =
      isSurfaceInlineStart * (windowInnerWidth - anchorRect.right) +
      isSurfaceInlineEnd * anchorRect.left
    // The inline position of the anchor relative to window
    const inlineTopLayerOffset =
      isLTR * inlineTopLayerOffsetLTR + isRTL * inlineTopLayerOffsetRTL
    // If the surface's inline would be out of bounds of the window, move it
    // back in
    const inlineOutOfBoundsCorrection = Math.abs(
      Math.min(
        0,
        windowInnerWidth -
          inlineTopLayerOffset -
          inlineAnchorOffset -
          surfaceRect.width
      )
    )
    // The inline logical value of the surface
    const inlineInset =
      relativeToWindow * inlineTopLayerOffset + inlineAnchorOffset
    const surfaceInlineProperty =
      surfaceInline === 'start' ? 'inset-inline-start' : 'inset-inline-end'
    return {
      inlineInset,
      inlineOutOfBoundsCorrection,
      surfaceInlineProperty,
    }
  }
  hostUpdate() {
    this.onUpdate()
  }
  hostUpdated() {
    this.onUpdate()
  }
  /**
   * Checks whether the properties passed into the controller have changed since
   * the last positioning. If so, it will reposition if the surface is open or
   * close it if the surface should close.
   */
  async onUpdate() {
    const props = this.getProperties()
    let hasChanged = false
    for (const [key, value] of Object.entries(props)) {
      // tslint:disable-next-line
      hasChanged = hasChanged || value !== this.lastValues[key]
      if (hasChanged) break
    }
    const openChanged = this.lastValues.isOpen !== props.isOpen
    const hasAnchor = !!props.anchorEl
    const hasSurface = !!props.surfaceEl
    if (hasChanged && hasAnchor && hasSurface) {
      // Only update isOpen, because if it's closed, we do not want to waste
      // time on a useless reposition calculation. So save the other "dirty"
      // values until next time it opens.
      this.lastValues.isOpen = props.isOpen
      if (props.isOpen) {
        // We are going to do a reposition, so save the prop values for future
        // dirty checking.
        this.lastValues = props
        await this.position()
        props.onOpen()
      } else if (openChanged) {
        await props.beforeClose()
        this.close()
        props.onClose()
      }
    }
  }
  /**
   * Hides the surface.
   */
  close() {
    this.surfaceStylesInternal = {
      display: 'none',
    }
    this.host.requestUpdate()
  }
}

/**
 * @license
 * Copyright 2023 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */
/**
 * Indicies to access the TypeaheadRecord tuple type.
 */
const TYPEAHEAD_RECORD = {
  INDEX: 0,
  ITEM: 1,
  TEXT: 2,
}
/**
 * This controller listens to `keydown` events and searches the header text of
 * an array of `MenuItem`s with the corresponding entered keys within the buffer
 * time and activates the item.
 *
 * @example
 * ```ts
 * const typeaheadController = new TypeaheadController(() => ({
 *   typeaheadBufferTime: 50,
 *   getItems: () => Array.from(document.querySelectorAll('md-menu-item'))
 * }));
 * html`
 *   <div
 *       @keydown=${typeaheadController.onKeydown}
 *       tabindex="0"
 *       class="activeItemText">
 *     <!-- focusable element that will receive keydown events -->
 *     Apple
 *   </div>
 *   <div>
 *     <md-menu-item active header="Apple"></md-menu-item>
 *     <md-menu-item header="Apricot"></md-menu-item>
 *     <md-menu-item header="Banana"></md-menu-item>
 *     <md-menu-item header="Olive"></md-menu-item>
 *     <md-menu-item header="Orange"></md-menu-item>
 *   </div>
 * `;
 * ```
 */
class TypeaheadController {
  /**
   * @param getProperties A function that returns the options of the typeahead
   * controller:
   *
   * {
   *   getItems: A function that returns an array of menu items to be searched.
   *   typeaheadBufferTime: The maximum time between each keystroke to keep the
   *       current type buffer alive.
   * }
   */
  constructor(getProperties) {
    this.getProperties = getProperties
    /**
     * Array of tuples that helps with indexing.
     */
    this.typeaheadRecords = []
    /**
     * Currently-typed text since last buffer timeout
     */
    this.typaheadBuffer = ''
    /**
     * The timeout id from the current buffer's setTimeout
     */
    this.cancelTypeaheadTimeout = 0
    /**
     * If we are currently "typing"
     */
    this.isTypingAhead = false
    /**
     * The record of the last active item.
     */
    this.lastActiveRecord = null
    /**
     * Apply this listener to the element that will receive `keydown` events that
     * should trigger this controller.
     *
     * @param event The native browser `KeyboardEvent` from the `keydown` event.
     */
    this.onKeydown = event => {
      if (this.isTypingAhead) {
        this.typeahead(event)
      } else {
        this.beginTypeahead(event)
      }
    }
    /**
     * Ends the current typeahead and clears the buffer.
     */
    this.endTypeahead = () => {
      this.isTypingAhead = false
      this.typaheadBuffer = ''
      this.typeaheadRecords = []
    }
  }
  get items() {
    return this.getProperties().getItems()
  }
  get active() {
    return this.getProperties().active
  }
  /**
   * Sets up typingahead
   */
  beginTypeahead(event) {
    if (!this.active) {
      return
    }
    // We don't want to typeahead if the _beginning_ of the typeahead is a menu
    // navigation, or a selection. We will handle "Space" only if it's in the
    // middle of a typeahead
    if (
      event.code === 'Space' ||
      event.code === 'Enter' ||
      event.code.startsWith('Arrow') ||
      event.code === 'Escape'
    ) {
      return
    }
    this.isTypingAhead = true
    // Generates the record array data structure which is the index, the element
    // and a normalized header.
    this.typeaheadRecords = this.items.map((el, index) => [
      index,
      el,
      el.typeaheadText.trim().toLowerCase(),
    ])
    this.lastActiveRecord =
      this.typeaheadRecords.find(
        record => record[TYPEAHEAD_RECORD.ITEM].tabIndex === 0
      ) ?? null
    if (this.lastActiveRecord) {
      this.lastActiveRecord[TYPEAHEAD_RECORD.ITEM].tabIndex = -1
    }
    this.typeahead(event)
  }
  /**
   * Performs the typeahead. Based on the normalized items and the current text
   * buffer, finds the _next_ item with matching text and activates it.
   *
   * @example
   *
   * items: Apple, Banana, Olive, Orange, Cucumber
   * buffer: ''
   * user types: o
   *
   * activates Olive
   *
   * @example
   *
   * items: Apple, Banana, Olive (active), Orange, Cucumber
   * buffer: 'o'
   * user types: l
   *
   * activates Olive
   *
   * @example
   *
   * items: Apple, Banana, Olive (active), Orange, Cucumber
   * buffer: ''
   * user types: o
   *
   * activates Orange
   *
   * @example
   *
   * items: Apple, Banana, Olive, Orange (active), Cucumber
   * buffer: ''
   * user types: o
   *
   * activates Olive
   */
  typeahead(event) {
    if (event.defaultPrevented) return
    clearTimeout(this.cancelTypeaheadTimeout)
    // Stop typingahead if one of the navigation or selection keys (except for
    // Space) are pressed
    if (
      event.code === 'Enter' ||
      event.code.startsWith('Arrow') ||
      event.code === 'Escape'
    ) {
      this.endTypeahead()
      if (this.lastActiveRecord) {
        this.lastActiveRecord[TYPEAHEAD_RECORD.ITEM].tabIndex = -1
      }
      return
    }
    // If Space is pressed, prevent it from selecting and closing the menu
    if (event.code === 'Space') {
      event.preventDefault()
    }
    // Start up a new keystroke buffer timeout
    this.cancelTypeaheadTimeout = setTimeout(
      this.endTypeahead,
      this.getProperties().typeaheadBufferTime
    )
    this.typaheadBuffer += event.key.toLowerCase()
    const lastActiveIndex = this.lastActiveRecord
      ? this.lastActiveRecord[TYPEAHEAD_RECORD.INDEX]
      : -1
    const numRecords = this.typeaheadRecords.length
    /**
     * Sorting function that will resort the items starting with the given index
     *
     * @example
     *
     * this.typeaheadRecords =
     * 0: [0, <reference>, 'apple']
     * 1: [1, <reference>, 'apricot']
     * 2: [2, <reference>, 'banana']
     * 3: [3, <reference>, 'olive'] <-- lastActiveIndex
     * 4: [4, <reference>, 'orange']
     * 5: [5, <reference>, 'strawberry']
     *
     * this.typeaheadRecords.sort((a,b) => rebaseIndexOnActive(a)
     *                                       - rebaseIndexOnActive(b)) ===
     * 0: [3, <reference>, 'olive'] <-- lastActiveIndex
     * 1: [4, <reference>, 'orange']
     * 2: [5, <reference>, 'strawberry']
     * 3: [0, <reference>, 'apple']
     * 4: [1, <reference>, 'apricot']
     * 5: [2, <reference>, 'banana']
     */
    const rebaseIndexOnActive = record => {
      return (
        (record[TYPEAHEAD_RECORD.INDEX] + numRecords - lastActiveIndex) %
        numRecords
      )
    }
    // records filtered and sorted / rebased around the last active index
    const matchingRecords = this.typeaheadRecords
      .filter(
        record =>
          !record[TYPEAHEAD_RECORD.ITEM].disabled &&
          record[TYPEAHEAD_RECORD.TEXT].startsWith(this.typaheadBuffer)
      )
      .sort((a, b) => rebaseIndexOnActive(a) - rebaseIndexOnActive(b))
    // Just leave if there's nothing that matches. Native select will just
    // choose the first thing that starts with the next letter in the alphabet
    // but that's out of scope and hard to localize
    if (matchingRecords.length === 0) {
      clearTimeout(this.cancelTypeaheadTimeout)
      if (this.lastActiveRecord) {
        this.lastActiveRecord[TYPEAHEAD_RECORD.ITEM].tabIndex = -1
      }
      this.endTypeahead()
      return
    }
    const isNewQuery = this.typaheadBuffer.length === 1
    let nextRecord
    // This is likely the case that someone is trying to "tab" through different
    // entries that start with the same letter
    if (this.lastActiveRecord === matchingRecords[0] && isNewQuery) {
      nextRecord = matchingRecords[1] ?? matchingRecords[0]
    } else {
      nextRecord = matchingRecords[0]
    }
    if (this.lastActiveRecord) {
      this.lastActiveRecord[TYPEAHEAD_RECORD.ITEM].tabIndex = -1
    }
    this.lastActiveRecord = nextRecord
    nextRecord[TYPEAHEAD_RECORD.ITEM].tabIndex = 0
    nextRecord[TYPEAHEAD_RECORD.ITEM].focus()
    return
  }
}

/**
 * @license
 * Copyright 2023 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */
/**
 * The default value for the typeahead buffer time in Milliseconds.
 */
const DEFAULT_TYPEAHEAD_BUFFER_TIME = 200
const submenuNavKeys = new Set([
  NavigableKeys.ArrowDown,
  NavigableKeys.ArrowUp,
  NavigableKeys.Home,
  NavigableKeys.End,
])
const menuNavKeys = new Set([
  NavigableKeys.ArrowLeft,
  NavigableKeys.ArrowRight,
  ...submenuNavKeys,
])
/**
 * Gets the currently focused element on the page.
 *
 * @param activeDoc The document or shadowroot from which to start the search.
 *    Defaults to `window.document`
 * @return Returns the currently deeply focused element or `null` if none.
 */
function getFocusedElement(activeDoc = document) {
  let activeEl = activeDoc.activeElement
  // Check for activeElement in the case that an element with a shadow root host
  // is currently focused.
  while (activeEl && activeEl?.shadowRoot?.activeElement) {
    activeEl = activeEl.shadowRoot.activeElement
  }
  return activeEl
}
/**
 * @fires opening Fired before the opening animation begins
 * @fires opened Fired once the menu is open, after any animations
 * @fires closing Fired before the closing animation begins
 * @fires closed Fired once the menu is closed, after any animations
 */
class Menu extends s$9 {
  /**
   * Whether the menu is animating upwards or downwards when opening. This is
   * helpful for calculating some animation calculations.
   */
  get openDirection() {
    const menuCornerBlock = this.menuCorner.split('-')[0]
    return menuCornerBlock === 'start' ? 'DOWN' : 'UP'
  }
  /**
   * The element which the menu should align to. If `anchor` is set to a
   * non-empty idref string, then `anchorEl` will resolve to the element with
   * the given id in the same root node. Otherwise, `null`.
   */
  get anchorElement() {
    if (this.anchor) {
      return this.getRootNode().querySelector(`#${this.anchor}`)
    }
    return this.currentAnchorElement
  }
  set anchorElement(element) {
    this.currentAnchorElement = element
    this.requestUpdate('anchorElement')
  }
  constructor() {
    super()
    /**
     * The ID of the element in the same root node in which the menu should align
     * to. Overrides setting `anchorElement = elementReference`.
     *
     * __NOTE__: anchor or anchorElement must either be an HTMLElement or resolve
     * to an HTMLElement in order for menu to open.
     */
    this.anchor = ''
    /**
     * Whether the positioning algorithim should calculate relative to the parent
     * of the anchor element (absolute) or relative to the window (fixed).
     *
     * Examples for `position = 'fixed'`:
     *
     * - If there is no `position:relative` in the given parent tree and the
     *   surface is `position:absolute`
     * - If the surface is `position:fixed`
     * - If the surface is in the "top layer"
     * - The anchor and the surface do not share a common `position:relative`
     *   ancestor
     *
     * When using positioning = fixed, in most cases, the menu should position
     * itself above most other `position:absolute` or `position:fixed` elements
     * when placed inside of them. e.g. using a menu inside of an `md-dialog`.
     *
     * __NOTE__: Fixed menus will not scroll with the page and will be fixed to
     * the window instead.
     */
    this.positioning = 'absolute'
    /**
     * Skips the opening and closing animations.
     */
    this.quick = false
    /**
     * Displays overflow content like a submenu.
     *
     * __NOTE__: This may cause adverse effects if you set
     * `md-menu {max-height:...}`
     * and have items overflowing items in the "y" direction.
     */
    this.hasOverflow = false
    /**
     * Opens the menu and makes it visible. Alternative to the `.show()` and
     * `.close()` methods
     */
    this.open = false
    /**
     * Offsets the menu's inline alignment from the anchor by the given number in
     * pixels. This value is direction aware and will follow the LTR / RTL
     * direction.
     *
     * e.g. LTR: positive -> right, negative -> left
     *      RTL: positive -> left, negative -> right
     */
    this.xOffset = 0
    /**
     * Offsets the menu's block alignment from the anchor by the given number in
     * pixels.
     *
     * e.g. positive -> down, negative -> up
     */
    this.yOffset = 0
    /**
     * The max time between the keystrokes of the typeahead menu behavior before
     * it clears the typeahead buffer.
     */
    this.typeaheadDelay = DEFAULT_TYPEAHEAD_BUFFER_TIME
    /**
     * The corner of the anchor which to align the menu in the standard logical
     * property style of <block>-<inline> e.g. `'end-start'`.
     *
     * NOTE: This value may not be respected by the menu positioning algorithm
     * if the menu would render outisde the viewport.
     */
    this.anchorCorner = Corner.END_START
    /**
     * The corner of the menu which to align the anchor in the standard logical
     * property style of <block>-<inline> e.g. `'start-start'`.
     *
     * NOTE: This value may not be respected by the menu positioning algorithm
     * if the menu would render outisde the viewport.
     */
    this.menuCorner = Corner.START_START
    /**
     * Keeps the user clicks outside the menu.
     *
     * NOTE: clicking outside may still cause focusout to close the menu so see
     * `stayOpenOnFocusout`.
     */
    this.stayOpenOnOutsideClick = false
    /**
     * Keeps the menu open when focus leaves the menu's composed subtree.
     *
     * NOTE: Focusout behavior will stop propagation of the focusout event. Set
     * this property to true to opt-out of menu's focuout handling altogether.
     */
    this.stayOpenOnFocusout = false
    /**
     * After closing, does not restore focus to the last focused element before
     * the menu was opened.
     */
    this.skipRestoreFocus = false
    /**
     * The element that should be focused by default once opened.
     *
     * NOTE: When setting default focus to 'LIST_ROOT', remember to change
     * `tabindex` to `0` and change md-menu's display to something other than
     * `display: contents` when necessary.
     */
    this.defaultFocus = FocusState.FIRST_ITEM
    this.typeaheadActive = true
    /**
     * Whether or not the current menu is a submenu and should not handle specific
     * navigation keys.
     *
     * @exports
     */
    this.isSubmenu = false
    /**
     * The event path of the last window pointerdown event.
     */
    this.pointerPath = []
    this.openCloseAnimationSignal = createAnimationSignal()
    this.listController = new ListController({
      isItem: maybeItem => {
        return maybeItem.hasAttribute('md-menu-item')
      },
      getPossibleItems: () => this.slotItems,
      isRtl: () => getComputedStyle(this).direction === 'rtl',
      deactivateItem: item => {
        item.selected = false
        item.tabIndex = -1
      },
      activateItem: item => {
        item.selected = true
        item.tabIndex = 0
      },
      isNavigableKey: key => {
        if (!this.isSubmenu) {
          return menuNavKeys.has(key)
        }
        const isRtl = getComputedStyle(this).direction === 'rtl'
        // we want md-submenu to handle the submenu's left/right arrow exit
        // key so it can close the menu instead of navigate the list.
        // Therefore we need to include all keys but left/right arrow close
        // key
        const arrowOpen = isRtl
          ? NavigableKeys.ArrowLeft
          : NavigableKeys.ArrowRight
        if (key === arrowOpen) {
          return true
        }
        return submenuNavKeys.has(key)
      },
    })
    /**
     * The element that was focused before the menu opened.
     */
    this.lastFocusedElement = null
    /**
     * Handles typeahead navigation through the menu.
     */
    this.typeaheadController = new TypeaheadController(() => {
      return {
        getItems: () => this.items,
        typeaheadBufferTime: this.typeaheadDelay,
        active: this.typeaheadActive,
      }
    })
    this.currentAnchorElement = null
    this.internals = polyfillElementInternalsAria(
      this,
      this /* needed for closure */.attachInternals()
    )
    /**
     * Handles positioning the surface and aligning it to the anchor as well as
     * keeping it in the viewport.
     */
    this.menuPositionController = new SurfacePositionController(this, () => {
      return {
        anchorCorner: this.anchorCorner,
        surfaceCorner: this.menuCorner,
        surfaceEl: this.surfaceEl,
        anchorEl: this.anchorElement,
        positioning: this.positioning,
        isOpen: this.open,
        xOffset: this.xOffset,
        yOffset: this.yOffset,
        onOpen: this.onOpened,
        beforeClose: this.beforeClose,
        onClose: this.onClosed,
        // We can't resize components that have overflow like menus with
        // submenus because the overflow-y will show menu items / content
        // outside the bounds of the menu. (to be fixed w/ popover API)
        repositionStrategy: this.hasOverflow ? 'move' : 'resize',
      }
    })
    this.handleFocusout = async event => {
      const anchorEl = this.anchorElement
      // Do not close if we focused out by clicking on the anchor element. We
      // can't assume anchor buttons can be the related target because of iOS does
      // not focus buttons.
      if (
        this.stayOpenOnFocusout ||
        !this.open ||
        this.pointerPath.includes(anchorEl)
      ) {
        return
      }
      if (event.relatedTarget) {
        // Don't close the menu if we are switching focus between menu,
        // md-menu-item, and md-list or if the anchor was click focused.
        if (
          isElementInSubtree(event.relatedTarget, this) ||
          isElementInSubtree(event.relatedTarget, anchorEl)
        ) {
          return
        }
      } else if (this.pointerPath.includes(this)) {
        // If menu tabindex == -1 and the user clicks on the menu or a divider, we
        // want to keep the menu open.
        return
      }
      const oldRestoreFocus = this.skipRestoreFocus
      // allow focus to continue to the next focused object rather than returning
      this.skipRestoreFocus = true
      this.close()
      // await for close
      await this.updateComplete
      // return to previous behavior
      this.skipRestoreFocus = oldRestoreFocus
    }
    /**
     * Saves the last focused element focuses the new element based on
     * `defaultFocus`, and animates open.
     */
    this.onOpened = async () => {
      this.lastFocusedElement = getFocusedElement()
      const items = this.items
      const activeItemRecord = getActiveItem(items)
      if (activeItemRecord && this.defaultFocus !== FocusState.NONE) {
        activeItemRecord.item.tabIndex = -1
      }
      let animationAborted = !this.quick
      if (this.quick) {
        this.dispatchEvent(new Event('opening'))
      } else {
        animationAborted = !!(await this.animateOpen())
      }
      // This must come after the opening animation or else it may focus one of
      // the items before the animation has begun and causes the list to slide
      // (block-padding-of-the-menu)px at the end of the animation
      switch (this.defaultFocus) {
        case FocusState.FIRST_ITEM:
          const first = getFirstActivatableItem(items)
          if (first) {
            first.tabIndex = 0
            first.focus()
            await first.updateComplete
          }
          break
        case FocusState.LAST_ITEM:
          const last = getLastActivatableItem(items)
          if (last) {
            last.tabIndex = 0
            last.focus()
            await last.updateComplete
          }
          break
        case FocusState.LIST_ROOT:
          this.focus()
          break
        default:
        case FocusState.NONE:
          // Do nothing.
          break
      }
      if (!animationAborted) {
        this.dispatchEvent(new Event('opened'))
      }
    }
    /**
     * Animates closed.
     */
    this.beforeClose = async () => {
      this.open = false
      if (!this.skipRestoreFocus) {
        this.lastFocusedElement?.focus?.()
      }
      if (!this.quick) {
        await this.animateClose()
      }
    }
    /**
     * Focuses the last focused element.
     */
    this.onClosed = () => {
      if (this.quick) {
        this.dispatchEvent(new Event('closing'))
        this.dispatchEvent(new Event('closed'))
      }
    }
    this.onWindowPointerdown = event => {
      this.pointerPath = event.composedPath()
    }
    /**
     * We cannot listen to window click because Safari on iOS will not bubble a
     * click event on window if the item clicked is not a "clickable" item such as
     * <body>
     */
    this.onDocumentClick = event => {
      if (!this.open) {
        return
      }
      const path = event.composedPath()
      if (
        !this.stayOpenOnOutsideClick &&
        !path.includes(this) &&
        !path.includes(this.anchorElement)
      ) {
        this.open = false
      }
    }
    {
      this.internals.role = 'menu'
      this.addEventListener('keydown', this.handleKeydown)
      // Capture so that we can grab the event before it reaches the menu item
      // istelf. Specifically useful for the case where typeahead encounters a
      // space and we don't want the menu item to close the menu.
      this.addEventListener('keydown', this.captureKeydown, { capture: true })
      this.addEventListener('focusout', this.handleFocusout)
    }
  }
  /**
   * The menu items associated with this menu. The items must be `MenuItem`s and
   * have both the `md-menu-item` and `md-list-item` attributes.
   */
  get items() {
    return this.listController.items
  }
  willUpdate(changed) {
    if (!changed.has('open')) {
      return
    }
    if (this.open) {
      this.removeAttribute('aria-hidden')
      return
    }
    this.setAttribute('aria-hidden', 'true')
  }
  update(changed) {
    if (changed.has('open')) {
      if (this.open) {
        this.setUpGlobalEventListeners()
      } else {
        this.cleanUpGlobalEventListeners()
      }
    }
    super.update(changed)
  }
  connectedCallback() {
    super.connectedCallback()
    if (this.open) {
      this.setUpGlobalEventListeners()
    }
  }
  disconnectedCallback() {
    super.disconnectedCallback()
    this.cleanUpGlobalEventListeners()
  }
  render() {
    return this.renderSurface()
  }
  /**
   * Renders the positionable surface element and its contents.
   */
  renderSurface() {
    return x$1`
       <div
          class="menu ${e$c(this.getSurfaceClasses())}"
          style=${o(this.menuPositionController.surfaceStyles)}>
        ${this.renderElevation()}
        <div class="items">
          <div class="item-padding">
            ${this.renderMenuItems()}
          </div>
        </div>
       </div>
     `
  }
  /**
   * Renders the menu items' slot
   */
  renderMenuItems() {
    return x$1`<slot
        @close-menu=${this.onCloseMenu}
        @deactivate-items=${this.onDeactivateItems}
        @request-activation=${this.onRequestActivation}
        @deactivate-typeahead=${this.handleDeactivateTypeahead}
        @activate-typeahead=${this.handleActivateTypeahead}
        @stay-open-on-focusout=${this.handleStayOpenOnFocusout}
        @close-on-focusout=${this.handleCloseOnFocusout}
        @slotchange=${this.listController.onSlotchange}></slot>`
  }
  /**
   * Renders the elevation component.
   */
  renderElevation() {
    return x$1`<md-elevation part="elevation"></md-elevation>`
  }
  getSurfaceClasses() {
    return {
      open: this.open,
      fixed: this.positioning === 'fixed',
      'has-overflow': this.hasOverflow,
    }
  }
  captureKeydown(event) {
    if (
      event.target === this &&
      !event.defaultPrevented &&
      isClosableKey(event.code)
    ) {
      event.preventDefault()
      this.close()
    }
    this.typeaheadController.onKeydown(event)
  }
  /**
   * Performs the opening animation:
   *
   * https://direct.googleplex.com/#/spec/295000003+271060003
   *
   * @return A promise that resolve to `true` if the animation was aborted,
   *     `false` if it was not aborted.
   */
  async animateOpen() {
    const surfaceEl = this.surfaceEl
    const slotEl = this.slotEl
    if (!surfaceEl || !slotEl) return true
    const openDirection = this.openDirection
    this.dispatchEvent(new Event('opening'))
    // needs to be imperative because we don't want to mix animation and Lit
    // render timing
    surfaceEl.classList.toggle('animating', true)
    const signal = this.openCloseAnimationSignal.start()
    const height = surfaceEl.offsetHeight
    const openingUpwards = openDirection === 'UP'
    const children = this.items
    const FULL_DURATION = 500
    const SURFACE_OPACITY_DURATION = 50
    const ITEM_OPACITY_DURATION = 250
    // We want to fit every child fade-in animation within the full duration of
    // the animation.
    const DELAY_BETWEEN_ITEMS =
      (FULL_DURATION - ITEM_OPACITY_DURATION) / children.length
    const surfaceHeightAnimation = surfaceEl.animate(
      [{ height: '0px' }, { height: `${height}px` }],
      {
        duration: FULL_DURATION,
        easing: EASING.EMPHASIZED,
      }
    )
    // When we are opening upwards, we want to make sure the last item is always
    // in view, so we need to translate it upwards the opposite direction of the
    // height animation
    const upPositionCorrectionAnimation = slotEl.animate(
      [
        { transform: openingUpwards ? `translateY(-${height}px)` : '' },
        { transform: '' },
      ],
      { duration: FULL_DURATION, easing: EASING.EMPHASIZED }
    )
    const surfaceOpacityAnimation = surfaceEl.animate(
      [{ opacity: 0 }, { opacity: 1 }],
      SURFACE_OPACITY_DURATION
    )
    const childrenAnimations = []
    for (let i = 0; i < children.length; i++) {
      // If we are animating upwards, then reverse the children list.
      const directionalIndex = openingUpwards ? children.length - 1 - i : i
      const child = children[directionalIndex]
      const animation = child.animate([{ opacity: 0 }, { opacity: 1 }], {
        duration: ITEM_OPACITY_DURATION,
        delay: DELAY_BETWEEN_ITEMS * i,
      })
      // Make them all initially hidden and then clean up at the end of each
      // animation.
      child.classList.toggle('md-menu-hidden', true)
      animation.addEventListener('finish', () => {
        child.classList.toggle('md-menu-hidden', false)
      })
      childrenAnimations.push([child, animation])
    }
    let resolveAnimation = value => {}
    const animationFinished = new Promise(resolve => {
      resolveAnimation = resolve
    })
    signal.addEventListener('abort', () => {
      surfaceHeightAnimation.cancel()
      upPositionCorrectionAnimation.cancel()
      surfaceOpacityAnimation.cancel()
      childrenAnimations.forEach(([child, animation]) => {
        child.classList.toggle('md-menu-hidden', false)
        animation.cancel()
      })
      resolveAnimation(true)
    })
    surfaceHeightAnimation.addEventListener('finish', () => {
      surfaceEl.classList.toggle('animating', false)
      this.openCloseAnimationSignal.finish()
      resolveAnimation(false)
    })
    return await animationFinished
  }
  /**
   * Performs the closing animation:
   *
   * https://direct.googleplex.com/#/spec/295000003+271060003
   */
  animateClose() {
    let resolve
    let reject
    // This promise blocks the surface position controller from setting
    // display: none on the surface which will interfere with this animation.
    const animationEnded = new Promise((res, rej) => {
      resolve = res
      reject = rej
    })
    const surfaceEl = this.surfaceEl
    const slotEl = this.slotEl
    if (!surfaceEl || !slotEl) {
      reject()
      return animationEnded
    }
    const openDirection = this.openDirection
    const closingDownwards = openDirection === 'UP'
    this.dispatchEvent(new Event('closing'))
    // needs to be imperative because we don't want to mix animation and Lit
    // render timing
    surfaceEl.classList.toggle('animating', true)
    const signal = this.openCloseAnimationSignal.start()
    const height = surfaceEl.offsetHeight
    const children = this.items
    const FULL_DURATION = 150
    const SURFACE_OPACITY_DURATION = 50
    // The surface fades away at the very end
    const SURFACE_OPACITY_DELAY = FULL_DURATION - SURFACE_OPACITY_DURATION
    const ITEM_OPACITY_DURATION = 50
    const ITEM_OPACITY_INITIAL_DELAY = 50
    const END_HEIGHT_PERCENTAGE = 0.35
    // We want to fit every child fade-out animation within the full duration of
    // the animation.
    const DELAY_BETWEEN_ITEMS =
      (FULL_DURATION - ITEM_OPACITY_INITIAL_DELAY - ITEM_OPACITY_DURATION) /
      children.length
    // The mock has the animation shrink to 35%
    const surfaceHeightAnimation = surfaceEl.animate(
      [
        { height: `${height}px` },
        { height: `${height * END_HEIGHT_PERCENTAGE}px` },
      ],
      {
        duration: FULL_DURATION,
        easing: EASING.EMPHASIZED_ACCELERATE,
      }
    )
    // When we are closing downwards, we want to make sure the last item is
    // always in view, so we need to translate it upwards the opposite direction
    // of the height animation
    const downPositionCorrectionAnimation = slotEl.animate(
      [
        { transform: '' },
        {
          transform: closingDownwards
            ? `translateY(-${height * (1 - END_HEIGHT_PERCENTAGE)}px)`
            : '',
        },
      ],
      { duration: FULL_DURATION, easing: EASING.EMPHASIZED_ACCELERATE }
    )
    const surfaceOpacityAnimation = surfaceEl.animate(
      [{ opacity: 1 }, { opacity: 0 }],
      { duration: SURFACE_OPACITY_DURATION, delay: SURFACE_OPACITY_DELAY }
    )
    const childrenAnimations = []
    for (let i = 0; i < children.length; i++) {
      // If the animation is closing upwards, then reverse the list of
      // children so that we animate in the opposite direction.
      const directionalIndex = closingDownwards ? i : children.length - 1 - i
      const child = children[directionalIndex]
      const animation = child.animate([{ opacity: 1 }, { opacity: 0 }], {
        duration: ITEM_OPACITY_DURATION,
        delay: ITEM_OPACITY_INITIAL_DELAY + DELAY_BETWEEN_ITEMS * i,
      })
      // Make sure the items stay hidden at the end of each child animation.
      // We clean this up at the end of the overall animation.
      animation.addEventListener('finish', () => {
        child.classList.toggle('md-menu-hidden', true)
      })
      childrenAnimations.push([child, animation])
    }
    signal.addEventListener('abort', () => {
      surfaceHeightAnimation.cancel()
      downPositionCorrectionAnimation.cancel()
      surfaceOpacityAnimation.cancel()
      childrenAnimations.forEach(([child, animation]) => {
        animation.cancel()
        child.classList.toggle('md-menu-hidden', false)
      })
      reject()
    })
    surfaceHeightAnimation.addEventListener('finish', () => {
      surfaceEl.classList.toggle('animating', false)
      childrenAnimations.forEach(([child]) => {
        child.classList.toggle('md-menu-hidden', false)
      })
      this.openCloseAnimationSignal.finish()
      this.dispatchEvent(new Event('closed'))
      resolve(true)
    })
    return animationEnded
  }
  handleKeydown(event) {
    // At any key event, the pointer interaction is done so we need to clear our
    // cached pointerpath. This handles the case where the user clicks on the
    // anchor, and then hits shift+tab
    this.pointerPath = []
    this.listController.handleKeydown(event)
  }
  setUpGlobalEventListeners() {
    document.addEventListener('click', this.onDocumentClick, { capture: true })
    window.addEventListener('pointerdown', this.onWindowPointerdown)
  }
  cleanUpGlobalEventListeners() {
    document.removeEventListener('click', this.onDocumentClick, {
      capture: true,
    })
    window.removeEventListener('pointerdown', this.onWindowPointerdown)
  }
  onCloseMenu() {
    this.close()
  }
  onDeactivateItems(event) {
    event.stopPropagation()
    this.listController.onDeactivateItems()
  }
  onRequestActivation(event) {
    event.stopPropagation()
    this.listController.onRequestActivation(event)
  }
  handleDeactivateTypeahead(event) {
    // stopPropagation so that this does not deactivate any typeaheads in menus
    // nested above it e.g. md-sub-menu
    event.stopPropagation()
    this.typeaheadActive = false
  }
  handleActivateTypeahead(event) {
    // stopPropagation so that this does not activate any typeaheads in menus
    // nested above it e.g. md-sub-menu
    event.stopPropagation()
    this.typeaheadActive = true
  }
  handleStayOpenOnFocusout(event) {
    event.stopPropagation()
    this.stayOpenOnFocusout = true
  }
  handleCloseOnFocusout(event) {
    event.stopPropagation()
    this.stayOpenOnFocusout = false
  }
  close() {
    this.open = false
    const maybeSubmenu = this.slotItems
    maybeSubmenu.forEach(item => {
      item.close?.()
    })
  }
  show() {
    this.open = true
  }
  /**
   * Activates the next item in the menu. If at the end of the menu, the first
   * item will be activated.
   *
   * @return The activated menu item or `null` if there are no items.
   */
  activateNextItem() {
    return this.listController.activateNextItem() ?? null
  }
  /**
   * Activates the previous item in the menu. If at the start of the menu, the
   * last item will be activated.
   *
   * @return The activated menu item or `null` if there are no items.
   */
  activatePreviousItem() {
    return this.listController.activatePreviousItem() ?? null
  }
}
;(() => {
  // We want to manage tabindex ourselves.
  setupHostAria(Menu, { focusable: false })
})()
__decorate([e$g('.menu')], Menu.prototype, 'surfaceEl', void 0)
__decorate([e$g('slot')], Menu.prototype, 'slotEl', void 0)
__decorate([n$b()], Menu.prototype, 'anchor', void 0)
__decorate([n$b()], Menu.prototype, 'positioning', void 0)
__decorate([n$b({ type: Boolean })], Menu.prototype, 'quick', void 0)
__decorate(
  [n$b({ type: Boolean, attribute: 'has-overflow' })],
  Menu.prototype,
  'hasOverflow',
  void 0
)
__decorate(
  [n$b({ type: Boolean, reflect: true })],
  Menu.prototype,
  'open',
  void 0
)
__decorate(
  [n$b({ type: Number, attribute: 'x-offset' })],
  Menu.prototype,
  'xOffset',
  void 0
)
__decorate(
  [n$b({ type: Number, attribute: 'y-offset' })],
  Menu.prototype,
  'yOffset',
  void 0
)
__decorate(
  [n$b({ type: Number, attribute: 'typeahead-delay' })],
  Menu.prototype,
  'typeaheadDelay',
  void 0
)
__decorate(
  [n$b({ attribute: 'anchor-corner' })],
  Menu.prototype,
  'anchorCorner',
  void 0
)
__decorate(
  [n$b({ attribute: 'menu-corner' })],
  Menu.prototype,
  'menuCorner',
  void 0
)
__decorate(
  [n$b({ type: Boolean, attribute: 'stay-open-on-outside-click' })],
  Menu.prototype,
  'stayOpenOnOutsideClick',
  void 0
)
__decorate(
  [n$b({ type: Boolean, attribute: 'stay-open-on-focusout' })],
  Menu.prototype,
  'stayOpenOnFocusout',
  void 0
)
__decorate(
  [n$b({ type: Boolean, attribute: 'skip-restore-focus' })],
  Menu.prototype,
  'skipRestoreFocus',
  void 0
)
__decorate(
  [n$b({ attribute: 'default-focus' })],
  Menu.prototype,
  'defaultFocus',
  void 0
)
__decorate([o$c({ flatten: true })], Menu.prototype, 'slotItems', void 0)
__decorate([r$8()], Menu.prototype, 'typeaheadActive', void 0)

/**
 * @license
 * Copyright 2022 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */
const styles$7 = i$8`:host{--md-elevation-level: var(--md-menu-container-elevation, 2);--md-elevation-shadow-color: var(--md-menu-container-shadow-color, var(--md-sys-color-shadow, #000));min-width:112px;color:unset;display:contents}md-focus-ring{--md-focus-ring-shape: var(--md-menu-container-shape, 4px)}.menu{border-radius:var(--md-menu-container-shape, 4px);display:none;opacity:0;z-index:20;position:absolute;user-select:none;max-height:inherit;height:inherit;min-width:inherit;max-width:inherit}.fixed{position:fixed}.items{display:block;list-style-type:none;margin:0;outline:none;box-sizing:border-box;background-color:var(--md-menu-container-color, var(--md-sys-color-surface-container, #f3edf7));height:inherit;max-height:inherit;overflow:auto;min-width:inherit;max-width:inherit;border-radius:inherit}.item-padding{padding-block:8px}.has-overflow .items{overflow:visible}.animating .items{overflow:hidden}.has-overflow.animating .items{pointer-events:none}.animating ::slotted(.md-menu-hidden){opacity:0}slot{display:block;height:inherit;max-height:inherit}::slotted(:is(md-divider,[role=separator])){margin:8px 0}@media(forced-colors: active){.menu{border-style:solid;border-color:CanvasText;border-width:1px}}/*# sourceMappingURL=menu-styles.css.map */
`

/**
 * @license
 * Copyright 2022 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */
/**
 * @summary Menus display a list of choices on a temporary surface.
 *
 * @description
 * Menus appear when users interact with a button, action, or other control.
 *
 * They can be opened from a variety of elements, most commonly icon buttons,
 * buttons, and text fields.
 *
 * md-menu listens for the `close-menu` and `deselect-items` events.
 *
 * - `close-menu` closes the menu when dispatched from a child element.
 * - `deselect-items` deselects all of its immediate menu-item children.
 *
 * @example
 * ```html
 * <div style="position:relative;">
 *   <button
 *       id="anchor"
 *       @click=${() => this.menuRef.value.show()}>
 *     Click to open menu
 *   </button>
 *   <!--
 *     `has-overflow` is required when using a submenu which overflows the
 *     menu's contents.
 *
 *     Additionally, `anchor` ingests an idref which do not pass through shadow
 *     roots. You can also set `.anchorElement` to an element reference if
 *     necessary.
 *   -->
 *   <md-menu anchor="anchor" has-overflow ${ref(menuRef)}>
 *     <md-menu-item headline="This is a headline"></md-menu-item>
 *     <md-sub-menu>
 *       <md-menu-item
 *           slot="item"
 *           headline="this is a submenu item">
 *       </md-menu-item>
 *       <md-menu slot="menu">
 *         <md-menu-item headline="This is an item inside a submenu">
 *         </md-menu-item>
 *       </md-menu>
 *     </md-sub-menu>
 *   </md-menu>
 * </div>
 * ```
 *
 * @final
 * @suppress {visibility}
 */
let MdMenu = class MdMenu extends Menu {}
MdMenu.styles = [styles$7]
MdMenu = __decorate([t$9('md-menu')], MdMenu)

/**
 * @license
 * Copyright 2023 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */
/**
 * An item layout component.
 */
class Item extends s$9 {
  constructor() {
    super(...arguments)
    /**
     * Only needed for SSR.
     *
     * Add this attribute when an item has two lines to avoid a Flash Of Unstyled
     * Content. This attribute is not needed for single line items or items with
     * three or more lines.
     */
    this.multiline = false
  }
  render() {
    return x$1`
      <slot name="container"></slot>
      <slot class="non-text" name="start"></slot>
      <div class="text">
        <slot name="overline"
            @slotchange=${this.handleTextSlotChange}></slot>
        <slot class="default-slot"
            @slotchange=${this.handleTextSlotChange}></slot>
        <slot name="headline"
            @slotchange=${this.handleTextSlotChange}></slot>
        <slot name="supporting-text"
            @slotchange=${this.handleTextSlotChange}></slot>
      </div>
      <slot class="non-text" name="trailing-supporting-text"></slot>
      <slot class="non-text" name="end"></slot>
    `
  }
  handleTextSlotChange() {
    // Check if there's more than one text slot with content. If so, the item is
    // multiline, which has a different min-height than single line items.
    let isMultiline = false
    let slotsWithContent = 0
    for (const slot of this.textSlots) {
      if (slotHasContent(slot)) {
        slotsWithContent += 1
      }
      if (slotsWithContent > 1) {
        isMultiline = true
        break
      }
    }
    this.multiline = isMultiline
  }
}
__decorate(
  [n$b({ type: Boolean, reflect: true })],
  Item.prototype,
  'multiline',
  void 0
)
__decorate([r$7('.text slot')], Item.prototype, 'textSlots', void 0)
function slotHasContent(slot) {
  for (const node of slot.assignedNodes({ flatten: true })) {
    // Assume there's content if there's an element slotted in
    const isElement = node.nodeType === Node.ELEMENT_NODE
    // If there's only text nodes for the default slot, check if there's
    // non-whitespace.
    const isTextWithContent =
      node.nodeType === Node.TEXT_NODE && node.textContent?.match(/\S/)
    if (isElement || isTextWithContent) {
      return true
    }
  }
  return false
}

/**
 * @license
 * Copyright 2022 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */
const styles$6 = i$8`:host{color:var(--md-sys-color-on-surface, #1d1b20);font-family:var(--md-sys-typescale-body-large-font, var(--md-ref-typeface-plain, Roboto));font-size:var(--md-sys-typescale-body-large-size, 1rem);font-weight:var(--md-sys-typescale-body-large-weight, var(--md-ref-typeface-weight-regular, 400));line-height:var(--md-sys-typescale-body-large-line-height, 1.5rem);align-items:center;box-sizing:border-box;display:flex;gap:16px;min-height:56px;overflow:hidden;padding:12px 16px;position:relative;text-overflow:ellipsis}:host([multiline]){min-height:72px}[name=overline]{color:var(--md-sys-color-on-surface-variant, #49454f);font-family:var(--md-sys-typescale-label-small-font, var(--md-ref-typeface-plain, Roboto));font-size:var(--md-sys-typescale-label-small-size, 0.6875rem);font-weight:var(--md-sys-typescale-label-small-weight, var(--md-ref-typeface-weight-medium, 500));line-height:var(--md-sys-typescale-label-small-line-height, 1rem)}[name=supporting-text]{color:var(--md-sys-color-on-surface-variant, #49454f);font-family:var(--md-sys-typescale-body-medium-font, var(--md-ref-typeface-plain, Roboto));font-size:var(--md-sys-typescale-body-medium-size, 0.875rem);font-weight:var(--md-sys-typescale-body-medium-weight, var(--md-ref-typeface-weight-regular, 400));line-height:var(--md-sys-typescale-body-medium-line-height, 1.25rem)}[name=trailing-supporting-text]{color:var(--md-sys-color-on-surface-variant, #49454f);font-family:var(--md-sys-typescale-label-small-font, var(--md-ref-typeface-plain, Roboto));font-size:var(--md-sys-typescale-label-small-size, 0.6875rem);font-weight:var(--md-sys-typescale-label-small-weight, var(--md-ref-typeface-weight-medium, 500));line-height:var(--md-sys-typescale-label-small-line-height, 1rem)}[name=container]::slotted(*){inset:0;position:absolute}.default-slot{display:inline}.default-slot,.text ::slotted(*){overflow:hidden;text-overflow:ellipsis}.text{display:flex;flex:1;flex-direction:column;overflow:hidden}/*# sourceMappingURL=item-styles.css.map */
`

/**
 * @license
 * Copyright 2023 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */
/**
 * An item layout component that can be used inside list items to give them
 * their customizable structure.
 *
 * `<md-item>` does not have any functionality, which must be added by the
 * component using it.
 *
 * All text will wrap unless `white-space: nowrap` is set on the item or any of
 * its children.
 *
 * Slots available:
 * - `<default>`: The headline, or custom content.
 * - `headline`: The first line.
 * - `supporting-text`: Supporting text lines underneath the headline.
 * - `trailing-supporting-text`: A small text snippet at the end of the item.
 * - `start`: Any leading content, such as icons, avatars, or checkboxes.
 * - `end`: Any trailing content, such as icons and buttons.
 * - `container`: Background container content, intended for adding additional
 *     styles, such as ripples or focus rings.
 *
 * @example
 * ```html
 * <md-item>Single line</md-item>
 *
 * <md-item>
 *   <div class="custom-content">...</div>
 * </md-item>
 *
 * <!-- Classic 1 to 3+ line list items -->
 * <md-item>
 *   <md-icon slot="start">image</md-icon>
 *   <div slot="overline">Overline</div>
 *   <div slot="headline">Headline</div>
 *   <div="supporting-text">Supporting text</div>
 *   <div="trailing-supporting-text">Trailing</div>
 *   <md-icon slot="end">image</md-icon>
 * </md-item>
 * ```
 *
 * When wrapping `<md-item>`, forward the available slots to use the same slot
 * structure for the wrapping component (this is what `<md-list-item>` does).
 *
 * @example
 * ```html
 * <md-item>
 *   <slot></slot>
 *   <slot name="overline" slot="overline"></slot>
 *   <slot name="headline" slot="headline"></slot>
 *   <slot name="supporting-text" slot="supporting-text"></slot>
 *   <slot name="trailing-supporting-text"
 *       slot="trailing-supporting-text"></slot>
 *   <slot name="start" slot="start"></slot>
 *   <slot name="end" slot="end"></slot>
 * </md-item>
 * ```
 */
let MdItem = class MdItem extends Item {}
MdItem.styles = [styles$6]
MdItem = __decorate([t$9('md-item')], MdItem)

/**
 * @license
 * Copyright 2023 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */
/**
 * A controller that provides most functionality of an element that implements
 * the MenuItem interface.
 */
class MenuItemController {
  /**
   * @param host The MenuItem in which to attach this controller to.
   * @param config The object that configures this controller's behavior.
   */
  constructor(host, config) {
    this.host = host
    this.internalTypeaheadText = null
    /**
     * Bind this click listener to the interactive element. Handles closing the
     * menu.
     */
    this.onClick = () => {
      if (this.host.keepOpen) return
      this.host.dispatchEvent(
        createDefaultCloseMenuEvent(this.host, {
          kind: CloseReason.CLICK_SELECTION,
        })
      )
    }
    /**
     * Bind this click listener to the interactive element. Handles closing the
     * menu.
     */
    this.onKeydown = event => {
      // Check if the interactive element is an anchor tag. If so, click it.
      if (this.host.href && event.code === 'Enter') {
        const interactiveElement = this.getInteractiveElement()
        if (interactiveElement instanceof HTMLAnchorElement) {
          interactiveElement.click()
        }
      }
      if (this.host.keepOpen || event.defaultPrevented) return
      const keyCode = event.code
      if (!event.defaultPrevented && isClosableKey(keyCode)) {
        event.preventDefault()
        this.host.dispatchEvent(
          createDefaultCloseMenuEvent(this.host, {
            kind: CloseReason.KEYDOWN,
            key: keyCode,
          })
        )
      }
    }
    const { getHeadlineElements, getInteractiveElement } = config
    this.getHeadlineElements = getHeadlineElements
    this.getInteractiveElement = getInteractiveElement
    this.host.addController(this)
  }
  /**
   * The text that is selectable via typeahead. If not set, defaults to the
   * innerText of the item slotted into the `"headline"` slot.
   */
  get typeaheadText() {
    if (this.internalTypeaheadText !== null) {
      return this.internalTypeaheadText
    }
    const headlineElements = this.getHeadlineElements()
    const textParts = []
    headlineElements.forEach(headlineElement => {
      if (headlineElement.textContent && headlineElement.textContent.trim()) {
        textParts.push(headlineElement.textContent.trim())
      }
    })
    return textParts.join(' ')
  }
  /**
   * The recommended tag name to render as the list item.
   */
  get tagName() {
    const type = this.host.type
    switch (type) {
      case 'link':
        return 'a'
      case 'button':
        return 'button'
      default:
      case 'menuitem':
      case 'option':
        return 'li'
    }
  }
  /**
   * The recommended role of the menu item.
   */
  get role() {
    return this.host.type === 'option' ? 'option' : 'menuitem'
  }
  hostConnected() {
    this.host.toggleAttribute('md-menu-item', true)
  }
  hostUpdate() {
    if (this.host.href) {
      this.host.type = 'link'
    }
  }
  /**
   * Use to set the typeaheadText when it changes.
   */
  setTypeaheadText(text) {
    this.internalTypeaheadText = text
  }
}

/**
 * @license
 * Copyright 2022 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */
/**
 * @fires close-menu {CloseMenuEvent}
 */
class MenuItemEl extends s$9 {
  constructor() {
    super(...arguments)
    /**
     * Disables the item and makes it non-selectable and non-interactive.
     */
    this.disabled = false
    /**
     * Sets the behavior and role of the menu item, defaults to "menuitem".
     */
    this.type = 'menuitem'
    /**
     * Sets the underlying `HTMLAnchorElement`'s `href` resource attribute.
     */
    this.href = ''
    /**
     * Sets the underlying `HTMLAnchorElement`'s `target` attribute when `href` is
     * set.
     */
    this.target = ''
    /**
     * Keeps the menu open if clicked or keyboard selected.
     */
    this.keepOpen = false
    /**
     * Sets the item in the selected visual state when a submenu is opened.
     */
    this.selected = false
    this.menuItemController = new MenuItemController(this, {
      getHeadlineElements: () => {
        return this.headlineElements
      },
      getInteractiveElement: () => this.listItemRoot,
    })
  }
  /**
   * The text that is selectable via typeahead. If not set, defaults to the
   * innerText of the item slotted into the `"headline"` slot.
   */
  get typeaheadText() {
    return this.menuItemController.typeaheadText
  }
  set typeaheadText(text) {
    this.menuItemController.setTypeaheadText(text)
  }
  render() {
    return this.renderListItem(x$1`
      <md-item>
        <div slot="container">
          ${this.renderRipple()}
          ${this.renderFocusRing()}
        </div>
        <slot name="start" slot="start"></slot>
        <slot name="end" slot="end"></slot>
        ${this.renderBody()}
      </md-item>
    `)
  }
  /**
   * Renders the root list item.
   *
   * @param content the child content of the list item.
   */
  renderListItem(content) {
    const isAnchor = this.type === 'link'
    let tag
    switch (this.menuItemController.tagName) {
      case 'a':
        tag = s$8`a`
        break
      case 'button':
        tag = s$8`button`
        break
      default:
      case 'li':
        tag = s$8`li`
        break
    }
    // TODO(b/265339866): announce "button"/"link" inside of a list item. Until
    // then all are "menuitem" roles for correct announcement.
    const target = isAnchor && !!this.target ? this.target : T$1
    return n$9`
      <${tag}
        id="item"
        tabindex=${this.disabled && !isAnchor ? -1 : 0}
        role=${this.menuItemController.role}
        aria-label=${this.ariaLabel || T$1}
        aria-selected=${this.ariaSelected || T$1}
        aria-checked=${this.ariaChecked || T$1}
        aria-expanded=${this.ariaExpanded || T$1}
        aria-haspopup=${this.ariaHasPopup || T$1}
        class="list-item ${e$c(this.getRenderClasses())}"
        href=${this.href || T$1}
        target=${target}
        @click=${this.menuItemController.onClick}
        @keydown=${this.menuItemController.onKeydown}
      >${content}</${tag}>
    `
  }
  /**
   * Handles rendering of the ripple element.
   */
  renderRipple() {
    return x$1`
      <md-ripple
          part="ripple"
          for="item"
          ?disabled=${this.disabled}></md-ripple>`
  }
  /**
   * Handles rendering of the focus ring.
   */
  renderFocusRing() {
    return x$1`
      <md-focus-ring
          part="focus-ring"
          for="item"
          inward></md-focus-ring>`
  }
  /**
   * Classes applied to the list item root.
   */
  getRenderClasses() {
    return {
      disabled: this.disabled,
      selected: this.selected,
    }
  }
  /**
   * Handles rendering the headline and supporting text.
   */
  renderBody() {
    return x$1`
      <slot></slot>
      <slot name="overline" slot="overline"></slot>
      <slot name="headline" slot="headline"></slot>
      <slot name="supporting-text" slot="supporting-text"></slot>
      <slot name="trailing-supporting-text"
          slot="trailing-supporting-text"></slot>
    `
  }
  focus() {
    // TODO(b/300334509): needed for some cases where delegatesFocus doesn't
    // work programmatically like in FF and select-option
    this.listItemRoot?.focus()
  }
}
;(() => {
  requestUpdateOnAriaChange(MenuItemEl)
})()
/** @nocollapse */
MenuItemEl.shadowRootOptions = {
  ...s$9.shadowRootOptions,
  delegatesFocus: true,
}
__decorate(
  [n$b({ type: Boolean, reflect: true })],
  MenuItemEl.prototype,
  'disabled',
  void 0
)
__decorate([n$b()], MenuItemEl.prototype, 'type', void 0)
__decorate([n$b()], MenuItemEl.prototype, 'href', void 0)
__decorate([n$b()], MenuItemEl.prototype, 'target', void 0)
__decorate(
  [n$b({ type: Boolean, attribute: 'keep-open' })],
  MenuItemEl.prototype,
  'keepOpen',
  void 0
)
__decorate([n$b({ type: Boolean })], MenuItemEl.prototype, 'selected', void 0)
__decorate([e$g('.list-item')], MenuItemEl.prototype, 'listItemRoot', void 0)
__decorate(
  [o$c({ slot: 'headline' })],
  MenuItemEl.prototype,
  'headlineElements',
  void 0
)
__decorate(
  [n$b({ attribute: 'typeahead-text' })],
  MenuItemEl.prototype,
  'typeaheadText',
  null
)

/**
 * @license
 * Copyright 2022 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */
const styles$5 = i$8`:host{display:flex;--md-ripple-hover-color: var(--md-menu-item-hover-state-layer-color, var(--md-sys-color-on-surface, #1d1b20));--md-ripple-hover-opacity: var(--md-menu-item-hover-state-layer-opacity, 0.08);--md-ripple-pressed-color: var(--md-menu-item-pressed-state-layer-color, var(--md-sys-color-on-surface, #1d1b20));--md-ripple-pressed-opacity: var(--md-menu-item-pressed-state-layer-opacity, 0.12)}:host([disabled]){opacity:var(--md-menu-item-disabled-opacity, 0.3);pointer-events:none}md-focus-ring{z-index:1;--md-focus-ring-shape: 8px}a,button,li{background:none;border:none;padding:0;margin:0;text-align:unset;text-decoration:none}.list-item{border-radius:inherit;display:flex;flex:1;max-width:inherit;min-width:inherit;outline:none;-webkit-tap-highlight-color:rgba(0,0,0,0)}.list-item:not(.disabled){cursor:pointer}[slot=container]{pointer-events:none}md-ripple{border-radius:inherit}md-item{border-radius:inherit;flex:1;color:var(--md-menu-item-label-text-color, var(--md-sys-color-on-surface, #1d1b20));font-family:var(--md-menu-item-label-text-font, var(--md-sys-typescale-body-large-font, var(--md-ref-typeface-plain, Roboto)));font-size:var(--md-menu-item-label-text-size, var(--md-sys-typescale-body-large-size, 1rem));line-height:var(--md-menu-item-label-text-line-height, var(--md-sys-typescale-body-large-line-height, 1.5rem));font-weight:var(--md-menu-item-label-text-weight, var(--md-sys-typescale-body-large-weight, var(--md-ref-typeface-weight-regular, 400)));min-height:var(--md-menu-item-one-line-container-height, 56px);padding-top:var(--md-menu-item-top-space, 12px);padding-bottom:var(--md-menu-item-bottom-space, 12px);padding-inline-start:var(--md-menu-item-leading-space, 16px);padding-inline-end:var(--md-menu-item-trailing-space, 16px)}md-item[multiline]{min-height:var(--md-menu-item-two-line-container-height, 72px)}[slot=supporting-text]{color:var(--md-menu-item-supporting-text-color, var(--md-sys-color-on-surface-variant, #49454f));font-family:var(--md-menu-item-supporting-text-font, var(--md-sys-typescale-body-medium-font, var(--md-ref-typeface-plain, Roboto)));font-size:var(--md-menu-item-supporting-text-size, var(--md-sys-typescale-body-medium-size, 0.875rem));line-height:var(--md-menu-item-supporting-text-line-height, var(--md-sys-typescale-body-medium-line-height, 1.25rem));font-weight:var(--md-menu-item-supporting-text-weight, var(--md-sys-typescale-body-medium-weight, var(--md-ref-typeface-weight-regular, 400)))}[slot=trailing-supporting-text]{color:var(--md-menu-item-trailing-supporting-text-color, var(--md-sys-color-on-surface-variant, #49454f));font-family:var(--md-menu-item-trailing-supporting-text-font, var(--md-sys-typescale-label-small-font, var(--md-ref-typeface-plain, Roboto)));font-size:var(--md-menu-item-trailing-supporting-text-size, var(--md-sys-typescale-label-small-size, 0.6875rem));line-height:var(--md-menu-item-trailing-supporting-text-line-height, var(--md-sys-typescale-label-small-line-height, 1rem));font-weight:var(--md-menu-item-trailing-supporting-text-weight, var(--md-sys-typescale-label-small-weight, var(--md-ref-typeface-weight-medium, 500)))}:is([slot=start],[slot=end])::slotted(*){fill:currentColor}[slot=start]{color:var(--md-menu-item-leading-icon-color, var(--md-sys-color-on-surface-variant, #49454f))}[slot=end]{color:var(--md-menu-item-trailing-icon-color, var(--md-sys-color-on-surface-variant, #49454f))}.list-item.selected{background-color:var(--md-menu-item-selected-container-color, var(--md-sys-color-secondary-container, #e8def8))}.selected:not(.disabled) ::slotted(*){color:var(--md-menu-item-selected-label-text-color, var(--md-sys-color-on-secondary-container, #1d192b))}@media(forced-colors: active){:host([disabled]),:host([disabled]) slot{color:GrayText;opacity:1}.list-item{position:relative}.list-item.selected::before{content:"";position:absolute;inset:0;box-sizing:border-box;border-radius:inherit;pointer-events:none;border:3px double CanvasText}}/*# sourceMappingURL=menu-item-styles.css.map */
`

/**
 * @license
 * Copyright 2022 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */
/**
 * @summary Menus display a list of choices on a temporary surface.
 *
 * @description
 * Menu items are the selectable choices within the menu. Menu items must
 * implement the `MenuItem` interface and also have the `md-menu-item`
 * attribute. Additionally menu items are list items so they must also have the
 * `md-list-item` attribute.
 *
 * Menu items can control a menu by selectively firing the `close-menu` and
 * `deselect-items` events.
 *
 * @final
 * @suppress {visibility}
 */
let MdMenuItem = class MdMenuItem extends MenuItemEl {}
MdMenuItem.styles = [styles$5]
MdMenuItem = __decorate([t$9('md-menu-item')], MdMenuItem)

let LayerSettings = class LayerSettings extends s$4 {
  constructor() {
    super(...arguments)
    this.name = ''
    this.otherImages = []
    this.enable = true
    this.menuRef = e()
    this.anchorRef = e()
    // avoid overflow: hidden on parents clipping menu
    this.floatingAnchor = makeHtml(`<div class="${style.floater}"></div>`)
    this.stateService = new s$2(this, viewerContext, undefined, true)
  }
  connectedCallback() {
    super.connectedCallback()
    document.body.appendChild(this.floatingAnchor)
  }
  disconnectedCallback() {
    super.disconnectedCallback()
    document.body.removeChild(this.floatingAnchor)
  }
  showMenu() {
    var _a, _b
    if (!this.enable) return
    const { top = 0, left = 0 } =
      (_b =
        (_a = this.anchorRef.value) === null || _a === void 0
          ? void 0
          : _a.getBoundingClientRect()) !== null && _b !== void 0
        ? _b
        : {}
    this.floatingAnchor.style.top = `${top}px`
    this.floatingAnchor.style.left = `${left}px`
    if (this.menuRef.value) {
      this.floatingAnchor.appendChild(this.menuRef.value)
      this.menuRef.value.anchorElement = this.floatingAnchor
      this.menuRef.value.show()
    }
  }
  compareWith(name, method) {
    var _a
    ;(_a = this.stateService.value) === null || _a === void 0
      ? void 0
      : _a.service.send({
          type: 'COMPARE_IMAGES',
          data: {
            name: this.name,
            fixedImageName: name,
            options: { method },
          },
        })
  }
  stopComparing() {
    var _a
    ;(_a = this.stateService.value) === null || _a === void 0
      ? void 0
      : _a.service.send({
          type: 'COMPARE_IMAGES',
          data: {
            name: this.name,
            options: { method: 'disabled' },
          },
        })
  }
  render() {
    return y`
      <div
        @click=${() => {
          this.showMenu()
          this.render()
        }}
        class=${this.enable ? 'clickable' : ''}
      >
        <slot></slot>
        <div ${n$1(this.anchorRef)} style="position:relative; z-index: 4000;">
          <md-menu ${n$1(this.menuRef)} style="min-width: 280px;">
            ${o$1(
              this.otherImages,
              name => y`
                  <md-menu-item
                    @click=${() => this.compareWith(name, 'checkerboard')}
                  >
                    <div slot="headline">
                      "Checkerboard compare with ${name}"
                    </div>
                  </md-menu-item>
                  <md-menu-item
                    @click=${() => this.compareWith(name, 'green-magenta')}
                  >
                    <div slot="headline">
                      "Green-Magenta compare with ${name}"
                    </div>
                  </md-menu-item>
                  <md-menu-item
                    @click=${() => this.compareWith(name, 'cyan-red')}
                  >
                    <div slot="headline">
                      "Cyan-Red compare with ${name}"
                    </div>
                  </md-menu-item>
                  <md-menu-item
                    @click=${() => this.compareWith(name, 'cyan-magenta')}
                  >
                    <div slot="headline">
                      "Cyan-Magenta compare with ${name}"
                    </div>
                  </md-menu-item>
                  <md-menu-item @click=${() => this.compareWith(name, 'blend')}>
                    <div slot="headline">
                      "Blend compare with ${name}"
                    </div>
                  </md-menu-item>
                `
            )}
            <md-menu-item @click=${this.stopComparing}>
              <div slot="headline">
                "Stop comparing"
              </div>
            </md-menu-item>
          </md-menu>
        </div>
      </div>
    `
  }
}
LayerSettings.styles = i$4`
    .clickable {
      cursor: pointer;
    }
  `
__decorate([e$6()], LayerSettings.prototype, 'name', void 0)
__decorate([e$6()], LayerSettings.prototype, 'otherImages', void 0)
__decorate([e$6()], LayerSettings.prototype, 'enable', void 0)
LayerSettings = __decorate([e$7('layer-settings')], LayerSettings)

let LayerIcon = class LayerIcon extends s$4 {
  constructor() {
    super(...arguments)
    this.layer = { type: 'image' }
    this.name = ''
    this.settingsOpen = true
    this.otherImages = connectState_1(
      viewerContext,
      this,
      state =>
        [...state.context.layers.actorContext.keys()].filter(key => {
          var _a, _b
          return (
            key !== this.name &&
            ((_b =
              (_a = state.context.images.actorContext.get(this.name)) ===
                null || _a === void 0
                ? void 0
                : _a.labelImage) === null || _b === void 0
              ? void 0
              : _b.name) !== key
          )
        }),
      compareArrays_1
    )
    this.selectedName = connectState_1(
      viewerContext,
      this,
      state => state.context.images.selectedName
    )
  }
  getIcon() {
    if (this.layer.type === 'image') {
      if (
        this.name === this.selectedName.value &&
        this.otherImages.value &&
        this.otherImages.value.length > 0
      )
        return { icon: optimizedSVGDataUri$6, alt: 'settings' }
      return { icon: optimizedSVGDataUri$o, alt: 'image' }
    }
    if (this.layer.type === 'labelImage')
      return { icon: optimizedSVGDataUri$l, alt: 'labels' }
    throw new Error(`Unsupported layer type: ${this.layer.type}`)
  }
  render() {
    const { icon, alt } = this.getIcon()
    const settingsPossible = alt === 'settings'
    return y`
      <div>
        <layer-settings
          .name=${this.name}
          .otherImages=${this.otherImages.value}
          .enable=${settingsPossible}
        >
          <img src="${icon}" alt="${alt}" class="icon" />
        </layer-settings>
      </div>
    `
  }
}
LayerIcon.styles = i$4`
    .icon {
      height: 1.2em;
      width: 1.2em;
      padding-top: 2px;
      padding-bottom: 2px;
      padding-left: 8px;
      padding-right: 6px;
    }
  `
__decorate([e$6()], LayerIcon.prototype, 'layer', void 0)
__decorate([e$6()], LayerIcon.prototype, 'name', void 0)
__decorate([t$3()], LayerIcon.prototype, 'settingsOpen', void 0)
LayerIcon = __decorate([e$7('layer-icon')], LayerIcon)

// from itk-wasm/packages/image-io/typescript/src/extension-to-image-io.ts
// Commented out formats failed roundtrip test
var extensionToImageIo = new Map([
  // ['bmp', 'bmp'],

  // ['dcm', 'gdcm'],

  // ['gipl', 'gipl'],
  // ['gipl.gz', 'gipl'],

  ['hdf5', 'hdf5'],
  // ['jpg', 'jpeg'],
  // ['jpeg', 'jpeg'],

  // ['iwi', 'wasm'],
  ['iwi.cbor', 'wasm'],
  // ['iwi.cbor.zst', 'wasmZstd'],

  // ['lsm', 'lsm'],

  // ['mnc', 'mnc'],
  // ['mnc.gz', 'mnc'],
  // ['mnc2', 'mnc'],

  // ['mgh', 'mgh'],
  // ['mgz', 'mgh'],
  // ['mgh.gz', 'mgh'],

  ['mha', 'meta'],
  // ['mhd', 'meta'],

  // ['mrc', 'mrc'],

  // ['nia', 'nifti'],
  ['nii', 'nifti'],
  ['nii.gz', 'nifti'],
  // ['hdr', 'nifti'],

  ['nrrd', 'nrrd'],
  // ['nhdr', 'nrrd'],

  // ['png', 'png'],

  // ['pic', 'bioRad'],

  ['tif', 'tiff'],
  // ['tiff', 'tiff'],

  ['vtk', 'vtk'],

  // ['isq', 'scanco'],
  // ['aim', 'scanco'],

  // ['fdf', 'fdf'],
])

var extensions = Array.from(extensionToImageIo.keys())

var dialog
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
    .concat(optimizedSVGDataUri$4, '" alt="visible"/></label>')
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
    .concat(optimizedSVGDataUri$m, ' alt="invisible""/></label>')
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
  var imageIcons = document.createElement('div')
  imageIcons.style.display = 'flex'
  imageIcons.setAttribute('class', ''.concat(style.iconGroup))
  layerEntry.appendChild(imageIcons)
  var spinner = document.createElement('div')
  spinner.setAttribute('class', ''.concat(style.ldsRing))
  spinner.innerHTML = '<div></div><div></div><div></div><div></div>'
  imageIcons.appendChild(spinner)
  layer.spinner = spinner
  var layerBBoxButton = document.createElement('div')
  layerBBoxButton.innerHTML = '<input id="'
    .concat(context.id, '-layerBBoxButton" type="checkbox" class="')
    .concat(
      style.toggleInput,
      '"><label itk-vtk-tooltip itk-vtk-tooltip-top itk-vtk-tooltip-content="Bounding Box" class="'
    )
    .concat(style.toggleButton, '" for="')
    .concat(context.id, '-layerBBoxButton"><img src="')
    .concat(optimizedSVGDataUri$u, '" alt="bbox"/></label>')
  var layerBBoxButtonInput = layerBBoxButton.children[0]
  var layerBBoxLabel = layerBBoxButton.children[1]
  layerBBoxButton.style.height = '23px'
  applyContrastSensitiveStyleToElement(
    context,
    'invertibleButton',
    layerBBoxLabel
  )
  imageIcons.appendChild(layerBBoxButton)
  layerBBoxButton.addEventListener('click', function(event) {
    event.preventDefault()
    event.stopPropagation()
    context.service.send({
      type: 'TOGGLE_LAYER_BBOX',
      data: {
        name: context.images.selectedName,
        layerName: name,
      },
    })
    var actorContext = context.layers.actorContext.get(name)
    layerBBoxButtonInput.checked = actorContext.bbox
  })

  // There can only be one dialog in app?  OK/Cancel buttons don't work if multiple layers...
  if (!dialog) {
    dialog = makeHtml(
      '\n    <md-dialog class="'
        .concat(
          style.saveDialog,
          '">\n      <div slot="headline">Save file format</div>\n      <form id="save-form" slot="content" method="dialog">\n        '
        )
        .concat(
          extensions
            .map(function(extension, i) {
              return '<label>\n                <md-radio name="format" value="'
                .concat(extension, '" ')
                .concat(
                  i === 0 ? 'checked' : '',
                  ' touch-target="wrapper"></md-radio>\n                <span aria-hidden="true">'
                )
                .concat(extension, '</span>\n              </label>')
            })
            .join(''),
          '\n      </form>\n      <div slot="actions">\n        <md-text-button form="save-form" value="cancel">Cancel</md-text-button>\n        <md-text-button form="save-form" autofocus value="ok">OK</md-text-button>\n      </div>\n    </md-dialog>\n  '
        )
    )
    dialog.addEventListener('close', function() {
      var okClicked = dialog.returnValue === 'ok'
      if (okClicked) {
        var radios = document.querySelectorAll('md-radio[name=format]')
        var format = Array.from(radios).find(function(radio) {
          return radio.checked
        }).value
        context.service.send({
          type: 'DOWNLOAD_IMAGE',
          data: {
            name: context.images.selectedName,
            format: format,
          },
        })
      }
    })
    imageIcons.appendChild(dialog)
  }
  var downloadImage = document.createElement('div')
  downloadImage.innerHTML = '\n  <input type="checkbox" checked id='
    .concat(context.id, '-download-image" class="')
    .concat(
      style.toggleInput,
      '" />\n  <label itk-vtk-tooltip itk-vtk-tooltip-top itk-vtk-tooltip-content="Save ROI" class="'
    )
    .concat(style.toggleButton, '" for="')
    .concat(
      context.id,
      '-download-image">\n    <img style="height: 23px" src="'
    )
    .concat(optimizedSVGDataUri$s, '" />\n  </label>\n  ')
  var downloadImageLabel = downloadImage.children[1]
  downloadImage.style.height = '23px'
  applyContrastSensitiveStyleToElement(
    context,
    'invertibleButton',
    downloadImageLabel
  )
  imageIcons.appendChild(downloadImage)
  downloadImage.addEventListener('click', function(event) {
    event.stopPropagation()
    dialog.show()
  })
  var icon = makeHtml(
    '<layer-icon class="'.concat(style.layerIcon, '"></layer-icon>')
  )
  icon.layer = layer
  icon.name = name
  imageIcons.appendChild(icon)
  layerEntry.addEventListener('click', function(event) {
    event.preventDefault()
    context.service.send({
      type: 'SELECT_LAYER',
      data: name,
    })
  })
  return layerEntry
}
function createLayerInterface(context) {
  var name = context.layers.lastAddedData.name
  var layer = context.layers.actorContext.get(name)
  var layerEntry = createLayerEntry(context, name, layer)
  context.layers.layersUIGroup.appendChild(layerEntry)
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
    var imageActorContext = actorContext.imageActorContext
    switch (type) {
      case 'image':
        applyGroupVisibility(context, ['images'], true)
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

function startDataUpdate(_ref) {
  var spinner = _ref.actorContext.spinner
  spinner.style.visibility = 'visible'
}
function finishDataUpdate(_ref2) {
  var spinner = _ref2.actorContext.spinner
  spinner.style.visibility = 'hidden'
}

var toArray = { exports: {} }

var arrayWithHoles = { exports: {} }

;(function(module) {
  function _arrayWithHoles(arr) {
    if (Array.isArray(arr)) return arr
  }

  ;(module.exports = _arrayWithHoles),
    (module.exports.__esModule = true),
    (module.exports['default'] = module.exports)
})(arrayWithHoles)

var nonIterableRest = { exports: {} }

;(function(module) {
  function _nonIterableRest() {
    throw new TypeError(
      'Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.'
    )
  }

  ;(module.exports = _nonIterableRest),
    (module.exports.__esModule = true),
    (module.exports['default'] = module.exports)
})(nonIterableRest)

;(function(module) {
  var arrayWithHoles$1 = arrayWithHoles.exports

  var iterableToArray = iterableToArray$1.exports

  var unsupportedIterableToArray = unsupportedIterableToArray$1.exports

  var nonIterableRest$1 = nonIterableRest.exports

  function _toArray(arr) {
    return (
      arrayWithHoles$1(arr) ||
      iterableToArray(arr) ||
      unsupportedIterableToArray(arr) ||
      nonIterableRest$1()
    )
  }

  ;(module.exports = _toArray),
    (module.exports.__esModule = true),
    (module.exports['default'] = module.exports)
})(toArray)

var _toArray = /*@__PURE__*/ getDefaultExportFromCjs(toArray.exports)

var defineProperty = { exports: {} }

;(function(module) {
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

  ;(module.exports = _defineProperty),
    (module.exports.__esModule = true),
    (module.exports['default'] = module.exports)
})(defineProperty)

var _defineProperty = /*@__PURE__*/ getDefaultExportFromCjs(
  defineProperty.exports
)

var slicedToArray = { exports: {} }

var iterableToArrayLimit = { exports: {} }

;(function(module) {
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

  ;(module.exports = _iterableToArrayLimit),
    (module.exports.__esModule = true),
    (module.exports['default'] = module.exports)
})(iterableToArrayLimit)

;(function(module) {
  var arrayWithHoles$1 = arrayWithHoles.exports

  var iterableToArrayLimit$1 = iterableToArrayLimit.exports

  var unsupportedIterableToArray = unsupportedIterableToArray$1.exports

  var nonIterableRest$1 = nonIterableRest.exports

  function _slicedToArray(arr, i) {
    return (
      arrayWithHoles$1(arr) ||
      iterableToArrayLimit$1(arr, i) ||
      unsupportedIterableToArray(arr, i) ||
      nonIterableRest$1()
    )
  }

  ;(module.exports = _slicedToArray),
    (module.exports.__esModule = true),
    (module.exports['default'] = module.exports)
})(slicedToArray)

var _slicedToArray = /*@__PURE__*/ getDefaultExportFromCjs(
  slicedToArray.exports
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
var compareUI = function compareUI(context) {
  return function(send, onReceive) {
    var root = document.createElement('div')
    root.setAttribute(
      'style',
      'align-self: center; align-content: center; margin-left: 4px; margin-right: 4px'
    )
    var parent = context.layers.compareContainer
    parent.appendChild(root)
    var checkerboardUi = makeHtml(
      '\n    <div style="display: flex; justify-content: space-between;">\n      <label class="'
        .concat(
          style.inputLabel,
          '">Checkerboard Pattern X</label>\n      <input id="x-pattern" type="number" class="'
        )
        .concat(style.selector, ' ')
        .concat(
          style.numberInput,
          '" style="max-width: 3.2ch" />\n      <label class="'
        )
        .concat(
          style.inputLabel,
          '">Y</label>\n      <input type="number" class="'
        )
        .concat(style.selector, ' ')
        .concat(
          style.numberInput,
          '" style="max-width: 3.2ch" />\n      <label class="'
        )
        .concat(
          style.inputLabel,
          '">Z</label>\n      <input type="number" class="'
        )
        .concat(style.selector, ' ')
        .concat(
          style.numberInput,
          '" style="max-width: 3.2ch" />\n    </div>\n  '
        )
    )
    root.appendChild(checkerboardUi)
    var swapButtonId = ''.concat(context.id, '-swapImageOrder')
    var playImageMixButtonId = ''.concat(context.id, '-image-mix-play')
    var playImageMixImgId = ''.concat(context.id, '-image-mix-play-img')
    var imageMixRoot = makeHtml(
      '\n    <div style="display: flex; justify-content: space-between;">\n      <label class="'
        .concat(style.inputLabel, '">Image Mix</label>\n      <input id="')
        .concat(playImageMixButtonId, '" type="checkbox" class="')
        .concat(
          style.toggleInput,
          '">\n        <label itk-vtk-tooltip itk-vtk-tooltip-top-annotations itk-vtk-tooltip-content="animate" class="'
        )
        .concat(style.visibleButton, ' ')
        .concat(style.noFlexBasis, ' ')
        .concat(style.toggleButton, '" for="')
        .concat(playImageMixButtonId, '">\n          <img src="')
        .concat(optimizedSVGDataUri$h, '" id="')
        .concat(
          playImageMixImgId,
          '" alt="animate" />\n        </label>\n      </input>\n      <input type="range" min="0" max="1" step=".01" value=".5" \n        class="'
        )
        .concat(style.slider, '" />\n      <input type="checkbox" id="')
        .concat(swapButtonId, '" class="')
        .concat(style.toggleInput, '">\n        <label for="')
        .concat(
          swapButtonId,
          '" itk-vtk-tooltip itk-vtk-tooltip-left-fullscreen itk-vtk-tooltip-content="Swap image" class="'
        )
        .concat(style.rotateButton, ' ')
        .concat(style.toggleButton, '">\n          <img src="')
        .concat(
          optimizedSVGDataUri$c,
          '" alt="rotate"/>\n        </label>\n      </input>\n    </div>\n  '
        )
    )
    root.appendChild(imageMixRoot)
    var _checkerboardUi$query = checkerboardUi.querySelectorAll('input'),
      _checkerboardUi$query2 = _slicedToArray(_checkerboardUi$query, 3),
      xPattern = _checkerboardUi$query2[0],
      yPattern = _checkerboardUi$query2[1],
      zPattern = _checkerboardUi$query2[2]
    var _imageMixRoot$querySe = imageMixRoot.querySelectorAll('input'),
      _imageMixRoot$querySe2 = _slicedToArray(_imageMixRoot$querySe, 3),
      animateImageMix = _imageMixRoot$querySe2[0],
      imageMixSlider = _imageMixRoot$querySe2[1],
      swapOrder = _imageMixRoot$querySe2[2]
    var animateImageImg = imageMixRoot.querySelector(
      '#'.concat(playImageMixImgId)
    )
    var update = function update() {
      var _compare$pattern, _compare$swapImageOrd, _compare$imageMix
      var name = context.images.selectedName
      var imageContext = context.images.actorContext.get(name)
      var _ref =
          imageContext !== null && imageContext !== void 0 ? imageContext : {},
        _ref$compare = _ref.compare,
        compare = _ref$compare === void 0 ? undefined : _ref$compare
      var _ref2 = compare !== null && compare !== void 0 ? compare : {},
        _ref2$method = _ref2.method,
        method = _ref2$method === void 0 ? undefined : _ref2$method,
        checkerboard = _ref2.checkerboard
      if (method && method !== 'disabled') root.style.display = 'block'
      else root.style.display = 'none'
      if (checkerboard) {
        checkerboardUi.style.display = 'flex'
      } else {
        checkerboardUi.style.display = 'none'
      }
      var _ref3 =
          (_compare$pattern =
            compare === null || compare === void 0
              ? void 0
              : compare.pattern) !== null && _compare$pattern !== void 0
            ? _compare$pattern
            : [],
        _ref4 = _slicedToArray(_ref3, 3),
        x = _ref4[0],
        y = _ref4[1],
        z = _ref4[2]
      xPattern.value = x
      yPattern.value = y
      zPattern.value = z
      swapOrder.checked =
        (_compare$swapImageOrd = !!(
          compare !== null &&
          compare !== void 0 &&
          compare.swapImageOrder
        )) !== null && _compare$swapImageOrd !== void 0
          ? _compare$swapImageOrd
          : false
      imageMixSlider.value =
        (_compare$imageMix =
          compare === null || compare === void 0
            ? void 0
            : compare.imageMix) !== null && _compare$imageMix !== void 0
          ? _compare$imageMix
          : 0.5
      animateImageImg.src =
        imageContext !== null &&
        imageContext !== void 0 &&
        imageContext.imageMixAnimation
          ? optimizedSVGDataUri$i
          : optimizedSVGDataUri$h
    }
    update()
    var updateCompare = function updateCompare(options) {
      var name = context.images.selectedName
      var imageContext = context.images.actorContext.get(name)
      var compare = imageContext.compare
      context.service.send({
        type: 'COMPARE_IMAGES',
        data: {
          name: name,
          fixedImageName: compare.fixedImageName,
          options: _objectSpread({}, options),
        },
      })
    }
    var parsePattern = function parsePattern(value) {
      return Math.max(1, parseInt(value))
    }
    xPattern.addEventListener('change', function(event) {
      var _context$images$actor
      event.preventDefault()
      event.stopPropagation()
      var _ref5 =
          (_context$images$actor = context.images.actorContext.get(
            context.images.selectedName
          ).compare.pattern) !== null && _context$images$actor !== void 0
            ? _context$images$actor
            : [],
        _ref6 = _toArray(_ref5),
        yz = _ref6.slice(1)
      var x = parsePattern(event.target.value)
      updateCompare({
        pattern: [x].concat(_toConsumableArray(yz)),
      })
    })
    yPattern.addEventListener('change', function(event) {
      var _context$images$actor2
      event.preventDefault()
      event.stopPropagation()
      var _ref7 =
          (_context$images$actor2 = context.images.actorContext.get(
            context.images.selectedName
          ).compare.pattern) !== null && _context$images$actor2 !== void 0
            ? _context$images$actor2
            : [],
        _ref8 = _slicedToArray(_ref7, 3),
        x = _ref8[0],
        z = _ref8[2]
      var y = parsePattern(event.target.value)
      updateCompare({
        pattern: [x, y, z],
      })
    })
    zPattern.addEventListener('change', function(event) {
      var _context$images$actor3
      event.preventDefault()
      event.stopPropagation()
      var _ref9 =
          (_context$images$actor3 = context.images.actorContext.get(
            context.images.selectedName
          ).compare.pattern) !== null && _context$images$actor3 !== void 0
            ? _context$images$actor3
            : [],
        _ref10 = _slicedToArray(_ref9, 2),
        x = _ref10[0],
        y = _ref10[1]
      var z = parsePattern(event.target.value)
      updateCompare({
        pattern: [x, y, z],
      })
    })
    animateImageMix.addEventListener('input', function(event) {
      event.preventDefault()
      event.stopPropagation()
      var name = context.images.selectedName
      context.service.send({
        type: 'ANIMATE_IMAGE_MIX',
        data: {
          name: name,
          play: event.target.checked,
        },
      })
    })
    imageMixSlider.addEventListener('input', function(event) {
      event.preventDefault()
      event.stopPropagation()
      updateCompare({
        imageMix: event.target.value,
      })
    })
    swapOrder.addEventListener('change', function(event) {
      event.preventDefault()
      event.stopPropagation()
      updateCompare({
        swapImageOrder: event.target.checked,
      })
    })
    onReceive(function(event) {
      var type = event.type
      if (type === 'COMPARE_UPDATED') {
        update()
      }
    })
  }
}

var layersUIMachineOptions = {
  layerUIActor: {
    actions: {
      createLayerInterface: createLayerInterface,
      selectLayer: selectLayer,
      toggleLayerVisibility: toggleLayerVisibility,
      startDataUpdate: startDataUpdate,
      finishDataUpdate: finishDataUpdate,
    },
  },
  actions: {
    createLayersInterface: createLayersInterface,
  },
  services: {
    compareUI: compareUI,
  },
}

function createComponentSelector(context, imageUIGroup) {
  var viewerDOMId = context.id
  var componentSelector = document.createElement('div')
  componentSelector.setAttribute('class', style.selector)
  componentSelector.id = ''.concat(viewerDOMId, '-componentSelector')
  context.images.componentSelector = componentSelector
  var componentRow = document.createElement('div')
  componentRow.setAttribute('class', style.uiRow)
  // This row needs custom bottom padding, to aid in the illusion
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
  var interpolationButton = document.createElement('div')
  // Todo: send event to disable interpolation when label maps added
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
    .concat(optimizedSVGDataUri$n, '" alt="interpolation" /></label>')
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

const ColorMaps = new Map()
ColorMaps.set('Viridis (matplotlib)', {
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
})
ColorMaps.set('Plasma (matplotlib)', {
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
})
ColorMaps.set('Inferno (matplotlib)', {
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
})
ColorMaps.set('Magma (matplotlib)', {
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
})
ColorMaps.set('Grayscale', {
  ColorSpace: 'RGB',
  Name: 'Grayscale',
  NanColor: [1, 0, 0],
  RGBPoints: [0, 0, 0, 0, 1, 1, 1, 1],
})
ColorMaps.set('X Ray', {
  ColorSpace: 'RGB',
  Name: 'X Ray',
  NanColor: [1, 0, 0],
  RGBPoints: [0, 1, 1, 1, 1, 0, 0, 0],
})
ColorMaps.set('BkMa', {
  ColorSpace: 'RGB',
  Name: 'BkMa',
  NanColor: [0, 1, 0],
  RGBPoints: [0, 0, 0, 0, 1, 1, 0, 1],
})
ColorMaps.set('BkCy', {
  ColorSpace: 'RGB',
  Name: 'BkCy',
  NanColor: [0, 1, 1],
  RGBPoints: [0, 0, 0, 0, 1, 0, 1, 1],
})
ColorMaps.set('gray_Matlab', {
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
})
ColorMaps.set('bone_Matlab', {
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
})
ColorMaps.set('pink_Matlab', {
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
})
ColorMaps.set('2hot', {
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
})
ColorMaps.set('gist_earth', {
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
})
ColorMaps.set('Haze', {
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
})
ColorMaps.set('Haze_green', {
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
})
ColorMaps.set('Haze_lime', {
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
})
ColorMaps.set('Haze_cyan', {
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
})
ColorMaps.set('Black, Blue and White', {
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
})
ColorMaps.set('Black, Orange and White', {
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
})
ColorMaps.set('Black-Body Radiation', {
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
})
ColorMaps.set('Cool to Warm', {
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
})
ColorMaps.set('Warm to Cool', {
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
})
ColorMaps.set('Cool to Warm (Extended)', {
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
})
ColorMaps.set('Warm to Cool (Extended)', {
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
})
ColorMaps.set('Blue to Red Rainbow', {
  ColorSpace: 'HSV',
  Name: 'Blue to Red Rainbow',
  NanColor: [0.498039215686, 0.498039215686, 0.498039215686],
  RGBPoints: [0, 0, 0, 1, 1, 1, 0, 0],
})
ColorMaps.set('Red to Blue Rainbow', {
  ColorSpace: 'HSV',
  Name: 'Red to Blue Rainbow',
  NanColor: [0.498039215686, 0.498039215686, 0.498039215686],
  RGBPoints: [0, 1, 0, 0, 1, 0, 0, 1],
})
ColorMaps.set('jet', {
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
})
ColorMaps.set('rainbow', {
  ColorSpace: 'RGB',
  Name: 'rainbow',
  RGBPoints: [-1, 0, 0, 1, -0.5, 0, 1, 1, 0, 0, 1, 0, 0.5, 1, 1, 0, 1, 1, 0, 0],
})
ColorMaps.set('hsv', {
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
})
ColorMaps.set('Rainbow Desaturated', {
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
})
ColorMaps.set('Cold and Hot', {
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
})
ColorMaps.set('Rainbow Blended Black', {
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
})
ColorMaps.set('Rainbow Blended Grey', {
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
})
ColorMaps.set('Rainbow Blended White', {
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
})
ColorMaps.set('nic_CubicL', {
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
})
ColorMaps.set('Spectral_lowBlue', {
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
})
ColorMaps.set('Yellow 15', {
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
})
ColorMaps.set('Asymmtrical Earth Tones (6_21b)', {
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
})
ColorMaps.set('Green-Blue Asymmetric Divergent (62Blbc)', {
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
})
ColorMaps.set('Muted Blue-Green', {
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
})
ColorMaps.set('BkRd', {
  ColorSpace: 'RGB',
  Name: 'BkRd',
  NanColor: [0, 1, 1],
  RGBPoints: [0, 0, 0, 0, 1, 1, 0, 0],
})
ColorMaps.set('BkGn', {
  ColorSpace: 'RGB',
  Name: 'BkGn',
  NanColor: [1, 0, 1],
  RGBPoints: [0, 0, 0, 0, 1, 0, 1, 0],
})
ColorMaps.set('BkBu', {
  ColorSpace: 'RGB',
  Name: 'BkBu',
  NanColor: [1, 1, 0],
  RGBPoints: [0, 0, 0, 0, 1, 0, 0, 1],
})
ColorMaps.set('Purples', {
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
})
ColorMaps.set('RdPu', {
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
})
ColorMaps.set('RdOr', {
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
})
ColorMaps.set('BuRd', {
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
})
ColorMaps.set('GnRP', {
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
})
ColorMaps.set('GYPi', {
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
})
ColorMaps.set('GBBr', {
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
})
ColorMaps.set('PRGn', {
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
})
ColorMaps.set('PiYG', {
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
})
ColorMaps.set('OrPu', {
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
})
ColorMaps.set('BrBG', {
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
})
ColorMaps.set('CT-AAA', {
  Name: 'CT-AAA',
  NanColor: [1, 1, 0],
  ColorSpace: 'RGB',
  RGBPoints: [
    0,
    0,
    0,
    0,
    0.5196974569319114,
    0.615686,
    0.356863,
    0.184314,
    0.5234162428219853,
    0.882353,
    0.603922,
    0.290196,
    0.5313189499589828,
    1,
    1,
    1,
    0.5650100082034454,
    1,
    0.937033,
    0.954531,
    1,
    0.827451,
    0.658824,
    1,
  ],
})
ColorMaps.set('CT-Bone', {
  Name: 'CT-Bone',
  NanColor: [1, 1, 0],
  ColorSpace: 'RGB',
  RGBPoints: [
    0,
    0,
    0,
    0,
    0.4934461361771944,
    0.729412,
    0.254902,
    0.301961,
    0.6013757178014767,
    0.905882,
    0.815686,
    0.552941,
    1,
    1,
    1,
    1,
  ],
})
ColorMaps.set('CT-Bones', {
  Name: 'CT-Bones',
  NanColor: [1, 1, 0],
  ColorSpace: 'RGB',
  RGBPoints: [
    0,
    0.3,
    0.3,
    1,
    0.26216077828981055,
    0.3,
    1,
    0.3,
    0.749247311827957,
    1,
    0,
    0,
    0.8495391705069125,
    1,
    0.912535,
    0.0374849,
    1,
    1,
    0.3,
    0.3,
  ],
})
ColorMaps.set('CT-Cardiac', {
  Name: 'CT-Cardiac',
  NanColor: [1, 1, 0],
  ColorSpace: 'RGB',
  RGBPoints: [
    0,
    0,
    0,
    0,
    0.4833982772764561,
    0.54902,
    0.25098,
    0.14902,
    0.5117230188679245,
    0.882353,
    0.603922,
    0.290196,
    0.5255212469237079,
    1,
    0.937033,
    0.954531,
    0.5388743232157506,
    0.615686,
    0,
    0,
    1,
    0.827451,
    0.658824,
    1,
  ],
})
ColorMaps.set('CT-Cardiac2', {
  Name: 'CT-Cardiac2',
  NanColor: [1, 1, 0],
  ColorSpace: 'RGB',
  RGBPoints: [
    0,
    0,
    0,
    0,
    0.5031823461853979,
    0.54902,
    0.25098,
    0.14902,
    0.5229676784249384,
    0.917647,
    0.639216,
    0.0588235,
    0.5416968006562756,
    1,
    0.878431,
    0.623529,
    0.7565217391304347,
    1,
    1,
    1,
    1,
    0.827451,
    0.658824,
    1,
  ],
})
ColorMaps.set('CT-Cardiac3', {
  Name: 'CT-Cardiac3',
  NanColor: [1, 1, 0],
  ColorSpace: 'RGB',
  RGBPoints: [
    0,
    0,
    0,
    0,
    0.4818742083675143,
    0,
    0.25098,
    1,
    0.5035896800656275,
    1,
    0,
    0,
    0.5191007383100902,
    1,
    0.894893,
    0.894893,
    0.5532251025430681,
    1,
    1,
    0.25098,
    0.6969909762100082,
    1,
    1,
    1,
    1,
    0.827451,
    0.658824,
    1,
  ],
})
ColorMaps.set('CT-Chest-Vessels', {
  Name: 'CT-Chest-Vessels',
  NanColor: [1, 1, 0],
  ColorSpace: 'RGB',
  RGBPoints: [
    0,
    0,
    0,
    0,
    0.2864068908941756,
    0.54902,
    0.25098,
    0.14902,
    0.4998896964725184,
    0.882353,
    0.603922,
    0.290196,
    0.5682183757178015,
    1,
    0.937033,
    0.954531,
    1,
    0.827451,
    0.658824,
    1,
  ],
})
ColorMaps.set('CT-Coronary-Arteries', {
  Name: 'CT-Coronary-Arteries',
  NanColor: [1, 1, 0],
  ColorSpace: 'RGB',
  RGBPoints: [
    0,
    0,
    0,
    0,
    0.3826361884743387,
    0,
    0,
    0,
    0.38662024873007533,
    0.159804,
    0.159804,
    0.159804,
    0.41450867052023116,
    0.764706,
    0.764706,
    0.764706,
    0.44258066211245406,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
  ],
})
ColorMaps.set('CT-Fat', {
  Name: 'CT-Fat',
  NanColor: [1, 1, 0],
  ColorSpace: 'RGB',
  RGBPoints: [
    0,
    0.3,
    0.3,
    1,
    0.1271508097165992,
    0.3,
    1,
    0.3,
    0.22798582995951416,
    0,
    0,
    1,
    0.2335662955465587,
    0,
    1,
    0,
    0.23646735829959514,
    0.835431,
    0.888889,
    0.0165387,
    0.27426366396761137,
    1,
    0,
    0,
    0.37026315789473685,
    1,
    0,
    0,
    0.4198254048582996,
    1,
    0.912535,
    0.0374849,
    1,
    1,
    0.300267,
    0.299886,
  ],
})
ColorMaps.set('CT-Liver-Vasculature', {
  Name: 'CT-Liver-Vasculature',
  NanColor: [1, 1, 0],
  ColorSpace: 'RGB',
  RGBPoints: [
    0,
    0,
    0,
    0,
    0.38485076195480816,
    0,
    0,
    0,
    0.38638710807496934,
    0.501961,
    0.25098,
    0,
    0.41827990891574707,
    0.695386,
    0.59603,
    0.36886,
    0.4267868278157295,
    0.854902,
    0.85098,
    0.827451,
    0.5685671746365387,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
  ],
})
ColorMaps.set('CT-Lung', {
  Name: 'CT-Lung',
  NanColor: [1, 1, 0],
  ColorSpace: 'RGB',
  RGBPoints: [
    0,
    0.3,
    0.3,
    1,
    0.10121457489878542,
    0,
    0,
    1,
    0.11892712550607287,
    0.134704,
    0.781726,
    0.0724558,
    0.13663967611336034,
    0.929244,
    1,
    0.109473,
    0.15182186234817813,
    0.888889,
    0.254949,
    0.0240258,
    1,
    1,
    0.3,
    0.3,
  ],
})
ColorMaps.set('CT-Muscle', {
  Name: 'CT-Muscle',
  NanColor: [1, 1, 0],
  ColorSpace: 'RGB',
  RGBPoints: [
    0,
    0,
    0,
    0,
    0.4706469237079573,
    0.54902,
    0.25098,
    0.14902,
    0.5318525020508613,
    0.882353,
    0.603922,
    0.290196,
    0.5650100082034454,
    1,
    0.937033,
    0.954531,
    1,
    0.827451,
    0.658824,
    1,
  ],
})
ColorMaps.set('CT-Pulmonary-Arteries', {
  Name: 'CT-Pulmonary-Arteries',
  NanColor: [1, 1, 0],
  ColorSpace: 'RGB',
  RGBPoints: [
    0,
    0,
    0,
    0,
    0.2622665860624423,
    0,
    0,
    0,
    0.29852855924676414,
    0.396078,
    0.301961,
    0.180392,
    0.3196726310247078,
    0.611765,
    0.352941,
    0.0705882,
    0.366313845902924,
    0.843137,
    0.0156863,
    0.156863,
    0.4424601071137956,
    0.752941,
    0.752941,
    0.752941,
    1,
    1,
    1,
    1,
  ],
})
ColorMaps.set('CT-Soft-Tissue', {
  Name: 'CT-Soft-Tissue',
  NanColor: [1, 1, 0],
  ColorSpace: 'RGB',
  RGBPoints: [
    0,
    0,
    0,
    0,
    0.32947801716587843,
    0,
    0,
    0,
    0.3307059029602382,
    0.0556356,
    0.0556356,
    0.0556356,
    0.4007707129094412,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
  ],
})
ColorMaps.set('CT-Air', {
  Name: 'CT-Air',
  NanColor: [1, 1, 0],
  ColorSpace: 'RGB',
  RGBPoints: [
    0,
    1,
    1,
    1,
    0.34848236259228876,
    0.2,
    1,
    1,
    0.41410992616899095,
    0.3,
    0.3,
    1,
    1,
    0,
    0,
    0,
  ],
})
ColorMaps.set('MR-Angio', {
  Name: 'MR-Angio',
  NanColor: [1, 1, 0],
  ColorSpace: 'RGB',
  RGBPoints: [
    0,
    0,
    0,
    0,
    0.3852433000525486,
    0,
    0,
    0,
    0.3864562970747942,
    0.74902,
    0.376471,
    0,
    0.3920322298125766,
    1,
    0.866667,
    0.733333,
    0.39391714836223507,
    0.937255,
    0.937255,
    0.937255,
    1,
    1,
    1,
    1,
  ],
})
ColorMaps.set('MR-Default', {
  Name: 'MR-Default',
  NanColor: [1, 1, 0],
  ColorSpace: 'RGB',
  RGBPoints: [
    0,
    0,
    0,
    0,
    0.01953125,
    0.168627,
    0,
    0,
    0.0390625,
    0.403922,
    0.145098,
    0.0784314,
    0.1171875,
    0.780392,
    0.607843,
    0.380392,
    0.21484375,
    0.847059,
    0.835294,
    0.788235,
    1,
    1,
    1,
    1,
  ],
})
ColorMaps.set('MR-T2-Brain', {
  Name: 'MR-T2-Brain',
  NanColor: [1, 1, 0],
  ColorSpace: 'RGB',
  RGBPoints: [
    0,
    0,
    0,
    0,
    0.15401294851794073,
    0.956863,
    0.839216,
    0.192157,
    0.6433790951638065,
    0,
    0.592157,
    0.807843,
    1,
    1,
    1,
    1,
  ],
})
ColorMaps.set('DTI-FA-Brain', {
  Name: 'DTI-FA-Brain',
  NanColor: [1, 1, 0],
  ColorSpace: 'RGB',
  RGBPoints: [
    0,
    1,
    0,
    0,
    0,
    1,
    0,
    0,
    0.25099497487437183,
    0.4941,
    1,
    0,
    0.502,
    0,
    0.9882,
    1,
    0.752964824120603,
    0.51764,
    0,
    1,
    1,
    1,
    0,
    0,
    1,
    1,
    0,
    0,
  ],
})
ColorMaps.set('US-Fetal', {
  Name: 'US-Fetal',
  NanColor: [1, 1, 0],
  ColorSpace: 'RGB',
  RGBPoints: [
    0,
    0,
    0,
    0,
    0.03571428571428571,
    0,
    0,
    0,
    0.32142857142857145,
    0.54902,
    0.25098,
    0.14902,
    0.4,
    0.882353,
    0.603922,
    0.290196,
    1,
    0.694,
    0.478,
    0.396,
  ],
})

const ColorMapIcons = new Map()
ColorMapIcons.set(
  'Viridis (matplotlib)',
  'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADwAAAAFCAYAAAAZiY8XAAAAAXNSR0IArs4c6QAAAMZJREFUOE/lk1FOAzEMRJ8T22mbHqtH6P3PQbsbB2UDrSqEBAiQEB+jmSRfo7yRk5x78oIUR9zBbcqM7gqWCVO6JcJHToQJoTL9lpl3OhzCoL9mveeufXsfPsRNQdIga6DaMG24NoqulLyy05VdXtjrwiFf2eeFmi9brumy6ZiHP3GUl3O6UqVRRajJOEhBTnKO/1a4fbiwZZon+h//4fXdwqawYfw1pCe6E/G7fzPSOrD9HNLLm8I2d/yTG46H/Y4t/86GnwGuqRIzRB2bAgAAAABJRU5ErkJggg=='
)
ColorMapIcons.set(
  'Plasma (matplotlib)',
  'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADwAAAAFCAYAAAAZiY8XAAAAAXNSR0IArs4c6QAAALdJREFUOE/Vk8tuQyEMRI8vYNMq+e58dABXPO4mSpQIddEuRjNmNzqMXPPNLy3xTeTLI5mIeRjKHJhP6ciCIaiACdNDQ6OjqaGpDqXYvZCW4kOOsdDfToVURw7rrd9B593zoYWjZy2Irntl0QJWmd5wq/hwxw2qCS3L8jtyzbe2W3iU/oeF627hLcIPdCfZXyKcG67vCZfdwn+acHZcn3/p+27hLcJ9py82fO74ow1bQdK53c83/APR3iI95n4tVgAAAABJRU5ErkJggg=='
)
ColorMapIcons.set(
  'Inferno (matplotlib)',
  'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADwAAAAFCAYAAAAZiY8XAAAAAXNSR0IArs4c6QAAAL9JREFUOE/lk8FOAzEMRF/srO0spdD+/5dudmMUVVTi1AOIInEYvbmOZqZATSmOSEOlseiKydQLxoqzEtnwNCINL4rLlOBScOUm+WTikpgOXAZ+54Hrgel+p9WO1R1bOsukder0tlGn947ahkZHfUOmolNip0RSQiEcIsjWyFgZ7cSIE6OdGfFG+oXiV6pdsOWdAnX8t8DHUwPrrdnfbHh/auAfnXRjtNeHk+5/KfCydOr88OT87rc+fCb9+uXDHzioyxIGANGjAAAAAElFTkSuQmCC'
)
ColorMapIcons.set(
  'Magma (matplotlib)',
  'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADwAAAAFCAYAAAAZiY8XAAAAAXNSR0IArs4c6QAAAMBJREFUOE/Vk9tKBDEQBasvSSez//+1bibSiYqCrMKI4kNxOo/FyRHwqVJR7Zh13Dol0YOqB0VuhBzETDptBkEh1AnVjQnVZGUo+62TMPZ73XOnnht7zUHYIHxQF3dKGZQ68DgX1kAXiiwMaY70Ai2p74h9R2O2vDPbykTAz+vCSk25h8Ip/iL5x8LjuvDFhnUQ5Tca7qvh+3Xh/9Xw0yNhlxvtiw2/7Te/tED4T2z4jsf8ZMOy9/utDedu48OGnwEUyX6QPIzOYgAAAABJRU5ErkJggg=='
)
ColorMapIcons.set(
  'Grayscale',
  'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADwAAAAFCAYAAAAZiY8XAAAAAXNSR0IArs4c6QAAAGJJREFUOE/FUkkKwEAIy6Dj///bldxKKUVNoSc9ZEUHgMPdMecEZ2fvcP7yGwB2NbDKr5ZX/Fh4UwS6X1EtecUreVl4zQiYGSLi8e0z/C8xdy3mYr6MBwsvGeAbRuVXr634nRPFE+jJ30dGAAAAAElFTkSuQmCC'
)
ColorMapIcons.set(
  'X Ray',
  'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADwAAAAFCAYAAAAZiY8XAAAAAXNSR0IArs4c6QAAAGFJREFUOE/FUksKgFAI9N3/xk9tYnYREeoErXQxX3QBQESYuxvnZJ9w/vJbAA41sMrvllf8WDgVgelXdEte8UpeFo6KQGba3vvx7Sv8LzF3LeZivooHC3sF+IZR+d1rK34nJhJ6JDqdWKIAAAAASUVORK5CYII='
)
ColorMapIcons.set(
  'BkMa',
  'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADwAAAAFCAYAAAAZiY8XAAAAAXNSR0IArs4c6QAAAGNJREFUOE/FkkkKgEAMBGuY5f//daVvIiKZtOApOfRKUoCj0eh0NDN7hvOXXwF2N7DLny3v+Knw5ghkv2K25BXv5FXhNSJQqQzG49tH+F9i7lrKpXwRDxVeIsA3jMufvbbjdwJhzg7tKQp+vQAAAABJRU5ErkJggg=='
)
ColorMapIcons.set(
  'BkCy',
  'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADwAAAAFCAYAAAAZiY8XAAAAAXNSR0IArs4c6QAAAFZJREFUOE9jZGBg+M/AwsLAwMrKAKbJYZOjZ4DsY2RgYPhHlieRHTzEPPx3pHn4D1EeZmZmYGBjw57sBzqGQe4CuY8Id4CS9G9iFOJVQ4RFFNtBpSwEAFzTDu2XWKRnAAAAAElFTkSuQmCC'
)
ColorMapIcons.set(
  'gray_Matlab',
  'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADwAAAAFCAYAAAAZiY8XAAAAAXNSR0IArs4c6QAAAGdJREFUOE/dk0sOgDAIRMvn3sO9/YadFjWSoDEuuiENwzwYArCISGPm8KrqLNyEn9U4m7XXJjObj8x67ZeGAUxVxu5S3gJ+W9s3PH51ww6DiHZRywIKJw1gyDbJ/q/MsKoGCFfx67VXlE4T6Mx6zVUAAAAASUVORK5CYII='
)
ColorMapIcons.set(
  'bone_Matlab',
  'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADwAAAAFCAYAAAAZiY8XAAAAAXNSR0IArs4c6QAAAIxJREFUOE/dk90KgzAMhc/PHthrX8IHdnOSjkmlnYWJKF6UhJA0CV8Ou35404IkKGzuLzGCX7+Wl2qI5j/iqocllI8wy3jMt8olK7XtHHb9MKVBa4tGEwv0vRZ+NcnsXtiQma4gv6KzCD8vRdiEcexJj9uEgw5KDT8EMdf9bw0HyU+PHYRtONftnxqeAXuaE+ghaPQ8AAAAAElFTkSuQmCC'
)
ColorMapIcons.set(
  'pink_Matlab',
  'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADwAAAAFCAYAAAAZiY8XAAAAAXNSR0IArs4c6QAAAJVJREFUOE/lU8kNgDAMs1P2/7AF07APp9I0tPSDOISEeCAXxyClttl37UIhGASGjIiS0/NulrTOJ4zflFqK/afWUTkBGdIjAPxsaO+uKefGAYr1PHN5Xun7rp3/tvB0uLC6rq5s7n/b4bFcWILF+VKk/WI8/o9F2iOcY34n0sOhw7GDAq2O9XvvsKQLeq/DDQBN3fkOr+95E+hSlOqhAAAAAElFTkSuQmCC'
)
ColorMapIcons.set(
  '2hot',
  'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADwAAAAFCAYAAAAZiY8XAAAAAXNSR0IArs4c6QAAAJRJREFUOE/lU8sOwzAIMw3Q9hv7/1+xRyavIEVMu0ydpqkHCzDhQIylb+gwAF6QHGPtjz3OmbzCg1MDmgNNC9peiwNTwoDJANGIC4B1R49cGIk5ePaTi1ySi7mhlr7hfraFb4csTEV1UPojhamsf13h6yEL17Oe4wN+dtJx1rRCOekLNCwx+vidh2kdvn96N+P/ePgBwdAi6Gro1dYAAAAASUVORK5CYII='
)
ColorMapIcons.set(
  'gist_earth',
  'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADwAAAAFCAYAAAAZiY8XAAAAAXNSR0IArs4c6QAAAJtJREFUOE/lk80KwkAQg7+Z/fXJeuvj9uXUjkw7tR4EEaqXHkKSWVgIJDJMozWdaWpUJdi1UdRoYnRROkIToTmjT93N3xLOzfXCqy9zJs2FZGXlDeFFKlBB/FfnzVfQDJoCuusUN+cU90W/IGco5S1kmMb5bIHvZwt8OzLwxZT670p7hVX3Wn+o9PXbwB2lxp6P23ADKbHp3234AaZLfOgZ/nd+AAAAAElFTkSuQmCC'
)
ColorMapIcons.set(
  'Haze',
  'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADwAAAAFCAYAAAAZiY8XAAAAAXNSR0IArs4c6QAAAKpJREFUOE/FVFsSgyAMDCHpRTwo3rsmdkKQUqstzmj7wQyIm9fuEnhIM6IARQWOCoSa93mh+Ld69r3/55hlcYuLkuNUbLnzs9914Zp6eIXLddQ4z5jrnJav7SvwMCri9P+GqQyxHdQ1DSfpZjgoEJ3BsKlj9iF/UsY1DY9TZfgl+Y8lvcmwSbUM5jxJp/sewxEFbrseNht4MV+ZOuhhyxnf3o3Fp1vq6PfwA4f/NLzUsOdvAAAAAElFTkSuQmCC'
)
ColorMapIcons.set(
  'Haze_green',
  'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADwAAAAFCAYAAAAZiY8XAAAAAXNSR0IArs4c6QAAAJRJREFUOE/lVEEOwyAMSwKoL+r72L9bwmQIbYp2nFZNPUQBO4DAMbwuubIohaQksZBEJQkuMEekQtyyttwD9dX4jqEW+Dk2vuGVGHvb+p47f9Z7vho+8lQXPI597NwDNz64devyUpbypAvncp/CUIR+rvD+PwrjgZwFPrU0rCmTFa4tnbf7FP6Wh0enTB5O9me4C78BEMgxzBW2/64AAAAASUVORK5CYII='
)
ColorMapIcons.set(
  'Haze_lime',
  'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADwAAAAFCAYAAAAZiY8XAAAAAXNSR0IArs4c6QAAAJNJREFUOE/NU1EOhTAI64BreAgv7SV128uARYz6YaLL+2Ks6aArpHlaKlEBcwWxRyogz3tU/O6+8zjy7Hx413HWeI0btveiuYTeQi19W6znA0/2vPM7nuZpKWMEA8TZP+EsWLgiqZjvBecxgs0lc32Aw1JA5LWC483hbYzg/3F4fVtwHM3Xd7jtLLVpyRAG0sMd/gFmtjJDgvNiAgAAAABJRU5ErkJggg=='
)
ColorMapIcons.set(
  'Haze_cyan',
  'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADwAAAAFCAYAAAAZiY8XAAAAAXNSR0IArs4c6QAAAKdJREFUOE/lVNEOwyAIpAL1xX92/z3FBdC2WUy2LO32sAcSvRNQOVhyTE0ogKwIQm4VEQQDSNA9gbBbI4JKbFjta8XUxjnFd35w3H09ztHXYveYzrHxns9zjTPmxx2b5mUoR3zz3e+03GKS+pMHr9D0g7/94BxT/bcKl/cqjCax8yR9doVd6i8lnWO6X1Jh1H77sIdN5vMeLuzzwPnn2cFQNCd2fNLDDxElNc+0VPwdAAAAAElFTkSuQmCC'
)
ColorMapIcons.set(
  'Black, Blue and White',
  'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADwAAAAFCAYAAAAZiY8XAAAAAXNSR0IArs4c6QAAAF5JREFUOE/dk7sKgDAMRU8L5irY//9Yn4MVRLBk6BKHcJZkOLlJAg4QYHRhNpDAWjQwgR78mJmUKcZVanN29CRg7yJ6LyyA8BZeeIQygDfhNbxwPXWv8PJL4Zr6++9Pju8T6OHPJKQAAAAASUVORK5CYII='
)
ColorMapIcons.set(
  'Black, Orange and White',
  'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADwAAAAFCAYAAAAZiY8XAAAAAXNSR0IArs4c6QAAAGBJREFUOE/dk8sKgDAMBMeCuwr2/z/WJyI9KJT20Es9hLkkh8kmA3AaENCEAWyQ8pTBghczM8EzKD7lArUUewbgaCKaFtaB8N698BRhvNOvS3jrXjideqXw+kvhlPrn7y+O7xPoT4XzBgAAAABJRU5ErkJggg=='
)
ColorMapIcons.set(
  'Black-Body Radiation',
  'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADwAAAAFCAYAAAAZiY8XAAAAAXNSR0IArs4c6QAAAHJJREFUOE/NkskKwCAMRJ9RSpdTocv/f2dXUuzBngz14CEEwzD4knHA1QMdoP2tUu8mRNNShp8PShgRWWLNSfde5+nMAacVeADazAXVCHxYgS36GoF3C4Bqf11Yo60GhSKeF+kVkemJu0Z6swJb9LVd+Aa1hxPoBN+lKwAAAABJRU5ErkJggg=='
)
ColorMapIcons.set(
  'Cool to Warm',
  'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADwAAAAFCAYAAAAZiY8XAAAAAXNSR0IArs4c6QAAAMdJREFUOE/dkzFuAzEMBOdOInV/8hf8aD/HdZDEJ1LSBZSDdO4cOEgxGLaLXS6n8+WQrSBF72yKFpm3loyUPK0aTqiudyS8oBKACGg+vhlIGmgKd3RtyNrJS9jJOIKTeyUPI3cjtUpqxtrqZPE7mIGFK0dQjWGVsVd6NXp4Dxu+G+1m+M3x8KdjH4a9O/bWqFdnOZ0v42HgLSMz6P8K3PNW0L/WcLQ8m31+w+3lDQ8j+W9P2qnXNiftjwL//O/TJ91QjPSCH/4C4/S8XDmOziUAAAAASUVORK5CYII='
)
ColorMapIcons.set(
  'Warm to Cool',
  'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADwAAAAFCAYAAAAZiY8XAAAAAXNSR0IArs4c6QAAANBJREFUOE/dk8tuwkAQBMvenRlIIs58Af9/4OPYmX1ENoYbSg5GinIo9blV3dM1X4adBT1l9EvQT0U+BDkqchTykgclPTGSKfPBmNWYTJnU4IkyxFZ6vtOy0rJRk1JnpSYjECpCdKGOTPSE90y0hLeZaDNeF6aVCPCVgfvAo+O+URruFS+VKI90vARxc6Js3ArTNV/6vyq8FL8txV8XbrsXVmNsdv+KYS9O3QxXO2f0JO+dtNh9zu+e9C8Mx+6Gf/hwS4ajVJbv7vvhx49fTfobIYyqafgnQO0AAAAASUVORK5CYII='
)
ColorMapIcons.set(
  'Cool to Warm (Extended)',
  'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADwAAAAFCAYAAAAZiY8XAAAAAXNSR0IArs4c6QAAAN9JREFUOE/lk7tOxDAABCeOn0lIy7fd/xfQQYgd23HsoDvR0EBzguKK1TbbjLTTweVUVqKdoreS3iqkU6hBI0dzazVqbhsrUe7aCu0M5prhK1bjBss4DcyjY54sk1GMWjIbyZNRDEoyy5PnLqKEQMcXWvig+jfaulCXd2oItLBRfaCuG8fiKX5j3yLJb4R1I4ZE8oWcdnIu5FhI6SAfHXsV5NaTT03uNBlJpicLQRY9HVzaowHXRwM+/g/4lRaWP790uQewtprhm8OOycg7OLxSfPzR4T0W4i8OJyHYRc8nQDt6K0KjdXEAAAAASUVORK5CYII='
)
ColorMapIcons.set(
  'Warm to Cool (Extended)',
  'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADwAAAAFCAYAAAAZiY8XAAAAAXNSR0IArs4c6QAAAOpJREFUOE/lk71OwzAURs+9dpPmxy0sHZHyWH13JNSpldhwmpDYjlGYGSIGhGA4D3D0fUfOdLmSQC0JpwtOE24XaYtA21jqRqlqZX+0FM5gncW0BtMotjEYp+hKrWi5w1Qlpimx9UqFqQ7Y6gEtH5HyhBQnxHRczBOveeDKzC0lbtFymS3P48LLqPghkfpI9AviE9kndEjkcUHuEekT6sMn+JnsA9lPLH4i9TMyTuznd2odkTCg8Y7GHjnTLf9NOG0SPliKwy9e+C2Q+20Lx03Cf+jS4SthVwSajQ2vHcu3Gh65Mv1YwxJ7PgBL6YOKfnHF6wAAAABJRU5ErkJggg=='
)
ColorMapIcons.set(
  'Blue to Red Rainbow',
  'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADwAAAAFCAYAAAAZiY8XAAAAAXNSR0IArs4c6QAAAFlJREFUOE/lk8EKwCAMQ58w0O3/v1U35lYpeHJO2XH0UBqS9hCaOhBZgQBof8Mz/eveQgZSrb2De5zOz/ix7kBua4Yva4Zza9gDWxPv/0U6AsfjVTTSp6ULF/z4n/Lum09IAAAAAElFTkSuQmCC'
)
ColorMapIcons.set(
  'Red to Blue Rainbow',
  'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADwAAAAFCAYAAAAZiY8XAAAAAXNSR0IArs4c6QAAAFpJREFUOE/lk1ELgCAMhD8hSPv/v9WKrInWQ6QSPsoexh3b7uHYzQgIOMByY4v/zft0gYkVcm0Pvnmt19rt0RmBS5vhU5vhUBqegeUT77Ei7YG98iop0oemC0cfIJ/ygRlg0wAAAABJRU5ErkJggg=='
)
ColorMapIcons.set(
  'jet',
  'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADwAAAAFCAYAAAAZiY8XAAAAAXNSR0IArs4c6QAAAFBJREFUOE9jbP9f8Z+T4TsDB8MPBhCNzIaJ4aIZfjAwMHxnYKA3TYm1jO3/K/6NNA//HWke/kPIwzB59KRN86QMyy5oaZjSJP2bkIeHUx4GABhjLoaWFMXAAAAAAElFTkSuQmCC'
)
ColorMapIcons.set(
  'rainbow',
  'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADwAAAAFCAYAAAAZiY8XAAAAAXNSR0IArs4c6QAAAFlJREFUOE/lk80KgDAMg7+BsOn7P6tuOK0UPO2H4lF6KA1JewhNA4KsQAK0z7Clf91bKnC8lQd4xOm8xRt6QLi9Gb68Ga6t4QhsTbx/F+kdKP2raKRPTxd+AJMHn/J+EEzZAAAAAElFTkSuQmCC'
)
ColorMapIcons.set(
  'hsv',
  'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADwAAAAFCAYAAAAZiY8XAAAAAXNSR0IArs4c6QAAAFlJREFUOE9jZPj//z8Dw2cG8vAXDH0sDN8ZeBkYqIZZvmNxGqa1RDufkeH//39Eq8YImKHp4b8jzcN/aOVhHgYGBj4SkzdIPUgfLFvQIkn/ppWHqZGXqe1hAJ/o0fITXg0nAAAAAElFTkSuQmCC'
)
ColorMapIcons.set(
  'Rainbow Desaturated',
  'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADwAAAAFCAYAAAAZiY8XAAAAAXNSR0IArs4c6QAAAK9JREFUOE/dk7EOgjAURQ8JDiVBSBDH8jn9/5lJXQUsgdBEREMkkSIDbOjwcl67ndx3HaXSpzGaptGMOd5b34UkAnkAGUEy4dEDff6e8vMX7xpkCEkAMpgwhNgFMiAfON0z0BXkFRS1zbyGooK2c9kLYY3vedbbUSrt/kk4EAJ/JD0n/Pg54T7pPtUh6bUJt5sSLoDrzHkvPOklCd9t4RJjblaf13X4Avr07vMGO/wC5lRgaHOSOosAAAAASUVORK5CYII='
)
ColorMapIcons.set(
  'Cold and Hot',
  'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADwAAAAFCAYAAAAZiY8XAAAAAXNSR0IArs4c6QAAAG9JREFUOE/lk80KQFAQRs9dWOBBFO+DB3ffgiUWFyN/RSEkFncxzfRNTZ2aoxARKqCGTX8rW98xBaDHishI0MRoAicHD3CZ+tG8t7+ZKUQ624Bb24CbP4BDMtKfXtpcAh4cLx+4/oXD/uz/4vOJ1z0/NrjthWgG9gAAAABJRU5ErkJggg=='
)
ColorMapIcons.set(
  'Rainbow Blended Black',
  'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADwAAAAFCAYAAAAZiY8XAAAAAXNSR0IArs4c6QAAAHhJREFUOE/llMsKgCAQRY+tc9/j/z+t2ku7tEJQUJtaFUEthtHray5HVcAGLdAh52SsVfkUaZnXqgkYLkNjslPPKtAz4Lcbi1xom6mx9LgQadtrsa+A9Wg0mvdlfM+we5OwRLYHmnDnniBs/0Z4eZNw+nikX+RuwjsoyKlSEERyVQAAAABJRU5ErkJggg=='
)
ColorMapIcons.set(
  'Rainbow Blended Grey',
  'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADwAAAAFCAYAAAAZiY8XAAAAAXNSR0IArs4c6QAAAH5JREFUOE/lkzsKgDAQRJ/Wflo/p7LyFt5a7UXIgl+iEUKQWImFxTC7UwwMOxtUdbOJShBJOViliJysHJ0cDhSG7dnWwh5ovYgZHq20ZTwC2q5z2NG2IWKmZDGwZ61de1DVzfq3wMuXge9KUgKZKdIbF56/DOz7jrcqPf0p8A7ulw1h6vPbEQAAAABJRU5ErkJggg=='
)
ColorMapIcons.set(
  'Rainbow Blended White',
  'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADwAAAAFCAYAAAAZiY8XAAAAAXNSR0IArs4c6QAAAHFJREFUOE/lk70KgDAMhD+d7e7P+z+a7V7crJ4UFEopdSoODuGSGw4+knSS5BxYCyVNPY3ABMy3pn3q9Q5Yq2Xwr1Ex0mxAjLOZZp78QGDhuCvto/fMnaTzb8DHl8ClI1mAeEytNhy+BK59Ryvg/U/AF/9VEmHMOHLAAAAAAElFTkSuQmCC'
)
ColorMapIcons.set(
  'nic_CubicL',
  'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADwAAAAFCAYAAAAZiY8XAAAAAXNSR0IArs4c6QAAAKVJREFUOE/Vk0sOgzAMBefZgV6OU3FDrkN+VUKEiip1xaIsrPFLVk/WaNnWahaRRUyNCbO9Z40cVHAruAqhM595kpgRs8SE0XPf1ffOMQHO97aHKrwTHOEVwqAXsCysgGc6LzmBJx1/6RhvzEKxogjsB1umcQct21ruKPySCA8pnO8o/KQLpzsKP+nC8WdhTwT+wOHaPP1wejj77bChWIbDzd+rw28mt+mseIsUogAAAABJRU5ErkJggg=='
)
ColorMapIcons.set(
  'Spectral_lowBlue',
  'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADwAAAAFCAYAAAAZiY8XAAAAAXNSR0IArs4c6QAAAIBJREFUOE/lk0EOxDAIA53/v6kPKwa8gjRSdy/tOXuwGHMBK2QoDyETSALhQBDIqg6tnk/f+uXyrZiVAS1fzJg9K84vLi+q+7nYJqePVly6c6/Bayw1x9f6xQbQ1XJPkAKt+gJPYSiP/LfAsVPgMMAeXti3CVyny+eT5jaBX/zhD2KYynrGZBcjAAAAAElFTkSuQmCC'
)
ColorMapIcons.set(
  'Yellow 15',
  'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADwAAAAFCAYAAAAZiY8XAAAAAXNSR0IArs4c6QAAAJ5JREFUOE/lk7GKAzEMBce7//+1FyJZsvWCnSXVwV2XYothjA2GV0yThqQH0g+lB2A0bFvVoRxp+WJ2tHE0HBbTIA2lf6wMFMnbsc3yuotxvU0UE+WiUApFUSHUi3DhVpvRYQTMXN80PBs9G3F5nT0atg1WJ1YHpgNvJ9ZOnIMmjbrb4Hm3weNug/N/g2P3zG8Nl0E8UfbvNXx1/VfDL/EtyEXrIuyvAAAAAElFTkSuQmCC'
)
ColorMapIcons.set(
  'Asymmtrical Earth Tones (6_21b)',
  'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADwAAAAFCAYAAAAZiY8XAAAAAXNSR0IArs4c6QAAAMVJREFUOE/lk0tuwzAMBccSKdlKjxHkArn/pSzKH9lNCiVpC3TRVVAU7WLw3nbwyO54Ol/DkIjpQEufFDcoLik+uAcdolc0XJAAsffEwX9m69ETpCFEFZLcGVToRejfU/ytR1GCbwTUBXwXHyScO+C6F9ZlJ2cj54LlERvzLSczlmLMZsxlYikT81Soc2VbK9tSqWtjo9bG/tG74+l8+W/Cr39XuN7X/bLw/ruFC9kMG5930tuPCqunFyWKPP+Hp8pWv//hN14dTTr09mHBAAAAAElFTkSuQmCC'
)
ColorMapIcons.set(
  'Green-Blue Asymmetric Divergent (62Blbc)',
  'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADwAAAAFCAYAAAAZiY8XAAAAAXNSR0IArs4c6QAAANpJREFUOE/lk7tSAzEQBFtaSavzBRREJnLkL/D//w4RyT1XknmVDycEBBDxCKZ6066dcYfT8TV1iubEhamLxByJXSAkQZIQ1L/fKhv1mqyeXj07dfTqyNd00aMhkCVu1KBoTGiIZBFUAkmU4HrE7RDf4X3G+UwIt4R0T5EbHmphKI3BGtYapZ0prWHTyjrOrNPMMkzMw8QyTpTZttSlUFejmW2sZaXaQpkfcYfT8eW/CT//VeFqRluMWj9++OlnCd8R0v7zSp8bNn690sUW6rXS5+8LX7Yrv2rDb3obR1RNAWp0AAAAAElFTkSuQmCC'
)
ColorMapIcons.set(
  'Muted Blue-Green',
  'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADwAAAAFCAYAAAAZiY8XAAAAAXNSR0IArs4c6QAAAMdJREFUOE/dk0tuwzAMRMcQf0KMniDnyS73P0W3EkVZdmG76TotigLN4mFI7gbDma63+0ZmSKxIxCDRc2YFEZ83EjAJhPhQZYWyHWoiMNnVMGfDxfLBnPXcVZCFkCXhooS3nDBngKlim95ReoEvDW10tCUQ64JYB2Ib8B7waAc19vmktUDzXTu8Okpx1OLwh1aH14b2SY+OB9P1dl+/ZZgFSv/b8HjG8J6yvkjCyzOGv176BRLuyQz0gw4LK/IvdThGh/9Bhz8AoVe7JmUyOsEAAAAASUVORK5CYII='
)
ColorMapIcons.set(
  'BkRd',
  'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADwAAAAFCAYAAAAZiY8XAAAAAXNSR0IArs4c6QAAAGFJREFUOE/FkjsKgEAMRN/i6v3vq64ynQhKkhGskmK+JA04OjADmpW9wvnLrwHDDezys+UdPxXeHYHqV2RLXvFOXhXeIgITsDy8fYT/JeaupVzKF/FQ4TUCfMO4/Oy1Hb8TtNIJ8u4jL68AAAAASUVORK5CYII='
)
ColorMapIcons.set(
  'BkGn',
  'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADwAAAAFCAYAAAAZiY8XAAAAAXNSR0IArs4c6QAAAFVJREFUOE9jZGBg+M/AwsDAwMrAAKbJYZOjZ4DsY2RgYPhHlieRHTzEPPx3pHn4D1EeZmZgYGDDkewHOoZB7gK5jwh3gJL0b2IU4lVDhEUU20GlLAQAr9cJ8oQxyqcAAAAASUVORK5CYII='
)
ColorMapIcons.set(
  'BkBu',
  'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADwAAAAFCAYAAAAZiY8XAAAAAXNSR0IArs4c6QAAAFVJREFUOE9jZGBg+M/AwMLAwMDKAKHJYZOjZ2DsY2RgYPhHnieRHTy0PPx3pHn4D3EeZmZgYGDDkewHOoZB7gK5j7A7QEn6NzEK8ashbBHldlAnCwEAqtwJ8qYMUZsAAAAASUVORK5CYII='
)
ColorMapIcons.set(
  'Purples',
  'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADwAAAAFCAYAAAAZiY8XAAAAAXNSR0IArs4c6QAAAI9JREFUOE/lU1sKwzAMk+Td/wD96Hl6p23dsNKEFgp9jDFGP4Jt2ZgYSey74SURCsFxnkfWE77Sjzp/MpKESFBAywn/IWtm7n7OlZl5jooljqnfMAPeUXc59t0wXu3g5ycHRxQ2mjoOsP0rhh/bBwuyvJeS/1dJ333ITfbLeQ+n14v/9r7KsAJpuOLXL3v4Db2DE7vloNCTAAAAAElFTkSuQmCC'
)
ColorMapIcons.set(
  'RdPu',
  'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADwAAAAFCAYAAAAZiY8XAAAAAXNSR0IArs4c6QAAAJxJREFUOE/lU1sOwyAMsw07KvfjRt09usFEAlVZpWkf3aRpHyjkgVESm0vKtQahRMJseLI9fshFr6UEBgKi2dkXuIvD8nMdg6ARC46ljjnfHUvjD8Kx2A7cmu93wxxxy/WaJeXysuELUaXjMH644fu/bfj2+Q07HQelGy2x0fbLlL6mvJazNBybbvaaflfD7Q3Q9Dx0a0OZ9HyOhh+ypV5rlJGRwgAAAABJRU5ErkJggg=='
)
ColorMapIcons.set(
  'RdOr',
  'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADwAAAAFCAYAAAAZiY8XAAAAAXNSR0IArs4c6QAAAI1JREFUOE/VU9EOgzAIvKP9yX6UX2ynSxG0XXyQZFv0gQAHITkOWKeyIiXslhOouRxYXx9iAaQz8sjpOIE9FoutjwloJuYtpvaPmM4Yei13XL2AOvOstuGsU1nihLMt5JmEX3HCfhFGuF2DbvVXCudt9pcUrnHCd1PYF3LtpOc44Q+F/Y9DCne/9scffgN8JhNhoAye9wAAAABJRU5ErkJggg=='
)
ColorMapIcons.set(
  'BuRd',
  'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADwAAAAFCAYAAAAZiY8XAAAAAXNSR0IArs4c6QAAAKtJREFUOE/lUzEOw0AI8/X/7z0pgE1FaZoOHdLqMnVANojFsj3mnHlLAgwMxYEKDAYgB8IB1sQb73uGId2ae/P9lu6QO2gBWfPCx/66x2Pvn4PTixN0NdZsPWGCUzAWJjx690hYCKaEMbEV6kDLxJhz6t8Ec4lgOtKucLhcFeiEyt0FDscSwYsiXbGOivZXkeYz2uci7Z8FE6N6e3GHcxf4S4eruzrbYcESuAOB0SvCTyTezAAAAABJRU5ErkJggg=='
)
ColorMapIcons.set(
  'GnRP',
  'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADwAAAAFCAYAAAAZiY8XAAAAAXNSR0IArs4c6QAAAKZJREFUOE/lU0EKwzAMc///3xwqyR2Kk7YMNjY62GAHI1nJRchaWmtbZEQqY9PWJzvWbu63ZIbMmbUPLutjeOKiuk4jtKP1XUO9dW1y/+2coVWRa2FNcYI1RJDG0w4GrGsg0XeIQSGW1lr+m2FdNqwMwWkeaf9iwhgJ87Jhnzkz8A3DPm2f6zzxF04aTw3n6O1dh93v6q5x9vXTCWfkirc6jGn8QYdvA/ly2u3SplUAAAAASUVORK5CYII='
)
ColorMapIcons.set(
  'GYPi',
  'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADwAAAAFCAYAAAAZiY8XAAAAAXNSR0IArs4c6QAAAJdJREFUOE/lU8sKAjEQS///f627k2SknaLoQUT3sOAh5NFT6KT1fslmAAaaE3Ci/ODyE0qkHhryzJMjN5ILU1fmEDIEB1945IT3Qu666/LrbSO8EboODrhzQhtBFiSVjuVDCBFhgpNVenHr/eJ/K6zDC49r4Hl/mIcXPvlJx8eF15bHnt9vGEiN7f66Yc3tfr/hQNhPG74BKn8oiTVsRysAAAAASUVORK5CYII='
)
ColorMapIcons.set(
  'GBBr',
  'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADwAAAAFCAYAAAAZiY8XAAAAAXNSR0IArs4c6QAAAJhJREFUOE/lU8sOwzAIc/7/d9PDwMBEQqN2l63aDpt2QH5wssCtbz1aGBAEQtESPfnUMbQiDnPUToHbw+weBaY3uBTqxOENLrCxU3DXhVRCaSAdpBVPXdwCag5lgMUn5qA8DJ4efWLrW/d/C2zXAufFZV38Fy/Ma4H19OIrsAsW//KX1o8EPvb4lcDZ7+zv0w7PHs8+v9/hO3NGO9E/J89tAAAAAElFTkSuQmCC'
)
ColorMapIcons.set(
  'PRGn',
  'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADwAAAAFCAYAAAAZiY8XAAAAAXNSR0IArs4c6QAAAJdJREFUOE/lk9FqQzEMQ3X//38DN5Lsoty021s7GO1gBHMskRfFzjHG6EKO4fYX23Hg1vJDba6+7l56ghVexeZFEzMl4vRcvOsH46WYO7uXMCkwpdCLk8bc2jJMw6pFba2t6ztVaBrxjjFG/bfA/ljgTJTvn7BeD1xw81rvn6y0iVN/Z6X5LHC1obf94TyMf/kPG52UKtwAaHln/8s+ZKcAAAAASUVORK5CYII='
)
ColorMapIcons.set(
  'PiYG',
  'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADwAAAAFCAYAAAAZiY8XAAAAAXNSR0IArs4c6QAAAIhJREFUOE/dk0EOw0AIA53//zerBhsqsxupp6g9dg9oGMTFQhxjnFVIJIiCkCUUiIRpdx+QWZ8MCITyAvMFlnnXcl0IzZnZfTOWB0j3s2i2e08gBSoRZvdmLhbIgtpNey5OFwHp3kPPjjHO3CqwA8ZzYG0VuC/9HJhbBf7iwvFr4KoA/c9/+MNvZsVLWOagDjQAAAAASUVORK5CYII='
)
ColorMapIcons.set(
  'OrPu',
  'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADwAAAAFCAYAAAAZiY8XAAAAAXNSR0IArs4c6QAAAKVJREFUOE/lk8EOwzAIQ53//990CTZMNOlaaZrWaqdqB8tAcrHglaXWKGEoboD3D95Q1IFU/pkONazi9EMdbAh2ONuQzdpGr5QRToNSNtzZIXaQAhmgAqK/6m1GYX1LN9/rvc95Wd/pgE0vS63+L4HlQAbWnQKLAZubPb3h7QpmYN4p8C8nvW3YTgf2wfHOcPaP6wwr+X1nePCbLH9hONk+cHuF4SesqNjhaTBIBAAAAABJRU5ErkJggg=='
)
ColorMapIcons.set(
  'BrBG',
  'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADwAAAAFCAYAAAAZiY8XAAAAAXNSR0IArs4c6QAAAH5JREFUOE/lk7EOAzEMQrn//93c0Bjsilxy7dCh3SplsB7giYGjna1UACvBKqjq1vbOw5eLGnrkmegpdOkzSTxI9HXx8s4j/ItJog9vBoIE329mK08SKWKQRPl0EVObkL1GZn20s+VuhbVbYe5WOH4v7G1fW/6LDcfc7xcbfgLI1llA+jrWCQAAAABJRU5ErkJggg=='
)
ColorMapIcons.set(
  'CT-AAA',
  'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADwAAAAFCAYAAAAZiY8XAAAAAXNSR0IArs4c6QAAAJZJREFUOE/llEEOwjAMBMeN0ifwJA5ceADP4dOINjZySCGtUKuKqpeenM16Y63kjQAWQ0MMwlDbCZ7lm7HWe9vqram2nnG9XTid7/B4Yp2hCVQF85okY9Pv2e8yp4UrPVp6PjoFGzivFRZAj2Y4Hc1wv6/hd3Q8NqtX2te9/3+lu+0NQwxh9C/8mrFoOGdvXYY9u2kmwy8SMCRoT4yc6wAAAABJRU5ErkJggg=='
)
ColorMapIcons.set(
  'CT-Bone',
  'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADwAAAAFCAYAAAAZiY8XAAAAAXNSR0IArs4c6QAAAIxJREFUOE/lk8sKw0AIRa86GSdplyX5/+9sXtiZQBsmQegqZCGKL7joIQBLZIEyI4p5QbTYcvIV1+rWK1xmcm+eKfvO6q8W2nfQofv4VHx4JhAHEDcVO8pbr3MGwHw3wZNH8Ha9nw+46IVHj+Dqy19U8HsvuDEWDxnOfG+mfzHcQoeHn2EJIKqx7Wd4BVsxE+gvcxdbAAAAAElFTkSuQmCC'
)
ColorMapIcons.set(
  'CT-Bones',
  'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADwAAAAFCAYAAAAZiY8XAAAAAXNSR0IArs4c6QAAAKdJREFUOE/Vk1sKwjAQRU8Um4Ddgt+6mex/F+1PayKmjbTTh5aCBUPBj+EOk8nAzZwoa2PkXEFes1nzauo98iBzDZlve9Vd7iSXaKXm5/pqz9v5x71xnp9nqwtwO8C1CzXkCmoNpYFCQ2GgXKpBWRvbzUbHh/lzw01aw4HMxd82fBdihISBjIQbDmkNf0M6oHvkF9jviPRzX8PLfy5E6BXDxjWcEm/4BSfTogOtNpScAAAAAElFTkSuQmCC'
)
ColorMapIcons.set(
  'CT-Cardiac',
  'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADwAAAAFCAYAAAAZiY8XAAAAAXNSR0IArs4c6QAAAKpJREFUOE9jZGBg+M/KxMjAysTEwMoMoiFsFhAN5jNBxUB8JDaSehaYGiLUg8yVluZmMDYTY9CIW8MwT1iAgYmNk4GJnQtCgzGMzcXAxI4uhqwWTQ+GWqg8WBzCZmRgYPg30jz8l1QPg2KJbRDFMDMo5kAxSGQM/yHVw+jq4UkanA3wZ4HBkKR/U83DWPMwA7QcgJQR2DwMjiHkPMwKiy3kWEPK23C1pOdhAOgjIFnZ4cXIAAAAAElFTkSuQmCC'
)
ColorMapIcons.set(
  'CT-Cardiac2',
  'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADwAAAAFCAYAAAAZiY8XAAAAAXNSR0IArs4c6QAAAK9JREFUOE/Fk0sOgzAMBcdOEKzZttfgDmw5UDl3y7cKDYUAUtUWwSKyY8eLid8ToI9UsKq4GBkZ4vs+5r6+7rkZP7ucG2Y2eka4XmryQkmzG5gENAZNpnysBfH1rieirVifBzRb9VlNgO4oYAdv/aeeCdweBTxX0ZnAza7AopMtFpL+fsNO4k7qsZf6PpKufwYWwTqojx5m8HK44Yq8MKRZOUH94+Ea2nvo4a5ae/oJocmnWdzGgmYAAAAASUVORK5CYII='
)
ColorMapIcons.set(
  'CT-Cardiac3',
  'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADwAAAAFCAYAAAAZiY8XAAAAAXNSR0IArs4c6QAAAIdJREFUOE9jZGBg+M/AxMnAwMzJAKZhmCQ+B0n6C59OZuhT2cXAsLCOgYF3HQMD5xUGBgZxBgYGMZz0vz/MDH9/MzD8+80Ap8HsP6hi6GrQ5RkZGBj+jTQP/x1pHv5DNQ8zImUNPFmCJkkalLR/IZI7PGmjJXlQkv5NlodR8v3gy8OwvI6ehwGue95ZaWDG3QAAAABJRU5ErkJggg=='
)
ColorMapIcons.set(
  'CT-Chest-Vessels',
  'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADwAAAAFCAYAAAAZiY8XAAAAAXNSR0IArs4c6QAAAItJREFUOE/lk0EOwjAMBCexRQwXToU/9P+/K0lR3JJSKnFsJThE613bkVa2AzCaRs4aMRFq3LgKJnPO9S33Po2ckpDennOLTfvMp+uN1PVY1zvK5U7JMObg6HF5xRNueK0tc23rm7TlnzUPQPk3w3kfw3XaumzBgRN+7GN4vfJHrvTwS4br7eYvN/wEftULaDGHRSsAAAAASUVORK5CYII='
)
ColorMapIcons.set(
  'CT-Coronary-Arteries',
  'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADwAAAAFCAYAAAAZiY8XAAAAAXNSR0IArs4c6QAAAE5JREFUOE/Nz8ENwDAIBMG1RCl0wYNK6L+IxE5aOB6W4L3iNAv4uHQRQVWRmbg7ZnZpSX+7gKPnvXIqePcYej0V/OqEXjkV/PQYej0R/ANlzBPojrx0AQAAAABJRU5ErkJggg=='
)
ColorMapIcons.set(
  'CT-Fat',
  'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADwAAAAFCAYAAAAZiY8XAAAAAXNSR0IArs4c6QAAALBJREFUOE9j9PX9/59B/AUDgwQIv4TQcP4Lhp/fmRk+X5UD4y9QGsS+cFqYQXjWPzBmfseACXgYGRgCmBkY/JkZGGyZGRh+MzEw/GGC0MhsmBiKHCMRanCYg8/sP4wMjL6+//8NaQ//ZWJg+EVkYEI9/Jegh6/JMXy+QuMYhjkcHEO0jeE/BD08KJI0IwPDH2jWQE62ZMTwb2I9jJyPycrDKLGIKw+CPIYmR4qnCORhAC/1M/7A+6+gAAAAAElFTkSuQmCC'
)
ColorMapIcons.set(
  'CT-Liver-Vasculature',
  'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADwAAAAFCAYAAAAZiY8XAAAAAXNSR0IArs4c6QAAAFBJREFUOE9jZGBg+M9AI9DqycUgrW/EoO2VyyAsrcfAwsLGwMLKysDKwgqloXxWVgYmJmYauQLVWEYGBoZ/tLJpsHr470jz8J+R5uHfI8nDADacE+hts5OdAAAAAElFTkSuQmCC'
)
ColorMapIcons.set(
  'CT-Lung',
  'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADwAAAAFCAYAAAAZiY8XAAAAAXNSR0IArs4c6QAAAJFJREFUOE9j9PX9///zZwYGdPz15y8Gxf2yDPstWBmYXF8zMDAwMTAyMDIwMIJIKBtEMzIyMIBlmCA0I5TGIQY2B2oGXB+YDzIHYi7YLDQxBkaYHFQd2F6YO5D1IInB3YJwG6Ov7/9/I83Dfz99YmD48gU1lodeDINSHyh2Ccfwn8ETw7DsQtsk/XvweJj2eRgAK1Fc9PV/j0EAAAAASUVORK5CYII='
)
ColorMapIcons.set(
  'CT-Muscle',
  'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADwAAAAFCAYAAAAZiY8XAAAAAXNSR0IArs4c6QAAAKFJREFUOE/lk70OwjAMhD8nTQWVEAMDdGFi4w14EN7/PWgc5DRAKiQkfhbUwfLZ5xtO8gmQghOCd+Q+wWXnbT/itsITjfGZK7dPeNQvF55d3+Xa9h2bw4n18Uyz2qMRVIVkPUqekz6w7TKnhSs3Wm7uOoV046xXswA6N8NxboaHvzFs7z58/9KXjwyLEJoq987ReKH9ZYZz9t7LsGU3vsjwFZuGC2gbGbWVAAAAAElFTkSuQmCC'
)
ColorMapIcons.set(
  'CT-Pulmonary-Arteries',
  'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADwAAAAFCAYAAAAZiY8XAAAAAXNSR0IArs4c6QAAAGdJREFUOE9jZGBg+M9AAZAU5mbQVxFj0JNiYdBkfccg+oCDQewhBwP3XyGG31pKSFiRgZGNjYGJiQmMGRkZ4WyYGD6aWuoZGRgY/lHgX4ah6OG/I83Df0aah39Ty8NarO8YRAZ5HgYAjpo76FPLrYcAAAAASUVORK5CYII='
)
ColorMapIcons.set(
  'CT-Soft-Tissue',
  'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADwAAAAFCAYAAAAZiY8XAAAAAXNSR0IArs4c6QAAAE9JREFUOE9jZGBg+M9ARaCtrc1gZWUFx2pqalQ0nXKjGBkYGP5RbgzChKHg4b8jzcN/qOlhLS0tBmtr60GdpH9T08OwJA3ytKWlJcNgy8MA9EwT6BXoKV4AAAAASUVORK5CYII='
)
ColorMapIcons.set(
  'CT-Air',
  'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADwAAAAFCAYAAAAZiY8XAAAAAXNSR0IArs4c6QAAAIpJREFUOE/lVEEOgzAMcy/w/58xvgHXAQMSo1CqdjAkJLT1sEOkynIsOYnrSLID8Kn6E/yMb7j1SAsUNVBaPQDXzFAdoPpaSyS+A77HRDw39g04YqmW1/Scd/0UcyT13wxLDsM2dTJu45cbnnMYDued46SnO4afW26DxiHDFeDab2TYcjom/8G1DC+kW4oVBvkY3wAAAABJRU5ErkJggg=='
)
ColorMapIcons.set(
  'MR-Angio',
  'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADwAAAAFCAYAAAAZiY8XAAAAAXNSR0IArs4c6QAAAD5JREFUOE9jZGBg+M9AI/BsTSEDp3MdAyMjI9gGdBqbGDlqYHqIMQ/kkn808i/DYPXw35Hm4T8jzcO/R5KHAWCQE+iExalVAAAAAElFTkSuQmCC'
)
ColorMapIcons.set(
  'MR-Default',
  'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADwAAAAFCAYAAAAZiY8XAAAAAXNSR0IArs4c6QAAAJBJREFUOE/lk80KwkAMhL/EgyBCG3XFtuKtL9D3fzN/iXb7t95EFHoYCNlJsgMzAtxroKkyTkcjFDmhtCe2B2Ox2iTQ5RoRRUQ60NVtn+nbmO+zrxl15ptdKd95TO7GPyT9dmfah9vcBF/nJvjyHcFuSXftwLqDCPzS0udecE4ojH1p7D7IsLrImEuN9X9k+AF5cRPoaLoh+AAAAABJRU5ErkJggg=='
)
ColorMapIcons.set(
  'MR-T2-Brain',
  'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADwAAAAFCAYAAAAZiY8XAAAAAXNSR0IArs4c6QAAAIpJREFUOE/lk8EOwiAQRF8tSy/lXHT//xshKmjANrZKTDxWT4/szhwmO3TATb2gk6XwNFMnQb1l4RkhZiFkS0wzc5lZQqUQkn1qVtqNpvibWiG++J0cGKVnrHx/P/arudlqXMPbAfnfAqddBrY9rl70+wtfPwc26HGgVnqp8s4rfWkHNqgffu4P3wG72TD3+2nVeQAAAABJRU5ErkJggg=='
)
ColorMapIcons.set(
  'DTI-FA-Brain',
  'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADwAAAAFCAYAAAAZiY8XAAAAAXNSR0IArs4c6QAAAJlJREFUOE/lk8EKAjEMRF8PSit4aP//G1sQMRVdK9mtuLsU1ENR8BCm0+QyJM8UKOJBAmTV+lZt+lBntL/fIHgyHilh0lqZgJTao/ZGH8YZIxaXWFacvF3/z73ODAcsEUdaacSScLQ0suWIKXD7t8BDj8CiW/3RDV97BG6f9PPsv3nSl3cDnz2cOjCszO6U048YfrA6Z/k1w3fVFUUB3iCsCAAAAABJRU5ErkJggg=='
)
ColorMapIcons.set(
  'US-Fetal',
  'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADwAAAAFCAYAAAAZiY8XAAAAAXNSR0IArs4c6QAAAKVJREFUOE/dk+sOwiAMhT8uC2zxj8P3f1EdmAIuuIwsJkajJE1pKYUD5yggUYczmtFqvDV4W+emxCVfzTzHo9TL3kEzB8988QTxwTGdBlJS2WL2NPMS5zyPms5620MuvfZremzPqD3XM5JCAfHvAMuDREXsAF5+HbBwdNljUQfw7duAMz3fSemDH77uAXZWM4lmX9SwaPe80TBVW5/RsOhbTO9S+g4CbFfWAN08/gAAAABJRU5ErkJggg=='
)

const CategoricalColors = new Map()
CategoricalColors.set('glasbey', {
  IndexedColors: [
    0.843137,
    0.0,
    0.0,
    0.54902,
    0.235294,
    1.0,
    0.007843,
    0.533333,
    0.0,
    0.0,
    0.67451,
    0.780392,
    0.596078,
    1.0,
    0.0,
    1.0,
    0.498039,
    0.819608,
    0.423529,
    0.0,
    0.309804,
    1.0,
    0.647059,
    0.188235,
    0.345098,
    0.231373,
    0.0,
    0.0,
    0.341176,
    0.34902,
    0.0,
    0.0,
    0.866667,
    0.0,
    0.992157,
    0.811765,
    0.631373,
    0.458824,
    0.415686,
    0.737255,
    0.717647,
    1.0,
    0.584314,
    0.709804,
    0.470588,
    0.752941,
    0.015686,
    0.72549,
    0.392157,
    0.329412,
    0.454902,
    0.47451,
    0.0,
    0.0,
    0.027451,
    0.454902,
    0.847059,
    0.996078,
    0.960784,
    0.564706,
    0.0,
    0.294118,
    0.0,
    0.560784,
    0.478431,
    0.0,
    1.0,
    0.447059,
    0.4,
    0.933333,
    0.72549,
    0.72549,
    0.368627,
    0.494118,
    0.4,
    0.607843,
    0.894118,
    1.0,
    0.92549,
    0.0,
    0.466667,
    0.65098,
    0.482353,
    0.72549,
    0.352941,
    0.0,
    0.643137,
    0.015686,
    0.776471,
    0.0,
    0.619608,
    0.294118,
    0.0,
    0.611765,
    0.231373,
    0.313725,
    0.796078,
    0.768627,
    0.0,
    0.443137,
    0.509804,
    0.596078,
    0.0,
    0.686275,
    0.541176,
    0.513725,
    0.533333,
    1.0,
    0.364706,
    0.215686,
    0.231373,
    0.223529,
    0.0,
    0.0,
    0.992157,
    0.752941,
    1.0,
    0.745098,
    0.905882,
    0.752941,
    0.858824,
    0.427451,
    0.003922,
    0.576471,
    0.721569,
    0.713725,
    0.894118,
    0.321569,
    1.0,
    0.184314,
    0.32549,
    0.509804,
    0.768627,
    0.4,
    0.564706,
    0.333333,
    0.384314,
    0.12549,
    0.772549,
    0.623529,
    0.447059,
    0.015686,
    0.509804,
    0.529412,
    0.411765,
    0.905882,
    0.501961,
    0.501961,
    0.152941,
    0.564706,
    0.427451,
    0.705882,
    1.0,
    0.305882,
    0.2,
    1.0,
    0.52549,
    0.639216,
    0.007843,
    0.996078,
    0.011765,
    0.796078,
    0.760784,
    0.65098,
    0.772549,
    0.772549,
    0.341176,
    0.27451,
    0.462745,
    0.345098,
    0.239216,
    0.003922,
    0.407843,
    0.258824,
    0.0,
    0.839216,
    0.835294,
    0.854902,
    0.878431,
    1.0,
    0.976471,
    1.0,
    0.0,
    0.415686,
    0.407843,
    0.690196,
    0.764706,
    0.596078,
    0.0,
    0.882353,
    0.803922,
    0.611765,
    0.854902,
    0.588235,
    1.0,
    0.733333,
    0.011765,
    0.992157,
    0.572549,
    0.321569,
    0.509804,
    0.627451,
    0.0,
    0.45098,
    0.341176,
    0.607843,
    0.333333,
    0.827451,
    0.54902,
    0.560784,
    0.215686,
    0.270588,
    0.152941,
    0.592157,
    0.647059,
    0.764706,
    0.556863,
    0.552941,
    0.372549,
    1.0,
    0.27451,
    0.0,
    0.784314,
    1.0,
    0.980392,
    0.682353,
    0.427451,
    1.0,
    0.431373,
    0.815686,
    0.654902,
    0.74902,
    1.0,
    0.54902,
    0.54902,
    0.329412,
    0.694118,
    0.470588,
    0.211765,
    0.098039,
    1.0,
    0.627451,
    0.47451,
    0.662745,
    0.0,
    0.121569,
    1.0,
    0.109804,
    0.270588,
    0.372549,
    0.066667,
    0.137255,
    0.403922,
    0.592157,
    0.580392,
    1.0,
    0.372549,
    0.580392,
    0.298039,
    0.403922,
    0.454902,
    0.32549,
    0.572549,
    0.8,
    0.666667,
    0.443137,
    0.192157,
    0.007843,
    0.811765,
    0.996078,
    0.0,
    0.768627,
    0.423529,
    0.380392,
    0.207843,
    0.364706,
    0.564706,
    0.831373,
    0.184314,
    0.74902,
    0.835294,
    0.486275,
    0.317647,
    0.270588,
    0.635294,
    0.305882,
    0.137255,
    0.047059,
    0.486275,
    0.352941,
    0.0,
    1.0,
    0.807843,
    0.266667,
    0.513725,
    0.007843,
    0.811765,
    0.301961,
    0.992157,
    1.0,
    0.537255,
    0.0,
    0.239216,
    0.482353,
    0.321569,
    0.360784,
    0.0,
    0.454902,
    0.615686,
    0.666667,
    0.513725,
    0.596078,
    0.505882,
    0.443137,
    0.560784,
    0.384314,
    0.396078,
    0.996078,
    0.764706,
    0.203922,
    0.537255,
    0.803922,
    0.160784,
    0.278431,
    1.0,
    0.603922,
    0.709804,
    0.764706,
    0.364706,
    0.733333,
    0.129412,
    0.407843,
    0.007843,
    0.0,
    0.556863,
    0.396078,
    0.388235,
    0.501961,
    0.137255,
    0.537255,
    0.529412,
    0.74902,
    0.596078,
    0.866667,
    0.835294,
    0.807843,
    0.498039,
    0.345098,
    0.823529,
    0.717647,
    0.356863,
    0.380392,
    0.0,
    0.431373,
    0.6,
    0.329412,
    0.266667,
    0.690196,
    0.780392,
    0.858824,
    0.94902,
    1.0,
    0.823529,
    0.0,
    0.92549,
    0.007843,
    0.803922,
    0.52549,
    0.741176,
    0.270588,
    0.0,
    0.772549,
    0.478431,
    0.615686,
    0.498039,
    0.447059,
    0.443137,
    0.278431,
    0.576471,
    1.0,
    0.729412,
    0.0,
    0.329412,
    0.756863,
    0.678431,
    0.580392,
    0.92549,
    0.247059,
    0.643137,
    0.086275,
    0.372549,
    0.227451,
    0.501961,
    0.0,
    0.298039,
    0.2,
    0.486275,
    0.721569,
    0.827451,
    0.596078,
    0.164706,
    0.0,
    0.223529,
    0.431373,
    0.392157,
    0.721569,
    0.0,
    0.356863,
    1.0,
    0.501961,
    0.239216,
    1.0,
    0.823529,
    0.913725,
    0.501961,
    0.188235,
    0.352941,
    0.129412,
    0.203922,
    0.0,
    0.631373,
    0.368627,
    0.435294,
    0.309804,
    0.709804,
    0.690196,
    0.623529,
    0.623529,
    0.27451,
    0.2,
    0.486275,
    0.239216,
    0.760784,
    0.254902,
    0.0,
    0.780392,
    0.909804,
    0.243137,
    0.423529,
    0.019608,
    0.909804,
    0.462745,
    0.737255,
    0.313725,
    0.647059,
    0.772549,
    0.662745,
    0.854902,
    0.329412,
    0.431373,
    0.847059,
    0.560784,
    0.219608,
    0.984314,
    0.486275,
    1.0,
    0.294118,
    0.392157,
    0.286275,
    0.839216,
    0.764706,
    0.921569,
    0.478431,
    0.180392,
    0.211765,
    0.298039,
    0.560784,
    0.647059,
    0.27451,
    0.533333,
    1.0,
    0.639216,
    0.0,
    0.768627,
    0.917647,
    0.639216,
    0.835294,
    1.0,
    0.737255,
    0.470588,
    0.278431,
    0.282353,
    0.0,
    0.635294,
    0.780392,
    1.0,
    0.568627,
    0.635294,
    0.917647,
    0.309804,
    0.411765,
    0.576471,
    0.905882,
    0.368627,
    0.698039,
    0.623529,
    0.568627,
    0.690196,
    0.345098,
    0.317647,
    0.168627,
    0.690196,
    0.368627,
    0.831373,
    0.52549,
    0.427451,
    0.882353,
    0.756863,
    0.431373,
    0.447059,
    0.894118,
    0.0,
    0.890196,
    0.72549,
    0.717647,
    0.545098,
    0.223529,
    0.180392,
    0.0,
    0.890196,
    0.494118,
    0.643137,
    0.678431,
    0.231373,
    0.188235,
    0.662745,
    0.733333,
    0.298039,
    0.411765,
    0.709804,
    0.513725,
    0.580392,
    0.823529,
    0.564706,
    0.690196,
    0.552941,
    0.27451,
    0.027451,
    0.372549,
    0.470588,
    0.0,
    0.596078,
    0.537255,
    0.352941,
    0.058824,
    0.007843,
    0.356863,
    0.490196,
    0.501961,
    0.188235,
    0.345098,
    0.14902,
    0.898039,
    0.396078,
    0.231373,
    0.372549,
    0.25098,
    0.160784,
    0.45098,
    0.290196,
    0.737255,
    0.294118,
    0.32549,
    0.419608,
    0.788235,
    0.478431,
    0.866667,
    0.611765,
    0.196078,
    0.568627,
    0.784314,
    0.901961,
    0.94902,
    0.019608,
    0.670588,
    0.921569,
    0.654902,
    0.419608,
    0.603922,
    0.905882,
    0.690196,
    0.0,
    0.376471,
    1.0,
    0.388235,
    0.94902,
    0.870588,
    0.0,
    0.466667,
    0.266667,
    0.003922,
    0.376471,
    0.145098,
    0.254902,
    0.407843,
    0.498039,
    0.796078,
    0.47451,
    0.623529,
    0.690196,
    0.05098,
    0.913725,
    0.635294,
    0.615686,
    0.972549,
    0.858824,
    0.517647,
    0.0,
    0.462745,
    0.556863,
    0.427451,
    0.286275,
    0.890196,
    0.254902,
    0.188235,
    0.72549,
    0.286275,
    0.423529,
    0.478431,
    0.290196,
    0.52549,
    1.0,
    0.815686,
    0.713725,
    0.298039,
    0.364706,
    0.780392,
    0.886275,
    0.701961,
    0.572549,
    1.0,
    0.298039,
    0.933333,
    0.839216,
    0.941176,
    0.647059,
    0.74902,
    0.376471,
    0.14902,
    0.843137,
    0.639216,
    0.709804,
    0.741176,
    0.490196,
    0.0,
    0.533333,
    0.435294,
    0.698039,
    1.0,
    0.188235,
    0.631373,
    1.0,
    0.913725,
    0.690196,
    0.2,
    0.345098,
    0.298039,
    0.721569,
    0.54902,
    0.478431,
    0.423529,
    0.529412,
    0.321569,
    0.737255,
    0.580392,
    0.823529,
    0.105882,
    0.901961,
    0.996078,
    0.631373,
    0.235294,
    0.447059,
    0.639216,
    0.317647,
    0.658824,
    0.427451,
    0.0,
    0.596078,
    0.537255,
    0.396078,
    0.482353,
    0.352941,
    0.345098,
    0.545098,
    0.976471,
    0.560784,
    0.545098,
    0.905882,
    0.843137,
    0.486275,
    0.439216,
    0.423529,
    0.003922,
    0.098039,
    0.34902,
    1.0,
    0.090196,
    0.14902,
    1.0,
    0.0,
    0.847059,
    0.337255,
    0.972549,
    0.631373,
    0.992157,
    0.478431,
    0.588235,
    0.235294,
    0.694118,
    0.654902,
    0.835294,
    0.494118,
    0.815686,
    0.866667,
    0.0,
    0.796078,
    0.690196,
    0.478431,
    0.278431,
    0.235294,
    0.854902,
    1.0,
    0.901961,
    0.858824,
    0.019608,
    0.694118,
    0.952941,
    0.866667,
    1.0,
    0.639216,
    0.894118,
    0.435294,
    0.541176,
    0.07451,
    0.137255,
    0.4,
    0.407843,
    0.513725,
    0.909804,
    0.992157,
    0.439216,
    0.847059,
    0.670588,
    0.909804,
    0.878431,
    0.729412,
    0.835294,
    0.996078,
    0.32549,
    0.411765,
    0.458824,
    0.682353,
    0.607843,
    0.596078,
    0.2,
    0.878431,
    0.894118,
    0.45098,
    0.494118,
    0.54902,
    0.34902,
    0.14902,
    0.466667,
    0.278431,
    0.411765,
    0.184314,
    0.243137,
    0.658824,
  ],
  NanColor: [0.75, 0.75, 0.75],
})
CategoricalColors.set('glasbey_bw', {
  IndexedColors: [
    0.843137,
    0.0,
    0.0,
    0.54902,
    0.235294,
    1.0,
    0.007843,
    0.533333,
    0.0,
    0.0,
    0.67451,
    0.780392,
    0.596078,
    1.0,
    0.0,
    1.0,
    0.498039,
    0.819608,
    0.423529,
    0.0,
    0.309804,
    1.0,
    0.647059,
    0.188235,
    0.0,
    0.0,
    0.615686,
    0.52549,
    0.439216,
    0.407843,
    0.0,
    0.286275,
    0.258824,
    0.309804,
    0.164706,
    0.0,
    0.0,
    0.992157,
    0.811765,
    0.737255,
    0.717647,
    1.0,
    0.584314,
    0.705882,
    0.478431,
    0.752941,
    0.015686,
    0.72549,
    0.145098,
    0.4,
    0.635294,
    0.156863,
    0.0,
    0.254902,
    0.862745,
    0.701961,
    0.686275,
    0.996078,
    0.960784,
    0.564706,
    0.313725,
    0.270588,
    0.356863,
    0.643137,
    0.486275,
    0.0,
    1.0,
    0.443137,
    0.4,
    0.247059,
    0.505882,
    0.431373,
    0.509804,
    0.0,
    0.05098,
    0.639216,
    0.482353,
    0.701961,
    0.203922,
    0.305882,
    0.0,
    0.607843,
    0.894118,
    1.0,
    0.921569,
    0.0,
    0.466667,
    0.176471,
    0.0,
    0.039216,
    0.368627,
    0.564706,
    1.0,
    0.0,
    0.780392,
    0.12549,
    0.345098,
    0.003922,
    0.666667,
    0.0,
    0.117647,
    0.0,
    0.603922,
    0.278431,
    0.0,
    0.588235,
    0.623529,
    0.65098,
    0.607843,
    0.258824,
    0.360784,
    0.0,
    0.121569,
    0.196078,
    0.784314,
    0.768627,
    0.0,
    1.0,
    0.815686,
    1.0,
    0.0,
    0.745098,
    0.603922,
    0.215686,
    0.082353,
    1.0,
    0.176471,
    0.145098,
    0.145098,
    0.87451,
    0.345098,
    1.0,
    0.745098,
    0.905882,
    0.752941,
    0.498039,
    0.270588,
    0.596078,
    0.321569,
    0.309804,
    0.235294,
    0.847059,
    0.4,
    0.0,
    0.392157,
    0.454902,
    0.219608,
    0.756863,
    0.45098,
    0.533333,
    0.431373,
    0.454902,
    0.541176,
    0.501961,
    0.615686,
    0.011765,
    0.745098,
    0.545098,
    0.396078,
    0.388235,
    0.2,
    0.223529,
    0.792157,
    0.803922,
    0.854902,
    0.423529,
    0.921569,
    0.513725,
    0.133333,
    0.25098,
    0.411765,
    0.635294,
    0.498039,
    1.0,
    0.996078,
    0.011765,
    0.796078,
    0.462745,
    0.737255,
    0.992157,
    0.85098,
    0.764706,
    0.509804,
    0.807843,
    0.639216,
    0.807843,
    0.427451,
    0.313725,
    0.0,
    0.0,
    0.411765,
    0.454902,
    0.278431,
    0.623529,
    0.368627,
    0.580392,
    0.776471,
    0.74902,
    0.976471,
    1.0,
    0.0,
    0.752941,
    0.329412,
    0.270588,
    0.0,
    0.396078,
    0.235294,
    0.356863,
    0.313725,
    0.658824,
    0.32549,
    0.12549,
    0.392157,
    0.309804,
    0.372549,
    1.0,
    0.494118,
    0.560784,
    0.466667,
    0.72549,
    0.031373,
    0.980392,
    0.545098,
    0.572549,
    0.764706,
    0.701961,
    0.0,
    0.207843,
    0.533333,
    0.376471,
    0.494118,
    0.623529,
    0.0,
    0.458824,
    1.0,
    0.870588,
    0.768627,
    0.317647,
    0.031373,
    0.0,
    0.101961,
    0.031373,
    0.0,
    0.298039,
    0.537255,
    0.713725,
    0.0,
    0.87451,
    0.87451,
    0.784314,
    1.0,
    0.980392,
    0.188235,
    0.207843,
    0.082353,
    1.0,
    0.152941,
    0.278431,
    1.0,
    0.592157,
    0.666667,
    0.015686,
    0.0,
    0.101961,
    0.788235,
    0.376471,
    0.694118,
    0.764706,
    0.635294,
    0.215686,
    0.486275,
    0.309804,
    0.227451,
    0.976471,
    0.619608,
    0.466667,
    0.337255,
    0.396078,
    0.392157,
    0.819608,
    0.576471,
    1.0,
    0.176471,
    0.121569,
    0.411765,
    0.254902,
    0.105882,
    0.203922,
    0.686275,
    0.576471,
    0.596078,
    0.384314,
    0.619608,
    0.6,
    0.741176,
    0.870588,
    0.482353,
    1.0,
    0.368627,
    0.580392,
    0.058824,
    0.160784,
    0.137255,
    0.721569,
    0.745098,
    0.67451,
    0.454902,
    0.231373,
    0.396078,
    0.062745,
    0.0,
    0.05098,
    0.498039,
    0.431373,
    0.741176,
    0.619608,
    0.419608,
    0.231373,
    1.0,
    0.27451,
    0.0,
    0.498039,
    0.0,
    0.529412,
    1.0,
    0.807843,
    0.243137,
    0.188235,
    0.231373,
    0.262745,
    0.996078,
    0.647059,
    1.0,
    0.541176,
    0.007843,
    0.243137,
    0.462745,
    0.172549,
    0.003922,
    0.039216,
    0.541176,
    0.588235,
    0.019608,
    0.0,
    0.321569,
    0.556863,
    0.839216,
    0.196078,
    0.32549,
    0.768627,
    0.45098,
    0.278431,
    0.34902,
    0.443137,
    0.345098,
    0.007843,
    0.133333,
    0.65098,
    0.133333,
    0.003922,
    0.564706,
    0.576471,
    0.298039,
    0.0,
    0.262745,
    0.117647,
    0.505882,
    0.0,
    0.819608,
    0.184314,
    0.14902,
    0.247059,
    0.74902,
    0.223529,
    0.517647,
    0.960784,
    1.0,
    0.835294,
    0.0,
    0.827451,
    1.0,
    0.415686,
    0.0,
    0.972549,
    0.611765,
    0.733333,
    0.823529,
    0.478431,
    0.85098,
    0.670588,
    0.411765,
    0.341176,
    0.364706,
    0.0,
    0.411765,
    0.019608,
    0.211765,
    0.211765,
    0.611765,
    0.003922,
    0.513725,
    0.278431,
    0.266667,
    0.117647,
    0.094118,
    0.027451,
    0.647059,
    0.937255,
    1.0,
    0.505882,
    0.188235,
    0.654902,
    0.333333,
    0.721569,
    0.407843,
    0.352941,
    0.513725,
    0.45098,
    1.0,
    1.0,
    0.85098,
    0.529412,
    0.007843,
    0.733333,
    0.827451,
    1.0,
    0.556863,
    0.215686,
    0.184314,
    0.654902,
    0.627451,
    0.501961,
    0.0,
    0.490196,
    0.890196,
    0.556863,
    0.494118,
    0.560784,
    0.6,
    0.266667,
    0.533333,
    0.0,
    0.945098,
    0.207843,
    0.682353,
    0.666667,
    0.788235,
    0.627451,
    0.380392,
    0.384314,
    0.298039,
    0.227451,
    0.466667,
    0.423529,
    0.509804,
    0.513725,
    0.945098,
    0.866667,
    0.905882,
    1.0,
    0.733333,
    0.827451,
    0.219608,
    0.647059,
    0.137255,
    0.705882,
    1.0,
    0.658824,
    0.047059,
    0.070588,
    0.027451,
    0.843137,
    0.321569,
    0.431373,
    0.584314,
    0.623529,
    0.996078,
    0.490196,
    0.498039,
    0.0,
    0.462745,
    0.623529,
    0.72549,
    0.858824,
    0.529412,
    0.498039,
    0.066667,
    0.07451,
    0.098039,
    0.831373,
    0.509804,
    0.831373,
    0.623529,
    0.0,
    0.74902,
    0.862745,
    0.937255,
    1.0,
    0.556863,
    0.670588,
    0.603922,
    0.443137,
    0.392157,
    0.258824,
    0.290196,
    0.235294,
    0.243137,
    0.031373,
    0.305882,
    0.372549,
    0.611765,
    0.721569,
    0.266667,
    0.847059,
    0.870588,
    0.835294,
    0.796078,
    1.0,
    0.423529,
    0.701961,
    0.392157,
    0.921569,
    0.27451,
    0.364706,
    0.2,
    0.0,
    0.619608,
    0.490196,
    0.760784,
    0.254902,
    0.0,
    0.309804,
    0.737255,
    0.733333,
    0.85098,
    0.545098,
    0.694118,
    0.356863,
    0.45098,
    0.713725,
    0.294118,
    0.254902,
    0.003922,
    0.584314,
    0.513725,
    0.368627,
    0.286275,
    0.454902,
    0.545098,
    1.0,
    0.45098,
    1.0,
    0.513725,
    0.415686,
    0.113725,
    0.862745,
    0.811765,
    1.0,
    0.494118,
    0.419608,
    0.996078,
    0.388235,
    0.462745,
    0.376471,
    1.0,
    0.756863,
    0.572549,
    0.34902,
    0.368627,
    0.0,
    0.894118,
    0.035294,
    0.901961,
    0.72549,
    0.694118,
    0.717647,
    0.827451,
    0.176471,
    0.254902,
    0.196078,
    0.258824,
    0.215686,
    0.85098,
    0.639216,
    0.388235,
    0.356863,
    0.545098,
    0.2,
    0.184314,
    0.121569,
    0.0,
    0.596078,
    0.905882,
    0.843137,
    0.164706,
    0.384314,
    0.341176,
    0.807843,
    0.447059,
    0.301961,
    0.364706,
    0.239216,
    0.156863,
    0.0,
    0.34902,
    0.85098,
    0.678431,
    0.580392,
    0.839216,
    0.419608,
    0.117647,
    0.580392,
    0.705882,
    0.003922,
    0.368627,
    0.254902,
    0.0,
    0.27451,
    0.615686,
    1.0,
    0.811765,
    0.894118,
    0.282353,
    0.615686,
    0.890196,
    0.890196,
    0.278431,
    0.862745,
    0.886275,
    0.647059,
    0.0,
    0.156863,
    0.352941,
    0.666667,
    0.356863,
    0.509804,
    0.0,
    0.0,
    0.862745,
    0.294118,
    0.305882,
    0.317647,
    0.854902,
    0.74902,
    0.835294,
    0.0,
    0.301961,
    0.6,
    0.533333,
    0.392157,
    0.619608,
    0.415686,
    0.117647,
    0.113725,
    0.556863,
    0.321569,
    0.772549,
    0.721569,
    0.854902,
    0.87451,
    0.866667,
    0.701961,
    0.992157,
    0.482353,
    0.282353,
    0.329412,
    0.298039,
    0.45098,
    0.0,
    0.270588,
    0.0,
    0.466667,
    0.698039,
    0.372549,
    0.0,
    0.572549,
    0.819608,
    0.52549,
    0.333333,
    0.2,
    0.298039,
    0.411765,
    0.690196,
    0.521569,
    0.670588,
    0.576471,
    0.690196,
    0.905882,
    0.329412,
    0.258824,
    0.560784,
    0.54902,
    0.541176,
    0.439216,
    0.678431,
    0.317647,
    0.670588,
    0.486275,
    0.454902,
    0.0,
    0.203922,
    0.235294,
    0.145098,
    0.058824,
    0.07451,
    0.905882,
    0.690196,
    0.0,
    0.478431,
    0.8,
    0.862745,
    0.094118,
    0.078431,
    0.227451,
    0.615686,
    0.321569,
    0.223529,
    0.733333,
    0.482353,
    0.192157,
    0.717647,
    0.792157,
    0.580392,
    0.192157,
    0.031373,
    0.0,
    0.639216,
    0.584314,
    0.023529,
    0.0,
    0.854902,
    0.729412,
    0.454902,
    0.627451,
    0.870588,
    0.388235,
    0.235294,
    0.45098,
    1.0,
    0.854902,
    0.560784,
    0.466667,
    0.721569,
    0.0,
    0.25098,
    0.184314,
    0.113725,
    0.345098,
    0.529412,
    0.34902,
    0.176471,
    0.0,
    0.129412,
    0.960784,
    0.631373,
    0.831373,
    0.854902,
    0.0,
    0.666667,
    0.462745,
    0.160784,
    0.286275,
    0.741176,
    0.898039,
    0.0,
    0.764706,
    0.760784,
    0.364706,
  ],
  NanColor: [0.75, 0.75, 0.75],
})
CategoricalColors.set('glasbey_warm', {
  IndexedColors: [
    0.843137,
    0.0,
    0.0,
    1.0,
    0.384314,
    0.972549,
    0.67451,
    0.615686,
    0.0,
    0.454902,
    0.0,
    0.443137,
    0.317647,
    0.286275,
    0.0,
    1.0,
    0.603922,
    0.537255,
    0.568627,
    0.443137,
    0.541176,
    1.0,
    0.945098,
    0.439216,
    0.815686,
    0.0,
    0.505882,
    0.509804,
    0.227451,
    0.196078,
    1.0,
    0.760784,
    0.956863,
    0.729412,
    0.423529,
    0.188235,
    0.776471,
    0.74902,
    0.572549,
    1.0,
    0.607843,
    0.0,
    1.0,
    0.301961,
    0.419608,
    0.470588,
    0.45098,
    0.298039,
    0.835294,
    0.545098,
    0.701961,
    0.392157,
    0.27451,
    0.368627,
    1.0,
    0.352941,
    0.0,
    0.627451,
    0.25098,
    0.607843,
    0.713725,
    0.345098,
    0.388235,
    0.576471,
    0.0,
    0.301961,
    0.52549,
    0.309804,
    0.003922,
    0.729412,
    0.54902,
    0.498039,
    0.603922,
    0.0,
    0.0,
    1.0,
    0.8,
    0.729412,
    0.87451,
    0.0,
    0.811765,
    0.894118,
    0.752941,
    0.0,
    1.0,
    0.27451,
    0.686275,
    0.619608,
    0.596078,
    0.388235,
    0.592157,
    0.458824,
    0.0,
    0.976471,
    0.94902,
    0.756863,
    1.0,
    0.776471,
    0.443137,
    0.74902,
    0.011765,
    0.25098,
    0.682353,
    0.25098,
    0.015686,
    0.541176,
    0.376471,
    0.341176,
    0.768627,
    0.364706,
    0.607843,
    0.835294,
    0.615686,
    0.368627,
    0.866667,
    0.447059,
    0.380392,
    0.564706,
    0.266667,
    0.4,
    0.403922,
    0.309804,
    0.192157,
    0.882353,
    0.690196,
    0.745098,
    0.780392,
    0.521569,
    0.0,
    1.0,
    0.494118,
    0.615686,
    1.0,
    0.588235,
    0.901961,
    0.972549,
    0.52549,
    0.270588,
    0.431373,
    0.388235,
    0.003922,
    0.843137,
    0.278431,
    0.258824,
    0.607843,
    0.0,
    0.490196,
    0.913725,
    0.0,
    0.380392,
    1.0,
    0.0,
    0.192157,
    0.756863,
    0.713725,
    0.337255,
    0.717647,
    0.466667,
    0.537255,
    0.619608,
    0.470588,
    0.341176,
    0.823529,
    0.45098,
    0.788235,
    0.862745,
    0.682353,
    0.588235,
    0.662745,
    0.231373,
    0.219608,
    0.486275,
    0.227451,
    0.462745,
    0.529412,
    0.207843,
    0.0,
    0.858824,
    0.396078,
    0.517647,
    0.827451,
    0.32549,
    0.0,
    0.533333,
    0.082353,
    0.156863,
    0.611765,
    0.341176,
    0.196078,
    0.682353,
    0.54902,
    0.65098,
    0.894118,
    0.858824,
    0.541176,
    0.698039,
    0.215686,
    0.388235,
    0.858824,
    0.541176,
    0.564706,
    0.74902,
    0.0,
    0.627451,
    0.870588,
    0.447059,
    0.0,
    1.0,
    0.662745,
    0.427451,
    1.0,
    0.623529,
    0.764706,
    0.447059,
    0.290196,
    0.298039,
    0.847059,
    0.635294,
    0.039216,
    0.501961,
    0.341176,
    0.478431,
    0.964706,
    0.466667,
    0.756863,
    0.713725,
    0.439216,
    0.384314,
    1.0,
    0.803922,
    0.866667,
    0.639216,
    0.368627,
    0.498039,
    0.478431,
    0.133333,
    0.34902,
    0.870588,
    0.65098,
    0.831373,
    1.0,
    0.376471,
    0.298039,
    0.560784,
    0.407843,
    0.176471,
    0.709804,
    0.533333,
    0.286275,
    0.686275,
    0.45098,
    0.654902,
    0.956863,
    0.87451,
    0.0,
    0.745098,
    0.313725,
    0.721569,
    1.0,
    0.184314,
    0.854902,
    0.823529,
    0.509804,
    0.317647,
    0.741176,
    0.345098,
    0.227451,
    0.945098,
    0.203922,
    0.003922,
    0.588235,
    0.301961,
    0.317647,
    0.917647,
    0.023529,
    0.670588,
    0.545098,
    0.513725,
    0.25098,
    0.890196,
    0.247059,
    0.529412,
    0.513725,
    0.180392,
    0.27451,
    0.690196,
    0.258824,
    0.52549,
    0.917647,
    0.819608,
    0.647059,
    0.721569,
    0.07451,
    0.105882,
    1.0,
    0.721569,
    0.172549,
    0.866667,
    0.011765,
    0.215686,
    0.647059,
    0.352941,
    0.0,
    0.733333,
    0.643137,
    0.486275,
    0.392157,
    0.372549,
    0.188235,
    0.486275,
    0.27451,
    0.141176,
    0.686275,
    0.003922,
    0.427451,
    0.733333,
    0.611765,
    0.254902,
    0.807843,
    0.254902,
    0.376471,
    0.411765,
    0.27451,
    0.0,
    1.0,
    0.486275,
    0.466667,
    0.972549,
    0.827451,
    0.333333,
    1.0,
    0.701961,
    0.690196,
    0.862745,
    0.584314,
    0.482353,
    0.784314,
    0.6,
    0.654902,
    0.627451,
    0.141176,
    0.262745,
    0.858824,
    0.717647,
    0.435294,
    0.607843,
    0.423529,
    0.454902,
    0.890196,
    0.552941,
    0.180392,
    0.894118,
    0.415686,
    0.211765,
    0.886275,
    0.34902,
    0.729412,
    0.992157,
    0.360784,
    0.576471,
    0.486275,
    0.380392,
    0.258824,
    0.529412,
    0.345098,
    0.403922,
    0.615686,
    0.364706,
    0.588235,
    0.580392,
    0.176471,
    0.105882,
    0.588235,
    0.537255,
    0.003922,
    0.694118,
    0.443137,
    0.007843,
    0.792157,
    0.239216,
    0.094118,
    0.458824,
    0.231373,
    0.34902,
    0.760784,
    0.698039,
    0.070588,
    0.635294,
    0.0,
    0.631373,
    0.886275,
    0.305882,
    0.862745,
    0.988235,
    0.752941,
    0.568627,
    0.756863,
    0.313725,
    0.482353,
    0.85098,
    0.443137,
    0.647059,
    0.870588,
    0.552941,
    0.827451,
    0.933333,
    0.662745,
    0.298039,
    0.8,
    0.239216,
    0.647059,
    0.894118,
    0.74902,
    0.858824,
    0.580392,
    0.160784,
    0.396078,
    0.662745,
    0.552941,
    0.415686,
    0.635294,
    0.0,
    0.141176,
    1.0,
    0.172549,
    0.486275,
    0.666667,
    0.529412,
    0.14902,
    0.886275,
    0.360784,
    0.392157,
    0.894118,
    0.631373,
    0.619608,
    0.490196,
    0.439216,
    0.168627,
    0.796078,
    0.086275,
    0.380392,
    0.470588,
    0.356863,
    0.105882,
    0.65098,
    0.360784,
    0.313725,
    1.0,
    0.454902,
    0.0,
    0.803922,
    0.454902,
    0.478431,
    1.0,
    0.945098,
    0.611765,
    0.839216,
    0.792157,
    0.34902,
    0.596078,
    0.282353,
    0.027451,
    0.929412,
    0.203922,
    0.313725,
    0.564706,
    0.286275,
    0.498039,
    0.756863,
    0.12549,
    0.74902,
    0.533333,
    0.109804,
    0.517647,
    0.988235,
    0.717647,
    0.839216,
    0.768627,
    0.192157,
    0.227451,
    0.592157,
    0.266667,
    0.176471,
    0.698039,
    0.666667,
    0.411765,
    0.662745,
    0.14902,
    0.0,
    0.976471,
    0.588235,
    0.635294,
    0.937255,
    0.52549,
    0.407843,
    0.87451,
    0.713725,
    0.270588,
    0.517647,
    0.305882,
    0.254902,
    0.619608,
    0.478431,
    0.215686,
    0.992157,
    0.0,
    0.592157,
    0.909804,
    0.321569,
    0.196078,
    0.772549,
    0.603922,
    0.737255,
    0.721569,
    0.501961,
    0.368627,
    0.788235,
    0.380392,
    0.34902,
    0.564706,
    0.513725,
    0.356863,
    0.72549,
    0.341176,
    0.086275,
    0.764706,
    0.517647,
    0.729412,
    0.8,
    0.505882,
    0.439216,
    0.784314,
    0.431373,
    0.294118,
    0.623529,
    0.588235,
    0.254902,
    0.698039,
    0.0,
    0.32549,
    0.784314,
    0.490196,
    0.180392,
    0.972549,
    0.678431,
    0.564706,
    1.0,
    0.858824,
    0.584314,
    1.0,
    0.0,
    0.996078,
    0.662745,
    0.411765,
    0.278431,
    1.0,
    0.376471,
    0.839216,
    0.956863,
    0.419608,
    0.498039,
    0.768627,
    0.580392,
    0.431373,
    0.509804,
    0.262745,
    0.313725,
    0.647059,
    0.301961,
    0.407843,
    0.670588,
    0.486275,
    0.482353,
    0.890196,
    0.603922,
    0.694118,
    0.811765,
    0.780392,
    0.486275,
    0.529412,
    0.396078,
    0.0,
    1.0,
    0.6,
    0.258824,
    0.419608,
    0.164706,
    0.403922,
    0.890196,
    0.505882,
    0.627451,
    0.333333,
    0.313725,
    0.160784,
    0.941176,
    0.564706,
    0.780392,
    0.960784,
    0.490196,
    0.878431,
    0.917647,
    0.588235,
    0.380392,
    0.898039,
    0.168627,
    0.156863,
    0.741176,
    0.298039,
    0.282353,
    0.52549,
    0.101961,
    0.0,
    0.52549,
    0.341176,
    0.168627,
    0.580392,
    0.223529,
    0.254902,
    0.756863,
    0.478431,
    0.631373,
    1.0,
    0.447059,
    0.254902,
    0.760784,
    0.403922,
    0.537255,
    0.905882,
    0.286275,
    0.443137,
    0.898039,
    0.678431,
    0.478431,
    0.4,
    0.32549,
    0.0,
    0.619608,
    0.2,
    0.509804,
    0.615686,
    0.431373,
    0.380392,
    0.466667,
    0.247059,
    0.0,
    1.0,
    0.262745,
    0.282353,
    1.0,
    0.835294,
    0.960784,
    0.992157,
    0.67451,
    0.894118,
    0.501961,
    0.454902,
    0.0,
    0.788235,
    0.392157,
    0.003922,
    0.658824,
    0.478431,
    0.588235,
    0.905882,
    0.352941,
    0.615686,
    0.733333,
    0.572549,
    0.003922,
    0.756863,
    0.533333,
    0.560784,
    0.572549,
    0.4,
    0.282353,
    0.835294,
    0.607843,
    0.227451,
    0.517647,
    0.0,
    0.419608,
    1.0,
    0.807843,
    0.0,
    0.690196,
    0.262745,
    0.32549,
    0.796078,
    0.239216,
    0.541176,
    1.0,
    0.533333,
    0.003922,
    0.866667,
    0.741176,
    0.580392,
    0.8,
    0.611765,
    0.564706,
    0.466667,
    0.298039,
    0.384314,
    0.709804,
    0.266667,
    0.168627,
    0.596078,
    0.207843,
    0.337255,
    0.698039,
    0.32549,
    0.607843,
    0.611765,
    0.4,
    0.007843,
    0.752941,
    0.4,
    0.694118,
    0.623529,
    0.360784,
    0.403922,
    0.737255,
    0.603922,
    0.364706,
    0.529412,
    0.0,
    0.054902,
    0.894118,
    0.0,
    0.478431,
    0.690196,
    0.415686,
    0.443137,
    0.498039,
    0.0,
    0.301961,
    0.752941,
    0.137255,
    0.0,
    0.729412,
    0.12549,
    0.521569,
    0.905882,
    0.780392,
    0.419608,
    0.52549,
    0.0,
    0.211765,
    0.643137,
    0.407843,
    0.164706,
    1.0,
    0.015686,
    0.364706,
    0.866667,
    0.490196,
    0.745098,
    0.678431,
    0.466667,
    0.262745,
    0.901961,
    0.482353,
    0.490196,
    0.870588,
    0.270588,
    0.631373,
    0.803922,
    0.34902,
    0.423529,
  ],
  NanColor: [0.75, 0.75, 0.75],
})
CategoricalColors.set('glasbey_cool', {
  IndexedColors: [
    0.05098,
    0.415686,
    1.0,
    0.035294,
    0.584314,
    0.301961,
    0.0,
    0.792157,
    0.898039,
    0.290196,
    1.0,
    0.568627,
    0.0,
    0.345098,
    0.376471,
    0.678431,
    0.643137,
    1.0,
    0.458824,
    0.447059,
    0.560784,
    0.298039,
    0.0,
    0.745098,
    0.607843,
    0.733333,
    0.623529,
    0.584314,
    1.0,
    0.94902,
    0.258824,
    0.560784,
    0.568627,
    0.0,
    0.270588,
    0.12549,
    0.737255,
    0.858824,
    1.0,
    0.254902,
    0.643137,
    1.0,
    0.305882,
    0.419608,
    0.32549,
    0.572549,
    0.65098,
    0.729412,
    0.027451,
    0.313725,
    0.588235,
    0.0,
    0.784314,
    0.494118,
    0.52549,
    0.435294,
    0.980392,
    0.003922,
    0.478431,
    0.666667,
    0.380392,
    0.329412,
    0.682353,
    0.443137,
    0.572549,
    0.462745,
    0.780392,
    0.913725,
    0.792157,
    0.294118,
    0.32549,
    0.419608,
    0.0,
    0.858824,
    0.760784,
    0.113725,
    0.0,
    1.0,
    0.603922,
    0.803922,
    0.815686,
    0.478431,
    0.54902,
    0.776471,
    0.329412,
    0.690196,
    0.603922,
    0.0,
    0.639216,
    0.784314,
    0.313725,
    0.431373,
    0.466667,
    0.745098,
    0.729412,
    0.862745,
    0.482353,
    0.768627,
    0.996078,
    0.0,
    0.509804,
    0.4,
    0.513725,
    0.870588,
    0.662745,
    0.356863,
    0.141176,
    1.0,
    0.007843,
    0.396078,
    0.196078,
    0.0,
    0.945098,
    1.0,
    0.823529,
    0.964706,
    0.996078,
    0.0,
    1.0,
    0.788235,
    0.439216,
    0.537255,
    0.611765,
    0.329412,
    0.443137,
    0.72549,
    0.180392,
    0.321569,
    0.270588,
    0.356863,
    0.517647,
    0.992157,
    0.407843,
    0.686275,
    0.72549,
    0.662745,
    1.0,
    0.737255,
    0.352941,
    0.662745,
    0.439216,
    0.890196,
    0.87451,
    1.0,
    0.172549,
    0.380392,
    0.501961,
    0.568627,
    0.556863,
    0.670588,
    0.556863,
    0.662745,
    0.886275,
    0.529412,
    0.866667,
    0.988235,
    0.015686,
    0.545098,
    0.866667,
    0.0,
    0.447059,
    0.439216,
    0.223529,
    0.341176,
    0.768627,
    0.380392,
    0.360784,
    0.94902,
    0.462745,
    0.607843,
    0.592157,
    0.0,
    0.619608,
    0.470588,
    0.34902,
    0.494118,
    0.454902,
    0.254902,
    0.262745,
    0.596078,
    0.686275,
    0.760784,
    1.0,
    0.478431,
    0.447059,
    0.733333,
    0.623529,
    0.756863,
    0.862745,
    0.541176,
    0.564706,
    0.980392,
    0.286275,
    0.360784,
    0.568627,
    0.490196,
    0.784314,
    0.698039,
    0.011765,
    0.72549,
    0.956863,
    0.34902,
    0.454902,
    0.580392,
    0.423529,
    0.615686,
    0.768627,
    0.627451,
    0.890196,
    0.811765,
    0.015686,
    0.403922,
    0.317647,
    0.0,
    0.756863,
    0.733333,
    0.309804,
    0.509804,
    0.356863,
    0.0,
    0.886275,
    0.466667,
    0.0,
    0.498039,
    0.568627,
    0.47451,
    0.760784,
    0.545098,
    0.647059,
    0.631373,
    0.811765,
    0.0,
    0.490196,
    0.262745,
    0.796078,
    1.0,
    0.933333,
    0.552941,
    0.701961,
    0.686275,
    0.270588,
    0.545098,
    0.666667,
    0.0,
    0.968627,
    0.894118,
    0.0,
    0.654902,
    0.662745,
    0.0,
    0.403922,
    0.694118,
    0.376471,
    0.843137,
    0.854902,
    0.647059,
    0.909804,
    0.937255,
    0.003922,
    0.866667,
    0.639216,
    0.227451,
    0.380392,
    0.372549,
    0.380392,
    0.368627,
    0.517647,
    0.482353,
    0.662745,
    0.54902,
    0.454902,
    0.709804,
    0.839216,
    0.0,
    0.270588,
    1.0,
    0.313725,
    0.294118,
    0.494118,
    0.239216,
    0.192157,
    0.803922,
    0.0,
    0.776471,
    0.623529,
    0.658824,
    0.831373,
    0.701961,
    0.333333,
    0.576471,
    0.505882,
    0.576471,
    0.984314,
    0.827451,
    0.341176,
    0.521569,
    0.733333,
    0.231373,
    0.341176,
    0.392157,
    0.380392,
    0.6,
    0.658824,
    0.807843,
    0.8,
    1.0,
    0.588235,
    0.560784,
    0.835294,
    0.0,
    0.705882,
    0.368627,
    0.729412,
    0.843137,
    0.894118,
    0.345098,
    0.227451,
    0.752941,
    0.0,
    0.705882,
    0.501961,
    0.0,
    0.239216,
    0.705882,
    0.0,
    0.337255,
    0.215686,
    0.47451,
    0.635294,
    1.0,
    0.415686,
    0.454902,
    0.858824,
    0.415686,
    0.905882,
    0.768627,
    0.494118,
    0.784314,
    0.862745,
    0.447059,
    0.498039,
    0.647059,
    0.0,
    0.419608,
    0.486275,
    0.341176,
    0.396078,
    0.478431,
    0.431373,
    0.964706,
    0.690196,
    0.113725,
    0.462745,
    0.815686,
    0.364706,
    0.505882,
    0.533333,
    0.235294,
    0.443137,
    0.388235,
    0.0,
    0.709804,
    0.788235,
    0.368627,
    0.572549,
    0.878431,
    0.4,
    0.427451,
    0.619608,
    0.227451,
    0.611765,
    0.847059,
    0.211765,
    0.368627,
    0.25098,
    0.317647,
    0.819608,
    1.0,
    0.443137,
    0.760784,
    0.752941,
    0.0,
    0.564706,
    0.501961,
    0.419608,
    0.686275,
    0.92549,
    0.309804,
    0.588235,
    0.415686,
    0.752941,
    0.905882,
    0.886275,
    0.639216,
    0.694118,
    0.831373,
    0.411765,
    0.278431,
    0.87451,
    0.0,
    0.588235,
    0.662745,
    0.443137,
    0.380392,
    0.803922,
    0.839216,
    0.913725,
    1.0,
    0.54902,
    0.603922,
    0.756863,
    0.729412,
    0.705882,
    0.94902,
    0.74902,
    0.796078,
    0.894118,
    0.184314,
    0.443137,
    0.305882,
    0.556863,
    0.713725,
    0.764706,
    0.498039,
    0.909804,
    0.87451,
    0.227451,
    0.447059,
    0.54902,
    0.529412,
    0.509804,
    0.713725,
    0.403922,
    0.835294,
    0.533333,
    0.043137,
    0.505882,
    1.0,
    0.513725,
    0.501961,
    0.854902,
    0.14902,
    0.635294,
    0.568627,
    0.631373,
    0.784314,
    0.733333,
    0.27451,
    0.294118,
    1.0,
    0.243137,
    0.419608,
    0.603922,
    0.780392,
    1.0,
    0.839216,
    0.223529,
    0.498039,
    0.482353,
    0.658824,
    0.921569,
    0.74902,
    0.003922,
    0.345098,
    0.313725,
    0.184314,
    0.003922,
    0.827451,
    0.501961,
    0.972549,
    1.0,
    0.607843,
    0.823529,
    0.996078,
    0.733333,
    0.913725,
    1.0,
    0.196078,
    0.329412,
    0.498039,
    0.0,
    0.87451,
    0.992157,
    0.501961,
    0.639216,
    0.67451,
    0.062745,
    0.556863,
    0.376471,
    0.341176,
    0.380392,
    0.768627,
    0.0,
    0.647059,
    0.4,
    0.317647,
    0.435294,
    1.0,
    0.305882,
    0.501961,
    0.843137,
    0.360784,
    0.647059,
    0.631373,
    0.568627,
    0.729412,
    1.0,
    0.376471,
    0.713725,
    0.54902,
    0.031373,
    0.92549,
    0.603922,
    0.380392,
    0.8,
    0.623529,
    0.333333,
    0.643137,
    0.509804,
    0.152941,
    0.290196,
    0.188235,
    0.733333,
    1.0,
    1.0,
    0.360784,
    0.654902,
    0.760784,
    0.0,
    0.545098,
    0.752941,
    0.596078,
    0.666667,
    1.0,
    0.486275,
    0.6,
    0.686275,
    0.423529,
    0.486275,
    0.745098,
    0.156863,
    0.576471,
    0.996078,
    0.0,
    0.392157,
    0.839216,
    0.007843,
    0.345098,
    0.439216,
    0.435294,
    0.552941,
    0.698039,
    0.0,
    0.301961,
    0.784314,
    0.215686,
    0.321569,
    0.623529,
    0.52549,
    0.6,
    0.882353,
    0.552941,
    0.717647,
    0.890196,
    0.0,
    0.368627,
    0.576471,
    0.4,
    0.545098,
    0.529412,
    0.341176,
    0.0,
    0.890196,
    0.505882,
    0.831373,
    0.792157,
    0.478431,
    0.894118,
    0.945098,
    0.513725,
    0.717647,
    0.635294,
    0.329412,
    0.756863,
    0.682353,
    0.627451,
    0.823529,
    0.909804,
    0.247059,
    0.152941,
    1.0,
    0.482353,
    0.352941,
    0.984314,
    0.321569,
    0.494118,
    0.580392,
    0.25098,
    0.392157,
    0.682353,
    0.403922,
    1.0,
    0.878431,
    0.47451,
    0.498039,
    1.0,
    0.270588,
    0.423529,
    0.847059,
    0.27451,
    0.52549,
    0.431373,
    0.552941,
    0.784314,
    0.643137,
    0.243137,
    0.384314,
    0.32549,
    0.392157,
    0.513725,
    0.419608,
    0.345098,
    0.733333,
    0.462745,
    0.207843,
    0.454902,
    0.490196,
    0.321569,
    0.752941,
    0.8,
    0.45098,
    0.623529,
    0.862745,
    0.301961,
    0.305882,
    0.701961,
    0.247059,
    0.470588,
    0.698039,
    0.423529,
    0.392157,
    0.67451,
    0.031373,
    0.698039,
    0.647059,
    0.435294,
    0.52549,
    0.862745,
    0.52549,
    0.654902,
    0.796078,
    0.219608,
    0.396078,
    0.435294,
    0.27451,
    0.368627,
    0.494118,
    0.458824,
    0.905882,
    0.588235,
    0.419608,
    0.478431,
    0.560784,
    0.309804,
    0.666667,
    0.854902,
    0.266667,
    0.729412,
    0.862745,
    0.352941,
    0.345098,
    0.576471,
    0.443137,
    0.568627,
    0.596078,
    0.643137,
    0.666667,
    0.905882,
    0.682353,
    0.788235,
    0.945098,
    0.0,
    0.898039,
    0.866667,
    0.509804,
    0.501961,
    0.623529,
    0.0,
    0.423529,
    0.588235,
    0.662745,
    0.776471,
    0.823529,
    0.435294,
    0.701961,
    0.670588,
    0.501961,
    0.54902,
    0.654902,
    0.682353,
    0.839216,
    0.815686,
    0.294118,
    0.196078,
    0.639216,
    0.807843,
    0.847059,
    0.984314,
    0.721569,
    0.941176,
    0.843137,
    0.435294,
    0.611765,
    0.537255,
    0.329412,
    0.286275,
    0.596078,
    0.054902,
    0.388235,
    0.384314,
    0.254902,
    0.305882,
    0.521569,
    0.227451,
    0.639216,
    0.705882,
    0.533333,
    0.847059,
    0.72549,
    0.305882,
    0.470588,
    0.380392,
    0.572549,
    0.501961,
    1.0,
    0.607843,
    0.615686,
    0.72549,
    0.145098,
    1.0,
    0.996078,
    0.007843,
    0.823529,
    0.796078,
    0.345098,
    0.392157,
    0.65098,
    0.682353,
    0.670588,
    0.788235,
    0.662745,
    0.937255,
    0.901961,
    0.423529,
    0.623529,
    0.466667,
    0.32549,
    0.313725,
    0.847059,
    0.0,
    0.529412,
    0.545098,
    0.435294,
    0.572549,
    1.0,
    0.25098,
    0.529412,
    0.588235,
  ],
  NanColor: [0.75, 0.75, 0.75],
})
CategoricalColors.set('glasbey_light', {
  IndexedColors: [
    0.843137,
    0.0,
    0.0,
    0.007843,
    0.533333,
    0.0,
    0.713725,
    0.0,
    1.0,
    0.023529,
    0.67451,
    0.776471,
    0.596078,
    1.0,
    0.0,
    1.0,
    0.647059,
    0.188235,
    1.0,
    0.560784,
    0.784314,
    0.47451,
    0.321569,
    0.372549,
    0.0,
    0.996078,
    0.811765,
    0.690196,
    0.647059,
    1.0,
    0.580392,
    0.678431,
    0.517647,
    0.603922,
    0.411765,
    0.0,
    0.215686,
    0.415686,
    0.384314,
    0.827451,
    0.0,
    0.54902,
    0.996078,
    0.960784,
    0.564706,
    0.784314,
    0.435294,
    0.4,
    0.619608,
    0.890196,
    1.0,
    0.0,
    0.788235,
    0.27451,
    0.662745,
    0.466667,
    0.678431,
    0.721569,
    0.733333,
    0.007843,
    0.956863,
    0.752941,
    0.694118,
    1.0,
    0.156863,
    0.992157,
    0.952941,
    0.807843,
    1.0,
    0.0,
    0.623529,
    0.490196,
    1.0,
    0.384314,
    0.0,
    0.337255,
    0.396078,
    0.168627,
    0.588235,
    0.247059,
    0.121569,
    0.568627,
    0.192157,
    0.560784,
    1.0,
    0.203922,
    0.396078,
    0.627451,
    0.894118,
    0.572549,
    0.552941,
    0.607843,
    0.698039,
    0.509804,
    0.568627,
    0.14902,
    0.682353,
    0.035294,
    0.247059,
    0.470588,
    0.780392,
    0.733333,
    0.737255,
    0.572549,
    0.345098,
    0.898039,
    0.560784,
    1.0,
    0.447059,
    0.72549,
    1.0,
    0.776471,
    0.647059,
    0.756863,
    1.0,
    0.568627,
    0.443137,
    0.827451,
    0.764706,
    0.490196,
    0.741176,
    0.933333,
    0.858824,
    0.419608,
    0.521569,
    0.407843,
    0.572549,
    0.431373,
    0.337255,
    0.976471,
    1.0,
    0.0,
    0.729412,
    0.760784,
    0.878431,
    0.678431,
    0.341176,
    0.490196,
    1.0,
    0.807843,
    0.011765,
    1.0,
    0.290196,
    0.694118,
    0.760784,
    0.341176,
    0.011765,
    0.364706,
    0.54902,
    0.564706,
    0.760784,
    0.266667,
    0.741176,
    0.0,
    0.458824,
    0.25098,
    0.729412,
    0.435294,
    0.996078,
    0.0,
    0.831373,
    0.580392,
    0.0,
    1.0,
    0.462745,
    0.286275,
    0.635294,
    0.317647,
    0.8,
    0.596078,
    0.568627,
    0.0,
    0.921569,
    0.933333,
    0.858824,
    0.494118,
    0.003922,
    0.972549,
    0.458824,
    0.541176,
    0.72549,
    0.588235,
    0.0,
    0.788235,
    0.258824,
    0.282353,
    0.0,
    0.815686,
    0.980392,
    0.462745,
    0.345098,
    0.152941,
    0.521569,
    0.831373,
    0.003922,
    0.92549,
    1.0,
    0.831373,
    0.654902,
    0.482353,
    0.533333,
    0.862745,
    0.447059,
    0.788235,
    0.796078,
    0.890196,
    0.341176,
    0.545098,
    0.74902,
    0.368627,
    0.631373,
    0.129412,
    0.419608,
    0.52549,
    0.356863,
    0.537255,
    0.541176,
    0.733333,
    0.815686,
    1.0,
    0.729412,
    0.843137,
    0.717647,
    0.811765,
    0.670588,
    0.592157,
    0.254902,
    0.305882,
    0.407843,
    0.670588,
    0.0,
    0.996078,
    0.882353,
    0.698039,
    1.0,
    0.215686,
    0.160784,
    0.501961,
    0.478431,
    0.243137,
    0.843137,
    0.909804,
    1.0,
    0.654902,
    0.584314,
    0.776471,
    0.494118,
    0.647059,
    0.607843,
    0.819608,
    0.513725,
    0.643137,
    0.329412,
    0.509804,
    0.231373,
    0.901961,
    0.662745,
    0.45098,
    0.611765,
    1.0,
    1.0,
    0.854902,
    0.333333,
    0.505882,
    0.019608,
    0.705882,
    0.666667,
    1.0,
    0.670588,
    0.964706,
    0.819608,
    0.686275,
    0.937255,
    0.854902,
    0.007843,
    0.368627,
    0.67451,
    0.105882,
    0.07451,
    0.376471,
    0.701961,
    0.521569,
    0.835294,
    0.258824,
    0.992157,
    0.678431,
    0.670588,
    0.34902,
    0.984314,
    0.615686,
    0.654902,
    0.701961,
    0.447059,
    0.235294,
    0.94902,
    0.415686,
    0.32549,
    0.682353,
    0.823529,
    0.835294,
    0.607843,
    1.0,
    0.768627,
    0.858824,
    0.701961,
    0.2,
    0.92549,
    0.007843,
    0.764706,
    0.6,
    0.0,
    0.772549,
    0.815686,
    1.0,
    0.619608,
    0.65098,
    0.352941,
    0.290196,
    0.235294,
    0.427451,
    0.003922,
    0.0,
    0.521569,
    0.478431,
    0.584314,
    0.572549,
    0.403922,
    0.541176,
    0.862745,
    0.701961,
    0.427451,
    0.454902,
    0.0,
    0.666667,
    0.368627,
    0.792157,
    0.027451,
    0.941176,
    0.0,
    0.505882,
    0.309804,
    0.243137,
    0.85098,
    0.505882,
    0.321569,
    1.0,
    0.784314,
    0.388235,
    0.721569,
    0.0,
    0.623529,
    0.6,
    0.67451,
    0.870588,
    0.568627,
    0.309804,
    0.0,
    0.54902,
    0.270588,
    0.439216,
    0.309804,
    0.431373,
    0.321569,
    1.0,
    0.533333,
    0.203922,
    0.780392,
    0.560784,
    0.807843,
    0.835294,
    0.886275,
    0.619608,
    0.698039,
    0.509804,
    0.427451,
    0.615686,
    0.984314,
    0.458824,
    0.341176,
    0.870588,
    0.466667,
    0.980392,
    0.0,
    0.529412,
    0.635294,
    0.803922,
    1.0,
    0.078431,
    0.796078,
    0.823529,
    0.066667,
    0.560784,
    0.333333,
    0.823529,
    0.329412,
    0.647059,
    0.0,
    0.87451,
    0.764706,
    0.639216,
    0.517647,
    0.184314,
    0.466667,
    0.592157,
    0.356863,
    0.733333,
    0.670588,
    0.501961,
    0.439216,
    0.639216,
    0.690196,
    0.839216,
    0.984314,
    1.0,
    0.909804,
    0.007843,
    0.227451,
    0.847059,
    0.278431,
    0.133333,
    1.0,
    0.513725,
    0.929412,
    0.717647,
    0.219608,
    0.388235,
    0.717647,
    0.807843,
    0.447059,
    0.596078,
    0.384314,
    0.419608,
    0.541176,
    0.454902,
    0.568627,
    0.0,
    0.639216,
    0.090196,
    0.0,
    0.960784,
    0.631373,
    0.752941,
    0.568627,
    0.94902,
    0.541176,
    0.894118,
    0.847059,
    0.643137,
    0.305882,
    0.584314,
    0.431373,
    0.368627,
    0.0,
    0.54902,
    0.776471,
    0.556863,
    0.584314,
    0.666667,
    0.168627,
    0.780392,
    0.45098,
    0.866667,
    0.705882,
    0.231373,
    0.003922,
    0.843137,
    0.603922,
    0.215686,
    0.87451,
    0.678431,
    0.717647,
    0.0,
    0.607843,
    0.627451,
    0.352941,
    0.564706,
    0.0,
    0.592157,
    0.737255,
    0.658824,
    0.678431,
    0.552941,
    0.658824,
    0.854902,
    0.835294,
    1.0,
    0.333333,
    0.490196,
    0.447059,
    0.0,
    0.733333,
    0.411765,
    1.0,
    0.768627,
    0.556863,
    0.72549,
    0.0,
    0.831373,
    0.878431,
    0.815686,
    0.356863,
    0.388235,
    0.603922,
    0.482353,
    0.752941,
    0.933333,
    0.737255,
    0.760784,
    0.745098,
    0.996078,
    0.501961,
    0.827451,
    0.870588,
    0.886275,
    0.521569,
    0.494118,
    0.980392,
    0.921569,
    0.305882,
    0.752941,
    0.427451,
    0.513725,
    0.796078,
    1.0,
    0.313725,
    0.941176,
    0.447059,
    0.666667,
    0.929412,
    0.407843,
    1.0,
    0.6,
    0.278431,
    0.682353,
    0.427451,
    0.411765,
    0.262745,
    0.890196,
    0.341176,
    0.380392,
    0.866667,
    0.4,
    0.176471,
    0.615686,
    0.858824,
    0.364706,
    0.886275,
    0.615686,
    0.815686,
    0.72549,
    0.462745,
    0.0,
    0.776471,
    0.0,
    0.176471,
    0.87451,
    0.741176,
    0.854902,
    0.352941,
    0.713725,
    0.87451,
    1.0,
    0.352941,
    0.854902,
    0.219608,
    0.760784,
    0.631373,
    0.619608,
    0.415686,
    0.54902,
    0.678431,
    0.666667,
    0.784314,
    0.588235,
    0.388235,
    0.188235,
    0.713725,
    0.337255,
    0.384314,
    0.172549,
    0.498039,
    0.376471,
    0.698039,
    0.894118,
    0.0,
    0.933333,
    0.647059,
    0.568627,
    0.584314,
    0.996078,
    0.886275,
    1.0,
    0.333333,
    0.556863,
    0.745098,
    0.435294,
    0.631373,
    0.666667,
    0.235294,
    0.215686,
    0.85098,
    0.811765,
    0.0,
    0.670588,
    0.501961,
    0.807843,
    0.627451,
    0.501961,
    0.321569,
    0.882353,
    0.0,
    0.909804,
    0.764706,
    0.360784,
    0.243137,
    0.709804,
    0.227451,
    0.521569,
    0.54902,
    0.470588,
    0.0,
    0.858824,
    0.737255,
    0.588235,
    0.321569,
    0.619608,
    0.576471,
    0.690196,
    0.741176,
    0.513725,
    0.572549,
    0.713725,
    0.717647,
    0.654902,
    0.329412,
    0.141176,
    1.0,
    0.835294,
    0.937255,
    0.47451,
    0.682353,
    0.419608,
    0.368627,
    0.709804,
    0.298039,
    0.501961,
    0.984314,
    0.607843,
    0.282353,
    1.0,
    0.937255,
    0.596078,
    0.588235,
    0.282353,
    0.580392,
    0.533333,
    0.654902,
    0.196078,
    0.835294,
    0.0,
    0.431373,
    0.917647,
    0.337255,
    0.717647,
    0.831373,
    0.921569,
    0.439216,
    0.333333,
    0.439216,
    0.94902,
    0.858824,
    0.545098,
    0.670588,
    0.835294,
    0.760784,
    0.498039,
    0.803922,
    0.94902,
    0.541176,
    0.733333,
    0.0,
    0.396078,
    0.717647,
    0.733333,
    1.0,
    0.713725,
    0.0,
    0.764706,
    0.509804,
    0.52549,
    0.796078,
    0.670588,
    0.372549,
    0.396078,
    0.470588,
    0.282353,
    0.34902,
    0.890196,
    1.0,
    0.87451,
    0.305882,
    0.803922,
    0.917647,
    1.0,
    0.47451,
    0.741176,
    0.4,
    0.72549,
    0.768627,
    0.584314,
    0.65098,
    0.392157,
    0.776471,
    0.454902,
    0.819608,
    0.584314,
    0.439216,
    0.439216,
    0.811765,
    0.309804,
    0.670588,
    0.431373,
    0.4,
    0.615686,
    0.380392,
    0.647059,
    0.0,
    0.721569,
    0.0,
    0.890196,
    0.6,
    0.705882,
    0.741176,
    0.0,
    0.423529,
    0.701961,
    0.913725,
    0.941176,
    0.807843,
    0.74902,
    0.894118,
    0.466667,
    0.639216,
    0.262745,
    0.521569,
    0.384314,
    0.470588,
    0.341176,
    0.560784,
    0.360784,
    0.619608,
    0.690196,
    0.772549,
    0.909804,
    0.188235,
    0.627451,
    0.145098,
    0.486275,
    0.164706,
    0.509804,
    0.407843,
    0.137255,
    0.752941,
    0.737255,
    0.305882,
    0.866667,
    0.827451,
    0.647059,
  ],
  NanColor: [0.75, 0.75, 0.75],
})
CategoricalColors.set('glasbey_dark', {
  IndexedColors: [
    0.843137,
    0.0,
    0.0,
    0.54902,
    0.235294,
    1.0,
    0.007843,
    0.533333,
    0.0,
    0.0,
    0.67451,
    0.780392,
    0.905882,
    0.647059,
    0.0,
    1.0,
    0.498039,
    0.819608,
    0.423529,
    0.0,
    0.309804,
    0.345098,
    0.231373,
    0.0,
    0.0,
    0.341176,
    0.34902,
    0.082353,
    0.882353,
    0.552941,
    0.0,
    0.0,
    0.866667,
    0.635294,
    0.462745,
    0.415686,
    0.737255,
    0.717647,
    1.0,
    0.752941,
    0.015686,
    0.72549,
    0.392157,
    0.329412,
    0.45098,
    0.47451,
    0.0,
    0.0,
    0.027451,
    0.454902,
    0.847059,
    0.45098,
    0.607843,
    0.490196,
    1.0,
    0.470588,
    0.321569,
    0.0,
    0.294118,
    0.0,
    0.560784,
    0.482353,
    0.003922,
    0.952941,
    0.0,
    0.482353,
    0.560784,
    0.729412,
    0.0,
    0.65098,
    0.482353,
    0.721569,
    0.352941,
    0.007843,
    0.639216,
    0.890196,
    0.686275,
    0.686275,
    0.627451,
    0.227451,
    0.321569,
    0.635294,
    0.784314,
    0.784314,
    0.619608,
    0.294118,
    0.0,
    0.329412,
    0.403922,
    0.270588,
    0.733333,
    0.764706,
    0.537255,
    0.372549,
    0.482353,
    0.533333,
    0.376471,
    0.219608,
    0.235294,
    0.513725,
    0.533333,
    1.0,
    0.223529,
    0.0,
    0.0,
    0.890196,
    0.32549,
    1.0,
    0.188235,
    0.32549,
    0.509804,
    0.498039,
    0.792157,
    1.0,
    0.772549,
    0.4,
    0.560784,
    0.0,
    0.505882,
    0.415686,
    0.572549,
    0.619608,
    0.717647,
    0.8,
    0.454902,
    0.027451,
    0.498039,
    0.168627,
    0.556863,
    0.0,
    0.745098,
    0.643137,
    0.176471,
    0.694118,
    0.321569,
    0.305882,
    0.2,
    1.0,
    0.0,
    0.898039,
    0.0,
    1.0,
    0.0,
    0.807843,
    0.784314,
    0.345098,
    0.282353,
    0.898039,
    0.611765,
    1.0,
    0.113725,
    0.631373,
    1.0,
    0.431373,
    0.439216,
    0.670588,
    0.784314,
    0.603922,
    0.411765,
    0.470588,
    0.341176,
    0.231373,
    0.015686,
    0.854902,
    0.901961,
    0.756863,
    0.639216,
    0.768627,
    1.0,
    0.415686,
    0.541176,
    0.733333,
    0.0,
    0.996078,
    0.572549,
    0.32549,
    0.501961,
    0.623529,
    0.007843,
    0.454902,
    0.580392,
    0.631373,
    0.313725,
    0.215686,
    0.266667,
    0.145098,
    0.686275,
    0.427451,
    1.0,
    0.34902,
    0.427451,
    0.0,
    1.0,
    0.192157,
    0.278431,
    0.513725,
    0.501961,
    0.341176,
    0.0,
    0.427451,
    0.180392,
    0.537255,
    0.337255,
    0.686275,
    0.352941,
    0.290196,
    0.639216,
    0.466667,
    0.207843,
    0.086275,
    0.52549,
    0.764706,
    0.603922,
    0.372549,
    0.066667,
    0.137255,
    0.835294,
    0.521569,
    0.505882,
    0.643137,
    0.160784,
    0.094118,
    0.0,
    0.533333,
    0.694118,
    0.796078,
    0.0,
    0.266667,
    1.0,
    0.627451,
    0.337255,
    0.921569,
    0.305882,
    0.0,
    0.423529,
    0.592157,
    0.0,
    0.32549,
    0.52549,
    0.286275,
    0.458824,
    0.352941,
    0.0,
    0.784314,
    0.768627,
    0.25098,
    0.572549,
    0.827451,
    0.439216,
    0.294118,
    0.596078,
    0.580392,
    0.301961,
    0.137255,
    0.05098,
    0.380392,
    0.203922,
    0.360784,
    0.517647,
    0.0,
    0.811765,
    0.545098,
    0.0,
    0.192157,
    0.623529,
    0.431373,
    0.196078,
    0.67451,
    0.517647,
    0.6,
    0.776471,
    0.192157,
    0.537255,
    0.007843,
    0.329412,
    0.219608,
    0.031373,
    0.419608,
    0.517647,
    0.529412,
    0.658824,
    0.92549,
    0.392157,
    0.4,
    0.937255,
    0.768627,
    0.364706,
    0.729412,
    0.003922,
    0.623529,
    0.439216,
    0.505882,
    0.317647,
    0.34902,
    0.513725,
    0.435294,
    0.54902,
    0.701961,
    0.752941,
    0.854902,
    0.72549,
    0.568627,
    0.160784,
    1.0,
    0.592157,
    0.698039,
    0.654902,
    0.576471,
    0.882353,
    0.411765,
    0.552941,
    0.745098,
    0.298039,
    0.313725,
    0.003922,
    0.282353,
    0.007843,
    0.8,
    0.380392,
    0.0,
    0.431373,
    0.270588,
    0.415686,
    0.4,
    0.615686,
    0.341176,
    0.262745,
    0.482353,
    0.67451,
    0.709804,
    0.803922,
    0.517647,
    0.741176,
    0.0,
    0.329412,
    0.756863,
    0.482353,
    0.184314,
    0.309804,
    0.984314,
    0.486275,
    0.0,
    0.203922,
    0.752941,
    0.0,
    1.0,
    0.611765,
    0.533333,
    0.882353,
    0.717647,
    0.411765,
    0.32549,
    0.380392,
    0.466667,
    0.360784,
    0.227451,
    0.486275,
    0.929412,
    0.647059,
    0.854902,
    0.941176,
    0.32549,
    0.639216,
    0.364706,
    0.494118,
    0.411765,
    0.768627,
    0.466667,
    0.313725,
    0.819608,
    0.282353,
    0.407843,
    0.431373,
    0.0,
    0.921569,
    0.121569,
    0.203922,
    0.0,
    0.756863,
    0.254902,
    0.015686,
    0.427451,
    0.835294,
    0.760784,
    0.27451,
    0.439216,
    0.623529,
    0.635294,
    0.003922,
    0.768627,
    0.039216,
    0.509804,
    0.537255,
    0.686275,
    0.65098,
    0.003922,
    0.65098,
    0.360784,
    0.419608,
    0.996078,
    0.466667,
    1.0,
    0.545098,
    0.521569,
    0.682353,
    0.780392,
    0.498039,
    0.913725,
    0.603922,
    0.670588,
    0.521569,
    0.529412,
    0.423529,
    0.85098,
    0.003922,
    0.729412,
    0.968627,
    0.686275,
    0.368627,
    0.823529,
    0.34902,
    0.317647,
    0.168627,
    0.713725,
    0.0,
    0.372549,
    0.486275,
    0.713725,
    0.415686,
    0.286275,
    0.521569,
    1.0,
    0.0,
    0.760784,
    0.509804,
    0.823529,
    0.584314,
    0.670588,
    0.639216,
    0.294118,
    0.658824,
    0.890196,
    0.023529,
    0.890196,
    0.086275,
    0.639216,
    0.0,
    0.223529,
    0.180392,
    0.0,
    0.517647,
    0.188235,
    0.2,
    0.368627,
    0.584314,
    0.666667,
    0.352941,
    0.062745,
    0.0,
    0.482353,
    0.27451,
    0.0,
    0.435294,
    0.435294,
    0.192157,
    0.2,
    0.345098,
    0.14902,
    0.301961,
    0.376471,
    0.713725,
    0.635294,
    0.584314,
    0.392157,
    0.384314,
    0.25098,
    0.156863,
    0.270588,
    0.831373,
    0.345098,
    0.439216,
    0.666667,
    0.815686,
    0.180392,
    0.419608,
    0.305882,
    0.45098,
    0.686275,
    0.619608,
    0.992157,
    0.082353,
    0.0,
    0.847059,
    0.705882,
    0.572549,
    0.478431,
    0.537255,
    0.231373,
    0.490196,
    0.776471,
    0.85098,
    0.862745,
    0.568627,
    0.215686,
    0.92549,
    0.380392,
    0.368627,
    0.92549,
    0.372549,
    0.831373,
    0.898039,
    0.482353,
    0.654902,
    0.65098,
    0.423529,
    0.596078,
    0.0,
    0.592157,
    0.266667,
    0.729412,
    0.372549,
    0.133333,
    0.737255,
    0.678431,
    0.32549,
    0.533333,
    0.847059,
    0.188235,
    0.529412,
    0.207843,
    0.45098,
    0.682353,
    0.658824,
    0.823529,
    0.890196,
    0.54902,
    0.388235,
    0.819608,
    0.694118,
    0.92549,
    0.215686,
    0.258824,
    0.623529,
    0.227451,
    0.745098,
    0.760784,
    0.4,
    0.615686,
    0.301961,
    0.619608,
    0.011765,
    0.6,
    0.305882,
    0.305882,
    0.478431,
    0.482353,
    0.298039,
    0.52549,
    0.764706,
    0.207843,
    0.192157,
    0.552941,
    0.4,
    0.466667,
    0.666667,
    0.0,
    0.176471,
    0.498039,
    0.003922,
    0.458824,
    0.003922,
    0.509804,
    0.301961,
    0.45098,
    0.290196,
    0.403922,
    0.447059,
    0.466667,
    0.568627,
    0.431373,
    0.0,
    0.6,
    0.627451,
    0.729412,
    0.321569,
    0.882353,
    0.431373,
    0.192157,
    0.772549,
    0.415686,
    0.443137,
    0.427451,
    0.356863,
    0.588235,
    0.639216,
    0.235294,
    0.454902,
    0.196078,
    0.384314,
    0.0,
    0.533333,
    0.0,
    0.313725,
    0.2,
    0.345098,
    0.411765,
    0.729412,
    0.552941,
    0.486275,
    0.098039,
    0.34902,
    1.0,
    0.568627,
    0.572549,
    0.007843,
    0.172549,
    0.545098,
    0.835294,
    0.090196,
    0.14902,
    1.0,
    0.129412,
    0.827451,
    1.0,
    0.643137,
    0.564706,
    0.686275,
    0.545098,
    0.427451,
    0.309804,
    0.368627,
    0.129412,
    0.243137,
    0.862745,
    0.011765,
    0.701961,
    0.435294,
    0.341176,
    0.792157,
    0.396078,
    0.156863,
    0.129412,
    0.678431,
    0.466667,
    0.0,
    0.639216,
    0.74902,
    0.968627,
    0.709804,
    0.517647,
    0.27451,
    0.592157,
    0.219608,
    0.862745,
    0.698039,
    0.317647,
    0.580392,
    0.447059,
    0.258824,
    0.639216,
    0.529412,
    0.560784,
    0.819608,
    0.541176,
    0.439216,
    0.694118,
    0.419608,
    0.686275,
    0.211765,
    0.352941,
    0.478431,
    0.788235,
    0.780392,
    0.623529,
    1.0,
    0.337255,
    0.517647,
    0.101961,
    0.0,
    0.839216,
    0.654902,
    0.509804,
    0.278431,
    0.223529,
    0.066667,
    0.262745,
    0.113725,
    0.352941,
    0.670588,
    0.458824,
    0.568627,
    0.356863,
    0.003922,
    0.964706,
    0.270588,
    0.439216,
    1.0,
    0.592157,
    0.011765,
    0.882353,
    0.258824,
    0.192157,
    0.729412,
    0.572549,
    0.811765,
    0.203922,
    0.345098,
    0.301961,
    0.972549,
    0.501961,
    0.490196,
    0.568627,
    0.203922,
    0.0,
    0.701961,
    0.803922,
    0.0,
    0.180392,
    0.623529,
    0.827451,
    0.47451,
    0.545098,
    0.623529,
    0.317647,
    0.505882,
    0.490196,
    0.756863,
    0.211765,
    0.843137,
    0.92549,
    0.019608,
    0.32549,
    0.72549,
    0.67451,
    0.494118,
    0.282353,
    0.439216,
    0.196078,
    0.517647,
    0.584314,
    0.396078,
    0.85098,
    0.615686,
    0.537255,
    0.0,
    0.392157,
    0.639216,
    0.298039,
    0.564706,
    0.470588,
    0.560784,
    0.380392,
    0.596078,
    1.0,
    0.32549,
    0.219608,
    0.654902,
    0.258824,
    0.231373,
    0.0,
    0.431373,
    0.439216,
    0.596078,
    0.517647,
    0.243137,
    0.862745,
    0.690196,
    0.784314,
  ],
  NanColor: [0.75, 0.75, 0.75],
})
CategoricalColors.set('modulate', {
  IndexedColors: [
    1.0,
    1.0,
    1.0,
    1.0,
    1.0,
    1.0,
    1.0,
    1.0,
    1.0,
    1.0,
    1.0,
    1.0,
    1.0,
    1.0,
    1.0,
    1.0,
    1.0,
    1.0,
    1.0,
    1.0,
    1.0,
    1.0,
    1.0,
    1.0,
    1.0,
    1.0,
    1.0,
    1.0,
    1.0,
    1.0,
    1.0,
    1.0,
    1.0,
    1.0,
    1.0,
    1.0,
  ],
  NanColor: [1.0, 0.0, 0.0],
})
CategoricalColors.set('modulate_dark', {
  IndexedColors: [
    0.0,
    0.0,
    0.0,
    0.0,
    0.0,
    0.0,
    0.0,
    0.0,
    0.0,
    0.0,
    0.0,
    0.0,
    0.0,
    0.0,
    0.0,
    0.0,
    0.0,
    0.0,
    0.0,
    0.0,
    0.0,
    0.0,
    0.0,
    0.0,
    0.0,
    0.0,
    0.0,
    0.0,
    0.0,
    0.0,
    0.0,
    0.0,
    0.0,
    0.0,
    0.0,
    0.0,
  ],
  NanColor: [1.0, 0.0, 0.0],
})

const CategoricalColorIcons = new Map()
CategoricalColorIcons.set(
  'glasbey',
  'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADwAAAAFCAYAAAAZiY8XAAAAAXNSR0IArs4c6QAAAFxJREFUOE9jvMbA8J8BDWyzxhBiKPVhRFfG8F/1GIbY9GArDLGM+osYYjlNdRhiU5Y+wBCLmIapd6V0JIY6hlUtmGJ/P2GIMV5jYPg30jz8d6R5+M9I8/DvkeRhAI3SXfMjCwBaAAAAAElFTkSuQmCC'
)
CategoricalColorIcons.set(
  'glasbey_light',
  'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADwAAAAFCAYAAAAZiY8XAAAAAXNSR0IArs4c6QAAAF1JREFUOE9jvMbA8J8BDWi3o4swMGypxFDGELDmOIbCScFWGGIZy/QxDXw5E0Os6sg0DLH21YUYYutXGGCIPWFvwRBj31uLIcZ4jYHh30jz8N+R5uE/I83Dv0eShwFmt1oGGZZ1OgAAAABJRU5ErkJggg=='
)
CategoricalColorIcons.set(
  'glasbey_warm',
  'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADwAAAAFCAYAAAAZiY8XAAAAAXNSR0IArs4c6QAAAF5JREFUOE9jvMbA8J8BDWgmfUcXYlhrxYkhdiKlAEPsjucEDLH1gZ0YYhOvYQgx5Dc8xxC8ICCAIbbZaiOGWG37YQyx3ausMcQYrzEw/BtpHv470jz8Z6R5+PdI8jAAYiJbm4xVu1cAAAAASUVORK5CYII='
)
CategoricalColorIcons.set(
  'glasbey_bw',
  'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADwAAAAFCAYAAAAZiY8XAAAAAXNSR0IArs4c6QAAAF1JREFUOE9jvMbA8J8BDWyzxhBiKPVhRFfG8F/1GIbY9GArDLGM+osYYjlNdRhiU5Y+wBBjjM7FEGstOI0hVn3zNoaY/8N9mOZdY2D4N9I8/HekefjPSPPw75HkYQDvC2FUP89MNAAAAABJRU5ErkJggg=='
)
CategoricalColorIcons.set(
  'glasbey_dark',
  'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADwAAAAFCAYAAAAZiY8XAAAAAXNSR0IArs4c6QAAAF5JREFUOE9jvMbA8J8BDWyzxhBiKPVhRFfG8F/1GIbYs59WGGKSNy9iiOU01WGIvbHeiCG2UjoSQ0y02xhD7LV8IIbYwtIeDDHGawwM/0aah/+ONA//GWke/j2SPAwAF4Fcch90Y5YAAAAASUVORK5CYII='
)
CategoricalColorIcons.set(
  'glasbey_cool',
  'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADwAAAAFCAYAAAAZiY8XAAAAAXNSR0IArs4c6QAAAGZJREFUOE9j5Mn8/58BDfzR8UMXYvhhOh1DzNN0DYbY9ogLGGJrfOZjiJ08348hdq1PH0PMf9dDDLHfriEYYmv752GI7duGaQcjT+b/fyPNw39Hmof/jDQP/6auh89jycMLBk0eBgANUmrm0LbJrAAAAABJRU5ErkJggg=='
)
CategoricalColorIcons.set(
  'modulate',
  'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADwAAAAFCAYAAAAZiY8XAAAAAXNSR0IArs4c6QAAACdJREFUOE/lzwcNAAAIwDDwL5kzgo7VQRMgRBJY0Tc+PLZw28JlCh8VJhPo4zq1+gAAAABJRU5ErkJggg=='
)
CategoricalColorIcons.set(
  'modulate_dark',
  'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADwAAAAFCAYAAAAZiY8XAAAAAXNSR0IArs4c6QAAACZJREFUOE/lzwcNAAAIwLDhXzI36FgdNIBFJIARfflw28JlC6cpfP3gBPcLeZbyAAAAAElFTkSuQmCC'
)

function _createForOfIteratorHelper$2(o, allowArrayLike) {
  var it =
    (typeof Symbol !== 'undefined' && o[Symbol.iterator]) || o['@@iterator']
  if (!it) {
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
      it = it.call(o)
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
  for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]
  return arr2
}
function createColorMapIconSelector(colorMapSelectorDiv) {
  var rows = 20
  var cols = 4
  var iconSelectParameters = {
    selectedIconWidth: 140,
    selectedIconHeight: 22,
    selectedBoxPadding: 1,
    iconsWidth: 80,
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
  colorMapSelectorDiv.style.width = '154px'
  // put above lower down label map color selector
  colorMapSelectorDiv.style.zIndex = '2001'
  var filteredIcons = new Map(
    Array.from(ColorMapIcons.entries()).concat(
      Array.from(CategoricalColorIcons.entries()).filter(function(_ref) {
        var _ref2 = _slicedToArray(_ref, 1),
          name = _ref2[0]
        return !name.startsWith('modulate')
      })
    )
  )
  var icons = new Array(Math.min(rows * cols, filteredIcons.size))
  var count = 0
  var _iterator = _createForOfIteratorHelper$2(filteredIcons.entries()),
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

  // keeps popout from getting clipped outside of sidebar width
  var box = colorMapSelectorDiv.querySelector('.icon-select .box')
  box.style.left = '-87px'
  box.style.top = '100%'
  box.style.width = '333px' // avoids asymmetric whitespace on right side of popout

  return iconSelect
}

function createWindowLevelReset(context, uiContainer) {
  var windowLevelResetButton = document.createElement('div')
  windowLevelResetButton.innerHTML = '\n    <div itk-vtk-tooltip itk-vtk-tooltip-left itk-vtk-tooltip-content="Reset range to ROI" class="'
    .concat(style.windowLevelButton, '">\n      <img src="')
    .concat(optimizedSVGDataUri$d, '" alt="gradient opacity"/>\n    </div>\n  ')
  var windowLevelResetButtonInput = windowLevelResetButton.children[0]
  var windowLevelResetButtonLabel = windowLevelResetButton.children[1]
  applyContrastSensitiveStyleToElement(
    context,
    'invertibleButton',
    windowLevelResetButtonLabel
  )
  context.images.windowLevelResetButtonLabel = windowLevelResetButtonLabel
  context.images.windowLevelResetButtonInput = windowLevelResetButtonInput
  windowLevelResetButton.addEventListener('click', function(event) {
    event.preventDefault()
    event.stopPropagation()
    context.service.send({
      type: 'IMAGE_COLOR_RANGE_RESET',
      data: {
        name: context.images.selectedName,
      },
    })
  })
  uiContainer.appendChild(windowLevelResetButton)
}

function createColorRangeInput(context, imageUIGroup) {
  var viewerDOMId = context.id
  var colorRangeInputRow = document.createElement('div')
  colorRangeInputRow.setAttribute('class', style.uiRow)
  // This row needs background different from normal uiRows, to aid
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
  var minimumDiv = document.createElement('div')
  minimumDiv.setAttribute('itk-vtk-tooltip', '')
  minimumDiv.setAttribute('itk-vtk-tooltip-top-input', '')
  minimumDiv.setAttribute('itk-vtk-tooltip-content', 'Color range min')
  minimumDiv.appendChild(minimumInput)
  var maximumInput = document.createElement('input')
  maximumInput.type = 'number'
  maximumInput.setAttribute('class', style.numberInput)
  var maximumDiv = document.createElement('div')
  maximumDiv.setAttribute('itk-vtk-tooltip', '')
  maximumDiv.setAttribute('itk-vtk-tooltip-top-input', '')
  maximumDiv.setAttribute('itk-vtk-tooltip-content', 'Color range max')
  maximumDiv.appendChild(maximumInput)
  minimumInput.addEventListener('change', function(event) {
    event.preventDefault()
    event.stopPropagation()
    var name = context.images.selectedName
    var actorContext = context.images.actorContext.get(name)
    var currentRange = actorContext.colorRanges.get(
      actorContext.selectedComponent
    )
    var newRange = []
    if (actorContext.windowLevelEnabled) {
      var level = (currentRange[1] + currentRange[0]) / 2
      var width = Number(event.target.value)
      newRange = [level - width / 2, level + width / 2]
    } else {
      newRange = [Number(event.target.value), currentRange[1]]
    }
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
    var newRange = []
    if (actorContext.windowLevelEnabled) {
      var width = currentRange[1] - currentRange[0]
      var level = Number(event.target.value)
      newRange = [level - width / 2, level + width / 2]
    } else {
      newRange = [currentRange[0], Number(event.target.value)]
    }
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
  colorRangeInputRow.appendChild(minimumDiv)
  colorRangeInputRow.appendChild(colorMapSelector)
  colorRangeInputRow.appendChild(maximumDiv)
  var iconSelector = createColorMapIconSelector(colorMapSelector)
  context.images.iconSelector = iconSelector
  colorMapSelector.addEventListener('changed', function(event) {
    event.preventDefault()
    event.stopPropagation()
    var name = context.images.selectedName
    var actorContext = context.images.actorContext.get(name)
    var componentIndex = actorContext.selectedComponent
    var colorMap = iconSelector.getSelectedValue()
    var currentColorMap = actorContext.colorMaps.get(componentIndex)
    if (currentColorMap !== colorMap) {
      context.service.send({
        type: 'IMAGE_COLOR_MAP_CHANGED',
        data: {
          name: name,
          component: componentIndex,
          colorMap: colorMap,
        },
      })
    }
  })
  context.images.colorMapSelector = colorMapSelector
  createWindowLevelReset(context, colorRangeInputRow)
  imageUIGroup.appendChild(colorRangeInputRow)
}

// from https://stackoverflow.com/a/27078401

// Trailing call functionality is desired.
// Returns a function, that, when invoked, will only be triggered at most once
// during a given window of time. Normally, the throttled function will run
// as much as it can, without ever going more than once per `wait` duration;
// but if you'd like to disable the execution on the leading edge, pass
// `{leading: false}`. To disable execution on the trailing edge, ditto.
function throttle(func, wait, options) {
  var context, args, result
  var timeout = null
  var previous = 0
  if (!options) options = {}
  var later = function later() {
    previous = options.leading === false ? 0 : Date.now()
    timeout = null
    result = func.apply(context, args)
    if (!timeout) context = args = null
  }
  return function() {
    var now = Date.now()
    if (!previous && options.leading === false) previous = now
    var remaining = wait - (now - previous)
    context = this
    args = arguments
    if (remaining <= 0 || remaining > wait) {
      if (timeout) {
        clearTimeout(timeout)
        timeout = null
      }
      previous = now
      result = func.apply(context, args)
      if (!timeout) context = args = null
    } else if (!timeout && options.trailing !== false) {
      timeout = setTimeout(later, remaining)
    }
    return result
  }
}

var J = Object.defineProperty
var Q = (n, t, e) =>
  t in n
    ? J(n, t, { enumerable: !0, configurable: !0, writable: !0, value: e })
    : (n[t] = e)
var a = (n, t, e) => (Q(n, typeof t != 'symbol' ? t + '' : t, e), e)
class N {
  constructor(t, e) {
    a(this, '_x')
    a(this, '_y')
    a(this, 'eventTarget', new EventTarget())
    this.setPosition(t, e)
  }
  get x() {
    return this._x
  }
  set x(t) {
    ;(this._x = t), this.dispatchUpdatedEvent()
  }
  get y() {
    return this._y
  }
  set y(t) {
    ;(this._y = t), this.dispatchUpdatedEvent()
  }
  setPosition(t, e) {
    ;(this._x = t), (this._y = e), this.dispatchUpdatedEvent()
  }
  dispatchUpdatedEvent() {
    this.eventTarget.dispatchEvent(
      new CustomEvent('updated', { detail: [this.x, this.y] })
    )
  }
}
const W = (n, t = !1) => {
    if (n.length === 0)
      return [
        [0, 1],
        [1, 1],
      ]
    if (n.length === 1) {
      const [, i] = n[0]
      return [
        [0, i],
        [1, i],
      ]
    }
    const e = n[0],
      o = n[n.length - 1]
    return t ? [[e[0], 0], ...n, [o[0], 0]] : [[0, e[1]], ...n, [1, o[1]]]
  },
  j = n => W(n.map(({ x: t, y: e }) => [t, e]))
class tt {
  constructor() {
    a(this, '_points', [])
    a(this, 'eventTarget', new EventTarget())
  }
  get points() {
    return [...this._points]
  }
  // in normalized coordinates
  addPoint(t, e) {
    const o = this.createPoint(t, e)
    return this.dispatchUpdatedEvent(), o
  }
  // does not call this.dispatchUpdatedEvent() assuming setPoints() holds external point state and will update downstream function
  addPoints(t) {
    return t.map(([o, i]) => this.createPoint(o, i))
  }
  setPoints(t) {
    return (
      [...this._points].forEach(e => this.deletePoint(e)), this.addPoints(t)
    )
  }
  removePoint(t) {
    this.deletePoint(t), this.dispatchUpdatedEvent()
  }
  dispatchUpdatedEvent() {
    this.eventTarget.dispatchEvent(
      new CustomEvent('updated', { detail: this._points })
    )
  }
  createPoint(t, e) {
    const o = new N(t, e)
    return (
      o.eventTarget.addEventListener('updated', () => {
        this._points.sort((i, s) => i.x - s.x), this.dispatchUpdatedEvent()
      }),
      this._points.push(o),
      this._points.sort((i, s) => i.x - s.x),
      o
    )
  }
  deletePoint(t) {
    this._points = this._points.filter(e => e !== t)
  }
}
const et = (
    n,
    t,
    e,
    o = {
      lineWidth: 1,
      strokeStyle: '#000',
      fillStyle: void 0,
      clip: !1,
    }
  ) => {
    const i = t[3],
      s = t[2] / (e.length - 1),
      d = i + t[1]
    ;(n.lineWidth = o.lineWidth),
      (n.strokeStyle = o.strokeStyle),
      n.beginPath(),
      n.moveTo(t[0], t[1] + t[3])
    for (let r = 0; r < e.length; r++)
      n.lineTo(t[0] + r * s, Math.max(t[1], d - e[r] * i))
    if (o.fillStyle) {
      if (
        ((n.fillStyle = o.fillStyle),
        n.lineTo(t[0] + t[2], t[1] + t[3]),
        o.clip)
      ) {
        n.clip()
        return
      }
      n.fill()
    }
    n.stroke()
  },
  _ = 1,
  nt = (n, t, e, o) => {
    const i = o || document.createElement('canvas')
    if (
      (i.setAttribute('width', String(t)),
      i.setAttribute('height', String(_)),
      n.getSize() === 0)
    )
      return i
    const s = n.getUint8Table(e[0], e[1], t, !0),
      d = i.getContext('2d')
    if (d) {
      const r = d.getImageData(0, 0, t, _)
      for (let l = 0; l < _; l++) r.data.set(s, l * 4 * t)
      const p = _ * t * 4
      for (let l = 3; l < p; l += 4) r.data[l] = 255
      d.putImageData(r, 0, 0)
    }
    return i
  },
  ot = n => {
    if (!n) return []
    const t = n.map(r => (r === 0 ? 0 : Math.log(r))),
      e = t.filter(Boolean),
      o = Math.min(...e),
      s = Math.max(...e) - o
    return t.map(r => (r === 0 ? 0 : (r - o) / s))
  }
function it(n, t) {
  if (n.length !== t.length) return !1
  for (let e = 0; e < n.length; e++) if (n[e] !== t[e]) return !1
  return !0
}
function I(n) {
  return `#${n
    .map(e => Math.floor(e * 255))
    .map(e => `0${e.toString(16)}`.slice(-2))
    .join('')}`
}
const A = 11,
  st = 2 * A,
  rt = () => {
    const n = document.createElementNS('http://www.w3.org/2000/svg', 'svg')
    return (
      n.setAttribute(
        'style',
        'position: absolute; top: 0; left: 0; z-index: 2; box-sizing: border-box; width: 100%; height: 100%;'
      ),
      n
    )
  },
  at = n => {
    const t = document.createElement('div')
    t.setAttribute(
      'style',
      'position: relative; width: 100%; height: 100%; user-select: none;'
    ),
      n.appendChild(t)
    const e = rt()
    t.appendChild(e)
    const o = new EventTarget(),
      i = g => {
        o.addEventListener('sizeupdated', g)
      }
    new ResizeObserver(() => {
      o.dispatchEvent(new Event('sizeupdated'))
    }).observe(t)
    const d = document.createElementNS('http://www.w3.org/2000/svg', 'rect')
    e.appendChild(d),
      d.setAttribute('fill', 'none'),
      d.setAttribute('stroke', 'black')
    const r = g => {
        e.appendChild(g)
      },
      p = g => {
        e.removeChild(g)
      }
    let l = [0, 1, 0, 1]
    const E = () => l,
      u = (g, w, f = 0, b = 1) => {
        const T = l
        ;(l = [g, w, f, b]),
          it(T, l) || o.dispatchEvent(new Event('sizeupdated'))
      },
      S = () => {
        const {
          top: g,
          left: w,
          width: f,
          height: b,
        } = t.getBoundingClientRect()
        return {
          width: f - 2 * A,
          height: b - (st + A),
          top: g + A,
          left: w + A,
        }
      },
      c = (g, w) => {
        const { top: f, left: b, width: T, height: x } = S(),
          C = l[1] - l[0] || 1e-3,
          R = l[3] - l[2] || 1e-3
        return [((g - b) / T) * C + l[0], (1 - (w - f) / x) * R + l[2]]
      },
      h = (g, w) => {
        const { width: f, height: b } = S(),
          T = l[1] - l[0] || 1e-3,
          x = ((g - l[0]) / T) * f + A,
          C = l[3] - l[2] || 1e-3,
          R = (1 - (w - l[2]) / C) * b + A
        return [x, R]
      },
      v = () => {
        const [g, w] = h(0, 0),
          [f, b] = h(1, 1)
        return { left: g, bottom: w, right: f, top: b }
      }
    return (
      i(() => {
        const { left: g, bottom: w, right: f, top: b } = v()
        d.setAttribute('x', `${g}`),
          d.setAttribute('y', `${b}`),
          d.setAttribute('width', `${Math.max(0, f - g)}`),
          d.setAttribute('height', `${Math.max(0, w - b)}`)
      }),
      {
        appendChild: r,
        removeChild: p,
        addSizeObserver: i,
        getViewBox: E,
        setViewBox: u,
        domToNormalized: c,
        normalizedToSvg: h,
        borderSize: v,
        remove: () => n.removeChild(t),
        root: t,
        svg: e,
      }
    )
  }
let V = !1
const dt = () => {
  if (V) return
  V = !0
  const n = document.createElement('style')
  ;(n.innerHTML = `
      .tfeditor-svg-tooltip {
        color: black;
        background-color: rgba(255, 255, 255, 0.95);
        position: absolute;
        transform: translate(178px, 410.19px);
        border-style: solid;
        border-color: black;
        border-width: 1px;
        border-radius: 2px;
        font-size: 12px;
        padding: 8px;
        visibility: hidden;
        max-width: 150px;
        box-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);
      }
    `),
    document.head.appendChild(n)
}
function lt(n) {
  dt()
  const t = [10, 10],
    e = document.createElementNS('http://www.w3.org/2000/svg', 'foreignObject')
  e.setAttribute('width', '100%'),
    e.setAttribute('height', '100%'),
    e.setAttribute('pointer-events', 'none')
  const o = document.createElementNS('http://www.w3.org/1999/xhtml', 'div')
  o.setAttribute('class', 'tfeditor-svg-tooltip'), e.appendChild(o), n.append(e)
  function i(p, l, E) {
    let u = l + t[0],
      S = E + t[1]
    o.textContent = p
    const c = n.getBBox(),
      h = o.getBoundingClientRect()
    u > c.width - h.width && (u = l - h.width - t[0]),
      S > c.height - h.height && (S = E - h.height - t[1]),
      (o.style.transform = `translate(${u}px,${S}px)`)
  }
  function s() {
    o.style.visibility = 'visible'
  }
  function d() {
    o.style.visibility = 'hidden'
  }
  return {
    update: i,
    show: s,
    hide: d,
    remove: () => {
      n.removeChild(e)
    },
  }
}
const ct = 'controlPoint',
  U = n => Math.max(0, Math.min(1, n)),
  z = 2,
  ht = 8,
  G = 14,
  P = G,
  pt = () => {
    const n = document.createElementNS('http://www.w3.org/2000/svg', 'svg')
    n.setAttribute('width', String(P * 2)),
      n.setAttribute('height', String(P * 2)),
      n.setAttribute('viewBox', `-${P} -${P} ${P * 2} ${P * 2}`)
    const t = document.createElementNS('http://www.w3.org/2000/svg', 'circle')
    t.setAttribute('r', String(ht)),
      t.setAttribute('fill', 'white'),
      t.setAttribute('stroke', 'black'),
      t.setAttribute('stroke-width', String(z)),
      t.setAttribute('class', ct),
      n.appendChild(t)
    const e = document.createElementNS('http://www.w3.org/2000/svg', 'circle')
    return (
      e.setAttribute('r', String(G)),
      e.setAttribute('fill', 'transparent'),
      e.setAttribute('stroke', 'transparent'),
      e.setAttribute('style', 'cursor: move;'),
      n.appendChild(e),
      { group: n, circle: t, clickTarget: e }
    )
  }
class O {
  constructor(t, e, o, i, s = !1) {
    a(this, 'element')
    a(this, 'circle')
    a(this, 'tooltip')
    a(this, 'container')
    a(this, 'isDragging', !1)
    a(this, 'isHovered', !1)
    a(this, 'point')
    a(this, 'deletable', !0)
    a(this, 'DELETE_EVENT', 'deleteme')
    a(this, 'eventTarget', new EventTarget())
    a(this, 'grabX', 0)
    a(this, 'grabY', 0)
    a(this, 'toDataSpace')
    const { group: d, circle: r } = pt()
    ;(this.element = d),
      (this.circle = r),
      (this.point = e),
      (this.container = t),
      (this.toDataSpace = o),
      (this.tooltip = lt(this.container.svg)),
      t.addSizeObserver(() => {
        this.positionElement()
      }),
      i &&
        this.eventTarget.addEventListener(this.DELETE_EVENT, p => {
          i(p)
        }),
      t.appendChild(this.element),
      this.positionElement(),
      this.point.eventTarget.addEventListener('updated', () =>
        this.positionElement()
      ),
      this.setupInteraction(),
      s && this.startInteraction(!0)
  }
  remove() {
    this.tooltip.remove(), this.container.removeChild(this.element)
  }
  getSvgPosition() {
    const { x: t, y: e } = this.point
    return this.container.normalizedToSvg(t, e)
  }
  updateTooltip(t = void 0) {
    const { x: e } = this.point,
      o = this.toDataSpace(e),
      [i, s] = t ?? this.getSvgPosition()
    this.tooltip.update(o.toPrecision(4), i, s)
  }
  positionElement() {
    const [t, e] = this.getSvgPosition()
    this.element.setAttribute('x', String(t - P)),
      this.element.setAttribute('y', String(e - P)),
      this.updateTooltip([t, e])
  }
  movePoint(t) {
    const [e, o] = this.container.domToNormalized(t.clientX, t.clientY)
    this.point.setPosition(U(e + this.grabX), U(o + this.grabY))
  }
  update() {
    this.circle.setAttribute('stroke-width', String(z)),
      this.isHovered &&
        (this.circle.setAttribute('stroke-width', String(z + 1)),
        this.updateTooltip(),
        this.tooltip.show()),
      this.isDragging &&
        this.circle.setAttribute('stroke-width', String(z * 2)),
      !this.isDragging && !this.isHovered && this.tooltip.hide()
  }
  startInteraction(t = !1) {
    ;(this.isDragging = t),
      !this.isDragging &&
        this.deletable &&
        this.circle.setAttribute('stroke', 'red')
    const e = i => {
      this.isDragging || this.circle.setAttribute('stroke', 'black'),
        (this.isDragging = !0),
        this.movePoint(i)
    }
    document.addEventListener('pointermove', e)
    const o = () => {
      if (
        (document.removeEventListener('pointermove', e),
        document.removeEventListener('pointerup', o),
        !this.isDragging)
      ) {
        const i = new CustomEvent(this.DELETE_EVENT, { detail: this })
        this.eventTarget.dispatchEvent(i)
      }
      ;(this.isDragging = !1), this.update()
    }
    document.addEventListener('pointerup', o)
  }
  setupInteraction() {
    this.element.addEventListener('pointerdown', t => {
      t.stopPropagation(),
        this.circle.setAttribute('stroke-width', String(z * 2))
      const [e, o] = this.container.domToNormalized(t.clientX, t.clientY)
      ;(this.grabX = this.point.x - e),
        (this.grabY = this.point.y - o),
        this.startInteraction()
    }),
      this.element.addEventListener('pointerenter', () => {
        ;(this.isHovered = !0), this.update()
      }),
      this.element.addEventListener('pointerleave', () => {
        ;(this.isHovered = !1), this.update()
      })
  }
  setColor(t) {
    this.circle.setAttribute('fill', t)
  }
}
a(O, 'styleElement')
class gt {
  constructor(t, e, o) {
    a(this, 'container')
    a(this, 'points')
    a(this, 'onPointsUpdated')
    a(this, 'controlPoints', [])
    a(this, 'isNewPointFromPointer', !1)
    a(this, 'toDataSpace')
    ;(this.container = t), (this.points = e), (this.toDataSpace = o)
    const { root: i } = t
    i.addEventListener('pointerdown', s => this.onPointerDown(s)),
      (this.onPointsUpdated = () => this.updatePoints()),
      this.points.eventTarget.addEventListener('updated', this.onPointsUpdated),
      this.updatePoints()
  }
  remove() {
    this.points.eventTarget.removeEventListener('updated', this.onPointsUpdated)
  }
  onPointerDown(t) {
    const [e, o] = this.container.domToNormalized(t.clientX, t.clientY).map(U)
    ;(this.isNewPointFromPointer = !0),
      this.points.addPoint(e, o),
      (this.isNewPointFromPointer = !1)
  }
  onControlPointDelete(t) {
    this.points.removePoint(t.detail.point)
  }
  updatePoints() {
    const t = this.controlPoints.filter(
      i => !this.points.points.find(s => s === i.point)
    )
    t.forEach(i => i.remove()),
      (this.controlPoints = this.controlPoints.filter(i => !t.includes(i)))
    const e = i => this.controlPoints.find(s => s.point === i),
      o = i =>
        this.controlPoints.push(
          new O(
            this.container,
            i,
            this.toDataSpace,
            s => this.onControlPointDelete(s),
            this.isNewPointFromPointer
          )
        )
    this.points.points.filter(i => !e(i)).forEach(o)
  }
}
const ut = () => {
  const n = document.createElementNS('http://www.w3.org/2000/svg', 'polyline')
  return (
    n.setAttribute('fill', 'none'),
    n.setAttribute('stroke', 'black'),
    n.setAttribute('stroke-width', '2'),
    n
  )
}
class mt {
  constructor(t, e) {
    a(this, 'points')
    a(this, 'container')
    a(this, 'onPointsUpdated')
    a(this, 'element')
    ;(this.container = t),
      (this.points = e),
      (this.element = ut()),
      this.container.appendChild(this.element),
      (this.onPointsUpdated = () => this.update()),
      this.points.eventTarget.addEventListener('updated', this.onPointsUpdated),
      this.container.addSizeObserver(() => {
        this.update()
      }),
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
    const t = j(this.points.points)
      .map(([e, o]) => this.container.normalizedToSvg(e, o))
      .map(([e, o]) => `${e},${o}`)
      .join(' ')
    this.element.setAttribute('points', t)
  }
}
const H = 1.1,
  vt = n => {
    n.root.addEventListener('wheel', t => {
      const e = t.deltaY > 0 ? H : 1 / H,
        [o] = n.domToNormalized(t.clientX, t.clientY),
        [i, s] = n.getViewBox(),
        d = Math.max(0, i - Math.max(0, o - i) * (e - 1)),
        r = Math.min(1, (s - i) * e + d)
      ;(d === i && r === s) ||
        (t.preventDefault(), t.stopPropagation(), n.setViewBox(d, r))
    })
  },
  X = 'rgba(50, 50, 50, 0.3)',
  wt = (n, t, e) => {
    const o = document.createElement('canvas')
    n.root.appendChild(o),
      o.setAttribute('style', 'width: 100%; height: 100%; ')
    const i = o.getContext('2d')
    let s, d
    const r = document.createElement('canvas'),
      p = () => {
        if (i) {
          if ((i.clearRect(0, 0, o.width, o.height), s)) {
            const { width: u, height: S } = n.root.getBoundingClientRect()
            o.setAttribute('width', String(u)),
              o.setAttribute('height', String(S))
            const { left: c, right: h, bottom: v, top: m } = n.borderSize()
            if (Math.ceil(h - c) < 0) return
            const g = j(t.points),
              w = [[0, 0], ...g, [1, 0]].map(([L, k]) =>
                n.normalizedToSvg(L, k)
              )
            i.save(),
              i.beginPath(),
              w.forEach(([L, k]) => {
                i.lineTo(L, k)
              }),
              i.clip()
            const [f, b] = e.getColorRange(),
              [T] = n.normalizedToSvg(f, 1),
              [x] = n.normalizedToSvg(b, 1),
              C = Math.min(u, Math.max(0, T)),
              R = Math.min(u, Math.max(0, x)),
              D = R - C < 2 ? C + 2 : R,
              $ = Math.ceil(D - C)
            if (s) {
              const L = x - T,
                k = (C - T) / L,
                K = (D - x) / L,
                M = s.getMappingRange(),
                F = M[1] - M[0],
                Z = [M[0] + F * k, M[1] + F * K]
              nt(s, $, Z, r),
                i.drawImage(
                  r,
                  0,
                  0,
                  r.width,
                  r.height,
                  Math.floor(C),
                  Math.floor(m),
                  $,
                  Math.ceil(v - m)
                )
              const q = i.imageSmoothingEnabled
              ;(i.imageSmoothingEnabled = !1),
                i.drawImage(
                  r,
                  0,
                  0,
                  1,
                  1,
                  0,
                  Math.floor(m),
                  Math.floor(C),
                  Math.ceil(v - m)
                ),
                i.drawImage(
                  r,
                  r.width - 1,
                  0,
                  1,
                  1,
                  Math.floor(D),
                  Math.floor(m),
                  u - D,
                  Math.ceil(v - m)
                ),
                (i.imageSmoothingEnabled = q)
            }
            i.restore()
          }
          if (d) {
            const { left: u, right: S, bottom: c, top: h } = n.borderSize(),
              v = [u, h, S - u, c - h]
            et(i, v, d, {
              lineWidth: 1,
              strokeStyle: X,
              fillStyle: X,
            })
          }
        }
      }
    return (
      n.addSizeObserver(p),
      t.eventTarget.addEventListener('updated', p),
      e.eventTarget.addEventListener('updated', p),
      {
        container: n,
        canvas: o,
        setColorTransferFunction: u => {
          ;(s = u), p()
        },
        setHistogram: u => {
          ;(d = u), p()
        },
        render: p,
        remove: () => n.root.removeChild(o),
      }
    )
  },
  B = -2.75
class Y extends O {
  getSvgPosition() {
    const { x: t } = this.point,
      [e, o] = this.container.normalizedToSvg(t, 0),
      i = o + B + P
    return [e, i]
  }
}
const ft = () => {
    const n = [new N(0, 0), new N(1, 0)],
      t = () => n.sort((r, p) => r.x - p.x),
      e = () => t().map(r => r.x),
      o = new EventTarget(),
      i = () => o.dispatchEvent(new CustomEvent('updated', { detail: e() }))
    let s = !1
    const d = r => {
      r.eventTarget.addEventListener('updated', () => {
        s || i()
      })
    }
    return (
      n.forEach(d),
      {
        getPoints: t,
        getColorRange: e,
        setColorRange: r => {
          ;(s = !0),
            t().forEach((p, l) => {
              p.x = r[l]
            }),
            (s = !1),
            i()
        },
        eventTarget: o,
      }
    )
  },
  bt = () => {
    const n = document.createElementNS('http://www.w3.org/2000/svg', 'polyline')
    return (
      n.setAttribute('fill', 'none'),
      n.setAttribute('stroke', 'black'),
      n.setAttribute('stroke-width', '1'),
      n
    )
  },
  Et = (n, t, e) => {
    const o = bt()
    n.appendChild(o)
    const i = new N(0.5, B),
      s = new Y(n, i, e)
    s.deletable = !1
    const d = t.getPoints().map(c => {
        const h = new Y(n, c, e)
        return (h.deletable = !1), h
      }),
      r = () => {
        const [, c] = n.normalizedToSvg(0, 0),
          h = c + B + P,
          v = d
            .map(m => [m.point.x, m.point.y])
            .map(([m, y]) => n.normalizedToSvg(m, y))
            .map(([m]) => `${m},${h}`)
            .join(' ')
        o.setAttribute('points', v)
      }
    n.addSizeObserver(() => {
      r()
    })
    let p = !1,
      l = !1
    i.eventTarget.addEventListener('updated', () => {
      if (l) return
      const c = d[1].point.x - d[0].point.x
      ;(p = !0),
        (d[0].point.x = i.x - c / 2),
        (d[1].point.x = i.x + c / 2),
        (p = !1),
        r()
    })
    let E
    const u = () => {
        if (!E) return
        const c = E.getMappingRange(),
          h = []
        E.getColor(c[0], h)
        const v = []
        E.getColor(c[1], v)
        const m = d.sort((w, f) => w.point.x - f.point.x)
        m[0].setColor(I(h)), m[1].setColor(I(v))
        const y = [],
          g = (c[1] - c[0]) / 2 + c[0]
        E.getColor(g, y), s.setColor(I(y))
      },
      S = c => {
        ;(E = c), u()
      }
    return (
      t.eventTarget.addEventListener('updated', () => {
        if (p) return
        u()
        const c = t.getPoints().length
        ;(l = !0),
          (i.x = t.getPoints().reduce((h, v) => h + v.x, 0) / c),
          r(),
          (l = !1)
      }),
      {
        points: d,
        setColorTransferFunction: S,
      }
    )
  },
  St = () => {
    let n = [0, 1]
    return {
      setRange: o => {
        n = o
      },
      toDataSpace: o => {
        const [i, s] = n,
          d = s - i
        return o * d + i
      },
    }
  }
class Tt {
  constructor(t) {
    a(this, 'eventTarget', new EventTarget())
    a(this, 'points')
    a(this, 'colorRange')
    a(this, 'colorRangeController')
    a(this, 'line')
    a(this, 'pointController')
    a(this, 'container')
    a(this, 'background')
    a(this, 'dataSpaceConverter', St())
    ;(this.container = at(t)), vt(this.container), (this.points = new tt())
    const e = [
      [0, 0],
      [1, 1],
    ]
    this.points.setPoints(e),
      (this.line = new mt(this.container, this.points)),
      (this.pointController = new gt(
        this.container,
        this.points,
        this.dataSpaceConverter.toDataSpace
      )),
      (this.colorRange = ft()),
      (this.colorRangeController = Et(
        this.container,
        this.colorRange,
        this.dataSpaceConverter.toDataSpace
      )),
      (this.background = wt(this.container, this.points, this.colorRange)),
      this.points.eventTarget.addEventListener('updated', o => {
        this.eventTarget.dispatchEvent(
          new CustomEvent('updated', { detail: o.detail })
        )
      }),
      this.colorRange.eventTarget.addEventListener('updated', o => {
        this.eventTarget.dispatchEvent(
          new CustomEvent('colorRange', { detail: o.detail })
        )
      })
  }
  remove() {
    this.background.remove(), this.container.remove()
  }
  getPoints() {
    return this.points.points.map(({ x: t, y: e }) => [t, e])
  }
  // No Points update event on setPoints to avoid emitting 'update' event to user code.
  // User code responsible for updating downstream piecewise function without update in setPoints case.
  setPoints(t) {
    this.points.setPoints(t),
      this.pointController.updatePoints(),
      this.line.update(),
      this.background.render()
  }
  getColorRange() {
    return this.colorRange.getColorRange()
  }
  setColorRange(t) {
    return this.colorRange.setColorRange(t)
  }
  setViewBox(t, e, o = 0, i = 1) {
    this.container.setViewBox(t, e, o, i)
  }
  setColorTransferFunction(t) {
    this.background.setColorTransferFunction(t),
      this.colorRangeController.setColorTransferFunction(t)
  }
  setHistogram(t) {
    this.background.setHistogram(ot(t))
  }
  setRange(t) {
    this.dataSpaceConverter.setRange(t)
  }
}

var PIECEWISE_UPDATE_DELAY = 200
var updateContextPiecewiseFunction = function updateContextPiecewiseFunction(
  context,
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
      keepAutoAdjusting: false,
    },
  })
}
var updateContextColorRange = function updateContextColorRange(
  context,
  points
) {
  if (!context.images.piecewiseFunctions) return // not ready yet

  var name = context.images.selectedName
  var actorContext = context.images.actorContext.get(name)
  var component = actorContext.selectedComponent
  context.service.send({
    type: 'IMAGE_COLOR_RANGE_POINTS_CHANGED',
    data: {
      name: name,
      component: component,
      points: points,
    },
  })
}
var vtkPiecewiseGaussianWidgetFacade = function vtkPiecewiseGaussianWidgetFacade(
  tfEditor,
  context
) {
  var throttledUpdate = throttle(function() {
    return updateContextPiecewiseFunction(context, tfEditor.getPoints())
  }, PIECEWISE_UPDATE_DELAY)
  tfEditor.eventTarget.addEventListener('updated', throttledUpdate)
  var throttledColorRangeUpdate = throttle(function() {
    return updateContextColorRange(context, tfEditor.getColorRange())
  }, PIECEWISE_UPDATE_DELAY)
  tfEditor.eventTarget.addEventListener('colorRange', throttledColorRangeUpdate)
  return {
    setColorTransferFunction: function setColorTransferFunction(tf) {
      tfEditor.setColorTransferFunction(tf)
    },
    setPoints: function setPoints(points) {
      // tfEditor.setPoints recreates them and they loose their "grabbed" state
      // so ignore events coming down triggered by user dragging points
      var currentPoints = tfEditor.getPoints()
      var arePointsModified =
        points.length !== currentPoints.length ||
        points.some(function(_ref, idx) {
          var _ref2 = _slicedToArray(_ref, 2),
            newX = _ref2[0],
            newY = _ref2[1]
          var _currentPoints$idx = _slicedToArray(currentPoints[idx], 2),
            oldX = _currentPoints$idx[0],
            oldY = _currentPoints$idx[1]
          return newX !== oldX || newY !== oldY
        })
      if (arePointsModified) tfEditor.setPoints(points)
    },
    getPoints: function getPoints() {
      return tfEditor.getPoints()
    },
    setColorRange: function setColorRange(newRange) {
      var displayedRange = tfEditor.getColorRange()
      // if same, avoid infinite event loop
      if (
        displayedRange.some(function(v, i) {
          return v !== newRange[i]
        })
      ) {
        tfEditor.setColorRange(newRange)
      }
    },
    setRange: function setRange(range) {
      tfEditor.setRange(range)
    },
    setRangeZoom: function setRangeZoom(newRange) {
      tfEditor.setViewBox.apply(tfEditor, _toConsumableArray(newRange))
    },
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
  var editor = new Tt(mount)
  return vtkPiecewiseGaussianWidgetFacade(editor, context)
}

var createTransferFunctionWidget = function createTransferFunctionWidget(
  context,
  imagesUIGroup
) {
  var piecewiseWidgetContainer = document.createElement('div')
  piecewiseWidgetContainer.setAttribute('style', 'height: 150px; width: 400px')
  piecewiseWidgetContainer.setAttribute('class', style.piecewiseWidget)
  var transferFunctionWidgetRow = document.createElement('div')
  transferFunctionWidgetRow.setAttribute('class', style.uiRow)
  // This row needs background different from normal uiRows, to aid
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
  context.images.transferFunctionWidget = transferFunctionWidget
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
    .concat(optimizedSVGDataUri$7, '" alt="shadow" /></label>')
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
      optimizedSVGDataUri$q,
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
      optimizedSVGDataUri$b,
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
    .concat(optimizedSVGDataUri$v, '" alt="blend mode" />\n    </div>\n    ')
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

var sliderMap = new Map()
function makeSlider(context, label, parameterName, _ref) {
  var min = _ref.min,
    max = _ref.max,
    step = _ref.step,
    start = _ref.start
  var container = document.createElement('div')
  container.setAttribute('class', style.sliderEntry)
  container.innerHTML = '\n    <div itk-vtk-tooltip itk-vtk-tooltip-top-screenshot itk-vtk-tooltip-content="'
    .concat(label, '" class="')
    .concat(style.sliderIcon, '">\n      <img src="')
    .concat(optimizedSVGDataUri$2, '" alt="')
    .concat(label, '" />\n    </div>\n    <input type="range" min="')
    .concat(min, '" max="')
    .concat(max, '" step="')
    .concat(step, '" value="')
    .concat(start, '" \n      class="')
    .concat(style.slider, '" />')
  var slider = container.children[1]
  slider.addEventListener('input', function(event) {
    event.preventDefault()
    event.stopPropagation()
    context.service.send({
      type: 'SET_CINEMATIC_PARAMETERS',
      data: {
        name: context.images.selectedName,
        params: _defineProperty({}, parameterName, Number(slider.value)),
      },
    })
  })
  sliderMap.set(parameterName, slider)
  return container
}
function createCinematicParameters(context, rowParent) {
  // hidable sliders
  var row = document.createElement('div')
  var rootContainer = document.createElement('div')
  rootContainer.setAttribute('class', style.sliderColumn)
  row.appendChild(rootContainer)
  rowParent.appendChild(row)
  context.images.volumeUiElements.push(row)
  rootContainer.style.flexDirection = 'column'
  rootContainer.appendChild(
    makeSlider(context, 'Volume Scattering', 'scatteringBlend', {
      min: 0,
      max: 1,
      step: 1 / 100,
      start: 0,
    })
  )
}
function applyCinematicChanged(context, _ref2) {
  var actorContext = _ref2.actorContext
  var cinematicParameters = actorContext.cinematicParameters
  sliderMap.get(
    'scatteringBlend'
  ).disabled = !cinematicParameters.isCinematicPossible
  ;['scatteringBlend'].forEach(function(param) {
    sliderMap.get(param).value = cinematicParameters[param]
  })
}

function createWindowLevelToggle(context, uiContainer) {
  var windowLevelToggle = document.createElement('div')
  windowLevelToggle.innerHTML = '<input id="'
    .concat(context.id, '-windowLevelToggle" type="checkbox" class="')
    .concat(
      style.toggleInput,
      '"><label itk-vtk-tooltip itk-vtk-tooltip-left itk-vtk-tooltip-content="Toggle window/level interactor" class="'
    )
    .concat(style.windowLevelButton, ' ')
    .concat(style.toggleButton, '" for="')
    .concat(context.id, '-windowLevelToggle"><img src="')
    .concat(optimizedSVGDataUri$1, '" alt="Window/Level" /></label>')
  var windowLevelToggleInput = windowLevelToggle.children[0]
  var windowLevelToggleLabel = windowLevelToggle.children[1]
  applyContrastSensitiveStyleToElement(
    context,
    'invertibleButton',
    windowLevelToggleLabel
  )
  context.images.windowLevelToggleLabel = windowLevelToggleLabel
  context.images.windowLevelToggleInput = windowLevelToggleInput
  windowLevelToggle.addEventListener('click', function(event) {
    event.preventDefault()
    event.stopPropagation()
    var name = context.images.selectedName
    var actorContext = context.images.actorContext.get(name)
    context.service.send({
      type: 'WINDOW_LEVEL_TOGGLED',
      data: {
        name: name,
        component: actorContext.selectedComponent,
      },
    })
  })
  uiContainer.appendChild(windowLevelToggle)
}

function createVolumeRenderingInputs(context, imagesUIGroup) {
  var volumeRow1 = document.createElement('div')
  volumeRow1.setAttribute('class', style.uiRow)
  createShadowToggle(context, volumeRow1)
  createGradientOpacitySlider(context, volumeRow1)
  createWindowLevelToggle(context, volumeRow1)
  imagesUIGroup.appendChild(volumeRow1)
  context.images.volumeRow1 = volumeRow1
  var volumeRow2 = document.createElement('div')
  volumeRow2.setAttribute('class', style.uiRow)
  createSampleDistanceSlider(context, volumeRow2)
  createBlendModeSelector(context, volumeRow2)
  imagesUIGroup.appendChild(volumeRow2)
  context.images.volumeUiElements = [volumeRow1, volumeRow2]
  createCinematicParameters(context, imagesUIGroup)
}

function _createForOfIteratorHelper$1(o, allowArrayLike) {
  var it =
    (typeof Symbol !== 'undefined' && o[Symbol.iterator]) || o['@@iterator']
  if (!it) {
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
      it = it.call(o)
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
  for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]
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
  var _iterator = _createForOfIteratorHelper$1(CategoricalColorIcons.entries()),
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
      optimizedSVGDataUri$j,
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
  var it =
    (typeof Symbol !== 'undefined' && o[Symbol.iterator]) || o['@@iterator']
  if (!it) {
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
      it = it.call(o)
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
  for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]
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
  sliderEntry.setAttribute('class', style.sliderEntry)
  // <input type="range" min="0" max="1" value="${context.images.labelImageWeights[0]}" step="0.05" id="${context.id}-labelImageWeightSlider" class="${style.slider}" />`
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
    var components = actorContext.componentVisibilities.length
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
  var minimumInput = context.images.colorRangeInputRow.children[1].children[0]
  var maximumInput = context.images.colorRangeInputRow.children[3].children[0]
  if (actorContext.windowLevelEnabled) {
    minimumInput.value = colorRange[1] - colorRange[0]
    maximumInput.value = (colorRange[1] + colorRange[0]) / 2
  } else {
    minimumInput.value = colorRange[0]
    maximumInput.value = colorRange[1]
  }
  var fullRange = colorRange
  if (actorContext.colorRangeBounds.has(component)) {
    fullRange = actorContext.colorRangeBounds.get(component)
  }
  if (event.data.fullRange) {
    // use more up to date colorRangeBounds
    fullRange = event.data.fullRange
  }
  var diff = fullRange[1] - fullRange[0]
  var colorRangeNormalized = [
    (colorRange[0] - fullRange[0]) / diff,
    (colorRange[1] - fullRange[0]) / diff,
  ]
  context.images.transferFunctionWidget.setColorRange(colorRangeNormalized)
}

function applyColorRangeBounds(context, event) {
  var _event$data = event.data,
    name = _event$data.name,
    component = _event$data.component
  var actorContext = context.images.actorContext.get(name)
  if (
    name !== context.images.selectedName ||
    component !== actorContext.selectedComponent
  ) {
    return
  }
  var range = event.data.range
  var minimumInput = context.images.colorRangeInputRow.children[1].children[0]
  var maximumInput = context.images.colorRangeInputRow.children[3].children[0]
  var image = actorContext.image
  if (
    (image && image.imageType.componentType === 'float') ||
    image.imageType.componentType === 'double'
  ) {
    var step = (range[1] - range[0]) / 1000.0
    minimumInput.step = step
    maximumInput.step = step
  }
  if (actorContext.colorRanges.has(component)) {
    applyColorRange(context, {
      data: {
        name: name,
        component: component,
        range: actorContext.colorRanges.get(component),
        fullRange: range,
      },
    })
  }
}

function applyColorMap(context, _ref) {
  var _ref$data = _ref.data,
    component = _ref$data.component,
    name = _ref$data.name
  if (context.images.selectedName !== name) return
  var actorContext = context.images.actorContext.get(name)
  if (component === actorContext.selectedComponent) {
    var _context$images$color
    var colorMap = actorContext.colorMaps.get(component)
    context.images.iconSelector.setSelectedValue(colorMap)
    var colorTransferFunction =
      (_context$images$color = context.images.colorTransferFunctions) ===
        null || _context$images$color === void 0
        ? void 0
        : _context$images$color.get(component)
    if (colorTransferFunction) {
      context.images.transferFunctionWidget.setColorTransferFunction(
        colorTransferFunction
      )
    }
    if (actorContext.fusedImage) {
      var range = actorContext.fusedImage
        .getPointData()
        .getScalars()
        .getRange(component)
      context.images.transferFunctionWidget.setRange(range)
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
  var component = actorContext.selectedComponent

  // If not a 2D RGB image
  if (actorContext.independentComponents) {
    context.images.colorRangeInputRow.style.display = 'flex'
    context.images.colorMapSelector.style.display = 'block'
  } else {
    context.images.colorRangeInputRow.style.display = 'none'
    context.images.colorMapSelector.style.display = 'none'
  }
  if (image) {
    if (image.imageType.dimension === 3) {
      context.images.volumeUiElements.forEach(function(e) {
        return (e.style.display = 'flex')
      })
      if (context.main.xPlaneRow) {
        context.main.xPlaneRow.style.display = 'flex'
        context.main.yPlaneRow.style.display = 'flex'
        context.main.zPlaneRow.style.display = 'flex'
      }
    } else {
      context.images.volumeUiElements.forEach(function(e) {
        return (e.style.display = 'none')
      })
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
  var transferFunctionWidget = context.images.transferFunctionWidget
  if (!transferFunctionWidget) {
    console.warn('No transfer function widget')
    return
  }
  var points = actorContext.piecewiseFunctionPoints.get(
    actorContext.selectedComponent
  )
  // no points if just label image
  if (points) {
    transferFunctionWidget.setPoints(points)
  }
}

function applyHistogram(context, event) {
  var _event$data$histogram
  var name = event.data.name
  var component = event.data.component
  var actorContext = context.images.actorContext.get(name)
  if (
    name !== context.images.selectedName ||
    component !== actorContext.selectedComponent
  ) {
    return
  }
  var histogram =
    (_event$data$histogram = event.data.histogram) !== null &&
    _event$data$histogram !== void 0
      ? _event$data$histogram
      : []
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
        optimizedSVGDataUri$a,
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

var MIN_WINDOW = 1e-8
function toggleWindowLevel(context, event) {
  var name = event.data.name
  var actorContext = context.images.actorContext.get(name)
  var wl = actorContext.windowLevelEnabled
  var colorRange = actorContext.colorRanges.get(actorContext.selectedComponent)
  var fullRange = actorContext.colorRangeBounds.get(
    actorContext.selectedComponent
  )
  context.images.windowLevelToggleInput.checked = wl
  var minimumTooltip = context.images.colorRangeInputRow.children[1]
  var maximumTooltip = context.images.colorRangeInputRow.children[3]
  var minimumInput = minimumTooltip.children[0]
  var maximumInput = maximumTooltip.children[0]
  if (wl) {
    minimumTooltip.setAttribute('itk-vtk-tooltip-content', 'Window width')
    maximumTooltip.setAttribute('itk-vtk-tooltip-content', 'Window level')
    minimumInput.value = colorRange[1] - colorRange[0]
    maximumInput.value = (colorRange[1] + colorRange[0]) / 2
    minimumInput.min = MIN_WINDOW
    minimumInput.max = (fullRange[1] - fullRange[0]) * 2
    maximumInput.min = fullRange[0] - fullRange[0]
    maximumInput.max = fullRange[1] + fullRange[1]
    var step = Math.pow(
      10,
      Math.ceil(Math.log((fullRange[1] - fullRange[0]) / 1000))
    )
    minimumInput.step = step
    maximumInput.step = step
  } else {
    minimumTooltip.setAttribute('itk-vtk-tooltip-content', 'Color range min')
    maximumTooltip.setAttribute('itk-vtk-tooltip-content', 'Color range max')
    minimumInput.value = colorRange[0]
    maximumInput.value = colorRange[1]
    minimumInput.min = fullRange[0]
    minimumInput.max = fullRange[1]
    maximumInput.min = fullRange[0]
    maximumInput.max = fullRange[1]
    var _step = (fullRange[1] - fullRange[0]) / 1000.0
    minimumInput.step = _step
    maximumInput.step = _step
  }
}

function applyWindowLevelReset(context, _ref) {
  var data = _ref.data
  var actorContext = context.images.actorContext.get(data.name)
  var component = actorContext.selectedComponent
  var bounds = actorContext.colorRangeBounds.get(component)
  var wMax = bounds[1] - bounds[0]
  var lMin = bounds[0]
  var level = wMax / 2 + lMin
  var width = wMax
  var newRange = function newRange() {
    return [level - width / 2, level + width / 2]
  }
  context.service.send({
    type: 'IMAGE_COLOR_RANGE_CHANGED',
    data: {
      name: data.name,
      component: component,
      range: newRange(),
    },
  })
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
    toggleWindowLevel: toggleWindowLevel,
    applyWindowLevelReset: applyWindowLevelReset,
    toggleShadow: toggleShadow,
    applyGradientOpacity: applyGradientOpacity,
    applyGradientOpacityScale: applyGradientOpacityScale,
    applyVolumeSampleDistance: applyVolumeSampleDistance,
    applyBlendMode: applyBlendMode,
    applyCinematicChanged: applyCinematicChanged,
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
  var viewerDOMId = context.id

  // Put distance tools in their own row
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
    .concat(optimizedSVGDataUri$k, '" alt="distance"/></label>')
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

/**
 * @license
 * Copyright 2021 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */
/**
 * TODO(b/265346501): add docs
 */
class NavigationDrawer extends s$9 {
  constructor() {
    super(...arguments)
    this.opened = false
    this.pivot = 'end'
  }
  render() {
    const ariaExpanded = this.opened ? 'true' : 'false'
    const ariaHidden = !this.opened ? 'true' : 'false'
    // Needed for closure conformance
    const { ariaLabel, ariaModal } = this
    return x$1`
      <div
        aria-expanded="${ariaExpanded}"
        aria-hidden="${ariaHidden}"
        aria-label=${ariaLabel || T$1}
        aria-modal="${ariaModal || T$1}"
        class="md3-navigation-drawer ${this.getRenderClasses()}"
        role="dialog">
        <md-elevation></md-elevation>
        <div class="md3-navigation-drawer__slot-content">
          <slot></slot>
        </div>
      </div>
    `
  }
  getRenderClasses() {
    return e$c({
      'md3-navigation-drawer--opened': this.opened,
      'md3-navigation-drawer--pivot-at-start': this.pivot === 'start',
    })
  }
  updated(changedProperties) {
    if (changedProperties.has('opened')) {
      setTimeout(() => {
        this.dispatchEvent(
          new CustomEvent('navigation-drawer-changed', {
            detail: { opened: this.opened },
            bubbles: true,
            composed: true,
          })
        )
      }, 250)
    }
  }
}
;(() => {
  requestUpdateOnAriaChange(NavigationDrawer)
})()
__decorate(
  [n$b({ type: Boolean })],
  NavigationDrawer.prototype,
  'opened',
  void 0
)
__decorate([n$b()], NavigationDrawer.prototype, 'pivot', void 0)

/**
 * @license
 * Copyright 2022 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */
const styles$4 = i$8`:host{--_container-color: var(--md-navigation-drawer-container-color, #fff);--_container-height: var(--md-navigation-drawer-container-height, 100%);--_container-shape: var(--md-navigation-drawer-container-shape, 0 16px 16px 0);--_container-width: var(--md-navigation-drawer-container-width, 360px);--_divider-color: var(--md-navigation-drawer-divider-color, #000);--_modal-container-elevation: var(--md-navigation-drawer-modal-container-elevation, 1);--_standard-container-elevation: var(--md-navigation-drawer-standard-container-elevation, 0);--md-elevation-level: var(--_standard-container-elevation);--md-elevation-shadow-color: var(--_divider-color)}:host{display:flex}.md3-navigation-drawer{inline-size:0;box-sizing:border-box;display:flex;justify-content:flex-end;overflow:hidden;overflow-y:auto;visibility:hidden;transition:inline-size .25s cubic-bezier(0.4, 0, 0.2, 1) 0s,visibility 0s cubic-bezier(0.4, 0, 0.2, 1) .25s}md-elevation{z-index:0}.md3-navigation-drawer--opened{visibility:visible;transition:inline-size .25s cubic-bezier(0.4, 0, 0.2, 1) 0s,visibility 0s cubic-bezier(0.4, 0, 0.2, 1) 0s}.md3-navigation-drawer--pivot-at-start{justify-content:flex-start}.md3-navigation-drawer__slot-content{display:flex;flex-direction:column;position:relative}/*# sourceMappingURL=navigation-drawer-styles.css.map */
`

/**
 * @license
 * Copyright 2022 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */
const styles$3 = i$8`.md3-navigation-drawer-modal{background-color:var(--_container-color);border-radius:var(--_container-shape);height:var(--_container-height)}.md3-navigation-drawer-modal.md3-navigation-drawer-modal--opened{inline-size:var(--_container-width)}.md3-navigation-drawer-modal .md3-navigation-drawer-modal__slot-content{min-inline-size:var(--_container-width);max-inline-size:var(--_container-width)}/*# sourceMappingURL=shared-styles.css.map */
`

/**
 * @license
 * Copyright 2021 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */
/**
 * @final
 * @suppress {visibility}
 */
let MdNavigationDrawer = class MdNavigationDrawer extends NavigationDrawer {}
MdNavigationDrawer.styles = [styles$3, styles$4]
MdNavigationDrawer = __decorate(
  [t$9('md-navigation-drawer')],
  MdNavigationDrawer
)

let ServiceContext = class ServiceContext extends s$4 {
  constructor() {
    super(...arguments)
    // @ts-ignore
    this.provider = new e$5(this, viewerContext, {
      service: appContext.service,
    })
  }
  render() {
    return y`
      <slot></slot>
    `
  }
}
ServiceContext = __decorate([e$7('service-context')], ServiceContext)

/**
 * @license
 * Copyright 2022 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */
/**
 * Returns `true` if the given element is in a right-to-left direction.
 *
 * @param el Element to determine direction from
 * @param shouldCheck Optional. If `false`, return `false` without checking
 *     direction. Determining the direction of `el` is somewhat expensive, so
 *     this parameter can be used as a conditional guard. Defaults to `true`.
 */
function isRtl(el, shouldCheck = true) {
  return (
    shouldCheck &&
    getComputedStyle(el)
      .getPropertyValue('direction')
      .trim() === 'rtl'
  )
}

/**
 * @license
 * Copyright 2018 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */
var _a
// tslint:disable-next-line:enforce-comments-on-exported-symbols
class IconButton extends s$9 {
  constructor() {
    super(...arguments)
    /**
     * Disables the icon button and makes it non-interactive.
     */
    this.disabled = false
    /**
     * Flips the icon if it is in an RTL context at startup.
     */
    this.flipIconInRtl = false
    /**
     * Sets the underlying `HTMLAnchorElement`'s `href` resource attribute.
     */
    this.href = ''
    /**
     * Sets the underlying `HTMLAnchorElement`'s `target` attribute.
     */
    this.target = ''
    /**
     * The `aria-label` of the button when the button is toggleable and selected.
     */
    this.ariaLabelSelected = ''
    /**
     * When true, the button will toggle between selected and unselected
     * states
     */
    this.toggle = false
    /**
     * Sets the selected state. When false, displays the default icon. When true,
     * displays the selected icon, or the default icon If no `slot="selected"`
     * icon is provided.
     */
    this.selected = false
    this.type = 'submit'
    this.value = ''
    this.flipIcon = isRtl(this, this.flipIconInRtl)
    /** @private */
    this[_a] = this /* needed for closure */.attachInternals()
  }
  get name() {
    return this.getAttribute('name') ?? ''
  }
  set name(name) {
    this.setAttribute('name', name)
  }
  /**
   * The associated form element with which this element's value will submit.
   */
  get form() {
    return this[internals].form
  }
  /**
   * The labels this element is associated with.
   */
  get labels() {
    return this[internals].labels
  }
  /**
   * Link buttons cannot be disabled.
   */
  willUpdate() {
    if (this.href) {
      this.disabled = false
    }
  }
  render() {
    const tag = this.href ? s$8`div` : s$8`button`
    // Needed for closure conformance
    const { ariaLabel, ariaHasPopup, ariaExpanded } = this
    const hasToggledAriaLabel = ariaLabel && this.ariaLabelSelected
    const ariaPressedValue = !this.toggle ? T$1 : this.selected
    let ariaLabelValue = T$1
    if (!this.href) {
      ariaLabelValue =
        hasToggledAriaLabel && this.selected
          ? this.ariaLabelSelected
          : ariaLabel
    }
    return n$9`<${tag}
        class="icon-button ${e$c(this.getRenderClasses())}"
        id="button"
        aria-label="${ariaLabelValue || T$1}"
        aria-haspopup="${(!this.href && ariaHasPopup) || T$1}"
        aria-expanded="${(!this.href && ariaExpanded) || T$1}"
        aria-pressed="${ariaPressedValue}"
        ?disabled="${!this.href && this.disabled}"
        @click="${this.handleClick}">
        ${this.renderFocusRing()}
        ${this.renderRipple()}
        ${!this.selected ? this.renderIcon() : T$1}
        ${this.selected ? this.renderSelectedIcon() : T$1}
        ${this.renderTouchTarget()}
        ${this.href && this.renderLink()}
  </${tag}>`
  }
  renderLink() {
    // Needed for closure conformance
    const { ariaLabel } = this
    return x$1`
      <a class="link"
        id="link"
        href="${this.href}"
        target="${this.target || T$1}"
        aria-label="${ariaLabel || T$1}"
      ></a>
    `
  }
  getRenderClasses() {
    return {
      'flip-icon': this.flipIcon,
      selected: this.toggle && this.selected,
    }
  }
  renderIcon() {
    return x$1`<span class="icon"><slot></slot></span>`
  }
  renderSelectedIcon() {
    // Use default slot as fallback to not require specifying multiple icons
    return x$1`<span class="icon icon--selected"><slot name="selected"><slot></slot></slot></span>`
  }
  renderTouchTarget() {
    return x$1`<span class="touch"></span>`
  }
  renderFocusRing() {
    return x$1`<md-focus-ring part="focus-ring" for=${
      this.href ? 'link' : 'button'
    }></md-focus-ring>`
  }
  renderRipple() {
    return x$1`<md-ripple
      for=${this.href ? 'link' : T$1}
      ?disabled="${!this.href && this.disabled}"
    ></md-ripple>`
  }
  connectedCallback() {
    this.flipIcon = isRtl(this, this.flipIconInRtl)
    super.connectedCallback()
  }
  async handleClick(event) {
    // Allow the event to propagate
    await 0
    if (!this.toggle || this.disabled || event.defaultPrevented) {
      return
    }
    this.selected = !this.selected
    this.dispatchEvent(
      new InputEvent('input', { bubbles: true, composed: true })
    )
    // Bubbles but does not compose to mimic native browser <input> & <select>
    // Additionally, native change event is not an InputEvent.
    this.dispatchEvent(new Event('change', { bubbles: true }))
  }
}
_a = internals
;(() => {
  requestUpdateOnAriaChange(IconButton)
  setupFormSubmitter(IconButton)
})()
/** @nocollapse */
IconButton.formAssociated = true
/** @nocollapse */
IconButton.shadowRootOptions = { mode: 'open', delegatesFocus: true }
__decorate(
  [n$b({ type: Boolean, reflect: true })],
  IconButton.prototype,
  'disabled',
  void 0
)
__decorate(
  [n$b({ type: Boolean, attribute: 'flip-icon-in-rtl' })],
  IconButton.prototype,
  'flipIconInRtl',
  void 0
)
__decorate([n$b()], IconButton.prototype, 'href', void 0)
__decorate([n$b()], IconButton.prototype, 'target', void 0)
__decorate(
  [n$b({ attribute: 'aria-label-selected' })],
  IconButton.prototype,
  'ariaLabelSelected',
  void 0
)
__decorate([n$b({ type: Boolean })], IconButton.prototype, 'toggle', void 0)
__decorate(
  [n$b({ type: Boolean, reflect: true })],
  IconButton.prototype,
  'selected',
  void 0
)
__decorate([n$b()], IconButton.prototype, 'type', void 0)
__decorate([n$b()], IconButton.prototype, 'value', void 0)
__decorate([r$8()], IconButton.prototype, 'flipIcon', void 0)

/**
 * @license
 * Copyright 2022 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */
const styles$2 = i$8`:host{display:inline-flex;outline:none;-webkit-tap-highlight-color:rgba(0,0,0,0);height:var(--_container-height);width:var(--_container-width);justify-content:center}:host([touch-target=wrapper]){margin:max(0px,(48px - var(--_container-height))/2) max(0px,(48px - var(--_container-width))/2)}md-focus-ring{--md-focus-ring-shape-start-start: var(--_container-shape-start-start);--md-focus-ring-shape-start-end: var(--_container-shape-start-end);--md-focus-ring-shape-end-end: var(--_container-shape-end-end);--md-focus-ring-shape-end-start: var(--_container-shape-end-start)}:host([disabled]){pointer-events:none}.icon-button{place-items:center;background:none;border:none;box-sizing:border-box;cursor:pointer;display:flex;place-content:center;outline:none;padding:0;position:relative;text-decoration:none;user-select:none;z-index:0;flex:1;border-start-start-radius:var(--_container-shape-start-start);border-start-end-radius:var(--_container-shape-start-end);border-end-start-radius:var(--_container-shape-end-start);border-end-end-radius:var(--_container-shape-end-end)}.icon ::slotted(*){font-size:var(--_icon-size);height:var(--_icon-size);width:var(--_icon-size);font-weight:inherit}md-ripple{z-index:-1;border-start-start-radius:var(--_container-shape-start-start);border-start-end-radius:var(--_container-shape-start-end);border-end-start-radius:var(--_container-shape-end-start);border-end-end-radius:var(--_container-shape-end-end)}.flip-icon .icon{transform:scaleX(-1)}.icon{display:inline-flex}.link{height:100%;outline:none;position:absolute;width:100%}.touch{position:absolute;height:max(48px,100%);width:max(48px,100%)}:host([touch-target=none]) .touch{display:none}@media(forced-colors: active){:host([disabled]){--_disabled-icon-opacity: 1}}/*# sourceMappingURL=shared-styles.css.map */
`

/**
 * @license
 * Copyright 2022 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */
const styles$1 = i$8`:host{--_disabled-icon-color: var(--md-icon-button-disabled-icon-color, var(--md-sys-color-on-surface, #1d1b20));--_disabled-icon-opacity: var(--md-icon-button-disabled-icon-opacity, 0.38);--_icon-size: var(--md-icon-button-icon-size, 24px);--_selected-focus-icon-color: var(--md-icon-button-selected-focus-icon-color, var(--md-sys-color-primary, #6750a4));--_selected-hover-icon-color: var(--md-icon-button-selected-hover-icon-color, var(--md-sys-color-primary, #6750a4));--_selected-hover-state-layer-color: var(--md-icon-button-selected-hover-state-layer-color, var(--md-sys-color-primary, #6750a4));--_selected-hover-state-layer-opacity: var(--md-icon-button-selected-hover-state-layer-opacity, 0.08);--_selected-icon-color: var(--md-icon-button-selected-icon-color, var(--md-sys-color-primary, #6750a4));--_selected-pressed-icon-color: var(--md-icon-button-selected-pressed-icon-color, var(--md-sys-color-primary, #6750a4));--_selected-pressed-state-layer-color: var(--md-icon-button-selected-pressed-state-layer-color, var(--md-sys-color-primary, #6750a4));--_selected-pressed-state-layer-opacity: var(--md-icon-button-selected-pressed-state-layer-opacity, 0.12);--_state-layer-height: var(--md-icon-button-state-layer-height, 40px);--_state-layer-shape: var(--md-icon-button-state-layer-shape, 9999px);--_state-layer-width: var(--md-icon-button-state-layer-width, 40px);--_focus-icon-color: var(--md-icon-button-focus-icon-color, var(--md-sys-color-on-surface-variant, #49454f));--_hover-icon-color: var(--md-icon-button-hover-icon-color, var(--md-sys-color-on-surface-variant, #49454f));--_hover-state-layer-color: var(--md-icon-button-hover-state-layer-color, var(--md-sys-color-on-surface-variant, #49454f));--_hover-state-layer-opacity: var(--md-icon-button-hover-state-layer-opacity, 0.08);--_icon-color: var(--md-icon-button-icon-color, var(--md-sys-color-on-surface-variant, #49454f));--_pressed-icon-color: var(--md-icon-button-pressed-icon-color, var(--md-sys-color-on-surface-variant, #49454f));--_pressed-state-layer-color: var(--md-icon-button-pressed-state-layer-color, var(--md-sys-color-on-surface-variant, #49454f));--_pressed-state-layer-opacity: var(--md-icon-button-pressed-state-layer-opacity, 0.12);--_container-shape-start-start: 0;--_container-shape-start-end: 0;--_container-shape-end-end: 0;--_container-shape-end-start: 0;--_container-height: 0;--_container-width: 0;height:var(--_state-layer-height);width:var(--_state-layer-width)}:host([touch-target=wrapper]){margin:max(0px,(48px - var(--_state-layer-height))/2) max(0px,(48px - var(--_state-layer-width))/2)}md-focus-ring{--md-focus-ring-shape-start-start: var(--_state-layer-shape);--md-focus-ring-shape-start-end: var(--_state-layer-shape);--md-focus-ring-shape-end-end: var(--_state-layer-shape);--md-focus-ring-shape-end-start: var(--_state-layer-shape)}.standard{background-color:rgba(0,0,0,0);color:var(--_icon-color);--md-ripple-hover-color: var(--_hover-state-layer-color);--md-ripple-hover-opacity: var(--_hover-state-layer-opacity);--md-ripple-pressed-color: var(--_pressed-state-layer-color);--md-ripple-pressed-opacity: var(--_pressed-state-layer-opacity)}.standard:hover{color:var(--_hover-icon-color)}.standard:focus{color:var(--_focus-icon-color)}.standard:active{color:var(--_pressed-icon-color)}.standard:disabled{color:var(--_disabled-icon-color)}md-ripple{border-radius:var(--_state-layer-shape)}.standard:disabled .icon{opacity:var(--_disabled-icon-opacity)}.selected{--md-ripple-hover-color: var(--_selected-hover-state-layer-color);--md-ripple-hover-opacity: var(--_selected-hover-state-layer-opacity);--md-ripple-pressed-color: var(--_selected-pressed-state-layer-color);--md-ripple-pressed-opacity: var(--_selected-pressed-state-layer-opacity)}.selected:not(:disabled){color:var(--_selected-icon-color)}.selected:not(:disabled):hover{color:var(--_selected-hover-icon-color)}.selected:not(:disabled):focus{color:var(--_selected-focus-icon-color)}.selected:not(:disabled):active{color:var(--_selected-pressed-icon-color)}/*# sourceMappingURL=standard-styles.css.map */
`

/**
 * @license
 * Copyright 2021 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */
/**
 * @summary Icon buttons help people take supplementary actions with a single
 * tap.
 *
 * @description
 * __Emphasis:__ Low emphasis – For optional or supplementary actions with the
 * least amount of prominence.
 *
 * __Rationale:__ The most compact and unobtrusive type of button, icon buttons
 * are used for optional supplementary actions such as "Bookmark" or "Star."
 *
 * __Example usages:__
 * - Add to Favorites
 * - Print
 */
let MdIconButton = class MdIconButton extends IconButton {
  getRenderClasses() {
    return {
      ...super.getRenderClasses(),
      standard: true,
    }
  }
}
MdIconButton.styles = [styles$2, styles$1]
MdIconButton = __decorate([t$9('md-icon-button')], MdIconButton)

/**
 * @license
 * Copyright 2022 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */
/**
 * TODO(b/265336902): add docs
 */
class Icon extends s$9 {
  render() {
    return x$1`<slot></slot>`
  }
  connectedCallback() {
    super.connectedCallback()
    const ariaHidden = this.getAttribute('aria-hidden')
    if (ariaHidden === 'false') {
      // Allow the user to set `aria-hidden="false"` to create an icon that is
      // announced by screenreaders.
      this.removeAttribute('aria-hidden')
      return
    }
    // Needed for VoiceOver, which will create a "group" if the element is a
    // sibling to other content.
    this.setAttribute('aria-hidden', 'true')
  }
}

/**
 * @license
 * Copyright 2022 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */
const styles = i$8`:host{font-size:24px;width:24px;height:24px;color:inherit;font-variation-settings:inherit;font-weight:400;font-family:var(--md-icon-font, Material Symbols Outlined);display:inline-flex;font-style:normal;line-height:1;overflow:hidden;letter-spacing:normal;text-transform:none;user-select:none;white-space:nowrap;word-wrap:normal;-webkit-font-smoothing:antialiased;text-rendering:optimizeLegibility;-moz-osx-font-smoothing:grayscale}::slotted(svg){fill:currentColor}::slotted(*){height:100%;width:100%}/*# sourceMappingURL=icon-styles.css.map */
`

/**
 * @license
 * Copyright 2022 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */
/**
 * @final
 * @suppress {visibility}
 */
let MdIcon = class MdIcon extends Icon {}
/** @nocollapse */
MdIcon.styles = [styles]
MdIcon = __decorate([t$9('md-icon')], MdIcon)

let CollapseUi = class CollapseUi extends s$4 {
  constructor() {
    super(...arguments)
    this.service = connectState_1(
      viewerContext,
      this,
      state => state.context.service
    )
  }
  render() {
    return y`
      <md-icon-button @click=${this.toggleUi}>
        <img src="${optimizedSVGDataUri$6}" alt="toggle" class="icon" />
      </md-icon-button>
    `
  }
  toggleUi() {
    this.service.value.send('TOGGLE_UI_COLLAPSED')
  }
}
CollapseUi.styles = i$4`
    .icon {
      width: 100%;
    }
  `
CollapseUi = __decorate([e$7('collapse-ui')], CollapseUi)

function updateDrawer(context) {
  context.drawer.opened = !context.uiCollapsed
  var drawerChild = context.drawer.shadowRoot.children[0]
  if (drawerChild)
    drawerChild.style.width = context.drawer.opened
      ? 'var(--_container-width)'
      : ''
}
function toggleUICollapsed(context, event, actionMeta) {
  if (!context.uiContainer) {
    return
  }
  if (actionMeta) {
    context.uiCollapsed =
      actionMeta.state.value.active.uiCollapsed === 'enabled'
  }
  updateDrawer(context)
  if (!context.uiCollapsed && context.images.selectedName) {
    context.service.send({
      type: 'SELECT_LAYER',
      data: context.images.selectedName,
    })
  }
  if (!context.use2D && !!context.main.planeUIGroup) {
    if (context.uiCollapsed && context.main.viewMode === 'Volume') {
      context.main.planeUIGroup.style.display = 'none'
    } else {
      context.main.planeUIGroup.style.display = 'block'
    }
  }
}

function createInterface(context) {
  setContext(context)
  context.viewContainers = new Map()
  var viewContainer = document.createElement('div')
  viewContainer.className = ''.concat(style.viewContainer)
  context.viewContainers.set('volume', viewContainer)
  var serviceContextProvider = document.createElement('service-context')
  serviceContextProvider.appendChild(viewContainer)
  context.rootContainer.appendChild(serviceContextProvider)
  var viewport = document.createElement('div')
  viewContainer.appendChild(viewport)
  viewport.setAttribute('class', style.viewport)
  var container3d = context.renderingViewContainers.get('volume')
  viewport.appendChild(container3d)
  container3d.style.height = '100%'

  // if somehow already set (by non reference-ui from config obj?)
  if (!context.uiContainer) {
    context.uiContainer = document.createElement('div')
  }
  var sidebar = makeHtml(
    "\n    <div class='"
      .concat(
        style.uiContainer,
        "'>\n      <md-navigation-drawer type=\"dismissible\" id='drawer' class='"
      )
      .concat(
        style.drawer,
        "'></md-navigation-drawer>\n      <collapse-ui class='"
      )
      .concat(style.collapseButton, "'/>\n    </div>\n  ")
  )
  viewport.appendChild(sidebar)
  var drawer = sidebar.querySelector('#drawer')
  context.drawer = drawer
  drawer.appendChild(context.uiContainer)
  context.uiContainer.style.width = 'var(--_container-width)'
  setTimeout(function() {
    // hack to keep scroll bar from squishing uiContainer, because uiContainer width does not get reduces with scroll bar.
    drawer.shadowRoot.children[0].style.overflow = 'visible'
    // sets hacked width of drawer based on context.uiCollapsed
    updateDrawer(context)
  }, 0)
  if (!context.uiGroups) {
    // String to UI group element
    context.uiGroups = new Map()
  }
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
