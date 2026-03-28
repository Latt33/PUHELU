import os
import uuid
from fastapi import APIRouter, UploadFile, File, HTTPException
from app.schemas.patient_schema import PatientIntake, RiskAnalysisResponse
from app.services.copd_analyzer import analyze_copd_risk
from app.services.voice_analyzer import analyze_voice_audio

router = APIRouter()

# Ensuring a local data folder is created inside backend
# Using a relative path from the current file's dir: app/api/ -> app/ -> backend/data
DATA_DIR = os.path.abspath(os.path.join(os.path.dirname(__file__), "../../data"))
os.makedirs(DATA_DIR, exist_ok=True)

@router.post("/analyze-patient", response_model=RiskAnalysisResponse)
def analyze_patient(patient: PatientIntake):
    # Delegate core clinical logic to the services module
    return analyze_copd_risk(patient)

@router.post("/analyze-voice")
async def analyze_voice(file: UploadFile = File(...)):
    if not file.content_type.startswith("audio/"):
        raise HTTPException(status_code=400, detail="Uploaded file must be an audio file.")
        
    file_extension = file.filename.split('.')[-1] if '.' in file.filename else 'wav'
    file_path = os.path.abspath(os.path.join(DATA_DIR, f"voice_{uuid.uuid4().hex}.{file_extension}"))
        
    try:
        contents = await file.read()
        
        # Save file to data folder as requested
        with open(file_path, "wb") as f:
            f.write(contents)
            
        # Pass the file path directly to librosa
        results = analyze_voice_audio(file_path)
        return results
    except ValueError as e:
        raise HTTPException(status_code=500, detail=str(e))
    except Exception as e:
        raise HTTPException(status_code=500, detail="Failed to process voice audio.")
    finally:
        # Delete after processing has been completed as requested
        if os.path.exists(file_path):
            os.remove(file_path)
