import { OpacityMode } from 'vtk.js/Sources/Rendering/Core/VolumeProperty/Constants'

function applyComponentVisibility(context, event) {
  const name = event.data.name
  const index = event.data.component
  const visibility = event.data.visibility

  const actorContext = context.images.actorContext.get(name)
  const componentVisibilities = actorContext.componentVisibilities
  const visualizedComponents = actorContext.visualizedComponents
  const weight = visibility ? 1.0 : 0.0

  if (visibility && visualizedComponents.indexOf(index) < 0) {
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
    const fusedImageIndex = visualizedComponents.indexOf(index)
    const sliceActors = context.images.representationProxy.getActors()
    sliceActors.forEach((actor, actorIdx) => {
      const actorProp = actor.getProperty()
      actorProp.setComponentWeight(fusedImageIndex, weight)
    })

    const volumeProps = context.images.representationProxy.getVolumes()
    volumeProps.forEach((volume, volIdx) => {
      const volumeProperty = volume.getProperty()
      volumeProperty.setComponentWeight(fusedImageIndex, weight)
      volumeProperty.setOpacityMode(numberOfComponents, mode)

      if (!!context.images.labelImage || !!context.images.editorLabelImage) {
        let componentsVisible = false
        for (let i = 0; i < visualizedComponents.length; i++) {
          componentsVisible = visualizedComponents[i] ? true : componentsVisible
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
