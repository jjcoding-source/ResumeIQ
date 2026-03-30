import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import Button from '../components/common/Button'

const stats = [
  { num: '97%', label: 'ATS Accuracy' },
  { num: '2.4M+', label: 'Resumes Analyzed' },
  { num: '3×', label: 'More Interviews' },
  { num: 'Free', label: 'Always' },
]

const features = [
  { icon: '📊', title: 'ATS Score', desc: 'Instant compatibility score for any applicant tracking system' },
  { icon: '🔍', title: 'Keyword Match', desc: 'Find missing keywords that recruiters and bots look for' },
  { icon: '✨', title: 'AI Rewrite', desc: 'Improve weak bullet points with AI-suggested rewrites' },
  { icon: '🎯', title: 'Job Match %', desc: 'See exactly how well you match the role requirements' },
  { icon: '💬', title: 'Interview Prep', desc: 'Get predicted interview questions based on your profile' },
  { icon: '📄', title: 'Cover Letter', desc: 'Generate a tailored cover letter in one click' },
]

const container = { hidden: {}, show: { transition: { staggerChildren: 0.08 } } }
const item = { hidden: { opacity: 0, y: 20 }, show: { opacity: 1, y: 0 } }

export default function LandingPage() {
  return (
    <main className="min-h-screen">
      {/* Hero */}
      <section className="flex flex-col items-center text-center px-6 pt-24 pb-16 relative overflow-hidden">
        {/* Glow */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-violet-600/8 rounded-full blur-3xl pointer-events-none" />

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
          <div className="inline-flex items-center gap-2 bg-violet-500/10 border border-violet-500/25 rounded-full px-4 py-1.5 text-xs text-violet-400 font-medium mb-7">
            <span className="w-1.5 h-1.5 bg-violet-400 rounded-full animate-pulse" />
            AI-powered · ATS optimizer · Free forever
          </div>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1, duration: 0.6 }}
          className="text-6xl font-extrabold leading-[1.05] tracking-[-2px] max-w-3xl mb-5"
          style={{ fontFamily: 'Syne, sans-serif' }}
        >
          Land interviews{' '}
          <span className="bg-gradient-to-r from-violet-400 via-blue-400 to-emerald-400 bg-clip-text text-transparent">
            10× faster
          </span>{' '}
          with AI analysis
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="text-white/50 text-lg max-w-xl leading-relaxed mb-10"
        >
          Upload your resume, paste a job description, and get your ATS score,
          keyword gaps, and AI-rewritten sentences instantly.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="flex gap-3 mb-16"
        >
          <Link to="/analyze">
            <Button size="lg">Analyze my resume →</Button>
          </Link>
          <Button variant="secondary" size="lg">See sample report</Button>
        </motion.div>

        {/* Stats bar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="flex border border-white/[0.07] rounded-2xl overflow-hidden bg-white/[0.02]"
        >
          {stats.map((s, i) => (
            <div key={i} className="px-10 py-5 text-center border-r border-white/[0.06] last:border-r-0">
              <div className="text-2xl font-bold mb-1" style={{ fontFamily: 'Syne, sans-serif' }}>{s.num}</div>
              <div className="text-xs text-white/40 tracking-widest uppercase">{s.label}</div>
            </div>
          ))}
        </motion.div>
      </section>

      {/* Features */}
      <section id="features" className="px-8 pb-24 max-w-5xl mx-auto">
        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="grid grid-cols-3 gap-4"
        >
          {features.map((f, i) => (
            <motion.div
              key={i}
              variants={item}
              whileHover={{ borderColor: 'rgba(167,139,250,0.25)', background: 'rgba(167,139,250,0.04)' }}
              className="bg-white/[0.02] border border-white/[0.07] rounded-2xl p-6 cursor-default transition-colors"
            >
              <div className="text-3xl mb-4">{f.icon}</div>
              <h3 className="text-sm font-bold mb-2" style={{ fontFamily: 'Syne, sans-serif' }}>{f.title}</h3>
              <p className="text-xs text-white/40 leading-relaxed">{f.desc}</p>
            </motion.div>
          ))}
        </motion.div>
      </section>
    </main>
  )
}