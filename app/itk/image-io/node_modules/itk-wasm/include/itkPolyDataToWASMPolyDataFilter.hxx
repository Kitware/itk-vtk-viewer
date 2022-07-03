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
#ifndef itkPolyDataToWASMPolyDataFilter_hxx
#define itkPolyDataToWASMPolyDataFilter_hxx

#include "itkPolyDataToWASMPolyDataFilter.h"

#include "itkMeshConvertPixelTraits.h"

#include "itkWASMMapComponentType.h"
#include "itkWASMMapPixelType.h"

#include "rapidjson/document.h"
#include "rapidjson/stringbuffer.h"
#include "rapidjson/writer.h"

namespace itk
{

template <typename TPolyData>
PolyDataToWASMPolyDataFilter<TPolyData>
::PolyDataToWASMPolyDataFilter()
{
  this->SetNumberOfRequiredInputs(1);

  typename WASMPolyDataType::Pointer output = static_cast<WASMPolyDataType *>(this->MakeOutput(0).GetPointer());
  this->ProcessObject::SetNumberOfRequiredOutputs(1);
  this->ProcessObject::SetNthOutput(0, output.GetPointer());
}

template <typename TPolyData>
ProcessObject::DataObjectPointer
PolyDataToWASMPolyDataFilter<TPolyData>
::MakeOutput(ProcessObject::DataObjectPointerArraySizeType)
{
  return WASMPolyDataType::New().GetPointer();
}

template <typename TPolyData>
ProcessObject::DataObjectPointer
PolyDataToWASMPolyDataFilter<TPolyData>
::MakeOutput(const ProcessObject::DataObjectIdentifierType &)
{
  return WASMPolyDataType::New().GetPointer();
}

template <typename TPolyData>
auto
PolyDataToWASMPolyDataFilter<TPolyData>
::GetOutput() -> WASMPolyDataType *
{
  // we assume that the first output is of the templated type
  return itkDynamicCastInDebugMode<WASMPolyDataType *>(this->GetPrimaryOutput());
}

template <typename TPolyData>
auto
PolyDataToWASMPolyDataFilter<TPolyData>
::GetOutput() const -> const WASMPolyDataType *
{
  // we assume that the first output is of the templated type
  return itkDynamicCastInDebugMode<const WASMPolyDataType *>(this->GetPrimaryOutput());
}

template <typename TPolyData>
auto
PolyDataToWASMPolyDataFilter<TPolyData>
::GetOutput(unsigned int idx) -> WASMPolyDataType *
{
  auto * out = dynamic_cast<WASMPolyDataType *>(this->ProcessObject::GetOutput(idx));

  if (out == nullptr && this->ProcessObject::GetOutput(idx) != nullptr)
  {
    itkWarningMacro(<< "Unable to convert output number " << idx << " to type " << typeid(WASMPolyDataType).name());
  }
  return out;
}

template <typename TPolyData>
void
PolyDataToWASMPolyDataFilter<TPolyData>
::SetInput(const PolyDataType * input)
{
  // Process object is not const-correct so the const_cast is required here
  this->ProcessObject::SetNthInput(0, const_cast<PolyDataType *>(input));
}

template <typename TPolyData>
void
PolyDataToWASMPolyDataFilter<TPolyData>
::SetInput(unsigned int index, const PolyDataType * polyData)
{
  // Process object is not const-correct so the const_cast is required here
  this->ProcessObject::SetNthInput(index, const_cast<PolyDataType *>(polyData));
}

template <typename TPolyData>
const typename PolyDataToWASMPolyDataFilter<TPolyData>::PolyDataType *
PolyDataToWASMPolyDataFilter<TPolyData>
::GetInput()
{
  return itkDynamicCastInDebugMode<const PolyDataType *>(this->GetPrimaryInput());
}

template <typename TPolyData>
const typename PolyDataToWASMPolyDataFilter<TPolyData>::PolyDataType *
PolyDataToWASMPolyDataFilter<TPolyData>
::GetInput(unsigned int idx)
{
  return itkDynamicCastInDebugMode<const TPolyData *>(this->ProcessObject::GetInput(idx));
}

template <typename TPolyData>
void
PolyDataToWASMPolyDataFilter<TPolyData>
::GenerateData()
{
  // Get the input and output pointers
  const PolyDataType * polyData = this->GetInput();
  WASMPolyDataType * wasmPolyData = this->GetOutput();

  wasmPolyData->SetPolyData(polyData);

  rapidjson::Document document;
  document.SetObject();
  rapidjson::Document::AllocatorType& allocator = document.GetAllocator();

  rapidjson::Value polyDataType;
  polyDataType.SetObject();

  using PointPixelType = typename TPolyData::PixelType;
  using ConvertPointPixelTraits = MeshConvertPixelTraits<PointPixelType>;
  rapidjson::Value pointPixelComponentType;
  pointPixelComponentType.SetString( wasm::MapComponentType<typename ConvertPointPixelTraits::ComponentType>::ComponentString.data(), allocator );
  polyDataType.AddMember("pointPixelComponentType", pointPixelComponentType.Move(), allocator );

  rapidjson::Value pointPixelType;
  pointPixelType.SetString( wasm::MapPixelType<PointPixelType>::PixelString.data(), allocator );
  polyDataType.AddMember("pointPixelType", pointPixelType.Move(), allocator );

  polyDataType.AddMember("pointPixelComponents", rapidjson::Value( ConvertPointPixelTraits::GetNumberOfComponents() ).Move(), allocator );

  using CellPixelType = typename TPolyData::CellPixelType;
  using ConvertCellPixelTraits = MeshConvertPixelTraits<CellPixelType>;
  rapidjson::Value cellPixelComponentType;
  cellPixelComponentType.SetString( wasm::MapComponentType<typename ConvertCellPixelTraits::ComponentType>::ComponentString.data(), allocator );
  polyDataType.AddMember("cellPixelComponentType", cellPixelComponentType.Move(), allocator );

  rapidjson::Value cellPixelType;
  cellPixelType.SetString( wasm::MapPixelType<CellPixelType>::PixelString.data(), allocator );
  polyDataType.AddMember("cellPixelType", cellPixelType, allocator );

  polyDataType.AddMember("cellPixelComponents", rapidjson::Value( ConvertCellPixelTraits::GetNumberOfComponents() ).Move(), allocator );

  document.AddMember( "polyDataType", polyDataType.Move(), allocator );

  rapidjson::Value numberOfPoints;
  numberOfPoints.SetInt( polyData->GetNumberOfPoints() );
  document.AddMember( "numberOfPoints", numberOfPoints.Move(), allocator );

  rapidjson::Value verticesBufferSize;
  if (polyData->GetPointData() == nullptr)
  {
    verticesBufferSize.SetInt( 0 );
  }
  else
  {
    verticesBufferSize.SetInt( polyData->GetVertices()->Size() );
  }
  document.AddMember( "verticesBufferSize", verticesBufferSize.Move(), allocator );

  rapidjson::Value linesBufferSize;
  if (polyData->GetPointData() == nullptr)
  {
    linesBufferSize.SetInt( 0 );
  }
  else
  {
    linesBufferSize.SetInt( polyData->GetLines()->Size() );
  }
  document.AddMember( "linesBufferSize", linesBufferSize.Move(), allocator );

  rapidjson::Value polygonsBufferSize;
  if (polyData->GetPointData() == nullptr)
  {
    polygonsBufferSize.SetInt( 0 );
  }
  else
  {
    polygonsBufferSize.SetInt( polyData->GetPolygons()->Size() );
  }
  document.AddMember( "polygonsBufferSize", polygonsBufferSize.Move(), allocator );

  rapidjson::Value triangleStripsBufferSize;
  if (polyData->GetPointData() == nullptr)
  {
    triangleStripsBufferSize.SetInt( 0 );
  }
  else
  {
    triangleStripsBufferSize.SetInt( polyData->GetTriangleStrips()->Size() );
  }
  document.AddMember( "triangleStripsBufferSize", triangleStripsBufferSize.Move(), allocator );

  rapidjson::Value numberOfPointPixels;
  if (polyData->GetPointData() == nullptr)
  {
    numberOfPointPixels.SetInt( 0 );
  }
  else
  {
    numberOfPointPixels.SetInt( polyData->GetPointData()->Size() );
  }
  document.AddMember( "numberOfPointPixels", numberOfPointPixels.Move(), allocator );

  rapidjson::Value numberOfCellPixels;
  if (polyData->GetCellData() == nullptr)
  {
    numberOfCellPixels.SetInt( 0 );
  }
  else
  {
    numberOfCellPixels.SetInt( polyData->GetCellData()->Size() );
  }
  document.AddMember( "numberOfCellPixels", numberOfCellPixels.Move(), allocator );

  size_t pointsAddress = 0;
  if (polyData->GetNumberOfPoints())
  {
    pointsAddress = reinterpret_cast< size_t >( &(polyData->GetPoints()->at(0)) );
  }
  std::ostringstream pointsStream;
  pointsStream << "data:application/vnd.itk.address,0:";
  pointsStream << pointsAddress;
  rapidjson::Value pointsString;
  pointsString.SetString( pointsStream.str().c_str(), allocator );
  document.AddMember( "points", pointsString.Move(), allocator );

  size_t verticesAddress = 0;
  if (polyData->GetVertices() != nullptr && polyData->GetVertices()->Size() > 0)
  {
    verticesAddress = reinterpret_cast< size_t >( &(polyData->GetVertices()->at(0)) );
  }
  std::ostringstream verticesStream;
  verticesStream << "data:application/vnd.itk.address,0:";
  verticesStream << verticesAddress;
  rapidjson::Value verticesString;
  verticesString.SetString( verticesStream.str().c_str(), allocator );
  document.AddMember( "vertices", verticesString.Move(), allocator );

  size_t linesAddress = 0;
  if (polyData->GetLines() != nullptr && polyData->GetLines()->Size() > 0)
  {
    linesAddress = reinterpret_cast< size_t >( &(polyData->GetLines()->at(0)) );
  }
  std::ostringstream linesStream;
  linesStream << "data:application/vnd.itk.address,0:";
  linesStream << linesAddress;
  rapidjson::Value linesString;
  linesString.SetString( linesStream.str().c_str(), allocator );
  document.AddMember( "lines", linesString.Move(), allocator );

  size_t polygonsAddress = 0;
  if (polyData->GetPolygons() != nullptr && polyData->GetPolygons()->Size() > 0)
  {
    polygonsAddress = reinterpret_cast< size_t >( &(polyData->GetPolygons()->at(0)) );
  }
  std::ostringstream polygonsStream;
  polygonsStream << "data:application/vnd.itk.address,0:";
  polygonsStream << polygonsAddress;
  rapidjson::Value polygonsString;
  polygonsString.SetString( polygonsStream.str().c_str(), allocator );
  document.AddMember( "polygons", polygonsString.Move(), allocator );

  size_t triangleStripsAddress = 0;
  if (polyData->GetTriangleStrips() != nullptr && polyData->GetTriangleStrips()->Size() > 0)
  {
    triangleStripsAddress = reinterpret_cast< size_t >( &(polyData->GetTriangleStrips()->at(0)) );
  }
  std::ostringstream triangleStripsStream;
  triangleStripsStream << "data:application/vnd.itk.address,0:";
  triangleStripsStream << triangleStripsAddress;
  rapidjson::Value triangleStripsString;
  triangleStripsString.SetString( triangleStripsStream.str().c_str(), allocator );
  document.AddMember( "triangleStrips", triangleStripsString.Move(), allocator );

  size_t pointDataAddress = 0;
  if (polyData->GetPointData() != nullptr && polyData->GetPointData()->Size() > 0)
  {
    pointDataAddress = reinterpret_cast< size_t >( &(polyData->GetPointData()->at(0)) );
  }
  std::ostringstream pointDataStream;
  pointDataStream << "data:application/vnd.itk.address,0:";
  pointDataStream << pointDataAddress;
  rapidjson::Value pointDataString;
  pointDataString.SetString( pointDataStream.str().c_str(), allocator );
  document.AddMember( "pointData", pointDataString.Move(), allocator );

  size_t cellDataAddress = 0;
  if (polyData->GetCellData() != nullptr && polyData->GetCellData()->Size() > 0)
  {
    cellDataAddress = reinterpret_cast< size_t >( &(polyData->GetCellData()->at(0)) );
  }
  std::ostringstream cellDataStream;
  cellDataStream <<  "data:application/vnd.itk.address,0:";
  cellDataStream << cellDataAddress;
  rapidjson::Value cellDataString;
  cellDataString.SetString( cellDataStream.str().c_str(), allocator );
  document.AddMember( "cellData", cellDataString.Move(), allocator );

  rapidjson::StringBuffer stringBuffer;
  rapidjson::Writer<rapidjson::StringBuffer> writer(stringBuffer);
  document.Accept(writer);

  wasmPolyData->SetJSON(stringBuffer.GetString());
}

template <typename TPolyData>
void
PolyDataToWASMPolyDataFilter<TPolyData>
::PrintSelf(std::ostream & os, Indent indent) const
{
  Superclass::PrintSelf(os, indent);
}
} // end namespace itk

#endif
