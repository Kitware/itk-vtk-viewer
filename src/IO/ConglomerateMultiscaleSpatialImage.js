import MultiscaleSpatialImage from './MultiscaleSpatialImage'

export class ConglomerateMultiscaleSpatialImage extends MultiscaleSpatialImage {
  constructor(images) {
    const { scaleInfo, imageType } = images.slice(1).reduce(
      (fused, { scaleInfo, imageType }) => ({
        imageType: {
          ...imageType,
          components: fused.imageType.components + imageType.components,
        },
        scaleInfo: fused.scaleInfo.map((scale, scaleIdx) => ({
          ...scale,
          ranges: scale.ranges
            ? [...scale.ranges, ...scaleInfo[scaleIdx].ranges]
            : scale.ranges, // ranges may be undefined
        })),
      }),
      images[0]
    )
    super(scaleInfo, imageType)
    this.images = images
  }

  buildImage(scale, bounds) {
    return Promise.all(
      this.images.map(image => image.buildImage(scale, bounds))
    )
  }
}
