import { motion } from 'framer-motion'

export default function ScoreRing({ score = 0 }) {
  const r = 54
  const circ = 2 * Math.PI * r
  const offset = circ - (score / 100) * circ

  const color = score >= 80 ? '#34d399' : score >= 60 ? '#a78bfa' : '#f87171'
  const label = score >= 80 ? 'Excellent' : score >= 60 ? 'Good' : 'Needs work'

  return (
    <div className="flex flex-col items-center py-4">
      <div className="relative w-36 h-36">
        <svg width="144" height="144" viewBox="0 0 144 144" className="-rotate-90">
          <circle cx="72" cy="72" r={r} fill="none" stroke="rgba(255,255,255,0.05)" strokeWidth="10" />
          <motion.circle
            cx="72" cy="72" r={r}
            fill="none"
            stroke={color}
            strokeWidth="10"
            strokeLinecap="round"
            strokeDasharray={circ}
            initial={{ strokeDashoffset: circ }}
            animate={{ strokeDashoffset: offset }}
            transition={{ duration: 1.2, ease: 'easeOut' }}
          />
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <motion.span
            className="text-4xl font-extrabold leading-none"
            style={{ fontFamily: 'Syne, sans-serif', color }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            {score}
          </motion.span>
          <span className="text-xs text-white/30 mt-0.5">/100</span>
        </div>
      </div>
      <span className="text-xs mt-2 font-medium" style={{ color }}>{label}</span>
    </div>
  )
}