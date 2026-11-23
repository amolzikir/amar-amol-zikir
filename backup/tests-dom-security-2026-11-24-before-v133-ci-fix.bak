const fs = require("node:fs");
const path = require("node:path");
const vm = require("node:vm");
const { test } = require("node:test");
const assert = require("node:assert/strict");

const source = fs.readFileSync(path.join(__dirname, "..", "index.html"), "utf8");
const start = source.indexOf("function esc(s){");
const end = source.indexOf("\nfunction saveNavState", start);
if (start < 0 || end < 0) throw new Error("HTML escaping helper was not found");
const helper = source.slice(start, end);
const context = {};
vm.runInNewContext(helper + "\nglobalThis.escapeValue=esc; globalThis.safeUrl=safeHttpsUrl;", context);

test("HTML escaping neutralizes hostile imported IDs before attribute insertion", () => {
  const hostile = 'x"><img src=x onerror=alert(1)><svg onload=alert(2)>&';
  const escaped = context.escapeValue(hostile);
  assert.equal(escaped, "x&quot;&gt;&lt;img src=x onerror=alert(1)&gt;&lt;svg onload=alert(2)&gt;&amp;");
  assert.equal(escaped.includes("<"), false);
  assert.equal(escaped.includes(">"), false);
  assert.equal(escaped.includes('"'), false);
  assert.equal(escaped.includes("'"), false);
});

test("all item and breadcrumb IDs inserted into HTML attributes are escaped", () => {
  assert.ok(source.includes('data-parent="${esc(x.id)}"'));
  assert.ok(source.includes('data-id="${esc(x.id)}"'));
  assert.ok(source.includes('}="${esc(x.id)}" aria-label='));
  assert.equal(source.includes('data-parent="${x.id}"'), false);
  assert.equal(source.includes('data-id="${x.id}"'), false);
});

test("external source links accept HTTPS only and neutralize unsafe schemes", () => {
  assert.equal(context.safeUrl("https://shamela.ws/book/735/9538"), "https://shamela.ws/book/735/9538");
  assert.equal(context.safeUrl("javascript:alert(1)"), "#");
  assert.equal(context.safeUrl("data:text/html,<svg onload=alert(1)>"), "#");
  assert.equal(context.safeUrl("http://example.com"), "#");
  assert.equal(context.safeUrl("not a url"), "#");
});

test("Dua card IDs and source URLs are safely inserted into HTML", () => {
  assert.ok(source.includes('data-dua-id="\'+esc(d.id)+\'"'));
  assert.ok(source.includes('href="\'+esc(safeHttpsUrl(d.url))+\'"'));
  assert.equal(source.includes('data-dua-id="\'+d.id+\'"'), false);
  assert.equal(source.includes('href="\'+d.url+\'"'), false);
});
