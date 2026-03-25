import type { Metadata } from 'next'
import './globals.css'
import ThemeProvider from '@/components/ThemeProvider'
import { Analytics } from '@vercel/analytics/next'

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://simeonivanov.dev'

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: 'Simeon Ivanov — AI Engineer, DevOps & Full-Stack Developer',
    template: '%s | Simeon Ivanov',
  },
  description: 'Portfolio of Simeon Ivanov — building LLM-powered products, scalable APIs, and interfaces that feel effortless. Specialising in RAG, AI agents, DevOps, and full-stack engineering.',
  keywords: ['AI engineer', 'LLM', 'RAG', 'AI agents', 'DevOps', 'full-stack developer', 'LangChain', 'OpenAI', 'Python', 'TypeScript', 'Simeon Ivanov'],
  authors: [{ name: 'Simeon Ivanov', url: SITE_URL }],
  creator: 'Simeon Ivanov',
  openGraph: {
    title: 'Simeon Ivanov — AI Engineer, DevOps & Full-Stack Developer',
    description: 'Building LLM-powered products, scalable APIs, and interfaces that feel effortless.',
    type: 'website',
    url: SITE_URL,
    siteName: 'Simeon Ivanov',
    locale: 'en_US',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Simeon Ivanov — AI Engineer, DevOps & Full-Stack Developer',
    description: 'Building LLM-powered products, scalable APIs, and interfaces that feel effortless.',
    creator: '@simeonivanov',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, 'max-snippet': -1, 'max-image-preview': 'large', 'max-video-preview': -1 },
  },
  alternates: {
    canonical: SITE_URL,
  },
}

const personJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Person',
  name: 'Simeon Ivanov',
  url: SITE_URL,
  jobTitle: 'AI Engineer & Full-Stack Developer',
  description: 'Building LLM-powered products, scalable APIs, and interfaces that feel effortless. Specialising in RAG, AI agents, DevOps, and full-stack engineering.',
  knowsAbout: ['LLM', 'RAG', 'AI Agents', 'DevOps', 'LangChain', 'Python', 'TypeScript', 'React', 'Next.js', 'Kubernetes'],
  sameAs: [],
}

// Prevent flash of un-themed content by setting data-theme before React hydrates
const themeScript = `(function(){try{var t=localStorage.getItem('theme')||'dark';document.documentElement.setAttribute('data-theme',t)}catch(e){}})()`

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" data-theme="dark" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }} />
      </head>
      <body>
        <ThemeProvider>
          {children}
        </ThemeProvider>
        <Analytics />
      </body>
    </html>
  )
}
