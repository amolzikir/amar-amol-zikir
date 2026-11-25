const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');

const html = fs.readFileSync('index.html', 'utf8');

test('leaving-home dua links directly to Abu Dawud hadith 5095', () => {
  assert.match(html, /id:"leaving-home"[\s\S]*?source:"সুনান আবি দাউদ, হাদিস ৫০৯৫"[\s\S]*?url:"https:\/\/shamela\.ws\/book\/1726\/6957"/);
});

test('morning-evening afiyah dua links directly to Abu Dawud hadith 5074', () => {
  assert.match(html, /id:"morning-evening-afiyah"[\s\S]*?source:"সুনান আবি দাউদ, হাদিস ৫০৭৪"[\s\S]*?url:"https:\/\/shamela\.ws\/book\/1726\/6934"/);
});
