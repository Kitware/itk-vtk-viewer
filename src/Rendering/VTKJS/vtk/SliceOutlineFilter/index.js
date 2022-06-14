import macro from 'vtk.js/Sources/macros'
import vtkPolyData from 'vtk.js/Sources/Common/DataModel/PolyData'
import vtkMath from 'vtk.js/Sources/Common/Core/Math'
import { SlicingMode } from 'vtk.js/Sources/Rendering/Core/ImageMapper/Constants'

const { vtkErrorMacro } = macro

// prettier-ignore
export const BOUNDS_MAP = [
  0, 2, 4, // pt 0
  1, 2, 4, // pt 1
  0, 3, 4, // pt 2
  1, 3, 4, // pt 3
  0, 2, 5, // pt 4
  1, 2, 5, // pt 5
  0, 3, 5, // pt 6
  1, 3, 5, // pt 7
];

// prettier-ignore
export const LINE_ARRAY = [
  2, 0, 1,
  2, 2, 3,
  2, 4, 5,
  2, 6, 7,
  2, 0, 2,
  2, 1, 3,
  2, 4, 6,
  2, 5, 7,
  2, 0, 4,
  2, 1, 5,
  2, 2, 6,
  2, 3, 7,
];

// ----------------------------------------------------------------------------
// vtkSliceOutlineFilter methods
// ----------------------------------------------------------------------------

function vtkSliceOutlineFilter(publicAPI, model) {
  // Set our className
  model.classHierarchy.push('vtkOutlineFilter')

  const spatialBoundsForSlice = (input, thickness = 0) => {
    const image = input.getInputData()
    if (!image) {
      return vtkMath.createUninitializedBounds()
    }
    const extent = image.getSpatialExtent()
    const { ijkMode } = input.getClosestIJKAxis()
    let nSlice = input.getSlice()
    if (ijkMode !== model.slicingMode) {
      // If not IJK slicing, get the IJK slice from the XYZ position/slice
      nSlice = input.getSliceAtPosition(nSlice)
    }
    switch (ijkMode) {
      case SlicingMode.I:
        extent[0] = nSlice - thickness
        extent[1] = nSlice + thickness
        break
      case SlicingMode.J:
        extent[2] = nSlice - thickness
        extent[3] = nSlice + thickness
        break
      case SlicingMode.K:
        extent[4] = nSlice - thickness
        extent[5] = nSlice + thickness
        break
      default:
        break
    }
    return image.extentToBounds(extent)
  }

  publicAPI.requestData = (inData, outData) => {
    // implement requestData
    const input = inData[0]

    if (!input) {
      vtkErrorMacro('Invalid or missing input')
      return
    }

    const bounds = spatialBoundsForSlice(input)
    const output = vtkPolyData.newInstance()

    output
      .getPoints()
      .setData(Float32Array.from(BOUNDS_MAP.map(idx => bounds[idx])), 3)
    output.getLines().setData(Uint16Array.from(LINE_ARRAY))

    outData[0] = output
  }
}

// ----------------------------------------------------------------------------
// Object factory
// ----------------------------------------------------------------------------

const DEFAULT_VALUES = {}

// ----------------------------------------------------------------------------

export function extend(publicAPI, model, initialValues = {}) {
  Object.assign(model, DEFAULT_VALUES, initialValues)

  // Make this a VTK object
  macro.obj(publicAPI, model)

  // Also make it an algorithm with one input and one output
  macro.algo(publicAPI, model, 1, 1)

  // Object specific methods
  vtkSliceOutlineFilter(publicAPI, model)
}

// ----------------------------------------------------------------------------

export const newInstance = macro.newInstance(extend, 'vtkSliceOutlineFilter')

// ----------------------------------------------------------------------------

export default { newInstance, extend, BOUNDS_MAP, LINE_ARRAY }
