import { motion } from 'framer-motion'
import clsx from 'clsx'

const chipStyle = {
  match:   'bg-emerald-500/10 text-emerald-400 border-emerald-500/25',
  missing: 'bg-red-500/8 text-red-400 border-red-500/20',
  partial: 'bg-amber-500/8 text-amber-400 border-amber-500/20',
}

function Chip({ word, type }) {
  return (
    <motion.span
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      whileHover={{ scale: 1.05 }}
      className={clsx('inline-flex items-center px-3 py-1 rounded-full text-xs font-medium border cursor-default', chipStyle[type])}
    >
      {type === 'match' && <span className="mr-1 text-[10px]">✓</span>}
      {type === 'missing' && <span className="mr-1 text-[10px]">✗</span>}
      {type === 'partial' && <span className="mr-1 text-[10px]">≈</span>}
      {word}
    </motion.span>
  )
}

export default function KeywordChips({ keywords = {} }) {
  const { matched = [], missing = [], partial = [] } = keywords

  return (
    <div className="flex flex-col gap-5">
      {matched.length > 0 && (
        <div>
          <div className="flex justify-between items-center mb-3">
            <p className="text-sm font-medium text-white">Keywords found in your resume</p>
            <span className="text-xs text-white/30">{matched.length} found</span>
          </div>
          <div className="flex flex-wrap gap-2">
            {matched.map(w => <Chip key={w} word={w} type="match" />)}
          </div>
        </div>
      )}

      {partial.length > 0 && (
        <div>
          <div className="flex justify-between items-center mb-3">
            <p className="text-sm font-medium text-white">Partial matches</p>
            <span className="text-xs text-white/30">{partial.length} partial</span>
          </div>
          <div className="flex flex-wrap gap-2">
            {partial.map(w => <Chip key={w} word={w} type="partial" />)}
          </div>
        </div>
      )}

      {missing.length > 0 && (
        <div>
          <div className="flex justify-between items-center mb-3">
            <p className="text-sm font-medium text-white">Missing keywords — high impact</p>
            <span className="text-xs text-red-400/70">{missing.length} missing</span>
          </div>
          <div className="flex flex-wrap gap-2">
            {missing.map(w => <Chip key={w} word={w} type="missing" />)}
          </div>
        </div>
      )}
    </div>
  )
}