import { Link } from 'react-router-dom';
import { ArrowRight, ArrowUpRight } from 'lucide-react';
import { PuheluLogo } from '../components/PuheluLogo';
import {
  INVESTMENT, FUNNEL, RETURNS, EPI, CITATIONS, eurFmt,
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

export function LandingPage() {
  return (
    <div className="min-h-[100dvh] flex flex-col bg-background text-foreground">

      {/* Hero */}
      <section className="pt-20 md:pt-28 pb-16 md:pb-20 px-6 md:px-8 relative">
        <div className="hero-breath" aria-hidden="true" />
        <div className="mx-auto max-w-[720px] text-center relative z-10">
          <div className="flex items-center justify-center gap-3 mb-8">
            <PuheluLogo size={52} />
            <span className="text-2xl md:text-3xl font-bold tracking-tight" style={{ fontFamily: "'Poppins', sans-serif" }}>
              PUHELU
            </span>
          </div>
          <h1 className="mb-6 text-4xl md:text-5xl lg:text-[3.5rem] leading-[1.1] tracking-tight">
            Passive COPD screening{' '}
            <br className="hidden sm:block" />
            through primary care SMS.
          </h1>
          <p className="mb-10 text-lg md:text-xl text-muted-foreground max-w-[540px] mx-auto leading-relaxed">
            Embeds validated screening into the appointment confirmation patients already receive. No hardware, no training, no workflow changes.
          </p>
          <Link
            to="/demo"
            className="inline-flex items-center justify-center px-8 py-4 text-lg font-semibold rounded-xl text-primary-foreground bg-primary hover:bg-primary/90 transition-all shadow-md hover:shadow-lg hover:-translate-y-0.5"
          >
            Try the Demo
            <ArrowRight className="ml-2 h-5 w-5" />
          </Link>
        </div>
      </section>

      {/* Business Case Preview */}
      <section className="py-20 px-6 md:px-8">
        <div className="mx-auto max-w-5xl">
          <p className="text-sm font-medium text-muted-foreground uppercase tracking-wider mb-6">
            The problem
          </p>
          <h2 className="text-2xl md:text-3xl tracking-tight font-bold mb-4 max-w-[600px]">
            {EPI.undiagnosedHelsinki.toLocaleString()} people in Helsinki have COPD and don't know it.
          </h2>
          <p className="text-muted-foreground leading-relaxed mb-12 max-w-[540px]">
            They'll find out in an emergency room. By then, treatment is expensive, outcomes are worse, and years of manageable disease have been lost. The diagnostic tools exist — what's missing is a reason to use them before symptoms become a crisis.
          </p>

          {/* Three numbers */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 mb-12">
            <div>
              <span className="text-4xl font-black leading-none">
                {EPI.undiagnosedHelsinki.toLocaleString()}
              </span>
              <p className="text-sm text-muted-foreground mt-2">
                people in Helsinki living with undiagnosed COPD — half of all cases
              </p>
              <Cite src={CITATIONS.kotaniemi} />
            </div>
            <div>
              <span className="text-4xl font-black leading-none">
                ~{FUNNEL.newDiagnoses.base}
              </span>
              <p className="text-sm text-muted-foreground mt-2">
                of them could be found each year through PUHELU — before their first hospitalisation
              </p>
              <span className="text-xs text-muted-foreground/60">PUHELU financial model, base case</span>
            </div>
            <div>
              <span className="text-4xl font-black leading-none">
                {eurFmt(RETURNS.netReturn5yr)}
              </span>
              <p className="text-sm text-muted-foreground mt-2">
                net savings over 5 years — fewer hospital stays, fewer emergency visits, and patients who stay in milder disease stages because they were caught early. From a {eurFmt(INVESTMENT.total.base)} investment that pays back in {RETURNS.paybackMonths} months.
              </p>
            </div>
          </div>

          {/* How it works — brief */}
          <div className="bg-white rounded-xl border border-muted p-6 md:p-8 mb-6">
            <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-4">How it works</p>
            <div className="grid sm:grid-cols-4 gap-4">
              {[
                'Patient gets their normal appointment SMS — with a short health form linked',
                'Smokers are routed to COPD-specific questions and a brief voice recording',
                'Responses are scored transparently — each factor visible, no black box',
                'When the score is high, a flag appears in the doctor\'s existing screen',
              ].map((step, i) => (
                <div key={i} className="flex gap-3 sm:flex-col sm:gap-2">
                  <div className="flex-shrink-0 flex items-center justify-center w-7 h-7 rounded-full bg-primary text-primary-foreground font-bold text-xs">
                    {i + 1}
                  </div>
                  <p className="text-sm text-muted-foreground leading-snug">{step}</p>
                </div>
              ))}
            </div>
          </div>

          <p className="text-sm text-muted-foreground border-l-2 border-primary/30 pl-5 leading-relaxed mb-6">
            No new hardware. No software to install. No physician training. No extra appointments. The screening happens before the patient walks in — at zero cost per person screened.
          </p>

          <Link
            to="/business-case"
            className="inline-flex items-center gap-1.5 text-sm font-medium text-foreground hover:text-primary transition-colors group"
          >
            Read the full business case and financial model
            <ArrowUpRight className="h-4 w-4 opacity-0 group-hover:opacity-100 transition-opacity" />
          </Link>
        </div>
      </section>

      {/* Stakeholder Mapping — placeholder */}
      <section className="py-20 px-6 md:px-8">
        <div className="mx-auto max-w-5xl">
          <p className="text-sm font-medium text-muted-foreground uppercase tracking-wider mb-6">
            Stakeholders
          </p>
          <div className="rounded-xl border border-muted bg-muted/20 p-8 md:p-12 min-h-[300px] flex items-center justify-center">
            <p className="text-muted-foreground/60 text-sm">Stakeholder mapping — content pending</p>
          </div>
        </div>
      </section>

      {/* Timeline & Outlook */}
      <section className="py-20 px-6 md:px-8">
        <div className="mx-auto max-w-5xl">
          <p className="text-sm font-medium text-muted-foreground uppercase tracking-wider mb-6">
            Outlook
          </p>
          <h2 className="text-2xl md:text-3xl tracking-tight font-bold mb-4 max-w-[540px]">
            One-year timeline: from pilot to national scale
          </h2>
          <p className="text-muted-foreground mb-10 max-w-[540px] leading-relaxed">
            A single EHR integration in Helsinki, validated over 12 months, creates the pattern for all 21 wellbeing services counties.
            National rollout adds {eurFmt(INVESTMENT.nationalRollout.low)}–{eurFmt(INVESTMENT.nationalRollout.high)} for 3 additional EHR platforms.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                quarter: 'Q1',
                title: 'Integration & validation',
                items: ['Apotti FHIR R4 integration', 'Clinical validation study', 'Ethics & privacy review (DPIA)'],
              },
              {
                quarter: 'Q2',
                title: 'Helsinki pilot launch',
                items: ['Deploy to 2–3 pilot clinics', 'Monitor completion & click-through rates', 'Physician feedback loop'],
              },
              {
                quarter: 'Q3',
                title: 'Optimise & measure',
                items: ['A/B test SMS wording & form UX', 'Track spirometry referral rates', 'Interim cost-effectiveness report'],
              },
              {
                quarter: 'Q4',
                title: 'Scale preparation',
                items: ['Publish pilot results', 'Lifecare / OMNI360 integration spec', 'National rollout proposal'],
              },
            ].map((phase) => (
              <div key={phase.quarter} className="rounded-xl border border-muted bg-white p-5">
                <div className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-primary text-primary-foreground font-bold text-sm mb-3">
                  {phase.quarter}
                </div>
                <h3 className="font-bold mb-3 text-sm">{phase.title}</h3>
                <ul className="space-y-1.5">
                  {phase.items.map((item) => (
                    <li key={item} className="text-xs text-muted-foreground flex items-start gap-2">
                      <span className="select-none">–</span>{item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="mt-auto py-8 px-6 md:px-8 border-t border-muted">
        <div className="mx-auto max-w-5xl flex flex-col sm:flex-row justify-between items-center gap-6">
          <div className="flex items-center gap-3">
            <PuheluLogo size={28} />
            <p className="text-sm text-muted-foreground">
              &copy; {new Date().getFullYear()} PUHELU
            </p>
          </div>
          <div className="flex items-center gap-3">
            <img src="/dash-logo.png" alt="DASH Sprint" className="h-6 w-6 opacity-60" />
            <p className="text-sm text-muted-foreground">
              NHG &times; AstraZeneca &mdash; DASH Sprint 2026
            </p>
          </div>
        </div>
      </footer>

    </div>
  );
}
