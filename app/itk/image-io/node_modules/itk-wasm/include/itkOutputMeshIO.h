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
#ifndef itkOutputMeshIO_h
#define itkOutputMeshIO_h

#include "itkPipeline.h"

#include "itkMeshIOBase.h"
#include "itkWASMMeshIOBase.h"
#include "itkWASMMeshIO.h"
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
 *\class OutputMeshIO
 * \brief Output image for an itk::wasm::Pipeline from an itk::MeshIOBase
 *
 * This image is written to the filesystem or memory when it goes out of scope.
 * 
 * This class is for the ReadMesh itk-wasm pipeline. Most pipelines will use itk::wasm::OutputMesh.
 * 
 * \ingroup WebAssemblyInterface
 */
class OutputMeshIO
{
public:
  void Set(MeshIOBase * imageIO) {
    this->m_MeshIO = imageIO;
  }

  MeshIOBase * Get() const {
    return this->m_MeshIO.GetPointer();
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

  OutputMeshIO() = default;
  ~OutputMeshIO() {
    if(wasm::Pipeline::GetUseMemoryIO())
    {
#ifndef ITK_WASM_NO_MEMORY_IO
    if (!this->m_MeshIO.IsNull() && !this->m_Identifier.empty())
    {
    const auto index = std::stoi(this->m_Identifier);
    auto wasmMeshIOBase = itk::WASMMeshIOBase::New();
    wasmMeshIOBase->SetMeshIO(this->m_MeshIO);
    setMemoryStoreOutputDataObject(0, index, wasmMeshIOBase);

    const auto pointsSize = wasmMeshIOBase->GetPointsContainer()->size();
    if (pointsSize)
    {
      const auto pointsAddress = reinterpret_cast< size_t >( &(wasmMeshIOBase->GetPointsContainer()->at(0)) );
      setMemoryStoreOutputArray(0, index, 0, pointsAddress, pointsSize);
    }

    const auto cellsSize = wasmMeshIOBase->GetCellsContainer()->size();
    if (cellsSize)
    {
      const auto cellsAddress = reinterpret_cast< size_t >( &(wasmMeshIOBase->GetCellsContainer()->at(0)) );
      setMemoryStoreOutputArray(0, index, 1, cellsAddress, cellsSize);
    }

    const auto pointDataSize = wasmMeshIOBase->GetPointDataContainer()->size();
    if (pointDataSize)
    {
      const auto pointDataAddress = reinterpret_cast< size_t >( &(wasmMeshIOBase->GetPointDataContainer()->at(0)) );
      setMemoryStoreOutputArray(0, index, 2, pointDataAddress, pointDataSize);
    }

    const auto cellDataSize = wasmMeshIOBase->GetCellDataContainer()->size();
    if (cellDataSize)
    {
      const auto cellDataAddress = reinterpret_cast< size_t >( &(wasmMeshIOBase->GetCellDataContainer()->at(0)) );
      setMemoryStoreOutputArray(0, index, 3, cellDataAddress, cellDataSize);
    }

    }
#else
    throw std::logic_error("Memory IO not supported");
#endif
    }
    else
    {
#ifndef ITK_WASM_NO_FILESYSTEM_IO
    if (!this->m_MeshIO.IsNull() && !this->m_Identifier.empty())
    {
      this->m_MeshIO->ReadMeshInformation();

      auto wasmMeshIO = itk::WASMMeshIO::New();
      wasmMeshIO->SetFileName(this->m_Identifier);

      const unsigned int dimension = this->m_MeshIO->GetPointDimension();
      wasmMeshIO->SetPointDimension(dimension);
      wasmMeshIO->SetPointComponentType(this->m_MeshIO->GetPointComponentType());
      wasmMeshIO->SetPointPixelType(this->m_MeshIO->GetPointPixelType());
      wasmMeshIO->SetPointPixelComponentType(this->m_MeshIO->GetPointPixelComponentType());
      wasmMeshIO->SetNumberOfPointPixelComponents(this->m_MeshIO->GetNumberOfPointPixelComponents());
      wasmMeshIO->SetCellComponentType(this->m_MeshIO->GetCellComponentType());
      wasmMeshIO->SetCellPixelType(this->m_MeshIO->GetCellPixelType());
      wasmMeshIO->SetCellPixelComponentType(this->m_MeshIO->GetCellPixelComponentType());
      wasmMeshIO->SetNumberOfCellPixelComponents(this->m_MeshIO->GetNumberOfCellPixelComponents());
      wasmMeshIO->SetNumberOfPoints(this->m_MeshIO->GetNumberOfPoints());
      wasmMeshIO->SetNumberOfPointPixels(this->m_MeshIO->GetNumberOfPointPixels());
      wasmMeshIO->SetNumberOfCells(this->m_MeshIO->GetNumberOfCells());
      wasmMeshIO->SetNumberOfCellPixels(this->m_MeshIO->GetNumberOfCellPixels());
      wasmMeshIO->SetCellBufferSize(this->m_MeshIO->GetCellBufferSize());

      wasmMeshIO->WriteMeshInformation();

      SizeValueType numberOfBytes = this->m_MeshIO->GetNumberOfPoints() * this->m_MeshIO->GetPointDimension() * WASMMeshIO::ITKComponentSize( this->m_MeshIO->GetPointComponentType() );
      std::vector<char> loadBuffer(numberOfBytes);
      if (numberOfBytes)
      {
        this->m_MeshIO->ReadPoints(reinterpret_cast< void * >( &(loadBuffer.at(0)) ));
        wasmMeshIO->WritePoints(reinterpret_cast< void * >( &(loadBuffer.at(0)) ));
      }

      numberOfBytes = static_cast< SizeValueType >( this->m_MeshIO->GetCellBufferSize() * WASMMeshIO::ITKComponentSize( this->m_MeshIO->GetCellComponentType() ));
      if (numberOfBytes)
      {
        loadBuffer.resize(numberOfBytes);
        this->m_MeshIO->ReadCells(reinterpret_cast< void * >( &(loadBuffer.at(0)) ));
        wasmMeshIO->WriteCells(reinterpret_cast< void * >( &(loadBuffer.at(0)) ));
      }

      numberOfBytes =
        static_cast< SizeValueType >(
           this->m_MeshIO->GetNumberOfPointPixels() * this->m_MeshIO->GetNumberOfPointPixelComponents() * WASMMeshIO::ITKComponentSize( this->m_MeshIO->GetPointPixelComponentType() )
           );
      if (numberOfBytes)
      {
        loadBuffer.resize(numberOfBytes);
        this->m_MeshIO->ReadPointData(reinterpret_cast< void * >( &(loadBuffer.at(0)) ));
        wasmMeshIO->WritePointData(reinterpret_cast< void * >( &(loadBuffer.at(0)) ));
      }

      numberOfBytes =
        static_cast< SizeValueType >(
           this->m_MeshIO->GetNumberOfCellPixels() * this->m_MeshIO->GetNumberOfCellPixelComponents() * WASMMeshIO::ITKComponentSize( this->m_MeshIO->GetCellPixelComponentType() )
           );
      if (numberOfBytes)
      {
        loadBuffer.resize(numberOfBytes);
        this->m_MeshIO->ReadCellData(reinterpret_cast< void * >( &(loadBuffer.at(0)) ));
        wasmMeshIO->WriteCellData(reinterpret_cast< void * >( &(loadBuffer.at(0)) ));
      }

      wasmMeshIO->Write();
    }
#else
    throw std::logic_error("Filesystem IO not supported");
#endif
    }
  }
protected:
  typename MeshIOBase::Pointer m_MeshIO;

  std::string m_Identifier;
};

bool lexical_cast(const std::string &input, OutputMeshIO &outputMeshIO)
{
  outputMeshIO.SetIdentifier(input);
  return true;
}

} // namespace wasm
} // namespace itk

#endif
