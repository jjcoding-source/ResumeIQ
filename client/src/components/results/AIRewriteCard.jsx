import { useState } from 'react'
import { motion } from 'framer-motion'
import toast from 'react-hot-toast'
import Badge from '../common/Badge'
import Button from '../common/Button'

export default function AIRewriteCard({ item }) {
  const [copied, setCopied] = useState(false)

  const handleCopy = () => {
    navigator.clipboard.writeText(item.suggestion)
    setCopied(true)
    toast.success('Copied to clipboard!')
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      className="border border-white/[0.07] rounded-2xl p-5 hover:border-violet-500/20 transition-colors bg-white/[0.01]"
    >
      <div className="flex items-center gap-2 mb-4">
        <Badge color="red">Weak bullet</Badge>
        <span className="text-xs text-white/25">{item.section}</span>
      </div>

      <div className="flex flex-col gap-3">
        <div className="bg-white/[0.02] border-l-2 border-red-500/40 rounded-r-xl p-3" style={{ borderRadius: '0 12px 12px 0' }}>
          <p className="text-[10px] font-bold tracking-widest text-white/25 uppercase mb-1.5">Original</p>
          <p className="text-sm text-white/50 leading-relaxed">{item.original}</p>
        </div>
        <div className="bg-white/[0.02] border-l-2 border-emerald-500 rounded-r-xl p-3" style={{ borderRadius: '0 12px 12px 0' }}>
          <div className="flex items-center justify-between mb-1.5">
            <p className="text-[10px] font-bold tracking-widest text-emerald-400 uppercase">AI Suggestion</p>
            <Button variant="ghost" size="sm" onClick={handleCopy} className="text-xs text-violet-400 hover:text-violet-300 px-2 py-1">
              {copied ? '✓ Copied' : 'Copy'}
            </Button>
          </div>
          <p className="text-sm text-white leading-relaxed">{item.suggestion}</p>
        </div>
      </div>
    </motion.div>
  )
}