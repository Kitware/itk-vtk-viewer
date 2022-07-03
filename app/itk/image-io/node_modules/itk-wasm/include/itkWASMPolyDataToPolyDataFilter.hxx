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
#ifndef itkWASMPolyDataToPolyDataFilter_hxx
#define itkWASMPolyDataToPolyDataFilter_hxx

#include "itkWASMPolyDataToPolyDataFilter.h"
#include "itkNumericTraits.h"
#include "itkCommonEnums.h"
#include "itkHexahedronCell.h"
#include "itkLineCell.h"
#include "itkPolygonCell.h"
#include "itkQuadrilateralCell.h"
#include "itkQuadraticEdgeCell.h"
#include "itkQuadraticTriangleCell.h"
#include "itkTetrahedronCell.h"
#include "itkTriangleCell.h"
#include "itkVertexCell.h"

#include <exception>
#include "itkWASMMapComponentType.h"
#include "itkWASMMapPixelType.h"
#include "itkMeshConvertPixelTraits.h"

#include "rapidjson/document.h"

namespace itk
{

template <typename TPolyData>
WASMPolyDataToPolyDataFilter<TPolyData>
::WASMPolyDataToPolyDataFilter()
{
  this->SetNumberOfRequiredInputs(1);

  typename PolyDataType::Pointer output = static_cast<PolyDataType *>(this->MakeOutput(0).GetPointer());
  this->ProcessObject::SetNumberOfRequiredOutputs(1);
  this->ProcessObject::SetNthOutput(0, output.GetPointer());
}

template <typename TPolyData>
ProcessObject::DataObjectPointer
WASMPolyDataToPolyDataFilter<TPolyData>
::MakeOutput(ProcessObject::DataObjectPointerArraySizeType)
{
  return PolyDataType::New().GetPointer();
}

template <typename TPolyData>
ProcessObject::DataObjectPointer
WASMPolyDataToPolyDataFilter<TPolyData>
::MakeOutput(const ProcessObject::DataObjectIdentifierType &)
{
  return PolyDataType::New().GetPointer();
}

template <typename TPolyData>
auto
WASMPolyDataToPolyDataFilter<TPolyData>
::GetOutput() -> PolyDataType *
{
  // we assume that the first output is of the templated type
  return itkDynamicCastInDebugMode<PolyDataType *>(this->GetPrimaryOutput());
}

template <typename TPolyData>
auto
WASMPolyDataToPolyDataFilter<TPolyData>
::GetOutput() const -> const PolyDataType *
{
  // we assume that the first output is of the templated type
  return itkDynamicCastInDebugMode<const PolyDataType *>(this->GetPrimaryOutput());
}

template <typename TPolyData>
auto
WASMPolyDataToPolyDataFilter<TPolyData>
::GetOutput(unsigned int idx) -> PolyDataType *
{
  auto * out = dynamic_cast<PolyDataType *>(this->ProcessObject::GetOutput(idx));

  if (out == nullptr && this->ProcessObject::GetOutput(idx) != nullptr)
  {
    itkWarningMacro(<< "Unable to convert output number " << idx << " to type " << typeid(PolyDataType).name());
  }
  return out;
}

template <typename TPolyData>
void
WASMPolyDataToPolyDataFilter<TPolyData>
::SetInput(const WASMPolyDataType * input)
{
  // Process object is not const-correct so the const_cast is required here
  this->ProcessObject::SetNthInput(0, const_cast<WASMPolyDataType *>(input));
}

template <typename TPolyData>
void
WASMPolyDataToPolyDataFilter<TPolyData>
::SetInput(unsigned int index, const WASMPolyDataType * polyData)
{
  // Process object is not const-correct so the const_cast is required here
  this->ProcessObject::SetNthInput(index, const_cast<WASMPolyDataType *>(polyData));
}

template <typename TPolyData>
const typename WASMPolyDataToPolyDataFilter<TPolyData>::WASMPolyDataType *
WASMPolyDataToPolyDataFilter<TPolyData>
::GetInput()
{
  return itkDynamicCastInDebugMode<const WASMPolyDataType *>(this->GetPrimaryInput());
}

template <typename TPolyData>
const typename WASMPolyDataToPolyDataFilter<TPolyData>::WASMPolyDataType *
WASMPolyDataToPolyDataFilter<TPolyData>
::GetInput(unsigned int idx)
{
  return itkDynamicCastInDebugMode<const TPolyData *>(this->ProcessObject::GetInput(idx));
}

template <typename TPolyData>
void
WASMPolyDataToPolyDataFilter<TPolyData>
::GenerateData()
{
  // Get the input and output pointers
  const WASMPolyDataType * polyDataJSON = this->GetInput();
  const std::string json(polyDataJSON->GetJSON());
  PolyDataType * polyData = this->GetOutput();

  using PointPixelType = typename PolyDataType::PixelType;
  using ConvertPointPixelTraits = MeshConvertPixelTraits<PointPixelType>;
  using CellPixelType = typename PolyDataType::CellPixelType;
  using ConvertCellPixelTraits = MeshConvertPixelTraits<CellPixelType>;

  rapidjson::Document document;
  if (document.Parse(json.c_str()).HasParseError())
    {
    throw std::runtime_error("Could not parse JSON");
    }

  const rapidjson::Value & polyDataType = document["polyDataType"];

  const std::string pointPixelComponentType( polyDataType["pointPixelComponentType"].GetString() );
  if ( pointPixelComponentType != itk::wasm::MapComponentType<typename ConvertPointPixelTraits::ComponentType>::ComponentString )
  {
    throw std::runtime_error("Unexpected point pixel component type");
  }

  const std::string pointPixelType( polyDataType["pointPixelType"].GetString() );
  if ( pointPixelType != itk::wasm::MapPixelType<PointPixelType>::PixelString )
  {
    throw std::runtime_error("Unexpected point pixel type");
  }

  const std::string cellPixelComponentType( polyDataType["cellPixelComponentType"].GetString() );
  if ( cellPixelComponentType != itk::wasm::MapComponentType<typename ConvertCellPixelTraits::ComponentType>::ComponentString )
  {
    throw std::runtime_error("Unexpected cell pixel component type");
  }

  const std::string cellPixelType( polyDataType["cellPixelType"].GetString() );
  if ( cellPixelType != itk::wasm::MapPixelType<CellPixelType>::PixelString )
  {
    throw std::runtime_error("Unexpected cell pixel type");
  }

  const rapidjson::Value & numberOfPointsJson = document["numberOfPoints"];
  const SizeValueType numberOfPoints = numberOfPointsJson.GetInt();
  if (numberOfPoints)
  {
    using PointType = typename PolyDataType::PointType;
    const rapidjson::Value & pointsJson = document["points"];
    const std::string pointsString( pointsJson.GetString() );
    const auto * pointsPtr = reinterpret_cast< PointType * >( std::atol(pointsString.substr(35).c_str()) );
    polyData->GetPoints()->resize(numberOfPoints);
    polyData->GetPoints()->assign(pointsPtr, pointsPtr + numberOfPoints);
  }

  const rapidjson::Value & verticesBufferSizeJson = document["verticesBufferSize"];
  const SizeValueType verticesBufferSize = verticesBufferSizeJson.GetInt();
  if (verticesBufferSize)
  {
    const rapidjson::Value & verticesJson = document["vertices"];
    const std::string verticesString( verticesJson.GetString() );
    auto verticesPtr = reinterpret_cast< uint32_t * >( std::atol(verticesString.substr(35).c_str()) );
    polyData->GetVertices()->resize(verticesBufferSize);
    polyData->GetVertices()->assign(verticesPtr, verticesPtr + verticesBufferSize);
  }

  const rapidjson::Value & linesBufferSizeJson = document["linesBufferSize"];
  const SizeValueType linesBufferSize = linesBufferSizeJson.GetInt();
  if (linesBufferSize)
  {
    const rapidjson::Value & linesJson = document["lines"];
    const std::string linesString( linesJson.GetString() );
    auto linesPtr = reinterpret_cast< uint32_t * >( std::atol(linesString.substr(35).c_str()) );
    polyData->GetLines()->resize(linesBufferSize);
    polyData->GetLines()->assign(linesPtr, linesPtr + linesBufferSize);
  }

  const rapidjson::Value & polygonsBufferSizeJson = document["polygonsBufferSize"];
  const SizeValueType polygonsBufferSize = polygonsBufferSizeJson.GetInt();
  if (polygonsBufferSize)
  {
    const rapidjson::Value & polygonsJson = document["polygons"];
    const std::string polygonsString( polygonsJson.GetString() );
    auto polygonsPtr = reinterpret_cast< uint32_t * >( std::atol(polygonsString.substr(35).c_str()) );
    polyData->GetPolygons()->resize(polygonsBufferSize);
    polyData->GetPolygons()->assign(polygonsPtr, polygonsPtr + polygonsBufferSize);
  }

  const rapidjson::Value & triangleStripsBufferSizeJson = document["triangleStripsBufferSize"];
  const SizeValueType triangleStripsBufferSize = triangleStripsBufferSizeJson.GetInt();
  if (triangleStripsBufferSize)
  {
    const rapidjson::Value & triangleStripsJson = document["triangleStrips"];
    const std::string triangleStripsString( triangleStripsJson.GetString() );
    auto triangleStripsPtr = reinterpret_cast< uint32_t * >( std::atol(triangleStripsString.substr(35).c_str()) );
    polyData->GetTriangleStrips()->resize(triangleStripsBufferSize);
    polyData->GetTriangleStrips()->assign(triangleStripsPtr, triangleStripsPtr + triangleStripsBufferSize);
  }

  const rapidjson::Value & numberOfPointPixelsJson = document["numberOfPointPixels"];
  const SizeValueType numberOfPointPixels = numberOfPointPixelsJson.GetInt();
  if (numberOfPointPixels)
  {
    const rapidjson::Value & pointPixelComponentsJson = polyDataType["pointPixelComponents"];
    const SizeValueType pointPixelComponents = pointPixelComponentsJson.GetInt();
    const rapidjson::Value & pointDataJson = document["pointData"];
    using PointPixelType = typename TPolyData::PixelType;
    using ConvertPointPixelTraits = MeshConvertPixelTraits<PointPixelType>;
    const std::string pointDataString( pointDataJson.GetString() );
    auto pointDataPtr = reinterpret_cast< typename ConvertPointPixelTraits::ComponentType * >( std::atol(pointDataString.substr(35).c_str()) );
    polyData->GetPointData()->resize(numberOfPointPixels * pointPixelComponents);
    polyData->GetPointData()->assign(pointDataPtr, pointDataPtr + numberOfPointPixels * pointPixelComponents);
  }

  const rapidjson::Value & numberOfCellPixelsJson = document["numberOfCellPixels"];
  const SizeValueType numberOfCellPixels = numberOfCellPixelsJson.GetInt();
  if (numberOfCellPixels)
  {
    const rapidjson::Value & cellPixelComponentsJson = polyDataType["cellPixelComponents"];
    const SizeValueType cellPixelComponents = cellPixelComponentsJson.GetInt();
    const rapidjson::Value & cellDataJson = document["cellData"];
    using CellPixelType = typename TPolyData::CellPixelType;
    using ConvertCellPixelTraits = MeshConvertPixelTraits<CellPixelType>;
    const std::string cellDataString( cellDataJson.GetString() );
    auto cellDataPtr = reinterpret_cast< typename ConvertCellPixelTraits::ComponentType * >( std::atol(cellDataString.substr(35).c_str()) );
    if (polyData->GetCellData() == nullptr)
    {
      polyData->SetCellData(PolyDataType::CellDataContainer::New());
    }
    polyData->GetCellData()->resize(numberOfCellPixels * cellPixelComponents);
    polyData->GetCellData()->assign(cellDataPtr, cellDataPtr + numberOfCellPixels * cellPixelComponents);
  }
}

template <typename TPolyData>
void
WASMPolyDataToPolyDataFilter<TPolyData>
::PrintSelf(std::ostream & os, Indent indent) const
{
  Superclass::PrintSelf(os, indent);
}
} // end namespace itk

#endif
