function rgb2hex(rgb) {
  return "#" + ((1 << 24) + (rgb[0]*255 << 16) + (rgb[1]*255 << 8) + rgb[2]*255).toString(16).slice(1);
}

export default rgb2hex;
