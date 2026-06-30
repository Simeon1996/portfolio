import Link from 'next/link'
import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import ImageSlider from './ImageSlider'
import { PROJECT_DETAILS } from '@/lib/projects'
import { SITE_URL } from '@/lib/config'

export function generateStaticParams() {
  return Object.keys(PROJECT_DETAILS).map(slug => ({ slug }))
}

export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const project = PROJECT_DETAILS[params.slug]
  if (!project) return {}
  const projectUrl = `${SITE_URL}/projects/${params.slug}`
  return {
    title: project.title,
    description: project.description,
    keywords: project.stack,
    alternates: { canonical: projectUrl },
    openGraph: {
      title: project.title,
      description: project.description,
      url: projectUrl,
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title: project.title,
      description: project.description,
      creator: '@simeonivanov',
    },
  }
}

export default function ProjectPage({ params }: { params: { slug: string } }) {
  const project = PROJECT_DETAILS[params.slug]

  if (!project) {
    notFound()
  }

  return (
    <main
      style={{
        minHeight: '100vh',
        background: 'var(--bg)',
        color: 'var(--text)',
        padding: '96px 24px 72px',
        fontFamily: "'Space Grotesk', sans-serif",
      }}
    >
      <div style={{ maxWidth: 1100, margin: '0 auto' }}>
        <div
          style={{
            display: 'inline-block',
            marginBottom: 24,
            padding: '6px 10px',
            border: '1px solid rgba(var(--cyan-rgb),.24)',
            color: 'var(--cyan)',
            fontSize: 11,
            fontWeight: 600,
            letterSpacing: 2,
            textTransform: 'uppercase',
          }}
        >
          Project Overview
        </div>

        <h1
          style={{
            margin: '0 0 18px',
            fontFamily: "'Orbitron', monospace",
            fontSize: 'clamp(28px, 5vw, 50px)',
            letterSpacing: 1,
            lineHeight: 1.1,
          }}
        >
          {project.title}
        </h1>

        <p
          style={{
            margin: '0 0 20px',
            color: 'var(--muted2)',
            fontSize: 16,
            lineHeight: 1.9,
            maxWidth: 760,
          }}
        >
          {project.description}
        </p>

        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, marginBottom: 30 }}>
          {project.stack.map((t: string) => (
            <span
              key={t}
              style={{ fontSize: 9, fontWeight: 600, letterSpacing: 1, textTransform: 'uppercase', padding: '3px 9px', border: '1px solid rgba(var(--cyan-rgb),.25)', color: 'var(--cyan)', background: 'rgba(var(--cyan-rgb),.04)', opacity: .7 }}
            >{t}</span>
          ))}
        </div>

        {project.demo && (
          <div style={{ marginBottom: 30, border: '1px solid rgba(var(--orange-rgb),.4)', borderLeft: '3px solid var(--orange)', background: 'rgba(var(--orange-rgb),.06)', padding: '16px 20px', maxWidth: 760 }}>
            <div style={{ fontFamily: "'Orbitron', monospace", fontSize: 10, fontWeight: 700, letterSpacing: 2, textTransform: 'uppercase', color: 'var(--orange)', marginBottom: 8 }}>Live Demo</div>
            <p style={{ margin: 0, fontSize: 14, lineHeight: 1.8, color: 'var(--muted2)' }}>
              This is a live, front-end demo. On request, I&apos;ll wire up a production backend with the stack of your choice — LangChain, LangGraph, Qdrant, Weaviate, PostgreSQL, Pinecone, and more.
            </p>
          </div>
        )}

        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 12, marginBottom: 64 }}>
          {project.preview ? (
            <a
              href={project.preview}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                textDecoration: 'none',
                border: '1px solid rgba(var(--cyan-rgb),.28)',
                color: 'var(--cyan)',
                padding: '10px 16px',
                fontFamily: "'Orbitron', monospace",
                fontSize: 11,
                fontWeight: 700,
                letterSpacing: 1.4,
                textTransform: 'uppercase',
              }}
            >
              Preview ↗
            </a>
          ) : (
            <span
              style={{
                border: '1px solid rgba(var(--muted-rgb, 100,100,120),.25)',
                color: 'var(--muted)',
                padding: '10px 16px',
                fontFamily: "'Orbitron', monospace",
                fontSize: 11,
                fontWeight: 700,
                letterSpacing: 1.4,
                textTransform: 'uppercase',
                opacity: .5,
                cursor: 'default',
              }}
            >
              Private
            </span>
          )}

          <Link
            href="/#projects"
            style={{
              textDecoration: 'none',
              border: '1px solid rgba(var(--pink-rgb),.3)',
              color: 'var(--pink)',
              padding: '10px 16px',
              fontFamily: "'Orbitron', monospace",
              fontSize: 11,
              fontWeight: 700,
              letterSpacing: 1.4,
              textTransform: 'uppercase',
            }}
          >
            Back to Projects
          </Link>
        </div>

      </div>

      {/* Image Gallery — full-width */}
      <div style={{ borderTop: '1px solid rgba(var(--cyan-rgb),.12)', paddingTop: 48, maxWidth: 1400, margin: '0 auto', padding: '48px 24px 0' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 32 }}>
          <span style={{ fontFamily: "'Orbitron', monospace", fontSize: 10, fontWeight: 700, letterSpacing: 3, color: 'var(--cyan)', opacity: .6 }}>GALLERY</span>
          <div style={{ flex: 1, height: 1, background: 'linear-gradient(90deg, rgba(var(--cyan-rgb),.3), transparent)' }} />
        </div>
        <ImageSlider images={project.images} portrait={project.portrait} interval={project.interval} />
      </div>
    </main>
  )
}
