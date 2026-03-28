import React, { useState, useRef, useEffect } from 'react';
import { apiClient } from '../../api/client';
import { Mic, Square } from 'lucide-react';

interface VoiceAnalysisResponse {
  risk_score: number;
  mpt: number;
  spectrogram_base64: string;
  jitter_status: string;
  shimmer_status: string;
}

export const VoiceUploader: React.FC = () => {
  const [file, setFile] = useState<File | null>(null);
  const [audioUrl, setAudioUrl] = useState<string | null>(null);
  const [result, setResult] = useState<VoiceAnalysisResponse | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // Recording states
  const [isRecording, setIsRecording] = useState(false);
  const [recordingDuration, setRecordingDuration] = useState(0);
  const timerRef = useRef<number | null>(null);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioChunksRef = useRef<Blob[]>([]);

  useEffect(() => {
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
      if (mediaRecorderRef.current && mediaRecorderRef.current.state === 'recording') {
        mediaRecorderRef.current.stop();
      }
    };
  }, []);

  const startRecording = async () => {
    try {
      if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
        throw new Error('Audio recording is not supported by your browser or requires HTTPS.');
      }
      
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const mediaRecorder = new MediaRecorder(stream);
      mediaRecorderRef.current = mediaRecorder;
      audioChunksRef.current = [];

      mediaRecorder.ondataavailable = (e) => {
        if (e.data && e.data.size > 0) {
          audioChunksRef.current.push(e.data);
        }
      };

      mediaRecorder.onstop = () => {
        const mimeType = mediaRecorder.mimeType || 'audio/webm';
        
        // Ensure the file extension matches what the browser naturally recorded
        // so the <audio> tag knows how to play it back
        let extension = 'webm';
        if (mimeType.includes('mp4')) extension = 'mp4';
        if (mimeType.includes('ogg')) extension = 'ogg';

        const audioBlob = new Blob(audioChunksRef.current, { type: mimeType });
        const audioFile = new File([audioBlob], `recording_${Date.now()}.${extension}`, { type: mimeType });
        
        const url = URL.createObjectURL(audioFile);
        setAudioUrl(url);
        setFile(audioFile);
        
        setResult(null);
        setError('');

        // Stop all tracks to release microphone
        stream.getTracks().forEach(track => track.stop());
      };

      // Clear any existing timers just in case
      if (timerRef.current) clearInterval(timerRef.current);
      
      mediaRecorder.start(250); // Pass timeslice to ensure data chunks fire regularly
      setIsRecording(true);
      setRecordingDuration(0);
      
      timerRef.current = window.setInterval(() => {
        setRecordingDuration(prev => prev + 1);
      }, 1000);
      
    } catch (err: any) {
      console.error("Microphone Error:", err);
      setError(err.message || 'Microphone access denied. Please allow microphone permissions and try again.');
    }
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current && mediaRecorderRef.current.state === 'recording') {
      mediaRecorderRef.current.stop();
    }
    setIsRecording(false);
    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }
  };

  const handleAnalyze = async () => {
    if (!file) return;
    setLoading(true);
    setError('');
    setResult(null);

    const formData = new FormData();
    formData.append('file', file);

    try {
      const response = await apiClient.post<VoiceAnalysisResponse>('/analyze-voice', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      setResult(response.data);
    } catch (err: any) {
      setError(
        err.response?.data?.detail || 
        'Failed to process the audio file. Please ensure the backend is running.'
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-8 bg-white rounded-xl shadow-sm border border-slate-200">
      <h2 className="text-2xl font-semibold text-slate-800 mb-6 border-b border-slate-100 pb-4 flex items-center gap-2">
        <span className="text-3xl">🎙️</span> COPD Vocal Biomarker Analysis
      </h2>
      
      <div className="mb-6 p-5 bg-blue-50 border border-blue-100 rounded-lg shadow-sm">
        <h3 className="text-sm font-bold text-blue-900 mb-1">Instructions</h3>
        <p className="text-sm text-blue-800">
          For best clinical results, instruct the patient to take a deep breath and hold the <strong>"ahhh"</strong> sound for as long as possible after pressing record.
        </p>
      </div>

      <div className="space-y-6">
        <div className="grid grid-cols-1 gap-4">
          <div className="border-2 border-slate-200 rounded-xl p-8 text-center bg-slate-50 flex flex-col items-center justify-center min-h-[200px]">
            {isRecording ? (
              <>
                <div className="flex items-center justify-center gap-2 mb-4">
                  <span className="w-4 h-4 rounded-full bg-red-500 animate-pulse"></span>
                  <span className="text-red-500 font-mono font-bold text-2xl">
                    00:{recordingDuration.toString().padStart(2, '0')}
                  </span>
                </div>
                <button 
                  onClick={stopRecording}
                  className="flex items-center gap-2 bg-red-100 text-red-700 hover:bg-red-200 font-bold py-3 px-8 rounded-full transition-colors text-lg shadow-sm"
                >
                  <Square fill="currentColor" size={20} /> Stop Recording
                </button>
              </>
            ) : (
              <>
                <Mic className="w-12 h-12 text-blue-500 mb-4" />
                <p className="text-base font-medium text-slate-600 mb-4">Click below to start the microphone</p>
                <button 
                  onClick={startRecording}
                  className="flex items-center gap-2 bg-blue-600 text-white hover:bg-blue-700 font-bold py-3 px-8 rounded-full shadow-sm transition-colors text-lg"
                >
                  <Mic size={20} /> Start Recording
                </button>
              </>
            )}
          </div>
        </div>

        {file && audioUrl && (
          <div className="mt-4 bg-slate-50 p-6 rounded-lg border border-slate-100">
            <h4 className="text-sm font-medium text-slate-700 mb-3">Audio Preview: {file.name}</h4>
            <audio src={audioUrl} controls className="w-full mb-6">
              Your browser does not support the audio element.
            </audio>
            
            <button
              onClick={handleAnalyze}
              disabled={loading}
              className="w-full bg-blue-600 text-white font-bold py-3.5 px-4 rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-70 disabled:cursor-not-allowed shadow-sm flex justify-center items-center gap-2"
            >
              {loading ? (
                <>
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Extracting Acoustic Features...
                </>
              ) : (
                'Analyze Voice Sample'
              )}
            </button>
          </div>
        )}

        {error && (
          <div className="mt-4 p-4 rounded-md bg-red-50 border border-red-200">
            <p className="text-red-600 text-sm font-medium">⚠️ {error}</p>
          </div>
        )}

        {result && (
          <div className="mt-8 pt-8 border-t border-slate-200 grid grid-cols-1 md:grid-cols-2 gap-8 animate-fade-in">
            {/* Left Column: Metrics */}
            <div>
              <h3 className="text-lg font-bold text-slate-800 mb-4">Acoustic Analysis Results</h3>
              
              <div className={`p-6 rounded-xl border-l-4 shadow-sm mb-6 ${
                  result.risk_score > 70 ? 'bg-red-50 border-red-500' : 
                  result.risk_score > 50 ? 'bg-yellow-50 border-yellow-500' : 
                  'bg-green-50 border-green-500'
                }`}
              >
                <div className="flex items-end gap-2 mb-1">
                  <div className={`text-4xl font-black ${
                    result.risk_score > 70 ? 'text-red-700' : result.risk_score > 50 ? 'text-yellow-700' : 'text-green-700'
                  }`}>{result.risk_score}%</div>
                  <div className="text-sm font-bold uppercase tracking-wide opacity-70 mb-1">Risk Probability</div>
                </div>
                <p className="mt-3 text-sm font-medium text-slate-800">
                  {result.risk_score > 70 ? "High probability of respiratory impairment detected." : 
                   result.risk_score > 50 ? "Moderate signs of respiratory strain detected." : 
                   "Voice biomarkers appear within normal limits."}
                </p>
              </div>

              <div className="bg-slate-50 rounded-xl p-5 border border-slate-200">
                <h4 className="text-sm font-bold text-slate-500 uppercase tracking-wider mb-4">Extracted Features</h4>
                <div className="space-y-4">
                  <div className="flex justify-between items-center pb-3 border-b border-slate-200">
                    <span className="text-slate-600 font-medium">Jitter (Frequency)</span>
                    <span className={`px-2.5 py-1 rounded-md text-sm font-bold ${result.jitter_status === 'Elevated' ? 'bg-red-100 text-red-700' : 'bg-green-100 text-green-700'}`}>
                      {result.jitter_status}
                    </span>
                  </div>
                  <div className="flex justify-between items-center pb-3 border-b border-slate-200">
                    <span className="text-slate-600 font-medium">Shimmer (Amplitude)</span>
                    <span className="px-2.5 py-1 rounded-md text-sm font-bold bg-green-100 text-green-700">
                      {result.shimmer_status}
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-slate-600 font-medium">Max Phonation Time</span>
                    <span className="font-bold text-slate-800">{result.mpt} seconds</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column: Visuals */}
            <div>
              <h3 className="text-lg font-bold text-slate-800 mb-4">Mel-Frequency Spectrogram</h3>
              <div className="bg-white p-2 border border-slate-200 rounded-xl shadow-sm">
                <img 
                  src={`data:image/png;base64,${result.spectrogram_base64}`} 
                  alt="Mel-Spectrogram visualization of the voice sample" 
                  className="w-full h-auto rounded-lg"
                />
              </div>
              <p className="text-xs text-slate-500 mt-3 text-center">
                Visual representation of acoustic energy across frequencies over time.
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};