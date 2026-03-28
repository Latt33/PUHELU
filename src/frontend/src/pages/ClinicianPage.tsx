import { useDemoStore } from '../store/demoStore';
import { Link } from 'react-router-dom';
import { ArrowLeft, Mic, Stethoscope, ClipboardList, AlertCircle, Activity, BrainCircuit } from 'lucide-react';
import { AppHeader } from '../components/AppHeader';
import { useState } from 'react';
import mockPatientData from '../assets/mockData.json';
import exampleMel from '../assets/example_mel.png';

const CAT_LABELS: Record<string, string> = {
  cat_cough: 'Cough',
  cat_phlegm: 'Phlegm',
  cat_chest_tightness: 'Chest tightness',
  cat_breathlessness: 'Breathlessness',
  cat_activities: 'Activities at home',
  cat_confidence: 'Confidence leaving home',
  cat_sleep: 'Sleep',
  cat_energy: 'Energy',
};

export function ClinicianPage() {
  const { patientData } = useDemoStore();
  const [showMockData, setShowMockData] = useState(false);

  const dataToDisplay = showMockData ? mockPatientData : patientData;

  // If there's no real data and we're not showing mock data, show the options page
  if (!patientData.clinicalResult && !patientData.voiceResult && !showMockData) {
    return (
      <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center p-8 text-center">
        <div className="max-w-md">
            <Stethoscope className="w-16 h-16 text-blue-500 mx-auto mb-6"/>
            <h2 className="text-3xl font-black text-slate-800 mb-4">Clinician Dashboard</h2>
            <p className="text-slate-600 mb-8">
            No active patient data found. To view this dashboard, you can either go through the patient intake process or load a sample high-risk patient profile.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
                to="/demo"
                className="w-full sm:w-auto flex-1 bg-blue-600 text-white font-bold py-3 px-6 rounded-xl hover:bg-blue-700 transition-colors shadow-sm"
            >
                Go to Patient Intake
            </Link>
            <button
                onClick={() => setShowMockData(true)}
                className="w-full sm:w-auto flex-1 bg-white text-slate-700 font-bold py-3 px-6 rounded-xl hover:bg-slate-100 transition-colors border border-slate-300 shadow-sm"
            >
                View Mock Data
            </button>
            </div>
            <Link to="/" className="text-slate-500 hover:text-slate-800 mt-8 inline-block font-medium">
                Back to Main Page
            </Link>
        </div>
      </div>
    );
  }

  const { symptoms, otherSymptom, catScores, clinicalResult, voiceResult } = dataToDisplay;
  const totalCatScore = Object.values(catScores).reduce((sum, val) => (sum || 0) + (val || 0), 0) as number;

  const certaintyScore = voiceResult?.risk_score 
    ? Math.round(100 - (voiceResult.risk_score))
    : 85;

  const getCombinedRisk = () => {
    if (!clinicalResult) return 'Unknown';
    if (!voiceResult) return `${clinicalResult.risk_level} (Clinical Only)`;
    const isClinicalHigh = clinicalResult.risk_level.toLowerCase().includes('high') || clinicalResult.risk_group === 'C' || clinicalResult.risk_group === 'D';
    const isVoiceHigh = voiceResult.risk_score >= 60;
    if (isClinicalHigh && isVoiceHigh) return 'Critical Risk';
    if (isClinicalHigh || isVoiceHigh) return 'Elevated Risk';
    return 'Low/Stable';
  };

  const getRiskColor = (risk: string) => {
    const l = risk.toLowerCase();
    if (l.includes('critical') || l.includes('high')) return 'text-red-800 bg-red-100 border-red-300 shadow-sm';
    if (l.includes('elevated') || l.includes('moderate')) return 'text-amber-800 bg-amber-100 border-amber-300 shadow-sm';
    return 'text-green-800 bg-green-100 border-green-300 shadow-sm';
  };

  const getCatScoreIndicator = (score: number) => {
    if (score > 20) {
        return {
            text: 'High Symptom Burden',
            className: 'bg-red-100 text-red-800'
        };
    }
    if (score >= 10) {
        return {
            text: 'Medium Symptom Burden',
            className: 'bg-amber-100 text-amber-800'
        };
    }
    return {
        text: 'Low Symptom Burden',
        className: 'bg-green-100 text-green-800'
    };
  };

  const catIndicator = getCatScoreIndicator(totalCatScore);

  const aiRisk = voiceResult?.risk_score ?? null;
  const aiContainerClass = aiRisk === null
    ? 'bg-slate-50 p-5 rounded-xl border border-slate-200 shadow-sm flex flex-col justify-center'
    : aiRisk >= 90
      ? 'bg-red-50 p-5 rounded-xl border-2 border-red-200 shadow-sm flex flex-col justify-center'
      : aiRisk > 80
        ? 'bg-amber-50 p-5 rounded-xl border-2 border-amber-200 shadow-sm flex flex-col justify-center'
        : 'bg-slate-50 p-5 rounded-xl border border-slate-200 shadow-sm flex flex-col justify-center';

  const aiNumberClass = aiRisk === null
    ? 'text-slate-900 text-4xl font-black'
    : aiRisk >= 90
      ? 'text-red-700 text-4xl font-black'
      : aiRisk > 80
        ? 'text-amber-700 text-4xl font-black'
        : 'text-slate-900 text-4xl font-black';

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 p-4 sm:p-8 pb-32 relative">
      <AppHeader />
      <div className="max-w-6xl mx-auto space-y-12">
        
        {/* Header */}
        <div className="flex items-center justify-between pb-6 border-b-2 border-slate-200">
          <div className="flex items-center gap-4">
            <Link to="/demo" className="p-2 hover:bg-slate-200 rounded-lg transition-colors text-slate-600">
              <ArrowLeft className="w-5 h-5" />
            </Link>
            <div>
              <h1 className="text-4xl font-black tracking-tight flex items-center gap-3 text-slate-900">
                <Stethoscope className="text-blue-600 w-10 h-10" /> Clinician Dashboard
              </h1>
              <p className="text-base text-slate-600 font-medium mt-1">Patient ID: #8492-B • Pre-appointment screening</p>
            </div>
          </div>
        </div>

        {/* SECTION 1: Questionnaire Assessment */}
        <section>
          <div className="mb-6">
            <h2 className="text-2xl font-black text-slate-900">
              1. Patient Reported Assessment
            </h2>
            <p className="text-base text-slate-600 font-medium ml-0">Based on the pre-appointment digital intake questionnaire.</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 ml-10">
            {/* Symptoms */}
            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex flex-col">
              <h3 className="text-sm font-black text-slate-900 uppercase tracking-wider mb-5 flex items-center gap-2"><Activity className="w-5 h-5"/> Reported Symptoms</h3>
              <ul className="space-y-3 flex-1 overflow-y-auto max-h-[250px] pr-2 custom-scrollbar">
                {symptoms.length === 0 && !otherSymptom && (
                  <li className="text-slate-400 text-base italic">No symptoms reported.</li>
                )}
                {symptoms.map(s => (
                  <li key={s} className="flex items-start text-lg font-bold text-slate-800">
                    <span className="text-red-500 mr-3 text-xl leading-none">•</span> {s}
                  </li>
                ))}
                {otherSymptom && (
                  <li className="flex items-start text-lg font-bold text-slate-800">
                    <span className="text-red-500 mr-3 text-xl leading-none">•</span> {otherSymptom} <span className="text-slate-400 font-medium text-sm ml-2">(Other)</span>
                  </li>
                )}
              </ul>
            </div>

            {/* CAT Breakdown */}
            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex flex-col">
              <h3 className="text-sm font-black text-slate-900 uppercase tracking-wider mb-5">CAT Answers</h3>
              <div className="grid grid-cols-1 gap-3 overflow-y-auto max-h-[250px] pr-2 custom-scrollbar">
                {Object.entries(catScores).map(([key, score]) => (
                  <div key={key} className="flex justify-between items-center text-base border-b border-slate-100 pb-2 last:border-0">
                    <span className="text-slate-700 font-semibold">{CAT_LABELS[key] || key}</span>
                    <span className={`font-black px-3 py-1 rounded-md ${(score || 0) >= 3 ? 'bg-amber-100 text-amber-800' : 'bg-slate-100 text-slate-700'}`}>
                      {score || 0}/5
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* CAT Total */}
            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex flex-col items-center justify-center text-center">
              <h3 className="text-sm font-black text-slate-900 uppercase tracking-wider mb-4">Total CAT Score</h3>
              <div className="text-7xl font-black text-slate-900 tracking-tighter mb-4">
                {totalCatScore}<span className="text-3xl text-slate-400 font-semibold tracking-normal">/40</span>
              </div>
              <p className={`text-base font-bold px-4 py-1.5 rounded-full ${catIndicator.className}`}>
                {catIndicator.text}
              </p>
            </div>
          </div>
        </section>

        {/* SECTION 2: Vocal Biomarker Analysis */}
        <section>
          <div className="mb-6">
            <h2 className="text-2xl font-black text-slate-900">
              2. Vocal Biomarker Analysis
            </h2>
            <p className="text-base text-slate-600 font-medium ml-0">AI-driven acoustic feature extraction from the patient's voice sample.</p>
          </div>

          <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-8 ml-10 relative overflow-hidden">
            <div className="absolute top-0 right-0 p-32 bg-blue-50/50 rounded-full blur-3xl -mr-16 -mt-16 pointer-events-none"></div>

            {!voiceResult ? (
              <div className="flex flex-col items-center justify-center relative z-10 opacity-80 border-2 border-dashed border-slate-300 rounded-xl p-10 bg-slate-50">
                <Mic className="w-16 h-16 text-slate-400 mb-4" />
                <p className="text-slate-600 text-center text-lg font-bold">
                  Patient opted out of providing a voice sample for this assessment.
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 relative z-10">
                {/* Left Column: Voice Scores & Details */}
                <div className="lg:col-span-4 flex flex-col gap-6">
                  {/* Scores side-by-side on desktop */}
                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-slate-50 p-5 rounded-xl border border-slate-200 shadow-sm flex flex-col justify-center">
                      <div className="text-slate-900 text-xs font-black mb-1 uppercase tracking-wider">Certainty Score</div>
                      <div className="text-4xl font-black text-blue-700">{certaintyScore}%</div>
                      <div className="text-sm text-slate-500 mt-1 font-semibold">AI Confidence</div>
                    </div>
                    <div className={aiContainerClass}>
                      <div className="text-slate-900 text-xs font-black mb-1 uppercase tracking-wider">Acoustic Risk</div>
                      <div className={aiNumberClass}>{voiceResult?.risk_score || 0}/100</div>
                      <div className={`text-sm mt-1 font-bold ${aiRisk === null ? 'text-slate-600' : (aiRisk >= 90 ? 'text-red-600' : aiRisk > 80 ? 'text-amber-600' : 'text-slate-600')}`}>Anomaly detected</div>
                    </div>
                  </div>

                  {/* Details block */}
                  <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm space-y-4">
                    <div className="flex justify-between items-center pb-3 border-b border-slate-100">
                      <span className="text-sm font-semibold text-slate-600">Max Phonation Time</span>
                      <span className="text-base font-black text-slate-900">{voiceResult?.mpt ? `${voiceResult.mpt}s` : 'N/A'}</span>
                    </div>
                    <div className="flex justify-between items-center pb-3 border-b border-slate-100">
                      <span className="text-sm font-semibold text-slate-600">Jitter</span>
                      <span className={`text-xs font-black px-2 py-1 rounded-md uppercase ${voiceResult?.jitter_status?.includes('Elevated') ? 'bg-red-600 text-white shadow-sm' : 'bg-slate-100 text-slate-700 border border-slate-200'}`}>
                        {voiceResult?.jitter_status || 'Unknown'}
                      </span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-semibold text-slate-600">Shimmer</span>
                      <span className={`text-xs font-black px-2 py-1 rounded-md uppercase ${voiceResult?.shimmer_status?.includes('Elevated') ? 'bg-red-600 text-white shadow-sm' : 'bg-slate-100 text-slate-700 border border-slate-200'}`}>
                        {voiceResult?.shimmer_status || 'Unknown'}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Right Column: Spectrogram (Much Larger) */}
                <div className="lg:col-span-8 flex flex-col h-full">
                  {voiceResult?.spectrogram_base64 ? (
                    <div className="w-full h-full min-h-[400px] bg-white rounded-xl border border-slate-300 shadow-sm p-2 flex items-center justify-center">
                      <img
                        src={`data:image/png;base64,${voiceResult.spectrogram_base64}`}
                        alt="Voice Spectrogram"
                        className="w-full h-auto object-contain"
                      />
                    </div>
                  ) : showMockData ? (
                    <div className="w-full h-full min-h-[400px] bg-white rounded-xl border border-slate-300 shadow-sm p-2 flex items-center justify-center">
                      <img
                        src={exampleMel}
                        alt="Mock Mel Spectrogram"
                        className="w-full h-auto object-contain"
                      />
                    </div>
                  ) : (
                    <div className="w-full h-full min-h-[400px] border-2 border-slate-200 border-dashed rounded-xl flex items-center justify-center text-slate-400 text-base font-semibold bg-slate-50">
                      Spectrogram data not available
                    </div>
                  )}
                </div>

                {/* AI Model Description */}
                <div className="lg:col-span-12 mt-2 bg-blue-50/50 p-4 rounded-xl border border-blue-100 flex items-start gap-4">
                  <BrainCircuit className="w-6 h-6 text-blue-600 shrink-0 mt-0.5" />
                  <p className="text-sm text-blue-900 font-medium leading-relaxed">
                    <strong>Vocal Analysis Model:</strong> This acoustic biomarker evaluation utilizes a specialized neural network trained on clinical respiratory voice samples. It analyzes micro-variations in vocal cord vibration (jitter/shimmer) and pulmonary capacity (MPT) to identify patterns strongly correlated with chronic obstructive pulmonary disease (COPD) and other restrictive airway conditions.
                  </p>
                </div>
              </div>
            )}
          </div>
        </section>

        {/* SECTION 3: Comprehensive Overview */}
        <section className="pt-8">
          <div className="mb-6">
            <h2 className="text-2xl font-black text-slate-900">
              3. Final Evaluation & Recommendations
            </h2>
            <p className="text-base text-slate-600 font-medium ml-0">Holistic overview combining patient reports and acoustic biomarkers.</p>
          </div>

          <div className="ml-10">
            {/* The 3 specific risk boxes */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <div className="p-5 bg-slate-50 rounded-2xl border border-slate-200 shadow-sm flex flex-col justify-between">
                <div>
                  <div className="text-xs font-black text-slate-900 uppercase tracking-wider mb-2">Clinical Form Risk</div>
                  <div className="text-2xl font-black text-slate-900">{clinicalResult?.risk_level || "Unknown"}</div>
                </div>
                <div className="text-base text-slate-600 mt-4 font-semibold">
                  GOLD Group {clinicalResult?.risk_group || "?"}
                </div>
              </div>

              <div className="p-5 bg-slate-50 rounded-2xl border border-slate-200 shadow-sm flex flex-col justify-between">
                <div>
                  <div className="text-xs font-black text-slate-900 uppercase tracking-wider mb-2">Acoustic Biomarker Risk</div>
                  <div className="text-2xl font-black text-slate-900">
                    {!voiceResult ? "Not Assessed" : (voiceResult.risk_score >= 60 ? "Elevated" : "Low/Normal")}
                  </div>
                </div>
                <div className="text-base text-slate-600 mt-4 font-semibold">
                  {voiceResult ? "AI Risk Score: " + voiceResult.risk_score + "/100" : "No voice sample"}
                </div>
              </div>

              <div className={`p-5 rounded-2xl border-2 flex flex-col justify-between shadow-sm ${getRiskColor(getCombinedRisk())}`}>
                <div>
                  <div className="text-xs font-black uppercase text-slate-900 tracking-wider mb-2">Combined Assessment Risk</div>
                  <div className="text-2xl font-black">{getCombinedRisk()}</div> 
                </div>
                {getCombinedRisk().includes('Risk') && (
                  <div className="text-base mt-4 font-bold border-t border-black/10 pt-3 opacity-90">
                    Recommending spirometry
                  </div>
                )}
              </div>
            </div>

          </div>
        </section>

      </div>
    </div>
  );
}
