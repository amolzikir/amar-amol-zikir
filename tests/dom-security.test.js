const fs = require("node:fs");
const path = require("node:path");
const vm = require("node:vm");
const { test } = require("node:test");
const assert = require("node:assert/strict");

const source = fs.readFileSync(path.join(__dirname, "..", "index.html"), "utf8");
const start = source.indexOf("function esc(s){");
const end = source.indexOf("\\nfunction saveNavState", start);
if (start < 0 || end < 0) throw new Error("HTML escaping helper was not found");
const helper = source.slice(start, end);
const context = {};
vm.runInNewContext(helper + "\\nglobalThis.escapeValue=esc;", context);

test("HTML escaping neutralizes hostile imported IDs before attribute insertion", () => {
  const hostile = 'x\\"><img src=x onerror=alert(1)><svg onload=alert(2)>&';
  const escaped = context.escapeValue(hostile);
  assert.equal(escaped, "x&amp;quot;&amp;gt;&amp;lt;img src=x onerror=alert(1)&amp;gt;&amp;lt;svg onload=alert(2)&amp;gt;&amp;amp;");
  assert.equal(escaped.includes("<"), false);
  assert.equal(escaped.includes(">"), false);
  assert.equal(escaped.includes('"'), false);
  assert.equal(escaped.includes("'"), false);
});

test("all item and breadcrumb IDs inserted into HTML attributes are escaped", () => {
  assert.match(source, /data-parent="\\$\\{esc\\(x\\.id\\)\\}"/);
  assert.match(source, /data-id="\\$\\{esc\\(x\\.id\\)\\}"/);
  assert.match(source, /\\}="\\$\\{esc\\(x\\.id\\)\\}" aria-label=/);
  assert.doesNotMatch(source, /data-parent="\\$\\{x\\.id\\}"/);
  assert.doesNotMatch(source, /data-id="\\$\\{x\\.id\\}"/);
});
