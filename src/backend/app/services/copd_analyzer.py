from app.schemas.patient_schema import PatientIntake, RiskAnalysisResponse

def analyze_copd_risk(patient: PatientIntake) -> RiskAnalysisResponse:
    """
    Implements GOLD 2023 Guidelines for COPD risk analysis using CAT score.
    """
    cat_score = (
        patient.cat_cough + 
        patient.cat_phlegm + 
        patient.cat_chest_tightness + 
        patient.cat_breathlessness + 
        patient.cat_activities + 
        patient.cat_confidence + 
        patient.cat_sleep + 
        patient.cat_energy
    )

    # Group E: >= 2 exacerbations OR >= 1 leading to hospitalization
    if patient.exacerbations_past_year >= 2 or patient.hospitalized_past_year:
        return RiskAnalysisResponse(
            risk_group="E",
            risk_level="High Risk",
            recommended_action="LABA + LAMA (consider ICS if eos >= 300)"
        )
    
    # Group B: CAT >= 10, 0-1 exacerbations (not leading to hospital)
    if cat_score >= 10:
        return RiskAnalysisResponse(
            risk_group="B",
            risk_level="Moderate Risk",
            recommended_action="LABA + LAMA"
        )
        
    # Group A: CAT < 10, 0-1 exacerbations (not leading to hospital)
    return RiskAnalysisResponse(
        risk_group="A",
        risk_level="Low Risk",
        recommended_action="A bronchodilator"
    )
