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
#include "itkIOPixelEnumFromWASMPixelType.h"

namespace itk
{

IOPixelEnum
IOPixelEnumFromWASMPixelType( const std::string & wasmPixelType )
{
  if ( wasmPixelType == "Unknown" )
    {
    return IOPixelEnum::UNKNOWNPIXELTYPE;
    }
  else if ( wasmPixelType == "Scalar" )
    {
    return IOPixelEnum::SCALAR;
    }
  else if ( wasmPixelType == "RGB" )
    {
    return IOPixelEnum::RGB;
    }
  else if ( wasmPixelType == "RGBA" )
    {
    return IOPixelEnum::RGBA;
    }
  else if ( wasmPixelType == "Offset" )
    {
    return IOPixelEnum::OFFSET;
    }
  else if ( wasmPixelType == "Vector" )
    {
    return IOPixelEnum::VECTOR;
    }
  else if ( wasmPixelType == "Point" )
    {
    return IOPixelEnum::POINT;
    }
  else if ( wasmPixelType == "CovariantVector" )
    {
    return IOPixelEnum::COVARIANTVECTOR;
    }
  else if ( wasmPixelType == "SymmetricSecondRankTensor" )
    {
    return IOPixelEnum::SYMMETRICSECONDRANKTENSOR;
    }
  else if ( wasmPixelType == "DiffusionTensor3D" )
    {
    return IOPixelEnum::DIFFUSIONTENSOR3D;
    }
  else if ( wasmPixelType == "Complex" )
    {
    return IOPixelEnum::COMPLEX;
    }
  else if ( wasmPixelType == "FixedArray" )
    {
    return IOPixelEnum::FIXEDARRAY;
    }
  else if ( wasmPixelType == "Array" )
    {
    return IOPixelEnum::ARRAY;
    }
  else if ( wasmPixelType == "Matrix" )
    {
    return IOPixelEnum::MATRIX;
    }
  else if ( wasmPixelType == "VariableLengthVector" )
    {
    return IOPixelEnum::VARIABLELENGTHVECTOR;
    }
  else if ( wasmPixelType == "VariableSizeMatrix" )
    {
    return IOPixelEnum::VARIABLESIZEMATRIX;
    }

  return IOPixelEnum::UNKNOWNPIXELTYPE;
}

} // end namespace itk
