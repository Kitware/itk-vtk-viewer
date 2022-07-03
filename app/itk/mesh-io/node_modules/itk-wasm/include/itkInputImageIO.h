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
#ifndef itkInputImageIO_h
#define itkInputImageIO_h

#include "itkPipeline.h"
#include "itkWASMImageIOBase.h"
#include "itkWASMImageIO.h"

#ifndef ITK_WASM_NO_MEMORY_IO
#include "itkWASMExports.h"
#endif
#ifndef ITK_WASM_NO_FILESYSTEM_IO
#endif

namespace itk
{
namespace wasm
{

/**
 *\class InputImageIO
 * \brief Input image for an itk::wasm::Pipeline from an itk::ImageIOBase
 *
 * This image is read from the filesystem or memory when ITK_WASM_PARSE_ARGS is called.
 *
 * This class is for the WriteImage itk-wasm pipeline. Most pipelines will use itk::wasm::InputImage.
 *
 * \ingroup WebAssemblyInterface
 */
class InputImageIO
{
public:
  void Set(const WASMImageIOBase * imageIO) {
    this->m_WASMImageIOBase = imageIO;
  }

  const WASMImageIOBase * Get() const {
    return this->m_WASMImageIOBase.GetPointer();
  }

  InputImageIO() = default;
  ~InputImageIO() = default;
protected:
  typename WASMImageIOBase::ConstPointer m_WASMImageIOBase;
};


bool lexical_cast(const std::string &input, InputImageIO &inputImageIO)
{
  if (input.empty())
  {
    return false;
  }

  if (wasm::Pipeline::GetUseMemoryIO())
  {
#ifndef ITK_WASM_NO_MEMORY_IO
    const unsigned int index = std::stoi(input);
    auto json = getMemoryStoreInputJSON(0, index);
    rapidjson::Document document;
    document.Parse(json.c_str());

    auto wasmImageIO = itk::WASMImageIO::New();
    wasmImageIO->SetJSON(document);

    const unsigned int dimension = wasmImageIO->GetNumberOfDimensions();

    auto wasmImageIOBase = itk::WASMImageIOBase::New();
    const rapidjson::Value & directionJson = document["direction"];
    const std::string directionString( directionJson.GetString() );
    const double * directionPtr = reinterpret_cast< double * >( std::atol(directionString.substr(35).c_str()) );
    WASMImageIOBase::DirectionContainerType * directionContainer = wasmImageIOBase->GetDirectionContainer();
    directionContainer->resize(dimension*dimension);
    directionContainer->assign(directionPtr, directionPtr + dimension*dimension);

    const rapidjson::Value & dataJson = document["data"];
    const std::string dataString( dataJson.GetString() );
    const char * dataPtr = reinterpret_cast< char * >( std::atol(dataString.substr(35).c_str()) );
    WASMImageIOBase::PixelDataContainerType * pixelDataContainer = wasmImageIOBase->GetPixelDataContainer();
    const size_t pixelDataBytes = wasmImageIO->GetImageSizeInBytes();
    pixelDataContainer->resize(pixelDataBytes);
    pixelDataContainer->assign(dataPtr, dataPtr + pixelDataBytes);
    wasmImageIOBase->SetImageIO(wasmImageIO, false);
    wasmImageIOBase->SetJSON(json);

    inputImageIO.Set(wasmImageIOBase);
#else
    return false;
#endif
  }
  else
  {
#ifndef ITK_WASM_NO_FILESYSTEM_IO
    auto wasmImageIO = itk::WASMImageIO::New();
    wasmImageIO->SetFileName(input);

    auto wasmImageIOBase = itk::WASMImageIOBase::New();
    wasmImageIOBase->SetImageIO(wasmImageIO);

    inputImageIO.Set(wasmImageIOBase);
#else
    return false;
#endif
  }
  return true;
}

} // end namespace wasm
} // end namespace itk

#endif
