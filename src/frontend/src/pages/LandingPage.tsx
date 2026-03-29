import { Link } from 'react-router-dom';
import { ArrowRight, ArrowUpRight } from 'lucide-react';
import { PuheluLogo } from '../components/PuheluLogo';
import { CITATIONS } from '../data/model';


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
            Embeds validated screening into the appointment confirmation patients already receive.<br />No new hardware, no workflow changes.
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
            300,000+ people in Finland have COPD<br />and most don't know it.
          </h2>
          <p className="text-muted-foreground leading-relaxed mb-12">
            With a prevalence of 6% among the adult population, COPD is one of Finland's most underdiagnosed chronic diseases. Undiagnosed cases result in diminished quality of life and higher healthcare costs, driven by preventable hospitalizations and treatments at later stages. Despite the availability of diagnostic tools, many cases remain unidentified.
          </p>

          {/* Three numbers */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 mb-12">
            <div>
              <span className="text-4xl font-black leading-none">
                300,000+
              </span>
              <p className="text-sm text-muted-foreground mt-2">
                300,000+ cases, but a maximum of 50,000 actively treated
              </p>
              <Cite src={CITATIONS.kotaniemi} />
            </div>
            <div>
              <span className="text-4xl font-black leading-none">
                1,000+
              </span>
              <p className="text-sm text-muted-foreground mt-2">
                new diagnoses per year at national scale, before their first hospitalisation
              </p>
              <span className="text-xs text-muted-foreground/60">PUHELU financial model, base case</span>
            </div>
            <div>
              <span className="text-4xl font-black leading-none">
                €9M+
              </span>
              <p className="text-sm text-muted-foreground mt-2">
                estimated economic impact over 5 years, including reduced hospitalisations, lower treatment intensity, improved public health outcomes, and downstream effects on smoking cessation and disease management.
              </p>
            </div>
          </div>

          {/* How it works. brief */}
          <div className="bg-white rounded-xl border border-muted p-6 md:p-8 mb-6">
            <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-4">How it works</p>
            <div className="grid sm:grid-cols-4 gap-4">
              {[
                'Patient gets their normal appointment SMS, with a short health form linked',
                'Smokers are routed to COPD-specific questions and a brief voice recording',
                'Responses are scored transparently: each factor visible, no black box',
                'When the score is high, a flag appears in the doctor\'s existing patient information system',
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
            No additional doctors, no new systems to interact with. Doctors keep doing what they already do, with the flag as a preliminary supplement to their diagnostic process.
          </p>

          <div className="text-center">
            <a
              href="/financial-model.html"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center px-8 py-4 text-lg font-semibold rounded-xl text-primary-foreground bg-primary hover:bg-primary/90 transition-all shadow-md hover:shadow-lg hover:-translate-y-0.5"
            >
              See the Financial Model
              <ArrowUpRight className="ml-2 h-5 w-5" />
            </a>
          </div>
        </div>
      </section>

      {/* Stakeholder Map */}
      <section className="py-20 px-6 md:px-8">
        <div className="mx-auto max-w-5xl">
          <h2 className="text-3xl md:text-4xl tracking-tight font-bold mb-8 text-center">Stakeholder Map</h2>

          {/* Chevron bar. 4 phases */}
          <div className="grid grid-cols-4 mb-0 overflow-hidden rounded-t-lg">
            {['Patient', 'Doctor', 'Digital Systems', 'Secondary Layer'].map((label, i) => (
              <div
                key={label}
                className="relative text-white text-xs font-bold px-3 py-2.5 text-center flex items-center justify-center min-h-[44px]"
                style={{ background: 'var(--primary)', ...(i === 3 ? { opacity: 0.7 } : {}) }}
              >
                <span className="relative z-10 leading-tight">{label}</span>
                {i < 3 && (
                  <div className="absolute right-0 top-0 bottom-0 w-4 z-20 flex items-center">
                    <svg viewBox="0 0 16 44" className="h-full w-4" preserveAspectRatio="none">
                      <polygon points="0,0 16,22 0,44" fill="var(--background)" />
                    </svg>
                  </div>
                )}
                {i > 0 && (
                  <div className="absolute left-0 top-0 bottom-0 w-4 z-20 flex items-center">
                    <svg viewBox="0 0 16 44" className="h-full w-4" preserveAspectRatio="none">
                      <polygon points="0,0 16,22 0,44" fill="var(--primary)" />
                    </svg>
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Main layout: table (left 75%) + side boxes (right 25%) */}
          <div className="flex gap-0">
            {/* Left: 3-column table with row labels */}
            <div className="flex-1 min-w-0">
              <table className="w-full text-xs border-collapse">
                <tbody>
                  {([
                    {
                      label: 'Role', tinted: true,
                      patient: ['Completes form', 'Provides input data for flagging', 'Used for training data'],
                      doctor: ['Receives a flagged summary', 'Uses the tool as a supplement', 'Decides on a follow up'],
                      systems: ['Delivers form to patient', 'Processes voice and questionnaire', 'Sends output to doctor'],
                    },
                    {
                      label: 'Impacts', tinted: false,
                      patient: ['Earlier detection of COPD', 'Low effort screening', 'Reduced risk for late-stage illness and exacerbations'],
                      doctor: ['Better pre-appointment information', 'Faster identification of at-risk patients', 'Reduced missed diagnoses'],
                      systems: ['Enables scalable screening', 'Automates data collection'],
                    },
                    {
                      label: 'Risks', tinted: true,
                      patient: ['Privacy concerns', 'Lack of digital skills', 'Shame over lifestyle'],
                      doctor: ['Extra workload', 'Distrust of AI', 'Authority issues'],
                      systems: ['Data breaches', 'Complexity', 'Reliability'],
                    },
                    {
                      label: 'Mitigants', tinted: false,
                      patient: ['Clear communications on what the data is used for', 'Simple UI (Yes / No question)', 'No clear distinction for smokers'],
                      doctor: ['Integrated into existing workflows', 'Clear summary', 'Legitimisation by a pulmonologist'],
                      systems: ['Regulatory compliance', 'Cooperation with existing systems', 'Consulting service part of the service'],
                    },
                  ] as const).map((row) => (
                    <tr key={row.label} className={row.tinted ? 'bg-primary/5' : ''}>
                      <td className="py-3 pr-3 pl-1 font-bold text-foreground align-top border-b border-muted text-sm w-[90px]">
                        {row.label}
                      </td>
                      {[row.patient, row.doctor, row.systems].map((items, ci) => (
                        <td key={ci} className="py-3 px-3 align-top border-b border-muted">
                          <ul className="space-y-1">
                            {items.map((item) => (
                              <li key={item} className="text-muted-foreground flex items-start gap-1.5">
                                <span className="select-none mt-0.5">•</span>{item}
                              </li>
                            ))}
                          </ul>
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Right: stacked layer boxes */}
            <div className="w-[200px] flex-shrink-0 flex flex-col gap-4 pl-4 pt-2">
              <div className="rounded-lg border border-muted p-4">
                <p className="text-xs font-bold text-foreground mb-2">Operational Layer</p>
                <ul className="space-y-1 text-xs text-muted-foreground">
                  <li className="flex items-start gap-1.5"><span>›</span>Nurses</li>
                  <li className="flex items-start gap-1.5"><span>›</span>Organisations (hospitals, clinics)</li>
                  <li className="flex items-start gap-1.5"><span>›</span>Digital systems</li>
                </ul>
              </div>
              <div className="rounded-lg border border-primary/30 bg-primary/5 p-4">
                <p className="text-xs font-bold text-primary mb-2">Systemic Layer</p>
                <ul className="space-y-1 text-xs text-muted-foreground">
                  <li className="flex items-start gap-1.5"><span>›</span>Regulators</li>
                  <li className="flex items-start gap-1.5"><span>›</span>Reimbursers (Kela)</li>
                  <li className="flex items-start gap-1.5"><span>›</span>Society (public perception)</li>
                  <li className="flex items-start gap-1.5"><span>›</span>Pharma companies</li>
                </ul>
              </div>
            </div>
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
                className="relative text-white text-xs font-bold px-3 py-2.5 text-center flex items-center justify-center min-h-[44px]"
                style={{ background: 'var(--primary)', ...(phase.last ? { opacity: 0.7 } : {}) }}
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
                      <polygon points="0,0 16,22 0,44" fill="var(--primary)" />
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

            {/* Year 2027. Pilot Study */}
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

            {/* Year 2028. Technology and geography scaling */}
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

            {/* Year 2029. Self-Assessment Tool */}
            <div className="text-sm">
              <p className="font-bold mb-3">Goal: target population that doesn't book doctor consultations</p>

              <p className="font-bold text-xs uppercase tracking-wider text-muted-foreground mb-2">Patient-centric tool</p>
              <ul className="space-y-1 text-muted-foreground text-xs">
                <li className="flex items-start gap-1.5"><span>›</span>Provide tool as self-assessment questionnaire for population with suspect of COPD</li>
                <li className="flex items-start gap-1.5"><span>›</span>Recommendation without diagnosis</li>
              </ul>
            </div>

            {/* Year 2030–2035. Outlook */}
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

      {/* References */}
      <section className="py-16 px-6 md:px-8 border-t border-muted">
        <div className="mx-auto max-w-5xl">
          <h2 className="text-lg tracking-tight font-bold mb-6">References</h2>
          <ol className="list-decimal list-outside pl-5 space-y-3 text-xs text-muted-foreground leading-relaxed">
            <li>
              Kotaniemi, J.-T., Lundback, B., Nieminen, M. M., Sovijarvi, A. R. A., &amp; Laitinen, L. A. (2005). Increase of prevalence of symptoms of asthma but not of chronic bronchitis in Finland 1970&ndash;2000. <em>Respiratory Medicine</em>, 99(1), 5&ndash;13.{' '}
              <a href="https://www.tandfonline.com/doi/full/10.1080/15412550500218122" target="_blank" rel="noopener noreferrer" className="underline decoration-dotted underline-offset-2 hover:text-foreground transition-colors">doi:10.1080/15412550500218122</a>
            </li>
            <li>
              Laru-Sompa, R., Kankaanranta, H., &amp; Kupiainen, H. (2020). Costs of COPD in Finland: a systematic review. <em>International Journal of COPD</em>, 15, 2859&ndash;2871.{' '}
              <a href="https://pmc.ncbi.nlm.nih.gov/articles/PMC6818542/" target="_blank" rel="noopener noreferrer" className="underline decoration-dotted underline-offset-2 hover:text-foreground transition-colors">PMC6818542</a>
            </li>
            <li>
              Herse, F., Kiljander, T., &amp; Lehtimaki, L. (2015). Annual costs of chronic obstructive pulmonary disease in Finland during 1996&ndash;2006 and a prediction model for 2007&ndash;2030. <em>npj Primary Care Respiratory Medicine</em>, 25, 15015.{' '}
              <a href="https://www.nature.com/articles/npjpcrm201515" target="_blank" rel="noopener noreferrer" className="underline decoration-dotted underline-offset-2 hover:text-foreground transition-colors">doi:10.1038/npjpcrm.2015.15</a>
            </li>
            <li>
              Kinnula, V. L., Vasankari, T., Kontula, E., Sovijarvi, A., Saynajakangas, O., &amp; Pietinalho, A. (2011). The 10-year COPD programme in Finland: effects on quality of diagnosis, incidence, prevalence and mortality. <em>Primary Care Respiratory Journal</em>, 20(2), 178&ndash;183.{' '}
              <a href="https://pmc.ncbi.nlm.nih.gov/articles/PMC6549818/" target="_blank" rel="noopener noreferrer" className="underline decoration-dotted underline-offset-2 hover:text-foreground transition-colors">PMC6549818</a>
            </li>
            <li>
              THL (2024). Tobacco statistics. Finnish Institute for Health and Welfare.{' '}
              <a href="https://thl.fi/en/statistics-and-data/statistics-by-topic/alcohol-drugs-and-addiction/tobaccostatistics" target="_blank" rel="noopener noreferrer" className="underline decoration-dotted underline-offset-2 hover:text-foreground transition-colors">thl.fi</a>
            </li>
            <li>
              Statista (2024). Number of health or hospital care visits in Finland.{' '}
              <a href="https://www.statista.com/statistics/1538504/number-of-health-or-hospital-care-visits-in-finland/" target="_blank" rel="noopener noreferrer" className="underline decoration-dotted underline-offset-2 hover:text-foreground transition-colors">statista.com</a>
            </li>
          </ol>
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
