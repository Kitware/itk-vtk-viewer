import setBackgroundColor from './setBackgroundColor'
import takeScreenshot from './takeScreenshot'
import toggleAnnotations from './toggleAnnotations'
import toggleRotate from './toggleRotate'

const mainRenderingMachineOptions = {
  actions: {
    setBackgroundColor,

    takeScreenshot,

    toggleAnnotations,

    toggleRotate,
  },
}

export default mainRenderingMachineOptions
