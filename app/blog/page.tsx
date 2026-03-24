import { getAllPosts } from '@/lib/posts'
import Link from 'next/link'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Blog',
  description: 'Thoughts on AI, LLMs, and software development.',
}

interface BlogPageProps {
  searchParams?: {
    tag?: string | string[]
  }
}

export default function BlogPage({ searchParams }: BlogPageProps) {
  const posts = getAllPosts()
  const allTags = Array.from(new Set(posts.flatMap(p => p.tags)))
  const rawSelectedTag = searchParams?.tag
  const selectedTag = Array.isArray(rawSelectedTag) ? rawSelectedTag[0] : rawSelectedTag
  const activeTag = selectedTag && allTags.includes(selectedTag) ? selectedTag : undefined
  const filteredPosts = activeTag ? posts.filter(post => post.tags.includes(activeTag)) : posts

  return (
    <main style={{ background: 'var(--blog-page-bg)', color: 'var(--blog-text)', minHeight: '100vh', padding: '96px clamp(16px,4vw,48px) clamp(72px,8vw,120px)', fontFamily: "'Space Mono', monospace" }}>
      <Link href="/" style={{ fontSize: 11, letterSpacing: 3, color: 'var(--blog-muted)', textDecoration: 'none', display: 'inline-block', marginBottom: 'clamp(36px,6vw,64px)' }}>← BACK HOME</Link>
      <div style={{ marginBottom: 'clamp(34px,6vw,64px)' }}>
        <div style={{ fontSize: 10, letterSpacing: 4, color: 'var(--blog-accent)', marginBottom: 12 }}>
          {activeTag ? `FILTER: ${activeTag.toUpperCase()}` : 'ALL WRITING'}
        </div>
        <h1 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 'clamp(40px,8vw,56px)', fontWeight: 300, lineHeight: 1 }}>Blog</h1>
      </div>
      <div style={{ marginBottom: 'clamp(28px,5vw,48px)', display: 'flex', gap: 12, flexWrap: 'wrap' }}>
        <Link
          href="/blog"
          style={{
            fontSize: 9,
            letterSpacing: 3,
            textDecoration: 'none',
            border: !activeTag ? '1px solid rgba(var(--blog-accent-rgb),.5)' : '1px solid var(--blog-border)',
            color: !activeTag ? 'var(--blog-accent)' : 'var(--blog-muted)',
            background: !activeTag ? 'rgba(var(--blog-accent-rgb),.08)' : 'var(--blog-tag-bg)',
            padding: '4px 12px',
          }}
        >
          ALL
        </Link>
        {allTags.map(tag => {
          const isActive = tag === activeTag
          return (
            <Link
              key={tag}
              href={{ pathname: '/blog', query: { tag } }}
              style={{
                fontSize: 9,
                letterSpacing: 3,
                textDecoration: 'none',
                border: isActive ? '1px solid rgba(var(--blog-accent-rgb),.5)' : '1px solid var(--blog-border)',
                color: isActive ? 'var(--blog-accent)' : 'var(--blog-muted)',
                background: isActive ? 'rgba(var(--blog-accent-rgb),.08)' : 'var(--blog-tag-bg)',
                padding: '4px 12px',
              }}
            >
              {tag}
            </Link>
          )
        })}
      </div>
      <div>
        {filteredPosts.length === 0 ? (
          <p style={{ fontSize: 13, color: 'var(--blog-muted3)', borderTop: '1px solid var(--blog-border)', borderBottom: '1px solid var(--blog-border)', padding: '28px 0' }}>
            No posts found for this tag.
          </p>
        ) : filteredPosts.map((post) => (
          <Link key={post.slug} href={post.url} style={{ display: 'block', padding: 'clamp(24px,4.5vw,40px) 0', borderBottom: '1px solid var(--blog-border)', textDecoration: 'none', color: 'inherit' }}>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(220px,1fr))', alignItems: 'flex-start', gap: 'clamp(16px,3vw,32px)' }}>
              <div>
                <div style={{ display: 'flex', gap: 8, marginBottom: 16, flexWrap: 'wrap' }}>
                  {post.tags.map(tag => (
                    <span key={tag} style={{ fontSize: 9, letterSpacing: 3, border: '1px solid rgba(var(--blog-accent-rgb),.35)', color: 'var(--blog-accent)', background: 'rgba(var(--blog-accent-rgb),.06)', padding: '3px 10px' }}>{tag}</span>
                  ))}
                </div>
                <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 'clamp(28px,6vw,36px)', fontWeight: 400, marginBottom: 12, lineHeight: 1.1 }}>{post.title}</h2>
                <p style={{ fontSize: 12, color: 'var(--blog-muted3)', lineHeight: 1.8, maxWidth: 640 }}>{post.excerpt}</p>
              </div>
              <div style={{ textAlign: 'right', justifySelf: 'end' }}>
                <div style={{ fontSize: 10, color: 'var(--blog-muted2)', letterSpacing: 2, marginBottom: 8 }}>
                  {new Date(post.date).toLocaleDateString('en-US', { day: 'numeric', month: 'long', year: 'numeric' })}
                </div>
                <div style={{ fontSize: 11, color: 'var(--blog-accent)' }}>{post.readingTime} min read</div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </main>
  )
}
