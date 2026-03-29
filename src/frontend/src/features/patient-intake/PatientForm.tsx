import React, { useState, useEffect } from 'react';
import { apiClient } from '../../api/client';
import { RiskFlag } from './RiskFlag';

interface PatientFormData {
  age: number | '';
  cat_cough: number | '';
  cat_phlegm: number | '';
  cat_chest_tightness: number | '';
  cat_breathlessness: number | '';
  cat_activities: number | '';
  cat_confidence: number | '';
  cat_sleep: number | '';
  cat_energy: number | '';
  exacerbations_past_year: number | '';
  hospitalized_past_year: boolean;
  smoker_recent: boolean;
}

interface RiskResponse {
  risk_group: string;
  risk_level: string;
  recommended_action: string;
}

const CAT_QUESTIONS = [
  { id: 'cat_cough', label: 'Cough', minLabel: 'I never cough', maxLabel: 'I cough all the time' },
  { id: 'cat_phlegm', label: 'Phlegm (mucus)', minLabel: 'No phlegm at all', maxLabel: 'Chest completely full' },
  { id: 'cat_chest_tightness', label: 'Chest tightness', minLabel: 'Not tight at all', maxLabel: 'Very tight' },
  { id: 'cat_breathlessness', label: 'Breathlessness (walking up hill/stairs)', minLabel: 'Not breathless', maxLabel: 'Very breathless' },
  { id: 'cat_activities', label: 'Activities at home', minLabel: 'Not limited at all', maxLabel: 'Very limited' },
  { id: 'cat_confidence', label: 'Confidence leaving home', minLabel: 'Very confident', maxLabel: 'Not at all confident' },
  { id: 'cat_sleep', label: 'Sleep', minLabel: 'Sleep soundly', maxLabel: 'Do not sleep soundly' },
  { id: 'cat_energy', label: 'Energy', minLabel: 'Lots of energy', maxLabel: 'No energy at all' },
] as const;

export const PatientForm: React.FC = () => {
  const [formData, setFormData] = useState<PatientFormData>({
    age: '',
    cat_cough: '',
    cat_phlegm: '',
    cat_chest_tightness: '',
    cat_breathlessness: '',
    cat_activities: '',
    cat_confidence: '',
    cat_sleep: '',
    cat_energy: '',
    exacerbations_past_year: '',
    hospitalized_past_year: false,
    smoker_recent: false,
  });
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | ''>('');
  const [result, setResult] = useState<RiskResponse | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setResult(null);

    try {
      const response = await apiClient.post<RiskResponse>('/analyze-patient', {
        age: Number(formData.age),
        cat_cough: Number(formData.cat_cough),
        cat_phlegm: Number(formData.cat_phlegm),
        cat_chest_tightness: Number(formData.cat_chest_tightness),
        cat_breathlessness: Number(formData.cat_breathlessness),
        cat_activities: Number(formData.cat_activities),
        cat_confidence: Number(formData.cat_confidence),
        cat_sleep: Number(formData.cat_sleep),
        cat_energy: Number(formData.cat_energy),
        exacerbations_past_year: Number(formData.exacerbations_past_year),
        hospitalized_past_year: formData.hospitalized_past_year,
        smoker_recent: formData.smoker_recent,
      });
      setResult(response.data);
    } catch (err: any) {
      setError(
        err.response?.data?.detail?.[0]?.msg || 
        'Failed to analyze patient risk. Please ensure the FastAPI backend is running.'
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const q = CAT_QUESTIONS[currentQuestionIndex];
    const existing = formData[q.id as keyof PatientFormData];
    setSelectedAnswer(existing === '' ? '' : Number(existing));
  }, [currentQuestionIndex, formData]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    const checked = type === 'checkbox' ? (e.target as HTMLInputElement).checked : undefined;
    let newValue: any = value;
    if (type === 'checkbox') newValue = checked;
    if (type === 'radio') newValue = Number(value);
    setFormData((prev) => ({
      ...prev,
      [name]: newValue,
    }));
  };

  const nextEnabled = selectedAnswer !== '';

  return (
    <div className="max-w-4xl mx-auto p-8 bg-white rounded-lg shadow-sm border border-slate-200">
      <h2 className="text-2xl font-semibold text-slate-800 mb-6 border-b border-slate-100 pb-4">CAT & Clinical Assessment</h2>
      
      <form onSubmit={handleSubmit} className="space-y-8">
        {/* Basic Info */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div>
            <label className="block text-sm font-medium text-slate-800 mb-2">Age</label>
            <input
              type="number"
              name="age"
              required
              min="0"
              className="w-full rounded-md border border-slate-300 p-2.5 text-slate-900 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
              value={formData.age}
              onChange={handleChange}
              placeholder="e.g. 65"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-800 mb-2">Exacerbations (Past Year)</label>
            <input
              type="number"
              name="exacerbations_past_year"
              required
              min="0"
              className="w-full rounded-md border border-slate-300 p-2.5 text-slate-900 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
              value={formData.exacerbations_past_year}
              onChange={handleChange}
              placeholder="e.g. 1"
            />
          </div>

          <div className="flex items-center h-full pt-7">
            <label className="flex items-center space-x-3 cursor-pointer group">
              <input
                type="checkbox"
                name="hospitalized_past_year"
                className="w-5 h-5 rounded border-slate-300 text-blue-600 focus:ring-blue-500 transition-colors cursor-pointer"
                checked={formData.hospitalized_past_year}
                onChange={handleChange}
              />
              <span className="text-sm font-medium text-slate-800 group-hover:text-slate-900 transition-colors">Hospitalized for COPD?</span>
            </label>
          </div>
        </div>

        {/* Smoking status */}
        <div className="flex items-center">
          <label className="flex items-center space-x-3 cursor-pointer group">
            <input
              type="checkbox"
              name="smoker_recent"
              className="w-5 h-5 rounded border-slate-300 text-blue-600 focus:ring-blue-500 transition-colors cursor-pointer"
              checked={formData.smoker_recent}
              onChange={handleChange}
            />
            <span className="text-sm font-medium text-slate-800 group-hover:text-slate-900 transition-colors">Smoker (at least one cigarette in the past two weeks)</span>
          </label>
        </div>

        {/* Single-question flow (neutral assessment) */}
        <div className="bg-slate-50 p-6 rounded-lg border border-slate-200">
          <div className="mb-4">
            <h3 className="text-lg font-semibold text-slate-800">Assessment</h3>
          </div>
          <p className="text-sm text-slate-700 mb-6">Answer the question below, then continue to the next.</p>

          <div className="space-y-6">
            {(() => {
              const q = CAT_QUESTIONS[currentQuestionIndex];
              return (
                <div key={q.id} className="border-b border-slate-200 pb-4 last:border-0 last:pb-0">
                  <div className="text-sm font-semibold text-slate-700 mb-3 text-center">{q.label}</div>
                  <div className="flex justify-between text-xs text-slate-600 mb-3">
                    <span>{q.minLabel} (0)</span>
                    <span>{q.maxLabel} (5)</span>
                  </div>

                  <div className="flex justify-center gap-3">
                    {[0,1,2,3,4,5].map((i) => (
                      <label
                        key={i}
                        className="flex flex-col items-center cursor-pointer"
                        onClick={(e) => { e.stopPropagation(); }}
                      >
                        <input
                          type="radio"
                          name={q.id}
                          value={String(i)}
                          checked={selectedAnswer === i}
                          onChange={() => setSelectedAnswer(i)}
                          onKeyDown={(e) => { if (e.key === 'Enter') e.preventDefault(); }}
                          className="peer hidden"
                        />
                        <div className="w-10 h-10 rounded-full flex items-center justify-center border border-slate-300 peer-checked:bg-blue-600 peer-checked:text-white">{i}</div>
                      </label>
                    ))}
                  </div>

                    <div className="flex justify-between mt-4">
                    <button
                      type="button"
                      onClick={() => setCurrentQuestionIndex((p) => Math.max(0, p - 1))}
                      disabled={currentQuestionIndex === 0}
                      className="px-3 py-2 rounded-md border disabled:opacity-50"
                    >
                      Back
                    </button>

                    <button
                      type="button"
                      onClick={() => {
                        // commit selected answer to formData, then advance
                        setFormData((prev) => ({
                          ...prev,
                          [q.id]: selectedAnswer === '' ? '' : Number(selectedAnswer),
                        }));
                        setCurrentQuestionIndex((p) => Math.min(CAT_QUESTIONS.length - 1, p + 1));
                      }}
                        disabled={!nextEnabled}
                        className={`${nextEnabled ? 'px-3 py-2 rounded-md bg-blue-600 text-white' : 'px-3 py-2 rounded-md bg-slate-300 text-slate-700 cursor-not-allowed'}`}
                    >
                      Next
                    </button>
                  </div>
                </div>
              );
            })()}
          </div>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-blue-600 text-white font-semibold py-3 px-4 rounded-md hover:bg-blue-700 transition-colors disabled:opacity-70 disabled:cursor-not-allowed mt-4 shadow-sm"
        >
          {loading ? 'Analyzing...' : 'Analyze Risk'}
        </button>
      </form>

      {error && (
        <div className="mt-6 p-4 rounded-md bg-red-50 border border-red-200">
          <p className="text-red-600 text-sm font-medium">{error}</p>
        </div>
      )}
      
      {result && (
        <RiskFlag 
          riskGroup={result.risk_group} 
          riskLevel={result.risk_level} 
          recommendedAction={result.recommended_action} 
        />
      )}
    </div>
  );
};
