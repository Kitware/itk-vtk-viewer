import MultiscaleSpatialImage, {
  MAX_COMPONENT_COUNT,
} from './MultiscaleSpatialImage'

const sum = (a, b) => a + b

const countComponents = images =>
  images.map(image => image.imageType.components).reduce(sum)

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

  async buildImage(scale) {
    const scaleImages = await Promise.all(
      this.images.map(image => image.scaleLargestImage(scale))
    )

    const componentCount = Math.min(
      countComponents(this.images),
      MAX_COMPONENT_COUNT
    )

    const elementCount = scaleImages.map(({ data }) => data.length).reduce(sum)
    // Avoid losing data if types are different
    const largestType = scaleImages
      .map(({ data }) => data)
      .reduce((lastType, typedArray) =>
        lastType.BYTES_PER_ELEMENT >= typedArray.BYTES_PER_ELEMENT
          ? lastType
          : typedArray
      )
    const fusedData = new largestType.constructor(elementCount)

    // array of all image components
    const fuseStruct = scaleImages
      .flatMap(
        ({ data: srcData, imageType: { components: srcComponentCount } }) =>
          // pull each component from image
          [...Array(srcComponentCount).keys()].map(fromComponent => ({
            fromComponent,
            srcData,
            srcComponentCount,
          }))
      )
      .map((compStruct, toComponent) => ({ ...compStruct, toComponent }))
      .slice(0, MAX_COMPONENT_COUNT)

    const tupleCount = elementCount / fuseStruct.length
    for (let tuple = 0; tuple < tupleCount; tuple++) {
      for (let cIdx = 0; cIdx < fuseStruct.length; cIdx++) {
        const {
          srcData,
          srcComponentCount,
          fromComponent,
          toComponent,
        } = fuseStruct[cIdx]
        fusedData[tuple * componentCount + toComponent] =
          srcData[tuple * srcComponentCount + fromComponent]
      }
    }

    const base = scaleImages[0]
    return {
      ...base,
      data: fusedData,
      imageType: {
        ...base.imageType,
        components: componentCount,
      },
    }
  }
}
