import { mkdir } from 'node:fs/promises';
import path from 'node:path';
import sharp from 'sharp';

const root = process.cwd();
const outputDirectory = path.join(root, 'public', 'images', 'brand');
const outputPath = path.join(outputDirectory, 'sky-birds-og.png');

const width = 1200;
const height = 630;

const caption = Buffer.from(`
<svg width="${width}" height="${height}" xmlns="http://www.w3.org/2000/svg">
  <rect width="${width}" height="${height}" fill="#F5F1ED"/>
  <rect x="0" y="0" width="${width}" height="14" fill="#B98270"/>
  <rect x="0" y="${height - 14}" width="${width}" height="14" fill="#242323"/>
  <rect x="96" y="472" width="320" height="3" fill="#8C5B4B"/>
  <text x="96" y="528" fill="#242323" font-family="Georgia, 'Times New Roman', serif" font-size="30" letter-spacing="1.5">Premium menswear &amp; manufacturing</text>
</svg>
`);

const [captionLayer, logo, emblem] = await Promise.all([
  sharp(caption).png().toBuffer(),
  sharp(path.join(outputDirectory, 'sky-birds-logo.png')).resize({ width: 560 }).png().toBuffer(),
  sharp(path.join(outputDirectory, 'sky-birds-emblem.png')).resize({ width: 180 }).png().toBuffer()
]);

const logoMetadata = await sharp(logo).metadata();
const emblemMetadata = await sharp(emblem).metadata();

await mkdir(outputDirectory, { recursive: true });

await sharp(captionLayer)
  .composite([
    { input: logo, left: 96, top: 118 },
    {
      input: emblem,
      left: width - 96 - (emblemMetadata.width ?? 180),
      top: Math.round((height - (emblemMetadata.height ?? 210)) / 2)
    }
  ])
  .png({ quality: 90 })
  .toFile(outputPath);

const generated = await sharp(outputPath).metadata();
if (generated.width !== width || generated.height !== height) {
  throw new Error(`Unexpected Open Graph image dimensions: ${generated.width}x${generated.height}`);
}

console.log(`Generated ${outputPath} (${logoMetadata.width}px logo source)`);
