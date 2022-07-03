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
#ifndef itkWASMMeshToMeshFilter_hxx
#define itkWASMMeshToMeshFilter_hxx

#include "itkWASMMeshToMeshFilter.h"
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

template <typename TMesh>
WASMMeshToMeshFilter<TMesh>
::WASMMeshToMeshFilter()
{
  this->SetNumberOfRequiredInputs(1);

  typename MeshType::Pointer output = static_cast<MeshType *>(this->MakeOutput(0).GetPointer());
  this->ProcessObject::SetNumberOfRequiredOutputs(1);
  this->ProcessObject::SetNthOutput(0, output.GetPointer());
}

template <typename TMesh>
ProcessObject::DataObjectPointer
WASMMeshToMeshFilter<TMesh>
::MakeOutput(ProcessObject::DataObjectPointerArraySizeType)
{
  return MeshType::New().GetPointer();
}

template <typename TMesh>
ProcessObject::DataObjectPointer
WASMMeshToMeshFilter<TMesh>
::MakeOutput(const ProcessObject::DataObjectIdentifierType &)
{
  return MeshType::New().GetPointer();
}

template <typename TMesh>
auto
WASMMeshToMeshFilter<TMesh>
::GetOutput() -> MeshType *
{
  // we assume that the first output is of the templated type
  return itkDynamicCastInDebugMode<MeshType *>(this->GetPrimaryOutput());
}

template <typename TMesh>
auto
WASMMeshToMeshFilter<TMesh>
::GetOutput() const -> const MeshType *
{
  // we assume that the first output is of the templated type
  return itkDynamicCastInDebugMode<const MeshType *>(this->GetPrimaryOutput());
}

template <typename TMesh>
auto
WASMMeshToMeshFilter<TMesh>
::GetOutput(unsigned int idx) -> MeshType *
{
  auto * out = dynamic_cast<MeshType *>(this->ProcessObject::GetOutput(idx));

  if (out == nullptr && this->ProcessObject::GetOutput(idx) != nullptr)
  {
    itkWarningMacro(<< "Unable to convert output number " << idx << " to type " << typeid(MeshType).name());
  }
  return out;
}

template <typename TMesh>
void
WASMMeshToMeshFilter<TMesh>
::SetInput(const WASMMeshType * input)
{
  // Process object is not const-correct so the const_cast is required here
  this->ProcessObject::SetNthInput(0, const_cast<WASMMeshType *>(input));
}

template <typename TMesh>
void
WASMMeshToMeshFilter<TMesh>
::SetInput(unsigned int index, const WASMMeshType * mesh)
{
  // Process object is not const-correct so the const_cast is required here
  this->ProcessObject::SetNthInput(index, const_cast<WASMMeshType *>(mesh));
}

template <typename TMesh>
const typename WASMMeshToMeshFilter<TMesh>::WASMMeshType *
WASMMeshToMeshFilter<TMesh>
::GetInput()
{
  return itkDynamicCastInDebugMode<const WASMMeshType *>(this->GetPrimaryInput());
}

template <typename TMesh>
const typename WASMMeshToMeshFilter<TMesh>::WASMMeshType *
WASMMeshToMeshFilter<TMesh>
::GetInput(unsigned int idx)
{
  return itkDynamicCastInDebugMode<const TMesh *>(this->ProcessObject::GetInput(idx));
}

template <typename TMesh>
void
WASMMeshToMeshFilter<TMesh>
::GenerateData()
{
  // Get the input and output pointers
  const WASMMeshType * meshJSON = this->GetInput();
  const std::string json(meshJSON->GetJSON());
  MeshType * mesh = this->GetOutput();

  using PointPixelType = typename MeshType::PixelType;
  using ConvertPointPixelTraits = MeshConvertPixelTraits<PointPixelType>;
  using CellPixelType = typename MeshType::CellPixelType;
  using ConvertCellPixelTraits = MeshConvertPixelTraits<CellPixelType>;

  rapidjson::Document document;
  if (document.Parse(json.c_str()).HasParseError())
    {
    throw std::runtime_error("Could not parse JSON");
    }

  const rapidjson::Value & meshType = document["meshType"];

  const rapidjson::Value & numberOfPointsJson = document["numberOfPoints"];
  const SizeValueType numberOfPoints = numberOfPointsJson.GetInt();

  const rapidjson::Value & numberOfPointPixelsJson = document["numberOfPointPixels"];
  const SizeValueType numberOfPointPixels = numberOfPointPixelsJson.GetInt();
  // const rapidjson::Value & pointPixelComponentsJson = meshType["pointPixelComponents"];
  // const SizeValueType pointPixelComponents = pointPixelComponentsJson.GetInt();

  const rapidjson::Value & numberOfCellPixelsJson = document["numberOfCellPixels"];
  const SizeValueType numberOfCellPixels = numberOfCellPixelsJson.GetInt();
  // const rapidjson::Value & cellPixelComponentsJson = meshType["cellPixelComponents"];
  // const SizeValueType cellPixelComponents = cellPixelComponentsJson.GetInt();

  const int dimension = meshType["dimension"].GetInt();
  if (dimension != MeshType::PointDimension)
  {
    throw std::runtime_error("Unexpected dimension");
  }
  const std::string pointPixelComponentType( meshType["pointPixelComponentType"].GetString() );
  if (numberOfPointPixels && pointPixelComponentType != itk::wasm::MapComponentType<typename ConvertPointPixelTraits::ComponentType>::ComponentString )
  {
    throw std::runtime_error("Unexpected point pixel component type");
  }

  const std::string pointPixelType( meshType["pointPixelType"].GetString() );
  if (numberOfPointPixels && pointPixelType != itk::wasm::MapPixelType<PointPixelType>::PixelString )
  {
    throw std::runtime_error("Unexpected point pixel type");
  }

  const std::string cellPixelComponentType( meshType["cellPixelComponentType"].GetString() );
  if (numberOfCellPixels && cellPixelComponentType != itk::wasm::MapComponentType<typename ConvertCellPixelTraits::ComponentType>::ComponentString )
  {
    throw std::runtime_error("Unexpected cell pixel component type");
  }

  const std::string cellPixelType( meshType["cellPixelType"].GetString() );
  if (numberOfCellPixels && cellPixelType != itk::wasm::MapPixelType<CellPixelType>::PixelString )
  {
    throw std::runtime_error("Unexpected cell pixel type");
  }

  mesh->GetPoints()->resize(numberOfPoints);
  using PointType = typename MeshType::PointType;
  const rapidjson::Value & pointsJson = document["points"];
  const std::string pointsString( pointsJson.GetString() );
  const std::string pointComponentType( meshType["pointComponentType"].GetString() );
  if (numberOfPoints)
  {
    if (pointComponentType == itk::wasm::MapComponentType<typename MeshType::CoordRepType>::ComponentString )
    {
      const auto * pointsPtr = reinterpret_cast< PointType * >( std::atol(pointsString.substr(35).c_str()) );
      mesh->GetPoints()->assign(pointsPtr, pointsPtr + numberOfPoints);
    }
    else if (pointComponentType == itk::wasm::MapComponentType<float>::ComponentString)
    {
      auto * pointsPtr = reinterpret_cast< float * >( std::atol(pointsString.substr(35).c_str()) );
      const size_t pointComponents = numberOfPoints * dimension;
      auto * pointsContainerPtr = reinterpret_cast<typename MeshType::CoordRepType *>(&(mesh->GetPoints()->at(0)) );
      std::copy(pointsPtr, pointsPtr + pointComponents, pointsContainerPtr);
    }
    else if (pointComponentType == itk::wasm::MapComponentType<double>::ComponentString)
    {
      auto * pointsPtr = reinterpret_cast< double * >( std::atol(pointsString.substr(35).c_str()) );
      const size_t pointComponents = numberOfPoints * dimension;
      auto * pointsContainerPtr = reinterpret_cast<typename MeshType::CoordRepType *>(&(mesh->GetPoints()->at(0)) );
      std::copy(pointsPtr, pointsPtr + pointComponents, pointsContainerPtr);
    }
    else
    {
      throw std::runtime_error("Unexpected point component type");
    }
  }


  const rapidjson::Value & cellBufferSizeJson = document["cellBufferSize"];
  const SizeValueType cellBufferSize = cellBufferSizeJson.GetInt();
  using CellIdentifier = typename MeshType::CellIdentifier;
  using PointIdentifier = typename MeshType::PointIdentifier;
  using CellType = typename MeshType::CellType;
  using VertexCellType = VertexCell<CellType>;
  using LineCellType = LineCell<CellType>;
  using TriangleCellType = TriangleCell<CellType>;
  using PolygonCellType = PolygonCell<CellType>;
  using TetrahedronCellType = TetrahedronCell<CellType>;
  using HexahedronCellType = HexahedronCell<CellType>;
  using QuadrilateralCellType = QuadrilateralCell<CellType>;
  using QuadraticEdgeCellType = QuadraticEdgeCell<CellType>;
  using QuadraticTriangleCellType = QuadraticTriangleCell<CellType>;
  using CellAutoPointer = typename MeshType::CellAutoPointer;
  const rapidjson::Value & cellsJson = document["cells"];
  const std::string cellsString( cellsJson.GetString() );
  using CellBufferType = typename WASMMeshType::CellBufferContainerType::Element;
  CellBufferType * cellsBufferPtr = reinterpret_cast< CellBufferType * >( static_cast< size_t >(std::atol(cellsString.substr(35).c_str())) );
  SizeValueType        index = NumericTraits<SizeValueType>::ZeroValue();
  CellIdentifier id = NumericTraits<CellIdentifier>::ZeroValue();
  while (index < cellBufferSize)
  {
    auto type = static_cast<CellGeometryEnum>(static_cast<int>(cellsBufferPtr[index++]));
    switch (type)
    {
      case CellGeometryEnum::VERTEX_CELL:
      {
        auto cellPoints = static_cast<unsigned int>(cellsBufferPtr[index++]);
        if (cellPoints != VertexCellType::NumberOfPoints)
        {
          itkExceptionMacro(<< "Invalid Vertex Cell with number of points = " << cellPoints);
        }
        CellAutoPointer cell;
        auto *                vertexCell = new VertexCellType;
        for (unsigned int jj = 0; jj < VertexCellType::NumberOfPoints; ++jj)
        {
          vertexCell->SetPointId(jj, static_cast<PointIdentifier>(cellsBufferPtr[index++]));
        }

        cell.TakeOwnership(vertexCell);
        mesh->SetCell(id++, cell);
        break;
      }
      case CellGeometryEnum::LINE_CELL:
      {
        // for polylines will be loaded as individual edges.
        auto cellPoints = static_cast<unsigned int>(cellsBufferPtr[index++]);
        if (cellPoints < 2)
        {
          itkExceptionMacro(<< "Invalid Line Cell with number of points = " << cellPoints);
        }
        auto pointIDBuffer = static_cast<PointIdentifier>(cellsBufferPtr[index++]);
        for (unsigned int jj = 1; jj < cellPoints; ++jj)
        {
          CellAutoPointer cell;
          auto *                lineCell = new LineCellType;
          lineCell->SetPointId(0, pointIDBuffer);
          pointIDBuffer = static_cast<PointIdentifier>(cellsBufferPtr[index++]);
          lineCell->SetPointId(1, pointIDBuffer);
          cell.TakeOwnership(lineCell);
          mesh->SetCell(id++, cell);
        }
        break;
      }
      case CellGeometryEnum::TRIANGLE_CELL:
      {
        auto cellPoints = static_cast<unsigned int>(cellsBufferPtr[index++]);
        if (cellPoints != TriangleCellType::NumberOfPoints)
        {
          itkExceptionMacro(<< "Invalid Triangle Cell with number of points = " << cellPoints);
        }

        CellAutoPointer cell;
        auto *                triangleCell = new TriangleCellType;
        for (unsigned int jj = 0; jj < TriangleCellType::NumberOfPoints; ++jj)
        {
          triangleCell->SetPointId(jj, static_cast<PointIdentifier>(cellsBufferPtr[index++]));
        }

        cell.TakeOwnership(triangleCell);
        mesh->SetCell(id++, cell);
        break;
      }
      case CellGeometryEnum::QUADRILATERAL_CELL:
      {
        auto cellPoints = static_cast<unsigned int>(cellsBufferPtr[index++]);
        if (cellPoints != QuadrilateralCellType::NumberOfPoints)
        {
          itkExceptionMacro(<< "Invalid Quadrilateral Cell with number of points = " << cellPoints);
        }

        CellAutoPointer cell;
        auto *                quadrilateralCell = new QuadrilateralCellType;
        for (unsigned int jj = 0; jj < QuadrilateralCellType::NumberOfPoints; ++jj)
        {
          quadrilateralCell->SetPointId(jj, static_cast<PointIdentifier>(cellsBufferPtr[index++]));
        }

        cell.TakeOwnership(quadrilateralCell);
        mesh->SetCell(id++, cell);
        break;
      }
      case CellGeometryEnum::POLYGON_CELL:
      {
        // For polyhedron, if the number of points is 3, then we treat it as
        // triangle cell
        CellAutoPointer cell;
        auto                  cellPoints = static_cast<unsigned int>(cellsBufferPtr[index++]);
        if (cellPoints == TriangleCellType::NumberOfPoints)
        {
          auto * triangleCell = new TriangleCellType;
          for (unsigned int jj = 0; jj < TriangleCellType::NumberOfPoints; ++jj)
          {
            triangleCell->SetPointId(jj, static_cast<PointIdentifier>(cellsBufferPtr[index++]));
          }
          cell.TakeOwnership(triangleCell);
        }
        else
        {
          auto * polygonCell = new PolygonCellType;
          for (unsigned int jj = 0; jj < cellPoints; ++jj)
          {
            polygonCell->SetPointId(jj, static_cast<PointIdentifier>(cellsBufferPtr[index++]));
          }
          cell.TakeOwnership(polygonCell);
        }

        mesh->SetCell(id++, cell);
        break;
      }
      case CellGeometryEnum::TETRAHEDRON_CELL:
      {
        auto cellPoints = static_cast<unsigned int>(cellsBufferPtr[index++]);
        if (cellPoints != TetrahedronCellType::NumberOfPoints)
        {
          itkExceptionMacro(<< "Invalid Tetrahedron Cell with number of points = " << cellPoints);
        }

        CellAutoPointer cell;
        auto *                tetrahedronCell = new TetrahedronCellType;
        for (unsigned int jj = 0; jj < TetrahedronCellType::NumberOfPoints; ++jj)
        {
          tetrahedronCell->SetPointId(jj, static_cast<PointIdentifier>(cellsBufferPtr[index++]));
        }

        cell.TakeOwnership(tetrahedronCell);
        mesh->SetCell(id++, cell);
        break;
      }
      case CellGeometryEnum::HEXAHEDRON_CELL:
      {
        auto cellPoints = static_cast<unsigned int>(cellsBufferPtr[index++]);
        if (cellPoints != HexahedronCellType::NumberOfPoints)
        {
          itkExceptionMacro(<< "Invalid Hexahedron Cell with number of points = " << cellPoints);
        }

        CellAutoPointer cell;
        auto *                hexahedronCell = new HexahedronCellType;
        for (unsigned int jj = 0; jj < HexahedronCellType::NumberOfPoints; ++jj)
        {
          hexahedronCell->SetPointId(jj, static_cast<PointIdentifier>(cellsBufferPtr[index++]));
        }

        cell.TakeOwnership(hexahedronCell);
        mesh->SetCell(id++, cell);
        break;
      }
      case CellGeometryEnum::QUADRATIC_EDGE_CELL:
      {
        auto cellPoints = static_cast<unsigned int>(cellsBufferPtr[index++]);
        if (cellPoints != QuadraticEdgeCellType::NumberOfPoints)
        {
          itkExceptionMacro(<< "Invalid Quadratic edge Cell with number of points = " << cellPoints);
        }

        CellAutoPointer cell;
        auto *                quadraticEdgeCell = new QuadraticEdgeCellType;
        for (unsigned int jj = 0; jj < QuadraticEdgeCellType::NumberOfPoints; ++jj)
        {
          quadraticEdgeCell->SetPointId(jj, static_cast<PointIdentifier>(cellsBufferPtr[index++]));
        }

        cell.TakeOwnership(quadraticEdgeCell);
        mesh->SetCell(id++, cell);
        break;
      }
      case CellGeometryEnum::QUADRATIC_TRIANGLE_CELL:
      {
        auto cellPoints = static_cast<unsigned int>(cellsBufferPtr[index++]);
        if (cellPoints != QuadraticTriangleCellType::NumberOfPoints)
        {
          itkExceptionMacro(<< "Invalid Quadratic triangle Cell with number of points = " << cellPoints);
        }

        CellAutoPointer cell;
        auto *                quadraticTriangleCell = new QuadraticTriangleCellType;
        for (unsigned int jj = 0; jj < QuadraticTriangleCellType::NumberOfPoints; ++jj)
        {
          quadraticTriangleCell->SetPointId(jj, static_cast<PointIdentifier>(cellsBufferPtr[index++]));
        }

        cell.TakeOwnership(quadraticTriangleCell);
        mesh->SetCell(id++, cell);
        break;
      }
      default:
      {
        itkExceptionMacro(<< "Unknown cell type");
      }
    }
  }

  const rapidjson::Value & pointDataJson = document["pointData"];
  using PointPixelType = typename TMesh::PixelType;
  const std::string pointDataString( pointDataJson.GetString() );
  auto pointDataPtr = reinterpret_cast< PointPixelType * >( std::atol(pointDataString.substr(35).c_str()) );
  mesh->GetPointData()->resize(numberOfPointPixels);
  mesh->GetPointData()->assign(pointDataPtr, pointDataPtr + numberOfPointPixels);

  const rapidjson::Value & cellDataJson = document["cellData"];
  using CellPixelType = typename TMesh::CellPixelType;
  const std::string cellDataString( cellDataJson.GetString() );
  auto cellDataPtr = reinterpret_cast< CellPixelType * >( std::atol(cellDataString.substr(35).c_str()) );
  if (mesh->GetCellData() == nullptr)
  {
    mesh->SetCellData(MeshType::CellDataContainer::New());
  }
  if (numberOfCellPixels)
  {
    mesh->GetCellData()->resize(numberOfCellPixels);
    mesh->GetCellData()->assign(cellDataPtr, cellDataPtr + numberOfCellPixels);
  }
}

template <typename TMesh>
void
WASMMeshToMeshFilter<TMesh>
::PrintSelf(std::ostream & os, Indent indent) const
{
  Superclass::PrintSelf(os, indent);
}
} // end namespace itk

#endif
