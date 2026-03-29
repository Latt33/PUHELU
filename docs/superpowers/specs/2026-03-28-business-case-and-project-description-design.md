# PUHELU — Business Case & Pilot Project Description

## Content Spec for Hackathon Pitch Website

**Context:** IDBM x DASH Sprint '26 (Aalto University). Sponsors: Nordic Healthcare Group, AstraZeneca. Challenge: make guideline-directed COPD care escalation the default in Finland.

**Audience:** Judges, NHG reps, AstraZeneca reps (business/pharma professionals).

**Format:** Two complementary content sections for a multi-page pitch website. Content-first — website implementation is a separate step.

**Key split:** Business Case sells the problem and opportunity (strategic). Pilot Project Description shows what you'd be investing in and how it works (operational). No overlap — the 4-step process, integration details, and technical specifics live only in the project description.

---

## Section 1: Business Case

Structure: WHY → OPPORTUNITY → VALUE → ALIGNMENT. Purely strategic — no process details, no technical architecture.

### WHY — The Underdiagnosis Crisis

- COPD affects an estimated 6% of Finland's population (~330,000 people)
- Only 25,000–50,000 are actively treated according to prescription data
- 75–90% of COPD cases go undiagnosed
- The problem is not diagnostic capability — spirometry exists and works
- The problem is structural: primary care physicians have limited time per patient, focus on the presenting complaint, and have no systematic trigger to screen for COPD
- The current system waits for COPD to announce itself through crisis — emergency exacerbations and hospitalizations that are preventable with earlier intervention

### THE OPPORTUNITY — A Touchpoint That Already Exists

- Every patient who books a primary care appointment already receives a confirmation message
- This is the most underutilized moment in the patient journey — a direct channel to the patient, before they see the doctor, that currently carries no clinical value
- PUHELU turns this existing touchpoint into a passive screening mechanism
- No new infrastructure. No new workflows. No behavioral change from patients or physicians
- The insight: you don't need to create a screening program — you need to embed screening into what already happens

### VALUE — The Economics of Early Detection

**Cost of inaction:**
- Undiagnosed COPD patients accumulate in the system until they present with acute exacerbations
- Emergency hospitalizations for COPD exacerbations are among the most expensive episodes in respiratory care
- Late-stage COPD management costs multiples of early-stage treatment

**Value of early detection:**
- Early diagnosis enables guideline-directed treatment before the disease progresses
- Fewer emergency visits, fewer hospitalizations, fewer ICU admissions
- Better quality of life for patients — years of managed care vs. sudden crisis
- Systematic screening at population scale through existing primary care infrastructure

**Scalability:**
- Finland's public healthcare EHR systems all support HL7 FHIR R4 — a single integration pattern works across all 21 wellbeing services counties
- Once proven in one region, PUHELU can scale nationally without rebuilding

### ALIGNMENT — Why This Matters to Stakeholders

**For healthcare systems (NHG):**
- Reduces long-term cost burden of undiagnosed chronic disease
- Makes guideline-directed care the default, not the exception
- Plug-and-play — minimal implementation cost relative to the screening coverage it enables

**For pharmaceutical stakeholders (AstraZeneca):**
- Undiagnosed patients cannot receive guideline-directed treatment
- Finding these patients is a prerequisite to the challenge brief: "the right care at the right moment"
- A larger diagnosed population means more patients benefit from appropriate pharmaceutical intervention

**Future extension:**
- The same mechanism can reassess already-diagnosed COPD patients before each visit — flagging symptom worsening to trigger care escalation
- This addresses both halves of the challenge: finding the undiagnosed AND ensuring the diagnosed get the right care at the right moment

---

## Section 2: Pilot Project Description

Structure: What it is, how it works (patient journey), pilot scope, success measurement. Operational — no strategic argumentation, no cost justification (that's in the business case).

### What is PUHELU

PUHELU is a passive COPD screening system embedded in the existing primary care appointment workflow. It uses the appointment confirmation SMS — a touchpoint that already reaches every patient — to deliver a short screening form before the visit. Responses are scored transparently, and at-risk patients are flagged in the doctor's existing interface before the consultation begins.

### How It Works — The Patient Journey

#### Step 1: Appointment Booking
- **Patient:** Books a routine appointment for any reason
- **Doctor:** Appointment appears in schedule as usual — nothing changes
- **System:** Booking registered, patient contact available for SMS

#### Step 2: Pre-Appointment Screening Form
- **Patient:** Receives standard SMS confirmation 24h before appointment with a link to a short pre-appointment form. Fills it out on phone — one question at a time.
  - General section: current symptoms, reason for visit, basic health info
  - Branching: patients who indicate smoking history continue seamlessly into COPD-related questions (symptom severity, exacerbation history, respiratory patterns)
  - Smoker path concludes with a 3-second sustained vocalization recording
  - Non-smokers complete a shorter standard intake form
- **Doctor:** Not involved at this stage
- **System:** Responses collected. For flagged paths: questionnaire scoring + vocal biomarker analysis triggered

#### Step 3: Analysis and Flagging
- **Patient:** Not aware of this step — form submission is the end of their involvement until the appointment
- **Doctor:** Before the appointment, sees a flag in their existing patient information view (same location as booking info and symptom descriptions). The flag shows:
  - Transparent questionnaire score breakdown (each factor visible)
  - Vocal biomarker analysis result (if applicable)
  - Overall risk indication
  - This is a screening nudge, not a diagnosis
- **System:** Point-based scoring from questionnaire answers. Acoustic feature extraction from vocalization (maximum phonation time, jitter, shimmer). Risk flag delivered to EHR via FHIR R4 API

#### Step 4: Informed Consultation
- **Patient:** Attends appointment as usual. If flagged, doctor may ask additional respiratory questions and/or order spirometry
- **Doctor:** Enters consultation with awareness of COPD risk factors. Decides whether to investigate further based on the flag + clinical judgment. The flag does not prescribe action — it informs
- **System:** Outcome tracking: spirometry ordered? COPD diagnosed? Feeds into system effectiveness measurement

### Design Principles

- **Transparent scoring** — every score component is visible to the physician. No black-box models. The system is a decision-support nudge, not an automated diagnostic.
- **Sensitivity over specificity** — designed to catch as many at-risk patients as possible. A false positive costs a moment of extra attention. A false negative means another year undiagnosed.
- **Zero friction** — no new apps, no new logins, no new workflows. Patients fill out a form on their phone. Doctors read a flag where they already look.

### Pilot Scope

- **Region:** Helsinki capital area
- **EHR system:** Apotti (Epic-based, used by City of Helsinki since 2021), serving ~1.7M people
- **Why Helsinki:** Apotti has the most mature third-party developer ecosystem in Finnish healthcare — 100+ integration partners, online developer sandbox, well-documented FHIR R4 APIs
- **Duration:** 1 year (detailed timeline by Sophia)
- **Integration:** FHIR R4 API into Apotti. Flag delivered as text-based report in existing patient info view. SMS via existing appointment confirmation infrastructure.

### Success Metrics

- Increase in COPD diagnoses at pilot sites vs. baseline period
- Number of patients screened through the form
- Form completion rate
- Spirometry referral rate for flagged patients
- Flagged-to-diagnosed conversion rate

### Stakeholders

(Miska's deliverable — stakeholder mapping)

### Timeline

(Sophia's deliverable — 1-year timeline with implementation phases and outlook/scalability)

### Future Outlook

- **Geographic expansion:** All Finnish EHR systems support FHIR R4 — Lifecare (14 regions), OMNI360 (4 regions), Esko (3 regions). One integration pattern, national coverage.
- **Care escalation:** Same pre-appointment form can monitor already-diagnosed COPD patients — flagging worsening symptoms for guideline-directed treatment escalation.
- **Research:** De-identified screening data contributes to COPD prevalence understanding and vocal biomarker validation.
