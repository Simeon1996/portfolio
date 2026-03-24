'use client'

import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { useTheme } from './ThemeProvider'

function SunIcon() {
  return (
    <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
      <circle cx="12" cy="12" r="4" fill="currentColor" stroke="none" />
      <line x1="12" y1="2" x2="12" y2="5" />
      <line x1="12" y1="19" x2="12" y2="22" />
      <line x1="4.22" y1="4.22" x2="6.34" y2="6.34" />
      <line x1="17.66" y1="17.66" x2="19.78" y2="19.78" />
      <line x1="2" y1="12" x2="5" y2="12" />
      <line x1="19" y1="12" x2="22" y2="12" />
      <line x1="4.22" y1="19.78" x2="6.34" y2="17.66" />
      <line x1="17.66" y1="6.34" x2="19.78" y2="4.22" />
    </svg>
  )
}

function MoonIcon() {
  return (
    <svg width="10" height="10" viewBox="0 0 24 24" fill="currentColor">
      <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
    </svg>
  )
}

export default function ThemeToggle() {
  const { theme, toggleTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => setMounted(true), [])

  // Render a static placeholder until mounted to avoid hydration mismatch
  if (!mounted) {
    return <div style={{ width: 48, height: 26, flexShrink: 0 }} />
  }

  const isDark = theme === 'dark'

  return (
    <motion.button
      onClick={toggleTheme}
      aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
      whileTap={{ scale: 0.88 }}
      style={{
        position: 'relative',
        width: 48,
        height: 26,
        borderRadius: 13,
        border: `1px solid ${isDark ? 'rgba(0,245,255,.35)' : 'rgba(14,165,233,.4)'}`,
        background: isDark ? 'rgba(0,245,255,.05)' : 'rgba(14,165,233,.08)',
        cursor: 'pointer',
        padding: 0,
        transition: 'border-color .3s, background .3s',
        flexShrink: 0,
        display: 'flex',
        alignItems: 'center',
        overflow: 'hidden',
      }}
    >
      {/* Track glow */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          borderRadius: 13,
          background: isDark
            ? 'linear-gradient(90deg, transparent 50%, rgba(0,245,255,.06))'
            : 'linear-gradient(90deg, rgba(251,191,36,.1), transparent 50%)',
          pointerEvents: 'none',
        }}
      />

      {/* Thumb */}
      <motion.div
        layout
        animate={{ x: isDark ? 3 : 21 }}
        transition={{ type: 'spring', stiffness: 500, damping: 30 }}
        style={{
          position: 'absolute',
          width: 20,
          height: 20,
          borderRadius: '50%',
          background: isDark
            ? 'linear-gradient(135deg, #00c8d4, #0070a8)'
            : 'linear-gradient(135deg, #fbbf24, #f59e0b)',
          boxShadow: isDark
            ? '0 0 10px rgba(0,200,212,.55), 0 1px 3px rgba(0,0,0,.3)'
            : '0 0 10px rgba(251,191,36,.55), 0 1px 3px rgba(0,0,0,.15)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: isDark ? 'rgba(255,255,255,.9)' : '#fff',
          top: 2,
          left: 0,
        }}
      >
        {isDark ? <MoonIcon /> : <SunIcon />}
      </motion.div>
    </motion.button>
  )
}
