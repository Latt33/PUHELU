from pydantic import BaseModel, Field

class PatientIntake(BaseModel):
    age: int = Field(..., gt=0, description="Patient's age")
    cat_cough: int = Field(..., ge=0, le=5, description="CAT: I never cough (0) to I cough all the time (5)")
    cat_phlegm: int = Field(..., ge=0, le=5, description="CAT: No phlegm (0) to chest completely full of phlegm (5)")
    cat_chest_tightness: int = Field(..., ge=0, le=5, description="CAT: Chest not tight (0) to chest very tight (5)")
    cat_breathlessness: int = Field(..., ge=0, le=5, description="CAT: Not breathless (0) to very breathless (5)")
    cat_activities: int = Field(..., ge=0, le=5, description="CAT: Not limited doing activities (0) to very limited (5)")
    cat_confidence: int = Field(..., ge=0, le=5, description="CAT: Confident leaving home (0) to not at all confident (5)")
    cat_sleep: int = Field(..., ge=0, le=5, description="CAT: Sleep soundly (0) to don't sleep soundly (5)")
    cat_energy: int = Field(..., ge=0, le=5, description="CAT: Lots of energy (0) to no energy at all (5)")
    exacerbations_past_year: int = Field(..., ge=0, description="Number of exacerbations in the past year")
    hospitalized_past_year: bool = Field(..., description="Was the patient hospitalized for COPD in the past year?")
    smoker_recent: bool = Field(..., description="Smoked at least one cigarette in the past two weeks")

class RiskAnalysisResponse(BaseModel):
    risk_group: str
    risk_level: str
    recommended_action: str
