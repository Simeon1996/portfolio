import type { Metadata } from 'next'
import { getAllPosts } from '@/lib/posts'
import PortfolioClient from '@/components/PortfolioClient'
import { SITE_URL } from '@/lib/config'

export const metadata: Metadata = {
  title: 'Simeon Ivanov — AI Engineer, DevOps & Full-Stack Developer',
  description: 'Portfolio of Simeon Ivanov — building LLM-powered products, scalable APIs, and interfaces that feel effortless. Specialising in RAG, AI agents, DevOps, and full-stack engineering.',
  alternates: { canonical: SITE_URL },
  openGraph: {
    title: 'Simeon Ivanov — AI Engineer, DevOps & Full-Stack Developer',
    description: 'Building LLM-powered products, scalable APIs, and interfaces that feel effortless.',
    url: SITE_URL,
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Simeon Ivanov — AI Engineer, DevOps & Full-Stack Developer',
    description: 'Building LLM-powered products, scalable APIs, and interfaces that feel effortless.',
    creator: '@simeonivanov',
  },
}

export default function HomePage() {
  const latestPosts = getAllPosts().slice(0, 5)
  return <PortfolioClient latestPosts={latestPosts} />
}
