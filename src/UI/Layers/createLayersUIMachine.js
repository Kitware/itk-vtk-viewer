import { Machine, assign, spawn, send } from 'xstate'

import { PixelTypes } from 'itk-wasm'

import createLayerUIActor from './createLayerUIActor'
import LayerActorContext from '../../Context/LayerActorContext'
import ImageActorContext from '../../Context/ImageActorContext'

function resize(arr, newSize, defaultValue) {
  return [
    ...arr,
    ...Array(Math.max(newSize - arr.length, 0)).fill(defaultValue),
  ]
}

function spawnLayerRenderingActor(options) {
  return assign({
    layers: (context, event) => {
      const layers = context.layers
      switch (event.type) {
        case 'ADD_IMAGE': {
          let name = event.data.name

          // Ensure unique name
          let nameNumber = 0
          while (layers.layerUIActors.has(name)) {
            name = `${event.data.name}-${nameNumber + 1}`
            nameNumber++
          }
          const actorContext = layers.actorContext.has(name)
            ? layers.actorContext.get(name)
            : new LayerActorContext()
          actorContext.type = 'image'
          layers.actorContext.set(name, actorContext)
          layers.lastAddedData = { name, data: event.data }
          layers.layerUIActors.set(
            name,
            spawn(createLayerUIActor(options, context), `layerUIActor-${name}`)
          )
          break
        }
        case 'ADD_LABEL_IMAGE': {
          let name = event.data.labelImage.name
          // Ensure unique name
          let nameNumber = 0
          while (layers.layerUIActors.has(name)) {
            name = `${event.data.labelImage.name}-${nameNumber + 1}`
            nameNumber++
          }

          const actorContext = layers.actorContext.has(name)
            ? layers.actorContext.get(name)
            : new LayerActorContext()
          actorContext.type = 'labelImage'
          layers.actorContext.set(name, actorContext)
          layers.lastAddedData = { name, data: event.data }
          layers.layerUIActors.set(
            name,
            spawn(createLayerUIActor(options, context), `layerUIActor-${name}`)
          )
          break
        }
        default:
          throw new Error(`Unexpected event type: ${event.type}`)
      }
      return layers
    },
  })
}

const assignImageContext = assign({
  images: context => {
    const images = context.images
    let name = null
    let image = null
    let labelImage = null
    let imageName = null
    let labelImageName = null
    // The ImageActorContext is identified with the image layer name, unless
    // there is only a labelImage, in which case it is the labelImage name.
    // If there is an image and labelImage the actorContext.labelImageName
    // will be set to the labelImage layer name. The labelImage layer context
    // will have .imageName set to the image name.
    if ('labelImage' in context.layers.lastAddedData.data) {
      labelImage = context.layers.lastAddedData.data.labelImage
      if (context.layers.lastAddedData.data.imageName) {
        name = context.layers.lastAddedData.data.imageName
        imageName = name
      } else {
        name = context.layers.lastAddedData.data.labelImage.name
      }
      labelImageName = context.layers.lastAddedData.name
    } else {
      name = context.layers.lastAddedData.name
    }
    images.selectedName = name
    const actorContext = images.actorContext.has(name)
      ? images.actorContext.get(name)
      : new ImageActorContext()
    if (labelImage) {
      actorContext.labelImage = labelImage
      if (!actorContext.targetScale) {
        actorContext.targetScale = labelImage.lowestScale
      }
    } else {
      image = context.layers.lastAddedData.data
      actorContext.image = image
    }
    if (labelImageName) {
      actorContext.labelImageName = labelImageName
      if (imageName) {
        const layerContext = context.layers.actorContext.get(labelImageName)
        layerContext.imageName = imageName
      }
    }

    if (image === null) {
      images.actorContext.set(name, actorContext)
      return images
    }

    if (!actorContext.targetScale) {
      actorContext.targetScale = image.lowestScale
    }

    actorContext.componentVisibilities = resize(
      actorContext.componentVisibilities,
      image.imageType.components,
      true
    )

    const components = image.imageType.components

    // Assign default independentComponents
    if (actorContext.independentComponents === null) {
      // If a 2D RGB image
      if (
        image.imageType.pixelType === PixelTypes.RGB ||
        image.imageType.pixelType === PixelTypes.RGBA
      ) {
        actorContext.independentComponents = false
      } else {
        actorContext.independentComponents = true
      }
    }

    // Assign default colorMaps
    for (let component = 0; component < components; component++) {
      if (actorContext.colorMaps.has(component)) {
        continue
      }
      let colorMap = 'Grayscale'
      // If a 2D RGB or RGBA
      if (components === 2) {
        switch (component) {
          case 0:
            colorMap = 'BkMa'
            break
          case 1:
            colorMap = 'BkCy'
            break
        }
      } else if (actorContext.independentComponents) {
        if (components === 3) {
          switch (component) {
            case 0:
              colorMap = 'BkRd'
              break
            case 1:
              colorMap = 'BkGn'
              break
            case 2:
              colorMap = 'BkBu'
              break
          }
        } else if (components === 4) {
          switch (component) {
            case 0:
              colorMap = 'BkRd'
              break
            case 1:
              colorMap = 'BkGn'
              break
            case 2:
              colorMap = 'BkBu'
              break
            case 3:
              colorMap = 'Grayscale'
              break
          }
        }
      }
      actorContext.colorMaps.set(component, colorMap)
    }

    // Assign default piecewiseFunction
    for (let component = 0; component < components; component++) {
      if (!actorContext.piecewiseFunctionPoints.has(component)) {
        const points = context.use2D
          ? [
              [0, 1],
              [1, 1],
            ]
          : [
              [0, 0],
              [1, 1],
            ]
        actorContext.piecewiseFunctionPoints.set(component, points)
      }
    }

    images.actorContext.set(name, actorContext)
    return images
  },
})

const assignSelectedName = assign({
  images: (context, event) => {
    const images = context.images
    const name = event.data
    const type = context.layers.layersUIActors.get(name).type
    if (type === 'image' || type === 'labelImage') {
      images.selectedName = name
    }
    return images
  },
})

function createLayersUIMachine(options, context) {
  const { layerUIActor } = options

  return Machine(
    {
      id: 'layers',
      initial: 'idle',
      context,
      states: {
        idle: {
          always: {
            target: 'active',
            actions: ['createLayersInterface'],
          },
        },
        active: {
          on: {
            SELECT_LAYER: {
              assignSelectedName,
              actions: send((_, e) => e, {
                to: (c, e) => `layerUIActor-${e.data}`,
              }),
            },
            TOGGLE_LAYER_VISIBILITY: {
              actions: send((_, e) => e, {
                to: (c, e) => `layerUIActor-${e.data}`,
              }),
            },
            ADD_IMAGE: {
              actions: [
                spawnLayerRenderingActor(layerUIActor),
                assignImageContext,
                c =>
                  c.service.send({
                    type: 'IMAGE_ASSIGNED',
                    data: c.layers.lastAddedData.name,
                  }),
                c =>
                  c.service.send({
                    type: 'SELECT_LAYER',
                    data: c.layers.lastAddedData.name,
                  }),
              ],
            },
            ADD_LABEL_IMAGE: {
              actions: [
                spawnLayerRenderingActor(layerUIActor),
                assignImageContext,
                c =>
                  c.service.send({
                    type: 'LABEL_IMAGE_ASSIGNED',
                    data: c.images.selectedName,
                  }),
                c =>
                  c.service.send({
                    type: 'SELECT_LAYER',
                    data: c.images.selectedName,
                  }),
              ],
            },
          },
        },
      },
    },
    options
  )
}

export default createLayersUIMachine
