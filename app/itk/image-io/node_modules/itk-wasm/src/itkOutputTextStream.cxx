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
#include "itkOutputTextStream.h"

#include <string>
#ifndef ITK_WASM_NO_MEMORY_IO
#include "itkWASMExports.h"
#include <sstream>
#include "rapidjson/document.h"
#include "itkWASMStringStream.h"
#endif

namespace itk
{
namespace wasm
{

OutputTextStream
::~OutputTextStream()
{
  if(wasm::Pipeline::GetUseMemoryIO())
  {
#ifndef ITK_WASM_NO_MEMORY_IO
    if (this->m_Identifier.empty())
      {
      return;
      }
    const auto index = std::stoi(this->m_Identifier);
    setMemoryStoreOutputDataObject(0, index, this->m_WASMStringStream);

    const std::string & string = this->m_WASMStringStream->GetString();
    const auto dataAddress = reinterpret_cast< size_t >( string.data() );
    const auto dataSize = string.size();
    setMemoryStoreOutputArray(0, index, 0, dataAddress, dataSize);
#else
    throw std::logic_error("Memory IO not supported");
#endif
  }
  else
  {
#ifndef ITK_WASM_NO_FILESYSTEM_IO
    // ofstream will close when deleted
# else
    throw std::logic_error("Filesystem IO not supported");
#endif
  if (m_DeleteOStream && m_OStream != nullptr)
    {
      delete m_OStream;
    }
  }
}

bool lexical_cast(const std::string &output, OutputTextStream &outputStream)
{
  if (wasm::Pipeline::GetUseMemoryIO())
  {
#ifndef ITK_WASM_NO_MEMORY_IO
    outputStream.SetIdentifier(output);
#else
    return false;
#endif
  }
  else
  {
#ifndef ITK_WASM_NO_FILESYSTEM_IO
    outputStream.SetFileName(output);
#else
    return false;
#endif
  }
  return true;
}

} // end namespace wasm
} // end namespace itk
