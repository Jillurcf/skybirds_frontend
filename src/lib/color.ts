export function isLightColor(hex: string): boolean {
  const value = hex.replace('#', '');

  if (!/^[0-9a-f]{6}$/i.test(value)) {
    return true;
  }

  const red = Number.parseInt(value.slice(0, 2), 16);
  const green = Number.parseInt(value.slice(2, 4), 16);
  const blue = Number.parseInt(value.slice(4, 6), 16);
  const luminance = (0.299 * red + 0.587 * green + 0.114 * blue) / 255;

  return luminance > 0.62;
}
