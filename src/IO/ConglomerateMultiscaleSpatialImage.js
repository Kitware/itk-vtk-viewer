import MultiscaleSpatialImage, {
  MAX_COMPONENT_COUNT,
} from './MultiscaleSpatialImage'

export class ConglomerateMultiscaleSpatialImage extends MultiscaleSpatialImage {
  constructor(images) {
    const { scaleInfo, imageType } = images.slice(1).reduce(
      (fused, { scaleInfo, imageType }) => ({
        imageType: {
          ...imageType,
          components: Math.min(
            fused.imageType.components + imageType.components,
            MAX_COMPONENT_COUNT
          ),
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

  buildImage(scale) {
    return Promise.all(this.images.map(image => image.scaleLargestImage(scale)))
  }
}
