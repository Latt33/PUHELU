/**
 * PUHELU Financial Model — shared constants.
 * Source: /docs/financial-model.md
 *
 * Update numbers here → landing page + business case page update automatically.
 */

// ─── Investment ───────────────────────────────────────────────
export const INVESTMENT = {
  development: { low: 190_000, base: 315_000, high: 525_000 },
  pilotYear:   { low: 72_000,  base: 120_000, high: 170_000 },
  total:       { low: 262_000, base: 435_000, high: 695_000 },
  nationalRollout: { low: 400_000, high: 740_000 },
} as const;

// ─── Screening Funnel (Helsinki, Year 1) ──────────────────────
export const FUNNEL = {
  eligibleVisits: 400_000,
  uniquePatients: 115_000,
  patientsScreened: { pessimistic: 10_750, base: 26_000, optimistic: 47_400 },
  newDiagnoses:    { pessimistic: 100,    base: 640,    optimistic: 2_470 },
  cumulativeDiagnoses5yr: { pessimistic: 365, base: 2_230, optimistic: 7_550 },
} as const;

// ─── Cost-Effectiveness ───────────────────────────────────────
export const COST_EFFECTIVENESS = {
  costPerDiagnosis: { pessimistic: 3_500, base: 680,  optimistic: 281 },
  costPerQALY:      { pessimistic: 3_500, base: 680,  optimistic: 281 },
  qalyThresholdFinland: 30_000, // HILA/Fimea threshold
} as const;

// ─── 5-Year Returns (Helsinki, investment summary) ───────────
export const RETURNS = {
  totalSavings5yr: 9_200_000,
  netReturn5yr:    8_700_000,
  roi5yr: { pessimistic: 1.7, base: 12, optimistic: 37 },
  paybackMonths: 14,
  irr5yr: { pessimistic: 0.18, base: 0.89, optimistic: 2.1 },
} as const;

// ─── Hospitalisation Savings (National) ───────────────────────
export const HOSPITALISATION = {
  nationalAnnualCost: 29_000_000,        // 2006, Herse et al.
  inflationAdjusted2026: 41_000_000,     // +40% CPI
  helsinkiShare: 0.30,
  savings: {
    conservative10pct: 2_900_000,
    moderate20pct:     5_800_000,
    benchmark39pct:   11_500_000,
  },
} as const;

// ─── Lifetime Value ───────────────────────────────────────────
export const LIFETIME = {
  costDeltaPerYear: 2_890,               // non-severe → severe eosinophilic
  progressionProbability: 0.40,
  avgRemainingYears: 8,
  avoidancePerPatient: 9_250,            // 0.40 × €2,890 × 8
  base5yrUndiscounted: 20_600_000,       // 2,230 patients × €9,250
  base5yrDiscounted:   15_400_000,       // at 3.5%
} as const;

// ─── Epidemiology ─────────────────────────────────────────────
export const EPI = {
  copdPrevalenceFinland: 0.06,           // ~330,000
  copdPatientsHelsinki: 102_000,
  undiagnosedRate: 0.49,                 // Kotaniemi et al. 2005
  undiagnosedHelsinki: 50_000,
  smokingPrevalence: 0.144,              // THL 2024
  smokingExposedShare: 0.30,             // incl. ex-smokers
  totalCOPDCostAnnual: 110_000_000,      // €100–110M
  projectedCost2030: 166_000_000,        // +60%
} as const;

// ─── Precedent ────────────────────────────────────────────────
export const PRECEDENT = {
  copdProgrammeReduction: 0.397,         // 39.7%
  costsBelowProjection: 0.88,            // 88% lower
} as const;

// ─── AstraZeneca ──────────────────────────────────────────────
export const AZ = {
  respiratoryRevenue: 7_900_000_000,     // USD, FY2024
  breztriRevenue: 978_000_000,           // USD, FY2024
  marketShareMid: 0.25,
  cumulative5yrRevenueMid: 2_400_000,    // Helsinki
  cumulative5yrRevenueNational: 12_000_000,
} as const;

// ─── Sensitivity ──────────────────────────────────────────────
export const SENSITIVITY = {
  breakEvenScreeningRate: 6_500,         // unique patients/year
  breakEvenClickThrough: 0.12,           // 12%
  breakEvenPhysicianEngagement: 0.18,    // 18%
} as const;

// ─── Citations ────────────────────────────────────────────────
export const CITATIONS = {
  kotaniemi: {
    label: 'Kotaniemi et al. 2005',
    url: 'https://www.tandfonline.com/doi/full/10.1080/15412550500218122',
  },
  herse: {
    label: 'Herse et al. 2015',
    url: 'https://www.nature.com/articles/npjpcrm201515',
  },
  kinnula: {
    label: 'Kinnula et al. 2011',
    url: 'https://pmc.ncbi.nlm.nih.gov/articles/PMC6549818/',
  },
  laruSompa: {
    label: 'Laru-Sompa et al. 2020',
    url: 'https://pmc.ncbi.nlm.nih.gov/articles/PMC6818542/',
  },
  azFY2024: {
    label: 'AstraZeneca FY2024',
    url: 'https://www.astrazeneca.com/content/dam/az/PDF/2024/full-year/Full-year-and-Q4-2024-results-announcement.pdf',
  },
} as const;

// ─── Helpers ──────────────────────────────────────────────────
/** Format number as €X.XM / €XXk / €XX */
export function eurFmt(n: number): string {
  if (Math.abs(n) >= 1_000_000) return `€${(n / 1_000_000).toFixed(1)}M`;
  if (Math.abs(n) >= 1_000)     return `€${Math.round(n / 1_000)}k`;
  return `€${n}`;
}

/** Format as percentage string */
export function pctFmt(n: number, decimals = 1): string {
  return `${(n * 100).toFixed(decimals)}%`;
}
