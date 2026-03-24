'use client'

import { useMemo, useState } from 'react'
import type { HTMLAttributes, ReactNode } from 'react'

type CodeBlockProps = HTMLAttributes<HTMLPreElement> & {
  children?: ReactNode
}

function flattenText(node: ReactNode): string {
  if (node === null || node === undefined || typeof node === 'boolean') return ''
  if (typeof node === 'string' || typeof node === 'number') return String(node)
  if (Array.isArray(node)) return node.map(flattenText).join('')
  if (typeof node === 'object' && 'props' in node) {
    const maybeElement = node as { props?: { children?: ReactNode } }
    return flattenText(maybeElement.props?.children)
  }
  return ''
}

export default function CodeBlock({ children, className, ...rest }: CodeBlockProps) {
  const [copied, setCopied] = useState(false)
  const codeText = useMemo(() => flattenText(children).trimEnd(), [children])

  const handleCopy = async () => {
    if (!codeText) return
    try {
      await navigator.clipboard.writeText(codeText)
      setCopied(true)
      setTimeout(() => setCopied(false), 1400)
    } catch {
      // Ignore clipboard errors silently to avoid interrupting reading.
    }
  }

  return (
    <div className="code-block-wrap">
      <button
        type="button"
        className="code-copy-btn"
        onClick={handleCopy}
        aria-label={copied ? 'Code copied' : 'Copy code'}
      >
        <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
          <path d="M8 8h11v13H8z" fill="none" stroke="currentColor" strokeWidth="1.8" />
          <path d="M5 3h11v3" fill="none" stroke="currentColor" strokeWidth="1.8" />
          <path d="M5 3v13h3" fill="none" stroke="currentColor" strokeWidth="1.8" />
        </svg>
        <span>{copied ? 'Copied' : 'Copy'}</span>
      </button>
      <pre {...rest} className={className}>
        {children}
      </pre>
    </div>
  )
}
