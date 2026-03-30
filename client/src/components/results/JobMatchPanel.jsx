import { motion } from 'framer-motion'

function Bar({ label, value, color }) {
  return (
    <div className="flex flex-col gap-1.5">
      <div className="flex justify-between text-xs">
        <span className="text-white/50">{label}</span>
        <span className="font-medium" style={{ color }}>{value}%</span>
      </div>
      <div className="h-1.5 bg-white/[0.06] rounded-full overflow-hidden">
        <motion.div
          className="h-full rounded-full"
          style={{ background: color }}
          initial={{ width: 0 }}
          animate={{ width: `${value}%` }}
          transition={{ duration: 1, ease: 'easeOut' }}
        />
      </div>
    </div>
  )
}

export default function JobMatchPanel({ match = {} }) {
  const { overall = 0, technical = 0, experience = 0, softSkills = 0, domain = 0 } = match

  const verdict = overall >= 80
    ? { emoji: '🚀', title: 'Strong match', color: '#34d399', msg: 'You are a top candidate for this role.' }
    : overall >= 60
    ? { emoji: '👍', title: 'Good candidate', color: '#a78bfa', msg: 'You meet most requirements. A few tweaks will push you higher.' }
    : { emoji: '⚠️', title: 'Needs work', color: '#f87171', msg: 'Your resume needs significant keyword additions for this role.' }

  return (
    <div className="flex flex-col gap-5">
      <div className="text-center py-3">
        <motion.div
          className="text-5xl font-extrabold mb-1"
          style={{ fontFamily: 'Syne, sans-serif', color: verdict.color }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          {overall}%
        </motion.div>
        <p className="text-xs text-white/35">match with this role</p>
      </div>

      <div className="bg-white/[0.02] border rounded-2xl p-4 text-center" style={{ borderColor: `${verdict.color}25` }}>
        <div className="text-2xl mb-1">{verdict.emoji}</div>
        <p className="text-sm font-semibold mb-1" style={{ color: verdict.color }}>{verdict.title}</p>
        <p className="text-xs text-white/40 leading-relaxed">{verdict.msg}</p>
      </div>

      <div className="flex flex-col gap-3">
        <Bar label="Technical skills" value={technical} color="#34d399" />
        <Bar label="Experience level" value={experience} color="#a78bfa" />
        <Bar label="Soft skills" value={softSkills} color="#fbbf24" />
        <Bar label="Domain knowledge" value={domain} color="#f87171" />
      </div>
    </div>
  )
}