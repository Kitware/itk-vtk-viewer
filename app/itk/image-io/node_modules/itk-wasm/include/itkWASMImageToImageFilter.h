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
#ifndef itkWASMImageToImageFilter_h
#define itkWASMImageToImageFilter_h

#include "itkProcessObject.h"
#include "itkWASMImage.h"

namespace itk
{
/**
 *\class WASMImageToImageFilter
 * \brief Convert an WASMImage to an Image object.
 * 
 * TImage must match the type stored in the JSON representation or an exception will be shown.
 * 
 * \ingroup WebAssemblyInterface
 */
template <typename TImage>
class ITK_TEMPLATE_EXPORT WASMImageToImageFilter : public ProcessObject
{
public:
  ITK_DISALLOW_COPY_AND_MOVE(WASMImageToImageFilter);

  /** Standard class type aliases. */
  using Self = WASMImageToImageFilter;
  using Superclass = ProcessObject;
  using Pointer = SmartPointer<Self>;
  using ConstPointer = SmartPointer<const Self>;

  /** Method for creation through the object factory. */
  itkNewMacro(Self);

  /** Run-time type information (and related methods). */
  itkTypeMacro(WASMImageToImageFilter, ProcessObject);

  using DataObjectIdentifierType = Superclass::DataObjectIdentifierType;
  using DataObjectPointerArraySizeType = Superclass::DataObjectPointerArraySizeType;

  using ImageType = TImage;
  using WASMImageType = WASMImage<ImageType>;

  /** Set/Get the path input of this process object.  */
  using Superclass::SetInput;
  virtual void
  SetInput(const WASMImageType * image);

  virtual void
  SetInput(unsigned int, const WASMImageType * image);

  const WASMImageType *
  GetInput();

  const WASMImageType *
  GetInput(unsigned int idx);

  ImageType *
  GetOutput();
  const ImageType *
  GetOutput() const;

  ImageType *
  GetOutput(unsigned int idx);

protected:
  WASMImageToImageFilter();
  ~WASMImageToImageFilter() override = default;

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
#  include "itkWASMImageToImageFilter.hxx"
#endif

#endif
