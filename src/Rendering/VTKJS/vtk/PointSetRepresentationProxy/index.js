import macro from 'vtk.js/Sources/macro'
import vtkActor from 'vtk.js/Sources/Rendering/Core/Actor'
import vtkMapper from 'vtk.js/Sources/Rendering/Core/Mapper'
import vtkSphereSource from 'vtk.js/Sources/Filters/Sources/SphereSource'
import vtkGlyph3DMapper from 'vtk.js/Sources/Rendering/Core/Glyph3DMapper'

import vtkAbstractRepresentationProxy from 'vtk.js/Sources/Proxy/Core/AbstractRepresentationProxy'

const PROPERTIES_STATE = {}

const PROPERTIES_DEFAULT = {}

// ----------------------------------------------------------------------------
// vtkPointSetRepresentationProxy methods
// ----------------------------------------------------------------------------

function vtkPointSetRepresentationProxy(publicAPI, model) {
  // Set our className
  model.classHierarchy.push('vtkPointSetRepresentationProxy')

  // Internals
  model.mapper = vtkMapper.newInstance({
    interpolateScalarsBeforeMapping: true,
    useLookupTableScalarRange: true,
    scalarVisibility: false,
  })
  model.actor = vtkActor.newInstance()
  model.property = model.actor.getProperty()

  model.glyphMapper = vtkGlyph3DMapper.newInstance({
    interpolateScalarsBeforeMapping: true,
    useLookupTableScalarRange: true,
    scalarVisibility: false,
  })
  model.sphereSource = vtkSphereSource.newInstance()
  model.glyphMapper.setInputConnection(model.sphereSource.getOutputPort(), 1)
  model.glyphMapper.setScaleModeToScaleByConstant()

  function updateGlyphMapper(inputDataSet) {
    model.glyphMapper.setInputData(inputDataSet, 0)
  }

  // Auto connect mappers
  model.sourceDependencies.push(model.mapper)
  model.sourceDependencies.push({ setInputData: updateGlyphMapper })
  // connect rendering pipeline
  model.actor.setMapper(model.mapper)
  model.actors.push(model.actor)
  model.glyphActor = vtkActor.newInstance()
  model.glyphActor.setMapper(model.glyphMapper)
  model.actors.push(model.glyphActor)
  model.glyphProperty = model.glyphActor.getProperty()

  // Initialize state
  model.property.setRepresentationToPoints()
  model.glyphActor.setVisibility(false)

  publicAPI.setRadiusFactor = radiusFactor => {
    model.radiusFactor = radiusFactor
    model.sphereSource.setRadius(model.pointSize * radiusFactor)
  }

  publicAPI.setVisibility = visible => {
    if (visible) {
      switch (model.representation) {
        case 'Points':
          model.actor.setVisibility(visible)
          break
        case 'Spheres':
          model.glyphActor.setVisibility(visible)
          break
        default:
          throw Error('Unexpected point set representation')
      }
    } else {
      model.actor.setVisibility(visible)
      model.glyphActor.setVisibility(visible)
    }
    model.visibility = visible
  }

  publicAPI.setRepresentation = representation => {
    if (model.visibility) {
      switch (representation) {
        case 'Points':
          model.actor.setVisibility(true)
          model.glyphActor.setVisibility(false)
          break
        case 'Spheres':
          model.actor.setVisibility(false)
          model.glyphActor.setVisibility(true)
          break
        default:
          throw Error('Unexpected point set representation')
      }
    }
    model.representation = representation
  }

  publicAPI.setOpacity = opacity => {
    model.property.setOpacity(opacity)
    model.glyphProperty.setOpacity(opacity)
    model.opacity = opacity
  }

  publicAPI.setColor = color => {
    model.property.setDiffuseColor(color)
    model.glyphProperty.setDiffuseColor(color)
    model.color = color
  }

  publicAPI.setInterpolateScalarsBeforeMapping = interpolate => {
    model.mapper.setInterpolateScalarsBeforeMapping(interpolate)
    model.glyphMapper.setInterpolateScalarsBeforeMapping(interpolate)
    model.interpolateScalarsBeforeMapping = interpolate
  }

  publicAPI.setPointSize = pointSize => {
    model.property.setPointSize(pointSize)
    model.sphereSource.setRadius(pointSize * model.radiusFactor)
    model.pointSize = pointSize
  }

  publicAPI.setUseShadow = useShadow => {
    model.property.setLighting(useShadow)
    model.glyphProperty.setLighting(useShadow)
    model.useShadow = useShadow
  }

  publicAPI.setUseBounds = useBounds => {
    model.actor.setUseBounds(useBounds)
    model.glyphActor.setUseBounds(useBounds)
    model.useBounds = useBounds
  }

  const abstractSetColorBy = publicAPI.setColorBy
  publicAPI.setColorBy = (arrayName, arrayLocation, componentIndex = -1) => {
    // Configures model.mapper
    abstractSetColorBy(arrayName, arrayLocation, componentIndex)

    // Now also configure model.glyphMapper
    let colorMode = vtkMapper.ColorMode.DEFAULT
    let scalarMode = vtkMapper.ScalarMode.DEFAULT
    const colorByArrayName = arrayName
    const activeArray = publicAPI.getDataArray(arrayName, arrayLocation)
    const scalarVisibility = !!activeArray
    const lookupTable = arrayName
      ? publicAPI.getLookupTableProxy(arrayName).getLookupTable()
      : null

    if (scalarVisibility) {
      colorMode = vtkMapper.ColorMode.MAP_SCALARS
      scalarMode =
        arrayLocation === 'pointData'
          ? vtkMapper.ScalarMode.USE_POINT_FIELD_DATA
          : vtkMapper.ScalarMode.USE_CELL_FIELD_DATA

      model.glyphMapper.setLookupTable(lookupTable)
    }

    model.glyphMapper.set(
      {
        colorByArrayName,
        colorMode,
        scalarMode,
        scalarVisibility,
      },
      true
    )
  }
}

// ----------------------------------------------------------------------------
// Object factory
// ----------------------------------------------------------------------------

const DEFAULT_VALUES = {
  representation: 'Points',
  radiusFactor: 0.1,
  visibility: true,
  opacity: 1.0,
  color: [1.0, 1.0, 1.0],
  interpolateScalarsBeforeMapping: true,
  pointSize: 0.3,
  useShadow: true,
  useBounds: true,
}

// ----------------------------------------------------------------------------

export function extend(publicAPI, model, initialValues = {}) {
  Object.assign(model, DEFAULT_VALUES, initialValues)

  // Object methods
  vtkAbstractRepresentationProxy.extend(publicAPI, model)

  // Object specific methods
  vtkPointSetRepresentationProxy(publicAPI, model)

  macro.get(publicAPI, model, [
    'radiusFactor',
    'representation',
    'visibility',
    'opacity',
    'color',
    'interpolateScalarsBeforeMapping',
    'pointSize',
    'useShadow',
    'useBounds',
  ])

  // Map proxy properties
  macro.proxyPropertyState(
    publicAPI,
    model,
    PROPERTIES_STATE,
    PROPERTIES_DEFAULT
  )
  macro.proxyPropertyMapping(publicAPI, model, {})
}

// ----------------------------------------------------------------------------

export const newInstance = macro.newInstance(
  extend,
  'vtkPointSetRepresentationProxy'
)

// ----------------------------------------------------------------------------

export default { newInstance, extend }
