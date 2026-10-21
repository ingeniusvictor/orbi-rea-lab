/** Cálculos demostrativos. No usar para cotizaciones o diseños reales. */
export function annualConsumption(monthlyKwh) {
  if (!Number.isFinite(monthlyKwh) || monthlyKwh <= 0) {
    throw new RangeError("monthlyKwh must be a positive finite number");
  }
  return monthlyKwh * 12;
}

export function annualProduction(kwp, peakSunHours, performanceRatio = 0.78) {
  if (![kwp, peakSunHours, performanceRatio].every(Number.isFinite) ||
      kwp <= 0 || peakSunHours <= 0 || performanceRatio <= 0 || performanceRatio > 1) {
    throw new RangeError("invalid synthetic photovoltaic inputs");
  }
  return kwp * peakSunHours * 365 * performanceRatio;
}
