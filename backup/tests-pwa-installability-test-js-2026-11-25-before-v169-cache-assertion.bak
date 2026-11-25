const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');

const read = (name) => fs.readFileSync(path.join(__dirname, '..', name), 'utf8');

test('manifest declares scalable standard and maskable app icons', () => {
  const manifest = JSON.parse(read('manifest.webmanifest'));
  assert.ok(manifest.icons.some(icon => icon.src === './assets/app-icon.svg' && icon.sizes === '192x192' && icon.type === 'image/svg+xml' && icon.purpose === 'any'));
  assert.ok(manifest.icons.some(icon => icon.src === './assets/app-icon.svg' && icon.sizes === '512x512' && icon.type === 'image/svg+xml' && icon.purpose === 'any'));
  assert.ok(manifest.icons.some(icon => icon.src === './assets/app-icon-maskable.svg' && icon.sizes === '512x512' && icon.type === 'image/svg+xml' && icon.purpose === 'maskable'));
  assert.equal(manifest.display, 'standalone');
});

test('index links the app icon and manifest', () => {
  const html = read('index.html');
  assert.match(html, /rel=["']manifest["'] href=["']manifest\.webmanifest["']/);
  assert.match(html, /rel=["']icon["'][^>]*href=["']assets\/app-icon\.svg["']/);
});

test('service worker precaches both app icons for offline installation shell', () => {
  const sw = read('sw.js');
  assert.match(sw, /amol-zikir-v168/);
  assert.match(sw, /\.\/assets\/app-icon\.svg/);
  assert.match(sw, /\.\/assets\/app-icon-maskable\.svg/);
  for (const file of ['assets/app-icon.svg', 'assets/app-icon-maskable.svg']) {
    assert.match(read(file), /<svg[\s>]/);
    assert.match(read(file), /viewBox="0 0 512 512"/);
  }
});
