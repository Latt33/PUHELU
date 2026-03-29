import os
from typing import List


# Simple settings object (avoid pydantic/BaseSettings for compatibility)
class Settings:
	API_V1_STR: str = "/api/v1"
	PROJECT_NAME: str = "COPD Risk API"
	CORS_ORIGINS: List[str] = []

	def __init__(self):
		cors = os.getenv("CORS_ORIGINS")
		if cors:
			self.CORS_ORIGINS = [c.strip() for c in cors.split(",") if c.strip()]


# Create a singleton settings instance used by the app
settings = Settings()
