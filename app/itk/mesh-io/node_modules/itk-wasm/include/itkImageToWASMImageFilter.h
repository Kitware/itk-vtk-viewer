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
#ifndef itkImageToWASMImageFilter_h
#define itkImageToWASMImageFilter_h

#include "itkProcessObject.h"
#include "itkWASMImage.h"

namespace itk
{
/**
 *\class ImageToWASMImageFilter
 * \brief Convert an Image to an WASMImage object.
 * 
 * \ingroup WebAssemblyInterface
 */
template <typename TImage>
class ITK_TEMPLATE_EXPORT ImageToWASMImageFilter : public ProcessObject
{
public:
  ITK_DISALLOW_COPY_AND_MOVE(ImageToWASMImageFilter);

  /** Standard class type aliases. */
  using Self = ImageToWASMImageFilter;
  using Superclass = ProcessObject;
  using Pointer = SmartPointer<Self>;
  using ConstPointer = SmartPointer<const Self>;

  /** Method for creation through the object factory. */
  itkNewMacro(Self);

  /** Run-time type information (and related methods). */
  itkTypeMacro(ImageToWASMImageFilter, ProcessObject);

  using DataObjectIdentifierType = Superclass::DataObjectIdentifierType;
  using DataObjectPointerArraySizeType = Superclass::DataObjectPointerArraySizeType;

  using ImageType = TImage;
  using WASMImageType = WASMImage<ImageType>;

  /** Set/Get the path input of this process object.  */
  using Superclass::SetInput;
  virtual void
  SetInput(const ImageType * image);

  virtual void
  SetInput(unsigned int, const ImageType * image);

  const ImageType *
  GetInput();

  const ImageType *
  GetInput(unsigned int idx);

  WASMImageType *
  GetOutput();
  const WASMImageType *
  GetOutput() const;

  WASMImageType *
  GetOutput(unsigned int idx);

protected:
  ImageToWASMImageFilter();
  ~ImageToWASMImageFilter() override = default;

  ProcessObject::DataObjectPointer
  MakeOutput(ProcessObject::DataObjectPointerArraySizeType idx) override;
  ProcessObject::DataObjectPointer
  MakeOutput(const ProcessObject::DataObjectIdentifierType &) override;

  void
  GenerateOutputInformation() override
  {} // do nothing
  void
  GenerateData() override;

  void
  PrintSelf(std::ostream & os, Indent indent) const override;
};
} // end namespace itk

#ifndef ITK_MANUAL_INSTANTIATION
#  include "itkImageToWASMImageFilter.hxx"
#endif

#endif
