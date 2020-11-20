import { Machine, assign } from 'xstate'

const assignSelectedComponentIndex = assign({
  images: (context, event) => {
    const images = context.images
    const name = event.data.name
    const actorContext = context.images.actorContext.get(name)
    actorContext.selectedComponentIndex = event.data.index
    context.images.actorContext.set(name, actorContext)
    return images
  },
})

const assignComponentVisibility = assign({
  images: (context, event) => {
    const images = context.images
    const name = event.data.name
    const actorContext = context.images.actorContext.get(name)
    const componentVisibilities = actorContext.componentVisibilities
    const index = event.data.index
    const visibility = event.data.visibility
    if (visibility && !componentVisibilities[index]) {
      // A component was made visible, and it was not already in the list
      // of visualized components
      const currentNumVisualized = componentVisibilities.reduce(
        (a, c) => (c + a) | 0,
        0
      )
      if (currentNumVisualized.length >= actorContext.maxIntensityComponents) {
        // Find the index in the visulized components list of the last touched
        // component.  We need to replace it with this component the user just
        // turned on.
        componentVisibilities[
          actorContext.lastComponentVisibilityChanged
        ] = false
      }
    }

    componentVisibilities[index] = visibility
    actorContext.lastComponentVisibilityChanged = index

    context.images.actorContext.set(name, actorContext)
    return images
  },
})

function createImagesUIMachine(options, context) {
  return Machine(
    {
      id: 'images',
      initial: 'idle',
      context,
      states: {
        idle: {
          on: {
            IMAGE_ASSIGNED: {
              target: 'active',
              actions: ['createImagesInterface', 'updateImageInterface'],
            },
          },
        },
        active: {
          on: {
            IMAGE_ASSIGNED: {
              actions: ['updateImageInterface'],
            },
            SELECT_IMAGE_COMPONENT: {
              actions: [assignSelectedComponentIndex, 'selectImageComponent'],
            },
            IMAGE_COMPONENT_VISIBILITY_CHANGED: {
              actions: [assignComponentVisibility, 'applyComponentVisibility'],
            },
          },
        },
      },
    },
    options
  )
}

export default createImagesUIMachine
