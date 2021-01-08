function transformLabelImageWeight(weight, minWeight, maxWeight) {
  return weight * (maxWeight - minWeight) + minWeight
}

export default transformLabelImageWeight
