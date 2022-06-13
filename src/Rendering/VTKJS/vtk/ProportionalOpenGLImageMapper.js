// ----------------------------------------------------------------------------
// Additive mixing of components rather than weighted
// ----------------------------------------------------------------------------

import Constants from 'vtk.js/Sources/Rendering/Core/ImageMapper/Constants'
import * as macro from 'vtk.js/Sources/macros'
import vtkShaderProgram from 'vtk.js/Sources/Rendering/OpenGL/ShaderProgram'
import vtkDataArray from 'vtk.js/Sources/Common/Core/DataArray'
import { VtkDataTypes } from 'vtk.js/Sources/Common/Core/DataArray/Constants'
import { Wrap, Filter } from 'vtk.js/Sources/Rendering/OpenGL/Texture/Constants'
import { InterpolationType } from 'vtk.js/Sources/Rendering/Core/ImageProperty/Constants'
import { Representation } from 'vtk.js/Sources/Rendering/Core/Property/Constants'

import vtkOpenGlImageMapper from 'vtk.js/Sources/Rendering/OpenGL/ImageMapper'

import { registerOverride } from 'vtk.js/Sources/Rendering/OpenGL/ViewNodeFactory'

const { vtkErrorMacro } = macro
const { SlicingMode } = Constants

function computeFnToString(property, fn, numberOfComponents) {
  const pwfun = fn.apply(property)
  if (pwfun) {
    const iComps = property.getIndependentComponents()
    return `${property.getMTime()}-${iComps}-${numberOfComponents}`
  }
  return '0'
}

function ProportionalOpenGLImageMapper(publicAPI, model) {
  // Set our className
  model.classHierarchy.push('ProportionalOpenGLImageMapper')

  publicAPI.replaceShaderValues = (shaders, ren, actor) => {
    let VSSource = shaders.Vertex
    let FSSource = shaders.Fragment

    VSSource = vtkShaderProgram.substitute(VSSource, '//VTK::Camera::Dec', [
      'uniform mat4 MCPCMatrix;',
    ]).result
    VSSource = vtkShaderProgram.substitute(
      VSSource,
      '//VTK::PositionVC::Impl',
      ['  gl_Position = MCPCMatrix * vertexMC;']
    ).result

    VSSource = vtkShaderProgram.substitute(
      VSSource,
      '//VTK::TCoord::Impl',
      'tcoordVCVSOutput = tcoordMC;'
    ).result

    VSSource = vtkShaderProgram.substitute(
      VSSource,
      '//VTK::TCoord::Dec',
      'attribute vec2 tcoordMC; varying vec2 tcoordVCVSOutput;'
    ).result

    const tNumComp = model.openGLTexture.getComponents()
    const iComps = actor.getProperty().getIndependentComponents()

    let tcoordDec = [
      'varying vec2 tcoordVCVSOutput;',
      // color shift and scale
      'uniform float cshift0;',
      'uniform float cscale0;',
      // pwf shift and scale
      'uniform float pwfshift0;',
      'uniform float pwfscale0;',
      'uniform sampler2D texture1;',
      'uniform sampler2D colorTexture1;',
      'uniform sampler2D pwfTexture1;',
      'uniform float opacity;',
    ]
    if (iComps) {
      for (let comp = 1; comp < tNumComp; comp++) {
        tcoordDec = tcoordDec.concat([
          // color shift and scale
          `uniform float cshift${comp};`,
          `uniform float cscale${comp};`,
          // weighting shift and scale
          `uniform float pwfshift${comp};`,
          `uniform float pwfscale${comp};`,
        ])
      }
      // the heights defined below are the locations
      // for the up to four components of the tfuns
      // the tfuns have a height of 2XnumComps pixels so the
      // values are computed to hit the middle of the two rows
      // for that component
      switch (tNumComp) {
        case 1:
          tcoordDec = tcoordDec.concat([
            'uniform float mix0;',
            '#define height0 0.5',
          ])
          break
        case 2:
          tcoordDec = tcoordDec.concat([
            'uniform float mix0;',
            'uniform float mix1;',
            '#define height0 0.25',
            '#define height1 0.75',
          ])
          break
        case 3:
          tcoordDec = tcoordDec.concat([
            'uniform float mix0;',
            'uniform float mix1;',
            'uniform float mix2;',
            '#define height0 0.17',
            '#define height1 0.5',
            '#define height2 0.83',
          ])
          break
        case 4:
          tcoordDec = tcoordDec.concat([
            'uniform float mix0;',
            'uniform float mix1;',
            'uniform float mix2;',
            'uniform float mix3;',
            '#define height0 0.125',
            '#define height1 0.375',
            '#define height2 0.625',
            '#define height3 0.875',
          ])
          break
        default:
          vtkErrorMacro('Unsupported number of independent coordinates.')
      }
    }
    FSSource = vtkShaderProgram.substitute(
      FSSource,
      '//VTK::TCoord::Dec',
      tcoordDec
    ).result

    if (iComps) {
      const rgba = ['r', 'g', 'b', 'a']
      let tcoordImpl = ['vec4 tvalue = texture2D(texture1, tcoordVCVSOutput);']
      for (let comp = 0; comp < tNumComp; comp++) {
        tcoordImpl = tcoordImpl.concat([
          `vec3 tcolor${comp} = mix${comp} * texture2D(colorTexture1, vec2(tvalue.${rgba[comp]} * cscale${comp} + cshift${comp}, height${comp})).rgb;`,
          `float compWeight${comp} = mix${comp} * texture2D(pwfTexture1, vec2(tvalue.${rgba[comp]} * pwfscale${comp} + pwfshift${comp}, height${comp})).r;`,
        ])
      }
      switch (tNumComp) {
        case 1:
          tcoordImpl = tcoordImpl.concat([
            'gl_FragData[0] = vec4(tcolor0.rgb, opacity);',
          ])
          break
        case 2:
          tcoordImpl = tcoordImpl.concat([
            // 'float weightSum = compWeight0 + compWeight1;', // vtk.js original code
            'float weightSum = 1.0;', // the change
            'gl_FragData[0] = vec4(vec3((tcolor0.rgb * (compWeight0 / weightSum)) + (tcolor1.rgb * (compWeight1 / weightSum))), opacity);',
          ])
          break
        case 3:
          tcoordImpl = tcoordImpl.concat([
            // 'float weightSum = compWeight0 + compWeight1 + compWeight2;',
            'float weightSum = 1.0;',
            'gl_FragData[0] = vec4(vec3((tcolor0.rgb * (compWeight0 / weightSum)) + (tcolor1.rgb * (compWeight1 / weightSum)) + (tcolor2.rgb * (compWeight2 / weightSum))), opacity);',
          ])
          break
        case 4:
          tcoordImpl = tcoordImpl.concat([
            // 'float weightSum = compWeight0 + compWeight1 + compWeight2 + compWeight3;',
            'float weightSum = 1.0;',
            'gl_FragData[0] = vec4(vec3((tcolor0.rgb * (compWeight0 / weightSum)) + (tcolor1.rgb * (compWeight1 / weightSum)) + (tcolor2.rgb * (compWeight2 / weightSum)) + (tcolor3.rgb * (compWeight3 / weightSum))), opacity);',
          ])
          break
        default:
          vtkErrorMacro('Unsupported number of independent coordinates.')
      }
      FSSource = vtkShaderProgram.substitute(
        FSSource,
        '//VTK::TCoord::Impl',
        tcoordImpl
      ).result
    } else {
      // dependent components
      switch (tNumComp) {
        case 1:
          FSSource = vtkShaderProgram.substitute(
            FSSource,
            '//VTK::TCoord::Impl',
            [
              'float intensity = texture2D(texture1, tcoordVCVSOutput).r;',
              'vec3 tcolor = texture2D(colorTexture1, vec2(intensity * cscale0 + cshift0, 0.5)).rgb;',
              'float scalarOpacity = texture2D(pwfTexture1, vec2(intensity * pwfscale0 + pwfshift0, 0.5)).r;',
              'gl_FragData[0] = vec4(tcolor, scalarOpacity * opacity);',
            ]
          ).result
          break
        case 2:
          FSSource = vtkShaderProgram.substitute(
            FSSource,
            '//VTK::TCoord::Impl',
            [
              'vec4 tcolor = texture2D(texture1, tcoordVCVSOutput);',
              'float intensity = tcolor.r*cscale0 + cshift0;',
              'gl_FragData[0] = vec4(texture2D(colorTexture1, vec2(intensity, 0.5)).rgb, pwfscale0*tcolor.g + pwfshift0);',
            ]
          ).result
          break
        default:
          FSSource = vtkShaderProgram.substitute(
            FSSource,
            '//VTK::TCoord::Impl',
            [
              'vec4 tcolor = cscale0*texture2D(texture1, tcoordVCVSOutput.st) + cshift0;',
              'gl_FragData[0] = vec4(texture2D(colorTexture1, vec2(tcolor.r,0.5)).r,',
              '  texture2D(colorTexture1, vec2(tcolor.g,0.5)).r,',
              '  texture2D(colorTexture1, vec2(tcolor.b,0.5)).r, tcolor.a);',
            ]
          ).result
      }
    }

    if (model.haveSeenDepthRequest) {
      FSSource = vtkShaderProgram.substitute(
        FSSource,
        '//VTK::ZBuffer::Dec',
        'uniform int depthRequest;'
      ).result
      FSSource = vtkShaderProgram.substitute(FSSource, '//VTK::ZBuffer::Impl', [
        'if (depthRequest == 1) {',
        'float iz = floor(gl_FragCoord.z*65535.0 + 0.1);',
        'float rf = floor(iz/256.0)/255.0;',
        'float gf = mod(iz,256.0)/255.0;',
        'gl_FragData[0] = vec4(rf, gf, 0.0, 1.0); }',
      ]).result
    }

    shaders.Vertex = VSSource
    shaders.Fragment = FSSource

    publicAPI.replaceShaderClip(shaders, ren, actor)
    publicAPI.replaceShaderCoincidentOffset(shaders, ren, actor)
  }

  // const superBuildBufferObjects = publicAPI.buildBufferObjects

  publicAPI.buildBufferObjects = (ren, actor) => {
    const image = model.currentInput

    if (!image) {
      return
    }

    const imgScalars = image.getPointData() && image.getPointData().getScalars()
    if (!imgScalars) {
      return
    }

    const actorProperty = actor.getProperty()

    // set interpolation on the texture based on property setting
    const iType = actorProperty.getInterpolationType()
    if (iType === InterpolationType.NEAREST) {
      model.colorTexture.setMinificationFilter(Filter.NEAREST)
      model.colorTexture.setMagnificationFilter(Filter.NEAREST)
      model.pwfTexture.setMinificationFilter(Filter.NEAREST)
      model.pwfTexture.setMagnificationFilter(Filter.NEAREST)
    } else {
      model.colorTexture.setMinificationFilter(Filter.LINEAR)
      model.colorTexture.setMagnificationFilter(Filter.LINEAR)
      model.pwfTexture.setMinificationFilter(Filter.LINEAR)
      model.pwfTexture.setMagnificationFilter(Filter.LINEAR)
    }

    const numComp = imgScalars.getNumberOfComponents()
    const iComps = actorProperty.getIndependentComponents()
    const numIComps = iComps ? numComp : 1
    const textureHeight = iComps ? 2 * numIComps : 1

    const cfunToString = computeFnToString(
      actorProperty,
      actorProperty.getRGBTransferFunction,
      numIComps
    )

    if (model.colorTextureString !== cfunToString) {
      const cWidth = 1024
      const cSize = cWidth * textureHeight * 3
      const cTable = new Uint8Array(cSize)
      let cfun = actorProperty.getRGBTransferFunction()
      if (cfun) {
        const tmpTable = new Float32Array(cWidth * 3)

        for (let c = 0; c < numIComps; c++) {
          cfun = actorProperty.getRGBTransferFunction(c)
          const cRange = cfun.getRange()
          cfun.getTable(cRange[0], cRange[1], cWidth, tmpTable, 1)
          if (iComps) {
            for (let i = 0; i < cWidth * 3; i++) {
              cTable[c * cWidth * 6 + i] = 255.0 * tmpTable[i]
              cTable[c * cWidth * 6 + i + cWidth * 3] = 255.0 * tmpTable[i]
            }
          } else {
            for (let i = 0; i < cWidth * 3; i++) {
              cTable[c * cWidth * 6 + i] = 255.0 * tmpTable[i]
            }
          }
        }
        model.colorTexture.create2DFromRaw(
          cWidth,
          textureHeight,
          3,
          VtkDataTypes.UNSIGNED_CHAR,
          cTable
        )
      } else {
        for (let i = 0; i < cWidth * 3; ++i) {
          cTable[i] = (255.0 * i) / ((cWidth - 1) * 3)
          cTable[i + 1] = (255.0 * i) / ((cWidth - 1) * 3)
          cTable[i + 2] = (255.0 * i) / ((cWidth - 1) * 3)
        }
        model.colorTexture.create2DFromRaw(
          cWidth,
          1,
          3,
          VtkDataTypes.UNSIGNED_CHAR,
          cTable
        )
      }

      model.colorTextureString = cfunToString
    }

    // Build piecewise function buffer.  This buffer is used either
    // for component weighting or opacity, depending on whether we're
    // rendering components independently or not.
    const pwfunToString = computeFnToString(
      actorProperty,
      actorProperty.getPiecewiseFunction,
      numIComps
    )

    if (model.pwfTextureString !== pwfunToString) {
      const pwfWidth = 1024
      const pwfSize = pwfWidth * textureHeight
      const pwfTable = new Uint8Array(pwfSize)
      let pwfun = actorProperty.getPiecewiseFunction()
      // support case where pwfun is added/removed
      model.pwfTexture.resetFormatAndType()
      if (pwfun) {
        const pwfFloatTable = new Float32Array(pwfSize)
        const tmpTable = new Float32Array(pwfWidth)

        for (let c = 0; c < numIComps; ++c) {
          pwfun = actorProperty.getPiecewiseFunction(c)
          if (pwfun === null) {
            // Piecewise constant max if no function supplied for this component
            pwfFloatTable.fill(1.0)
          } else {
            const pwfRange = pwfun.getRange()
            pwfun.getTable(pwfRange[0], pwfRange[1], pwfWidth, tmpTable, 1)
            // adjust for sample distance etc
            if (iComps) {
              for (let i = 0; i < pwfWidth; i++) {
                pwfFloatTable[c * pwfWidth * 2 + i] = tmpTable[i]
                pwfFloatTable[c * pwfWidth * 2 + i + pwfWidth] = tmpTable[i]
              }
            } else {
              for (let i = 0; i < pwfWidth; i++) {
                pwfFloatTable[c * pwfWidth * 2 + i] = tmpTable[i]
              }
            }
          }
        }
        model.pwfTexture.create2DFromRaw(
          pwfWidth,
          textureHeight,
          1,
          VtkDataTypes.FLOAT,
          pwfFloatTable
        )
      } else {
        // default is opaque
        pwfTable.fill(255.0)
        model.pwfTexture.create2DFromRaw(
          pwfWidth,
          1,
          1,
          VtkDataTypes.UNSIGNED_CHAR,
          pwfTable
        )
      }

      model.pwfTextureString = pwfunToString
    }

    // Find what IJK axis and what direction to slice along
    const { ijkMode } = model.renderable.getClosestIJKAxis()

    // Find the IJK slice
    let slice = model.renderable.getSlice()
    if (ijkMode !== model.renderable.getSlicingMode()) {
      // If not IJK slicing, get the IJK slice from the XYZ position/slice
      slice = model.renderable.getSliceAtPosition(slice)
    }

    const nSlice = Math.round(slice)

    // Find sliceOffset
    const ext = image.getExtent()
    let sliceOffset
    if (ijkMode === SlicingMode.I) {
      sliceOffset = nSlice - ext[0]
    }
    if (ijkMode === SlicingMode.J) {
      sliceOffset = nSlice - ext[2]
    }
    if (ijkMode === SlicingMode.K || ijkMode === SlicingMode.NONE) {
      sliceOffset = nSlice - ext[4]
    }

    // rebuild the VBO if the data has changed
    const toString = `${slice}A${image.getMTime()}A${imgScalars.getMTime()}B${publicAPI.getMTime()}C${model.renderable.getSlicingMode()}D${actor
      .getProperty()
      .getMTime()}`
    if (model.VBOBuildString !== toString) {
      // Build the VBOs
      const dims = image.getDimensions()
      if (iType === InterpolationType.NEAREST) {
        // vtk.js original code
        // if (numComp === 4) {
        //   model.openGLTexture.setGenerateMipmap(true)
        //   model.openGLTexture.setMinificationFilter(Filter.NEAREST)
        // } else {
        //   model.openGLTexture.setMinificationFilter(Filter.NEAREST)
        // }
        model.openGLTexture.setMinificationFilter(Filter.NEAREST) // the change
        model.openGLTexture.setMagnificationFilter(Filter.NEAREST)
      } else {
        // vtk.js original code
        // if (numComp === 4) {
        //   model.openGLTexture.setGenerateMipmap(true)
        //   model.openGLTexture.setMinificationFilter(Filter.LINEAR_MIPMAP_LINEAR)
        // } else {
        //   model.openGLTexture.setMinificationFilter(Filter.LINEAR)
        // }
        model.openGLTexture.setMinificationFilter(Filter.LINEAR) // the change
        model.openGLTexture.setMagnificationFilter(Filter.LINEAR)
      }
      model.openGLTexture.setWrapS(Wrap.CLAMP_TO_EDGE)
      model.openGLTexture.setWrapT(Wrap.CLAMP_TO_EDGE)
      const sliceSize = dims[0] * dims[1] * numComp

      const ptsArray = new Float32Array(12)
      const tcoordArray = new Float32Array(8)
      for (let i = 0; i < 4; i++) {
        tcoordArray[i * 2] = i % 2 ? 1.0 : 0.0
        tcoordArray[i * 2 + 1] = i > 1 ? 1.0 : 0.0
      }

      // Determine depth position of the slicing plane in the scene.
      // Slicing modes X, Y, and Z use a continuous axis position, whereas
      // slicing modes I, J, and K should use discrete positions.
      const sliceDepth = [SlicingMode.X, SlicingMode.Y, SlicingMode.Z].includes(
        model.renderable.getSlicingMode()
      )
        ? slice
        : nSlice

      const spatialExt = image.getSpatialExtent()
      const basicScalars = imgScalars.getData()
      let scalars = null
      // Get right scalars according to slicing mode
      if (ijkMode === SlicingMode.I) {
        scalars = new basicScalars.constructor(dims[2] * dims[1] * numComp)
        let id = 0
        for (let k = 0; k < dims[2]; k++) {
          for (let j = 0; j < dims[1]; j++) {
            const bsIdx =
              (sliceOffset + j * dims[0] + k * dims[0] * dims[1]) * numComp
            id = (k * dims[1] + j) * numComp
            scalars.set(basicScalars.subarray(bsIdx, bsIdx + numComp), id)
          }
        }
        dims[0] = dims[1]
        dims[1] = dims[2]
        ptsArray[0] = sliceDepth
        ptsArray[1] = spatialExt[2]
        ptsArray[2] = spatialExt[4]
        ptsArray[3] = sliceDepth
        ptsArray[4] = spatialExt[3]
        ptsArray[5] = spatialExt[4]
        ptsArray[6] = sliceDepth
        ptsArray[7] = spatialExt[2]
        ptsArray[8] = spatialExt[5]
        ptsArray[9] = sliceDepth
        ptsArray[10] = spatialExt[3]
        ptsArray[11] = spatialExt[5]
      } else if (ijkMode === SlicingMode.J) {
        scalars = new basicScalars.constructor(dims[2] * dims[0] * numComp)
        let id = 0
        for (let k = 0; k < dims[2]; k++) {
          for (let i = 0; i < dims[0]; i++) {
            const bsIdx =
              (i + sliceOffset * dims[0] + k * dims[0] * dims[1]) * numComp
            id = (k * dims[0] + i) * numComp
            scalars.set(basicScalars.subarray(bsIdx, bsIdx + numComp), id)
          }
        }
        dims[1] = dims[2]
        ptsArray[0] = spatialExt[0]
        ptsArray[1] = sliceDepth
        ptsArray[2] = spatialExt[4]
        ptsArray[3] = spatialExt[1]
        ptsArray[4] = sliceDepth
        ptsArray[5] = spatialExt[4]
        ptsArray[6] = spatialExt[0]
        ptsArray[7] = sliceDepth
        ptsArray[8] = spatialExt[5]
        ptsArray[9] = spatialExt[1]
        ptsArray[10] = sliceDepth
        ptsArray[11] = spatialExt[5]
      } else if (ijkMode === SlicingMode.K || ijkMode === SlicingMode.NONE) {
        scalars = basicScalars.subarray(
          sliceOffset * sliceSize,
          (sliceOffset + 1) * sliceSize
        )
        ptsArray[0] = spatialExt[0]
        ptsArray[1] = spatialExt[2]
        ptsArray[2] = sliceDepth
        ptsArray[3] = spatialExt[1]
        ptsArray[4] = spatialExt[2]
        ptsArray[5] = sliceDepth
        ptsArray[6] = spatialExt[0]
        ptsArray[7] = spatialExt[3]
        ptsArray[8] = sliceDepth
        ptsArray[9] = spatialExt[1]
        ptsArray[10] = spatialExt[3]
        ptsArray[11] = sliceDepth
      } else {
        vtkErrorMacro('Reformat slicing not yet supported.')
      }

      model.openGLTexture.create2DFromRaw(
        dims[0],
        dims[1],
        numComp,
        imgScalars.getDataType(),
        scalars
      )
      model.openGLTexture.activate()
      model.openGLTexture.sendParameters()
      model.openGLTexture.deactivate()

      const points = vtkDataArray.newInstance({
        numberOfComponents: 3,
        values: ptsArray,
      })
      points.setName('points')
      const tcoords = vtkDataArray.newInstance({
        numberOfComponents: 2,
        values: tcoordArray,
      })
      tcoords.setName('tcoords')

      const cellArray = new Uint16Array(8)
      cellArray[0] = 3
      cellArray[1] = 0
      cellArray[2] = 1
      cellArray[3] = 3
      cellArray[4] = 3
      cellArray[5] = 0
      cellArray[6] = 3
      cellArray[7] = 2
      const cells = vtkDataArray.newInstance({
        numberOfComponents: 1,
        values: cellArray,
      })

      model.tris.getCABO().createVBO(cells, 'polys', Representation.SURFACE, {
        points,
        tcoords,
        cellOffset: 0,
      })
      model.VBOBuildTime.modified()
      model.VBOBuildString = toString
    }
  }
}

// ----------------------------------------------------------------------------
// Object factory
// ----------------------------------------------------------------------------

const DEFAULT_VALUES = {}

// ----------------------------------------------------------------------------

export function extend(publicAPI, model, initialValues = {}) {
  Object.assign(model, DEFAULT_VALUES, initialValues)

  vtkOpenGlImageMapper.extend(publicAPI, model, initialValues)

  ProportionalOpenGLImageMapper(publicAPI, model)
}

// ----------------------------------------------------------------------------

export const newInstance = macro.newInstance(
  extend,
  'ProportionalOpenGLImageMapper'
)

// ----------------------------------------------------------------------------

export default { newInstance, extend }

// Register ourself to OpenGL backend if imported
registerOverride('vtkImageMapper', newInstance)
