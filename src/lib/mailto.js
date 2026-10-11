/**
 * mailto.js — pure helpers for building the contact form's mailto: URL.
 * No DOM, no localStorage: all values come in as plain data and
 * translations are injected via the `t` parameter. Fully unit-testable.
 *
 * Everything the visitor typed is passed through encodeURIComponent, so a
 * message containing "&", "?", "#" or a newline cannot break out of its own
 * query parameter and inject a subject or a second recipient.
 */

/** Shape of the object buildMailtoUrl accepts. */
export function buildContactSubject({ topic }, t) {
  const label = (topic || '').trim() || t('msg_na')
  return `${t('mailto_subject')} ${label}`
}

/** Assemble the plain-text body of the outgoing message. */
export function buildContactBody({ name, from, topic, message }, t) {
  const na = t('msg_na')
  return [
    `${t('mailto_from_name')}: ${(name || '').trim() || na}`,
    `${t('mailto_from_email')}: ${(from || '').trim() || na}`,
    `${t('mailto_topic')}: ${(topic || '').trim() || na}`,
    '',
    message
  ].join('\n')
}

/**
 * Build the mailto: URL the contact form navigates to.
 *
 * @param {{email: string, name: string, from: string, topic: string, message: string}} fields
 * @param {(key: string) => string} t translation function
 * @returns {string} e.g. `mailto:a@b.se?subject=…&body=…`
 */
export function buildMailtoUrl(fields, t) {
  const { email, message } = fields
  // Trailing newlines would arrive as empty paragraphs in most mail clients.
  const body = buildContactBody(fields, t).trimEnd()
  return `mailto:${email}?subject=${encodeURIComponent(buildContactSubject(fields, t))}&body=${encodeURIComponent(body)}`
}

/** Minimal check that `value` at least looks like an email address. */
export function isValidEmail(value) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test((value || '').trim())
}
