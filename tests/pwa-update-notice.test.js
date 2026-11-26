const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const read = name => fs.readFileSync(path.join(__dirname, '..', name), 'utf8');

test('service worker waits for an explicit user update action', () => {
  const sw = read('sw.js');
  assert.match(sw, /const CACHE=["']amol-zikir-v177["']/);
  assert.match(sw, /addEventListener\(["']message["'],e=>\{if\(e\.data&&e\.data\.type===["']SKIP_WAITING["']\)self\.skipWaiting\(\)\}\)/);
  assert.doesNotMatch(sw, /then\(\(\)=>self\.skipWaiting\(\)\)/);
});

test('app shows an accessible update notice only when a new worker is waiting', () => {
  const html = read('index.html');
  assert.match(html, /registration\.waiting\)showUpdateNotice\(\)/);
  assert.match(html, /worker\.state==="installed"\)showUpdateNotice\(\)/);
  assert.match(html, /setAttribute\(["']aria-live["'],["']polite["']\)/);
  assert.match(html, /postMessage\(\{type:["']SKIP_WAITING["']\}\)/);
  assert.match(html, /controllerchange/);
  assert.match(html, /appServiceWorkerRegistrationPromise/);
});
