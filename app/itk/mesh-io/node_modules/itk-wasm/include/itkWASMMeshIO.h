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
#ifndef itkWASMMeshIO_h
#define itkWASMMeshIO_h
#include "WebAssemblyInterfaceExport.h"

#include "itkMeshIOBase.h"
#include <fstream>

#include "rapidjson/document.h"
#include "cbor.h"

namespace itk
{
/** \class WASMMeshIO
 *
 * \brief Read and write the an itk::Mesh in a format for interfacing in WebAssembly (WASM).
 *
 * This format is intended to facilitate data exchange in itk-wasm.
 * It reads and writes an itk-wasm Mesh object where TypedArrays are
 * replaced by binary files on the filesystem or in a ZIP file.
 *
 * The format is experimental and subject to change. We mean it.
 *
 * \ingroup IOFilters
 * \ingroup WebAssemblyInterface
 */
class WebAssemblyInterface_EXPORT WASMMeshIO: public MeshIOBase
{
public:
  /** Standard class typedefs. */
  typedef WASMMeshIO           Self;
  typedef MeshIOBase           Superclass;
  typedef SmartPointer< Self > Pointer;

  /** Method for creation through the object factory. */
  itkNewMacro(Self);

  /** Run-time type information (and related methods). */
  itkTypeMacro(WASMMeshIO, MeshIOBase);

  bool CanReadFile(const char *) override;

  /** Determine the required information and whether need to ReadPoints,
    ReadCells, ReadPointData and ReadCellData */
  void ReadMeshInformation() override;

  /** Reads the data from disk into the memory buffer provided. */
  void ReadPoints(void *buffer) override;

  void ReadCells(void *buffer) override;

  void ReadPointData(void *buffer) override;

  void ReadCellData(void *buffer) override;

  /** Set the JSON representation of the image information. */
  void SetJSON(rapidjson::Document & json);

  /*-------- This part of the interfaces deals with writing data ----- */

  /** Writes the data to disk from the memory buffer provided. Make sure
     * that the IORegions has been set properly. */
  bool CanWriteFile(const char *)  override;

  void WriteMeshInformation() override;

  void WritePoints(void *buffer) override;

  void WriteCells(void *buffer) override;

  void WritePointData(void *buffer) override;

  void WriteCellData(void *buffer) override;

  void Write() override;

  /** Get the JSON representation of the mesh information. */
  rapidjson::Document GetJSON();

  static size_t ITKComponentSize( const CommonEnums::IOComponent );

protected:
  WASMMeshIO();
  ~WASMMeshIO() override;
  void PrintSelf(std::ostream & os, Indent indent) const override;

  /** \brief Opens a file for reading and random access
   *
   * \param[out] inputStream is an istream presumed to be opened for reading
   * \param[in] filename is the name of the file
   * \param[in] ascii optional (default is false);
   *                  if true than the file will be opened in ASCII mode,
   *                  which generally only applies to Windows
   *
   * The stream is closed if it's already opened. If an error is
   * encountered than an exception will be thrown.
   */
  void OpenFileForReading(std::ifstream & inputStream, const std::string & filename,
                                  bool ascii = false);

  /** \brief Opens a file for writing and random access
   *
   * \param[out] outputStream is an ostream presumed to be opened for writing
   * \param[in] filename is the name of the file
   * \param[in] truncate optional (default is true);
   *                     if true than the file's existing content is truncated,
   *                     if false than the file is opened for reading and
   *                     writing with existing content intact
   * \param[in] ascii optional (default is false);
   *                  if true than the file will be opened in ASCII mode,
   *                  which generally only applies to Windows
   *
   * The stream is closed if it's already opened. If an error is
   * encountered than an exception will be thrown.
   */
  void OpenFileForWriting(std::ofstream & outputStream, const std::string & filename,
                                  bool truncate = true, bool ascii = false);

  /** Convenient method to read a buffer as binary. Return true on success. */
  bool ReadBufferAsBinary(std::istream & os, void *buffer, SizeValueType numberOfBytesToBeRead);

  bool FileNameIsCBOR();
  void ReadCBORBuffer(const char * dataName, void * buffer, SizeValueType numberOfBytesToBeRead);
  void WriteCBORBuffer(const char * dataName, void * buffer, SizeValueType numberOfBytesToWrite, IOComponentEnum ioComponent);

  /** Reads in the mesh information and populates the related buffers. */
  void ReadCBOR(void * buffer = nullptr, unsigned char * cborBuffer = nullptr, size_t cborBufferLength = 0);
  /** Writes the buffers into the CBOR item and the buffer out to disk. */
  void WriteCBOR();

  cbor_item_t * m_CBORRoot{ nullptr };

private:
  ITK_DISALLOW_COPY_AND_ASSIGN(WASMMeshIO);
};
} // end namespace itk

#endif // itkWASMMeshIO_h
