import { NextResponse } from 'next/server'
import { getAllPosts } from '@/lib/posts'
import { SITE_URL } from '@/lib/config'

export const dynamic = 'force-static'

export function GET() {
  const posts = getAllPosts()

  const lines: string[] = [
    `# Simeon Ivanov — Complete Blog Archive`,
    ``,
    `Full content of all published articles for AI/LLM indexing.`,
    `Index: ${SITE_URL}/llms.txt`,
    ``,
    `---`,
    ``,
  ]

  for (const post of posts) {
    lines.push(`# ${post.title}`)
    lines.push(``)
    lines.push(`URL: ${SITE_URL}/blog/${post.slug}`)
    lines.push(`Published: ${post.date.slice(0, 10)}`)
    if (post.updatedAt) lines.push(`Updated: ${post.updatedAt.slice(0, 10)}`)
    lines.push(`Tags: ${post.tags.join(', ')}`)
    lines.push(`Reading time: ${post.readingTime} min`)
    lines.push(`Word count: ${post.wordCount}`)
    lines.push(``)
    lines.push(`## Summary`)
    lines.push(``)
    lines.push(post.excerpt)
    lines.push(``)
    lines.push(`## Full Content`)
    lines.push(``)
    lines.push(post.content.trim())
    lines.push(``)
    lines.push(`---`)
    lines.push(``)
  }

  return new NextResponse(lines.join('\n'), {
    headers: { 'Content-Type': 'text/plain; charset=utf-8' },
  })
}
