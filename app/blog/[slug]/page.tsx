import { getAllPosts, getPostBySlug } from '@/lib/posts'
import { MDXRemote } from 'next-mdx-remote/rsc'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import type { Metadata } from 'next'
import remarkGfm from 'remark-gfm'
import rehypeHighlight from 'rehype-highlight'
import rehypeSlug from 'rehype-slug'
import CodeBlock from '@/components/CodeBlock'

interface Props { params: { slug: string } }

export async function generateStaticParams() {
  return getAllPosts().map(post => ({ slug: post.slug }))
}

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://simeonivanov.dev'

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const post = getPostBySlug(params.slug)
  if (!post) return {}
  const postUrl = `${SITE_URL}/blog/${post.slug}`
  return {
    title: post.title,
    description: post.excerpt,
    keywords: post.tags,
    authors: [{ name: 'Simeon Ivanov', url: SITE_URL }],
    openGraph: {
      title: post.title,
      description: post.excerpt,
      type: 'article',
      url: postUrl,
      publishedTime: post.date,
      authors: ['Simeon Ivanov'],
      tags: post.tags,
    },
    twitter: {
      card: 'summary_large_image',
      title: post.title,
      description: post.excerpt,
    },
    alternates: { canonical: postUrl },
  }
}

export default function PostPage({ params }: Props) {
  const post = getPostBySlug(params.slug)
  if (!post) notFound()

  const postUrl = `${SITE_URL}/blog/${post.slug}`
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: post.title,
    description: post.excerpt,
    datePublished: post.date,
    dateModified: post.date,
    url: postUrl,
    author: { '@type': 'Person', name: 'Simeon Ivanov', url: SITE_URL },
    publisher: { '@type': 'Person', name: 'Simeon Ivanov', url: SITE_URL },
    keywords: post.tags.join(', '),
    mainEntityOfPage: { '@type': 'WebPage', '@id': postUrl },
    timeRequired: `PT${post.readingTime}M`,
  }

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <main style={{ background: 'var(--blog-page-bg)', color: 'var(--blog-text)', minHeight: '100vh', fontFamily: "'Space Mono', monospace" }}>
      <div style={{ borderBottom: '1px solid var(--blog-border)', padding: '20px clamp(16px,4vw,48px)' }}>
        <Link href="/blog" style={{ fontSize: 11, letterSpacing: 3, color: 'var(--blog-muted)', textDecoration: 'none' }}>← ALL POSTS</Link>
      </div>
      <div style={{ padding: 'clamp(44px,8vw,80px) clamp(16px,4vw,48px) clamp(36px,6vw,64px)', maxWidth: 860 }}>
        <div style={{ display: 'flex', gap: 8, marginBottom: 24, flexWrap: 'wrap' }}>
          {post.tags.map(tag => (
            <span key={tag} style={{ fontSize: 9, letterSpacing: 3, border: '1px solid rgba(var(--blog-accent-rgb),.35)', color: 'var(--blog-accent)', background: 'rgba(var(--blog-accent-rgb),.06)', padding: '3px 10px' }}>{tag}</span>
          ))}
        </div>
        <h1 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 'clamp(36px, 6vw, 64px)', fontWeight: 300, lineHeight: 1.1, marginBottom: 24 }}>{post.title}</h1>
        <p style={{ fontSize: 14, color: 'var(--blog-muted3)', lineHeight: 1.8, marginBottom: 40 }}>{post.excerpt}</p>
        <div style={{ display: 'flex', flexWrap: 'wrap', rowGap: 10, columnGap: 32, fontSize: 11, color: 'var(--blog-muted2)', letterSpacing: 2, borderTop: '1px solid var(--blog-border)', paddingTop: 24 }}>
          <span>{new Date(post.date).toLocaleDateString('en-US', { day: 'numeric', month: 'long', year: 'numeric' })}</span>
          <span style={{ color: 'var(--blog-accent)' }}>{post.readingTime} min read</span>
        </div>
      </div>
      <article className="prose" style={{ maxWidth: 760, margin: '0 auto', padding: '0 clamp(16px,4vw,48px) clamp(80px,10vw,120px)' }}>
        <MDXRemote
          source={post.content}
          components={{ pre: CodeBlock }}
          options={{
            mdxOptions: {
              remarkPlugins: [remarkGfm as any],
              rehypePlugins: [rehypeHighlight as any, rehypeSlug as any],
            }
          }}
        />
      </article>
      <div style={{ borderTop: '1px solid var(--blog-border)', padding: 'clamp(28px,6vw,48px) clamp(16px,4vw,48px)', textAlign: 'center' }}>
        <Link href="/blog" style={{ fontSize: 11, letterSpacing: 3, color: 'var(--blog-accent)', textDecoration: 'none', borderBottom: '1px solid var(--blog-accent)', paddingBottom: 4 }}>← BACK TO ALL POSTS</Link>
      </div>
      </main>
    </>
  )
}
