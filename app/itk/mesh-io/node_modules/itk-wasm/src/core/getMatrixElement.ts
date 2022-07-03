import TypedArray from './TypedArray.js'

function getMatrixElement (matrixData: TypedArray, columns: number, row: number, column: number): number | bigint {
  return matrixData[column + row * columns]
}

export default getMatrixElement
