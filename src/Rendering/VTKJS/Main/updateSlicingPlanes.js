import { computeCroppingPlanesBoundingBox } from './computeRenderedBounds'

const clampSlice = (old, fallback, { min, max }) =>
  Math.max(min, Math.min(max, old ?? fallback))

const updateSlicingPlanes = ({
  main,
  images: { representationProxy },
  service,
}) => {
  if (!representationProxy) return // no image loaded

  const { slicingPlanes, croppingPlanes } = main
  const savedSlicePositions = [
    slicingPlanes.x.position,
    slicingPlanes.y.position,
    slicingPlanes.z.position,
  ]

  const volumeRep = representationProxy
  const xSliceDomain = volumeRep.getPropertyDomainByName('xSlice')
  const ySliceDomain = volumeRep.getPropertyDomainByName('ySlice')
  const zSliceDomain = volumeRep.getPropertyDomainByName('zSlice')

  // copy min max from loaded image data
  Object.assign(slicingPlanes.x, xSliceDomain)
  Object.assign(slicingPlanes.y, ySliceDomain)
  Object.assign(slicingPlanes.z, zSliceDomain)

  const [xMin, xMax, yMin, yMax, zMin, zMax] = computeCroppingPlanesBoundingBox(
    croppingPlanes
  )

  slicingPlanes.x.min = Math.max(xMin, slicingPlanes.x.min)
  slicingPlanes.x.max = Math.min(xMax, slicingPlanes.x.max)
  slicingPlanes.y.max = Math.min(yMax, slicingPlanes.y.max)
  slicingPlanes.y.min = Math.max(yMin, slicingPlanes.y.min)
  slicingPlanes.z.min = Math.max(zMin, slicingPlanes.z.min)
  slicingPlanes.z.max = Math.min(zMax, slicingPlanes.z.max)

  service.send({
    type: 'SLICING_PLANES_CHANGED',
    data: slicingPlanes,
  })

  const xSlice = clampSlice(
    savedSlicePositions?.[0],
    volumeRep.getXSlice(),
    slicingPlanes.x
  )
  service.send({ type: 'X_SLICE_CHANGED', data: xSlice })
  const ySlice = clampSlice(
    savedSlicePositions?.[1],
    volumeRep.getYSlice(),
    slicingPlanes.y
  )
  service.send({ type: 'Y_SLICE_CHANGED', data: ySlice })
  const zSlice = clampSlice(
    savedSlicePositions?.[2],
    volumeRep.getZSlice(),
    slicingPlanes.z
  )
  service.send({ type: 'Z_SLICE_CHANGED', data: zSlice })
}

export default updateSlicingPlanes
