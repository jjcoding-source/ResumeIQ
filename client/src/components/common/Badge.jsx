import clsx from 'clsx'

const colorMap = {
  purple: 'bg-violet-500/10 text-violet-400 border-violet-500/20',
  blue:   'bg-blue-500/10 text-blue-400 border-blue-500/20',
  green:  'bg-emerald-500/10 text-emerald-400 border-emerald-500/20',
  yellow: 'bg-amber-500/10 text-amber-400 border-amber-500/20',
  red:    'bg-red-500/10 text-red-400 border-red-500/20',
  gray:   'bg-white/5 text-white/50 border-white/10',
}

export default function Badge({ children, color = 'gray', className = '' }) {
  return (
    <span className={clsx(
      'inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold border tracking-wide',
      colorMap[color],
      className
    )}>
      {children}
    </span>
  )
}