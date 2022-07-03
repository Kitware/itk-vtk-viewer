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
#ifndef itkOutputMesh_h
#define itkOutputMesh_h

#include "itkPipeline.h"
#include "itkMeshConvertPixelTraits.h"

#ifndef ITK_WASM_NO_MEMORY_IO
#include "itkWASMExports.h"
#include "itkWASMMesh.h"
#include "itkMeshToWASMMeshFilter.h"
#endif
#ifndef ITK_WASM_NO_FILESYSTEM_IO
#include "itkMeshFileWriter.h"
#endif

namespace itk
{
namespace wasm
{
/**
 *\class OutputMesh
 * \brief Output mesh for an itk::wasm::Pipeline
 *
 * This mesh is written to the filesystem or memory when it goes out of scope.
 * 
 * Call `GetMesh()` to get the TMesh * to use an input to a pipeline.
 * 
 * \ingroup WebAssemblyInterface
 */
template <typename TMesh>
class ITK_TEMPLATE_EXPORT OutputMesh
{
public:
  using MeshType = TMesh;

  void Set(const MeshType * mesh) {
    this->m_Mesh = mesh;
  }

  const MeshType * Get() const {
    return this->m_Mesh.GetPointer();
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

  OutputMesh() = default;
  ~OutputMesh() {
    if(wasm::Pipeline::GetUseMemoryIO())
    {
#ifndef ITK_WASM_NO_MEMORY_IO
    if (!this->m_Mesh.IsNull() && !this->m_Identifier.empty())
      {
        using MeshToWASMMeshFilterType = MeshToWASMMeshFilter<MeshType>;
        auto meshToWASMMeshFilter = MeshToWASMMeshFilterType::New();
        meshToWASMMeshFilter->SetInput(this->m_Mesh);
        meshToWASMMeshFilter->Update();
        auto wasmMesh = meshToWASMMeshFilter->GetOutput();
        const auto index = std::stoi(this->m_Identifier);
        setMemoryStoreOutputDataObject(0, index, wasmMesh);

        if (this->m_Mesh->GetNumberOfPoints() > 0)
        {
          const auto pointsAddress = reinterpret_cast< size_t >( &(wasmMesh->GetMesh()->GetPoints()->at(0)) );
          const auto pointsSize = wasmMesh->GetMesh()->GetPoints()->Size() * sizeof(typename MeshType::CoordRepType);
          setMemoryStoreOutputArray(0, index, 0, pointsAddress, pointsSize);
        }

        if (this->m_Mesh->GetNumberOfCells() > 0)
        {
          const auto cellsAddress = reinterpret_cast< size_t >( &(wasmMesh->GetCellBuffer()->at(0)) );
          const auto cellsSize = wasmMesh->GetCellBuffer()->Size() * sizeof(typename MeshType::CellIdentifier);
          setMemoryStoreOutputArray(0, index, 1, cellsAddress, cellsSize);
        }

        if (this->m_Mesh->GetPointData() != nullptr && this->m_Mesh->GetPointData()->Size() > 0)
        {
          using PointPixelType = typename MeshType::PixelType;
          using ConvertPointPixelTraits = MeshConvertPixelTraits<PointPixelType>;
          const auto pointDataAddress = reinterpret_cast< size_t >( &(wasmMesh->GetMesh()->GetPointData()->at(0)) );
          const auto pointDataSize = wasmMesh->GetMesh()->GetPointData()->Size() * sizeof(typename ConvertPointPixelTraits::ComponentType) * ConvertPointPixelTraits::GetNumberOfComponents();
          setMemoryStoreOutputArray(0, index, 2, pointDataAddress, pointDataSize);
        }

        if (this->m_Mesh->GetCellData() != nullptr && this->m_Mesh->GetCellData()->Size() > 0)
        {
          using CellPixelType = typename MeshType::CellPixelType;
          using ConvertCellPixelTraits = MeshConvertPixelTraits<CellPixelType>;
          const auto cellDataAddress = reinterpret_cast< size_t >( &(wasmMesh->GetMesh()->GetCellData()->at(0)) );
          const auto cellDataSize = wasmMesh->GetMesh()->GetCellData()->Size() * sizeof(typename ConvertCellPixelTraits::ComponentType) * ConvertCellPixelTraits::GetNumberOfComponents();
          setMemoryStoreOutputArray(0, index, 3, cellDataAddress, cellDataSize);
        }
      }
#else
    throw std::logic_error("Memory IO not supported");
#endif
    }
    else
    {
#ifndef ITK_WASM_NO_FILESYSTEM_IO
    if (!this->m_Mesh.IsNull() && !this->m_Identifier.empty())
      {
      using MeshWriterType = itk::MeshFileWriter<TMesh>;
      auto meshWriter = MeshWriterType::New();
      meshWriter->SetFileName(this->m_Identifier);
      meshWriter->SetInput(this->m_Mesh);
      meshWriter->Update();
      }
#else
    throw std::logic_error("Filesystem IO not supported");
#endif
    }
  }
protected:
  typename TMesh::ConstPointer m_Mesh;

  std::string m_Identifier;
};

template <typename TMesh>
bool lexical_cast(const std::string &input, OutputMesh<TMesh> &outputMesh)
{
  outputMesh.SetIdentifier(input);
  return true;
}

} // namespace wasm
} // namespace itk

#endif
