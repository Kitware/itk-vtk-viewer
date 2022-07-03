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
#ifndef itkOutputPolyData_h
#define itkOutputPolyData_h

#include "itkPipeline.h"
#include "itkMeshConvertPixelTraits.h"

#ifndef ITK_WASM_NO_MEMORY_IO
#include "itkWASMExports.h"
#include "itkWASMPolyData.h"
#include "itkPolyDataToWASMPolyDataFilter.h"
#endif
#ifndef ITK_WASM_NO_FILESYSTEM_IO
#include "itkMeshFileWriter.h"
#include "itkPolyDataToMeshFilter.h"
#endif

namespace itk
{
namespace wasm
{
/**
 *\class OutputPolyData
 * \brief Output polyData for an itk::wasm::Pipeline
 *
 * This polyData is written to the filesystem or memory when it goes out of scope.
 * 
 * Call `GetPolyData()` to get the TPolyData * to use an input to a pipeline.
 * 
 * \ingroup WebAssemblyInterface
 */
template <typename TPolyData>
class ITK_TEMPLATE_EXPORT OutputPolyData
{
public:
  using PolyDataType = TPolyData;

  void Set(const PolyDataType * polyData) {
    this->m_PolyData = polyData;
  }

  const PolyDataType * Get() const {
    return this->m_PolyData.GetPointer();
  }

  /** FileName or output index. */
  void SetIdentifier(const std::string & identifier)
  {
    this->m_Identifier = identifier;
  }
  const std::string & GetIdentifier() const
  {
    return this->m_Identifier;
  }

  OutputPolyData() = default;
  ~OutputPolyData() {
    if(wasm::Pipeline::GetUseMemoryIO())
    {
#ifndef ITK_WASM_NO_MEMORY_IO
    if (!this->m_PolyData.IsNull() && !this->m_Identifier.empty())
      {
        using PolyDataToWASMPolyDataFilterType = PolyDataToWASMPolyDataFilter<PolyDataType>;
        auto polyDataToWASMPolyDataFilter = PolyDataToWASMPolyDataFilterType::New();
        polyDataToWASMPolyDataFilter->SetInput(this->m_PolyData);
        polyDataToWASMPolyDataFilter->Update();
        auto wasmPolyData = polyDataToWASMPolyDataFilter->GetOutput();
        const auto index = std::stoi(this->m_Identifier);
        setMemoryStoreOutputDataObject(0, index, wasmPolyData);

        if (this->m_PolyData->GetNumberOfPoints() > 0)
        {
          const auto pointsAddress = reinterpret_cast< size_t >( &(wasmPolyData->GetPolyData()->GetPoints()->at(0)) );
          const auto pointsSize = wasmPolyData->GetPolyData()->GetPoints()->Size() * PolyDataType::PointDimension * sizeof(typename PolyDataType::CoordRepType);
          setMemoryStoreOutputArray(0, index, 0, pointsAddress, pointsSize);
        }

        if (this->m_PolyData->GetVertices() && this->m_PolyData->GetVertices()->Size() > 0)
        {
          const auto verticesAddress = reinterpret_cast< size_t >( &(wasmPolyData->GetPolyData()->GetVertices()->at(0)) );
          const auto verticesSize = wasmPolyData->GetPolyData()->GetVertices()->Size() * sizeof(uint32_t);
          setMemoryStoreOutputArray(0, index, 1, verticesAddress, verticesSize);
        }

        if (this->m_PolyData->GetLines() && this->m_PolyData->GetLines()->Size() > 0)
        {
          const auto linesAddress = reinterpret_cast< size_t >( &(wasmPolyData->GetPolyData()->GetLines()->at(0)) );
          const auto linesSize = wasmPolyData->GetPolyData()->GetLines()->Size() * sizeof(uint32_t);
          setMemoryStoreOutputArray(0, index, 2, linesAddress, linesSize);
        }

        if (this->m_PolyData->GetPolygons() && this->m_PolyData->GetPolygons()->Size() > 0)
        {
          const auto polygonsAddress = reinterpret_cast< size_t >( &(wasmPolyData->GetPolyData()->GetPolygons()->at(0)) );
          const auto polygonsSize = wasmPolyData->GetPolyData()->GetPolygons()->Size() * sizeof(uint32_t);
          setMemoryStoreOutputArray(0, index, 3, polygonsAddress, polygonsSize);
        }

        if (this->m_PolyData->GetTriangleStrips() && this->m_PolyData->GetTriangleStrips()->Size() > 0)
        {
          const auto triangleStripsAddress = reinterpret_cast< size_t >( &(wasmPolyData->GetPolyData()->GetTriangleStrips()->at(0)) );
          const auto triangleStripsSize = wasmPolyData->GetPolyData()->GetTriangleStrips()->Size() * sizeof(uint32_t);
          setMemoryStoreOutputArray(0, index, 4, triangleStripsAddress, triangleStripsSize);
        }

        if (this->m_PolyData->GetPointData() != nullptr && this->m_PolyData->GetPointData()->Size() > 0)
        {
          using PointPixelType = typename PolyDataType::PixelType;
          using ConvertPointPixelTraits = MeshConvertPixelTraits<PointPixelType>;
          const auto pointDataAddress = reinterpret_cast< size_t >( &(wasmPolyData->GetPolyData()->GetPointData()->at(0)) );
          const auto pointDataSize = wasmPolyData->GetPolyData()->GetPointData()->Size() * sizeof(typename ConvertPointPixelTraits::ComponentType) * ConvertPointPixelTraits::GetNumberOfComponents();
          setMemoryStoreOutputArray(0, index, 5, pointDataAddress, pointDataSize);
        }

        if (this->m_PolyData->GetCellData() != nullptr && this->m_PolyData->GetCellData()->Size() > 0)
        {
          using CellPixelType = typename PolyDataType::CellPixelType;
          using ConvertCellPixelTraits = MeshConvertPixelTraits<CellPixelType>;
          const auto cellDataAddress = reinterpret_cast< size_t >( &(wasmPolyData->GetPolyData()->GetCellData()->at(0)) );
          const auto cellDataSize = wasmPolyData->GetPolyData()->GetCellData()->Size() * sizeof(typename ConvertCellPixelTraits::ComponentType) * ConvertCellPixelTraits::GetNumberOfComponents();
          setMemoryStoreOutputArray(0, index, 6, cellDataAddress, cellDataSize);
        }
      }
#else
    throw std::logic_error("Memory IO not supported");
#endif
    }
    else
    {
#ifndef ITK_WASM_NO_FILESYSTEM_IO
    if (!this->m_PolyData.IsNull() && !this->m_Identifier.empty())
      {
      using PolyDataToMeshFilterType = PolyDataToMeshFilter<TPolyData>;
      auto polyDataToMeshFilter = PolyDataToMeshFilterType::New();
      polyDataToMeshFilter->SetInput(this->m_PolyData);
      using MeshType = typename PolyDataToMeshFilterType::OutputMeshType;
      using MeshWriterType = MeshFileWriter<MeshType>;
      auto meshWriter = MeshWriterType::New();
      meshWriter->SetFileName(this->m_Identifier);
      meshWriter->SetInput(polyDataToMeshFilter->GetOutput());
      meshWriter->Update();
      }
#else
    throw std::logic_error("Filesystem IO not supported");
#endif
    }
  }
protected:
  typename TPolyData::ConstPointer m_PolyData;

  std::string m_Identifier;
};

template <typename TPolyData>
bool lexical_cast(const std::string &input, OutputPolyData<TPolyData> &outputPolyData)
{
  outputPolyData.SetIdentifier(input);
  return true;
}

} // namespace wasm
} // namespace itk

#endif
