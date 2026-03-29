# Pilot Project Description

## Overview

PUHELU embeds COPD risk screening into the primary care appointment confirmation workflow. Patients complete a pre-appointment questionnaire delivered via SMS; those whose responses indicate elevated risk are flagged in the physician's existing EHR interface before the consultation.

## Process

**Appointment and notification.** When a patient books a primary care appointment, the standard SMS confirmation — sent 24 hours before the visit — includes a link to a short pre-appointment form.

**Questionnaire.** The form opens with general intake questions (reason for visit, current symptoms, health background), presented one at a time. Patients who report smoking history continue seamlessly into respiratory-specific items: cough patterns, dyspnoea, exacerbation history. At the end of this pathway, the patient records a three-second sustained vocalization. Non-smokers complete a shorter general intake form without COPD-specific screening.

**Scoring.** Questionnaire responses are scored using a transparent point-based system — each contributing factor is individually visible. The vocalization undergoes acoustic analysis (maximum phonation time, jitter, shimmer) and is reported as a separate supplementary signal. If the combined assessment exceeds the threshold, a flag is generated.

**Flag delivery.** The flag is placed in the physician's existing patient information view via FHIR R4 API — the same location where booking details and patient-reported symptoms already appear. It includes the full score breakdown, vocal analysis result, and an explicit note that this is a screening signal, not a diagnosis.

**Consultation.** The physician encounters the flag during normal pre-appointment review. Whether to pursue further investigation (additional history, spirometry referral) remains the physician's clinical decision.

## Design Principles

**Interpretability.** Scoring is deliberately simple and fully transparent. All components are visible to the physician.

**Sensitivity over specificity.** Given 75–90% underdiagnosis, the system prioritises detection. A false positive costs a moment of consideration; a false negative leaves a patient undiagnosed.

**Minimal disruption.** No new software, no separate login, no training required for either patients or physicians.

## Pilot Configuration

- **Region:** Helsinki capital area
- **EHR:** Apotti (Epic-based, in use since 2021, ~1.7M population)
- **Integration:** FHIR R4 API, text-based flag in existing patient info view, SMS via existing confirmation infrastructure
- **Duration:** 1 year (timeline provided separately)

Helsinki was selected because Apotti maintains the most developed third-party integration ecosystem in Finnish healthcare, including a developer sandbox and established onboarding process for external tools.

## Evaluation Metrics

- COPD diagnosis rate at pilot sites vs. pre-intervention baseline
- Form delivery and completion rates
- Spirometry referral rate among flagged patients
- Flagged-to-diagnosed conversion rate
- Physician engagement with flags

## Outlook

**National expansion.** All major Finnish EHR systems support FHIR R4. The integration pattern validated in Helsinki can be reproduced across Lifecare (14 regions), OMNI360 (4 regions), and Esko (northern Finland).

**Care escalation.** The same questionnaire model can monitor symptom progression in diagnosed COPD patients, flagging worsening for care escalation.

**Research.** De-identified screening data can contribute to population-level COPD prevalence understanding and vocal biomarker validation.

## Stakeholders

Provided separately.

## Timeline

Provided separately.
