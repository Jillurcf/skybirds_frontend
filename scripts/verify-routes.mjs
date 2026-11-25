import { spawn } from 'node:child_process';
import { existsSync } from 'node:fs';
import { fileURLToPath } from 'node:url';

const port = Number(process.env.VERIFY_PORT ?? 4310);
const baseUrl = `http://127.0.0.1:${port}`;
const nextBin = fileURLToPath(new URL('../node_modules/next/dist/bin/next', import.meta.url));

const routes = [
  '/',
  '/products',
  '/products/shirts',
  '/products/t-shirts',
  '/products/jeans',
  '/products/trousers',
  '/products/jackets',
  '/products/polo-shirts',
  '/products/other',
  '/products/the-atelier-shirt',
  '/products/the-studio-oxford',
  '/products/the-field-linen-shirt',
  '/products/the-essential-crew',
  '/products/the-heavyweight-tee',
  '/products/the-straight-jean',
  '/products/the-relaxed-jean',
  '/products/the-tailored-trouser',
  '/products/the-utility-trouser',
  '/products/the-structured-blazer',
  '/products/the-lightweight-jacket',
  '/products/the-textured-polo',
  '/products/the-classic-polo',
  '/products/the-knit-vest',
  '/about',
  '/manufacturing',
  '/contact'
];

if (!existsSync(fileURLToPath(new URL('../.next/BUILD_ID', import.meta.url)))) {
  console.error('Run `npm run build` before `npm run verify:routes`.');
  process.exit(1);
}

const server = spawn(process.execPath, [nextBin, 'start', '-p', String(port)], {
  cwd: fileURLToPath(new URL('..', import.meta.url)),
  stdio: 'ignore'
});

async function waitForServer() {
  for (let attempt = 0; attempt < 60; attempt += 1) {
    try {
      const response = await fetch(baseUrl, { signal: AbortSignal.timeout(1000) });
      if (response.ok) return;
    } catch {
      await new Promise((resolve) => setTimeout(resolve, 500));
    }
  }
  throw new Error('Production server did not start.');
}

async function fetchRoute(path) {
  const response = await fetch(`${baseUrl}${path}`, {
    signal: AbortSignal.timeout(10000)
  });
  return { path, status: response.status, body: await response.text() };
}

function expect(check, message) {
  if (!check) throw new Error(message);
}

try {
  await waitForServer();

  for (const route of routes) {
    const { path, status, body } = await fetchRoute(route);
    expect(status === 200, `${path}: expected 200, received ${status}`);
    expect(body.includes('<html lang="en"'), `${path}: missing English document language`);
    expect(body.includes('rel="canonical"'), `${path}: missing canonical URL`);
    expect(body.includes('sky-birds-og.png'), `${path}: missing Open Graph image`);
    expect(body.includes('<main'), `${path}: missing main landmark`);
    expect(body.includes('<h1'), `${path}: missing h1`);
    expect(!body.includes('http://localhost:3000'), `${path}: localhost leaked into metadata`);
  }

  const missing = await fetchRoute('/this-page-does-not-exist');
  expect(missing.status === 404, `404 route: expected 404, received ${missing.status}`);
  expect(missing.body.includes('noindex'), '404 route: missing noindex directive');
  expect(missing.body.includes('Explore products'), '404 route: missing recovery CTA');

  const robots = await fetchRoute('/robots.txt');
  expect(robots.status === 200, `robots.txt: expected 200, received ${robots.status}`);
  expect(robots.body.includes('Sitemap:'), 'robots.txt: missing sitemap directive');
  expect(robots.body.includes('Disallow: /api/'), 'robots.txt: missing API disallow rule');

  const sitemap = await fetchRoute('/sitemap.xml');
  expect(sitemap.status === 200, `sitemap.xml: expected 200, received ${sitemap.status}`);
  const sitemapPaths = Array.from(sitemap.body.matchAll(/<loc>(.*?)<\/loc>/g), (match) =>
    new URL(match[1]).pathname
  );
  for (const route of routes) {
    expect(sitemapPaths.includes(route), `sitemap.xml: missing ${route}`);
  }

  console.log(`Verified ${routes.length} routes plus 404, robots.txt and sitemap.xml.`);
} finally {
  server.kill('SIGTERM');
}
