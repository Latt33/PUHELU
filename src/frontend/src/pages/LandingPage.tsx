import { Link } from 'react-router-dom';
import { Activity, Mic, Stethoscope, ArrowRight } from 'lucide-react';

export function LandingPage() {
  return (
    <div className="min-h-screen bg-slate-50 flex flex-col justify-center items-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl w-full text-center space-y-8">
        <header className="space-y-4">
          <div className="inline-flex items-center justify-center p-4 bg-blue-100 rounded-md mb-4 shadow-sm">
            <Activity className="h-12 w-12 text-blue-600" />
          </div>
          <h1 className="text-5xl font-black tracking-tight text-slate-900">
            DASH Clinical Platform
          </h1>
          <p className="text-xl text-slate-800 max-w-2xl mx-auto leading-relaxed">
            A comprehensive respiratory assessment tool combining standard GOLD clinical guidelines with cutting-edge AI-driven vocal biomarker analysis.
          </p>
        </header>

        <div className="grid md:grid-cols-2 gap-8 max-w-3xl mx-auto pt-8">
          <div className="bg-white p-6 rounded-lg shadow-sm border border-slate-100 flex flex-col items-center text-center space-y-3 transition-transform hover:-translate-y-1 hover:shadow-md duration-300">
            <div className="bg-slate-50 p-3 rounded-md mb-2">
              <Stethoscope className="h-8 w-8 text-slate-700" />
            </div>
            <h3 className="font-bold text-lg text-slate-900">Clinical Assessment</h3>
            <p className="text-slate-800 text-sm">Standardized patient intake forms based on validated COPD diagnostic criteria and clinical guidelines.</p>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-sm border border-slate-100 flex flex-col items-center text-center space-y-3 transition-transform hover:-translate-y-1 hover:shadow-md duration-300">
            <div className="bg-slate-50 p-3 rounded-md mb-2">
              <Mic className="h-8 w-8 text-blue-600" />
            </div>
            <h3 className="font-bold text-lg text-slate-900">Vocal Biomarkers</h3>
            <p className="text-slate-800 text-sm">Advanced audio analysis of patient voice recordings to detect respiratory patterns and potential anomalies.</p>
          </div>
        </div>

        <div className="pt-12">
          <Link 
            to="/demo" 
            className="inline-flex items-center justify-center px-8 py-4 text-lg font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 transition-all shadow-md hover:shadow-lg hover:-translate-y-0.5"
          >
            Try the Interactive Demo
            <ArrowRight className="ml-2 h-5 w-5" />
          </Link>
        </div>
        
        <footer className="pt-16 text-sm text-slate-700">
          <p>© {new Date().getFullYear()} DASH Health. Prototype built for demonstration purposes.</p>
        </footer>
      </div>
    </div>
  );
}
