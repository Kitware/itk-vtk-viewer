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

  async getImage(scale, worldBounds = []) {
    this.worldBoundsForBuildImage = worldBounds
    return super.getImage(scale, worldBounds)
  }

  async buildImage(scale /*bounds*/) {
    // Run sequentially rather than Promise.all to avoid hang during chunk fetching
    const builtImages = []
    for (const image of this.images) {
      builtImages.push(
        await image.getImage(scale, this.worldBoundsForBuildImage)
      )
    }
    return builtImages
  }
}
