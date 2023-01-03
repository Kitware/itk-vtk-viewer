// ----------------------------------------------------------------------------
// Additive mixing of components rather than weighted
// ----------------------------------------------------------------------------

import * as macro from 'vtk.js/Sources/macros'
import vtkShaderProgram from 'vtk.js/Sources/Rendering/OpenGL/ShaderProgram'
import vtkOpenGlImageMapper from 'vtk.js/Sources/Rendering/OpenGL/ImageMapper'

import { registerOverride } from 'vtk.js/Sources/Rendering/OpenGL/ViewNodeFactory'

const { vtkErrorMacro } = macro

function OpenGLImageMapperFractional(publicAPI, model) {
  // Set our className
  model.classHierarchy.push('OpenGLImageMapperFractional')

  // Changes from vtk.js code: Add component values together after transfer function and don't normalize to 1
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
}

// ----------------------------------------------------------------------------
// Object factory
// ----------------------------------------------------------------------------

const DEFAULT_VALUES = {}

// ----------------------------------------------------------------------------

export function extend(publicAPI, model, initialValues = {}) {
  Object.assign(model, DEFAULT_VALUES, initialValues)

  vtkOpenGlImageMapper.extend(publicAPI, model, initialValues)

  OpenGLImageMapperFractional(publicAPI, model)
}

// ----------------------------------------------------------------------------

export const newInstance = macro.newInstance(
  extend,
  'OpenGLImageMapperFractional'
)

// ----------------------------------------------------------------------------

export default { newInstance, extend }

// Register ourself to OpenGL backend if imported
registerOverride('vtkImageMapper', newInstance)
