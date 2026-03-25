import type { MetadataRoute } from 'next'
import { getAllPosts } from '@/lib/posts'

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://simeonivanov.dev'

const PROJECT_SLUGS = [
  'rag', 'agent', 'devops', 'saas', 'resume', 'style',
  'email-rag', 'langchain-platform', 'mcp-platform',
  'android-freelance', 'quizforge', 'cookingintelligence',
  'botversehub', 'freelance',
]

export default function sitemap(): MetadataRoute.Sitemap {
  const posts = getAllPosts()

  const blogEntries: MetadataRoute.Sitemap = posts.map(post => ({
    url: `${SITE_URL}/blog/${post.slug}`,
    lastModified: new Date(post.date),
    changeFrequency: 'monthly',
    priority: 0.8,
  }))

  const projectEntries: MetadataRoute.Sitemap = PROJECT_SLUGS.map(slug => ({
    url: `${SITE_URL}/projects/${slug}`,
    lastModified: new Date(),
    changeFrequency: 'monthly',
    priority: 0.6,
  }))

  return [
    {
      url: SITE_URL,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 1,
    },
    {
      url: `${SITE_URL}/blog`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    ...blogEntries,
    ...projectEntries,
  ]
}
