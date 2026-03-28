import numpy as np
import matplotlib.pyplot as plt
import io
import base64
import librosa
import librosa.display

# This ensures matplotlib doesn't try to open a GUI
import matplotlib
matplotlib.use('Agg')

# Create a sample spectrogram using a built-in librosa example audio
y, sr = librosa.load(librosa.ex('trumpet'), duration=5)
S = librosa.feature.melspectrogram(y=y, sr=sr, n_mels=128, fmax=8000)
S_dB = librosa.power_to_db(S, ref=np.max)

# Create a plot
fig, ax = plt.subplots(figsize=(10, 4))
librosa.display.specshow(S_dB, x_axis='time', y_axis='mel', sr=sr, fmax=8000, ax=ax, cmap='magma')
ax.set_title(None) # No title
ax.set_xlabel(None)
ax.set_ylabel(None)
fig.set_facecolor('white')


# Save to buffer
buf = io.BytesIO()
plt.savefig(buf, format='png', bbox_inches='tight', pad_inches=0.1)
buf.seek(0)

# Encode
img_base64 = base64.b64encode(buf.read()).decode('utf-8')

print(img_base64)
