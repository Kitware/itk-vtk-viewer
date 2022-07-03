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
#include "itkCommonEnums.h"
#include "itkMeshIOBase.h"
#include "itkMesh.h"
#include "itkOutputMeshIO.h"

#ifndef MESH_IO_CLASS
#error "MESH_IO_CLASS definition must be provided"
#endif

#if MESH_IO_CLASS == 0
#include "itkBYUMeshIO.h"
#elif MESH_IO_CLASS == 1
#include "itkFreeSurferAsciiMeshIO.h"
#elif MESH_IO_CLASS == 2
#include "itkFreeSurferBinaryMeshIO.h"
#elif MESH_IO_CLASS == 3
#include "itkVTKPolyDataMeshIO.h"
#elif MESH_IO_CLASS == 4
#include "itkOBJMeshIO.h"
#elif MESH_IO_CLASS == 5
#include "itkOFFMeshIO.h"
#elif MESH_IO_CLASS == 6
#include "itkSTLMeshIO.h"
#elif MESH_IO_CLASS == 7
#include "itkSWCMeshIO.h"
#elif MESH_IO_CLASS == 8
#elif MESH_IO_CLASS == 9
#include "itkWASMZstdMeshIO.h"
#elif MESH_IO_CLASS == 21
#elif MESH_IO_CLASS == 22
#include "itkWASMZstdMeshIO.h"
#else
#error "Unsupported MESH_IO_CLASS"
#endif
#include "itkWASMMeshIO.h"

#include "itkPipeline.h"
#include "itkOutputMesh.h"

template <typename TMeshIO>
int readMesh(const std::string & inputFileName, itk::wasm::OutputMeshIO & outputMeshIO, bool quiet)
{
  using MeshIOType = TMeshIO;

  auto meshIO = MeshIOType::New();

  if(!meshIO->CanReadFile(inputFileName.c_str()))
  {
    if(!quiet)
    {
      std::cerr << "Could not read file: " << inputFileName << std::endl;
    }
    return EXIT_FAILURE;
  }

  meshIO->SetFileName(inputFileName);
  outputMeshIO.Set(meshIO);

  return EXIT_SUCCESS;
}

int main (int argc, char * argv[])
{
  itk::wasm::Pipeline pipeline("Read an mesh file format and convert it to the itk-wasm file format", argc, argv);

  std::string inputFileName;
  pipeline.add_option("InputMesh", inputFileName, "Input mesh")->required()->check(CLI::ExistingFile);

  itk::wasm::OutputMeshIO outputMeshIO;
  pipeline.add_option("OutputMesh", outputMeshIO, "Output mesh")->required();

  bool quiet = false;
  pipeline.add_flag("-q,--quiet", quiet, "Less verbose output");

  ITK_WASM_PARSE(pipeline);

#if MESH_IO_CLASS == 0
  return readMesh<itk::BYUMeshIO>(inputFileName, outputMeshIO, quiet);
#elif MESH_IO_CLASS == 1
  return readMesh<itk::FreeSurferAsciiMeshIO>(inputFileName, outputMeshIO, quiet);
#elif MESH_IO_CLASS == 2
  return readMesh<itk::FreeSurferBinaryMeshIO>(inputFileName, outputMeshIO, quiet);
#elif MESH_IO_CLASS == 3
  return readMesh<itk::VTKPolyDataMeshIO>(inputFileName, outputMeshIO, quiet);
#elif MESH_IO_CLASS == 4
  return readMesh<itk::OBJMeshIO>(inputFileName, outputMeshIO, quiet);
#elif MESH_IO_CLASS == 5
  return readMesh<itk::OFFMeshIO>(inputFileName, outputMeshIO, quiet);
#elif MESH_IO_CLASS == 6
  return readMesh<itk::STLMeshIO>(inputFileName, outputMeshIO, quiet);
#elif MESH_IO_CLASS == 7
  return readMesh<itk::SWCMeshIO>(inputFileName, outputMeshIO, quiet);
#elif MESH_IO_CLASS == 8
  return readMesh<itk::WASMMeshIO>(inputFileName, outputMeshIO, quiet);
#elif MESH_IO_CLASS == 9
  return readMesh<itk::WASMZstdMeshIO>(inputFileName, outputMeshIO, quiet);
#else
#error "Unsupported MESH_IO_CLASS"
#endif
  return EXIT_SUCCESS;
}
