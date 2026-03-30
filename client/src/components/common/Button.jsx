import clsx from 'clsx'
import { motion } from 'framer-motion'

export default function Button({
  children,
  variant = 'primary',
  size = 'md',
  loading = false,
  disabled = false,
  className = '',
  ...props
}) {
  const base = 'inline-flex items-center justify-center font-medium rounded-xl transition-all duration-200 cursor-pointer select-none'

  const variants = {
    primary: 'bg-gradient-to-r from-violet-600 to-blue-600 text-white shadow-lg shadow-violet-500/20 hover:shadow-violet-500/40 hover:-translate-y-0.5',
    secondary: 'bg-white/5 border border-white/10 text-white/70 hover:bg-white/8 hover:text-white',
    ghost: 'text-white/50 hover:text-white hover:bg-white/5',
    danger: 'bg-red-500/10 border border-red-500/20 text-red-400 hover:bg-red-500/20',
  }

  const sizes = {
    sm: 'text-xs px-3 py-1.5 gap-1.5',
    md: 'text-sm px-5 py-2.5 gap-2',
    lg: 'text-base px-7 py-3.5 gap-2.5',
  }

  return (
    <motion.button
      whileTap={{ scale: 0.97 }}
      className={clsx(base, variants[variant], sizes[size], disabled && 'opacity-40 cursor-not-allowed pointer-events-none', className)}
      disabled={disabled || loading}
      {...props}
    >
      {loading ? (
        <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
      ) : children}
    </motion.button>
  )
}