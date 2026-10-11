import { describe, it, expect } from 'vitest'
import {
  buildMailtoUrl,
  buildContactBody,
  buildContactSubject,
  isValidEmail
} from './mailto.js'

/** Stand-in for i18n's `t`: returns the key so assertions stay readable. */
const t = (key) => key

const EMAIL = 'info@skyconnect-travels.se'
const base = {
  email: EMAIL,
  name: 'Anna Berg',
  from: 'anna@example.com',
  topic: 'Study Consultancy',
  message: 'I want to study in Sweden.'
}

describe('buildMailtoUrl', () => {
  it('prefixes mailto: and addresses the configured recipient', () => {
    const url = buildMailtoUrl(base, t)
    expect(url.startsWith(`mailto:${EMAIL}?`)).toBe(true)
    expect(url).not.toContain('meridianadmissions')
  })

  it('puts the topic in the subject and the rest in the body', () => {
    const params = queryParams(buildMailtoUrl(base, t))
    expect(params.subject).toContain('Study Consultancy')
    expect(params.body).toContain('Anna Berg')
    expect(params.body).toContain('anna@example.com')
    expect(params.body).toContain('I want to study in Sweden.')
  })

  it('produces exactly two query parameters', () => {
    const url = buildMailtoUrl(base, t)
    // Anything unescaped would add a third.
    expect(url.split('?')[1].split('&')).toHaveLength(2)
  })

  it('stops "&" in the message injecting a second subject', () => {
    const params = queryParams(buildMailtoUrl({ ...base, message: 'cheap&subject=HACKED' }, t))
    expect(params.subject).toContain('Study Consultancy')
    expect(params.subject).not.toContain('HACKED')
    expect(params.body).toContain('cheap&subject=HACKED')
  })

  it('stops "?" and "#" in the message breaking the query string', () => {
    const url = buildMailtoUrl({ ...base, message: 'why? see #3' }, t)
    // encodeURIComponent escapes both, so neither survives literally in the URL.
    expect(url).not.toContain('#')
    expect(url.split('?')).toHaveLength(2)
    expect(queryParams(url).body).toContain('why? see #3')
  })

  it('keeps newlines inside the body', () => {
    const params = queryParams(buildMailtoUrl({ ...base, message: 'line one\nline two' }, t))
    expect(params.body).toContain('line one\nline two')
    // The raw URL must not contain a literal newline.
    expect(buildMailtoUrl({ ...base, message: 'a\nb' }, t)).not.toMatch(/[\r\n]/)
  })

  it('survives Bangla and accented Latin through a round trip', () => {
    const params = queryParams(buildMailtoUrl({
      ...base,
      name: 'Åsa Öberg',
      message: 'আমি সুইডেনে পড়তে চাই — Zürich too'
    }, t))
    expect(params.body).toContain('Åsa Öberg')
    expect(params.body).toContain('আমি সুইডেনে পড়তে চাই — Zürich too')
  })

  it('falls back to the "not applicable" label when the topic is blank', () => {
    expect(buildContactSubject({ topic: '   ' }, t)).toContain('msg_na')
    expect(buildContactSubject({}, t)).toContain('msg_na')
  })

  it('still returns a usable URL when optional fields are empty', () => {
    for (const fields of [{ ...base, name: '', from: '' }, { ...base, message: '' }, {}]) {
      const url = buildMailtoUrl({ ...fields, email: EMAIL }, t)
      expect(url.startsWith(`mailto:${EMAIL}?`)).toBe(true)
      expect(() => new URLSearchParams(url.split('?')[1])).not.toThrow()
    }
  })

  it('trims trailing newlines off the body', () => {
    const params = queryParams(buildMailtoUrl({ ...base, message: 'done\n\n\n' }, t))
    expect(params.body.endsWith('done')).toBe(true)
  })
})

describe('isValidEmail', () => {
  it('accepts ordinary addresses', () => {
    for (const ok of ['a@b.se', 'first.last+tag@sub.example.co.uk', 'info@skyconnect-travels.se']) {
      expect(isValidEmail(ok)).toBe(true)
    }
  })

  it('rejects malformed addresses', () => {
    for (const bad of ['', 'plain', 'no@domain', 'a b@c.se', 'a@b', 'two@@at.se']) {
      expect(isValidEmail(bad)).toBe(false)
    }
  })

  it('ignores surrounding whitespace', () => {
    expect(isValidEmail('  a@b.se  ')).toBe(true)
    expect(isValidEmail(null)).toBe(false)
    expect(isValidEmail(undefined)).toBe(false)
  })
})

/** Decode a mailto URL's query string into a plain object. */
function queryParams(url) {
  return Object.fromEntries(new URLSearchParams(url.slice(url.indexOf('?') + 1)))
}
