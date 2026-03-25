import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import readingTime from 'reading-time'

const BLOG_DIR = path.join(process.cwd(), 'content/blog')

export interface Post {
  slug: string
  title: string
  date: string
  updatedAt?: string
  excerpt: string
  tags: string[]
  published: boolean
  readingTime: number
  wordCount: number
  url: string
  content: string
}

export function getAllPosts(): Post[] {
  const files = fs.readdirSync(BLOG_DIR).filter(f => f.endsWith('.mdx'))
  return files
    .map(filename => {
      const slug = filename.replace(/\.mdx$/, '')
      const raw = fs.readFileSync(path.join(BLOG_DIR, filename), 'utf-8')
      const { data, content } = matter(raw)
      const stats = readingTime(content)
      return {
        slug,
        title: data.title ?? '',
        date: data.date ? new Date(data.date).toISOString() : '',
        updatedAt: data.updatedAt ? new Date(data.updatedAt).toISOString() : undefined,
        excerpt: data.excerpt ?? '',
        tags: data.tags ?? [],
        published: data.published !== false,
        readingTime: Math.ceil(stats.minutes),
        wordCount: content.split(/\s+/).filter(Boolean).length,
        url: `/blog/${slug}`,
        content,
      }
    })
    .filter(p => p.published)
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
}

export function getPostBySlug(slug: string): Post | undefined {
  return getAllPosts().find(p => p.slug === slug)
}
