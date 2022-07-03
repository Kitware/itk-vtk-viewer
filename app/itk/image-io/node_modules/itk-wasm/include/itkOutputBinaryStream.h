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
#ifndef itkOutputBinaryStream_h
#define itkOutputBinaryStream_h

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
 *\class OutputBinaryStream
 * \brief Output text std::ostream for an itk::wasm::Pipeline
 *
 * This stream is written to the filesystem or memory when the object goes out of scope.
 * 
 * Call `Get()` to get the std::ostream & to use an output for a pipeline.
 * 
 * \ingroup WebAssemblyInterface
 */
class OutputBinaryStream
{
public:
  std::ostream & Get() {
    return *m_OStream;
  }

  void SetFileName(const std::string & fileName)
  {
    if (m_DeleteOStream && m_OStream != nullptr)
    {
      delete m_OStream;
    }
    m_OStream = new std::ofstream(fileName, std::ofstream::out | std::ofstream::binary);
    m_DeleteOStream = true;
  }

  OutputBinaryStream() = default;
  ~OutputBinaryStream();

  /** Output index. */
  void SetIdentifier(const std::string & identifier)
  {
    if (m_DeleteOStream && m_OStream != nullptr)
    {
      delete m_OStream;
    }
    m_DeleteOStream = false;
    m_WASMStringStream = WASMStringStream::New();

    m_OStream = &(m_WASMStringStream->GetStringStream());
    this->m_Identifier = identifier;
  }
  const std::string & GetIdentifier() const
  {
    return this->m_Identifier;
  }

protected:
  std::ostream * m_OStream{nullptr};
  bool m_DeleteOStream{false};

  std::string m_Identifier;

  WASMStringStream::Pointer m_WASMStringStream;
};


bool lexical_cast(const std::string &output, OutputBinaryStream &outputStream);

} // end namespace wasm
} // end namespace itk

#endif
