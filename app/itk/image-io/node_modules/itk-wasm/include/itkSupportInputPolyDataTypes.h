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
#ifndef itkSupportInputPolyDataTypes_h
#define itkSupportInputPolyDataTypes_h
#include "itkPipeline.h"
#include "itkWASMPixelTypeFromIOPixelEnum.h"
#include "itkWASMComponentTypeFromIOComponentEnum.h"
#include "itkMeshConvertPixelTraits.h"
#include "itkWASMMapComponentType.h"
#include "itkWASMMapPixelType.h"

#include "itkPolyData.h"
#include "itkMeshIOBase.h"
#include "itkMeshIOFactory.h"

namespace itk
{

namespace wasm
{

struct InterfacePolyDataType
{
  std::string componentType{"uint8"};
  std::string pixelType{"Scalar"};
  unsigned int components{1};
};

bool lexical_cast(const std::string &input, InterfacePolyDataType & polyDataType);

/** \class SupportInputPolyDataTypes
 *
 * \brief Instantiatiate a Pipeline functor over multiple pixel types and match to the input polydata type.
 *
 *  Instantiate the PipelineFunctor (function object) over multiple polydata pixel types.
 *  If the input polydata matches these pixel types, use the compile-time optimized pipeline for that polydata type.
 *  Otherwise, exit the pipeline with an error identifying the unsupported polydata type.
 *
 * Example usage:
 *
```
template<typename TPolyData>
class PipelineFunctor
{
public:
  int operator()(itk::wasm::Pipeline & pipeline)
  {
    using PolyDataType = TPolyData;

    using InputPolyDataType = itk::wasm::InputPolyData<PolyDataType>;
    InputPolyDataType inputPolyData;
    pipeline.add_option("InputPolyData", inputPolyData, "The input polydata")->required();
```
[...]

```
int
main(int argc, char * argv[])
{
  itk::wasm::Pipeline pipeline("Test supporting multiple input polydata types", argc, argv);

  // Supports the pixels types uint8_t, float
  return itk::wasm::SupportInputPolyDataTypes<PipelineFunctor>
  ::PixelTypes<uint8_t, float>("InputPolyData", pipeline);
}
```
 * It is assumed that the cell and point data will have the same pixel type.
 *
 * The number of pixel components is taken from the point pixel data. If there are 0 point pixel data components,
 * the cell pixel data components are queried.
 *
 * \ingroup WebAssemblyInterface
 */
template<template <typename TPolyData> class TPipelineFunctor>
class
SupportInputPolyDataTypes
{
public:
  template<typename ...TPixels>
  static int
  PixelTypes(const std::string & inputPolyDataOptionName, Pipeline & pipeline)
  {
    InterfacePolyDataType polyDataType;
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
      return IteratePixelTypes<TPixels...>(pipeline, polyDataType, passThrough);
    }

    auto tempOption = pipeline.add_option(inputPolyDataOptionName, polyDataType, "Read PolyData type.");

    ITK_WASM_PRE_PARSE(pipeline);

    pipeline.remove_option(tempOption);

    return IteratePixelTypes<TPixels...>(pipeline, polyDataType);
  }

private:
  template<typename TPixel, typename ...TPixelsRest>
  static int
  IteratePixelTypes(Pipeline & pipeline, const InterfacePolyDataType & polyDataType, bool passThrough = false)
  {
    using PixelType = TPixel;
    using ConvertPixelTraits = MeshConvertPixelTraits<PixelType>;

    if (passThrough || polyDataType.components == 0
     || polyDataType.componentType == MapComponentType<typename ConvertPixelTraits::ComponentType>::ComponentString
     && polyDataType.pixelType == MapPixelType<PixelType>::PixelString)
    {
      if (polyDataType.pixelType == "VariableLengthVector" || polyDataType.pixelType == "VariableSizeMatrix" )
      {
        // todo: VectorMesh support for ImportMeshFilter?
        // using MeshType = itk::VectorMesh<typename ConvertPixelTraits::ComponentType, Dimension>;

        // using PipelineType = TPipelineFunctor<MeshType>;
        // return PipelineType()(pipeline);
      }
      else if(passThrough || polyDataType.components == ConvertPixelTraits::GetNumberOfComponents() || polyDataType.components == 0 )
      {
        using PolyDataType = PolyData<PixelType>;

        using PipelineType = TPipelineFunctor<PolyDataType>;
        return PipelineType()(pipeline);
      }
    }

    if constexpr (sizeof...(TPixelsRest) > 0) {
      return IteratePixelTypes<TPixelsRest...>(pipeline, polyDataType);
    }

    std::ostringstream ostrm;
    ostrm << "Unsupported pixel type: " << polyDataType.pixelType << " with component type: " << polyDataType.componentType << " and components: " << polyDataType.components;
    CLI::Error err("Runtime error", ostrm.str(), 1);
    return pipeline.exit(err);
  }
};

} // end namespace wasm
} // end namespace itk

#endif
