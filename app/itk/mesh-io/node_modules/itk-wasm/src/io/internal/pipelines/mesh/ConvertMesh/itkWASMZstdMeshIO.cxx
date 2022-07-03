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

#include "itkWASMZstdMeshIO.h"
#include "zstd.h"

namespace itk
{

WASMZstdMeshIO
::WASMZstdMeshIO()
{
  this->AddSupportedWriteExtension(".iwm.cbor.zstd");
  this->AddSupportedReadExtension(".iwm.cbor.zstd");
}


WASMZstdMeshIO
::~WASMZstdMeshIO()
{
}


bool
WASMZstdMeshIO
::CanReadFile(const char *filename)
{
  std::string fname = filename;

  bool extensionFound = false;
  std::string::size_type extensionPos = fname.rfind(".iwm");
  if ( extensionPos != std::string::npos )
    {
    extensionFound = true;
    }

  if ( !extensionFound )
    {
    itkDebugMacro(<< "The filename extension is not recognized");
    return false;
    }

  return true;
}



void
WASMZstdMeshIO
::ReadMeshInformation()
{
  this->SetByteOrderToLittleEndian();

  const std::string path = this->GetFileName();

  std::string::size_type zstdPos = path.rfind(".zstd");
  if ( ( zstdPos != std::string::npos )
       && ( zstdPos == path.length() - 5 ) )
  {
    std::ifstream dataStream;
    this->OpenFileForReading( dataStream, this->GetFileName() );

    std::ostringstream ostrm;
    ostrm << dataStream.rdbuf();
    auto inputBinary = ostrm.str();

    const size_t decompressedBufferSize = ZSTD_getFrameContentSize(inputBinary.data(), inputBinary.size());
    std::vector<char> decompressedBinary(decompressedBufferSize);

    const size_t decompressedSize = ZSTD_decompress(decompressedBinary.data(), decompressedBufferSize, inputBinary.data(), inputBinary.size());
    decompressedBinary.resize(decompressedSize);

    this->ReadCBOR(nullptr, reinterpret_cast< unsigned char *>(&(decompressedBinary.at(0))), decompressedSize);
    return;
  }

  Superclass::ReadMeshInformation();
}


bool
WASMZstdMeshIO
::CanWriteFile(const char *name)
{
  std::string filename = name;

  if( filename == "" )
    {
    return false;
    }

  bool extensionFound = false;
  std::string::size_type iwiPos = filename.rfind(".iwm");
  if ( iwiPos != std::string::npos )
    {
    extensionFound = true;
    }

  if ( !extensionFound )
    {
    itkDebugMacro(<< "The filename extension is not recognized");
    return false;
    }

  return true;
}


void
WASMZstdMeshIO
::Write()
{
  const std::string path(this->GetFileName());

  std::string::size_type cborPos = path.rfind(".zstd");
  if ( ( cborPos != std::string::npos )
       && ( cborPos == path.length() - 5 ) )
  {
    unsigned char* cborBuffer;
    size_t cborBufferSize;
    size_t length = cbor_serialize_alloc(this->m_CBORRoot, &cborBuffer, &cborBufferSize);

    const size_t compressedBufferSize = ZSTD_compressBound(cborBufferSize);
    std::vector<char> compressedBinary(compressedBufferSize);

    constexpr int compressionLevel = 3;
    const size_t compressedSize = ZSTD_compress(compressedBinary.data(), compressedBufferSize, cborBuffer, cborBufferSize, compressionLevel);
    free(cborBuffer);
    cbor_decref(&(this->m_CBORRoot));

    compressedBinary.resize(compressedSize);

    std::ofstream outputStream;
    this->OpenFileForWriting( outputStream, path.c_str(), true, false );
    std::ostream_iterator<char> oIt(outputStream);
    std::copy(compressedBinary.begin(), compressedBinary.end(), oIt);
    return;
  }

  Superclass::Write();
}

} // end namespace itk
