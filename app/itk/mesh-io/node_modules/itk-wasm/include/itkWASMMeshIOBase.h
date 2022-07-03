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
#ifndef itkWASMMeshIOBase_h
#define itkWASMMeshIOBase_h
#include "WebAssemblyInterfaceExport.h"

#include "itkWASMDataObject.h"
#include "itkMeshIOBase.h"
#include "itkVectorContainer.h"

namespace itk
{
/**
 *\class WASMMeshIOBase
 * \brief JSON representation for an itk::MeshIOBase
 *
 * JSON representation for an itk::MeshIOBase for interfacing across programming languages and runtimes.
 * 
 * Points, Cells, PointData, CellData binary array buffer's are stored as strings with memory addresses or paths on disks or a virtual filesystem.
 * 
 * Arrays:
 * 
 * - 0: Points
 * - 1: Cells
 * - 2: PointData
 * - 3: CellData
 * 
 * \ingroup WebAssemblyInterface
 */
class WebAssemblyInterface_EXPORT WASMMeshIOBase : public WASMDataObject
{
public:
  ITK_DISALLOW_COPY_AND_MOVE(WASMMeshIOBase);

  /** Standard class type aliases. */
  using Self = WASMMeshIOBase;
  using Superclass = WASMDataObject;
  using Pointer = SmartPointer<Self>;
  using ConstPointer = SmartPointer<const Self>;

  itkNewMacro(Self);
  /** Run-time type information (and related methods). */
  itkTypeMacro(WASMMeshIOBase, WASMDataObject);

  using DataContainerType = VectorContainer<SizeValueType, char>;

  void SetMeshIO(MeshIOBase * imageIO, bool readMesh = true);
  const MeshIOBase * GetMeshIO() const {
    return m_MeshIOBase.GetPointer();
  }

  const DataContainerType * GetPointsContainer() const
  {
    return this->m_PointsContainer.GetPointer();
  }
  DataContainerType * GetPointsContainer()
  {
    return this->m_PointsContainer.GetPointer();
  }

  const DataContainerType * GetCellsContainer() const
  {
    return this->m_CellsContainer.GetPointer();
  }
  DataContainerType * GetCellsContainer()
  {
    return this->m_CellsContainer.GetPointer();
  }

  const DataContainerType * GetPointDataContainer() const
  {
    return this->m_PointDataContainer.GetPointer();
  }
  DataContainerType * GetPointDataContainer()
  {
    return this->m_PointDataContainer.GetPointer();
  }

  const DataContainerType * GetCellDataContainer() const
  {
    return this->m_CellDataContainer.GetPointer();
  }
  DataContainerType * GetCellDataContainer()
  {
    return this->m_CellDataContainer.GetPointer();
  }

protected:
  WASMMeshIOBase();
  ~WASMMeshIOBase() override = default;

  void
  PrintSelf(std::ostream & os, Indent indent) const override;

  DataContainerType::Pointer m_PointsContainer;
  DataContainerType::Pointer m_CellsContainer;
  DataContainerType::Pointer m_PointDataContainer;
  DataContainerType::Pointer m_CellDataContainer;

  MeshIOBase::ConstPointer m_MeshIOBase;
};

} // namespace itk

#endif
