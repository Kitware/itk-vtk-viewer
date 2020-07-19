import vtkProxySource from 'vtk.js/Sources/Proxy/Core/SourceProxy'
import vtkGeometryRepresentationProxy from 'vtk.js/Sources/Proxy/Representations/GeometryRepresentationProxy'
import vtkVolumeRepresentationProxy from 'vtk.js/Sources/Proxy/Representations/VolumeRepresentationProxy'
import vtkSliceRepresentationProxy from 'vtk.js/Sources/Proxy/Representations/SliceRepresentationProxy'
import vtkPiecewiseFunctionProxy from 'vtk.js/Sources/Proxy/Core/PiecewiseFunctionProxy'
import vtkLookupTableProxy from 'vtk.js/Sources/Proxy/Core/LookupTableProxy'
import vtkPointSetRepresentationProxy from './PointSetRepresentationProxy'

import ItkVtkView from './ItkVtkViewProxy'

const commonInteractor = [
  { type: 'pan', options: { button: 3 } }, // Pan on Right button drag
  { type: 'pan', options: { button: 1, shift: true } }, // Pan on Shift + Left button drag
  { type: 'zoom', options: { button: 1, control: true } }, // Zoom on Ctrl + Left button drag
  { type: 'zoom', options: { dragEnabled: false, scrollEnabled: true } }, // Zoom on scroll
]

const interactorStyle3D = commonInteractor.concat([
  { type: 'rotate', options: { button: 1 } }, // Rotate on Left button drag
])

const interactorStyle2D = commonInteractor.concat([
  { type: 'pan', options: { button: 1 } }, // Pan on Left button drag
])

const proxyManagerConfiguration = {
  definitions: {
    Proxy: {
      LookupTable: {
        class: vtkLookupTableProxy,
      },
      PiecewiseFunction: {
        class: vtkPiecewiseFunctionProxy,
      },
    },
    Sources: {
      TrivialProducer: {
        class: vtkProxySource,
        options: {},
      },
    },
    Representations: {
      Geometry: {
        class: vtkGeometryRepresentationProxy,
        options: {},
      },
      Slice: {
        class: vtkSliceRepresentationProxy,
        options: {},
      },
      Volume: {
        class: vtkVolumeRepresentationProxy,
        options: {},
      },
      PointSet: {
        class: vtkPointSetRepresentationProxy,
        options: {},
      },
    },
    Views: {
      ItkVtkView: {
        class: ItkVtkView,
        options: {
          axis: 1, // Y
          orientation: -1, // Y- (A)
          viewUp: [0, 0, 1], // Z+ (S)
          useParallelRendering: false,
        },
        props: {
          presetToInteractor3D: interactorStyle3D,
          presetToInteractor2D: interactorStyle2D,
        },
      },
    },
  },
  representations: {
    ItkVtkView: {
      vtkPolyData: { name: 'Geometry' },
      vtkImageData: { name: 'Volume' },
    },
  },
}

export default proxyManagerConfiguration
