from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from starlette.middleware.base import BaseHTTPMiddleware
from app.api.routes import router as api_router
from app.core.config import settings
import traceback

app = FastAPI(title="COPD Risk Analysis API")


# Simple request/response logging middleware to aid runtime debugging in hosted
# environments (Railway/Vercel). Logs to stdout so platform logs show incoming
# paths and response status codes.
class RequestLoggingMiddleware(BaseHTTPMiddleware):
    async def dispatch(self, request, call_next):
        try:
            print(f"[REQ] {request.method} {request.url.path}")
            response = await call_next(request)
            print(f"[RESP] {response.status_code} {request.method} {request.url.path}")
            return response
        except Exception as e:
            print(f"[ERROR] Exception handling {request.method} {request.url.path}")
            traceback.print_exc()
            raise


# Setup CORS using settings.
# For convenience during testing, if no CORS_ORIGINS are provided we allow all origins
# (wildcard) but disable credentials to remain compatible with browser rules.
if settings.CORS_ORIGINS:
    origins = [str(origin).strip("/") for origin in settings.CORS_ORIGINS]
    allow_credentials = True
else:
    origins = ["*"]
    allow_credentials = False

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=allow_credentials,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Install logging middleware early so all requests are captured
app.add_middleware(RequestLoggingMiddleware)

# Register API routes under configured prefix (defaults set in config)
app.include_router(api_router, prefix=settings.API_V1_STR)

@app.get("/")
def read_root():
    return {"status": "ok", "message": "Welcome to the COPD Risk Analysis API"}


@app.get("/health")
def health_check():
    return {"status": "healthy"}
