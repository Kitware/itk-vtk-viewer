import vtk from 'vtk.js/Sources/vtk'

const numpy2TypedArray = {
  int8: Int8Array,
  uint8: Uint8Array,
  int16: Int16Array,
  uint16: Uint16Array,
  int32: Int32Array,
  uint32: Uint32Array,
  float32: Float32Array,
  float64: Float64Array,
}

function ndarrayToPointSet(array) {
  if (array._rtype !== 'ndarray') {
    throw new Error('Invalid ndarray type: ' + array._rtype)
  }
  let arrayType = numpy2TypedArray[array._rdtype]
  if (array._rshape.length !== 2) {
    throw new Error(`Unsupported dimension: ${array._rshape.length}`)
  }
  if (array._rshape[1] === 2) {
    // convert to 3d point sets
    const originalPoints = new arrayType(array._rvalue)
    const newPoints = new Float32Array(
      new ArrayBuffer(array._rshape[0] * 3 * 4)
    )
    for (let i = 0; i < array._rshape[0]; i++) {
      newPoints[i * 3] = originalPoints[i * 2]
      newPoints[i * 3 + 1] = originalPoints[i * 2 + 1]
      newPoints[i * 3 + 2] = -5.0e-6
    }
    arrayType = Float32Array
    array = {
      _rtype: 'ndarray',
      _rdtype: 'float32',
      _rshape: [array._rshape[0], 3],
      _rvalue: newPoints.buffer,
    }
  } else if (array._rshape[1] !== 3) {
    throw new Error(`Unsupported shape: ${array._rshape}`)
  }
  const verts = new Uint32Array(new ArrayBuffer(array._rshape[0] * 2 * 4))
  for (let i = 0; i < array._rshape[0] * 2; i += 2) {
    verts[i] = 1
    verts[i + 1] = i / 2
  }
  return vtk({
    vtkClass: 'vtkPolyData',
    points: {
      vtkClass: 'vtkPoints',
      name: '_points',
      numberOfComponents: 3,
      dataType: arrayType.name,
      size: array._rshape[0],
      values: new arrayType(array._rvalue),
    },
    verts: {
      vtkClass: 'vtkCellArray',
      name: '_verts',
      numberOfComponents: 1,
      dataType: 'Uint32Array',
      size: array._rshape[0] * 2,
      values: verts,
    },
  })
}

export default ndarrayToPointSet
