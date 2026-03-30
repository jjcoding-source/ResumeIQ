import { motion } from 'framer-motion'

export default function ParsedPreview({ meta }) {
  if (!meta) return null

  const rows = [
    { label: 'Name', value: meta.name || 'Not detected' },
    { label: 'Experience', value: meta.experience || 'Not detected' },
    { label: 'Skills detected', value: meta.skills?.join(', ') || 'None' },
    { label: 'Education', value: meta.education || 'Not detected' },
    { label: 'Sections found', value: `${meta.sectionsFound} of ${meta.totalSections}` },
  ]

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-emerald-500/5 border border-emerald-500/20 rounded-2xl p-5"
    >
      <div className="flex items-center gap-2 mb-4">
        <span className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse" />
        <span className="text-sm font-medium text-emerald-400">Resume parsed successfully</span>
      </div>
      <div className="flex flex-col gap-1">
        {rows.map((r) => (
          <div key={r.label} className="flex justify-between py-2 border-b border-white/[0.04] last:border-0">
            <span className="text-xs text-white/40">{r.label}</span>
            <span className="text-xs text-white font-medium text-right max-w-[60%] truncate">{r.value}</span>
          </div>
        ))}
      </div>
    </motion.div>
  )
}