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
#ifndef itkWASMExports_h
#define itkWASMExports_h

#ifndef ITK_WASM_NO_MEMORY_IO
// WebAssembly exports for memory io

#include "itkWASMDataObject.h"

#if defined(__EMSCRIPTEN__)
#  include "emscripten/em_macros.h"
#else
#  define EMSCRIPTEN_KEEPALIVE
#endif

namespace itk
{
namespace wasm
{

// Function for the Pipeline Input's and Output's to set / get from the memory store

const std::string & getMemoryStoreInputJSON(uint32_t memoryIndex, uint32_t index);

void setMemoryStoreOutputDataObject(uint32_t memoryIndex, uint32_t index, const WASMDataObject * dataObject);

void setMemoryStoreOutputArray(uint32_t memoryIndex, uint32_t index, uint32_t subIndex, size_t address, size_t size);


} // end namespace wasm
} // end namespace itk

extern "C"
{

size_t EMSCRIPTEN_KEEPALIVE itk_wasm_input_array_alloc(uint32_t memoryIndex, uint32_t index, uint32_t subIndex, size_t size);
size_t EMSCRIPTEN_KEEPALIVE itk_wasm_input_json_alloc(uint32_t memoryIndex, uint32_t index, size_t size);

size_t EMSCRIPTEN_KEEPALIVE itk_wasm_output_json_address(uint32_t memoryIndex, uint32_t index);
size_t EMSCRIPTEN_KEEPALIVE itk_wasm_output_json_size(uint32_t memoryIndex, uint32_t index);
size_t EMSCRIPTEN_KEEPALIVE itk_wasm_output_array_address(uint32_t memoryIndex, uint32_t index, uint32_t subIndex);
size_t EMSCRIPTEN_KEEPALIVE itk_wasm_output_array_size(uint32_t memoryIndex, uint32_t index, uint32_t subIndex);

void EMSCRIPTEN_KEEPALIVE itk_wasm_free_all();

} // end extern "C"

#endif // ITK_WASM_NO_MEMORY_IO

#endif
