import type { Metadata } from 'next'
import './globals.css'
import ThemeProvider from '@/components/ThemeProvider'

export const metadata: Metadata = {
  title: 'Simeon Ivanov — AI Expert/Developer/Engineer, DevOps, and Full-Stack Developer',
  description: 'Portfolio of Simeon Ivanov — building LLM-powered products, scalable APIs, and interfaces that feel effortless.',
  openGraph: {
    title: 'Simeon Ivanov — Portfolio',
    description: 'AI Expert/Developer/Engineer, DevOps, and Full-Stack Developer',
    type: 'website',
  },
}

// Prevent flash of un-themed content by setting data-theme before React hydrates
const themeScript = `(function(){try{var t=localStorage.getItem('theme')||'dark';document.documentElement.setAttribute('data-theme',t)}catch(e){}})()`

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" data-theme="dark" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body>
        <ThemeProvider>
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}
