import React from 'react';
import { PatientForm } from './features/patient-intake/PatientForm';
import { VoiceUploader } from './features/voice-analysis/VoiceUploader';

function App() {
  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <header className="mb-10 text-center">
          <h1 className="text-4xl font-black tracking-tight text-slate-900 mb-3">
            🫁 DASH Clinical Platform
          </h1>
          <p className="mt-2 text-base text-slate-600 max-w-2xl mx-auto">
            Comprehensive respiratory assessment combining standard GOLD clinical guidelines with AI-driven vocal biomarker analysis.
          </p>
        </header>

        <main className="space-y-12 animate-fade-in transition-all duration-300">
          <section id="clinical-assessment">
            <div className="flex items-center mb-4">
              <span className="flex items-center justify-center w-8 h-8 rounded-full bg-blue-600 text-white font-bold text-sm mr-3">1</span>
              <h2 className="text-xl font-bold text-slate-800">Clinical Assessment</h2>
            </div>
            <PatientForm />
          </section>

          <section id="voice-analysis">
            <div className="flex items-center mb-4">
              <span className="flex items-center justify-center w-8 h-8 rounded-full bg-blue-600 text-white font-bold text-sm mr-3">2</span>
              <h2 className="text-xl font-bold text-slate-800">Vocal Biomarker Analysis</h2>
            </div>
            <VoiceUploader />
          </section>
        </main>
      </div>
    </div>
  );
}

export default App;
