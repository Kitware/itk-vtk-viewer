import numericalSort from '../numericalSort'

function updateFps(context, event) {
  const proxy = context.images.representationProxy
  let mapper = null
  let imageSampleDistance = 1.0
  if (proxy) {
    mapper = proxy.getMapper()
    mapper.setAutoAdjustSampleDistances(false)
  }

  const fpsSamples = [-1]
  const interactor = context.renderWindow.getInteractor()
  const requestId = `updateFps${performance.now().toString()}`

  function addSample() {
    const nextFPS = 1.0 / interactor.getLastFrameTime()
    fpsSamples.push(nextFPS)
  }
  const subscription = interactor.onAnimation(addSample)

  interactor.requestAnimation(requestId)
  setTimeout(() => {
    subscription.unsubscribe()
    interactor.cancelAnimation(requestId)

    fpsSamples.sort(numericalSort)
    // Median
    const fps = fpsSamples[Math.ceil(fpsSamples.length / 2.0)]

    if (proxy) {
      mapper.setAutoAdjustSampleDistances(true)
    }

    context.service.send({ type: 'FPS_UPDATED', data: fps })
  }, 200)
}

export default updateFps
