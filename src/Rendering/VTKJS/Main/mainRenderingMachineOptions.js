import setBackgroundColor from './setBackgroundColor'
import setUnits from './setUnits'
import takeScreenshot from './takeScreenshot'
import toggleRotate from './toggleRotate'
import toggleAnnotations from './toggleAnnotations'
import toggleAxes from './toggleAxes'
import toggleInterpolation from './toggleInterpolation'
import toggleBackgroundColor from './toggleBackgroundColor'
import viewModeXPlane from './viewModeXPlane'
import viewModeYPlane from './viewModeYPlane'
import viewModeZPlane from './viewModeZPlane'
import viewModeVolumeRendering from './viewModeVolumeRendering'

const mainRenderingMachineOptions = {
  actions: {
    setBackgroundColor,

    setUnits,

    takeScreenshot,

    toggleRotate,

    toggleAnnotations,

    toggleAxes,

    toggleInterpolation,

    toggleBackgroundColor,

    viewModeXPlane,
    viewModeYPlane,
    viewModeZPlane,
    viewModeVolumeRendering,
  },
}

export default mainRenderingMachineOptions
