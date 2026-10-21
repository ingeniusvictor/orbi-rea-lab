import test from "node:test";
import assert from "node:assert/strict";
import { investigations, categories, filterInvestigations, getInvestigation, getSummary } from "../lib/demo-investigations.mjs";

test("demo IDs are unique, stable, and URL safe", () => {
  const ids = investigations.map((i) => i.id);
  assert.equal(new Set(ids).size, ids.length);
  assert.ok(ids.every((id) => /^demo-[a-z0-9-]+$/.test(id)));
});

test("all records are explicitly synthetic and never expose evidence identifiers", () => {
  for (const item of investigations) {
    assert.equal(item.status, "Demostración");
    assert.ok(item.summary.toLocaleLowerCase("es").includes("sintétic") || item.summary.toLocaleLowerCase("es").includes("ficticio"));
    assert.equal(Object.hasOwn(item, "evidenceId"), false);
    assert.ok(Array.isArray(item.relations));
    assert.ok(item.relations.every((edge) => edge.every((node) => item.modules.includes(node))));
  }
});

test("category and text search are combinable and accent-insensitive for case", () => {
  assert.equal(filterInvestigations().length, investigations.length);
  assert.equal(filterInvestigations({ category: "Android" }).length, 1);
  assert.equal(filterInvestigations({ query: "solar" }).length, 1);
  assert.equal(filterInvestigations({ query: "auditoria" }).length, 1);
  assert.equal(filterInvestigations({ query: "inexistente" }).length, 0);
  assert.deepEqual(categories, ["Todos", "JavaScript", "Web", "Android"]);
});

test("details are resolved only from allowlisted synthetic IDs", () => {
  assert.equal(getInvestigation("demo-solar-quote")?.category, "JavaScript");
  assert.equal(getInvestigation("../../evidence/local/private"), null);
  assert.equal(getInvestigation("not-found"), null);
});

test("summary distinguishes demos from genuine uploads and connected workers", () => {
  const s = getSummary();
  assert.equal(s.demonstrations, investigations.length);
  assert.equal(s.realUploaded, 0);
  assert.equal(s.connectedWorkers, 0);
  assert.equal(s.categories, 3);
});
