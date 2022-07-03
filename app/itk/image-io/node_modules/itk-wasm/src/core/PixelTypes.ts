const PixelTypes = {
  Unknown: 'Unknown',
  Scalar: 'Scalar',
  RGB: 'RGB',
  RGBA: 'RGBA',
  Offset: 'Offset',
  Vector: 'Vector',
  Point: 'Point',
  CovariantVector: 'CovariantVector',
  SymmetricSecondRankTensor: 'SymmetricSecondRankTensor',
  DiffusionTensor3D: 'DiffusionTensor3D',
  Complex: 'Complex',
  FixedArray: 'FixedArray',
  Array: 'Array',
  Matrix: 'Matrix',
  VariableLengthVector: 'VariableLengthVector',
  VariableSizeMatrix: 'VariableSizeMatrix'
} as const

export default PixelTypes
