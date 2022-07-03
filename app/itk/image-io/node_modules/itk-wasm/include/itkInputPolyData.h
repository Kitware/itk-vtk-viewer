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
#ifndef itkInputPolyData_h
#define itkInputPolyData_h

#include "itkPipeline.h"

#ifndef ITK_WASM_NO_MEMORY_IO
#include "itkWASMExports.h"
#include "itkWASMPolyData.h"
#include "itkWASMPolyDataToPolyDataFilter.h"
#endif
#ifndef ITK_WASM_NO_FILESYSTEM_IO
#include "itkMeshFileReader.h"
#include "itkMeshToPolyDataFilter.h"
#include "itkPolyDataToMeshFilter.h"
#endif

namespace itk
{
namespace wasm
{

/**
 *\class InputPolyData
 * \brief Input polyData for an itk::wasm::Pipeline
 *
 * This polyData is read from the filesystem or memory when ITK_WASM_PARSE_ARGS is called.
 *
 * Call `Get()` to get the TPolyData * to use an input to a pipeline.
 *
 * \ingroup WebAssemblyInterface
 */
template <typename TPolyData>
class ITK_TEMPLATE_EXPORT InputPolyData
{
public:
  using PolyDataType = TPolyData;

  void Set(const PolyDataType * polyData) {
    this->m_PolyData = polyData;
  }

  const PolyDataType * Get() const {
    return this->m_PolyData.GetPointer();
  }

  InputPolyData() = default;
  ~InputPolyData() = default;
protected:
  typename TPolyData::ConstPointer m_PolyData;
};


template <typename TPolyData>
bool lexical_cast(const std::string &input, InputPolyData<TPolyData> &inputPolyData)
{
  if (input.empty())
  {
    return false;
  }

  if (wasm::Pipeline::GetUseMemoryIO())
  {
#ifndef ITK_WASM_NO_MEMORY_IO
    using WASMPolyDataToPolyDataFilterType = WASMPolyDataToPolyDataFilter<TPolyData>;
    auto wasmPolyDataToPolyDataFilter = WASMPolyDataToPolyDataFilterType::New();
    auto wasmPolyData = WASMPolyDataToPolyDataFilterType::WASMPolyDataType::New();
    const unsigned int index = std::stoi(input);
    auto json = getMemoryStoreInputJSON(0, index);
    wasmPolyData->SetJSON(json);
    wasmPolyDataToPolyDataFilter->SetInput(wasmPolyData);
    wasmPolyDataToPolyDataFilter->Update();
    inputPolyData.Set(wasmPolyDataToPolyDataFilter->GetOutput());
#else
    return false;
#endif
  }
  else
  {
#ifndef ITK_WASM_NO_FILESYSTEM_IO
    using PolyDataToMeshFilterType = PolyDataToMeshFilter<TPolyData>;
    using MeshType = typename PolyDataToMeshFilterType::OutputMeshType;
    using ReaderType = MeshFileReader<MeshType>;
    auto reader = ReaderType::New();
    reader->SetFileName(input);
    using MeshToPolyDataFilterType = MeshToPolyDataFilter<MeshType>;
    auto meshToPolyData = MeshToPolyDataFilterType::New();
    meshToPolyData->SetInput(reader->GetOutput());
    meshToPolyData->Update();
    auto polyData = meshToPolyData->GetOutput();
    inputPolyData.Set(polyData);
#else
    return false;
#endif
  }
  return true;
}

} // end namespace wasm
} // end namespace itk

#endif
