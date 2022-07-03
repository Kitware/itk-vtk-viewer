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
#ifndef itkWASMPolyDataToPolyDataFilter_h
#define itkWASMPolyDataToPolyDataFilter_h

#include "itkProcessObject.h"
#include "itkWASMPolyData.h"

namespace itk
{
/**
 *\class WASMPolyDataToPolyDataFilter
 * \brief Convert an WASMPolyData to an PolyData object.
 *
 * TPolyData must match the type stored in the JSON representation or an exception will be shown.
 *
 * \ingroup WebAssemblyInterface
 */
template <typename TPolyData>
class ITK_TEMPLATE_EXPORT WASMPolyDataToPolyDataFilter : public ProcessObject
{
public:
  ITK_DISALLOW_COPY_AND_MOVE(WASMPolyDataToPolyDataFilter);

  /** Standard class type aliases. */
  using Self = WASMPolyDataToPolyDataFilter;
  using Superclass = ProcessObject;
  using Pointer = SmartPointer<Self>;
  using ConstPointer = SmartPointer<const Self>;

  /** Method for creation through the object factory. */
  itkNewMacro(Self);

  /** Run-time type information (and related methods). */
  itkTypeMacro(WASMPolyDataToPolyDataFilter, ProcessObject);

  using DataObjectIdentifierType = Superclass::DataObjectIdentifierType;
  using DataObjectPointerArraySizeType = Superclass::DataObjectPointerArraySizeType;

  using PolyDataType = TPolyData;
  using WASMPolyDataType = WASMPolyData<PolyDataType>;

  /** Set/Get the path input of this process object.  */
  using Superclass::SetInput;
  virtual void
  SetInput(const WASMPolyDataType * mesh);

  virtual void
  SetInput(unsigned int, const WASMPolyDataType * mesh);

  const WASMPolyDataType *
  GetInput();

  const WASMPolyDataType *
  GetInput(unsigned int idx);

  PolyDataType *
  GetOutput();
  const PolyDataType *
  GetOutput() const;

  PolyDataType *
  GetOutput(unsigned int idx);

protected:
  WASMPolyDataToPolyDataFilter();
  ~WASMPolyDataToPolyDataFilter() override = default;

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
#  include "itkWASMPolyDataToPolyDataFilter.hxx"
#endif

#endif
