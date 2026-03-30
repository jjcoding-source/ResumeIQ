import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Badge from '../common/Badge'

const typeColor = { Technical: 'purple', Behavioral: 'blue', 'System Design': 'yellow', 'Culture Fit': 'green' }

export default function InterviewQs({ questions = [] }) {
  const [openIdx, setOpenIdx] = useState(0)

  return (
    <div className="flex flex-col gap-3">
      {questions.map((q, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: i * 0.06 }}
          onClick={() => setOpenIdx(openIdx === i ? null : i)}
          className={`border rounded-2xl p-4 cursor-pointer transition-all ${openIdx === i ? 'border-violet-500/25 bg-violet-500/4' : 'border-white/[0.06] bg-white/[0.01] hover:border-white/15'}`}
        >
          <div className="flex items-start gap-3">
            <span className="text-xs font-bold text-white/20 mt-0.5 min-w-[18px]">{i + 1}</span>
            <div className="flex-1">
              <div className="flex gap-2 mb-2">
                <Badge color={typeColor[q.type] || 'gray'}>{q.type}</Badge>
                <Badge color={q.difficulty === 'Hard' ? 'red' : q.difficulty === 'Medium' ? 'yellow' : 'green'}>{q.difficulty}</Badge>
              </div>
              <p className="text-sm text-white leading-relaxed">{q.question}</p>
              <AnimatePresence>
                {openIdx === i && q.hint && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    className="overflow-hidden"
                  >
                    <div className="mt-3 p-3 bg-violet-500/6 rounded-xl border border-violet-500/15">
                      <p className="text-xs text-violet-400/80 leading-relaxed">💡 {q.hint}</p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  )
}