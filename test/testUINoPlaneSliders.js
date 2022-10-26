import './customElementsDefineOverride.js'
import referenceUIMachineOptions from '../src/UI/reference-ui/src/referenceUIMachineOptions.js'

import style from '../src/UI/reference-ui/src/ItkVtkViewer.module.css'

import createScreenshotButton from '../src/UI/reference-ui/src/Main/createScreenshotButton.js'
import createFullscreenButton from '../src/UI/reference-ui/src/Main/createFullscreenButton.js'
import createRotateButton from '../src/UI/reference-ui/src/Main/createRotateButton.js'
import createAnnotationsButton from '../src/UI/reference-ui/src/Main/createAnnotationsButton.js'
import createAxesButton from '../src/UI/reference-ui/src/Main/createAxesButton.js'
import createViewPlanesToggle from '../src/UI/reference-ui/src/Main/createViewPlanesToggle.js'
import createPlaneSliders from '../src/UI/reference-ui/src/Main/createPlaneSliders.js'
import createBackgroundColorButton from '../src/UI/reference-ui/src/Main/createBackgroundColorButton.js'
import createCroppingButtons from '../src/UI/reference-ui/src/Main/createCroppingButtons.js'
import createViewModeButtons from '../src/UI/reference-ui/src/Main/createViewModeButtons.js'
import createResetCameraButton from '../src/UI/reference-ui/src/Main/createResetCameraButton.js'

function modifiedCreateMainInterface(context) {
  const mainUIGroup = document.createElement('div')
  mainUIGroup.setAttribute('class', style.uiGroup)
  context.uiGroups.set('main', mainUIGroup)

  const mainUIRow1 = document.createElement('div')
  mainUIRow1.setAttribute('class', style.mainUIRow)
  mainUIGroup.appendChild(mainUIRow1)

  createScreenshotButton(context, mainUIRow1)
  // Leave out the fullscreen button
  //createFullscreenButton(context, mainUIRow1)
  //if (!context.use2D) {
  //createRotateButton(context, mainUIRow1)
  //}
  //createAnnotationsButton(context, mainUIRow1)
  createAxesButton(context, mainUIRow1)
  createViewPlanesToggle(context, mainUIRow1)
  // Leave out the plane sliders
  // createPlaneSliders(context)

  createBackgroundColorButton(context, mainUIRow1)
  const mainUIRow2 = document.createElement('div')
  mainUIRow2.setAttribute('class', style.mainUIRow)

  if (context.use2D) {
    createCroppingButtons(context, mainUIRow1)
    createViewModeButtons(context, mainUIRow2)
    createResetCameraButton(context, mainUIRow1)
  } else {
    createCroppingButtons(context, mainUIRow2)
    createViewModeButtons(context, mainUIRow2)
    createResetCameraButton(context, mainUIRow2)
    mainUIGroup.appendChild(mainUIRow2)
  }

  context.uiContainer.appendChild(mainUIGroup)
}

const uiMachineOptions = { ...referenceUIMachineOptions }
const testUIMainActions = { ...uiMachineOptions.main.actions }
testUIMainActions.createMainInterface = modifiedCreateMainInterface

const testUIMain = { ...uiMachineOptions.main }
testUIMain.actions = testUIMainActions
uiMachineOptions.main = testUIMain

export default uiMachineOptions
