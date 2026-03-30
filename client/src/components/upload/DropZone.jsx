import { useCallback } from 'react'
import { useDropzone } from 'react-dropzone'
import { motion, AnimatePresence } from 'framer-motion'
import clsx from 'clsx'

export default function DropZone({ onFileAccepted, file }) {
  const onDrop = useCallback((accepted) => {
    if (accepted[0]) onFileAccepted(accepted[0])
  }, [onFileAccepted])

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: { 'application/pdf': ['.pdf'], 'application/vnd.openxmlformats-officedocument.wordprocessingml.document': ['.docx'], 'text/plain': ['.txt'] },
    maxFiles: 1,
    maxSize: 10 * 1024 * 1024,
  })

  return (
    <div
      {...getRootProps()}
      className={clsx(
        'border-2 border-dashed rounded-2xl p-10 text-center cursor-pointer transition-all duration-300 min-h-[240px] flex flex-col items-center justify-center',
        isDragActive ? 'border-violet-400/60 bg-violet-500/06' : 'border-white/15 bg-white/[0.02] hover:border-violet-400/30 hover:bg-violet-500/03'
      )}
    >
      <input {...getInputProps()} />
      <AnimatePresence mode="wait">
        {file ? (
          <motion.div key="file" initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="flex flex-col items-center gap-3">
            <div className="w-14 h-14 rounded-2xl bg-emerald-500/10 flex items-center justify-center text-2xl">📄</div>
            <div>
              <p className="text-sm font-medium text-white">{file.name}</p>
              <p className="text-xs text-white/40 mt-0.5">{(file.size / 1024 / 1024).toFixed(2)} MB</p>
            </div>
            <p className="text-xs text-white/30">Drop another file to replace</p>
          </motion.div>
        ) : (
          <motion.div key="empty" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex flex-col items-center gap-4">
            <div className="w-16 h-16 rounded-2xl bg-violet-500/10 flex items-center justify-center text-3xl">
              {isDragActive ? '✨' : '⬆️'}
            </div>
            <div>
              <p className="text-base font-semibold text-white mb-1">
                {isDragActive ? 'Drop it!' : 'Drop your resume here'}
              </p>
              <p className="text-sm text-white/40">or click to browse · PDF, DOCX, TXT · max 10MB</p>
            </div>
            <div className="flex gap-2">
              {['PDF', 'DOCX', 'TXT'].map(t => (
                <span key={t} className="text-xs px-2.5 py-1 bg-white/5 border border-white/10 rounded-lg text-white/40">{t}</span>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}