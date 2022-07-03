/*=========================================================================
 *
 *  Copyright NumFOCUS
 *
 *  Licensed under the Apache License, Version 2.0 (the "License");
 *  you may not use this file except in compliance with the License.
 *  You may obtain a copy of the License at
 *
 *         https://www.apache.org/licenses/LICENSE-2.0.txt
 *
 *  Unless required by applicable law or agreed to in writing, software
 *  distributed under the License is distributed on an "AS IS" BASIS,
 *  WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 *  See the License for the specific language governing permissions and
 *  limitations under the License.
 *
 *=========================================================================*/
#ifndef itkSupportInputImageTypes_h
#define itkSupportInputImageTypes_h
#include "itkPipeline.h"
#include "itkWASMPixelTypeFromIOPixelEnum.h"
#include "itkWASMComponentTypeFromIOComponentEnum.h"
#include "itkDefaultConvertPixelTraits.h"
#include "itkWASMMapComponentType.h"
#include "itkWASMMapPixelType.h"

#include "itkImage.h"
#include "itkVectorImage.h"
#include "itkImageIOBase.h"
#include "itkImageIOFactory.h"

namespace itk
{

namespace wasm
{

struct InterfaceImageType
{
  unsigned int dimension{2};
  std::string componentType{"uint8"};
  std::string pixelType{"Scalar"};
  unsigned int components{1};
};

bool lexical_cast(const std::string &input, InterfaceImageType & imageType);

/** \class SupportInputImageTypes
 *
 * \brief Instantiatiate a Pipeline functor over multiple pixel types and dimensions and match to the input image type.
 *
 * Instantiate the PipelineFunctor (function object) over multiple pixel types and image dimensions.
 *  If the input image matches these pixel types or dimensions, use the compile-time optimized pipeline for that image type.
 *  Otherwise, exit the pipeline with an error identifying the unsupported image type.
 *
 * Example usage:
 *
```
template<typename TImage>
class PipelineFunctor
{
public:
  int operator()(itk::wasm::Pipeline & pipeline)
  {
    using ImageType = TImage;

    using InputImageType = itk::wasm::InputImage<ImageType>;
    InputImageType inputImage;
    pipeline.add_option("InputImage", inputImage, "The input image")->required();
```
[...]

```
int
main(int argc, char * argv[])
{
  itk::wasm::Pipeline pipeline("Test supporting multiple input image types", argc, argv);

  // Supports the pixels types uint8_t, float
  // Supports the image dimensions 2, 3
  return itk::wasm::SupportInputImageTypes<PipelineFunctor,
   uint8_t,
   float>
  ::Dimensions<2U,3U>("InputImage", pipeline);
}
```
 *
 * \ingroup WebAssemblyInterface
 */
template<template <typename TImage> class TPipelineFunctor, typename ...TPixels>
class
SupportInputImageTypes
{
public:
  template<unsigned int ...VDimensions>
  static int
  Dimensions(const std::string & inputImageOptionName, Pipeline & pipeline)
  {
    InterfaceImageType imageType;

    const auto iwpArgc = pipeline.GetArgc();
    const auto iwpArgv = pipeline.GetArgv();
    bool passThrough = false;
    for (int ii = 0; ii < iwpArgc; ++ii)
      {
        const std::string arg(iwpArgv[ii]);
        if (arg == "-h" || arg == "--help")
        {
          passThrough = true;
        }
      }
    if (passThrough)
    {
      return IterateDimensions<VDimensions...>(pipeline, imageType, passThrough);
    }

    auto tempOption = pipeline.add_option(inputImageOptionName, imageType, "Read image type.");

    ITK_WASM_PRE_PARSE(pipeline);

    pipeline.remove_option(tempOption);

    return IterateDimensions<VDimensions...>(pipeline, imageType);
  }

private:
  template<unsigned int VDimension, typename TPixel, typename ...TPixelsRest>
  static int
  IteratePixelTypes(Pipeline & pipeline, const InterfaceImageType & imageType, bool passThrough = false)
  {
    constexpr unsigned int Dimension = VDimension;
    using PixelType = TPixel;
    using ConvertPixelTraits = DefaultConvertPixelTraits<PixelType>;

    if (passThrough || imageType.componentType == MapComponentType<typename ConvertPixelTraits::ComponentType>::ComponentString && imageType.pixelType == MapPixelType<PixelType>::PixelString)
    {
      if (imageType.pixelType == "VariableLengthVector" || imageType.pixelType == "VariableSizeMatrix" )
      {
        using ImageType = itk::VectorImage<typename ConvertPixelTraits::ComponentType, Dimension>;

        using PipelineType = TPipelineFunctor<ImageType>;
        return PipelineType()(pipeline);
      }
      else if(passThrough || imageType.components == ConvertPixelTraits::GetNumberOfComponents() )
      {
        using ImageType = Image<PixelType, Dimension>;

        using PipelineType = TPipelineFunctor<ImageType>;
        return PipelineType()(pipeline);
      }
    }

    if constexpr (sizeof...(TPixelsRest) > 0) {
      return IteratePixelTypes<VDimension, TPixelsRest...>(pipeline, imageType);
    }

    std::ostringstream ostrm;
    ostrm << "Unsupported pixel type: " << imageType.pixelType << " with component type: " << imageType.componentType << " and components: " << imageType.components;
    CLI::Error err("Runtime error", ostrm.str(), 1);
    return pipeline.exit(err);
  }

  template<unsigned int VDimension, unsigned int ...VDimensions>
  static int
  IterateDimensions(Pipeline & pipeline, const InterfaceImageType & imageType, bool passThrough = false)
  {
    if (passThrough || VDimension == imageType.dimension)
    {
      return IteratePixelTypes<VDimension, TPixels...>(pipeline, imageType, passThrough);
    }

    if constexpr (sizeof...(VDimensions) > 0) {
      return IterateDimensions<VDimensions...>(pipeline, imageType);
    }

    std::ostringstream ostrm;
    ostrm << "Unsupported image dimension: " << imageType.dimension;
    CLI::Error err("Runtime error", ostrm.str(), 1);
    return pipeline.exit(err);
  }
};

} // end namespace wasm
} // end namespace itk

#endif
