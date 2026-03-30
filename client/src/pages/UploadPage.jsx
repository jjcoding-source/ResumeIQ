import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import toast from 'react-hot-toast'
import DropZone from '../components/upload/DropZone'
import ParsedPreview from '../components/upload/ParsedPreview'
import Button from '../components/common/Button'
import useResumeStore from '../store/useResumeStore'
import { uploadResume, analyzeResume } from '../api/resumeApi'

const steps = ['Upload', 'Job Description', 'Analysis', 'Results']

export default function UploadPage() {
  const navigate = useNavigate()
  const {
    resumeFile, setResumeFile,
    resumeText, setResumeText,
    jobDescription, setJobDescription,
    parsedMeta, setParsedMeta,
    setAnalysisResult, isAnalyzing, setIsAnalyzing,
  } = useResumeStore()

  const [isParsing, setIsParsing] = useState(false)

  const handleFileAccepted = async (file) => {
    setResumeFile(file)
    setIsParsing(true)
    try {
      const result = await uploadResume(file)
      setResumeText(result.text)
      setParsedMeta(result.meta)
      toast.success('Resume parsed successfully!')
    } catch {
      toast.error('Failed to parse resume. Please try again.')
    } finally {
      setIsParsing(false)
    }
  }

  const handleAnalyze = async () => {
    if (!resumeText) return toast.error('Please upload your resume first')
    if (!jobDescription.trim()) return toast.error('Please paste the job description')

    setIsAnalyzing(true)
    try {
      const result = await analyzeResume({ resumeText, jobDescription })
      setAnalysisResult(result)
      navigate('/results')
    } catch {
      toast.error('Analysis failed. Please try again.')
    } finally {
      setIsAnalyzing(false)
    }
  }

  const charCount = jobDescription.length
  const charStatus = charCount < 200 ? 'Too short' : charCount < 500 ? 'Good' : 'Optimal'
  const charColor = charCount < 200 ? 'text-red-400' : charCount < 500 ? 'text-yellow-400' : 'text-emerald-400'

  return (
    <main className="min-h-screen px-8 py-8">
      {/* Step indicator */}
      <div className="flex items-center justify-center gap-0 mb-10">
        {steps.map((step, i) => (
          <div key={step} className="flex items-center gap-0">
            <div className={`flex items-center gap-2 text-xs px-4 py-1 ${i === 0 ? 'text-emerald-400' : i === 1 ? 'text-violet-400' : 'text-white/25'}`}>
              <span className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-bold border ${i === 0 ? 'bg-emerald-500/15 border-emerald-500/40 text-emerald-400' : i === 1 ? 'bg-violet-500/15 border-violet-500/40 text-violet-400' : 'border-white/10 text-white/25'}`}>
                {i === 0 ? '✓' : i + 1}
              </span>
              {step}
            </div>
            {i < steps.length - 1 && <div className="w-8 h-px bg-white/[0.06]" />}
          </div>
        ))}
      </div>

      {/* Two-column layout */}
      <div className="grid grid-cols-2 gap-6 max-w-6xl mx-auto">
        {/* Resume upload */}
        <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} className="flex flex-col gap-4">
          <p className="text-xs font-bold tracking-widest text-white/35 uppercase">📄 Your Resume</p>
          <DropZone onFileAccepted={handleFileAccepted} file={resumeFile} />
          {isParsing && (
            <div className="flex items-center gap-2 text-xs text-white/40">
              <span className="w-3 h-3 border border-white/20 border-t-white/60 rounded-full animate-spin" />
              Parsing resume...
            </div>
          )}
          {parsedMeta && !isParsing && <ParsedPreview meta={parsedMeta} />}
        </motion.div>

        {/* Job description */}
        <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="flex flex-col gap-4">
          <p className="text-xs font-bold tracking-widest text-white/35 uppercase">🎯 Job Description</p>
          <textarea
            value={jobDescription}
            onChange={(e) => setJobDescription(e.target.value)}
            placeholder="Paste the full job description here…&#10;&#10;The more detail you include, the more accurate your ATS score and keyword analysis will be."
            className="flex-1 min-h-[320px] bg-white/[0.02] border border-white/[0.08] rounded-2xl p-5 text-sm text-white/80 placeholder-white/20 resize-none outline-none focus:border-blue-400/40 transition-colors leading-relaxed"
          />
          <div className="flex justify-between items-center">
            <p className={`text-xs ${charColor}`}>{charCount} characters · {charStatus}</p>
            <p className="text-xs text-white/25">Tip: Copy directly from LinkedIn or company site</p>
          </div>
          <div className="bg-blue-500/5 border border-blue-500/12 rounded-xl p-3 flex gap-2">
            <span className="text-sm">💡</span>
            <p className="text-xs text-blue-400/70 leading-relaxed">Include the full job description for the most accurate keyword match and ATS score.</p>
          </div>
          <Button size="lg" onClick={handleAnalyze} loading={isAnalyzing} disabled={!resumeText || !jobDescription.trim()} className="w-full">
            Analyze my resume — it&apos;s free →
          </Button>
        </motion.div>
      </div>
    </main>
  )
}