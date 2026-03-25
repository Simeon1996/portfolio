import type { MetadataRoute } from 'next'
import { getAllPosts } from '@/lib/posts'
import { PROJECT_DETAILS } from '@/lib/projects'
import { SITE_URL } from '@/lib/config'

export default function sitemap(): MetadataRoute.Sitemap {
  const posts = getAllPosts()

  const blogEntries: MetadataRoute.Sitemap = posts.map(post => ({
    url: `${SITE_URL}/blog/${post.slug}`,
    lastModified: new Date(post.updatedAt ?? post.date),
    changeFrequency: 'monthly',
    priority: 0.8,
  }))

  const projectEntries: MetadataRoute.Sitemap = Object.keys(PROJECT_DETAILS).map(slug => ({
    url: `${SITE_URL}/projects/${slug}`,
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
      lastModified: posts[0] ? new Date(posts[0].date) : new Date(),
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    ...blogEntries,
    ...projectEntries,
  ]
}
