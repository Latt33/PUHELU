from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.api.routes import router as api_router
from app.core.config import settings

app = FastAPI(title="COPD Risk Analysis API")

# Setup CORS using settings
if settings.CORS_ORIGINS:
    app.add_middleware(
        CORSMiddleware,
        allow_origins=[str(origin).strip("/") for origin in settings.CORS_ORIGINS],
        allow_credentials=True,
        allow_methods=["*"],
        allow_headers=["*"],
    )

app.include_router(api_router)

@app.get("/")
def read_root():
    return {"status": "ok", "message": "Welcome to the COPD Risk Analysis API"}


@app.get("/health")
def health_check():
    return {"status": "healthy"}
