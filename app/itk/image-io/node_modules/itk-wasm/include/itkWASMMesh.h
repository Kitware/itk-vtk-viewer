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
#ifndef itkWASMMesh_h
#define itkWASMMesh_h

#include "itkWASMDataObject.h"
#include "itkVectorContainer.h"

namespace itk
{
/**
 *\class WASMMesh
 * \brief JSON representation for an itk::Mesh
 *
 * JSON representation for an itk::Mesh for interfacing across programming languages and runtimes.
 *
 * Point, CellBuffer, PointData, and CellData binary array buffer's are stored as strings with memory addresses or paths on disks or a virtual filesystem.
 * 
 * - 0: Point buffer
 * - 1: Cell buffer
 * - 2: Point data buffer
 * - 2: Cell data buffer
 *
 * \ingroup WebAssemblyInterface
 */
template <typename TMesh>
class ITK_TEMPLATE_EXPORT WASMMesh : public WASMDataObject
{
public:
  ITK_DISALLOW_COPY_AND_MOVE(WASMMesh);

  /** Standard class type aliases. */
  using Self = WASMMesh;
  using Superclass = WASMDataObject;
  using Pointer = SmartPointer<Self>;
  using ConstPointer = SmartPointer<const Self>;

  itkNewMacro(Self);
  /** Run-time type information (and related methods). */
  itkTypeMacro(WASMMesh, WASMDataObject);

  using MeshType = TMesh;

  using PointIdentifier = typename MeshType::PointIdentifier;
  using CellIdentifier = typename MeshType::CellIdentifier;
  using CellBufferContainerType = VectorContainer<SizeValueType, CellIdentifier>;

  void SetMesh(const MeshType * mesh);

  const MeshType * GetMesh() const {
    return static_cast< const MeshType * >(this->GetDataObject());
  }

  const CellBufferContainerType * GetCellBuffer() const {
    return this->m_CellBufferContainer.GetPointer();
  }

protected:
  WASMMesh()
  {
    this->m_CellBufferContainer = CellBufferContainerType::New();
  }
  ~WASMMesh() override = default;

  typename CellBufferContainerType::Pointer m_CellBufferContainer;
};

} // namespace itk

#ifndef ITK_MANUAL_INSTANTIATION
#  include "itkWASMMesh.hxx"
#endif

#endif
