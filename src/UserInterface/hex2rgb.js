function hex2rgb(hexColor) {
  const bigint = parseInt(hexColor.substring(1), 16)
  const r = ((bigint >> 16) & 255) / 255.0
  const g = ((bigint >> 8) & 255) / 255.0
  const b = (bigint & 255) / 255.0

  return [r, g, b]
}

export default hex2rgb;
