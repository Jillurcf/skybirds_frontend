import { mkdir } from 'node:fs/promises';
import path from 'node:path';
import sharp from 'sharp';

const root = process.cwd();

const source = {
  shirt: 'photo-1596755094514-f87e34085b2c',
  shirtSoft: 'photo-1611619668988-9dd258b42ed3',
  shirtOxford: 'photo-1591625591034-75d303d2e1a4',
  shirtLinen: 'photo-1601762319935-963f5b1869ad',
  tee: 'photo-1521572163474-6864f9cf17ab',
  teeHeavy: 'photo-1618354691373-d851c5c3a990',
  teeLifestyle: 'photo-1503342217505-b0a15ec3261c',
  jeans: 'photo-1542272604-787c3835535d',
  jeansWashed: 'photo-1541099649105-f69ad21f3246',
  denimDetail: 'photo-1578932750294-f5075e85f44a',
  trouser: 'photo-1551232864-3f0890e580d9',
  jacket: 'photo-1593030103066-0093718efeb9',
  jacketLight: 'photo-1603248180835-7deded48ec18',
  polo: 'photo-1591047139829-d91aecb6caea',
  poloAlternate: 'photo-1621072156002-e2fccdc0b176',
  knit: 'photo-1620799140408-edc6dcb6d633',
  linenWeave: 'photo-1601645191163-3fc0d5d64e35',
  fabricWeave: 'photo-1610030469983-98e550d6193c',
  fabricPanel: 'photo-1641932481849-9ac1cacf360c',
  stitch: 'photo-1576871337632-b9aef4c17ab9',
  workshop: 'photo-1588099768523-f4e6a5679d88',
  collection: 'photo-1523381294911-8d3cead13475',
  editorial: 'photo-1490481651871-ab68de25d43d',
  editorialAlt: 'photo-1483985988355-763728e1935b',
  rail: 'photo-1558769132-cb1aea458c5e',
  railAlt: 'photo-1445205170230-053b83016050',
  store: 'photo-1441986300917-64674bd600d8'
};

const products = [
  ['shirts', 'the-atelier-shirt', [source.shirt, source.linenWeave, source.collection]],
  ['shirts', 'the-atelier-shirt-champagne', [source.shirtSoft, source.fabricWeave, source.editorial]],
  ['shirts', 'the-studio-oxford', [source.shirtOxford, source.fabricPanel, source.rail]],
  ['shirts', 'the-field-linen-shirt', [source.shirtLinen, source.linenWeave, source.collection]],
  ['t-shirts', 'the-essential-crew', [source.tee, source.fabricWeave, source.teeHeavy]],
  ['t-shirts', 'the-heavyweight-tee', [source.teeHeavy, source.knit, source.teeLifestyle]],
  ['jeans', 'the-straight-jean', [source.jeans, source.denimDetail, source.jeansWashed]],
  ['jeans', 'the-relaxed-jean', [source.jeansWashed, source.denimDetail, source.jeans]],
  ['trousers', 'the-tailored-trouser', [source.trouser, source.fabricPanel, source.editorial]],
  ['trousers', 'the-utility-trouser', [source.poloAlternate, source.linenWeave, source.railAlt]],
  ['jackets', 'the-structured-blazer', [source.jacket, source.fabricWeave, source.collection]],
  ['jackets', 'the-lightweight-jacket', [source.jacketLight, source.fabricPanel, source.editorialAlt]],
  ['polo-shirts', 'the-textured-polo', [source.polo, source.linenWeave, source.rail]],
  ['polo-shirts', 'the-classic-polo', [source.poloAlternate, source.fabricWeave, source.store]],
  ['other', 'the-knit-vest', [source.knit, source.fabricPanel, source.workshop]]
];

const categories = [
  ['shirts', source.shirt],
  ['t-shirts', source.tee],
  ['jeans', source.jeans],
  ['trousers', source.trouser],
  ['jackets', source.jacket],
  ['polo-shirts', source.polo],
  ['other', source.knit]
];

const editorials = [
  ['arrivals-01', source.editorial],
  ['arrivals-02', source.linenWeave],
  ['arrivals-03', source.rail],
  ['signature-shirt', source.shirt],
  ['signature-t-shirt', source.tee],
  ['signature-trouser', source.jeans],
  ['signature-jacket', source.jacket],
  ['craftsmanship-detail', source.fabricWeave],
  ['craftsmanship-editorial', source.collection],
  ['production-quality', source.workshop],
  ['hero-fashion', source.editorial, 1920, 1080]
];

const processImages = [
  source.linenWeave,
  source.poloAlternate,
  source.stitch,
  source.denimDetail,
  source.shirtLinen,
  source.rail,
  source.store
];

function tasks() {
  const all = [];

  for (const [category, slug, ids] of products) {
    ids.forEach((id, index) => {
      all.push({ segments: ['products', category, `${slug}-0${index + 1}.webp`], id, width: 1200, height: 1500 });
    });
  }

  for (const [slug, id] of categories) {
    all.push({ segments: ['categories', `${slug}.webp`], id, width: 1200, height: 750 });
  }

  for (const [name, id, width = 1200, height = 1500] of editorials) {
    all.push({ segments: ['editorial', `${name}.webp`], id, width, height });
  }

  processImages.forEach((id, index) => {
    all.push({ segments: ['editorial', `process-0${index + 1}.webp`], id, width: 1200, height: 750 });
  });

  all.push({ segments: ['editorial', 'fabric-poster.webp'], id: source.fabricWeave, width: 1600, height: 900 });
  return all;
}

async function download(id, width, height) {
  const url = new URL(`https://images.unsplash.com/${id}`);
  url.search = new URLSearchParams({
    w: String(width),
    h: String(height),
    fit: 'crop',
    crop: 'entropy',
    q: '85',
    fm: 'jpg'
  }).toString();

  let lastError;
  for (let attempt = 0; attempt < 3; attempt += 1) {
    try {
      const response = await fetch(url, {
        headers: { 'User-Agent': 'SkyBirds image seed' },
        signal: AbortSignal.timeout(30000)
      });

      if (!response.ok) {
        throw new Error(`${response.status} ${response.statusText}`);
      }

      return Buffer.from(await response.arrayBuffer());
    } catch (error) {
      lastError = error;
      await new Promise((resolve) => setTimeout(resolve, 500 * (attempt + 1)));
    }
  }

  throw lastError;
}

async function writeImage({ segments, id, width, height }) {
  const file = path.join(root, 'public', 'images', ...segments);
  await mkdir(path.dirname(file), { recursive: true });
  const input = await download(id, width, height);
  await sharp(input).webp({ quality: 82, effort: 4 }).toFile(file);
}

async function mapLimit(items, limit, task) {
  const results = new Array(items.length);
  let cursor = 0;

  await Promise.all(
    Array.from({ length: Math.min(limit, items.length) }, async () => {
      while (cursor < items.length) {
        const index = cursor;
        cursor += 1;
        results[index] = await task(items[index]);
      }
    })
  );

  return results;
}

async function main() {
  const all = tasks();
  const failures = [];

  await mapLimit(all, 8, async (task) => {
    try {
      await writeImage(task);
    } catch (error) {
      failures.push(`${task.segments.join('/')}: ${error instanceof Error ? error.message : String(error)}`);
    }
  });

  if (failures.length > 0) {
    throw new Error(`Failed to seed ${failures.length} image(s):\n${failures.join('\n')}`);
  }

  console.log(`Seeded ${all.length} Unsplash images.`);
}

void main();
