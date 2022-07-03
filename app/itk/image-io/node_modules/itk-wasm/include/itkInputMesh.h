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
#ifndef itkInputMesh_h
#define itkInputMesh_h

#include "itkPipeline.h"

#ifndef ITK_WASM_NO_MEMORY_IO
#include "itkWASMExports.h"
#include "itkWASMMesh.h"
#include "itkWASMMeshToMeshFilter.h"
#endif
#ifndef ITK_WASM_NO_FILESYSTEM_IO
#include "itkMeshFileReader.h"
#endif

namespace itk
{
namespace wasm
{

/**
 *\class InputMesh
 * \brief Input mesh for an itk::wasm::Pipeline
 *
 * This mesh is read from the filesystem or memory when ITK_WASM_PARSE_ARGS is called.
 *
 * Call `Get()` to get the TMesh * to use an input to a pipeline.
 *
 * \ingroup WebAssemblyInterface
 */
template <typename TMesh>
class ITK_TEMPLATE_EXPORT InputMesh
{
public:
  using MeshType = TMesh;

  void Set(const MeshType * mesh) {
    this->m_Mesh = mesh;
  }

  const MeshType * Get() const {
    return this->m_Mesh.GetPointer();
  }

  InputMesh() = default;
  ~InputMesh() = default;
protected:
  typename TMesh::ConstPointer m_Mesh;
};


template <typename TMesh>
bool lexical_cast(const std::string &input, InputMesh<TMesh> &inputMesh)
{
  if (input.empty())
  {
    return false;
  }

  if (wasm::Pipeline::GetUseMemoryIO())
  {
#ifndef ITK_WASM_NO_MEMORY_IO
    using WASMMeshToMeshFilterType = WASMMeshToMeshFilter<TMesh>;
    auto wasmMeshToMeshFilter = WASMMeshToMeshFilterType::New();
    auto wasmMesh = WASMMeshToMeshFilterType::WASMMeshType::New();
    const unsigned int index = std::stoi(input);
    auto json = getMemoryStoreInputJSON(0, index);
    wasmMesh->SetJSON(json);
    wasmMeshToMeshFilter->SetInput(wasmMesh);
    wasmMeshToMeshFilter->Update();
    inputMesh.Set(wasmMeshToMeshFilter->GetOutput());
#else
    return false;
#endif
  }
  else
  {
#ifndef ITK_WASM_NO_FILESYSTEM_IO
    using ReaderType = MeshFileReader<TMesh>;
    auto reader = ReaderType::New();
    reader->SetFileName(input);
    reader->Update();
    auto mesh = reader->GetOutput();
    inputMesh.Set(mesh);
#else
    return false;
#endif
  }
  return true;
}

} // end namespace wasm
} // end namespace itk

#endif
