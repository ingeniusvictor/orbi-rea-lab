import test from "node:test";
import assert from "node:assert/strict";
import { annualConsumption, annualProduction, previewQuote } from "../src/index.js";

test("12 months of consumption", () => {
  assert.equal(annualConsumption(450), 5400);
});

test("annual production uses synthetic assumptions", () => {
  assert.equal(annualProduction(1, 4, 0.78), 1138.8);
});

test("quote links both modules and returns finite values", () => {
  const q = previewQuote({ monthlyKwh: 450 });
  assert.ok(q.nominalKwp >= 4.7);
  assert.ok(Number.isFinite(q.estimatedAnnualProductionKwh));
  assert.equal(q.annualConsumptionKwh, 5400);
});

test("bad inputs are rejected", () => {
  assert.throws(() => annualConsumption(0), RangeError);
  assert.throws(() => annualProduction(4, -1, 0.78), RangeError);
});
