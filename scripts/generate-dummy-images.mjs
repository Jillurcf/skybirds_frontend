import { mkdir } from 'node:fs/promises';
import path from 'node:path';
import sharp from 'sharp';

const root = process.cwd();
const ink = '#242323';
const ivory = '#F5F1ED';
const champagne = '#D9C6BB';
const rose = '#B98270';
const deepRose = '#8C5B4B';

function channels(hex) {
  return [1, 3, 5].map((index) => Number.parseInt(hex.slice(index, index + 2), 16));
}

function isLight(hex) {
  const [red, green, blue] = channels(hex);
  return (0.299 * red + 0.587 * green + 0.114 * blue) / 255 > 0.58;
}

function contrast(hex) {
  return isLight(hex) ? ink : ivory;
}

function backdrop(width, height, base, tone) {
  return `
    <defs>
      <linearGradient id="bg" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0" stop-color="${base}" />
        <stop offset="1" stop-color="${tone}" />
      </linearGradient>
      <pattern id="grain" width="24" height="24" patternUnits="userSpaceOnUse" patternTransform="rotate(32)">
        <line x1="0" y1="0" x2="0" y2="24" stroke="${ink}" stroke-opacity="0.045" stroke-width="2" />
      </pattern>
      <radialGradient id="halo" cx="32%" cy="20%" r="70%">
        <stop offset="0" stop-color="${ivory}" stop-opacity="0.55" />
        <stop offset="1" stop-color="${ivory}" stop-opacity="0" />
      </radialGradient>
    </defs>
    <rect width="${width}" height="${height}" fill="url(#bg)" />
    <rect width="${width}" height="${height}" fill="url(#grain)" />
    <rect width="${width}" height="${height}" fill="url(#halo)" />
  `;
}

function frame(width, height, base, tone, content) {
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}" viewBox="0 0 ${width} ${height}">${backdrop(width, height, base, tone)}${content}<rect x="0" y="${height - 3}" width="${width}" height="3" fill="${deepRose}" opacity="0.65" /></svg>`;
}

function garment(category, fabric, stroke) {
  const shape = `
    <g stroke="${stroke}" stroke-opacity="0.3" stroke-width="5" stroke-linejoin="round">
      ${garmentPath(category, fabric)}
    </g>
  `;
  return shape;
}

function garmentPath(category, fabric) {
  const fill = `fill="${fabric}"`;

  if (category === 'jeans' || category === 'trousers') {
    return `
      <path d="M390 250 L810 250 L850 1260 L650 1260 L600 710 L550 1260 L350 1260 Z" ${fill} />
      <path d="M390 330 H810 M600 330 V710 M370 410 H430 M770 410 H830" fill="none" />
      <path d="M410 470 L455 1260 M790 470 L745 1260" fill="none" stroke-opacity="0.18" />
    `;
  }

  if (category === 't-shirts') {
    return `
      <path d="M380 315 L500 250 L700 250 L820 315 L920 520 L820 570 L790 470 L790 1190 L410 1190 L410 470 L380 570 L280 520 Z" ${fill} />
      <path d="M500 250 Q600 330 700 250 M410 470 H790" fill="none" />
    `;
  }

  if (category === 'jackets') {
    return `
      <path d="M350 300 L455 250 L600 305 L745 250 L850 300 L930 520 L828 570 L790 462 L790 1230 L410 1230 L410 462 L372 570 L270 520 Z" ${fill} />
      <path d="M455 250 L600 430 L520 710 L425 310 Z M745 250 L600 430 L680 710 L775 310 Z" fill="${ivory}" fill-opacity="0.12" />
      <path d="M600 430 V1230 M455 250 L600 430 L745 250 M410 470 H790" fill="none" />
      <circle cx="640" cy="690" r="9" fill="${ivory}" fill-opacity="0.7" />
      <circle cx="640" cy="830" r="9" fill="${ivory}" fill-opacity="0.7" />
    `;
  }

  if (category === 'polo-shirts') {
    return `
      <path d="M350 300 L455 250 L600 305 L745 250 L850 300 L930 520 L828 570 L790 462 L790 1230 L410 1230 L410 462 L372 570 L270 520 Z" ${fill} />
      <path d="M455 250 L600 435 L745 250 M600 435 V620 M410 470 H790" fill="none" />
      <circle cx="600" cy="500" r="7" fill="${ivory}" fill-opacity="0.7" />
      <circle cx="600" cy="565" r="7" fill="${ivory}" fill-opacity="0.7" />
    `;
  }

  if (category === 'other') {
    return `
      <path d="M420 300 L520 255 L600 310 L680 255 L780 300 L810 520 L760 545 L750 1200 H450 L440 545 L390 520 Z" ${fill} />
      <path d="M520 255 L600 420 L680 255 M600 420 V1200 M450 545 H750" fill="none" />
    `;
  }

  return `
    <path d="M350 300 L455 250 L600 305 L745 250 L850 300 L930 520 L828 570 L790 462 L790 1230 L410 1230 L410 462 L372 570 L270 520 Z" ${fill} />
    <path d="M455 250 L600 430 L745 250 M600 430 V1230 M410 470 H790" fill="none" />
    <circle cx="630" cy="620" r="8" fill="${ivory}" fill-opacity="0.7" />
    <circle cx="630" cy="760" r="8" fill="${ivory}" fill-opacity="0.7" />
    <circle cx="630" cy="900" r="8" fill="${ivory}" fill-opacity="0.7" />
    <path d="M415 690 H500 M700 690 H785" fill="none" stroke-opacity="0.2" />
  `;
}

function detailArt(fabric, stroke, accent) {
  const weave = Array.from({ length: 16 }, (_, index) => {
    const x = 60 + index * 54;
    return `<path d="M${x} 100 L${x + 520} 1240" stroke="${stroke}" stroke-opacity="0.2" stroke-width="3" />`;
  }).join('');

  return `
    <g transform="rotate(-7 600 730)">
      <rect x="120" y="120" width="960" height="1200" rx="28" fill="${fabric}" stroke="${stroke}" stroke-opacity="0.3" stroke-width="6" />
      ${weave}
      <path d="M240 260 C420 180 780 180 960 260 M240 1180 C420 1080 780 1080 960 1180" fill="none" stroke="${stroke}" stroke-opacity="0.24" stroke-width="4" />
      <circle cx="820" cy="430" r="34" fill="${accent}" fill-opacity="0.9" />
      <circle cx="820" cy="430" r="10" fill="${stroke}" fill-opacity="0.35" />
    </g>
  `;
}

function silhouetteArt(category, fabric, stroke) {
  return `
    <ellipse cx="600" cy="205" rx="74" ry="94" fill="${stroke}" opacity="0.08" />
    <path d="M465 300 Q600 235 735 300" fill="none" stroke="${stroke}" stroke-opacity="0.12" stroke-width="4" />
    <g opacity="0.74">${garment(category, fabric, stroke)}</g>
    <path d="M600 1230 V1350" stroke="${stroke}" stroke-opacity="0.16" stroke-width="6" />
  `;
}

function productPortrait(category, fabric, view) {
  const stroke = contrast(fabric);
  const base = isLight(fabric) ? champagne : ivory;
  const tone = isLight(fabric) ? rose : champagne;
  const art =
    view === 'fabric'
      ? detailArt(fabric, stroke, deepRose)
      : view === 'silhouette'
        ? silhouetteArt(category, fabric, stroke)
        : garment(category, fabric, stroke);

  return frame(1200, 1500, base, tone, art);
}

function categoryWide(category, fabric) {
  const stroke = contrast(fabric);
  const art = `<g transform="translate(320 70) scale(0.46)">${garment(category, fabric, stroke)}</g>`;
  return frame(1200, 750, ivory, champagne, art);
}

function editorialPortrait(kind) {
  const map = {
    arrivalsFirst: ['jackets', '#3B4A6B', 'front'],
    arrivalsFabric: ['shirts', '#E4DCD2', 'fabric'],
    arrivalsDetail: ['trousers', '#2F3437', 'front'],
    signatureShirt: ['shirts', '#E4DCD2', 'front'],
    signatureTee: ['t-shirts', '#D9C6BB', 'front'],
    signatureTrouser: ['trousers', '#2F3437', 'front'],
    signatureJacket: ['jackets', '#242323', 'front'],
    craftDetail: ['shirts', '#D6AFA1', 'fabric'],
    craftEditorial: ['other', '#E4DCD2', 'silhouette'],
    productionQuality: ['jackets', '#2F3437', 'fabric']
  };
  const [category, fabric, view] = map[kind];
  return productPortrait(category, fabric, view);
}

function processWide(index) {
  const accent = deepRose;
  const line = ink;
  const art = [
    `<g stroke="${line}" stroke-opacity="0.34" stroke-width="5"><rect x="170" y="170" width="360" height="410" rx="14" fill="${ivory}" /><rect x="260" y="215" width="360" height="410" rx="14" fill="${champagne}" /><rect x="350" y="260" width="360" height="410" rx="14" fill="${rose}" fill-opacity="0.65" /></g>`,
    `<g stroke="${line}" stroke-opacity="0.3" stroke-width="4" fill="none"><rect x="190" y="140" width="760" height="470" rx="10" fill="${ivory}" /><path d="M260 520 Q420 210 600 520 T900 520 M260 420 Q450 150 640 420 T940 420" /><circle cx="880" cy="580" r="44" stroke="${accent}" stroke-width="8" /></g>`,
    `<g stroke="${line}" stroke-opacity="0.32" stroke-width="5"><rect x="160" y="190" width="880" height="370" rx="12" fill="${champagne}" /><path d="M160 380 H1040 M400 190 V560 M800 190 V560" fill="none" /><circle cx="910" cy="470" r="62" fill="none" stroke="${accent}" stroke-width="10" /><circle cx="840" cy="540" r="62" fill="none" stroke="${accent}" stroke-width="10" /></g>`,
    `<g stroke="${line}" stroke-opacity="0.32" stroke-width="5" fill="none"><path d="M250 600 L880 150 M250 600 L560 620 Q740 600 880 150" stroke="${accent}" stroke-width="8" /><circle cx="250" cy="600" r="38" /><path d="M560 620 H930 V470 H700 Z M700 470 V380" /><circle cx="660" cy="230" r="30" /></g>`,
    `<g stroke="${line}" stroke-opacity="0.3" stroke-width="5"><rect x="220" y="300" width="650" height="260" rx="30" fill="${ivory}" /><path d="M870 360 Q1030 360 1010 430 Q990 490 870 480" fill="${champagne}" /><path d="M260 560 H850" stroke="${accent}" stroke-width="10" /><path d="M340 220 Q600 130 860 220" fill="none" stroke-opacity="0.2" /></g>`,
    `<g stroke="${line}" stroke-opacity="0.32" stroke-width="5"><rect x="300" y="130" width="600" height="500" rx="18" fill="${ivory}" /><rect x="380" y="190" width="130" height="120" rx="8" fill="${champagne}" /><path d="M390 380 H810 M390 460 H810 M390 540 H650" fill="none" /><path d="M760 180 L800 220 L880 120" stroke="${accent}" stroke-width="12" fill="none" /></g>`,
    `<g stroke="${line}" stroke-opacity="0.3" stroke-width="5"><rect x="230" y="280" width="360" height="330" rx="10" fill="${champagne}" /><rect x="610" y="210" width="360" height="400" rx="10" fill="${ivory}" /><path d="M230 380 H590 M610 310 H970 M790 210 V610" fill="none" /><path d="M390 280 V610" stroke="${accent}" stroke-width="10" /></g>`
  ][index - 1];

  return frame(1200, 750, ivory, champagne, art);
}

function fabricPoster() {
  const content = `
    <defs>
      <linearGradient id="drape" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0" stop-color="${ivory}" />
        <stop offset="0.5" stop-color="${champagne}" />
        <stop offset="1" stop-color="${rose}" />
      </linearGradient>
    </defs>
    <path d="M0 780 C220 540 390 680 600 420 C800 180 1010 280 1600 80 V900 H0 Z" fill="url(#drape)" />
    <path d="M0 620 C260 420 430 560 640 300 C850 40 1100 180 1600 0" fill="none" stroke="${ivory}" stroke-opacity="0.55" stroke-width="24" />
    <path d="M0 760 C260 560 450 700 660 430 C870 160 1120 300 1600 120" fill="none" stroke="${deepRose}" stroke-opacity="0.28" stroke-width="8" />
    <path d="M0 840 C280 640 470 780 700 500 C920 230 1180 360 1600 200" fill="none" stroke="${ivory}" stroke-opacity="0.35" stroke-width="12" />
  `;
  return `<svg xmlns="http://www.w3.org/2000/svg" width="1600" height="900" viewBox="0 0 1600 900">${backdrop(1600, 900, champagne, rose)}${content}</svg>`;
}

function heroFashion() {
  const content = `
    <defs>
      <linearGradient id="heroDrape" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0" stop-color="${champagne}" />
        <stop offset="0.55" stop-color="${rose}" />
        <stop offset="1" stop-color="${deepRose}" />
      </linearGradient>
    </defs>
    <path d="M-80 900 C260 610 520 760 780 430 C1020 130 1360 250 2000 -40 V1120 H-80 Z" fill="url(#heroDrape)" opacity="0.82" />
    <g transform="translate(40 260) scale(0.7) rotate(-8 600 730)">${detailArt('#D9C6BB', ink, deepRose)}</g>
    <g transform="translate(1020 -80) scale(0.62)">${silhouetteArt('jackets', ivory, ink)}</g>
    <path d="M0 980 H1920" stroke="${ivory}" stroke-opacity="0.12" stroke-width="2" />
    <path d="M1440 120 H1840" stroke="${deepRose}" stroke-opacity="0.7" stroke-width="4" />
  `;
  return frame(1920, 1080, ink, '#3B4A6B', content);
}

async function writeImage(segments, svg) {
  const file = path.join(root, 'public', 'images', ...segments);
  await mkdir(path.dirname(file), { recursive: true });
  await sharp(Buffer.from(svg)).webp({ quality: 82, effort: 4 }).toFile(file);
}

async function main() {
  const products = [
    ['shirts', 'the-atelier-shirt', '#D9C6BB'],
    ['shirts', 'the-atelier-shirt-champagne', '#D6AFA1'],
    ['shirts', 'the-studio-oxford', '#C8B6A6'],
    ['shirts', 'the-field-linen-shirt', '#E4DCD2'],
    ['t-shirts', 'the-essential-crew', '#D9C6BB'],
    ['t-shirts', 'the-heavyweight-tee', '#B8B1A6'],
    ['jeans', 'the-straight-jean', '#3B4A6B'],
    ['jeans', 'the-relaxed-jean', '#2F3437'],
    ['trousers', 'the-tailored-trouser', '#2F3437'],
    ['trousers', 'the-utility-trouser', '#6B6F5E'],
    ['jackets', 'the-structured-blazer', '#242323'],
    ['jackets', 'the-lightweight-jacket', '#9C5F45'],
    ['polo-shirts', 'the-textured-polo', '#D6AFA1'],
    ['polo-shirts', 'the-classic-polo', '#3B4A6B'],
    ['other', 'the-knit-vest', '#E4DCD2']
  ];

  const views = ['front', 'fabric', 'silhouette'];
  const tasks = [];

  for (const [category, slug, fabric] of products) {
    views.forEach((view, index) => {
      tasks.push(
        writeImage(
          ['products', category, `${slug}-0${index + 1}.webp`],
          productPortrait(category, fabric, view)
        )
      );
    });
  }

  const categories = [
    ['shirts', '#E4DCD2'],
    ['t-shirts', '#D9C6BB'],
    ['jeans', '#3B4A6B'],
    ['trousers', '#2F3437'],
    ['jackets', '#242323'],
    ['polo-shirts', '#D6AFA1'],
    ['other', '#B8B1A6']
  ];

  for (const [slug, fabric] of categories) {
    tasks.push(writeImage(['categories', `${slug}.webp`], categoryWide(slug, fabric)));
  }

  const editorials = [
    ['arrivals-01', 'arrivalsFirst'],
    ['arrivals-02', 'arrivalsFabric'],
    ['arrivals-03', 'arrivalsDetail'],
    ['signature-shirt', 'signatureShirt'],
    ['signature-t-shirt', 'signatureTee'],
    ['signature-trouser', 'signatureTrouser'],
    ['signature-jacket', 'signatureJacket'],
    ['craftsmanship-editorial', 'craftEditorial'],
    ['production-quality', 'productionQuality']
  ];

  for (const [name, kind] of editorials) {
    tasks.push(writeImage(['editorial', `${name}.webp`], editorialPortrait(kind)));
  }

  for (let index = 1; index <= 7; index += 1) {
    tasks.push(writeImage(['editorial', `process-0${index}.webp`], processWide(index)));
  }

  tasks.push(writeImage(['editorial', 'fabric-poster.webp'], fabricPoster()));
  tasks.push(writeImage(['editorial', 'hero-fashion.webp'], heroFashion()));
  await Promise.all(tasks);
  console.log(`Generated ${tasks.length} dummy images.`);
}

void main();
