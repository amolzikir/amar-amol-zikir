import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";

const html = readFileSync(new URL("../index.html", import.meta.url), "utf8");

test("all common interactive controls receive a visible keyboard focus indicator", () => {
  assert.match(
    html,
    /:where\(button,a,input,select,textarea,\[tabindex\]\):focus-visible\s*\{\s*outline:\s*3px solid var\(--gold\);\s*outline-offset:\s*3px\s*\}/
  );
});
