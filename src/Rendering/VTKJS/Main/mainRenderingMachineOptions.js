import setBackgroundColor from './setBackgroundColor'
import setUnits from './setUnits'
import takeScreenshot from './takeScreenshot'
import toggleRotate from './toggleRotate'
import toggleAnnotations from './toggleAnnotations'
import toggleAxes from './toggleAxes'
import toggleCroppingPlanes from './toggleCroppingPlanes'
import resetCroppingPlanes from './resetCroppingPlanes'
import applyCroppingPlanes from './applyCroppingPlanes'
import viewModeXPlane from './viewModeXPlane'
import viewModeYPlane from './viewModeYPlane'
import viewModeZPlane from './viewModeZPlane'
import viewModeVolume from './viewModeVolume'
import resetCamera from './resetCamera'
import applySlicingPlanes from './applySlicingPlanes'
import applyXSlice from './applyXSlice'
import applyYSlice from './applyYSlice'
import applyZSlice from './applyZSlice'
import updateFps from './updateFps'

const mainRenderingMachineOptions = {
  actions: {
    setBackgroundColor,

    setUnits,

    takeScreenshot,

    toggleRotate,

    toggleAnnotations,

    toggleAxes,

    resetCroppingPlanes,
    toggleCroppingPlanes,
    applyCroppingPlanes,

    viewModeXPlane,
    viewModeYPlane,
    viewModeZPlane,
    viewModeVolume,

    resetCamera,

    applySlicingPlanes,
    applyXSlice,
    applyYSlice,
    applyZSlice,

    updateFps,
  },
}

export default mainRenderingMachineOptions
