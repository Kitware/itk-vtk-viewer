import createMainInterface from './createMainInterface'
import toggleFullscreen from './toggleFullscreen'
import toggleRotate from './toggleRotate'
import toggleAnnotations from './toggleAnnotations'
import toggleAxes from './toggleAxes'
import toggleBackgroundColor from './toggleBackgroundColor'
import toggleCroppingPlanes from './toggleCroppingPlanes'
import viewModeXPlane from './viewModeXPlane'
import viewModeYPlane from './viewModeYPlane'
import viewModeZPlane from './viewModeZPlane'
import viewModeVolume from './viewModeVolume'
import applySlicingPlanes from './applySlicingPlanes'
import applyXSlice from './applyXSlice'
import applyYSlice from './applyYSlice'
import applyZSlice from './applyZSlice'

const mainUIMachineOptions = {
  actions: {
    createMainInterface,

    toggleAnnotations,

    toggleFullscreen,

    toggleRotate,

    toggleAxes,

    toggleBackgroundColor,

    toggleCroppingPlanes,

    viewModeXPlane,
    viewModeYPlane,
    viewModeZPlane,
    viewModeVolume,

    applySlicingPlanes,
    applyXSlice,
    applyYSlice,
    applyZSlice,
  },
}

export default mainUIMachineOptions
