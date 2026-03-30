import { create } from 'zustand'

const useResumeStore = create((set) => ({
  
  resumeFile: null,
  resumeText: '',
  jobDescription: '',
  parsedMeta: null,

  analysisResult: null,
  isAnalyzing: false,
  activeTab: 'keywords',

  setResumeFile: (file) => set({ resumeFile: file }),
  setResumeText: (text) => set({ resumeText: text }),
  setJobDescription: (jd) => set({ jobDescription: jd }),
  setParsedMeta: (meta) => set({ parsedMeta: meta }),
  setAnalysisResult: (result) => set({ analysisResult: result }),
  setIsAnalyzing: (bool) => set({ isAnalyzing: bool }),
  setActiveTab: (tab) => set({ activeTab: tab }),

  reset: () => set({
    resumeFile: null,
    resumeText: '',
    jobDescription: '',
    parsedMeta: null,
    analysisResult: null,
    isAnalyzing: false,
    activeTab: 'keywords',
  }),
}))

export default useResumeStore