import io
import base64
import numpy as np
import librosa
import librosa.display
import matplotlib.pyplot as plt
import subprocess
import os
import uuid

# Matplotlib configuration for backend usage
import matplotlib
matplotlib.use('Agg')

def analyze_voice_audio(file_path: str):
    """
    Simulates AI voice biomarker extraction on a given audio file.
    """
    converted_path = None
    try:
        # Convert the file to WAV reliably using FFmpeg before librosa reads it
        converted_path = file_path + "_" + uuid.uuid4().hex + ".wav"
        
        # Suppress ffmpeg output but throw error if it fails
        subprocess.run(
            ['ffmpeg', '-y', '-i', file_path, '-ar', '22050', '-ac', '1', converted_path],
            check=True,
            stdout=subprocess.DEVNULL,
            stderr=subprocess.DEVNULL
        )
        
        # Load audio using librosa directly from the converted WAV file
        y, sr = librosa.load(converted_path, sr=None)
        
        # Calculate max phonation time (MPT)
        mpt = len(y) / sr if sr else 0

        # Estimate fundamental frequency (F0) per frame and compute jitter
        try:
            f0 = librosa.yin(y, fmin=50, fmax=500, sr=sr, frame_length=2048, hop_length=256)
            # remove unvoiced frames
            f0_clean = f0[~np.isnan(f0)]
            if len(f0_clean) > 1:
                periods = 1.0 / f0_clean
                jitter_local = np.abs(np.diff(periods))
                mean_period = np.mean(periods)
                jitter_percent = 100.0 * np.mean(jitter_local) / mean_period if mean_period > 0 else 0.0
            else:
                jitter_percent = 0.0
        except Exception:
            jitter_percent = 0.0

        # Compute shimmer from short-time RMS amplitude variations
        try:
            rms = librosa.feature.rms(y=y, frame_length=2048, hop_length=256)[0]
            if len(rms) > 1 and np.mean(rms) > 0:
                shimmer_local = np.abs(np.diff(rms))
                shimmer_percent = 100.0 * np.mean(shimmer_local) / np.mean(rms)
            else:
                shimmer_percent = 0.0
        except Exception:
            shimmer_percent = 0.0

        # Map metrics to a 0-100 risk score using simple, explainable thresholds
        # Clinical-ish thresholds (heuristic): jitter ~1.5% abnormal, shimmer ~4% abnormal, MPT <15s increases risk
        jitter_score = min(100.0, (jitter_percent / 1.5) * 100.0)
        shimmer_score = min(100.0, (shimmer_percent / 4.0) * 100.0)
        mpt_score = min(100.0, max(0.0, (15.0 - mpt) / 15.0 * 100.0))

        # Weighted combination to produce a deterministic risk score
        risk_score = round(0.5 * jitter_score + 0.3 * shimmer_score + 0.2 * mpt_score)

        # Status labels
        jitter_status = "Elevated" if jitter_percent > 1.5 else "Normal"
        shimmer_status = "Elevated" if shimmer_percent > 4.0 else "Normal"
        
        # Generate the Mel-Spectrogram figure
        fig, ax = plt.subplots(figsize=(6, 4))
        S = librosa.feature.melspectrogram(y=y, sr=sr, n_mels=128, fmax=8000)
        S_dB = librosa.power_to_db(S, ref=np.max)
        
        img = librosa.display.specshow(
            S_dB, 
            x_axis='time', 
            y_axis='mel', 
            sr=sr, 
            fmax=8000, 
            ax=ax, 
            cmap='magma'
        )
        fig.colorbar(img, ax=ax, format='%+2.0f dB')
        ax.set_title("Mel-Frequency Spectrogram")
        
        # Save figure to memory
        buf = io.BytesIO()
        plt.savefig(buf, format='png', bbox_inches='tight')
        plt.close(fig)
        
        buf.seek(0)
        img_base64 = base64.b64encode(buf.read()).decode('utf-8')
        
        return {
            "risk_score": int(risk_score),
            "mpt": round(mpt, 2),
            "spectrogram_base64": img_base64,
            "jitter_status": jitter_status,
            "shimmer_status": shimmer_status,
            "jitter_percent": round(float(jitter_percent), 3),
            "shimmer_percent": round(float(shimmer_percent), 3)
        }
        
    except subprocess.CalledProcessError as e:
        raise ValueError(f"FFmpeg conversion failed. Ensure the uploaded file is valid audio.")
    except Exception as e:
        raise ValueError(f"Error processing audio: {str(e)}")
    finally:
        # Clean up the temporary WAV file
        if converted_path and os.path.exists(converted_path):
            try:
                os.remove(converted_path)
            except:
                pass
