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
#include "itkWASMMeshIOBase.h"

#include "itkWASMMeshIO.h"

#include <sstream>
#include "rapidjson/prettywriter.h"

namespace itk
{

WASMMeshIOBase::WASMMeshIOBase()
{
  this->m_PointsContainer = DataContainerType::New();
  this->m_CellsContainer = DataContainerType::New();
  this->m_PointDataContainer = DataContainerType::New();
  this->m_CellDataContainer = DataContainerType::New();
}

void
WASMMeshIOBase::SetMeshIO(MeshIOBase * meshIO, bool readMesh)
{
  this->m_MeshIOBase = meshIO;
  if (!readMesh)
  {
    return;
  }

  meshIO->ReadMeshInformation();
  auto wasmMeshIO = itk::WASMMeshIO::New();

  const unsigned int dimension = meshIO->GetPointDimension();
  wasmMeshIO->SetPointDimension(dimension);
  wasmMeshIO->SetPointComponentType(meshIO->GetPointComponentType());
  wasmMeshIO->SetPointPixelType(meshIO->GetPointPixelType());
  wasmMeshIO->SetPointPixelComponentType(meshIO->GetPointPixelComponentType());
  wasmMeshIO->SetNumberOfPointPixelComponents(meshIO->GetNumberOfPointPixelComponents());
  wasmMeshIO->SetCellComponentType(meshIO->GetCellComponentType());
  wasmMeshIO->SetCellPixelType(meshIO->GetCellPixelType());
  wasmMeshIO->SetCellPixelComponentType(meshIO->GetCellPixelComponentType());
  wasmMeshIO->SetNumberOfCellPixelComponents(meshIO->GetNumberOfCellPixelComponents());
  wasmMeshIO->SetNumberOfPoints(meshIO->GetNumberOfPoints());
  wasmMeshIO->SetNumberOfPointPixels(meshIO->GetNumberOfPointPixels());
  wasmMeshIO->SetNumberOfCells(meshIO->GetNumberOfCells());
  wasmMeshIO->SetNumberOfCellPixels(meshIO->GetNumberOfCellPixels());
  wasmMeshIO->SetCellBufferSize(meshIO->GetCellBufferSize());

  rapidjson::Document document = wasmMeshIO->GetJSON();
  rapidjson::Document::AllocatorType& allocator = document.GetAllocator();

  size_t pointsAddress = 0;
  SizeValueType numberOfBytes = meshIO->GetNumberOfPoints() * meshIO->GetPointDimension() * WASMMeshIO::ITKComponentSize( meshIO->GetPointComponentType() );
  if (numberOfBytes)
  {
    this->m_PointsContainer->resize( numberOfBytes );
    meshIO->ReadPoints( reinterpret_cast< void * >( &(this->m_PointsContainer->at(0)) ));
    pointsAddress = reinterpret_cast< size_t >( &(this->m_PointsContainer->at(0)) );
  }

  std::ostringstream dataStream;
  dataStream << "data:application/vnd.itk.address,0:";
  dataStream << pointsAddress;
  rapidjson::Value pointsString;
  pointsString.SetString( dataStream.str().c_str(), allocator );
  document.RemoveMember( "points" );
  document.AddMember( "points", pointsString.Move(), allocator );

  numberOfBytes = static_cast< SizeValueType >( meshIO->GetCellBufferSize() * WASMMeshIO::ITKComponentSize( meshIO->GetCellComponentType() ));

  size_t cellsAddress = 0;
  if (numberOfBytes)
  {
    this->m_CellsContainer->resize( numberOfBytes );
    meshIO->ReadCells( reinterpret_cast< void * >( &(this->m_CellsContainer->at(0)) ));
    cellsAddress = reinterpret_cast< size_t >( &(this->m_CellsContainer->at(0)) );
  }

  dataStream.str("");
  dataStream << "data:application/vnd.itk.address,0:";
  dataStream << cellsAddress;
  rapidjson::Value cellsString;
  cellsString.SetString( dataStream.str().c_str(), allocator );
  document.RemoveMember( "cells" );
  document.AddMember( "cells", cellsString.Move(), allocator );

  numberOfBytes =
    static_cast< SizeValueType >( meshIO->GetNumberOfPointPixels() * meshIO->GetNumberOfPointPixelComponents() * WASMMeshIO::ITKComponentSize( meshIO->GetPointPixelComponentType() ));

  size_t pointDataAddress = 0;
  if (numberOfBytes)
  {
    this->m_PointDataContainer->resize( numberOfBytes );
    meshIO->ReadPointData( reinterpret_cast< void * >( &(this->m_PointDataContainer->at(0)) ));
    pointDataAddress = reinterpret_cast< size_t >( &(this->m_PointDataContainer->at(0)) );
  }

  dataStream.str("");
  dataStream << "data:application/vnd.itk.address,0:";
  dataStream << pointDataAddress;
  rapidjson::Value pointDataString;
  pointDataString.SetString( dataStream.str().c_str(), allocator );
  document.RemoveMember( "pointData" );
  document.AddMember( "pointData", pointDataString.Move(), allocator );

  numberOfBytes =
    static_cast< SizeValueType >( meshIO->GetNumberOfCellPixels() * meshIO->GetNumberOfCellPixelComponents() * WASMMeshIO::ITKComponentSize( meshIO->GetCellPixelComponentType() ));

  size_t cellDataAddress = 0;
  if (numberOfBytes)
  {
    this->m_CellDataContainer->resize( numberOfBytes );
    meshIO->ReadCellData( reinterpret_cast< void * >( &(this->m_CellDataContainer->at(0)) ));
    cellDataAddress = reinterpret_cast< size_t >( &(this->m_CellDataContainer->at(0)) );
  }

  dataStream.str("");
  dataStream << "data:application/vnd.itk.address,0:";
  dataStream << cellDataAddress;
  rapidjson::Value cellDataString;
  cellDataString.SetString( dataStream.str().c_str(), allocator );
  document.RemoveMember( "cellData" );
  document.AddMember( "cellData", cellDataString.Move(), allocator );

  rapidjson::StringBuffer stringBuffer;
  rapidjson::Writer< rapidjson::StringBuffer > writer( stringBuffer );
  document.Accept( writer );
  this->SetJSON(stringBuffer.GetString());
}

void
WASMMeshIOBase::PrintSelf(std::ostream & os, Indent indent) const
{
  Superclass::PrintSelf(os, indent);

  os << indent << "PointsContainer";
  if (this->m_PointsContainer->size())
  {
    this->m_PointsContainer->Print(os, indent);
  }
  else
  {
    os << ": (empty)" << std::endl;
  }
  os << indent << "CellsContainer";
  if (this->m_CellsContainer->size())
  {
    this->m_CellsContainer->Print(os, indent);
  }
  else
  {
    os << ": (empty)" << std::endl;
  }
  os << indent << "CellDataContainer";
  if (this->m_PointDataContainer->size())
  {
    this->m_PointDataContainer->Print(os, indent);
  }
  else
  {
    os << ": (empty)" << std::endl;
  }
  os << indent << "PointDataContainer";
  if (this->m_CellDataContainer->size())
  {
    this->m_CellDataContainer->Print(os, indent);
  }
  else
  {
    os << ": (empty)" << std::endl;
  }
}

} // end namespace itk
