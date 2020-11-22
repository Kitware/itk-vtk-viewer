import { Machine, assign, spawn, send } from 'xstate'

import IntTypes from 'itk/IntTypes'

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
    const labelImage = context.labelImage
    const name = context.layers.lastAddedData.name
    images.selectedName = name
    const actorContext = images.actorContext.has(name)
      ? images.actorContext.get(name)
      : new ImageActorContext()
    const image = context.layers.lastAddedData.data
    actorContext.image = image
    actorContext.componentVisibilities = resize(
      actorContext.componentVisibilities,
      image.imageType.components,
      true
    )

    const components = image.imageType.components
    const componentType = image.imageType.componentType

    let colorMap = 'Viridis (matplotlib)'
    if (actorContext.independentComponents === null) {
      // If a 2D RGB image
      if (
        context.use2D &&
        componentType === IntTypes.UInt8 &&
        (components === 3 || components === 4)
      ) {
        colorMap = 'Grayscale'
        actorContext.independentComponents = false
      } else if (components === 1 && !!labelImage) {
        colorMap = 'Grayscale'
      } else {
        actorContext.independentComponents = true
      }
    }

    for (let component = 0; component < components; component++) {
      if (actorContext.colorMaps.has(component)) {
        continue
      }
      let colorMap = 'Viridis (matplotlib)'
      // If a 2D RGB or RGBA
      if (
        context.use2D &&
        componentType === IntTypes.UInt8 &&
        (components === 3 || components === 4)
      ) {
        colorMap = 'Grayscale'
      } else if (components === 1 && !!labelImage) {
        colorMap = 'Grayscale'
      } else if (components === 2) {
        switch (component) {
          case 0:
            colorMap = 'BkMa'
            break
          case 1:
            colorMap = 'BkCy'
            break
        }
      } else if (components === 3) {
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
      }
      actorContext.colorMaps.set(component, colorMap)
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
    if (type === 'image') {
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
