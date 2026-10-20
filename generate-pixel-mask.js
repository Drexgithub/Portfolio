import fs from 'fs';

const W = 600;
const H = 518;
const pixelSize = 10; // crisp pixel block
const fadeStart = 390; // start fading at collar/shoulders, below chin
const fadeHeight = H - fadeStart;

// 8x8 Bayer matrix normalized to 0..1
const bayer8 = [
  [ 0, 32,  8, 40,  2, 34, 10, 42],
  [48, 16, 56, 24, 50, 18, 58, 26],
  [12, 44,  4, 36, 14, 46,  6, 38],
  [60, 28, 52, 20, 62, 30, 54, 22],
  [ 3, 35, 11, 43,  1, 33,  9, 41],
  [51, 19, 59, 27, 49, 17, 57, 25],
  [15, 47,  7, 39, 13, 45,  5, 37],
  [63, 31, 55, 23, 61, 29, 53, 21]
].map(row => row.map(v => (v + 0.5) / 64));

let rects = [];
// Solid top
rects.push(`<rect x="0" y="0" width="${W}" height="${fadeStart}" fill="white" />`);

const cols = Math.ceil(W / pixelSize);
const rows = Math.ceil(fadeHeight / pixelSize);

for (let r = 0; r < rows; r++) {
  const y = fadeStart + r * pixelSize;
  // Non-linear progression for a smooth natural dither
  const linearProgress = r / (rows - 1);
  const progress = Math.pow(linearProgress, 1.2);

  for (let c = 0; c < cols; c++) {
    const x = c * pixelSize;
    const threshold = bayer8[r % 8][c % 8];
    if (threshold > progress) {
      rects.push(`<rect x="${x}" y="${y}" width="${pixelSize}" height="${pixelSize}" fill="white" />`);
    }
  }
}

// Create an SVG image that acts directly as an alpha mask or overlay
// In an SVG mask, white = visible (opaque), transparent/black = hidden
const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${W} ${H}" width="${W}" height="${H}">
  <defs>
    <mask id="pixel-fade">
      <rect width="${W}" height="${H}" fill="black" />
      ${rects.join('\n      ')}
    </mask>
  </defs>
  <rect width="${W}" height="${H}" fill="white" mask="url(#pixel-fade)" />
</svg>`;

fs.writeFileSync('public/pixel-mask.svg', svg);
console.log('Successfully wrote public/pixel-mask.svg! Rect count:', rects.length);
