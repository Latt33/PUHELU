FROM python:3.11-slim

# Keep logs unbuffered
ENV PYTHONUNBUFFERED=1

# Install system dependencies required for librosa and soundfile
RUN apt-get update && apt-get install -y --no-install-recommends \
    libsndfile1 \
    ffmpeg \
    ca-certificates \
    build-essential \
    && rm -rf /var/lib/apt/lists/*

# Copy uv from the official Astral image for fast installs
COPY --from=ghcr.io/astral-sh/uv:latest /uv /uvx /bin/

# Set working directory
WORKDIR /app

# Copy dependency files to leverage Docker cache (use explicit src/backend paths so
# builds that use the repository root as the build context still succeed)
COPY src/backend/pyproject.toml src/backend/uv.lock ./

# Install Python dependencies (creates managed venv inside /app)
RUN uv sync --frozen

# Copy application source from src/backend when the build context is repository root
# (keeps the same layout as building with src/backend as the context)
COPY src/backend/. .

# Create non-root user and app data directory, set ownership
RUN addgroup --system app && adduser --system --ingroup app app \
    && mkdir -p /app/data \
    && chown -R app:app /app

# Ensure the non-root user's HOME is set to /app and create a writable cache dir
ENV HOME=/app
RUN mkdir -p $HOME/.cache/uv \
    && chown -R app:app $HOME/.cache

USER app

# Expose HTTP port
EXPOSE 8000

# Run Uvicorn with multiple workers and proxy headers for production
CMD ["uv", "run", "uvicorn", "app.main:app", "--host", "0.0.0.0", "--port", "8000", "--workers", "4", "--proxy-headers", "--log-level", "info"]