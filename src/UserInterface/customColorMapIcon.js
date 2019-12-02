const canvas = document.createElement('canvas');
const width = 240;
const height = 20;
canvas.setAttribute('width', width);
canvas.setAttribute('height', height);

function customColorMapIcon(
  colorTransferFunction,
  range,
) {
  const ctx = canvas.getContext('2d');

  const rgba = colorTransferFunction.getUint8Table(
    range[0],
    range[1],
    width,
    4,
  );
  const pixelsArea = ctx.getImageData(0, 0, width, 256);
  for (let lineIdx = 0; lineIdx < 256; lineIdx++) {
    pixelsArea.data.set(rgba, lineIdx * 4 * width);
  }

  const nbValues = 256 * width * 4;
  const lineSize = width * 4;
  for (let i = 3; i < nbValues; i += 4) {
    pixelsArea.data[i] = 255 - Math.floor(i / lineSize);
  }

  ctx.putImageData(pixelsArea, 0, 0);
  return canvas.toDataURL('image/png')
}

export default customColorMapIcon;
