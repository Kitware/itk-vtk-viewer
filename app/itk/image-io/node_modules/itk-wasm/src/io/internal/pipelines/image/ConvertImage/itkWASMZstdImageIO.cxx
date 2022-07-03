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

#include "itkWASMZstdImageIO.h"
#include "zstd.h"

namespace itk
{

WASMZstdImageIO
::WASMZstdImageIO()
{
  this->AddSupportedWriteExtension(".iwi.cbor.zstd");
  this->AddSupportedReadExtension(".iwi.cbor.zstd");
}


WASMZstdImageIO
::~WASMZstdImageIO()
{
}


bool
WASMZstdImageIO
::CanReadFile(const char *filename)
{
  std::string fname = filename;

  bool extensionFound = false;
  std::string::size_type extensionPos = fname.rfind(".iwi");
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
WASMZstdImageIO
::ReadImageInformation()
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

  Superclass::ReadImageInformation();
}


void
WASMZstdImageIO
::Read( void *buffer )
{
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

    this->ReadCBOR(buffer, reinterpret_cast< unsigned char *>(&(decompressedBinary.at(0))), decompressedSize);
    return;
  }

  Superclass::Read(buffer);
}


bool
WASMZstdImageIO
::CanWriteFile(const char *name)
{
  std::string filename = name;

  if( filename == "" )
    {
    return false;
    }

  bool extensionFound = false;
  std::string::size_type iwiPos = filename.rfind(".iwi");
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
WASMZstdImageIO
::WriteImageInformation()
{
  Superclass::WriteImageInformation();
}


void
WASMZstdImageIO
::Write( const void *buffer )
{
  const std::string path(this->GetFileName());

  std::string::size_type cborPos = path.rfind(".zstd");
  if ( ( cborPos != std::string::npos )
       && ( cborPos == path.length() - 5 ) )
  {
    unsigned char * inputBinary;
    const size_t inputBinarySize = this->WriteCBOR(buffer, &inputBinary, true);

    const size_t compressedBufferSize = ZSTD_compressBound(inputBinarySize);
    std::vector<char> compressedBinary(compressedBufferSize);

    constexpr int compressionLevel = 3;
    const size_t compressedSize = ZSTD_compress(compressedBinary.data(), compressedBufferSize, inputBinary, inputBinarySize, compressionLevel);
    free(inputBinary);
    compressedBinary.resize(compressedSize);

    std::ofstream outputStream;
    this->OpenFileForWriting( outputStream, path.c_str(), true, false );
    std::ostream_iterator<char> oIt(outputStream);
    std::copy(compressedBinary.begin(), compressedBinary.end(), oIt);
    return;
  }

  Superclass::Write( buffer );
}

} // end namespace itk
