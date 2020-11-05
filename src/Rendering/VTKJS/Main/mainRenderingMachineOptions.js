import setBackgroundColor from './setBackgroundColor'
import setUnits from './setUnits'
import takeScreenshot from './takeScreenshot'
import toggleRotate from './toggleRotate'
import toggleAnnotations from './toggleAnnotations'
import toggleAxes from './toggleAxes'
import toggleInterpolation from './toggleInterpolation'
import toggleBackgroundColor from './toggleBackgroundColor'

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
  },
}

export default mainRenderingMachineOptions
