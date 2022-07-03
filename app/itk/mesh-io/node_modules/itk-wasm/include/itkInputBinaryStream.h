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
#ifndef itkInputBinaryStream_h
#define itkInputBinaryStream_h

#include "itkPipeline.h"
#include "itkWASMStringStream.h"

#include <string>
#ifndef ITK_WASM_NO_MEMORY_IO
#include <sstream>
#endif
#ifndef ITK_WASM_NO_FILESYSTEM_IO
#include <fstream>
#endif

namespace itk
{
namespace wasm
{

/**
 *\class InputBinaryStream
 * \brief Input binary std::istream for an itk::wasm::Pipeline
 *
 * This stream is read from the filesystem or memory when ITK_WASM_PARSE_ARGS is called.
 *
 * Call `Get()` to get the std::istream & to use an input to a pipeline.
 *
 * \ingroup WebAssemblyInterface
 */
class InputBinaryStream
{
public:
  std::istream & Get() {
    return *m_IStream;
  }

  void SetJSON(const std::string & json)
  {
    if (m_DeleteIStream && m_IStream != nullptr)
    {
      delete m_IStream;
    }
    m_DeleteIStream = false;
    m_WASMStringStream = WASMStringStream::New();
    m_WASMStringStream->SetJSON(json.c_str());

    m_IStream = &(m_WASMStringStream->GetStringStream());
  }

  void SetFileName(const std::string & fileName)
  {
    if (m_DeleteIStream && m_IStream != nullptr)
    {
      delete m_IStream;
    }
    m_IStream = new std::ifstream(fileName, std::ifstream::in | std::ifstream::binary);
    m_DeleteIStream = true;
  }

  InputBinaryStream() = default;
  ~InputBinaryStream()
  {
    if (m_DeleteIStream && m_IStream != nullptr)
    {
      delete m_IStream;
    }
  }
protected:
  std::istream * m_IStream{nullptr};
  bool m_DeleteIStream{false};

  WASMStringStream::Pointer m_WASMStringStream;
};


bool lexical_cast(const std::string &input, InputBinaryStream &inputStream);

} // end namespace wasm
} // end namespace itk

#endif
