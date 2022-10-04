export function createRangeHelper() {
  let min = Number.POSITIVE_INFINITY
  let max = Number.NEGATIVE_INFINITY

  return {
    add(value) {
      if (min > value) {
        min = value
      }
      if (max < value) {
        max = value
      }
    },
    getRange() {
      return { min, max }
    },
  }
}
