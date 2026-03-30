import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import useResumeStore from '../store/useResumeStore'
import ScoreRing from '../components/results/ScoreRing'
import KeywordChips from '../components/results/KeywordChips'
import AIRewriteCard from '../components/results/AIRewriteCard'
import JobMatchPanel from '../components/results/JobMatchPanel'
import InterviewQs from '../components/results/InterviewQs'
import Button from '../components/common/Button'
import Loader from '../components/common/Loader'

const TABS = ['keywords', 'rewrites', 'formatting']

const subScores = (scores = {}) => [
  { label: 'Keywords', value: scores.keywords ?? 0, color: '#a78bfa' },
  { label: 'Format',   value: scores.format ?? 0,   color: '#34d399' },
  { label: 'Skills',   value: scores.skills ?? 0,   color: '#fbbf24' },
  { label: 'Clarity',  value: scores.clarity ?? 0,  color: '#60a5fa' },
]

export default function ResultsPage() {
  const navigate = useNavigate()
  const { analysisResult, isAnalyzing, activeTab, setActiveTab } = useResumeStore()

  useEffect(() => {
    if (!isAnalyzing && !analysisResult) navigate('/analyze')
  }, [analysisResult, isAnalyzing, navigate])

  if (isAnalyzing || !analysisResult) return <Loader />

  const { atsScore, scores, keywords, rewrites, match, interviewQuestions } = analysisResult

  return (
    <main className="min-h-screen px-6 py-6">
      <div className="grid grid-cols-[240px_1fr_280px] gap-4 max-w-[1280px] mx-auto">

        {/* Left sidebar */}
        <div className="flex flex-col gap-4">
          <div className="bg-white/[0.02] border border-white/[0.07] rounded-2xl p-5">
            <p className="text-[10px] font-bold tracking-widest text-white/30 uppercase mb-3">ATS Score</p>
            <ScoreRing score={atsScore} />
            <div className="flex flex-col gap-2.5 mt-3">
              {subScores(scores).map(s => (
                <div key={s.label} className="flex items-center gap-2">
                  <span className="text-xs text-white/40 w-16">{s.label}</span>
                  <div className="flex-1 h-1 bg-white/[0.06] rounded-full overflow-hidden">
                    <motion.div
                      className="h-full rounded-full"
                      style={{ background: s.color }}
                      initial={{ width: 0 }}
                      animate={{ width: `${s.value}%` }}
                      transition={{ duration: 0.8, ease: 'easeOut' }}
                    />
                  </div>
                  <span className="text-xs font-medium w-8 text-right" style={{ color: s.color }}>{s.value}%</span>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white/[0.02] border border-white/[0.07] rounded-2xl p-5">
            <p className="text-[10px] font-bold tracking-widest text-white/30 uppercase mb-3">Sections</p>
            {[
              { id: 'keywords', label: 'Keywords', badge: `${keywords?.missing?.length ?? 0} missing`, badgeColor: 'text-red-400 bg-red-500/10' },
              { id: 'rewrites', label: 'AI Improvements', badge: `${rewrites?.length ?? 0}`, badgeColor: 'text-violet-400 bg-violet-500/10' },
              { id: 'formatting', label: 'Formatting', badge: 'Pass', badgeColor: 'text-emerald-400 bg-emerald-500/10' },
            ].map(s => (
              <button
                key={s.id}
                onClick={() => setActiveTab(s.id)}
                className={`w-full flex items-center gap-2 px-3 py-2.5 rounded-xl text-sm transition-all mb-1 ${activeTab === s.id ? 'bg-violet-500/10 text-violet-400' : 'text-white/45 hover:text-white hover:bg-white/4'}`}
              >
                <span className="flex-1 text-left">{s.label}</span>
                <span className={`text-[10px] font-bold px-2 py-0.5 rounded-md ${s.badgeColor}`}>{s.badge}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Center panel */}
        <div className="bg-white/[0.02] border border-white/[0.07] rounded-2xl p-6 overflow-y-auto max-h-[calc(100vh-80px)]">
          <div className="flex gap-2 mb-6 bg-white/[0.03] rounded-xl p-1">
            {TABS.map(t => (
              <button
                key={t}
                onClick={() => setActiveTab(t)}
                className={`flex-1 py-2 rounded-lg text-sm font-medium capitalize transition-all ${activeTab === t ? 'bg-violet-500/15 text-violet-400' : 'text-white/35 hover:text-white/60'}`}
              >
                {t}
              </button>
            ))}
          </div>

          {activeTab === 'keywords' && <KeywordChips keywords={keywords} />}

          {activeTab === 'rewrites' && (
            <div className="flex flex-col gap-4">
              {rewrites?.length > 0
                ? rewrites.map((r, i) => <AIRewriteCard key={i} item={r} />)
                : <p className="text-sm text-white/30 text-center py-10">No improvements needed — great job! 🎉</p>
              }
            </div>
          )}

          {activeTab === 'formatting' && (
            <div className="flex flex-col gap-3">
              {['Single-column layout', 'Consistent fonts detected', 'No tables or graphics', 'Proper section headings', 'Readable font size'].map((check, i) => (
                <div key={i} className="flex items-center gap-3 p-3 bg-emerald-500/4 border border-emerald-500/12 rounded-xl">
                  <span className="text-emerald-400 text-sm">✓</span>
                  <span className="text-sm text-white/70">{check}</span>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Right sidebar */}
        <div className="flex flex-col gap-4">
          <div className="bg-white/[0.02] border border-white/[0.07] rounded-2xl p-5">
            <p className="text-[10px] font-bold tracking-widest text-white/30 uppercase mb-3">Job Match</p>
            <JobMatchPanel match={match} />
          </div>

          <div className="bg-white/[0.02] border border-white/[0.07] rounded-2xl p-5">
            <p className="text-[10px] font-bold tracking-widest text-white/30 uppercase mb-3">Interview Prep</p>
            <InterviewQs questions={interviewQuestions?.slice(0, 4) ?? []} />
            <Button variant="secondary" size="sm" className="w-full mt-3" onClick={() => navigate('/interview')}>
              View all questions →
            </Button>
          </div>

          <Button variant="secondary" size="sm" className="w-full" onClick={() => navigate('/analyze')}>
            ← Analyze another resume
          </Button>
        </div>
      </div>
    </main>
  )
}