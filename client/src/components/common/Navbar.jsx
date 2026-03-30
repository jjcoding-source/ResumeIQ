import { Link, useLocation } from 'react-router-dom'
import { motion } from 'framer-motion'
import Button from './Button'

export default function Navbar() {
  const { pathname } = useLocation()
  const isLanding = pathname === '/'

  return (
    <motion.nav
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      className="flex items-center justify-between px-8 py-4 border-b border-white/[0.06] sticky top-0 z-50 backdrop-blur-md bg-[#0a0a0f]/80"
    >
      <Link to="/" className="font-display font-extrabold text-xl bg-gradient-to-r from-violet-400 to-blue-400 bg-clip-text text-transparent" style={{ fontFamily: 'Syne, sans-serif' }}>
        ResumeIQ
      </Link>

      {isLanding && (
        <div className="flex items-center gap-7">
          <a href="#features" className="text-sm text-white/50 hover:text-white transition-colors">Features</a>
          <a href="#how" className="text-sm text-white/50 hover:text-white transition-colors">How it works</a>
        </div>
      )}

      <Link to="/analyze">
        <Button size="sm">Get started free →</Button>
      </Link>
    </motion.nav>
  )
}