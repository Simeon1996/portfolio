'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion'
import Link from 'next/link'
import ContactForm from './ContactForm'
import ThemeToggle from './ThemeToggle'

// ─────────────────────────────────────────────
// DATA — edit everything in this section
// ─────────────────────────────────────────────

const ME = {
  name: 'Simeon Ivanov',
  role: 'AI Expert/Developer/Engineer, DevOps, and Full-Stack Developer',
  bio: `I'm a software engineer and DevOps architect with 11+ years of experience building and scaling products across Python, Java, JavaScript, and PHP, using frameworks like Spring, Django, FastAPI, Angular, React and more.\n\nI've designed and operated cloud-native platforms on AWS and GKE with Kubernetes and Docker, with a strong focus on reliability, performance, security and delivery speed. My current focus is AI-first product engineering: building machine learning and agentic systems with PyTorch, NumPy, Pandas, and LangChain to turn cutting-edge models into practical business outcomes.`,
  email: 'dev.grayscale@gmail.com',
  photo: '/about/me-abstract.jpg',
  socials: [
    // { label: 'GitHub',   href: 'https://github.com' },
    // { label: 'LinkedIn', href: 'https://linkedin.com' },
    // { label: 'Twitter',  href: 'https://twitter.com' },
  ] as Array<{ label: string; href: string }>,
}

const EXPERIENCE = [
  {
    role: 'Lead Full Stack Engineer/Developer',
    years: '2020 — Present',
    achievement: 'Architected and operated cloud-native platforms across AWS and GKE using Kubernetes and Docker, while designing and developing robust Java applications and production-ready AI agents with Python, PyTorch, and LangChain.',
    stack: [
      { label: 'Python',     color: 'green'  },
      { label: 'LangChain',  color: 'cyan'   },
      { label: 'OpenAI API', color: 'cyan'   },
      { label: 'Qdrant',   color: 'purple' },
      { label: 'Java',   color: 'yellow' },
      { label: 'Spring',   color: 'green' },
      { label: 'FastAPI',    color: 'green'  },
      { label: 'AWS',        color: 'orange' },
      { label: 'Docker',     color: 'cyan'   },
      { label: 'Kubernetes', color: 'orange' },
      { label: 'Angular',   color: 'yellow' },
    ],
  },
  {
    role: 'Full-Stack Engineer',
    years: '2019 — 2020',
    achievement: 'Engineered ship chartering and freight execution platforms on Kubernetes across cloud and on-prem clusters, building high-throughput services in Python, Java, and PHP and delivering Angular/React interfaces for booking, scheduling, and end-to-end cargo visibility.',
    stack: [
      { label: 'Python', color: 'green' },
      { label: 'PHP', color: 'orange' },
      { label: 'Java', color: 'yellow' },
      { label: 'Spring', color: 'green' },
      { label: 'Symfony', color: 'cyan' },
      { label: 'React',      color: 'cyan'   },
      { label: 'TypeScript', color: 'cyan'   },
      { label: 'Node.js',    color: 'green'  },
      { label: 'MySQL', color: 'yellow' },
      { label: 'Redis',      color: 'cyan'   },
      { label: 'Kubernetes', color: 'orange' },
    ],
  },
  {
    role: 'Full-Stack Developer',
    years: '2016 — 2019',
    achievement: 'Owned the full lifecycle of on-demand B2B services, from product management and requirements discovery through architecture, development, testing, maintenance, deployment, and production monitoring to ensure reliable, scalable delivery.',
    stack: [
      { label: 'Java',        color: 'yellow'  },
      { label: 'PHP',            color: 'orange'  },
      { label: 'AngularJS',      color: 'yellow' },
      { label: 'Symfony', color: 'cyan'   },
      { label: 'Spring',       color: 'green' },
      { label: 'MariaDB',        color: 'cyan'   },
      { label: 'Kubernetes',           color: 'orange' },
    ],
  },
  {
    role: 'Software Engineer',
    years: '2014 — 2016',
    achievement: 'Architected and developed custom WordPress plugins and themes, delivering scalable, maintainable solutions tailored to client workflows, performance goals, and brand requirements.',
    stack: [
      { label: 'PHP',      color: 'cyan'   },
      { label: 'JavaScript',    color: 'green'  },
      { label: 'WordPress',     color: 'orange' },
      { label: 'MySQL',      color: 'yellow' }
    ],
  },
]

const PROJECTS = [
  {
    slug: 'rag',
    index: '01',
    title: 'GPT Document Intelligence',
    desc: 'Upload entire PDF libraries and query them with natural language. Built on LangChain, OpenAI embeddings, and Pinecone. Features hybrid BM25 + dense retrieval, citation tracking, and a streaming chat UI. Handles 10k-page corpora with sub-200ms retrieval.',
    github: 'https://github.com',
    project: '/projects/rag',
    stack: ['Python', 'LangChain', 'OpenAI', 'Pinecone', 'FastAPI'],
  },
  {
    slug: 'agent',
    index: '02',
    title: 'Autonomous Incident Commander',
    desc: 'A multi-agent SRE command center that detects incidents, builds causal graphs from telemetry, executes guarded runbooks, and drafts postmortems automatically. Reduced mean time to resolution by 63% in staging chaos drills while keeping human approval in the loop for every high-risk action.',
    github: null,
    project: null,
    stack: ['Python', 'LangChain', 'Prometheus', 'Kubernetes', 'Grafana'],
  },
  {
    slug: 'devops',
    index: '03',
    title: 'FinOps Autopilot',
    desc: 'An AI platform for cloud cost optimization that forecasts spend, detects anomalies in real time, opens infrastructure right-sizing pull requests, and recommends commitment plans. It combines retrieval over IaC history with policy constraints to avoid unsafe savings recommendations.',
    github: null,
    project: '/projects/devops',
    stack: ['Python', 'AWS', 'Terraform', 'LangChain', 'PostgreSQL'],
  },
  {
    slug: 'saas',
    index: '04',
    title: 'Voice Revenue Copilot',
    desc: 'A real-time assistant for sales teams that transcribes calls live, surfaces objection-handling playbooks, scores deal health, and syncs structured notes into CRM automatically. The system supports multilingual conversations with latency under 400ms for in-call recommendations.',
    github: null,
    project: null,
    stack: ['Python', 'OpenAI', 'React', 'TypeScript', 'WebSocket'],
  },
  {
    slug: 'resume',
    index: '05',
    title: 'Talent Intelligence Graph',
    desc: 'A recruiting intelligence system that converts resumes, portfolios, and job descriptions into a living skills graph. It generates explainable candidate-role matches, interview briefs, and market trend analytics while preserving strict data governance and access controls.',
    github: null,
    project: '/projects/resume',
    stack: ['Python', 'Neo4j', 'LangChain', 'FastAPI', 'PostgreSQL'],
  },
  {
    slug: 'style',
    index: '06',
    title: 'Generative Brand Studio',
    desc: 'A multimodal creative suite that turns a brand brief into on-brand hero visuals, landing page variants, tokenized design systems, and accessibility reports in minutes. It blends diffusion models, retrieval over brand guidelines, and deterministic export pipelines for production handoff.',
    github: 'https://github.com',
    project: '/projects/style',
    stack: ['Python', 'Stable Diffusion', 'LangChain', 'React', 'TypeScript'],
  },
  {
    slug: 'email-rag',
    index: '07',
    title: 'High-Traffic Email RAG Engine',
    desc: 'Production RAG pipeline ingesting millions of emails and attachments (PDF, DOCX, XLSX) daily. Hybrid retrieval combines BM25 sparse search via OpenSearch with dense vector search via Qdrant, fused through Reciprocal Rank Fusion. Includes chunking with overlap, per-tenant index isolation, async ingestion queues (Celery/Redis), deduplication, embedding caching, query rewriting, re-ranking with a cross-encoder, and streaming LLM responses — sustaining 10k+ queries/day with p99 latency under 300ms.',
    github: null,
    project: '/projects/email-rag',
    stack: ['Python', 'OpenSearch', 'Qdrant', 'Celery', 'Redis'],
  },
  {
    slug: 'langchain-platform',
    index: '08',
    title: 'LangChain AI Application Platform',
    desc: 'A production multi-tenant platform built on LangChain\'s full stack — LCEL pipelines, ConversationalRetrievalChain, custom tool-calling agents (AgentExecutor), memory backends (ConversationSummaryBufferMemory), and structured output parsers. Integrates LangSmith for tracing and eval, LangServe for one-command API deployment, and LangGraph for stateful multi-step agent workflows. Supports hot-swappable LLM providers, retrieval over 50M+ documents, and per-user session persistence.',
    github: null,
    project: '/projects/langchain-platform',
    stack: ['LangChain', 'LangGraph', 'LangSmith', 'Python', 'FastAPI'],
  },
  {
    slug: 'mcp-platform',
    index: '09',
    title: 'Claude MCP Integration Platform',
    desc: 'Built a suite of production Model Context Protocol (MCP) servers that give Claude structured, permissioned access to internal tools — databases, REST APIs, file systems, and ticketing systems. Implemented custom resource, tool, and prompt primitives with strict input validation, OAuth-scoped auth, and full audit logging. Enabled non-technical teams to interact with live business data through natural language with zero prompt injection surface.',
    github: null,
    project: '/projects/mcp-platform',
    stack: ['Python', 'MCP', 'TypeScript', 'FastAPI', 'OAuth'],
  },
  {
    slug: 'android-freelance',
    index: '10',
    title: 'Freelance Android Development',
    desc: 'Delivered 15+ Android apps for clients across retail, health, and logistics — all built with Jetpack Compose for fully declarative UIs. Stack includes Hilt for DI, Room for local persistence, Retrofit + OkHttp for networking, Coil for image loading, DataStore for preferences, WorkManager for background tasks, and Navigation Compose for deep-linked multi-screen flows. Applied MVVM with StateFlow, coroutines, and clean architecture across every engagement.',
    github: null,
    project: '/projects/android-freelance',
    stack: ['Kotlin', 'Jetpack Compose', 'Hilt', 'Room', 'Retrofit'],
  },
  {
    slug: 'quizforge',
    index: '11',
    title: 'QuizzYourself — AI Quiz Platform',
    desc: 'Describe a topic and QuizForge generates a full quiz in seconds using LLMs — questions, multiple-choice options, correct answers, and explanations all crafted automatically. Users run quizzes and receive detailed result breakdowns: per-question accuracy, wrong-answer analysis, and knowledge gap insights. Quizzes can be published publicly, kept private, or shared via invite link with specific individuals.',
    github: 'https://github.com',
    project: '/projects/quizforge',
    stack: ['Next.js', 'TypeScript', 'OpenAI', 'PostgreSQL', 'Prisma'],
  },
  {
    slug: 'cookingintelligence',
    index: '13',
    title: 'CookingIntelligence',
    desc: 'Describe a dish, dietary preference, or available ingredients and CookingIntelligence generates a complete recipe in seconds using LLMs — ingredients, quantities, steps, and tips included. Recipes can be cooked interactively step-by-step with timers, substitution suggestions, and contextual guidance at each stage. Like QuizzYourself, recipes can be published publicly, kept private, or shared with specific people via invite link.',
    github: 'https://github.com',
    project: '/projects/cookingintelligence',
    stack: ['Next.js', 'TypeScript', 'OpenAI', 'PostgreSQL', 'Prisma'],
  },
  {
    slug: 'botversehub',
    index: '15',
    title: 'BotverseHub',
    desc: 'A unified platform for managing, training, and interacting with AI bots. Users can spin up bots with custom personas, equip them with selectable tool sets (web search, code execution, file access, APIs), and chat with them in real time. Includes a bot registry, per-bot memory and context management, tool permission controls, conversation history, and an analytics dashboard tracking usage and performance across the entire bot fleet.',
    github: 'https://github.com',
    project: '/projects/botversehub',
    stack: ['React', 'TypeScript', 'Python', 'FastAPI', 'WebSocket'],
  },
  {
    slug: 'freelance',
    index: '16',
    title: 'Freelance Web Development',
    desc: 'Delivered 20+ custom websites and client platforms across industries — from e-commerce storefronts and booking systems to internal dashboards and REST APIs. Built with React, Angular, Python (Django/FastAPI), Java (Spring Boot), and vanilla JavaScript. Each engagement covered full-cycle delivery: scoping, architecture, implementation, and handoff.',
    github: null,
    project: '/projects/freelance',
    stack: ['React', 'Angular', 'Django', 'Spring Boot', 'TypeScript'],
  },
]



// ─────────────────────────────────────────────
// DESIGN TOKENS — all values use CSS custom properties
// so both dark and light themes are handled via globals.css
// ─────────────────────────────────────────────
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

// ─────────────────────────────────────────────
// SMALL COMPONENTS
// ─────────────────────────────────────────────
function Pill({ label }: { label: string; color?: string }) {
  return (
    <span
      style={{ fontSize: 9, fontWeight: 600, letterSpacing: 1, textTransform: 'uppercase' as const, padding: '3px 9px', border: `1px solid rgba(var(--cyan-rgb),.25)`, color: C.cyan, background: 'rgba(var(--cyan-rgb),.04)', cursor: 'default', opacity: .7 }}
    >{label}</span>
  )
}

function SectionTopLine({ color = C.cyan }: { color?: string }) {
  return <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 1, background: `linear-gradient(90deg,transparent,${color},transparent)`, opacity: .3 }} />
}

interface Post { slug: string; title: string; date: string; readingTime: number; url: string; tags: string[] }

// ─────────────────────────────────────────────
// MAIN
// ─────────────────────────────────────────────
const SERVICES = [
  {
    num: '01',
    title: 'AI Integration',
    timeline: '1 – 30 days',
    desc: 'LLM pipelines, RAG systems, and intelligent features embedded directly into your product. From proof-of-concept to production-grade infrastructure.',
    checks: [
      'Custom RAG pipeline with vector search including chunking, embedding caching, async ingestion, and hybrid BM25 + vector retrieval',
      'LLM selection, prompt engineering & evaluation',
      'Streaming API with cost & latency optimisation',
      'Observability: tracing, logging, evals dashboard',
      'Handoff documentation & team walkthrough',
    ],
    stack: ['LangChain', 'OpenAI', 'Claude', 'Qdrant', 'Pinecone', 'FastAPI', 'AWS'],
    note: 'Typical engagement: 1–8 weeks depending on scope. Includes one round of revisions post-launch.',
  },
  {
    num: '02',
    title: 'Full-Stack Development',
    timeline: '1 – 30 days',
    desc: 'End-to-end web applications — schema design, API architecture, and polished interfaces built to hold up under real traffic and real users.',
    checks: [
      'Frontend development with Angular, React, Next.js, Tailwind UI or custom designs',
      'Backend development with Python (Django/FastAPI), Java (Spring Boot), or Node.js',
      'Database design, migrations & query optimisation',
      'CI/CD pipeline with automated testing',
      'Performance audit, Monitoring & Core Web Vitals pass',
    ],
    stack: ['Next.js', 'Angular', 'React', 'Python', 'Java', 'TypeScript', 'MySQL', 'MongoDB', 'Jenkins, GitHub Actions or GitLab CI']
  },
  {
    num: '03',
    title: 'DevOps & Infrastructure',
    timeline: '1 – 30 days',
    desc: 'CI/CD pipelines, containerisation, and cloud deployments. Infrastructure that scales silently and fails gracefully.',
    checks: [
      'Docker + Kubernetes cluster setup',
      'GitHub Actions or GitLab CI pipeline',
      'Cloud infrastructure on AWS or GCP (IaC)',
      'Monitoring, alerting & on-call runbooks',
      'Security audit & secrets management',
    ],
    stack: ['Docker', 'Kubernetes', 'Terraform', 'GitHub Actions', 'Prometheus', 'Jenkins', 'AWS', 'GCP']
  },
  {
    num: '04',
    title: 'Data Pipelines',
    timeline: '1 – 30 days',
    desc: 'ETL workflows, vector databases, and real-time analytics. Raw, messy data transformed into fast, reliable decisions.',
    checks: [
      'ETL / ELT pipeline design & implementation',
      'Vector store setup & embedding strategy',
      'Real-time streaming with Kafka or Pub/Sub',
      'Analytics dashboard (Metabase or custom)',
      'Data quality monitoring & alerting',
    ],
    stack: ['Python', 'Airflow', 'Kafka', 'BigQuery', 'Pinecone']
  },
]

export default function PortfolioClient({ latestPosts }: { latestPosts: Post[] }) {
  const [hoveredRow, setHoveredRow]       = useState<string | null>(null)
  const [projectsOpen, setProjectsOpen]   = useState(false)
  const [openService, setOpenService]     = useState<string>('01')
  const [activeSection, setActiveSection] = useState('home')
  const [mousePos, setMousePos]           = useState({ x: -100, y: -100 })
  const [photoError, setPhotoError]       = useState(false)
  const [viewportWidth, setViewportWidth] = useState(1280)
  const [mobileNavOpen, setMobileNavOpen] = useState(false)

  const isPhone = viewportWidth < 768
  const isTablet = viewportWidth >= 768 && viewportWidth < 1100
  const isCompact = viewportWidth < 1100
  const horizontalPad = isPhone ? 20 : isTablet ? 28 : 56
  const sectionVerticalPad = isPhone ? 88 : 120

  const { scrollY }  = useScroll()
  const heroOpacity  = useTransform(scrollY, [0, 400], [1, 0])
  const heroY        = useTransform(scrollY, [0, 400], [0, 60])

  useEffect(() => {
    const syncViewport = () => setViewportWidth(window.innerWidth)
    syncViewport()
    window.addEventListener('resize', syncViewport)
    return () => window.removeEventListener('resize', syncViewport)
  }, [])

  useEffect(() => {
    if (!isCompact) {
      setMobileNavOpen(false)
    }
  }, [isCompact])

  useEffect(() => {
    if (isCompact) return
    const fn = (e: MouseEvent) => setMousePos({ x: e.clientX, y: e.clientY })
    window.addEventListener('mousemove', fn)
    return () => window.removeEventListener('mousemove', fn)
  }, [isCompact])

  useEffect(() => {
    const ids = ['home','about','projects','services','blog']
    const obs = new IntersectionObserver(
      entries => entries.forEach(e => { if (e.isIntersecting) setActiveSection(e.target.id) }),
      { threshold: isPhone ? 0.22 : 0.3 }
    )
    ids.forEach(id => { const el = document.getElementById(id); if (el) obs.observe(el) })
    return () => obs.disconnect()
  }, [isPhone])

  useEffect(() => {
    const fn = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setMobileNavOpen(false)
      }
    }
    window.addEventListener('keydown', fn)
    return () => window.removeEventListener('keydown', fn)
  }, [])

  useEffect(() => {
    document.body.style.overflow = isCompact && mobileNavOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [isCompact, mobileNavOpen])

  return (
    <div style={{ background: C.bg, color: C.text, minHeight: '100vh', overflowX: 'hidden', fontFamily: "'Space Grotesk', sans-serif", fontWeight: 300 }}>

      {/* Cursor */}
      {!isCompact && (
        <motion.div
          style={{ position: 'fixed', top: mousePos.y, left: mousePos.x, width: 6, height: 6, borderRadius: '50%', background: C.cyan, pointerEvents: 'none', zIndex: 9998, boxShadow: `0 0 10px ${C.cyan}`, transform: 'translate(-50%,-50%)' }}
          transition={{ type: 'spring', stiffness: 800, damping: 35 }}
        />
      )}

      {/* ── NAV ── */}
      <motion.nav
        initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1 }}
        style={{ position: 'fixed', top: 0, left: 0, right: 0, zIndex: 100, height: isPhone ? 56 : 60, display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: `0 ${horizontalPad}px`, borderBottom: `1px solid ${C.border}`, background: 'var(--nav-bg)', backdropFilter: 'blur(20px)' }}
      >
        <div style={{ fontFamily: mono, fontSize: isPhone ? 12 : 16, fontWeight: 700, letterSpacing: isPhone ? 2 : 3, color: C.cyan, textShadow: `0 0 20px rgba(var(--cyan-rgb),.5)` }}>
          SIMEON<span style={{ color: C.pink, textShadow: `0 0 20px rgba(var(--pink-rgb),.5)` }}>.</span>DEV
        </div>
        {!isCompact && (
          <div style={{ display: 'flex', gap: 32 }}>
            {[['about', 'about'],['projects', 'portfolio'],['services', 'services'],['blog', 'blog']].map(([id, label]) => (
              <a key={id} href={`#${id}`} style={{ fontSize: 11, fontWeight: 500, letterSpacing: 2, textDecoration: 'none', textTransform: 'uppercase', color: activeSection === id ? C.cyan : C.muted, textShadow: activeSection === id ? `0 0 12px rgba(var(--cyan-rgb),.6)` : 'none', transition: 'color .2s, text-shadow .2s' }}>{label}</a>
            ))}
          </div>
        )}
        <div style={{ display: 'flex', alignItems: 'center', gap: isPhone ? 10 : 20 }}>
          <ThemeToggle />
          <a href="#contact" style={{ padding: isPhone ? '7px 14px' : '8px 20px', fontSize: 10, fontWeight: 600, letterSpacing: isPhone ? 1.5 : 2, textDecoration: 'none', textTransform: 'uppercase', border: `1px solid ${C.cyan}`, color: C.cyan, fontFamily: mono, transition: 'all .2s' }}
            onClick={() => setMobileNavOpen(false)}
            onMouseEnter={e => { (e.currentTarget as HTMLAnchorElement).style.background = C.cyan; (e.currentTarget as HTMLAnchorElement).style.color = '#000' }}
            onMouseLeave={e => { (e.currentTarget as HTMLAnchorElement).style.background = 'transparent'; (e.currentTarget as HTMLAnchorElement).style.color = C.cyan }}>
            {isPhone ? 'HIRE' : 'HIRE ME'}
          </a>
          {isCompact && (
            <button
              type="button"
              onClick={() => setMobileNavOpen(prev => !prev)}
              style={{ padding: isPhone ? '7px 12px' : '8px 14px', fontFamily: mono, fontSize: 10, fontWeight: 700, letterSpacing: 2, textTransform: 'uppercase', border: `1px solid ${mobileNavOpen ? C.cyan : C.border}`, color: mobileNavOpen ? C.cyan : C.muted, background: mobileNavOpen ? 'rgba(var(--cyan-rgb),.08)' : 'transparent', cursor: 'pointer', transition: 'all .2s' }}
            >
              {mobileNavOpen ? 'Close' : 'Menu'}
            </button>
          )}
        </div>
      </motion.nav>

      <AnimatePresence>
        {isCompact && mobileNavOpen && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.2 }}
            style={{ position: 'fixed', top: isPhone ? 56 : 60, left: 0, right: 0, zIndex: 99, borderBottom: `1px solid ${C.border}`, background: C.surface, padding: `16px ${horizontalPad}px 20px`, display: 'grid', gap: 12 }}
          >
            {[['about', 'about'],['projects', 'portfolio'],['services', 'services'],['blog', 'blog']].map(([id, label]) => (
              <a
                key={id}
                href={`#${id}`}
                onClick={() => setMobileNavOpen(false)}
                style={{ fontFamily: mono, fontSize: 11, fontWeight: 700, letterSpacing: 2, textDecoration: 'none', textTransform: 'uppercase', color: activeSection === id ? C.cyan : C.muted, border: `1px solid ${activeSection === id ? 'rgba(var(--cyan-rgb),.28)' : C.border}`, background: activeSection === id ? 'rgba(var(--cyan-rgb),.06)' : 'transparent', padding: '10px 12px' }}
              >
                {label}
              </a>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      {/* ════════════════════════════════════
          HERO
      ════════════════════════════════════ */}
      <section id="home" style={{ minHeight: isCompact ? 'auto' : '100vh', display: 'flex', flexDirection: 'column', justifyContent: 'center', padding: `${isPhone ? 82 : 60}px ${horizontalPad}px ${isPhone ? 64 : 80}px`, position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', inset: 0, backgroundImage: `linear-gradient(rgba(var(--cyan-rgb),.04) 1px,transparent 1px),linear-gradient(90deg,rgba(var(--cyan-rgb),.04) 1px,transparent 1px)`, backgroundSize: '60px 60px', maskImage: 'radial-gradient(ellipse 80% 80% at 50% 50%,black,transparent)', pointerEvents: 'none' }} />
        {[
          { w: 500, color: 'rgba(var(--cyan-rgb),.08)',  style: { top: '-100px', right: '-100px' }, anim: { x:[0,-30,0], y:[0,30,0]  }, dur: 8  },
          { w: 400, color: 'rgba(var(--pink-rgb),.06)',  style: { bottom: '0',   left: '-100px' }, anim: { x:[0,30,0],  y:[0,-20,0] }, dur: 10 },
          { w: 300, color: 'rgba(var(--purple-rgb),.06)',  style: { top: '40%',    left: '40%'    }, anim: { x:[0,-20,0], y:[0,30,0]  }, dur: 12 },
        ].map((o, i) => (
          <motion.div key={i} animate={o.anim} transition={{ duration: o.dur, repeat: Infinity, ease: 'easeInOut' }}
            style={{ position: 'absolute', width: isPhone ? o.w * 0.55 : isTablet ? o.w * 0.75 : o.w, height: isPhone ? o.w * 0.55 : isTablet ? o.w * 0.75 : o.w, borderRadius: '50%', background: `radial-gradient(circle,${o.color},transparent 70%)`, filter: 'blur(80px)', pointerEvents: 'none', ...o.style as any }} />
        ))}

        <motion.div style={{ opacity: heroOpacity, y: heroY, position: 'relative', maxWidth: isCompact ? '100%' : 900 }}>
          <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.2, duration: 0.8 }}
            style={{ display: 'inline-flex', alignItems: 'center', gap: 10, border: `1px solid rgba(var(--cyan-rgb),.2)`, padding: isPhone ? '6px 12px' : '6px 16px', fontSize: isPhone ? 9 : 10, fontWeight: 500, letterSpacing: isPhone ? 2 : 3, color: C.cyan, textTransform: 'uppercase', marginBottom: isPhone ? 28 : 40, background: 'rgba(var(--cyan-rgb),.03)' }}>
            <motion.div animate={{ opacity: [1,.2,1] }} transition={{ duration: 2, repeat: Infinity }} style={{ width: 5, height: 5, borderRadius: '50%', background: C.cyan, boxShadow: `0 0 8px ${C.cyan}` }} />
            {'Full-Stack Developer, DevOps & AI Engineer'}
          </motion.div>

          {[
            { text: 'BUILDING',     color: C.text, glow: false, shadow: '',                                   delay: 0.3 },
            { text: 'INTELLIGENT',  color: C.cyan, glow: true,  shadow: '0 0 40px rgba(var(--cyan-rgb),.4)', delay: 0.5 },
            { text: 'SOFTWARE.',    color: C.pink, glow: true,  shadow: '0 0 40px rgba(var(--pink-rgb),.4)', delay: 0.7 },
          ].map(({ text, color, glow, shadow, delay }) => (
            <div key={text} style={{ overflow: 'hidden' }}>
              {text.split('').map((ch: string, i: number) => (
                <motion.span key={i} initial={{ y: '110%' }} animate={{ y: 0 }} transition={{ delay: delay + i * 0.04, duration: 0.9, ease: EASE }}
                  style={{ display: 'inline-block', fontFamily: mono, fontSize: isPhone ? 'clamp(34px,12vw,58px)' : 'clamp(40px,7vw,88px)', fontWeight: 900, lineHeight: .95, letterSpacing: isPhone ? -0.4 : -1, color, textShadow: glow ? shadow : 'none' }}>
                  {ch === ' ' ? '\u00A0' : ch}
                </motion.span>
              ))}
            </div>
          ))}

          <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1.1, duration: 0.8 }}
            style={{ fontSize: isPhone ? 13 : 14, fontWeight: 300, color: C.muted, lineHeight: 1.9, maxWidth: isCompact ? 620 : 480, margin: `${isPhone ? 28 : 40}px 0 ${isPhone ? 34 : 52}px`, borderLeft: `2px solid rgba(var(--cyan-rgb),.25)`, paddingLeft: isPhone ? 14 : 20 }}>
            {'I design and engineer LLM-powered products, scalable APIs, and interfaces that feel effortless. Turning complex AI into products people actually use.'}
          </motion.p>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1.3, duration: 0.8 }} style={{ display: 'flex', gap: 14, flexWrap: 'wrap' }}>
            <a href="#projects" style={{ background: C.cyan, color: '#000', padding: isPhone ? '13px 24px' : '14px 36px', fontSize: 11, fontWeight: 700, letterSpacing: 2, textDecoration: 'none', textTransform: 'uppercase', fontFamily: mono, boxShadow: `0 0 20px rgba(var(--cyan-rgb),.3)`, transition: 'box-shadow .2s' }}
              onMouseEnter={e => (e.currentTarget as HTMLAnchorElement).style.boxShadow = `0 0 40px rgba(var(--cyan-rgb),.6)`}
              onMouseLeave={e => (e.currentTarget as HTMLAnchorElement).style.boxShadow = `0 0 20px rgba(var(--cyan-rgb),.3)`}>VIEW PORTFOLIO</a>
            <a href="#contact" style={{ color: C.cyan, border: `1px solid rgba(var(--cyan-rgb),.3)`, padding: isPhone ? '13px 24px' : '14px 36px', fontSize: 11, fontWeight: 600, letterSpacing: 2, textDecoration: 'none', textTransform: 'uppercase', fontFamily: mono, transition: 'all .2s' }}
              onMouseEnter={e => { (e.currentTarget as HTMLAnchorElement).style.borderColor = C.cyan; (e.currentTarget as HTMLAnchorElement).style.boxShadow = `0 0 20px rgba(var(--cyan-rgb),.2)` }}
              onMouseLeave={e => { (e.currentTarget as HTMLAnchorElement).style.borderColor = 'rgba(var(--cyan-rgb),.3)'; (e.currentTarget as HTMLAnchorElement).style.boxShadow = 'none' }}>GET IN TOUCH</a>
          </motion.div>

          {isCompact && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.45, duration: 0.8 }}
              style={{ display: 'grid', gridTemplateColumns: isPhone ? '1fr' : 'repeat(3,minmax(0,1fr))', gap: 8, marginTop: 24, maxWidth: isPhone ? 260 : '100%' }}
            >
              {[['100+', 'PROJECTS'],['12+', 'YEARS'],['100+', 'CLIENTS']].map(([n,l]) => (
                <div key={l} style={{ padding: isPhone ? '14px 16px' : '18px 20px', border: `1px solid ${C.border}`, transition: 'border-color .2s,background .2s' }}
                  onMouseEnter={e => { (e.currentTarget as HTMLDivElement).style.borderColor = 'rgba(var(--cyan-rgb),.3)'; (e.currentTarget as HTMLDivElement).style.background = 'rgba(var(--cyan-rgb),.03)' }}
                  onMouseLeave={e => { (e.currentTarget as HTMLDivElement).style.borderColor = C.border; (e.currentTarget as HTMLDivElement).style.background = 'transparent' }}>
                  <div style={{ fontFamily: mono, fontSize: isPhone ? 26 : 30, fontWeight: 900, color: C.cyan, lineHeight: 1, textShadow: `0 0 20px rgba(var(--cyan-rgb),.4)` }}>{n}</div>
                  <div style={{ fontSize: 9, fontWeight: 500, letterSpacing: 2, textTransform: 'uppercase', color: C.muted, marginTop: 6 }}>{l}</div>
                </div>
              ))}
            </motion.div>
          )}
        </motion.div>

        {!isCompact && (
          <motion.div initial={{ opacity: 0, x: 40 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 1.4, duration: 0.8 }}
            style={{ position: 'absolute', right: horizontalPad, top: '50%', transform: 'translateY(-50%)', display: 'flex', flexDirection: 'column' }}>
            {[['100+', 'PROJECTS'],['12+', 'YEARS'],['100+', 'CLIENTS']].map(([n,l]) => (
              <div key={l} style={{ padding: '24px 28px', border: `1px solid ${C.border}`, marginBottom: -1, transition: 'border-color .2s,background .2s' }}
                onMouseEnter={e => { (e.currentTarget as HTMLDivElement).style.borderColor = 'rgba(var(--cyan-rgb),.3)'; (e.currentTarget as HTMLDivElement).style.background = 'rgba(var(--cyan-rgb),.03)' }}
                onMouseLeave={e => { (e.currentTarget as HTMLDivElement).style.borderColor = C.border; (e.currentTarget as HTMLDivElement).style.background = 'transparent' }}>
                <div style={{ fontFamily: mono, fontSize: 36, fontWeight: 900, color: C.cyan, lineHeight: 1, textShadow: `0 0 20px rgba(var(--cyan-rgb),.4)` }}>{n}</div>
                <div style={{ fontSize: 9, fontWeight: 500, letterSpacing: 2.5, textTransform: 'uppercase', color: C.muted, marginTop: 6 }}>{l}</div>
              </div>
            ))}
          </motion.div>
        )}
      </section>

      {/* ════════════════════════════════════
          ABOUT
      ════════════════════════════════════ */}
      <section id="about" style={{ padding: `${sectionVerticalPad}px ${horizontalPad}px`, borderTop: `1px solid ${C.border}`, position: 'relative' }}>
        <SectionTopLine />
        <motion.div variants={staggerVariant} initial="hidden" whileInView="show" viewport={{ once: true, margin: '-80px' }}>

          {/* Header */}
          <motion.div variants={revealVariant} style={{ display: 'flex', alignItems: 'center', gap: isPhone ? 14 : 20, marginBottom: isPhone ? 44 : 64, flexWrap: 'wrap' }}>
            <span style={{ fontFamily: mono, fontSize: 10, fontWeight: 700, letterSpacing: 3, color: C.cyan, opacity: .6 }}>01</span>
            <span style={{ fontFamily: mono, fontSize: 24, fontWeight: 900, letterSpacing: 2, textTransform: 'uppercase' }}>About Me</span>
          </motion.div>

          <div style={{ display: 'grid', gridTemplateColumns: isPhone ? '1fr' : isTablet ? 'minmax(240px,280px) 1fr' : '300px 1fr', gap: isPhone ? 34 : isTablet ? 42 : 72, alignItems: 'start' }}>

            {/* LEFT: photo + bio */}
            <motion.div variants={revealVariant} style={{ position: isPhone ? 'relative' : 'sticky', top: isPhone ? 0 : 80, maxWidth: isPhone ? 360 : 'none', margin: isPhone ? '0 auto' : 0 }}>
              {/* Photo frame */}
              <div style={{ position: 'relative', width: '100%', aspectRatio: '3/4', overflow: 'hidden', border: `1px solid ${C.border}`, marginBottom: 28 }}>
                {/* Corner accents */}
                {[
                  { top:-1, left:-1,    borderTop:`2px solid ${C.cyan}`,  borderLeft:`2px solid ${C.cyan}`,   boxShadow:`-4px -4px 14px rgba(var(--cyan-rgb),.2)` },
                  { top:-1, right:-1,   borderTop:`2px solid ${C.cyan}`,  borderRight:`2px solid ${C.cyan}`  },
                  { bottom:-1, left:-1, borderBottom:`2px solid ${C.pink}`,borderLeft:`2px solid ${C.pink}`  },
                  { bottom:-1, right:-1,borderBottom:`2px solid ${C.pink}`,borderRight:`2px solid ${C.pink}`, boxShadow:`4px 4px 14px rgba(var(--pink-rgb),.2)` },
                ].map((s, i) => <div key={i} style={{ position: 'absolute', width: isPhone ? 16 : 20, height: isPhone ? 16 : 20, zIndex: 2, ...s }} />)}

                {!photoError ? (
                  <img src={ME.photo} alt={ME.name} onError={() => setPhotoError(true)}
                    style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center', display: 'block' }} />
                ) : (
                  <div style={{ width: '100%', height: '100%', background: `linear-gradient(160deg,var(--card),var(--surface) 40%,var(--card))`, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 14, position: 'relative' }}>
                    <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(ellipse 80% 60% at 50% 30%,rgba(var(--cyan-rgb),.06),transparent 70%)' }} />
                    <span style={{ fontSize: isPhone ? 62 : 88, opacity: .3, position: 'relative', zIndex: 1 }}>👤</span>
                    <span style={{ fontFamily: mono, fontSize: 8, letterSpacing: 2, textTransform: 'uppercase', color: C.muted, border: `1px solid ${C.border}`, padding: '5px 10px', position: 'relative', zIndex: 1 }}>Add photo → /public/about/</span>
                  </div>
                )}
                {!photoError && (
                  <div
                    style={{
                      position: 'absolute',
                      inset: 0,
                      background: 'linear-gradient(180deg, rgba(var(--bg-rgb),.24), rgba(var(--bg-rgb),.64))',
                      pointerEvents: 'none',
                    }}
                  />
                )}
                <motion.div animate={{ top: ['-40%','140%'] }} transition={{ duration: 4, repeat: Infinity, ease: 'linear' }}
                  style={{ position: 'absolute', left: 0, right: 0, height: '40%', background: 'linear-gradient(to bottom,transparent,rgba(var(--cyan-rgb),.03),transparent)', pointerEvents: 'none' }} />
              </div>

              <div style={{ fontFamily: mono, fontSize: isPhone ? 16 : 18, fontWeight: 900, letterSpacing: 1, marginBottom: 4 }}>{ME.name}</div>
              <div style={{ fontSize: 11, fontWeight: 500, letterSpacing: 2, color: C.cyan, textTransform: 'uppercase', marginBottom: 18 }}>AI Expert/Developer/Engineer, DevOps, and Full-Stack Developer</div>
              <p style={{ fontSize: isPhone ? 12 : 13, fontWeight: 300, color: C.muted2, lineHeight: 1.9, marginBottom: 24, whiteSpace: 'pre-line' }}>{`I'm a software engineer and DevOps architect with 11+ years of experience building and scaling products across Python, Java, JavaScript, and PHP, using frameworks like Spring, Django, FastAPI, Angular, React and more.\n\nI've designed and operated cloud-native platforms on AWS and GKE with Kubernetes and Docker, with a strong focus on reliability, performance, security and delivery speed. My current focus is AI-first product engineering: building machine learning and agentic systems with PyTorch, NumPy, Pandas, and LangChain to turn cutting-edge models into practical business outcomes.`}</p>
              <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
                {ME.socials.map(s => (
                  <a key={s.label} href={s.href} target="_blank" rel="noopener noreferrer"
                    style={{ fontFamily: mono, fontSize: 9, fontWeight: 600, letterSpacing: 1.5, textTransform: 'uppercase', padding: '6px 12px', border: `1px solid ${C.border}`, color: C.muted, textDecoration: 'none', transition: 'all .2s' }}
                    onMouseEnter={e => { (e.currentTarget as HTMLAnchorElement).style.borderColor = C.cyan; (e.currentTarget as HTMLAnchorElement).style.color = C.cyan; (e.currentTarget as HTMLAnchorElement).style.boxShadow = `0 0 10px rgba(var(--cyan-rgb),.1)` }}
                    onMouseLeave={e => { (e.currentTarget as HTMLAnchorElement).style.borderColor = C.border; (e.currentTarget as HTMLAnchorElement).style.color = C.muted; (e.currentTarget as HTMLAnchorElement).style.boxShadow = 'none' }}>
                    {s.label}
                  </a>
                ))}
              </div>
            </motion.div>

            {/* RIGHT: timeline */}
            <div>
              <motion.div variants={revealVariant} style={{ display: 'flex', alignItems: isPhone ? 'flex-start' : 'center', justifyContent: 'space-between', flexDirection: isPhone ? 'column' : 'row', gap: isPhone ? 8 : 0, paddingBottom: 24, borderBottom: `1px solid ${C.border}`, marginBottom: 40 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
                  <span style={{ fontFamily: mono, fontSize: 9, fontWeight: 700, letterSpacing: 3, color: C.cyan, opacity: .5 }}>EXP</span>
                  <span style={{ fontFamily: mono, fontSize: 14, fontWeight: 700, letterSpacing: 2, textTransform: 'uppercase' }}>Work Experience</span>
                </div>
                <span style={{ fontSize: 10, letterSpacing: 2, color: C.muted }}>{`${EXPERIENCE.length} COMPANIES`}</span>
              </motion.div>

              <div style={{ position: 'relative', paddingLeft: isPhone ? 20 : 28 }}>
                {/* Vertical line */}
                <div style={{ position: 'absolute', left: isPhone ? 4 : 0, top: 8, bottom: 8, width: 1, background: `linear-gradient(to bottom,${C.cyan},${C.purple},transparent)`, opacity: .4 }} />

                {EXPERIENCE.map((exp, i) => (
                  <motion.div key={i} variants={revealVariant} style={{ position: 'relative', marginBottom: i < EXPERIENCE.length - 1 ? 36 : 0 }}
                    onMouseEnter={e => {
                      const dot  = e.currentTarget.querySelector<HTMLElement>('[data-dot]')
                      const card = e.currentTarget.querySelector<HTMLElement>('[data-card]')
                      if (dot)  { dot.style.borderColor = C.pink; dot.style.boxShadow = `0 0 14px rgba(var(--pink-rgb),.5)` }
                      if (card) { card.style.borderColor = 'rgba(var(--cyan-rgb),.2)'; card.style.background = 'rgba(var(--cyan-rgb),.015)' }
                    }}
                    onMouseLeave={e => {
                      const dot  = e.currentTarget.querySelector<HTMLElement>('[data-dot]')
                      const card = e.currentTarget.querySelector<HTMLElement>('[data-card]')
                      if (dot)  { dot.style.borderColor = C.cyan; dot.style.boxShadow = `0 0 10px rgba(var(--cyan-rgb),.4)` }
                      if (card) { card.style.borderColor = C.border; card.style.background = C.card }
                    }}>
                    <div data-dot style={{ position: 'absolute', left: isPhone ? -20 : -33, top: 8, width: 10, height: 10, borderRadius: '50%', background: C.bg, border: `2px solid ${C.cyan}`, boxShadow: `0 0 10px rgba(var(--cyan-rgb),.4)`, transition: 'border-color .2s, box-shadow .2s' }} />
                    <div data-card style={{ background: C.card, border: `1px solid ${C.border}`, padding: isPhone ? '20px 18px' : '26px 28px', position: 'relative', overflow: 'hidden', transition: 'border-color .3s, background .3s' }}>
                      <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 1, background: `linear-gradient(90deg,${C.cyan},transparent)`, opacity: .4 }} />
                      <div style={{ display: 'flex', alignItems: isPhone ? 'flex-start' : 'center', justifyContent: 'space-between', gap: 12, marginBottom: 14, flexDirection: isPhone ? 'column' : 'row' }}>
                        <div style={{ fontFamily: mono, fontSize: isPhone ? 12 : 13, fontWeight: 700, letterSpacing: .5 }}>{exp.role}</div>
                        <div style={{ fontFamily: mono, fontSize: 10, fontWeight: 700, letterSpacing: 2, color: C.cyan, opacity: .7, whiteSpace: 'nowrap', paddingTop: 2 }}>{exp.years}</div>
                      </div>
                      <p style={{ fontSize: isPhone ? 11 : 12, fontWeight: 300, color: C.muted2, lineHeight: 1.8, marginBottom: 18, borderLeft: `2px solid rgba(var(--cyan-rgb),.12)`, paddingLeft: 12 }}>{exp.achievement}</p>
                      <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
                        {exp.stack.map(s => <Pill key={s.label} label={s.label} color={s.color} />)}
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      </section>

      {/* ════════════════════════════════════
          SERVICES
      ════════════════════════════════════ */}
      <section id="services" style={{ padding: `${sectionVerticalPad}px ${horizontalPad}px`, borderTop: `1px solid ${C.border}`, background: C.surface, position: 'relative' }}>
        <SectionTopLine color={C.pink} />
        <motion.div variants={staggerVariant} initial="hidden" whileInView="show" viewport={{ once: true, margin: '-80px' }}>

          {/* Header */}
          <motion.div variants={revealVariant} style={{ display: 'flex', alignItems: isPhone ? 'flex-start' : 'center', justifyContent: 'space-between', flexDirection: isPhone ? 'column' : 'row', gap: isPhone ? 10 : 0, marginBottom: isPhone ? 34 : 52 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: isPhone ? 12 : 20 }}>
              <span style={{ fontFamily: mono, fontSize: 10, fontWeight: 700, letterSpacing: 3, color: C.cyan, opacity: .6 }}>02</span>
              <span style={{ fontFamily: mono, fontSize: isPhone ? 20 : 24, fontWeight: 900, letterSpacing: 2, textTransform: 'uppercase' }}>Services</span>
            </div>
            <span style={{ fontSize: 10, letterSpacing: 2, color: C.muted }}>All engagements include weekly updates & Slack access</span>
          </motion.div>

          {/* Split-screen body */}
          <motion.div variants={revealVariant} style={{ display: 'flex', flexDirection: isPhone ? 'column' : 'row', gap: 1, background: C.border, minHeight: isPhone ? 'auto' : 520 }}>

            {/* ── LEFT: service list ── */}
            <div style={{ flex: '0 0 auto', width: isPhone ? '100%' : isTablet ? '38%' : '32%', background: C.card, display: 'flex', flexDirection: 'column' }}>
              {SERVICES.map((s, i) => {
                const isActive = openService === s.num
                return (
                  <div key={s.num}
                    onClick={() => setOpenService(s.num)}
                    style={{ position: 'relative', padding: isPhone ? '20px 22px' : '28px 32px', cursor: 'pointer', borderBottom: i < SERVICES.length - 1 ? `1px solid ${C.border}` : 'none', background: isActive ? 'var(--card-hover)' : 'transparent', transition: 'background .2s' }}
                    onMouseEnter={e => { if (!isActive) (e.currentTarget as HTMLDivElement).style.background = 'rgba(var(--cyan-rgb),.03)' }}
                    onMouseLeave={e => { if (!isActive) (e.currentTarget as HTMLDivElement).style.background = 'transparent' }}
                  >
                    {/* Active left bar */}
                    <div style={{ position: 'absolute', left: 0, top: 0, bottom: 0, width: 2, background: `linear-gradient(to bottom,${C.cyan},${C.purple})`, opacity: isActive ? 1 : 0, transition: 'opacity .25s', boxShadow: isActive ? `2px 0 10px rgba(var(--cyan-rgb),.3)` : 'none' }} />

                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 12 }}>
                      <div>
                        <div style={{ fontFamily: mono, fontSize: 8, fontWeight: 700, letterSpacing: 2.5, color: isActive ? C.cyan : C.muted, opacity: isActive ? .8 : .5, marginBottom: 6, transition: 'color .2s' }}>{s.num}</div>
                        <div style={{ fontFamily: mono, fontSize: isPhone ? 13 : 14, fontWeight: 700, letterSpacing: .5, color: isActive ? C.cyan : C.text, transition: 'color .2s' }}>{s.title}</div>
                      </div>
                      <div style={{ textAlign: 'right', flexShrink: 0 }}>
                        <div style={{ fontFamily: mono, fontSize: 9, letterSpacing: 1, color: C.muted, whiteSpace: 'nowrap' }}>{s.timeline}</div>
                        <motion.div animate={{ x: isActive ? 0 : -4, opacity: isActive ? 1 : 0 }} transition={{ duration: .2 }} style={{ fontFamily: mono, fontSize: 10, color: C.cyan, marginTop: 4 }}>→</motion.div>
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>

            {/* ── RIGHT: detail panel ── */}
            <div style={{ flex: 1, position: 'relative', overflow: 'hidden', background: C.bg }}>
              <AnimatePresence mode="wait">
                {SERVICES.filter(s => s.num === openService).map(s => (
                  <motion.div key={s.num}
                    initial={{ opacity: 0, x: 24 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -24 }}
                    transition={{ duration: .3, ease: EASE }}
                    style={{ padding: isPhone ? '28px 24px' : '44px 52px', height: '100%', display: 'flex', flexDirection: 'column', gap: 32, position: 'relative' }}
                  >
                    {/* Decorative number watermark */}
                    <div style={{ position: 'absolute', top: 24, right: 36, fontFamily: mono, fontSize: isPhone ? 80 : 120, fontWeight: 900, color: C.cyan, opacity: .04, lineHeight: 1, userSelect: 'none', pointerEvents: 'none' }}>{s.num}</div>

                    {/* Title block */}
                    <div>
                      <div style={{ fontFamily: mono, fontSize: 9, fontWeight: 700, letterSpacing: 3, color: C.cyan, opacity: .6, marginBottom: 12 }}>{`SERVICE ${s.num}`}</div>
                      <h3 style={{ margin: 0, fontFamily: mono, fontSize: isPhone ? 22 : 28, fontWeight: 900, letterSpacing: 1, color: C.text, lineHeight: 1.1, marginBottom: 16 }}>{s.title}</h3>
                      <p style={{ margin: 0, fontSize: isPhone ? 13 : 14, fontWeight: 300, color: C.muted2, lineHeight: 1.85, maxWidth: 520 }}>{s.desc}</p>
                    </div>

                    {/* Checklist */}
                    <div>
                      <div style={{ fontFamily: mono, fontSize: 8, fontWeight: 700, letterSpacing: 2.5, color: C.muted, marginBottom: 14, textTransform: 'uppercase' }}>{"What's included"}</div>
                      <div style={{ display: 'flex', flexDirection: 'column', gap: 0 }}>
                        {s.checks.map((item, ci) => (
                          <div key={ci} style={{ display: 'flex', alignItems: 'center', gap: 14, padding: '10px 0', borderBottom: `1px solid rgba(var(--divider-rgb),.7)` }}>
                            <div style={{ flexShrink: 0, width: 16, height: 16, border: `1px solid rgba(var(--green-rgb),.35)`, background: 'rgba(var(--green-rgb),.06)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 9, color: C.green }}>✓</div>
                            <span style={{ fontSize: isPhone ? 11 : 12, fontWeight: 300, color: C.muted2, lineHeight: 1.5 }}>{item}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Footer: stack + timeline */}
                    <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'flex-end', justifyContent: 'space-between', gap: 20, marginTop: 'auto' }}>
                      <div>
                        <div style={{ fontFamily: mono, fontSize: 8, fontWeight: 700, letterSpacing: 2.5, color: C.muted, marginBottom: 10, textTransform: 'uppercase' }}>Tech Stack</div>
                        <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
                          {s.stack.map(st => (
                            <span key={st} style={{ fontSize: 9, fontWeight: 600, letterSpacing: 1, textTransform: 'uppercase', padding: '3px 9px', border: `1px solid rgba(var(--cyan-rgb),.25)`, color: C.cyan, background: 'rgba(var(--cyan-rgb),.04)', opacity: .7 }}>{st}</span>
                          ))}
                        </div>
                      </div>
                      <div style={{ textAlign: isPhone ? 'left' : 'right' }}>
                        <div style={{ fontFamily: mono, fontSize: 8, fontWeight: 700, letterSpacing: 2.5, color: C.muted, marginBottom: 6, textTransform: 'uppercase' }}>Timeline</div>
                        <div style={{ fontFamily: mono, fontSize: 16, fontWeight: 900, color: C.cyan, letterSpacing: 1 }}>{s.timeline}</div>
                        <div style={{ fontSize: 10, color: C.muted, marginTop: 4, maxWidth: 260, lineHeight: 1.6 }}>{s.note}</div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>

          </motion.div>
        </motion.div>
      </section>

      {/* ════════════════════════════════════
          PROJECTS
      ════════════════════════════════════ */}
      <section id="projects" style={{ padding: `${sectionVerticalPad}px ${horizontalPad}px`, borderTop: `1px solid ${C.border}`, position: 'relative' }}>
        <SectionTopLine />
        <motion.div variants={staggerVariant} initial="hidden" whileInView="show" viewport={{ once: true, margin: '-80px' }}>
          <motion.div variants={revealVariant}
            onClick={() => setProjectsOpen(o => !o)}
            whileHover="hov"
            style={{ display: 'flex', alignItems: isPhone ? 'flex-start' : 'center', justifyContent: 'space-between', flexDirection: isPhone ? 'column' : 'row', gap: isPhone ? 10 : 0, cursor: 'pointer', userSelect: 'none', padding: '12px 16px', margin: `-12px -16px ${projectsOpen ? (isPhone ? 22 : 36) : -12}px`, borderRadius: 2, transition: 'background .2s' }}
            onMouseEnter={e => (e.currentTarget as HTMLElement).style.background = 'rgba(var(--cyan-rgb),.04)'}
            onMouseLeave={e => (e.currentTarget as HTMLElement).style.background = 'transparent'}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: isPhone ? 12 : 20 }}>
              <span style={{ fontFamily: mono, fontSize: 10, fontWeight: 700, letterSpacing: 3, color: C.cyan, opacity: .6 }}>03</span>
              <span style={{ fontFamily: mono, fontSize: isPhone ? 20 : 24, fontWeight: 900, letterSpacing: 2, textTransform: 'uppercase' }}>Portfolio</span>
              {!projectsOpen && (
                <motion.span
                  animate={{ opacity: [.4, 1, .4] }}
                  transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
                  style={{ fontFamily: mono, fontSize: 8, fontWeight: 700, letterSpacing: 2, color: C.cyan, border: `1px solid rgba(var(--cyan-rgb),.3)`, padding: '2px 8px', marginLeft: 4 }}
                >CLICK TO EXPAND</motion.span>
              )}
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
              <span style={{ fontSize: 10, letterSpacing: 2, color: C.muted }}>
                {`${PROJECTS.length} project${PROJECTS.length === 1 ? '' : 's'}`}
              </span>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: 28, height: 28, border: `1px solid rgba(var(--cyan-rgb),.3)`, background: projectsOpen ? 'rgba(var(--cyan-rgb),.08)' : 'transparent', transition: 'background .2s, border-color .2s' }}>
                <motion.span
                  animate={{ rotate: projectsOpen ? 180 : 0 }}
                  transition={{ duration: .25 }}
                  style={{ fontFamily: mono, fontSize: 12, color: C.cyan, display: 'inline-block', lineHeight: 1 }}
                >↓</motion.span>
              </div>
            </div>
          </motion.div>

          <AnimatePresence initial={false}>
          {projectsOpen && (
          <motion.div
            key="projects-grid"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: .35, ease: EASE }}
            style={{ overflow: 'hidden' }}
          >
          <div style={{ display: 'grid', gridTemplateColumns: isPhone ? '1fr' : '1fr 1fr', gap: 1, background: C.border }}>
          {PROJECTS.map(p => {
            const isActiveRow = isCompact || hoveredRow === p.slug
            return (
              <motion.div key={p.slug}
                style={{ position: 'relative', overflow: 'hidden', background: isActiveRow ? 'rgba(var(--cyan-rgb),.015)' : C.bg, transition: 'border-color .3s,background .3s' }}
                onMouseEnter={() => { if (!isCompact) setHoveredRow(p.slug) }}
                onMouseLeave={() => { if (!isCompact) setHoveredRow(null) }}>
              <motion.div animate={{ scaleY: isActiveRow ? 1 : 0 }} transition={{ duration: .4, ease: EASE }}
                style={{ position: 'absolute', left: 0, top: 0, bottom: 0, width: 2, background: `linear-gradient(${C.cyan},${C.purple})`, transformOrigin: 'top', boxShadow: `2px 0 12px rgba(var(--cyan-rgb),.4)` }} />
              <motion.div animate={{ opacity: isActiveRow ? .4 : 0 }} transition={{ duration: .3 }}
                style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 1, background: `linear-gradient(90deg,transparent,${C.cyan},transparent)` }} />

              <div style={{ display: 'grid', gridTemplateColumns: isPhone ? '1fr' : isTablet ? '52px minmax(0,1fr) auto' : '64px minmax(0,1fr) auto', alignItems: isPhone ? 'flex-start' : 'center', gap: isPhone ? 16 : 28, padding: isPhone ? '20px 18px' : '28px 32px' }}>
                <span style={{ fontFamily: mono, fontSize: 10, fontWeight: 700, letterSpacing: 2, color: C.muted }}>{p.index}</span>

                <div>
                  <h3 style={{ margin: 0, fontFamily: mono, fontSize: isPhone ? 16 : 18, fontWeight: 700, letterSpacing: .5, color: isActiveRow ? C.cyan : C.text, textShadow: isActiveRow ? `0 0 20px rgba(var(--cyan-rgb),.3)` : 'none', transition: 'color .2s,text-shadow .2s' }}>
                    {p.title}
                  </h3>
                  <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap', marginTop: 16 }}>
                    {p.stack.map(t => <Pill key={t} label={t} />)}
                  </div>
                </div>

                <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', justifySelf: isPhone ? 'center' : 'end', marginTop: isPhone ? 18 : 0 }}>
                  {p.project ? (
                    <Link href={p.project}
                      style={{ fontFamily: mono, fontSize: 9, fontWeight: 700, letterSpacing: 1.5, textTransform: 'uppercase', textDecoration: 'none', padding: '8px 14px', border: `1px solid rgba(var(--pink-rgb),.28)`, color: C.pink, transition: 'border-color .2s, box-shadow .2s' }}
                      onMouseEnter={e => { (e.currentTarget as HTMLAnchorElement).style.borderColor = C.pink; (e.currentTarget as HTMLAnchorElement).style.boxShadow = `0 0 12px rgba(var(--pink-rgb),.2)` }}
                      onMouseLeave={e => { (e.currentTarget as HTMLAnchorElement).style.borderColor = 'rgba(var(--pink-rgb),.28)'; (e.currentTarget as HTMLAnchorElement).style.boxShadow = 'none' }}>
                      {'Explore →'}
                    </Link>
                  ) : (
                    <Link href={`/projects/${p.slug}`}
                      style={{ fontFamily: mono, fontSize: 9, fontWeight: 700, letterSpacing: 1.5, textTransform: 'uppercase', textDecoration: 'none', padding: '8px 14px', border: `1px solid rgba(var(--pink-rgb),.28)`, color: C.pink, transition: 'border-color .2s, box-shadow .2s' }}
                      onMouseEnter={e => { (e.currentTarget as HTMLAnchorElement).style.borderColor = C.pink; (e.currentTarget as HTMLAnchorElement).style.boxShadow = `0 0 12px rgba(var(--pink-rgb),.2)` }}
                      onMouseLeave={e => { (e.currentTarget as HTMLAnchorElement).style.borderColor = 'rgba(var(--pink-rgb),.28)'; (e.currentTarget as HTMLAnchorElement).style.boxShadow = 'none' }}>
                      {'Explore →'}
                    </Link>
                  )}
                </div>
              </div>
              </motion.div>
            )
          })}
          </div>
          </motion.div>
          )}
          </AnimatePresence>
        </motion.div>
      </section>

      {/* ════════════════════════════════════
          BLOG
      ════════════════════════════════════ */}
      <section id="blog" style={{ padding: `${sectionVerticalPad}px ${horizontalPad}px`, background: C.surface, borderTop: `1px solid ${C.border}`, position: 'relative' }}>
        <SectionTopLine color={C.pink} />
        <motion.div variants={staggerVariant} initial="hidden" whileInView="show" viewport={{ once: true, margin: '-80px' }}>
          <motion.div variants={revealVariant} style={{ display: 'flex', justifyContent: 'space-between', alignItems: isPhone ? 'flex-start' : 'center', flexDirection: isPhone ? 'column' : 'row', gap: isPhone ? 10 : 0, paddingBottom: 24, borderBottom: `1px solid ${C.border}`, marginBottom: 0 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: isPhone ? 12 : 20 }}>
              <span style={{ fontFamily: mono, fontSize: 10, fontWeight: 700, letterSpacing: 3, color: C.cyan, opacity: .6 }}>04</span>
              <span style={{ fontFamily: mono, fontSize: isPhone ? 20 : 24, fontWeight: 900, letterSpacing: 2, textTransform: 'uppercase' }}>Writing</span>
            </div>
            <Link href="/blog" style={{ fontFamily: mono, fontSize: 9, fontWeight: 700, letterSpacing: 2, color: C.muted, textDecoration: 'none' }}>ALL POSTS →</Link>
          </motion.div>
          {latestPosts.length === 0 ? (
            <p style={{ color: C.muted, fontSize: 12, marginTop: 32 }}>No posts yet — drop your first .mdx file in /content/blog/</p>
          ) : latestPosts.map((post, i) => (
            <motion.div key={i} variants={revealVariant}>
              <Link href={post.url}
                style={{ display: 'grid', gridTemplateColumns: isPhone ? '1fr' : '64px 1fr auto', gap: isPhone ? 12 : 32, alignItems: isPhone ? 'flex-start' : 'center', padding: isPhone ? '20px 0' : '28px 0', borderBottom: `1px solid ${C.border}`, textDecoration: 'none', color: 'inherit', transition: 'padding-left .3s ease', position: 'relative' }}
                onMouseEnter={e => { if (!isCompact) (e.currentTarget as HTMLAnchorElement).style.paddingLeft = '20px' }}
                onMouseLeave={e => { if (!isCompact) (e.currentTarget as HTMLAnchorElement).style.paddingLeft = '0' }}>
                <span style={{ fontFamily: mono, fontSize: 10, fontWeight: 700, letterSpacing: 2, color: C.muted }}>{String(i + 1).padStart(2, '0')}</span>
                <div>
                  <div style={{ fontFamily: mono, fontSize: isPhone ? 14 : 15, fontWeight: 700, letterSpacing: .5, marginBottom: 10 }}>{post.title}</div>
                  <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
                    {post.tags.map(tag => <span key={tag} style={{ fontSize: 9, fontWeight: 600, letterSpacing: 1.5, textTransform: 'uppercase', color: C.muted }}>{tag}</span>)}
                  </div>
                </div>
                <div style={{ textAlign: isPhone ? 'left' : 'right' }}>
                  <div style={{ fontSize: 10, letterSpacing: 1.5, color: C.muted, marginBottom: 4 }}>
                    {new Date(post.date).toLocaleDateString('en-US', { month: 'short', year: 'numeric' }).toUpperCase()}
                  </div>
                  <div style={{ fontFamily: mono, fontSize: 10, fontWeight: 700, color: C.cyan, textShadow: `0 0 8px rgba(var(--cyan-rgb),.3)` }}>{`${post.readingTime} MIN`}</div>
                </div>
              </Link>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* ════════════════════════════════════
          FOOTER / CONTACT
      ════════════════════════════════════ */}
      <footer id="contact" style={{ padding: `clamp(40px,8vw,80px) ${horizontalPad}px 48px`, borderTop: `1px solid ${C.border}`, position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 1, background: `linear-gradient(90deg,transparent,${C.cyan},transparent)`, opacity: .4 }} />
        <div style={{ position: 'absolute', bottom: -100, left: '50%', transform: 'translateX(-50%)', width: 600, height: 300, background: `radial-gradient(circle,rgba(var(--cyan-rgb),.05),transparent 70%)`, pointerEvents: 'none' }} />
        <motion.div variants={staggerVariant} initial="hidden" whileInView="show" viewport={{ once: true }}>
          <motion.div variants={revealVariant} style={{ fontFamily: mono, fontSize: isPhone ? 'clamp(28px,12vw,44px)' : 'clamp(28px,5vw,56px)', fontWeight: 900, letterSpacing: -1, lineHeight: 1, marginBottom: isPhone ? 34 : 48 }}>
            <span>{"LET'S BUILD"}</span><br />
            <span style={{ color: C.cyan, textShadow: `0 0 30px rgba(var(--cyan-rgb),.4)` }}>SOMETHING</span><br />
            <span style={{ color: C.pink, textShadow: `0 0 30px rgba(var(--pink-rgb),.4)` }}>GREAT.</span>
          </motion.div>

          {/* Two-column contact layout */}
          <motion.div variants={revealVariant} style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(280px,1fr))', gap: isPhone ? 28 : 48, marginBottom: isPhone ? 48 : 64 }}>

            {/* LEFT — info */}
            <div>
              <div style={{ fontFamily: mono, fontSize: 8, fontWeight: 700, letterSpacing: 2.5, textTransform: 'uppercase', color: C.muted, marginBottom: 20 }}>Get in touch</div>
              {[
                { icon: '✉', label: 'Email',         val: ME.email },
                { icon: '⏱', label: 'Response time', val: 'Usually within 24 hours' },
                { icon: '🌍', label: 'Timezone',      val: 'UTC+0 — flexible for async' },
                { icon: '✅', label: 'Availability',  val: 'Open to new projects now' },
              ].map(({ icon, label, val }) => (
                <div key={label} style={{ display: 'flex', alignItems: 'center', gap: 16, padding: '14px 0', borderBottom: `1px solid ${C.border}`, transition: 'padding-left .2s' }}
                  onMouseEnter={e => (e.currentTarget as HTMLDivElement).style.paddingLeft = '8px'}
                  onMouseLeave={e => (e.currentTarget as HTMLDivElement).style.paddingLeft = '0'}>
                  <div style={{ width: 32, height: 32, border: `1px solid ${C.border}`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 14, flexShrink: 0 }}>{icon}</div>
                  <div>
                    <div style={{ fontFamily: mono, fontSize: 8, letterSpacing: 2, textTransform: 'uppercase', color: C.muted, marginBottom: 3 }}>{label}</div>
                    <div style={{ fontSize: 13, fontWeight: 400, color: C.text }}>{val}</div>
                  </div>
                </div>
              ))}
              <div style={{ marginTop: 28, background: C.surface, border: `1px solid ${C.border}`, borderLeft: `2px solid rgba(var(--cyan-rgb),.3)`, padding: '18px 22px' }}>
                <div style={{ fontFamily: mono, fontSize: 8, fontWeight: 700, letterSpacing: 2, textTransform: 'uppercase', color: C.cyan, marginBottom: 10, opacity: .7 }}>Before you reach out</div>
                <p style={{ fontSize: 12, fontWeight: 300, color: C.muted2, lineHeight: 1.8 }}>{"I work with a small number of clients at a time to keep quality high. Drop a brief description of what you're building — even rough ideas are welcome."}</p>
              </div>
            </div>

            {/* RIGHT — form */}
            <ContactForm C={C} mono={mono} services={SERVICES} form={{
              nameLabel: 'Your Name',
              namePlaceholder: 'Jane Smith',
              emailLabel: 'Email Address',
              emailPlaceholder: 'jane@company.com',
              serviceLabel: 'Service Interested In',
              servicePlaceholder: 'Select a service…',
              serviceOther: 'Something else / Not sure yet',
              descLabel: 'Project Description',
              descPlaceholder: "Tell me about your project — what you're building, where you are in the process, and what you need help with…",
              sending: 'SENDING…',
              send: 'SEND MESSAGE →',
              successTitle: 'Message received.',
              successBody: "Thanks for reaching out. I'll review your project details and get back to you within 24 hours.",
            }} />
          </motion.div>

          <motion.div variants={revealVariant} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderTop: `1px solid ${C.border}`, paddingTop: 32, flexWrap: 'wrap', gap: 16 }}>
            <span style={{ fontSize: 10, letterSpacing: 1.5, color: C.muted }}>{`© ${new Date().getFullYear()} ${ME.name} — BUILT WITH NEXT.JS & VERCEL`}</span>
            <div style={{ display: 'flex', gap: 28 }}>
              {ME.socials.map(s => (
                <a key={s.label} href={s.href} target="_blank" rel="noopener noreferrer"
                  style={{ fontSize: 10, fontWeight: 500, letterSpacing: 2, color: C.muted, textDecoration: 'none', transition: 'color .2s' }}
                  onMouseEnter={e => (e.currentTarget as HTMLAnchorElement).style.color = C.cyan}
                  onMouseLeave={e => (e.currentTarget as HTMLAnchorElement).style.color = C.muted}>
                  {s.label.toUpperCase()}
                </a>
              ))}
            </div>
          </motion.div>
        </motion.div>
      </footer>

    </div>
  )
}
