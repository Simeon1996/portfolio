import { ImageResponse } from 'next/og'
import { getPostBySlug, getAllPosts } from '@/lib/posts'

export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

export function generateStaticParams() {
  return getAllPosts().map(post => ({ slug: post.slug }))
}

async function loadFont(): Promise<ArrayBuffer | null> {
  try {
    const css = await fetch(
      'https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;700&display=swap',
      { headers: { 'User-Agent': 'Mozilla/5.0 (compatible; Next.js)' } }
    ).then(r => r.text())
    const url = css.match(/src: url\((.+?)\) format\('woff2'\)/)?.[1]
    if (!url) return null
    return fetch(url).then(r => r.arrayBuffer())
  } catch {
    return null
  }
}

export default async function Image({ params }: { params: { slug: string } }) {
  const post = getPostBySlug(params.slug)
  if (!post) return new Response('Not found', { status: 404 })

  const font = await loadFont()

  const title = post.title.length > 60 ? post.title.slice(0, 57) + '…' : post.title

  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          background: '#08131f',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          padding: '72px 96px',
          fontFamily: 'Space Grotesk, sans-serif',
        }}
      >
        {/* Top: tags */}
        <div style={{ display: 'flex', gap: 12 }}>
          {post.tags.slice(0, 4).map(tag => (
            <div
              key={tag}
              style={{
                fontSize: 14,
                color: '#00f5ff',
                border: '1px solid rgba(0,245,255,0.3)',
                padding: '4px 14px',
                letterSpacing: 3,
                display: 'flex',
              }}
            >
              {tag.toUpperCase()}
            </div>
          ))}
        </div>

        {/* Middle: title */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
          <div style={{ width: 56, height: 3, background: '#00f5ff', display: 'flex' }} />
          <div style={{ fontSize: 52, color: '#c8e0f4', fontWeight: 700, lineHeight: 1.15, display: 'flex', flexWrap: 'wrap' }}>
            {title}
          </div>
          <div style={{ fontSize: 20, color: '#4a7a9b', lineHeight: 1.5, display: 'flex', flexWrap: 'wrap' }}>
            {post.excerpt.length > 100 ? post.excerpt.slice(0, 97) + '…' : post.excerpt}
          </div>
        </div>

        {/* Bottom: byline */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div style={{ fontSize: 18, color: '#2a5a7a', letterSpacing: 2, display: 'flex' }}>
            SIMEON IVANOV
          </div>
          <div style={{ fontSize: 16, color: '#1e3a52', letterSpacing: 2, display: 'flex' }}>
            {post.readingTime} MIN READ
          </div>
        </div>
      </div>
    ),
    {
      ...size,
      fonts: font ? [{ name: 'Space Grotesk', data: font, weight: 700, style: 'normal' }] : undefined,
    }
  )
}
