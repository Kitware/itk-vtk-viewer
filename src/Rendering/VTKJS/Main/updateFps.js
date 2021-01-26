import numericalSort from '../numericalSort'

function updateFps(context, event) {
  const fpsSamples = []
  let t0 = performance.now()
  for (let i = 0; i < 3; i++) {
    context.renderWindow.render()
    const t1 = performance.now()
    fpsSamples.push((1.0 / (t1 - t0)) * 1000)
  }
  fpsSamples.sort(numericalSort)
  console.log('fpsSamples', fpsSamples)
  // Median
  context.fps = fpsSamples[1]

  context.service.send({ type: 'FPS_UPDATED', data: context.fps })
}

export default updateFps
