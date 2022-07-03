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
#ifndef itkImageToWASMImageFilter_hxx
#define itkImageToWASMImageFilter_hxx

#include "itkImageToWASMImageFilter.h"

#include "itkDefaultConvertPixelTraits.h"

#include "itkWASMMapComponentType.h"
#include "itkWASMMapPixelType.h"

#include "rapidjson/document.h"
#include "rapidjson/stringbuffer.h"
#include "rapidjson/writer.h"

namespace itk
{

template <typename TImage>
ImageToWASMImageFilter<TImage>
::ImageToWASMImageFilter()
{
  this->SetNumberOfRequiredInputs(1);

  typename WASMImageType::Pointer output = static_cast<WASMImageType *>(this->MakeOutput(0).GetPointer());
  this->ProcessObject::SetNumberOfRequiredOutputs(1);
  this->ProcessObject::SetNthOutput(0, output.GetPointer());
}

template <typename TImage>
ProcessObject::DataObjectPointer
ImageToWASMImageFilter<TImage>
::MakeOutput(ProcessObject::DataObjectPointerArraySizeType)
{
  return WASMImageType::New().GetPointer();
}

template <typename TImage>
ProcessObject::DataObjectPointer
ImageToWASMImageFilter<TImage>
::MakeOutput(const ProcessObject::DataObjectIdentifierType &)
{
  return WASMImageType::New().GetPointer();
}

template <typename TImage>
auto
ImageToWASMImageFilter<TImage>
::GetOutput() -> WASMImageType *
{
  // we assume that the first output is of the templated type
  return itkDynamicCastInDebugMode<WASMImageType *>(this->GetPrimaryOutput());
}

template <typename TImage>
auto
ImageToWASMImageFilter<TImage>
::GetOutput() const -> const WASMImageType *
{
  // we assume that the first output is of the templated type
  return itkDynamicCastInDebugMode<const WASMImageType *>(this->GetPrimaryOutput());
}

template <typename TImage>
auto
ImageToWASMImageFilter<TImage>
::GetOutput(unsigned int idx) -> WASMImageType *
{
  auto * out = dynamic_cast<WASMImageType *>(this->ProcessObject::GetOutput(idx));

  if (out == nullptr && this->ProcessObject::GetOutput(idx) != nullptr)
  {
    itkWarningMacro(<< "Unable to convert output number " << idx << " to type " << typeid(WASMImageType).name());
  }
  return out;
}

template <typename TImage>
void
ImageToWASMImageFilter<TImage>
::SetInput(const ImageType * input)
{
  // Process object is not const-correct so the const_cast is required here
  this->ProcessObject::SetNthInput(0, const_cast<ImageType *>(input));
}

template <typename TImage>
void
ImageToWASMImageFilter<TImage>
::SetInput(unsigned int index, const ImageType * image)
{
  // Process object is not const-correct so the const_cast is required here
  this->ProcessObject::SetNthInput(index, const_cast<ImageType *>(image));
}

template <typename TImage>
const typename ImageToWASMImageFilter<TImage>::ImageType *
ImageToWASMImageFilter<TImage>
::GetInput()
{
  return itkDynamicCastInDebugMode<const ImageType *>(this->GetPrimaryInput());
}

template <typename TImage>
const typename ImageToWASMImageFilter<TImage>::ImageType *
ImageToWASMImageFilter<TImage>
::GetInput(unsigned int idx)
{
  return itkDynamicCastInDebugMode<const TImage *>(this->ProcessObject::GetInput(idx));
}

template <typename TImage>
void
ImageToWASMImageFilter<TImage>
::GenerateData()
{
  // Get the input and output pointers
  const ImageType * image = this->GetInput();
  WASMImageType * imageJSON = this->GetOutput();

  imageJSON->SetImage(image);

  using PixelType = typename TImage::IOPixelType;
  using ConvertPixelTraits = DefaultConvertPixelTraits<PixelType>;
  using ComponentType = typename ConvertPixelTraits::ComponentType;

  rapidjson::Document document;
  document.SetObject();
  rapidjson::Document::AllocatorType& allocator = document.GetAllocator();

  rapidjson::Value imageType;
  imageType.SetObject();

  const unsigned int dimension = image->GetImageDimension();
  imageType.AddMember("dimension", rapidjson::Value(dimension).Move(), allocator );

  rapidjson::Value componentType;
  componentType.SetString( wasm::MapComponentType<ComponentType>::ComponentString.data(), allocator );
  imageType.AddMember("componentType", componentType.Move(), allocator );

  rapidjson::Value pixelType;
  pixelType.SetString( wasm::MapPixelType<PixelType>::PixelString.data(), allocator );
  imageType.AddMember("pixelType", pixelType.Move(), allocator );

  imageType.AddMember("components", rapidjson::Value( ConvertPixelTraits::GetNumberOfComponents() ).Move(), allocator );

  document.AddMember( "imageType", imageType.Move(), allocator );

  rapidjson::Value origin(rapidjson::kArrayType);
  const auto imageOrigin = image->GetOrigin();
  for( unsigned int ii = 0; ii < dimension; ++ii )
    {
    origin.PushBack(rapidjson::Value().SetDouble(imageOrigin[ii]), allocator);
    }
  document.AddMember( "origin", origin.Move(), allocator );

  rapidjson::Value spacing(rapidjson::kArrayType);
  const auto imageSpacing = image->GetSpacing();
  for( unsigned int ii = 0; ii < dimension; ++ii )
    {
    spacing.PushBack(rapidjson::Value().SetDouble(imageSpacing[ii]), allocator);
    }
  document.AddMember( "spacing", spacing.Move(), allocator );

  const auto direction = reinterpret_cast< size_t >( image->GetDirection().GetVnlMatrix().begin() );
  std::ostringstream directionStream;
  directionStream << "data:application/vnd.itk.address,0:";
  directionStream << direction;
  rapidjson::Value directionString;
  directionString.SetString( directionStream.str().c_str(), allocator );
  document.AddMember( "direction", directionString.Move(), allocator );

  rapidjson::Value size(rapidjson::kArrayType);
  const auto imageSize = image->GetBufferedRegion().GetSize();
  for( unsigned int ii = 0; ii < dimension; ++ii )
    {
    size.PushBack(rapidjson::Value().SetInt(imageSize[ii]), allocator);
    }

  document.AddMember( "size", size.Move(), allocator );

  const auto data = reinterpret_cast< size_t >( image->GetBufferPointer() );
  std::ostringstream dataStream;
  dataStream << "data:application/vnd.itk.address,0:";
  dataStream << data;
  rapidjson::Value dataString;
  dataString.SetString( dataStream.str().c_str(), allocator );
  document.AddMember( "data", dataString.Move(), allocator );

  rapidjson::StringBuffer stringBuffer;
  rapidjson::Writer<rapidjson::StringBuffer> writer(stringBuffer);
  document.Accept(writer);

  imageJSON->SetJSON(stringBuffer.GetString());
}

template <typename TImage>
void
ImageToWASMImageFilter<TImage>
::PrintSelf(std::ostream & os, Indent indent) const
{
  Superclass::PrintSelf(os, indent);
}
} // end namespace itk

#endif
