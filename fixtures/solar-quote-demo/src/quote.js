import { annualConsumption, annualProduction } from "./energy.js";

/** Estimación sintética, sin tarifas, equipos ni irradiancia reales. */
export function previewQuote({ monthlyKwh, peakSunHours = 4.0, performanceRatio = 0.78 }) {
  const annualKwh = annualConsumption(monthlyKwh);
  // Calcula potencia de referencia y redondea por razones de demostración.
  const nominalKwp = Math.ceil((annualKwh / (peakSunHours * 365 * performanceRatio)) * 10) / 10;
  const estimatedAnnualKwh = annualProduction(nominalKwp, peakSunHours, performanceRatio);
  return {
    annualConsumptionKwh: annualKwh,
    nominalKwp,
    estimatedAnnualProductionKwh: Math.round(estimatedAnnualKwh)
  };
}
