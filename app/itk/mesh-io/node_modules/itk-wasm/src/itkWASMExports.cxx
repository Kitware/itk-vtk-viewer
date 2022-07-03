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

#include "itkWASMExports.h"

#ifndef ITK_WASM_NO_MEMORY_IO

#include <map>
#include <utility>
#include <vector>

namespace itk
{
namespace wasm
{

// dataset index, array index
using InputArrayStoreKeyType = std::pair<uint32_t, uint32_t>;
using InputArrayStoreType = std::map<InputArrayStoreKeyType, std::vector<char>>;
static InputArrayStoreType inputArrayStore;

// index
using InputJSONStoreType = std::map<uint32_t, std::string>;
static InputJSONStoreType inputJSONStore;

const std::string & getMemoryStoreInputJSON(uint32_t memoryIndex, uint32_t index)
{
  return inputJSONStore[index];
}

using OutputWASMDataObjectStoreType = std::map<uint32_t, WASMDataObject::ConstPointer>;
static OutputWASMDataObjectStoreType outputWASMDataObjectStore;

void setMemoryStoreOutputDataObject(uint32_t memoryIndex, uint32_t index, const WASMDataObject * dataObject)
{
  WASMDataObject::ConstPointer smartPointer(dataObject);
  outputWASMDataObjectStore[index] = smartPointer;
}

// dataset index, array index
using OutputArrayStoreKeyType = std::pair<uint32_t, uint32_t>;
// address, size
using OutputArrayStoreValueType = std::pair<size_t, size_t>;
using OutputArrayStoreType = std::map<OutputArrayStoreKeyType, OutputArrayStoreValueType>;
static OutputArrayStoreType outputArrayStore;

void setMemoryStoreOutputArray(uint32_t memoryIndex, uint32_t index, uint32_t subIndex, size_t address, size_t size)
{
  const auto key = std::make_pair(index, subIndex);
  const auto value = std::make_pair(address, size);
  outputArrayStore[key] = value;
}

} // end namespace wasm
} // end namespace itk

size_t itk_wasm_input_array_alloc(uint32_t memoryIndex, uint32_t index, uint32_t subIndex, size_t size)
{
  using namespace itk::wasm;
  const auto key = std::make_pair(index, subIndex);
  if (inputArrayStore.count(key))
  {
    inputArrayStore[key] = std::vector<char>(size);
  }
  else
  {
    inputArrayStore[key].resize(size);
  }
  return reinterpret_cast< size_t >(inputArrayStore[key].data());
}

size_t itk_wasm_input_json_alloc(uint32_t memoryIndex, uint32_t index, size_t size)
{
  using namespace itk::wasm;
  if (inputJSONStore.count(index))
  {
    inputJSONStore[index] = std::string(size, ' ');
  }
  else
  {
    inputJSONStore[index].resize(size);
  }
  return reinterpret_cast< size_t >(inputJSONStore[index].data());
}

size_t itk_wasm_output_json_address(uint32_t memoryIndex, uint32_t index)
{
  using namespace itk::wasm;
  return reinterpret_cast< size_t >(outputWASMDataObjectStore[index]->GetJSON().data());
}

size_t itk_wasm_output_json_size(uint32_t memoryIndex, uint32_t index)
{
  using namespace itk::wasm;
  return outputWASMDataObjectStore[index]->GetJSON().size();
}

size_t itk_wasm_output_array_address(uint32_t memoryIndex, uint32_t index, uint32_t subIndex)
{
  using namespace itk::wasm;
  const auto key = std::make_pair(index, subIndex);
  const auto value = outputArrayStore[key];
  return value.first;
}

size_t itk_wasm_output_array_size(uint32_t memoryIndex, uint32_t index, uint32_t subIndex)
{
  using namespace itk::wasm;
  const auto key = std::make_pair(index, subIndex);
  const auto value = outputArrayStore[key];
  return value.second;
}

void itk_wasm_free_all()
{
  using namespace itk::wasm;
  inputJSONStore.clear();
  inputArrayStore.clear();
  outputWASMDataObjectStore.clear();
  outputArrayStore.clear();
}

#endif // ITK_WASM_NO_MEMORY_IO
