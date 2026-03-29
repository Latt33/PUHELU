# Business Case

## Why

**The underdiagnosis gap:**
- COPD prevalence in Finland: ~6% of the adult population (~330,000 individuals) [(Kotaniemi et al. 2005)](https://www.tandfonline.com/doi/full/10.1080/15412550500218122)
- Actively treated (per prescription data): 25,000–50,000
- A Finnish population study found that 49% of individuals with spirometry-confirmed obstruction had no prior COPD diagnosis [(Kotaniemi et al. 2005)](https://www.tandfonline.com/doi/full/10.1080/15412550500218122)

**Why they go undiagnosed:**
- Spirometry exists and works — the diagnostic capability is not the issue
- Primary care consultations are time-constrained and focused on the presenting complaint
- Without a systematic prompt, physicians have no reason to screen for a condition the patient hasn't raised
- COPD surfaces only at the point of acute exacerbation — emergency intervention rather than early management

**The cost of late detection vs. early treatment:**

| | Non-severe COPD | Severe COPD | Severe eosinophilic COPD |
|---|---|---|---|
| Total healthcare cost per patient-year | EUR 3,407 | EUR 3,303 | EUR 6,297 |
| COPD-specific cost per patient-year | EUR 319 | EUR 564 | EUR 537 |

*Finnish data from the Hospital District of Southwest Finland, 2004–2015 [(Laru-Sompa et al. 2020)](https://pmc.ncbi.nlm.nih.gov/articles/PMC6818542/)*

**Unit costs in Finnish healthcare [(Laru-Sompa et al. 2020)](https://pmc.ncbi.nlm.nih.gov/articles/PMC6818542/):**
- Outpatient visit: EUR 110
- Emergency room visit: EUR 195
- Hospital inpatient day: EUR 330

**National burden [(Herse et al. 2015)](https://www.nature.com/articles/npjpcrm201515):**
- Total annual COPD costs in Finland (1996–2006): **EUR 100–110 million**
- Direct costs in 2006: EUR 56.3 million, of which **EUR 29 million** was hospitalisations alone (EUR 19.15M secondary care + EUR 9.84M primary care)
- Secondary care hospital day: **EUR 590/day**; primary care hospital day: **EUR 142/day**
- Medication costs rose from EUR 17M (1996) to **EUR 23.3M** (2006)
- Projected total annual cost by 2030: **EUR 166 million** — a 60% increase, driven by population ageing
- Secondary care hospital days decreased 52% between 1996 and 2006, but primary care hospital days increased 17% [(Herse et al. 2015)](https://www.nature.com/articles/npjpcrm201515)

**Precedent for intervention:**
- Finland's 10-year COPD Programme (1998–2007) reduced hospitalisations by **39.7%** with costs **88% lower than projected** [(Kinnula et al. 2011)](https://pmc.ncbi.nlm.nih.gov/articles/PMC6549818/)

## What

**PUHELU** embeds COPD screening into the appointment confirmation SMS that primary care patients already receive.

**How it works:**
- 24h before the appointment, the patient receives the standard SMS confirmation with a link to a short pre-appointment form
- The form starts with general health intake, then branches into COPD-specific questions for patients who report smoking history
- The smoker pathway concludes with a brief vocalization task for acoustic analysis
- Responses are scored transparently — each factor individually visible, no black-box model
- When the threshold is exceeded, a flag is placed in the physician's existing patient information view within the EHR

**What it does not require:**
- No new hardware
- No dedicated software
- No physician training
- No change to existing workflows
- No additional clinical time

**Cost profile:**
- SMS delivery: zero marginal cost (link added to existing confirmation message)
- Form hosting and processing: negligible server costs
- EHR integration: one-time FHIR R4 development cost
- Per patient screened: effectively zero

## How

**Pilot target:**
- Helsinki capital area — Apotti (Epic-based), ~1.7M population
- Apotti has the most mature third-party integration ecosystem in Finnish healthcare (100+ partners, developer sandbox, FHIR R4)

**National scalability:**
- All four major Finnish EHR platforms (Apotti, Lifecare, OMNI360, Esko) support HL7 FHIR R4
- A validated integration pattern can be replicated across all 21 wellbeing services counties

**Screening volume estimate:**
- Finland records ~4.5 million primary care visits per year [(Statista 2024)](https://www.statista.com/statistics/1538504/number-of-health-or-hospital-care-visits-in-finland/)
- Current smoking prevalence: 14.4% [(THL 2024)](https://thl.fi/en/statistics-and-data/statistics-by-topic/alcohol-drugs-and-addiction/tobaccostatistics); including ex-smokers, approximately 30% of patients have smoking exposure
- Helsinki area (~30% of national volume): ~1.35 million visits/year, of which ~400,000 involve patients with smoking history — each one a potential screening opportunity

## Impact

**Helsinki pilot — conservative projection (1 year):**

| Metric | Estimate |
|---|---|
| Estimated COPD patients in Helsinki area (6% of 1.7M) | ~102,000 |
| Estimated undiagnosed (49%, [Kotaniemi et al.](https://www.tandfonline.com/doi/full/10.1080/15412550500218122)) | ~50,000 |
| Primary care visits from patients with smoking exposure | ~400,000/year |
| Assumed form completion rate | 40% (assumption) |
| Completed screening forms from at-risk patients | ~160,000 |
| COPD hospitalisations in Helsinki area (~30% of national) | ~4,500/year (population-proportional estimate) |

**Hospitalisation cost in Helsinki area:**

National COPD hospitalisation costs totalled EUR 29 million in 2006 [(Herse et al. 2015)](https://www.nature.com/articles/npjpcrm201515). Applying Helsinki's ~30% population share gives an estimated **EUR 8.7 million/year** in COPD hospitalisation costs in the pilot region.

A **10% reduction in COPD hospitalisations** in the Helsinki area — conservative relative to the 39.7% achieved by the Finnish COPD Programme [(Kinnula et al. 2011)](https://pmc.ncbi.nlm.nih.gov/articles/PMC6549818/) — would save an estimated **EUR 870,000 per year** in hospitalisation costs alone. A 20% reduction would save approximately **EUR 1.74 million per year**.

Note: hospitalisation reductions from earlier diagnosis are a medium-term outcome (3–5 years), not immediate year-1 returns. Early diagnosis prevents future exacerbations through timely guideline-directed treatment.

**Lifetime value of early diagnosis:**

The annual cost difference between non-severe and severe eosinophilic COPD is approximately EUR 2,900 per patient [(Laru-Sompa et al. 2020)](https://pmc.ncbi.nlm.nih.gov/articles/PMC6818542/). Over a 5–10 year treatment trajectory, a patient diagnosed early enough to remain in a lower severity category avoids approximately **EUR 14,500–29,000 in cumulative excess costs**.

If PUHELU identifies 500 patients at an earlier stage in the Helsinki area, the lifetime cost avoidance is in the range of **EUR 7.25–14.5 million**.

**Cost of follow-up spirometry:**

When PUHELU flags a patient, the physician may order spirometry as a follow-up. In Finnish public healthcare, the full production cost of an outpatient visit (including spirometry) is approximately **EUR 110** [(Laru-Sompa et al. 2020)](https://pmc.ncbi.nlm.nih.gov/articles/PMC6818542/). If PUHELU generates 5,000 spirometry referrals in the pilot year, the total cost is approximately **EUR 550,000** — against potential hospitalisation savings of EUR 870,000–1.74M annually and lifetime cost avoidance of EUR 7.25–14.5M.

**National scale — projected annual hospitalisation savings:**

| Scenario | Reduction | Estimated savings |
|---|---|---|
| Conservative (10%) | 10% of EUR 29M | EUR 2.9M/year |
| Moderate (20%) | 20% of EUR 29M | EUR 5.8M/year |
| Finnish COPD Programme benchmark (39.7%, [Kinnula et al.](https://pmc.ncbi.nlm.nih.gov/articles/PMC6549818/)) | 39.7% of EUR 29M | EUR 11.5M/year |

**The cost of doing nothing:**

Finland's total COPD cost burden stands at EUR 100–110 million per year and is projected to reach **EUR 166 million by 2030** — a 60% increase driven primarily by population ageing [(Herse et al. 2015)](https://www.nature.com/articles/npjpcrm201515). Without systematic early detection, this growth will be driven by the same pattern: late diagnosis, emergency presentation, expensive acute care.

**PUHELU vs the Finnish COPD Programme:**

Finland's 10-year national COPD Programme (1998–2007) achieved a 39.7% reduction in hospitalisations through over 900 events for 25,000 healthcare workers across the country [(Kinnula et al. 2011)](https://pmc.ncbi.nlm.nih.gov/articles/PMC6549818/). It required a decade of institutional coordination. PUHELU targets the same objective — systematic screening leading to earlier diagnosis — but through a single technical integration into existing infrastructure. The implementation timeline is months, not years. The cost is a software integration, not a national programme.

**For AstraZeneca:**
- AstraZeneca's Respiratory & Immunology division generated **USD 7.9 billion** in FY 2024 (+23% YoY) [(AstraZeneca FY2024)](https://www.astrazeneca.com/content/dam/az/PDF/2024/full-year/Full-year-and-Q4-2024-results-announcement.pdf)
- Breztri Aerosphere (COPD triple therapy): **USD 978 million** in revenue, growing 37% year-on-year
- Finnish medication costs for COPD already reached EUR 23.3 million in 2006 and are rising [(Herse et al. 2015)](https://www.nature.com/articles/npjpcrm201515)
- Every undiagnosed COPD patient identified by PUHELU is a potential candidate for guideline-directed pharmacotherapy
- In the Helsinki pilot alone, identifying even a fraction of the estimated 50,000 undiagnosed patients represents a meaningful expansion of the treatable population

**For healthcare systems:**
- PUHELU's operating cost per patient screened is effectively zero (SMS link + digital form)
- Follow-up spirometry costs ~EUR 110 per test — against potential lifetime savings of EUR 14,500–29,000 per early diagnosis
- Proven precedent: Finland's own COPD Programme achieved comparable outcomes over 10 years. PUHELU achieves this through a single integration, deployable in months
