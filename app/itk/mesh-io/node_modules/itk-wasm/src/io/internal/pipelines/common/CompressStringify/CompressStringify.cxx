/*=========================================================================

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

#include <fstream>
#include <string>
#include <iostream>
#include <sstream>
#include <vector>
#include <iterator>

#include "zstd.h"
#include "cpp-base64/base64.h"

#include "itkPipeline.h"
#include "itkInputBinaryStream.h"
#include "itkOutputTextStream.h"
#include "itkOutputBinaryStream.h"

int compress(itk::wasm::Pipeline & pipeline, itk::wasm::InputBinaryStream & inputBinaryStream, int compressionLevel)
{
  itk::wasm::OutputBinaryStream outputBinaryStream;
  pipeline.add_option("Output", outputBinaryStream, "Output compressed binary");

  ITK_WASM_PARSE(pipeline);

  std::string inputBinary;
  inputBinary.assign( (std::istreambuf_iterator<char>(inputBinaryStream.Get()) ), 
                      (std::istreambuf_iterator<char>()) ); 


  const size_t compressedBufferSize = ZSTD_compressBound(inputBinary.size());
  std::vector<char> compressedBinary(compressedBufferSize);

  const size_t compressedSize = ZSTD_compress(compressedBinary.data(), compressedBufferSize, inputBinary.data(), inputBinary.size(), compressionLevel);
  compressedBinary.resize(compressedSize);

  std::ostream_iterator<char> oIt(outputBinaryStream.Get());
  std::copy(compressedBinary.begin(), compressedBinary.end(), oIt);

  return EXIT_SUCCESS;
}

int compressStringify(itk::wasm::Pipeline & pipeline, itk::wasm::InputBinaryStream & inputBinaryStream, int compressionLevel, const std::string & dataURLPrefix)
{
  itk::wasm::OutputTextStream outputTextStream;
  pipeline.add_option("Output", outputTextStream, "Output dataURL+base64 compressed binary");

  ITK_WASM_PARSE(pipeline);

  std::string inputBinary;
  inputBinary.assign( (std::istreambuf_iterator<char>(inputBinaryStream.Get()) ), 
                      (std::istreambuf_iterator<char>()) ); 


  const size_t compressedBufferSize = ZSTD_compressBound(inputBinary.size());
  std::string compressedBinary;
  compressedBinary.resize(compressedBufferSize);

  const size_t compressedSize = ZSTD_compress(compressedBinary.data(), compressedBufferSize, inputBinary.data(), inputBinary.size(), compressionLevel);
  compressedBinary.resize(compressedSize);

  // Do we want/need this?
  constexpr bool urlFriendly = false;
  auto outputText = base64_encode(compressedBinary, urlFriendly);

  outputTextStream.Get() << dataURLPrefix;
  outputTextStream.Get() << outputText;

  return EXIT_SUCCESS;
}

int main(int argc, char * argv[])
{
  itk::wasm::Pipeline pipeline("Given a binary, compress optionally base64 encode", argc, argv);

  itk::wasm::InputBinaryStream inputBinaryStream;
  pipeline.add_option("InputBinary", inputBinaryStream, "Input binary");

  bool stringify = false;
  pipeline.add_flag("-s,--stringify", stringify, "Stringify the output");

  int compressionLevel = 3;
  pipeline.add_option("-c,--compression-level", compressionLevel, "Compression level, typically 1-9");

  std::string dataURLPrefix("data:application/iwi+cbor+zstd;base64,");
  pipeline.add_option("-p,--data-url-prefix", dataURLPrefix, "dataURL prefix");

  ITK_WASM_PRE_PARSE(pipeline);

  if(stringify)
  {
    return compressStringify(pipeline, inputBinaryStream, compressionLevel, dataURLPrefix);
  }
  return compress(pipeline, inputBinaryStream, compressionLevel);
}
