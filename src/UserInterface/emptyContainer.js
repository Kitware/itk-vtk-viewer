function emptyContainer(container) {
  if (container) {
    while (container.firstChild) {
      container.removeChild(container.firstChild)
    }
  }
}

export default emptyContainer
