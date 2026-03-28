import io
import base64
import numpy as np
import librosa
import librosa.display
import matplotlib.pyplot as plt

# Matplotlib configuration for backend usage
import matplotlib
matplotlib.use('Agg')

def analyze_voice_audio(file_path: str):
    """
    Simulates AI voice biomarker extraction on a given audio file.
    """
    try:
        # Load audio using librosa directly from the file path.
        # This is safer for librosa as it handles various codecs better via paths.
        y, sr = librosa.load(file_path, sr=None)
        
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
        
    except Exception as e:
        raise ValueError(f"Error processing audio: {str(e)}")
