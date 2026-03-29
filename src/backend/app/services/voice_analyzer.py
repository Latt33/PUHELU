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
        
        # Mock ML Risk Score
        risk_score = np.random.randint(40, 85)
        
        # Determine status text
        jitter_status = "Elevated" if risk_score > 60 else "Normal"
        shimmer_status = "Normal"
        
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
            "shimmer_status": shimmer_status
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
