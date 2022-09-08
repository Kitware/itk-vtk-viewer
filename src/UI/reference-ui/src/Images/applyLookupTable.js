function applyLookupTable(context, event) {
  const name = event.data.name
  const lut = event.data.lookupTable

  if (name !== context.images.selectedName) {
    return
  }

  if (lut !== context.images.labelImageIconSelector.getSelectedValue()) {
    context.images.labelImageIconSelector.setSelectedValue(lut)
  }
}

export default applyLookupTable
