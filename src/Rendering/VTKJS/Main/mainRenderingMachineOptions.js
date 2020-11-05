import setBackgroundColor from './setBackgroundColor'
import takeScreenshot from './takeScreenshot'
import toggleRotate from './toggleRotate'
import toggleAnnotations from './toggleAnnotations'
import toggleAxes from './toggleAxes'
import toggleInterpolation from './toggleInterpolation'

const mainRenderingMachineOptions = {
  actions: {
    setBackgroundColor,

    takeScreenshot,

    toggleRotate,

    toggleAnnotations,

    toggleAxes,

    toggleInterpolation,
  },
}

export default mainRenderingMachineOptions
