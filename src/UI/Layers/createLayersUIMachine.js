import { Machine, assign } from 'xstate'

import ImageActorContext from '../../Context/ImageActorContext'

function resize(arr, newSize, defaultValue) {
  return [
    ...arr,
    ...Array(Math.max(newSize - arr.length, 0)).fill(defaultValue),
  ]
}

const assignImage = assign({
  images: (context, event) => {
    const images = context.images
    const layers = context.layers.layers
    let name = event.data.name
    if (event.type === 'ADD_IMAGE') {
      let nameNumber = 0
      while (layers.has(name)) {
        name = `${event.data.name}-${nameNumber + 1}`
        nameNumber++
      }
      layers.set(name, { type: 'image', visible: true, icon: null })
    }
    let actorContext = new ImageActorContext()
    if (event.type === 'SET_IMAGE') {
      actorContext = images.actorContext.get(name)
    }
    actorContext.image = event.data
    actorContext.componentWeights = resize(
      actorContext.componentWeights,
      actorContext.image.imageType.components,
      1.0
    )
    images.actorContext.set(name, actorContext)
    images.selectedName = name
    console.log(context)
    return images
  },
})

function createLayersUIMachine(options, context) {
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
            ADD_IMAGE: {
              actions: [
                assignImage,
                c =>
                  c.service.send({
                    type: 'ASSIGN_IMAGE',
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
