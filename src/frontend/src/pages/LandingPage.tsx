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
            Nothing to buy, nothing to learn, nothing to change. Doctors keep doing what they already do — they just see a flag when a patient needs a closer look. The screening happens before anyone walks through the door.
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

      {/* Roadmap */}
      <section className="py-20 px-6 md:px-8">
        <div className="mx-auto max-w-5xl">
          <h2 className="text-3xl md:text-4xl tracking-tight font-bold mb-8">Roadmap</h2>

          {/* Subtitle bar */}
          <div className="bg-foreground/5 border border-muted rounded-lg px-5 py-3 mb-4">
            <p className="text-sm font-medium text-center">The path to an increase diagnosis of COPD in Finland</p>
          </div>

          {/* Chevron phase bar */}
          <div className="grid grid-cols-4 mb-1 overflow-hidden rounded-lg">
            {[
              { label: 'Pilot Study', last: false },
              { label: 'Technology and geography scaling', last: false },
              { label: 'PUHELU as a Self-Assessment Tool', last: false },
              { label: 'Outlook', last: true },
            ].map((phase, i) => (
              <div
                key={phase.label}
                className="relative bg-[#1a6b7a] text-white text-xs font-bold px-3 py-2.5 text-center flex items-center justify-center min-h-[44px]"
                style={phase.last ? { background: '#1a6b7a', opacity: 0.75 } : undefined}
              >
                <span className="relative z-10 leading-tight">{phase.label}</span>
                {!phase.last && (
                  <div className="absolute right-0 top-0 bottom-0 w-4 z-20 flex items-center">
                    <svg viewBox="0 0 16 44" className="h-full w-4" preserveAspectRatio="none">
                      <polygon points="0,0 16,22 0,44" fill="var(--background)" />
                    </svg>
                  </div>
                )}
                {i > 0 && (
                  <div className="absolute left-0 top-0 bottom-0 w-4 z-20 flex items-center">
                    <svg viewBox="0 0 16 44" className="h-full w-4" preserveAspectRatio="none">
                      <polygon points="0,0 16,22 0,44" fill="#1a6b7a" />
                    </svg>
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Year labels */}
          <div className="grid grid-cols-4 gap-0 mb-6">
            <div className="border border-muted rounded-sm px-3 py-1.5 mr-1">
              <span className="text-xs font-medium">Year 2027</span>
            </div>
            <div className="border border-muted rounded-sm px-3 py-1.5 mx-0.5">
              <span className="text-xs font-medium">Year 2028</span>
            </div>
            <div className="border border-muted rounded-sm px-3 py-1.5 mx-0.5">
              <span className="text-xs font-medium">Year 2029</span>
            </div>
            <div className="border border-dashed border-muted-foreground/40 rounded-sm px-3 py-1.5 ml-1">
              <span className="text-xs font-medium">Year 2030–2035</span>
            </div>
          </div>

          {/* Phase content */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 md:gap-6">

            {/* Year 2027 — Pilot Study */}
            <div className="text-sm">
              <p className="font-bold mb-3">Goal: PUHELU Proof-of-Value</p>

              <p className="font-bold text-xs uppercase tracking-wider text-muted-foreground mb-2">Pre-Study</p>
              <ul className="space-y-1 mb-4 text-muted-foreground text-xs">
                <li className="flex items-start gap-1.5"><span>›</span>Stakeholder inclusion</li>
                <li className="flex items-start gap-1.5 pl-3"><span>›</span>FILHA pulmonologist</li>
                <li className="flex items-start gap-1.5"><span>›</span>Communication of goals and scope of project</li>
              </ul>

              <ul className="space-y-1 mb-4 text-muted-foreground text-xs">
                <li className="flex items-start gap-1.5"><span>›</span>Study conceptualization</li>
                <li className="flex items-start gap-1.5 pl-3">1. Electronic form</li>
                <li className="flex items-start gap-1.5 pl-6">› CAT questionnaire</li>
                <li className="flex items-start gap-1.5 pl-6">› Vocalization</li>
                <li className="flex items-start gap-1.5 pl-3">2. Data model for voice analysis</li>
                <li className="flex items-start gap-1.5 pl-3">3. Indication of treatment</li>
              </ul>

              <ul className="space-y-1 mb-4 text-muted-foreground text-xs">
                <li className="flex items-start gap-1.5"><span>›</span>Ethics board review &amp; approval</li>
              </ul>

              <p className="font-bold text-xs uppercase tracking-wider text-muted-foreground mb-2">Pilot Kick-Off</p>
              <ul className="space-y-1 mb-4 text-muted-foreground text-xs">
                <li className="flex items-start gap-1.5"><span>›</span>Study rollout in pilot hospital</li>
                <li className="flex items-start gap-1.5 pl-3">› Implementation of electronic form in the booking confirmation</li>
                <li className="flex items-start gap-1.5 pl-3">› Deployment</li>
              </ul>

              <p className="font-bold text-xs uppercase tracking-wider text-muted-foreground mb-2">Impact evaluation of pilot study on COPD</p>
              <ul className="space-y-1 text-muted-foreground text-xs">
                <li className="flex items-start gap-1.5"><span>›</span>Evaluate increase in diagnosis</li>
                <li className="flex items-start gap-1.5"><span>›</span>Assess impact on healthcare costs, ROI</li>
                <li className="flex items-start gap-1.5"><span>›</span>Projection on national expansion</li>
              </ul>
            </div>

            {/* Year 2028 — Technology and geography scaling */}
            <div className="text-sm">
              <p className="font-bold mb-3">Goal: improve assessment accuracy to increase COPD diagnosis</p>

              <p className="font-bold text-xs uppercase tracking-wider text-muted-foreground mb-2">Data source expansion</p>
              <ul className="space-y-1 mb-4 text-muted-foreground text-xs">
                <li className="flex items-start gap-1.5"><span>›</span>Personal Kanta data inclusion to improve prediction model</li>
                <li className="flex items-start gap-1.5 pl-3">› Identify metrics like medical history, treatment &amp; medication</li>
                <li className="flex items-start gap-1.5 pl-3">› Map data stream, APIs and intersections</li>
                <li className="flex items-start gap-1.5"><span>›</span>Technical implementation</li>
                <li className="flex items-start gap-1.5 pl-3">› Kanta gateway</li>
                <li className="flex items-start gap-1.5 pl-3">› Model training</li>
                <li className="flex items-start gap-1.5 pl-3">› Model evaluation</li>
                <li className="flex items-start gap-1.5 pl-3">› Deployment</li>
              </ul>

              <p className="font-bold text-xs uppercase tracking-wider text-muted-foreground mb-2">National rollout of electronic form</p>
              <ul className="space-y-1 text-muted-foreground text-xs">
                <li className="flex items-start gap-1.5"><span>›</span>Expansion strategy on Finnish population</li>
                <li className="flex items-start gap-1.5"><span>›</span>Rollout per region</li>
              </ul>
            </div>

            {/* Year 2029 — Self-Assessment Tool */}
            <div className="text-sm">
              <p className="font-bold mb-3">Goal: target population that doesn't book doctor consultations</p>

              <p className="font-bold text-xs uppercase tracking-wider text-muted-foreground mb-2">Patient-centric tool</p>
              <ul className="space-y-1 text-muted-foreground text-xs">
                <li className="flex items-start gap-1.5"><span>›</span>Provide tool as self-assessment questionnaire for population with suspect of COPD</li>
                <li className="flex items-start gap-1.5"><span>›</span>Recommendation without diagnosis</li>
              </ul>
            </div>

            {/* Year 2030–2035 — Outlook */}
            <div className="text-sm">
              <p className="font-bold mb-3">
                Goal: use health data, incl. assessment questionnaires, to predict other diseases like neurological pathologies. By supporting doctors with excessive data handling in the first consultation, we aim to facilitate diagnosis and improve treatment outcomes
              </p>

              <p className="font-bold text-xs uppercase tracking-wider text-muted-foreground mb-2">Expansion onto other diseases</p>
              <ul className="space-y-1 text-muted-foreground text-xs">
                <li className="flex items-start gap-1.5"><span>›</span>Identify disease-specific questionnaires</li>
                <li className="flex items-start gap-1.5"><span>›</span>Identify risk-factors variables</li>
                <li className="flex items-start gap-1.5"><span>›</span>Train data analysis model</li>
                <li className="flex items-start gap-1.5"><span>›</span>Assess performance</li>
                <li className="flex items-start gap-1.5"><span>›</span>Rollout</li>
              </ul>
            </div>

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
