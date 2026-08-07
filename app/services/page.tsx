import type { Metadata } from 'next'
import ServicesClient from '@/components/ServicesClient'
import { SERVICES } from '@/lib/services'
import { SITE_URL } from '@/lib/config'

const title = 'Services — Simeon Ivanov'
const description =
  'AI integration, autonomous agents, fine-tuned self-hosted models, LLMOps, full-stack development, DevOps, and data pipelines — fixed, well-bounded engagements with weekly updates and full handoff.'

export const metadata: Metadata = {
  title,
  description,
  keywords: SERVICES.flatMap(s => s.stack).filter((t, i, a) => a.indexOf(t) === i),
  alternates: { canonical: `${SITE_URL}/services` },
  openGraph: {
    title,
    description,
    url: `${SITE_URL}/services`,
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title,
    description,
    creator: '@simeonivanov',
  },
}

export default function ServicesPage() {
  return <ServicesClient />
}
