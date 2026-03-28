import { create } from 'zustand';

export interface PatientData {
  symptoms: string[];
  otherSymptom: string;
  catScores: Record<string, number | null>;
  voiceFile: File | null;
  voiceUrl: string | null;
  clinicalResult: any | null;
  voiceResult: any | null;
}

interface DemoStore {
  patientData: PatientData;
  setSymptoms: (symptoms: string[]) => void;
  setOtherSymptom: (symptom: string) => void;
  setCatScore: (questionId: string, score: number) => void;
  setVoiceData: (file: File, url: string) => void;
  setResults: (clinicalResult: any, voiceResult: any) => void;
  reset: () => void;
}

const initialData: PatientData = {
  symptoms: [],
  otherSymptom: '',
  catScores: {
    cat_cough: null,
    cat_phlegm: null,
    cat_chest_tightness: null,
    cat_breathlessness: null,
    cat_activities: null,
    cat_confidence: null,
    cat_sleep: null,
    cat_energy: null,
  },
  voiceFile: null,
  voiceUrl: null,
  clinicalResult: null,
  voiceResult: null,
};

export const useDemoStore = create<DemoStore>((set) => ({
  patientData: initialData,
  setSymptoms: (symptoms) => set((state) => ({ patientData: { ...state.patientData, symptoms } })),
  setOtherSymptom: (otherSymptom) => set((state) => ({ patientData: { ...state.patientData, otherSymptom } })),
  setCatScore: (questionId, score) => set((state) => ({
    patientData: {
      ...state.patientData,
      catScores: { ...state.patientData.catScores, [questionId]: score }
    }
  })),
  setVoiceData: (file, url) => set((state) => ({
    patientData: { ...state.patientData, voiceFile: file, voiceUrl: url }
  })),
  setResults: (clinicalResult, voiceResult) => set((state) => ({
    patientData: { ...state.patientData, clinicalResult, voiceResult }
  })),
  reset: () => set({ patientData: initialData }),
}));
