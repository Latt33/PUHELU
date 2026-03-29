import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import {
  INVESTMENT, FUNNEL, COST_EFFECTIVENESS, RETURNS,
  HOSPITALISATION, LIFETIME, EPI, PRECEDENT,
  SENSITIVITY, CITATIONS, eurFmt, pctFmt,
} from '../data/model';

function Cite({ src }: { src: { label: string; url: string } }) {
  return (
    <a
      href={src.url}
      target="_blank"
      rel="noopener noreferrer"
      className="text-xs text-muted-foreground/60 underline decoration-dotted underline-offset-2 hover:text-muted-foreground transition-colors"
    >
      {src.label}
    </a>
  );
}

export function BusinessCasePage() {
  return (
    <div className="min-h-[100dvh] bg-background text-foreground py-12 px-6 md:px-8">
      <article className="mx-auto max-w-[720px] relative">
        <Link
          to="/"
          className="inline-flex items-center text-sm font-medium text-muted-foreground hover:text-foreground transition-colors mb-10"
        >
          <ArrowLeft className="mr-1 h-4 w-4" />
          Back
        </Link>

        <h1 className="text-3xl md:text-4xl lg:text-5xl leading-[1.1] tracking-tight mb-6">
          Business Case
        </h1>
        <p className="text-lg text-muted-foreground mb-12 max-w-[540px] leading-relaxed">
          Why passive COPD screening through existing primary care infrastructure can reduce hospitalisations and save millions annually.
        </p>

        {/* Investment Summary */}
        <section className="mb-16">
          <h2 className="text-2xl tracking-tight font-bold mb-6">Investment summary</h2>

          {/* Base case headline */}
          <div className="bg-white rounded-xl border border-muted p-6 mb-4">
            <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-4">Base case — Helsinki pilot</p>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-6">
              <div>
                <span className="text-2xl font-black leading-none">{eurFmt(INVESTMENT.total.base)}</span>
                <p className="text-xs text-muted-foreground mt-1">total investment</p>
              </div>
              <div>
                <span className="text-2xl font-black leading-none">~{FUNNEL.newDiagnoses.base}</span>
                <p className="text-xs text-muted-foreground mt-1">new diagnoses / yr</p>
              </div>
              <div>
                <span className="text-2xl font-black leading-none">{eurFmt(COST_EFFECTIVENESS.costPerQALY.base)}</span>
                <p className="text-xs text-muted-foreground mt-1">per QALY</p>
              </div>
              <div>
                <span className="text-2xl font-black leading-none">{RETURNS.roi5yr.base}×</span>
                <p className="text-xs text-muted-foreground mt-1">5-year ROI</p>
              </div>
            </div>
            <p className="text-sm text-muted-foreground mt-5 pt-4 border-t border-muted/50">
              Payback in ~{RETURNS.paybackMonths} months. 5-year net return: {eurFmt(RETURNS.netReturn5yr)}.
            </p>
          </div>

          {/* Range context */}
          <div className="grid grid-cols-2 gap-4 mb-6">
            <div className="rounded-lg border border-muted bg-white p-4">
              <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-2">If adoption is low</p>
              <p className="text-lg font-black leading-none mb-1">~{FUNNEL.newDiagnoses.pessimistic} diagnoses/yr</p>
              <p className="text-xs text-muted-foreground">
                {eurFmt(COST_EFFECTIVENESS.costPerQALY.pessimistic)}/QALY — still below the {eurFmt(COST_EFFECTIVENESS.qalyThresholdFinland)} Finnish threshold.
                Doesn't break even in 5 years in Helsinki alone, but justified on health-economic grounds.
              </p>
            </div>
            <div className="rounded-lg border border-muted bg-white p-4">
              <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-2">If adoption is high</p>
              <p className="text-lg font-black leading-none mb-1">~{FUNNEL.newDiagnoses.optimistic.toLocaleString()} diagnoses/yr</p>
              <p className="text-xs text-muted-foreground">
                {eurFmt(COST_EFFECTIVENESS.costPerQALY.optimistic)}/QALY &middot; {RETURNS.roi5yr.optimistic}× ROI &middot; payback in ~7 months.
                Among the most cost-effective screening interventions in Finnish healthcare.
              </p>
            </div>
          </div>

          <p className="text-sm text-muted-foreground border-l-2 border-primary/30 pl-5 leading-relaxed">
            The variance is driven by adoption rates (form click-through, physician engagement) — not by cost inputs.
            Every euro spent on UX and clinical change management returns 10–50× more than a euro spent on better algorithms.
          </p>
        </section>

        {/* The Gap */}
        <section className="mb-16">
          <h2 className="text-2xl tracking-tight font-bold mb-6">The underdiagnosis gap</h2>
          <div className="space-y-4 text-muted-foreground leading-relaxed">
            <p>
              COPD prevalence in Finland is ~{pctFmt(EPI.copdPrevalenceFinland, 0)} of the adult population — roughly 330,000 individuals.
              Of these, only 25,000–50,000 are actively treated. A population study found that{' '}
              <strong className="text-foreground">{pctFmt(EPI.undiagnosedRate, 0)} of individuals with spirometry-confirmed obstruction had no prior diagnosis</strong>.
              In Helsinki alone, that's an estimated ~{EPI.undiagnosedHelsinki.toLocaleString()} people. <Cite src={CITATIONS.kotaniemi} />
            </p>
            <p>
              The diagnostic capability exists — spirometry works. The issue is that primary care consultations are time-constrained and focused on the presenting complaint. COPD surfaces only at acute exacerbation.
            </p>
          </div>

          <div className="mt-8 bg-white rounded-xl border border-muted p-6">
            <h3 className="text-sm font-bold uppercase tracking-wider text-muted-foreground mb-4">National burden</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li className="flex items-start gap-2"><span className="select-none">–</span>Total annual COPD costs: <strong className="text-foreground">{eurFmt(EPI.totalCOPDCostAnnual)}</strong></li>
              <li className="flex items-start gap-2"><span className="select-none">–</span>Hospitalisations alone: <strong className="text-foreground">{eurFmt(HOSPITALISATION.nationalAnnualCost)}</strong> (2006), est. {eurFmt(HOSPITALISATION.inflationAdjusted2026)} inflation-adjusted</li>
              <li className="flex items-start gap-2"><span className="select-none">–</span>Projected total by 2030: <strong className="text-foreground">{eurFmt(EPI.projectedCost2030)}</strong> — a 60% increase</li>
            </ul>
            <p className="text-xs text-muted-foreground/60 mt-3"><Cite src={CITATIONS.herse} /></p>
          </div>

          <div className="mt-6 bg-primary/5 rounded-xl border border-primary/10 p-6">
            <h3 className="text-sm font-bold uppercase tracking-wider text-primary mb-2">Precedent</h3>
            <p className="text-sm text-muted-foreground">
              Finland's 10-year COPD Programme (1998–2007) reduced hospitalisations by{' '}
              <strong className="text-foreground">{pctFmt(PRECEDENT.copdProgrammeReduction)}</strong> with costs{' '}
              <strong className="text-foreground">{pctFmt(PRECEDENT.costsBelowProjection, 0)} lower than projected</strong>.
              It required 900+ events for 25,000 healthcare workers. PUHELU targets the same outcome through a single software integration. <Cite src={CITATIONS.kinnula} />
            </p>
          </div>
        </section>

        {/* What */}
        <section className="mb-16">
          <h2 className="text-2xl tracking-tight font-bold mb-6">What PUHELU does</h2>
          <p className="text-muted-foreground leading-relaxed mb-6">
            Embeds COPD screening into the appointment confirmation SMS. 24h before the visit, the standard SMS includes a link to a short form.
            It branches into COPD-specific questions for patients with smoking history, concluding with a brief vocalization task.
            When the threshold is exceeded, a flag appears in the physician's existing EHR view.
          </p>
          <div className="bg-white rounded-xl border border-muted p-6">
            <h3 className="text-sm font-bold uppercase tracking-wider text-muted-foreground mb-4">What it does not require</h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              {['No new hardware', 'No dedicated software', 'No physician training', 'No workflow changes', 'No additional clinical time', 'Zero cost per screen'].map((item) => (
                <div key={item} className="text-sm text-muted-foreground bg-muted/30 rounded-lg px-3 py-2 text-center">
                  {item}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Screening Funnel */}
        <section className="mb-16">
          <h2 className="text-2xl tracking-tight font-bold mb-6">Screening funnel</h2>
          <p className="text-muted-foreground leading-relaxed mb-6">
            Helsinki records ~{(FUNNEL.eligibleVisits).toLocaleString()} primary care visits/year from patients with smoking exposure,
            representing ~{(FUNNEL.uniquePatients).toLocaleString()} unique patients. The model is most sensitive to form click-through rates and physician engagement — not technology or cost inputs.
          </p>
          <div className="bg-white rounded-xl border border-muted p-6">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-muted">
                    <th className="text-left py-2 pr-4 font-medium"></th>
                    <th className="text-right py-2 px-4 font-medium">Pessimistic</th>
                    <th className="text-right py-2 px-4 font-medium">Base</th>
                    <th className="text-right py-2 pl-4 font-medium">Optimistic</th>
                  </tr>
                </thead>
                <tbody className="text-muted-foreground">
                  <tr className="border-b border-muted/50">
                    <td className="py-2 pr-4">Patients screened (Year 1)</td>
                    <td className="text-right py-2 px-4">{FUNNEL.patientsScreened.pessimistic.toLocaleString()}</td>
                    <td className="text-right py-2 px-4 text-foreground font-medium">{FUNNEL.patientsScreened.base.toLocaleString()}</td>
                    <td className="text-right py-2 pl-4">{FUNNEL.patientsScreened.optimistic.toLocaleString()}</td>
                  </tr>
                  <tr className="border-b border-muted/50">
                    <td className="py-2 pr-4">New diagnoses (Year 1)</td>
                    <td className="text-right py-2 px-4">~{FUNNEL.newDiagnoses.pessimistic}</td>
                    <td className="text-right py-2 px-4 text-foreground font-medium">~{FUNNEL.newDiagnoses.base}</td>
                    <td className="text-right py-2 pl-4">~{FUNNEL.newDiagnoses.optimistic.toLocaleString()}</td>
                  </tr>
                  <tr>
                    <td className="py-2 pr-4">Cumulative diagnoses (5-year)</td>
                    <td className="text-right py-2 px-4">{FUNNEL.cumulativeDiagnoses5yr.pessimistic}</td>
                    <td className="text-right py-2 px-4 text-foreground font-medium">{FUNNEL.cumulativeDiagnoses5yr.base.toLocaleString()}</td>
                    <td className="text-right py-2 pl-4">{FUNNEL.cumulativeDiagnoses5yr.optimistic.toLocaleString()}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
          <p className="text-xs text-muted-foreground/60 mt-3">
            Break-even requires just {SENSITIVITY.breakEvenScreeningRate.toLocaleString()} patients screened/year ({pctFmt(SENSITIVITY.breakEvenClickThrough, 0)} click-through) and {pctFmt(SENSITIVITY.breakEvenPhysicianEngagement, 0)} physician engagement.
          </p>
        </section>

        {/* Returns */}
        <section className="mb-16">
          <h2 className="text-2xl tracking-tight font-bold mb-6">5-year returns</h2>
          <div className="grid sm:grid-cols-3 gap-4 mb-6">
            <div className="bg-white rounded-xl border border-muted p-5 text-center">
              <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-2">Total savings</p>
              <p className="text-2xl font-black">{eurFmt(RETURNS.totalSavings5yr)}</p>
            </div>
            <div className="bg-white rounded-xl border border-muted p-5 text-center">
              <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-2">Net return</p>
              <p className="text-2xl font-black">{eurFmt(RETURNS.netReturn5yr)}</p>
            </div>
            <div className="bg-white rounded-xl border border-muted p-5 text-center">
              <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-2">ROI (base)</p>
              <p className="text-2xl font-black">{RETURNS.roi5yr.base}×</p>
            </div>
          </div>
          <div className="bg-primary/5 rounded-xl border border-primary/10 p-6">
            <h3 className="text-sm font-bold uppercase tracking-wider text-primary mb-2">Lifetime value of early diagnosis</h3>
            <p className="text-sm text-muted-foreground leading-relaxed">
              The cost difference between non-severe and severe eosinophilic COPD is ~{eurFmt(LIFETIME.costDeltaPerYear)}/patient/year.
              With a {pctFmt(LIFETIME.progressionProbability, 0)} probability of progression over {LIFETIME.avgRemainingYears} years,
              each early diagnosis avoids <strong className="text-foreground">{eurFmt(LIFETIME.avoidancePerPatient)}</strong> in excess costs.
              Base-case 5-year present value: <strong className="text-foreground">{eurFmt(LIFETIME.base5yrDiscounted)}</strong>. <Cite src={CITATIONS.laruSompa} />
            </p>
          </div>
        </section>

        {/* Medication economics */}
        <section className="mb-16">
          <h2 className="text-2xl tracking-tight font-bold mb-6">Medication economics</h2>
          <p className="text-muted-foreground leading-relaxed mb-4">
            Every undiagnosed COPD patient identified through screening is a candidate for guideline-directed pharmacotherapy.
            Finnish COPD medication costs reached <strong className="text-foreground">€23.3 million</strong> in 2006 and are rising. <Cite src={CITATIONS.herse} />
          </p>
          <ul className="space-y-3 text-sm text-muted-foreground">
            <li className="flex items-start gap-2">
              <span className="select-none">–</span>
              Average annual medication cost per treated COPD patient: <strong className="text-foreground">€600–1,500</strong>
            </li>
            <li className="flex items-start gap-2">
              <span className="select-none">–</span>
              Base-case new patients on treatment (5yr, Helsinki): <strong className="text-foreground">{FUNNEL.cumulativeDiagnoses5yr.base.toLocaleString()}</strong>
            </li>
            <li className="flex items-start gap-2">
              <span className="select-none">–</span>
              National scale (5×): an additional <strong className="text-foreground">~{(FUNNEL.cumulativeDiagnoses5yr.base * 5).toLocaleString()}</strong> treatable patients over 5 years
            </li>
          </ul>
        </section>

        {/* Cost of inaction */}
        <section className="mb-16">
          <h2 className="text-2xl tracking-tight font-bold mb-6">The cost of doing nothing</h2>
          <p className="text-muted-foreground leading-relaxed mb-4">
            Finland's total COPD cost burden is {eurFmt(EPI.totalCOPDCostAnnual)}/year, projected to reach{' '}
            <strong className="text-foreground">{eurFmt(EPI.projectedCost2030)} by 2030</strong>. Without systematic early detection:
            late diagnosis, emergency presentation, expensive acute care.
          </p>
          <p className="text-sm text-muted-foreground border-l-2 border-primary/30 pl-5 leading-relaxed">
            Finland's COPD Programme achieved {pctFmt(PRECEDENT.copdProgrammeReduction)} through a decade of institutional coordination.
            PUHELU targets the same through a single software integration, deployable in months at orders of magnitude lower cost.
          </p>
        </section>

        <div className="pt-8 border-t border-muted">
          <Link
            to="/"
            className="inline-flex items-center text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
          >
            <ArrowLeft className="mr-1 h-4 w-4" />
            Back to overview
          </Link>
        </div>
      </article>
    </div>
  );
}
