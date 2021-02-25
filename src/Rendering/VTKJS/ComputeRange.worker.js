import registerWebworker from 'webworker-promise/lib/register'

function createRangeHelper() {
  let min = Number.MAX_VALUE
  let max = -Number.MAX_VALUE

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

registerWebworker().operation(
  'computeRange',
  ({ split, numberOfSplits, values, component, numberOfComponents }) => {
    const helper = createRangeHelper()
    const start = Math.floor(values.length / numberOfSplits) * split
    const end =
      split === numberOfSplits - 1
        ? values.length
        : Math.floor(values.length / numberOfSplits) * (split + 1)
    let value = 0

    if (component < 0 && numberOfComponents > 1) {
      for (let i = start; i < end; i += numberOfComponents) {
        value = 0
        for (let j = 0; j < numberOfComponents; j++) {
          value += values[i + j] * values[i + j]
        }
        value **= 0.5
        helper.add(value)
      }
      return helper.getRange()
    }

    const offset = component < 0 ? start : start + component
    for (let i = offset; i < end; i += numberOfComponents) {
      helper.add(values[i])
    }

    return helper.getRange()
  }
)
