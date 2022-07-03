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
#include "itkInputTextStream.h"
#include "itkOutputBinaryStream.h"

int decompress(itk::wasm::Pipeline & pipeline)
{
  itk::wasm::InputBinaryStream inputBinaryStream;
  pipeline.add_option("Input", inputBinaryStream, "Compressed input");

  itk::wasm::OutputBinaryStream outputBinaryStream;
  pipeline.add_option("Output", outputBinaryStream, "Output decompressed binary");

  ITK_WASM_PARSE(pipeline);

  std::string inputBinary;
  inputBinary.assign( (std::istreambuf_iterator<char>(inputBinaryStream.Get()) ), 
                      (std::istreambuf_iterator<char>()) ); 


  const size_t decompressedBufferSize = ZSTD_getFrameContentSize(inputBinary.data(), inputBinary.size());
  std::vector<char> decompressedBinary(decompressedBufferSize);

  const size_t decompressedSize = ZSTD_decompress(decompressedBinary.data(), decompressedBufferSize, inputBinary.data(), inputBinary.size());
  decompressedBinary.resize(decompressedSize);

  std::ostream_iterator<char> oIt(outputBinaryStream.Get());
  std::copy(decompressedBinary.begin(), decompressedBinary.end(), oIt);

  return EXIT_SUCCESS;
}

int decodeDecompress(itk::wasm::Pipeline & pipeline)
{
  itk::wasm::InputTextStream inputTextStream;
  pipeline.add_option("Input", inputTextStream, "Compressed input");

  itk::wasm::OutputBinaryStream outputBinaryStream;
  pipeline.add_option("Output", outputBinaryStream, "Output decompressed binary");

  ITK_WASM_PARSE(pipeline);

  // Skip dataURLPrefix
  auto inputTextIt = std::istream_iterator<char>(inputTextStream.Get());
  while (*inputTextIt != ',')
  {
    inputTextIt++;
  }
  inputTextIt++;

  std::string inputText;
  inputText.assign( (inputTextIt), 
                    (std::istream_iterator<char>()) ); 

  auto inputBinary = base64_decode(inputText);

  const size_t decompressedBufferSize = ZSTD_getFrameContentSize(inputBinary.data(), inputBinary.size());
  std::vector<char> decompressedBinary(decompressedBufferSize);

  const size_t decompressedSize = ZSTD_decompress(decompressedBinary.data(), decompressedBufferSize, inputBinary.data(), inputBinary.size());
  decompressedBinary.resize(decompressedSize);

  std::ostream_iterator<char> oIt(outputBinaryStream.Get());
  std::copy(decompressedBinary.begin(), decompressedBinary.end(), oIt);

  return EXIT_SUCCESS;
}

int main(int argc, char * argv[])
{
  itk::wasm::Pipeline pipeline("Given a binary or string produced with CompressedStringify, decompress optionally base64 deencode", argc, argv);

  bool parseString = false;
  pipeline.add_flag("-s,--parse-string", parseString, "Parse the input string before decompression");

  ITK_WASM_PRE_PARSE(pipeline);

  if(parseString)
  {
    return decodeDecompress(pipeline);
  }
  return decompress(pipeline);
}

