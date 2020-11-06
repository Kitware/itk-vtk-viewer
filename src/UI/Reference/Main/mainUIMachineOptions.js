import createMainInterface from './createMainInterface'
import toggleFullscreen from './toggleFullscreen'
import toggleRotate from './toggleRotate'
import toggleAnnotations from './toggleAnnotations'
import toggleAxes from './toggleAxes'
import toggleInterpolation from './toggleInterpolation'
import toggleBackgroundColor from './toggleBackgroundColor'
import viewModeXPlane from './viewModeXPlane'
import viewModeYPlane from './viewModeYPlane'
import viewModeZPlane from './viewModeZPlane'
import viewModeVolumeRendering from './viewModeVolumeRendering'

const mainUIMachineOptions = {
  actions: {
    createMainInterface,

    toggleAnnotations,

    toggleFullscreen,

    toggleRotate,

    toggleAxes,

    toggleInterpolation,

    toggleBackgroundColor,

    viewModeXPlane,
    viewModeYPlane,
    viewModeZPlane,
    viewModeVolumeRendering,
  },
}

export default mainUIMachineOptions
