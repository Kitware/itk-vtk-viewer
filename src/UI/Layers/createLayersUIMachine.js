import { Machine, assign, spawn, send, actions } from 'xstate'

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
          const actorContext =
            layers.actorContext.get(name) ?? new LayerActorContext()
          actorContext.type = 'image'
          layers.actorContext.set(name, actorContext)
          layers.lastAddedData = { name, data: event.data }
          layers.layerUIActors.set(
            name,
            spawn(
              createLayerUIActor(options, context, actorContext),
              `layerUIActor-${name}`,
              actorContext
            )
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
          const actorContext =
            layers.actorContext.get(name) ?? new LayerActorContext()
          actorContext.type = 'labelImage'
          layers.actorContext.set(name, actorContext)
          layers.lastAddedData = { name, data: event.data }
          layers.layerUIActors.set(
            name,
            spawn(
              createLayerUIActor(options, context, actorContext),
              `layerUIActor-${name}`
            )
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
    let actorName = null
    let image = null
    let labelImage = null
    let imageName = null
    let labelImageName = null

    if ('labelImage' in context.layers.lastAddedData.data) {
      labelImage = context.layers.lastAddedData.data.labelImage
      imageName =
        context.layers.lastAddedData.data.imageName ??
        context.images.selectedName
      actorName = imageName ?? context.layers.lastAddedData.data.labelImage.name
      labelImageName = context.layers.lastAddedData.name
    } else {
      imageName = context.layers.lastAddedData.name
      // find Map key with ImageActorContext with matching image name.  Needed if image loaded after labelImage
      const [keyName] =
        Array.from(images.actorContext.entries()).find(
          ([, { imageName: actorImageName }]) => actorImageName === imageName
        ) ?? []
      actorName = keyName ?? imageName
    }

    images.selectedName = actorName
    const actorContext =
      images.actorContext.get(actorName) ?? new ImageActorContext()

    let layerContext
    if (labelImage) {
      actorContext.labelImage = labelImage
      actorContext.labelImageName = labelImageName
      layerContext = context.layers.actorContext.get(labelImageName)
      actorContext.imageName = imageName ?? 'Image'
    } else {
      image = context.layers.lastAddedData.data
      actorContext.image = image
      layerContext = context.layers.actorContext.get(imageName)
    }
    layerContext.imageActorContext = actorContext

    images.actorContext.set(actorName, actorContext)

    if (image === null) {
      return images
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
      let colorMap = 'CT-Chest-Vessels'
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

    actorContext.colorRangesAutoAdjust = new Map(
      [...Array(components).keys()].map(c => [c, true]) // { 0: true, 1: true, ... n: true}
    )
    actorContext.colorRangeBoundsAutoAdjust = new Map(
      [...Array(components).keys()].map(c => [c, true])
    )

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

const forwardToNamedActor = send((_, e) => e, {
  to: (c, e) => `layerUIActor-${e.name}`,
})

const sendEventToAllActors = actions.pure(
  ({ layers: { layerUIActors } }, event) =>
    Array.from(layerUIActors?.values() ?? []).map(actor =>
      send(event, {
        to: actor,
      })
    )
)

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
                    data: c.images.selectedName,
                  }),
                c =>
                  c.service.send({
                    type: 'SELECT_LAYER',
                    data: c.images.selectedName,
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
            START_DATA_UPDATE: { actions: forwardToNamedActor },
            FINISH_DATA_UPDATE: { actions: forwardToNamedActor },
            POST_RENDER: { actions: sendEventToAllActors },
          },
        },
      },
    },
    options
  )
}

export default createLayersUIMachine
