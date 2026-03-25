import { ImageResponse } from 'next/og'

export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'
export const alt = 'Simeon Ivanov — AI Engineer, DevOps & Full-Stack Developer'

async function loadFont(): Promise<ArrayBuffer | null> {
  try {
    const css = await fetch(
      'https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@700&display=swap',
      { headers: { 'User-Agent': 'Mozilla/5.0 (compatible; Next.js)' } }
    ).then(r => r.text())
    const url = css.match(/src: url\((.+?)\) format\('woff2'\)/)?.[1]
    if (!url) return null
    return fetch(url).then(r => r.arrayBuffer())
  } catch {
    return null
  }
}

export default async function Image() {
  const font = await loadFont()

  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          background: '#08131f',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          padding: '80px 96px',
          fontFamily: 'Space Grotesk, sans-serif',
        }}
      >
        <div style={{ width: 56, height: 3, background: '#00f5ff', marginBottom: 48, display: 'flex' }} />
        <div style={{ fontSize: 22, color: '#00f5ff', letterSpacing: 6, marginBottom: 28, display: 'flex', fontWeight: 700 }}>
          SIMEON IVANOV
        </div>
        <div style={{ fontSize: 58, color: '#c8e0f4', fontWeight: 700, lineHeight: 1.1, marginBottom: 36, display: 'flex', flexWrap: 'wrap' }}>
          AI Engineer, DevOps &amp; Full-Stack Developer
        </div>
        <div style={{ fontSize: 22, color: '#4a7a9b', display: 'flex', lineHeight: 1.5 }}>
          Building LLM-powered products, scalable APIs, and interfaces that feel effortless.
        </div>
        <div
          style={{
            position: 'absolute',
            bottom: 56,
            right: 96,
            fontSize: 16,
            color: '#1e3a52',
            letterSpacing: 3,
            display: 'flex',
          }}
        >
          simeonivanov.dev
        </div>
      </div>
    ),
    {
      ...size,
      fonts: font ? [{ name: 'Space Grotesk', data: font, weight: 700, style: 'normal' }] : undefined,
    }
  )
}
