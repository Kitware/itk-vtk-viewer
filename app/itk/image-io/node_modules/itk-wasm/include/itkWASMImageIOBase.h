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
#ifndef itkWASMImageIOBase_h
#define itkWASMImageIOBase_h
#include "WebAssemblyInterfaceExport.h"

#include "itkWASMDataObject.h"
#include "itkImageIOBase.h"
#include "itkVectorContainer.h"

namespace itk
{
/**
 *\class WASMImageIOBase
 * \brief JSON representation for an itk::ImageIOBase
 *
 * JSON representation for an itk::ImageIOBase for interfacing across programming languages and runtimes.
 * 
 * Pixel and Direction binary array buffer's are stored as strings with memory addresses or paths on disks or a virtual filesystem.
 * 
 * Arrays:
 * 
 * - 0: Pixel buffer `data`
 * - 1: Orientation `direction`
 * 
 * \ingroup WebAssemblyInterface
 */
class WebAssemblyInterface_EXPORT WASMImageIOBase : public WASMDataObject
{
public:
  ITK_DISALLOW_COPY_AND_MOVE(WASMImageIOBase);

  /** Standard class type aliases. */
  using Self = WASMImageIOBase;
  using Superclass = WASMDataObject;
  using Pointer = SmartPointer<Self>;
  using ConstPointer = SmartPointer<const Self>;

  itkNewMacro(Self);
  /** Run-time type information (and related methods). */
  itkTypeMacro(WASMImageIOBase, WASMDataObject);

  using DirectionContainerType = VectorContainer<SizeValueType, double>;
  using PixelDataContainerType = VectorContainer<SizeValueType, char>;

  void SetImageIO(ImageIOBase * imageIO, bool readImage = true);
  const ImageIOBase * GetImageIO() const {
    return m_ImageIOBase.GetPointer();
  }

  const DirectionContainerType * GetDirectionContainer() const
  {
    return this->m_DirectionContainer.GetPointer();
  }
  DirectionContainerType * GetDirectionContainer()
  {
    return this->m_DirectionContainer.GetPointer();
  }

  const PixelDataContainerType * GetPixelDataContainer() const
  {
    return this->m_PixelDataContainer.GetPointer();
  }
  PixelDataContainerType * GetPixelDataContainer()
  {
    return this->m_PixelDataContainer.GetPointer();
  }

protected:
  WASMImageIOBase();
  ~WASMImageIOBase() override = default;

  void
  PrintSelf(std::ostream & os, Indent indent) const override;

  DirectionContainerType::Pointer m_DirectionContainer;
  PixelDataContainerType::Pointer m_PixelDataContainer;

  ImageIOBase::ConstPointer m_ImageIOBase;
};

} // namespace itk

#endif
