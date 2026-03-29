import { useState, useRef, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useDemoStore } from '../store/demoStore';
import { apiClient } from '../api/client';
import { Check, Mic, ArrowRight, Loader2, ArrowLeft, Plus } from 'lucide-react';
import { AppHeader } from '../components/AppHeader';

const SYMPTOM_OPTIONS = [
  'Fever or chills',
  'Cough',
  'Fatigue or weakness',
  'Muscle or body aches',
  'Headache',
  'Sore throat',
  'Shortness of breath',
];

const CAT_QUESTIONS = [
  {
    id: 'cat_cough',
    label: 'Do you cough during the day?',
    minLabel: '0 — No',
    maxLabel: '5 — Very much',
  },
  {
    id: 'cat_phlegm',
    label: 'Do you have mucus or phlegm in your chest?',
    minLabel: '0 — No',
    maxLabel: '5 — Very much',
  },
  {
    id: 'cat_chest_tightness',
    label: 'Do you feel chest tightness?',
    minLabel: '0 — No',
    maxLabel: '5 — Very much',
  },
  {
    id: 'cat_breathlessness',
    label: 'Do you get breathless when walking up a hill or stairs?',
    minLabel: '0 — No',
    maxLabel: '5 — Very much',
  },
  {
    id: 'cat_activities',
    label: 'Does your breathing limit your daily activities at home?',
    minLabel: '0 — Not at all',
    maxLabel: '5 — A lot',
  },
  {
    id: 'cat_confidence',
    label: 'Do you feel confident leaving your home despite breathing?',
    minLabel: '0 — Very confident',
    maxLabel: '5 — Not confident',
  },
  {
    id: 'cat_sleep',
    label: 'Does your breathing affect your sleep?',
    minLabel: '0 — No',
    maxLabel: '5 — Very much',
  },
  {
    id: 'cat_energy',
    label: 'How much energy do you have today?',
    minLabel: '0 — Lots of energy',
    maxLabel: '5 — No energy',
  },
];

export function DemoPage() {
  const navigate = useNavigate();
  const { patientData, setSymptoms, setOtherSymptom, setCatScore, setSmokingStatus, setVoiceData, setResults, reset } = useDemoStore();
  
  const [step, setStep] = useState(0); // 0: Symptoms, 1: Smoking, 2: CAT (sequential), 3: Voice, 4: Processing
  const [showIntro, setShowIntro] = useState(true);
  const [catIndex, setCatIndex] = useState(0);

  // Symptoms state
  const handleSymptomToggle = (symptom: string) => {
    if (patientData.symptoms.includes(symptom)) {
      setSymptoms(patientData.symptoms.filter(s => s !== symptom));
    } else {
      setSymptoms([...patientData.symptoms, symptom]);
    }
  };

  // CAT logic handled by sequential `catIndex` (one question at a time)

  // Voice recording
  const [isRecording, setIsRecording] = useState(false);
  const [recordingDuration, setRecordingDuration] = useState(0);
  const [recordingError, setRecordingError] = useState('');
  const [consentGiven, setConsentGiven] = useState(false);
  const [isPreparing, setIsPreparing] = useState(false);
  const [countdown, setCountdown] = useState(3);
  const timerRef = useRef<number | null>(null);
  const countdownRef = useRef<number | null>(null);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioChunksRef = useRef<Blob[]>([]);

  const streamRef = useRef<MediaStream | null>(null);

  useEffect(() => {
    reset(); // Reset store when entering demo
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
      if (countdownRef.current) clearInterval(countdownRef.current);
      if (mediaRecorderRef.current && mediaRecorderRef.current.state === 'recording') {
        mediaRecorderRef.current.stop();
      }
      if (streamRef.current) {
        streamRef.current.getTracks().forEach(track => track.stop());
      }
    };
  }, []);

  // Enforce exactly 6s recording
  useEffect(() => {
    if (isRecording && recordingDuration >= 6) {
      stopRecording();
    }
  }, [recordingDuration, isRecording]);

  const startRecording = async () => {
    try {
      if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
        throw new Error('Audio recording is not supported by your browser.');
      }
      
      // Request permissions and stream BEFORE the countdown
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      streamRef.current = stream;
      
      // Start Countdown
      setIsPreparing(true);
      setCountdown(3);
      setRecordingError('');

      countdownRef.current = window.setInterval(() => {
        setCountdown((prev) => {
          if (prev <= 1) {
            if (countdownRef.current) clearInterval(countdownRef.current);
            startActualRecording(stream);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);

    } catch (err: any) {
      setRecordingError(err.message || 'Microphone access denied or failed to start.');
      setIsPreparing(false);
      setIsRecording(false);
    }
  };

  const startActualRecording = (stream: MediaStream) => {
    try {
      setIsPreparing(false);
      const mediaRecorder = new MediaRecorder(stream);
      mediaRecorderRef.current = mediaRecorder;
      audioChunksRef.current = [];

      mediaRecorder.ondataavailable = (e) => {
        if (e.data && e.data.size > 0) audioChunksRef.current.push(e.data);
      };

      mediaRecorder.onstop = () => {
        const mimeType = mediaRecorder.mimeType || 'audio/webm';
        let extension = 'webm';
        if (mimeType.includes('mp4')) extension = 'mp4';
        if (mimeType.includes('ogg')) extension = 'ogg';

        const audioBlob = new Blob(audioChunksRef.current, { type: mimeType });
        const audioFile = new File([audioBlob], `recording_${Date.now()}.${extension}`, { type: mimeType });
        const url = URL.createObjectURL(audioFile);
        
        setVoiceData(audioFile, url);
        if (streamRef.current) {
          streamRef.current.getTracks().forEach(track => track.stop());
          streamRef.current = null;
        }
      };

      if (timerRef.current) clearInterval(timerRef.current);
      
      mediaRecorder.start(250);
      setIsRecording(true);
      setRecordingDuration(0);
      
      timerRef.current = window.setInterval(() => {
        setRecordingDuration(prev => prev + 1);
      }, 1000);
      
    } catch (err: any) {
      setRecordingError(err.message || 'Failed to start recording.');
      setIsPreparing(false);
      setIsRecording(false);
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

  const [isSubmitting, setIsSubmitting] = useState(false);
  const handleSubmit = async () => {
    setIsSubmitting(true);
    setStep(4); // Go to processing step
    
    try {
      // 1. Send Clinical Data
      const clinicalRes = await apiClient.post('/analyze-patient', {
        age: 65, // Default for demo since we didn't ask
        cat_cough: patientData.catScores.cat_cough || 0,
        cat_phlegm: patientData.catScores.cat_phlegm || 0,
        cat_chest_tightness: patientData.catScores.cat_chest_tightness || 0,
        cat_breathlessness: patientData.catScores.cat_breathlessness || 0,
        cat_activities: patientData.catScores.cat_activities || 0,
        cat_confidence: patientData.catScores.cat_confidence || 0,
        cat_sleep: patientData.catScores.cat_sleep || 0,
        cat_energy: patientData.catScores.cat_energy || 0,
        exacerbations_past_year: 0,
        hospitalized_past_year: false,
      });

      // 2. Send Voice Data (if provided)
      let voiceResData = null;
      if (patientData.voiceFile) {
        const formData = new FormData();
        formData.append('file', patientData.voiceFile);
        const voiceRes = await apiClient.post('/analyze-voice', formData, {
          headers: { 'Content-Type': 'multipart/form-data' },
        });
        voiceResData = voiceRes.data;
      }

      setResults(clinicalRes.data, voiceResData);
    } catch (err) {
      console.error("Submission error", err);
      // Fallback for demo if backend is offline
      setResults(
        { risk_group: 'B', risk_level: 'Moderate Risk', recommended_action: 'Close monitoring and spirometry' },
        patientData.voiceFile 
          ? { risk_score: 75, jitter_status: 'Elevated (1.2%)', shimmer_status: 'Normal (3.1%)', spectrogram_base64: '' }
          : null
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-background text-foreground py-12 px-4 sm:px-6 lg:px-8 relative">
      <AppHeader />
      <div className="max-w-3xl mx-auto relative">
        {step < 4 && (
          <Link 
            to="/" 
            className="absolute -top-8 left-0 inline-flex items-center text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
          >
            <ArrowLeft className="mr-1 h-4 w-4" /> Back to Home
          </Link>
        )}

        {/* Header and Step Progress */}
          <header className="mb-10 text-center">
          <h1 className="text-3xl font-black tracking-tight text-foreground mb-2">Patient Intake</h1>
          <p className="text-muted-foreground">PUHELU</p>
        </header>

        {/* Removed numbered patient-facing progress per design. Intro guides user, then sequential questions. */}

        <div className="bg-white rounded-lg shadow-sm border border-muted p-8 min-h-[500px] flex flex-col">
          
          {/* INTRO */}
          {showIntro && (
            <div className="flex-1 flex flex-col items-center justify-center text-center">
              <h2 className="text-2xl font-bold text-foreground mb-4">Demo Health Survey</h2>
              <p className="text-muted-foreground max-w-xl mb-8">This is a demo health survey that will be used to map general health status and screen for COPD. You'll be asked one question at a time.</p>
              <div className="flex gap-3">
                <button onClick={() => setShowIntro(false)} className="bg-primary text-primary-foreground font-semibold py-3 px-6 rounded-md">Start Survey</button>
              </div>
            </div>
          )}

          {/* STEP 0: SYMPTOMS */}
          {step === 0 && !showIntro && (
            <div className="flex-1 animate-fade-in flex flex-col">
              <h2 className="text-2xl font-bold text-foreground mb-2">Current Symptoms</h2>
              <p className="text-muted-foreground mb-8">Select all the symptoms you are experiencing right now.</p>
              
              <div className="space-y-3 mb-8 flex-1">
                {SYMPTOM_OPTIONS.map(sym => (
                  <label key={sym} className="flex items-center p-4 rounded-md border border-muted cursor-pointer hover:bg-muted/30 transition-colors">
                    <input
                      type="checkbox"
                      checked={patientData.symptoms.includes(sym)}
                      onChange={() => handleSymptomToggle(sym)}
                      className="w-5 h-5 text-primary rounded border-muted focus:ring-primary"
                    />
                    <span className="ml-3 font-medium text-muted-foreground">{sym}</span>
                  </label>
                ))}
                
                <div className="p-4 rounded-md border border-muted flex flex-col gap-2 bg-muted/30">
                  <label className="flex items-center text-muted-foreground font-medium">
                    <Plus className="w-4 h-4 mr-2" /> Other symptoms
                  </label>
                  <input
                    type="text"
                    value={patientData.otherSymptom}
                    onChange={(e) => setOtherSymptom(e.target.value)}
                    placeholder="Describe any other symptoms here..."
                    className="w-full px-4 py-3 bg-white border border-muted rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                </div>
              </div>

                <div className="mt-auto flex justify-end border-t border-muted/50 pt-6">
                <button
                  onClick={() => setStep(1)}
                  className="bg-primary text-primary-foreground font-semibold py-3 px-8 rounded-md hover:bg-primary/90 transition-colors flex items-center gap-2"
                >
                  Continue <ArrowRight size={20} />
                </button>
              </div>
            </div>
          )}

          {/* STEP 1: Smoking question */}
          {step === 1 && (
            <div className="flex-1 animate-fade-in flex flex-col">
              <h2 className="text-2xl font-bold text-foreground mb-2">Smoking Status</h2>
              <p className="text-muted-foreground mb-6">Please select the option that best describes your smoking history.</p>

              <div className="flex-1 flex flex-col items-center justify-center">
                <div className="w-full max-w-md space-y-3">
                  {['Never', 'Former', 'Current'].map(opt => (
                    <button
                      key={opt}
                      onClick={() => setSmokingStatus(opt)}
                      className={`w-full py-4 rounded-lg font-semibold border ${patientData.smokingStatus === opt ? 'bg-primary text-primary-foreground border-primary' : 'bg-white text-muted-foreground border-muted hover:bg-muted/30'}`}
                    >
                      {opt}
                    </button>
                  ))}
                </div>
              </div>

              <div className="mt-6 flex justify-between pt-6 border-t border-muted/50">
                <button
                  onClick={() => setStep(0)}
                  className="text-muted-foreground font-medium py-3 px-6 rounded-md hover:bg-muted transition-colors"
                >
                  Back
                </button>
                <button
                  onClick={() => {
                    setCatIndex(0);
                    setStep(2);
                  }}
                  className="bg-primary text-primary-foreground font-semibold py-3 px-8 rounded-md hover:bg-primary/90 transition-colors flex items-center gap-2"
                >
                  Continue <ArrowRight size={20} />
                </button>
              </div>
            </div>
          )}

          {/* STEP 2: CAT questions — one at a time */}
          {step === 2 && (
            <div className="flex-1 animate-fade-in flex flex-col h-full">
              {/* Present questions directly without naming the questionnaire */}

              <div className="flex-1 flex flex-col items-center justify-center">
                {(() => {
                  const q = CAT_QUESTIONS[catIndex];
                  const selected = patientData.catScores[q.id];
                  return (
                    <div key={q.id} className="w-full max-w-2xl bg-muted/30 rounded-md p-6 border border-muted">
                      <h3 className="text-center font-bold text-foreground mb-4">{q.label}</h3>
                      <div className="flex justify-between items-end mb-3 text-xs font-semibold text-muted-foreground uppercase tracking-wide">
                        <div className="w-1/3 text-left leading-tight">{q.minLabel}</div>
                        <div className="w-1/3 text-right leading-tight">{q.maxLabel}</div>
                      </div>
                      <div className="flex justify-between gap-1 sm:gap-2">
                        {[0, 1, 2, 3, 4, 5].map((score) => (
                          <button
                            key={score}
                            onClick={() => {
                              setCatScore(q.id, score);
                              // auto-advance to next question, or to voice step if last
                              if (catIndex < CAT_QUESTIONS.length - 1) {
                                setCatIndex(prev => prev + 1);
                              } else {
                                setStep(3);
                              }
                            }}
                            className={`flex-1 py-3 sm:py-4 text-lg font-bold rounded-lg transition-all ${selected === score ? 'bg-primary text-primary-foreground shadow-md transform scale-105 border-primary' : 'bg-white text-muted-foreground border border-muted hover:bg-muted hover:border-muted'}`}
                          >
                            {score}
                          </button>
                        ))}
                      </div>
                    </div>
                  );
                })()}
              </div>

              <div className="mt-6 flex justify-between pt-6 border-t border-muted/50">
                <button
                  onClick={() => {
                    if (catIndex === 0) setStep(1);
                    else setCatIndex(prev => Math.max(0, prev - 1));
                  }}
                  className="text-muted-foreground font-medium py-3 px-6 rounded-md hover:bg-muted transition-colors"
                >
                  Back
                </button>
                <button
                  onClick={() => {
                    const q = CAT_QUESTIONS[catIndex];
                    if (patientData.catScores[q.id] === null) {
                      alert('Please select a score to continue.');
                      return;
                    }
                    if (catIndex < CAT_QUESTIONS.length - 1) {
                      setCatIndex(prev => prev + 1);
                    } else {
                      setStep(3);
                    }
                  }}
                  className="bg-primary text-primary-foreground font-semibold py-3 px-8 rounded-md hover:bg-primary/90 transition-colors flex items-center gap-2"
                >
                  Continue <ArrowRight size={20} />
                </button>
              </div>
            </div>
          )}

          {/* STEP 3: VOICE RECORDING */}
          {step === 3 && (
            <div className="flex-1 animate-fade-in flex flex-col">
              <h2 className="text-2xl font-bold text-foreground mb-2">Vocal Biomarker</h2>
              <div className="bg-primary/5 border border-primary/10 p-5 rounded-md mb-8">
                <p className="text-foreground font-medium mb-2">
                  <strong>Voice recording guidance:</strong>
                </p>
                <p className="text-foreground">
                  Please produce a long, steady vowel sound (for example, "ahhh") while keeping your mouth about a palm's length away from the microphone.
                </p>
              </div>
              
              <div className="flex-1 flex flex-col items-center justify-center">
                {!patientData.voiceFile ? (
                  <div className="flex flex-col items-center w-full max-w-md bg-muted/30 p-10 rounded-lg border-2 border-dashed border-muted">
                    
                    {!isRecording && !isPreparing && (
                      <div className="w-full mb-8">
                        <label className="flex items-start p-4 bg-white rounded-md border border-muted cursor-pointer hover:bg-muted transition-colors shadow-sm">
                          <input
                            type="checkbox"
                            checked={consentGiven}
                            onChange={(e) => setConsentGiven(e.target.checked)}
                            className="mt-1 w-5 h-5 text-primary rounded border-muted focus:ring-primary"
                          />
                          <span className="ml-3 text-sm text-muted-foreground leading-relaxed font-medium">
                            I consent to the collection and processing of my voice recording for medical analysis purposes.
                          </span>
                        </label>
                      </div>
                    )}

                    {isPreparing ? (
                      <>
                        <div className="w-24 h-24 bg-primary/10 rounded-md flex items-center justify-center mb-6 shadow-inner">
                          <span className="text-4xl font-black text-primary">{countdown}</span>
                        </div>
                        <p className="text-xl text-center text-foreground font-bold mb-2">Get ready...</p>
                        <p className="text-center text-muted-foreground mb-8 font-medium">Take a deep breath now.</p>
                      </>
                    ) : isRecording ? (
                      <>
                        <div className="w-24 h-24 bg-red-100 rounded-md flex items-center justify-center mb-6 animate-pulse shadow-inner">
                          <Mic className="w-10 h-10 text-red-600" />
                        </div>
                        <div className="text-4xl font-mono font-bold text-foreground mb-2">
                          00:{recordingDuration.toString().padStart(2, '0')}
                        </div>
                        <p className="text-sm mb-4 font-medium text-muted-foreground">
                          Recording... {Math.max(0, 6 - recordingDuration)}s remaining
                        </p>
                        <div className="w-full h-3 bg-slate-200 rounded-md overflow-hidden mb-6 shadow-inner">
                          <div 
                            className="h-full bg-red-500 transition-all duration-1000 ease-linear"
                            style={{ width: `${Math.min(100, (recordingDuration / 6) * 100)}%` }}
                          />
                        </div>
                      </>
                    ) : (
                      <>
                        <div className="w-24 h-24 bg-white rounded-md flex items-center justify-center mb-6 shadow-sm border border-muted/50">
                          <Mic className={`w-10 h-10 ${consentGiven ? 'text-primary' : 'text-muted-foreground/40'}`} />
                        </div>
                        <p className="text-center text-muted-foreground mb-8 font-medium">Ready to record</p>
                        <button 
                          onClick={startRecording}
                          disabled={!consentGiven}
                          className="w-full bg-primary text-primary-foreground font-bold py-4 px-8 rounded-md hover:bg-primary/90 transition-colors text-lg flex items-center justify-center gap-2 shadow-sm disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                          <Mic size={24} /> Start Recording
                        </button>
                      </>
                    )}
                    {recordingError && <p className="mt-4 text-red-500 text-sm font-medium bg-red-50 p-3 rounded-lg w-full text-center border border-red-100">{recordingError}</p>}
                  </div>
                ) : (
                  <div className="flex flex-col items-center w-full max-w-md bg-muted/30 p-8 rounded-lg border border-muted">
                    <div className="w-16 h-16 bg-green-100 rounded-md flex items-center justify-center mb-4">
                      <Check className="w-8 h-8 text-green-600" />
                    </div>
                    <h3 className="text-xl font-bold text-foreground mb-2">Recording Successful</h3>
                    <p className="text-muted-foreground mb-6 font-medium">Duration: {recordingDuration} seconds</p>
                    
                    <div className="w-full bg-white p-4 rounded-md border border-muted/50 mb-6 shadow-sm">
                      <audio src={patientData.voiceUrl!} controls className="w-full" />
                    </div>
                    
                    <button 
                      onClick={() => {
                        setVoiceData(null as any, null as any);
                        setRecordingDuration(0);
                      }}
                      className="text-muted-foreground font-medium hover:text-foreground transition-colors"
                    >
                      Retake recording
                    </button>
                  </div>
                )}
              </div>

              <div className="mt-2 flex justify-between pt-6 border-t border-muted/50">
                <button
                  onClick={() => setStep(2)}
                  className="text-muted-foreground font-medium py-3 px-6 rounded-md hover:bg-muted transition-colors"
                >
                  Back
                </button>
                <div className="flex gap-3">
                  {!patientData.voiceFile && (
                    <button
                      onClick={handleSubmit}
                      className="text-primary font-medium py-3 px-6 rounded-md hover:bg-primary/5 transition-colors"
                    >
                      Skip Recording
                    </button>
                  )}
                  <button
                    onClick={handleSubmit}
                    disabled={!patientData.voiceFile}
                    className={`font-semibold py-3 px-8 rounded-md transition-colors flex items-center gap-2 shadow-sm ${
                      patientData.voiceFile
                        ? 'bg-green-600 text-white hover:bg-green-700'
                        : 'bg-slate-200 text-muted-foreground cursor-not-allowed'
                    }`}
                  >
                    Submit Questionnaire <Check size={20} />
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* STEP 4: PROCESSING & TRANSITION */}
          {step === 4 && (
            <div className="flex-1 animate-fade-in flex flex-col items-center justify-center text-center">
              {isSubmitting ? (
                <>
                  <Loader2 className="w-16 h-16 text-primary animate-spin mb-6" />
                  <h2 className="text-2xl font-bold text-foreground mb-2">Submitting Questionnaire...</h2>
                  <p className="text-muted-foreground">Securely sending your responses to your care team.</p>
                </>
              ) : (
                <>
                  <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mb-6">
                    <Check className="w-10 h-10 text-green-600" />
                  </div>
                  <h2 className="text-3xl font-bold text-foreground mb-4">Questionnaire Submitted</h2>
                  <p className="text-lg text-muted-foreground mb-10 max-w-md">
                    Thank you. Your responses have been successfully sent and will be reviewed by your clinician prior to your appointment.
                  </p>
                  
                  <button
                    onClick={() => navigate('/clinician')}
                    className="bg-slate-900 text-white font-bold py-4 px-10 rounded-xl hover:bg-slate-800 transition-all shadow-lg hover:shadow-xl flex items-center gap-3 text-lg"
                  >
                    Move to Clinician View (Demo) <ArrowRight className="w-6 h-6" />
                  </button>
                </>
              )}
            </div>
          )}

        </div>
      </div>
    </div>
  );
}
