import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        ink:    '#0e0e0e',
        paper:  '#f5f2ec',
        warm:   '#ede9e1',
        accent: '#c9a84c',
        forest: '#1a2e1a',
        muted:  '#8a8680',
        rule:   '#d4cfc7',
      },
      fontFamily: {
        mono:  ['DM Mono', 'monospace'],
        serif: ['EB Garamond', 'serif'],
      },
    },
  },
  plugins: [],
}
export default config
