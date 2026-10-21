import assert from "node:assert/strict";
import { readFileSync, existsSync } from "node:fs";
import { join } from "node:path";

const root = new URL("../out/", import.meta.url);
const routes = [
  "index.html",
  "about.html",
  "investigations.html",
  "investigations/demo-solar-quote.html",
  "investigations/demo-web-journey.html",
  "investigations/demo-android-audit.html"
];

for (const route of routes) {
  const file = new URL(route, root);
  assert.ok(existsSync(file), `Static route missing: ${route}`);
  const html = readFileSync(file, "utf8");
  assert.match(html, /<html[^>]*lang="es"/, `Spanish language missing: ${route}`);
  assert.match(html, /<main[\s>]/, `Main landmark missing: ${route}`);
  assert.doesNotMatch(html, /ev_[0-9a-f]{64}/i, `Private Evidence ID exposed: ${route}`);
}
const home = readFileSync(new URL("index.html", root), "utf8");
assert.match(home, /MODO DEMO/);
assert.match(home, /name="robots"[^>]*noindex/);
const detail = readFileSync(new URL("investigations/demo-android-audit.html", root), "utf8");
assert.match(detail, /NO REAL/);
console.log(`ORBI P3 static QA OK: ${routes.length} routes verified; no private Evidence IDs.`);
