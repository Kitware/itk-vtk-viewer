function numericalSort(eltA, eltB) {
  if (eltA < eltB) {
    return -1
  } else if (eltB < eltA) {
    return 1
  }
  return 0
}

export default numericalSort
