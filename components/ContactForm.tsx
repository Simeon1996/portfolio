'use client'

import { useState } from 'react'

const fieldStyle = (C: Record<string, string>, focused: boolean, error: boolean) => ({
  width: '100%',
  background: C.surface,
  border: `1px solid ${error ? 'rgba(var(--pink-rgb),.5)' : focused ? 'rgba(var(--cyan-rgb),.35)' : C.border}`,
  boxShadow: error ? '0 0 12px rgba(var(--pink-rgb),.08)' : focused ? '0 0 16px rgba(var(--cyan-rgb),.06)' : 'none',
  color: C.text,
  fontFamily: "'Space Grotesk', sans-serif",
  fontSize: 13,
  fontWeight: 300,
  padding: '12px 16px',
  outline: 'none',
  transition: 'border-color .2s, box-shadow .2s',
  WebkitAppearance: 'none' as const,
  appearance: 'none' as const,
})

const labelStyle = (mono: string, C: Record<string, string>) => ({
  display: 'block',
  fontFamily: mono,
  fontSize: 8,
  fontWeight: 700,
  letterSpacing: 2.5,
  textTransform: 'uppercase' as const,
  color: C.muted,
  marginBottom: 10,
})

interface Props {
  C: Record<string, string>
  mono: string
  services: Array<{ num: string; title: string }>
  form: {
    nameLabel: string
    namePlaceholder: string
    emailLabel: string
    emailPlaceholder: string
    serviceLabel: string
    servicePlaceholder: string
    serviceOther: string
    descLabel: string
    descPlaceholder: string
    sending: string
    send: string
    successTitle: string
    successBody: string
  }
}

export default function ContactForm({ C, mono, services, form }: Props) {
  const [name,    setName]    = useState('')
  const [email,   setEmail]   = useState('')
  const [service, setService] = useState('')
  const [desc,    setDesc]    = useState('')
  const [errors,  setErrors]  = useState<Record<string, boolean>>({})
  const [focused, setFocused] = useState<string | null>(null)
  const [sending, setSending] = useState(false)
  const [sent,    setSent]    = useState(false)

  function validate() {
    const e: Record<string, boolean> = {}
    if (!name.trim())    e.name    = true
    if (!email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) e.email = true
    if (!service)        e.service = true
    if (!desc.trim())    e.desc    = true
    setErrors(e)
    return Object.keys(e).length === 0
  }

  function handleSubmit() {
    if (!validate()) return
    setSending(true)
    setTimeout(() => { setSending(false); setSent(true) }, 900)
  }

  if (sent) {
    return (
      <div style={{ background: C.card, border: `1px solid rgba(var(--cyan-rgb),.15)`, padding: 'clamp(24px,5vw,44px)', position: 'relative', overflow: 'hidden', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: 'clamp(280px,46vw,400px)', textAlign: 'center' }}>
        <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 1, background: `linear-gradient(90deg,var(--cyan),var(--purple),transparent)`, opacity: .5 }} />
        <div style={{ fontSize: 48, marginBottom: 20 }}>⚡</div>
        <div style={{ fontFamily: mono, fontSize: 16, fontWeight: 900, letterSpacing: 1, color: C.cyan, marginBottom: 12 }}>{form.successTitle}</div>
        <p style={{ fontSize: 13, fontWeight: 300, color: C.muted2, lineHeight: 1.8, maxWidth: 320 }}>{form.successBody}</p>
      </div>
    )
  }

  return (
    <div style={{ background: C.card, border: `1px solid ${C.border}`, padding: 'clamp(24px,4vw,44px)', position: 'relative', overflow: 'hidden', transition: 'border-color .3s' }}>
      <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 1, background: `linear-gradient(90deg,${C.cyan},${C.purple},transparent)`, opacity: .5 }} />

      {/* Name + Email row */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(160px,1fr))', gap: 16, marginBottom: 20 }}>
        <div>
          <label style={labelStyle(mono, C)} htmlFor="cf-name">{form.nameLabel}</label>
          <input
            id="cf-name"
            value={name}
            onChange={e => { setName(e.target.value); setErrors(p => ({ ...p, name: false })) }}
            onFocus={() => setFocused('name')}
            onBlur={() => setFocused(null)}
            placeholder={form.namePlaceholder}
            autoComplete="off"
            style={fieldStyle(C, focused === 'name', !!errors.name)}
          />
        </div>
        <div>
          <label style={labelStyle(mono, C)} htmlFor="cf-email">{form.emailLabel}</label>
          <input
            id="cf-email"
            type="email"
            value={email}
            onChange={e => { setEmail(e.target.value); setErrors(p => ({ ...p, email: false })) }}
            onFocus={() => setFocused('email')}
            onBlur={() => setFocused(null)}
            placeholder={form.emailPlaceholder}
            autoComplete="off"
            style={fieldStyle(C, focused === 'email', !!errors.email)}
          />
        </div>
      </div>

      {/* Service select */}
      <div style={{ marginBottom: 20 }}>
        <label style={labelStyle(mono, C)} htmlFor="cf-service">{form.serviceLabel}</label>
        <div style={{ position: 'relative' }}>
          <select
            id="cf-service"
            value={service}
            onChange={e => { setService(e.target.value); setErrors(p => ({ ...p, service: false })) }}
            onFocus={() => setFocused('service')}
            onBlur={() => setFocused(null)}
            style={{ ...fieldStyle(C, focused === 'service', !!errors.service), cursor: 'pointer', paddingRight: 36 }}
          >
            <option value="" disabled>{form.servicePlaceholder}</option>
            {services.map(s => (
              <option key={s.num} value={s.num} style={{ background: C.card, color: C.text }}>
                {s.title}
              </option>
            ))}
            <option value="other" style={{ background: C.card, color: C.text }}>{form.serviceOther}</option>
          </select>
          <span style={{ position: 'absolute', right: 14, top: '50%', transform: 'translateY(-50%)', fontSize: 11, color: C.cyan, pointerEvents: 'none', fontFamily: mono }}>↓</span>
        </div>
      </div>

      {/* Description */}
      <div style={{ marginBottom: 24 }}>
        <label style={labelStyle(mono, C)} htmlFor="cf-desc">{form.descLabel}</label>
        <textarea
          id="cf-desc"
          value={desc}
          onChange={e => { setDesc(e.target.value); setErrors(p => ({ ...p, desc: false })) }}
          onFocus={() => setFocused('desc')}
          onBlur={() => setFocused(null)}
          placeholder={form.descPlaceholder}
          rows={5}
          style={{ ...fieldStyle(C, focused === 'desc', !!errors.desc), resize: 'vertical', lineHeight: 1.7 }}
        />
      </div>

      {/* Submit */}
      <button
        onClick={handleSubmit}
        disabled={sending}
        style={{
          width: '100%', padding: 14,
          fontFamily: mono, fontSize: 11, fontWeight: 700, letterSpacing: 2, textTransform: 'uppercase',
          background: sending ? 'rgba(var(--cyan-rgb),.1)' : 'transparent',
          border: `1px solid ${C.cyan}`, color: C.cyan,
          cursor: sending ? 'not-allowed' : 'pointer',
          opacity: sending ? .7 : 1,
          transition: 'all .25s', position: 'relative', overflow: 'hidden',
        }}
        onMouseEnter={e => {
          if (!sending) {
            const b = e.currentTarget as HTMLButtonElement
            b.style.background = C.cyan
            b.style.color = '#000'
            b.style.boxShadow = `0 0 28px rgba(var(--cyan-rgb),.25)`
          }
        }}
        onMouseLeave={e => {
          const b = e.currentTarget as HTMLButtonElement
          b.style.background = 'transparent'
          b.style.color = C.cyan
          b.style.boxShadow = 'none'
        }}
      >
        {sending ? form.sending : form.send}
      </button>
    </div>
  )
}
