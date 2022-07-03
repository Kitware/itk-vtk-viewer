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
#include "itkInputBinaryStream.h"

#include <string>
#ifndef ITK_WASM_NO_MEMORY_IO
#include "itkWASMExports.h"
#endif

namespace itk
{
namespace wasm
{

bool lexical_cast(const std::string &input, InputBinaryStream &inputStream)
{
  if (input.empty())
  {
    return false;
  }
  if (wasm::Pipeline::GetUseMemoryIO())
  {
#ifndef ITK_WASM_NO_MEMORY_IO
    const unsigned int index = std::stoi(input);
    const auto json = getMemoryStoreInputJSON(0, index);
    inputStream.SetJSON(json);
#else
    return false;
#endif
  }
  else
  {
#ifndef ITK_WASM_NO_FILESYSTEM_IO
    inputStream.SetFileName(input);
#else
    return false;
#endif
  }
  return true;
}

} // end namespace wasm
} // end namespace itk
