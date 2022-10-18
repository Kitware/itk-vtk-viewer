import { OpacityMode } from 'vtk.js/Sources/Rendering/Core/VolumeProperty/Constants'

// Max number of renerable components
const VTK_MAX_VRCOMP = 4 // should mirror similar variable in vtk.js VolumeProperty

function applyComponentVisibility(context, event) {
  const name = event.data.name
  const index = event.data.component
  const visibility = event.data.visibility

  const actorContext = context.images.actorContext.get(name)
  const componentVisibilities = actorContext.componentVisibilities
  const visualizedComponents = actorContext.visualizedComponents
  const weight = visibility ? 1.0 : 0.0

  if (visibility && visualizedComponents.indexOf(index) < 0) {
    // add component to visualizedComponents
    visualizedComponents.push(index)
    for (let i = 0; i < visualizedComponents.length; i++) {
      if (!componentVisibilities[visualizedComponents[i]]) {
        visualizedComponents.splice(i, 1)
        break
      }
    }
    context.service.send({ type: 'UPDATE_RENDERED_IMAGE', data: { name } })
  }

  if (context.images.representationProxy) {
    const sliceActors = context.images.representationProxy.getActors()
    const volumeActors = context.images.representationProxy.getVolumes()

    const fusedImageIndex = visualizedComponents.indexOf(index)
    // find target component in visualizedComponents
    // and less than actor max components
    if (fusedImageIndex >= 0 && fusedImageIndex < VTK_MAX_VRCOMP) {
      ;[...sliceActors, ...volumeActors].forEach(actor => {
        const properties = actor.getProperty()
        properties.setComponentWeight(fusedImageIndex, weight)
      })
    }

    volumeActors.forEach(volume => {
      const volumeProperty = volume.getProperty()
      if (context.images.labelImage || context.images.editorLabelImage) {
        let componentsVisible = false
        for (let i = 0; i < visualizedComponents.length - 1; i++) {
          componentsVisible = componentsVisible[i] ? true : componentsVisible
        }

        let mode = OpacityMode.PROPORTIONAL
        if (!componentsVisible) {
          mode = OpacityMode.FRACTIONAL
        }

        const fusedImageComponents = actorContext.fusedImage
          .getPointData()
          .getScalars()
          .getNumberOfComponents()
        for (
          let comp = componentVisibilities.length;
          comp < fusedImageComponents;
          comp++
        ) {
          volumeProperty.setOpacityMode(comp, mode)
        }
      }
    })

    context.service.send('RENDER')
  }
}

export default applyComponentVisibility
