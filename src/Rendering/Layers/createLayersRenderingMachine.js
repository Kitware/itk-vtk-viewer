import { Machine, assign } from 'xstate'

const assignImage = assign({
  images: (context, event) => {
    const images = context.images
    const map = images.images
    let name = event.data.name
    if (map.has(name)) {
      name = `name-${map.size + 1}`
    }
    images.images.set(name, event.data)
    return images
  },
})

function createLayersRenderingMachine(options, context) {
  return Machine(
    {
      id: 'layersRendering',
      initial: 'idle',
      context,
      states: {
        idle: {
          always: {
            target: 'active',
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
                    data: Array.from(c.images.images.keys()).pop(),
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

export default createLayersRenderingMachine
