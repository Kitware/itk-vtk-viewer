import registerWebworker from 'webworker-promise/lib/register'
import { createRangeHelper } from './createRangeHelper'

const computeRangesInSplit = ({
  split,
  numberOfSplits,
  values,
  numberOfComponents,
}) => {
  const helpers = [...Array(numberOfComponents)].map(createRangeHelper)

  const start = Math.floor(values.length / numberOfSplits) * split
  const end =
    split === numberOfSplits - 1
      ? values.length
      : Math.floor(values.length / numberOfSplits) * (split + 1)

  for (let i = start; i < end; i++) {
    helpers[i % numberOfComponents].add(values[i])
  }

  return helpers.map(h => h.getRange())
}

registerWebworker().operation('computeRanges', computeRangesInSplit)
