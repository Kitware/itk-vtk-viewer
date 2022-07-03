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
#ifndef itkMeshToWASMMeshFilter_hxx
#define itkMeshToWASMMeshFilter_hxx

#include "itkMeshToWASMMeshFilter.h"

#include "itkMeshConvertPixelTraits.h"

#include "itkWASMMapComponentType.h"
#include "itkWASMMapPixelType.h"

#include "rapidjson/document.h"
#include "rapidjson/stringbuffer.h"
#include "rapidjson/writer.h"

namespace itk
{

template <typename TMesh>
MeshToWASMMeshFilter<TMesh>
::MeshToWASMMeshFilter()
{
  this->SetNumberOfRequiredInputs(1);

  typename WASMMeshType::Pointer output = static_cast<WASMMeshType *>(this->MakeOutput(0).GetPointer());
  this->ProcessObject::SetNumberOfRequiredOutputs(1);
  this->ProcessObject::SetNthOutput(0, output.GetPointer());
}

template <typename TMesh>
ProcessObject::DataObjectPointer
MeshToWASMMeshFilter<TMesh>
::MakeOutput(ProcessObject::DataObjectPointerArraySizeType)
{
  return WASMMeshType::New().GetPointer();
}

template <typename TMesh>
ProcessObject::DataObjectPointer
MeshToWASMMeshFilter<TMesh>
::MakeOutput(const ProcessObject::DataObjectIdentifierType &)
{
  return WASMMeshType::New().GetPointer();
}

template <typename TMesh>
auto
MeshToWASMMeshFilter<TMesh>
::GetOutput() -> WASMMeshType *
{
  // we assume that the first output is of the templated type
  return itkDynamicCastInDebugMode<WASMMeshType *>(this->GetPrimaryOutput());
}

template <typename TMesh>
auto
MeshToWASMMeshFilter<TMesh>
::GetOutput() const -> const WASMMeshType *
{
  // we assume that the first output is of the templated type
  return itkDynamicCastInDebugMode<const WASMMeshType *>(this->GetPrimaryOutput());
}

template <typename TMesh>
auto
MeshToWASMMeshFilter<TMesh>
::GetOutput(unsigned int idx) -> WASMMeshType *
{
  auto * out = dynamic_cast<WASMMeshType *>(this->ProcessObject::GetOutput(idx));

  if (out == nullptr && this->ProcessObject::GetOutput(idx) != nullptr)
  {
    itkWarningMacro(<< "Unable to convert output number " << idx << " to type " << typeid(WASMMeshType).name());
  }
  return out;
}

template <typename TMesh>
void
MeshToWASMMeshFilter<TMesh>
::SetInput(const MeshType * input)
{
  // Process object is not const-correct so the const_cast is required here
  this->ProcessObject::SetNthInput(0, const_cast<MeshType *>(input));
}

template <typename TMesh>
void
MeshToWASMMeshFilter<TMesh>
::SetInput(unsigned int index, const MeshType * mesh)
{
  // Process object is not const-correct so the const_cast is required here
  this->ProcessObject::SetNthInput(index, const_cast<MeshType *>(mesh));
}

template <typename TMesh>
const typename MeshToWASMMeshFilter<TMesh>::MeshType *
MeshToWASMMeshFilter<TMesh>
::GetInput()
{
  return itkDynamicCastInDebugMode<const MeshType *>(this->GetPrimaryInput());
}

template <typename TMesh>
const typename MeshToWASMMeshFilter<TMesh>::MeshType *
MeshToWASMMeshFilter<TMesh>
::GetInput(unsigned int idx)
{
  return itkDynamicCastInDebugMode<const TMesh *>(this->ProcessObject::GetInput(idx));
}

template <typename TMesh>
void
MeshToWASMMeshFilter<TMesh>
::GenerateData()
{
  // Get the input and output pointers
  const MeshType * mesh = this->GetInput();
  WASMMeshType * wasmMesh = this->GetOutput();

  wasmMesh->SetMesh(mesh);

  rapidjson::Document document;
  document.SetObject();
  rapidjson::Document::AllocatorType& allocator = document.GetAllocator();

  rapidjson::Value meshType;
  meshType.SetObject();

  constexpr unsigned int dimension = MeshType::PointDimension;
  meshType.AddMember("dimension", rapidjson::Value(dimension).Move(), allocator );

  rapidjson::Value pointComponentType;
  pointComponentType.SetString( wasm::MapComponentType<typename MeshType::CoordRepType>::ComponentString.data(), allocator );
  meshType.AddMember("pointComponentType", pointComponentType.Move(), allocator );

  using PointPixelType = typename TMesh::PixelType;
  using ConvertPointPixelTraits = MeshConvertPixelTraits<PointPixelType>;
  rapidjson::Value pointPixelComponentType;
  pointPixelComponentType.SetString( wasm::MapComponentType<typename ConvertPointPixelTraits::ComponentType>::ComponentString.data(), allocator );
  meshType.AddMember("pointPixelComponentType", pointPixelComponentType.Move(), allocator );

  rapidjson::Value pointPixelType;
  pointPixelType.SetString( wasm::MapPixelType<PointPixelType>::PixelString.data(), allocator );
  meshType.AddMember("pointPixelType", pointPixelType.Move(), allocator );

  meshType.AddMember("pointPixelComponents", rapidjson::Value( ConvertPointPixelTraits::GetNumberOfComponents() ).Move(), allocator );

  rapidjson::Value cellComponentType;
  cellComponentType.SetString( wasm::MapComponentType<typename MeshType::CellIdentifier>::ComponentString.data(),allocator );
  meshType.AddMember("cellComponentType", cellComponentType.Move(), allocator );

  using CellPixelType = typename TMesh::CellPixelType;
  using ConvertCellPixelTraits = MeshConvertPixelTraits<CellPixelType>;
  rapidjson::Value cellPixelComponentType;
  cellPixelComponentType.SetString( wasm::MapComponentType<typename ConvertCellPixelTraits::ComponentType>::ComponentString.data(), allocator );
  meshType.AddMember("cellPixelComponentType", cellPixelComponentType.Move(), allocator );

  rapidjson::Value cellPixelType;
  cellPixelType.SetString( wasm::MapPixelType<CellPixelType>::PixelString.data(), allocator );
  meshType.AddMember("cellPixelType", cellPixelType, allocator );

  meshType.AddMember("cellPixelComponents", rapidjson::Value( ConvertCellPixelTraits::GetNumberOfComponents() ).Move(), allocator );

  document.AddMember( "meshType", meshType.Move(), allocator );

  rapidjson::Value numberOfPoints;
  numberOfPoints.SetInt( mesh->GetNumberOfPoints() );
  document.AddMember( "numberOfPoints", numberOfPoints.Move(), allocator );

  rapidjson::Value numberOfPointPixels;
  if (mesh->GetPointData() == nullptr)
  {
    numberOfPointPixels.SetInt( 0 );
  }
  else
  {
    numberOfPointPixels.SetInt( mesh->GetPointData()->Size() );
  }
  document.AddMember( "numberOfPointPixels", numberOfPointPixels.Move(), allocator );

  rapidjson::Value numberOfCells;
  numberOfCells.SetInt( mesh->GetNumberOfCells() );
  document.AddMember( "numberOfCells", numberOfCells.Move(), allocator );

  rapidjson::Value numberOfCellPixels;
  if (mesh->GetCellData() == nullptr)
  {
    numberOfCellPixels.SetInt( 0 );
  }
  else
  {
    numberOfCellPixels.SetInt( mesh->GetCellData()->Size() );
  }
  document.AddMember( "numberOfCellPixels", numberOfCellPixels.Move(), allocator );

  rapidjson::Value cellBufferSizeMember;
  cellBufferSizeMember.SetInt( wasmMesh->GetCellBuffer()->Size() );
  document.AddMember( "cellBufferSize", cellBufferSizeMember.Move(), allocator );

  const auto pointsAddress = reinterpret_cast< size_t >( &(mesh->GetPoints()->at(0)) );
  std::ostringstream pointsStream;
  pointsStream << "data:application/vnd.itk.address,0:";
  pointsStream << pointsAddress;
  rapidjson::Value pointsString;
  pointsString.SetString( pointsStream.str().c_str(), allocator );
  document.AddMember( "points", pointsString.Move(), allocator );

  size_t cellsAddress = 0;
  if (mesh->GetNumberOfCells() > 0)
  {
    cellsAddress = reinterpret_cast< size_t >( &(wasmMesh->GetCellBuffer()->at(0)) );
  }
  std::ostringstream cellsStream;
  cellsStream << "data:application/vnd.itk.address,0:";
  cellsStream << cellsAddress;
  rapidjson::Value cellsString;
  cellsString.SetString( cellsStream.str().c_str(), allocator );
  document.AddMember( "cells", cellsString.Move(), allocator );

  size_t pointDataAddress = 0;
  if (mesh->GetPointData() != nullptr && mesh->GetPointData()->Size() > 0)
  {
    pointDataAddress = reinterpret_cast< size_t >( &(mesh->GetPointData()->at(0)) );
  }
  std::ostringstream pointDataStream;
  pointDataStream << "data:application/vnd.itk.address,0:";
  pointDataStream << pointDataAddress;
  rapidjson::Value pointDataString;
  pointDataString.SetString( pointDataStream.str().c_str(), allocator );
  document.AddMember( "pointData", pointDataString.Move(), allocator );

  size_t cellDataAddress = 0;
  if (mesh->GetCellData() != nullptr && mesh->GetCellData()->Size() > 0)
  {
    cellDataAddress = reinterpret_cast< size_t >( &(mesh->GetCellData()->at(0)) );
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

  wasmMesh->SetJSON(stringBuffer.GetString());
}

template <typename TMesh>
void
MeshToWASMMeshFilter<TMesh>
::PrintSelf(std::ostream & os, Indent indent) const
{
  Superclass::PrintSelf(os, indent);
}
} // end namespace itk

#endif
