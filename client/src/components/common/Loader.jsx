import { motion } from 'framer-motion'

export default function Loader({ message = 'Analyzing your resume...' }) {
  return (
    <div className="flex flex-col items-center justify-center min-h-[400px] gap-6">
      <div className="relative w-20 h-20">
        <motion.div
          className="absolute inset-0 rounded-full border-2 border-violet-500/20"
          animate={{ rotate: 360 }}
          transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
        />
        <motion.div
          className="absolute inset-0 rounded-full border-2 border-transparent border-t-violet-500"
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
        />
        <div className="absolute inset-0 flex items-center justify-center text-2xl">🤖</div>
      </div>
      <div className="text-center">
        <p className="text-white/70 text-sm">{message}</p>
        <p className="text-white/30 text-xs mt-1">This usually takes 10–15 seconds</p>
      </div>
    </div>
  )
}