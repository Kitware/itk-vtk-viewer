import { OpacityMode } from 'vtk.js/Sources/Rendering/Core/VolumeProperty/Constants'

function applyImageColors(context) {
  const name = context.images.selectedName
  const actorContext = context.images.actorContext.get(name)
  const visualizedComponents = actorContext.visualizedComponents

  const sliceActors = context.images.representationProxy.getActors()
  sliceActors.forEach((actor, actorIdx) => {
    const actorProp = actor.getProperty()
    visualizedComponents.forEach((componentIdx, fusedImgIdx) => {
      const lutProxy = actorContext.lookupTableProxies[componentIdx]
      const pwfProxy = actorContext.piecewiseFunctionProxies[componentIdx].slice
      actorProp.setRGBTransferFunction(fusedImgIdx, lutProxy.getLookupTable())
      actorProp.setPiecewiseFunction(
        fusedImgIdx,
        pwfProxy.getPiecewiseFunction()
      )
    })
  })

  const volumeProps = context.images.representationProxy.getVolumes()
  volumeProps.forEach((volume, volIdx) => {
    const volumeProperty = volume.getProperty()
    visualizedComponents.forEach((componentIdx, fusedImgIdx) => {
      const lut = actorContext.lookupTableProxies[componentIdx].getLookupTable()
      const piecewiseFunction = actorContext.piecewiseFunctionProxies[
        componentIdx
      ].volume.getPiecewiseFunction()
      volumeProperty.setRGBTransferFunction(fusedImgIdx, lut)
      volumeProperty.setScalarOpacity(fusedImgIdx, piecewiseFunction)
    })
  })
}

export default applyImageColors
