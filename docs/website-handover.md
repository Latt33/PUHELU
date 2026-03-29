# Website Session Handover

## Page Structure (agreed)

```
1. HERO — tagline + demo button (compact)
2. HOW IT WORKS — horizontal 4-step strip (transition element between hero and content)
   SMS → Questionnaire → Analysis → Flag in EHR
3. BUSINESS CASE — outcome-oriented, visual, interactive
4. STAKEHOLDER MAP — one slide (content TBD, Miska provides)
5. TIMELINE + OUTLOOK — 1-year pilot plan + national scalability (Sophia provides)
6. FOOTER
```

## Business Case Section — Framing Direction

**Lead with outcomes, not the disease burden.** The audience knows COPD is expensive. They need to know what PUHELU delivers and what it costs.

### Headline framing
> **640 new COPD diagnoses in Year 1. €200k to build. Pays for itself in 18 months.**
>
> PUHELU screens patients through the appointment SMS they already receive. No hardware, no training, no workflow changes. The doctor sees a flag — or doesn't. That's it.

### Stat cards — show PUHELU's outcomes, not COPD's cost

**Recommended stats (from audited financial model):**

| Stat | Label | Why it sells |
|---|---|---|
| **640** | new diagnoses Year 1 | Tangible immediate output |
| **18 mo** | payback period | Low risk, fast recovery |
| **€550** | cost per QALY | 60× below Finland's threshold |

Or money-led variant:

| Stat | Label | Why it sells |
|---|---|---|
| **€0** | cost per screen | Zero marginal cost |
| **4× ROI** | 5-year return | Every euro returns four |
| **18 mo** | payback | Fast recovery |

The old stats (49% undiagnosed, €29M hospitalisations, 39.7% programme reduction) become small supporting context underneath — not the headline.

### Visual approach
- Embed the two-panel pharma/county summary from the financial model (interactive, slider-driven)
- Or: simplified static version with a "Explore the full model →" link
- Show things visually: charts, payback curves, funnel — not text blocks with numbers

### Numbers source
All numbers come from `docs/financial-model.html` (audited interactive model). The old `docs/business-case.md` has pre-audit numbers that don't match — **do not use those figures without cross-checking against the model.**

Key differences from pre-audit:
- Screening volume is ~2.4× higher (multi-touch compound probability)
- Per-patient savings are lower (adherence discount, severity ramp, no double-counting)
- All values are now present-value (3.5% discount rate)
- Terminal value is calculated (growing perpetuity)

### How It Works strip
Keep the 4-step flow but make it horizontal, full-width, serving as a visual divider between hero and business case:
1. SMS with pre-appointment link
2. Adaptive questionnaire (branches for smokers)
3. Vocal biomarker capture
4. Flag in the EHR

### What NOT to do
- Don't mix the business case (impact/ROI) with the timeline (implementation plan) — they're separate sections
- Don't show the full financial model on the main page — link to it
- Don't lead with the problem (COPD burden) — lead with the solution (what PUHELU delivers)
- Don't use pre-audit numbers from business-case.md without verifying against the model
