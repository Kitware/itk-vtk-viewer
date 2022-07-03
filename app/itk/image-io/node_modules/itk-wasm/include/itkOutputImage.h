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
#ifndef itkOutputImage_h
#define itkOutputImage_h

#include "itkPipeline.h"

#ifndef ITK_WASM_NO_MEMORY_IO
#include "itkWASMExports.h"
#include "itkWASMImage.h"
#include "itkImageToWASMImageFilter.h"
#endif
#ifndef ITK_WASM_NO_FILESYSTEM_IO
#include "itkImageFileWriter.h"
#endif

namespace itk
{
namespace wasm
{
/**
 *\class OutputImage
 * \brief Output image for an itk::wasm::Pipeline
 *
 * This image is written to the filesystem or memory when it goes out of scope.
 * 
 * Call `GetImage()` to get the TImage * to use an input to a pipeline.
 * 
 * \ingroup WebAssemblyInterface
 */
template <typename TImage>
class ITK_TEMPLATE_EXPORT OutputImage
{
public:
  using ImageType = TImage;

  void Set(const ImageType * image) {
    this->m_Image = image;
  }

  const ImageType * Get() const {
    return this->m_Image.GetPointer();
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

  OutputImage() = default;
  ~OutputImage() {
    if(wasm::Pipeline::GetUseMemoryIO())
    {
#ifndef ITK_WASM_NO_MEMORY_IO
    if (!this->m_Image.IsNull() && !this->m_Identifier.empty())
      {
        using ImageToWASMImageFilterType = ImageToWASMImageFilter<ImageType>;
        auto imageToWASMImageFilter = ImageToWASMImageFilterType::New();
        imageToWASMImageFilter->SetInput(this->m_Image);
        imageToWASMImageFilter->Update();
        auto wasmImage = imageToWASMImageFilter->GetOutput();
        const auto index = std::stoi(this->m_Identifier);
        setMemoryStoreOutputDataObject(0, index, wasmImage);

        const auto dataAddress = reinterpret_cast< size_t >( wasmImage->GetImage()->GetBufferPointer() );
        using ConvertPixelTraits = DefaultConvertPixelTraits<typename ImageType::PixelType>;
        const auto dataSize = wasmImage->GetImage()->GetPixelContainer()->Size() * sizeof(typename ConvertPixelTraits::ComponentType) * ConvertPixelTraits::GetNumberOfComponents();
        setMemoryStoreOutputArray(0, index, 0, dataAddress, dataSize);

        const auto directionAddress = reinterpret_cast< size_t >( wasmImage->GetImage()->GetDirection().GetVnlMatrix().begin() );
        const auto directionSize = wasmImage->GetImage()->GetDirection().GetVnlMatrix().size() * sizeof(double);
        setMemoryStoreOutputArray(0, index, 1, directionAddress, directionSize);
      }
#else
    throw std::logic_error("Memory IO not supported");
#endif
    }
    else
    {
#ifndef ITK_WASM_NO_FILESYSTEM_IO
    if (!this->m_Image.IsNull() && !this->m_Identifier.empty())
      {
      itk::WriteImage(this->m_Image, this->m_Identifier);
      }
#else
    throw std::logic_error("Filesystem IO not supported");
#endif
    }
  }
protected:
  typename TImage::ConstPointer m_Image;

  std::string m_Identifier;
};

template <typename TImage>
bool lexical_cast(const std::string &input, OutputImage<TImage> &outputImage)
{
  outputImage.SetIdentifier(input);
  return true;
}

} // namespace wasm
} // namespace itk

#endif
