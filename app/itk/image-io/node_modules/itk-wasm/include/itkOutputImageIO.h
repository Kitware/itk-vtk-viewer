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
#ifndef itkOutputImageIO_h
#define itkOutputImageIO_h

#include "itkPipeline.h"

#include "itkImageIOBase.h"
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
 *\class OutputImageIO
 * \brief Output image for an itk::wasm::Pipeline from an itk::ImageIOBase
 *
 * This image is written to the filesystem or memory when it goes out of scope.
 * 
 * This class is for the ReadImage itk-wasm pipeline. Most pipelines will use itk::wasm::OutputImage.
 * 
 * \ingroup WebAssemblyInterface
 */
class OutputImageIO
{
public:
  void Set(ImageIOBase * imageIO) {
    this->m_ImageIO = imageIO;
  }

  ImageIOBase * Get() const {
    return this->m_ImageIO.GetPointer();
  }

  /** FileName or output index. */
  void SetIdentifier(const std::string & identifier)
  {
    this->m_Identifier = identifier;
  }
  const std::string & GetIdentifier() const
  {
    return this->m_Identifier;
  }

  OutputImageIO() = default;
  ~OutputImageIO() {
    if(wasm::Pipeline::GetUseMemoryIO())
    {
#ifndef ITK_WASM_NO_MEMORY_IO
    if (!this->m_ImageIO.IsNull() && !this->m_Identifier.empty())
    {
    const auto index = std::stoi(this->m_Identifier);
    auto wasmImageIOBase = itk::WASMImageIOBase::New();
    wasmImageIOBase->SetImageIO(this->m_ImageIO);
    setMemoryStoreOutputDataObject(0, index, wasmImageIOBase);

    const auto dataAddress = reinterpret_cast< size_t >( &(wasmImageIOBase->GetPixelDataContainer()->at(0)) );
    const auto dataSize = wasmImageIOBase->GetPixelDataContainer()->size();
    setMemoryStoreOutputArray(0, index, 0, dataAddress, dataSize);

    const auto directionAddress = reinterpret_cast< size_t >( &(wasmImageIOBase->GetDirectionContainer()->at(0)) );
    const auto directionSize = wasmImageIOBase->GetDirectionContainer()->size() * sizeof(double);
    setMemoryStoreOutputArray(0, index, 1, directionAddress, directionSize);
    }
#else
    throw std::logic_error("Memory IO not supported");
#endif
    }
    else
    {
#ifndef ITK_WASM_NO_FILESYSTEM_IO
    if (!this->m_ImageIO.IsNull() && !this->m_Identifier.empty())
    {
      this->m_ImageIO->ReadImageInformation();

      auto wasmImageIO = itk::WASMImageIO::New();

      const unsigned int dimension = this->m_ImageIO->GetNumberOfDimensions();
      wasmImageIO->SetNumberOfDimensions(dimension);
      wasmImageIO->SetComponentType(this->m_ImageIO->GetComponentType());
      wasmImageIO->SetNumberOfComponents(this->m_ImageIO->GetNumberOfComponents());
      wasmImageIO->SetPixelType(this->m_ImageIO->GetPixelType());
      for (unsigned int dim = 0; dim < dimension; ++dim)
      {
        wasmImageIO->SetDirection(dim, this->m_ImageIO->GetDirection(dim));
        wasmImageIO->SetOrigin(dim, this->m_ImageIO->GetOrigin(dim));
        wasmImageIO->SetSpacing(dim, this->m_ImageIO->GetSpacing(dim));
        wasmImageIO->SetDimensions(dim, this->m_ImageIO->GetDimensions(dim));
      }

      std::vector<char> pixelData(this->m_ImageIO->GetImageSizeInBytes());
      itk::ImageIORegion ioRegion( dimension );
      for(unsigned int dim = 0; dim < dimension; ++dim)
        {
        ioRegion.SetSize(dim, this->m_ImageIO->GetDimensions( dim ));
        }
      this->m_ImageIO->SetIORegion( ioRegion );
      this->m_ImageIO->SetUseStreamedReading(false);
      this->m_ImageIO->Read(reinterpret_cast< void * >( &(pixelData.at(0)) ));

      wasmImageIO->SetFileName(this->m_Identifier);
      wasmImageIO->WriteImageInformation();
      wasmImageIO->SetIORegion( ioRegion );
      wasmImageIO->Write(reinterpret_cast< void * >( &(pixelData.at(0)) ));
    }
#else
    throw std::logic_error("Filesystem IO not supported");
#endif
    }
  }
protected:
  typename ImageIOBase::Pointer m_ImageIO;

  std::string m_Identifier;
};

bool lexical_cast(const std::string &input, OutputImageIO &outputImageIO)
{
  outputImageIO.SetIdentifier(input);
  return true;
}

} // namespace wasm
} // namespace itk

#endif
