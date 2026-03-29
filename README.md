# PUHELU: Clinical Assessment Platform

PUHELU is a clinical assessment platform designed to evaluate patient COPD risk combining standard GOLD 2023 Guidelines (CAT questionnaire) with AI-driven vocal biomarker analysis. 

The application is structured as a modern monorepo featuring a React frontend and a Dockerized FastAPI/Python backend.

## Project Architecture

*   **Frontend**: React (Vite) + TypeScript + Tailwind CSS
*   **Backend**: Python + FastAPI + Librosa + Matplotlib
*   **Deployment Ready**: Full Docker support for the backend audio processing environment.

## Getting Started

### 1. Run the Backend

Because the backend relies on heavy audio processing libraries (Librosa, FFmpeg, SciPy) for vocal biomarker analysis, it is recommended to run the backend using Docker.

```bash
cd src/backend

# Build and start the container
docker-compose up --build
```

The backend API will run at `http://localhost:8000`.

*Note: If you prefer to run it locally without Docker, ensure you have `ffmpeg` and `libsndfile` installed on your OS, then use `uv sync` followed by `uv run uvicorn app.main:app --reload`.*

### 2. Run the Frontend

Open a new terminal and start the Vite development server for the React UI.

```bash
cd src/frontend

# Install dependencies (only needed the first time)
npm install

# Start the development server
npm run dev
```

The frontend will run at `http://localhost:5173`. 

### Developer notes: CORS and Vite plugin

- If you run the frontend dev server at `http://localhost:5173` and the backend at `http://localhost:8000`, the browser will send a CORS preflight OPTIONS request. During development the backend is configured to read `CORS_ORIGINS` from the environment. To avoid preflight failures either set the env var for the backend or ensure the backend's config provides `http://localhost:5173` as an allowed origin.

Example (docker-compose / local env):
```powershell
# from the repo root
cd src/backend
# add to .env or export before running
setx CORS_ORIGINS "http://localhost:5173,http://127.0.0.1:5173"
docker-compose up --build
```

- Vite plugin: this project uses the official `@vitejs/plugin-react` plugin to stay compatible with Vite 8. If you previously saw an `ERESOLVE` error during `npm install` referencing `@vitejs/plugin-react-oxc`, that plugin is incompatible with Vite 8 and has been replaced in `package.json` and `vite.config.ts`.

If you prefer to quickly bypass npm peer dependency checks (not recommended long-term), run:
```bash
npm install --legacy-peer-deps
```

## Features

*   **Clinical Assessment (CAT)**: Interactive form for clinical data collection including exacerbations, hospitalizations, and a dynamic 0-40 CAT score calculator.
*   **Vocal Biomarker Analysis**: Allows clinicians to record patient audio directly from the browser. The backend extracts acoustic features (Maximum Phonation Time, Jitter, Shimmer) and renders a Mel-Frequency Spectrogram to estimate respiratory impairment probabilities.
*   **Data Security**: Audio recordings are processed in-memory or securely temporarily stored and deleted immediately post-analysis. 

## Deployment Recommendations

*   **Frontend**: Vercel or Netlify.
*   **Backend**: Render or Railway (using the provided `Dockerfile`). Do not deploy the backend to AWS Lambda or Vercel Serverless functions, as the machine learning libraries exceed standard serverless size limits.