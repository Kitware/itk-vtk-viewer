import vtkStateBuilder from 'vtk.js/Sources/Widgets/Core/StateBuilder'

export default function generateState() {
  return vtkStateBuilder
    .createBuilder()
    .addDynamicMixinState({
      labels: ['handles'],
      mixins: ['origin', 'color', 'text'],
      name: 'handle',
      initialValues: {
        origin: [-1, -1, -1],
      },
    })
    .build()
}
