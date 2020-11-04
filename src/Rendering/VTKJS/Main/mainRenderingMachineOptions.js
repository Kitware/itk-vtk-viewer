import setBackgroundColor from './setBackgroundColor'
import takeScreenshot from './takeScreenshot'
import toggleAnnotations from './toggleAnnotations'

const mainRenderingMachineOptions = {
  actions: {
    setBackgroundColor,

    takeScreenshot,

    toggleAnnotations,
  },
}

export default mainRenderingMachineOptions
