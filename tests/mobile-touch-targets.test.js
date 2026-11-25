import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";

const html = readFileSync(new URL("../index.html", import.meta.url), "utf8");

test("daily date navigation buttons have at least 44px touch targets", () => {
  assert.match(html, /\.daily-date-nav button\{[^}]*width:44px;height:44px;min-width:44px;min-height:44px/);
});
test("daily amal count, reorder, edit and remove controls have 44px touch targets", () => {
  assert.match(html, /\.daily-amal-count button\{[^}]*min-width:44px;width:44px;min-height:44px;height:44px/);
  assert.match(html, /\.daily-amal-order button\{[^}]*min-width:44px;width:44px;min-height:44px;height:44px/);
  assert.match(html, /\.daily-amal-edit,\.daily-amal-remove\{[^}]*min-width:44px;width:44px;min-height:44px;height:44px/);
});
test("tasbih phrase tools and quran entry buttons have at least 44px touch height", () => {
  assert.match(html, /#tasbihPanel \.tasbih-phrase-tools button\{[^}]*width:44px;height:44px;min-width:44px;min-height:44px/);
  assert.match(html, /\.quran-entry button\{[^}]*min-height:44px;padding:8px 12px/);
});
