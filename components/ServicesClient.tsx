'use client'

import { useEffect, useState } from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import Link from 'next/link'
import ThemeToggle from './ThemeToggle'
import { SERVICES, type Service } from '@/lib/services'

const C = {
  bg: 'var(--bg)', surface: 'var(--surface)', card: 'var(--card)', border: 'var(--border)',
  text: 'var(--text)', muted: 'var(--muted)', muted2: 'var(--muted2)',
  cyan: 'var(--cyan)', pink: 'var(--pink)', green: 'var(--green)',
  yellow: 'var(--yellow)', purple: 'var(--purple)', orange: 'var(--orange)',
}

const EASE = [0.23, 1, 0.32, 1] as const

const revealVariant = {
  hidden: { opacity: 0, y: 28 },
  show:   { opacity: 1, y: 0, transition: { duration: 0.9, ease: EASE } },
}

const staggerVariant = {
  hidden: {},
  show:   { transition: { staggerChildren: 0.1 } },
}

const mono = "'Orbitron', monospace"

function BlueprintPanel({ s, isPhone }: { s: Service; isPhone: boolean }) {
  const [err, setErr] = useState(false)
  return (
    <div>
      <div style={{ position: 'relative', width: '100%', aspectRatio: '16/9', overflow: 'hidden', border: `1px solid ${C.border}`, background: '#08131f' }}>
        <span style={{ position: 'absolute', top: -1, left: -1, width: 18, height: 18, borderTop: `2px solid ${C.cyan}`, borderLeft: `2px solid ${C.cyan}`, zIndex: 3, pointerEvents: 'none' }} />
        <span style={{ position: 'absolute', bottom: -1, right: -1, width: 18, height: 18, borderBottom: `2px solid ${C.pink}`, borderRight: `2px solid ${C.pink}`, zIndex: 3, pointerEvents: 'none' }} />
        {!err && (
          <img src={s.image} alt={s.imageAlt} loading="lazy" onError={() => setErr(true)}
            style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
        )}
      </div>
      <div style={{ display: 'flex', alignItems: 'baseline', gap: 10, marginTop: 12 }}>
        <span style={{ fontFamily: mono, fontSize: 8, fontWeight: 700, letterSpacing: 2, color: C.cyan, opacity: .7, flexShrink: 0 }}>FIG.{s.num}</span>
        <span style={{ fontSize: isPhone ? 10 : 11, fontWeight: 300, color: C.muted, lineHeight: 1.6 }}>{s.imageCaption}</span>
      </div>
    </div>
  )
}

export default function ServicesClient() {
  const [viewportWidth, setViewportWidth] = useState(1280)
  const reduce = useReducedMotion()

  const isPhone = viewportWidth < 768
  const isTablet = viewportWidth >= 768 && viewportWidth < 1100
  const isCompact = viewportWidth < 1100
  const horizontalPad = isPhone ? 20 : isTablet ? 28 : 56

  useEffect(() => {
    const syncViewport = () => setViewportWidth(window.innerWidth)
    syncViewport()
    window.addEventListener('resize', syncViewport)
    return () => window.removeEventListener('resize', syncViewport)
  }, [])

  return (
    <div style={{ background: C.bg, color: C.text, minHeight: '100vh', overflowX: 'hidden', fontFamily: "'Space Grotesk', sans-serif", fontWeight: 300 }}>

      {/* ── NAV ── */}
      <nav style={{ position: 'fixed', top: 0, left: 0, right: 0, zIndex: 100, height: isPhone ? 56 : 60, display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: `0 ${horizontalPad}px`, borderBottom: `1px solid ${C.border}`, background: 'var(--nav-bg)', backdropFilter: 'blur(20px)' }}>
        <Link href="/" style={{ textDecoration: 'none', fontFamily: mono, fontSize: isPhone ? 12 : 16, fontWeight: 700, letterSpacing: isPhone ? 2 : 3, color: C.cyan, textShadow: `0 0 20px rgba(var(--cyan-rgb),.5)` }}>
          SIMEON<span style={{ color: C.pink, textShadow: `0 0 20px rgba(var(--pink-rgb),.5)` }}>.</span>DEV
        </Link>
        {!isCompact && (
          <div style={{ display: 'flex', gap: 32 }}>
            {[['/#about', 'about'], ['/#projects', 'portfolio'], ['/services', 'services'], ['/blog', 'blog']].map(([href, label]) => (
              <Link key={label} href={href} style={{ fontSize: 11, fontWeight: 500, letterSpacing: 2, textDecoration: 'none', textTransform: 'uppercase', color: label === 'services' ? C.cyan : C.muted, textShadow: label === 'services' ? `0 0 12px rgba(var(--cyan-rgb),.6)` : 'none', transition: 'color .2s' }}>{label}</Link>
            ))}
          </div>
        )}
        <div style={{ display: 'flex', alignItems: 'center', gap: isPhone ? 10 : 20 }}>
          <ThemeToggle />
          <Link href="/#contact" style={{ padding: isPhone ? '7px 14px' : '8px 20px', fontSize: 10, fontWeight: 600, letterSpacing: isPhone ? 1.5 : 2, textDecoration: 'none', textTransform: 'uppercase', border: `1px solid ${C.cyan}`, color: C.cyan, fontFamily: mono, transition: 'all .2s' }}
            onMouseEnter={e => { (e.currentTarget as HTMLAnchorElement).style.background = C.cyan; (e.currentTarget as HTMLAnchorElement).style.color = '#000' }}
            onMouseLeave={e => { (e.currentTarget as HTMLAnchorElement).style.background = 'transparent'; (e.currentTarget as HTMLAnchorElement).style.color = C.cyan }}>
            {isPhone ? 'HIRE' : 'HIRE ME'}
          </Link>
        </div>
      </nav>

      {/* ════════════════════════════════════
          HERO
      ════════════════════════════════════ */}
      <header style={{ padding: `${isPhone ? 120 : 160}px ${horizontalPad}px ${isPhone ? 48 : 72}px`, position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', inset: 0, backgroundImage: `linear-gradient(rgba(var(--cyan-rgb),.04) 1px,transparent 1px),linear-gradient(90deg,rgba(var(--cyan-rgb),.04) 1px,transparent 1px)`, backgroundSize: '60px 60px', maskImage: 'radial-gradient(ellipse 80% 80% at 50% 0%,black,transparent)', pointerEvents: 'none' }} />
        <motion.div variants={staggerVariant} initial="hidden" animate="show" style={{ position: 'relative', maxWidth: 1100, margin: '0 auto' }}>
          <motion.div variants={revealVariant} style={{ display: 'inline-flex', alignItems: 'center', gap: 10, border: `1px solid rgba(var(--cyan-rgb),.2)`, padding: '6px 16px', fontSize: 10, fontWeight: 500, letterSpacing: 3, color: C.cyan, textTransform: 'uppercase', marginBottom: isPhone ? 24 : 36, background: 'rgba(var(--cyan-rgb),.03)' }}>
            <motion.div animate={reduce ? {} : { opacity: [1, .2, 1] }} transition={{ duration: 2, repeat: Infinity }} style={{ width: 5, height: 5, borderRadius: '50%', background: C.cyan, boxShadow: `0 0 8px ${C.cyan}` }} />
            Services — 7 ways I can help you ship
          </motion.div>

          <motion.h1 variants={revealVariant} style={{ margin: 0, fontFamily: mono, fontSize: isPhone ? 'clamp(30px,10vw,48px)' : 'clamp(40px,6vw,76px)', fontWeight: 900, lineHeight: 1, letterSpacing: -1 }}>
            <span>PICK A PROBLEM.</span><br />
            <span style={{ color: C.cyan, textShadow: `0 0 40px rgba(var(--cyan-rgb),.4)` }}>{"I'LL SHIP THE"}</span>{' '}
            <span style={{ color: C.pink, textShadow: `0 0 40px rgba(var(--pink-rgb),.4)` }}>SYSTEM.</span>
          </motion.h1>

          <motion.p variants={revealVariant} style={{ fontSize: isPhone ? 13 : 14, fontWeight: 300, color: C.muted, lineHeight: 1.9, maxWidth: 560, margin: `${isPhone ? 24 : 36}px 0 0`, borderLeft: `2px solid rgba(var(--cyan-rgb),.25)`, paddingLeft: isPhone ? 14 : 20 }}>
            Every service below is a fixed, well-bounded engagement — you see the system blueprint before we start, you get weekly updates while we build, and you keep full documentation when we hand off. No retainers, no vague scope.
          </motion.p>

          {/* Engagement facts */}
          <motion.div variants={revealVariant} style={{ display: 'grid', gridTemplateColumns: isPhone ? 'repeat(2,1fr)' : 'repeat(4,1fr)', gap: 1, background: C.border, border: `1px solid ${C.border}`, marginTop: isPhone ? 32 : 48 }}>
            {[['1–30', 'DAYS PER ENGAGEMENT'], ['WEEKLY', 'UPDATES + SLACK ACCESS'], ['1 ROUND', 'OF POST-LAUNCH REVISIONS'], ['FULL', 'HANDOFF DOCUMENTATION']].map(([n, l]) => (
              <div key={l} style={{ background: C.surface, padding: isPhone ? '16px 14px' : '22px 24px' }}>
                <div style={{ fontFamily: mono, fontSize: isPhone ? 18 : 24, fontWeight: 900, color: C.cyan, textShadow: `0 0 20px rgba(var(--cyan-rgb),.4)` }}>{n}</div>
                <div style={{ fontSize: 9, fontWeight: 500, letterSpacing: 1.5, textTransform: 'uppercase', color: C.muted, marginTop: 6 }}>{l}</div>
              </div>
            ))}
          </motion.div>

          {/* Index */}
          <motion.div variants={revealVariant} style={{ display: 'flex', gap: 10, flexWrap: 'wrap', marginTop: isPhone ? 28 : 40 }}>
            {SERVICES.map(s => (
              <a key={s.slug} href={`#${s.slug}`}
                style={{ fontFamily: mono, fontSize: 9, fontWeight: 700, letterSpacing: 1.5, textTransform: 'uppercase', textDecoration: 'none', padding: '9px 14px', border: `1px solid ${C.border}`, color: C.muted, display: 'inline-flex', alignItems: 'center', gap: 8, transition: 'all .2s' }}
                onMouseEnter={e => { const a = e.currentTarget as HTMLAnchorElement; a.style.borderColor = 'rgba(var(--cyan-rgb),.4)'; a.style.color = C.cyan }}
                onMouseLeave={e => { const a = e.currentTarget as HTMLAnchorElement; a.style.borderColor = C.border; a.style.color = C.muted }}>
                <span style={{ color: C.cyan, opacity: .6 }}>{s.num}</span>{s.title}
              </a>
            ))}
          </motion.div>
        </motion.div>
      </header>

      {/* ════════════════════════════════════
          SERVICE SECTIONS
      ════════════════════════════════════ */}
      {SERVICES.map((s, i) => {
        const flip = i % 2 === 1
        return (
          <section key={s.slug} id={s.slug}
            style={{ padding: `${isPhone ? 56 : 88}px ${horizontalPad}px`, borderTop: `1px solid ${C.border}`, background: i % 2 === 0 ? C.bg : C.surface, position: 'relative', scrollMarginTop: isPhone ? 56 : 60 }}>
            <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 1, background: `linear-gradient(90deg,transparent,${flip ? C.pink : C.cyan},transparent)`, opacity: .3 }} />
            <motion.div variants={staggerVariant} initial="hidden" whileInView="show" viewport={{ once: true, margin: '-80px' }}
              style={{ maxWidth: 1100, margin: '0 auto', display: 'grid', gridTemplateColumns: isCompact ? '1fr' : flip ? '1fr 1.05fr' : '1.05fr 1fr', gap: isPhone ? 32 : 56, alignItems: 'center' }}>

              {/* Blueprint image */}
              <motion.div variants={revealVariant} style={{ order: isCompact ? 0 : flip ? 1 : 0 }}>
                <BlueprintPanel s={s} isPhone={isPhone} />
              </motion.div>

              {/* Copy */}
              <motion.div variants={revealVariant} style={{ order: isCompact ? 1 : flip ? 0 : 1 }}>
                <div style={{ fontFamily: mono, fontSize: 9, fontWeight: 700, letterSpacing: 3, color: C.cyan, opacity: .6, marginBottom: 12 }}>{`SERVICE ${s.num} / 07`}</div>
                <h2 style={{ margin: '0 0 16px', fontFamily: mono, fontSize: isPhone ? 22 : 30, fontWeight: 900, letterSpacing: 1, lineHeight: 1.15 }}>{s.title}</h2>
                <p style={{ margin: '0 0 26px', fontSize: isPhone ? 13 : 14, fontWeight: 300, color: C.muted2, lineHeight: 1.85 }}>{s.desc}</p>

                <div style={{ fontFamily: mono, fontSize: 8, fontWeight: 700, letterSpacing: 2.5, color: C.muted, marginBottom: 10, textTransform: 'uppercase' }}>{"What's included"}</div>
                <div style={{ marginBottom: 26 }}>
                  {s.checks.map((item, ci) => (
                    <div key={ci} style={{ display: 'flex', alignItems: 'flex-start', gap: 14, padding: '9px 0', borderBottom: `1px solid rgba(var(--divider-rgb),.7)` }}>
                      <div style={{ flexShrink: 0, width: 16, height: 16, marginTop: 1, border: `1px solid rgba(var(--green-rgb),.35)`, background: 'rgba(var(--green-rgb),.06)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 9, color: C.green }}>✓</div>
                      <span style={{ fontSize: isPhone ? 11 : 12, fontWeight: 300, color: C.muted2, lineHeight: 1.6 }}>{item}</span>
                    </div>
                  ))}
                </div>

                <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap', marginBottom: 26 }}>
                  {s.stack.map(st => (
                    <span key={st} style={{ fontSize: 9, fontWeight: 600, letterSpacing: 1, textTransform: 'uppercase', padding: '3px 9px', border: `1px solid rgba(var(--cyan-rgb),.25)`, color: C.cyan, background: 'rgba(var(--cyan-rgb),.04)', opacity: .7 }}>{st}</span>
                  ))}
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: 18, flexWrap: 'wrap' }}>
                  <Link href="/#contact"
                    style={{ fontFamily: mono, fontSize: 10, fontWeight: 700, letterSpacing: 1.5, textTransform: 'uppercase', textDecoration: 'none', padding: '12px 22px', background: C.cyan, color: '#001016', boxShadow: '0 0 18px rgba(var(--cyan-rgb),.3)', transition: 'box-shadow .2s' }}
                    onMouseEnter={e => (e.currentTarget as HTMLAnchorElement).style.boxShadow = `0 0 34px rgba(var(--cyan-rgb),.6)`}
                    onMouseLeave={e => (e.currentTarget as HTMLAnchorElement).style.boxShadow = `0 0 18px rgba(var(--cyan-rgb),.3)`}>
                    Start this project →
                  </Link>
                  <div>
                    <div style={{ fontFamily: mono, fontSize: 13, fontWeight: 900, color: C.cyan, letterSpacing: 1 }}>{s.timeline}</div>
                    {s.note && <div style={{ fontSize: 10, color: C.muted, marginTop: 3, maxWidth: 300, lineHeight: 1.6 }}>{s.note}</div>}
                  </div>
                </div>
              </motion.div>
            </motion.div>
          </section>
        )
      })}

      {/* ════════════════════════════════════
          CLOSING CTA
      ════════════════════════════════════ */}
      <footer style={{ padding: `${isPhone ? 64 : 100}px ${horizontalPad}px ${isPhone ? 48 : 72}px`, borderTop: `1px solid ${C.border}`, position: 'relative', overflow: 'hidden', textAlign: 'center' }}>
        <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 1, background: `linear-gradient(90deg,transparent,${C.cyan},transparent)`, opacity: .4 }} />
        <div style={{ position: 'absolute', bottom: -100, left: '50%', transform: 'translateX(-50%)', width: 600, height: 300, background: `radial-gradient(circle,rgba(var(--cyan-rgb),.05),transparent 70%)`, pointerEvents: 'none' }} />
        <motion.div variants={staggerVariant} initial="hidden" whileInView="show" viewport={{ once: true }}>
          <motion.div variants={revealVariant} style={{ fontFamily: mono, fontSize: isPhone ? 'clamp(24px,8vw,36px)' : 'clamp(28px,4vw,48px)', fontWeight: 900, letterSpacing: -1, lineHeight: 1.15, marginBottom: 20 }}>
            NOT SURE WHICH<br />
            <span style={{ color: C.cyan, textShadow: `0 0 30px rgba(var(--cyan-rgb),.4)` }}>ONE YOU NEED?</span>
          </motion.div>
          <motion.p variants={revealVariant} style={{ fontSize: isPhone ? 12 : 13, fontWeight: 300, color: C.muted, lineHeight: 1.9, maxWidth: 460, margin: '0 auto 36px' }}>
            {"Most projects touch two or three of these. Describe what you're building — even a rough idea — and I'll tell you exactly what it takes and what it costs. Reply within 24 hours."}
          </motion.p>
          <motion.div variants={revealVariant} style={{ display: 'flex', gap: 14, flexWrap: 'wrap', justifyContent: 'center' }}>
            <Link href="/#contact" style={{ background: C.cyan, color: '#000', padding: isPhone ? '13px 24px' : '14px 36px', fontSize: 11, fontWeight: 700, letterSpacing: 2, textDecoration: 'none', textTransform: 'uppercase', fontFamily: mono, boxShadow: `0 0 20px rgba(var(--cyan-rgb),.3)`, transition: 'box-shadow .2s' }}
              onMouseEnter={e => (e.currentTarget as HTMLAnchorElement).style.boxShadow = `0 0 40px rgba(var(--cyan-rgb),.6)`}
              onMouseLeave={e => (e.currentTarget as HTMLAnchorElement).style.boxShadow = `0 0 20px rgba(var(--cyan-rgb),.3)`}>GET IN TOUCH</Link>
            <Link href="/#projects" style={{ color: C.pink, border: `1px solid rgba(var(--pink-rgb),.35)`, padding: isPhone ? '13px 24px' : '14px 36px', fontSize: 11, fontWeight: 600, letterSpacing: 2, textDecoration: 'none', textTransform: 'uppercase', fontFamily: mono, transition: 'all .2s' }}
              onMouseEnter={e => { (e.currentTarget as HTMLAnchorElement).style.borderColor = C.pink; (e.currentTarget as HTMLAnchorElement).style.boxShadow = `0 0 20px rgba(var(--pink-rgb),.2)` }}
              onMouseLeave={e => { (e.currentTarget as HTMLAnchorElement).style.borderColor = 'rgba(var(--pink-rgb),.35)'; (e.currentTarget as HTMLAnchorElement).style.boxShadow = 'none' }}>SEE THE WORK FIRST</Link>
          </motion.div>
        </motion.div>
      </footer>
    </div>
  )
}
