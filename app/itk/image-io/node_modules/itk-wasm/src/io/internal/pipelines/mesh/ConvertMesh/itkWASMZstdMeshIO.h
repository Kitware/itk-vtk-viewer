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
#ifndef itkWASMZstdMeshIO_h
#define itkWASMZstdMeshIO_h
#include "WebAssemblyInterfaceExport.h"

#include "itkWASMMeshIO.h"

namespace itk
{
/** \class WASMZstdMeshIO
 *
 * \brief Read and write an itk::Mesh in a web-friendly format.
 *
 * This format is intended to facilitate data exchange in itk-wasm.
 * It reads and writes an itk-wasm Mesh object in a CBOR file on the
 * filesystem with JSON files and binary files for TypedArray's.
 * 
 * This class extends WASMMeshIO by adding support for zstandard compression.
 *
 * The file extensions used are .iwm, .iwm.cbor, and .iwm.cbor.zstd.
 * 
 * \ingroup IOFilters
 * \ingroup WebAssemblyInterface
 */
class WebAssemblyInterface_EXPORT WASMZstdMeshIO: public WASMMeshIO
{
public:
  /** Standard class typedefs. */
  typedef WASMZstdMeshIO      Self;
  typedef WASMMeshIO          Superclass;
  typedef SmartPointer< Self > Pointer;

  /** Method for creation through the object factory. */
  itkNewMacro(Self);

  /** Run-time type information (and related methods). */
  itkTypeMacro(WASMZstdMeshIO, WASMMeshIO);

  /** Determine the file type. Returns true if this MeshIO can read the
   * file specified. */
  bool CanReadFile(const char *) override;

  /** Set the spacing and dimension information for the set filename. */
  void ReadMeshInformation() override;

  /** Determine the file type. Returns true if this MeshIO can write the
   * file specified. */
  bool CanWriteFile(const char *) override;

  void Write() override;

protected:
  WASMZstdMeshIO();
  ~WASMZstdMeshIO() override;

private:
  ITK_DISALLOW_COPY_AND_ASSIGN(WASMZstdMeshIO);
};
} // end namespace itk

#endif // itkWASMZstdMeshIO_h
