import numericalSort from '../numericalSort'

function updateFps(context, event) {
  const proxy = context.images.representationProxy
  let mapper = null
  if (proxy) {
    mapper = proxy.getMapper()
    mapper.setAutoAdjustSampleDistances(false)
  }

  const interactor = context.renderWindow.getInteractor()
  const requestId = `updateFps${performance.now().toString()}`

  interactor.requestAnimation(requestId)
  setTimeout(() => {
    interactor.cancelAnimation(requestId)

    const fps = interactor.getRecentAnimationFrameRate()

    if (proxy) {
      mapper.setAutoAdjustSampleDistances(true)
    }

    context.service.send({ type: 'FPS_UPDATED', data: fps })
  }, 1100)
}

export default updateFps
