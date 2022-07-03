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
#include "itkWASMPixelTypeFromIOPixelEnum.h"

namespace itk
{

std::string
WASMPixelTypeFromIOPixelEnum(const IOPixelEnum ioPixel)
{
  switch ( ioPixel )
    {
    case IOPixelEnum::UNKNOWNPIXELTYPE:
      return "Unknown";
    case IOPixelEnum::SCALAR:
      return "Scalar";
    case IOPixelEnum::RGB:
      return "RGB";
    case IOPixelEnum::RGBA:
      return "RGBA";
    case IOPixelEnum::OFFSET:
      return "Offset";
    case IOPixelEnum::VECTOR:
      return "Vector";
    case IOPixelEnum::POINT:
      return "Point";
    case IOPixelEnum::COVARIANTVECTOR:
      return "CovariantVector";
    case IOPixelEnum::SYMMETRICSECONDRANKTENSOR:
      return "SymmetricSecondRankTensor";
    case IOPixelEnum::DIFFUSIONTENSOR3D:
      return "DiffusionTensor3D";
    case IOPixelEnum::COMPLEX:
      return "Complex";
    case IOPixelEnum::FIXEDARRAY:
      return "FixedArray";
    case IOPixelEnum::ARRAY:
      return "Array";
    case IOPixelEnum::MATRIX:
      return "Matrix";
    case IOPixelEnum::VARIABLELENGTHVECTOR:
      return "VariableLengthVector";
    case IOPixelEnum::VARIABLESIZEMATRIX:
      return "VariableSizeMatrix";
    }

  return "Unknown";
}

} // end namespace itk
