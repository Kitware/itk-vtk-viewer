import vtkProxySource from 'vtk.js/Sources/Proxy/Core/SourceProxy';
import vtkGeometryRepresentationProxy from 'vtk.js/Sources/Proxy/Representations/GeometryRepresentationProxy';
import vtkMoleculeRepresentationProxy from 'vtk.js/Sources/Proxy/Representations/MoleculeRepresentationProxy';
import vtkVolumeRepresentationProxy from 'vtk.js/Sources/Proxy/Representations/VolumeRepresentationProxy';
import vtkSliceRepresentationProxy from 'vtk.js/Sources/Proxy/Representations/SliceRepresentationProxy';
import vtkPiecewiseFunctionProxy from 'vtk.js/Sources/Proxy/Core/PiecewiseFunctionProxy';
import vtkLookupTableProxy from 'vtk.js/Sources/Proxy/Core/LookupTableProxy';

import ItkVtkView from './ItkVtkViewProxy';

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
      Molecule: {
        class: vtkMoleculeRepresentationProxy,
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
      },
    },
  },
  representations: {
    ItkVtkView: {
      vtkPolyData: { name: 'Geometry' },
      vtkImageData: { name: 'Volume' },
      vtkMolecule: { name: 'Molecule' },
    },
  },
};

export default proxyManagerConfiguration;
