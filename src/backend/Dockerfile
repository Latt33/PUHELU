FROM python:3.11-slim

# Install system dependencies required for librosa and soundfile
RUN apt-get update && apt-get install -y \
    libsndfile1 \
    ffmpeg \
    && rm -rf /var/lib/apt/lists/*

# Copy uv from the official Astral image for blazing fast installs
COPY --from=ghcr.io/astral-sh/uv:latest /uv /uvx /bin/

# Set working directory
WORKDIR /app

# Copy dependency files first to leverage Docker caching
COPY pyproject.toml uv.lock ./

# Install dependencies (this creates a .venv inside /app)
RUN uv sync --frozen

# Copy the rest of the backend application code
COPY . .

# Create the data directory explicitly
RUN mkdir -p /app/data

# Expose the port FastAPI runs on
EXPOSE 8000

# Start the application using uv run to utilize the managed virtual environment
CMD ["uv", "run", "uvicorn", "app.main:app", "--host", "0.0.0.0", "--port", "8000"]