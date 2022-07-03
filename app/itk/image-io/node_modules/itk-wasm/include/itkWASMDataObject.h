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
#ifndef itkWASMDataObject_h
#define itkWASMDataObject_h
#include "WebAssemblyInterfaceExport.h"

#include "itkDataObject.h"

namespace itk
{
/** \class WASMDataObject
 * \brief JSON representation for an itk::DataObject
 *
 * JSON-based WASM representation for itk::DataObject's for interfacing across programming languages and runtimes.
 * 
 * Binary array buffer's are stored as strings with memory addresses or paths on disks or a virtual filesystem.
 * 
 * \ingroup WebAssemblyInterface
 */
class WebAssemblyInterface_EXPORT WASMDataObject : public DataObject
{
public:
  ITK_DISALLOW_COPY_AND_MOVE(WASMDataObject);

  /** Standard smart pointer declarations */
  using Self = WASMDataObject;
  using Superclass = DataObject;
  using Pointer = SmartPointer<Self>;
  using ConstPointer = SmartPointer<const Self>;
  itkNewMacro(Self);
  itkTypeMacro(WASMDataObject, DataObject);

  /** Get/Set the DataObject JSON representation. */
  itkSetStringMacro(JSON);
  virtual const std::string & GetJSON() const
  {
    return this->m_JSON;
  }

  /** Get/Set the DataObject used to generate the JSON representation.
   * 
   * We hold a reference to this object. */
  itkGetConstObjectMacro(DataObject, DataObject);
  itkSetObjectMacro(DataObject, DataObject);

protected:
  WASMDataObject() = default;
  ~WASMDataObject() override = default;
  void
  PrintSelf(std::ostream & os, Indent indent) const override;

  std::string m_JSON;
  DataObject::ConstPointer m_DataObject;
};

} // end namespace itk

#endif
